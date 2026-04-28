"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
} from "./blueprint";

export function SewerNetworkAnim() {
  const pipes = [
    { d: "M30 70 L120 70", delay: 0 },
    { d: "M120 70 L120 30", delay: 0.4 },
    { d: "M120 70 L120 110", delay: 0.4 },
    { d: "M120 30 L210 30", delay: 0.8 },
    { d: "M120 110 L210 110", delay: 0.8 },
    { d: "M210 30 L210 70", delay: 1.2 },
    { d: "M210 110 L210 70", delay: 1.2 },
    { d: "M210 70 L260 70", delay: 1.6 },
  ];
  const nodes = [
    { x: 30, y: 70 },
    { x: 120, y: 70 },
    { x: 120, y: 30 },
    { x: 120, y: 110 },
    { x: 210, y: 30 },
    { x: 210, y: 110 },
    { x: 210, y: 70 },
    { x: 260, y: 70 },
  ];

  return (
    <BlueprintFrame uid="sewer" title="Rețea mapată" code="UZX-NET">
      {/* pipe ghosts (faded) + active drawing */}
      {pipes.map((p, i) => (
        <g key={i}>
          <path d={p.d} stroke={ANNOT} strokeWidth="0.5" fill="none" strokeDasharray="2 2" opacity="0.3" />
          <motion.path
            d={p.d}
            stroke={NAVY}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: p.delay,
              repeatDelay: 0.6,
              times: [0, 0.4, 1],
            }}
          />
        </g>
      ))}

      {/* nodes — junction boxes */}
      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: [0.6, 1.4, 1], opacity: [0.4, 1, 0.7] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: 0.4 + i * 0.3,
            repeatDelay: 2.4,
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="3" fill="none" stroke={ORANGE} strokeWidth="0.6" />
          <circle cx={n.x} cy={n.y} r="1.2" fill={ORANGE} />
          <text x={n.x + 4} y={n.y - 3} fontSize="2.4" fill={ANNOT} fontFamily="ui-monospace, monospace">N{i + 1}</text>
        </motion.g>
      ))}

      {/* legend */}
      <text x="20" y="135" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">
        CABLU MAX 300 m  ·  Ø 80 — 1 200 mm
      </text>
    </BlueprintFrame>
  );
}
