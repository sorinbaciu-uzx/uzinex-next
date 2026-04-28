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

export function FoodFactoryAnim() {
  return (
    <BlueprintFrame uid="food-factory" title="Producție băuturi" code="UZX-BEV">
      {/* conveyor */}
      <rect x="20" y="95" width="240" height="10" rx="5" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <motion.line
        x1="20" y1="100" x2="260" y2="100"
        stroke={NAVY}
        strokeWidth="0.3"
        strokeDasharray="3 1.5"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      {/* bottle outlines moving along */}
      {[
        { x: 60 },
        { x: 110 },
        { x: 160 },
        { x: 210 },
      ].map((b, i) => (
        <motion.g
          key={i}
          animate={{ x: [b.x - 80, b.x + 200] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 1.25 }}
        >
          {/* bottle body */}
          <rect x="0" y="62" width="14" height="33" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.5" />
          {/* cap */}
          <rect x="3" y="58" width="8" height="6" rx="1" fill="none" stroke={ORANGE} strokeWidth="0.5" />
          {/* label area */}
          <rect x="2" y="73" width="10" height="9" fill="none" stroke={NAVY} strokeWidth="0.3" />
          <line x1="3" y1="76" x2="11" y2="76" stroke={NAVY} strokeWidth="0.3" />
          <line x1="3" y1="79" x2="9" y2="79" stroke={NAVY} strokeWidth="0.25" />
          {/* fill level marker */}
          <line x1="0" y1="68" x2="14" y2="68" stroke={ORANGE} strokeWidth="0.3" strokeDasharray="1 0.8" />
        </motion.g>
      ))}

      {/* category notes */}
      <text x="140" y="40" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        ALIMENTAR · COSMETIC · FARMACEUTIC
      </text>

      <Dim x1={20} y1={106} x2={260} y2={106} label="3 000" side="bottom" delay={0.8} offset={6} />
    </BlueprintFrame>
  );
}
