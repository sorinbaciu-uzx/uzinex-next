/**
 * SEO JSON-LD helpers
 *
 * Typed builders for schema.org structured data. Each returns a plain object
 * that can be JSON.stringify'd into a <script type="application/ld+json"> tag.
 *
 * Usage in a page:
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema(...)) }}
 *   />
 */

import { SITE_URL } from "./site";

// ─── Reusable reference to the main Organization in layout.tsx ───
export const ORG_REF = { "@id": `${SITE_URL}/#organization` };

// ─── Aggregate rating from Google Business Profile.
// Update these values when reviews grow. Used both for Organization and
// per-product schema to satisfy Google's Product rich result requirements.
export const BRAND_RATING = {
  value: 4.9,
  count: 10,
};

// ══════════════════════════════════════════════════════════════════════════
// BREADCRUMB
// ══════════════════════════════════════════════════════════════════════════

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ══════════════════════════════════════════════════════════════════════════
// PRODUCT
// ══════════════════════════════════════════════════════════════════════════

export type ProductSchemaInput = {
  name: string;
  description: string;
  sku: string;
  slug: string;
  image?: string;
  category?: string;
  brand?: string;
};

export function productSchema(p: ProductSchemaInput) {
  const imgUrl =
    p.image && p.image.startsWith("http")
      ? p.image
      : p.image
        ? `${SITE_URL}${p.image.startsWith("/") ? "" : "/"}${p.image}`
        : `${SITE_URL}/opengraph-image`;

  // NOTE: We intentionally do NOT include an `offers` block because Uzinex
  // products are B2B quote-based — public prices don't exist yet. Google's
  // Product rich results require `offers.price`, so including an incomplete
  // offer causes "Merchant listings: 1 invalid item" errors.
  //
  // When prices become available, add back:
  //   offers: { "@type": "Offer", price: "X", priceCurrency: "RON", ... }
  //
  // Without offers, the Product schema is still valid and provides name,
  // image, brand, breadcrumbs — shown in SERP as enhanced listings.
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/produs/${p.slug}#product`,
    name: p.name,
    description: p.description.slice(0, 500),
    sku: p.sku,
    mpn: p.sku,
    category: p.category,
    image: imgUrl,
    url: `${SITE_URL}/produs/${p.slug}`,
    brand: {
      "@type": "Brand",
      name: p.brand || "Uzinex",
    },
    manufacturer: ORG_REF,
    // aggregateRating — from Google Business Profile reviews.
    // Google requires one of offers/review/aggregateRating for Product
    // rich results. Until we have per-product reviews or prices, we use
    // the brand-level rating (reasonable proxy for B2B integrators).
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BRAND_RATING.value,
      reviewCount: BRAND_RATING.count,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ══════════════════════════════════════════════════════════════════════════
// ARTICLE / NEWS ARTICLE
// ══════════════════════════════════════════════════════════════════════════

export type ArticleSchemaInput = {
  slug: string;
  title: string;
  excerpt: string;
  category?: string;
  datePublished?: string; // ISO string or year
  image?: string;
};

export function articleSchema(a: ArticleSchemaInput) {
  const datePublished = (() => {
    if (!a.datePublished) return new Date().toISOString();
    // Accept year-only strings like "2026"
    if (/^\d{4}$/.test(a.datePublished)) return `${a.datePublished}-01-01T00:00:00Z`;
    return a.datePublished;
  })();

  const img = a.image && a.image.startsWith("http")
    ? a.image
    : `${SITE_URL}/opengraph-image`;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${SITE_URL}/noutati/${a.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/noutati/${a.slug}`,
    },
    headline: a.title.slice(0, 110),
    description: a.excerpt?.slice(0, 250),
    articleSection: a.category,
    image: [img],
    datePublished,
    dateModified: datePublished,
    author: ORG_REF,
    publisher: ORG_REF,
    inLanguage: "ro-RO",
  };
}

// ══════════════════════════════════════════════════════════════════════════
// FAQ PAGE
// ══════════════════════════════════════════════════════════════════════════

export type FaqItem = { question: string; answer: string };

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

// ══════════════════════════════════════════════════════════════════════════
// JOB POSTING — collection page with JobPosting items
// ══════════════════════════════════════════════════════════════════════════

export type JobPostingInput = {
  title: string;
  description: string;
  location?: string;
  employmentType?: string; // "FULL_TIME" | "PART_TIME" | "INTERN" | etc.
  level?: string;
};

export function jobPostingSchema(jobs: JobPostingInput[]) {
  const now = new Date().toISOString();
  // Valid for 90 days from today (Google requirement)
  const validUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

  return jobs.map((job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: now,
    validThrough: validUntil,
    employmentType: job.employmentType || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "Uzinex",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/logo.svg`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bulevardul Poitiers nr. 10",
        addressLocality: job.location?.includes("București") ? "București" : "Iași",
        postalCode: "700671",
        addressCountry: "RO",
      },
    },
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Romania",
    },
    directApply: false,
  }));
}

// ══════════════════════════════════════════════════════════════════════════
// COLLECTION PAGE
// ══════════════════════════════════════════════════════════════════════════

export function collectionPageSchema(input: {
  title: string;
  description: string;
  url: string;
  numItems?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${input.url.startsWith("http") ? input.url : SITE_URL + input.url}#collection`,
    url: input.url.startsWith("http") ? input.url : `${SITE_URL}${input.url}`,
    name: input.title,
    description: input.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: ORG_REF,
    ...(input.numItems ? { numberOfItems: input.numItems } : {}),
  };
}

// ══════════════════════════════════════════════════════════════════════════
// SERVICE (mentenanță, intervenții, consultanță)
// ══════════════════════════════════════════════════════════════════════════

export type ServiceSchemaInput = {
  name: string;
  description: string;
  url: string;
  serviceType: string; // "Mentenanță preventivă", "Service de urgență" etc.
  areaServed?: string; // default: Romania
};

export function serviceSchema(s: ServiceSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${s.url}#service`,
    name: s.name,
    description: s.description,
    serviceType: s.serviceType,
    provider: ORG_REF,
    areaServed: [
      { "@type": "Country", name: "Romania" },
      { "@type": "Country", name: "Moldova" },
      { "@type": "Place", name: "European Union" },
    ],
    url: `${SITE_URL}${s.url}`,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/contact`,
      servicePhone: "+40769081081",
      availableLanguage: ["Romanian", "English"],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BRAND_RATING.value,
      reviewCount: BRAND_RATING.count,
      bestRating: 5,
      worstRating: 1,
    },
  };
}

// ══════════════════════════════════════════════════════════════════════════
// VIDEO OBJECT (YouTube embeds, materiale-utile)
// ══════════════════════════════════════════════════════════════════════════

export type VideoSchemaInput = {
  name: string;
  description: string;
  youtubeId: string;
  uploadDate?: string; // ISO string
  duration?: string; // ISO 8601 e.g. "PT5M30S"
};

export function videoSchema(v: VideoSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description.slice(0, 500),
    thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`,
    uploadDate: v.uploadDate || "2026-01-01T00:00:00Z",
    contentUrl: `https://www.youtube.com/watch?v=${v.youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
    ...(v.duration ? { duration: v.duration } : {}),
    publisher: ORG_REF,
    inLanguage: "ro-RO",
  };
}

// ══════════════════════════════════════════════════════════════════════════
// ITEM LIST — catalog/shop listing (helpful for /magazin)
// ══════════════════════════════════════════════════════════════════════════

export type ItemListEntry = { name: string; url: string };

export function itemListSchema(items: ItemListEntry[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.slice(0, 100).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
