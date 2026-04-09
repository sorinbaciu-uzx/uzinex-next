"use client";

import { useEffect, useRef, useState } from "react";

const AUTHORITY_ITEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
      </svg>
    ),
    label: "Garanție standard",
    value: "5 ani",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" />
      </svg>
    ),
    label: "Intervenție fizică",
    value: "sub 24h",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" strokeLinecap="round" />
      </svg>
    ),
    label: "Expertiză tehnică",
    value: "+30 ani",
  },
];

const CERTS = [
  "ISO 9001",
  "ISO 14001",
  "CE",
  "EN 1090",
  "DNSH",
  "PNRR",
  "EBRD",
  "Manuale AI",
];

export function AuthorityRail({ videoId }: { videoId: string }) {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Show only after the hero scrolls away (sentinel above the top of the viewport)
  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const check = () => {
      const start = document.getElementById("rail-sentinel");
      const end = document.getElementById("rail-end-sentinel");
      if (!start) return;
      const startTop = start.getBoundingClientRect().top;
      const vh = window.innerHeight;
      // default: mount when user scrolled past the start sentinel
      let shouldMount = startTop < 1;
      // unmount when the end sentinel enters the lower half of the viewport
      // so the rail never overlaps the footer
      if (end) {
        const endTop = end.getBoundingClientRect().top;
        if (endTop < vh - 80) shouldMount = false;
      }
      setMounted(shouldMount);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(check);
        ticking = true;
      }
    };

    // Multiple initial checks to catch browser scroll restoration after page load
    const timeouts = [0, 30, 150, 400, 900].map((t) =>
      window.setTimeout(check, t)
    );

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timeouts.forEach(clearTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  // control mute via YouTube postMessage API (no reload)
  function toggleMute() {
    const next = !muted;
    setMuted(next);
    const cmd = next ? "mute" : "unMute";
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: cmd, args: "" }),
      "*"
    );
    // ensure playing
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func: "playVideo", args: "" }),
      "*"
    );
  }

  return (
    <aside
      className={`hidden lg:block fixed right-5 top-[120px] w-[300px] z-30 transition-all duration-500 ease-out ${
        mounted
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-6 pointer-events-none"
      }`}
    >
      <div className="bg-white border hairline shadow-[0_30px_60px_-20px_rgba(8,37,69,0.4)] max-h-[calc(100vh-140px)] overflow-y-auto">
        {/* header */}
        <div className="px-4 pt-4 pb-3 border-b hairline">
          <div className="text-[11px] uppercase tracking-[0.22em] mono font-bold text-uzx-orange">
            De ce Uzinex
          </div>
        </div>

        <div>
          {/* authority chips */}
          <div className="px-4 py-3.5 space-y-2.5 border-b hairline">
            {AUTHORITY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2.5 transition-all duration-500 ${
                  mounted
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
                style={{ transitionDelay: `${400 + i * 120}ms` }}
              >
                <div className="w-8 h-8 border hairline flex items-center justify-center text-uzx-blue shrink-0 bg-ink-50">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] uppercase tracking-wider text-ink-400 mono leading-tight">
                    {item.label}
                  </div>
                  <div className="serif text-base text-ink-900 leading-tight">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* certifications */}
          <div className="px-4 py-3.5 border-b hairline">
            <div className="text-[9px] uppercase tracking-wider text-ink-400 mono mb-2">
              Certificări & conformitate
            </div>
            <div className="flex flex-wrap gap-1">
              {CERTS.map((c, i) => (
                <span
                  key={c}
                  className={`text-[9px] mono text-ink-700 border hairline px-1.5 py-0.5 bg-white transition-all duration-500 ${
                    mounted
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-1"
                  }`}
                  style={{ transitionDelay: `${800 + i * 50}ms` }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* video reportaj */}
          {videoId && (
            <div className="relative">
              <div className="aspect-video relative overflow-hidden bg-black">
                <iframe
                  ref={iframeRef}
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1&disablekb=1&fs=0&start=14`}
                  title="Reportaj Uzinex"
                  allow="autoplay; encrypted-media"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  frameBorder={0}
                />
                {/* Live badge */}
                <div className="absolute top-2 left-2 bg-black/70 text-white text-[9px] uppercase tracking-wider mono px-1.5 py-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-red-500 inline-block animate-pulse" />
                  Reportaj
                </div>
                {/* mute/unmute button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute bottom-2 right-2 bg-black/80 hover:bg-black text-white text-xs px-2.5 py-1.5 flex items-center gap-1.5 transition"
                  aria-label={muted ? "Activează sunetul" : "Oprește sunetul"}
                >
                  {muted ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M16.5 12A4.5 4.5 0 0014 8.05v2.21l2.45 2.45c.03-.2.05-.41.05-.71zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.05v7.9A4.5 4.5 0 0016.5 12zM14 3.23v2.06C16.89 6.15 19 8.83 19 12s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77S18.01 4.14 14 3.23z" />
                    </svg>
                  )}
                  <span>{muted ? "Sunet" : "Mut"}</span>
                </button>
              </div>
            </div>
          )}

          {/* CTA block */}
          <div className="px-4 py-4 bg-[#082545] text-white">
            <div className="text-[10px] uppercase tracking-[0.2em] mono font-bold text-uzx-orange mb-3">
              Discută cu un inginer
            </div>
            <div className="space-y-1.5">
              <a
                href="/#contact"
                className="block w-full bg-uzx-orange hover:bg-uzx-orange2 text-white text-[11px] font-medium px-3 py-2.5 text-center transition"
              >
                Solicită ofertă →
              </a>
              <a
                href="tel:+40769081081"
                className="flex items-center justify-center gap-1.5 w-full border border-white/20 hover:border-white text-white text-[11px] font-medium px-3 py-2 transition"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1 1 0 00-1.02.24l-2.2 2.2a15.07 15.07 0 01-6.59-6.58l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.5 4a1 1 0 00-1-1H4a1 1 0 00-1 1 17 17 0 0017 17 1 1 0 001-1v-3.5a1 1 0 00-1-1z" />
                </svg>
                +40 769 081 081
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
