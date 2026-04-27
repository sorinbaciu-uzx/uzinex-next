"use client";

import { motion } from "motion/react";

export function TireRecycleAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        style={{ transformOrigin: "70px 75px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="70" cy="75" r="32" fill="#0b2b66" />
        <circle cx="70" cy="75" r="14" fill="#7a8493" />
        <circle cx="70" cy="75" r="6" fill="#0b2b66" />

        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect
            key={a}
            x="68"
            y="46"
            width="4"
            height="8"
            fill="#1e6bb8"
            transform={`rotate(${a} 70 75)`}
          />
        ))}
      </motion.g>

      <motion.path
        d="M105 75 L150 75"
        stroke="#f5851f"
        strokeWidth="2"
        strokeDasharray="4 3"
        animate={{ strokeDashoffset: [0, -7] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      />
      <polygon points="148,71 156,75 148,79" fill="#f5851f" />

      {Array.from({ length: 14 }).map((_, i) => {
        const x = 175 + (i % 7) * 12;
        const y = 55 + Math.floor(i / 7) * 16;
        return (
          <motion.rect
            key={i}
            x={x}
            y={y}
            width="6"
            height="6"
            fill="#0b2b66"
            rx="0.6"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.08 }}
            style={{ transformOrigin: `${x + 3}px ${y + 3}px` }}
          />
        );
      })}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">RECICLARE ANVELOPE</text>
    </svg>
  );
}
