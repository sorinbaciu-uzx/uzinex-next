import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PRODUSE_PATH = path.join(ROOT, "data", "produse.json");
const ENRICH_PATH = path.join(ROOT, "data", "product-enrichments.json");

// 1) Get deleted + added image filenames in public/images/produse from git status
const status = execSync("git status --porcelain public/images/produse", { encoding: "utf8" });
const deleted = [];
const added = [];
for (const line of status.split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed) continue;
  const xy = line.slice(0, 2);
  const file = line.slice(3).trim();
  const name = path.basename(file);
  if (xy.includes("D")) deleted.push(name);
  else if (xy.includes("?") || xy.includes("A")) added.push(name);
}
console.log(`[fix-refs] deleted=${deleted.length}, added=${added.length}`);

// 2) Build basename → newFile mapping (basename = filename without extension, lowercase)
const baseOf = (n) => n.replace(/\.[^.]+$/, "").toLowerCase();
const addedByBase = new Map();
for (const a of added) addedByBase.set(baseOf(a), a);

const mapping = new Map(); // deletedName -> newName | null (orphan)
for (const d of deleted) {
  const repl = addedByBase.get(baseOf(d));
  mapping.set(d, repl || null);
}

const replacedCount = [...mapping.values()].filter((v) => v !== null).length;
const orphanCount = [...mapping.values()].filter((v) => v === null).length;
console.log(`[fix-refs] replacements=${replacedCount}, orphans=${orphanCount}`);

// 3) Process produse.json
const produse = JSON.parse(readFileSync(PRODUSE_PATH, "utf8"));
const URL_RE = /\/images\/produse\/([^"'\s)]+)/;

const stats = { imageReplaced: 0, imageCleared: 0, galleryReplaced: 0, galleryRemoved: 0 };

for (const p of produse) {
  // image (string) — main product image
  if (typeof p.image === "string") {
    const m = p.image.match(URL_RE);
    if (m) {
      const fname = m[1];
      if (mapping.has(fname)) {
        const repl = mapping.get(fname);
        if (repl) {
          p.image = `/images/produse/${repl}`;
          stats.imageReplaced++;
        } else {
          p.image = "";
          stats.imageCleared++;
        }
      }
    }
  }
  // gallery (array of {type, url, alt})
  if (Array.isArray(p.gallery)) {
    const newGallery = [];
    for (const item of p.gallery) {
      if (item && typeof item.url === "string") {
        const m = item.url.match(URL_RE);
        if (m) {
          const fname = m[1];
          if (mapping.has(fname)) {
            const repl = mapping.get(fname);
            if (repl) {
              newGallery.push({ ...item, url: `/images/produse/${repl}` });
              stats.galleryReplaced++;
              continue;
            } else {
              stats.galleryRemoved++;
              continue; // drop
            }
          }
        }
      }
      newGallery.push(item);
    }
    p.gallery = newGallery;
  }
}

writeFileSync(PRODUSE_PATH, JSON.stringify(produse, null, 2) + "\n");
console.log(`[fix-refs] produse.json: imageReplaced=${stats.imageReplaced} imageCleared=${stats.imageCleared} galleryReplaced=${stats.galleryReplaced} galleryRemoved=${stats.galleryRemoved}`);

// 4) Process product-enrichments.json — has blocks with {type:"image", data:{src}}
const enrich = JSON.parse(readFileSync(ENRICH_PATH, "utf8"));
const enrichStats = { replaced: 0, removed: 0 };

for (const slug of Object.keys(enrich)) {
  const blocks = enrich[slug];
  if (!Array.isArray(blocks)) continue;
  const newBlocks = [];
  for (const b of blocks) {
    if (b?.type === "image" && b.data && typeof b.data.src === "string") {
      const m = b.data.src.match(URL_RE);
      if (m) {
        const fname = m[1];
        if (mapping.has(fname)) {
          const repl = mapping.get(fname);
          if (repl) {
            newBlocks.push({ ...b, data: { ...b.data, src: `/images/produse/${repl}` } });
            enrichStats.replaced++;
            continue;
          } else {
            enrichStats.removed++;
            continue;
          }
        }
      }
    }
    newBlocks.push(b);
  }
  enrich[slug] = newBlocks;
}

writeFileSync(ENRICH_PATH, JSON.stringify(enrich, null, 2) + "\n");
console.log(`[fix-refs] product-enrichments.json: replaced=${enrichStats.replaced} removed=${enrichStats.removed}`);

console.log("[fix-refs] done.");
