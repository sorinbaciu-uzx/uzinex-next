"use client";

import { motion } from "motion/react";

export function JawCrusherAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {[
          { cx: 110, cy: 30, r: 5 },
          { cx: 140, cy: 22, r: 6 },
          { cx: 170, cy: 30, r: 5 },
          { cx: 130, cy: 40, r: 4 },
        ].map((s, i) => (
          <polygon
            key={i}
            points={`${s.cx},${s.cy - s.r} ${s.cx + s.r},${s.cy} ${s.cx + s.r * 0.5},${s.cy + s.r} ${s.cx - s.r * 0.5},${s.cy + s.r} ${s.cx - s.r},${s.cy}`}
            fill="#7a8493"
          />
        ))}
      </motion.g>

      <motion.g
        style={{ transformOrigin: "100px 80px" }}
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,55 100,100 130,90 125,55" fill="#1e6bb8" />
        <line x1="105" y1="60" x2="125" y2="60" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="106" y1="70" x2="125" y2="68" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="107" y1="80" x2="126" y2="76" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="108" y1="90" x2="127" y2="84" stroke="#0b2b66" strokeWidth="1.2" />
      </motion.g>

      <motion.g
        style={{ transformOrigin: "180px 80px" }}
        animate={{ rotate: [6, -6, 6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="180,55 180,100 150,90 155,55" fill="#1e6bb8" />
        <line x1="155" y1="60" x2="175" y2="60" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="155" y1="70" x2="174" y2="68" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="154" y1="80" x2="173" y2="76" stroke="#0b2b66" strokeWidth="1.2" />
        <line x1="153" y1="90" x2="172" y2="84" stroke="#0b2b66" strokeWidth="1.2" />
      </motion.g>

      {[120, 140, 160].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="120"
          r="2"
          fill="#a89077"
          animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <text x="140" y="138" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">CONCASARE FĂLCI</text>
    </svg>
  );
}
