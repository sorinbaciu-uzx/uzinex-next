"use client";

import { useState } from "react";

type Props = { insightId: number; title: string };

export function EmbedActions({ insightId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const baseUrl = typeof window !== "undefined" ? `${window.location.origin}` : "https://uzinex.ro";
  const embedUrl = `${baseUrl}/embed/insight/${insightId}`;
  const iframe = `<iframe src="${embedUrl}" width="100%" height="320" frameborder="0" loading="lazy" title="${title.replace(/"/g, "&quot;")} — UZINEX Newsroom"></iframe>`;

  const copy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = val;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue hover:bg-ink-50 transition text-ink-700"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
        Embed grafic
      </button>
      {open && (
        <div className="absolute z-20 right-0 mt-2 w-[440px] max-w-[calc(100vw-2rem)] border border-ink-200 rounded-lg bg-white shadow-xl p-4 space-y-3">
          <div className="flex items-baseline justify-between">
            <h3 className="serif text-base text-ink-900">Embed graficul în articol</h3>
            <button onClick={() => setOpen(false)} className="text-ink-400 hover:text-ink-700 text-lg leading-none">×</button>
          </div>
          <p className="text-xs text-ink-600 leading-relaxed">
            Copiază snippet-ul HTML și lipește-l în CMS-ul tău (WordPress / Drupal / Ghost / Notion). Iframe-ul afișează direct graficul, cu credit automat „Sursă: UZINEX Newsroom".
          </p>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">HTML iframe</div>
              <button
                onClick={() => copy(iframe, "iframe")}
                className="text-xs text-uzx-blue hover:text-uzx-orange"
              >
                {copied === "iframe" ? "✓ Copiat" : "Copiază"}
              </button>
            </div>
            <code className="block mono text-[11px] bg-ink-50 border border-ink-100 rounded p-3 break-all whitespace-pre-wrap leading-relaxed text-ink-800 max-h-32 overflow-y-auto">
              {iframe}
            </code>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">URL direct embed</div>
              <button
                onClick={() => copy(embedUrl, "url")}
                className="text-xs text-uzx-blue hover:text-uzx-orange"
              >
                {copied === "url" ? "✓ Copiat" : "Copiază"}
              </button>
            </div>
            <code className="block mono text-[11px] bg-ink-50 border border-ink-100 rounded p-2 break-all text-ink-800">{embedUrl}</code>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-ink-100">
            <a
              href={`/api/newsroom/insights/${insightId}/data.csv`}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue text-ink-700"
            >
              📊 Descarcă CSV
            </a>
            <a
              href={embedUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue text-ink-700"
            >
              👁 Preview
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
