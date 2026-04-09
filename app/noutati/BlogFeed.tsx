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

      {/* ── LIST — 2 per row on lg+ ── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center text-ink-400 italic">
          Niciun articol în această categorie.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12 lg:gap-y-16 pt-8">
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
  const primary = article.authors?.[0];
  return (
    <article className="grid grid-cols-12 gap-4">
      {/* LEFT: text column */}
      <div
        className="col-span-7 border-l-2 pl-4"
        style={{ borderColor: accent }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.22em] mono font-bold mb-3"
          style={{ color: accent }}
        >
          {article.category}
        </div>
        <h2
          className="serif text-[20px] text-ink-900 leading-[1.1] mb-3"
          style={{ letterSpacing: "-0.02em" }}
        >
          <Link
            href={`/noutati/${article.slug}`}
            className="hover:text-uzx-blue transition"
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-[13px] text-ink-600 leading-relaxed mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        <Link
          href={`/noutati/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-[13px] text-uzx-blue font-medium hover:gap-2 transition-all"
        >
          Citește mai departe <span>›</span>
        </Link>
      </div>

      {/* RIGHT: date + authors + image */}
      <div className="col-span-5 border-l border-dashed border-ink-200 pl-4">
        <div className="text-xs text-ink-700 mb-3">{article.date}</div>

        {primary ? (
          <div className="flex items-center gap-2 mb-3">
            {primary.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={primary.avatar}
                alt={primary.name}
                className="w-8 h-8 rounded-full object-cover bg-ink-100 border hairline shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-uzx-blue text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                {primary.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            )}
            <div className="text-xs leading-tight min-w-0">
              <div className="text-ink-900 font-medium truncate">
                {primary.name}
              </div>
              {primary.role && (
                <div className="text-ink-500 text-[10px] truncate">
                  {primary.role}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-ink-400 italic mb-3">
            Echipa Uzinex
          </div>
        )}

        <Link
          href={`/noutati/${article.slug}`}
          className="block border hairline overflow-hidden group"
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
                className="serif text-white/90 text-2xl font-light relative z-10"
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
