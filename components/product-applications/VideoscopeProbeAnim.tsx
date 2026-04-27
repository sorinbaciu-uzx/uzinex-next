"use client";

import { motion } from "motion/react";

export function VideoscopeProbeAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="200" y="60" width="50" height="40" fill="#0b2b66" rx="3" />
      <rect x="206" y="66" width="38" height="22" fill="#1e6bb8" rx="1" />
      <motion.line
        x1="206"
        y1="78"
        x2="244"
        y2="78"
        stroke="#f5851f"
        strokeWidth="1"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <circle cx="218" cy="94" r="2" fill="#f5851f" />
      <circle cx="226" cy="94" r="2" fill="#1e6bb8" />
      <circle cx="234" cy="94" r="2" fill="#1e6bb8" />

      <motion.path
        d="M200 80 Q150 80 100 65 Q70 55 60 80"
        fill="none"
        stroke="#0b2b66"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
      />

      <motion.g
        animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="100" cy="65" r="4" fill="#f5851f" />
        <circle cx="100" cy="65" r="1.5" fill="#fff" />
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">SONDĂ ARTICULATĂ</text>
      <text x="140" y="135" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">acces zone greu accesibile</text>
    </svg>
  );
}
