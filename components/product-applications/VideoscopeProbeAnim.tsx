"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function VideoscopeProbeAnim() {
  return (
    <BlueprintFrame uid="videoscope" title="Sondă articulată" code="UZX-VID">
      {/* control unit */}
      <rect x="200" y="60" width="50" height="40" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="206" y="66" width="38" height="22" rx="1" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.4" />
      <motion.line
        x1="206" y1="78" x2="244" y2="78"
        stroke={ORANGE} strokeWidth="0.5"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      {/* control buttons */}
      <circle cx="218" cy="94" r="1.5" fill="none" stroke={ORANGE} strokeWidth="0.5" />
      <circle cx="226" cy="94" r="1.5" fill="none" stroke={NAVY} strokeWidth="0.5" />
      <circle cx="234" cy="94" r="1.5" fill="none" stroke={NAVY} strokeWidth="0.5" />

      {/* probe cable — drawn progressively */}
      <motion.path
        d="M200 80 Q150 80 100 65 Q70 55 60 80"
        fill="none"
        stroke={NAVY}
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.8, 1] }}
      />

      {/* probe tip — articulating */}
      <motion.g
        animate={{ x: [0, -40, 0], y: [0, -25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="100" cy="65" r="3" fill="none" stroke={ORANGE} strokeWidth="0.6" />
        <circle cx="100" cy="65" r="1.2" fill={ORANGE} />
      </motion.g>

      {/* range indicator */}
      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        ZONE GREU ACCESIBILE · 4-AXIS · Ø 8 mm
      </text>
    </BlueprintFrame>
  );
}
