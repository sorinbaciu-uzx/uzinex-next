"use client";

import { motion } from "motion/react";

export function DemolitionShearsAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="68" width="200" height="14" fill="#7a8493" />
      <rect x="40" y="68" width="200" height="14" fill="url(#metalLines)" />
      <pattern id="metalLines" width="10" height="14" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="14" stroke="#5a6470" strokeWidth="0.6" />
      </pattern>

      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: [-30, -3, -30] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,40 180,60 175,75 110,68" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.4" />
        <line x1="115" y1="58" x2="170" y2="68" stroke="#0b2b66" strokeWidth="0.8" />
      </motion.g>

      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: [30, 3, 30] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,110 180,90 175,75 110,82" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.4" />
        <line x1="115" y1="92" x2="170" y2="82" stroke="#0b2b66" strokeWidth="0.8" />
      </motion.g>

      <circle cx="140" cy="75" r="4" fill="#f5851f" />

      {[145, 155, 165].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1={70}
          x2={x + 8}
          y2={62}
          stroke="#f5851f"
          strokeWidth="1.4"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 + i * 0.05 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">FOARFECĂ HIDRAULICĂ</text>
    </svg>
  );
}
