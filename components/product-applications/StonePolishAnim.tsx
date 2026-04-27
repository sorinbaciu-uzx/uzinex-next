"use client";

import { motion } from "motion/react";

export function StonePolishAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <defs>
        <pattern id="granite" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="#cdd7e4" />
          <circle cx="2" cy="2" r="0.7" fill="#7a8493" />
          <circle cx="4.5" cy="4.5" r="0.5" fill="#0b2b66" opacity="0.6" />
          <circle cx="5" cy="1" r="0.4" fill="#a89077" />
        </pattern>
      </defs>

      <rect x="30" y="80" width="220" height="30" fill="url(#granite)" />

      <motion.rect
        x="30"
        y="80"
        width="0"
        height="30"
        fill="#cdd7e4"
        animate={{ width: [0, 220, 220, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.85, 1] }}
        style={{ filter: "brightness(1.15) saturate(0.6)" }}
      />

      <motion.g
        animate={{ x: [0, 180, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="55" width="20" height="22" fill="#0b2b66" />
        <motion.circle
          cx="50"
          cy="92"
          r="14"
          fill="#1e6bb8"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 92px" }}
        />
        <motion.circle
          cx="50"
          cy="92"
          r="14"
          fill="none"
          stroke="#f5851f"
          strokeWidth="0.8"
          strokeDasharray="3 4"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 92px" }}
        />
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">PRELUCRARE PIATRĂ</text>
    </svg>
  );
}
