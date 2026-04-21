/**
 * Types pentru motorul SEO custom (Rank Math style, Romanian-first).
 * Folosit de admin panel + API + component-ele de display.
 */

export type SEOCheckId =
  // Critical (50 pct total)
  | "kw_in_title"
  | "kw_in_description"
  | "kw_in_slug"
  | "kw_in_first_paragraph"
  | "kw_in_content_min_3"
  // Important (40 pct total)
  | "title_length"
  | "description_length"
  | "slug_length"
  | "kw_at_title_start"
  | "kw_in_h2"
  | "kw_density"
  | "has_internal_link"
  | "has_image_with_alt"
  // Readability & content (15 pct total)
  | "content_length"
  | "has_subheadings"
  | "paragraph_length"
  | "flesch_reading_ease"
  | "has_schema"
  // Bonus meta (5 pct total)
  | "number_in_title"
  | "power_word_in_title"
  | "cta_in_description"
  | "has_canonical";

export type SEOCheckCategory = "critical" | "important" | "readability" | "bonus";

export type SEOCheck = {
  id: SEOCheckId;
  category: SEOCheckCategory;
  label: string;
  description: string;
  passed: boolean;
  points: number;
  maxPoints: number;
  tip?: string; // actionable advice to fix
};

export type SEOVerdict = "excellent" | "good" | "needs-work" | "poor";

export type SEOAnalysis = {
  score: number; // 0-100 normalized
  rawScore: number; // sum of points earned
  maxScore: number; // total possible points
  categoryScores: Record<SEOCheckCategory, { score: number; max: number }>;
  checks: SEOCheck[];
  verdict: SEOVerdict;
  verdictColor: string; // hex for UI
  readabilityGrade?: string;
  keywordDensity?: number;
  wordCount?: number;
};

export type SEOInput = {
  focusKeyword: string;
  seoTitle: string;
  seoDescription: string;
  slug: string;
  content: string;
  name?: string;
  category?: string;
  subcategory?: string;
  image?: string;
  sku?: string;
  // optional flags from page context
  hasInternalLink?: boolean;
  hasExternalLink?: boolean;
  hasSchema?: boolean;
  hasCanonical?: boolean;
};

/**
 * Extended product type with SEO override applied.
 * Produs din JSON + override din DB (ContentBlock).
 */
export type ProductWithSEO = {
  slug: string;
  name: string;
  sku: string;
  category: string;
  subcategory?: string;
  image: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  // Metadata de tracking
  seoUpdatedAt?: string; // ISO
  seoHistory?: Array<{
    date: string;
    score: number;
    updatedBy?: string;
  }>;
};
