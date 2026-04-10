"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CYCLE = 8;

export function FlowchartSteps({
  steps,
  accent = "#1e6bb8",
  totalTime,
}: {
  steps: { label: string; time?: string }[];
  accent?: string;
  totalTime?: string;
}) {
  const [activeStep, setActiveStep] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setActiveStep(-1);
    const timers = steps.map((_, i) =>
      setTimeout(() => setActiveStep(i), 600 + i * 900)
    );
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, steps]);

  return (
    <div className="bg-[#0a0e14] p-5 lg:p-6 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-5">
        Proces de implementare
      </div>

      <div className="flex items-start justify-between gap-1 relative">
        {/* Connection line */}
        <div className="absolute top-4 left-4 right-4 h-px bg-white/10" />
        <motion.div
          className="absolute top-4 left-4 h-px origin-left"
          style={{ background: accent, right: "16px" }}
          animate={{
            scaleX: steps.length > 0 ? Math.min(1, (activeStep + 1) / steps.length) : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {steps.map((step, i) => {
          const done = i <= activeStep;
          return (
            <div key={i} className="flex flex-col items-center relative z-10 flex-1">
              {/* Node */}
              <motion.div
                className="w-8 h-8 border flex items-center justify-center mb-3"
                style={{
                  borderColor: done ? accent : "rgba(255,255,255,0.15)",
                  background: done ? accent + "20" : "#0a0e14",
                }}
                animate={
                  i === activeStep
                    ? { scale: [1, 1.15, 1] }
                    : {}
                }
                transition={{ duration: 0.3 }}
              >
                {done ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accent}
                    strokeWidth="3"
                    className="w-3.5 h-3.5"
                  >
                    <polyline
                      points="20 6 9 17 4 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="text-[9px] mono text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </motion.div>

              {/* Label */}
              <div
                className={`text-[9px] mono text-center uppercase tracking-wider leading-tight ${
                  done ? "text-white/80" : "text-white/30"
                }`}
              >
                {step.label}
              </div>
              {step.time && (
                <div
                  className="text-[8px] mono mt-1"
                  style={{ color: done ? accent : "rgba(255,255,255,0.2)" }}
                >
                  {step.time}
                </div>
              )}

              {/* Pulse ring on active */}
              {i === activeStep && (
                <motion.div
                  className="absolute top-0 w-8 h-8 border"
                  style={{ borderColor: accent }}
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Total time */}
      {totalTime && (
        <motion.div
          className="mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-2"
          animate={{
            opacity: activeStep >= steps.length - 1 ? 1 : 0.3,
          }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="text-[10px] mono font-bold uppercase tracking-wider"
            style={{ color: accent }}
          >
            Timp total: {totalTime}
          </span>
        </motion.div>
      )}
    </div>
  );
}
