import Link from "next/link";
import type { Metadata } from "next";
import { AnomalyCard } from "@/components/newsroom/AnomalyCard";
import { extractInsightView, buildShareableHeadline } from "@/lib/newsroom/extract";
import { loadInsights, loadStories } from "@/lib/newsroom/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Insights săptămânale · UZINEX admin",
  description: "Insights algoritmice + editoriale (admin only).",
  robots: { index: false, follow: false },
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
    <div className="space-y-8 pb-8">
      <header>
        <Link href="/admin/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Newsroom</Link>
        <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mt-3 mb-2">Review pipeline · admin</div>
        <h1 className="serif text-3xl text-ink-900 mb-3">Insights săptămânale</h1>
        <p className="text-ink-600 leading-relaxed max-w-3xl text-sm">
          Pipeline-ul rulează detectoare automate săptămânal: <strong>anomalii statistice cu z-score &gt; 3,0σ</strong>, <strong>trend-uri YoY</strong> peste 15% variație, <strong>ranking-uri cross-country</strong>.
          Folosește această secțiune pentru review intern: copiază titlu/bullets/sursă, deschide story-ul (dacă e legat), verifică pe sursa oficială.
        </p>
        {scoreMin > 0 && filteredOut > 0 && (
          <p className="mt-3 text-xs text-ink-500">
            Afișăm insights cu score &ge; {scoreMin.toFixed(1)} ({filteredByScore.length} din {totalUnfiltered}).
            {" "}
            <Link href={`/admin/newsroom/anomalii?score=0${filter !== "all" ? `&type=${filter}` : ""}`} className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2">
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
              href={f.val === "all" ? `/admin/newsroom/anomalii${scoreSuffix ? `?score=${scoreMin}` : ""}` : `/admin/newsroom/anomalii?type=${f.val}${scoreSuffix}`}
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
    </div>
  );
}
