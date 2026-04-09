import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  NEWS_DEFAULT,
  type NewsData,
  type Article,
} from "@/components/NewsSection";
import { getContent } from "@/lib/content";

export const revalidate = 60;

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

async function getArticle(slug: string): Promise<{
  article: Article | null;
  related: Article[];
}> {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];
  const article = articles.find((a) => a.slug === slug) ?? null;
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);
  return { article, related };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { article } = await getArticle(slug);
  if (!article) return { title: "Articol — Uzinex" };
  return {
    title: `${article.title} — Uzinex`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { article, related } = await getArticle(slug);
  if (!article) notFound();

  const paragraphs = (article.body || article.excerpt)
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        <div className="container-x py-14 lg:py-20">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/noutati"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-8"
            >
              <span>←</span> Toate noutățile
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div
                className="text-[10px] uppercase tracking-widest mono text-white px-2.5 py-1"
                style={{
                  background: CATEGORY_COLORS[article.category] || "#1e6bb8",
                }}
              >
                {article.category}
              </div>
              <div className="text-[11px] mono text-ink-400 num">
                {article.date}
              </div>
              <div className="text-[11px] mono text-ink-400">
                · {article.readTime}
              </div>
            </div>

            <h1
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[1.05] mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              {article.title}
            </h1>

            {article.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-auto border hairline mb-10"
              />
            )}

            <div className="serif text-lg text-ink-700 leading-relaxed mb-8 italic border-l-2 border-uzx-orange pl-5">
              {article.excerpt}
            </div>

            <div className="space-y-5 text-ink-800 leading-[1.75]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-14 pt-10 border-t hairline">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1 mono">
                    Vrei să afli mai multe?
                  </div>
                  <div className="serif text-lg text-ink-900">
                    Discută cu un inginer Uzinex
                  </div>
                </div>
                <a
                  href="/#contact"
                  className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-3 text-sm font-medium transition inline-flex items-center gap-2"
                >
                  Solicită ofertă <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="max-w-5xl mx-auto mt-20">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-6 mono">
                Alte noutăți
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border-y border-ink-200">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/noutati/${a.slug}`}
                    className="group bg-white p-6 hover:bg-ink-50 transition"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div
                        className="text-[9px] uppercase tracking-widest mono text-white px-2 py-0.5"
                        style={{
                          background: CATEGORY_COLORS[a.category] || "#1e6bb8",
                        }}
                      >
                        {a.category}
                      </div>
                      <div className="text-[10px] mono text-ink-400">
                        {a.date}
                      </div>
                    </div>
                    <h3 className="serif text-base text-ink-900 leading-tight group-hover:text-uzx-blue transition">
                      {a.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
