"use client";

import { motion } from "motion/react";

export function SewerNetworkAnim() {
  const pipes = [
    { d: "M30 70 L120 70", delay: 0 },
    { d: "M120 70 L120 30", delay: 0.4 },
    { d: "M120 70 L120 110", delay: 0.4 },
    { d: "M120 30 L210 30", delay: 0.8 },
    { d: "M120 110 L210 110", delay: 0.8 },
    { d: "M210 30 L210 70", delay: 1.2 },
    { d: "M210 110 L210 70", delay: 1.2 },
    { d: "M210 70 L260 70", delay: 1.6 },
  ];
  const nodes = [
    { x: 30, y: 70 },
    { x: 120, y: 70 },
    { x: 120, y: 30 },
    { x: 120, y: 110 },
    { x: 210, y: 30 },
    { x: 210, y: 110 },
    { x: 210, y: 70 },
    { x: 260, y: 70 },
  ];

  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      {pipes.map((p, i) => (
        <g key={i}>
          <path d={p.d} stroke="#e1e7ef" strokeWidth="6" fill="none" strokeLinecap="round" />
          <motion.path
            d={p.d}
            stroke="#1e6bb8"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              delay: p.delay,
              repeatDelay: 0.6,
              times: [0, 0.4, 1],
            }}
          />
        </g>
      ))}

      {nodes.map((n, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0.6, opacity: 0.4 }}
          animate={{ scale: [0.6, 1.4, 1], opacity: [0.4, 1, 0.7] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            delay: 0.4 + i * 0.3,
            repeatDelay: 2.4,
          }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        >
          <circle cx={n.x} cy={n.y} r="5" fill="#f5851f" />
          <circle cx={n.x} cy={n.y} r="2" fill="#ffffff" />
        </motion.g>
      ))}

      <text
        x="140"
        y="20"
        textAnchor="middle"
        fontSize="9"
        fill="#0b2b66"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="ui-monospace, monospace"
      >
        REȚEA MAPATĂ
      </text>

      <text
        x="140"
        y="138"
        textAnchor="middle"
        fontSize="8"
        fill="#6b7a92"
        fontFamily="ui-monospace, monospace"
      >
        cablu până la 300 m
      </text>
    </svg>
  );
}
