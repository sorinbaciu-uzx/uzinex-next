"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function DemolitionShearsAnim() {
  return (
    <BlueprintFrame uid="demo-shears" title="Foarfecă hidraulică" code="UZX-DSH">
      {/* metal beam being cut */}
      <rect x="40" y="68" width="200" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* corrugation lines */}
      {Array.from({ length: 18 }).map((_, i) => (
        <line key={i} x1={45 + i * 11} y1="68" x2={45 + i * 11} y2="82" stroke={NAVY} strokeWidth="0.3" opacity="0.5" />
      ))}

      {/* upper jaw */}
      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: [-25, -3, -25] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,40 180,60 175,75 110,68" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="115" y1="58" x2="170" y2="68" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* lower jaw */}
      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: [25, 3, 25] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,110 180,90 175,75 110,82" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="115" y1="92" x2="170" y2="82" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* pivot */}
      <circle cx="140" cy="75" r="2.4" fill="none" stroke={ORANGE} strokeWidth="0.6" />
      <circle cx="140" cy="75" r="1" fill={ORANGE} />

      {/* sparks */}
      {[145, 155, 165].map((x, i) => (
        <motion.line
          key={i}
          x1={x} y1={70} x2={x + 6} y2={62}
          stroke={ORANGE} strokeWidth="0.6"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 + i * 0.05 }}
        />
      ))}

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        F MAX 720 kN · OPENING 580 mm
      </text>
    </BlueprintFrame>
  );
}
