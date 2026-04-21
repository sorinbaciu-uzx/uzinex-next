"use client";

import type { SEOAnalysis, SEOCheckCategory } from "@/lib/seo/types";

const CATEGORY_LABELS: Record<SEOCheckCategory, string> = {
  critical: "Critical",
  important: "Important",
  readability: "Readability",
  bonus: "Bonus",
};

const CATEGORY_COLORS: Record<SEOCheckCategory, string> = {
  critical: "#ef4444",
  important: "#f59e0b",
  readability: "#3b82f6",
  bonus: "#8b5cf6",
};

export function SEOScorePanel({ analysis }: { analysis: SEOAnalysis }) {
  const { score, verdictColor, verdict, checks, categoryScores } = analysis;

  const verdictText =
    verdict === "excellent"
      ? "Excelent"
      : verdict === "good"
        ? "Bun"
        : verdict === "needs-work"
          ? "Necesită lucru"
          : "Critic";

  // Sort checks: failed first (critical first), passed after
  const sortedChecks = [...checks].sort((a, b) => {
    if (a.passed !== b.passed) return a.passed ? 1 : -1;
    const order: SEOCheckCategory[] = [
      "critical",
      "important",
      "readability",
      "bonus",
    ];
    return order.indexOf(a.category) - order.indexOf(b.category);
  });

  return (
    <div className="bg-white border hairline">
      {/* BIG SCORE */}
      <div
        className="p-5 text-white text-center"
        style={{ background: verdictColor }}
      >
        <div
          className="serif text-6xl font-semibold leading-none"
          style={{ letterSpacing: "-0.03em" }}
        >
          {score}
          <span className="text-2xl font-light opacity-70">/100</span>
        </div>
        <div className="text-sm mt-2 opacity-90 font-medium">
          {verdictText}
        </div>
        {analysis.keywordDensity !== undefined && (
          <div className="text-[11px] mt-2 opacity-80 font-mono">
            densitate kw: {analysis.keywordDensity}% · lizibilitate:{" "}
            {analysis.readabilityGrade}
          </div>
        )}
      </div>

      {/* CATEGORY BREAKDOWN */}
      <div className="p-4 border-b hairline space-y-2">
        {(Object.keys(CATEGORY_LABELS) as SEOCheckCategory[]).map((cat) => {
          const { score: s, max: m } = categoryScores[cat];
          const pct = m > 0 ? (s / m) * 100 : 0;
          return (
            <div key={cat}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-mono uppercase tracking-wider text-ink-700">
                  {CATEGORY_LABELS[cat]}
                </span>
                <span className="font-mono text-ink-500">
                  {s}/{m}
                </span>
              </div>
              <div className="h-1.5 bg-ink-100 overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{
                    width: pct + "%",
                    background: CATEGORY_COLORS[cat],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* CHECKS LIST */}
      <div className="p-4 space-y-3 max-h-[650px] overflow-y-auto">
        {sortedChecks.map((check) => (
          <div
            key={check.id}
            className={
              "flex items-start gap-2.5 text-sm " +
              (check.passed ? "opacity-60" : "")
            }
          >
            <div
              className="shrink-0 mt-0.5 text-base leading-none"
              style={{
                color: check.passed ? "#10b981" : "#ef4444",
              }}
            >
              {check.passed ? "✓" : "✗"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <span
                  className={
                    "leading-tight " +
                    (check.passed ? "text-ink-600" : "text-ink-900 font-medium")
                  }
                >
                  {check.label}
                </span>
                <span
                  className="text-[10px] font-mono shrink-0"
                  style={{ color: CATEGORY_COLORS[check.category] }}
                >
                  {check.points}/{check.maxPoints}
                </span>
              </div>
              {!check.passed && check.tip && (
                <div className="text-xs text-ink-500 mt-0.5 leading-snug">
                  {check.tip}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
