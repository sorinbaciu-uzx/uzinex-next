"use client";

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type Chart = {
  insightId: number;
  type: string;
  title: string;
  data: any;
};

function fmtDate(d: string | number | Date) {
  const dt = new Date(d);
  return dt.toLocaleDateString("ro-RO", { year: "2-digit", month: "short" });
}

function ChartBlock({ c }: { c: Chart }) {
  if (!c.data) return null;

  if (c.data.chart && Array.isArray(c.data.chart)) {
    const series = c.data.chart.map((p: any) => ({ date: fmtDate(p.date), value: p.value }));
    return (
      <div className="border border-ink-100 rounded-lg p-5 bg-white">
        <div className="text-sm font-medium text-ink-900 mb-4">{c.title}</div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={series} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
            <YAxis tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
            <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid #d9d9de", fontSize: 12 }} />
            <Line type="monotone" dataKey="value" stroke="#1e6bb8" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: "#f5851f" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (c.data.ranking && Array.isArray(c.data.ranking)) {
    const data = c.data.ranking.map((r: any) => ({
      country: r.country,
      value: r.value ?? r.count ?? 0,
    }));
    return (
      <div className="border border-ink-100 rounded-lg p-5 bg-white">
        <div className="text-sm font-medium text-ink-900 mb-4">{c.title}</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eeeef0" />
            <XAxis dataKey="country" tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
            <YAxis tick={{ fontSize: 11, fill: "#5f5f6b" }} stroke="#d9d9de" />
            <Tooltip contentStyle={{ borderRadius: 6, border: "1px solid #d9d9de", fontSize: 12 }} />
            <Bar dataKey="value" fill="#1e6bb8" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return null;
}

export function StoryCharts({ data }: { data: Chart[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data.map((c) => <ChartBlock key={c.insightId} c={c} />)}
    </div>
  );
}
