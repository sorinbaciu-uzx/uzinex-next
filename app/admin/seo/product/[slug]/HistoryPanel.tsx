"use client";

export function HistoryPanel({
  history,
}: {
  history: Array<{ date: string; score: number; updatedBy?: string }>;
}) {
  const reversed = [...history].reverse(); // most recent first

  return (
    <div className="bg-white border hairline p-5">
      <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold mb-3">
        Istoric optimizări
      </div>
      <div className="space-y-2">
        {reversed.slice(0, 10).map((h, i) => {
          const prev =
            i < reversed.length - 1 ? reversed[i + 1].score : h.score;
          const diff = h.score - prev;
          return (
            <div
              key={h.date + "-" + i}
              className="flex items-center gap-3 text-sm border-b last:border-0 hairline py-2"
            >
              <div
                className="font-mono text-sm font-semibold px-2 py-1 text-white"
                style={{
                  background:
                    h.score >= 90
                      ? "#10b981"
                      : h.score >= 75
                        ? "#65a30d"
                        : h.score >= 50
                          ? "#f59e0b"
                          : "#ef4444",
                  minWidth: 44,
                  textAlign: "center",
                }}
              >
                {h.score}
              </div>
              {diff !== 0 && i < reversed.length - 1 && (
                <div
                  className={
                    "text-xs font-mono " +
                    (diff > 0 ? "text-green-600" : "text-red-600")
                  }
                >
                  {diff > 0 ? "+" : ""}
                  {diff}
                </div>
              )}
              <div className="flex-1 text-xs text-ink-500">
                {new Date(h.date).toLocaleString("ro-RO")}
              </div>
              {h.updatedBy && (
                <div className="text-xs text-ink-400 font-mono">
                  {h.updatedBy}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
