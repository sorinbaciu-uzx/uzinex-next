import { NextResponse } from "next/server";
import { loadInsight } from "@/lib/newsroom/data";
import { buildInsightCsv } from "@/lib/newsroom/extract";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = loadInsight(Number(id));
  if (!insight) return new NextResponse("Insight not found", { status: 404 });

  return new NextResponse(buildInsightCsv(insight), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="insight-${insight.id}.csv"`,
    },
  });
}
