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
        className="serif text-white/90 text-4xl font-light relative z-10"
        style={{ letterSpacing: "-0.03em" }}
      >
        uzinex
      </div>
    </div>
  );
}

function GridCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/noutati/${article.slug}`}
      className="group block border-t border-ink-900 pt-5"
    >
      <div
        className="text-[10px] uppercase tracking-[0.22em] mono font-bold mb-2"
        style={{
          color: CATEGORY_COLORS[article.category] || "#1e6bb8",
        }}
      >
        {article.category}
      </div>
      <h3
        className="serif text-xl lg:text-2xl text-ink-900 leading-[1.1] mb-3 group-hover:text-uzx-blue transition"
        style={{ letterSpacing: "-0.02em" }}
      >
        {article.title}
      </h3>
      <p className="text-sm text-ink-500 leading-relaxed mb-4 line-clamp-3">
        {article.excerpt}
      </p>
      {article.image && (
        <div className="overflow-hidden border hairline">
          <Cover article={article} aspect="aspect-[16/10]" />
        </div>
      )}
    </Link>
  );
}

export default async function NoutatiPage() {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];
  const heroVideoId = data.heroVideoId ?? "_Sl8diqCAFw";
  const [primary, secondary, ...rest] = articles;

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
            {/* ─────── HERO FEATURED ─────── */}
            <section className="border-b hairline">
              <div className="container-x py-12 lg:py-16">
                <div className="max-w-6xl mx-auto">
                  {primary && (
                    <HeroFeatured
                      primary={primary}
                      secondary={secondary}
                      videoId={heroVideoId}
                    />
                  )}
                </div>
              </div>
            </section>

            {/* ─────── ARTICLES GRID ─────── */}
            {rest.length > 0 && (
              <section>
                <div className="container-x py-14 lg:py-20">
                  <div className="max-w-6xl mx-auto">
                    <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.25em] text-ink-400 mb-2 mono">
                          — Arhiva
                        </div>
                        <h2
                          className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]"
                          style={{ letterSpacing: "-0.03em" }}
                        >
                          Toate articolele
                        </h2>
                      </div>
                      <div className="text-xs text-ink-400 mono">
                        {rest.length}{" "}
                        {rest.length === 1 ? "articol" : "articole"}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                      {rest.map((a, i) => (
                        <GridCard key={a.slug || i} article={a} />
                      ))}
                    </div>
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
