"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import type { Article } from "@/components/NewsSection";

const PAGE_SIZE = 4;

/* ───── hover animation CSS ───── */
const HOVER_CSS = `
.article-card .article-img {
  transition: transform 900ms cubic-bezier(0.22,1,0.36,1),
              filter 700ms ease-out;
  filter: grayscale(25%) contrast(1.03);
  transform-origin: center;
  will-change: transform;
}
.article-card:hover .article-img {
  transform: scale(1.12) rotate(-0.6deg);
  filter: grayscale(0%) contrast(1.08) saturate(1.05);
}
.article-card .accent-bar {
  transition: width 700ms cubic-bezier(0.77,0,0.175,1);
}
.article-card:hover .accent-bar {
  width: 100%;
}
.article-card .wipe-overlay {
  background: linear-gradient(215deg,
    rgba(8,37,69,0) 0%,
    rgba(8,37,69,0) 45%,
    rgba(8,37,69,0.55) 70%,
    rgba(8,37,69,0.85) 100%);
  clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
  transition: clip-path 800ms cubic-bezier(0.77,0,0.175,1);
}
.article-card:hover .wipe-overlay {
  clip-path: polygon(0 100%, 0 35%, 100% 0%, 100% 100%);
}
.article-card .caption {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 500ms ease-out 150ms,
              transform 600ms cubic-bezier(0.22,1,0.36,1) 150ms;
}
.article-card:hover .caption {
  opacity: 1;
  transform: translateY(0);
}
.article-card .caption-bar {
  width: 0;
  transition: width 700ms cubic-bezier(0.77,0,0.175,1) 250ms;
}
.article-card:hover .caption-bar {
  width: 3rem;
}
.article-card .caption-text {
  letter-spacing: 0.05em;
  transition: letter-spacing 600ms ease-out 200ms;
}
.article-card:hover .caption-text {
  letter-spacing: 0.15em;
}
`;

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

type Tab = "Toate" | Article["category"];
const TABS: Tab[] = ["Toate", "Comunicat", "Articol", "Anunț", "Studiu"];

export function BlogFeed({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState<Tab>("Toate");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (active === "Toate") return articles;
    return articles.filter((a) => a.category === active);
  }, [articles, active]);

  // reset to page 1 whenever the filter changes
  useEffect(() => {
    setPage(1);
  }, [active]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages);
  const pageSlice = filtered.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE
  );

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: HOVER_CSS }} />
      {/* ── TABS ── */}
      <div className="flex items-center gap-2 flex-wrap mb-10 pb-6 border-b hairline">
        {TABS.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setActive(t)}
              className={`text-sm px-4 py-1.5 transition ${
                isActive
                  ? "bg-uzx-blue text-white"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* ── LIST — max 4 per page on lg+, paginated ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-ink-400 italic">
          Niciun articol în această categorie.
        </div>
      ) : (
        <>
          <div className="divide-y divide-ink-200 divide-dashed pt-2">
            {pageSlice.map((a) => (
              <Row key={a.slug} article={a} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-14 flex items-center justify-center gap-2"
              aria-label="Paginare articole"
            >
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={clampedPage === 1}
                className="w-9 h-9 border hairline flex items-center justify-center text-sm text-ink-700 hover:bg-ink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Pagina anterioară"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                const isActive = n === clampedPage;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    aria-current={isActive ? "page" : undefined}
                    className={`w-9 h-9 border hairline flex items-center justify-center text-sm font-medium transition ${
                      isActive
                        ? "bg-uzx-blue border-uzx-blue text-white"
                        : "text-ink-700 hover:bg-ink-50"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={clampedPage === totalPages}
                className="w-9 h-9 border hairline flex items-center justify-center text-sm text-ink-700 hover:bg-ink-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
                aria-label="Pagina următoare"
              >
                ›
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}

function Row({ article }: { article: Article }) {
  const accent = CATEGORY_COLORS[article.category] || "#1e6bb8";
  const hasAuthors = (article.authors?.length ?? 0) > 0;
  return (
    <article className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* LEFT: text column */}
      <div
        className="lg:col-span-5 border-l-2 pl-5"
        style={{ borderColor: accent }}
      >
        <div
          className="text-[11px] uppercase tracking-[0.22em] mono font-bold mb-4"
          style={{ color: accent }}
        >
          {article.category}
        </div>
        <h2
          className="serif text-2xl md:text-[28px] text-ink-900 leading-[1.1] mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          <Link
            href={`/noutati/${article.slug}`}
            className="hover:text-uzx-blue transition"
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-ink-600 leading-relaxed mb-5">
          {article.excerpt}
        </p>
        <Link
          href={`/noutati/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm text-uzx-blue font-medium hover:gap-3 transition-all"
        >
          Citește mai departe <span>›</span>
        </Link>
      </div>

      {/* RIGHT: date + authors on top, image below */}
      <div className="lg:col-span-7 lg:border-l-2 lg:border-dashed lg:border-ink-200 lg:pl-8">
        <div className="text-sm text-ink-700 mb-6">{article.date}</div>

        {hasAuthors ? (
          <div className="flex items-start gap-4 flex-wrap mb-8">
            {article.authors!.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                {a.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.avatar}
                    alt={a.name}
                    className="w-11 h-11 rounded-full object-cover bg-ink-100 border hairline shrink-0"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-uzx-blue text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {a.name
                      .split(" ")
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                )}
                <div className="text-sm leading-tight">
                  <div className="text-ink-900 font-medium">{a.name}</div>
                  {a.role && (
                    <div className="text-ink-500 text-xs mt-0.5">{a.role}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-ink-400 italic mb-8">
            Echipa Uzinex
          </div>
        )}

        <Link
          href={`/noutati/${article.slug}`}
          className="article-card block border hairline overflow-hidden group relative isolate max-w-[320px]"
          style={{ "--accent": accent } as React.CSSProperties}
        >
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.title}
              className="article-img w-full aspect-[4/5] object-cover"
            />
          ) : (
            <div
              className="article-img w-full aspect-[4/5] flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${accent} 0%, #082545 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0 24px, rgba(255,255,255,0.08) 24px 25px)",
                }}
              />
              <div
                className="serif text-white/90 text-2xl font-light relative z-10"
                style={{ letterSpacing: "-0.02em" }}
              >
                {article.category}
              </div>
            </div>
          )}

          {/* top accent bar wipe — expands from left */}
          <span
            className="accent-bar pointer-events-none absolute top-0 left-0 h-[3px] w-0 z-20"
            style={{ background: accent }}
          />

          {/* diagonal color wipe overlay */}
          <span
            className="pointer-events-none absolute inset-0 z-10 wipe-overlay"
            aria-hidden
          />

          {/* bottom caption — slides up + letter spacing expansion */}
          <div className="caption pointer-events-none absolute inset-x-0 bottom-0 p-4 z-20">
            <div
              className="caption-bar h-[2px] mb-2"
              style={{ background: accent }}
            />
            <div className="caption-text text-white text-[11px] font-medium inline-flex items-center gap-1 uppercase tracking-wider mono">
              Citește articolul <span>›</span>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
