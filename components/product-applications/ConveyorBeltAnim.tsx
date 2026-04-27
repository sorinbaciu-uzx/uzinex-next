"use client";

import { motion } from "motion/react";

export function ConveyorBeltAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="20" y="80" width="240" height="14" fill="#0b2b66" rx="7" />

      <motion.g
        animate={{ x: [-20, 0, -20] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={20 + i * 18} y={84} width="10" height="6" fill="#f5851f" rx="1" opacity={0.7} />
        ))}
      </motion.g>

      <circle cx="35" cy="87" r="11" fill="#0b2b66" />
      <circle cx="245" cy="87" r="11" fill="#0b2b66" />
      <motion.circle
        cx="35"
        cy="87"
        r="6"
        fill="#1e6bb8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "35px 87px" }}
      />
      <motion.circle
        cx="245"
        cy="87"
        r="6"
        fill="#1e6bb8"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "245px 87px" }}
      />

      {[
        { x: 60, c: "#7a8493", w: 8, h: 6 },
        { x: 110, c: "#a89077", w: 6, h: 5 },
        { x: 165, c: "#1e6bb8", w: 9, h: 7 },
        { x: 210, c: "#f5851f", w: 7, h: 5 },
      ].map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={75 - b.h}
          width={b.w}
          height={b.h}
          fill={b.c}
          rx="1"
          animate={{ x: [b.x - 80, b.x + 200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">BANDĂ TRANSPORTOARE</text>
    </svg>
  );
}
