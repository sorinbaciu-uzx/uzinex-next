"use client";

import { motion } from "motion/react";

export function StrappingAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="80" y="55" width="120" height="60" fill="#a89077" rx="2" />
      <line x1="80" y1="64" x2="200" y2="64" stroke="#7a5d3f" strokeWidth="0.4" />
      <line x1="80" y1="74" x2="200" y2="74" stroke="#7a5d3f" strokeWidth="0.4" />
      <line x1="80" y1="84" x2="200" y2="84" stroke="#7a5d3f" strokeWidth="0.4" />
      <line x1="80" y1="94" x2="200" y2="94" stroke="#7a5d3f" strokeWidth="0.4" />
      <line x1="80" y1="104" x2="200" y2="104" stroke="#7a5d3f" strokeWidth="0.4" />

      <motion.rect
        x="105"
        y="50"
        width="6"
        height="70"
        fill="#1e6bb8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.4, 1] }}
        style={{ transformOrigin: "108px 50px" }}
      />

      <motion.rect
        x="165"
        y="50"
        width="6"
        height="70"
        fill="#1e6bb8"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.4, 0.7, 1] }}
        style={{ transformOrigin: "168px 50px" }}
      />

      <motion.g
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{ transformOrigin: "108px 85px" }}
      >
        <circle cx="108" cy="85" r="2.5" fill="#f5851f" />
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">LEGARE BANDĂ</text>
    </svg>
  );
}
