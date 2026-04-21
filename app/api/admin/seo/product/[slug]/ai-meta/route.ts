import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { getProductWithSEO } from "@/lib/seo/product-seo";
import { aiGenerateTitleAndMeta } from "@/lib/seo/ai-rewrite";

/**
 * POST /api/admin/seo/product/[slug]/ai-meta
 * Generează DOAR SEO title + meta description (rapid, ieftin).
 * Nu rescrie descrierea completă.
 */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const { product } = await getProductWithSEO(slug);
    if (!product.focusKeyword) {
      return NextResponse.json(
        { error: "Setează întâi focus keyword-ul" },
        { status: 400 }
      );
    }
    const result = await aiGenerateTitleAndMeta(
      product.name,
      product.focusKeyword,
      product.description
    );
    return NextResponse.json({
      seoTitle: result.seoTitle,
      seoDescription: result.seoDescription,
      usage: result.usage,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
