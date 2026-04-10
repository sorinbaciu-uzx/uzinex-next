"use client";

import { motion } from "motion/react";

const STEPS = [
  {
    label: "Analiză",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Instalare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Programare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Producție",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 21h18" strokeLinecap="round" />
        <path d="M5 21V7l5-4v18" />
        <path d="M19 21V11l-5-2v12" />
        <path d="M9 9h1M9 13h1M14 13h1M14 17h1" strokeLinecap="round" />
        {/* smoke */}
        <motion.path
          d="M7 3c0 0 1-1.5 0-3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

const CYCLE = 6;

export function CobotsPriceCompare() {
  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden flex flex-col items-center justify-center px-6">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,107,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30,107,184,0.15) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Timeline */}
      <div className="relative z-10 w-full max-w-[280px]">
        {/* Progress bar background */}
        <div className="absolute top-5 left-5 right-5 h-px bg-white/10" />

        {/* Progress bar fill — grows through 4 steps */}
        <motion.div
          className="absolute top-5 left-5 h-px bg-uzx-orange origin-left"
          style={{ right: "20px" }}
          animate={{ scaleX: [0, 0.33, 0.33, 0.66, 0.66, 1, 1, 0] }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.15, 0.2, 0.35, 0.4, 0.55, 0.8, 0.95],
            ease: "easeInOut",
          }}
        />

        {/* Step nodes */}
        <div className="flex items-start justify-between relative">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center w-14">
              {/* Node circle */}
              <motion.div
                className="w-10 h-10 border flex items-center justify-center relative"
                animate={{
                  borderColor: [
                    "rgba(255,255,255,0.15)",
                    "rgba(255,255,255,0.15)",
                    "#f5851f",
                    "#f5851f",
                    "rgba(255,255,255,0.15)",
                  ],
                  background: [
                    "rgba(255,255,255,0)",
                    "rgba(255,255,255,0)",
                    "rgba(245,133,31,0.15)",
                    "rgba(245,133,31,0.15)",
                    "rgba(255,255,255,0)",
                  ],
                }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  times: [
                    0,
                    i * 0.15 + 0.05,
                    i * 0.15 + 0.12,
                    0.8,
                    0.95,
                  ],
                }}
              >
                <motion.div
                  animate={{
                    color: [
                      "rgba(255,255,255,0.25)",
                      "rgba(255,255,255,0.25)",
                      "#f5851f",
                      "#f5851f",
                      "rgba(255,255,255,0.25)",
                    ],
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    times: [
                      0,
                      i * 0.15 + 0.05,
                      i * 0.15 + 0.12,
                      0.8,
                      0.95,
                    ],
                  }}
                >
                  {step.icon}
                </motion.div>

                {/* Pulse ring on activation */}
                <motion.div
                  className="absolute inset-0 border border-uzx-orange"
                  animate={{
                    scale: [1, 1, 1.6, 1.6],
                    opacity: [0, 0, 0.5, 0],
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    times: [
                      0,
                      i * 0.15 + 0.1,
                      i * 0.15 + 0.18,
                      i * 0.15 + 0.25,
                    ],
                  }}
                />
              </motion.div>

              {/* Label */}
              <motion.div
                className="mt-3 text-[9px] mono uppercase tracking-wider text-center"
                animate={{
                  color: [
                    "rgba(255,255,255,0.3)",
                    "rgba(255,255,255,0.3)",
                    "rgba(255,255,255,0.8)",
                    "rgba(255,255,255,0.8)",
                    "rgba(255,255,255,0.3)",
                  ],
                }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  times: [
                    0,
                    i * 0.15 + 0.05,
                    i * 0.15 + 0.12,
                    0.8,
                    0.95,
                  ],
                }}
              >
                {step.label}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* "Gata în 5 zile" — appears after all steps complete */}
      <motion.div
        className="relative z-10 mt-8 flex items-center gap-2"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{
          duration: CYCLE,
          repeat: Infinity,
          times: [0, 0.58, 0.65, 0.82, 0.92],
        }}
      >
        <motion.div
          className="w-6 h-6 bg-uzx-orange flex items-center justify-center"
          animate={{ scale: [0.5, 0.5, 1.1, 1] }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.6, 0.67, 0.72],
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3.5 h-3.5">
            <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <span className="text-[11px] mono text-uzx-orange font-bold uppercase tracking-wider">
          Gata în 5 zile
        </span>
      </motion.div>
    </div>
  );
}
