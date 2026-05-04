import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnomalyCard } from "@/components/newsroom/AnomalyCard";
import { extractInsightView, buildShareableHeadline } from "@/lib/newsroom/extract";
import { loadStories, loadInsights } from "@/lib/newsroom/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Newsroom — date oficiale despre industria românească",
  description:
    "Newsroom UZINEX agregă date din 90+ surse oficiale (BNR, Eurostat, TED Europa, World Bank, IMF) și publică săptămânal anomalii și story-uri cu cifre verificabile pentru jurnaliști.",
  alternates: { canonical: "/newsroom" },
};

export default function NewsroomPage() {
  const stories = loadStories();
  const insights = loadInsights();
  const featured = stories[0];
  const rest = stories.slice(1);
  const topAnomalies = insights.slice(0, 3);

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14 space-y-16">
        {/* HERO */}
        <section className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-uzx-orange mb-3 font-medium">Newsroom UZINEX</div>
          <h1 className="serif text-4xl md:text-6xl leading-[1.05] tracking-tight text-ink-900 mb-5">
            Date proprii. <span className="text-uzx-blue">Story-uri săptămânale</span>.
          </h1>
          <p className="text-lg text-ink-600 leading-relaxed">
            Agregăm săptămânal date oficiale din peste 90 de surse — BNR, Eurostat, TED Europa,
            SAM.gov, World Bank, ECB, IMF, UN Comtrade, USASpending — și publicăm
            analize cu cifre verificabile. <strong className="text-ink-900">Pentru jurnaliști:</strong> titluri
            gata de copy, grafice și date brute pentru fiecare cifră.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/newsroom/anomalii" className="inline-flex items-center gap-1.5 bg-uzx-orange text-white text-sm font-medium px-4 py-2 rounded hover:bg-uzx-orange2 transition-colors">
              → Anomalii săptămânale
            </Link>
            <Link href="/newsroom/firme" className="inline-flex items-center gap-1.5 bg-uzx-blue text-white text-sm font-medium px-4 py-2 rounded hover:bg-uzx-blue2 transition-colors">
              Profile firme industriale
            </Link>
            <a href="mailto:sorin.baciu@uzinex.ro?subject=Cerere%20interviu%20-%20Newsroom%20UZINEX" className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded border border-ink-200 hover:border-uzx-blue hover:bg-ink-50 text-ink-700">
              Cere interviu
            </a>
          </div>
        </section>

        {/* TOP ANOMALIES */}
        {topAnomalies.length > 0 && (
          <section>
            <div className="flex items-baseline justify-between mb-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-uzx-orange mb-1 font-medium">Pentru articolul tău săptămânal</div>
                <h2 className="serif text-2xl md:text-3xl tracking-tight text-ink-900">Top 3 anomalii — gata de copy</h2>
              </div>
              <Link href="/newsroom/anomalii" className="text-sm text-uzx-blue hover:text-uzx-orange font-medium hidden sm:inline">
                Vezi toate →
              </Link>
            </div>
            <div className="space-y-4">
              {topAnomalies.map((i) => {
                const story = i.usedInStoryId ? stories.find((s) => s.id === i.usedInStoryId) : null;
                return (
                  <AnomalyCard
                    key={i.id}
                    insight={i}
                    view={extractInsightView(i)}
                    shareableHeadline={buildShareableHeadline(i)}
                    storyLink={story ? { id: story.id, slug: story.slug } : null}
                  />
                );
              })}
            </div>
          </section>
        )}

        {/* FEATURED */}
        {featured && (
          <section>
            <div className="text-xs uppercase tracking-widest text-ink-400 mb-3">Story-ul săptămânii — articol complet</div>
            <Link href={`/newsroom/stories/${featured.slug}`} className="block group border-t border-b border-ink-100 py-10 hover:bg-ink-50/40 -mx-4 px-4 transition-colors">
              <div className="grid md:grid-cols-[2fr_1fr] gap-10 items-start">
                <div>
                  <div className="text-xs num text-ink-500 mb-3 uppercase tracking-wider">
                    {new Date(featured.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
                    <span className="mx-2">·</span>
                    <span className="text-uzx-orange">PUBLICAT</span>
                  </div>
                  <h2 className="serif text-3xl md:text-4xl leading-[1.1] tracking-tight text-ink-900 group-hover:text-uzx-blue transition-colors mb-3">
                    {featured.title}
                  </h2>
                  {featured.subtitle && <p className="text-ink-600 text-lg leading-relaxed">{featured.subtitle}</p>}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-uzx-orange font-medium group-hover:gap-2.5 transition-all">
                    Citește articolul + Press Kit
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
                {featured.bigNumber && (
                  <div className="border-l-4 border-uzx-orange pl-6">
                    <div className="serif text-6xl md:text-7xl text-uzx-orange leading-none num">{featured.bigNumber}</div>
                    {featured.bigNumberLabel && <div className="text-xs text-ink-500 uppercase tracking-wider mt-3 leading-snug">{featured.bigNumberLabel}</div>}
                  </div>
                )}
              </div>
            </Link>
          </section>
        )}

        {/* ARCHIVE */}
        {rest.length > 0 && (
          <section>
            <div className="text-xs uppercase tracking-widest text-ink-400 mb-4">Arhivă story-uri</div>
            <div className="grid gap-px bg-ink-100">
              {rest.map((s) => (
                <Link key={s.id} href={`/newsroom/stories/${s.slug}`} className="block bg-white px-4 py-5 hover:bg-ink-50/60 group">
                  <div className="text-xs num text-ink-500 mb-1.5 uppercase tracking-wider">
                    {new Date(s.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
                  </div>
                  <h3 className="serif text-xl tracking-tight text-ink-900 group-hover:text-uzx-blue transition-colors">{s.title}</h3>
                  {s.subtitle && <p className="text-sm text-ink-500 mt-1.5 line-clamp-2">{s.subtitle}</p>}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* EMPTY STATE */}
        {stories.length === 0 && topAnomalies.length === 0 && (
          <div className="border border-dashed border-ink-200 rounded-lg p-10 text-center text-ink-500">
            <p className="serif text-lg text-ink-700 mb-2">Niciun story sau insight publicat încă.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
