"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function BalePressAnim() {
  return (
    <BlueprintFrame uid="bale-press" title="Balotat · presare" code="UZX-BLP" axes={["X", "Y"]}>
      {/* top frame */}
      <rect x="80" y="35" width="120" height="18" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="115" y="53" width="50" height="6" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.5" />

      {/* center axis */}
      <line x1="140" y1="35" x2="140" y2="120" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* moving punch */}
      <motion.g
        animate={{ y: [0, 30, 30, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      >
        <rect x="100" y="59" width="80" height="8" fill="rgba(245,133,31,0.20)" stroke={ORANGE} strokeWidth="0.5" />
        <rect x="120" y="67" width="40" height="6" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* base */}
      <rect x="85" y="100" width="110" height="20" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

      {/* bale being compressed */}
      <motion.g
        animate={{ scale: [1, 0.7, 0.7, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
        style={{ transformOrigin: "140px 110px" }}
      >
        <rect x="90" y="80" width="100" height="35" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
        {/* horizontal compression lines */}
        <line x1="90" y1="88" x2="190" y2="88" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
        <line x1="90" y1="96" x2="190" y2="96" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
        <line x1="90" y1="104" x2="190" y2="104" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
        <line x1="90" y1="112" x2="190" y2="112" stroke={NAVY} strokeWidth="0.3" opacity="0.6" />
        {/* binding straps */}
        <line x1="105" y1="80" x2="105" y2="115" stroke={ORANGE} strokeWidth="0.6" />
        <line x1="140" y1="80" x2="140" y2="115" stroke={ORANGE} strokeWidth="0.6" />
        <line x1="175" y1="80" x2="175" y2="115" stroke={ORANGE} strokeWidth="0.6" />
      </motion.g>

      {/* force indicator */}
      <motion.line
        x1="80" y1="62" x2="200" y2="62"
        stroke={ORANGE} strokeWidth="0.4" strokeDasharray="2 1.5"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <text x="220" y="64" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">F 80 t</text>
    </BlueprintFrame>
  );
}
