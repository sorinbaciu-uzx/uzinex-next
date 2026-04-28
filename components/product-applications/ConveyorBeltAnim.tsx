"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  Dim,
  Annotation,
  NAVY,
  ORANGE,
  ANNOT,
} from "./blueprint";

export function ConveyorBeltAnim() {
  return (
    <BlueprintFrame uid="conveyor" title="Bandă transportoare" code="UZX-CNV" axes={["X", "Y"]}>
      {/* roller centers reference line */}
      <line x1="35" y1="87" x2="245" y2="87" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* belt body — outline */}
      <rect x="20" y="80" width="240" height="14" rx="7" fill="rgba(11,43,102,0.04)" stroke={NAVY} strokeWidth="0.7" />

      {/* belt cleats moving */}
      <motion.g
        animate={{ x: [-18, 0, -18] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <rect key={i} x={20 + i * 18} y={84} width="9" height="6" rx="1" fill="none" stroke={ORANGE} strokeWidth="0.5" opacity="0.7" />
        ))}
      </motion.g>

      {/* drum at left + right — technical with center dot */}
      {[35, 245].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy="87" r="11" fill="rgba(11,43,102,0.06)" stroke={NAVY} strokeWidth="0.7" />
          <motion.g
            style={{ transformOrigin: `${cx}px 87px` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          >
            <circle cx={cx} cy="87" r="6" fill="none" stroke={NAVY} strokeWidth="0.5" />
            <line x1={cx - 6} y1="87" x2={cx + 6} y2="87" stroke={NAVY} strokeWidth="0.5" />
            <line x1={cx} y1="81" x2={cx} y2="93" stroke={NAVY} strokeWidth="0.5" />
          </motion.g>
          <circle cx={cx} cy="87" r="1.4" fill={NAVY} />
          <text x={cx} y="73" fontSize="3" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">{i === 0 ? "M1" : "M2"}</text>
        </g>
      ))}

      {/* objects being transported */}
      {[
        { x: 60, w: 8, h: 6 },
        { x: 110, w: 6, h: 5 },
        { x: 165, w: 9, h: 7 },
        { x: 210, w: 7, h: 5 },
      ].map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={75 - b.h}
          width={b.w}
          height={b.h}
          rx="1"
          fill="rgba(245,133,31,0.10)"
          stroke={ORANGE}
          strokeWidth="0.6"
          animate={{ x: [b.x - 80, b.x + 200] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
        />
      ))}

      <Dim x1={20} y1={94} x2={260} y2={94} label="2 400" side="bottom" delay={0.8} />
      <Annotation x={140} y={87} tx={195} ty={45} text="v = 0.5 m/s" delay={1.1} />
    </BlueprintFrame>
  );
}
