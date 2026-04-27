"use client";

import { motion } from "motion/react";

export function FurnitureAssemblyAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      {[
        { y: 105, w: 130, x: 75, c: "#a89077" },
        { y: 90, w: 110, x: 85, c: "#a89077" },
        { y: 75, w: 90, x: 95, c: "#bca085" },
      ].map((p, i) => (
        <motion.g
          key={i}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: [-30, 0, 0], opacity: [0, 1, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6, times: [0, 0.4, 1] }}
        >
          <rect x={p.x} y={p.y} width={p.w} height="10" fill={p.c} stroke="#7a5d3f" strokeWidth="0.6" />
          <line x1={p.x + 5} y1={p.y + 5} x2={p.x + p.w - 5} y2={p.y + 5} stroke="#7a5d3f" strokeWidth="0.4" opacity="0.5" />
        </motion.g>
      ))}

      <motion.g
        animate={{ y: [-20, 0, -20] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <rect x="105" y="50" width="70" height="14" fill="#bca085" stroke="#7a5d3f" strokeWidth="0.6" />
      </motion.g>

      <motion.line
        x1="140"
        y1="35"
        x2="140"
        y2="50"
        stroke="#1e6bb8"
        strokeWidth="1"
        strokeDasharray="3 2"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.6 }}
      />
      <motion.circle
        cx="140"
        cy="35"
        r="3"
        fill="#f5851f"
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.6 }}
      />

      <line x1="20" y1="118" x2="260" y2="118" stroke="#cdd7e4" strokeWidth="1.4" />

      <text x="140" y="22" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">PRODUCȚIE MOBILIER</text>
    </svg>
  );
}
