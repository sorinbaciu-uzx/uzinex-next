"use client";

import { motion } from "motion/react";

export function RipperToothAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="0" y1="105" x2="280" y2="105" stroke="#cdd7e4" strokeWidth="1.4" />
      <pattern id="rockPat" width="10" height="6" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="3" r="0.7" fill="#7a8493" />
        <circle cx="7" cy="2" r="0.5" fill="#a89077" />
      </pattern>
      <rect x="0" y="105" width="280" height="40" fill="url(#rockPat)" opacity="0.5" />

      <motion.g
        animate={{ x: [-20, 30, -20] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="120" y="50" width="40" height="22" rx="2" fill="#0b2b66" />
        <polygon points="125,72 135,72 132,100 128,100" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
        <polygon points="138,72 148,72 145,105 141,105" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
        <polygon points="151,72 161,72 158,100 154,100" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="128" y1="100" x2="160" y2="105" stroke="#f5851f" strokeWidth="1" strokeDasharray="2 2" />
      </motion.g>

      {[80, 100, 200, 220].map((cx, i) => (
        <motion.path
          key={i}
          d={`M${cx} 110 L${cx + 6} 108 L${cx + 4} 115 L${cx - 2} 113 Z`}
          fill="#7a8493"
          animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">SCARIFICARE TEREN</text>
    </svg>
  );
}
