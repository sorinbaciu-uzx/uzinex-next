"use client";

import { useState } from "react";

type Draft = {
  seoTitle?: string;
  seoDescription?: string;
  description?: string;
};

export function AIRewriteModal({
  slug,
  onClose,
  onApply,
  currentTitle,
  currentDescription,
  currentContent,
  focusKeyword,
}: {
  slug: string;
  onClose: () => void;
  onApply: (draft: Draft) => void;
  currentTitle: string;
  currentDescription: string;
  currentContent: string;
  focusKeyword: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);
  const [usage, setUsage] = useState<{
    estimatedCostUSD?: number;
    inputTokens?: number;
    outputTokens?: number;
  } | null>(null);

  async function runRewrite() {
    if (!focusKeyword.trim()) {
      setError("Setează întâi focus keyword-ul.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // Persist the current state first so API sees current values
      await fetch("/api/admin/seo/product/" + slug, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          focusKeyword,
          seoTitle: currentTitle,
          seoDescription: currentDescription,
          description: currentContent,
        }),
      });
      const res = await fetch(
        "/api/admin/seo/product/" + slug + "/ai-rewrite",
        { method: "POST" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "HTTP " + res.status);
      }
      const data = await res.json();
      setDraft(data.draft);
      setUsage(data.usage);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-5 border-b hairline flex items-center justify-between bg-gradient-to-r from-purple-600 to-uzx-blue text-white">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] opacity-80 font-mono">
              ✨ Claude Opus · rescriere premium
            </div>
            <h2 className="serif text-xl mt-1">
              Optimizare AI pentru: <span className="font-light italic">{focusKeyword || "(setează keyword)"}</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-auto p-6">
          {!draft && !loading && (
            <div className="text-center py-10">
              <p className="text-base text-ink-700 max-w-xl mx-auto mb-6">
                Claude Opus va rescrie complet descrierea produsului pentru a
                trece verificările SEO care eșuează, păstrând acuratețea
                tehnică și tonul B2B.
              </p>
              <div className="bg-ink-50 border hairline p-5 max-w-xl mx-auto text-left mb-6">
                <div className="text-[11px] uppercase tracking-wider text-ink-500 font-mono mb-2">
                  Ce va primi AI-ul:
                </div>
                <ul className="text-sm text-ink-700 space-y-1">
                  <li>✓ Numele produsului: <b>{slug}</b></li>
                  <li>✓ Focus keyword: <b>{focusKeyword || "(nesetat!)"}</b></li>
                  <li>
                    ✓ Descrierea actuală ({currentContent.length} caractere)
                  </li>
                  <li>✓ Lista de verificări care eșuează</li>
                </ul>
                <div className="text-[11px] text-ink-500 mt-3 font-mono">
                  Cost estimat: $0.05-0.30 (Opus 4.x cu prompt caching)
                </div>
              </div>
              <button
                onClick={runRewrite}
                disabled={!focusKeyword.trim()}
                className="bg-gradient-to-r from-purple-600 to-uzx-blue hover:opacity-90 text-white px-8 py-3 text-base font-medium transition disabled:opacity-30"
              >
                ✨ Pornește rescrierea (~60 sec)
              </button>
              {error && (
                <div className="mt-4 text-sm text-red-600">{error}</div>
              )}
            </div>
          )}

          {loading && (
            <div className="text-center py-20">
              <div
                className="inline-block w-12 h-12 border-4 border-uzx-blue border-t-transparent rounded-full animate-spin mb-4"
                style={{ borderTopColor: "transparent" }}
              />
              <div className="text-base text-ink-700">
                Claude Opus rescrie conținutul...
              </div>
              <div className="text-xs text-ink-500 mt-2">
                Poate dura 30-90 secunde pentru descrieri lungi.
              </div>
            </div>
          )}

          {draft && !loading && (
            <div className="space-y-5">
              {usage && (
                <div className="bg-ink-50 border hairline p-3 text-xs flex items-center justify-between flex-wrap gap-3">
                  <span className="font-mono text-ink-600">
                    ✅ Rescris cu Claude Opus — tokeni input:{" "}
                    {usage.inputTokens} · output: {usage.outputTokens}
                  </span>
                  <span className="font-mono text-ink-900 font-semibold">
                    Cost: ${usage.estimatedCostUSD?.toFixed(4)}
                  </span>
                </div>
              )}

              {/* SEO TITLE DIFF */}
              <DiffBlock
                label="SEO title"
                current={currentTitle}
                proposed={draft.seoTitle || ""}
              />
              <DiffBlock
                label="Meta description"
                current={currentDescription}
                proposed={draft.seoDescription || ""}
              />
              <DiffBlock
                label="Descriere produs"
                current={currentContent}
                proposed={draft.description || ""}
                large
              />
            </div>
          )}
        </div>

        {/* FOOTER */}
        {draft && !loading && (
          <div className="p-4 border-t hairline bg-ink-50 flex items-center justify-between gap-3 flex-wrap">
            <div className="text-xs text-ink-500">
              ⚠ Nimic nu se aplică automat. Revizuiește și apasă Aplică ca să
              înlocuiești câmpurile în editor, apoi Salvează.
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="border hairline bg-white px-4 py-2 text-sm hover:bg-ink-50 transition"
              >
                Anulează
              </button>
              <button
                onClick={() => onApply(draft)}
                className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-2 text-sm font-medium transition"
              >
                Aplică în editor →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DiffBlock({
  label,
  current,
  proposed,
  large,
}: {
  label: string;
  current: string;
  proposed: string;
  large?: boolean;
}) {
  return (
    <div className="border hairline bg-white">
      <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold p-3 border-b hairline">
        {label}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 divide-x hairline">
        <div className="p-3">
          <div className="text-[10px] uppercase tracking-wider text-ink-400 font-mono mb-2">
            Actual
          </div>
          <div
            className={
              "text-sm text-ink-600 whitespace-pre-wrap leading-relaxed " +
              (large ? "max-h-[400px] overflow-auto font-mono text-xs" : "")
            }
          >
            {current || <span className="italic text-ink-400">(gol)</span>}
          </div>
        </div>
        <div className="p-3 bg-green-50">
          <div className="text-[10px] uppercase tracking-wider text-green-700 font-mono mb-2">
            Propus de AI ✨
          </div>
          <div
            className={
              "text-sm text-ink-900 whitespace-pre-wrap leading-relaxed " +
              (large ? "max-h-[400px] overflow-auto font-mono text-xs" : "")
            }
          >
            {proposed || (
              <span className="italic text-ink-400">(AI nu a propus)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
