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
 */

import type { Product } from "@/app/magazin/products";

/** Mirror of `internal-links.ts` MIN_PRODUCT_NAME_LEN. Keep in sync. */
const MIN_PEER_NAME_LEN = 15;

/** Max peers to mention in the generated paragraph. */
const MAX_PEERS = 3;

type ScoredPeer = {
  product: Product;
  /** 3 = same subSubcategory, 2 = subcategory, 1 = category. */
  score: 1 | 2 | 3;
};

/**
 * Find up to MAX_PEERS related products for `source`, ranked by taxonomy
 * proximity. Ties broken deterministically by slug (alphabetical) to make
 * builds reproducible.
 */
function findPeers(
  source: Product,
  catalog: readonly Product[]
): ScoredPeer[] {
  const scored: ScoredPeer[] = [];
  for (const p of catalog) {
    if (p.slug === source.slug) continue;
    if (p.name.length < MIN_PEER_NAME_LEN) continue;

    let score: 1 | 2 | 3 | 0 = 0;
    if (
      source.subSubcategory &&
      p.subSubcategory &&
      source.subSubcategory === p.subSubcategory
    ) {
      score = 3;
    } else if (
      source.subcategory &&
      p.subcategory &&
      source.subcategory === p.subcategory
    ) {
      score = 2;
    } else if (
      source.category &&
      p.category &&
      source.category === p.category
    ) {
      score = 1;
    }

    if (score > 0) scored.push({ product: p, score: score as 1 | 2 | 3 });
  }

  scored.sort((a, b) => {
    if (a.score !== b.score) return b.score - a.score;
    return a.product.slug.localeCompare(b.product.slug);
  });

  return scored.slice(0, MAX_PEERS);
}

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

/**
 * Template signature: given the joined peer names, the source product's
 * category label, and peer count, return a natural Romanian sentence.
 *
 * WHY multiple templates per relation tier: 184 pages with the same sentence
 * structure would be flagged as thin/duplicate content. Rotating keeps each
 * page's prose distinct while staying factual.
 */
type Template = (args: {
  names: string;
  category: string;
  subcategory: string;
  count: number;
}) => string;

/**
 * Templates for "tight" relations (same subSubcategory). The peers are
 * near-identical siblings — language emphasizes alternative configurations.
 */
const TIGHT_TEMPLATES: Template[] = [
  ({ names }) =>
    `Din aceeași familie de echipamente, ${names} oferă alternative cu specificații adaptate pentru cerințe diferite de capacitate și configurație.`,
  ({ names }) =>
    `Pentru aplicații similare cu parametri tehnici diferiți, catalogul UZINEX include și ${names}.`,
  ({ names }) =>
    `Alte variante complementare din aceeași subcategorie: ${names} — fiecare cu avantaje specifice pentru scenarii diferite de utilizare.`,
];

/**
 * Templates for "mid" relations (same subcategory, different subSubcategory).
 * Peers cover the same general use-case with different approaches.
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
];

/**
 * Templates for "loose" relations (same category only). Peers are broadly
 * related — language reflects the wider catalog framing.
 */
const LOOSE_TEMPLATES: Template[] = [
  ({ names, category }) =>
    `Din categoria ${category} a catalogului UZINEX fac parte și ${names}, echipamente complementare pentru fluxuri de lucru conexe.`,
  ({ names, category }) =>
    `Catalogul UZINEX de ${category} include de asemenea ${names} — soluții conexe care pot completa un proces de producție.`,
  ({ names }) =>
    `Pentru o perspectivă completă asupra procesului, catalogul UZINEX mai cuprinde ${names}.`,
];

/**
 * Build the related-products paragraph for one source product.
 *
 * @returns the generated sentence, or `null` if the product has zero
 *   taxonomically-safe peers (rare — 1/184 in the current catalog).
 */
export function buildRelatedParagraph(
  source: Product,
  catalog: readonly Product[]
): string | null {
  const peers = findPeers(source, catalog);
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
