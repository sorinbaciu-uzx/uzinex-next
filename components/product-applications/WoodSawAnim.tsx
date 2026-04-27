"use client";

import { motion } from "motion/react";

export function WoodSawAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="85" width="200" height="20" fill="#a89077" />
      <line x1="40" y1="90" x2="240" y2="90" stroke="#7a5d3f" strokeWidth="0.5" />
      <line x1="40" y1="96" x2="240" y2="96" stroke="#7a5d3f" strokeWidth="0.4" />
      <line x1="40" y1="100" x2="240" y2="100" stroke="#7a5d3f" strokeWidth="0.3" />

      <motion.g
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="55" y="50" width="6" height="35" fill="#0b2b66" />
        <motion.g
          style={{ transformOrigin: "58px 90px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="58" cy="90" r="14" fill="#1e6bb8" />
          <circle cx="58" cy="90" r="10" fill="#0b2b66" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={58 + Math.cos(a) * 11}
                y1={90 + Math.sin(a) * 11}
                x2={58 + Math.cos(a) * 14}
                y2={90 + Math.sin(a) * 14}
                stroke="#f5851f"
                strokeWidth="1"
              />
            );
          })}
        </motion.g>
      </motion.g>

      {[80, 100, 120, 140, 160, 180, 200].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy="115"
          r="1.4"
          fill="#a89077"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">DEBITARE LEMN</text>
    </svg>
  );
}
