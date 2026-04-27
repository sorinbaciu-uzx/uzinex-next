"use client";

import { motion } from "motion/react";

export function ElectronicBoardAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="50" y="40" width="180" height="80" rx="3" fill="#1e6bb8" />
      <rect x="55" y="45" width="170" height="70" rx="2" fill="#0b2b66" opacity="0.85" />

      {[
        { x: 70, y: 60, w: 18, h: 14 },
        { x: 100, y: 60, w: 14, h: 14 },
        { x: 120, y: 60, w: 22, h: 10 },
        { x: 150, y: 60, w: 12, h: 14 },
        { x: 170, y: 60, w: 18, h: 12 },
        { x: 195, y: 60, w: 14, h: 14 },

        { x: 70, y: 85, w: 14, h: 18 },
        { x: 95, y: 85, w: 22, h: 12 },
        { x: 125, y: 85, w: 18, h: 14 },
        { x: 155, y: 90, w: 12, h: 8 },
        { x: 175, y: 85, w: 22, h: 16 },
      ].map((c, i) => (
        <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} fill="#7a8493" rx="0.5" />
      ))}

      {[
        "M62 50 L62 115",
        "M82 50 L82 115",
        "M125 50 L125 115",
        "M165 50 L165 115",
        "M210 50 L210 115",
        "M55 75 L225 75",
        "M55 100 L225 100",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke="#f5851f"
          strokeWidth="0.6"
          strokeOpacity="0.5"
          animate={{ strokeOpacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {[
        { cx: 75, cy: 105 },
        { cx: 140, cy: 50 },
        { cx: 200, cy: 110 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx}
          cy={p.cy}
          r="2"
          fill="#f5851f"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.6, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.4 }}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
        />
      ))}

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">DEEE · ELECTRONICĂ</text>
    </svg>
  );
}
