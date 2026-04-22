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
};

/**
 * Compile a pattern into a RegExp with word boundaries and case-insensitive flag.
 * Word boundary uses [A-Za-zĂÂÎȘȚăâîșț0-9] since \b doesn't handle diacritics.
 */
function compilePattern(pattern: string): RegExp {
  // Lookbehind/lookahead for non-word chars (supports diacritics)
  const WORD = "A-Za-zĂÂÎȘȚăâîșț0-9";
  return new RegExp(`(?<![${WORD}])(?:${pattern})(?![${WORD}])`, "giu");
}

/**
 * Linkify a single chunk of prose.
 *
 * @param text - the paragraph to process
 * @param alreadyLinked - hrefs already linked on this page. This set is READ
 *   AND WRITTEN: matches that result in a new link add their href here. Pass
 *   the SAME set across paragraphs of one page.
 * @param currentPath - path of the current page; targets with this href are
 *   skipped so a page never links to itself.
 * @returns array of `string` and `{ text, href }` segments, in order.
 */
export function linkify(
  text: string,
  alreadyLinked: Set<string>,
  currentPath?: string
): Segment[] {
  const rawMatches: RawMatch[] = [];

  for (const target of LINK_TARGETS) {
    if (alreadyLinked.has(target.href)) continue;
    if (currentPath && target.href === currentPath) continue;

    for (const patternSource of target.patterns) {
      const re = compilePattern(patternSource);
      let m: RegExpExecArray | null;
      while ((m = re.exec(text)) !== null) {
        rawMatches.push({
          start: m.index,
          end: m.index + m[0].length,
          href: target.href,
          patternLength: patternSource.length,
        });
        // Don't scan the same target twice for overlap concerns —
        // we'll filter greedily below.
      }
    }
  }

  if (rawMatches.length === 0) return [text];

  // Sort by: start ASC, then patternLength DESC (longer wins on ties),
  // then end DESC.
  rawMatches.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    if (a.patternLength !== b.patternLength)
      return b.patternLength - a.patternLength;
    return b.end - a.end;
  });

  // Greedy non-overlap: keep earliest-starting, longest-pattern match;
  // then skip any that overlap with it. Also only first match per href
  // within this paragraph — so a term repeated in the same paragraph
  // is linked only once.
  const picked: RawMatch[] = [];
  const seenHrefInParagraph = new Set<string>();
  let cursor = -1;
  for (const m of rawMatches) {
    if (m.start < cursor) continue;
    if (seenHrefInParagraph.has(m.href)) continue;
    if (alreadyLinked.has(m.href)) continue;
    picked.push(m);
    seenHrefInParagraph.add(m.href);
    alreadyLinked.add(m.href);
    cursor = m.end;
  }

  if (picked.length === 0) return [text];

  // Build segments
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
