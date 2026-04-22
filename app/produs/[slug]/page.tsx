import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS, type DescriptionBlock } from "@/app/magazin/products";
import { AddToQuoteButton } from "@/app/magazin/AddToQuoteButton";
import { SimilarCarousel } from "./SimilarCarousel";
import { ProductGallery } from "./ProductGallery";
import { SpecIcon } from "./SpecIcon";
import { BenefitsStrip } from "./BenefitsStrip";
import { productSchema, breadcrumbSchema } from "@/lib/seo";
import { getProductWithSEO } from "@/lib/seo/product-seo";
import {
  extractTopSpecs,
  type SpecIcon as SpecIconType,
} from "@/lib/product-specs";
import { formatPrice } from "@/lib/format-price";
import benefitsData from "@/data/product-benefits.json";
import { AutoLinkedText } from "@/components/AutoLinkedText";
import { buildProductTargets } from "@/lib/internal-links";
import { buildRelatedParagraph } from "@/lib/related-products";
import { getBnrEurRate, formatBnrDate } from "@/lib/bnr";

// ISR: regenerate each product page at most once per hour so the displayed
// BNR EUR→RON rate stays current (BNR publishes ~13:00 on weekdays).
export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Try merged (JSON + DB override); fallback to JSON only if DB unavailable at build
  let p;
  try {
    const res = await getProductWithSEO(slug);
    p = res.product;
  } catch {
    p = PRODUCTS.find((x) => x.slug === slug);
  }
  if (!p) return { title: "Produs negăsit — Uzinex" };
  return {
    title: p.seoTitle || `${p.name} — Uzinex`,
    description: p.seoDescription || p.shortSpec,
    keywords: p.focusKeyword || undefined,
    alternates: { canonical: `/produs/${p.slug}` },
  };
}

/**
 * Produce blocks-de-afișat.
 *
 * Priority:
 * 1. override.descriptionBlocks (editat manual în admin, block-based)
 * 2. parse override.description în paragrafe (dacă AI a rescris doar plain text)
 * 3. base.descriptionBlocks (original din JSON)
 */
function effectiveBlocks(
  product: { description: string; descriptionBlocks?: DescriptionBlock[] },
  override?: {
    description?: string;
    descriptionBlocks?: DescriptionBlock[];
  } | null
): DescriptionBlock[] {
  // Merged product already has descriptionBlocks set if override has them
  // (mergeProductWithOverride handles this). But we also need to detect
  // the case where description was overridden but not blocks — in that case,
  // parse the description into paragraphs.
  const base = product.descriptionBlocks || [];
  const hasBlocksOverride =
    override?.descriptionBlocks && override.descriptionBlocks.length > 0;
  const hasDescOverride =
    override?.description &&
    override.description.trim() !== product.description?.trim();

  if (hasBlocksOverride) {
    return override!.descriptionBlocks as DescriptionBlock[];
  }
  if (hasDescOverride) {
    const paragraphs = override!
      .description!.split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 30);
    return paragraphs.map((text) => ({
      type: "paragraph" as const,
      text,
    }));
  }
  return base;
}

const FAQ = [
  {
    q: "Este inclus transportul?",
    a: "Da, transportul și punerea în funcțiune sunt incluse în prețul de achiziție pe teritoriul României.",
  },
  {
    q: "Ce garanție oferiți?",
    a: "Oferim 60 de luni garanție producător, plus contracte opționale de mentenanță preventivă.",
  },
  {
    q: "Pot fi achiziționate prin SEAP / SICAP?",
    a: "Da, toate echipamentele Uzinex sunt eligibile pentru achiziții publice prin SEAP și SICAP.",
  },
  {
    q: "Există finanțare disponibilă?",
    a: "Da, oferim soluții de leasing și credite prin partenerii noștri financiari, cu aprobare rapidă.",
  },
];

const FEATURES = [
  { title: "Calitate industrială", body: "Componente premium și standarde europene de fabricație." },
  { title: "Suport tehnic", body: "Echipă de ingineri pentru consultanță și mentenanță." },
  { title: "Eligibil SEAP", body: "Disponibil pentru achiziții publice prin platformele guvernamentale." },
  { title: "Garanție extinsă", body: "60 luni standard, cu opțiuni de extindere prin contract." },
];

export default async function Page({ params }: Props) {
  const { slug } = await params;
  // Merge JSON + DB SEO override (graceful fallback if DB unavailable)
  let base, override;
  try {
    const res = await getProductWithSEO(slug);
    base = res.product;
    override = res.override;
  } catch {
    base = PRODUCTS.find((x) => x.slug === slug);
  }
  if (!base) notFound();
  const p = base;

  // Official BNR EUR→RON rate, shown next to an EUR price as a reference.
  // Returns null on any failure — callers must handle that gracefully.
  const priceCurrency = p.priceCurrency || "EUR";
  const bnr =
    priceCurrency === "EUR" && p.priceFrom && p.priceFrom > 0
      ? await getBnrEurRate()
      : null;

  // Similar: prioritize subSubcategory → subcategory → category, max 12 unique
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const tier1 = p.subSubcategory
    ? others.filter((x) => x.subSubcategory === p.subSubcategory)
    : [];
  const tier2 = p.subcategory
    ? others.filter((x) => x.subcategory === p.subcategory && !tier1.includes(x))
    : [];
  const tier3 = others.filter(
    (x) => x.category === p.category && !tier1.includes(x) && !tier2.includes(x)
  );
  const similar = [...tier1, ...tier2, ...tier3].slice(0, 12);

  // shorten subcategory at first " / " — e.g. "Camere PTZ / periscop ..." -> "Camere PTZ"
  const subShort = p.subcategory ? p.subcategory.split(/\s*\/\s*/)[0] : "";
  const subSubShort = p.subSubcategory ? p.subSubcategory.split(/\s*\/\s*/)[0] : "";
  const breadcrumbParts = [p.category, subShort, subSubShort].filter(Boolean);
  const breadcrumb = breadcrumbParts.join(" / ");

  // clean product name for sticky card — keep only the main name, drop spec separators
  const cleanName = p.name
    .split(/\s*[|·—–]\s*/)[0]
    .trim();

  // ─── JSON-LD schemas (Product + BreadcrumbList) ───
  const galleryImages = (p.gallery || [])
    .filter((m) => m.type === "image")
    .map((m) => (m as { type: "image"; url: string }).url);

  const prodJsonLd = productSchema({
    name: p.name,
    description: p.shortSpec + ". " + (p.description || ""),
    sku: p.sku,
    slug: p.slug,
    image: p.image,
    galleryImages,
    category: p.category,
    priceFrom: p.priceFrom,
    priceCurrency: p.priceCurrency,
    priceIncludesVAT: p.priceIncludesVAT,
  });
  const crumbJsonLd = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Catalog tehnic", url: "/magazin" },
    ...(p.category ? [{ name: p.category, url: `/magazin` }] : []),
    { name: p.name, url: `/produs/${p.slug}` },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(prodJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbJsonLd) }}
      />

      <div style={{ background: "#082545" }}>
        <Header />
      </div>

      {/* HERO PRODUS — KUKA style: white bg, 3-col (image + info + sidebar) */}
      <section className="bg-white border-b hairline">
        <div className="container-x pt-8 lg:pt-10 pb-10 lg:pb-14">
          <nav className="text-[11px] mono uppercase tracking-[0.2em] text-ink-400 mb-8 flex items-center gap-2 flex-wrap">
            <a href="/" className="hover:text-uzx-orange transition">Acasă</a>
            <span className="text-ink-300">/</span>
            <a href="/magazin" className="hover:text-uzx-orange transition">Catalog tehnic</a>
            <span className="text-ink-300">/</span>
            <span className="text-ink-600">{p.category}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* IMAGE COL */}
            <div className="lg:col-span-5">
              <ProductGallery
                mainImage={p.image}
                mainAlt={p.imageAlt || p.name}
                productName={p.name}
                gallery={p.gallery || []}
              />
            </div>

            {/* INFO COL */}
            <div className="lg:col-span-4 text-ink-900">
              {(p.subcategory || p.category) && (
                <div className="inline-block text-xs text-ink-600 bg-ink-50 border border-ink-200 px-3 py-1 mb-4 rounded-full">
                  {p.subcategory || p.category}
                </div>
              )}

              <h1
                className="serif text-2xl md:text-[28px] lg:text-[32px] leading-[1.1] text-ink-900 max-w-xl"
                style={{ letterSpacing: "-0.025em" }}
              >
                {p.name}
              </h1>

              <div className="mt-3 text-sm text-ink-500">
                <span className="font-medium text-ink-700">Cod produs:</span>{" "}
                <span className="font-mono">{p.sku}</span>
              </div>

              {p.shortSpec && (
                <p className="mt-5 text-ink-600 text-[15px] leading-relaxed max-w-xl">
                  {p.shortSpec}
                </p>
              )}

              {/* BENEFICII CHEIE — derivate din specs + transformate in benefit framing
                  (data/product-benefits.json). Fallback la specs raw daca lipseste maparea. */}
              {(() => {
                type BenefitRow = {
                  icon: SpecIconType;
                  title: string;
                  value: string;
                };
                const benefitsMap = benefitsData as Record<
                  string,
                  Array<{ icon: string; benefitTitle: string; benefitValue: string }>
                >;
                const benefits = benefitsMap[p.slug];
                const rows: BenefitRow[] =
                  benefits && benefits.length > 0
                    ? benefits.slice(0, 4).map((b) => ({
                        icon: b.icon as SpecIconType,
                        title: b.benefitTitle,
                        value: b.benefitValue,
                      }))
                    : (p.specs && p.specs.length > 0
                        ? p.specs.slice(0, 4)
                        : extractTopSpecs(p.descriptionBlocks, 4)
                      ).map((s) => ({
                        icon: s.icon,
                        title: s.title,
                        value: s.value,
                      }));
                if (rows.length === 0) return null;
                return (
                  <div className="mt-7 grid grid-cols-1 gap-3.5">
                    <div className="text-[11px] mono uppercase tracking-[0.15em] text-ink-400 mb-1">
                      Beneficii cheie
                    </div>
                    {rows.map((row, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="shrink-0 text-uzx-blue mt-0.5">
                          <SpecIcon icon={row.icon} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[15px] text-ink-900 font-semibold leading-snug">
                            {row.title}
                          </div>
                          <div className="text-[12px] text-ink-500 leading-snug mt-1">
                            {row.value}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* SIDEBAR COL */}
            <div className="lg:col-span-3">
              <div className="border border-ink-200 p-5 lg:p-6 bg-white">
                <div className="text-[11px] mono uppercase tracking-wider text-uzx-orange mb-4">
                  — Opțiuni comandă
                </div>

                {/* PRICE DISPLAY — doar dacă priceFrom e setat */}
                {p.priceFrom && p.priceFrom > 0 && (
                  <div className="mb-5 pb-5 border-b border-ink-100">
                    <div className="text-[11px] uppercase tracking-wider text-ink-500 font-medium">
                      De la
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span
                        className="serif text-[30px] lg:text-[34px] text-ink-900 font-semibold leading-none"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {formatPrice(p.priceFrom, p.priceCurrency || "EUR")}
                      </span>
                      <span className="text-xs text-ink-500 font-medium">
                        {p.priceIncludesVAT ? "TVA inclus" : "+ TVA"}
                      </span>
                    </div>
                    {bnr && (
                      <div className="text-[11px] mono text-uzx-blue font-semibold mt-2 whitespace-nowrap">
                        1 Euro = {bnr.rate.toFixed(4).replace(".", ",")} lei · {formatBnrDate(bnr.date)}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-ink-500">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      >
                        <circle cx="6" cy="6" r="5" />
                        <path d="M6 3.5v3M6 8v.5" strokeLinecap="round" />
                      </svg>
                      <span>
                        {p.priceNote ||
                          "Preț orientativ configurație de bază"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2.5">
                  <AddToQuoteButton sku={p.sku} name={p.name} variant="primary">
                    Cere ofertă personalizată
                  </AddToQuoteButton>

                  {/* Asigurări rapide — chiar sub CTA-ul principal pentru a reduce frecarea */}
                  <div className="space-y-1.5 text-xs text-ink-500 py-1">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange shrink-0"></span>
                      <span>Răspuns în 30 minute</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange shrink-0"></span>
                      <span>Consultanță tehnică gratuită</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange shrink-0"></span>
                      <span>Configurare adaptată la cerere</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-ink-100" />

                  {p.datasheetUrl ? (
                    <a
                      href={p.datasheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center text-[13px] py-2.5 border border-ink-300 text-ink-900 hover:bg-ink-50 transition inline-flex items-center justify-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 1v8M3 5l4 4 4-4M1 11h12" />
                      </svg>
                      Descarcă fișa tehnică
                    </a>
                  ) : (
                    <span
                      className="text-center text-[13px] py-2.5 border border-ink-200 text-ink-300 cursor-not-allowed"
                      title="Fișa tehnică indisponibilă"
                    >
                      Fișă indisponibilă
                    </span>
                  )}

                  {(() => {
                    const msg = `Salut! Sunt interesat de ${p.name} (cod ${p.sku}). Puteți să-mi trimiteți mai multe detalii?`;
                    const waUrl = `https://wa.me/40769081081?text=${encodeURIComponent(msg)}`;
                    return (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center text-[13px] py-2.5 border border-ink-300 text-ink-900 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition inline-flex items-center justify-center gap-2"
                      >
                        {/* WhatsApp icon */}
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Vorbește cu un inginer
                      </a>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANDĂ BENEFICII UZINEX — comună tuturor produselor */}
      <BenefitsStrip />

      {/* DESCRIERE */}
      {(() => {
        const effBlocks = effectiveBlocks(p, override);
        // Append a generated "related products" sentence — its product-name
        // mentions feed the existing linkify pipeline, producing contextual
        // product-to-product links. Source text in produse.json is never
        // modified; the paragraph is synthesized deterministically at render.
        const relatedText = buildRelatedParagraph(p, PRODUCTS);
        const blocksWithRelated: DescriptionBlock[] = relatedText
          ? [...effBlocks, { type: "paragraph", text: relatedText }]
          : effBlocks;
        const restBlocks = blocksWithRelated.filter(
          (b) => b.type === "table" || b.text.replace(/\s|\\[rn]/g, "").length > 0
        );
        // Shared across every paragraph so each internal-link target is used at most once per page.
        const alreadyLinked = new Set<string>();
        const currentPath = `/produs/${p.slug}`;
        // Product→product targets built once per render: every OTHER product's full name
        // becomes a candidate anchor, excluding the current product and short/generic names.
        const productTargets = buildProductTargets(p.slug, PRODUCTS, p);

        return (
          <section className="py-16 lg:py-24 bg-ink-50/40 border-y border-ink-100">
            <div className="container-x">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {/* DESCRIERE COMPLETĂ */}
                <article className="lg:col-span-8">
                  <div className="bg-white border border-ink-100 shadow-sm overflow-hidden h-full">
                    {/* HEADER — acum in interiorul cardului, peste descriere */}
                    <div className="px-8 lg:px-10 pt-8 lg:pt-10 pb-2 text-center">
                      <div className="text-[13px] uppercase tracking-[0.2em] text-uzx-orange mono inline-flex items-center gap-3">
                        <span className="w-8 h-px bg-uzx-orange" />
                        Despre acest echipament
                        <span className="w-8 h-px bg-uzx-orange" />
                      </div>
                      <div className="mt-5 flex items-center justify-center gap-3">
                        <span className="w-12 h-px bg-ink-200" />
                        <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange" />
                        <span className="w-12 h-px bg-ink-200" />
                      </div>
                    </div>
                    <div className="px-8 lg:px-10 py-7 space-y-5 text-ink-600 text-[14px] leading-[1.85] font-light">
                      {restBlocks.length > 0 ? (
                        restBlocks.map((b, i) =>
                          b.type === "paragraph" ? (
                            <AutoLinkedText
                              key={i}
                              text={b.text}
                              alreadyLinked={alreadyLinked}
                              currentPath={currentPath}
                              extraTargets={productTargets}
                              maxProductLinksPerPage={3}
                            />
                          ) : (
                            <div
                              key={i}
                              className="overflow-x-auto -mx-2 my-2 border border-ink-100"
                            >
                              <table className="w-full text-[13px]">
                                <tbody>
                                  {b.rows.map((row, ri) => {
                                    const isHeader = ri === 0;
                                    return (
                                      <tr
                                        key={ri}
                                        className={
                                          isHeader
                                            ? "bg-ink-50"
                                            : "border-t border-ink-100 hover:bg-ink-50/50 transition"
                                        }
                                      >
                                        {row.map((cell, ci) => {
                                          const Tag = isHeader ? "th" : "td";
                                          return (
                                            <Tag
                                              key={ci}
                                              className={`px-4 py-2.5 align-top text-left ${
                                                isHeader
                                                  ? "text-[11px] mono uppercase tracking-wider text-ink-500 font-semibold"
                                                  : ci === 0
                                                  ? "text-ink-500 w-[40%]"
                                                  : "text-ink-900 font-medium"
                                              }`}
                                            >
                                              {cell || "—"}
                                            </Tag>
                                          );
                                        })}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )
                        )
                      ) : (
                        <p className="text-ink-400 italic">
                          Descriere extinsă indisponibilă pentru acest produs.
                        </p>
                      )}
                    </div>
                  </div>
                </article>

                {/* STICKY INFO SIDEBAR — aliniat cu descrierea, sticky sus (sub header) */}
                <aside className="lg:col-span-4">
                  <div className="lg:sticky lg:top-24">
                  <div
                    className="relative overflow-hidden bg-white border border-ink-100 w-full"
                    style={{
                      boxShadow:
                        "0 30px 60px -25px rgba(30,107,184,0.25), 0 8px 20px -8px rgba(8,37,69,0.08)",
                    }}
                  >
                    {/* top accent bar */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-uzx-blue via-uzx-blue to-uzx-orange" />
                    <div className="relative p-6 lg:p-7">
                      <h3
                        className="serif text-lg lg:text-xl text-ink-900 leading-[1.2] break-words"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {p.name}
                      </h3>

                      <div className="mt-5 h-px bg-ink-100" />

                      <ul className="mt-5 space-y-2.5">
                        {[
                          [
                            "Investiție protejată",
                            "5 ani garanție + suport post-vânzare",
                          ],
                          [
                            "Manual de utilizare și mentenanță",
                            "Cu inteligență artificială",
                          ],
                          [
                            "Pregătit pentru achiziție publică",
                            "Documentație compatibilă SEAP / SICAP",
                          ],
                          [
                            "Conform DNSH",
                            "Eligibil fonduri EU — PNRR, POR",
                          ],
                        ].map(([title, sub]) => (
                          <li key={title} className="flex items-start gap-2.5">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-uzx-blue/10 border border-uzx-blue/30 flex items-center justify-center text-uzx-blue text-[10px] shrink-0 font-bold">
                              ✓
                            </span>
                            <div>
                              <div className="text-[12px] text-ink-900 font-medium leading-tight">
                                {title}
                              </div>
                              <div className="text-[10px] text-ink-500 leading-tight mt-0.5">
                                {sub}
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* PRICE (dacă setat) — deasupra CTA-ului pentru self-qualification */}
                      {p.priceFrom && p.priceFrom > 0 && (
                        <div className="mt-6 pb-5 border-b border-ink-100">
                          <div className="text-[10px] uppercase tracking-wider text-ink-500 font-medium">
                            De la
                          </div>
                          <div className="flex items-baseline gap-2 mt-0.5">
                            <span
                              className="serif text-[26px] text-ink-900 font-semibold leading-none"
                              style={{ letterSpacing: "-0.02em" }}
                            >
                              {formatPrice(p.priceFrom, p.priceCurrency || "EUR")}
                            </span>
                            <span className="text-[11px] text-ink-500 font-medium">
                              {p.priceIncludesVAT ? "TVA inclus" : "+ TVA"}
                            </span>
                          </div>
                          {bnr && (
                            <div className="text-[10px] mono text-uzx-blue font-semibold mt-1.5 whitespace-nowrap">
                              1 Euro = {bnr.rate.toFixed(4).replace(".", ",")} lei · {formatBnrDate(bnr.date)}
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-ink-500">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                              <circle cx="6" cy="6" r="5" />
                              <path d="M6 3.5v3M6 8v.5" strokeLinecap="round" />
                            </svg>
                            <span>{p.priceNote || "Preț orientativ configurație de bază"}</span>
                          </div>
                        </div>
                      )}

                      <div className={(p.priceFrom && p.priceFrom > 0 ? "mt-5" : "mt-6") + " flex flex-col gap-2.5"}>
                        <AddToQuoteButton sku={p.sku} name={p.name} variant="primary">
                          Cere ofertă personalizată
                        </AddToQuoteButton>

                        {p.datasheetUrl ? (
                          <a
                            href={p.datasheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-[12px] py-2.5 border border-ink-300 text-ink-900 hover:bg-ink-50 transition inline-flex items-center justify-center gap-2"
                          >
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M7 1v8M3 5l4 4 4-4M1 11h12" />
                            </svg>
                            Descarcă fișa tehnică
                          </a>
                        ) : (
                          <span className="text-center text-[12px] py-2.5 border border-ink-200 text-ink-400 cursor-not-allowed">
                            Fișă indisponibilă
                          </span>
                        )}

                        {(() => {
                          const msg = `Salut! Sunt interesat de ${p.name} (cod ${p.sku}). Puteți să-mi trimiteți mai multe detalii?`;
                          const waUrl = `https://wa.me/40769081081?text=${encodeURIComponent(msg)}`;
                          return (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-center text-[12px] py-2.5 border border-ink-300 text-ink-900 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition inline-flex items-center justify-center gap-2"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                              </svg>
                              Vorbește cu un inginer
                            </a>
                          );
                        })()}
                      </div>

                    </div>
                  </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        );
      })()}

      {/* SIMILAR */}
      {similar.length > 0 && (
        <section className="py-14 lg:py-20 bg-ink-50/60 border-y border-ink-100">
          <div className="container-x">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Soluții tehnice similare
            </div>
            <div className="bg-white border border-ink-100 shadow-xl shadow-ink-900/5 px-6 lg:px-14 py-10 lg:py-12 mt-4">
              <SimilarCarousel items={similar} />
            </div>
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="py-14 lg:py-20 bg-ink-50/60 border-y border-ink-100">
        <div className="container-x">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
            — Caracteristici & beneficii
          </div>
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-2xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Construit pentru fiabilitate și performanță.
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group relative bg-white border border-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-6 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-uzx-blue" />
                <div className="w-10 h-10 rounded-full bg-uzx-orange/10 border border-uzx-orange/30 flex items-center justify-center text-uzx-orange font-semibold mt-2">
                  ✓
                </div>
                <h3 className="serif text-base text-ink-900 mt-4 leading-snug">{f.title}</h3>
                <div className="w-10 h-px bg-uzx-orange mt-2" />
                <p className="mt-2.5 text-[12px] text-ink-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 lg:py-20">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Întrebări frecvente
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
              style={{ letterSpacing: "-0.03em" }}
            >
              Tot ce vrei să știi înainte de cumpărare.
            </h2>
            <a
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-[13px] py-2.5 px-5 bg-uzx-blue hover:bg-uzx-blue2 text-white transition"
            >
              Discută cu un inginer →
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="border border-ink-100 bg-white shadow-sm overflow-hidden divide-y divide-ink-100">
              {FAQ.map((item) => (
                <details key={item.q} className="group">
                  <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between gap-4 hover:bg-ink-50/50 transition">
                    <span className="serif text-sm lg:text-base text-ink-900 font-medium">
                      {item.q}
                    </span>
                    <span className="text-uzx-orange text-lg shrink-0 transition group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-4 text-[13px] text-ink-500 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY UZINEX */}
      <section className="relative py-16 lg:py-24 overflow-hidden" style={{ background: "#082545" }}>
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 24px)",
          }}
        />
        <div
          className="absolute -left-32 top-1/3 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(30,107,184,0.35) 0%, rgba(30,107,184,0) 70%)",
          }}
        />
        <div
          className="absolute -right-40 -bottom-40 w-[520px] h-[520px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,133,31,0.18) 0%, rgba(245,133,31,0) 70%)",
          }}
        />

        <div className="container-x relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-12 lg:mb-16">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                — De ce Uzinex
              </div>
              <h2
                className="serif text-3xl lg:text-4xl text-white leading-[1.05]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Partenerul tău tehnic,
                <span className="block text-uzx-orange">de la livrare la mentenanță.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-white/65 text-[13px] leading-relaxed max-w-md lg:ml-auto">
                Peste 15 ani de experiență în furnizarea de echipamente industriale, cu o
                rețea națională de service și o echipă de ingineri dedicați.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["01", "Transport gratuit", "Livrare națională inclusă în prețul de achiziție pentru toate echipamentele."],
              ["02", "Suport expert", "Echipă de ingineri pentru consultanță tehnică pre și post vânzare."],
              ["03", "Finanțare flexibilă", "Soluții de leasing și credite prin partenerii financiari Uzinex."],
              ["04", "Garanție extinsă", "60 luni standard + contracte opționale de mentenanță preventivă."],
            ].map(([num, title, body]) => (
              <div
                key={num}
                className="group relative border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 lg:p-7 hover:border-uzx-orange/60 hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-uzx-orange to-transparent opacity-0 group-hover:opacity-100 transition" />
                <div className="flex items-center justify-between">
                  <span className="text-[10px] mono text-uzx-orange tracking-[0.25em]">
                    {num}
                  </span>
                  <span className="w-8 h-8 border border-white/20 flex items-center justify-center text-white/40 text-sm group-hover:border-uzx-orange group-hover:text-uzx-orange group-hover:rotate-45 transition">
                    →
                  </span>
                </div>
                <h3 className="serif text-lg text-white mt-6 leading-snug group-hover:text-uzx-orange transition">
                  {title}
                </h3>
                <div className="w-8 h-px bg-uzx-orange mt-3 group-hover:w-14 transition-all duration-300" />
                <p className="mt-3 text-[12px] text-white/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
