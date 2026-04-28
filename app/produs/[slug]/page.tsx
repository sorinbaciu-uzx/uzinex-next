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
import { VideoSection } from "./VideoSection";
import { ApplicationsGrid } from "./ApplicationsGrid";
import { ExpandableDescription } from "./ExpandableDescription";
import { SpecsSection } from "./SpecsSection";
import { ProductLeadForm } from "./ProductLeadForm";
import productApplicationsData from "@/data/product-applications.json";
import type { ApplicationAnimationId } from "@/components/product-applications";
import type { Application } from "./ApplicationsGrid";
import { VideoGallery, type VideoGalleryData } from "@/components/VideoGallery";
import { CaseStudies, type CaseStudiesHomeData } from "@/components/CaseStudies";
import { getContents } from "@/lib/content";
import { productSchema, breadcrumbSchema } from "@/lib/seo";
import { getProductWithSEO } from "@/lib/seo/product-seo";
import {
  extractTopSpecs,
  type SpecIcon as SpecIconType,
} from "@/lib/product-specs";
import { formatPrice } from "@/lib/format-price";
import benefitsData from "@/data/product-benefits.json";
import animationsData from "@/data/product-animations.json";
import {
  ProductAnimationBlock,
  type ProductAnimation,
} from "@/components/solution-anims/ProductAnimation";
import enrichmentsData from "@/data/product-enrichments.json";
import {
  ProductEnrichmentBlock,
  type ProductEnrichment,
} from "@/components/product-enrichments/ProductEnrichment";
import faqsData from "@/data/product-faqs.json";
import { AutoLinkedText } from "@/components/AutoLinkedText";
import { buildProductTargets } from "@/lib/internal-links";
import { buildRelatedParagraph } from "@/lib/related-products";
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

function effectiveBlocks(
  product: { description: string; descriptionBlocks?: DescriptionBlock[] },
  override?: {
    description?: string;
    descriptionBlocks?: DescriptionBlock[];
  } | null
): DescriptionBlock[] {
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

const DEFAULT_VIDEO_BULLETS = [
  {
    title: "Funcționare în aplicații reale",
    body: "Vezi utilajul în lucru și modul în care poate fi integrat în fluxul de producție.",
  },
  {
    title: "Precizie și productivitate",
    body: "Video-ul evidențiază viteza, stabilitatea și calitatea procesului de lucru.",
  },
  {
    title: "Operare intuitivă",
    body: "Clientul poate înțelege mai ușor modul de utilizare și avantajele echipamentului.",
  },
  {
    title: "Configurație adaptabilă",
    body: "Echipamentul poate fi ales în funcție de aplicație, material și volum de lucru.",
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

  // Content blocks comune cu home — afișate și pe produs înainte de "Soluții similare":
  //   • video_gallery → secțiunea "Uzinex la TV"
  //   • case_studies_home → secțiunea "Studii de caz"
  const homeBlocks = await getContents(["video_gallery", "case_studies_home"]);
  const videoGallery = homeBlocks.video_gallery as VideoGalleryData | undefined;
  const caseStudies = homeBlocks.case_studies_home as
    | CaseStudiesHomeData
    | undefined;

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

  const firstYoutube = (p.gallery || []).find((g) => g.type === "youtube");

  const videoId =
  firstYoutube && firstYoutube.type === "youtube"
    ? firstYoutube.videoId
    : undefined;

  const applicationsMap = productApplicationsData as Record<
    string,
    Array<{ title: string; caption?: string; animation?: string; image?: string }>
  >;
  const customApplications = applicationsMap[p.slug];
  const applications: Application[] = customApplications
    ? customApplications.map((a) => ({
        title: a.title,
        caption: a.caption,
        animation: a.animation as ApplicationAnimationId | undefined,
        image: a.image,
      }))
    : DEFAULT_APPLICATIONS(p.image, p.gallery || []);

  const effBlocksForSpecs = effectiveBlocks(p, override);
  const specRows = specsFromBlocks(effBlocksForSpecs);
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
      <section className="bg-white border-b border-ink-200">
        <div className="container-x py-6 lg:py-8">
          <div className="mx-auto grid max-w-[1420px] grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* GALERIE */}
            <div className="lg:col-span-5 h-full">
              <div className="h-full bg-white">
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

                {(() => {
                  type BenefitRow = {
                    icon: SpecIconType;
                    title: string;
                    value: string;
                  };

                  const benefitsMap = benefitsData as Record<
                    string,
                    Array<{
                      icon: string;
                      benefitTitle: string;
                      benefitValue: string;
                    }>
                  >;

                  const benefits = benefitsMap[p.slug];

                  const fromBenefits: BenefitRow[] = (benefits ?? []).map((b) => ({
                    icon: b.icon as SpecIconType,
                    title: b.benefitTitle,
                    value: b.benefitValue,
                  }));

                  const fromSpecs: BenefitRow[] = (p.specs ?? []).map((s) => ({
                    icon: s.icon,
                    title: s.title,
                    value: s.value,
                  }));

                  const fromExtracted: BenefitRow[] = extractTopSpecs(
                    p.descriptionBlocks,
                    8,
                  ).map((s) => ({ icon: s.icon, title: s.title, value: s.value }));

                  const seen = new Set<string>();
                  const heroSpecs: BenefitRow[] = [];
                  for (const row of [...fromBenefits, ...fromSpecs, ...fromExtracted]) {
                    if (heroSpecs.length >= 4) break;
                    const key = row.title.trim().toLowerCase();
                    if (seen.has(key)) continue;
                    seen.add(key);
                    heroSpecs.push(row);
                  }

                  if (heroSpecs.length === 0) return null;

                  return (
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
                  );
                })()}

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
              <div className="h-full bg-white p-6 lg:p-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-5">
                  — Opțiuni comandă
                </div>

                {p.priceFrom && p.priceFrom > 0 ? (
                  <>
                    <div className="text-[12px] uppercase tracking-[0.16em] text-ink-500 font-semibold">
                      Preț de la
                    </div>

                    <div className="mt-2 flex items-end gap-2 flex-wrap">
                      <span className="text-[36px] lg:text-[42px] leading-none font-semibold text-[#111827] tracking-[-0.04em]">
                        {formatPrice(p.priceFrom, p.priceCurrency || "EUR")}
                      </span>

                      <span className="pb-1 text-[14px] font-semibold text-ink-500">
                        {p.priceIncludesVAT ? "TVA inclus" : "+ TVA"}
                      </span>
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
                  </>
                ) : null}

                <ProductLeadForm productName={p.name} productSku={p.sku} productSlug={p.slug} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* BENEFICII */}
      <BenefitsStrip />

      {/* APLICAȚII */}
      <ApplicationsGrid items={applications} />

      {/* VIDEO */}
      {videoId && (
      <VideoSection
        videoId={videoId}
        intro={`Descoperă precizia și viteza de prelucrare pentru ${p.name} în aplicații reale de producție.`}
        bullets={DEFAULT_VIDEO_BULLETS}
      />
      )}

      {/* SPECIFICAȚII */}
      <SpecsSection
        rows={specRows}
        ctaTitle="Ai nevoie de configurație specifică?"
        ctaSubtitle="Specialiștii noștri te ajută să alegi varianta potrivită pentru aplicația ta."
        productName={p.name}
        productSku={p.sku}
      />

      {/* DESCRIERE */}
      {(() => {
        const effBlocks = effectiveBlocks(p, override);
        const relatedText = buildRelatedParagraph(p, PRODUCTS);

        const animationsMap = animationsData as Record<string, ProductAnimation[]>;
        const enrichmentsMap = enrichmentsData as Record<
          string,
          ProductEnrichment[]
        >;

        const recipeAnims = animationsMap[p.slug] ?? [];
        const rawEnrichments = enrichmentsMap[p.slug] ?? [];

        const seenImageUrls = new Set<string>();
        const recipeEnrichments: ProductEnrichment[] = [];

        for (const e of rawEnrichments) {
          if (e.type !== "image") {
            recipeEnrichments.push(e);
            continue;
          }

          const hint = e.data.galleryIndex;
          let resolvedSrc = e.data.src;

          if (hint != null && hint > 0 && p.gallery && p.gallery.length > 0) {
            const item = p.gallery[hint - 1];

            if (item && item.type === "image" && item.url) {
              resolvedSrc = item.url;
            }
          }

          if (seenImageUrls.has(resolvedSrc)) continue;

          seenImageUrls.add(resolvedSrc);

          recipeEnrichments.push({
            ...e,
            data: { ...e.data, src: resolvedSrc },
          });
        }

        const hasVideoInRecipe = recipeEnrichments.some(
          (e) => e.type === "video"
        );

        if (!hasVideoInRecipe && p.gallery && p.gallery.length > 0) {
          const firstYoutube = p.gallery.find((g) => g.type === "youtube");

          if (firstYoutube && firstYoutube.type === "youtube") {
            recipeEnrichments.push({
              type: "video",
              insertAfterParagraph: 1,
              data: {
                video: firstYoutube.videoId,
                caption: `Video demonstrativ — ${p.name}`,
              },
            });
          }
        }

        const stripped = effBlocks.map((b) =>
          b.type === "paragraph"
            ? {
                ...b,
                text: b.text.replace(/\[embed\][^[]+\[\/embed\]/gi, "").trim(),
              }
            : b
        );

        const cleanEffBlocks = stripped.filter(
          (b) =>
            b.type === "table" ||
            b.text.replace(/\s|\\[rn]/g, "").length > 0
        );

        type RenderNode =
          | DescriptionBlock
          | { type: "animation"; anim: ProductAnimation }
          | { type: "enrichment"; enr: ProductEnrichment };

        type Insert =
          | {
              kind: "animation";
              anim: ProductAnimation;
              idx: number;
              order: number;
            }
          | {
              kind: "enrichment";
              enr: ProductEnrichment;
              idx: number;
              order: number;
            };

        const inserts: Insert[] = [
          ...recipeAnims.map((anim, i) => ({
            kind: "animation" as const,
            anim,
            idx: anim.insertAfterParagraph,
            order: i,
          })),
          ...recipeEnrichments.map((enr, i) => ({
            kind: "enrichment" as const,
            enr,
            idx: enr.insertAfterParagraph,
            order: 1000 + i,
          })),
        ];

        inserts.sort((a, b) => {
          if (a.idx !== b.idx) return a.idx - b.idx;
          return a.order - b.order;
        });

        const withExtras: RenderNode[] = [];
        let origParaIdx = -1;

        for (const b of cleanEffBlocks) {
          withExtras.push(b);

          if (b.type === "paragraph") {
            origParaIdx++;

            while (inserts.length > 0 && inserts[0].idx <= origParaIdx) {
              const ins = inserts.shift()!;

              if (ins.kind === "animation") {
                withExtras.push({ type: "animation", anim: ins.anim });
              } else {
                withExtras.push({ type: "enrichment", enr: ins.enr });
              }
            }
          }
        }

        while (inserts.length > 0) {
          const ins = inserts.shift()!;

          if (ins.kind === "animation") {
            withExtras.push({ type: "animation", anim: ins.anim });
          } else {
            withExtras.push({ type: "enrichment", enr: ins.enr });
          }
        }

        if (relatedText) {
          withExtras.push({ type: "paragraph", text: relatedText });
        }

        const restBlocks = withExtras;

        const alreadyLinked = new Set<string>();
        const currentPath = `/produs/${p.slug}`;
        const productTargets = buildProductTargets(p.slug, PRODUCTS, p);

        const waMsg = `Salut! Sunt interesat de ${p.name} (cod ${p.sku}). Puteți să-mi trimiteți mai multe detalii?`;
        const waUrl = `https://wa.me/40769081081?text=${encodeURIComponent(
          waMsg
        )}`;

        return (
          <section className="py-10 lg:py-12 bg-[#f8f8f8] border-t border-ink-100">
            <div className="container-x">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* DESCRIERE COMPLETĂ */}
                <article className="lg:col-span-8 border border-ink-200 bg-white shadow-sm overflow-hidden">
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

                  <ExpandableDescription collapsedHeight={560}>
                    <div className="px-8 lg:px-10 py-7 space-y-5 text-ink-600 text-[14px] leading-[1.85] font-light">
                      {restBlocks.length > 0 ? (
                        restBlocks.map((b, i) => {
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

                          if (b.type === "animation") {
                            return (
                              <div key={i} className="my-6 -mx-2">
                                <ProductAnimationBlock anim={b.anim} />
                              </div>
                            );
                          }

                          if (b.type === "enrichment") {
                            return <ProductEnrichmentBlock key={i} e={b.enr} />;
                          }

                          return (
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
                          );
                        })
                      ) : (
                        <p className="text-ink-400 italic">
                          Descriere extinsă indisponibilă pentru acest produs.
                        </p>
                      )}
                    </div>
                  </ExpandableDescription>
                </article>

                {/* DETALII PRODUS DREAPTA */}
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
                              subtitle:
                                "Livrare, instalare și punere în funcțiune",
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
                            <div
                              key={item.title}
                              className="flex items-start gap-3"
                            >
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
        );
      })()}

      {/* FAQ COMPACT */}
{(() => {
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

  return (
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
  );
})()}


      {/* UZINEX LA TV — galerie video media (TV, târguri, interviuri) */}
      <VideoGallery data={videoGallery} />

      {/* STUDII DE CAZ — preluate de pe home, social proof inainte de cross-sell */}
      <CaseStudies data={caseStudies} />

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

      {/* WHY UZINEX */}
      <section
        className="relative py-16 lg:py-24 overflow-hidden"
        style={{ background: "#082545" }}
      >
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
                <span className="block text-uzx-orange">
                  de la livrare la mentenanță.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-white/65 text-[13px] leading-relaxed max-w-md lg:ml-auto">
                Soluții industriale alese pentru performanță, 
                fiabilitate și integrare
                eficientă în fluxul de lucru.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              [
                "01",
                "Transport gratuit",
                "Livrare națională inclusă în prețul de achiziție pentru toate echipamentele.",
              ],
              [
                "02",
                "Suport expert",
                "Echipă de ingineri pentru consultanță tehnică pre și post vânzare.",
              ],
              [
                "03",
                "Finanțare flexibilă",
                "Soluții de leasing și credite prin partenerii financiari Uzinex.",
              ],
              [
                "04",
                "Garanție extinsă",
                "60 luni standard + contracte opționale de mentenanță preventivă.",
              ],
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

                <p className="mt-3 text-[12px] text-white/60 leading-relaxed">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}