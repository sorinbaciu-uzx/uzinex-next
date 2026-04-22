// Pentru produsele cu `image` gol dar `gallery` populat → setează `image` = prima poză din gallery.
// Nu atinge produsele care au deja `image` setat.

import fs from "node:fs";

const JSON_PATH = "data/produse.json";
const products = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));

let updated = 0;
const stillEmpty = [];

for (const p of products) {
  const hasImage = p.image && p.image.trim();
  const firstGalleryImg = Array.isArray(p.gallery)
    ? p.gallery.find((it) => it?.type === "image" && it.url)
    : null;

  if (!hasImage && firstGalleryImg) {
    p.image = firstGalleryImg.url;
    if (!p.imageAlt && firstGalleryImg.alt) p.imageAlt = firstGalleryImg.alt;
    updated++;
  } else if (!hasImage && !firstGalleryImg) {
    stillEmpty.push(p.slug + " | " + p.name);
  }
}

fs.writeFileSync(JSON_PATH, JSON.stringify(products, null, 2) + "\n");

console.log("Produse cu image setat nou (din gallery):", updated);
console.log("Produse rămase fără image (și fără gallery):", stillEmpty.length);
if (stillEmpty.length) stillEmpty.forEach((s) => console.log("  -", s));
console.log("\n✅ Scris în", JSON_PATH);
