"use client";

import { motion } from "motion/react";

export function LatheSpinningAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="20" y="100" width="240" height="14" fill="#cdd7e4" />

      <rect x="40" y="55" width="30" height="40" fill="#0b2b66" />
      <rect x="44" y="65" width="22" height="20" fill="#f5851f" />

      <rect x="210" y="60" width="30" height="35" fill="#0b2b66" />
      <polygon points="210,77 200,77 200,82 210,82" fill="#0b2b66" />

      <motion.g
        style={{ transformOrigin: "140px 78px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      >
        <rect x="70" y="65" width="130" height="26" rx="3" fill="#7a8493" />
        <line x1="80" y1="68" x2="80" y2="88" stroke="#5a6470" strokeWidth="0.6" />
        <line x1="120" y1="68" x2="120" y2="88" stroke="#5a6470" strokeWidth="0.6" />
        <line x1="160" y1="68" x2="160" y2="88" stroke="#5a6470" strokeWidth="0.6" />
        <line x1="190" y1="68" x2="190" y2="88" stroke="#5a6470" strokeWidth="0.6" />
      </motion.g>

      <motion.g
        animate={{ x: [0, 70, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="100" y="32" width="14" height="22" fill="#1e6bb8" />
        <polygon points="103,52 111,52 107,64" fill="#0b2b66" />
      </motion.g>

      {[1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M 130 70 q 12 -${5 + i * 2} 22 0`}
          fill="none"
          stroke="#f5851f"
          strokeWidth="1.2"
          animate={{ opacity: [0, 1, 0], y: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">STRUNJIRE PIESĂ</text>
    </svg>
  );
}
