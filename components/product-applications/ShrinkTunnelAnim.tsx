"use client";

import { motion } from "motion/react";

export function ShrinkTunnelAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <rect x="60" y="55" width="160" height="55" fill="#0b2b66" rx="3" />
      <rect x="64" y="60" width="152" height="45" fill="#1e6bb8" rx="2" />

      {[80, 100, 120, 140, 160, 180, 200].map((cx, i) => (
        <motion.line
          key={i}
          x1={cx}
          y1={70}
          x2={cx}
          y2={95}
          stroke="#f5851f"
          strokeWidth="1.4"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      <motion.g
        animate={{ x: [-60, 240] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <rect x="0" y="72" width="30" height="22" fill="#a89077" rx="1" />
        <ellipse cx="15" cy="83" rx="20" ry="14" fill="#fff" opacity="0.4" />
      </motion.g>

      <line x1="20" y1="106" x2="260" y2="106" stroke="#cdd7e4" strokeWidth="1.4" />
      <motion.line
        x1="20"
        y1="106"
        x2="260"
        y2="106"
        stroke="#1e6bb8"
        strokeWidth="0.8"
        strokeDasharray="3 3"
        animate={{ strokeDashoffset: [0, -6] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">TUNEL CONTRACȚIE</text>
      <text x="140" y="135" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">folie POF / PVC / PE</text>
    </svg>
  );
}
