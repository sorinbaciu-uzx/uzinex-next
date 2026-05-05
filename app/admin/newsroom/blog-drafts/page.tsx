import Link from "next/link";
import type { Metadata } from "next";
import { groupBlogDraftsBySlug } from "@/lib/newsroom/blog-drafts";

// Admin-only listing of blog drafts produced by the uzinex-blog-article skill.
// Auth-gated by middleware.ts (matcher /admin/:path*).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Drafturi blog · Newsroom · UZINEX admin",
  description: "Articole de blog generate prin skill-ul uzinex-blog-article — pentru review intern.",
  robots: { index: false, follow: false },
};

const FORMAT_LABELS: Record<string, { label: string; color: string }> = {
  pillar: { label: "PILLAR", color: "bg-uzx-blue/15 text-uzx-blue2" },
  comparativ: { label: "COMPARATIV", color: "bg-uzx-orange/15 text-uzx-orange2" },
  faq: { label: "FAQ", color: "bg-purple-100 text-purple-800" },
};

export default function BlogDraftsListPage() {
  const grouped = groupBlogDraftsBySlug();
  const slugs = Array.from(grouped.keys());

  const totalDrafts = Array.from(grouped.values()).flat().length;
  const totalArticles = grouped.size;

  return (
    <div className="space-y-8 pb-8">
      <header>
        <Link
          href="/admin/newsroom"
          className="text-sm text-ink-500 hover:text-uzx-orange transition-colors"
        >
          ← Newsroom
        </Link>
        <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mt-3 mb-2">
          Skill output · drafturi
        </div>
        <h1 className="serif text-3xl text-ink-900 mb-3">Drafturi blog</h1>
        <p className="text-ink-600 leading-relaxed max-w-3xl text-sm">
          Articole produse de skill-ul <code className="mono bg-ink-50 px-1.5 py-0.5 rounded text-xs">/uzinex-blog-article</code> — pentru review intern.
          Fiecare articol are 3 fișiere asociate: HTML semantic, JSON-LD schema, meta + 5 imagini sugerate.
          Drafturile NU sunt vizibile public — folosește această secțiune pentru iterare editorială înainte de promovarea spre blog public.
        </p>
        <div className="mt-3 text-xs text-ink-500">
          {totalArticles} articole · {totalDrafts} versiuni totale (incluzând v2, v3 etc.)
        </div>
      </header>

      {totalArticles === 0 ? (
        <div className="border border-dashed border-ink-200 rounded-lg p-10 text-center text-ink-500 bg-white">
          <p className="serif text-lg text-ink-700 mb-2">Nu există drafturi încă.</p>
          <p className="text-sm">
            Invocă skill-ul <code className="mono bg-ink-50 px-1.5 py-0.5 rounded">/uzinex-blog-article</code> din Claude Code pentru a genera primul articol.
            Fișierele se vor salva în <code className="mono bg-ink-50 px-1.5 py-0.5 rounded">data/blog-drafts/</code>.
          </p>
        </div>
      ) : (
        <div className="grid gap-px bg-ink-200 border hairline">
          {slugs.map((slug) => {
            const versions = grouped.get(slug) ?? [];
            const latest = versions[0];
            const format = FORMAT_LABELS[latest.meta.format] || {
              label: latest.meta.format.toUpperCase(),
              color: "bg-ink-100 text-ink-700",
            };
            return (
              <Link
                key={slug}
                href={`/admin/newsroom/blog-drafts/${latest.fileBaseName}`}
                className="bg-white p-5 hover:bg-ink-50/60 group transition"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
                  <span className={`px-2 py-0.5 rounded font-medium ${format.color}`}>
                    {format.label}
                  </span>
                  <span className="text-ink-500">
                    {latest.meta.wordCount?.toLocaleString("ro-RO") || "—"} cuvinte
                  </span>
                  <span className="text-ink-300">·</span>
                  <span className="text-ink-500">{latest.meta.readingTimeMinutes || "—"} min lectură</span>
                  <span className="text-ink-300">·</span>
                  <span className="text-ink-500 mono">{latest.meta.vertical}</span>
                  {versions.length > 1 && (
                    <span className="text-uzx-orange font-medium">
                      · {versions.length} versiuni
                    </span>
                  )}
                  <span className="ml-auto text-ink-400 num">
                    {new Date(latest.meta.updatedAt).toLocaleDateString("ro-RO", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="serif text-xl text-ink-900 group-hover:text-uzx-blue transition-colors leading-tight">
                  {latest.meta.title}
                </h2>
                <p className="text-sm text-ink-600 mt-1.5 line-clamp-2">
                  {latest.meta.metaDescription}
                </p>
                {latest.meta.audience && (
                  <div className="text-[11px] text-ink-400 mt-2">
                    Audience: {latest.meta.audience}
                    {latest.meta.audienceSecondary && ` + ${latest.meta.audienceSecondary}`}
                    {latest.meta.tone && ` · ton: ${latest.meta.tone}`}
                    {latest.meta.angle && ` · unghi: ${latest.meta.angle}`}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}

      <footer className="border-t border-ink-100 pt-6 text-xs text-ink-500 leading-relaxed">
        Drafturile se generează cu skill-ul Claude Code <code className="mono bg-ink-50 px-1.5 py-0.5 rounded">/uzinex-blog-article</code>.
        Skill-ul este definit la <code className="mono">.claude/skills/uzinex-blog-article/SKILL.md</code> și produce HTML semantic + JSON-LD + meta + 5 imagini sugerate.
      </footer>
    </div>
  );
}
