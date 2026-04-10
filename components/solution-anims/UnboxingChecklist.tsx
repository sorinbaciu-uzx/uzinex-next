"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const CYCLE = 8;

export function UnboxingChecklist({ items, accent = "#1e6bb8" }: { items: string[]; accent?: string }) {
  const [checked, setChecked] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setChecked(0);
    const timers = items.map((_, i) =>
      setTimeout(() => setChecked(i + 1), 800 + i * 700)
    );
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, items]);

  const progress = items.length > 0 ? (checked / items.length) * 100 : 0;

  return (
    <div className="bg-[#0a0e14] p-5 lg:p-6 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-4">
        Kit complet — verificare componente
      </div>
      <div className="space-y-2.5">
        {items.map((item, i) => {
          const done = i < checked;
          return (
            <motion.div
              key={`${cycle}-${i}`}
              className="flex items-center gap-3"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: done ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-5 h-5 border flex items-center justify-center shrink-0"
                style={{
                  borderColor: done ? accent : "rgba(255,255,255,0.2)",
                  background: done ? accent + "20" : "transparent",
                }}
                animate={done ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {done && (
                  <motion.svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={accent}
                    strokeWidth="3"
                    className="w-3 h-3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </motion.div>
              <span
                className={`text-[11px] mono ${
                  done ? "text-white/90" : "text-white/35"
                }`}
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] mono text-white/40 uppercase tracking-wider">
            Completitudine
          </span>
          <span className="text-[10px] mono font-bold" style={{ color: accent }}>
            {Math.round(progress)}%
          </span>
        </div>
        <div className="h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: accent }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
