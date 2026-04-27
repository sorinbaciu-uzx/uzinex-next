"use client";

import { motion } from "motion/react";

export function ExcavatorArmAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="0" y1="115" x2="280" y2="115" stroke="#cdd7e4" strokeWidth="1.4" />

      <rect x="10" y="85" width="80" height="20" fill="#0b2b66" rx="3" />
      <ellipse cx="30" cy="115" rx="15" ry="6" fill="#0b2b66" />
      <ellipse cx="70" cy="115" rx="15" ry="6" fill="#0b2b66" />
      <rect x="35" y="65" width="40" height="22" fill="#1e6bb8" rx="2" />
      <rect x="40" y="68" width="20" height="14" fill="#0b2b66" />

      <motion.g
        style={{ transformOrigin: "70px 70px" }}
        animate={{ rotate: [0, -25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="70" y1="70" x2="160" y2="40" stroke="#0b2b66" strokeWidth="6" strokeLinecap="round" />

        <motion.g
          style={{ transformOrigin: "160px 40px" }}
          animate={{ rotate: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="160" y1="40" x2="220" y2="80" stroke="#0b2b66" strokeWidth="5" strokeLinecap="round" />

          <motion.g
            style={{ transformOrigin: "220px 80px" }}
            animate={{ rotate: [0, 35, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M210 70 L240 70 L250 100 L215 100 Z" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.4" />
            <path d="M218 100 L222 106 M228 100 L232 106 M238 100 L242 106" stroke="#0b2b66" strokeWidth="1.2" />
          </motion.g>
        </motion.g>
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">EXCAVATOR · TEREN</text>
    </svg>
  );
}
