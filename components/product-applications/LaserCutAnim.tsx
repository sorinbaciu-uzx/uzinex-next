"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  Dim,
  Annotation,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function LaserCutAnim() {
  return (
    <BlueprintFrame uid="laser-cut" title="Tăiere laser fiber" code="UZX-LSR" axes={["X", "Y"]}>
      {/* metal plate */}
      <rect x="40" y="90" width="200" height="22" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* metal grid hint */}
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={i} x1={48 + i * 14} y1="90" x2={48 + i * 14} y2="112" stroke={ANNOT} strokeWidth="0.2" opacity="0.5" />
      ))}

      {/* cut path */}
      <motion.line
        x1="50" y1="101" x2="230" y2="101"
        stroke={ORANGE} strokeWidth="0.6" strokeDasharray="3 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "loop", ease: "linear" }}
      />

      {/* laser head + spark */}
      <motion.g
        animate={{ x: [0, 180, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <rect x="48" y="55" width="6" height="38" fill={NAVY} />
        <rect x="49" y="58" width="4" height="32" fill="rgba(11,43,102,0.20)" stroke={NAVY} strokeWidth="0.3" />

        <line x1="51" y1="93" x2="51" y2="101" stroke={ORANGE} strokeWidth="1" />

        <motion.circle
          cx="51" cy="101" r="2"
          fill={ORANGE}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.5, 0.8] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: "51px 101px" }}
        />

        {/* sparks */}
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.line
            key={i}
            x1="51"
            y1="101"
            x2={51 + Math.cos((i * 70 * Math.PI) / 180) * 6}
            y2={101 + Math.sin((i * 70 * Math.PI) / 180) * 6}
            stroke={ORANGE}
            strokeWidth="0.4"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </motion.g>

      <Dim x1={40} y1={90} x2={240} y2={90} label="200" side="top" delay={1.0} offset={6} />
      <Annotation x={170} y={101} tx={210} ty={58} text="KERF 0.1 mm" delay={1.4} />
    </BlueprintFrame>
  );
}
