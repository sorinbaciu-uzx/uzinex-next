"use client";

import { motion } from "motion/react";

export function CobotsPriceCompare() {
  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden flex items-end justify-center px-8 pb-10 pt-6">
      {/* grid bg */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "100% 40px",
        }}
      />

      <div className="relative w-full max-w-xs z-10">
        {/* Labels */}
        <div className="flex justify-between mb-3">
          <div className="text-[9px] mono text-white/50 uppercase tracking-widest">
            Distribuitor EU
          </div>
          <div className="text-[9px] mono text-uzx-orange uppercase tracking-widest">
            Uzinex
          </div>
        </div>

        {/* Bars */}
        <div className="flex items-end gap-6 h-32">
          {/* EU bar */}
          <div className="flex-1 relative">
            <motion.div
              className="w-full origin-bottom"
              style={{ background: "rgba(255,255,255,0.15)" }}
              initial={{ height: 0 }}
              animate={{ height: [0, 128, 128, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                times: [0, 0.3, 0.75, 0.95],
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute -top-7 left-0 right-0 text-center"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, times: [0.25, 0.35, 0.7, 0.85] }}
            >
              <span className="mono text-xs text-white/70">€€€€</span>
            </motion.div>
          </div>

          {/* Uzinex bar — 35% shorter */}
          <div className="flex-1 relative">
            <motion.div
              className="w-full bg-uzx-orange origin-bottom"
              initial={{ height: 0 }}
              animate={{ height: [0, 83, 83, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                times: [0, 0.3, 0.75, 0.95],
                ease: "easeOut",
              }}
            />
            <motion.div
              className="absolute -top-7 left-0 right-0 text-center"
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, repeat: Infinity, times: [0.25, 0.35, 0.7, 0.85] }}
            >
              <span className="mono text-xs text-uzx-orange font-bold">€€</span>
            </motion.div>
          </div>
        </div>

        {/* Difference bracket */}
        <motion.div
          className="absolute right-0 flex items-center gap-2"
          style={{ top: "20%", right: "-8px" }}
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.35, 0.45, 0.7, 0.85] }}
        >
          <svg viewBox="0 0 12 60" className="w-3 h-12" stroke="rgba(245,133,31,0.6)" strokeWidth="1.5" fill="none">
            <path d="M2 2 Q10 2 10 30 Q10 58 2 58" />
          </svg>
          <motion.div
            className="bg-uzx-orange px-2 py-1"
            animate={{ scale: [0.8, 1.05, 1] }}
            transition={{ duration: 5, repeat: Infinity, times: [0.4, 0.5, 0.55] }}
          >
            <span className="mono text-xs text-white font-bold">-35%</span>
          </motion.div>
        </motion.div>

        {/* Bottom line */}
        <div className="h-px bg-white/20 mt-1" />
        <motion.div
          className="text-center mt-4"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, times: [0, 0.4, 0.5, 0.7, 0.9] }}
        >
          <span className="text-[10px] mono text-white/50 uppercase tracking-wider">
            Instalare + programare inclusă
          </span>
        </motion.div>
      </div>
    </div>
  );
}
