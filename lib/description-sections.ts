/**
 * Split a product's flattened description blocks (paragraphs, tables, animations,
 * enrichments) into an intro + collapsible sections. The reader sees the intro
 * expanded by default; the long tail (Avantaje, Aplicații, Proces, De ce UZINEX,
 * native FAQ etc.) lives behind accordion summaries.
 *
 * Header detection: paragraphs that look like section titles (short, no trailing
 * punctuation, matching a known Uzinex description vocabulary). We don't need
 * the full sophistication of a parser — authors are consistent enough that a
 * prefix match + length guard catches the real headers without false positives
 * on sentence fragments.
 *
 * The specs table stays in the intro even when a "Specificații Tehnice" header
 * precedes it — the table is high-value factual content that defeats the
 * purpose of "digestible" if hidden.
 */

import type { DescriptionBlock } from "@/app/magazin/products";
import type { ProductAnimation } from "@/components/solution-anims/ProductAnimation";
import type { ProductEnrichment } from "@/components/product-enrichments/ProductEnrichment";

export type RenderNode =
  | DescriptionBlock
  | { type: "animation"; anim: ProductAnimation }
  | { type: "enrichment"; enr: ProductEnrichment };

export type DescriptionSection = {
  /** null = intro (no accordion wrapper) */
  title: string | null;
  blocks: RenderNode[];
};

// Header prefixes we treat as accordion-worthy section boundaries.
// Diacritics-tolerant (both with and without diacritics — author content mixes
// the two even within the same paragraph).
const HEADER_PATTERNS: RegExp[] = [
  /^avantaje(?:le)?(?:\s+(?:principale|cheie))?\b/i,
  /^aplica[țt]ii(?:\s+(?:principale|industriale|potrivite|[șs]i\s+industrii))?\b/i,
  /^industrii\s+[șs]i\s+aplica[țt]ii\b/i,
  /^specifica[țt]ii\s+tehnice\b/i,
  /^caracteristici\s+tehnice\b/i,
  /^parametri\s+(?:reglabili|tehnici)\b/i,
  /^proces\s+(?:de\s+lucru|automatizat)\b/i,
  /^flux\s+(?:de\s+lucru|de\s+produc[țt]ie|operational)\b/i,
  /^mod\s+de\s+func[țt]ionare\b/i,
  /^cum\s+func[țt]ioneaz[aă]\b/i,
  /^(?:intreb[aă]ri|întreb[aă]ri)\s+frecvente\b/i,
  /^de\s+ce\s+uzinex\b/i,
  /^de\s+ce\s+s[aă]\s+(?:alegi|achizi[țt]ionezi|cumperi)\b/i,
  /^c[aă]nd\s+(?:este|s[aă])\s+(?:alegerea|mașina|masina|echipamentul)\b/i,
  /^c[aă]nd\s+sa\s+alegi\b/i,
  /^diferen[țt]a\s+(?:fa[țt][aă]|intre|între)\b/i,
  /^diferen[țt]e\s+fa[țt][aă]\b/i,
  /^materiale\s+compatibile\b/i,
  /^etape\s+automate\b/i,
  /^opera[țt]ii\s+executate\b/i,
  /^operatii\s+executate\b/i,
  /^dot[aă]ri\s+standard\b/i,
  /^dimensiuni\s+generale\b/i,
  /^specifica[țt]ii\s+(?:[șs]i\s+modele|detaliate)\b/i,
  /^sistem\s+de\s+(?:control|filetare|ambalare)\b/i,
];

/** Paragraphs that sneak into descriptions but aren't useful content. */
const JUNK_PARAGRAPH_RE = /^urm[aă]re[sș]te-ne pe\s*:?\s*$/i;

const MAX_HEADER_CHARS = 140;

function looksLikeHeader(text: string): boolean {
  const t = (text || "").trim();
  if (!t) return false;
  if (t.length > MAX_HEADER_CHARS) return false;
  if (/^[•\-*]/.test(t)) return false; // bullet — not a header
  if (/[.!?]$/.test(t)) return false; // sentence ending — not a header
  if (!/^[A-ZĂÎÂȘȚ]/.test(t)) return false; // must start capitalized
  if (t.split(/\s+/).length < 2) return false; // too short to be meaningful
  return HEADER_PATTERNS.some((re) => re.test(t));
}

/**
 * Clean up a header for display — strip product-name suffix ("— routerul cnc...")
 * so the accordion label reads clean. Falls back to first 60 chars of original
 * text if no separator found.
 */
function prettifyTitle(text: string): string {
  const t = text.trim();
  // Strip " — productname" suffix, keep the intro phrase
  const sepIdx = t.search(/\s+[—–-]\s+/);
  if (sepIdx > 0 && sepIdx < 40) return t.slice(0, sepIdx).trim();
  // If there's a "despre/pentru/al/de la" connector, cut after the noun phrase
  const connectorMatch = t.match(/^(.{4,40}?)\s+(?:despre|pentru|al|ale|la|din)\s+/i);
  if (connectorMatch) return connectorMatch[1].trim();
  return t.length > 60 ? t.slice(0, 57).trim() + "…" : t;
}

/**
 * Max paragraphs kept in the visible intro. Anything beyond this — when no
 * explicit section header has appeared yet — is pushed into a synthetic
 * "Detalii complete" accordion so every product benefits from progressive
 * disclosure, not just the ones whose authors used explicit section titles.
 */
const INTRO_MAX_PARAGRAPHS = 4;

const FALLBACK_TITLE = "Detalii complete";

/**
 * Split interleaved blocks into intro + sections. Headers become section
 * titles; they're dropped from the body so we don't render the summary twice.
 *
 * Two-layer strategy:
 *  1. Explicit headers in the author's text → real section accordions
 *  2. If no header has appeared and the intro is getting long (> 4 paragraphs
 *     + first table), the remainder flows into a synthetic "Detalii complete"
 *     accordion. That covers the ~40% of products whose descriptions are one
 *     long paragraph stream with no "Avantaje Principale"/"Aplicații" dividers.
 */
export function splitIntoSections(blocks: RenderNode[]): DescriptionSection[] {
  const sections: DescriptionSection[] = [{ title: null, blocks: [] }];
  let introParagraphCount = 0;
  let sawExplicitHeader = false;
  let introTableLocked = false; // once a table is in the intro, don't add more

  for (const b of blocks) {
    // Drop junk paragraphs (social-media footer) outright
    if (b.type === "paragraph" && JUNK_PARAGRAPH_RE.test(b.text.trim())) {
      continue;
    }

    // Explicit header paragraph → start a new real section
    if (b.type === "paragraph" && looksLikeHeader(b.text)) {
      sections.push({ title: prettifyTitle(b.text), blocks: [] });
      sawExplicitHeader = true;
      continue;
    }

    const inIntro = sections.length === 1 && sections[0].title === null;

    // Intro cap: once we've accumulated INTRO_MAX_PARAGRAPHS without seeing
    // an explicit header, bleed the rest into a synthetic accordion. Bullet
    // paragraphs (`• ...`) always go into an accordion — they're part of an
    // "Avantaje"/"Caracteristici" list, and showing one or two in the intro
    // looks visually dangling vs. the other 5 hidden.
    if (inIntro && !sawExplicitHeader) {
      if (b.type === "paragraph") {
        const isBullet = /^[•\-*]/.test(b.text.trim());
        if (isBullet || introParagraphCount >= INTRO_MAX_PARAGRAPHS) {
          sections.push({ title: FALLBACK_TITLE, blocks: [] });
        } else {
          introParagraphCount++;
        }
      } else if (b.type === "table") {
        if (introTableLocked && introParagraphCount >= INTRO_MAX_PARAGRAPHS) {
          sections.push({ title: FALLBACK_TITLE, blocks: [] });
        } else {
          introTableLocked = true;
        }
      }
      // animations / enrichments in the intro stay visible — they're visual,
      // not text-dense, and breaking them up visually costs more than keeps.
    }

    sections[sections.length - 1].blocks.push(b);
  }

  // Drop empty sections (header with no following content)
  return sections.filter((s) => s.blocks.length > 0 || s.title === null);
}
