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
    brand: {
      "@type": "Brand",
      name: p.brand || "Uzinex",
    },
    // We don't publish public prices (B2B quote-based), but we can still
    // mark availability so Google knows the product is live.
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/produs/${p.slug}`,
      priceCurrency: "RON",
      // Schema.org allows omitting price for "Request for quote" B2B.
      // Use PriceSpecification with a hint instead.
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: ORG_REF,
      areaServed: { "@type": "Country", name: "Romania" },
      businessFunction: "https://purl.org/goodrelations/v1#Sell",
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
