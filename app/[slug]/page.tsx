import { permanentRedirect } from "next/navigation";
import { PRODUCTS } from "@/app/magazin/products";

export const dynamic = "force-dynamic";

/**
 * Catch-all pentru URL-uri vechi WP la root-level care NU există în
 * catalogul curent (ex: produse renumite/scoase).
 *
 * Strategie:
 * 1. Exact match → 301 la /produs/[slug]
 * 2. Fuzzy token overlap ≥ 0.5 → 301 la cel mai apropiat produs
 * 3. Fuzzy ≥ 0.3 → 301 la /magazin (cu indicii despre ce caută)
 * 4. Altfel → 301 la /magazin simplu
 *
 * Runtime impact: doar pentru slug-uri la root-level care nu sunt
 * redirecționate explicit în next.config.ts sau rute statice.
 * Rutele statice (contact, magazin, service, etc.) au prioritate.
 */
export default async function LegacySlugCatchAll({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Exact match (safety — ar fi prins deja de redirects în next.config.ts)
  if (PRODUCTS.some((p) => p.slug === slug)) {
    permanentRedirect(`/produs/${slug}`);
  }

  // Extract tokens
  const tokenize = (s: string): Set<string> =>
    new Set(
      s
        .toLowerCase()
        .split("-")
        .filter((t) => t.length >= 3)
    );
  const queryTokens = tokenize(slug);

  if (queryTokens.size === 0) {
    permanentRedirect("/magazin");
  }

  // Find best fuzzy match across all products
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const p of PRODUCTS) {
    const pTokens = tokenize(p.slug);
    const common = [...queryTokens].filter((t) => pTokens.has(t)).length;
    const score = common / queryTokens.size;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = p.slug;
    }
  }

  // Strong match — redirect direct la acel produs
  if (bestMatch && bestScore >= 0.5) {
    permanentRedirect(`/produs/${bestMatch}`);
  }

  // Weak match — du utilizatorul la catalog
  permanentRedirect("/magazin");
}
