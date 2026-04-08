// WooCommerce CSV -> products.ts importer
// Usage: node scripts/import-wc.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CSV_PATH = path.join(PROJECT, "data", "produse.csv");
const MEDIA_DIR = path.join(PROJECT, "public", "images", "produse");
const PUBLIC_DIR_REL = "/images/produse";
const OUT_TS = path.join(PROJECT, "app", "magazin", "products.ts");
const OUT_JSON = path.join(PROJECT, "data", "produse.json");

// --- RFC4180 parser ---
function parseCSV(text) {
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\r") {
        // ignore
      } else if (c === "\n") {
        row.push(field);
        field = "";
        rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

// --- text utils ---
function decodeEntities(s) {
  return (s || "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

function stripHtmlInline(s) {
  if (!s) return "";
  return decodeEntities(
    s
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/[ \t]+/g, " ")
    .trim();
}

function stripHtml(s) {
  if (!s) return "";
  // preserve paragraph breaks
  let t = s
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]+>/g, " ");
  t = decodeEntities(t)
    // convert literal escape sequences from CSV text
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, " ")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  // strip "Descarcă fișa tehnică PDF" lines
  t = t
    .split("\n")
    .filter((line) => !/desc[aă]rc[aă]\s*fi[sș]a\s*tehnic[aă]/i.test(line))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return t;
}

// --- parse description into structured blocks (paragraphs + tables) ---
function parseDescriptionBlocks(html) {
  if (!html) return [];
  const blocks = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let lastIndex = 0;
  let m;
  while ((m = tableRegex.exec(html)) !== null) {
    if (m.index > lastIndex) {
      const before = html.slice(lastIndex, m.index);
      addParagraphBlocks(blocks, before);
    }
    const table = parseTable(m[0]);
    if (table && table.length) blocks.push({ type: "table", rows: table });
    lastIndex = m.index + m[0].length;
  }
  if (lastIndex < html.length) addParagraphBlocks(blocks, html.slice(lastIndex));
  return blocks;
}

function addParagraphBlocks(blocks, htmlChunk) {
  const text = stripHtml(htmlChunk);
  if (!text) return;
  for (const para of text.split(/\n\s*\n/)) {
    const t = para.trim();
    if (t) blocks.push({ type: "paragraph", text: t });
  }
}

function parseTable(tableHtml) {
  const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  const rows = [];
  let r;
  while ((r = rowRegex.exec(tableHtml)) !== null) {
    const cellRegex = /<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi;
    const cells = [];
    let c;
    while ((c = cellRegex.exec(r[1])) !== null) {
      cells.push(stripHtmlInline(c[1]));
    }
    // skip rows with only the fisa tehnica phrase
    const joined = cells.join(" ").toLowerCase();
    if (/desc[aă]rc[aă]\s*fi[sș]a\s*tehnic[aă]/i.test(joined)) continue;
    if (cells.length && cells.some((x) => x.length > 0)) rows.push(cells);
  }
  return rows;
}
function norm(s) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
function lev(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
  return dp[a.length][b.length];
}

// --- taxonomy ---
const TAX = {
  "Utilaje de construcții": {
    Excavatoare: ["Miniexcavatoare", "Excavatoare pe șenile"],
    Concasoare: [],
    "Accesorii utilaje de construcții": [],
  },
  "Echipamente de ambalare": {
    "Ambalare paleți": [],
    "Ambalare termocontractabilă": [],
    "Sigilare și formare cutii": [],
    "Mașini de legat cu bandă": [],
    "Fabricare cutii carton": [],
    "Ambalare diverse": [],
  },
  "Echipamente de etichetare și dozare": {
    "Mașini de etichetare": [],
    "Mașini de umplere și plafonare": [],
    "Mașini de dezmembrat": [],
  },
  "Echipamente de reciclare": {
    "Mașini de balotat și presare": [],
    "Mașini de tocat și mărunțit": [],
    "Echipamente de separare": [],
    "Echipamente auxiliare pentru reciclare": [],
  },
  "Utilaje CNC": {
    "CNC diverse": [],
    "CNC metal": [],
    "CNC mobilă": [],
    "CNC piatră": [],
    "Router CNC": [],
  },
  Strunguri: {
    "Mini strunguri": [],
    "Strunguri CNC": [],
    "Strunguri heavy duty": [],
    "Strunguri universale": [],
  },
  "Mașini de prelucrare lemn": {
    "Fierăstraie pentru lemn": [],
    "Mașini de aplicat cant": [],
    "Mașini de finisat lemn": [],
    "Mașini pentru uși": [],
  },
  "Mașini de tăiere laser": {
    "Laser fibră": [],
    "Laser cu bobină": [],
  },
  "Echipamente de inspecție industrială": {
    "Roboți CCTV pentru inspecția conductelor": [],
    "Camere push pentru inspecția conductelor": [],
    "Camere PTZ / periscop pentru cămine și canalizare": [],
    "Videoscoape industriale": [],
    "Camere NDT și inspecții speciale": [],
  },
  "Echipamente energetice": {
    "Pompe de căldură": [],
  },
};

const ALL_NODES = []; // {name, path:[top,sub,leaf], normName}
for (const [top, subs] of Object.entries(TAX)) {
  ALL_NODES.push({ name: top, path: [top], normName: norm(top) });
  for (const [sub, leaves] of Object.entries(subs)) {
    ALL_NODES.push({ name: sub, path: [top, sub], normName: norm(sub) });
    for (const leaf of leaves) {
      ALL_NODES.push({ name: leaf, path: [top, sub, leaf], normName: norm(leaf) });
    }
  }
}

function matchNode(csvName) {
  const n = norm(csvName);
  if (!n) return null;
  // exact
  for (const node of ALL_NODES) if (node.normName === n) return node;
  // contains
  let best = null;
  let bestScore = Infinity;
  for (const node of ALL_NODES) {
    if (node.normName.includes(n) || n.includes(node.normName)) {
      const d = Math.abs(node.normName.length - n.length);
      if (d < bestScore) {
        bestScore = d;
        best = node;
      }
    }
  }
  if (best) return best;
  // levenshtein
  bestScore = Infinity;
  for (const node of ALL_NODES) {
    const d = lev(node.normName, n);
    if (d < bestScore && d <= Math.max(2, Math.floor(n.length * 0.25))) {
      bestScore = d;
      best = node;
    }
  }
  return best;
}

// --- main ---
const raw = fs.readFileSync(CSV_PATH, "utf8");
const rows = parseCSV(raw);
const header = rows[0];
const idx = (name) => header.indexOf(name);
const H = {
  tip: idx("Tip"),
  sku: idx("SKU"),
  nume: idx("Nume"),
  pub: idx("Publicat"),
  shortDesc: idx("Descriere scurtă"),
  desc: idx("Descriere"),
  cats: idx("Categorii"),
  imgs: idx("Imagini"),
  seoTitle: idx("Meta: rank_math_title"),
  seoDesc: idx("Meta: rank_math_description"),
  seoTitleAlt: idx("Meta: _aioseo_title"),
  seoDescAlt: idx("Meta: _aioseo_description"),
  focusKw: idx("Meta: rank_math_focus_keyword"),
};

// media index: normalized basename -> actual filename (already in public/images/produse)
const mediaFiles = fs.existsSync(MEDIA_DIR)
  ? fs.readdirSync(MEDIA_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  : [];
const mediaByNorm = new Map();
const mediaByStem = new Map();
for (const f of mediaFiles) {
  mediaByNorm.set(f.toLowerCase(), f);
  mediaByStem.set(f.replace(/\.[^.]+$/, "").toLowerCase(), f);
}

const products = [];
const unmatchedCats = new Set();
let imgMatched = 0;
let imgFallback = 0;

for (let r = 1; r < rows.length; r++) {
  const row = rows[r];
  if (!row || row.length < 5) continue;
  const tip = (row[H.tip] || "").trim();
  const pub = (row[H.pub] || "").trim();
  const sku = (row[H.sku] || "").trim();
  const name = (row[H.nume] || "").trim();
  if (pub !== "1") continue;
  if (tip !== "simple" && tip !== "variable") continue;
  if (!name) continue;
  // auto-generate SKU if missing (most WC exports leave SKU blank)
  const finalSku = sku || `UZX-${String(products.length + 1).padStart(3, "0")}`;

  const shortDescHtml = row[H.shortDesc] || "";
  const descHtml = row[H.desc] || "";
  const shortDesc = stripHtml(shortDescHtml);
  const description = stripHtml(descHtml);
  const descriptionBlocks = parseDescriptionBlocks(descHtml);

  // extract Google Drive datasheet link from description HTML
  const driveMatch = descHtml.match(/https?:\/\/(?:drive|docs)\.google\.com\/[^\s"<>)]+/);
  const datasheetUrl = driveMatch ? driveMatch[0].replace(/&amp;/g, "&") : "";

  // categories
  const catsRaw = (row[H.cats] || "").split(",").map((s) => s.trim()).filter(Boolean);
  let category = "Altele";
  let subcategory;
  let subSubcategory;
  let matchedSomething = false;
  // prefer the deepest match
  let bestPath = null;
  for (const c of catsRaw) {
    const parts = c.split(">").map((s) => s.trim()).filter(Boolean);
    // try matching each part, deepest-first
    for (let k = parts.length - 1; k >= 0; k--) {
      const m = matchNode(parts[k]);
      if (m) {
        if (!bestPath || m.path.length > bestPath.length) bestPath = m.path;
        matchedSomething = true;
        break;
      }
    }
    if (!matchedSomething) unmatchedCats.add(c);
  }
  if (bestPath) {
    category = bestPath[0];
    subcategory = bestPath[1];
    subSubcategory = bestPath[2];
  }

  // image — match against existing files in public/images/produse, no copy
  const imgsRaw = (row[H.imgs] || "").split(",").map((s) => s.trim()).filter(Boolean);
  let imagePath = "";
  if (imgsRaw.length) {
    const url = imgsRaw[0];
    const base = (url.split("/").pop() || "").split("?")[0];
    const baseLower = base.toLowerCase();
    const stemLower = baseLower.replace(/\.[^.]+$/, "");
    let found = mediaByNorm.get(baseLower) || mediaByStem.get(stemLower);
    if (!found) {
      const alt = stemLower.replace(/-scaled$/, "");
      found = mediaByStem.get(alt);
    }
    if (found) {
      imagePath = `${PUBLIC_DIR_REL}/${found}`;
      imgMatched++;
    } else {
      imgFallback++;
    }
  } else {
    imgFallback++;
  }

  // shortSpec: first sentence, max 120
  let shortSpec = shortDesc.split(/(?<=[.!?])\s/)[0] || shortDesc;
  if (shortSpec.length > 120) shortSpec = shortSpec.slice(0, 117).trimEnd() + "…";

  // SEO — preferă rank_math, fallback aioseo
  const seoTitle =
    (row[H.seoTitle] || row[H.seoTitleAlt] || "").trim() || `${name} — Uzinex`;
  const seoDescription =
    (row[H.seoDesc] || row[H.seoDescAlt] || "").trim() || shortSpec;
  const focusKeyword = (row[H.focusKw] || "").trim();

  // slug from name (for routing)
  const slug = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  products.push({
    sku: finalSku,
    slug,
    name,
    shortSpec,
    description,
    category,
    subcategory,
    subSubcategory,
    image: imagePath,
    datasheetUrl,
    descriptionBlocks,
    seoTitle,
    seoDescription,
    focusKeyword,
  });
}

// emit JSON (sursa principală)
fs.writeFileSync(OUT_JSON, JSON.stringify(products, null, 2), "utf8");

// emit TS — re-exportă din JSON cu type
const tsContent = `// AUTO-GENERATED by scripts/import-wc.mjs — do not edit by hand
import data from "@/data/produse.json";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  shortSpec: string;
  description: string;
  category: string;
  subcategory?: string;
  subSubcategory?: string;
  image: string;
  datasheetUrl: string;
  descriptionBlocks: DescriptionBlock[];
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
};

export type DescriptionBlock =
  | { type: "paragraph"; text: string }
  | { type: "table"; rows: string[][] };

export const PRODUCTS: Product[] = data as Product[];
`;
fs.writeFileSync(OUT_TS, tsContent, "utf8");

console.log(`Products imported: ${products.length}`);
console.log(`Images matched: ${imgMatched}`);
console.log(`Images fallback: ${imgFallback}`);
console.log(`Unmatched categories (${unmatchedCats.size}):`);
for (const c of [...unmatchedCats].sort()) console.log("  - " + c);
