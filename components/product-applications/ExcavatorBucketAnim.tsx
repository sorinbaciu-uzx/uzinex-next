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

export function ExcavatorBucketAnim() {
  return (
    <BlueprintFrame uid="exc-bucket" title="Excavare · nivelare" code="UZX-EXB">
      {/* ground line */}
      <line x1="20" y1="115" x2="260" y2="115" stroke={ANNOT} strokeWidth="0.5" />
      {/* ground hatching */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1={20 + i * 12}
          y1="120"
          x2={26 + i * 12}
          y2="115"
          stroke={ANNOT}
          strokeWidth="0.3"
        />
      ))}

      {/* arm pivot */}
      <circle cx="60" cy="50" r="2.4" fill={NAVY} />
      <text x="65" y="48" fontSize="3" fill={ANNOT} fontFamily="ui-monospace, monospace">P1</text>

      <motion.g
        style={{ transformOrigin: "60px 50px" }}
        animate={{ rotate: [0, 25, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* arm */}
        <line x1="60" y1="50" x2="190" y2="80" stroke={NAVY} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="50" x2="190" y2="80" stroke={ORANGE} strokeWidth="0.5" strokeDasharray="4 2" />

        {/* bucket pivot */}
        <circle cx="190" cy="80" r="1.8" fill={NAVY} />

        <motion.g
          style={{ transformOrigin: "190px 80px" }}
          animate={{ rotate: [10, -25, 10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M180 70 L210 70 L220 95 L185 100 Z" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
          {/* teeth */}
          <path d="M183 99 L188 105 M193 99 L198 105 M203 99 L208 105 M213 99 L218 105" stroke={NAVY} strokeWidth="0.6" />
        </motion.g>
      </motion.g>

      {/* dirt particles */}
      {[140, 165, 190].map((cx, i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy="118"
          r="1.2"
          fill={ORANGE}
          animate={{ y: [0, -8, 0], opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <Dim x1={60} y1={50} x2={190} y2={50} label="3 200 mm" side="top" delay={1.0} />
    </BlueprintFrame>
  );
}
