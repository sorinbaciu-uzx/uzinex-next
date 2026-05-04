"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = { insightId: number; title: string };

export function EmbedActions({ insightId, title }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Portal target only exists client-side; render nothing on server.
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC, lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const baseUrl = typeof window !== "undefined" ? `${window.location.origin}` : "https://uzinex.ro";
  const embedUrl = `${baseUrl}/embed/insight/${insightId}`;
  const iframe = `<iframe src="${embedUrl}" width="100%" height="320" frameborder="0" loading="lazy" title="${title.replace(/"/g, "&quot;")} — UZINEX Newsroom"></iframe>`;

  const copy = async (val: string, key: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = val;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const button = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue hover:bg-ink-50 transition text-ink-700"
    >
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      Embed grafic
    </button>
  );

  if (!open || !mounted) {
    return button;
  }

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`embed-title-${insightId}`}
    >
      <div
        className="w-full max-w-lg bg-white rounded-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-ink-100 flex items-baseline justify-between">
          <h3 id={`embed-title-${insightId}`} className="serif text-lg text-ink-900">Embed graficul în articol</h3>
          <button
            onClick={() => setOpen(false)}
            className="text-ink-400 hover:text-ink-700 text-2xl leading-none -m-1 p-1"
            aria-label="Închide"
          >
            ×
          </button>
        </div>
        <div className="p-5 space-y-4">
          <p className="text-xs text-ink-600 leading-relaxed">
            Copiază snippet-ul HTML și lipește-l în CMS-ul tău (WordPress / Drupal / Ghost / Notion). Iframe-ul afișează direct graficul, cu credit automat „Sursă: UZINEX Newsroom".
          </p>
          <div>
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">HTML iframe</div>
              <button
                type="button"
                onClick={() => copy(iframe, "iframe")}
                className="text-xs text-uzx-blue hover:text-uzx-orange font-medium"
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
                type="button"
                onClick={() => copy(embedUrl, "url")}
                className="text-xs text-uzx-blue hover:text-uzx-orange font-medium"
              >
                {copied === "url" ? "✓ Copiat" : "Copiază"}
              </button>
            </div>
            <code className="block mono text-[11px] bg-ink-50 border border-ink-100 rounded p-2 break-all text-ink-800">{embedUrl}</code>
          </div>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-ink-100">
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
              👁 Preview într-un tab nou
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {button}
      {createPortal(modal, document.body)}
    </>
  );
}
