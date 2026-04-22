/* eslint-disable no-console */
/**
 * One-shot audit of how many internal links the linkify function produces
 * across every product description. Run: `npx tsx scripts/audit-links.ts`.
 * Not part of the build — safe to keep around for future pattern tuning.
 *
 * Measures two tiers separately:
 *   1. Global targets (service / finantare / industry-4.0 / etc)
 *   2. Product-to-product targets (this product description mentions
 *      another product by full name)
 */
import { linkify, buildProductTargets } from "../lib/internal-links";
import productsData from "../data/produse.json" with { type: "json" };

type Block =
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

type Product = {
  slug: string;
  name: string;
  category?: string;
  subcategory?: string;
  subSubcategory?: string;
  descriptionBlocks?: Block[];
};

const products = productsData as unknown as Product[];

let withAnyLink = 0;
let withProductLink = 0;
let totalGlobal = 0;
let totalProduct = 0;

const perGlobalHref = new Map<string, number>();
const perProductHref = new Map<string, number>();

// For a gut-check: report a few concrete examples of product-to-product links.
const examples: Array<{ source: string; paragraph: string; href: string; anchor: string }> = [];
const MAX_PRODUCT_LINKS_PER_PAGE = 3;

for (const p of products) {
  const seen = new Set<string>();
  const here = "/produs/" + p.slug;
  const blocks = p.descriptionBlocks ?? [];
  const extraTargets = buildProductTargets(p.slug, products, p);

  let n = 0;
  let nProd = 0;
  for (const b of blocks) {
    if (b.type !== "paragraph") continue;
    const segs = linkify(b.text, seen, {
      currentPath: here,
      extraTargets,
      maxProductLinksPerPage: MAX_PRODUCT_LINKS_PER_PAGE,
    });
    for (const s of segs) {
      if (typeof s === "string") continue;
      n++;
      const isProduct = s.href.startsWith("/produs/");
      if (isProduct) {
        nProd++;
        totalProduct++;
        perProductHref.set(s.href, (perProductHref.get(s.href) ?? 0) + 1);
        if (examples.length < 8) {
          examples.push({
            source: p.slug,
            paragraph: b.text.slice(0, 120) + (b.text.length > 120 ? "…" : ""),
            href: s.href,
            anchor: s.text,
          });
        }
      } else {
        totalGlobal++;
        perGlobalHref.set(s.href, (perGlobalHref.get(s.href) ?? 0) + 1);
      }
    }
  }
  if (n > 0) withAnyLink++;
  if (nProd > 0) withProductLink++;
}

console.log("═══════════ SCOPE ═══════════");
console.log("Produse totale:                 ", products.length);
console.log("Cu ≥1 link (orice tip):          ", withAnyLink);
console.log("Cu ≥1 link produs→produs:        ", withProductLink);
console.log();
console.log("═══════════ LINK-URI GLOBALE ═══════════");
console.log("Total:          ", totalGlobal);
console.log(
  "Medie / produs: ",
  (totalGlobal / products.length).toFixed(2)
);
console.log("\nTop href-uri globale:");
for (const [h, n] of [...perGlobalHref.entries()].sort((a, b) => b[1] - a[1])) {
  console.log("  " + String(n).padStart(4) + "  " + h);
}

console.log();
console.log("═══════════ LINK-URI PRODUS → PRODUS ═══════════");
console.log("Total:          ", totalProduct);
console.log(
  "Medie / produs: ",
  (totalProduct / products.length).toFixed(2)
);
console.log("Cap per pagină: ", MAX_PRODUCT_LINKS_PER_PAGE);
console.log("Cu ≥1 link primit (ca target):  ", perProductHref.size);
console.log("\nTop produse-țintă (cele mai linkuite):");
const topTargets = [...perProductHref.entries()]
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20);
for (const [h, n] of topTargets) {
  console.log("  " + String(n).padStart(4) + "  " + h);
}

if (examples.length > 0) {
  console.log();
  console.log("═══════════ EXEMPLE PRODUS → PRODUS ═══════════");
  for (const ex of examples) {
    console.log("\n/produs/" + ex.source);
    console.log("  …" + ex.paragraph);
    console.log("  anchor «" + ex.anchor + "»  →  " + ex.href);
  }
}
