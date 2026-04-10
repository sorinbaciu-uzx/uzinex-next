"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

function AnimatedNumber({ target, suffix = "", prefix = "", duration = 2000 }: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{current.toLocaleString("ro-RO")}{suffix}
    </span>
  );
}

type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

export function CounterMetrics({ metrics, accent = "#1e6bb8" }: { metrics: Metric[]; accent?: string }) {
  return (
    <div className="bg-[#0a0e14] p-5 lg:p-6 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-5">
        Impact măsurabil
      </div>
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
          >
            <div
              className="serif text-2xl lg:text-3xl num font-medium"
              style={{ color: accent, letterSpacing: "-0.03em" }}
            >
              <AnimatedNumber
                target={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
              />
            </div>
            <div className="text-[9px] mono text-white/50 uppercase tracking-wider mt-2 leading-tight">
              {m.label}
            </div>

            {/* Mini sparkline */}
            <svg
              viewBox="0 0 60 16"
              className="w-12 h-3 mx-auto mt-2"
              fill="none"
              stroke={accent}
              strokeWidth="1"
              opacity="0.4"
            >
              <motion.polyline
                points={
                  i === 0
                    ? "0,14 10,12 20,10 30,7 40,4 50,3 60,1"
                    : i === 1
                    ? "0,12 10,11 20,8 30,5 40,3 50,2 60,1"
                    : "0,14 10,10 20,12 30,6 40,4 50,2 60,1"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
