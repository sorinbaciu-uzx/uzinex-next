/* eslint-disable no-console */
/**
 * Measure how many products have peers in the catalog, at each taxonomy
 * depth — input for designing related-products coverage.
 */
import productsData from "../data/produse.json" with { type: "json" };

type Product = {
  slug: string;
  name: string;
  category?: string;
  subcategory?: string;
  subSubcategory?: string;
};

const products = productsData as unknown as Product[];
const MIN_NAME_LEN = 15;

let usableAsTarget = 0;
let tight = 0; // has ≥1 peer in same subSubcategory (with linkable name)
let mid = 0; // has ≥1 in same subcategory (excl self, excl tight)
let loose = 0; // has ≥1 in same category (excl self, excl tight/mid)
let orphan = 0;

const orphanExamples: string[] = [];

for (const p of products) {
  if (p.name.length >= MIN_NAME_LEN) usableAsTarget++;

  const peers = products.filter(
    (q) => q.slug !== p.slug && q.name.length >= MIN_NAME_LEN
  );
  const sameSubSub = peers.filter(
    (q) =>
      p.subSubcategory && q.subSubcategory && q.subSubcategory === p.subSubcategory
  );
  const sameSub = peers.filter(
    (q) => p.subcategory && q.subcategory && q.subcategory === p.subcategory
  );
  const sameCat = peers.filter(
    (q) => p.category && q.category && q.category === p.category
  );

  if (sameSubSub.length > 0) tight++;
  else if (sameSub.length > 0) mid++;
  else if (sameCat.length > 0) loose++;
  else {
    orphan++;
    if (orphanExamples.length < 10) orphanExamples.push(p.slug);
  }
}

console.log("Total produse:                            ", products.length);
console.log("Cu nume ≥ " + MIN_NAME_LEN + " caractere (targetable):    ", usableAsTarget);
console.log();
console.log("Nivel de vecinătate cel mai apropiat:");
console.log("  tight  (same subSubcategory): ", String(tight).padStart(4));
console.log("  mid    (same subcategory):    ", String(mid).padStart(4));
console.log("  loose  (same category only):  ", String(loose).padStart(4));
console.log("  orphan (no peers):            ", String(orphan).padStart(4));
console.log();
if (orphanExamples.length > 0) {
  console.log("Produse orphan (fara vecini):");
  for (const s of orphanExamples) {
    const p = products.find((x) => x.slug === s);
    console.log(
      "  /produs/" + s + "   [" + (p?.category ?? "?") + " / " + (p?.subcategory ?? "?") + " / " + (p?.subSubcategory ?? "?") + "]"
    );
  }
}

console.log();
console.log("Categorii unice:");
const cats = new Map<string, number>();
for (const p of products) if (p.category) cats.set(p.category, (cats.get(p.category) ?? 0) + 1);
for (const [c, n] of [...cats.entries()].sort((a, b) => b[1] - a[1])) {
  console.log("  " + String(n).padStart(4) + "  " + c);
}
