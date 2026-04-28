"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function HeatPumpAnim() {
  return (
    <BlueprintFrame uid="heat-pump" title="Ciclu aer · apă" code="UZX-HPC">
      {/* refrigerant loop ghost */}
      <circle cx="140" cy="75" r="46" fill="none" stroke={ANNOT} strokeWidth="0.4" strokeDasharray="2 2" />

      {/* outdoor unit (left) */}
      <g transform="translate(60 50)">
        <rect x="0" y="0" width="40" height="50" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        {/* heat exchanger fins */}
        <line x1="5" y1="10" x2="35" y2="10" stroke={NAVY} strokeWidth="0.3" />
        <line x1="5" y1="18" x2="35" y2="18" stroke={NAVY} strokeWidth="0.3" />
        <line x1="5" y1="26" x2="35" y2="26" stroke={NAVY} strokeWidth="0.3" />
        <line x1="5" y1="34" x2="35" y2="34" stroke={NAVY} strokeWidth="0.3" />
        <line x1="5" y1="42" x2="35" y2="42" stroke={NAVY} strokeWidth="0.3" />
        {/* fan */}
        <motion.circle
          cx="20" cy="25" r="6"
          fill="none" stroke={ORANGE} strokeWidth="0.6"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "20px 25px" }}
        />
        <motion.line
          x1="20" y1="25" x2="20" y2="19"
          stroke={ORANGE} strokeWidth="0.7"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "20px 25px" }}
        />
        <text x="20" y="58" fontSize="3" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">EVAP</text>
      </g>

      {/* indoor unit (right) */}
      <g transform="translate(180 50)">
        <rect x="0" y="0" width="40" height="50" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <rect x="6" y="6" width="28" height="38" rx="1" fill="rgba(245,133,31,0.10)" stroke={ORANGE} strokeWidth="0.4" />
        <text x="20" y="28" textAnchor="middle" fontSize="4" fill={ORANGE} fontWeight="700" fontFamily="ui-monospace, monospace">19–35</text>
        <text x="20" y="34" textAnchor="middle" fontSize="3.4" fill={ORANGE} fontFamily="ui-monospace, monospace">kW</text>
        <text x="20" y="58" fontSize="3" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">COND</text>
      </g>

      {/* hot loop (top) */}
      <motion.path
        d="M100 60 Q140 50 180 60"
        fill="none"
        stroke={ORANGE}
        strokeWidth="0.7"
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      {/* cold loop (bottom) */}
      <motion.path
        d="M180 90 Q140 100 100 90"
        fill="none"
        stroke={NAVY}
        strokeWidth="0.7"
        animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1.25 }}
      />

      <text x="140" y="60" fontSize="3" fill={ORANGE} textAnchor="middle" fontFamily="ui-monospace, monospace">+55°C</text>
      <text x="140" y="98" fontSize="3" fill={NAVY} textAnchor="middle" fontFamily="ui-monospace, monospace">-7°C</text>

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        COP 4.2 · R32 · A+++
      </text>
    </BlueprintFrame>
  );
}
