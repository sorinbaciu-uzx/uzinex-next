import { PrismaClient } from "@prisma/client";

const p = new PrismaClient();

async function main() {
  const r = await p.contentBlock.findUnique({ where: { key: "news" } });
  const d = r?.data as Record<string, unknown>;
  console.log("highlights count:", Array.isArray(d?.highlights) ? (d.highlights as unknown[]).length : "MISSING");
  console.log("changelog entries:", (d?.changelog as Record<string, unknown>)?.entries ? "present" : "MISSING");
  console.log("heroVideoId:", d?.heroVideoId);
  console.log("railVideoId:", d?.railVideoId);
}

main()
  .catch(console.error)
  .finally(() => p.$disconnect());
