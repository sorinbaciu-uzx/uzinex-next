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

export function StonePolishAnim() {
  return (
    <BlueprintFrame uid="stone-polish" title="Prelucrare piatră" code="UZX-STP" axes={["X", "Z"]}>
      {/* stone slab — rough side */}
      <rect x="30" y="80" width="220" height="30" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* texture (rough granite) */}
      {Array.from({ length: 50 }).map((_, i) => {
        const x = 32 + (i % 25) * 9;
        const y = 82 + Math.floor(i / 25) * 14;
        return <circle key={i} cx={x} cy={y} r="0.6" fill="none" stroke={ANNOT} strokeWidth="0.3" opacity="0.6" />;
      })}

      {/* polished area sweep */}
      <motion.rect
        x="30" y="80" width="0" height="30"
        fill="rgba(245,133,31,0.10)" stroke={ORANGE} strokeWidth="0.4"
        animate={{ width: [0, 220, 220, 0] }}
        transition={{ duration: 5, repeat: Infinity, times: [0, 0.5, 0.85, 1] }}
      />

      {/* polishing head */}
      <motion.g
        animate={{ x: [0, 180, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="40" y="55" width="20" height="22" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

        <motion.circle
          cx="50" cy="92" r="14"
          fill="none" stroke={NAVY} strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 92px" }}
        />
        <motion.circle
          cx="50" cy="92" r="14"
          fill="none" stroke={ORANGE} strokeWidth="0.5" strokeDasharray="3 2"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "50px 92px" }}
        />
        <circle cx="50" cy="92" r="1.5" fill={NAVY} />
      </motion.g>

      <Dim x1={30} y1={110} x2={250} y2={110} label="L 2 200" side="bottom" delay={1.0} offset={6} />
      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        GRANIT · MARMURĂ · DIAMANT 60–3000 GRIT
      </text>
    </BlueprintFrame>
  );
}
