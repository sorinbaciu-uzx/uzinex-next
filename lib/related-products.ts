/**
 * Generate a "related products" paragraph to append to product descriptions
 * for internal-linking coverage.
 *
 * RULES the function must uphold (safety > cleverness, because this runs
 * for all 184 products):
 *   1. Deterministic: same input → identical output on every build. No time,
 *      no random, no locale-dependent ordering.
 *   2. Taxonomy-safe: only pick peers from the same category tree as the
 *      source. A router CNC never "relates to" an excavator.
 *   3. Exact names: mention only the catalog name of each peer, unmodified,
 *      so the existing `linkify` picks them up as anchors.
 *   4. Min-length filter on peer names (15 chars) — matches the product-link
 *      threshold in `internal-links.ts` so we don't propose peers that would
 *      never be linked anyway.
 *   5. Graceful degradation: products with 0 peers return `null`, never a
 *      forced mention that crosses categories.
 *   6. Balanced inbound: no single target receives more than MAX_INBOUND
 *      links from the rest of the catalog. Overflow spills to lower-scored
 *      peers; if still at cap, the source ends up with fewer than MAX_PEERS
 *      (better than piling anchor weight onto one page).
 */

import type { Product } from "@/app/magazin/products";

/** Mirror of `internal-links.ts` MIN_PRODUCT_NAME_LEN. Keep in sync. */
const MIN_PEER_NAME_LEN = 15;

/** Max peers to mention in the generated paragraph. */
const MAX_PEERS = 3;

/**
 * Max inbound links any single product may receive from the generated
 * related-products paragraphs. WHY 15: Google handles moderate anchor
 * concentration without issue, but once a single slug accumulates 30+
 * inbound links with near-identical anchor text, that reads as
 * over-optimization. 15 gives plenty of room for natural popularity
 * (hub products in a subcategory) without crossing into red-flag territory.
 */
const MAX_INBOUND_PER_TARGET = 15;

type Scored = {
  product: Product;
  /** 3 = same subSubcategory, 2 = subcategory, 1 = category. */
  score: 1 | 2 | 3;
};

function scoreRelation(
  source: Product,
  candidate: Product
): 0 | 1 | 2 | 3 {
  if (
    source.subSubcategory &&
    candidate.subSubcategory &&
    source.subSubcategory === candidate.subSubcategory
  )
    return 3;
  if (
    source.subcategory &&
    candidate.subcategory &&
    source.subcategory === candidate.subcategory
  )
    return 2;
  if (source.category && candidate.category && source.category === candidate.category)
    return 1;
  return 0;
}

/**
 * Enumerate every candidate peer for `source`, ranked by (score DESC, slug ASC).
 * No count cap — callers decide how many to take.
 */
function rankCandidates(
  source: Product,
  catalog: readonly Product[]
): Scored[] {
  const scored: Scored[] = [];
  for (const p of catalog) {
    if (p.slug === source.slug) continue;
    if (p.name.length < MIN_PEER_NAME_LEN) continue;
    const s = scoreRelation(source, p);
    if (s > 0) scored.push({ product: p, score: s as 1 | 2 | 3 });
  }
  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.product.slug.localeCompare(b.product.slug);
  });
  return scored;
}

// ───────── Load-balanced allocation ─────────

/**
 * Module-level cache of the global peer allocation. Built once per process
 * on first call to `buildRelatedParagraph`. Deterministic: depends only on
 * catalog order (which is stable between builds since produse.json is
 * auto-generated and committed).
 *
 * WHY lazy: the allocation is O(n²) in catalog size. Doing it at import
 * time would run it unnecessarily (e.g., in `generateStaticParams`). First
 * page render triggers it, all subsequent renders reuse the map.
 */
let allocationCache: {
  map: Map<string, Scored[]>;
  catalogFingerprint: string;
} | null = null;

/**
 * Build the global peer allocation for the whole catalog.
 *
 * Algorithm (greedy, score-maximizing):
 *   1. Sort ALL candidate (source, target) pairs by (score DESC, source.slug ASC,
 *      target.slug ASC). This processes the highest-quality potential matches
 *      first across the whole catalog, not within each source individually.
 *   2. Walk the sorted list: assign the pair IFF
 *        - source has < MAX_PEERS peers already, AND
 *        - target has < MAX_INBOUND_PER_TARGET inbound already.
 *   3. Pairs rejected for cap reasons are simply skipped — source looks
 *      elsewhere in subsequent iterations (lower-scored candidates).
 *
 * Result: every source gets up to MAX_PEERS peers, no target exceeds
 * MAX_INBOUND_PER_TARGET, and pairs with higher taxonomic proximity always
 * win before lower-proximity ones are even considered.
 */
function allocate(catalog: readonly Product[]): Map<string, Scored[]> {
  type Pair = { source: Product; target: Product; score: 1 | 2 | 3 };
  const pairs: Pair[] = [];
  for (const source of catalog) {
    const ranked = rankCandidates(source, catalog);
    for (const r of ranked) {
      pairs.push({ source, target: r.product, score: r.score });
    }
  }
  pairs.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    const s = a.source.slug.localeCompare(b.source.slug);
    if (s !== 0) return s;
    return a.target.slug.localeCompare(b.target.slug);
  });

  const out = new Map<string, Scored[]>();
  const inbound = new Map<string, number>();
  for (const pair of pairs) {
    const picked = out.get(pair.source.slug) ?? [];
    if (picked.length >= MAX_PEERS) continue;
    const inboundForTarget = inbound.get(pair.target.slug) ?? 0;
    if (inboundForTarget >= MAX_INBOUND_PER_TARGET) continue;
    picked.push({ product: pair.target, score: pair.score });
    out.set(pair.source.slug, picked);
    inbound.set(pair.target.slug, inboundForTarget + 1);
  }
  return out;
}

/**
 * Cheap fingerprint so we rebuild the cache if the catalog actually changed
 * between calls (e.g. hot-reload in dev). Just joins slugs — length and
 * order together.
 */
function fingerprint(catalog: readonly Product[]): string {
  // 40-ish chars, enough to detect reorders & additions.
  return catalog.length + ":" + catalog.slice(0, 8).map((p) => p.slug).join("|");
}

function getAllocatedPeers(
  source: Product,
  catalog: readonly Product[]
): Scored[] {
  const fp = fingerprint(catalog);
  if (!allocationCache || allocationCache.catalogFingerprint !== fp) {
    allocationCache = { map: allocate(catalog), catalogFingerprint: fp };
  }
  return allocationCache.map.get(source.slug) ?? [];
}

// ───────── Text generation ─────────

/**
 * Romanian list joiner: "A și B" / "A, B și C".
 * WHY: Oxford comma is not standard in Romanian; using the native form keeps
 * the added paragraph from reading like a translation.
 */
function joinNames(names: string[]): string {
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} și ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} și ${names[names.length - 1]}`;
}

/**
 * Deterministic pseudo-hash of a slug, used to rotate template variants
 * evenly across the catalog (so different pages read differently — avoiding
 * duplicate-content patterns that search engines sometimes flag).
 */
function slugHash(slug: string): number {
  let h = 2166136261; // FNV-1a seed
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

type Template = (args: {
  names: string;
  category: string;
  subcategory: string;
  count: number;
}) => string;

/**
 * Templates for "tight" relations (same subSubcategory). The peers are
 * near-identical siblings — language emphasizes alternative configurations.
 *
 * 7 variants so each scaffold recurs ≤ ~7 times across a catalog of 184
 * products (tight tier hits ~7 sources in current data). Plenty of spread
 * to avoid a single boilerplate being repeated suspiciously.
 */
const TIGHT_TEMPLATES: Template[] = [
  ({ names }) =>
    `Din aceeași familie de echipamente, ${names} oferă alternative cu specificații adaptate pentru cerințe diferite de capacitate și configurație.`,
  ({ names }) =>
    `Pentru aplicații similare cu parametri tehnici diferiți, catalogul UZINEX include și ${names}.`,
  ({ names }) =>
    `Alte variante complementare din aceeași subcategorie: ${names} — fiecare cu avantaje specifice pentru scenarii diferite de utilizare.`,
  ({ names }) =>
    `În aceeași serie de produse, ${names} răspund cerințelor similare cu particularități tehnice distincte.`,
  ({ names }) =>
    `Modele apropiate ca destinație: ${names}. Aceeași categorie, configurații diferite pentru volume și procese variate.`,
  ({ names }) =>
    `Dacă specificațiile acestui model nu se potrivesc exact, alternativele directe din catalogul UZINEX sunt ${names}.`,
  ({ names }) =>
    `Alegeți ${names} dacă aveți nevoie de un alt regim de lucru sau o configurație optimizată diferit.`,
];

/**
 * Templates for "mid" relations (same subcategory, different subSubcategory).
 * Peers cover the same general use-case with different approaches.
 *
 * 7 variants across ~163 sources → ~23 uses per scaffold. Acceptable given
 * each output differs by the inserted peer names (3 unique names/page).
 */
const MID_TEMPLATES: Template[] = [
  ({ names, subcategory }) =>
    `Pentru cerințe conexe din gama ${subcategory}, UZINEX oferă și ${names} — soluții complementare cu abordări tehnice diferite.`,
  ({ names }) =>
    `În aceeași familie de echipamente, ${names} acoperă scenarii de utilizare înrudite cu specificații adaptate.`,
  ({ names, subcategory }) =>
    `Catalogul ${subcategory} include și ${names}, potrivite pentru aplicații complementare.`,
  ({ names }) =>
    `Alte produse din aceeași gamă: ${names} — fiecare optimizat pentru un flux de producție diferit.`,
  ({ names }) =>
    `Pe aceeași linie de business, UZINEX livrează și ${names} pentru aplicații cu cerințe punctuale diferite.`,
  ({ names }) =>
    `Alternativele tehnice pentru acest tip de operație includ ${names}.`,
  ({ names }) =>
    `Echipamente apropiate ca profil de utilizare: ${names} — utile pentru proiecte cu specificații adaptate.`,
];

/**
 * Templates for "loose" relations (same category only). Peers are broadly
 * related — language reflects the wider catalog framing.
 *
 * 6 variants across ~13 sources → ~2 uses per scaffold. Very low reuse.
 */
const LOOSE_TEMPLATES: Template[] = [
  ({ names, category }) =>
    `Din categoria ${category} a catalogului UZINEX fac parte și ${names}, echipamente complementare pentru fluxuri de lucru conexe.`,
  ({ names, category }) =>
    `Catalogul UZINEX de ${category} include de asemenea ${names} — soluții conexe care pot completa un proces de producție.`,
  ({ names }) =>
    `Pentru o perspectivă completă asupra procesului, catalogul UZINEX mai cuprinde ${names}.`,
  ({ names }) =>
    `Dacă aplicația necesită un set mai larg de echipamente, explorați și ${names} din catalogul UZINEX.`,
  ({ names, category }) =>
    `Gama extinsă de ${category} UZINEX mai include ${names} — potrivite pentru proiecte cu cerințe diversificate.`,
  ({ names }) =>
    `Pentru proiecte care combină operațiuni diferite, ${names} pot completa configurația de bază.`,
];

/**
 * Build the related-products paragraph for one source product.
 *
 * Uses the global load-balanced allocation, so each peer choice accounts for
 * how many other products already link to that peer. No single target ends
 * up with > MAX_INBOUND_PER_TARGET inbound anchors.
 *
 * @returns the generated sentence, or `null` if the product has zero
 *   taxonomically-safe peers (rare — 1/184 in the current catalog).
 */
export function buildRelatedParagraph(
  source: Product,
  catalog: readonly Product[]
): string | null {
  const peers = getAllocatedPeers(source, catalog);
  if (peers.length === 0) return null;

  // Tier = highest proximity among the chosen peers.
  const maxScore = peers[0].score;
  const pool =
    maxScore === 3
      ? TIGHT_TEMPLATES
      : maxScore === 2
        ? MID_TEMPLATES
        : LOOSE_TEMPLATES;

  const template = pool[slugHash(source.slug) % pool.length];
  const names = joinNames(peers.map((p) => p.product.name));

  return template({
    names,
    category: source.category ?? "",
    subcategory: source.subcategory ?? source.category ?? "",
    count: peers.length,
  });
}
