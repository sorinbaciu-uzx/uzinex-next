/* eslint-disable no-console */
/**
 * One-shot audit of how many internal links the linkify function produces
 * across every product description. Run: `npx tsx scripts/audit-links.mts`.
 * Not part of the build — safe to keep around for future pattern tuning.
 */
import { linkify } from "../lib/internal-links";
import productsData from "../data/produse.json" with { type: "json" };

type Block =
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

type Product = {
  slug: string;
  name: string;
  descriptionBlocks?: Block[];
};

const products = productsData as unknown as Product[];

let withLinks = 0;
let total = 0;
const perHref = new Map<string, number>();
const zeroLinkSamples: string[] = [];

for (const p of products) {
  const seen = new Set<string>();
  const here = "/produs/" + p.slug;
  const blocks = p.descriptionBlocks ?? [];
  let n = 0;
  for (const b of blocks) {
    if (b.type !== "paragraph") continue;
    const segs = linkify(b.text, seen, here);
    for (const s of segs) {
      if (typeof s !== "string") {
        n++;
        perHref.set(s.href, (perHref.get(s.href) ?? 0) + 1);
      }
    }
  }
  if (n > 0) withLinks++;
  else if (zeroLinkSamples.length < 5) zeroLinkSamples.push(p.slug);
  total += n;
}

console.log("Produse totale:         ", products.length);
console.log("Cu ≥1 link generat:     ", withLinks);
console.log("Fără niciun link:       ", products.length - withLinks);
console.log("Total link-uri:         ", total);
console.log(
  "Medie / produs (all):   ",
  (total / products.length).toFixed(2)
);
if (withLinks > 0) {
  console.log(
    "Medie / produs (cu linkuri): ",
    (total / withLinks).toFixed(2)
  );
}
console.log("\nTop href-uri:");
const sorted = [...perHref.entries()].sort((a, b) => b[1] - a[1]);
for (const [h, n] of sorted) console.log("  " + String(n).padStart(4) + "  " + h);

if (zeroLinkSamples.length > 0) {
  console.log("\nExemple de produse fără link-uri:");
  for (const s of zeroLinkSamples) console.log("  - /produs/" + s);
}
