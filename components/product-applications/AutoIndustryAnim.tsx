"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  Dim,
  Annotation,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function AutoIndustryAnim() {
  return (
    <BlueprintFrame uid="auto" title="Industrie auto" code="UZX-AUT">
      {/* ground line */}
      <line x1="20" y1="115" x2="260" y2="115" stroke={ANNOT} strokeWidth="0.4" />
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={20 + i * 12} y1="120" x2={26 + i * 12} y2="115" stroke={ANNOT} strokeWidth="0.3" />
      ))}

      {/* car body — drawn with subtle bounce */}
      <motion.g
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* lower body */}
        <path
          d="M70 105 L80 92 L100 78 L160 78 L185 92 L210 105 Z"
          fill={FILL_NAVY}
          stroke={NAVY}
          strokeWidth="0.7"
        />
        {/* roof window */}
        <path d="M100 78 L108 68 L160 68 L160 78" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.5" />
        {/* door */}
        <line x1="135" y1="78" x2="135" y2="105" stroke={NAVY} strokeWidth="0.4" />
        {/* center axis */}
        <line x1="140" y1="68" x2="140" y2="115" stroke={ANNOT} strokeWidth="0.25" strokeDasharray="2 1" />
      </motion.g>

      {/* wheels — rotate */}
      <motion.g
        style={{ transformOrigin: "90px 110px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="90" cy="110" r="9" fill="none" stroke={NAVY} strokeWidth="0.7" />
        <circle cx="90" cy="110" r="3" fill={NAVY} />
        <line x1="90" y1="101" x2="90" y2="119" stroke={NAVY} strokeWidth="0.5" />
        <line x1="81" y1="110" x2="99" y2="110" stroke={NAVY} strokeWidth="0.5" />
      </motion.g>
      <motion.g
        style={{ transformOrigin: "190px 110px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="190" cy="110" r="9" fill="none" stroke={NAVY} strokeWidth="0.7" />
        <circle cx="190" cy="110" r="3" fill={NAVY} />
        <line x1="190" y1="101" x2="190" y2="119" stroke={NAVY} strokeWidth="0.5" />
        <line x1="181" y1="110" x2="199" y2="110" stroke={NAVY} strokeWidth="0.5" />
      </motion.g>

      {/* axle reference */}
      <line x1="90" y1="110" x2="190" y2="110" stroke={ANNOT} strokeWidth="0.3" strokeDasharray="2 1" />

      {/* exhaust */}
      {[210, 218, 226].map((cx, i) => (
        <motion.line
          key={i}
          x1={cx} y1={95} x2={cx + 6} y2={95}
          stroke={ORANGE} strokeWidth="0.5"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      {/* highlight: critical node */}
      <motion.circle
        cx="135" cy="92" r="2.5"
        fill="none" stroke={ORANGE} strokeWidth="0.5"
        animate={{ scale: [1, 1.6, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ transformOrigin: "135px 92px" }}
      />
      <circle cx="135" cy="92" r="0.8" fill={ORANGE} />

      <Dim x1={70} y1={105} x2={210} y2={105} label="L 4 200" side="bottom" delay={1.0} offset={5} />
      <Annotation x={135} y={92} tx={180} ty={48} text="NOD CRITIC" delay={1.4} />
    </BlueprintFrame>
  );
}
