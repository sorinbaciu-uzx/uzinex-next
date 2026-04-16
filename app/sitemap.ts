import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/app/magazin/products";
import { NEWS_DEFAULT } from "@/components/NewsSection";

/**
 * Dynamic sitemap for uzinex.ro
 *
 * Single sitemap, regenerated on each deploy + on-demand revalidation.
 * Covers ~225 URLs: homepage, static pages, 184 products, 10 news articles,
 * 6 Industry 4.0 directions, service/finanțare sub-pages.
 *
 * Excludes: /api, /admin, /autentificare, /inregistrare, /cont (auth/utility pages)
 * Excludes: /magazin?cat=... filter URLs (same page, different query params)
 */

const BASE = "https://uzinex-next.vercel.app";

// Industry 4.0 directions — hardcoded to avoid circular import from page.tsx
const INDUSTRY_40_SLUGS = [
  "iiot-monitorizare",
  "robotica-colaborativa",
  "mentenanta-predictiva",
  "inspectie-optica",
  "edge-computing-mes",
  "software-industrial",
];

// Romanian legal/policy pages
const POLICY_PAGES = [
  "politica-anti-mita-coruptie",
  "politica-calitate",
  "politica-confidentialitate",
  "politica-cookies",
  "politica-egalitate-sanse",
  "politica-livrare",
  "politica-mediu",
  "politica-retur",
  "politica-sclavie-moderna",
  "termeni-conditii",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ─── HOMEPAGE & ROOT ───
  const root: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          ro: BASE,
          en: `${BASE}/en`,
        },
      },
    },
  ];

  // ─── TOP-LEVEL STATIC PAGES ───
  const topPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/magazin`, priority: 0.9, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/contact`, priority: 0.9, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/cariere`, priority: 0.8, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/studii-de-caz`, priority: 0.8, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/echipa`, priority: 0.6, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/noutati`, priority: 0.8, changeFrequency: "weekly" as const, lastModified: now },
    { url: `${BASE}/materiale-utile`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: now },
    { url: `${BASE}/oferta`, priority: 0.7, changeFrequency: "weekly" as const, lastModified: now },
  ];

  // ─── SERVICE HUB + SUB-PAGES ───
  const servicePages: MetadataRoute.Sitemap = [
    `${BASE}/service`,
    `${BASE}/service/inclus-la-livrare`,
    `${BASE}/service/abonamente`,
    `${BASE}/service/manual-ai`,
  ].map((url) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ─── FINANȚARE HUB + SUB-PAGES ───
  const finantarePages: MetadataRoute.Sitemap = [
    `${BASE}/finantare/credite-leasing`,
    `${BASE}/finantare/credit-furnizor`,
    `${BASE}/finantare/europeana-guvernamentala`,
  ].map((url) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ─── INDUSTRY 4.0 HUB + 6 DIRECTIONS ───
  const industry40Pages: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/industry-4.0`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...INDUSTRY_40_SLUGS.map((slug) => ({
      url: `${BASE}/industry-4.0/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // ─── PRODUCTS (184) ───
  const productPages: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${BASE}/produs/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // ─── NEWS ARTICLES (10) ───
  const newsArticles = (NEWS_DEFAULT.articles as { slug: string; date?: string }[]) ?? [];
  const newsPages: MetadataRoute.Sitemap = newsArticles.map((a) => ({
    url: `${BASE}/noutati/${a.slug}`,
    // News date is usually a year string like "2026"; fall back to now if unparseable.
    lastModified: a.date && /^\d{4}/.test(a.date) ? new Date(`${a.date}-01-01`) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // ─── POLICIES ───
  const policyPages: MetadataRoute.Sitemap = POLICY_PAGES.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  }));

  return [
    ...root,
    ...topPages,
    ...servicePages,
    ...finantarePages,
    ...industry40Pages,
    ...productPages,
    ...newsPages,
    ...policyPages,
  ];
}
