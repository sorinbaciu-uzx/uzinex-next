import { PrismaClient } from "@prisma/client";
import { NEWS_DEFAULT } from "../components/NewsSection";

const prisma = new PrismaClient();

async function main() {
  console.log("Updating news block...");
  const result = await prisma.contentBlock.upsert({
    where: { key: "news" },
    create: { key: "news", data: NEWS_DEFAULT as object },
    update: { data: NEWS_DEFAULT as object },
  });
  console.log("Updated:", result.key, "at", result.updatedAt);
  console.log("Articles:", NEWS_DEFAULT.articles.length);
  console.log("heroVideoId:", NEWS_DEFAULT.heroVideoId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
