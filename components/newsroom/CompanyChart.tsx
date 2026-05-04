"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Point = { year: number; value: number; label?: string };

export function FinancialLineChart({ data, color = "#1e6bb8", unit = "mld RON", divisor = 1_000_000_000, height = 240, title }: { data: Point[]; color?: string; unit?: string; divisor?: number; height?: number; title?: string }) {
  if (!data || data.length < 2) return null;
  const series = data.map((p) => ({ year: p.year, value: p.value / divisor }));
  return (
    <div className="border border-ink-100 rounded-lg p-4 bg-white">
      {title && <div className="text-sm font-medium text-ink-900 mb-2">{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={series} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
          <YAxis tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" tickFormatter={(v) => v.toFixed(1)} />
          <Tooltip
            formatter={(v: number) => [`${v.toFixed(2)} ${unit}`, "Valoare"]}
            contentStyle={{ borderRadius: 6, border: "1px solid #d9d9de", fontSize: 12 }}
          />
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={{ r: 3, fill: color }} activeDot={{ r: 5, fill: "#f5851f" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CompanyComparisonBar({ data, unit = "mld RON", divisor = 1_000_000_000, height = 280, title, accentCui }: { data: Array<{ cui: number; name: string; value: number }>; unit?: string; divisor?: number; height?: number; title?: string; accentCui?: number }) {
  if (!data || data.length === 0) return null;
  const series = data.map((d) => ({ ...d, value: d.value / divisor, fill: accentCui === d.cui ? "#f5851f" : "#1e6bb8" }));
  return (
    <div className="border border-ink-100 rounded-lg p-4 bg-white">
      {title && <div className="text-sm font-medium text-ink-900 mb-2">{title}</div>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={series} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#5f5f6b" }} stroke="#d9d9de" angle={-30} textAnchor="end" height={60} interval={0} />
          <YAxis tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" tickFormatter={(v) => v.toFixed(1)} />
          <Tooltip
            formatter={(v: number) => [`${v.toFixed(2)} ${unit}`, "Valoare"]}
            contentStyle={{ borderRadius: 6, border: "1px solid #d9d9de", fontSize: 12 }}
          />
          <Bar dataKey="value" fill="#1e6bb8" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
