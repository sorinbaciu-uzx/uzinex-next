"use client";

import { motion } from "motion/react";

export function CncSpindleAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="100" width="200" height="14" fill="#cdd7e4" />
      <rect x="40" y="100" width="200" height="14" fill="url(#wood)" />
      <pattern id="wood" width="20" height="14" patternUnits="userSpaceOnUse">
        <line x1="0" y1="3" x2="20" y2="3" stroke="#a89077" strokeWidth="0.5" />
        <line x1="0" y1="9" x2="20" y2="9" stroke="#a89077" strokeWidth="0.4" opacity="0.6" />
      </pattern>

      <motion.g
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="60" y="30" width="20" height="55" fill="#0b2b66" />
        <rect x="63" y="38" width="14" height="40" fill="#1e6bb8" />

        <motion.g
          style={{ transformOrigin: "70px 95px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="70" cy="95" r="6" fill="#7a8493" />
          <line x1="70" y1="89" x2="70" y2="101" stroke="#0b2b66" strokeWidth="2" />
          <line x1="64" y1="95" x2="76" y2="95" stroke="#0b2b66" strokeWidth="2" />
          <line x1="65" y1="91" x2="75" y2="99" stroke="#0b2b66" strokeWidth="1.4" />
          <line x1="65" y1="99" x2="75" y2="91" stroke="#0b2b66" strokeWidth="1.4" />
        </motion.g>

        <motion.line
          x1="70"
          y1="100"
          x2="70"
          y2="105"
          stroke="#f5851f"
          strokeWidth="1.4"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      </motion.g>

      <motion.line
        x1="38"
        y1="100"
        x2="240"
        y2="100"
        stroke="#f5851f"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">FREZARE CNC</text>
    </svg>
  );
}
