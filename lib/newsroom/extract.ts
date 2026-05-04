// Extract a "key number" + bullets + chart from an insight's data field.
// Mirror of src/lib/insights/extract.ts in newsroom-uzinex.

import type { Insight } from "./data";

export type InsightView = {
  bigNumber: string;
  bigNumberLabel: string;
  bullets: string[];
  chartType: "line" | "bar" | null;
  chartData: Array<{ date?: string | number; label?: string; value: number }>;
};

function fmtNum(v: number, opts: Intl.NumberFormatOptions = { maximumFractionDigits: 2 }) {
  return v.toLocaleString("ro-RO", opts);
}

export function extractInsightView(i: Insight): InsightView {
  const parsed: any = i.data || {};

  switch (i.type) {
    case "anomaly": {
      const z = parsed.zScore as number | undefined;
      const latest = parsed.latest as { value: number; date: string } | undefined;
      const baseline = parsed.baseline as { mean: number; stdev: number; n: number } | undefined;
      const chart: Array<{ date: string; value: number }> = parsed.chart || [];
      return {
        bigNumber: latest ? fmtNum(latest.value, { maximumFractionDigits: 4 }) : (z != null ? `${z >= 0 ? "+" : ""}${fmtNum(z)}σ` : "—"),
        bigNumberLabel: latest && z != null ? `Abatere ${z >= 0 ? "+" : ""}${fmtNum(z)}σ vs baseline 30 zile` : "valoare anomalie",
        bullets: [
          latest ? `Ultima valoare: ${fmtNum(latest.value, { maximumFractionDigits: 4 })} pe ${latest.date.slice(0, 10)}` : "",
          baseline ? `Baseline (${baseline.n} sesiuni): media ${fmtNum(baseline.mean, { maximumFractionDigits: 4 })}, stdev ${fmtNum(baseline.stdev, { maximumFractionDigits: 4 })}` : "",
          z != null ? `Z-score: ${fmtNum(z, { maximumFractionDigits: 2 })} — atipic statistic dacă |z| > 1,5` : "",
        ].filter(Boolean),
        chartType: chart.length > 1 ? "line" : null,
        chartData: chart,
      };
    }
    case "trend": {
      const yoy = parsed.yoy as number | undefined;
      const country = parsed.country as string | undefined;
      const latest = parsed.latest as { value: number; date: string } | undefined;
      const yearAgo = parsed.yearAgo as { value: number; date: string } | undefined;
      const chart: Array<{ date: string; value: number }> = parsed.chart || [];
      return {
        bigNumber: yoy != null ? `${yoy >= 0 ? "+" : ""}${fmtNum(yoy, { maximumFractionDigits: 1 })}%` : "—",
        bigNumberLabel: country ? `YoY pentru ${country}` : "variație YoY",
        bullets: [
          country ? `Țară / regiune: ${country}` : "",
          latest ? `Ultima valoare: ${fmtNum(latest.value, { maximumFractionDigits: 1 })} (${latest.date.slice(0, 7)})` : "",
          yearAgo ? `Cu un an înainte: ${fmtNum(yearAgo.value, { maximumFractionDigits: 1 })} (${yearAgo.date.slice(0, 7)})` : "",
        ].filter(Boolean),
        chartType: chart.length > 1 ? "line" : null,
        chartData: chart,
      };
    }
    case "ranking": {
      const ranking: Array<{ country: string; value: number }> = parsed.ranking || [];
      const ro = parsed.romania as { country: string; value: number; year: string } | undefined;
      const pos = parsed.romaniaPosition as number | undefined;
      return {
        bigNumber: ro ? `${fmtNum(ro.value, { maximumFractionDigits: 1 })}%` : (ranking[0] ? `${fmtNum(ranking[0].value, { maximumFractionDigits: 1 })}%` : "—"),
        bigNumberLabel: ro ? `România — locul ${pos || "?"} din ${ranking.length}` : (ranking[0] ? `Top: ${ranking[0].country}` : "ranking"),
        bullets: ranking.slice(0, 5).map((r, idx) =>
          `${idx + 1}. ${r.country}: ${fmtNum(r.value, { maximumFractionDigits: 1 })}%${ro && r.country === ro.country ? "  ← România" : ""}`,
        ),
        chartType: "bar",
        chartData: ranking.map((r) => ({ label: r.country, value: r.value })),
      };
    }
    case "cross_reference": {
      const ranking: Array<{ country: string; count?: number; value?: number }> = parsed.ranking || [];
      const total = parsed.total as number | undefined;
      const romania = parsed.romania as number | undefined;
      const share = parsed.romaniaShare as number | undefined;
      return {
        bigNumber: romania != null ? fmtNum(romania, { maximumFractionDigits: 0 }) : (total != null ? fmtNum(total, { maximumFractionDigits: 0 }) : "—"),
        bigNumberLabel: share != null ? `${fmtNum(share, { maximumFractionDigits: 1 })}% din regiune` : "valoare cumulată",
        bullets: [
          total != null ? `Total regional: ${fmtNum(total, { maximumFractionDigits: 0 })}` : "",
          ...ranking.slice(0, 5).map((r, idx) => `${idx + 1}. ${r.country}: ${fmtNum((r.count ?? r.value ?? 0), { maximumFractionDigits: 0 })}`),
        ].filter(Boolean),
        chartType: "bar",
        chartData: ranking.map((r) => ({ label: r.country, value: r.count ?? r.value ?? 0 })),
      };
    }
    default:
      return {
        bigNumber: "—",
        bigNumberLabel: i.type,
        bullets: [i.summary.slice(0, 200)],
        chartType: null,
        chartData: [],
      };
  }
}

export function buildInsightCsv(i: Insight): string {
  const view = extractInsightView(i);
  const rows: string[] = [];
  rows.push("# UZINEX Newsroom — date insight #" + i.id);
  rows.push("# Titlu: " + i.title);
  rows.push("# Sursa: " + JSON.stringify(i.sources));
  rows.push("# Generat: " + (typeof i.createdAt === "string" ? i.createdAt : new Date(i.createdAt).toISOString()));
  rows.push("");
  if (view.chartType === "line") {
    rows.push("date,value");
    for (const p of view.chartData) rows.push(`${typeof p.date === "string" ? p.date.slice(0, 10) : new Date(p.date as number).toISOString().slice(0, 10)},${p.value}`);
  } else if (view.chartType === "bar") {
    rows.push("dimensiune,valoare");
    for (const p of view.chartData) rows.push(`"${(p.label || "").replace(/"/g, '""')}",${p.value}`);
  }
  return rows.join("\n");
}

export function buildShareableHeadline(i: Insight): string {
  const view = extractInsightView(i);
  const date = new Date(i.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  return `${i.title}\n\n${view.bullets.join("\n")}\n\nSursă: ${i.sources.join(", ")} via UZINEX Newsroom (${date})`;
}
