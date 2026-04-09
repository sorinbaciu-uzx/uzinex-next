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

export default async function NoutatiPage() {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        <div className="container-x py-14 lg:py-20">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-8"
            >
              <span>←</span> Înapoi la pagina principală
            </Link>

            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-4 mono">
              Noutăți & comunicări
            </div>
            <h1
              className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Ultimele articole,
              <br />
              <span className="font-light text-uzx-orange">
                comunicate și studii.
              </span>
            </h1>
            <p className="text-ink-500 max-w-2xl text-base md:text-lg leading-relaxed mb-12 lg:mb-16">
              {data.description}
            </p>

            {articles.length === 0 ? (
              <div className="border hairline p-10 text-center text-ink-400 italic">
                Niciun articol publicat momentan.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
                {articles.map((a, i) => (
                  <Link
                    key={a.slug || i}
                    href={`/noutati/${a.slug}`}
                    className="group bg-white p-6 lg:p-8 hover:bg-ink-50 transition flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="text-[10px] uppercase tracking-widest mono text-white px-2.5 py-1"
                          style={{
                            background: CATEGORY_COLORS[a.category] || "#1e6bb8",
                          }}
                        >
                          {a.category}
                        </div>
                        <div className="text-[11px] mono text-ink-400 num">
                          {a.date}
                        </div>
                      </div>
                      <div className="text-[11px] mono text-ink-400">
                        {a.readTime}
                      </div>
                    </div>
                    <h2
                      className="serif text-xl lg:text-2xl text-ink-900 leading-tight mb-3"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {a.title}
                    </h2>
                    <p className="text-sm text-ink-500 leading-relaxed mb-6">
                      {a.excerpt}
                    </p>
                    <div className="mt-auto pt-5 border-t hairline flex items-center justify-between">
                      <span className="text-xs text-ink-700 uppercase tracking-wider">
                        Citește articolul
                      </span>
                      <span className="text-xl text-uzx-blue group-hover:translate-x-1 transition">
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
