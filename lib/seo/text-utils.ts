/**
 * Utilitare de procesare text pentru română — folosite de analizorul SEO.
 * Toate funcțiile sunt "diacritic-insensitive" (ă == a, ș == s, etc.)
 * pentru că utilizatorii caută în Google în ambele forme.
 */

/**
 * Elimină diacriticele pentru comparare case-insensitive.
 */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // combining marks
    // Romanian specific (sometimes not handled by NFD)
    .replace(/ă/g, "a")
    .replace(/â/g, "a")
    .replace(/î/g, "i")
    .replace(/ș/g, "s")
    .replace(/ş/g, "s") // legacy form
    .replace(/ț/g, "t")
    .replace(/ţ/g, "t") // legacy form
    .trim();
}

/**
 * Escape pentru folosire în RegExp.
 */
export function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Verifică dacă text conține keyword, normalized.
 */
export function containsKeyword(text: string, keyword: string): boolean {
  if (!keyword || !text) return false;
  return normalize(text).includes(normalize(keyword));
}

/**
 * Numără aparițiile keyword-ului (ca frază) în text.
 * Normalized comparison.
 */
export function countKeywordOccurrences(
  text: string,
  keyword: string
): number {
  if (!keyword || !text) return 0;
  const nText = normalize(text);
  const nKw = normalize(keyword);
  if (!nKw) return 0;
  const re = new RegExp(escapeRegex(nKw), "gi");
  return (nText.match(re) || []).length;
}

/**
 * Împarte textul în propoziții (heuristic RO: .!? + \n\n ca delimitatori).
 */
export function splitSentences(text: string): string[] {
  return text
    .replace(/\n\n+/g, ". ") // double newline = new sentence
    .split(/[.!?]+\s/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10); // ignore fragments
}

/**
 * Număr cuvinte (split pe whitespace, ignoră punctuația).
 */
export function countWords(text: string): number {
  if (!text) return 0;
  return text
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // replace punctuation with space
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

/**
 * Extrage primul paragraf (până la primul dublu newline sau primele 200 cuvinte).
 */
export function firstParagraph(text: string): string {
  if (!text) return "";
  const byNewline = text.split(/\n\n/)[0];
  const words = byNewline.split(/\s+/);
  if (words.length <= 200) return byNewline.trim();
  return words.slice(0, 200).join(" ") + "...";
}

/**
 * Densitate keyword — %.
 */
export function keywordDensity(text: string, keyword: string): number {
  const words = countWords(text);
  if (words === 0) return 0;
  const kwWords = countWords(keyword);
  const occurrences = countKeywordOccurrences(text, keyword);
  // Each occurrence = kwWords words
  return (occurrences * kwWords) / words * 100;
}

/**
 * Detectare heading-uri simplu (Markdown ## / ###, sau linii scurte urmate de newline
 * dacă nu e Markdown — euristic pentru conținutul nostru mixed).
 */
export function countSubheadings(text: string): { h2: number; h3: number } {
  const lines = text.split("\n");
  let h2 = 0;
  let h3 = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("### ")) h3++;
    else if (trimmed.startsWith("## ")) h2++;
    // Heuristic for non-markdown content: line ending without punctuation
    // followed by content, between 4-80 chars — treated as subheading
    else if (
      trimmed.length >= 6 &&
      trimmed.length <= 80 &&
      !trimmed.endsWith(".") &&
      !trimmed.endsWith(",") &&
      !trimmed.endsWith(":") &&
      !trimmed.endsWith("?") &&
      !trimmed.startsWith("•") &&
      !trimmed.startsWith("-") &&
      !/^\d/.test(trimmed) &&
      /^[A-ZĂÂÎȘȚ]/.test(trimmed) // starts with uppercase (incl. diacritics)
    ) {
      h2++;
    }
  }
  return { h2, h3 };
}

/**
 * Verifică dacă keyword apare în vreun heading.
 */
export function keywordInHeading(text: string, keyword: string): boolean {
  const lines = text.split("\n");
  const nKw = normalize(keyword);
  for (const line of lines) {
    const trimmed = line.trim();
    const isHeading =
      trimmed.startsWith("## ") ||
      trimmed.startsWith("### ") ||
      (trimmed.length >= 6 &&
        trimmed.length <= 80 &&
        /^[A-ZĂÂÎȘȚ]/.test(trimmed) &&
        !trimmed.endsWith("."));
    if (isHeading && normalize(trimmed).includes(nKw)) return true;
  }
  return false;
}

/**
 * Lungime medie paragraf (în cuvinte).
 */
export function avgParagraphLength(text: string): number {
  const paragraphs = text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 30);
  if (paragraphs.length === 0) return 0;
  const totalWords = paragraphs.reduce(
    (sum, p) => sum + countWords(p),
    0
  );
  return Math.round(totalWords / paragraphs.length);
}

/**
 * Flesch Reading Ease pentru română — formula adaptată.
 * Original: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
 * Adaptare RO: constantele sunt calibrate pentru limba română
 * care are propoziții mai scurte și cuvinte mai multe silabe.
 *
 * Scor:
 * 90-100: foarte ușor (elev clasa a V-a)
 * 60-69:  standard (elev clasa a IX-a)
 * 30-49:  dificil (student)
 * 0-29:   foarte dificil (academic)
 *
 * Pentru B2B industrial țintim 40-60.
 */
export function fleschReadingEaseRO(text: string): number {
  const sentences = splitSentences(text).length || 1;
  const words = countWords(text) || 1;
  const syllables = countSyllables(text) || 1;
  // Romanian-adjusted coefficients (empirically tuned)
  const score =
    206.835 - 1.02 * (words / sentences) - 74 * (syllables / words);
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Aproximare silabe — numără grupuri de vocale.
 * Pentru română: a, ă, â, e, i, î, o, u + diftongi.
 */
export function countSyllables(text: string): number {
  const n = normalize(text);
  const matches = n.match(/[aeiou]+/g);
  return matches ? matches.length : 0;
}

/**
 * Power words ROMÂNĂ pentru B2B industrial — cuvinte care cresc CTR.
 * Folosit pentru scoring bonus.
 */
export const POWER_WORDS_RO = [
  "profesional",
  "industrial",
  "premium",
  "original",
  "certificat",
  "garantat",
  "verificat",
  "oficial",
  "garantie",
  "certificare",
  "calitate",
  "precizie",
  "performanta",
  "rapid",
  "eficient",
  "inalt",
  "maxim",
  "expert",
  "consacrat",
  "testat",
  "dovedit",
  "european",
  "exclusiv",
  "complet",
  "integral",
  "livrabil",
  "imediat",
  "urgent",
  "nou",
  "inovator",
  "avansat",
  "superior",
  "fiabil",
  "durabil",
  "solid",
  "robust",
  "economic",
];

/**
 * Verifică prezența unui power word.
 */
export function hasPowerWord(text: string, words = POWER_WORDS_RO): boolean {
  const n = normalize(text);
  return words.some((w) => n.includes(normalize(w)));
}

/**
 * CTA words — folosite în meta description pentru a stimula click-ul.
 */
export const CTA_WORDS_RO = [
  "cere",
  "solicita",
  "descopera",
  "afla",
  "vezi",
  "comanda",
  "cumpara",
  "livram",
  "livrare",
  "oferta",
  "gratuit",
  "azi",
  "acum",
  "consultanta",
  "contact",
  "suna",
  "intreaba",
  "finantare",
  "leasing",
  "eligibil",
];

export function hasCTA(text: string): boolean {
  return hasPowerWord(text, CTA_WORDS_RO);
}

/**
 * Extract plain text from a product's descriptionBlocks array
 * (pentru produsele care au text + tabele).
 */
export function flattenDescriptionBlocks(
  blocks: Array<{ type: string; text?: string; rows?: string[][] }>
): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((b) => {
      if (b.type === "paragraph" && b.text) return b.text;
      if (b.type === "table" && b.rows) {
        return b.rows.map((r) => r.join(" — ")).join("\n");
      }
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}
