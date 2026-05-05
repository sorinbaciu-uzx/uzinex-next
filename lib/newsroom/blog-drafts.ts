// Loader for blog article drafts produced by the uzinex-blog-article skill.
// Drafts live as 3 files per article in data/blog-drafts/:
//   <slug>.html         — rendered article body (semantic HTML)
//   <slug>.schema.json  — JSON-LD @graph (Article + FAQPage + BreadcrumbList)
//   <slug>.meta.json    — metadata (title, format, audience, sources, validation, ...)
//
// Used by /admin/newsroom/blog-drafts/* admin-only viewer pages.

import fs from "node:fs";
import path from "node:path";

const DRAFTS_DIR = path.join(process.cwd(), "data", "blog-drafts");

export type BlogDraftMeta = {
  slug: string;
  version?: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  lang: string;
  publishedAt: string;
  updatedAt: string;
  wordCount: number;
  readingTimeMinutes: number;
  format: "pillar" | "comparativ" | "faq";
  vertical: string;
  audience: string;
  audienceSecondary?: string;
  tone?: string;
  angle?: string;
  fanOut?: string[];
  ctaCount?: number;
  author: { name: string; jobTitle: string; linkedin: string; email: string };
  newsroomInsightId?: number | null;
  primarySources: string[];
  entitiesUsed?: Record<string, unknown>;
  validation?: Record<string, unknown>;
  images?: Array<{ src: string; alt: string; width: number; height: number; type?: string }>;
};

export type BlogDraft = {
  slug: string;
  meta: BlogDraftMeta;
  html: string;
  schema: unknown;
  fileBaseName: string; // includes -v2 etc.
};

function safeReadJson<T>(p: string): T | null {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as T;
  } catch {
    return null;
  }
}

function safeReadText(p: string): string | null {
  try {
    return fs.readFileSync(p, "utf8");
  } catch {
    return null;
  }
}

/**
 * List every draft set in data/blog-drafts/.
 * A "set" is detected by presence of a .meta.json file.
 * Returns ordered by updatedAt descending (newest first).
 */
export function listBlogDrafts(): BlogDraft[] {
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(DRAFTS_DIR);
  } catch {
    return [];
  }

  const drafts: BlogDraft[] = [];
  for (const file of entries) {
    if (!file.endsWith(".meta.json")) continue;
    const fileBaseName = file.replace(/\.meta\.json$/, "");
    const metaPath = path.join(DRAFTS_DIR, file);
    const htmlPath = path.join(DRAFTS_DIR, `${fileBaseName}.html`);
    const schemaPath = path.join(DRAFTS_DIR, `${fileBaseName}.schema.json`);

    const meta = safeReadJson<BlogDraftMeta>(metaPath);
    const html = safeReadText(htmlPath);
    const schema = safeReadJson<unknown>(schemaPath);
    if (!meta || !html) continue;

    drafts.push({
      slug: meta.slug ?? fileBaseName,
      meta,
      html,
      schema,
      fileBaseName,
    });
  }

  drafts.sort((a, b) => {
    const ta = new Date(a.meta.updatedAt || a.meta.publishedAt || 0).getTime();
    const tb = new Date(b.meta.updatedAt || b.meta.publishedAt || 0).getTime();
    return tb - ta;
  });
  return drafts;
}

/**
 * Load a single draft by file base name (with optional -v2 etc. suffix).
 * If `slug` matches multiple versions (e.g. foo and foo-v2), prefers latest by updatedAt.
 */
export function loadBlogDraft(fileBaseNameOrSlug: string): BlogDraft | null {
  // Try exact file base name first
  const direct: BlogDraft | undefined = listBlogDrafts().find(
    (d) => d.fileBaseName === fileBaseNameOrSlug,
  );
  if (direct) return direct;

  // Fallback: latest version with matching slug
  const matches = listBlogDrafts().filter((d) => d.slug === fileBaseNameOrSlug);
  return matches[0] ?? null; // already sorted desc
}

/**
 * Group drafts by slug — used by the list page to show all versions of the
 * same article together (v1, v2, v3, etc.).
 */
export function groupBlogDraftsBySlug(): Map<string, BlogDraft[]> {
  const grouped = new Map<string, BlogDraft[]>();
  for (const d of listBlogDrafts()) {
    const arr = grouped.get(d.slug) ?? [];
    arr.push(d);
    grouped.set(d.slug, arr);
  }
  return grouped;
}
