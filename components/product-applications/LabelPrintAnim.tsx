"use client";

import { motion } from "motion/react";

export function LabelPrintAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="40" width="80" height="50" fill="#0b2b66" rx="2" />
      <rect x="50" y="50" width="60" height="30" fill="#1e6bb8" rx="1" />
      <motion.line
        x1="50"
        y1="65"
        x2="110"
        y2="65"
        stroke="#f5851f"
        strokeWidth="1.4"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      <motion.g
        animate={{ x: [0, 90, 90, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      >
        <rect x="125" y="58" width="35" height="22" fill="#fff" stroke="#0b2b66" strokeWidth="1" />
        <line x1="130" y1="64" x2="155" y2="64" stroke="#0b2b66" strokeWidth="0.8" />
        <line x1="130" y1="68" x2="150" y2="68" stroke="#0b2b66" strokeWidth="0.5" />
        <rect x="130" y="71" width="2" height="6" fill="#0b2b66" />
        <rect x="133" y="71" width="1" height="6" fill="#0b2b66" />
        <rect x="135" y="71" width="3" height="6" fill="#0b2b66" />
        <rect x="139" y="71" width="1" height="6" fill="#0b2b66" />
        <rect x="141" y="71" width="2" height="6" fill="#0b2b66" />
        <rect x="144" y="71" width="2" height="6" fill="#0b2b66" />
        <rect x="147" y="71" width="1" height="6" fill="#0b2b66" />
        <rect x="149" y="71" width="3" height="6" fill="#0b2b66" />
      </motion.g>

      <line x1="20" y1="105" x2="260" y2="105" stroke="#cdd7e4" strokeWidth="1.2" />

      <rect x="200" y="80" width="50" height="30" fill="#a89077" rx="1" />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">ETICHETARE AUTOMATĂ</text>
    </svg>
  );
}
