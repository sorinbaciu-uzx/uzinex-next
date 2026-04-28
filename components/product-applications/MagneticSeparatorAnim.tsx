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

export function MagneticSeparatorAnim() {
  return (
    <BlueprintFrame uid="mag-sep" title="Separare magnetică" code="UZX-MAG">
      {/* conveyor belt */}
      <rect x="40" y="78" width="200" height="6" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <motion.line
        x1="40" y1="81" x2="240" y2="81"
        stroke={NAVY}
        strokeWidth="0.3"
        strokeDasharray="3 1.5"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      {/* magnet body */}
      <rect x="80" y="40" width="35" height="30" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <rect x="84" y="44" width="13" height="22" fill="none" stroke={NAVY} strokeWidth="0.4" />
      <rect x="98" y="44" width="13" height="22" fill="none" stroke={NAVY} strokeWidth="0.4" />
      <text x="91" y="58" fontSize="5" fill={NAVY} fontWeight="700" textAnchor="middle" fontFamily="ui-monospace, monospace">N</text>
      <text x="105" y="58" fontSize="5" fill={ORANGE} fontWeight="700" textAnchor="middle" fontFamily="ui-monospace, monospace">S</text>

      {/* magnetic field — pulsing */}
      <motion.path
        d="M 80 70 Q 97 80 115 70"
        fill="none"
        stroke={ORANGE}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* ferrous particles attracted upward */}
      <motion.g
        animate={{ y: [25, -2, 25] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
      >
        <rect x="92" y="76" width="3" height="2" fill={NAVY} />
        <rect x="100" y="74" width="3" height="2" fill={NAVY} />
      </motion.g>

      {/* non-ferrous moving past */}
      <motion.circle
        cx="0" cy="78" r="1.8" fill="none" stroke={ANNOT} strokeWidth="0.5"
        animate={{ x: [40, 240], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.85, 1] }}
      />
      <motion.rect
        x="-2" y="76" width="3" height="2" fill="none" stroke={ANNOT} strokeWidth="0.5"
        animate={{ x: [40, 240], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1, times: [0, 0.1, 0.85, 1] }}
      />

      {/* annotations */}
      <text x="50" y="35" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">FE+</text>
      <line x1="60" y1="34" x2="92" y2="76" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="1.5 1" />

      <text x="245" y="92" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">→ NEFERO</text>

      <Dim x1={40} y1={86} x2={240} y2={86} label="2 000" side="bottom" delay={1.0} offset={6} />
    </BlueprintFrame>
  );
}
