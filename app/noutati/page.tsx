import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NEWS_DEFAULT, type NewsData } from "@/components/NewsSection";
import { getContent } from "@/lib/content";
import { HeroFeatured } from "./HeroFeatured";
import { BlogFeed } from "./BlogFeed";
import { Highlights } from "./Highlights";
import { Changelog } from "./Changelog";
import { AuthorityRail } from "./AuthorityRail";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog Uzinex — noutăți, comunicări, studii",
  description:
    "Comunicate, articole, anunțuri și studii despre integrarea industrială, finanțările europene și automatizarea industriei românești.",
};

export default async function NoutatiPage() {
  const data = (await getContent<NewsData>("news")) ?? NEWS_DEFAULT;
  const articles = data.articles ?? [];
  const [featured, ...rest] = articles;
  const heroVideoId = data.heroVideoId ?? "a-e4NhkxGGY";
  const railVideoId = data.railVideoId ?? "cnXAYqGYX5A";

  return (
    <>
      <Header solid />
      {/* sticky rail overlays content on lg+ */}
      <AuthorityRail videoId={railVideoId} />
      <main className="bg-white border-b hairline">
        {/* ─────────────── PAGE HEADER ─────────────── */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-8 lg:py-12">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-6"
              >
                <span>←</span> Înapoi la pagina principală
              </Link>
              <div className="flex items-end justify-between gap-6 flex-wrap">
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] max-w-2xl"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Noutăți, comunicări{" "}
                  <span className="font-light italic text-uzx-orange">
                    și studii Uzinex.
                  </span>
                </h1>
                <a
                  href="https://www.linkedin.com/company/uzinex"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-uzx-blue hover:text-uzx-blue2 transition font-medium"
                >
                  Uzinex pe LinkedIn <span>›</span>
                </a>
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
            {/* ─────────────── HERO FEATURED ─────────────── */}
            {featured && (
              <section className="relative overflow-hidden">
                {/* decorative gradient swoosh */}
                <div
                  className="absolute -top-10 -left-20 -right-20 h-[560px] opacity-50 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 20%, rgba(245,133,31,0.2) 35%, rgba(30,107,184,0.25) 55%, rgba(8,37,69,0.2) 70%, transparent 85%)",
                    transform: "skewY(-6deg)",
                  }}
                />
                <div className="container-x py-12 lg:py-20 relative">
                  <div className="max-w-6xl mx-auto">
                    <HeroFeatured article={featured} videoId={heroVideoId} />
                  </div>
                </div>
              </section>
            )}

            {/* sentinel: when this enters viewport, rail becomes visible */}
            <div id="rail-sentinel" aria-hidden className="h-px" />

            {/* ─────────────── BLOG LIST ─────────────── */}
            {rest.length > 0 && (
              <section className="border-t hairline">
                <div className="container-x py-14 lg:py-20">
                  <div className="max-w-6xl mx-auto lg:pr-[340px]">
                    <BlogFeed articles={rest} />
                  </div>
                </div>
              </section>
            )}

            {/* ─────────────── RECENT HIGHLIGHTS ─────────────── */}
            {data.highlights && data.highlights.length > 0 && (
              <Highlights items={data.highlights} />
            )}

            {/* ─────────────── CHANGELOG ─────────────── */}
            {data.changelog && <Changelog data={data.changelog} />}

            {/* sentinel: when this enters viewport, rail unmounts (no footer overlap) */}
            <div id="rail-end-sentinel" aria-hidden className="h-px" />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
