"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from "recharts";

type Series = { country: string; label: string; data: Array<{ year: number; value: number }>; color?: string };

const PALETTE: Record<string, string> = {
  ROU: "#f5851f", // orange — accentul pentru România
  POL: "#1e6bb8",
  HUN: "#7d3c98",
  CZE: "#117a65",
  BGR: "#b03a2e",
  DEU: "#2d2d35",
  EUQ: "#8a8a95",
};

export function MultiLineChart({ series, height = 360, unit = "%", showLegend = true, currentYear }: { series: Series[]; height?: number; unit?: string; showLegend?: boolean; currentYear?: number }) {
  if (!series || series.length === 0) return null;

  // Build merged data: years on X, country values on Y per series
  const yearSet = new Set<number>();
  for (const s of series) for (const p of s.data) yearSet.add(p.year);
  const years = [...yearSet].sort();

  const merged = years.map((year) => {
    const row: Record<string, number | string> = { year };
    for (const s of series) {
      const point = s.data.find((p) => p.year === year);
      if (point) row[s.country] = point.value;
    }
    return row;
  });

  return (
    <div className="border border-ink-100 rounded-lg p-5 bg-white">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={merged} margin={{ top: 10, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
          <YAxis tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" tickFormatter={(v) => `${v.toFixed(0)}${unit}`} />
          <Tooltip
            contentStyle={{ borderRadius: 6, border: "1px solid #d9d9de", fontSize: 12 }}
            formatter={(value: number, name: string) => [`${value.toFixed(1)}${unit}`, series.find((s) => s.country === name)?.label || name]}
          />
          {showLegend && <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value) => series.find((s) => s.country === value)?.label || value} />}
          {currentYear && <ReferenceLine x={currentYear} stroke="#d9d9de" strokeDasharray="4 4" label={{ value: "azi", fontSize: 10, fill: "#8a8a95", position: "top" }} />}
          {series.map((s) => (
            <Line
              key={s.country}
              type="monotone"
              dataKey={s.country}
              stroke={s.color || PALETTE[s.country] || "#5f5f6b"}
              strokeWidth={s.country === "ROU" ? 3 : 1.75}
              dot={false}
              activeDot={{ r: 4 }}
              isAnimationActive={false}
              name={s.country}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
