"use client";

import { useState } from "react";

type Props = {
  value: string;
  label?: string;
  variant?: "icon" | "button" | "inline";
  className?: string;
};

export function CopyButton({ value, label = "Copiază", variant = "button", className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={onClick}
        title={copied ? "Copiat ✓" : label}
        className={`inline-flex items-center justify-center w-7 h-7 rounded hover:bg-ink-50 transition ${className}`}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-uzx-orange" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-ink-400" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
        )}
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`text-xs text-uzx-blue hover:text-uzx-orange transition-colors ${className}`}
      >
        {copied ? "✓ Copiat" : label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded border border-ink-200 hover:border-uzx-blue hover:bg-ink-50 transition ${copied ? "!bg-uzx-orange/10 !border-uzx-orange/40 !text-uzx-orange2" : "text-ink-700"} ${className}`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Copiat
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
          {label}
        </>
      )}
    </button>
  );
}
