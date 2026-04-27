"use client";

import { motion } from "motion/react";

export function ExcavatorBucketAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />
      <line x1="0" y1="115" x2="280" y2="115" stroke="#cdd7e4" strokeWidth="1.4" />
      <pattern id="dirt" width="6" height="6" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="0.6" fill="#a89077" />
      </pattern>
      <rect x="0" y="115" width="280" height="30" fill="url(#dirt)" opacity="0.4" />

      <motion.g
        style={{ transformOrigin: "60px 50px" }}
        animate={{ rotate: [0, 35, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="60" y1="50" x2="190" y2="80" stroke="#0b2b66" strokeWidth="6" strokeLinecap="round" />
        <circle cx="60" cy="50" r="4" fill="#f5851f" />

        <motion.g
          style={{ transformOrigin: "190px 80px" }}
          animate={{ rotate: [10, -25, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M180 70 L210 70 L220 95 L185 100 Z" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.5" />
          <path d="M183 99 L188 105 M193 99 L198 105 M203 99 L208 105" stroke="#0b2b66" strokeWidth="1.4" />
        </motion.g>
      </motion.g>

      {[140, 165, 190].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy="120"
          r="2"
          fill="#a89077"
          animate={{ y: [0, -8, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">EXCAVARE · NIVELARE</text>
    </svg>
  );
}
