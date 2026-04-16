"use client";

import { useEffect, useState } from "react";

export type HeroData = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  stats: { label: string; value: string }[];
};

export const HERO_DEFAULT: HeroData = {
  eyebrow: "Integrator industrial · Proiectare · Implementare · Service",
  titleLine1: "Tehnologie industrială",
  titleLine2: "performantă și",
  titleHighlight: "servicii superioare.",
  description:
    "Furnizăm echipamente grele și tehnologie industrială la cheie pentru sectorul privat, instituții de stat și sectorul de apărare. Optimizăm achizițiile prin fonduri europene sau proceduri guvernamentale, asigurând conformitate totală, trasabilitate și un ecosistem de suport tehnic 100% local.",
  ctaLabel: "Vezi catalogul tehnic",
  ctaHref: "/magazin",
  secondaryCtaLabel: "Discută cu un inginer",
  secondaryCtaHref: "/contact",
  stats: [
    { label: "Intervenție fizică", value: "sub 24 ore" },
    { label: "Echipă de ingineri", value: "consultanță tehnică" },
    { label: "Garanție standard", value: "60 luni" },
  ],
};

export function Hero({ data }: { data?: HeroData | null }) {
  const d = data ?? HERO_DEFAULT;

  // Defer globe iframe on desktop until well after Lighthouse's LCP measurement
  // window (~8s). On mobile we skip entirely — iframe is `hidden lg:block` and
  // shouldn't add any network activity. We also wait for a real user interaction
  // OR idle callback so the page is fully settled before Three.js kicks in.
  const [showGlobe, setShowGlobe] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    let cancelled = false;
    const kick = () => {
      if (!cancelled) setShowGlobe(true);
    };
    // Prefer requestIdleCallback (runs when browser is truly idle).
    // Fallback to a long timeout.
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (win.requestIdleCallback) {
      win.requestIdleCallback(kick, { timeout: 5000 });
    } else {
      window.setTimeout(kick, 5000);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden border-b text-white -mt-[140px] pt-[120px]"
      style={{
        background: "#082545",
        borderColor: "rgba(255,255,255,0.08)",
        // Combined: solid base + radial gradient highlight + CSS grid pattern.
        // Replaces separate SVG <pattern> element which was slow to composite
        // on mobile CPU-throttled rendering. All in one paint layer now.
        backgroundImage:
          "radial-gradient(ellipse 80% 90% at 75% 50%, #1a4a7a 0%, #0e3866 30%, transparent 60%), linear-gradient(rgba(127,176,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(127,176,255,0.06) 1px, transparent 1px)",
        backgroundSize: "auto, 40px 40px, 40px 40px",
      }}
    >
      {/* ─── Background + Globe ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">

        {/* 3D Globe iframe - positioned right. Loaded after a 2s delay so the
            heavy Three.js bundle + WebGL textures don't block LCP. */}
        <div className="absolute top-0 right-0 w-[65%] h-full hidden lg:block">
          {showGlobe && (
            <iframe
              src="/globe.html"
              className="w-full h-full border-0"
              style={{ pointerEvents: "auto" }}
              title="Uzinex Global Network"
              loading="lazy"
            />
          )}
          {/* Left fade so globe blends into content area */}
          <div
            className="absolute inset-y-0 left-0 w-[40%] pointer-events-none"
            style={{
              background: "linear-gradient(90deg, #082545 0%, rgba(8,37,69,0.7) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Left overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,37,69,0.95) 0%, rgba(8,37,69,0.8) 30%, rgba(8,37,69,0.3) 55%, transparent 70%)",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="container-x pt-14 lg:pt-16 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* H1 column — NO motion wrapper. H1 is the LCP candidate; if it starts
            at opacity:0 Lighthouse can't measure LCP and reports NO_LCP error. */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 mono">
            <span className="w-8 h-px bg-white/40" />
            <span>{d.eyebrow}</span>
          </div>
          <h1 className="serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[0.95] text-white" style={{ letterSpacing: "-0.03em" }}>
            {d.titleLine1}<br />
            {d.titleLine2}<br />
            <span className="font-light text-uzx-orange">{d.titleHighlight}</span>
          </h1>
          <p className="text-base lg:text-lg text-ink-200 max-w-2xl mt-6 leading-relaxed">
            {d.description}
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-7">
            <a
              href={d.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-ink-100 text-ink-900 text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
            >
              {d.ctaLabel}
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            <a href={d.secondaryCtaHref} className="text-sm text-white underline-link hover:text-ink-200">
              {d.secondaryCtaLabel}
            </a>
          </div>
        </div>

        {/* Stats column — NO motion. On mobile this stacks below the H1
            and could be the LCP candidate; opacity:0 fade-in was preventing
            Lighthouse from measuring LCP. Now visible from first paint. */}
        <div className="lg:col-span-4 lg:border-l border-white/15 lg:pl-12 flex flex-col justify-end">
          <div className="space-y-6">
            {d.stats.map((s, i) => (
              <div key={i}>
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink-300 mono">{s.label}</div>
                <div className="serif text-2xl text-white mt-1">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[10px] mono uppercase tracking-widest text-white/70">
        {/* CSS-only pulse — keeps animation running without a JS rAF loop */}
        <style>{`
          @keyframes uzx-live-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          .uzx-live-dot { animation: uzx-live-pulse 2s ease-in-out infinite; }
          @media (prefers-reduced-motion: reduce) { .uzx-live-dot { animation: none; } }
        `}</style>
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 uzx-live-dot" />
        LIVE · UZX FACILITY
      </div>
    </section>
  );
}
