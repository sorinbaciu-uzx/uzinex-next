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

export function ShrinkTunnelAnim() {
  return (
    <BlueprintFrame uid="shrink-tunnel" title="Tunel contracție" code="UZX-SHK">
      {/* tunnel body */}
      <rect x="60" y="55" width="160" height="55" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="64" y="60" width="152" height="45" rx="1" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.3" />

      {/* heat elements (vertical bars) */}
      {[80, 100, 120, 140, 160, 180, 200].map((cx, i) => (
        <motion.line
          key={i}
          x1={cx} y1={70} x2={cx} y2={95}
          stroke={ORANGE} strokeWidth="0.6"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      {/* product passing through */}
      <motion.g
        animate={{ x: [-60, 240] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="72" width="30" height="22" rx="1" fill="rgba(245,133,31,0.12)" stroke={ORANGE} strokeWidth="0.5" />
      </motion.g>

      {/* conveyor */}
      <line x1="20" y1="106" x2="260" y2="106" stroke={NAVY} strokeWidth="0.5" />
      <motion.line
        x1="20" y1="106" x2="260" y2="106"
        stroke={NAVY} strokeWidth="0.3" strokeDasharray="3 1.5"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      <Dim x1={60} y1={50} x2={220} y2={50} label="L 1 600" side="top" delay={1.0} offset={6} />
      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        T 180 °C · POF / PVC / PE
      </text>
    </BlueprintFrame>
  );
}
