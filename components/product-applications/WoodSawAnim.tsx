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

export function WoodSawAnim() {
  return (
    <BlueprintFrame uid="wood-saw" title="Debitare lemn" code="UZX-SAW" axes={["X", "Z"]}>
      {/* workpiece — wood plank */}
      <rect x="40" y="85" width="200" height="20" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* wood grain hint */}
      <line x1="40" y1="90" x2="240" y2="90" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
      <line x1="40" y1="96" x2="240" y2="96" stroke={ANNOT} strokeWidth="0.25" opacity="0.5" />
      <line x1="40" y1="100" x2="240" y2="100" stroke={ANNOT} strokeWidth="0.2" opacity="0.5" />

      {/* cut path */}
      <motion.line
        x1="50" y1="92" x2="230" y2="92"
        stroke={ORANGE} strokeWidth="0.5" strokeDasharray="2.5 1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* saw assembly sliding */}
      <motion.g
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* arbor */}
        <rect x="55" y="50" width="6" height="35" fill={NAVY} />

        {/* spinning blade */}
        <motion.g
          style={{ transformOrigin: "58px 90px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="58" cy="90" r="14" fill="rgba(11,43,102,0.05)" stroke={NAVY} strokeWidth="0.5" />
          <circle cx="58" cy="90" r="10" fill="none" stroke={NAVY} strokeWidth="0.4" />
          <circle cx="58" cy="90" r="2" fill={NAVY} />
          <line x1="44" y1="90" x2="72" y2="90" stroke={NAVY} strokeWidth="0.3" />
          <line x1="58" y1="76" x2="58" y2="104" stroke={NAVY} strokeWidth="0.3" />
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i * 22.5 * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={58 + Math.cos(a) * 11}
                y1={90 + Math.sin(a) * 11}
                x2={58 + Math.cos(a) * 14}
                y2={90 + Math.sin(a) * 14}
                stroke={ORANGE}
                strokeWidth="0.7"
              />
            );
          })}
        </motion.g>
      </motion.g>

      {/* sawdust particles */}
      {[80, 100, 120, 140, 160, 180, 200].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy="115"
          r="1"
          fill={NAVY}
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      <Dim x1={40} y1={105} x2={240} y2={105} label="2 000" side="bottom" delay={1.0} offset={6} />
      <text x="140" y="38" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace" textAnchor="middle">
        Ø 350 · S = 4 200 RPM
      </text>
    </BlueprintFrame>
  );
}
