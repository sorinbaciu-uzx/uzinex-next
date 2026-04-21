/**
 * Motorul SEO custom pentru Uzinex.
 * Inspirat din Rank Math, adaptat pentru B2B industrial românesc.
 *
 * Folosire:
 *   import { analyzeSEO } from "@/lib/seo/analyzer";
 *   const result = analyzeSEO({ focusKeyword, seoTitle, ... });
 */

import type {
  SEOAnalysis,
  SEOCheck,
  SEOCheckCategory,
  SEOInput,
  SEOVerdict,
} from "./types";
import {
  avgParagraphLength,
  containsKeyword,
  countKeywordOccurrences,
  countSubheadings,
  countWords,
  firstParagraph,
  fleschReadingEaseRO,
  hasCTA,
  hasPowerWord,
  keywordDensity,
  keywordInHeading,
  normalize,
} from "./text-utils";

/**
 * Construiește lista de verificări SEO pentru un input dat.
 */
function buildChecks(input: SEOInput): SEOCheck[] {
  const {
    focusKeyword,
    seoTitle,
    seoDescription,
    slug,
    content,
  } = input;

  const hasKeyword = focusKeyword.trim().length >= 2;
  const firstPara = firstParagraph(content);
  const occurrences = countKeywordOccurrences(content, focusKeyword);
  const density = keywordDensity(content, focusKeyword);
  const { h2, h3 } = countSubheadings(content);
  const avgPara = avgParagraphLength(content);
  const wordCount = countWords(content);

  const checks: SEOCheck[] = [];

  // ═══════════════════════════════════════════════════════════
  // CRITICAL — 50 pct total (5 × 10)
  // ═══════════════════════════════════════════════════════════

  checks.push({
    id: "kw_in_title",
    category: "critical",
    label: "Focus keyword în SEO title",
    description:
      "Keyword-ul principal trebuie să apară în titlul SEO — semnalul cel mai puternic pentru Google.",
    passed: hasKeyword && containsKeyword(seoTitle, focusKeyword),
    points: hasKeyword && containsKeyword(seoTitle, focusKeyword) ? 10 : 0,
    maxPoints: 10,
    tip: hasKeyword
      ? 'Adaugă "' + focusKeyword + '" în SEO title.'
      : "Setează întâi focus keyword-ul.",
  });

  checks.push({
    id: "kw_in_description",
    category: "critical",
    label: "Focus keyword în meta description",
    description:
      "Meta description e textul afișat în rezultatele Google — trebuie să conțină keyword-ul.",
    passed: hasKeyword && containsKeyword(seoDescription, focusKeyword),
    points:
      hasKeyword && containsKeyword(seoDescription, focusKeyword) ? 10 : 0,
    maxPoints: 10,
    tip: 'Include "' + focusKeyword + '" în meta description.',
  });

  checks.push({
    id: "kw_in_slug",
    category: "critical",
    label: "Focus keyword în URL slug",
    description:
      "URL-ul paginii trebuie să reflecte keyword-ul principal pentru ranking optim.",
    passed: hasKeyword && containsKeyword(slug, focusKeyword.replace(/\s+/g, "-")),
    points:
      hasKeyword && containsKeyword(slug, focusKeyword.replace(/\s+/g, "-"))
        ? 10
        : 0,
    maxPoints: 10,
    tip: "URL-ul ar trebui să conțină keyword-ul (nu necesită modificare dacă slug-ul actual rankează deja).",
  });

  checks.push({
    id: "kw_in_first_paragraph",
    category: "critical",
    label: "Focus keyword în primul paragraf",
    description:
      "Primele 100 cuvinte semnalează contextul — keyword-ul trebuie să apară aici.",
    passed: hasKeyword && containsKeyword(firstPara, focusKeyword),
    points: hasKeyword && containsKeyword(firstPara, focusKeyword) ? 10 : 0,
    maxPoints: 10,
    tip: "Menționează keyword-ul în primul paragraf al descrierii.",
  });

  checks.push({
    id: "kw_in_content_min_3",
    category: "critical",
    label: "Focus keyword folosit min. 3 ori",
    description: "Repetiția naturală întărește relevanța semantică.",
    passed: occurrences >= 3,
    points: occurrences >= 3 ? 10 : 0,
    maxPoints: 10,
    tip:
      occurrences === 0
        ? "Keyword-ul nu apare în conținut. Adaugă-l de cel puțin 3 ori."
        : "Mai sunt necesare " + (3 - occurrences) + " apariții pentru scor maxim.",
  });

  // ═══════════════════════════════════════════════════════════
  // IMPORTANT — 40 pct total (8 × 5)
  // ═══════════════════════════════════════════════════════════

  const titleLen = seoTitle.length;
  checks.push({
    id: "title_length",
    category: "important",
    label: "SEO title — lungime (30-60 caractere)",
    description:
      "Google afișează aproximativ 60 caractere. Peste — se taie. Sub 30 — irosești spațiu valoros.",
    passed: titleLen >= 30 && titleLen <= 60,
    points: titleLen >= 30 && titleLen <= 60 ? 5 : 0,
    maxPoints: 5,
    tip:
      titleLen < 30
        ? "Title e prea scurt (" + titleLen + "). Adaugă beneficii sau modificatori."
        : titleLen > 60
          ? "Title e prea lung (" + titleLen + "). Scurtează la max 60 caractere."
          : "Lungime optimă.",
  });

  const descLen = seoDescription.length;
  checks.push({
    id: "description_length",
    category: "important",
    label: "Meta description — lungime (120-160)",
    description:
      "Google afișează 155-160 caractere. Sub 120 irosești spațiu de vânzare.",
    passed: descLen >= 120 && descLen <= 160,
    points: descLen >= 120 && descLen <= 160 ? 5 : 0,
    maxPoints: 5,
    tip:
      descLen < 120
        ? "Prea scurtă (" + descLen + "). Adaugă beneficii + CTA."
        : descLen > 160
          ? "Prea lungă (" + descLen + "). Se va trunchia în SERP."
          : "Lungime optimă.",
  });

  const slugLen = slug.length;
  checks.push({
    id: "slug_length",
    category: "important",
    label: "Slug sub 75 caractere",
    description: "Slug-urile scurte rankează și sunt mai ușor de partajat.",
    passed: slugLen > 0 && slugLen <= 75,
    points: slugLen > 0 && slugLen <= 75 ? 5 : 0,
    maxPoints: 5,
    tip:
      slugLen > 75
        ? "Slug lung (" + slugLen + "). Scurtează eliminând cuvinte auxiliare."
        : "OK",
  });

  // Keyword at start of title = first 5 words
  const titleStartsWithKw = (() => {
    if (!hasKeyword) return false;
    const firstWords = normalize(seoTitle).split(/\s+/).slice(0, 5).join(" ");
    return firstWords.includes(normalize(focusKeyword));
  })();
  checks.push({
    id: "kw_at_title_start",
    category: "important",
    label: "Keyword la începutul titlu",
    description:
      "Google pondează mai mult keyword-urile din primele 5 cuvinte ale titlu.",
    passed: titleStartsWithKw,
    points: titleStartsWithKw ? 5 : 0,
    maxPoints: 5,
    tip: "Mută keyword-ul cât mai aproape de începutul titlu.",
  });

  const kwInHeading = hasKeyword && keywordInHeading(content, focusKeyword);
  checks.push({
    id: "kw_in_h2",
    category: "important",
    label: "Keyword într-un subtitlu (H2/H3)",
    description:
      "Subtitlurile semnalează structura — keyword-ul aici întărește relevanța.",
    passed: kwInHeading,
    points: kwInHeading ? 5 : 0,
    maxPoints: 5,
    tip: "Adaugă un subtitlu (ex: ## Avantajele " + focusKeyword + ").",
  });

  checks.push({
    id: "kw_density",
    category: "important",
    label: "Densitate keyword (0.5-2.5%)",
    description:
      "Prea puțin (<0.5%) sau prea mult (>2.5%) sunt ambele penalizate. Actual: " +
      density.toFixed(2) +
      "%.",
    passed: density >= 0.5 && density <= 2.5,
    points: density >= 0.5 && density <= 2.5 ? 5 : 0,
    maxPoints: 5,
    tip:
      density < 0.5
        ? "Folosește keyword-ul de mai multe ori natural."
        : density > 2.5
          ? "Keyword stuffing detectat — redu repetițiile."
          : "OK",
  });

  // Has internal link: heuristic, look for "/produs/" / "/magazin" / "/service" / markdown links
  const hasInternalLink =
    input.hasInternalLink !== undefined
      ? input.hasInternalLink
      : /\/(?:produs|magazin|service|materiale-utile|finantare|noutati)/.test(
          content
        ) || /\[[^\]]+\]\(\/[^)]+\)/.test(content);
  checks.push({
    id: "has_internal_link",
    category: "important",
    label: "Link intern către altă pagină",
    description:
      "Link-urile interne distribuie autoritatea între pagini și îmbunătățesc crawl-ul.",
    passed: hasInternalLink,
    points: hasInternalLink ? 5 : 0,
    maxPoints: 5,
    tip: "Adaugă un link către un produs complementar sau pagină de serviciu.",
  });

  const hasImageAlt = !!input.image && input.image.length > 0;
  checks.push({
    id: "has_image_with_alt",
    category: "important",
    label: "Imagine asociată produsului",
    description:
      "Imaginile sunt esențiale pentru B2B — clienții vor să vadă echipamentul.",
    passed: hasImageAlt,
    points: hasImageAlt ? 5 : 0,
    maxPoints: 5,
    tip: "Încarcă o imagine reprezentativă a produsului.",
  });

  // ═══════════════════════════════════════════════════════════
  // READABILITY — 15 pct total
  // ═══════════════════════════════════════════════════════════

  checks.push({
    id: "content_length",
    category: "readability",
    label: "Conținut peste 1000 cuvinte",
    description:
      "Pentru B2B tehnic, conținutul lung convertește mai bine. Actual: " +
      wordCount +
      " cuvinte.",
    passed: wordCount >= 1000,
    points: wordCount >= 1000 ? 3 : 0,
    maxPoints: 3,
    tip:
      wordCount < 1000
        ? "Adaugă secțiuni: aplicații, specificații, FAQ, avantaje."
        : "OK",
  });

  checks.push({
    id: "has_subheadings",
    category: "readability",
    label: "Cel puțin 2 subtitluri",
    description:
      "Subtitlurile rup textul și ajută utilizatorii să scaneze conținutul. Actual: " +
      (h2 + h3) +
      ".",
    passed: h2 + h3 >= 2,
    points: h2 + h3 >= 2 ? 3 : 0,
    maxPoints: 3,
    tip: "Structurează conținutul în secțiuni cu subtitluri H2/H3.",
  });

  checks.push({
    id: "paragraph_length",
    category: "readability",
    label: "Paragrafe scurte (sub 150 cuvinte)",
    description:
      "Paragrafele scurte cresc lizibilitatea mobile. Medie actuală: " +
      avgPara +
      " cuvinte.",
    passed: avgPara > 0 && avgPara <= 150,
    points: avgPara > 0 && avgPara <= 150 ? 3 : 0,
    maxPoints: 3,
    tip:
      avgPara > 150
        ? "Sparge paragrafele lungi în mai multe."
        : "OK",
  });

  const readability = fleschReadingEaseRO(content);
  checks.push({
    id: "flesch_reading_ease",
    category: "readability",
    label: "Lizibilitate (Flesch 40-70)",
    description:
      "Pentru public B2B tehnic țintim 40-70 (standard-dificil). Actual: " +
      readability +
      ".",
    passed: readability >= 40 && readability <= 70,
    points: readability >= 40 && readability <= 70 ? 3 : 0,
    maxPoints: 3,
    tip:
      readability < 40
        ? "Text prea complex. Propoziții mai scurte, cuvinte mai simple."
        : readability > 70
          ? "Text prea simplu pentru B2B. Folosește terminologie tehnică."
          : "OK",
  });

  const hasSchema = input.hasSchema !== false; // default true for our products
  checks.push({
    id: "has_schema",
    category: "readability",
    label: "Schema.org structured data",
    description: "Product schema activă — rich results eligibil.",
    passed: hasSchema,
    points: hasSchema ? 3 : 0,
    maxPoints: 3,
    tip: "Schema e generată automat în Next.js — ar trebui să fie activă.",
  });

  // ═══════════════════════════════════════════════════════════
  // BONUS — 5 pct total (5 × 1)
  // ═══════════════════════════════════════════════════════════

  const hasNumber = /\d/.test(seoTitle);
  checks.push({
    id: "number_in_title",
    category: "bonus",
    label: "Număr în titlu",
    description:
      'Numerele cresc CTR cu 15-20% (ex: "5 axe", "60 luni garanție").',
    passed: hasNumber,
    points: hasNumber ? 1 : 0,
    maxPoints: 1,
    tip: "Adaugă un număr relevant (capacitate, ani garanție, etc).",
  });

  const hasPower = hasPowerWord(seoTitle);
  checks.push({
    id: "power_word_in_title",
    category: "bonus",
    label: "Power word în titlu",
    description: "Cuvinte ca profesional, industrial, premium cresc CTR.",
    passed: hasPower,
    points: hasPower ? 1 : 0,
    maxPoints: 1,
    tip: 'Adaugă un cuvânt puternic (ex: "profesional", "industrial").',
  });

  const descCTA = hasCTA(seoDescription);
  checks.push({
    id: "cta_in_description",
    category: "bonus",
    label: "CTA în meta description",
    description:
      "Chemare la acțiune crește CTR (ex: cere, descoperă, solicită).",
    passed: descCTA,
    points: descCTA ? 2 : 0,
    maxPoints: 2,
    tip: 'Adaugă un CTA (ex: "Cere ofertă personalizată").',
  });

  const hasCanonical = input.hasCanonical !== false; // default true (Next.js metadata)
  checks.push({
    id: "has_canonical",
    category: "bonus",
    label: "Canonical URL setat",
    description: "Previne duplicate content. Auto-gestionat de Next.js.",
    passed: hasCanonical,
    points: hasCanonical ? 1 : 0,
    maxPoints: 1,
    tip: "Canonical e setat automat — ar trebui să fie activ.",
  });

  return checks;
}

/**
 * Calculează scorul în funcție de categorie.
 */
function computeCategoryScores(
  checks: SEOCheck[]
): Record<SEOCheckCategory, { score: number; max: number }> {
  const cats: SEOCheckCategory[] = [
    "critical",
    "important",
    "readability",
    "bonus",
  ];
  const result = {} as Record<SEOCheckCategory, { score: number; max: number }>;
  for (const cat of cats) {
    const catChecks = checks.filter((c) => c.category === cat);
    result[cat] = {
      score: catChecks.reduce((s, c) => s + c.points, 0),
      max: catChecks.reduce((s, c) => s + c.maxPoints, 0),
    };
  }
  return result;
}

/**
 * Verdict vizual în funcție de scor.
 */
function computeVerdict(score: number): {
  verdict: SEOVerdict;
  color: string;
} {
  if (score >= 90) return { verdict: "excellent", color: "#10b981" };
  if (score >= 75) return { verdict: "good", color: "#65a30d" };
  if (score >= 50) return { verdict: "needs-work", color: "#f59e0b" };
  return { verdict: "poor", color: "#ef4444" };
}

/**
 * Funcția principală — analizează un input SEO și returnează analiza completă.
 */
export function analyzeSEO(input: SEOInput): SEOAnalysis {
  const checks = buildChecks(input);
  const rawScore = checks.reduce((s, c) => s + c.points, 0);
  const maxScore = checks.reduce((s, c) => s + c.maxPoints, 0);
  const score = Math.round((rawScore / maxScore) * 100);
  const categoryScores = computeCategoryScores(checks);
  const { verdict, color } = computeVerdict(score);

  const readability = fleschReadingEaseRO(input.content);
  const readabilityGrade =
    readability >= 70
      ? "ușor"
      : readability >= 50
        ? "standard"
        : readability >= 30
          ? "dificil"
          : "foarte dificil";

  const density = keywordDensity(input.content, input.focusKeyword);
  const wordCount = countWords(input.content);

  return {
    score,
    rawScore,
    maxScore,
    categoryScores,
    checks,
    verdict,
    verdictColor: color,
    readabilityGrade,
    keywordDensity: Math.round(density * 100) / 100,
    wordCount,
  };
}

/**
 * Auto-suggest keyword din numele produsului și categorie.
 * Heuristic: ia cuvintele cheie din nume, elimină stopwords.
 */
export function suggestKeyword(name: string, category?: string): string[] {
  const stopwords = new Set([
    "de",
    "la",
    "cu",
    "pe",
    "si",
    "pentru",
    "din",
    "in",
    "un",
    "o",
    "al",
    "ale",
    "a",
  ]);
  const tokens = name
    .toLowerCase()
    .replace(/[^\p{L}\s\d]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !stopwords.has(w));

  const suggestions: string[] = [];
  if (tokens.length >= 2) {
    suggestions.push(tokens.slice(0, 3).join(" "));
    suggestions.push(tokens.slice(0, 2).join(" "));
  }
  if (tokens.length >= 1) {
    suggestions.push(tokens[0]);
  }
  if (category) {
    suggestions.push(
      category.toLowerCase() + " " + (tokens[0] || "")
    );
  }
  return [...new Set(suggestions)].filter(Boolean).slice(0, 4);
}
