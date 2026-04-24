import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PRODUCTS, type DescriptionBlock } from "@/app/magazin/Mproducts";
import { AddToQuoteButton } from "@/app/magazin/AddToQuoteButton";
import { SimilarCarousel } from "./SimilarCarousel";
import { ProductGallery } from "./ProductGallery";
import { SpecIcon } from "./SpecIcon";
import { BenefitsStrip } from "./BenefitsStrip";
import { VideoSection } from "./VideoSection";
import { SpecsSection } from "./SpecsSection";
import { ExpandableDescription } from "./ExpandableDescription";
import { ApplicationsGrid } from "./ApplicationsGrid";
import { productSchema, breadcrumbSchema } from "@/lib/seo";
import { getProductWithSEO } from "@/lib/seo/product-seo";
import {
  extractTopSpecs,
  type SpecIcon as SpecIconType,
} from "@/lib/product-specs";
import benefitsData from "@/data/product-benefits.json";
import faqsData from "@/data/product-faqs.json";
import { AutoLinkedText } from "@/components/AutoLinkedText";
import { buildProductTargets } from "@/lib/internal-links";
import { formatPrice } from "@/lib/format-price";
import { getBnrEurRate } from "@/lib/bnr";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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

const UNIVERSAL_FAQ = [
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

type ProductFaqEntry = { q: string; a: string };

function effectiveBlocks(
  product: { description: string; descriptionBlocks?: DescriptionBlock[] },
  override?: { description?: string; descriptionBlocks?: DescriptionBlock[] } | null
): DescriptionBlock[] {
  const base = product.descriptionBlocks || [];
  const hasBlocksOverride =
    override?.descriptionBlocks && override.descriptionBlocks.length > 0;
  const hasDescOverride =
    override?.description &&
    override.description.trim() !== product.description?.trim();

  if (hasBlocksOverride) return override!.descriptionBlocks as DescriptionBlock[];

  if (hasDescOverride) {
    const paragraphs = override!
      .description!.split(/\n\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 30);

    return paragraphs.map((text) => ({ type: "paragraph" as const, text }));
  }

  return base;
}

function specsFromBlocks(blocks: DescriptionBlock[]): [string, string][] {
  for (const b of blocks) {
    if (b.type === "table" && b.rows.length > 1) {
      return b.rows
        .slice(1)
        .filter((r) => r.length >= 2)
        .map((r) => [r[0], r[1]] as [string, string]);
    }
  }

  return [];
}

const DEFAULT_VIDEO_BULLETS = [
  {
    title: "Schimbare automată a sculelor",
    body: "Caruselul ATC trece între freze fără oprirea ciclului.",
  },
  {
    title: "Lucru pe piese groase",
    body: "Masa afundată acomodează grosimi mari fără adaptări.",
  },
  {
    title: "Operare prin SYNTEC",
    body: "Interfață intuitivă, nu necesită programatori.",
  },
  {
    title: "Lubrifiere cu ceață de ulei",
    body: "Componentele mecanice își păstrează precizia în timp.",
  },
];

const DEFAULT_APPLICATIONS = (
  heroImg: string,
  gallery: { type: string; url?: string }[]
) => {
  const imgs = gallery
    .filter(
      (g): g is { type: "image"; url: string } =>
        g.type === "image" && !!(g as { url?: string }).url
    )
    .map((g) => g.url);

  const pool = [heroImg, ...imgs].filter(Boolean) as string[];
  const pick = (i: number) => pool[i % pool.length] || heroImg;

  return [
    {
      title: "Mobilier de lux",
      caption: "Lemn masiv, frezare ornamentală",
      image: pick(1),
    },
    {
      title: "Matrițe industriale",
      caption: "Auto, aeronautic, naval",
      image: pick(2),
    },
    {
      title: "Decorațiuni navale",
      caption: "Panouri și elemente fixe",
      image: pick(3),
    },
    {
      title: "Sculptură ornamentală",
      caption: "Reliefuri și profiluri 3D",
      image: pick(4),
    },
  ];
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

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

  const priceCurrency = p.priceCurrency || "EUR";

  const bnr =
    priceCurrency === "EUR" && p.priceFrom && p.priceFrom > 0
      ? await getBnrEurRate()
      : null;

  const others = PRODUCTS.filter((x) => x.slug !== p.slug);

  const tier1 = p.subSubcategory
    ? others.filter((x) => x.subSubcategory === p.subSubcategory)
    : [];

  const tier2 = p.subcategory
    ? others.filter(
        (x) => x.subcategory === p.subcategory && !tier1.includes(x)
      )
    : [];

  const tier3 = others.filter(
    (x) => x.category === p.category && !tier1.includes(x) && !tier2.includes(x)
  );

  const similar = [...tier1, ...tier2, ...tier3].slice(0, 12);

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

  const effBlocks = effectiveBlocks(p, override);
  const specRows = specsFromBlocks(effBlocks);

  const benefitsMap = benefitsData as Record<
    string,
    Array<{ icon: string; benefitTitle: string; benefitValue: string }>
  >;

  const benefits = benefitsMap[p.slug];

  type BenefitRow = {
    icon: SpecIconType;
    title: string;
    value: string;
  };

  const heroSpecs: BenefitRow[] =
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

  const firstYoutube = (p.gallery || []).find((g) => g.type === "youtube");

  const videoId =
    firstYoutube && firstYoutube.type === "youtube"
      ? firstYoutube.videoId
      : undefined;

  const applications = DEFAULT_APPLICATIONS(p.image, p.gallery || []);

  const perProductFaqs = (
    (faqsData as Record<string, ProductFaqEntry[]>)[p.slug] ?? []
  ).filter((x) => x && x.q && x.a);

  const seenQuestions = new Set<string>(
    perProductFaqs.map((x) => x.q.toLowerCase().trim())
  );

  const combinedFaqs = [
    ...perProductFaqs,
    ...UNIVERSAL_FAQ.filter(
      (x) => !seenQuestions.has(x.q.toLowerCase().trim())
    ),
  ];

  const currentPath = `/produs/${p.slug}`;
  const productTargets = buildProductTargets(p.slug, PRODUCTS, p);
  const alreadyLinked = new Set<string>();

  const waMsg = `Salut! Sunt interesat de ${p.name} (cod ${p.sku}). Puteți să-mi trimiteți mai multe detalii?`;
  const waUrl = `https://wa.me/40769081081?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="bg-white text-ink-900">
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

      <main>
        {/* HERO PRODUS */}
        <section className="bg-white border-b border-ink-200">
          <div className="container-x py-6 lg:py-8">
            <div className="mx-auto grid max-w-[1420px] grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* GALERIE */}
              <div className="lg:col-span-5 h-full">
                <div className="h-full border border-ink-200 bg-white">
                  <ProductGallery
                    mainImage={p.image}
                    mainAlt={p.imageAlt || p.name}
                    productName={p.name}
                    gallery={p.gallery || []}
                  />
                </div>
              </div>

              {/* INFORMAȚII PRODUS */}
              <div className="lg:col-span-4 h-full">
                <div className="h-full p-0 lg:p-0 flex flex-col">
                  {(p.subcategory || p.category) && (
                    <div className="inline-flex self-start items-center border border-uzx-blue px-3 py-1 text-[12px] font-semibold text-uzx-blue mb-4">
                      {p.subcategory || p.category}
                    </div>
                  )}

                  <h1 className="text-[28px] lg:text-[34px] leading-[1.1] font-bold text-[#0b2b66]">
                    {p.name}
                  </h1>

                  <div className="mt-3 text-[13px] text-ink-600">
                    <span className="font-semibold text-[#0b2b66]">
                      Cod produs:
                    </span>{" "}
                    <span className="font-mono">{p.sku}</span>
                  </div>

                  {p.shortSpec && (
                        <p className="mt-5 text-[12px] leading-7 text-ink-600 max-w-[95%]">
                          {p.shortSpec}
                        </p>
                      )}

                  {heroSpecs.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {heroSpecs.map((row, i) => (
                        <div
                          key={i}
                          className="border border-ink-200 bg-white px-4 py-4 min-h-[105px]"
                        >
                          <div className="text-uzx-orange mb-2">
                            <SpecIcon icon={row.icon} />
                          </div>

                          <div className="text-[13px] font-bold leading-tight text-[#0b2b66]">
                            {row.title}
                          </div>

                          <div className="mt-1 text-[11px] leading-snug text-ink-500">
                            {row.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-auto pt-5">
                    <div className="w-full [&_button]:w-full [&_a]:w-full">
                      <AddToQuoteButton
                        sku={p.sku}
                        name={p.name}
                        variant="primary"
                      >
                        Cere ofertă personalizată
                      </AddToQuoteButton>
                    </div>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 border border-ink-200 px-4 py-3 text-[13px] font-semibold text-uzx-blue hover:border-uzx-orange hover:text-uzx-orange transition"
                      >
                        Întreabă un specialist
                      </a>

                      {p.datasheetUrl ? (
                        <a
                          href={p.datasheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 border border-ink-200 px-4 py-3 text-[13px] font-semibold text-uzx-orange hover:bg-uzx-orange hover:text-white transition"
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 14 14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M7 1v8M3 5l4 4 4-4M1 11h12" />
                          </svg>
                          Descarcă fișa tehnică
                        </a>
                      ) : (
                        <span className="inline-flex items-center justify-center border border-ink-200 px-4 py-3 text-[13px] text-ink-400">
                          Fișă indisponibilă
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* COLOANA 3 — PREȚ + FORMULAR */}
              <aside className="lg:col-span-3 h-full">
                <div className="h-full border border-ink-200 bg-white p-6 lg:p-7 shadow-sm">
                  <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-5">
                    — Opțiuni comandă
                  </div>

                  <div className="text-[12px] uppercase tracking-[0.16em] text-ink-500 font-semibold">
                    Preț de la
                  </div>

                  <div className="mt-2 flex items-end gap-2 flex-wrap">
                    <span className="text-[36px] lg:text-[42px] leading-none font-semibold text-[#111827] tracking-[-0.04em]">
                      {p.priceFrom && p.priceFrom > 0
                        ? formatPrice(p.priceFrom, p.priceCurrency || "EUR")
                        : "€Pret"}
                    </span>

                    {p.priceFrom && p.priceFrom > 0 && (
                      <span className="pb-1 text-[14px] font-semibold text-ink-500">
                        {p.priceIncludesVAT ? "TVA inclus" : "+ TVA"}
                      </span>
                    )}
                  </div>

                  {bnr && (
                    <div className="mt-4 text-[13px] mono font-bold text-[#015CA8]">
                      1 Euro = {bnr.rate.toFixed(4).replace(".", ",")} lei
                    </div>
                  )}

                  <div className="mt-4 flex items-start gap-2 text-[13px] leading-relaxed text-ink-500">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      className="mt-1 shrink-0"
                    >
                      <circle cx="6" cy="6" r="5" />
                      <path d="M6 3.5v3M6 8v.5" strokeLinecap="round" />
                    </svg>

                    <span>{p.priceNote || "Preț orientativ"}</span>
                  </div>

                  <div className="my-5 h-px bg-ink-200" />

                  <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
                    Cere o ofertă completând formularul.
                  </p>

                  <form className="space-y-3">
                    <input type="hidden" name="productName" value={p.name} />
                    <input type="hidden" name="productSku" value={p.sku} />

                    <div>
                      <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
                        Nume și prenume *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Nume complet"
                        className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="07xx xxx xxx"
                        className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="email@companie.ro"
                        className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
                        CUI / Companie
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="Ex: Uzinex S.R.L."
                        className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 flex w-full items-center justify-center gap-2 bg-uzx-orange px-4 py-3 text-[14px] font-bold text-white hover:bg-[#015CA8] transition"
                    >
                      Solicită ofertă
                      <span>➤</span>
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* BENEFICII */}
        <BenefitsStrip />

        {/* VIDEO */}
        <VideoSection
          videoId={videoId}
          intro={`Descoperă precizia și viteza de prelucrare pentru ${p.name} în aplicații reale de producție.`}
          bullets={DEFAULT_VIDEO_BULLETS}
        />

        {/* SPECIFICAȚII */}
        <SpecsSection
          rows={specRows}
          ctaTitle="Ai nevoie de configurație specifică?"
          ctaSubtitle="Specialiștii noștri te ajută să alegi varianta potrivită pentru aplicația ta."
          productName={p.name}
          productSku={p.sku}
        />

        {/* DESCRIERE + DETALII PRODUS */}
        <section className="py-10 lg:py-12 bg-[#f8f8f8] border-t border-ink-100">
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <article className="lg:col-span-8 border border-ink-200 bg-white p-6 lg:p-10 shadow-sm">
                <div className="text-center mb-10">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <span className="h-px w-12 bg-uzx-orange" />
                    <div className="text-[15px] lg:text-[17px] tracking-[0.35em] uppercase text-uzx-orange">
                      Despre acest echipament
                    </div>
                    <span className="h-px w-12 bg-uzx-orange" />
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <span className="h-px w-16 bg-ink-300" />
                    <span className="w-2 h-2 rounded-full bg-uzx-orange inline-block" />
                    <span className="h-px w-16 bg-ink-300" />
                  </div>
                </div>

                <div className="text-[16px] leading-8 text-[#26324a]">
                  <ExpandableDescription
                    short={p.description || p.shortSpec || ""}
                    full={effBlocks.map((b, i) => {
                      if (b.type === "paragraph") {
                        return (
                          <AutoLinkedText
                            key={i}
                            text={b.text}
                            alreadyLinked={alreadyLinked}
                            currentPath={currentPath}
                            extraTargets={productTargets}
                            maxProductLinksPerPage={3}
                          />
                        );
                      }

                      return (
                        <div
                          key={i}
                          className="overflow-x-auto my-7 border border-ink-200"
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
                                        : "border-t border-ink-100"
                                    }
                                  >
                                    {row.map((cell, ci) => {
                                      const Tag = isHeader ? "th" : "td";

                                      return (
                                        <Tag
                                          key={ci}
                                          className={`px-5 py-3 align-top text-left ${
                                            isHeader
                                              ? "text-[11px] uppercase tracking-wider text-ink-500 font-bold"
                                              : ci === 0
                                              ? "text-ink-500 w-[40%]"
                                              : "text-ink-900 font-semibold"
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
                      );
                    })}
                  />
                </div>
              </article>

              <aside className="lg:col-span-4 flex">
                <div className="w-full lg:sticky lg:top-24 lg:self-start">
                  <div className="overflow-hidden border border-ink-200 bg-white shadow-[0_18px_45px_rgba(8,37,69,0.10)]">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#015CA8] via-[#6e88a8] to-[#fa9148]" />

                    <div className="p-6 lg:p-8">
                      <h3 className="text-[24px] lg:text-[28px] leading-tight font-bold text-[#111827]">
                        {p.name}
                      </h3>

                      <div className="mt-5 border-t border-ink-200 pt-5">
                        <div className="inline-flex items-center border border-[#d7e5f4] bg-[#f7fbff] px-3 py-1.5 text-[12px] font-semibold text-[#0b2b66]">
                          Cod produs: {p.sku}
                        </div>
                      </div>
                     
                      <div className="mt-6 space-y-4">
                        {[
                          {
                            title: "Investiție protejată",
                            subtitle: "60 luni garanție + suport post-vânzare",
                          },
                          {
                            title: "Transport & PIF incluse",
                            subtitle: "Livrare, instalare și punere în funcțiune",
                          },
                          {
                            title: "Pregătit pentru achiziție publică",
                            subtitle: "Documentație compatibilă SEAP / SICAP",
                          },
                          {
                            title: "Fonduri europene",
                            subtitle: "Eligibil PNRR, POR și alte finanțări",
                          },
                        ].map((item) => (
                          <div key={item.title} className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#8ec3f5] bg-[#eef7ff] text-[#015CA8] text-[13px] font-bold">
                              ✓
                            </span>

                            <div>
                              <div className="text-[15px] font-bold leading-tight text-[#111827]">
                                {item.title}
                              </div>
                              <div className="mt-1 text-[13px] leading-snug text-ink-500">
                                {item.subtitle}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 space-y-3">
                        <div className="w-full [&_button]:!w-full [&_a]:!w-full [&_button]:!bg-[#fb7f16] [&_a]:!bg-[#fb7f16] [&_button]:hover:!bg-[#015CA8] [&_a]:hover:!bg-[#015CA8]">
                          <AddToQuoteButton
                            sku={p.sku}
                            name={p.name}
                            variant="primary"
                          >
                            Cere ofertă personalizată
                          </AddToQuoteButton>
                        </div>

                        {p.datasheetUrl && (
                          <a
                            href={p.datasheetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 border border-ink-300 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] hover:border-uzx-orange hover:text-uzx-orange transition"
                          >
                            Descarcă fișa tehnică
                          </a>
                        )}

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-center gap-2 border border-ink-300 bg-white px-4 py-3 text-[14px] font-medium text-[#111827] hover:border-[#25D366] hover:text-[#25D366] transition"
                        >
                          Vorbește cu un inginer
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* APLICAȚII */}
        <ApplicationsGrid items={applications} />

        {/* FAQ COMPACT */}
        <section className="py-8 lg:py-10 bg-white">
          <div className="container-x">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[24px] leading-tight font-bold text-[#0b2b66]">
                Întrebări frecvente
              </h2>
              <span className="h-px w-10 bg-uzx-orange" />
            </div>

            <div className="border border-ink-200 bg-white divide-y divide-ink-100">
              {combinedFaqs.map((item, i) => (
                <details key={`${i}-${item.q}`} className="group">
                  <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-4 hover:bg-ink-50 transition">
                    <span className="text-[14px] font-bold text-[#0b2b66]">
                      {item.q}
                    </span>
                    <span className="text-uzx-orange text-xl leading-none transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <div className="px-4 pb-4 text-[13px] leading-relaxed text-ink-600">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUSE SIMILARE */}
        {similar.length > 0 && (
          <section className="py-8 lg:py-10 bg-white border-t border-ink-100">
            <div className="container-x">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-[24px] leading-tight font-bold text-[#0b2b66]">
                  Produse similare
                </h2>
                <span className="h-px w-10 bg-uzx-orange" />
              </div>

              <SimilarCarousel items={similar} />
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}