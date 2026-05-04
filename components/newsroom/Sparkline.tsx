"use client";

import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

type Point = { date: string | number; value: number };

export function Sparkline({ data, height = 60, color = "#1e6bb8", highlightLast = true }: { data: Point[]; height?: number; color?: string; highlightLast?: boolean }) {
  if (!data || data.length === 0) return null;
  const baseline = data.slice(0, -1).reduce((s, p) => s + p.value, 0) / Math.max(1, data.length - 1);
  const series = data.map((p, i) => ({
    x: i,
    value: p.value,
    date: typeof p.date === "string" ? p.date : new Date(p.date).toISOString().slice(0, 10),
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer>
        <LineChart data={series} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <XAxis dataKey="x" hide />
          <YAxis hide domain={["dataMin - 0.001", "dataMax + 0.001"]} />
          <Tooltip
            cursor={{ stroke: "#d9d9de", strokeWidth: 1 }}
            contentStyle={{ borderRadius: 4, border: "1px solid #d9d9de", fontSize: 11, padding: "4px 8px" }}
            labelFormatter={(_, payload) => (payload?.[0]?.payload?.date as string) || ""}
            formatter={(v: number) => [v.toLocaleString("ro-RO", { maximumFractionDigits: 4 }), "valoare"]}
          />
          {highlightLast && <ReferenceLine y={baseline} stroke="#d9d9de" strokeDasharray="3 3" />}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.75}
            dot={false}
            activeDot={{ r: 3, fill: "#f5851f", stroke: "#fff", strokeWidth: 1 }}
            isAnimationActive={false}
          />
          {highlightLast && (
            <ReferenceLine x={series.length - 1} stroke="#f5851f" strokeWidth={1.5} strokeDasharray="2 2" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MiniBar({ data, height = 90 }: { data: Array<{ label: string; value: number }>; height?: number }) {
  if (!data || data.length === 0) return null;
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 4 }}>
          <XAxis dataKey="label" tick={{ fontSize: 10, fill: "#5f5f6b" }} stroke="#d9d9de" interval={0} />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: "#f7f7f8" }}
            contentStyle={{ borderRadius: 4, border: "1px solid #d9d9de", fontSize: 11, padding: "4px 8px" }}
          />
          <Bar dataKey="value" fill="#1e6bb8" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
