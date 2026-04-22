/* eslint-disable no-console */
/**
 * One-shot dump: extract top 4 specs for every product in the catalog, write
 * them to a compact file that I (Claude) can read and transform into
 * benefit-framed titles. Not part of the build.
 */
import productsData from "../data/produse.json" with { type: "json" };
import type { Product } from "../app/magazin/products";
import { extractTopSpecs } from "../lib/product-specs";
import { writeFileSync } from "node:fs";

const products = productsData as unknown as Product[];

type SpecOut = { icon: string; title: string; value: string };
type Row = {
  slug: string;
  name: string;
  category?: string;
  subcategory?: string;
  subSubcategory?: string;
  specs: SpecOut[];
};

const out: Row[] = [];
for (const p of products) {
  const specs =
    p.specs && p.specs.length > 0
      ? p.specs.slice(0, 4).map((s) => ({
          icon: s.icon,
          title: s.title,
          value: s.value,
        }))
      : extractTopSpecs(p.descriptionBlocks, 4).map((s) => ({
          icon: s.icon,
          title: s.title,
          value: s.value,
        }));
  out.push({
    slug: p.slug,
    name: p.name,
    category: p.category,
    subcategory: p.subcategory,
    subSubcategory: p.subSubcategory,
    specs,
  });
}

writeFileSync(
  "data/specs-dump.json",
  JSON.stringify(out, null, 2),
  "utf8"
);
console.log(
  "Wrote",
  out.length,
  "products →",
  "data/specs-dump.json. Total specs:",
  out.reduce((n, r) => n + r.specs.length, 0)
);
