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

export function EdgeBandingAnim() {
  return (
    <BlueprintFrame uid="edge-banding" title="Aplicare cant" code="UZX-EDG" axes={["X", "Z"]}>
      {/* base */}
      <line x1="20" y1="105" x2="260" y2="105" stroke={ANNOT} strokeWidth="0.4" />

      {/* hot melt applicator */}
      <g transform="translate(150 100)">
        <rect x="0" y="-15" width="14" height="28" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <motion.rect
          x="3" y="-12" width="8" height="22"
          fill="rgba(245,133,31,0.20)" stroke={ORANGE} strokeWidth="0.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <text x="7" y="-18" textAnchor="middle" fontSize="3.5" fill={ORANGE} fontFamily="ui-monospace, monospace">HOT</text>
      </g>

      {/* panel sliding past */}
      <motion.g
        animate={{ x: [-50, 80, -50] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <rect x="60" y="55" width="150" height="32" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="60" y1="62" x2="210" y2="62" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
        <line x1="60" y1="71" x2="210" y2="71" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
        <line x1="60" y1="80" x2="210" y2="80" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />

        {/* edge band being applied */}
        <motion.rect
          x="60" y="87" width="150" height="3"
          fill="rgba(245,133,31,0.20)" stroke={ORANGE} strokeWidth="0.4"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.g>

      <Dim x1={60} y1={50} x2={210} y2={50} label="L 1 500" side="top" delay={1.0} offset={6} />
      <text x="220" y="60" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">T 200 °C</text>
    </BlueprintFrame>
  );
}
