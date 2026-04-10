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
        {/* tiny breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container-x pt-3 pb-1"
        >
          <div className="max-w-6xl mx-auto lg:pr-[340px]">
            <ol className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-ink-400">
              <li>
                <Link href="/" className="hover:text-uzx-blue transition">
                  Acasă
                </Link>
              </li>
              <li className="text-ink-300">/</li>
              <li className="text-ink-700">Noutăți</li>
            </ol>
          </div>
        </nav>

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
                    <HeroFeatured article={featured} />
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
