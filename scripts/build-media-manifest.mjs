import { readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MEDIA_DIR = path.join(ROOT, "public", "images", "produse");
const OUT_FILE = path.join(ROOT, "data", "media-manifest.json");
const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".avif"]);

let entries = [];
try {
  entries = readdirSync(MEDIA_DIR)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      let size = 0;
      try {
        size = statSync(path.join(MEDIA_DIR, name)).size;
      } catch {}
      return { name, url: `/images/produse/${name}`, size };
    });
} catch (err) {
  console.warn(`[media-manifest] folderul ${MEDIA_DIR} nu exista — scriu manifest gol.`);
}

mkdirSync(path.dirname(OUT_FILE), { recursive: true });
writeFileSync(OUT_FILE, JSON.stringify(entries, null, 2));
console.log(`[media-manifest] scrise ${entries.length} intrari in ${path.relative(ROOT, OUT_FILE)}`);
