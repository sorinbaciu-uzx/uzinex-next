"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Article } from "@/components/NewsSection";

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

  const filtered = useMemo(() => {
    if (active === "Toate") return articles;
    return articles.filter((a) => a.category === active);
  }, [articles, active]);

  return (
    <div>
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

      {/* ── LIST ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-ink-400 italic">
          Niciun articol în această categorie.
        </div>
      ) : (
        <div className="divide-y divide-ink-200 divide-dashed">
          {filtered.map((a) => (
            <Row key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function Row({ article }: { article: Article }) {
  const accent = CATEGORY_COLORS[article.category] || "#1e6bb8";
  return (
    <article className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      {/* LEFT: narrow text column */}
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

      {/* RIGHT WRAPPER: date + authors on top, image below — inside single col */}
      <div className="lg:col-span-7 lg:border-l-2 lg:border-dashed lg:border-ink-200 lg:pl-8">
        {/* date */}
        <div className="text-sm text-ink-700 mb-6">{article.date}</div>

        {/* authors */}
        {article.authors && article.authors.length > 0 ? (
          <div className="flex items-start gap-8 flex-wrap mb-8">
            {article.authors.map((a, i) => (
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
          <div className="text-xs text-ink-400 italic mb-8">Echipa Uzinex</div>
        )}

        {/* image placeholder — compact vertical rectangle */}
        <Link
          href={`/noutati/${article.slug}`}
          className="block border hairline overflow-hidden group max-w-[260px]"
        >
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div
              className="w-full aspect-[4/5] flex items-center justify-center relative overflow-hidden"
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
                className="serif text-white/90 text-4xl lg:text-5xl font-light relative z-10"
                style={{ letterSpacing: "-0.02em" }}
              >
                {article.category}
              </div>
            </div>
          )}
        </Link>
      </div>
    </article>
  );
}
