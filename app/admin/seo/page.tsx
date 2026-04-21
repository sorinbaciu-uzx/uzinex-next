import { analyzeAllProducts } from "@/lib/seo/product-seo";
import { SEODashboard } from "./SEODashboard";

export const dynamic = "force-dynamic";

export default async function SEODashboardPage() {
  const items = await analyzeAllProducts();

  const total = items.length;
  const avg =
    total > 0
      ? Math.round(items.reduce((s, i) => s + i.score, 0) / total)
      : 0;
  const needAttention = items.filter((i) => i.score < 70).length;
  const excellent = items.filter((i) => i.score >= 90).length;
  const noKeyword = items.filter(
    (i) => !i.focusKeyword || i.focusKeyword.trim().length < 2
  ).length;
  const noImage = items.filter((i) => !i.hasImage).length;

  const stats = { total, avg, needAttention, excellent, noKeyword, noImage };

  return <SEODashboard items={items} stats={stats} />;
}
