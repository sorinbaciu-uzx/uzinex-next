"use client";

import { motion } from "motion/react";

export function HeatPumpAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <circle cx="140" cy="75" r="46" fill="none" stroke="#1e6bb8" strokeWidth="1.4" strokeDasharray="3 3" />

      <g transform="translate(60 50)">
        <rect x="0" y="0" width="40" height="50" fill="#0b2b66" rx="2" />
        <line x1="5" y1="10" x2="35" y2="10" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="5" y1="18" x2="35" y2="18" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="5" y1="26" x2="35" y2="26" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="5" y1="34" x2="35" y2="34" stroke="#1e6bb8" strokeWidth="1" />
        <line x1="5" y1="42" x2="35" y2="42" stroke="#1e6bb8" strokeWidth="1" />
        <motion.circle
          cx="20"
          cy="25"
          r="6"
          fill="none"
          stroke="#f5851f"
          strokeWidth="1.4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "20px 25px" }}
        />
        <motion.line
          x1="20"
          y1="25"
          x2="20"
          y2="19"
          stroke="#f5851f"
          strokeWidth="1.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "20px 25px" }}
        />
      </g>

      <g transform="translate(180 50)">
        <rect x="0" y="0" width="40" height="50" fill="#0b2b66" rx="2" />
        <rect x="6" y="6" width="28" height="38" fill="#1e6bb8" rx="1" />
        <text x="20" y="30" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" fontFamily="ui-monospace, monospace">19–35 kW</text>
      </g>

      <motion.path
        d="M100 60 Q140 50 180 60"
        fill="none"
        stroke="#f5851f"
        strokeWidth="1.6"
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.path
        d="M180 90 Q140 100 100 90"
        fill="none"
        stroke="#1e6bb8"
        strokeWidth="1.6"
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">CICLU AER · APĂ</text>
    </svg>
  );
}
