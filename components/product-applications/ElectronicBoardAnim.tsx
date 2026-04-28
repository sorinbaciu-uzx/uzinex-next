"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function ElectronicBoardAnim() {
  return (
    <BlueprintFrame uid="electronic-board" title="DEEE · electronică" code="UZX-PCB">
      {/* PCB outline */}
      <rect x="50" y="40" width="180" height="80" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="55" y="45" width="170" height="70" rx="1" fill="none" stroke={NAVY} strokeWidth="0.4" />

      {/* mounting holes (corners) */}
      {[[58, 48], [222, 48], [58, 112], [222, 112]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.2" fill="none" stroke={NAVY} strokeWidth="0.4" />
      ))}

      {/* components — outlined rectangles */}
      {[
        { x: 70, y: 60, w: 18, h: 14, label: "U1" },
        { x: 100, y: 60, w: 14, h: 14, label: "" },
        { x: 120, y: 60, w: 22, h: 10, label: "" },
        { x: 150, y: 60, w: 12, h: 14, label: "" },
        { x: 170, y: 60, w: 18, h: 12, label: "" },
        { x: 195, y: 60, w: 14, h: 14, label: "U2" },
        { x: 70, y: 85, w: 14, h: 18, label: "" },
        { x: 95, y: 85, w: 22, h: 12, label: "" },
        { x: 125, y: 85, w: 18, h: 14, label: "" },
        { x: 155, y: 90, w: 12, h: 8, label: "" },
        { x: 175, y: 85, w: 22, h: 16, label: "U3" },
      ].map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="none" stroke={NAVY} strokeWidth="0.4" />
          {c.label && (
            <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1.5} fontSize="2.4" fill={NAVY} textAnchor="middle" fontFamily="ui-monospace, monospace">
              {c.label}
            </text>
          )}
        </g>
      ))}

      {/* traces — pulsing */}
      {[
        "M62 50 L62 115",
        "M82 50 L82 115",
        "M125 50 L125 115",
        "M165 50 L165 115",
        "M210 50 L210 115",
        "M55 75 L225 75",
        "M55 100 L225 100",
      ].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          fill="none"
          stroke={ORANGE}
          strokeWidth="0.4"
          animate={{ opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* via points pulsing */}
      {[
        { cx: 75, cy: 105 },
        { cx: 140, cy: 50 },
        { cx: 200, cy: 110 },
      ].map((p, i) => (
        <motion.circle
          key={i}
          cx={p.cx} cy={p.cy} r="1.4"
          fill={ORANGE}
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.4, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.4 }}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
        />
      ))}

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        FR-4 · 2 LAYER · 1.6 mm
      </text>
    </BlueprintFrame>
  );
}
