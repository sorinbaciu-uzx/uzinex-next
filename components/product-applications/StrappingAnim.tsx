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

export function StrappingAnim() {
  return (
    <BlueprintFrame uid="strapping" title="Legare bandă" code="UZX-STR">
      {/* package */}
      <rect x="80" y="55" width="120" height="60" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* package texture */}
      <line x1="80" y1="64" x2="200" y2="64" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
      <line x1="80" y1="74" x2="200" y2="74" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
      <line x1="80" y1="84" x2="200" y2="84" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
      <line x1="80" y1="94" x2="200" y2="94" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />
      <line x1="80" y1="104" x2="200" y2="104" stroke={ANNOT} strokeWidth="0.3" opacity="0.5" />

      {/* first strap */}
      <motion.rect
        x="105" y="50" width="6" height="70"
        fill="rgba(245,133,31,0.10)" stroke={ORANGE} strokeWidth="0.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.4, 1] }}
        style={{ transformOrigin: "108px 50px" }}
      />

      {/* second strap */}
      <motion.rect
        x="165" y="50" width="6" height="70"
        fill="rgba(245,133,31,0.10)" stroke={ORANGE} strokeWidth="0.5"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.4, 0.7, 1] }}
        style={{ transformOrigin: "168px 50px" }}
      />

      {/* welder/tensioner */}
      <motion.g
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        style={{ transformOrigin: "108px 85px" }}
      >
        <circle cx="108" cy="85" r="2" fill="none" stroke={ORANGE} strokeWidth="0.6" />
        <circle cx="108" cy="85" r="0.8" fill={ORANGE} />
      </motion.g>

      <Dim x1={80} y1={120} x2={200} y2={120} label="L 600" side="bottom" delay={1.0} offset={4} />
      <text x="220" y="80" fontSize="3.2" fill={ORANGE} fontFamily="ui-monospace, monospace">F 200 N</text>
    </BlueprintFrame>
  );
}
