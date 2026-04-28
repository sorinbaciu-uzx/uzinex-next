"use client";

import { motion } from "motion/react";
import {
  BlueprintFrame,
  NAVY,
  ORANGE,
  ANNOT,
  FILL_NAVY,
} from "./blueprint";

export function LabelPrintAnim() {
  return (
    <BlueprintFrame uid="label-print" title="Etichetare automată" code="UZX-LBL">
      {/* printer body */}
      <rect x="40" y="40" width="80" height="50" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
      {/* display */}
      <rect x="50" y="50" width="60" height="22" fill="none" stroke={NAVY} strokeWidth="0.5" />
      <motion.line
        x1="52" y1="61" x2="108" y2="61"
        stroke={ORANGE} strokeWidth="0.6"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <text x="80" y="82" fontSize="3" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">PRINT HEAD</text>

      {/* label moving across */}
      <motion.g
        animate={{ x: [0, 90, 90, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }}
      >
        <rect x="125" y="58" width="35" height="22" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.7" />
        <line x1="130" y1="64" x2="155" y2="64" stroke={NAVY} strokeWidth="0.5" />
        <line x1="130" y1="68" x2="150" y2="68" stroke={NAVY} strokeWidth="0.4" />
        {/* barcode lines */}
        <rect x="130" y="71" width="2" height="6" fill={NAVY} />
        <rect x="133" y="71" width="1" height="6" fill={NAVY} />
        <rect x="135" y="71" width="3" height="6" fill={NAVY} />
        <rect x="139" y="71" width="1" height="6" fill={NAVY} />
        <rect x="141" y="71" width="2" height="6" fill={NAVY} />
        <rect x="144" y="71" width="2" height="6" fill={NAVY} />
        <rect x="147" y="71" width="1" height="6" fill={NAVY} />
        <rect x="149" y="71" width="3" height="6" fill={NAVY} />
      </motion.g>

      {/* base + target product */}
      <line x1="20" y1="105" x2="260" y2="105" stroke={ANNOT} strokeWidth="0.4" />
      <rect x="200" y="80" width="50" height="25" rx="1" fill={FILL_NAVY} stroke={NAVY} strokeWidth="0.6" />
      <text x="225" y="96" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace">TARGET</text>

      <text x="140" y="135" fontSize="3.2" fill={ANNOT} textAnchor="middle" fontFamily="ui-monospace, monospace" letterSpacing="1.5">
        SPEED 60 m/min · DPI 300
      </text>
    </BlueprintFrame>
  );
}
