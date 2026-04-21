// Generator XML data feed pentru Bizoo.ro
// Usage: node scripts/generate-bizoo-feed.mjs [output-path]
// Default output: uzinex-next/public/bizoo-feed.xml
// (servit live la https://www.uzinex.ro/bizoo-feed.xml după deploy)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_JSON = path.join(PROJECT, "data", "produse.json");
const OUTPUT_XML = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(PROJECT, "public", "bizoo-feed.xml");

const SITE_URL = "https://www.uzinex.ro";
const BRAND = "UZINEX";
const CURRENCY = "RON";

// --- Helpers ---

// Escapează ]]> în CDATA ca să nu închidă blocul prematur
function cdata(s) {
  const safe = stripControlChars(String(s ?? "")).replace(
    /\]\]>/g,
    "]]]]><![CDATA[>"
  );
  return `<![CDATA[${safe}]]>`;
}

// Elimină caracterele de control invalide în XML 1.0
function stripControlChars(s) {
  // Permise: \t (0x09), \n (0x0A), \r (0x0D); restul 0x00-0x1F interzise
  return s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

// Extrage ID numeric din SKU; fallback la hash determinist dacă n-are cifre
function numericId(sku, fallbackIndex) {
  const m = String(sku || "").match(/\d+/);
  if (m) return parseInt(m[0], 10);
  // fallback: hash din string -> numeric (stabil pentru același SKU)
  let h = 0;
  for (const ch of String(sku || `idx-${fallbackIndex}`)) {
    h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return h || fallbackIndex + 1;
}

// Concatenează category > subcategory > subSubcategory, sărind peste gol
function buildCategory(p) {
  return [p.category, p.subcategory, p.subSubcategory]
    .filter(Boolean)
    .join(" > ");
}

// URL absolut pentru imagine (sau null dacă nu există)
function buildPictureUrl(p) {
  if (!p.image) return null;
  const img = String(p.image).trim();
  if (!img) return null;
  if (/^https?:\/\//i.test(img)) return img;
  return `${SITE_URL}${img.startsWith("/") ? "" : "/"}${img}`;
}

// Construiește tag-ul details: descriere + eventual link la fișa tehnică
function buildDetails(p) {
  let details = p.description || p.shortSpec || "";
  if (p.datasheetUrl) {
    details += `\n\n<p><a href="${p.datasheetUrl}" target="_blank" rel="noopener">Descarcă fișa tehnică</a></p>`;
  }
  // Link canonic la pagina produsului pe uzinex.ro
  if (p.slug) {
    details += `\n\n<p>Vezi produsul pe <a href="${SITE_URL}/produs/${p.slug}" target="_blank" rel="noopener">uzinex.ro</a></p>`;
  }
  return details;
}

// Construiește XML-ul per produs
function buildProductXml(p, idx) {
  const id = numericId(p.sku, idx);
  const category = buildCategory(p);
  const picture = buildPictureUrl(p);

  const lines = [
    "  <product>",
    `    <id>${id}</id>`,
    `    <name>${cdata(p.name)}</name>`,
  ];

  if (category) {
    lines.push(`    <category>${cdata(category)}</category>`);
  }

  lines.push(
    `    <code>${cdata(p.sku || "")}</code>`,
    `    <brand>${cdata(BRAND)}</brand>`,
    `    <keywords>${cdata(p.focusKeyword || "")}</keywords>`,
    `    <price>0.00</price>`,
    `    <available>1</available>`,
    `    <canBeOrderedOnline>0</canBeOrderedOnline>`,
    `    <details>${cdata(buildDetails(p))}</details>`
  );

  if (picture) {
    lines.push(
      "    <pictures>",
      `      <picture>${cdata(picture)}</picture>`,
      "    </pictures>"
    );
  }

  lines.push(`    <currency>${CURRENCY}</currency>`, "  </product>");

  return lines.join("\n");
}

// --- Main ---

function main() {
  console.log(`→ Citesc ${INPUT_JSON}`);
  const raw = fs.readFileSync(INPUT_JSON, "utf8");
  const products = JSON.parse(raw);

  if (!Array.isArray(products)) {
    throw new Error("produse.json nu este un array");
  }

  console.log(`→ ${products.length} produse încărcate`);

  // Verifică ID-uri unice (avertizare, nu eroare)
  const ids = new Map();
  products.forEach((p, idx) => {
    const id = numericId(p.sku, idx);
    if (ids.has(id)) {
      console.warn(
        `⚠ ID duplicat ${id}: "${ids.get(id)}" vs "${p.sku}" — poate strica match-ul Bizoo`
      );
    } else {
      ids.set(id, p.sku);
    }
  });

  const header = '<?xml version="1.0" encoding="UTF-8"?>\n<products>';
  const body = products.map((p, idx) => buildProductXml(p, idx)).join("\n");
  const footer = "\n</products>\n";

  const xml = header + "\n" + body + footer;

  fs.writeFileSync(OUTPUT_XML, xml, "utf8");

  const stats = fs.statSync(OUTPUT_XML);
  const sizeMb = (stats.size / 1024 / 1024).toFixed(2);
  const sizeKb = (stats.size / 1024).toFixed(0);

  const withImage = products.filter((p) => buildPictureUrl(p)).length;

  console.log(`✓ Scris ${OUTPUT_XML}`);
  console.log(`  ${products.length} produse | ${withImage} cu imagine | ${sizeMb} MB (${sizeKb} KB)`);
}

main();
