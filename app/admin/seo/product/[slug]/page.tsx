import Link from "next/link";
import { notFound } from "next/navigation";
import {
  analyzeProduct,
  getProductWithSEO,
  suggestKeywordForProduct,
} from "@/lib/seo/product-seo";
import { SEOEditor } from "./SEOEditor";

export const dynamic = "force-dynamic";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product, override;
  try {
    const res = await getProductWithSEO(slug);
    product = res.product;
    override = res.override;
  } catch {
    notFound();
  }

  const initialAnalysis = analyzeProduct(product);
  const suggestions = suggestKeywordForProduct(product);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-400 font-mono">
        <Link href="/admin/seo" className="hover:text-uzx-blue transition">
          ← SEO overview
        </Link>
        <span>/</span>
        <span>{product.category}</span>
        {product.subcategory && (
          <>
            <span>/</span>
            <span>{product.subcategory}</span>
          </>
        )}
      </div>

      <SEOEditor
        product={product}
        override={override || null}
        initialAnalysis={initialAnalysis}
        keywordSuggestions={suggestions}
      />
    </div>
  );
}
