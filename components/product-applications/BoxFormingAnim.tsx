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

export function BoxFormingAnim() {
  return (
    <BlueprintFrame uid="box-forming" title="Formare · sigilare cutii" code="UZX-BOX">
      {/* base */}
      <line x1="20" y1="115" x2="260" y2="115" stroke={ANNOT} strokeWidth="0.4" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={20 + i * 12} y1="120" x2={26 + i * 12} y2="115" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* main panel sliding in */}
      <motion.g
        animate={{ x: [-30, 0, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeOut", times: [0, 0.3, 0.7, 1] }}
      >
        <rect x="60" y="60" width="100" height="40" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="60" y1="60" x2="60" y2="100" stroke={NAVY} strokeWidth="0.5" />
        <line x1="160" y1="60" x2="160" y2="100" stroke={NAVY} strokeWidth="0.5" />
        {/* fold line (center) */}
        <line x1="110" y1="60" x2="110" y2="100" stroke={ORANGE} strokeWidth="0.4" strokeDasharray="2 1.5" />
      </motion.g>

      {/* left flap folding */}
      <motion.g
        animate={{ rotateY: [0, 0, 60, 60, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.55, 0.85, 1] }}
        style={{ transformOrigin: "60px 80px" }}
      >
        <rect x="40" y="60" width="20" height="40" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      </motion.g>

      {/* right flap folding */}
      <motion.g
        animate={{ rotateY: [0, 0, -60, -60, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.3, 0.55, 0.85, 1] }}
        style={{ transformOrigin: "160px 80px" }}
      >
        <rect x="160" y="60" width="20" height="40" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      </motion.g>

      {/* tape strip */}
      <motion.line
        x1="80" y1="60" x2="180" y2="60"
        stroke={ORANGE} strokeWidth="1" strokeDasharray="2.5 1.5"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.6, 0.85, 1] }}
      />

      <Dim x1={60} y1={105} x2={160} y2={105} label="L 600" side="bottom" delay={1.0} offset={5} />
      <text x="200" y="55" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">FEFCO 0201</text>
    </BlueprintFrame>
  );
}
