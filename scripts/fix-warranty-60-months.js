/* eslint-disable */
// Fix warranty inconsistency in product descriptions: UZINEX standard is
// 60 months, but many descriptions still say "36 luni" or "36 de luni".
// Replaces 36 → 60 ONLY in warranty context (within ~60 chars of "garanție"
// or "garantat"). Leaves "12 luni" alone — those are market/manufacturer
// comparisons ("standardul de 12 luni al pieței") and should stay factual.
//
// Updates both `description` (string) and `descriptionBlocks` (array of
// paragraphs/tables) in data/produse.json.
//
// Run with `--dry` to preview changes without writing.

const fs = require("fs");
const path = require("path");

const DRY = process.argv.includes("--dry");
const ROOT = path.resolve(__dirname, "..");
const DATA = (n) => path.join(ROOT, "data", n);

const produse = JSON.parse(fs.readFileSync(DATA("produse.json"), "utf8"));

// Match "36 luni" or "36 de luni" as whole words
const MONTHS_RE = /\b36(\s+de)?(\s+)luni\b/gi;

// Consider it a warranty replacement only if warranty-related words appear
// within CONTEXT_WINDOW characters before or after the match.
const CONTEXT_WINDOW = 80;
const WARRANTY_CONTEXT_RE = /garan[țt]ie|garantat|uzinex/i;

function replaceInText(text, diagnostics) {
  if (!text) return text;
  let replaced = 0;
  const out = text.replace(MONTHS_RE, (match, de, spc, offset) => {
    const start = Math.max(0, offset - CONTEXT_WINDOW);
    const end = Math.min(text.length, offset + match.length + CONTEXT_WINDOW);
    const ctx = text.slice(start, end);
    if (WARRANTY_CONTEXT_RE.test(ctx)) {
      replaced++;
      diagnostics.push(
        `    ...${text.slice(Math.max(0, offset - 40), offset)}[[${match} → 60${de || ""}${spc}luni]]${text.slice(offset + match.length, offset + match.length + 40)}...`
      );
      return `60${de || ""}${spc}luni`;
    }
    return match;
  });
  return { text: out, replaced };
}

let productsChanged = 0;
let totalReplacements = 0;

for (const prod of produse) {
  const diagnostics = [];
  let changed = false;

  // Replace in description (string)
  if (typeof prod.description === "string") {
    const r = replaceInText(prod.description, diagnostics);
    if (r.replaced > 0) {
      prod.description = r.text;
      totalReplacements += r.replaced;
      changed = true;
    }
  }

  // Replace in descriptionBlocks[].text (paragraph blocks only — tables stay)
  if (Array.isArray(prod.descriptionBlocks)) {
    for (const block of prod.descriptionBlocks) {
      if (block.type === "paragraph" && typeof block.text === "string") {
        const r = replaceInText(block.text, diagnostics);
        if (r.replaced > 0) {
          block.text = r.text;
          totalReplacements += r.replaced;
          changed = true;
        }
      }
    }
  }

  // Replace in SEO meta fields (short strings: seoTitle, seoDescription,
  // shortSpec, focusKeyword, imageAlt). These have the same warranty context
  // requirement — we don't touch "12 luni" market comparisons.
  for (const field of ["seoTitle", "seoDescription", "shortSpec", "focusKeyword", "imageAlt"]) {
    if (typeof prod[field] === "string") {
      const r = replaceInText(prod[field], diagnostics);
      if (r.replaced > 0) {
        prod[field] = r.text;
        totalReplacements += r.replaced;
        changed = true;
      }
    }
  }

  if (changed) {
    productsChanged++;
    console.log(`[${prod.slug}] — ${diagnostics.length} replacements:`);
    diagnostics.slice(0, 3).forEach((d) => console.log(d));
    if (diagnostics.length > 3) {
      console.log(`    (+${diagnostics.length - 3} more)`);
    }
  }
}

console.log("\nSummary:");
console.log("  Products changed:", productsChanged);
console.log("  Total replacements (desc + descriptionBlocks):", totalReplacements);

if (DRY) {
  console.log("\nDRY RUN — no file written. Re-run without --dry to apply.");
} else {
  fs.writeFileSync(DATA("produse.json"), JSON.stringify(produse, null, 2));
  console.log("\nWritten:", DATA("produse.json"));
}
