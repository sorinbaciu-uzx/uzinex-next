"use client";

import { motion } from "motion/react";

export function AutoIndustryAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="0" y1="105" x2="280" y2="105" stroke="#cdd7e4" strokeWidth="1.4" />

      <motion.g
        animate={{ x: [0, 14, 0] }}
        transition={{ duration: 0.4, repeat: Infinity }}
      >
        <path d="M70 90 L75 70 L100 60 L160 60 L185 70 L195 90 Z" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.4" />
        <rect x="100" y="64" width="55" height="22" fill="#0b2b66" opacity="0.55" />
        <line x1="125" y1="64" x2="125" y2="86" stroke="#0b2b66" strokeWidth="0.8" />

        <motion.circle
          cx="90"
          cy="100"
          r="11"
          fill="#0b2b66"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "90px 100px" }}
        />
        <motion.circle
          cx="170"
          cy="100"
          r="11"
          fill="#0b2b66"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "170px 100px" }}
        />
        <circle cx="90" cy="100" r="5" fill="#7a8493" />
        <circle cx="170" cy="100" r="5" fill="#7a8493" />
      </motion.g>

      {[210, 220, 230].map((cx, i) => (
        <motion.line
          key={i}
          x1={cx}
          y1={75}
          x2={cx + 8}
          y2={75}
          stroke="#f5851f"
          strokeWidth="1.4"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">INDUSTRIE AUTO</text>
    </svg>
  );
}
