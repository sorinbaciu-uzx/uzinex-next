"use client";

import { motion } from "motion/react";

const MACHINES = [
  {
    label: "CNC",
    angle: -72,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4">
        <rect x="3" y="3" width="18" height="14" rx="1" />
        <path d="M7 21h10M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Presă",
    angle: -36,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4">
        <path d="M12 2v8M8 6h8M6 14h12v6H6z" />
      </svg>
    ),
  },
  {
    label: "Laser",
    angle: 0,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4">
        <path d="M12 2L2 22h20L12 2z" />
        <path d="M12 10v6" />
      </svg>
    ),
  },
  {
    label: "Stivuitor",
    angle: 36,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4">
        <rect x="3" y="8" width="12" height="10" rx="1" />
        <path d="M18 12h3v6h-3M6 18v3M12 18v3" />
        <circle cx="6" cy="21" r="1" fill="currentColor" />
        <circle cx="12" cy="21" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Robot",
    angle: 72,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" className="w-4 h-4">
        <path d="M12 2a2 2 0 012 2v3h-4V4a2 2 0 012-2z" />
        <rect x="4" y="7" width="16" height="10" rx="2" />
        <circle cx="9" cy="12" r="1.5" fill="currentColor" />
        <circle cx="15" cy="12" r="1.5" fill="currentColor" />
        <path d="M8 17v4M16 17v4" />
      </svg>
    ),
  },
];

const CYCLE = 7;
const CX = 120;
const CY = 85;
const R = 65;

export function EdgeWaterfall() {
  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-6"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(30,107,184,0.2) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <svg viewBox="0 0 320 180" className="w-full h-full relative z-10">
        {/* Connection lines from machines to gateway — with animated particles */}
        {MACHINES.map((m, i) => {
          const rad = ((m.angle - 90) * Math.PI) / 180;
          const mx = CX + R * Math.cos(rad);
          const my = CY + R * Math.sin(rad);
          return (
            <g key={i}>
              {/* Static line */}
              <line
                x1={mx}
                y1={my}
                x2={CX}
                y2={CY}
                stroke="rgba(30,107,184,0.15)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
              />
              {/* Animated particle flowing to center */}
              <motion.circle
                r="2"
                fill="#1e6bb8"
                animate={{
                  cx: [mx, CX],
                  cy: [my, CY],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.8,
                  repeat: Infinity,
                  repeatDelay: CYCLE - 2,
                  ease: "easeInOut",
                }}
              />
              <motion.circle
                r="1.5"
                fill="#1e6bb8"
                animate={{
                  cx: [mx, CX],
                  cy: [my, CY],
                  opacity: [0, 0.6, 0.6, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.8 + 0.3,
                  repeat: Infinity,
                  repeatDelay: CYCLE - 2,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Gateway to ERP line */}
        <line
          x1={CX}
          y1={CY}
          x2={280}
          y2={30}
          stroke="rgba(245,133,31,0.2)"
          strokeWidth="1"
        />
        <motion.line
          x1={CX}
          y1={CY}
          x2={280}
          y2={30}
          stroke="#f5851f"
          strokeWidth="1.5"
          animate={{
            pathLength: [0, 0, 1, 1, 0],
            opacity: [0, 0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.55, 0.7, 0.85, 0.95],
          }}
        />

        {/* Machine nodes */}
        {MACHINES.map((m, i) => {
          const rad = ((m.angle - 90) * Math.PI) / 180;
          const mx = CX + R * Math.cos(rad);
          const my = CY + R * Math.sin(rad);
          return (
            <g key={`node-${i}`}>
              <motion.rect
                x={mx - 14}
                y={my - 14}
                width={28}
                height={28}
                fill="rgba(30,107,184,0.1)"
                stroke="rgba(30,107,184,0.3)"
                strokeWidth="0.5"
                animate={{
                  stroke: [
                    "rgba(30,107,184,0.3)",
                    "rgba(30,107,184,0.3)",
                    "rgba(30,107,184,0.8)",
                    "rgba(30,107,184,0.8)",
                    "rgba(30,107,184,0.3)",
                  ],
                }}
                transition={{
                  duration: CYCLE,
                  repeat: Infinity,
                  times: [0, i * 0.1, i * 0.1 + 0.08, 0.8, 0.95],
                }}
              />
              {/* icon positioned via foreignObject */}
              <foreignObject x={mx - 8} y={my - 8} width={16} height={16}>
                <div className="text-[#1e6bb8] flex items-center justify-center w-full h-full">
                  {m.icon}
                </div>
              </foreignObject>
              <text
                x={mx}
                y={my + 22}
                textAnchor="middle"
                className="text-[6px]"
                fill="rgba(255,255,255,0.4)"
                fontFamily="monospace"
              >
                {m.label}
              </text>
            </g>
          );
        })}

        {/* Central GATEWAY node */}
        <motion.rect
          x={CX - 20}
          y={CY - 20}
          width={40}
          height={40}
          fill="rgba(245,133,31,0.1)"
          stroke="#f5851f"
          strokeWidth="1"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(245,133,31,0)",
              "0 0 20px 5px rgba(245,133,31,0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        {/* Gateway pulse */}
        <motion.rect
          x={CX - 20}
          y={CY - 20}
          width={40}
          height={40}
          fill="none"
          stroke="#f5851f"
          strokeWidth="0.5"
          animate={{
            scale: [1, 1.5, 1.5],
            opacity: [0.6, 0, 0],
          }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text
          x={CX}
          y={CY - 2}
          textAnchor="middle"
          className="text-[6px]"
          fill="#f5851f"
          fontFamily="monospace"
          fontWeight="bold"
        >
          GATEWAY
        </text>
        <text
          x={CX}
          y={CY + 6}
          textAnchor="middle"
          className="text-[5px]"
          fill="rgba(245,133,31,0.6)"
          fontFamily="monospace"
        >
          Edge
        </text>

        {/* ERP node */}
        <motion.rect
          x={260}
          y={15}
          width={50}
          height={30}
          fill="rgba(30,107,184,0.05)"
          stroke="rgba(30,107,184,0.3)"
          strokeWidth="0.5"
          animate={{
            fill: [
              "rgba(30,107,184,0.05)",
              "rgba(30,107,184,0.05)",
              "rgba(30,107,184,0.15)",
              "rgba(30,107,184,0.15)",
              "rgba(30,107,184,0.05)",
            ],
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.65, 0.72, 0.85, 0.95],
          }}
        />
        <text
          x={285}
          y={28}
          textAnchor="middle"
          className="text-[6px]"
          fill="rgba(255,255,255,0.5)"
          fontFamily="monospace"
          fontWeight="bold"
        >
          ERP
        </text>
        <motion.text
          x={285}
          y={38}
          textAnchor="middle"
          className="text-[5px]"
          fontFamily="monospace"
          animate={{
            fill: [
              "rgba(255,255,255,0.2)",
              "rgba(255,255,255,0.2)",
              "rgb(74,222,128)",
              "rgb(74,222,128)",
              "rgba(255,255,255,0.2)",
            ],
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.65, 0.72, 0.85, 0.95],
          }}
        >
          Producție: LIVE
        </motion.text>
      </svg>
    </div>
  );
}
