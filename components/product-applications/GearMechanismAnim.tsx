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

function BlueprintGear({
  cx, cy, r, teeth, color, dur, dir = 1,
}: {
  cx: number; cy: number; r: number; teeth: number; color: string; dur: number; dir?: 1 | -1;
}) {
  const points = Array.from({ length: teeth * 2 })
    .map((_, i) => {
      const a = (i * Math.PI) / teeth;
      const rad = i % 2 === 0 ? r : r * 0.78;
      return `${cx + Math.cos(a) * rad},${cy + Math.sin(a) * rad}`;
    })
    .join(" ");
  const inner = r * 0.6;
  return (
    <motion.g
      animate={{ rotate: dir * 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <polygon points={points} fill={FILL_NAVY} stroke={color} strokeWidth="0.6" />
      <circle cx={cx} cy={cy} r={inner} fill="none" stroke={color} strokeWidth="0.4" />
      <circle cx={cx} cy={cy} r={r * 0.18} fill={color} />
      {/* spokes */}
      <line x1={cx - inner * 0.9} y1={cy} x2={cx + inner * 0.9} y2={cy} stroke={color} strokeWidth="0.3" />
      <line x1={cx} y1={cy - inner * 0.9} x2={cx} y2={cy + inner * 0.9} stroke={color} strokeWidth="0.3" />
    </motion.g>
  );
}

export function GearMechanismAnim() {
  return (
    <BlueprintFrame uid="gears" title="Atelier mecanic" code="UZX-GMR">
      {/* center axis */}
      <line x1="60" y1="75" x2="240" y2="75" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      <BlueprintGear cx={95} cy={75} r={28} teeth={12} color={NAVY} dur={6} />
      <BlueprintGear cx={155} cy={75} r={20} teeth={10} color={NAVY} dur={4} dir={-1} />
      <BlueprintGear cx={205} cy={60} r={16} teeth={8} color={ORANGE} dur={3} />

      <Dim x1={67} y1={75} x2={123} y2={75} label="Ø 56" side="bottom" delay={1.0} offset={28} />
      <Dim x1={135} y1={75} x2={175} y2={75} label="Ø 40" side="bottom" delay={1.2} offset={26} />

      <text
        x="205" y="42" fontSize="3.2" fill={ORANGE}
        fontFamily="ui-monospace, monospace" textAnchor="middle"
      >
        i = 1:6
      </text>

      <text
        x="140" y="135" fontSize="3.2" fill={ANNOT}
        textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5"
      >
        ARBORI · ROȚI · TRANSMISII
      </text>
    </BlueprintFrame>
  );
}
