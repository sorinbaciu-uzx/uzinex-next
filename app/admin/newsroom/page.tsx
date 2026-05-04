import Link from "next/link";
import type { Metadata } from "next";
import { AnomalyCard } from "@/components/newsroom/AnomalyCard";
import { extractInsightView, buildShareableHeadline } from "@/lib/newsroom/extract";
import { loadStories, loadInsights, loadManifest } from "@/lib/newsroom/data";

// Admin-only newsroom dashboard. The public newsroom was removed in favor of
// using this as an internal content-generation engine for stories/blogs.
// Auth-gated by middleware.ts (matcher: /admin/:path*).

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Newsroom · UZINEX admin",
  description: "Motor intern de generare știri/bloguri din date oficiale agregate.",
  robots: { index: false, follow: false },
};

export default function NewsroomAdminPage() {
  const stories = loadStories();
  const insights = loadInsights();
  const manifest = loadManifest();
  const featured = stories[0];
  const rest = stories.slice(1);
  const topAnomalies = insights
    .filter((i) => (i.score ?? 0) >= 0.5)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  const verifiedInsights = insights.filter((i) => i.usedInStoryId).length;
  const algorithmicInsights = insights.length - verifiedInsights;
  const lastUpdate = manifest.generatedAt
    ? new Date(manifest.generatedAt).toLocaleString("ro-RO", {
        day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
      })
    : "—";

  return (
    <div className="space-y-10">
      {/* HEADER + STATUS */}
      <div>
        <Link href="/admin" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Admin</Link>
        <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mt-3 mb-2">
          Motor intern · știri/bloguri
        </div>
        <h1 className="serif text-3xl text-ink-900">Newsroom</h1>
        <p className="text-ink-500 mt-2 max-w-2xl text-sm">
          Pipeline-ul agregă date din 90+ surse oficiale (BNR, Eurostat, IMF, World Bank, USASpending, SAM.gov, ANAF, portal.just.ro etc.) și le procesează în insights algoritmice + story-uri editoriale. Folosește această secțiune ca tool intern pentru review, redacție și generare conținut.
        </p>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-200 border hairline">
        <Stat label="Story-uri publicate" value={stories.length} sub="cu Press Kit ZIP" />
        <Stat label="Insights live" value={insights.length} sub={`${verifiedInsights} editorial · ${algorithmicInsights} algoritmic`} />
        <Stat label="Surse înregistrate" value={manifest.counts.sources} sub="17 cu date live" accent />
        <Stat label="Ultim refresh date" value={lastUpdate} sub="manual din local pipeline" small />
      </div>

      {/* QUICK NAV */}
      <div>
        <h2 className="serif text-xl text-ink-900 mb-3">Acces rapid</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
          <NavCard
            href="/admin/newsroom/anomalii"
            label="Insights săptămânale"
            sub={`${insights.length} insights · z-score > 3σ, YoY > 15%, ranking-uri`}
          />
          <NavCard
            href="/admin/newsroom/stories"
            label="Story-uri publicate"
            sub={`${stories.length} story-uri · drill-in pentru fiecare`}
            disabled={stories.length === 0}
          />
          <NavCard
            href="/admin/newsroom/firme"
            label="Profile firme industriale"
            sub="14 firme tracked · bilanțuri ANAF + dosare portal.just.ro"
          />
          <NavCard
            href="/admin/newsroom/lume"
            label="Perspective globale"
            sub="Datorie publică · SUA în RO · Comerț mondial · Emisii"
          />
          <NavCard
            href="/admin/newsroom/press"
            label="Press Center"
            sub="Bio Sorin Baciu · resurse atribuire · stats vizibile public"
          />
          <NavCard
            href="/admin/newsroom/metodologie"
            label="Metodologie & limitări"
            sub="Threshold-uri · surse · algoritmic vs editorial"
          />
        </div>
      </div>

      {/* TOP INSIGHTS preview */}
      {topAnomalies.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mb-1">Review pipeline</div>
              <h2 className="serif text-xl text-ink-900">Top 3 insights — review</h2>
            </div>
            <Link href="/admin/newsroom/anomalii" className="text-sm text-uzx-blue hover:text-uzx-orange font-medium">
              Vezi toate →
            </Link>
          </div>
          <div className="space-y-3">
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

      {/* FEATURED STORY preview */}
      {featured && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink-400 font-mono mb-3">Story-ul săptămânii</div>
          <Link
            href={`/admin/newsroom/stories/${featured.slug}`}
            className="block group border-t border-b border-ink-100 py-8 hover:bg-ink-50/40 -mx-4 px-4 transition-colors"
          >
            <div className="grid md:grid-cols-[2fr_1fr] gap-10 items-start">
              <div>
                <div className="text-xs num text-ink-500 mb-3 uppercase tracking-wider">
                  {new Date(featured.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
                  <span className="mx-2">·</span>
                  <span className="text-uzx-orange">PUBLICAT</span>
                </div>
                <h2 className="serif text-2xl md:text-3xl leading-[1.1] tracking-tight text-ink-900 group-hover:text-uzx-blue transition-colors mb-2">
                  {featured.title}
                </h2>
                {featured.subtitle && <p className="text-ink-600 leading-relaxed">{featured.subtitle}</p>}
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-uzx-orange font-medium group-hover:gap-2.5 transition-all">
                  Deschide story → Press Kit
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              {featured.bigNumber && (
                <div className="border-l-4 border-uzx-orange pl-5">
                  <div className="serif text-5xl md:text-6xl text-uzx-orange leading-none num">{featured.bigNumber}</div>
                  {featured.bigNumberLabel && (
                    <div className="text-xs text-ink-500 uppercase tracking-wider mt-3 leading-snug">{featured.bigNumberLabel}</div>
                  )}
                </div>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* ARCHIVE */}
      {rest.length > 0 && (
        <section>
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink-400 font-mono mb-3">Arhivă story-uri</div>
          <div className="grid gap-px bg-ink-200 border hairline">
            {rest.map((s) => (
              <Link
                key={s.id}
                href={`/admin/newsroom/stories/${s.slug}`}
                className="block bg-white px-4 py-4 hover:bg-ink-50/60 group"
              >
                <div className="text-[11px] num text-ink-500 mb-1 uppercase tracking-wider">
                  {new Date(s.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
                </div>
                <h3 className="serif text-lg tracking-tight text-ink-900 group-hover:text-uzx-blue transition-colors">{s.title}</h3>
                {s.subtitle && <p className="text-sm text-ink-500 mt-1 line-clamp-2">{s.subtitle}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* EMPTY STATE */}
      {stories.length === 0 && topAnomalies.length === 0 && (
        <div className="border border-dashed border-ink-200 rounded-lg p-10 text-center text-ink-500 bg-white">
          <p className="serif text-lg text-ink-700 mb-2">Niciun story sau insight încă.</p>
          <p className="text-sm">
            Rulează <code className="mono bg-ink-50 px-1.5 py-0.5 rounded">npm run analyze</code> +{" "}
            <code className="mono bg-ink-50 px-1.5 py-0.5 rounded">npm run export:static</code> în <code>newsroom-uzinex/</code> și commit JSON-ul.
          </p>
        </div>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  sub,
  accent,
  small,
}: {
  label: string;
  value: number | string;
  sub: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className={`bg-white p-4 ${accent ? "ring-2 ring-uzx-orange/20" : ""}`}>
      <div className="text-[11px] uppercase tracking-wider text-ink-500 font-mono">{label}</div>
      <div
        className={`serif tracking-tight mt-1 num ${accent ? "text-uzx-orange" : "text-ink-900"} ${small ? "text-base" : "text-2xl"}`}
      >
        {value}
      </div>
      <div className="text-[11px] text-ink-500 mt-1 leading-snug">{sub}</div>
    </div>
  );
}

function NavCard({
  href,
  label,
  sub,
  disabled,
}: {
  href: string;
  label: string;
  sub: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div className="bg-white p-4 opacity-50 cursor-not-allowed">
        <div className="text-[11px] uppercase tracking-wider text-ink-400 font-mono">— gol —</div>
        <div className="serif text-base text-ink-500 mt-1">{label}</div>
        <div className="text-[11px] text-ink-400 mt-1">{sub}</div>
      </div>
    );
  }
  return (
    <Link href={href} className="bg-white p-4 hover:bg-ink-50 transition flex items-center justify-between group">
      <div className="flex-1 min-w-0">
        <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono">→</div>
        <div className="serif text-base text-ink-900 mt-1">{label}</div>
        <div className="text-[11px] text-ink-500 mt-1">{sub}</div>
      </div>
      <span className="text-xl text-ink-300 group-hover:text-uzx-blue transition shrink-0">→</span>
    </Link>
  );
}
