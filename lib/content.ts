import { prisma } from "./db";

/**
 * Fetch a content block by key. Returns null if DB unavailable or block missing.
 * Components must always provide a hardcoded fallback so the site keeps working
 * if the database is empty/unreachable.
 */
export async function getContent<T = unknown>(key: string): Promise<T | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const row = await prisma.contentBlock.findUnique({ where: { key } });
    return (row?.data as T) ?? null;
  } catch (err) {
    console.error(`[content] failed to load "${key}":`, err);
    return null;
  }
}

/** Fetch many keys in a single round trip. */
export async function getContents(
  keys: string[]
): Promise<Record<string, unknown>> {
  if (!process.env.DATABASE_URL) return {};
  try {
    const rows = await prisma.contentBlock.findMany({
      where: { key: { in: keys } },
    });
    return Object.fromEntries(rows.map((r) => [r.key, r.data]));
  } catch (err) {
    console.error(`[content] failed to load batch:`, err);
    return {};
  }
}

export const CONTENT_KEYS = [
  "hero",
  "authority",
  "case_studies_home",
  "case_studies_all",
  "certifications",
  "video_gallery",
  "testimonials",
  "catalog_tabs",
  "news",
  "solutions",
  "qa",
  "contact_cta",
  "footer",
  "header",
  "team",
  "service",
  "cariere",
] as const;

export type ContentKey = (typeof CONTENT_KEYS)[number];

export const KEY_LABELS: Record<string, string> = {
  hero: "Hero (titlu, subtitlu, CTA)",
  authority: "Authority strip",
  case_studies_home: "Studii de caz — carusel home",
  case_studies_all: "Studii de caz — pagina /studii-de-caz",
  certifications: "Certificări",
  video_gallery: "Galerie video",
  testimonials: "Testimoniale",
  catalog_tabs: "Catalog (home tabs)",
  news: "Noutăți & comunicări",
  solutions: "Soluții pe industrie",
  qa: "Întrebări frecvente",
  contact_cta: "Contact CTA",
  footer: "Footer",
  header: "Header / meniu",
  team: "Echipa",
  service: "Pagina Service",
  cariere: "Pagina Cariere",
};
