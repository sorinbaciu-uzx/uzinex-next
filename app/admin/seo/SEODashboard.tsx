"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  slug: string;
  name: string;
  category: string;
  subcategory?: string;
  score: number;
  verdict: string;
  focusKeyword: string;
  hasImage: boolean;
  hasOverride: boolean;
  updatedAt?: string;
  criticalFails: number;
};

type Stats = {
  total: number;
  avg: number;
  needAttention: number;
  excellent: number;
  noKeyword: number;
  noImage: number;
};

type SortKey = "score-asc" | "score-desc" | "name" | "category";
type FilterMode = "all" | "need-work" | "no-keyword" | "no-image" | "no-override" | "excellent";

function scoreColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 90) return { bg: "#10b981", text: "#ffffff", border: "#059669" };
  if (score >= 75) return { bg: "#65a30d", text: "#ffffff", border: "#4d7c0f" };
  if (score >= 50) return { bg: "#f59e0b", text: "#ffffff", border: "#d97706" };
  return { bg: "#ef4444", text: "#ffffff", border: "#dc2626" };
}

function ScoreBadge({ score }: { score: number }) {
  const c = scoreColor(score);
  return (
    <div
      className="inline-flex items-center justify-center w-11 h-11 text-sm font-semibold font-mono"
      style={{
        background: c.bg,
        color: c.text,
        borderRadius: "50%",
      }}
    >
      {score}
    </div>
  );
}

export function SEODashboard({
  items,
  stats,
}: {
  items: Item[];
  stats: Stats;
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("score-asc");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.category));
    return Array.from(set).sort();
  }, [items]);

  // Filtered + sorted list
  const filtered = useMemo(() => {
    let out = items;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      out = out.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.slug.toLowerCase().includes(q) ||
          i.focusKeyword.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }

    if (categoryFilter) {
      out = out.filter((i) => i.category === categoryFilter);
    }

    switch (filter) {
      case "need-work":
        out = out.filter((i) => i.score < 70);
        break;
      case "no-keyword":
        out = out.filter((i) => !i.focusKeyword || i.focusKeyword.trim().length < 2);
        break;
      case "no-image":
        out = out.filter((i) => !i.hasImage);
        break;
      case "no-override":
        out = out.filter((i) => !i.hasOverride);
        break;
      case "excellent":
        out = out.filter((i) => i.score >= 90);
        break;
    }

    switch (sort) {
      case "score-asc":
        out = [...out].sort((a, b) => a.score - b.score);
        break;
      case "score-desc":
        out = [...out].sort((a, b) => b.score - a.score);
        break;
      case "name":
        out = [...out].sort((a, b) => a.name.localeCompare(b.name, "ro"));
        break;
      case "category":
        out = [...out].sort((a, b) =>
          a.category.localeCompare(b.category, "ro")
        );
        break;
    }

    return out;
  }, [items, search, sort, filter, categoryFilter]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mb-2">
            — Editor produse
          </div>
          <h1 className="serif text-3xl text-ink-900">
            Produsele tale ({stats.total})
          </h1>
          <p className="text-ink-500 mt-2 max-w-2xl">
            Click pe un produs pentru editor complet — imagini, nume, descriere
            (paragrafe + tabele), categorii, fișă tehnică, SEO cu 22 verificări
            și rescriere AI cu Claude Opus.
          </p>
        </div>
        <a
          href="/api/admin/seo/export"
          className="shrink-0 border hairline bg-white px-4 py-2.5 text-sm hover:bg-ink-50 transition"
        >
          Export CSV
        </a>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-ink-200 border hairline">
        <StatCard
          label="Produse"
          value={stats.total}
          mono
          subtitle="în catalog"
          highlight={false}
        />
        <StatCard
          label="Scor mediu"
          value={stats.avg}
          suffix="/100"
          mono
          subtitle={
            stats.avg >= 75
              ? "peste target"
              : stats.avg >= 50
                ? "necesită atenție"
                : "critic"
          }
          accent={
            stats.avg >= 75
              ? "#10b981"
              : stats.avg >= 50
                ? "#f59e0b"
                : "#ef4444"
          }
        />
        <StatCard
          label="Excelent (≥90)"
          value={stats.excellent}
          mono
          subtitle="rich result eligibil"
          accent="#10b981"
          highlight={false}
        />
        <StatCard
          label="Necesită lucru (<70)"
          value={stats.needAttention}
          mono
          subtitle="sub prag rankare"
          accent={stats.needAttention > 0 ? "#ef4444" : "#10b981"}
        />
        <StatCard
          label="Fără focus keyword"
          value={stats.noKeyword}
          mono
          subtitle="urgent — blochează SEO"
          accent={stats.noKeyword > 0 ? "#ef4444" : "#10b981"}
        />
        <StatCard
          label="Fără imagine"
          value={stats.noImage}
          mono
          subtitle="blochează rich snippets"
          accent={stats.noImage > 0 ? "#f59e0b" : "#10b981"}
          highlight={false}
        />
      </div>

      {/* CONTROLS */}
      <div className="bg-white border hairline p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Caută după nume, slug, keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[240px] border hairline px-4 py-2 text-sm bg-ink-50 focus:bg-white focus:outline-none focus:border-uzx-blue"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border hairline px-3 py-2 text-sm bg-white"
          >
            <option value="score-asc">Scor: cel mai mic primul</option>
            <option value="score-desc">Scor: cel mai mare primul</option>
            <option value="name">Nume alfabetic</option>
            <option value="category">Categorie</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border hairline px-3 py-2 text-sm bg-white"
          >
            <option value="">Toate categoriile</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            Toate ({items.length})
          </FilterChip>
          <FilterChip
            active={filter === "need-work"}
            onClick={() => setFilter("need-work")}
            accent="#ef4444"
          >
            Necesită lucru ({stats.needAttention})
          </FilterChip>
          <FilterChip
            active={filter === "excellent"}
            onClick={() => setFilter("excellent")}
            accent="#10b981"
          >
            Excelente ({stats.excellent})
          </FilterChip>
          <FilterChip
            active={filter === "no-keyword"}
            onClick={() => setFilter("no-keyword")}
            accent="#f59e0b"
          >
            Fără keyword ({stats.noKeyword})
          </FilterChip>
          <FilterChip
            active={filter === "no-image"}
            onClick={() => setFilter("no-image")}
          >
            Fără imagine ({stats.noImage})
          </FilterChip>
          <FilterChip
            active={filter === "no-override"}
            onClick={() => setFilter("no-override")}
          >
            Neoptimizate ({items.filter((i) => !i.hasOverride).length})
          </FilterChip>
        </div>
      </div>

      {/* LIST */}
      <div className="bg-white border hairline">
        <div className="divide-y hairline">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-ink-500 text-sm">
              Niciun produs nu se potrivește filtrelor.
            </div>
          )}
          {filtered.map((item) => (
            <Link
              key={item.slug}
              href={`/admin/seo/product/${item.slug}`}
              className="block p-4 hover:bg-ink-50 transition"
            >
              <div className="flex items-center gap-5">
                <ScoreBadge score={item.score} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="serif text-base text-ink-900 truncate">
                      {item.name}
                    </span>
                    {item.hasOverride && (
                      <span className="text-[10px] font-mono bg-uzx-blue/10 text-uzx-blue px-1.5 py-0.5">
                        OPTIMIZAT
                      </span>
                    )}
                    {!item.hasImage && (
                      <span className="text-[10px] font-mono bg-orange-100 text-orange-700 px-1.5 py-0.5">
                        FĂRĂ IMAGINE
                      </span>
                    )}
                    {(!item.focusKeyword ||
                      item.focusKeyword.trim().length < 2) && (
                      <span className="text-[10px] font-mono bg-red-100 text-red-700 px-1.5 py-0.5">
                        FĂRĂ KEYWORD
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-500 mt-1 flex items-center gap-3 flex-wrap">
                    <span className="font-mono">{item.slug}</span>
                    <span>·</span>
                    <span>{item.category}</span>
                    {item.subcategory && (
                      <>
                        <span>·</span>
                        <span>{item.subcategory}</span>
                      </>
                    )}
                    {item.focusKeyword && (
                      <>
                        <span>·</span>
                        <span className="text-ink-700">
                          kw: <b>{item.focusKeyword}</b>
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0 hidden lg:block">
                  {item.criticalFails > 0 && (
                    <div className="text-xs text-red-600 font-medium">
                      {item.criticalFails} critical
                    </div>
                  )}
                  {item.updatedAt && (
                    <div className="text-[10px] text-ink-400 mt-1">
                      {new Date(item.updatedAt).toLocaleDateString("ro-RO")}
                    </div>
                  )}
                </div>
                <span className="text-2xl text-ink-300 shrink-0">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-xs text-ink-400 text-center">
        Arată {filtered.length} din {items.length} produse
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
  mono,
  accent,
  suffix,
  highlight = true,
}: {
  label: string;
  value: number;
  subtitle?: string;
  mono?: boolean;
  accent?: string;
  suffix?: string;
  highlight?: boolean;
}) {
  return (
    <div className="bg-white p-4">
      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-mono mb-1">
        {label}
      </div>
      <div
        className={
          (mono ? "font-mono " : "") +
          "serif text-3xl text-ink-900 leading-none"
        }
        style={highlight && accent ? { color: accent } : undefined}
      >
        {value}
        {suffix && (
          <span className="text-lg text-ink-400 ml-1">{suffix}</span>
        )}
      </div>
      {subtitle && (
        <div className="text-[11px] text-ink-500 mt-1.5">{subtitle}</div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs px-3 py-1.5 transition border hairline font-medium"
      style={
        active
          ? {
              background: accent || "#1e6bb8",
              color: "white",
              borderColor: accent || "#1e6bb8",
            }
          : {
              background: "white",
              color: "#374151",
            }
      }
    >
      {children}
    </button>
  );
}
