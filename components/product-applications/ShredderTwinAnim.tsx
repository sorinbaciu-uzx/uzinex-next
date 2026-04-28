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

export function ShredderTwinAnim() {
  return (
    <BlueprintFrame uid="shredder-twin" title="Tocare 2 axe" code="UZX-SHR">
      {/* hopper outline (above shredder) */}
      <path
        d="M 90 26 L 100 56 L 180 56 L 190 26 Z"
        fill={FILL_NAVY}
        stroke={NAVY}
        strokeWidth="0.6"
      />

      {/* incoming material — drops into hopper */}
      <motion.g
        animate={{ y: [-15, 5, -15] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeIn", times: [0, 0.6, 1] }}
      >
        {[
          { x: 120, y: 30 },
          { x: 140, y: 22 },
          { x: 160, y: 28 },
        ].map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width="9"
            height="6"
            rx="1"
            fill="rgba(245,133,31,0.10)"
            stroke={ORANGE}
            strokeWidth="0.5"
          />
        ))}
      </motion.g>

      {/* shredder body */}
      <rect x="100" y="58" width="80" height="40" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

      {/* center axes */}
      <line x1="125" y1="78" x2="155" y2="78" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="2 1" />

      {/* shaft 1 */}
      <motion.g
        style={{ transformOrigin: "125px 78px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="125" cy="78" r="10" fill="none" stroke={NAVY} strokeWidth="0.7" />
        <circle cx="125" cy="78" r="2" fill={NAVY} />
        {[0, 90, 180, 270].map((a) => (
          <rect
            key={a}
            x="123"
            y="68"
            width="4"
            height="10"
            fill="none"
            stroke={ORANGE}
            strokeWidth="0.6"
            transform={`rotate(${a} 125 78)`}
          />
        ))}
      </motion.g>

      {/* shaft 2 */}
      <motion.g
        style={{ transformOrigin: "155px 78px" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="155" cy="78" r="10" fill="none" stroke={NAVY} strokeWidth="0.7" />
        <circle cx="155" cy="78" r="2" fill={NAVY} />
        {[45, 135, 225, 315].map((a) => (
          <rect
            key={a}
            x="153"
            y="68"
            width="4"
            height="10"
            fill="none"
            stroke={ORANGE}
            strokeWidth="0.6"
            transform={`rotate(${a} 155 78)`}
          />
        ))}
      </motion.g>

      {/* arrows showing rotation direction */}
      <motion.path
        d="M 113 65 A 6 6 0 0 1 117 60"
        fill="none"
        stroke={ANNOT}
        strokeWidth="0.4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />
      <motion.path
        d="M 168 60 A 6 6 0 0 1 167 65"
        fill="none"
        stroke={ANNOT}
        strokeWidth="0.4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      />

      {/* fragments falling out */}
      {[125, 135, 145, 155].map((x, i) => (
        <motion.rect
          key={i}
          x={x - 1}
          y="100"
          width="2"
          height="2"
          fill={NAVY}
          animate={{ y: [100, 116], opacity: [1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      <Dim x1={100} y1={98} x2={180} y2={98} label="Ø 80" side="bottom" delay={0.8} />
      <text
        x="140" y="50" fontSize="3.2"
        fill={ORANGE} fontFamily="ui-monospace, monospace"
        textAnchor="middle"
      >
        2 × 22 kW · 25 RPM
      </text>
    </BlueprintFrame>
  );
}
