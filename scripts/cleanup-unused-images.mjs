// Șterge imaginile din public/images/produse/ care NU sunt referențiate în data/produse.json
// Păstrează DOAR fișierele active (câmpul `image` + toate MediaItem-urile din `gallery`).
//
// Usage:
//   node scripts/cleanup-unused-images.mjs           # dry-run (listează, nu șterge)
//   node scripts/cleanup-unused-images.mjs --delete  # șterge efectiv

import fs from "node:fs";
import path from "node:path";

const DIR = "public/images/produse";
const PUBLIC_PREFIX = "/images/produse/";
const DELETE = process.argv.includes("--delete");

const products = JSON.parse(fs.readFileSync("data/produse.json", "utf8"));

// --- Set of referenced filenames ----------------------------------------

const referenced = new Set();

function addRef(publicPath) {
  if (!publicPath || typeof publicPath !== "string") return;
  if (!publicPath.startsWith(PUBLIC_PREFIX)) return; // ignoră URL-uri externe / alte foldere
  const fname = publicPath.slice(PUBLIC_PREFIX.length);
  if (fname) referenced.add(fname);
}

for (const p of products) {
  if (p.image) addRef(p.image);
  if (Array.isArray(p.gallery)) {
    for (const item of p.gallery) {
      if (item?.type === "image" && item.url) addRef(item.url);
    }
  }
}

console.log("Fișiere referențiate în produse.json:", referenced.size);

// --- Scan actual folder --------------------------------------------------

const allFiles = fs.readdirSync(DIR);
console.log("Fișiere totale în", DIR + ":", allFiles.length);

const toDelete = [];
const toKeep = [];
for (const f of allFiles) {
  const full = path.join(DIR, f);
  const stat = fs.statSync(full);
  if (!stat.isFile()) continue; // sare peste subfoldere
  if (referenced.has(f)) toKeep.push(f);
  else toDelete.push({ name: f, size: stat.size });
}

const totalSize = toDelete.reduce((s, x) => s + x.size, 0);
const mb = (b) => (b / 1024 / 1024).toFixed(1) + " MB";

console.log("\n=== CLEANUP PLAN ===");
console.log("De păstrat (referențiate):", toKeep.length);
console.log("De șters (neutilizate):   ", toDelete.length);
console.log("Spațiu eliberat:          ", mb(totalSize));

// Sanity: verifică fișiere referențiate care nu există pe disc
const missing = [];
for (const f of referenced) if (!allFiles.includes(f)) missing.push(f);
if (missing.length) {
  console.log("\n⚠  Fișiere referențiate DAR LIPSĂ pe disc:", missing.length);
  missing.slice(0, 10).forEach((m) => console.log("   -", m));
  if (missing.length > 10) console.log(`   ... și încă ${missing.length - 10}`);
}

// --- Delete --------------------------------------------------------------

if (DELETE) {
  let deleted = 0;
  let errors = 0;
  for (const { name } of toDelete) {
    try {
      fs.unlinkSync(path.join(DIR, name));
      deleted++;
    } catch (e) {
      errors++;
      console.error("Eroare ștergere", name, e.message);
    }
  }
  console.log(`\n✅ Șterse: ${deleted} fișiere`);
  if (errors) console.log(`⚠  Erori: ${errors}`);
} else {
  console.log(
    "\n(dry-run — niciun fișier nu a fost șters. Rulează din nou cu --delete pentru a șterge.)"
  );
}
