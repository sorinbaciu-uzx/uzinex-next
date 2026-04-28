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

export function IndustrialPressAnim() {
  return (
    <BlueprintFrame uid="ind-press" title="Presare industrială" code="UZX-PRS" axes={["X", "Y"]}>
      {/* press frame */}
      <rect x="60" y="35" width="160" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="60" y="100" width="160" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="60" y="35" width="10" height="79" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="210" y="35" width="10" height="79" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

      {/* center axis */}
      <line x1="140" y1="49" x2="140" y2="100" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* moving punch */}
      <motion.g
        animate={{ y: [0, 31, 31, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      >
        <rect x="100" y="49" width="80" height="12" fill="rgba(11,43,102,0.18)" stroke={NAVY} strokeWidth="0.6" />
        <line x1="100" y1="55" x2="180" y2="55" stroke={NAVY} strokeWidth="0.3" strokeDasharray="2 1" />
      </motion.g>

      {/* workpiece compressing */}
      <motion.rect
        x="120" y="61" width="40" height="6"
        fill="rgba(245,133,31,0.10)" stroke={ORANGE} strokeWidth="0.6"
        animate={{ y: [61, 92, 92, 61], scaleY: [1, 0.4, 0.4, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
        style={{ transformOrigin: "140px 90px" }}
      />

      {/* force arrow */}
      <motion.g
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, times: [0, 0.5, 1] }}
      >
        <line x1="140" y1="62" x2="140" y2="80" stroke={ORANGE} strokeWidth="0.6" />
        <polygon points="140,80 138,77 142,77" fill={ORANGE} />
      </motion.g>

      <Dim x1={60} y1={35} x2={220} y2={35} label="1 600" side="top" delay={1.0} offset={6} />
      <Dim x1={60} y1={114} x2={60} y2={35} label="800" side="left" delay={1.3} offset={6} />
      <text x="234" y="78" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">F = 250 t</text>
    </BlueprintFrame>
  );
}
