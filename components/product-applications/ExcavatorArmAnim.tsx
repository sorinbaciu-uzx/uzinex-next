"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  Dim,
  Annotation,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function ExcavatorArmAnim() {
  return (
    <BlueprintFrame uid="exc-arm" title="Excavator · teren" code="UZX-EXA">
      {/* ground */}
      <line x1="20" y1="115" x2="260" y2="115" stroke={ANNOT} strokeWidth="0.5" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={20 + i * 12} y1="120" x2={26 + i * 12} y2="115" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* tracks */}
      <ellipse cx="30" cy="115" rx="14" ry="5" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <ellipse cx="70" cy="115" rx="14" ry="5" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <line x1="16" y1="115" x2="84" y2="115" stroke={NAVY} strokeWidth="0.5" />

      {/* chassis */}
      <rect x="10" y="85" width="80" height="20" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <line x1="50" y1="85" x2="50" y2="105" stroke={NAVY} strokeWidth="0.3" strokeDasharray="2 1" />

      {/* cabin */}
      <rect x="35" y="65" width="40" height="22" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="40" y="68" width="20" height="14" fill="rgba(11,43,102,0.18)" stroke={NAVY} strokeWidth="0.3" />

      {/* boom pivot */}
      <circle cx="70" cy="70" r="1.8" fill={NAVY} />

      <motion.g
        style={{ transformOrigin: "70px 70px" }}
        animate={{ rotate: [0, -22, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <line x1="70" y1="70" x2="160" y2="40" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />

        <circle cx="160" cy="40" r="1.6" fill={NAVY} />

        <motion.g
          style={{ transformOrigin: "160px 40px" }}
          animate={{ rotate: [0, 28, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <line x1="160" y1="40" x2="220" y2="80" stroke={NAVY} strokeWidth="2.0" strokeLinecap="round" />
          <circle cx="220" cy="80" r="1.4" fill={NAVY} />

          <motion.g
            style={{ transformOrigin: "220px 80px" }}
            animate={{ rotate: [0, 32, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M210 70 L240 70 L250 100 L215 100 Z" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
            <path d="M218 100 L222 106 M228 100 L232 106 M238 100 L242 106" stroke={NAVY} strokeWidth="0.5" />
          </motion.g>
        </motion.g>
      </motion.g>

      <Dim x1={10} y1={108} x2={90} y2={108} label="3 200" side="bottom" delay={1.0} />
      <Annotation x={160} y={40} tx={210} ty={32} text="α MAX 95°" delay={1.3} />
    </BlueprintFrame>
  );
}
