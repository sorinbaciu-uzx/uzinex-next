"use client";

import { motion } from "motion/react";

export function EdgeBandingAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        animate={{ x: [-50, 80, -50] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <rect x="60" y="55" width="150" height="32" rx="1" fill="#a89077" />
        <line x1="60" y1="62" x2="210" y2="62" stroke="#7a5d3f" strokeWidth="0.6" />
        <line x1="60" y1="71" x2="210" y2="71" stroke="#7a5d3f" strokeWidth="0.5" />
        <line x1="60" y1="80" x2="210" y2="80" stroke="#7a5d3f" strokeWidth="0.4" />

        <motion.rect
          x="60"
          y="87"
          width="150"
          height="3"
          fill="#1e6bb8"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.g>

      <line x1="0" y1="105" x2="280" y2="105" stroke="#cdd7e4" strokeWidth="1.2" />

      <g transform="translate(150 100)">
        <rect x="0" y="-15" width="14" height="28" fill="#0b2b66" />
        <motion.rect
          x="3"
          y="-12"
          width="8"
          height="22"
          fill="#f5851f"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <text x="7" y="-20" textAnchor="middle" fontSize="6" fill="#0b2b66" fontFamily="ui-monospace, monospace">HOT</text>
      </g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">APLICARE CANT</text>
    </svg>
  );
}
