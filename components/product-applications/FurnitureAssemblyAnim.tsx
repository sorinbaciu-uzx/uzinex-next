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

export function FurnitureAssemblyAnim() {
  return (
    <BlueprintFrame uid="furniture" title="Producție mobilier" code="UZX-FUR" axes={["X", "Z"]}>
      {/* base reference line */}
      <line x1="20" y1="118" x2="260" y2="118" stroke={ANNOT} strokeWidth="0.4" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={20 + i * 12} y1="122" x2={26 + i * 12} y2="118" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* exploded assembly — panels stack with delay */}
      {[
        { y: 105, w: 130, x: 75 },
        { y: 90, w: 110, x: 85 },
        { y: 75, w: 90, x: 95 },
      ].map((p, i) => (
        <motion.g
          key={i}
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: [-25, 0, 0], opacity: [0, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, times: [0, 0.4, 1] }}
        >
          <rect x={p.x} y={p.y} width={p.w} height="10" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
          {/* dowel positions */}
          <circle cx={p.x + 8} cy={p.y + 5} r="0.8" fill="none" stroke={NAVY} strokeWidth="0.3" />
          <circle cx={p.x + p.w - 8} cy={p.y + 5} r="0.8" fill="none" stroke={NAVY} strokeWidth="0.3" />
          <line x1={p.x + 5} y1={p.y + 5} x2={p.x + p.w - 5} y2={p.y + 5} stroke={ANNOT} strokeWidth="0.2" strokeDasharray="1 1" opacity="0.6" />
        </motion.g>
      ))}

      {/* top piece */}
      <motion.g
        animate={{ y: [-15, 0, -15] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <rect x="105" y="50" width="70" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
        <line x1="140" y1="50" x2="140" y2="64" stroke={NAVY} strokeWidth="0.25" strokeDasharray="1 1" />
      </motion.g>

      {/* assembly indicator */}
      <motion.line
        x1="140" y1="35" x2="140" y2="50"
        stroke={ORANGE} strokeWidth="0.6" strokeDasharray="2 1.5"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.6 }}
      />
      <motion.circle
        cx="140" cy="35" r="2"
        fill="none" stroke={ORANGE} strokeWidth="0.6"
        animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.6 }}
        style={{ transformOrigin: "140px 35px" }}
      />

      <Dim x1={75} y1={115} x2={205} y2={115} label="1 300" side="bottom" delay={1.0} offset={5} />
    </BlueprintFrame>
  );
}
