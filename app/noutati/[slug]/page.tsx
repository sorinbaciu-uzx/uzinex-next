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
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { AutoLinkedText } from "@/components/AutoLinkedText";

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
  const canonicalPath = `/noutati/${article.slug}`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: canonicalPath,
      ...(article.image ? { images: [{ url: article.image }] } : {}),
    },
  };
}

function Cover({ article }: { article: Article }) {
  if (article.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={article.image}
        alt={article.title}
        className="w-full aspect-[16/9] object-cover"
      />
    );
  }
  return (
    <div
      className="w-full aspect-[16/9] flex items-center justify-center relative overflow-hidden"
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
        className="serif text-white/90 text-6xl md:text-8xl font-light relative z-10"
        style={{ letterSpacing: "-0.03em" }}
      >
        uzinex
      </div>
    </div>
  );
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

  // Shared across every paragraph so each link target is used at most once.
  const alreadyLinked = new Set<string>();
  const currentPath = `/noutati/${article.slug}`;

  // ─── JSON-LD: NewsArticle + BreadcrumbList ───
  const artJsonLd = articleSchema({
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    category: article.category,
    datePublished: article.date,
    image: article.image,
  });
  const crumbJsonLd = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Noutăți", url: "/noutati" },
    { name: article.title, url: `/noutati/${article.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbJsonLd) }}
      />
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* ─────── HEADER / META ─────── */}
        <section className="border-b hairline">
          <div className="container-x py-10 lg:py-14">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/noutati"
                className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-10"
              >
                <span>←</span> Toate noutățile
              </Link>

              <div className="flex items-center gap-3 mb-8">
                <div
                  className="text-[10px] uppercase tracking-widest mono text-white px-2.5 py-1"
                  style={{
                    background:
                      CATEGORY_COLORS[article.category] || "#1e6bb8",
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
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                {article.title}
              </h1>

              <p className="text-lg md:text-xl text-ink-600 leading-relaxed max-w-2xl">
                {article.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* ─────── COVER ─────── */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-10 lg:py-14">
            <div className="max-w-5xl mx-auto">
              <div className="border hairline overflow-hidden">
                <Cover article={article} />
              </div>
              <div className="text-[10px] mono text-ink-400 mt-3 uppercase tracking-wider">
                — Uzinex Editorial
              </div>
            </div>
          </div>
        </section>

        {/* ─────── BODY ─────── */}
        <section>
          <div className="container-x py-14 lg:py-20">
            <article className="max-w-2xl mx-auto">
              <div className="space-y-6 text-ink-800 text-[17px] leading-[1.8]">
                {paragraphs.map((p, i) => (
                  <AutoLinkedText
                    key={i}
                    text={p}
                    alreadyLinked={alreadyLinked}
                    currentPath={currentPath}
                    className={
                      i === 0
                        ? "first-letter:float-left first-letter:serif first-letter:text-7xl first-letter:leading-[0.85] first-letter:pr-2 first-letter:pt-1 first-letter:text-uzx-orange"
                        : undefined
                    }
                  />
                ))}
              </div>

              <div className="mt-16 pt-10 border-t hairline">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-400 mb-1 mono">
                      Vrei să afli mai multe?
                    </div>
                    <div className="serif text-xl text-ink-900">
                      Discută cu un inginer Uzinex
                    </div>
                  </div>
                  <a
                    href="/contact"
                    className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-3 text-sm font-medium transition inline-flex items-center gap-2"
                  >
                    Solicită ofertă <span>→</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ─────── RELATED ─────── */}
        {related.length > 0 && (
          <section className="border-t hairline bg-ink-50">
            <div className="container-x py-14 lg:py-20">
              <div className="max-w-6xl mx-auto">
                <div className="text-[10px] uppercase tracking-[0.25em] text-uzx-orange mb-3 mono">
                  — Continuă să citești
                </div>
                <h2
                  className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-10"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Alte noutăți
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {related.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/noutati/${a.slug}`}
                      className="group flex flex-col"
                    >
                      <div className="border hairline overflow-hidden mb-5">
                        {a.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={a.image}
                            alt={a.title}
                            className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        ) : (
                          <div
                            className="w-full aspect-[4/5] flex items-center justify-center"
                            style={{
                              background:
                                "linear-gradient(135deg, #082545 0%, #1e6bb8 100%)",
                            }}
                          >
                            <div className="serif text-white/90 text-4xl font-light">
                              uzinex
                            </div>
                          </div>
                        )}
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
                          {a.date}
                        </div>
                      </div>
                      <h3
                        className="serif text-xl text-ink-900 leading-[1.1] group-hover:text-uzx-blue transition"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {a.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
