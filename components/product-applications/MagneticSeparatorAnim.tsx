"use client";

import { motion } from "motion/react";

export function MagneticSeparatorAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="40" y="78" width="200" height="6" fill="#0b2b66" rx="1" />
      <motion.line
        x1="40"
        y1="81"
        x2="240"
        y2="81"
        stroke="#1e6bb8"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      <g>
        <rect x="80" y="40" width="35" height="32" rx="3" fill="#f5851f" />
        <rect x="86" y="46" width="23" height="20" fill="#fff" opacity="0.3" />
        <text x="98" y="60" textAnchor="middle" fontSize="9" fill="#fff" fontWeight="700" fontFamily="ui-monospace, monospace">N S</text>
      </g>

      <motion.g
        animate={{ y: [25, -2, 25] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
      >
        <rect x="92" y="76" width="4" height="3" fill="#7a8493" />
        <rect x="100" y="74" width="3" height="3" fill="#7a8493" />
      </motion.g>

      <motion.g
        animate={{ x: [40, 240], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.85, 1] }}
      >
        <circle cx="0" cy="78" r="2.5" fill="#a89077" />
      </motion.g>

      <motion.g
        animate={{ x: [40, 240], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1, times: [0, 0.1, 0.85, 1] }}
      >
        <rect x="-2" y="76" width="4" height="3" fill="#a89077" />
      </motion.g>

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">SEPARARE MAGNETICĂ</text>
      <text x="140" y="135" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">metale ↑ · neferoase →</text>
    </svg>
  );
}
