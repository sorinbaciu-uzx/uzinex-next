"use client";

import { motion } from "motion/react";

export function RotaryScreenAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="140" cy="75" rx="80" ry="28" fill="none" stroke="#0b2b66" strokeWidth="2" />
        <ellipse cx="140" cy="75" rx="80" ry="28" fill="#1e6bb8" opacity="0.15" />

        {Array.from({ length: 30 }).map((_, i) => {
          const a = (i * 12 * Math.PI) / 180;
          const x = 140 + Math.cos(a) * 80;
          const y = 75 + Math.sin(a) * 28;
          return <circle key={i} cx={x} cy={y} r="1.5" fill="#0b2b66" opacity="0.5" />;
        })}
      </motion.g>

      <ellipse cx="60" cy="75" rx="6" ry="20" fill="#0b2b66" />
      <ellipse cx="220" cy="75" rx="6" ry="20" fill="#0b2b66" />

      {[100, 120, 140, 160, 180].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="55"
          r="2"
          fill="#a89077"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {[110, 130, 150, 170].map((x, i) => (
        <motion.rect
          key={`big-${i}`}
          x={x}
          y={48}
          width="6"
          height="6"
          fill="#7a8493"
          animate={{ x: [x, x + 90, x + 90] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">CERNERE · SORTARE</text>
    </svg>
  );
}
