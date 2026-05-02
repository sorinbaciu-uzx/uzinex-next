/* eslint-disable */
/**
 * Restore a ContentBlock from a backup JSON file produced by update-feg-carousel.js.
 *
 * Usage:
 *   node scripts/restore-content-block.js scripts/backups/case_studies_home-{timestamp}.json
 */

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "..", ".env.local") });
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const { PrismaClient } = require("@prisma/client");

const arg = process.argv[2];
if (!arg) {
  console.error("Usage: node scripts/restore-content-block.js <path-to-backup.json>");
  process.exit(1);
}

const backupPath = path.resolve(process.cwd(), arg);
if (!fs.existsSync(backupPath)) {
  console.error(`[restore] Fișierul ${backupPath} nu există.`);
  process.exit(1);
}

const backup = JSON.parse(fs.readFileSync(backupPath, "utf8"));
if (!backup.key || !backup.data) {
  console.error("[restore] Backup-ul nu are forma { key, data, ... }");
  process.exit(1);
}

async function main() {
  const prisma = new PrismaClient();
  try {
    console.log(`[restore] Restaurare bloc "${backup.key}" din ${path.basename(backupPath)}\n`);

    const current = await prisma.contentBlock.findUnique({ where: { key: backup.key } });
    if (current) {
      const safetyDir = path.resolve(__dirname, "backups");
      fs.mkdirSync(safetyDir, { recursive: true });
      const stamp = new Date().toISOString().replace(/[:.]/g, "-");
      const safetyPath = path.join(safetyDir, `${backup.key}-PRE-RESTORE-${stamp}.json`);
      fs.writeFileSync(
        safetyPath,
        JSON.stringify({ key: backup.key, updatedAt: current.updatedAt, data: current.data }, null, 2),
        "utf8"
      );
      console.log(`[restore] Safety backup al stării curente: ${path.relative(process.cwd(), safetyPath)}\n`);
    }

    await prisma.contentBlock.upsert({
      where: { key: backup.key },
      update: { data: backup.data },
      create: { key: backup.key, data: backup.data },
    });

    const verify = await prisma.contentBlock.findUnique({ where: { key: backup.key } });
    if (JSON.stringify(verify.data) !== JSON.stringify(backup.data)) {
      console.error("[restore] EROARE: post-write verification eșuată.");
      process.exit(2);
    }

    console.log(`[restore] ✓ Bloc "${backup.key}" restaurat și verificat.`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error("[restore] EROARE NEAȘTEPTATĂ:", err);
  process.exit(99);
});
