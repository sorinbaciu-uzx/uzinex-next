"use client";

import { motion } from "motion/react";

export function FoodFactoryAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="20" y="95" width="240" height="10" fill="#0b2b66" rx="5" />
      <motion.line
        x1="20"
        y1="100"
        x2="260"
        y2="100"
        stroke="#1e6bb8"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      {[
        { x: 60, c: "#1e6bb8", lid: "#f5851f" },
        { x: 110, c: "#f5851f", lid: "#1e6bb8" },
        { x: 160, c: "#1e6bb8", lid: "#f5851f" },
        { x: 210, c: "#f5851f", lid: "#1e6bb8" },
      ].map((b, i) => (
        <motion.g
          key={i}
          animate={{ x: [b.x - 80, b.x + 200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 1.25 }}
        >
          <rect x="0" y="62" width="14" height="33" rx="2" fill={b.c} />
          <rect x="3" y="58" width="8" height="6" rx="1" fill={b.lid} />
          <rect x="2" y="73" width="10" height="9" fill="#fff" opacity="0.85" />
          <line x1="3" y1="76" x2="11" y2="76" stroke="#0b2b66" strokeWidth="0.5" />
          <line x1="3" y1="79" x2="9" y2="79" stroke="#0b2b66" strokeWidth="0.4" />
        </motion.g>
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">PRODUCȚIE BĂUTURI</text>
      <text x="140" y="138" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">alimentar · cosmetic · farmaceutic</text>
    </svg>
  );
}
