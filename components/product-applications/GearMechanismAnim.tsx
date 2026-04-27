"use client";

import { motion } from "motion/react";

function Gear({ cx, cy, r, teeth, color, dur, dir = 1 }: { cx: number; cy: number; r: number; teeth: number; color: string; dur: number; dir?: 1 | -1 }) {
  const inner = r * 0.65;
  const points = Array.from({ length: teeth * 2 }).map((_, i) => {
    const a = (i * Math.PI) / teeth;
    const rad = i % 2 === 0 ? r : r * 0.78;
    return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
  }).join(" ");
  return (
    <motion.g
      animate={{ rotate: dir * 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <polygon points={points} fill={color} />
      <circle cx={cx} cy={cy} r={inner} fill="#fff" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill={color} />
    </motion.g>
  );
}

export function GearMechanismAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />
      <Gear cx={95} cy={75} r={28} teeth={12} color="#0b2b66" dur={6} />
      <Gear cx={155} cy={75} r={20} teeth={10} color="#1e6bb8" dur={4} dir={-1} />
      <Gear cx={205} cy={60} r={16} teeth={8} color="#f5851f" dur={3} />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">ATELIER MECANIC</text>
      <text x="140" y="135" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">arbori · roți · transmisii</text>
    </svg>
  );
}
