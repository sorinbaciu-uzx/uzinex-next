"use client";

import { useState } from "react";
import type { SEOAnalysis } from "@/lib/seo/types";

export function CompetitorModal({
  focusKeyword,
  onClose,
}: {
  focusKeyword: string;
  onClose: () => void;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    url: string;
    extracted: {
      title: string;
      description: string;
      h1: string;
      canonical: string | null;
      hasSchema: boolean;
      wordCount: number;
    };
    analysis: SEOAnalysis;
  } | null>(null);

  async function analyze() {
    if (!url.trim()) {
      setError("Introdu un URL.");
      return;
    }
    if (!focusKeyword.trim()) {
      setError("Setează întâi focus keyword-ul în editor.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch("/api/admin/seo/competitor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), focusKeyword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "HTTP " + res.status);
      setResult(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        <div className="p-5 border-b hairline flex items-center justify-between bg-ink-900 text-white">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] opacity-70 font-mono">
              🔍 Analiză concurent
            </div>
            <h2 className="serif text-xl mt-1">
              Cum rankează ei pentru keyword-ul tău
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div>
            <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
              URL pagina concurentului
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="url"
                placeholder="https://concurent.ro/produs/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 border hairline px-4 py-2 text-sm focus:outline-none focus:border-uzx-blue"
              />
              <button
                onClick={analyze}
                disabled={loading}
                className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-5 py-2 text-sm font-medium transition disabled:opacity-50"
              >
                {loading ? "..." : "Analizează"}
              </button>
            </div>
            <div className="text-xs text-ink-500 mt-2">
              Voi descărca pagina, voi extrage title/description/content și voi
              calcula scorul pentru keyword <b>{focusKeyword || "(nesetat)"}</b>.
              Complet read-only, fără impact pe concurent.
            </div>
          </div>

          {error && (
            <div className="border border-red-300 bg-red-50 text-red-900 p-3 text-sm">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-10">
              <div
                className="inline-block w-10 h-10 border-4 border-uzx-blue border-t-transparent rounded-full animate-spin"
                style={{ borderTopColor: "transparent" }}
              />
              <div className="text-sm text-ink-700 mt-3">
                Descarc și analizez pagina...
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-5">
              {/* SCORE */}
              <div className="flex items-center gap-5 bg-ink-50 border hairline p-4">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 text-xl font-semibold font-mono rounded-full text-white"
                  style={{ background: result.analysis.verdictColor }}
                >
                  {result.analysis.score}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink-900 truncate">
                    {result.extracted.title}
                  </div>
                  <div className="text-xs text-ink-500 mt-1 font-mono truncate">
                    {result.url}
                  </div>
                  <div className="text-xs text-ink-500 mt-1">
                    {result.extracted.wordCount} cuvinte · schema:{" "}
                    {result.extracted.hasSchema ? "✓" : "✗"}
                  </div>
                </div>
              </div>

              {/* EXTRACTED */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
                <InfoBox label="H1" value={result.extracted.h1 || "-"} />
                <InfoBox
                  label="Canonical"
                  value={result.extracted.canonical || "-"}
                />
                <InfoBox
                  label="Meta description"
                  value={result.extracted.description || "-"}
                  full
                />
              </div>

              {/* CHECKS */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold mb-3">
                  Ce au bine / ce lipsește la ei
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {result.analysis.checks.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-start gap-2 text-xs border hairline bg-white p-2"
                    >
                      <span
                        className="shrink-0"
                        style={{ color: c.passed ? "#10b981" : "#ef4444" }}
                      >
                        {c.passed ? "✓" : "✗"}
                      </span>
                      <span className="flex-1">{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-uzx-blue/5 border border-uzx-blue/20 p-4 text-sm">
                <div className="text-[11px] uppercase tracking-wider text-uzx-blue font-mono font-semibold mb-2">
                  💡 Insight
                </div>
                <p className="text-ink-700 leading-relaxed">
                  {result.analysis.score < 60
                    ? "Concurentul are SEO slab. Ai oportunitate bună să-l depășești rapid."
                    : result.analysis.score < 85
                      ? "Concurentul e mediu. Poți să-l depășești dacă optimizezi tot ce e critical + important la tine."
                      : "Concurentul e puternic. Trebuie să fii peste 90 ca să-l prinzi — focus pe conținut mai bogat + backlinks."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  label,
  value,
  full,
}: {
  label: string;
  value: string;
  full?: boolean;
}) {
  return (
    <div
      className={"bg-white p-3 " + (full ? "md:col-span-2" : "")}
    >
      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-mono mb-1">
        {label}
      </div>
      <div className="text-sm text-ink-900 break-words">{value}</div>
    </div>
  );
}
