"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ORANGE = "#f5851f";
const BLUE = "#1e6bb8";
const BLUE_DEEP = "#082545";
const OK = "#16a34a";

function GridBg({ id }: { id: string }) {
  return (
    <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
      <path d="M 16 0 L 0 0 0 16" fill="none" stroke={GRID_COLOR} strokeWidth="0.4" />
    </pattern>
  );
}

export function ApprovalPipelineAnimation() {
  return (
    <svg
      viewBox="0 0 480 180"
      className="w-full h-auto block"
      role="img"
      aria-label="Flux aprobare credite și leasing prin 10 parteneri financiari în 48 de ore"
    >
      <defs>
        <GridBg id="grid-pipe" />
        <linearGradient id="pipe-progress" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={ORANGE} stopOpacity="0.95" />
          <stop offset="100%" stopColor={ORANGE} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width="480" height="180" fill="url(#grid-pipe)" />

      <text x="20" y="22" fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
        APROBARE PARALELĂ · 10 PARTENERI
      </text>

      <g transform="translate(40,46)">
        {Array.from({ length: 10 }).map((_, i) => {
          const x = i * 42;
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={0}
                r={5}
                fill="white"
                stroke={BLUE}
                strokeWidth="1.2"
                animate={{
                  fill: ["white", OK, "white"],
                  stroke: [BLUE, OK, BLUE],
                }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  delay: 0.3 + i * 0.12,
                  times: [0, 0.5, 1],
                }}
              />
              <text x={x} y={16} textAnchor="middle" fontSize="6" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
                P{(i + 1).toString().padStart(2, "0")}
              </text>
              <line x1={x} y1={6} x2={x} y2={36} stroke={STROKE_DIM} strokeWidth="0.4" strokeDasharray="2 2" />
            </g>
          );
        })}
      </g>

      <g transform="translate(40,98)">
        <line x1={-4} y1={0} x2={384} y2={0} stroke={STROKE_INK} strokeWidth="0.8" />

        <rect x={0} y={-12} width={384} height={20} fill="white" stroke={STROKE_DIM} strokeWidth="0.6" />

        <motion.rect
          x={0}
          y={-12}
          height={20}
          fill="url(#pipe-progress)"
          animate={{ width: [0, 384] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.g
          animate={{ x: [0, 384] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x={-10} y={-18} width={20} height={32} fill="white" stroke={STROKE_INK} strokeWidth="1" />
          <line x1={-6} y1={-12} x2={6} y2={-12} stroke={STROKE_INK} strokeWidth="0.5" />
          <line x1={-6} y1={-7} x2={6} y2={-7} stroke={STROKE_INK} strokeWidth="0.5" />
          <line x1={-6} y1={-2} x2={6} y2={-2} stroke={STROKE_INK} strokeWidth="0.5" />
          <line x1={-6} y1={3} x2={2} y2={3} stroke={STROKE_INK} strokeWidth="0.5" />
        </motion.g>

        <text x={-4} y={26} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          DEPUI DOSAR
        </text>
        <text x={384} y={26} textAnchor="end" fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" fontWeight="bold">
          APROBAT
        </text>
      </g>

      <g transform="translate(40,148)">
        <text x={0} y={0} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          T
        </text>
        <line x1={10} y1={-3} x2={384} y2={-3} stroke={STROKE_DIM} strokeWidth="0.4" />
        <text x={10} y={10} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          0h
        </text>
        <text x={130} y={10} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          12h
        </text>
        <text x={250} y={10} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          24h
        </text>
        <text x={370} y={10} textAnchor="end" fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" fontWeight="bold">
          48h
        </text>
      </g>
    </svg>
  );
}

export function FundingPipelineAnimation() {
  const programs = Array.from({ length: 12 }).map((_, i) => {
    const intensities = [30, 45, 50, 60, 65, 70, 80, 50, 40, 55, 100, 75];
    return { id: i, intensity: intensities[i] };
  });

  return (
    <svg
      viewBox="0 0 480 180"
      className="w-full h-auto block"
      role="img"
      aria-label="Pipeline 12 programe finanțare europeană și guvernamentală cu intensitate ajutor"
    >
      <defs>
        <GridBg id="grid-funding" />
      </defs>
      <rect width="480" height="180" fill="url(#grid-funding)" />

      <text x="20" y="22" fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
        12 PROGRAME · INTENSITATE 30–100%
      </text>

      <g transform="translate(40,42)">
        {programs.map((p, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          const x = col * 64;
          const y = row * 36;
          const widthFromIntensity = (p.intensity / 100) * 50;
          return (
            <g key={p.id} transform={`translate(${x},${y})`}>
              <rect width={56} height={28} fill="white" stroke={STROKE_DIM} strokeWidth="0.5" />

              <rect x={3} y={3} width={50} height={4} fill="#eef0f5" />
              <motion.rect
                x={3}
                y={3}
                height={4}
                fill={ORANGE}
                animate={{ width: [0, widthFromIntensity, widthFromIntensity, 0] }}
                transition={{
                  duration: 3.6,
                  times: [0, 0.5, 0.85, 1],
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
              />

              <text x={28} y={18} textAnchor="middle" fontSize="7" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
                {p.intensity === 100 ? "100" : p.intensity.toString()}%
              </text>
              <text x={28} y={25} textAnchor="middle" fontSize="5.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="0.5">
                PRG · {(p.id + 1).toString().padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </g>

      <g transform="translate(40,128)">
        <text x={0} y={10} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          PROIECT
        </text>
        <motion.rect
          x={50}
          y={2}
          height={12}
          fill={BLUE}
          animate={{ width: [0, 280, 280, 0] }}
          transition={{ duration: 4, times: [0, 0.5, 0.85, 1], repeat: Infinity }}
        />
        <text x={340} y={10} textAnchor="end" fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" fontWeight="bold">
          ELIGIBIL
        </text>
        <line x1={350} y1={8} x2={384} y2={8} stroke={ORANGE} strokeWidth="1" markerEnd="url(#arrow-fp)" />
        <defs>
          <marker id="arrow-fp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={ORANGE} />
          </marker>
        </defs>
      </g>

      <g transform="translate(40,156)">
        <text x={0} y={0} fontSize="6.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="1">
          HORIZON · PNRR · POCIDIF · IND. PRELUCR. 447M€ · F. MODERNIZARE · E-MOBILITY
        </text>
      </g>
    </svg>
  );
}

export function DirectGuaranteesAnimation() {
  const guarantees = [
    "BO AVAL",
    "GAJ",
    "CEC",
    "CESIUNE",
    "FIDEJUSI.",
    "IPOTECĂ M.",
    "SGB",
  ];

  return (
    <svg
      viewBox="0 0 480 180"
      className="w-full h-auto block"
      role="img"
      aria-label="Credit furnizor direct cu 7 tipuri de garanții fără intermediar bancar"
    >
      <defs>
        <GridBg id="grid-guarantees" />
      </defs>
      <rect width="480" height="180" fill="url(#grid-guarantees)" />

      <text x="20" y="22" fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
        DIRECT · 0 INTERMEDIARI · 7 GARANȚII
      </text>

      <g transform="translate(50,90)">
        <rect x={-30} y={-18} width={60} height={36} fill={BLUE_DEEP} />
        <text x={0} y={-2} textAnchor="middle" fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          UZINEX
        </text>
        <text x={0} y={10} textAnchor="middle" fontSize="6" fill="white" fontFamily="ui-monospace, monospace">
          furnizor
        </text>
      </g>

      <g transform="translate(380,90)">
        <rect x={-30} y={-18} width={60} height={36} fill="white" stroke={STROKE_INK} strokeWidth="1" />
        <text x={0} y={-2} textAnchor="middle" fontSize="7" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          CLIENT
        </text>
        <text x={0} y={10} textAnchor="middle" fontSize="6" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          12–60 luni
        </text>
      </g>

      <line x1={80} y1={90} x2={350} y2={90} stroke={STROKE_DIM} strokeWidth="0.8" strokeDasharray="3 3" />

      <motion.g
        animate={{ x: [0, 270, 270, 0] }}
        transition={{ duration: 4, times: [0, 0.45, 0.55, 1], repeat: Infinity, ease: "easeInOut" }}
      >
        <rect x={75} y={84} width={14} height={12} fill={ORANGE} />
        <text x={82} y={93} textAnchor="middle" fontSize="6" fill="white" fontFamily="ui-monospace, monospace" fontWeight="bold">
          €
        </text>
      </motion.g>

      <g transform="translate(215,90)">
        <text x={0} y={-32} textAnchor="middle" fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          7 GARANȚII
        </text>
        {guarantees.map((g, i) => {
          const angle = (i / guarantees.length) * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * 50;
          const y = Math.sin(angle) * 22 - 6;
          return (
            <motion.g
              key={g}
              transform={`translate(${x},${y})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 4,
                times: [0, 0.2 + i * 0.05, 0.85, 1],
                repeat: Infinity,
                delay: 0,
              }}
            >
              <circle r={11} fill="white" stroke={BLUE} strokeWidth="0.8" />
              <text textAnchor="middle" fontSize="5" fill={BLUE_DEEP} fontFamily="ui-monospace, monospace" fontWeight="bold" y={1.5}>
                {g}
              </text>
            </motion.g>
          );
        })}
      </g>

      <g transform="translate(215,156)">
        <line x1={-110} y1={0} x2={110} y2={0} stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
        <text x={0} y={-4} textAnchor="middle" fontSize="6.5" fill="#dc2626" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          ZERO BANCĂ TERȚĂ ÎN DECIZIE
        </text>
      </g>
    </svg>
  );
}

export function InstrumentAnimation({ index }: { index: number }) {
  if (index === 0) return <ApprovalPipelineAnimation />;
  if (index === 1) return <FundingPipelineAnimation />;
  return <DirectGuaranteesAnimation />;
}
