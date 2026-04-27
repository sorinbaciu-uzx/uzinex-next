"use client";

import { motion } from "motion/react";

export function PipeInspectionAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="pipeGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eef5" />
          <stop offset="100%" stopColor="#cdd7e4" />
        </linearGradient>
        <radialGradient id="lightCone" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#f5851f" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f5851f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="280" height="145" fill="#ffffff" />

      <rect x="0" y="50" width="280" height="45" fill="url(#pipeGrad)" />
      <line x1="0" y1="50" x2="280" y2="50" stroke="#1e6bb8" strokeWidth="1.4" />
      <line x1="0" y1="95" x2="280" y2="95" stroke="#1e6bb8" strokeWidth="1.4" />

      {[40, 90, 140, 190, 240].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1={55}
          x2={x}
          y2={90}
          stroke="#1e6bb8"
          strokeWidth="0.8"
          strokeDasharray="2 3"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.g
        initial={{ x: 0 }}
        animate={{ x: [0, 200, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="50" cy="72" rx="40" ry="14" fill="url(#lightCone)" />

        <rect x="20" y="64" width="22" height="16" rx="2" fill="#0b2b66" />
        <circle cx="42" cy="72" r="5" fill="#f5851f" />
        <circle cx="42" cy="72" r="2.4" fill="#fff" />

        <circle cx="22" cy="80" r="3" fill="#1e6bb8" />
        <circle cx="40" cy="80" r="3" fill="#1e6bb8" />
        <line x1="20" y1="80" x2="42" y2="80" stroke="#0b2b66" strokeWidth="1" />
      </motion.g>

      <motion.circle
        cx="42"
        cy="72"
        r="6"
        fill="none"
        stroke="#f5851f"
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: [0, 0.6, 0], scale: [1, 2.2, 2.6] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        style={{ transformOrigin: "42px 72px" }}
      />

      <text x="140" y="20" textAnchor="middle" fontSize="9" fill="#0b2b66" fontWeight="600" letterSpacing="2" fontFamily="ui-monospace, monospace">
        SCAN ACTIV
      </text>
      <motion.circle
        cx="105"
        cy="17"
        r="2.5"
        fill="#f5851f"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />

      <text x="140" y="125" textAnchor="middle" fontSize="8" fill="#6b7a92" fontFamily="ui-monospace, monospace">
        Ø 200 – 3.500 mm
      </text>
    </svg>
  );
}
