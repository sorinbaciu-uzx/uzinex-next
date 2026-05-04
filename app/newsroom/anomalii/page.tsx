import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnomalyCard } from "@/components/newsroom/AnomalyCard";
import { extractInsightView, buildShareableHeadline } from "@/lib/newsroom/extract";
import { loadInsights, loadStories } from "@/lib/newsroom/data";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Insights săptămânale — Newsroom UZINEX",
  description:
    "Insights săptămânale: anomalii statistice (z-score > 3,0σ), trend-uri YoY, ranking-uri cross-country detectate automat de pipeline-ul Newsroom UZINEX. Date oficiale, gata pentru articol.",
  alternates: { canonical: "/newsroom/anomalii" },
};

const FILTERS = [
  { val: "all", label: "Toate" },
  { val: "anomaly", label: "Anomalii (z>3σ)" },
  { val: "trend", label: "Trend-uri YoY" },
  { val: "ranking", label: "Ranking-uri" },
  { val: "cross_reference", label: "Cross-reference" },
];

// Default minimum score to filter out low-relevance trends; can be overridden with ?score=0
const DEFAULT_SCORE_THRESHOLD = 0.5;

export default async function AnomaliiPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const filter = (typeof sp.type === "string" ? sp.type : "all") as string;
  const scoreParam = typeof sp.score === "string" ? Number.parseFloat(sp.score) : DEFAULT_SCORE_THRESHOLD;
  const scoreMin = Number.isFinite(scoreParam) ? scoreParam : DEFAULT_SCORE_THRESHOLD;

  const allInsights = loadInsights();
  const stories = loadStories();
  // Apply score floor first (default 0.5) so the feed shows only relevant insights;
  // user can pass ?score=0 to see everything (debug / completeness view).
  const filteredByScore = allInsights.filter((i) => (i.score ?? 0) >= scoreMin);
  const list = filter === "all" ? filteredByScore : filteredByScore.filter((i) => i.type === filter);

  const countMap = filteredByScore.reduce<Record<string, number>>((acc, x) => {
    acc[x.type] = (acc[x.type] || 0) + 1;
    return acc;
  }, {});

  const totalUnfiltered = allInsights.length;
  const filteredOut = totalUnfiltered - filteredByScore.length;

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <div className="max-w-4xl mx-auto space-y-8 pb-10">
          <header>
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">Investigation feed</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 mb-3">Insights săptămânale</h1>
            <p className="text-lg text-ink-600 leading-relaxed max-w-3xl">
              Pipeline-ul Newsroom UZINEX rulează detectoare automate săptămânal: <strong>anomalii statistice cu z-score &gt; 3,0σ</strong> pe serii temporale, <strong>trend-uri YoY</strong> peste 15% variație, <strong>ranking-uri cross-country</strong>.
              Fiecare card de mai jos e gata pentru articol — copiază titlul, copiază sumarul cu sursă, descarcă datele.
            </p>
            {scoreMin > 0 && filteredOut > 0 && (
              <p className="mt-3 text-xs text-ink-500">
                Afișăm insights cu score &ge; {scoreMin.toFixed(1)} ({filteredByScore.length} din {totalUnfiltered}).
                {" "}
                <Link href={`/newsroom/anomalii?score=0${filter !== "all" ? `&type=${filter}` : ""}`} className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2">
                  Arată toate cele {totalUnfiltered}
                </Link>
              </p>
            )}
          </header>

          <div className="flex flex-wrap gap-2 border-b border-ink-100 pb-4">
            {FILTERS.map((f) => {
              const active = filter === f.val;
              const count = f.val === "all" ? filteredByScore.length : (countMap[f.val] || 0);
              const scoreSuffix = scoreMin !== DEFAULT_SCORE_THRESHOLD ? `&score=${scoreMin}` : "";
              return (
                <Link
                  key={f.val}
                  href={f.val === "all" ? `/newsroom/anomalii${scoreSuffix ? `?score=${scoreMin}` : ""}` : `/newsroom/anomalii?type=${f.val}${scoreSuffix}`}
                  className={`text-sm px-3 py-1.5 rounded-full transition ${
                    active ? "bg-ink-900 text-white" : "bg-ink-50 text-ink-700 hover:bg-ink-100"
                  }`}
                >
                  {f.label} <span className={`num text-xs ${active ? "text-white/70" : "text-ink-400"}`}>({count})</span>
                </Link>
              );
            })}
          </div>

          {list.length === 0 ? (
            <div className="text-center py-16 text-ink-500">
              <p className="serif text-lg text-ink-700 mb-2">Niciun insight pentru acest filtru.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {list.map((i) => {
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
          )}

          <footer className="border-t border-ink-100 pt-6 text-xs text-ink-500 leading-relaxed">
            Toate cifrele provin direct din API-uri publice oficiale (BNR, Eurostat, World Bank, ECB, TED Europa, IMF, USASpending, NSPA, CORDIS ș.a.).
            Pentru întrebări tehnice: <a href="mailto:sorin.baciu@uzinex.ro" className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2">sorin.baciu@uzinex.ro</a>.
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
