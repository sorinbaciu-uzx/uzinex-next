"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  Dim,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function RipperToothAnim() {
  return (
    <BlueprintFrame uid="ripper" title="Scarificare teren" code="UZX-RIP">
      {/* ground line */}
      <line x1="0" y1="105" x2="280" y2="105" stroke={ANNOT} strokeWidth="0.5" />

      {/* ground hatching (rocks below) */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1={5 + i * 11} y1="115" x2={11 + i * 11} y2="105" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* ripper assembly — moves left/right */}
      <motion.g
        animate={{ x: [-15, 25, -15] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* mounting bracket */}
        <rect x="120" y="50" width="40" height="22" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        {/* mounting holes */}
        <circle cx="128" cy="61" r="1.4" fill="none" stroke={NAVY} strokeWidth="0.3" />
        <circle cx="152" cy="61" r="1.4" fill="none" stroke={NAVY} strokeWidth="0.3" />

        {/* 3 teeth */}
        {[125, 138, 151].map((x, i) => (
          <g key={i}>
            <polygon
              points={`${x},72 ${x + 10},72 ${x + 7},${100 + (i === 1 ? 5 : 0)} ${x + 3},${100 + (i === 1 ? 5 : 0)}`}
              fill={FILL_NAVY}
              stroke={NAVY}
              strokeWidth="0.7"
            />
          </g>
        ))}

        {/* depth line */}
        <line x1="128" y1="100" x2="160" y2="105" stroke={ORANGE} strokeWidth="0.5" strokeDasharray="2 1.5" />
      </motion.g>

      {/* fragments breaking from ground */}
      {[80, 100, 200, 220].map((cx, i) => (
        <motion.path
          key={i}
          d={`M${cx} 110 L${cx + 5} 108 L${cx + 4} 113 L${cx - 1} 112 Z`}
          fill="none"
          stroke={NAVY}
          strokeWidth="0.4"
          animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <Dim x1={120} y1={45} x2={160} y2={45} label="L 600" side="top" delay={1.0} offset={6} />
      <text x="180" y="90" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">H 280 mm</text>
    </BlueprintFrame>
  );
}
