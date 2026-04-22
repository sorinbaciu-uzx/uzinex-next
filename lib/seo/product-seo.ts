/**
 * Product SEO merge layer.
 *
 * Strategie: produsele din data/produse.json rămân imutabile (sursa de bază).
 * Edit-urile SEO se salvează în Prisma ContentBlock cu key "seo:product:<slug>"
 * sau "seo:page:<key>". La runtime, le merge cu datele de bază.
 *
 * Aceasta permite:
 * - Zero risc de corupere a fișierului JSON
 * - Compatibilitate cu Vercel serverless (filesystem e ephemeral)
 * - Versionare completă în Git pentru datele de bază
 * - Flexibilitate editare per-field fără re-generare import
 */

import { prisma } from "@/lib/db";
import { PRODUCTS, type Product } from "@/app/magazin/products";
import type { MediaItem } from "@/lib/media";
import type { ProductSpec } from "@/lib/product-specs";
import {
  flattenDescriptionBlocks,
} from "./text-utils";
import { analyzeSEO, suggestKeyword } from "./analyzer";
import type { SEOAnalysis } from "./types";

/**
 * Product override stored in DB ContentBlock.data.
 * Acoperă TOATE câmpurile editabile — admin-ul poate edita complet produsul,
 * nu doar SEO. Fișa de bază rămâne în JSON ca safety net.
 *
 * Numele legacy "SEOOverride" e păstrat ca alias pentru compatibilitate.
 */
export type ProductOverride = {
  // Basic fields
  name?: string;
  shortSpec?: string;
  image?: string; // main hero image (Vercel Blob URL sau extern)
  /** Alt text pentru imaginea principală (SEO + a11y). Default: numele produsului. */
  imageAlt?: string;
  /** Galerie media — 0-8 items: imagini (Vercel Blob) + YouTube embeds */
  gallery?: MediaItem[];
  datasheetUrl?: string;
  category?: string;
  subcategory?: string;
  subSubcategory?: string;

  // Description
  description?: string;
  descriptionBlocks?: Array<
    | { type: "paragraph"; text: string }
    | { type: "table"; rows: string[][] }
  >;

  /**
   * Custom specs highlight pentru hero (4 items max).
   * Dacă lipsesc, se extrag automat din descriptionBlocks.
   */
  specs?: ProductSpec[];

  // ─── Pricing (opțional — dacă lipsește, se afișează doar "Cere ofertă") ───
  priceFrom?: number;
  priceCurrency?: "EUR" | "RON" | "USD";
  priceIncludesVAT?: boolean;
  priceNote?: string;

  // SEO fields
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;

  // Tracking
  updatedAt?: string;
  updatedBy?: string;
  scoreAtSave?: number;
  history?: Array<{
    date: string;
    score: number;
    updatedBy?: string;
  }>;
};

/** Alias legacy. */
export type SEOOverride = ProductOverride;

/**
 * Compute the DB key for a product's SEO override.
 */
export function productSeoKey(slug: string): string {
  return "seo:product:" + slug;
}

export function pageSeoKey(pageKey: string): string {
  return "seo:page:" + pageKey;
}

/**
 * Get a product by slug, with ALL overrides merged from DB.
 * If no override exists, returns the product as-is from JSON.
 */
export async function getProductWithSEO(slug: string): Promise<{
  product: Product;
  override?: ProductOverride;
}> {
  const base = PRODUCTS.find((p) => p.slug === slug);
  if (!base) throw new Error("Product not found: " + slug);

  const block = await prisma.contentBlock.findUnique({
    where: { key: productSeoKey(slug) },
  });
  const override = (block?.data as ProductOverride | null) || undefined;

  if (!override) return { product: base };

  return { product: mergeProductWithOverride(base, override), override };
}

/**
 * Sync version — for sync contexts where we've already fetched the override.
 * Merge TOATE câmpurile editabile: basic + description + SEO.
 */
export function mergeProductWithOverride(
  base: Product,
  override?: ProductOverride
): Product {
  if (!override) return base;
  return {
    ...base,
    // Basic
    name: override.name ?? base.name,
    shortSpec: override.shortSpec ?? base.shortSpec,
    image: override.image ?? base.image,
    imageAlt: override.imageAlt ?? base.imageAlt,
    gallery: override.gallery ?? base.gallery,
    datasheetUrl: override.datasheetUrl ?? base.datasheetUrl,
    category: override.category ?? base.category,
    subcategory: override.subcategory ?? base.subcategory,
    subSubcategory: override.subSubcategory ?? base.subSubcategory,
    // Description
    description: override.description ?? base.description,
    descriptionBlocks: override.descriptionBlocks ?? base.descriptionBlocks,
    specs: override.specs ?? base.specs,
    // Pricing
    priceFrom: override.priceFrom ?? base.priceFrom,
    priceCurrency: override.priceCurrency ?? base.priceCurrency,
    priceIncludesVAT: override.priceIncludesVAT ?? base.priceIncludesVAT,
    priceNote: override.priceNote ?? base.priceNote,
    // SEO
    seoTitle: override.seoTitle ?? base.seoTitle,
    seoDescription: override.seoDescription ?? base.seoDescription,
    focusKeyword: override.focusKeyword ?? base.focusKeyword,
  };
}

/**
 * Fetch all product overrides in one DB call (pentru dashboard).
 * Returnează un map slug → override.
 */
export async function getAllProductOverrides(): Promise<
  Record<string, ProductOverride>
> {
  const blocks = await prisma.contentBlock.findMany({
    where: {
      key: { startsWith: "seo:product:" },
    },
  });
  const map: Record<string, ProductOverride> = {};
  for (const b of blocks) {
    const slug = b.key.replace(/^seo:product:/, "");
    map[slug] = b.data as ProductOverride;
  }
  return map;
}

/**
 * Analizează un produs complet (cu override aplicat).
 */
export function analyzeProduct(product: Product): SEOAnalysis {
  return analyzeSEO({
    focusKeyword: product.focusKeyword || "",
    seoTitle: product.seoTitle || product.name,
    seoDescription: product.seoDescription || product.shortSpec,
    slug: product.slug,
    content: product.description,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    image: product.image,
    sku: product.sku,
    hasSchema: true, // all products have Product schema via Next.js
    hasCanonical: true, // Next.js metadata auto-generates canonical
  });
}

/**
 * Analizează toate produsele — returnează lista cu scor și meta.
 */
export async function analyzeAllProducts(): Promise<
  Array<{
    slug: string;
    name: string;
    category: string;
    subcategory?: string;
    score: number;
    verdict: string;
    focusKeyword: string;
    hasImage: boolean;
    hasOverride: boolean;
    updatedAt?: string;
    criticalFails: number;
  }>
> {
  const overrides = await getAllProductOverrides();
  const results = PRODUCTS.map((p) => {
    const ov = overrides[p.slug];
    const merged = mergeProductWithOverride(p, ov);
    const analysis = analyzeProduct(merged);
    const criticalFails = analysis.checks.filter(
      (c) => c.category === "critical" && !c.passed
    ).length;
    return {
      slug: p.slug,
      name: merged.name,
      category: merged.category,
      subcategory: merged.subcategory,
      score: analysis.score,
      verdict: analysis.verdict,
      focusKeyword: merged.focusKeyword,
      hasImage: !!merged.image,
      hasOverride: !!ov,
      updatedAt: ov?.updatedAt,
      criticalFails,
    };
  });
  return results;
}

/**
 * Salvează override pentru un produs (orice câmp editabil).
 * Auto-calculează scorul SEO și-l adaugă în history.
 */
export async function saveProductSEO(
  slug: string,
  patch: Partial<ProductOverride>,
  updatedBy?: string
): Promise<{ override: ProductOverride; analysis: SEOAnalysis }> {
  const base = PRODUCTS.find((p) => p.slug === slug);
  if (!base) throw new Error("Product not found: " + slug);

  const existing = await prisma.contentBlock.findUnique({
    where: { key: productSeoKey(slug) },
  });
  const prevOverride = (existing?.data as ProductOverride | null) || {};

  // Merge patches
  const nextOverride: ProductOverride = {
    ...prevOverride,
    ...patch,
  };

  // Calculate score after merge
  const merged = mergeProductWithOverride(base, nextOverride);
  const analysis = analyzeProduct(merged);

  // Update history (keep last 20 entries)
  const history = prevOverride.history || [];
  history.push({
    date: new Date().toISOString(),
    score: analysis.score,
    updatedBy,
  });
  nextOverride.history = history.slice(-20);
  nextOverride.updatedAt = new Date().toISOString();
  nextOverride.updatedBy = updatedBy;
  nextOverride.scoreAtSave = analysis.score;

  await prisma.contentBlock.upsert({
    where: { key: productSeoKey(slug) },
    create: { key: productSeoKey(slug), data: nextOverride as object },
    update: { data: nextOverride as object },
  });

  return { override: nextOverride, analysis };
}

/**
 * Auto-suggest keywords pentru un produs.
 */
export function suggestKeywordForProduct(product: Product): string[] {
  return suggestKeyword(product.name, product.category);
}

/**
 * Lista paginilor editabile SEO (non-produs).
 * Acestea sunt definite static în site — SEO-ul lor vine din Metadata export.
 */
export const EDITABLE_PAGES: Array<{
  key: string;
  path: string;
  name: string;
  category: string;
}> = [
  { key: "home", path: "/", name: "Pagină principală", category: "Principal" },
  { key: "magazin", path: "/magazin", name: "Catalog tehnic", category: "Principal" },
  { key: "contact", path: "/contact", name: "Contact", category: "Principal" },
  { key: "service", path: "/service", name: "Service overview", category: "Service" },
  {
    key: "service_inclus",
    path: "/service/inclus-la-livrare",
    name: "Service inclus la livrare",
    category: "Service",
  },
  {
    key: "service_abonamente",
    path: "/service/abonamente",
    name: "Abonamente Service",
    category: "Service",
  },
  {
    key: "service_manual_ai",
    path: "/service/manual-ai",
    name: "Manual AI",
    category: "Service",
  },
  {
    key: "materiale_utile",
    path: "/materiale-utile",
    name: "Materiale utile (48 video)",
    category: "Resurse",
  },
  {
    key: "studii_caz",
    path: "/studii-de-caz",
    name: "Studii de caz",
    category: "Resurse",
  },
  { key: "noutati", path: "/noutati", name: "Noutăți", category: "Resurse" },
  { key: "cariere", path: "/cariere", name: "Cariere", category: "Principal" },
  { key: "oferta", path: "/oferta", name: "Solicită ofertă", category: "Principal" },
  { key: "echipa", path: "/echipa", name: "Echipă", category: "Principal" },
  {
    key: "industry40",
    path: "/industry-4.0",
    name: "Industry 4.0",
    category: "Resurse",
  },
  {
    key: "finantare_credit",
    path: "/finantare/credit-furnizor",
    name: "Credit furnizor",
    category: "Finanțare",
  },
  {
    key: "finantare_leasing",
    path: "/finantare/credite-leasing",
    name: "Credite & leasing",
    category: "Finanțare",
  },
  {
    key: "finantare_eu",
    path: "/finantare/europeana-guvernamentala",
    name: "Finanțare europeană",
    category: "Finanțare",
  },
];
