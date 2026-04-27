"use client";

import { motion } from "motion/react";

export function ShredderTwinAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <motion.g
        animate={{ y: [-25, 5, -25] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", times: [0, 0.6, 1] }}
      >
        {[
          { x: 120, y: 30, c: "#f5851f" },
          { x: 140, y: 22, c: "#1e6bb8" },
          { x: 160, y: 28, c: "#0b2b66" },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width="10" height="6" fill={b.c} rx="1" />
        ))}
      </motion.g>

      <rect x="100" y="58" width="80" height="40" fill="#cdd7e4" stroke="#0b2b66" strokeWidth="1.5" />

      <motion.g
        style={{ transformOrigin: "125px 78px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="125" cy="78" r="10" fill="#0b2b66" />
        {[0, 90, 180, 270].map((a) => (
          <rect
            key={a}
            x="123"
            y="68"
            width="4"
            height="10"
            fill="#f5851f"
            transform={`rotate(${a} 125 78)`}
          />
        ))}
      </motion.g>

      <motion.g
        style={{ transformOrigin: "155px 78px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="155" cy="78" r="10" fill="#0b2b66" />
        {[45, 135, 225, 315].map((a) => (
          <rect
            key={a}
            x="153"
            y="68"
            width="4"
            height="10"
            fill="#f5851f"
            transform={`rotate(${a} 155 78)`}
          />
        ))}
      </motion.g>

      {[125, 135, 145, 155].map((x, i) => (
        <motion.circle
          key={i}
          cx={x}
          cy="115"
          r="2"
          fill="#7a8493"
          animate={{ y: [0, 16, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      <text x="140" y="138" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">TOCARE 2 AXE</text>
    </svg>
  );
}
