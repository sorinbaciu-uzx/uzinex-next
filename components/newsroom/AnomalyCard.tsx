"use client";

import { useState } from "react";
import Link from "next/link";
import { CopyButton } from "./CopyButton";
import { Sparkline, MiniBar } from "./Sparkline";
import type { InsightView } from "@/lib/newsroom/extract";

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  anomaly: { label: "ANOMALIE STATISTICĂ", color: "bg-red-100 text-red-800" },
  trend: { label: "TREND", color: "bg-uzx-blue/15 text-uzx-blue2" },
  ranking: { label: "RANKING", color: "bg-uzx-orange/15 text-uzx-orange2" },
  cross_reference: { label: "CROSS-REFERENCE", color: "bg-purple-100 text-purple-800" },
};

type Props = {
  insight: {
    id: number;
    type: string;
    title: string;
    summary: string;
    score: number;
    createdAt: string;
    usedInStoryId: number | null;
    sources: string[];
  };
  view: InsightView;
  shareableHeadline: string;
  storyLink?: { id: number; slug: string } | null;
};

export function AnomalyCard({ insight, view, shareableHeadline, storyLink }: Props) {
  const [generating] = useState(false);

  const type = TYPE_LABELS[insight.type] || { label: insight.type.toUpperCase(), color: "bg-ink-100 text-ink-700" };
  const dateStr = new Date(insight.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <article className="border border-ink-100 rounded-lg bg-white overflow-hidden hover:border-uzx-blue/40 transition-colors">
      <div className="p-5 md:p-6">
        {/* HEADER */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4 text-xs">
          <span className={`px-2 py-0.5 rounded font-medium ${type.color}`}>{type.label}</span>
          <span className="num text-ink-500">score <strong className="text-ink-900">{insight.score.toFixed(2)}</strong></span>
          <span className="text-ink-300">·</span>
          <span className="text-ink-500 num">{dateStr}</span>
          {insight.sources.map((s) => (
            <span key={s} className="bg-ink-50 text-ink-700 px-2 py-0.5 rounded mono">
              {s}
            </span>
          ))}
          <span className="num text-ink-300 ml-auto">#{insight.id}</span>
        </div>

        <div className="grid md:grid-cols-[1fr_220px] gap-6 items-start">
          {/* TEXT */}
          <div className="min-w-0">
            <h2 className="serif text-2xl md:text-[28px] tracking-tight text-ink-900 leading-tight mb-3">
              {insight.title}
            </h2>
            <ul className="space-y-1.5 text-sm text-ink-700 mb-4">
              {view.bullets.map((b, i) => (
                <li key={i} className="flex gap-2.5">
                  <span className="text-uzx-orange flex-shrink-0 font-bold">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-ink-500 italic leading-relaxed">{insight.summary}</p>
          </div>

          {/* BIG NUMBER + CHART */}
          <aside className="border-l-4 border-uzx-orange pl-4 md:pl-5">
            <div className="serif text-4xl md:text-5xl text-uzx-orange leading-none num">{view.bigNumber}</div>
            <div className="text-[11px] text-ink-500 uppercase tracking-widest mt-2 leading-snug">{view.bigNumberLabel}</div>
            {view.chartType === "line" && view.chartData.length > 1 && (
              <div className="mt-4">
                <Sparkline data={view.chartData as Array<{ date: string; value: number }>} height={56} />
              </div>
            )}
            {view.chartType === "bar" && view.chartData.length > 1 && (
              <div className="mt-3">
                <MiniBar data={view.chartData as Array<{ label: string; value: number }>} height={90} />
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ACTION ROW */}
      <div className="border-t border-ink-100 bg-ink-50/40 px-5 md:px-6 py-3 flex flex-wrap gap-2 items-center">
        <CopyButton value={insight.title} label="Copiază titlul" />
        <CopyButton value={shareableHeadline} label="Copiază titlu + bullets + sursă" />
        <a
          href={`/api/newsroom/insights/${insight.id}/data.csv`}
          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue hover:bg-white transition text-ink-700"
        >
          📊 Descarcă datele (CSV)
        </a>

        {storyLink && (
          <Link href={`/newsroom/stories/${storyLink.slug}`} className="ml-auto inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-uzx-orange text-white hover:bg-uzx-orange2 font-medium transition">
            Vezi story complet →
          </Link>
        )}
      </div>
    </article>
  );
}
