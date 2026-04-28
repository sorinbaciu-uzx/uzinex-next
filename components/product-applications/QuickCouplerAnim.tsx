"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function QuickCouplerAnim() {
  return (
    <BlueprintFrame uid="quick-coupler" title="Cuplaj rapid" code="UZX-QCP">
      {/* arm + pivot */}
      <line x1="60" y1="35" x2="140" y2="60" stroke={NAVY} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="60" cy="35" r="2.4" fill="none" stroke={ORANGE} strokeWidth="0.6" />
      <circle cx="60" cy="35" r="1" fill={ORANGE} />

      {/* coupler body (fixed) */}
      <rect x="130" y="55" width="22" height="14" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

      {/* attachment moving up to engage */}
      <motion.g
        animate={{ y: [-30, 0, 0, -30] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1], ease: "easeInOut" }}
      >
        <rect x="125" y="80" width="32" height="14" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <circle cx="135" cy="87" r="1.4" fill="none" stroke={NAVY} strokeWidth="0.4" />
        <circle cx="147" cy="87" r="1.4" fill="none" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* "coupled" indicator */}
      <motion.g
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.85, 1] }}
      >
        <path d="M120 95 L120 125 L160 125 L160 95" stroke={ORANGE} strokeWidth="0.5" fill="none" strokeDasharray="2 1.5" />
        <text x="140" y="115" textAnchor="middle" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">CUPLAT</text>
      </motion.g>

      {/* lock pin */}
      <motion.circle
        cx="141" cy="73" r="2"
        fill="none" stroke={ORANGE} strokeWidth="0.6"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <circle cx="141" cy="73" r="0.8" fill={ORANGE} />

      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        ISO 13031 · LOCK 30 s
      </text>
    </BlueprintFrame>
  );
}
