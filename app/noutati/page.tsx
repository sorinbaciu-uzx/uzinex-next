import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NEWS_DEFAULT, type NewsData, type Article } from "@/components/NewsSection";
import { getContent } from "@/lib/content";
import { HeroFeatured } from "./HeroFeatured";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Noutăți & comunicări — Uzinex",
  description:
    "Comunicate, articole, anunțuri și studii despre integrarea industrială, finanțările europene și automatizarea industriei românești.",
};

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

/* ───────────────── shared subcomponents ───────────────── */

function Cover({
  article,
  aspect = "aspect-[4/5]",
}: {
  article: Article;
  aspect?: string;
}) {
  if (article.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={article.image}
        alt={article.title}
        className={`w-full ${aspect} object-cover transition-transform duration-300 group-hover:scale-[1.02]`}
      />
    );
  }
  return (
    <div
      className={`w-full ${aspect} flex items-center justify-center relative overflow-hidden`}
      style={{
        background: "linear-gradient(135deg, #082545 0%, #1e6bb8 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.08) 20px 21px)",
        }}
      />
      <div
        className="serif text-white/90 text-4xl lg:text-5xl font-light relative z-10"
        style={{ letterSpacing: "-0.03em" }}
      >
        uzinex
      </div>
    </div>
  );
}

function CategoryLabel({ category }: { category: Article["category"] }) {
  return (
    <div
      className="text-[10px] uppercase tracking-[0.22em] mono font-bold"
      style={{ color: CATEGORY_COLORS[category] || "#1e6bb8" }}
    >
      {category}
    </div>
  );
}

/* ─────── ROW 2: big image+overlay card (7) + text-featured (5) ─────── */

function SecondRow({
  primary,
  secondary,
}: {
  primary: Article;
  secondary: Article;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* left: big image + overlay card */}
      <Link
        href={`/noutati/${primary.slug}`}
        className="lg:col-span-7 group block relative"
      >
        <div className="border hairline overflow-hidden">
          <Cover article={primary} aspect="aspect-[4/3]" />
        </div>
        <div className="lg:absolute lg:bottom-8 lg:left-8 lg:max-w-sm bg-ink-50 p-6 lg:p-7 mt-4 lg:mt-0 border hairline shadow-xl">
          <div className="mb-3">
            <CategoryLabel category={primary.category} />
          </div>
          <h3
            className="serif text-2xl lg:text-[26px] text-ink-900 leading-[1.1] mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            {primary.title}
          </h3>
          <p className="text-sm text-ink-600 leading-relaxed line-clamp-2">
            {primary.excerpt}
          </p>
        </div>
      </Link>

      {/* right: text-first featured, with small image below */}
      <Link
        href={`/noutati/${secondary.slug}`}
        className="lg:col-span-5 group block lg:pt-10"
      >
        <div className="border-t border-ink-900 pt-5 mb-5">
          <div className="mb-3">
            <CategoryLabel category={secondary.category} />
          </div>
          <h3
            className="serif text-2xl lg:text-3xl text-ink-900 leading-[1.1] mb-3 group-hover:text-uzx-blue transition"
            style={{ letterSpacing: "-0.02em" }}
          >
            {secondary.title}
          </h3>
          <p className="text-sm text-ink-500 leading-relaxed mb-6">
            {secondary.excerpt}
          </p>
        </div>
        <div className="border hairline overflow-hidden">
          <Cover article={secondary} aspect="aspect-[16/9]" />
        </div>
      </Link>
    </div>
  );
}

/* ─────── ROW 3: tall left (4) + big right with overlay card (8) ─────── */

function ThirdRow({
  primary,
  secondary,
}: {
  primary: Article;
  secondary: Article;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
      {/* left: tall mosaic-style */}
      <Link
        href={`/noutati/${primary.slug}`}
        className="lg:col-span-4 group block"
      >
        <div className="border hairline overflow-hidden relative">
          <Cover article={primary} aspect="aspect-[4/5]" />
          <div className="absolute bottom-4 left-4 right-4">
            <div
              className="serif text-white text-4xl font-light"
              style={{
                letterSpacing: "-0.02em",
                textShadow: "0 2px 20px rgba(0,0,0,0.5)",
              }}
            >
              {primary.category}
            </div>
          </div>
        </div>
      </Link>

      {/* right: big image with overlay card on left */}
      <Link
        href={`/noutati/${secondary.slug}`}
        className="lg:col-span-8 group block relative"
      >
        <div className="border hairline overflow-hidden">
          <Cover article={secondary} aspect="aspect-[16/10]" />
        </div>
        <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-8 lg:max-w-xs bg-ink-50 p-6 lg:p-7 mt-4 lg:mt-0 border hairline shadow-xl">
          <div className="mb-3">
            <CategoryLabel category={secondary.category} />
          </div>
          <h3
            className="serif text-xl lg:text-2xl text-ink-900 leading-[1.1] mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            {secondary.title}
          </h3>
          <p className="text-sm text-ink-600 leading-relaxed line-clamp-3">
            {secondary.excerpt}
          </p>
        </div>
      </Link>
    </div>
  );
}

/* ─────── ROW 4: 3-col text-only with hairline top ─────── */

function TextGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
      {articles.map((a, i) => (
        <Link
          key={a.slug || i}
          href={`/noutati/${a.slug}`}
          className="group block border-t border-ink-900 pt-5"
        >
          <div className="mb-3">
            <CategoryLabel category={a.category} />
          </div>
          <h3
            className="serif text-xl text-ink-900 leading-[1.15] mb-3 group-hover:text-uzx-blue transition"
            style={{ letterSpacing: "-0.02em" }}
          >
            {a.title}
          </h3>
          <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">
            {a.excerpt}
          </p>
        </Link>
      ))}
    </div>
  );
}

/* ─────── ROW 5: 3-col image-only (square) ─────── */

function ImageGrid({ articles }: { articles: Article[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {articles.map((a, i) => (
        <Link
          key={a.slug || i}
          href={`/noutati/${a.slug}`}
          className="group block"
        >
          <div className="border hairline overflow-hidden">
            <Cover article={a} aspect="aspect-square" />
          </div>
          <div className="mt-4">
            <div className="mb-2">
              <CategoryLabel category={a.category} />
            </div>
            <h3
              className="serif text-lg text-ink-900 leading-[1.15] group-hover:text-uzx-blue transition"
              style={{ letterSpacing: "-0.02em" }}
            >
              {a.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */

export default async function NoutatiPage() {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];
  const heroVideoId = data.heroVideoId ?? "_Sl8diqCAFw";

  // progressive allocation — rows render only if enough articles exist
  const row1Primary = articles[0];
  const row1Secondary = articles[1];
  const row2Primary = articles[2];
  const row2Secondary = articles[3];
  const row3Primary = articles[4];
  const row3Secondary = articles[5];
  const row4 = articles.slice(6, 9);
  const row5 = articles.slice(9, 12);

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* ─────── PAGE HEADER ─────── */}
        <section className="border-b hairline">
          <div className="container-x py-10 lg:py-14">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-6"
              >
                <span>←</span> Înapoi la pagina principală
              </Link>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                    Jurnal editorial Uzinex
                  </div>
                  <h1
                    className="serif text-5xl md:text-6xl lg:text-7xl text-ink-900 leading-[0.9]"
                    style={{ letterSpacing: "-0.035em" }}
                  >
                    Noutăți
                    <br />
                    <span className="font-light italic text-uzx-orange">
                      & comunicări
                    </span>
                  </h1>
                </div>
                <p className="text-ink-500 text-base md:text-lg leading-relaxed max-w-md">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {articles.length === 0 ? (
          <div className="container-x py-20">
            <div className="max-w-xl mx-auto border hairline p-10 text-center text-ink-400 italic">
              Niciun articol publicat momentan.
            </div>
          </div>
        ) : (
          <>
            {/* ═══════ ROW 1 — Hero video + secondary ═══════ */}
            {row1Primary && (
              <section className="border-b hairline">
                <div className="container-x py-12 lg:py-16">
                  <div className="max-w-6xl mx-auto">
                    <HeroFeatured
                      primary={row1Primary}
                      secondary={row1Secondary}
                      videoId={heroVideoId}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ═══════ ROW 2 — Big image+card + text-featured ═══════ */}
            {row2Primary && row2Secondary && (
              <section className="border-b hairline">
                <div className="container-x py-12 lg:py-16">
                  <div className="max-w-6xl mx-auto">
                    <SecondRow
                      primary={row2Primary}
                      secondary={row2Secondary}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ═══════ ROW 3 — Tall left + big right with overlay ═══════ */}
            {row3Primary && row3Secondary && (
              <section className="border-b hairline">
                <div className="container-x py-12 lg:py-16">
                  <div className="max-w-6xl mx-auto">
                    <ThirdRow
                      primary={row3Primary}
                      secondary={row3Secondary}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* ═══════ ROW 4 — Text grid with hairline tops ═══════ */}
            {row4.length > 0 && (
              <section className="border-b hairline">
                <div className="container-x py-12 lg:py-16">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ink-400 mb-8 mono">
                      — Mai multe povești
                    </div>
                    <TextGrid articles={row4} />
                  </div>
                </div>
              </section>
            )}

            {/* ═══════ ROW 5 — Image grid (square) ═══════ */}
            {row5.length > 0 && (
              <section>
                <div className="container-x py-12 lg:py-20">
                  <div className="max-w-6xl mx-auto">
                    <ImageGrid articles={row5} />
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
