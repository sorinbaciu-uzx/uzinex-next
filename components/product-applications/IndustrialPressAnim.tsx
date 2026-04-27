"use client";

import { motion } from "motion/react";

export function IndustrialPressAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="60" y="35" width="160" height="14" fill="#0b2b66" />
      <rect x="60" y="100" width="160" height="14" fill="#0b2b66" />
      <rect x="60" y="35" width="10" height="79" fill="#0b2b66" />
      <rect x="210" y="35" width="10" height="79" fill="#0b2b66" />

      <motion.rect
        x="100"
        y="49"
        width="80"
        height="12"
        fill="#1e6bb8"
        animate={{ y: [49, 80, 80, 49] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      />

      <motion.rect
        x="120"
        y="61"
        width="40"
        height="6"
        fill="#7a8493"
        animate={{ y: [61, 92, 92, 61], scaleY: [1, 0.4, 0.4, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
        style={{ transformOrigin: "140px 90px" }}
      />

      <motion.line
        x1="140"
        y1="62"
        x2="140"
        y2="80"
        stroke="#f5851f"
        strokeWidth="0.6"
        strokeDasharray="2 2"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.5, 1] }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">PRESARE INDUSTRIALĂ</text>
    </svg>
  );
}
