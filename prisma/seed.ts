import { PrismaClient } from "@prisma/client";
import { DEFAULT_CONTENT, WIRED_KEYS } from "../lib/defaults";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding ContentBlock table from component defaults...");
  for (const [key, data] of Object.entries(DEFAULT_CONTENT)) {
    if (!WIRED_KEYS.has(key)) continue;
    await prisma.contentBlock.upsert({
      where: { key },
      create: { key, data: data as object },
      update: {}, // never overwrite if already edited
    });
    console.log(`  ✓ ${key}`);
  }
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
