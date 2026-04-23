"use client";

/**
 * Animated before/after comparison bar — visualizes the gap between a baseline
 * ("manual" / "metoda veche" / "concurență") and the current product.
 *
 * Visual pattern matches the existing industry-4.0 animation family:
 *  - dark panel, mono top label
 *  - entries animate into view when scrolled
 *  - value counts up from 0 with ease-out
 *  - bar width maps proportionally inside each row (worse value → longer bar)
 *
 * WHY proportional bars (not absolute): values across rows often have
 * different units ("45 min" vs "2 min", "350 kg" vs "50 kg"). We only need
 * the visual ratio within each row to communicate the gap.
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Side = {
  /** Short label shown above the bar, e.g. "Manual" or "Automat". */
  label: string;
  /** Numeric value; drives both the counter and the bar length. */
  value: number;
  /** Optional unit suffix, e.g. "min", "kg/h", "sec". */
  unit?: string;
};

type Row = {
  /** Row heading, e.g. "Timp de schimbare a sculei". */
  label: string;
  before: Side;
  after: Side;
};

type Props = {
  rows: Row[];
  /** Optional override for the small top label. */
  heading?: string;
  accent?: string;
};

function CountUp({ target, duration = 1400 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const t = Math.min((Date.now() - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else setCurrent(target);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  // Keep decimals only if the target has them (e.g. 0,65 m³ should stay 0,65).
  const digits = Number.isInteger(target) ? 0 : 2;
  return (
    <span ref={ref}>
      {current.toLocaleString("ro-RO", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })}
    </span>
  );
}

export function ComparisonBar({
  rows,
  heading = "Comparativ cu metoda veche",
  accent = "#1e6bb8",
}: Props) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className="bg-[#0a0e14] p-5 lg:p-6 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-5">
        {heading}
      </div>

      <div className="space-y-5">
        {rows.map((row, i) => {
          const max = Math.max(row.before.value, row.after.value, 1);
          const beforePct = Math.round((row.before.value / max) * 100);
          const afterPct = Math.round((row.after.value / max) * 100);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.35 }}
            >
              <div className="text-[10px] mono text-white/60 uppercase tracking-wider mb-2.5">
                {row.label}
              </div>

              {/* Before row */}
              <div className="mb-2">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[9px] mono text-white/40 uppercase tracking-wider">
                    {row.before.label}
                  </span>
                  <span className="text-[11px] mono text-white/80 num">
                    <CountUp target={row.before.value} />
                    {row.before.unit ? ` ${row.before.unit}` : ""}
                  </span>
                </div>
                <div className="h-[3px] bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-white/40"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${beforePct}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* After row */}
              <div>
                <div className="flex items-baseline justify-between mb-1">
                  <span
                    className="text-[9px] mono uppercase tracking-wider"
                    style={{ color: accent }}
                  >
                    {row.after.label}
                  </span>
                  <span
                    className="text-[11px] mono font-semibold num"
                    style={{ color: accent }}
                  >
                    <CountUp target={row.after.value} />
                    {row.after.unit ? ` ${row.after.unit}` : ""}
                  </span>
                </div>
                <div className="h-[3px] bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full"
                    style={{ background: accent }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${afterPct}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
