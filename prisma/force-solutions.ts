import { PrismaClient } from "@prisma/client";
import { SOLUTIONS_DEFAULT } from "../components/Solutions";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating solutions block...");
  const result = await prisma.contentBlock.upsert({
    where: { key: "solutions" },
    create: { key: "solutions", data: SOLUTIONS_DEFAULT as object },
    update: { data: SOLUTIONS_DEFAULT as object },
  });
  console.log("Updated:", result.key, "at", result.updatedAt);
  console.log("Items:", SOLUTIONS_DEFAULT.items.length);
  SOLUTIONS_DEFAULT.items.forEach((s, i) =>
    console.log(`  ${s.num} ${s.industry}`)
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
