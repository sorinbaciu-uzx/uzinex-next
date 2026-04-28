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

export function JawCrusherAnim() {
  return (
    <BlueprintFrame uid="jaw-crusher" title="Concasare fălci" code="UZX-JAW">
      {/* incoming material — falling stones */}
      <motion.g
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        {[
          { cx: 110, cy: 30, r: 4 },
          { cx: 140, cy: 22, r: 5 },
          { cx: 170, cy: 30, r: 4 },
          { cx: 130, cy: 40, r: 3 },
        ].map((s, i) => (
          <polygon
            key={i}
            points={`${s.cx},${s.cy - s.r} ${s.cx + s.r},${s.cy} ${s.cx + s.r * 0.5},${s.cy + s.r} ${s.cx - s.r * 0.5},${s.cy + s.r} ${s.cx - s.r},${s.cy}`}
            fill="none"
            stroke={NAVY}
            strokeWidth="0.5"
          />
        ))}
      </motion.g>

      {/* fixed jaw (left) */}
      <motion.g
        style={{ transformOrigin: "100px 80px" }}
        animate={{ rotate: [-6, 6, -6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="100,55 100,100 130,90 125,55" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        {/* corrugated face */}
        <line x1="105" y1="60" x2="125" y2="60" stroke={NAVY} strokeWidth="0.4" />
        <line x1="106" y1="70" x2="125" y2="68" stroke={NAVY} strokeWidth="0.4" />
        <line x1="107" y1="80" x2="126" y2="76" stroke={NAVY} strokeWidth="0.4" />
        <line x1="108" y1="90" x2="127" y2="84" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* moving jaw (right) */}
      <motion.g
        style={{ transformOrigin: "180px 80px" }}
        animate={{ rotate: [6, -6, 6] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <polygon points="180,55 180,100 150,90 155,55" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="155" y1="60" x2="175" y2="60" stroke={NAVY} strokeWidth="0.4" />
        <line x1="155" y1="70" x2="174" y2="68" stroke={NAVY} strokeWidth="0.4" />
        <line x1="154" y1="80" x2="173" y2="76" stroke={NAVY} strokeWidth="0.4" />
        <line x1="153" y1="90" x2="172" y2="84" stroke={NAVY} strokeWidth="0.4" />
      </motion.g>

      {/* CSS — closed side setting */}
      <line x1="138" y1="98" x2="142" y2="98" stroke={ORANGE} strokeWidth="0.6" />
      <text x="148" y="100" fontSize="3" fill={ORANGE} fontFamily="ui-monospace, monospace">CSS 40</text>

      {/* fragments out */}
      {[120, 140, 160].map((x, i) => (
        <motion.circle
          key={i}
          cx={x} cy="118" r="1.2"
          fill="none" stroke={NAVY} strokeWidth="0.4"
          animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <Dim x1={100} y1={50} x2={180} y2={50} label="Ø 800" side="top" delay={1.0} offset={6} />
    </BlueprintFrame>
  );
}
