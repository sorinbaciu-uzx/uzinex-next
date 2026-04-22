import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import {
  analyzeProduct,
  getProductWithSEO,
  saveProductSEO,
  suggestKeywordForProduct,
  type ProductOverride,
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
  const body = (await req.json().catch(() => null)) as Partial<ProductOverride>;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  // Allowed fields only — white-list pattern (prevent prototype pollution etc.)
  const patch: Partial<ProductOverride> = {};
  // Basic fields
  if (typeof body.name === "string") patch.name = body.name;
  if (typeof body.shortSpec === "string") patch.shortSpec = body.shortSpec;
  if (typeof body.image === "string") patch.image = body.image;
  if (typeof body.imageAlt === "string") patch.imageAlt = body.imageAlt;
  if (Array.isArray(body.gallery)) patch.gallery = body.gallery;
  if (typeof body.datasheetUrl === "string")
    patch.datasheetUrl = body.datasheetUrl;
  if (typeof body.category === "string") patch.category = body.category;
  if (typeof body.subcategory === "string") patch.subcategory = body.subcategory;
  if (typeof body.subSubcategory === "string")
    patch.subSubcategory = body.subSubcategory;
  // Description
  if (typeof body.description === "string") patch.description = body.description;
  if (Array.isArray(body.descriptionBlocks))
    patch.descriptionBlocks = body.descriptionBlocks;
  if (Array.isArray(body.specs)) patch.specs = body.specs;
  // Pricing
  if (typeof body.priceFrom === "number" && body.priceFrom > 0)
    patch.priceFrom = body.priceFrom;
  else if (body.priceFrom === null || body.priceFrom === 0)
    patch.priceFrom = undefined; // clear price
  if (
    body.priceCurrency === "EUR" ||
    body.priceCurrency === "RON" ||
    body.priceCurrency === "USD"
  )
    patch.priceCurrency = body.priceCurrency;
  if (typeof body.priceIncludesVAT === "boolean")
    patch.priceIncludesVAT = body.priceIncludesVAT;
  if (typeof body.priceNote === "string") patch.priceNote = body.priceNote;
  // SEO
  if (typeof body.seoTitle === "string") patch.seoTitle = body.seoTitle;
  if (typeof body.seoDescription === "string")
    patch.seoDescription = body.seoDescription;
  if (typeof body.focusKeyword === "string")
    patch.focusKeyword = body.focusKeyword;

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
