/* eslint-disable */
// Scan produse.json for WordPress [embed]URL[/embed] shortcodes inside
// descriptionBlocks. For each product that has one:
//  1. Compute the paragraph index (post-filter, 0-based) of the embed
//  2. Compute the paragraph index AFTER stripping the embed (renderer strips it)
//  3. Insert a `video` enrichment at the appropriate position so the video
//     appears where the shortcode used to be
//  4. Shift ALL existing enrichments + animations with insertAfterParagraph
//     greater than the embed's index down by 1 — matches what the renderer
//     will see now that the embed paragraph disappears
//
// This script is idempotent-ish: if a product already has a `video` type
// enrichment, it's skipped (manual overrides preserved).

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = (n) => path.join(ROOT, "data", n);

const produse = JSON.parse(fs.readFileSync(DATA("produse.json"), "utf8"));
const enrichments = JSON.parse(
  fs.readFileSync(DATA("product-enrichments.json"), "utf8")
);
const animations = JSON.parse(
  fs.readFileSync(DATA("product-animations.json"), "utf8")
);

const EMBED_RE = /\[embed\]([^[]+)\[\/embed\]/i;

function findEmbedInBlocks(blocks) {
  if (!blocks) return null;
  // Compute the paragraph index the SAME WAY the renderer does:
  //  1. Skip empty paragraphs (stripped of whitespace)
  //  2. Tables don't count toward paragraph index
  //  3. Only non-empty "paragraph" blocks increment the index
  let paraIdx = -1;
  for (const b of blocks) {
    if (b.type !== "paragraph") continue; // tables skipped
    const text = b.text || "";
    if (text.replace(/\s/g, "").length === 0) continue; // empty skipped
    paraIdx++;
    const m = text.match(EMBED_RE);
    if (m) {
      // paraIdx is the index of this paragraph BEFORE any stripping.
      // After stripping, this paragraph becomes empty and is filtered out.
      // The effective "insertAfterParagraph" for the video enrichment is
      // paraIdx - 1 (so it renders AFTER the previous paragraph, AT the
      // position the embed used to occupy).
      return { url: m[1].trim(), paraIdx };
    }
  }
  return null;
}

let updatedProducts = 0;
let addedVideos = 0;

for (const prod of produse) {
  const result = findEmbedInBlocks(prod.descriptionBlocks);
  if (!result) continue;

  const slug = prod.slug;
  const existing = enrichments[slug] || [];
  const existingAnims = animations[slug] || [];

  // Skip if a video enrichment already exists (respect manual overrides)
  if (existing.some((e) => e.type === "video")) {
    continue;
  }

  const embedParaIdx = result.paraIdx;
  // Video inserts AFTER the paragraph that came BEFORE the embed
  const videoInsertAfter = Math.max(0, embedParaIdx - 1);

  // Shift anything targeting a paragraph >= embedParaIdx down by 1 (the
  // embed paragraph disappears after stripping).
  const shiftedEnrichments = existing.map((e) => {
    if (e.insertAfterParagraph >= embedParaIdx) {
      return { ...e, insertAfterParagraph: e.insertAfterParagraph - 1 };
    }
    return e;
  });
  const shiftedAnimations = existingAnims.map((a) => {
    if (a.insertAfterParagraph >= embedParaIdx) {
      return { ...a, insertAfterParagraph: a.insertAfterParagraph - 1 };
    }
    return a;
  });

  // Add the video enrichment
  shiftedEnrichments.push({
    type: "video",
    insertAfterParagraph: videoInsertAfter,
    data: {
      video: result.url,
      caption: `Video demonstrativ — ${prod.name}`,
    },
  });

  enrichments[slug] = shiftedEnrichments;
  animations[slug] = shiftedAnimations;

  updatedProducts++;
  addedVideos++;
  console.log(
    `  [${slug}] video at paragraph ${videoInsertAfter}, URL: ${result.url}`
  );
}

fs.writeFileSync(
  DATA("product-enrichments.json"),
  JSON.stringify(enrichments, null, 2)
);
fs.writeFileSync(
  DATA("product-animations.json"),
  JSON.stringify(animations, null, 2)
);

console.log("\nVideo enrichment summary:");
console.log("  Products with embed shortcodes:", updatedProducts);
console.log("  Video enrichments added:", addedVideos);
console.log(
  "  Wrote:",
  DATA("product-enrichments.json"),
  "and",
  DATA("product-animations.json")
);
