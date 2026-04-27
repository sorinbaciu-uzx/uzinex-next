"use client";

import { motion } from "motion/react";

export function PtzCameraAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="ptzCone" cx="0" cy="0.5" r="1">
          <stop offset="0%" stopColor="#f5851f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#f5851f" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="280" height="145" fill="#ffffff" />

      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx="140"
          cy="80"
          r={20 + i * 18}
          fill="none"
          stroke="#1e6bb8"
          strokeWidth="0.6"
          strokeDasharray="3 4"
          initial={{ opacity: 0.05 + i * 0.05 }}
          animate={{ opacity: [0.05 + i * 0.05, 0.25, 0.05 + i * 0.05] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
        />
      ))}

      <motion.g
        style={{ transformOrigin: "140px 80px" }}
        animate={{ rotate: [-55, 55, -55] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M140 80 L240 50 A 105 105 0 0 1 240 110 Z"
          fill="url(#ptzCone)"
        />

        <motion.line
          x1="140"
          y1="80"
          x2="240"
          y2="80"
          stroke="#f5851f"
          strokeWidth="0.6"
          strokeDasharray="3 3"
          animate={{ strokeDashoffset: [0, -6] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
        />
      </motion.g>

      <g>
        <circle cx="140" cy="80" r="14" fill="#0b2b66" />
        <circle cx="140" cy="80" r="9" fill="#1e6bb8" />
        <motion.circle
          cx="140"
          cy="80"
          r="4.5"
          fill="#f5851f"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{ transformOrigin: "140px 80px" }}
        />
        <circle cx="140" cy="80" r="1.6" fill="#ffffff" />
      </g>

      <text
        x="140"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fill="#0b2b66"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="ui-monospace, monospace"
      >
        PTZ 360° · ZOOM 10×
      </text>

      <text
        x="140"
        y="135"
        textAnchor="middle"
        fontSize="8"
        fill="#6b7a92"
        fontFamily="ui-monospace, monospace"
      >
        rotație continuă
      </text>
    </svg>
  );
}
