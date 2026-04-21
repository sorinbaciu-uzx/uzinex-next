import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { analyzeAllProducts } from "@/lib/seo/product-seo";

/**
 * GET /api/admin/seo/export
 * Returnează un CSV cu toate produsele + scor SEO.
 * Folosit pentru raportare / workflow extern.
 */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const items = await analyzeAllProducts();

  const header = [
    "slug",
    "name",
    "category",
    "subcategory",
    "focusKeyword",
    "score",
    "verdict",
    "criticalFails",
    "hasImage",
    "hasOverride",
    "updatedAt",
  ].join(",");

  function escape(v: string | number | boolean | undefined | null): string {
    if (v === undefined || v === null) return "";
    const s = String(v);
    if (s.includes(",") || s.includes('"') || s.includes("\n")) {
      return '"' + s.replace(/"/g, '""') + '"';
    }
    return s;
  }

  const rows = items.map((i) =>
    [
      i.slug,
      i.name,
      i.category,
      i.subcategory,
      i.focusKeyword,
      i.score,
      i.verdict,
      i.criticalFails,
      i.hasImage,
      i.hasOverride,
      i.updatedAt,
    ]
      .map(escape)
      .join(",")
  );

  const csv = [header, ...rows].join("\n");
  const date = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="uzinex-seo-' + date + '.csv"',
    },
  });
}
