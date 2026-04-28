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

export function CrawlerTracksAnim() {
  return (
    <BlueprintFrame uid="crawler" title="Crawler · 4 roți motoare" code="UZX-CRW">
      {/* base reference */}
      <line x1="20" y1="105" x2="260" y2="105" stroke={ANNOT} strokeWidth="0.4" strokeDasharray="2 1.5" />

      <g transform="translate(95 60)">
        {/* chassis */}
        <rect x="0" y="0" width="90" height="32" rx="2" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />

        {/* electronics bay */}
        <rect x="6" y="6" width="78" height="20" rx="1" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.3" />

        {/* sensor / lens */}
        <circle cx="68" cy="16" r="4.5" fill="rgba(245,133,31,0.12)" stroke={ORANGE} strokeWidth="0.5" />
        <circle cx="68" cy="16" r="1.6" fill={ORANGE} />

        {/* signal lines */}
        <rect x="14" y="10" width="36" height="12" rx="1" fill="none" stroke={NAVY} strokeWidth="0.4" />
        <line x1="20" y1="13" x2="44" y2="13" stroke={ORANGE} strokeWidth="0.4" />
        <line x1="20" y1="16" x2="44" y2="16" stroke={ORANGE} strokeWidth="0.4" opacity="0.6" />
        <line x1="20" y1="19" x2="44" y2="19" stroke={ORANGE} strokeWidth="0.4" opacity="0.4" />

        {/* track frame */}
        <rect x="-4" y="32" width="98" height="14" rx="6" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />

        {/* drive wheels */}
        {[8, 24, 40, 56, 72, 86].map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx} cy="39" r="3"
            fill="none" stroke={NAVY} strokeWidth="0.5"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
            style={{ transformOrigin: `${cx}px 39px` }}
          />
        ))}
        {/* wheel center dots */}
        {[8, 24, 40, 56, 72, 86].map((cx, i) => (
          <circle key={`c-${i}`} cx={cx} cy="39" r="1" fill={NAVY} />
        ))}
      </g>

      {/* track tread moving */}
      <motion.g
        animate={{ x: [0, -16, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        {[40, 56, 72, 88, 104, 120, 136, 152, 168, 184, 200, 216, 232].map((x, i) => (
          <rect
            key={i}
            x={x} y="103" width="8" height="3"
            fill="none" stroke={ORANGE} strokeWidth="0.4"
            opacity="0.6"
          />
        ))}
      </motion.g>

      <Dim x1={91} y1={105} x2={189} y2={105} label="L 980" side="bottom" delay={1.0} offset={5} />
      <text x="20" y="135" fontSize="3.2" fill={ANNOT} fontFamily="ui-monospace, monospace">
        0–25 m/min · IP68
      </text>
    </BlueprintFrame>
  );
}
