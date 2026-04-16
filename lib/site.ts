/**
 * Central site URL configuration.
 *
 * Single source of truth for the canonical origin. Used by:
 *   - app/layout.tsx         (metadataBase, OpenGraph, JSON-LD)
 *   - app/en/layout.tsx      (canonical + hreflang alternates)
 *   - app/sitemap.ts         (all URL entries)
 *   - app/robots.ts          (sitemap URL + host directive)
 *
 * Set `NEXT_PUBLIC_SITE_URL` in Vercel env vars to override per environment.
 * Fallback keeps local dev + preview builds working without configuration.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.uzinex.ro";
