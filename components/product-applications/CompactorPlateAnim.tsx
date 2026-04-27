"use client";

import { motion } from "motion/react";

export function CompactorPlateAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="0" y1="115" x2="280" y2="115" stroke="#cdd7e4" strokeWidth="1.4" />
      <pattern id="soilPat" width="6" height="8" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="4" r="0.6" fill="#a89077" />
      </pattern>
      <rect x="0" y="115" width="280" height="30" fill="url(#soilPat)" opacity="0.5" />

      <motion.g
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="80" y="55" width="120" height="20" fill="#0b2b66" rx="2" />
        <rect x="86" y="60" width="108" height="10" fill="#1e6bb8" />

        <rect x="100" y="75" width="80" height="6" fill="#0b2b66" />
        <rect x="90" y="81" width="100" height="22" fill="#7a8493" />
        <line x1="92" y1="92" x2="188" y2="92" stroke="#0b2b66" strokeWidth="0.6" />
      </motion.g>

      <motion.g
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 110px" }}
      >
        <ellipse cx="140" cy="110" rx="55" ry="4" fill="none" stroke="#f5851f" strokeWidth="1.4" />
      </motion.g>

      {[60, 80, 200, 220].map((cx, i) => (
        <motion.path
          key={i}
          d={`M${cx} 113 L${cx + 4} 110 L${cx + 2} 117 Z`}
          fill="#a89077"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">COMPACTARE · VIBRARE</text>
    </svg>
  );
}
