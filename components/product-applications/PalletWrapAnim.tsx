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

export function PalletWrapAnim() {
  return (
    <BlueprintFrame uid="pallet-wrap" title="Ambalare paleți" code="UZX-PWR">
      {/* turntable shadow */}
      <ellipse cx="140" cy="120" rx="55" ry="5" fill="none" stroke={ANNOT} strokeWidth="0.4" strokeDasharray="2 1.5" />

      {/* pallet */}
      <rect x="100" y="105" width="80" height="12" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <rect x="105" y="113" width="6" height="3" fill={NAVY} />
      <rect x="135" y="113" width="6" height="3" fill={NAVY} />
      <rect x="170" y="113" width="6" height="3" fill={NAVY} />

      {/* load */}
      <rect x="110" y="55" width="60" height="50" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <line x1="115" y1="68" x2="165" y2="68" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
      <line x1="115" y1="80" x2="165" y2="80" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
      <line x1="115" y1="92" x2="165" y2="92" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />

      {/* film wrap layers */}
      {[60, 70, 80, 90, 100].map((cy, i) => (
        <motion.ellipse
          key={i}
          cx="140" cy={cy} rx="35" ry="3.5"
          fill="none" stroke={ORANGE} strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.4,
            times: [0, 0.4, 1],
          }}
        />
      ))}

      {/* roll-out indicator */}
      <motion.circle
        cx="200" cy="80" r="2"
        fill={ORANGE}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "140px 80px" }}
      />

      <Dim x1={100} y1={117} x2={180} y2={117} label="L 1 200" side="bottom" delay={1.0} offset={6} />
      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        PRE-STRETCH 200% · 18 RPM
      </text>
    </BlueprintFrame>
  );
}
