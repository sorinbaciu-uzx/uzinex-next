// Renames all product images to <SKU>-<N>.webp pattern.
// Step 1: Clean broken refs from JSON
// Step 2: Convert/copy/download to new filenames in public/images/produse/
// Step 3: Update produse.json + DB overrides + OfertaClient.tsx
// Old originals are NOT auto-deleted — user will identify them manually (filenames without SKU prefix).

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { PrismaClient } from "@prisma/client";

const PRODUSE_DIR = "public/images/produse";
const JSON_PATH = "data/produse.json";

const products = JSON.parse(fs.readFileSync(JSON_PATH, "utf8"));
const prisma = new PrismaClient();

const blocks = await prisma.contentBlock.findMany({
  where: { key: { startsWith: "seo:product:" } },
});
const overrides = {};
for (const b of blocks) overrides[b.key.replace(/^seo:product:/, "")] = b.data;

// ── Step 1: Clean broken refs from JSON (UZX-151 → 2 missing PNGs) ────────────
const BROKEN_FILES = new Set([
  "Gemini_Generated_Image_phbci3phbci3phbc.png",
  "Gemini_Generated_Image_pharx4pharx4phar-1.png",
]);
let brokenCleaned = 0;
for (const p of products) {
  if (!p.gallery) continue;
  const before = p.gallery.length;
  p.gallery = p.gallery.filter((g) => {
    const u = g.url || g.src || "";
    const fname = u.split("/").pop();
    return !BROKEN_FILES.has(fname);
  });
  if (p.gallery.length !== before) brokenCleaned++;
}
console.log("Step 1: Cleaned broken refs from", brokenCleaned, "products");

// ── Step 2: Generate new files ────────────────────────────────────────────────
async function ensureWebp(srcPath, destPath) {
  const ext = path.extname(srcPath).toLowerCase();
  if (ext === ".webp") {
    fs.copyFileSync(srcPath, destPath);
    return { converted: false };
  }
  await sharp(srcPath).webp({ quality: 85 }).toFile(destPath);
  return { converted: true };
}

async function downloadBlob(url, destPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed download " + url + " status " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = path.extname(new URL(url).pathname).toLowerCase();
  if (ext === ".webp") {
    fs.writeFileSync(destPath, buf);
    return { converted: false };
  }
  await sharp(buf).webp({ quality: 85 }).toFile(destPath);
  return { converted: true };
}

const renameOps = [];
const errors = [];

for (const p of products) {
  const ov = overrides[p.slug];
  const effGallery = (ov && ov.gallery) ?? p.gallery ?? [];

  let n = 0;
  for (let i = 0; i < effGallery.length; i++) {
    const g = effGallery[i];
    if (g.type !== "image") continue;
    const url = g.url || g.src;
    if (!url) continue;
    n++;
    const newFilename = `${p.sku}-${n}.webp`;
    const newDestRel = `${PRODUSE_DIR}/${newFilename}`;
    const newUrl = `/images/produse/${newFilename}`;

    try {
      if (/^https?:\/\//.test(url)) {
        await downloadBlob(url, newDestRel);
        renameOps.push({ sku: p.sku, position: i, oldUrl: url, newUrl, type: "blob-download" });
      } else {
        const fname = url.replace(/^\/+/, "").split("/").pop();
        const srcPath = `${PRODUSE_DIR}/${fname}`;
        if (!fs.existsSync(srcPath)) {
          errors.push({ sku: p.sku, position: i, oldUrl: url, error: "source missing" });
          continue;
        }
        const r = await ensureWebp(srcPath, newDestRel);
        renameOps.push({ sku: p.sku, position: i, oldUrl: url, newUrl, type: r.converted ? "convert" : "copy" });
      }
    } catch (e) {
      errors.push({ sku: p.sku, position: i, oldUrl: url, error: e.message });
    }
  }
}

console.log("Step 2: Generated", renameOps.length, "new files");
const byType = renameOps.reduce((a, o) => ((a[o.type] = (a[o.type] || 0) + 1), a), {});
console.log("  by type:", byType);
if (errors.length) {
  console.log("  ERRORS:", errors.length);
  errors.slice(0, 10).forEach((e) => console.log("   -", e.sku, "pos", e.position, "→", e.error));
}

// ── Step 3a: Update produse.json ──────────────────────────────────────────────
// For products WITHOUT db.gallery override, gallery comes from JSON → update JSON.gallery
// For products WITH db.gallery override, gallery is shadowed but we still update JSON for safety
// Image field always = new gallery[0].url

for (const p of products) {
  const newItems = renameOps.filter((o) => o.sku === p.sku).sort((a, b) => a.position - b.position);
  if (!newItems.length) continue;
  const ov = overrides[p.slug];
  const galleryFromDb = !!(ov && ov.gallery);

  if (!galleryFromDb && p.gallery) {
    // Build new gallery items: keep alt + type, swap url
    const newGallery = [];
    let n = 0;
    for (const g of p.gallery) {
      if (g.type !== "image") {
        newGallery.push(g);
        continue;
      }
      const op = newItems[n];
      if (!op) {
        newGallery.push(g); // shouldn't happen
        continue;
      }
      newGallery.push({ ...g, url: op.newUrl });
      n++;
    }
    p.gallery = newGallery;
  }

  // Update image field to gallery[0].newUrl (always aligned)
  if (newItems[0]) p.image = newItems[0].newUrl;
}

fs.writeFileSync(JSON_PATH, JSON.stringify(products, null, 2) + "\n");
console.log("Step 3a: produse.json updated");

// ── Step 3b: Update DB overrides ──────────────────────────────────────────────
let dbUpdated = 0;
for (const slug in overrides) {
  const ov = overrides[slug];
  const product = products.find((p) => p.slug === slug);
  if (!product) continue;
  const newItems = renameOps.filter((o) => o.sku === product.sku).sort((a, b) => a.position - b.position);
  if (!newItems.length) continue;

  const newOv = { ...ov };
  let needsSave = false;

  if (ov.gallery) {
    const newGallery = [];
    let n = 0;
    for (const g of ov.gallery) {
      if (g.type !== "image") {
        newGallery.push(g);
        continue;
      }
      const op = newItems[n];
      if (!op) {
        newGallery.push(g);
        continue;
      }
      newGallery.push({ ...g, url: op.newUrl });
      n++;
    }
    newOv.gallery = newGallery;
    needsSave = true;
  }
  // Always align image to first new item
  if (newItems[0]) {
    newOv.image = newItems[0].newUrl;
    needsSave = true;
  }
  if (needsSave) {
    newOv.updatedAt = new Date().toISOString();
    newOv.updatedBy = "system:rename-to-sku";
    await prisma.contentBlock.update({
      where: { key: "seo:product:" + slug },
      data: { data: newOv },
    });
    dbUpdated++;
  }
}
console.log("Step 3b: DB overrides updated:", dbUpdated);

// ── Step 4: OfertaClient — move plastic-crusher and update ref ────────────────
const ofertaSrc = "public/products/plastic-crusher.webp";
const ofertaDest = "public/images/produse/plastic-crusher.webp";
if (fs.existsSync(ofertaSrc) && !fs.existsSync(ofertaDest)) {
  fs.copyFileSync(ofertaSrc, ofertaDest);
  console.log("Step 4: copied", ofertaSrc, "→", ofertaDest, "(old kept until you decide)");
} else if (fs.existsSync(ofertaDest)) {
  console.log("Step 4: dest already exists, skipping copy");
} else {
  console.log("Step 4: source missing");
}
const oc = "app/oferta/OfertaClient.tsx";
let ocContent = fs.readFileSync(oc, "utf8");
const before = ocContent;
ocContent = ocContent.replace('"/products/plastic-crusher.webp"', '"/images/produse/plastic-crusher.webp"');
if (ocContent !== before) {
  fs.writeFileSync(oc, ocContent);
  console.log("Step 4: OfertaClient.tsx ref updated");
} else {
  console.log("Step 4: OfertaClient.tsx — pattern not found (already updated?)");
}

await prisma.$disconnect();
console.log("\n=== DONE ===");
console.log("Total ops:", renameOps.length);
console.log("Errors:", errors.length);
console.log("\nFolosesc filenames-urile fara prefix UZX- pentru a identifica orfanii ramasi pe disk.");
