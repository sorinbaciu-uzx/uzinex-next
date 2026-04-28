"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function BottleFillAnim() {
  return (
    <BlueprintFrame uid="bottle-fill" title="Umplere · dozare" code="UZX-FIL">
      {/* manifold */}
      <rect x="50" y="35" width="180" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {[80, 110, 140, 170, 200].map((x) => (
        <rect key={x} x={x - 1} y="49" width="2" height="14" fill={NAVY} />
      ))}

      {/* bottles + filling */}
      {[80, 110, 140, 170, 200].map((cx, i) => (
        <g key={cx}>
          <path
            d={`M${cx - 10} 110 L${cx - 10} 75 Q${cx - 10} 70 ${cx - 6} 70 L${cx + 6} 70 Q${cx + 10} 70 ${cx + 10} 75 L${cx + 10} 110 Z`}
            fill={FILL_NAVY}
            stroke={NAVY}
            strokeWidth="0.6"
          />
          <rect x={cx - 4} y="62" width="8" height="8" fill="none" stroke={NAVY} strokeWidth="0.4" />

          {/* fill level rises */}
          <motion.rect
            x={cx - 9} y={75} width="18" height={34}
            fill="rgba(245,133,31,0.18)" stroke={ORANGE} strokeWidth="0.3"
            animate={{ height: [0, 34, 34, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, times: [0, 0.4, 0.85, 1] }}
            style={{ transformOrigin: `${cx}px 109px` }}
          />

          {/* fill jet */}
          <motion.line
            x1={cx} y1={63} x2={cx} y2={75}
            stroke={ORANGE} strokeWidth="0.6"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.18, times: [0, 0.1, 0.4, 0.5] }}
          />
        </g>
      ))}

      {/* conveyor */}
      <line x1="20" y1="115" x2="260" y2="115" stroke={ANNOT} strokeWidth="0.4" />

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        500 ml · ±0.5% · 6 000 BPH
      </text>
    </BlueprintFrame>
  );
}
