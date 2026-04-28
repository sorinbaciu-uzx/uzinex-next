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

export function CncSpindleAnim() {
  return (
    <BlueprintFrame uid="cnc-spindle" title="Frezare CNC 3-axe" code="UZX-CNC" axes={["X", "Z"]}>
      {/* workpiece */}
      <rect x="40" y="100" width="200" height="14" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      <line x1="40" y1="107" x2="240" y2="107" stroke={NAVY} strokeWidth="0.2" strokeDasharray="2 1" opacity="0.5" />

      {/* toolpath — drawn progressively */}
      <motion.path
        d="M 50 105 L 100 105 L 100 102 L 150 102 L 150 105 L 200 105 L 200 102 L 230 102"
        fill="none"
        stroke={ORANGE}
        strokeWidth="0.6"
        strokeDasharray="2.5 1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* spindle group sliding along X */}
      <motion.g
        animate={{ x: [0, 160, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* tool holder */}
        <rect x="60" y="35" width="20" height="50" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <rect x="63" y="38" width="14" height="40" fill="rgba(11,43,102,0.15)" stroke={NAVY} strokeWidth="0.3" />

        {/* shank */}
        <line x1="70" y1="85" x2="70" y2="92" stroke={NAVY} strokeWidth="1.4" />

        {/* spinning bit */}
        <motion.g
          style={{ transformOrigin: "70px 95px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="70" cy="95" r="4" fill="rgba(11,43,102,0.10)" stroke={NAVY} strokeWidth="0.5" />
          <line x1="66" y1="95" x2="74" y2="95" stroke={NAVY} strokeWidth="0.6" />
          <line x1="70" y1="91" x2="70" y2="99" stroke={NAVY} strokeWidth="0.6" />
        </motion.g>

        {/* tool tip + spark */}
        <motion.circle
          cx="70" cy="100" r="1.6"
          fill={ORANGE}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 0.4, repeat: Infinity }}
          style={{ transformOrigin: "70px 100px" }}
        />

        {/* chips flying */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={70 + i * 1.5}
            y="100"
            width="0.7"
            height="0.7"
            fill={NAVY}
            animate={{
              x: [70 + i * 1.5, 76 + i * 4],
              y: [100, 108 + i * 2],
              opacity: [1, 0],
            }}
            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </motion.g>

      {/* dimensions */}
      <Dim x1={40} y1={100} x2={240} y2={100} label="200" side="top" delay={1.0} offset={6} />
      <Dim x1={240} y1={100} x2={240} y2={114} label="14" side="right" delay={1.2} offset={6} />

      <text
        x={140} y={32}
        textAnchor="middle"
        fontSize="3.2"
        fill={ORANGE}
        fontFamily="ui-monospace, monospace"
      >
        F = 1 200 mm/min · S = 8 000 RPM
      </text>
    </BlueprintFrame>
  );
}
