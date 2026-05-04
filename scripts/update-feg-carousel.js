/* eslint-disable */
/**
 * Update FEG entry in the homepage carousel content block.
 *
 * Touches ONLY the Future Energy Group entry inside ContentBlock("case_studies_home").
 * All other entries are preserved byte-for-byte.
 *
 * Modes:
 *   node scripts/update-feg-carousel.js              -> dry run, prints diff and writes backup
 *   node scripts/update-feg-carousel.js --apply      -> writes the update after backup
 *
 * Backup is written to scripts/backups/case_studies_home-{ISO-timestamp}.json before any write.
 */

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const { PrismaClient } = require("@prisma/client");

const KEY = "case_studies_home";

const FEG_NEW = {
  client: "FUTURE ENERGY GROUP",
  image: "https://img.youtube.com/vi/DQO74tlDNNQ/maxresdefault.jpg",
  alt:
    "Aparat laser 3-in-1 Uzinex livrat Future Energy Group București pentru sudură, curățare și debitare în atelierul fotovoltaic",
  title: "Atelier fotovoltaic care a învățat să sudeze în 2 ore",
  subtitle:
    "cu un aparat laser 3-in-1 (sudură + curățare + debitare) și o decizie inteligentă de capital",
  youtubeId: "DQO74tlDNNQ",
};

const APPLY = process.argv.includes("--apply");

function isFegEntry(entry) {
  if (!entry || typeof entry !== "object") return false;
  const c = String(entry.client || "").toLowerCase();
  const yt = String(entry.youtubeId || "");
  return c.includes("future energy") || yt === "DQO74tlDNNQ";
}

function diffFields(before, after) {
  const keys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);
  const changes = [];
  for (const k of keys) {
    if (JSON.stringify(before?.[k]) !== JSON.stringify(after?.[k])) {
      changes.push({ field: k, before: before?.[k], after: after?.[k] });
    }
  }
  return changes;
}

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log(`[feg-update] mode = ${APPLY ? "APPLY" : "DRY RUN"}`);
    console.log(`[feg-update] key  = ${KEY}\n`);

    const row = await prisma.contentBlock.findUnique({ where: { key: KEY } });
    if (!row) {
      console.error(
        `[feg-update] ContentBlock("${KEY}") nu există în DB. Caruselul folosește fallback-ul din componenta CaseStudies.tsx, care are deja conținutul nou. Niciun update necesar.`
      );
      process.exit(0);
    }

    const data = row.data;
    if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
      console.error(
        `[feg-update] EROARE: ContentBlock("${KEY}").data nu are forma așteptată { items: [...] }. Anulez. Date găsite:`
      );
      console.error(JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const items = data.items;
    const idx = items.findIndex(isFegEntry);
    if (idx === -1) {
      console.error(
        `[feg-update] EROARE: nu am găsit nicio intrare FEG (după client="future energy" sau youtubeId="DQO74tlDNNQ") în cele ${items.length} elemente. Anulez fără modificare.`
      );
      process.exit(1);
    }

    const before = items[idx];
    const after = { ...before, ...FEG_NEW };

    console.log(
      `[feg-update] Găsit FEG la index ${idx} din ${items.length} (păstrate intacte ${items.length - 1} alte intrări).\n`
    );

    const changes = diffFields(before, after);
    if (changes.length === 0) {
      console.log("[feg-update] Nicio diferență — DB-ul are deja conținutul nou. Nu fac nimic.");
      process.exit(0);
    }

    console.log(`[feg-update] ${changes.length} câmpuri se vor schimba la intrarea FEG:\n`);
    for (const c of changes) {
      console.log(`  • ${c.field}`);
      console.log(`    înainte: ${JSON.stringify(c.before)}`);
      console.log(`    după:    ${JSON.stringify(c.after)}\n`);
    }

    const otherEntriesBefore = items.filter((_, i) => i !== idx);
    console.log(
      `[feg-update] Celelalte ${otherEntriesBefore.length} intrări:\n${otherEntriesBefore
        .map((e, i) => `  ${i + 1}. ${e.client || "(fără client)"}`)
        .join("\n")}\n`
    );

    const backupDir = path.resolve(__dirname, "backups");
    fs.mkdirSync(backupDir, { recursive: true });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `${KEY}-${stamp}.json`);
    fs.writeFileSync(
      backupPath,
      JSON.stringify({ key: KEY, updatedAt: row.updatedAt, data }, null, 2),
      "utf8"
    );
    console.log(`[feg-update] Backup scris: ${path.relative(process.cwd(), backupPath)}\n`);

    const newItems = items.slice();
    newItems[idx] = after;
    const newData = { ...data, items: newItems };

    if (newItems.length !== items.length) {
      throw new Error("Sanity check eșuat: numărul de intrări s-ar schimba.");
    }
    for (let i = 0; i < items.length; i++) {
      if (i === idx) continue;
      if (JSON.stringify(items[i]) !== JSON.stringify(newItems[i])) {
        throw new Error(
          `Sanity check eșuat: intrarea de la index ${i} nu este identică (${items[i].client}).`
        );
      }
    }
    console.log("[feg-update] Sanity check trecut: doar intrarea FEG e modificată.\n");

    if (!APPLY) {
      console.log(
        "[feg-update] DRY RUN finalizat. Niciun write în DB.\n           Pentru a aplica: node scripts/update-feg-carousel.js --apply"
      );
      process.exit(0);
    }

    await prisma.contentBlock.update({
      where: { key: KEY },
      data: { data: newData },
    });

    const verify = await prisma.contentBlock.findUnique({ where: { key: KEY } });
    const verifiedFeg = verify.data.items[idx];
    const verifyChanges = diffFields(after, verifiedFeg);
    if (verifyChanges.length !== 0) {
      console.error("[feg-update] EROARE post-write: verificarea nu confirmă scrierea.");
      console.error(verifyChanges);
      process.exit(2);
    }

    console.log("[feg-update] ✓ APPLY reușit. DB actualizat și verificat.");
    console.log(`           Backup: ${path.relative(process.cwd(), backupPath)}`);
    console.log("           Pentru rollback rulează: node scripts/restore-content-block.js " + path.relative(process.cwd(), backupPath));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("[feg-update] EROARE NEAȘTEPTATĂ:", err);
  process.exit(99);
});
