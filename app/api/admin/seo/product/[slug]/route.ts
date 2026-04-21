import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  analyzeProduct,
  getProductWithSEO,
  saveProductSEO,
  suggestKeywordForProduct,
  type SEOOverride,
} from "@/lib/seo/product-seo";
import { revalidatePath } from "next/cache";

/**
 * GET /api/admin/seo/product/[slug]
 * Returnează produsul complet cu SEO analysis + override dacă există.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  try {
    const { product, override } = await getProductWithSEO(slug);
    const analysis = analyzeProduct(product);
    const suggestions = suggestKeywordForProduct(product);

    return NextResponse.json({
      product,
      override: override || null,
      analysis,
      suggestions,
    });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 404 }
    );
  }
}

/**
 * PUT /api/admin/seo/product/[slug]
 * Salvează SEO override pentru un produs.
 * Body: Partial<SEOOverride>
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const body = (await req.json().catch(() => null)) as Partial<SEOOverride>;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // Allowed fields only — white-list pattern
  const patch: Partial<SEOOverride> = {};
  if (typeof body.seoTitle === "string") patch.seoTitle = body.seoTitle;
  if (typeof body.seoDescription === "string")
    patch.seoDescription = body.seoDescription;
  if (typeof body.focusKeyword === "string")
    patch.focusKeyword = body.focusKeyword;
  if (typeof body.description === "string") patch.description = body.description;

  try {
    const { override, analysis } = await saveProductSEO(slug, patch);
    revalidatePath("/produs/" + slug);
    revalidatePath("/magazin");
    return NextResponse.json({ ok: true, override, analysis });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/seo/product/[slug]
 * Șterge override-ul (revine la valorile din JSON).
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { slug } = await params;

  const { prisma } = await import("@/lib/db");
  const { productSeoKey } = await import("@/lib/seo/product-seo");
  await prisma.contentBlock
    .delete({ where: { key: productSeoKey(slug) } })
    .catch(() => {});

  revalidatePath("/produs/" + slug);
  return NextResponse.json({ ok: true });
}
