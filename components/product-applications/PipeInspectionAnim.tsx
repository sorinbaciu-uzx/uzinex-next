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

export function PipeInspectionAnim() {
  return (
    <BlueprintFrame uid="pipe-insp" title="Inspecție conducte" code="UZX-PIP">
      {/* pipe — section view */}
      <line x1="0" y1="50" x2="280" y2="50" stroke={NAVY} strokeWidth="0.7" />
      <line x1="0" y1="95" x2="280" y2="95" stroke={NAVY} strokeWidth="0.7" />
      <rect x="0" y="50" width="280" height="45" fill={FILL_NAVY} />

      {/* center axis */}
      <line x1="0" y1="72" x2="280" y2="72" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* hatching for cut-away */}
      {[40, 90, 140, 190, 240].map((x, i) => (
        <motion.line
          key={i}
          x1={x} y1="55" x2={x} y2="90"
          stroke={ANNOT} strokeWidth="0.3" strokeDasharray="2 2"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* crawler camera moving right then back */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, 200, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* light cone */}
        <path d="M 42 72 L 105 60 L 105 84 Z" fill="rgba(245,133,31,0.18)" stroke={ORANGE} strokeWidth="0.3" />

        {/* crawler body */}
        <rect x="20" y="64" width="22" height="16" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />

        {/* camera lens */}
        <circle cx="42" cy="72" r="3.5" fill="none" stroke={ORANGE} strokeWidth="0.6" />
        <circle cx="42" cy="72" r="1.5" fill={ORANGE} />

        {/* tracks */}
        <line x1="22" y1="80" x2="40" y2="80" stroke={NAVY} strokeWidth="0.5" />
        <circle cx="22" cy="80" r="2" fill="none" stroke={NAVY} strokeWidth="0.4" />
        <circle cx="40" cy="80" r="2" fill="none" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* scan-active pulse */}
      <motion.circle
        cx="40" cy="20" r="1.6"
        fill={ORANGE}
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <text x="46" y="22" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">SCAN ACTIV</text>

      <Dim x1={0} y1={50} x2={0} y2={95} label="Ø 200" side="left" delay={1.0} offset={6} />
      <text x="240" y="105" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">L MAX 300 m</text>
    </BlueprintFrame>
  );
}
