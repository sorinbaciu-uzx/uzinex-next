"use client";

import { motion } from "motion/react";

export function QuickCouplerAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="60" y1="35" x2="140" y2="60" stroke="#0b2b66" strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="35" r="4" fill="#f5851f" />
      <rect x="130" y="55" width="22" height="14" rx="2" fill="#0b2b66" />

      <motion.g
        animate={{ y: [-30, 0, 0, -30] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
      >
        <rect x="125" y="80" width="32" height="14" rx="2" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
        <circle cx="135" cy="87" r="2" fill="#0b2b66" />
        <circle cx="147" cy="87" r="2" fill="#0b2b66" />
      </motion.g>

      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.85, 1] }}
      >
        <path d="M120 95 L120 130 L160 130 L160 95" stroke="#1e6bb8" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <text x="140" y="120" textAnchor="middle" fontSize="8" fill="#1e6bb8" fontFamily="ui-monospace, monospace">CUPLAT</text>
      </motion.g>

      <motion.circle
        cx="141"
        cy="73"
        r="4"
        fill="#f5851f"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">CUPLAJ RAPID</text>
    </svg>
  );
}
