"use client";

import { motion } from "motion/react";

export function PredictiveGraph() {
  // SVG path for historical data (vibration curve)
  const historicalPath = "M0,70 C20,68 40,65 60,66 C80,68 100,60 120,62 C140,58 160,55 180,50 C200,48 220,52 240,45";
  // Prediction path (continues with upward trend toward failure)
  const predictionPath = "M240,45 C260,40 280,38 300,30 C320,25 340,18 360,12";

  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden p-6">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,107,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,107,184,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 20px",
        }}
      />

      {/* Y axis label */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90">
        <span className="text-[8px] mono text-white/30 uppercase tracking-widest">
          Vibrații (mm)
        </span>
      </div>

      <svg viewBox="0 0 400 100" className="w-full h-full relative z-10" preserveAspectRatio="none">
        {/* Failure threshold */}
        <line x1="0" y1="15" x2="400" y2="15" stroke="rgba(220,38,38,0.4)" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="365" y="12" className="text-[6px]" fill="rgba(220,38,38,0.6)" fontFamily="monospace">PRAG</text>

        {/* NOW vertical line */}
        <motion.line
          x1="240" y1="0" x2="240" y2="100"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          strokeDasharray="3 3"
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
        <motion.text
          x="242" y="96"
          className="text-[6px]"
          fill="rgba(255,255,255,0.5)"
          fontFamily="monospace"
          animate={{ opacity: [0, 1] }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          ACUM
        </motion.text>

        {/* Historical data — draws in */}
        <motion.path
          d={historicalPath}
          fill="none"
          stroke="#1e6bb8"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.8, 0.95] }}
        />

        {/* Prediction — draws in after historical */}
        <motion.path
          d={predictionPath}
          fill="none"
          stroke="#f5851f"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.55, 0.8, 0.95] }}
        />

        {/* Confidence band */}
        <motion.path
          d="M240,55 C260,48 280,44 300,35 C320,28 340,18 360,8 L360,16 C340,22 320,28 300,35 C280,40 260,42 240,45 Z"
          fill="rgba(245,133,31,0.12)"
          stroke="none"
          animate={{ opacity: [0, 0, 0.8, 0.8, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.3, 0.5, 0.8, 0.95] }}
        />

        {/* Intersection point with threshold */}
        <motion.circle
          cx="350" cy="14"
          r="4"
          fill="none"
          stroke="#f5851f"
          strokeWidth="1.5"
          animate={{ opacity: [0, 0, 1, 1, 0], scale: [0, 0, 1, 1, 0] }}
          transition={{ duration: 8, repeat: Infinity, times: [0, 0.5, 0.6, 0.8, 0.95] }}
        />
      </svg>

      {/* Failure date label */}
      <motion.div
        className="absolute bottom-4 right-6 bg-uzx-orange/20 border border-uzx-orange/40 px-3 py-1.5 z-10"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 8, repeat: Infinity, times: [0, 0.55, 0.65, 0.8, 0.92] }}
      >
        <div className="text-[8px] mono text-uzx-orange/70 uppercase tracking-wider">
          Defecțiune estimată
        </div>
        <div className="text-[11px] mono text-uzx-orange font-bold">
          14.06 — Rulment axial
        </div>
      </motion.div>

      {/* Legend */}
      <div className="absolute top-4 right-4 space-y-1 z-10">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-[#1e6bb8]" />
          <span className="text-[8px] mono text-white/40">Date reale</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-uzx-orange" style={{ borderBottom: "1px dashed #f5851f" }} />
          <span className="text-[8px] mono text-white/40">Predicție AI</span>
        </div>
      </div>
    </div>
  );
}
