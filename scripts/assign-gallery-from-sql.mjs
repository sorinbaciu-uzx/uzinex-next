// Asignează galeria de imagini la produse pe baza dump-ului SQL din WordPress.
// Reguli:
//   - Parsează rândurile INSERT INTO p VALUES(...) din SQL
//   - Ignoră rândurile cu URL .png (PNG-urile au fost șterse de pe disc)
//   - Grupează imaginile pe product_id
//   - Match nume produs (col. 2) cu data/produse.json (match exact pe `name`)
//   - Pentru fiecare .webp: verifică existența în public/images/produse/
//   - Adaugă maxim 8 imagini în gallery (NU schimbă `image` principală)
//
// Usage:
//   node scripts/assign-gallery-from-sql.mjs           # dry-run (raport, nu scrie)
//   node scripts/assign-gallery-from-sql.mjs --write   # scrie în data/produse.json

import fs from "node:fs";
import path from "node:path";

const SQL_PATH = "C:/Users/mirudiva/Downloads/imagecode sql.sql";
const JSON_PATH = "data/produse.json";
const IMAGES_DIR = "public/images/produse";
const MAX_GALLERY = 8;
const WRITE = process.argv.includes("--write");

// --- Parse SQL ------------------------------------------------------------

const sql = fs.readFileSync(SQL_PATH, "utf8");
const re =
  /INSERT INTO p VALUES\((\d+),\s*'((?:[^'\\]|\\.)*)',\s*(\d+),\s*'((?:[^'\\]|\\.)*)',\s*'((?:[^'\\]|\\.)*)',\s*'([^']+)'\);/g;

const rows = [];
let m;
while ((m = re.exec(sql))) {
  rows.push({
    pid: +m[1],
    pname: m[2].replace(/\\'/g, "'"),
    iid: +m[3],
    friendly: m[4].replace(/\\'/g, "'"),
    url: m[5],
    mime: m[6],
  });
}
console.log(`SQL rows parsed: ${rows.length}`);

// --- Filter: all image types (webp + jpg + jpeg + png) ---

const ACCEPTED_EXT = new Set(["webp", "jpg", "jpeg", "png"]);

const getExt = (url) => url.toLowerCase().split(".").pop();

const acceptedRows = rows.filter((r) => ACCEPTED_EXT.has(getExt(r.url)));
const otherRows = rows.filter((r) => !ACCEPTED_EXT.has(getExt(r.url)));
console.log(
  `  acceptate (webp/jpg/png): ${acceptedRows.length}  |  alte (svg/pdf): ${otherRows.length}`
);

// --- Group by product_id, sort each group by image_id ASC ---------------

const byProduct = new Map();
for (const r of acceptedRows) {
  if (!byProduct.has(r.pid)) byProduct.set(r.pid, { pname: r.pname, imgs: [] });
  byProduct.get(r.pid).imgs.push(r);
}
for (const g of byProduct.values()) g.imgs.sort((a, b) => a.iid - b.iid);

// --- Load products -------------------------------------------------------

const products = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const byName = new Map(products.map((p) => [p.name, p]));

// --- Load local images directory listing --------------------------------

const localFiles = new Set(fs.readdirSync(IMAGES_DIR));
console.log(`Fișiere locale în ${IMAGES_DIR}: ${localFiles.size}`);

// --- Assign gallery per product -----------------------------------------

const report = {
  totalProducts: products.length,
  productsInSQL: byProduct.size,
  matchedProducts: 0,
  unmatchedNames: [],
  productsUpdated: 0,
  productsSkippedNoWebpLocal: [],
  missingFiles: [],
  galleryCounts: [],
  capped: [],
};

let updated = 0;

for (const [pid, group] of byProduct) {
  const product = byName.get(group.pname);
  if (!product) {
    report.unmatchedNames.push(`[${pid}] ${group.pname} (${group.imgs.length} webp)`);
    continue;
  }
  report.matchedProducts++;

  // Build gallery — prefer .webp over original extension for same basename
  const gallery = [];
  const seenBase = new Set(); // evită duplicate când SQL listează același asset cu extensii diferite
  for (const img of group.imgs) {
    const origName = path.basename(img.url); // ex: Foo.png
    const base = origName.replace(/\.[^.]+$/, ""); // ex: Foo
    if (seenBase.has(base)) continue;

    // preferință: webp > extensia originală > alte extensii comune
    const candidates = [`${base}.webp`, origName, `${base}.jpg`, `${base}.jpeg`, `${base}.png`];
    const chosen = candidates.find((c) => localFiles.has(c));
    if (!chosen) {
      report.missingFiles.push(`${group.pname} → ${origName} (+ nici .webp)`);
      continue;
    }
    seenBase.add(base);
    gallery.push({
      type: "image",
      url: `/images/produse/${chosen}`,
      alt: img.friendly || product.name,
    });
  }

  if (gallery.length === 0) {
    report.productsSkippedNoWebpLocal.push(
      `${group.pname} (${group.imgs.length} webp/jpg în SQL, 0 găsite local)`
    );
    continue;
  }

  if (gallery.length > MAX_GALLERY) {
    report.capped.push(`${group.pname}: ${gallery.length} → ${MAX_GALLERY}`);
    gallery.length = MAX_GALLERY;
  }

  product.gallery = gallery;
  report.galleryCounts.push(gallery.length);
  updated++;
}

report.productsUpdated = updated;

// --- Print report --------------------------------------------------------

console.log("\n=== RAPORT ===");
console.log(`Produse site: ${report.totalProducts}`);
console.log(`Produse cu poze webp în SQL: ${report.productsInSQL}`);
console.log(`Produse matchate (name exact): ${report.matchedProducts}`);
console.log(`Produse updatate cu gallery: ${report.productsUpdated}`);

if (report.galleryCounts.length) {
  const sum = report.galleryCounts.reduce((a, b) => a + b, 0);
  console.log(
    `  Poze alocate: total ${sum} | min ${Math.min(...report.galleryCounts)} | max ${Math.max(...report.galleryCounts)} | avg ${Math.round(sum / report.galleryCounts.length)}`
  );
}

if (report.capped.length) {
  console.log(`\nCap aplicat la ${MAX_GALLERY} (produse cu >${MAX_GALLERY} webp):`);
  report.capped.forEach((l) => console.log("  -", l));
}

if (report.productsSkippedNoWebpLocal.length) {
  console.log(`\nProduse SĂRITE (0 fișiere webp găsite local): ${report.productsSkippedNoWebpLocal.length}`);
  report.productsSkippedNoWebpLocal.slice(0, 20).forEach((l) => console.log("  -", l));
  if (report.productsSkippedNoWebpLocal.length > 20)
    console.log(`  ... și încă ${report.productsSkippedNoWebpLocal.length - 20}`);
}

if (report.missingFiles.length) {
  console.log(`\nFișiere webp REFERENȚIATE în SQL dar LIPSĂ local: ${report.missingFiles.length}`);
  report.missingFiles.slice(0, 30).forEach((l) => console.log("  -", l));
  if (report.missingFiles.length > 30)
    console.log(`  ... și încă ${report.missingFiles.length - 30}`);
}

if (report.unmatchedNames.length) {
  console.log(`\nProduse din SQL care NU matchează niciun produs site: ${report.unmatchedNames.length}`);
  report.unmatchedNames.slice(0, 20).forEach((l) => console.log("  -", l));
  if (report.unmatchedNames.length > 20)
    console.log(`  ... și încă ${report.unmatchedNames.length - 20}`);
}

const productsWithoutGallery = products.filter((p) => !p.gallery || p.gallery.length === 0);
console.log(
  `\nProduse FĂRĂ gallery după asignare: ${productsWithoutGallery.length} / ${products.length}`
);

// --- Write ---------------------------------------------------------------

if (WRITE) {
  fs.writeFileSync(JSON_PATH, JSON.stringify(products, null, 2) + "\n");
  console.log(`\n✅ Scris în ${JSON_PATH}`);
} else {
  console.log(`\n(dry-run — niciun fișier nu a fost modificat. Rulează din nou cu --write pentru a salva.)`);
}
