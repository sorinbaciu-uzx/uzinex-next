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
  return (
    <article className="py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
      {/* LEFT: text */}
      <div className="lg:col-span-6 border-l-2 pl-5" style={{ borderColor: CATEGORY_COLORS[article.category] || "#1e6bb8" }}>
        <div
          className="text-[11px] uppercase tracking-[0.22em] mono font-bold mb-3"
          style={{
            color: CATEGORY_COLORS[article.category] || "#1e6bb8",
          }}
        >
          {article.category}
        </div>
        <h2
          className="serif text-2xl md:text-3xl text-ink-900 leading-[1.1] mb-4"
          style={{ letterSpacing: "-0.02em" }}
        >
          <Link
            href={`/noutati/${article.slug}`}
            className="hover:text-uzx-blue transition"
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-sm text-ink-600 leading-relaxed mb-4 max-w-xl">
          {article.excerpt}
        </p>
        <Link
          href={`/noutati/${article.slug}`}
          className="inline-flex items-center gap-2 text-sm text-uzx-blue font-medium hover:gap-3 transition-all"
        >
          Citește mai departe
          <span>›</span>
        </Link>
      </div>

      {/* MIDDLE: date + authors */}
      <div className="lg:col-span-3 border-l-2 border-ink-200 pl-5">
        <div className="text-xs text-ink-400 mono mb-4">| {article.date}</div>
        {article.authors && article.authors.length > 0 ? (
          <div className="space-y-3">
            {article.authors.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                {a.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.avatar}
                    alt={a.name}
                    className="w-10 h-10 object-cover bg-ink-100 border hairline"
                  />
                ) : (
                  <div className="w-10 h-10 bg-uzx-blue text-white text-xs font-bold flex items-center justify-center">
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
                    <div className="text-ink-500 text-xs">{a.role}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-ink-400 italic">Echipa Uzinex</div>
        )}
      </div>

      {/* RIGHT: image */}
      <div className="lg:col-span-3">
        <Link
          href={`/noutati/${article.slug}`}
          className="block border hairline overflow-hidden group"
        >
          {article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
              alt={article.title}
              className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div
              className="w-full aspect-square flex items-center justify-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${
                  CATEGORY_COLORS[article.category] || "#1e6bb8"
                } 0%, #082545 100%)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, transparent 0 20px, rgba(255,255,255,0.08) 20px 21px)",
                }}
              />
              <div
                className="serif text-white/90 text-3xl font-light relative z-10"
                style={{ letterSpacing: "-0.02em" }}
              >
                {article.category.toUpperCase()}
              </div>
            </div>
          )}
        </Link>
      </div>
    </article>
  );
}
