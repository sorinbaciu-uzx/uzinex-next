import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { analyzeAllProducts } from "@/lib/seo/product-seo";

/**
 * GET /api/admin/seo/list
 * Returnează lista tuturor produselor cu scorul SEO calculat.
 * Folosit de dashboard-ul admin.
 */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const items = await analyzeAllProducts();

  // Stats agregate
  const total = items.length;
  const avg =
    total > 0
      ? Math.round(items.reduce((s, i) => s + i.score, 0) / total)
      : 0;
  const needAttention = items.filter((i) => i.score < 70).length;
  const excellent = items.filter((i) => i.score >= 90).length;

  return NextResponse.json({
    items,
    stats: { total, avg, needAttention, excellent },
  });
}
