import type { MetadataRoute } from "next";

/**
 * robots.txt for uzinex.ro
 *
 * Allows Googlebot / Bingbot / other reputable crawlers.
 * Blocks:
 *   - /api/*      — serverless endpoints
 *   - /admin/*    — admin panel (requires auth anyway)
 *   - /cont/*     — client account pages (personal data)
 *   - /autentificare, /inregistrare — auth forms (no SEO value)
 *   - *?cat=, *?sub= — faceted filter URLs (avoid duplicate content)
 */

const BASE = "https://uzinex-next.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/cont",
          "/cont/",
          "/autentificare",
          "/inregistrare",
          "/*?cat=",
          "/*?sub=",
          "/*?cat=*",
          "/*?sub=*",
        ],
      },
      // Explicit rule for AI/LLM crawlers — allow them (they drive referral traffic)
      {
        userAgent: ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/api/", "/admin/", "/cont", "/autentificare", "/inregistrare"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
