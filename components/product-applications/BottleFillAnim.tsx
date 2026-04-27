"use client";

import { motion } from "motion/react";

export function BottleFillAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="50" y="35" width="180" height="14" fill="#0b2b66" />
      {[80, 110, 140, 170, 200].map((x) => (
        <rect key={x} x={x - 1} y="49" width="2" height="14" fill="#0b2b66" />
      ))}

      {[80, 110, 140, 170, 200].map((cx, i) => (
        <g key={cx}>
          <path
            d={`M${cx - 10} 110 L${cx - 10} 75 Q${cx - 10} 70 ${cx - 6} 70 L${cx + 6} 70 Q${cx + 10} 70 ${cx + 10} 75 L${cx + 10} 110 Z`}
            fill="none"
            stroke="#0b2b66"
            strokeWidth="1.4"
          />
          <rect x={cx - 4} y="62" width="8" height="8" fill="#7a8493" rx="1" />

          <motion.rect
            x={cx - 9}
            y={75}
            width="18"
            height={34}
            fill="#1e6bb8"
            opacity="0.85"
            animate={{ height: [0, 34, 34, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, times: [0, 0.4, 0.85, 1] }}
            style={{ transformOrigin: `${cx}px 109px` }}
          />

          <motion.line
            x1={cx}
            y1={63}
            x2={cx}
            y2={75}
            stroke="#f5851f"
            strokeWidth="1.4"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, times: [0, 0.1, 0.4, 0.5] }}
          />
        </g>
      ))}

      <line x1="20" y1="115" x2="260" y2="115" stroke="#cdd7e4" strokeWidth="1.4" />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">UMPLERE · DOZARE</text>
    </svg>
  );
}
