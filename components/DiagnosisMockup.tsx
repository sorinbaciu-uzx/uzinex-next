"use client";

import { motion } from "motion/react";

export function DiagnosisMockup() {
  return (
    <div className="mt-10">
      {/* Tablet frame */}
      <div className="relative border-[3px] border-ink-900 bg-black overflow-hidden aspect-[4/3]">
        {/* Camera feed simulation */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, #0a1f3d 0%, #0e2d4a 25%, #143856 50%, #1a4568 75%, #0e2d4a 100%)",
            }}
          />
          {/* Scan lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)",
            }}
          />
          {/* Moving scan line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: "rgba(30,107,184,0.4)" }}
            animate={{ top: ["0%", "100%"] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Simulated machine silhouette — abstract shapes */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg viewBox="0 0 200 150" className="w-3/4 h-3/4" fill="none" stroke="rgba(30,107,184,0.6)" strokeWidth="0.5">
              <rect x="40" y="30" width="60" height="80" rx="2" />
              <rect x="50" y="40" width="40" height="20" rx="1" />
              <circle cx="70" cy="85" r="12" />
              <line x1="100" y1="50" x2="160" y2="50" />
              <line x1="100" y1="70" x2="140" y2="70" />
              <rect x="120" y="35" width="50" height="60" rx="2" />
              <circle cx="145" cy="65" r="8" />
            </svg>
          </div>
        </div>

        {/* Focusing reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="relative"
            animate={{
              scale: [1, 0.92, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none" stroke="rgba(245,133,31,0.8)" strokeWidth="1.5">
              {/* Corner brackets */}
              <path d="M5 20 L5 5 L20 5" />
              <path d="M60 5 L75 5 L75 20" />
              <path d="M75 60 L75 75 L60 75" />
              <path d="M20 75 L5 75 L5 60" />
              {/* Cross */}
              <line x1="40" y1="30" x2="40" y2="50" strokeOpacity="0.4" />
              <line x1="30" y1="40" x2="50" y2="40" strokeOpacity="0.4" />
            </svg>
          </motion.div>
        </div>

        {/* LIVE badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 px-2 py-1">
          <motion.span
            className="w-2 h-2 bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-[9px] mono text-white uppercase tracking-widest">
            Live
          </span>
        </div>

        {/* Connection status top-right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 px-2 py-1">
          <motion.span
            className="w-1.5 h-1.5 bg-green-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[9px] mono text-white/70 uppercase tracking-wider">
            Expert conectat
          </span>
        </div>

        {/* Telemetry data overlay — left side */}
        <div className="absolute bottom-3 left-3 space-y-1.5">
          {[
            { label: "Vibrații axă X", value: "0.3mm", warn: true },
            { label: "Temperatură", value: "42°C", warn: false },
            { label: "Consum", value: "3.2 kW", warn: false },
          ].map((d, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 bg-black/60 px-2 py-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.4, duration: 0.5 }}
            >
              <span
                className={`w-1.5 h-1.5 ${
                  d.warn ? "bg-uzx-orange" : "bg-green-400"
                }`}
              />
              <span className="text-[8px] mono text-white/60 uppercase tracking-wider">
                {d.label}
              </span>
              <span
                className={`text-[9px] mono font-bold ${
                  d.warn ? "text-uzx-orange" : "text-white"
                }`}
              >
                {d.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Expert cursor animation — moves to button and clicks */}
        <motion.div
          className="absolute z-20"
          initial={{ top: "30%", right: "40%" }}
          animate={{
            top: ["30%", "65%", "65%", "65%", "30%"],
            right: ["40%", "15%", "15%", "15%", "40%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            times: [0, 0.3, 0.5, 0.7, 1],
            ease: "easeInOut",
          }}
        >
          {/* Cursor SVG */}
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 drop-shadow-lg"
            fill="white"
            stroke="#082545"
            strokeWidth="1.5"
          >
            <path d="M5 3l14 8-6 2-3 6-5-16z" />
          </svg>
          {/* Click ripple */}
          <motion.div
            className="absolute top-0 left-0 w-5 h-5 border border-white/50"
            style={{ borderRadius: "50%" }}
            animate={{
              scale: [0, 2, 2],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              times: [0.45, 0.55, 0.65],
              ease: "easeOut",
            }}
          />
        </motion.div>

        {/* Action button bottom-right */}
        <div className="absolute bottom-3 right-3">
          <motion.div
            className="bg-uzx-orange px-3 py-1.5 text-[9px] mono text-white uppercase tracking-wider font-bold flex items-center gap-1.5"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(245,133,31,0)",
                "0 0 0 0 rgba(245,133,31,0)",
                "0 0 12px 2px rgba(245,133,31,0.5)",
                "0 0 0 0 rgba(245,133,31,0)",
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              times: [0, 0.45, 0.55, 0.7],
            }}
          >
            <span>Diagnoză completă</span>
            <span>✓</span>
          </motion.div>
        </div>
      </div>

      {/* Device label */}
      <div className="mt-3 flex items-center justify-between text-[10px] mono text-ink-400 uppercase tracking-wider">
        <span>Tabletă tehnician · Sesiune activă</span>
        <span>
          <motion.span
            className="inline-block w-1.5 h-1.5 bg-green-500 mr-1.5"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Criptat E2E
        </span>
      </div>
    </div>
  );
}
