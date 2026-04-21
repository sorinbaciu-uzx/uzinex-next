import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS, type DescriptionBlock } from "@/app/magazin/products";
import { AddToQuoteButton } from "@/app/magazin/AddToQuoteButton";
import { SimilarCarousel } from "./SimilarCarousel";
import { ProductGallery } from "./ProductGallery";
import { productSchema, breadcrumbSchema } from "@/lib/seo";
import { getProductWithSEO } from "@/lib/seo/product-seo";

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

      {/* HERO PRODUS */}
      <section className="relative" style={{ background: "#082545" }}>
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 22px)",
          }}
        />
        <div
          className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,133,31,0.18) 0%, rgba(245,133,31,0) 70%)",
          }}
        />

        <div className="container-x relative pt-10 pb-14 lg:pt-12 lg:pb-20">
          <nav className="text-[11px] mono uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-2 flex-wrap">
            <a href="/" className="hover:text-uzx-orange transition">Acasă</a>
            <span>/</span>
            <a href="/magazin" className="hover:text-uzx-orange transition">Catalog tehnic</a>
            <span>/</span>
            <span className="text-uzx-orange">{p.sku}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <div className="max-w-md mx-auto">
                <div className="relative bg-white shadow-2xl shadow-black/30 overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-uzx-orange z-10" />
                  <div className="absolute top-4 left-4 text-[10px] mono uppercase tracking-[0.15em] text-ink-400 z-10">
                    {p.sku}
                  </div>
                  <div className="absolute top-4 right-4 text-[9px] mono uppercase tracking-[0.15em] text-uzx-blue border border-uzx-blue/20 bg-uzx-blue/5 px-2 py-0.5 z-10">
                    {p.subcategory || p.category}
                  </div>

                  <div className="h-[280px] lg:h-[320px] flex items-center justify-center px-12 pt-6 pb-4">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={500}
                        height={360}
                        className="object-contain max-h-full w-auto"
                        priority
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-ink-300">
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                        <span className="mt-3 text-[10px] mono uppercase tracking-wider text-ink-300">
                          imagine indisponibilă
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Galerie thumbnails + lightbox (doar dacă există items) */}
                {p.gallery && p.gallery.length > 0 && (
                  <ProductGallery
                    mainImage={p.image}
                    mainAlt={p.name}
                    gallery={p.gallery}
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-6 text-white">
              <div className="text-[10px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                — {breadcrumb}
              </div>
              <h1
                className="serif text-2xl md:text-3xl lg:text-4xl leading-[1.1]"
                style={{ letterSpacing: "-0.03em" }}
              >
                {p.name}
              </h1>
              {p.shortSpec && (
                <p className="mt-4 text-white/75 text-sm leading-relaxed max-w-md">
                  {p.shortSpec}
                </p>
              )}

              <ul className="mt-6 space-y-2.5">
                {[
                  ["60 luni", "Garanție producător"],
                  ["Service inclus", "Mentenanță națională"],
                  ["Transport gratuit", "Livrare în toată țara"],
                  ["SEAP / SICAP", "Eligibil achiziții publice"],
                ].map(([title, sub]) => (
                  <li key={title} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-uzx-orange/15 border border-uzx-orange/40 flex items-center justify-center text-uzx-orange text-[10px] shrink-0">
                      ✓
                    </span>
                    <div>
                      <div className="text-[13px] text-white font-medium leading-tight">{title}</div>
                      <div className="text-[11px] text-white/55 leading-tight mt-0.5">{sub}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md">
                <AddToQuoteButton sku={p.sku} name={p.name} variant="primary">
                  Cere ofertă
                </AddToQuoteButton>
                {p.datasheetUrl ? (
                  <a
                    href={p.datasheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-[13px] py-3 border border-white/30 text-white hover:bg-white hover:text-ink-900 transition"
                  >
                    Descarcă fișa tehnică
                  </a>
                ) : (
                  <span
                    className="text-center text-[13px] py-3 border border-white/15 text-white/40 cursor-not-allowed"
                    title="Fișa tehnică indisponibilă"
                  >
                    Fișă indisponibilă
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIERE */}
      {(() => {
        const effBlocks = effectiveBlocks(p, override);
        const restBlocks = effBlocks.filter(
          (b) => b.type === "table" || b.text.replace(/\s|\\[rn]/g, "").length > 0
        );
        const wordCount = (p.description || "").split(/\s+/).filter(Boolean).length;
        const readMin = Math.max(1, Math.round(wordCount / 200));

        return (
          <section className="py-16 lg:py-24 bg-ink-50/40 border-y border-ink-100">
            <div className="container-x">
              {/* HEADER CENTRED */}
              <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-14">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-4 mono inline-flex items-center gap-3">
                  <span className="w-8 h-px bg-uzx-orange" />
                  Despre acest echipament
                  <span className="w-8 h-px bg-uzx-orange" />
                </div>
                <h2
                  className="serif text-3xl lg:text-4xl text-ink-900 leading-[1.1]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {p.name}
                </h2>
                <div className="mt-5 flex items-center justify-center gap-3">
                  <span className="w-12 h-px bg-ink-200" />
                  <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange" />
                  <span className="w-12 h-px bg-ink-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-6xl mx-auto">
                {/* DESCRIERE COMPLETĂ */}
                <article className="lg:col-span-8">
                  <div className="bg-white border border-ink-100 shadow-sm overflow-hidden h-full">
                    <div className="px-8 lg:px-10 py-5 border-b border-ink-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-uzx-blue/10 border border-uzx-blue/20 flex items-center justify-center text-uzx-blue text-xs font-semibold">
                          ¶
                        </span>
                        <h3 className="serif text-base lg:text-lg text-ink-900">
                          Detalii produs
                        </h3>
                      </div>
                      <span className="text-[10px] mono uppercase tracking-wider text-ink-400">
                        {readMin} min citire
                      </span>
                    </div>
                    <div className="px-8 lg:px-10 py-7 space-y-5 text-ink-600 text-[14px] leading-[1.85] font-light">
                      {restBlocks.length > 0 ? (
                        restBlocks.map((b, i) =>
                          b.type === "paragraph" ? (
                            <p key={i}>{b.text}</p>
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

                {/* STICKY INFO SIDEBAR */}
                <aside className="lg:col-span-4">
                  <div
                    className="lg:sticky lg:top-24 relative overflow-hidden bg-white border border-ink-100"
                    style={{
                      boxShadow:
                        "0 30px 60px -25px rgba(30,107,184,0.25), 0 8px 20px -8px rgba(8,37,69,0.08)",
                    }}
                  >
                    {/* top accent bar */}
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-uzx-blue via-uzx-blue to-uzx-orange" />
                    <div className="relative p-6 lg:p-7">
                      <div className="text-[10px] uppercase tracking-[0.2em] text-uzx-orange mono mb-3">
                        — {breadcrumb}
                      </div>
                      <h3
                        className="serif text-xl lg:text-2xl text-ink-900 leading-[1.15] line-clamp-2 min-h-[3.4rem]"
                        style={{ letterSpacing: "-0.03em" }}
                        title={cleanName}
                      >
                        {cleanName}
                      </h3>
                      <p className="mt-3 text-[12px] text-ink-500 leading-relaxed line-clamp-3 min-h-[3.6rem]">
                        {p.shortSpec || "\u00a0"}
                      </p>

                      <div className="mt-5 h-px bg-ink-100" />

                      <ul className="mt-5 space-y-2.5">
                        {[
                          ["60 luni", "Garanție producător"],
                          ["Service inclus", "Mentenanță națională"],
                          ["Transport gratuit", "Livrare în toată țara"],
                          ["SEAP / SICAP", "Eligibil achiziții publice"],
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

                      <div className="mt-6 flex flex-col gap-2.5">
                        <AddToQuoteButton sku={p.sku} name={p.name} variant="primary">
                          Cere ofertă
                        </AddToQuoteButton>
                        {p.datasheetUrl ? (
                          <a
                            href={p.datasheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-center text-[12px] py-2.5 border border-uzx-blue/30 text-uzx-blue hover:bg-uzx-blue hover:text-white hover:border-uzx-blue transition"
                          >
                            Descarcă fișa tehnică
                          </a>
                        ) : (
                          <span className="text-center text-[12px] py-2.5 border border-ink-200 text-ink-400 cursor-not-allowed">
                            Fișă indisponibilă
                          </span>
                        )}
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
