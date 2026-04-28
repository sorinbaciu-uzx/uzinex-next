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

export function CompactorPlateAnim() {
  return (
    <BlueprintFrame uid="compactor" title="Compactare · vibrare" code="UZX-CMP">
      {/* ground line */}
      <line x1="0" y1="115" x2="280" y2="115" stroke={ANNOT} strokeWidth="0.4" />
      {/* ground hatching */}
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1={5 + i * 11} y1="125" x2={11 + i * 11} y2="115" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* compactor — vibrating */}
      <motion.g
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* engine */}
        <rect x="80" y="55" width="120" height="20" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <rect x="86" y="60" width="108" height="10" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.3" />

        {/* mount */}
        <rect x="100" y="75" width="80" height="6" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />

        {/* base plate */}
        <rect x="90" y="81" width="100" height="22" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="92" y1="92" x2="188" y2="92" stroke={NAVY} strokeWidth="0.3" strokeDasharray="2 1" opacity="0.7" />
      </motion.g>

      {/* impact ring */}
      <motion.ellipse
        cx="140" cy="110" rx="55" ry="3"
        fill="none" stroke={ORANGE} strokeWidth="0.6"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "140px 110px" }}
      />

      {/* bouncing fragments */}
      {[60, 80, 200, 220].map((cx, i) => (
        <motion.path
          key={i}
          d={`M${cx} 113 L${cx + 4} 110 L${cx + 2} 117 Z`}
          fill="none" stroke={NAVY} strokeWidth="0.4"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
        />
      ))}

      <Dim x1={90} y1={104} x2={190} y2={104} label="L 600" side="bottom" delay={1.0} offset={5} />
      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        F 30 kN · 90 Hz · 120 kg
      </text>
    </BlueprintFrame>
  );
}
