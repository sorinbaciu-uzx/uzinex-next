import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NEWS_DEFAULT, type NewsData, type Article } from "@/components/NewsSection";
import { getContent } from "@/lib/content";

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

// Fallback cover when article has no image — uses a muted brand gradient
function Cover({ article, tall }: { article: Article; tall?: boolean }) {
  const ratio = tall ? "aspect-[4/5]" : "aspect-[16/10]";
  if (article.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={article.image}
        alt={article.title}
        className={`w-full ${ratio} object-cover`}
      />
    );
  }
  return (
    <div
      className={`w-full ${ratio} flex items-center justify-center relative overflow-hidden`}
      style={{
        background:
          "linear-gradient(135deg, #082545 0%, #1e6bb8 100%)",
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
        className="serif text-white/90 text-5xl md:text-6xl font-light relative z-10"
        style={{ letterSpacing: "-0.03em" }}
      >
        uzinex
      </div>
    </div>
  );
}

export default async function NoutatiPage() {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];
  const [featured, ...rest] = articles;

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* ─────── PAGE HEADER ─────── */}
        <section className="border-b hairline">
          <div className="container-x py-10 lg:py-16">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-8"
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
            {/* ─────── FEATURED ─────── */}
            {featured && (
              <section className="border-b hairline">
                <div className="container-x py-12 lg:py-20">
                  <div className="max-w-6xl mx-auto">
                    <div className="text-[10px] uppercase tracking-[0.25em] text-ink-400 mb-6 mono">
                      — În prim plan
                    </div>
                    <Link
                      href={`/noutati/${featured.slug}`}
                      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
                    >
                      <div className="lg:col-span-7">
                        <div className="border hairline overflow-hidden">
                          <Cover article={featured} />
                        </div>
                      </div>
                      <div className="lg:col-span-5 lg:pt-4">
                        <div className="flex items-center gap-3 mb-5">
                          <div
                            className="text-[10px] uppercase tracking-widest mono text-white px-2.5 py-1"
                            style={{
                              background:
                                CATEGORY_COLORS[featured.category] || "#1e6bb8",
                            }}
                          >
                            {featured.category}
                          </div>
                          <div className="text-[11px] mono text-ink-400 num">
                            {featured.date}
                          </div>
                          <div className="text-[11px] mono text-ink-400">
                            · {featured.readTime}
                          </div>
                        </div>
                        <h2
                          className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[1] mb-6 group-hover:text-uzx-blue transition"
                          style={{ letterSpacing: "-0.025em" }}
                        >
                          {featured.title}
                        </h2>
                        <p className="text-lg text-ink-600 leading-relaxed mb-8">
                          {featured.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-3 text-sm text-ink-900 border-b border-ink-900 pb-1 group-hover:border-uzx-blue group-hover:text-uzx-blue transition">
                          Citește articolul
                          <span className="group-hover:translate-x-1 transition">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
            )}

            {/* ─────── GRID ─────── */}
            {rest.length > 0 && (
              <section>
                <div className="container-x py-12 lg:py-20">
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
                        <Link
                          key={a.slug || i}
                          href={`/noutati/${a.slug}`}
                          className="group flex flex-col"
                        >
                          <div className="border hairline overflow-hidden mb-5">
                            <div className="transition-transform duration-300 group-hover:scale-[1.02]">
                              <Cover article={a} tall />
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mb-3">
                            <div
                              className="text-[10px] uppercase tracking-widest mono text-white px-2 py-0.5"
                              style={{
                                background:
                                  CATEGORY_COLORS[a.category] || "#1e6bb8",
                              }}
                            >
                              {a.category}
                            </div>
                            <div className="text-[10px] mono text-ink-400">
                              {a.date} · {a.readTime}
                            </div>
                          </div>
                          <h3
                            className="serif text-xl lg:text-2xl text-ink-900 leading-[1.1] mb-3 group-hover:text-uzx-blue transition"
                            style={{ letterSpacing: "-0.02em" }}
                          >
                            {a.title}
                          </h3>
                          <p className="text-sm text-ink-500 leading-relaxed">
                            {a.excerpt}
                          </p>
                        </Link>
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
