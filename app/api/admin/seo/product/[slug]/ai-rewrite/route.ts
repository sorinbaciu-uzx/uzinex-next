import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  analyzeProduct,
  getProductWithSEO,
} from "@/lib/seo/product-seo";
import { aiRewriteProductSEO } from "@/lib/seo/ai-rewrite";

/**
 * POST /api/admin/seo/product/[slug]/ai-rewrite
 * Rescrie conținutul complet al produsului folosind Claude Opus.
 * NU salvează automat — returnează draft-ul pentru preview + apply.
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
    const analysis = analyzeProduct(product);

    // Rewrite focus: checks care sunt critical sau important și eșuează
    const failingChecks = analysis.checks.filter(
      (c) =>
        !c.passed && (c.category === "critical" || c.category === "important")
    );

    const result = await aiRewriteProductSEO({
      productName: product.name,
      focusKeyword: product.focusKeyword,
      currentTitle: product.seoTitle,
      currentDescription: product.seoDescription,
      currentContent: product.description,
      failingChecks,
      category: product.category,
      subcategory: product.subcategory,
    });

    return NextResponse.json({
      draft: {
        seoTitle: result.seoTitle,
        seoDescription: result.seoDescription,
        description: result.content,
      },
      usage: result.usage,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
