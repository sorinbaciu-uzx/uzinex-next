"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function TireRecycleAnim() {
  return (
    <BlueprintFrame uid="tire-recycle" title="Reciclare anvelope" code="UZX-TIR">
      {/* tire — section view */}
      <motion.g
        style={{ transformOrigin: "70px 75px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="70" cy="75" r="32" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <circle cx="70" cy="75" r="22" fill="none" stroke={NAVY} strokeWidth="0.4" />
        <circle cx="70" cy="75" r="14" fill="none" stroke={NAVY} strokeWidth="0.5" />
        <circle cx="70" cy="75" r="6" fill={NAVY} />

        {/* tread blocks */}
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <rect
            key={a}
            x="68" y="46" width="4" height="6"
            fill="none" stroke={NAVY} strokeWidth="0.4"
            transform={`rotate(${a} 70 75)`}
          />
        ))}
        {/* center cross */}
        <line x1="40" y1="75" x2="100" y2="75" stroke={NAVY} strokeWidth="0.3" strokeDasharray="2 1" />
        <line x1="70" y1="45" x2="70" y2="105" stroke={NAVY} strokeWidth="0.3" strokeDasharray="2 1" />
      </motion.g>

      {/* arrow — process direction */}
      <motion.path
        d="M105 75 L150 75"
        stroke={ORANGE} strokeWidth="0.7" strokeDasharray="3 2"
        animate={{ strokeDashoffset: [0, -7] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
      />
      <polygon points="148,72 156,75 148,78" fill={ORANGE} />

      {/* output: granules */}
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 175 + (i % 7) * 12;
        const y = 55 + Math.floor(i / 7) * 16;
        return (
          <motion.rect
            key={i}
            x={x} y={y} width="4" height="4" rx="0.4"
            fill="none" stroke={NAVY} strokeWidth="0.4"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.08 }}
            style={{ transformOrigin: `${x + 2}px ${y + 2}px` }}
          />
        );
      })}

      <text x="120" y="62" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">CRUMB</text>
      <text x="190" y="100" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">3-5 mm</text>
    </BlueprintFrame>
  );
}
