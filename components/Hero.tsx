"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

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

  // Defer globe iframe by 2s after mount: keeps it for visual richness but
  // doesn't block LCP measurement. The hero's gradient + grid pattern make it
  // look great even before the globe shows up. Without this, Lighthouse desktop
  // can't measure LCP because Three.js + WebGL textures keep the network busy.
  const [showGlobe, setShowGlobe] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setShowGlobe(true), 2000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden border-b text-white -mt-[140px] pt-[120px]" style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}>
      {/* ─── Background + Globe ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 75% 50%, #1a4a7a 0%, #0e3866 30%, #082545 60%, #051a33 100%)",
          }}
        />

        {/* Blueprint grid (subtle) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.1]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bp-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7fb0ff" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid-sm)" />
        </svg>

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

        <motion.div
          className="lg:col-span-4 lg:border-l border-white/15 lg:pl-12 flex flex-col justify-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-6">
            {d.stats.map((s, i) => (
              <div key={i}>
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink-300 mono">{s.label}</div>
                <div className="serif text-2xl text-white mt-1">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[10px] mono uppercase tracking-widest text-white/70">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-red-500"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        LIVE · UZX FACILITY
      </div>
    </section>
  );
}
