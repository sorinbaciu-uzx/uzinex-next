"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LINES = [
  { text: "> Conectare la utilaj CNC-4500...", color: "text-white/60", delay: 0 },
  { text: "  ✓ Conexiune stabilită (E2E criptat)", color: "text-green-400", delay: 1.2 },
  { text: "> Citire telemetrie în timp real...", color: "text-white/60", delay: 2.4 },
  { text: "  Vibrații axă X: 0.31mm", color: "text-uzx-orange", delay: 3.4 },
  { text: "  Temperatură motor: 42°C", color: "text-white/80", delay: 4.0 },
  { text: "  Consum energetic: 3.2 kW", color: "text-white/80", delay: 4.6 },
  { text: "  OEE ultim ciclu: 87.4%", color: "text-white/80", delay: 5.2 },
  { text: "> ⚠ Alertă: vibrații axă X peste prag", color: "text-uzx-orange", delay: 6.4 },
  { text: "> Expert remote conectat — sesiune colaborativă activă", color: "text-uzx-blue", delay: 7.6 },
  { text: "> Diagnoză: rulment axial uzat (prag 0.25mm depășit)", color: "text-white", delay: 9.0 },
  { text: "> Comandă piesă #RLM-4500-X — livrare next-day confirmată", color: "text-green-400", delay: 10.4 },
  { text: "> Programare intervenție: mâine 08:00 — tehnician regional Iași", color: "text-green-400", delay: 11.6 },
  { text: "", color: "", delay: 12.4 },
  { text: "  ✓ Diagnoză completă. Timp total: 4 min 12s", color: "text-uzx-orange", delay: 12.8 },
];

const CYCLE = 16; // seconds per full loop

export function DiagnosisMockup() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runCycle() {
      setVisibleCount(0);
      LINES.forEach((line, i) => {
        timers.push(
          setTimeout(() => setVisibleCount(i + 1), line.delay * 1000)
        );
      });
      // restart after full cycle
      timers.push(
        setTimeout(() => {
          setCycle((c) => c + 1);
        }, CYCLE * 1000)
      );
    }

    runCycle();
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="mt-12 lg:mt-16">
      {/* Terminal frame */}
      <div className="border-[3px] border-ink-900 bg-[#0a0e14] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#0d1117] border-b border-white/10">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 bg-red-500/80" />
            <span className="w-2.5 h-2.5 bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 bg-green-500/80" />
          </div>
          <span className="text-[10px] mono text-white/40 ml-2 uppercase tracking-wider">
            uzinex-diagnoza · sesiune #4571
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[9px] mono text-green-400/70">LIVE</span>
          </span>
        </div>

        {/* Terminal body */}
        <div className="px-4 py-4 min-h-[280px] lg:min-h-[320px] font-mono text-[11px] lg:text-[12px] leading-[1.8] overflow-hidden">
          <AnimatePresence mode="popLayout">
            {LINES.slice(0, visibleCount).map((line, i) =>
              line.text === "" ? (
                <div key={`${cycle}-${i}`} className="h-3" />
              ) : (
                <motion.div
                  key={`${cycle}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={line.color}
                >
                  {line.text}
                </motion.div>
              )
            )}
          </AnimatePresence>

          {/* Blinking cursor */}
          {visibleCount < LINES.length && (
            <motion.span
              className="inline-block w-2 h-4 bg-uzx-blue mt-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Device label */}
      <div className="mt-3 flex items-center justify-between text-[10px] mono text-ink-400 uppercase tracking-wider">
        <span>Diagnoză colaborativă remote · CNC-4500</span>
        <span>Criptat end-to-end</span>
      </div>
    </div>
  );
}
