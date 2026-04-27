"use client";

import { motion } from "motion/react";

export function BoxFormingAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        animate={{ x: [-40, 0, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.3, 0.7, 1] }}
      >
        <rect x="60" y="60" width="100" height="40" fill="#a89077" stroke="#7a5d3f" strokeWidth="1" />
        <line x1="60" y1="60" x2="60" y2="100" stroke="#7a5d3f" strokeWidth="0.8" />
        <line x1="160" y1="60" x2="160" y2="100" stroke="#7a5d3f" strokeWidth="0.8" />
      </motion.g>

      <motion.g
        animate={{ rotateY: [0, 0, 60, 60, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.55, 0.85, 1] }}
        style={{ transformOrigin: "60px 80px" }}
      >
        <rect x="40" y="60" width="20" height="40" fill="#a89077" stroke="#7a5d3f" strokeWidth="1" />
      </motion.g>

      <motion.g
        animate={{ rotateY: [0, 0, -60, -60, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.55, 0.85, 1] }}
        style={{ transformOrigin: "160px 80px" }}
      >
        <rect x="160" y="60" width="20" height="40" fill="#a89077" stroke="#7a5d3f" strokeWidth="1" />
      </motion.g>

      <motion.line
        x1="80"
        y1="60"
        x2="180"
        y2="60"
        stroke="#1e6bb8"
        strokeWidth="2"
        strokeDasharray="3 2"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.85, 1] }}
      />

      <line x1="20" y1="115" x2="260" y2="115" stroke="#cdd7e4" strokeWidth="1.4" />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">FORMARE · SIGILARE CUTII</text>
    </svg>
  );
}
