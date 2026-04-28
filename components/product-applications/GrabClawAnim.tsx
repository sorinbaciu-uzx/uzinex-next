"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function GrabClawAnim() {
  return (
    <BlueprintFrame uid="grab-claw" title="Prindere hidraulică" code="UZX-GCL">
      {/* hanging cable */}
      <line x1="140" y1="20" x2="140" y2="55" stroke={NAVY} strokeWidth="1.2" />

      {/* center axis */}
      <line x1="140" y1="55" x2="140" y2="125" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* hub */}
      <circle cx="140" cy="58" r="3" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <circle cx="140" cy="58" r="1.2" fill={NAVY} />

      {/* outer claw — left */}
      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [12, -2, 12] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M140 60 L100 95 L105 105 L142 75 Z" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      </motion.g>

      {/* outer claw — right */}
      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [-12, 2, -12] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M140 60 L180 95 L175 105 L138 75 Z" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      </motion.g>

      {/* inner fingers */}
      <motion.g
        style={{ transformOrigin: "140px 60px" }}
        animate={{ rotate: [10, 0, 10], scale: [1, 0.9, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M125 60 L120 95 L128 100 L132 70 Z" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.5" />
        <path d="M155 60 L160 95 L152 100 L148 70 Z" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.5" />
      </motion.g>

      {/* picked-up material */}
      <motion.g
        animate={{ y: [0, -6, 0], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: 1 }}
      >
        <circle cx="135" cy="100" r="2" fill="none" stroke={NAVY} strokeWidth="0.5" />
        <circle cx="142" cy="105" r="1.6" fill="none" stroke={NAVY} strokeWidth="0.5" />
        <circle cx="146" cy="98" r="1.4" fill="none" stroke={NAVY} strokeWidth="0.5" />
      </motion.g>

      {/* ground */}
      <line x1="0" y1="125" x2="280" y2="125" stroke={ANNOT} strokeWidth="0.4" strokeDasharray="2 1.5" />

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        OPENING 1 200 mm · 4 / 5 / 6 TINE
      </text>
    </BlueprintFrame>
  );
}
