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

export function LatheSpinningAnim() {
  return (
    <BlueprintFrame uid="lathe" title="Strunjire piesă" code="UZX-LTH" axes={["X", "Z"]}>
      {/* bed */}
      <rect x="20" y="100" width="240" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />

      {/* center axis */}
      <line x1="40" y1="78" x2="240" y2="78" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="6 1.5 1 1.5" />

      {/* headstock */}
      <rect x="40" y="55" width="30" height="40" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="44" y="65" width="22" height="20" fill="rgba(245,133,31,0.15)" stroke={ORANGE} strokeWidth="0.4" />

      {/* tailstock */}
      <rect x="210" y="60" width="30" height="35" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <polygon points="210,77 200,77 200,82 210,82" fill={NAVY} />

      {/* workpiece — rotating */}
      <motion.g
        style={{ transformOrigin: "140px 78px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
      >
        <rect x="70" y="65" width="130" height="26" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
        <line x1="80" y1="65" x2="80" y2="91" stroke={NAVY} strokeWidth="0.3" />
        <line x1="120" y1="65" x2="120" y2="91" stroke={NAVY} strokeWidth="0.3" />
        <line x1="160" y1="65" x2="160" y2="91" stroke={NAVY} strokeWidth="0.3" />
        <line x1="190" y1="65" x2="190" y2="91" stroke={NAVY} strokeWidth="0.3" />
      </motion.g>

      {/* tool moving along Z */}
      <motion.g
        animate={{ x: [0, 70, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x="100" y="32" width="14" height="22" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
        <polygon points="103,52 111,52 107,64" fill={NAVY} />
      </motion.g>

      {/* chips flying */}
      {[1, 2, 3, 4].map((i) => (
        <motion.path
          key={i}
          d={`M 130 70 q 12 -${5 + i * 2} 22 0`}
          fill="none"
          stroke={ORANGE} strokeWidth="0.5"
          animate={{ opacity: [0, 1, 0], y: [0, -8] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <Dim x1={70} y1={91} x2={200} y2={91} label="L 1 300" side="bottom" delay={1.0} offset={6} />
      <text x="140" y="32" fontSize="3.2" fill={ORANGE} textAnchor="middle" fontFamily="ui-monospace, monospace">
        S = 2 400 RPM · F = 0.2 mm/rev
      </text>
    </BlueprintFrame>
  );
}
