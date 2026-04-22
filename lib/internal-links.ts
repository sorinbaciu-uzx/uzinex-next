/**
 * Internal linking registry.
 *
 * Each target describes:
 *  - `href`: where to send the user
 *  - `patterns`: regex fragments (no flags, no anchors) that should match mentions
 *    of this concept in prose. Matched case-insensitive, with word boundaries on
 *    alphabetic extremes.
 *
 * Rules enforced by `linkify`:
 *  - No self-links: a pattern pointing to the current page is skipped.
 *  - One target linked at most once per paragraph (first occurrence wins).
 *  - One target linked at most once per page (tracked via `alreadyLinked`).
 *  - Longer patterns are tried first so "leasing operațional" wins over "leasing".
 *
 * WHY the pattern list lives here (not next to each page component): keeps linking
 * policy global so that adding a new page means editing one file; prevents two
 * places from disagreeing about which term links where.
 */

export type LinkTarget = {
  href: string;
  patterns: string[];
};

export const LINK_TARGETS: LinkTarget[] = [
  // ───────── Service ─────────
  {
    href: "/service/abonamente",
    patterns: [
      "abonamente? de service",
      "abonamente? service",
      "contracte? op(ț|t)ionale? de mentenan(ță|ta) prevent(ivă|iva)",
      "contracte? de mentenan(ță|ta) prevent(ivă|iva)",
    ],
  },
  {
    href: "/service/manual-ai",
    patterns: ["manual(e)? interactiv(e)?", "manual(e)? AI"],
  },
  {
    href: "/service/inclus-la-livrare",
    patterns: [
      "inclus(ă|a)? la livrare",
      "punere(a)? în func(ți|ti)une",
      "punere(a)? in func(ți|ti)une",
    ],
  },
  {
    href: "/service",
    patterns: [
      "service post-v(ânzare|anzare)",
      "suport post-v(ânzare|anzare)",
      "service tehnic",
      "asisten(ță|ta) tehnic(ă|a) post-v(ânzare|anzare)",
    ],
  },

  // ───────── Finanțare ─────────
  {
    href: "/finantare/europeana-guvernamentala",
    patterns: [
      "fonduri europene",
      "finan(țare|tare) european(ă|a)",
      "fonduri PNRR",
      "PNRR",
      "fonduri nerambursabile",
      "achi(ziții|zitii) publice",
      "SEAP",
      "SICAP",
    ],
  },
  {
    href: "/finantare/credite-leasing",
    patterns: [
      "leasing financiar",
      "leasing opera(țional|tional)",
      "credite (și|si) leasing",
      "credit de achizi(ție|tie)",
    ],
  },
  {
    href: "/finantare/credit-furnizor",
    patterns: ["credit furnizor"],
  },
  {
    href: "/finantare",
    patterns: [
      "solu(ții|tii) de finan(țare|tare)",
      "op(ți|ti)uni de finan(țare|tare)",
    ],
  },

  // ───────── Industry 4.0 ─────────
  {
    href: "/industry-4.0/iiot-monitorizare",
    patterns: [
      "monitorizare industrial(ă|a)",
      "IIoT",
      "monitorizare OEE",
      "dashboard OEE",
    ],
  },
  {
    href: "/industry-4.0/robotica-colaborativa",
    patterns: [
      "robo(ți|ti) colaborativi",
      "robotic(ă|a) colaborativ(ă|a)",
      "cobo(ți|ti)",
    ],
  },
  {
    href: "/industry-4.0/mentenanta-predictiva",
    patterns: ["mentenan(ță|ta) predictiv(ă|a)"],
  },
  {
    href: "/industry-4.0/inspectie-optica",
    patterns: [
      "inspec(ție|tie) optic(ă|a)",
      "control(ul)? calit(ății|atii) optic",
    ],
  },
  {
    href: "/industry-4.0/edge-computing-mes",
    patterns: [
      "edge computing",
      "sistem(e)? MES",
      "integrare(a)? ERP",
    ],
  },
  {
    href: "/industry-4.0/software-industrial",
    patterns: [
      "software industrial",
      "sistem(e)? SCADA",
      "interfa(ță|ta) HMI",
    ],
  },
  {
    href: "/industry-4.0",
    patterns: ["Industr(ia|y) 4\\.0"],
  },

  // ───────── Case studies ─────────
  {
    href: "/studii-de-caz",
    patterns: ["studi(i|u) de caz", "cazuri de utilizare"],
  },

  // ───────── Company pages ─────────
  {
    href: "/echipa",
    patterns: ["echipa Uzinex", "echipa tehnic(ă|a) Uzinex"],
  },
  {
    href: "/cariere",
    patterns: ["cariere la Uzinex", "joburi la Uzinex"],
  },
  {
    href: "/materiale-utile",
    patterns: [
      "materiale utile",
      "ghid(uri)? tehnic(e)?",
      "resurse tehnice",
    ],
  },

  // ───────── Ofertare / contact ─────────
  {
    href: "/oferta",
    patterns: [
      "ofert(ă|a) personalizat(ă|a)",
      "cerere de ofert(ă|a)",
      "configura(ți|ti)e personalizat(ă|a)",
    ],
  },
  {
    href: "/contact",
    patterns: [
      "consultan(ță|ta) tehnic(ă|a) gratuit(ă|a)",
      "consultan(ță|ta) tehnic(ă|a)",
    ],
  },

  // ───────── Catalog ─────────
  {
    href: "/magazin",
    patterns: [
      "catalog(ul)? Uzinex",
      "magazin(ul)? Uzinex",
      "catalog(ul)? de echipamente",
    ],
  },
];

export type Segment = string | { text: string; href: string };

/**
 * Match shape used while scanning a paragraph.
 * WHY: we collect all matches first, then greedily pick non-overlapping ones
 * so that a later, longer match can beat an earlier, shorter one.
 */
type RawMatch = {
  start: number;
  end: number;
  href: string;
  patternLength: number;
  /**
   * Topical proximity for tie-breaking between two product-target matches
   * that start at the same offset with the same length. 0 = unrelated,
   * 1 = same category, 2 = same subcategory, 3 = same subSubcategory.
   * Non-product (global) targets are scored 0 — they compete only on length.
   */
  proximity: number;
};

// ───────── Helpers ─────────

function regexEscape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * NFD-decompose then strip combining marks. Produces a diacritic-free variant
 * (e.g. "Mașină" → "Masina") so we can match text that was typed without
 * diacritics against patterns compiled from the canonical name.
 */
function stripDiacritics(s: string): string {
  return s.normalize("NFD").replace(/\p{Mn}/gu, "");
}

/**
 * Compile a pattern into a RegExp with word boundaries and case-insensitive flag.
 * Word boundary uses a manual character class since `\b` doesn't respect
 * Romanian diacritics.
 */
const WORD_CLASS = "A-Za-zĂÂÎȘȚăâîșțșțȘȚ0-9";
function compilePattern(pattern: string): RegExp {
  return new RegExp(
    `(?<![${WORD_CLASS}])(?:${pattern})(?![${WORD_CLASS}])`,
    "giu"
  );
}

/**
 * Module-level cache of compiled regexes. Keyed by the raw pattern source
 * string; safe because patterns are always compiled with the same flags.
 * WHY: linkify runs once per paragraph, and at build time we render 184+
 * product pages × dozens of paragraphs × hundreds of patterns. Without
 * caching, that's millions of regex constructions.
 */
const compiledCache = new Map<string, RegExp>();
function getCompiled(pattern: string): RegExp {
  let re = compiledCache.get(pattern);
  if (!re) {
    re = compilePattern(pattern);
    compiledCache.set(pattern, re);
  }
  re.lastIndex = 0;
  return re;
}

// ───────── Product-to-product targets ─────────

/**
 * Minimum length for a product name to be used as a link-able anchor.
 * WHY: shorter names are generic ("Thumb Bucket", "Cuplaj rapid") — they would
 * match casual prose that doesn't really refer to that specific product, which
 * is a bad SEO signal and confuses users. Names at or above this threshold
 * are specific enough that a full-name match is unambiguous in context.
 */
const MIN_PRODUCT_NAME_LEN = 15;

export type ProductForLinking = {
  slug: string;
  name: string;
  category?: string;
  subcategory?: string;
  subSubcategory?: string;
};

/**
 * Build per-page link targets for every OTHER product in the catalog.
 *
 * Returns two pattern variants per product: the canonical name and (when
 * different) a diacritic-stripped variant — so we match prose whether the
 * author used "Mașină" or "Masina".
 *
 * Each target carries its product's taxonomy so `linkify` can break ties
 * between two equally-long matches by preferring the topically closer one.
 *
 * @param sourceSlug - the product the current page is about, excluded from
 *   targets. Pass `""` for non-product pages that still want product links.
 * @param allProducts - the full catalog.
 * @param sourceForProximity - used for topical tie-breaking. Defaults to
 *   matching against the source product if found in the catalog.
 */
export function buildProductTargets(
  sourceSlug: string,
  allProducts: readonly ProductForLinking[],
  sourceForProximity?: ProductForLinking
): LinkTarget[] {
  const source =
    sourceForProximity ??
    allProducts.find((p) => p.slug === sourceSlug) ??
    null;

  const out: LinkTarget[] = [];
  for (const p of allProducts) {
    if (p.slug === sourceSlug) continue;
    if (p.name.length < MIN_PRODUCT_NAME_LEN) continue;

    const patterns = [regexEscape(p.name)];
    const noDia = stripDiacritics(p.name);
    if (noDia !== p.name) patterns.push(regexEscape(noDia));

    out.push({
      href: `/produs/${p.slug}`,
      patterns,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...( { __meta: { taxonomy: p, source } } as any ),
    });
  }
  return out;
}

/**
 * Proximity score between a target product and the source product:
 *   3 → same subSubcategory
 *   2 → same subcategory
 *   1 → same category
 *   0 → unrelated
 * Used only to break ties when two equally-long product names would match
 * at the same position. WHY: if someone writes "Mașină CNC 3 sau 4 axe" in
 * a description of another CNC product, we prefer linking to a CNC peer over
 * an unrelated match of the same text length.
 */
function proximityScore(
  target: ProductForLinking,
  source: ProductForLinking | null
): number {
  if (!source) return 0;
  if (
    target.subSubcategory &&
    source.subSubcategory &&
    target.subSubcategory === source.subSubcategory
  )
    return 3;
  if (
    target.subcategory &&
    source.subcategory &&
    target.subcategory === source.subcategory
  )
    return 2;
  if (
    target.category &&
    source.category &&
    target.category === source.category
  )
    return 1;
  return 0;
}

// Extract product-target meta (taxonomy) that `buildProductTargets` stashed on the target.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getTargetMeta(t: LinkTarget): { taxonomy?: ProductForLinking; source?: ProductForLinking | null } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((t as any).__meta ?? {}) as { taxonomy?: ProductForLinking; source?: ProductForLinking | null };
}

// ───────── Linkify ─────────

export type LinkifyOptions = {
  /** Current page path — targets matching this href are skipped (no self-links). */
  currentPath?: string;
  /** Extra targets beyond the global LINK_TARGETS — typically from buildProductTargets. */
  extraTargets?: readonly LinkTarget[];
  /**
   * Hard cap on how many hrefs starting with `/produs/` may be inserted into
   * a single page (tracked via `alreadyLinked`). WHY: product-to-product
   * linking can pile up fast in long descriptions and over-linking hurts SEO
   * more than it helps.
   */
  maxProductLinksPerPage?: number;
};

/**
 * Linkify a single chunk of prose.
 *
 * @param text - the paragraph to process.
 * @param alreadyLinked - hrefs already linked on this page. This set is READ
 *   AND WRITTEN: when a match turns into a link, its href is added. Pass the
 *   SAME set across every paragraph of one page.
 * @param options - see `LinkifyOptions`.
 * @returns array of `string` and `{ text, href }` segments, in order.
 */
export function linkify(
  text: string,
  alreadyLinked: Set<string>,
  options?: LinkifyOptions
): Segment[] {
  const { currentPath, extraTargets, maxProductLinksPerPage } = options ?? {};

  const rawMatches: RawMatch[] = [];

  const scan = (targets: readonly LinkTarget[]) => {
    for (const target of targets) {
      if (alreadyLinked.has(target.href)) continue;
      if (currentPath && target.href === currentPath) continue;

      const meta = getTargetMeta(target);
      const prox = meta.taxonomy
        ? proximityScore(meta.taxonomy, meta.source ?? null)
        : 0;

      for (const patternSource of target.patterns) {
        const re = getCompiled(patternSource);
        let m: RegExpExecArray | null;
        while ((m = re.exec(text)) !== null) {
          rawMatches.push({
            start: m.index,
            end: m.index + m[0].length,
            href: target.href,
            patternLength: patternSource.length,
            proximity: prox,
          });
        }
      }
    }
  };

  scan(LINK_TARGETS);
  if (extraTargets && extraTargets.length > 0) scan(extraTargets);

  if (rawMatches.length === 0) return [text];

  // Sort by: start ASC, patternLength DESC (longer wins), proximity DESC
  // (topically closer wins on ties), end DESC.
  rawMatches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    if (a.patternLength !== b.patternLength)
      return b.patternLength - a.patternLength;
    if (a.proximity !== b.proximity) return b.proximity - a.proximity;
    return b.end - a.end;
  });

  // Greedy non-overlap + per-paragraph dedupe + per-page cap for product links.
  const picked: RawMatch[] = [];
  const seenHrefInParagraph = new Set<string>();
  let cursor = -1;

  // Count existing product links on the page (rehydrated from the set).
  let productLinksSoFar = 0;
  if (maxProductLinksPerPage !== undefined) {
    for (const h of alreadyLinked) {
      if (h.startsWith("/produs/")) productLinksSoFar++;
    }
  }

  for (const m of rawMatches) {
    if (m.start < cursor) continue;
    if (seenHrefInParagraph.has(m.href)) continue;
    if (alreadyLinked.has(m.href)) continue;

    const isProductLink = m.href.startsWith("/produs/");
    if (
      isProductLink &&
      maxProductLinksPerPage !== undefined &&
      productLinksSoFar >= maxProductLinksPerPage
    ) {
      continue;
    }

    picked.push(m);
    seenHrefInParagraph.add(m.href);
    alreadyLinked.add(m.href);
    if (isProductLink) productLinksSoFar++;
    cursor = m.end;
  }

  if (picked.length === 0) return [text];

  const segments: Segment[] = [];
  let i = 0;
  for (const m of picked) {
    if (m.start > i) segments.push(text.slice(i, m.start));
    segments.push({ text: text.slice(m.start, m.end), href: m.href });
    i = m.end;
  }
  if (i < text.length) segments.push(text.slice(i));

  return segments;
}
