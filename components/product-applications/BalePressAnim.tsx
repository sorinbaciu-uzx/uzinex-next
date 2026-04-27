"use client";

import { motion } from "motion/react";

export function BalePressAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="80" y="35" width="120" height="18" fill="#0b2b66" />
      <rect x="115" y="53" width="50" height="6" fill="#1e6bb8" />

      <motion.g
        animate={{ y: [0, 30, 30, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      >
        <rect x="100" y="59" width="80" height="8" fill="#f5851f" />
        <rect x="120" y="67" width="40" height="6" fill="#0b2b66" />
      </motion.g>

      <rect x="85" y="100" width="110" height="20" fill="#0b2b66" />

      <motion.g
        animate={{ scale: [1, 0.7, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
        style={{ transformOrigin: "140px 110px" }}
      >
        <rect x="90" y="80" width="100" height="35" fill="#a89077" rx="1" />
        <line x1="90" y1="88" x2="190" y2="88" stroke="#7a5d3f" strokeWidth="0.5" />
        <line x1="90" y1="96" x2="190" y2="96" stroke="#7a5d3f" strokeWidth="0.5" />
        <line x1="90" y1="104" x2="190" y2="104" stroke="#7a5d3f" strokeWidth="0.5" />
        <line x1="90" y1="112" x2="190" y2="112" stroke="#7a5d3f" strokeWidth="0.5" />
        <line x1="105" y1="80" x2="105" y2="115" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="140" y1="80" x2="140" y2="115" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="175" y1="80" x2="175" y2="115" stroke="#1e6bb8" strokeWidth="1" />
      </motion.g>

      <motion.line
        x1="80"
        y1="62"
        x2="200"
        y2="62"
        stroke="#f5851f"
        strokeWidth="0.6"
        strokeDasharray="3 4"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">BALOTAT · PRESARE</text>
    </svg>
  );
}
