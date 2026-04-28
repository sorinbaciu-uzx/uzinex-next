"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function PtzCameraAnim() {
  return (
    <BlueprintFrame uid="ptz" title="PTZ 360° · zoom 10×" code="UZX-PTZ">
      {/* concentric range rings — like radar/dimensions */}
      {[20, 38, 56].map((r, i) => (
        <motion.circle
          key={i}
          cx="140" cy="80" r={r}
          fill="none" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="2 2"
          initial={{ opacity: 0.2 + i * 0.08 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      {/* range labels */}
      <text x="140" y="58" fontSize="2.8" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">10m</text>
      <text x="140" y="40" fontSize="2.8" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">30m</text>

      {/* center crosshair */}
      <line x1="80" y1="80" x2="200" y2="80" stroke={ANNOT} strokeWidth="0.25" strokeDasharray="2 1" />
      <line x1="140" y1="20" x2="140" y2="140" stroke={ANNOT} strokeWidth="0.25" strokeDasharray="2 1" />

      {/* sweep cone */}
      <motion.g
        style={{ transformOrigin: "140px 80px" }}
        animate={{ rotate: [-55, 55, -55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M140 80 L210 64 A 72 72 0 0 1 210 96 Z"
          fill="rgba(245,133,31,0.10)"
          stroke={ORANGE}
          strokeWidth="0.4"
        />

        <motion.line
          x1="140" y1="80" x2="210" y2="80"
          stroke={ORANGE} strokeWidth="0.5" strokeDasharray="2.5 1.5"
          animate={{ strokeDashoffset: [0, -6] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>

      {/* camera body */}
      <circle cx="140" cy="80" r="11" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <circle cx="140" cy="80" r="7" fill="none" stroke={NAVY} strokeWidth="0.5" />
      <motion.circle
        cx="140" cy="80" r="3.5"
        fill="rgba(245,133,31,0.20)" stroke={ORANGE} strokeWidth="0.5"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.2, repeat: Infinity }}
        style={{ transformOrigin: "140px 80px" }}
      />
      <circle cx="140" cy="80" r="1.2" fill={ORANGE} />

      {/* arc dimension */}
      <motion.path
        d="M 95 80 A 45 45 0 0 1 140 35"
        fill="none" stroke={ANNOT} strokeWidth="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
      <text x="100" y="50" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">110°</text>

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">
        ROTAȚIE CONTINUĂ · Pan ∞ · Tilt -20° → 90°
      </text>
    </BlueprintFrame>
  );
}
