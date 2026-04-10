"use client";

import { motion } from "motion/react";

const PIECES = [
  { id: 1, delay: 0, ok: true },
  { id: 2, delay: 1.5, ok: true },
  { id: 3, delay: 3, ok: false },
  { id: 4, delay: 4.5, ok: true },
  { id: 5, delay: 6, ok: true },
];

const CYCLE = 9;

export function VisionCameraPOV() {
  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden">
      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px)",
        }}
      />

      {/* Camera viewfinder corners */}
      <div className="absolute inset-4 pointer-events-none z-20">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
          <path d="M0 15 L0 0 L15 0" />
          <path d="M85 0 L100 0 L100 15" />
          <path d="M100 85 L100 100 L85 100" />
          <path d="M15 100 L0 100 L0 85" />
        </svg>
      </div>

      {/* REC indicator */}
      <div className="absolute top-3 left-4 flex items-center gap-1.5 z-20">
        <motion.span
          className="w-2 h-2 bg-red-500"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[9px] mono text-white/60 uppercase tracking-widest">
          REC
        </span>
      </div>

      {/* FPS counter */}
      <div className="absolute top-3 right-4 z-20">
        <span className="text-[9px] mono text-white/40">120 FPS · 4K</span>
      </div>

      {/* Conveyor belt lines */}
      <div className="absolute bottom-[35%] left-0 right-0 z-0">
        <motion.div
          className="h-px bg-white/15"
          animate={{ backgroundPosition: ["0px 0px", "-40px 0px"] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 10px, transparent 10px 20px)",
            backgroundSize: "20px 1px",
          }}
        />
        <div className="h-8" />
        <motion.div
          className="h-px"
          animate={{ backgroundPosition: ["0px 0px", "-40px 0px"] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.3) 0 10px, transparent 10px 20px)",
            backgroundSize: "20px 1px",
          }}
        />
      </div>

      {/* Scan laser line */}
      <div className="absolute left-[55%] top-[20%] bottom-[20%] w-px z-10">
        <motion.div
          className="w-full h-full"
          style={{ background: "rgba(30,107,184,0.8)" }}
          animate={{
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              "0 0 4px 1px rgba(30,107,184,0.3)",
              "0 0 12px 4px rgba(30,107,184,0.6)",
              "0 0 4px 1px rgba(30,107,184,0.3)",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Moving pieces */}
      {PIECES.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute z-10"
          style={{ top: "calc(50% - 16px)" }}
          animate={{
            left: ["105%", "-15%"],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            repeat: Infinity,
            repeatDelay: CYCLE - 3,
            ease: "linear",
          }}
        >
          {/* Piece body */}
          <div className="w-8 h-8 border border-white/30 bg-white/5 relative">
            {!piece.ok && (
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 opacity-60" />
            )}
          </div>

          {/* AR overlay — appears when piece crosses scan line */}
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
            animate={{
              opacity: [0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: piece.delay,
              repeat: Infinity,
              repeatDelay: CYCLE - 3,
              times: [0, 0.45, 0.5, 0.7, 0.8],
            }}
          >
            <div
              className={`px-2 py-1 border text-[9px] mono font-bold ${
                piece.ok
                  ? "border-green-500/50 bg-green-500/10 text-green-400"
                  : "border-red-500/50 bg-red-500/10 text-red-400"
              }`}
            >
              {piece.ok ? "✓ OK 99.8%" : "✗ Fisură 0.3mm"}
            </div>
          </motion.div>

          {/* Bounding box — appears at scan */}
          <motion.div
            className={`absolute -inset-1.5 border ${
              piece.ok ? "border-green-500/60" : "border-red-500/60"
            }`}
            animate={{
              opacity: [0, 0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: piece.delay,
              repeat: Infinity,
              repeatDelay: CYCLE - 3,
              times: [0, 0.45, 0.5, 0.75, 0.85],
            }}
          />
        </motion.div>
      ))}

      {/* Bottom HUD */}
      <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-20">
        <div className="text-[9px] mono text-white/40 space-y-0.5">
          <div>Bandă #3 · Lot B-2026-0412</div>
          <div>Inspectate: <span className="text-green-400">847</span> · Rebuturi: <span className="text-red-400">3</span></div>
        </div>
        <div className="text-[9px] mono text-green-400/70">
          Yield: 99.65%
        </div>
      </div>
    </div>
  );
}
