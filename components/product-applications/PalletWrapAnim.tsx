"use client";

import { motion } from "motion/react";

export function PalletWrapAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <ellipse cx="140" cy="120" rx="55" ry="6" fill="#cdd7e4" />

      <rect x="100" y="105" width="80" height="12" fill="#a89077" />
      <line x1="100" y1="111" x2="180" y2="111" stroke="#7a5d3f" strokeWidth="0.6" />
      <rect x="105" y="113" width="6" height="3" fill="#7a5d3f" />
      <rect x="135" y="113" width="6" height="3" fill="#7a5d3f" />
      <rect x="170" y="113" width="6" height="3" fill="#7a5d3f" />

      <rect x="110" y="55" width="60" height="50" fill="#1e6bb8" />
      <rect x="110" y="55" width="60" height="50" fill="#0b2b66" opacity="0.2" />
      <line x1="115" y1="68" x2="165" y2="68" stroke="#0b2b66" strokeWidth="0.6" />
      <line x1="115" y1="80" x2="165" y2="80" stroke="#0b2b66" strokeWidth="0.6" />
      <line x1="115" y1="92" x2="165" y2="92" stroke="#0b2b66" strokeWidth="0.6" />

      {[60, 70, 80, 90, 100].map((cy, i) => (
        <motion.ellipse
          key={i}
          cx="140"
          cy={cy}
          rx="35"
          ry="4"
          fill="none"
          stroke="#f5851f"
          strokeWidth="1.4"
          strokeOpacity="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.4,
            times: [0, 0.4, 1],
          }}
        />
      ))}

      <motion.circle
        cx="200"
        cy="80"
        r="3"
        fill="#f5851f"
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "140px 80px" }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">AMBALARE PALEȚI</text>
    </svg>
  );
}
