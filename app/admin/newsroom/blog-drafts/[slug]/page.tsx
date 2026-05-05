import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { listBlogDrafts, loadBlogDraft } from "@/lib/newsroom/blog-drafts";

// Admin-only single-draft viewer. The HTML body is rendered as-is via
// dangerouslySetInnerHTML — drafts are produced by Claude Code skill (trusted
// source) and contain only static markup, no user input. Auth-gated by
// middleware.ts (matcher /admin/:path*).

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const draft = loadBlogDraft(slug);
  if (!draft) return { title: "Draft negăsit · UZINEX admin" };
  return {
    title: `${draft.meta.title} · draft · UZINEX admin`,
    description: draft.meta.metaDescription,
    robots: { index: false, follow: false },
  };
}

export default async function BlogDraftViewerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const draft = loadBlogDraft(slug);
  if (!draft) notFound();

  // List sibling versions so reviewer can compare v1 vs v2
  const allDrafts = listBlogDrafts();
  const siblingVersions = allDrafts.filter(
    (d) => d.slug === draft.slug && d.fileBaseName !== draft.fileBaseName,
  );

  const validation = draft.meta.validation as Record<string, unknown> | undefined;

  return (
    <div className="space-y-6 pb-12">
      <header>
        <Link
          href="/admin/newsroom/blog-drafts"
          className="text-sm text-ink-500 hover:text-uzx-orange transition-colors"
        >
          ← Drafturi blog
        </Link>

        <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mb-1">
          {draft.meta.format} · {draft.meta.wordCount?.toLocaleString("ro-RO")} cuvinte · {draft.meta.readingTimeMinutes} min
          {draft.meta.tone ? ` · ton: ${draft.meta.tone}` : ""}
        </div>

        <h1 className="serif text-2xl md:text-3xl text-ink-900 mb-3 leading-tight">{draft.meta.title}</h1>

        {/* META BAR */}
        <div className="flex flex-wrap gap-2 text-xs text-ink-500">
          <span className="bg-ink-50 px-2 py-0.5 rounded mono">{draft.meta.vertical}</span>
          <span className="bg-ink-50 px-2 py-0.5 rounded">audience: {draft.meta.audience}</span>
          {draft.meta.audienceSecondary && (
            <span className="bg-ink-50 px-2 py-0.5 rounded">+ {draft.meta.audienceSecondary}</span>
          )}
          {draft.meta.angle && (
            <span className="bg-uzx-orange/10 text-uzx-orange2 px-2 py-0.5 rounded font-medium">
              unghi: {draft.meta.angle}
            </span>
          )}
          {draft.meta.newsroomInsightId && (
            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
              ← insight #{draft.meta.newsroomInsightId}
            </span>
          )}
          <span className="ml-auto text-ink-400 num">
            Generat:{" "}
            {new Date(draft.meta.publishedAt).toLocaleDateString("ro-RO", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        {siblingVersions.length > 0 && (
          <div className="mt-3 text-xs text-ink-600">
            Alte versiuni:{" "}
            {siblingVersions.map((v, i) => (
              <span key={v.fileBaseName}>
                {i > 0 && " · "}
                <Link
                  href={`/admin/newsroom/blog-drafts/${v.fileBaseName}`}
                  className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2"
                >
                  {v.fileBaseName}
                </Link>
              </span>
            ))}
          </div>
        )}
      </header>

      {/* SOURCES + VALIDATION QUICK SUMMARY */}
      <aside className="grid md:grid-cols-2 gap-4">
        <div className="border border-ink-100 rounded-lg p-4 bg-white">
          <div className="text-[11px] uppercase tracking-wider text-ink-500 font-mono mb-2">
            Surse primare ({draft.meta.primarySources?.length || 0})
          </div>
          <ul className="text-xs text-ink-700 space-y-1">
            {draft.meta.primarySources?.slice(0, 6).map((s, i) => (
              <li key={i} className="leading-relaxed">
                · {s}
              </li>
            ))}
            {(draft.meta.primarySources?.length || 0) > 6 && (
              <li className="text-ink-400">
                + {(draft.meta.primarySources?.length || 0) - 6} surse suplimentare
              </li>
            )}
          </ul>
        </div>
        <div className="border border-ink-100 rounded-lg p-4 bg-white">
          <div className="text-[11px] uppercase tracking-wider text-ink-500 font-mono mb-2">Self-validation</div>
          {validation ? (
            <ul className="text-xs text-ink-700 space-y-0.5">
              {Object.entries(validation).map(([k, v]) => (
                <li key={k} className="leading-relaxed flex justify-between">
                  <span className="text-ink-500">{k}</span>
                  <span className="font-medium">{String(v)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-ink-500">Validation data not available.</p>
          )}
        </div>
      </aside>

      {/* RENDERED ARTICLE BODY */}
      <article className="border border-ink-100 rounded-lg bg-white p-6 md:p-10 prose-newsroom prose-blog-draft">
        {/* Drafts come from a trusted source (skill output) — markup only, no user data */}
        <div dangerouslySetInnerHTML={{ __html: draft.html }} />
      </article>

      {/* DOWNLOAD ACTIONS */}
      <div className="border-t border-ink-100 pt-5 flex flex-wrap gap-3 text-xs text-ink-600">
        <span className="text-ink-500 font-medium">Descarcă fișiere brute:</span>
        <span className="bg-ink-50 px-2 py-1 rounded mono">{draft.fileBaseName}.html</span>
        <span className="bg-ink-50 px-2 py-1 rounded mono">{draft.fileBaseName}.schema.json</span>
        <span className="bg-ink-50 px-2 py-1 rounded mono">{draft.fileBaseName}.meta.json</span>
        <span className="ml-auto text-ink-400">
          Locație: <code className="mono">data/blog-drafts/</code>
        </span>
      </div>
    </div>
  );
}
