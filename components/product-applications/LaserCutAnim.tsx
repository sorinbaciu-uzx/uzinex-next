"use client";

import { motion } from "motion/react";

export function LaserCutAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="85" width="200" height="30" fill="#7a8493" />
      <pattern id="metalGrid" width="14" height="30" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="30" stroke="#5a6470" strokeWidth="0.5" />
      </pattern>
      <rect x="40" y="85" width="200" height="30" fill="url(#metalGrid)" />

      <motion.g
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="60" y="35" width="14" height="50" fill="#0b2b66" />

        <motion.line
          x1="67"
          y1="85"
          x2="67"
          y2="115"
          stroke="#f5851f"
          strokeWidth="2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />

        <motion.circle
          cx="67"
          cy="100"
          r="3"
          fill="#f5851f"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transformOrigin: "67px 100px" }}
        />

        {[1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={i}
            x1="67"
            y1="100"
            x2={67 + Math.cos((i * 70 * Math.PI) / 180) * 8}
            y2={100 + Math.sin((i * 70 * Math.PI) / 180) * 8}
            stroke="#f5851f"
            strokeWidth="0.8"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">TĂIERE LASER</text>
    </svg>
  );
}
