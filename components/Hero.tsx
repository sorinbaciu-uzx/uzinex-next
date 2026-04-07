"use client";

import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b text-white -mt-[140px] pt-[160px]" style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}>
      {/* ─── Animated blueprint background ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 80% 45%, #2d7dc9 0%, #1e6bb8 15%, #155290 30%, #0e3866 50%, #082545 75%, #051a33 100%)",
          }}
        />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="bp-grid-sm" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#7fb0ff" strokeWidth="0.4" />
            </pattern>
            <pattern id="bp-grid-lg" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M 200 0 L 0 0 0 200" fill="none" stroke="#7fb0ff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bp-grid-sm)" />
          <rect width="100%" height="100%" fill="url(#bp-grid-lg)" />
        </svg>

        {/* Scan line */}
        <motion.div
          className="absolute inset-x-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(127,176,255,0.8), transparent)",
          }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <svg
          viewBox="0 0 1600 900"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-30"
        >
          {/* BIG GEAR */}
          <g transform="translate(1200,420)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px", transformBox: "fill-box" }}
            >
              <circle r="180" fill="none" stroke="#7fb0ff" strokeWidth="1.5" opacity="0.5" />
              <circle r="150" fill="none" stroke="#7fb0ff" strokeWidth="1" opacity="0.4" />
              <circle r="40" fill="none" stroke="#7fb0ff" strokeWidth="2" />
              <circle r="8" fill="#7fb0ff" />
              <g stroke="#7fb0ff" strokeWidth="2" fill="none">
                <line x1="0" y1="-180" x2="0" y2="-200" />
                <line x1="0" y1="180" x2="0" y2="200" />
                <line x1="-180" y1="0" x2="-200" y2="0" />
                <line x1="180" y1="0" x2="200" y2="0" />
                <line x1="-127" y1="-127" x2="-141" y2="-141" />
                <line x1="127" y1="-127" x2="141" y2="-141" />
                <line x1="-127" y1="127" x2="-141" y2="141" />
                <line x1="127" y1="127" x2="141" y2="141" />
              </g>
              <line x1="-150" y1="0" x2="150" y2="0" stroke="#7fb0ff" strokeWidth="1" opacity="0.6" />
              <line x1="0" y1="-150" x2="0" y2="150" stroke="#7fb0ff" strokeWidth="1" opacity="0.6" />
              <line x1="-106" y1="-106" x2="106" y2="106" stroke="#7fb0ff" strokeWidth="1" opacity="0.6" />
              <line x1="-106" y1="106" x2="106" y2="-106" stroke="#7fb0ff" strokeWidth="1" opacity="0.6" />
            </motion.g>
          </g>

          {/* MEDIUM GEAR */}
          <g transform="translate(1430,200)">
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px", transformBox: "fill-box" }}
            >
              <circle r="90" fill="none" stroke="#7fb0ff" strokeWidth="1.5" opacity="0.6" />
              <circle r="20" fill="none" stroke="#7fb0ff" strokeWidth="2" />
              <circle r="4" fill="#7fb0ff" />
              <g stroke="#7fb0ff" strokeWidth="2">
                <line x1="0" y1="-90" x2="0" y2="-105" />
                <line x1="0" y1="90" x2="0" y2="105" />
                <line x1="-90" y1="0" x2="-105" y2="0" />
                <line x1="90" y1="0" x2="105" y2="0" />
                <line x1="-64" y1="-64" x2="-74" y2="-74" />
                <line x1="64" y1="-64" x2="74" y2="-74" />
                <line x1="-64" y1="64" x2="-74" y2="74" />
                <line x1="64" y1="64" x2="74" y2="74" />
              </g>
            </motion.g>
          </g>

          {/* SMALL GEAR */}
          <g transform="translate(1090,200)">
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "0px 0px", transformBox: "fill-box" }}
            >
              <circle r="55" fill="none" stroke="#7fb0ff" strokeWidth="1.5" opacity="0.6" />
              <circle r="12" fill="none" stroke="#7fb0ff" strokeWidth="1.5" />
              <circle r="3" fill="#7fb0ff" />
              <g stroke="#7fb0ff" strokeWidth="1.5">
                <line x1="0" y1="-55" x2="0" y2="-65" />
                <line x1="0" y1="55" x2="0" y2="65" />
                <line x1="-55" y1="0" x2="-65" y2="0" />
                <line x1="55" y1="0" x2="65" y2="0" />
                <line x1="-39" y1="-39" x2="-46" y2="-46" />
                <line x1="39" y1="-39" x2="46" y2="-46" />
                <line x1="-39" y1="39" x2="-46" y2="46" />
                <line x1="39" y1="39" x2="46" y2="46" />
              </g>
            </motion.g>
          </g>

          {/* Schematic */}
          <g stroke="#7fb0ff" strokeWidth="1" fill="none" opacity="0.4">
            <motion.path
              d="M 80 700 L 280 700 L 280 600 L 480 600"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -100] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <circle cx="80" cy="700" r="4" fill="#7fb0ff" />
            <circle cx="280" cy="600" r="4" fill="#7fb0ff" />
            <circle cx="480" cy="600" r="4" fill="#7fb0ff" />
            <text x="90" y="690" fontFamily="IBM Plex Mono" fontSize="11" fill="#7fb0ff" opacity="0.7">NODE_01</text>
            <text x="290" y="590" fontFamily="IBM Plex Mono" fontSize="11" fill="#7fb0ff" opacity="0.7">CTRL_HUB</text>
            <text x="490" y="590" fontFamily="IBM Plex Mono" fontSize="11" fill="#7fb0ff" opacity="0.7">OUTPUT</text>
          </g>

          {/* Crosshair */}
          <g stroke="#7fb0ff" strokeWidth="1" fill="none" opacity="0.5">
            <circle cx="200" cy="200" r="40" />
            <circle cx="200" cy="200" r="60" strokeDasharray="2 4" />
            <line x1="140" y1="200" x2="260" y2="200" />
            <line x1="200" y1="140" x2="200" y2="260" />
            <text x="270" y="205" fontFamily="IBM Plex Mono" fontSize="10" fill="#7fb0ff" opacity="0.7">SCAN_AREA</text>
          </g>

          {/* Pulsing dots */}
          {[
            { cx: 300, cy: 450, delay: 0 },
            { cx: 600, cy: 350, delay: 0.7 },
            { cx: 850, cy: 500, delay: 1.4 },
            { cx: 1100, cy: 700, delay: 2.1 },
            { cx: 500, cy: 800, delay: 0.3 },
          ].map((dot, i) => (
            <motion.circle
              key={i}
              cx={dot.cx}
              cy={dot.cy}
              r="3"
              fill="#7fb0ff"
              animate={{ scale: [1, 2, 1], opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot.delay,
              }}
              style={{ transformOrigin: `${dot.cx}px ${dot.cy}px` }}
            />
          ))}

          <g fontFamily="IBM Plex Mono" fontSize="9" fill="#7fb0ff" opacity="0.5">
            <text x="20" y="30">X: 0000.000</text>
            <text x="20" y="50">Y: 0000.000</text>
            <text x="20" y="70">Z: +0125.40</text>
          </g>
        </svg>

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,37,69,0.92) 0%, rgba(8,37,69,0.55) 40%, rgba(8,37,69,0.15) 70%, rgba(8,37,69,0) 100%)",
          }}
        />
      </div>

      {/* ─── Content ─── */}
      <div className="container-x pt-20 lg:pt-24 pb-16 grid lg:grid-cols-12 gap-10 relative z-10">
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 mono">
            <span className="w-8 h-px bg-white/40" />
            <span>Integrator industrial · Proiectare · Implementare · Service</span>
          </div>
          <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white" style={{ letterSpacing: "-0.03em" }}>
            Echipamente și<br />
            componente pentru<br />
            <span className="font-light text-uzx-orange">industria grea.</span>
          </h1>
          <p className="text-base lg:text-lg text-ink-200 max-w-2xl mt-6 leading-relaxed">
            Furnizăm echipamente grele și tehnologie industrială la cheie pentru sectorul privat, instituții de stat și sectorul de defense. Optimizăm achizițiile prin fonduri europene sau proceduri B2G, asigurând conformitate totală, trasabilitate și un ecosistem de suport tehnic 100% local.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-7">
            <a
              href="#catalog"
              className="bg-white hover:bg-ink-100 text-ink-900 text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
            >
              Vezi catalogul tehnic
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            <a href="#contact" className="text-sm text-white underline-link hover:text-ink-200">
              Discută cu un inginer
            </a>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-4 lg:border-l border-white/15 lg:pl-12 flex flex-col justify-end"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono">Intervenție fizică</div>
              <div className="serif text-2xl text-white mt-1">sub 24 ore</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono">Echipă de ingineri</div>
              <div className="serif text-2xl text-white mt-1">consultanță tehnică</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono">Garanție standard</div>
              <div className="serif text-2xl text-white mt-1">60 luni</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2 text-[10px] mono uppercase tracking-widest text-white/50">
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
