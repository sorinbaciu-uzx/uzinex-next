"use client";

import { motion } from "motion/react";

export function GrabClawAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="140" y1="20" x2="140" y2="55" stroke="#0b2b66" strokeWidth="3" />
      <circle cx="140" cy="58" r="5" fill="#0b2b66" />

      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [12, -2, 12] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M140 60 L100 95 L105 105 L142 75 Z" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
      </motion.g>

      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [-12, 2, -12] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M140 60 L180 95 L175 105 L138 75 Z" fill="#1e6bb8" stroke="#0b2b66" strokeWidth="1.2" />
      </motion.g>

      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [10, 0, 10], scale: [1, 0.9, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M125 60 L120 95 L128 100 L132 70 Z" fill="#0b2b66" />
        <path d="M155 60 L160 95 L152 100 L148 70 Z" fill="#0b2b66" />
      </motion.g>

      <motion.g
        animate={{ y: [0, -6, 0], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 1 }}
      >
        <circle cx="135" cy="100" r="3" fill="#7a8493" />
        <circle cx="142" cy="105" r="2.5" fill="#a89077" />
        <circle cx="146" cy="98" r="2" fill="#7a8493" />
      </motion.g>

      <line x1="0" y1="125" x2="280" y2="125" stroke="#cdd7e4" strokeWidth="1.2" strokeDasharray="3 4" />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">PRINDERE HIDRAULICĂ</text>
    </svg>
  );
}
