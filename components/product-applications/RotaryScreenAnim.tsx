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

export function RotaryScreenAnim() {
  return (
    <BlueprintFrame uid="rotary-screen" title="Cernere · sortare" code="UZX-RSC">
      {/* center axis */}
      <line x1="50" y1="75" x2="230" y2="75" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* rotating drum */}
      <motion.g
        style={{ transformOrigin: "140px 75px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <ellipse cx="140" cy="75" rx="80" ry="26" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        {/* perforations */}
        {Array.from({ length: 30 }).map((_, i) => {
          const a = (i * 12 * Math.PI) / 180;
          const x = 140 + Math.cos(a) * 80;
          const y = 75 + Math.sin(a) * 26;
          return <circle key={i} cx={x} cy={y} r="0.8" fill="none" stroke={NAVY} strokeWidth="0.4" />;
        })}
      </motion.g>

      {/* end caps */}
      <ellipse cx="60" cy="75" rx="4" ry="18" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <ellipse cx="220" cy="75" rx="4" ry="18" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />

      {/* fines falling through holes */}
      {[100, 120, 140, 160, 180].map((x, i) => (
        <motion.circle
          key={i}
          cx={x} cy="55" r="1"
          fill="none" stroke={NAVY} strokeWidth="0.4"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      {/* oversize moving along */}
      {[110, 130, 150, 170].map((x, i) => (
        <motion.rect
          key={`big-${i}`}
          x={x} y={48} width="5" height="5"
          fill="none" stroke={ORANGE} strokeWidth="0.5"
          animate={{ x: [x, x + 80, x + 80] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <Dim x1={60} y1={48} x2={220} y2={48} label="L 1 600" side="top" delay={1.0} offset={6} />
      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        Ø 800 · MAX 80 RPM
      </text>
    </BlueprintFrame>
  );
}
