"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ACCENT = "#f5851f";
const LASER = "#ff5722";

function GridBackground() {
  return (
    <pattern
      id="grid"
      width="20"
      height="20"
      patternUnits="userSpaceOnUse"
    >
      <path
        d="M 20 0 L 0 0 0 20"
        fill="none"
        stroke={GRID_COLOR}
        strokeWidth="0.5"
      />
    </pattern>
  );
}

function CornerTable({
  rows,
  x,
  y,
}: {
  rows: Array<[string, string]>;
  x: number;
  y: number;
}) {
  const colW = 72;
  const rowH = 16;
  return (
    <g transform={`translate(${x},${y})`}>
      {rows.map(([key, val], i) => (
        <g key={i} transform={`translate(0,${i * rowH})`}>
          <rect
            x={0}
            y={0}
            width={colW}
            height={rowH}
            fill="white"
            stroke={STROKE_DIM}
            strokeWidth="0.5"
          />
          <rect
            x={colW}
            y={0}
            width={colW}
            height={rowH}
            fill="white"
            stroke={STROKE_DIM}
            strokeWidth="0.5"
          />
          <text
            x={6}
            y={11}
            fontSize="7"
            fill={STROKE_INK}
            fontFamily="ui-monospace, monospace"
          >
            {key}
          </text>
          <text
            x={colW + 6}
            y={11}
            fontSize="7"
            fill={STROKE_INK}
            fontFamily="ui-monospace, monospace"
          >
            {val}
          </text>
        </g>
      ))}
    </g>
  );
}

function AxisXY() {
  return (
    <g transform="translate(20,260)">
      <line x1={0} y1={0} x2={28} y2={0} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow)" />
      <line x1={0} y1={0} x2={0} y2={-28} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow)" />
      <text x={32} y={3} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">x</text>
      <text x={-3} y={-32} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">z</text>
    </g>
  );
}

function ArrowMarker() {
  return (
    <marker
      id="arrow"
      markerWidth="6"
      markerHeight="6"
      refX="5"
      refY="3"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,6 L6,3 Z" fill={STROKE_INK} />
    </marker>
  );
}

function WeldDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto"
      role="img"
      aria-labelledby="weld-title"
    >
      <title id="weld-title">Schema sudură laser pe aluminiu — fascicul focalizat pe seam-ul dintre două componente</title>
      <defs>
        <GridBackground />
        <ArrowMarker />
      </defs>
      <rect width="600" height="320" fill="url(#grid)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        SUDURĂ LASER · ALUMINIU
      </text>

      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        P = 2.000 W · pistol SUP23T · curbă învățare 2h
      </text>

      <g transform="translate(150,120)">
        <rect x={0} y={20} width={140} height={36} fill="#eef3fa" stroke={STROKE_INK} strokeWidth="1" />
        <rect x={160} y={20} width={140} height={36} fill="#eef3fa" stroke={STROKE_INK} strokeWidth="1" />

        <line x1={140} y1={20} x2={160} y2={20} stroke={STROKE_INK} strokeWidth="1" />
        <line x1={140} y1={56} x2={160} y2={56} stroke={STROKE_INK} strokeWidth="1" />

        <motion.g
          initial={{ x: 0 }}
          animate={{ x: 300 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          <line x1={0} y1={-60} x2={0} y2={20} stroke={LASER} strokeWidth="1.4" strokeDasharray="2 2" />
          <circle cx={0} cy={20} r={4} fill={LASER} />
          <circle cx={0} cy={20} r={9} fill={LASER} fillOpacity={0.18} />
        </motion.g>

        <motion.line
          x1={0}
          y1={38}
          x2={0}
          y2={38}
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ x2: [0, 300, 300, 0] }}
          transition={{ duration: 8, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
        />

        <line x1={0} y1={75} x2={300} y2={75} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={0} y1={70} x2={0} y2={80} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={300} y1={70} x2={300} y2={80} stroke={STROKE_DIM} strokeWidth="0.5" />
        <text x={150} y={92} textAnchor="middle" fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
          cordon continuu · aluminiu 3 mm
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-LASER", "REV. A"],
          ["SCALA 1:2", "DIM mm"],
          ["MAT. AL", "FEG-001"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

function CleanDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto"
      role="img"
      aria-labelledby="clean-title"
    >
      <title id="clean-title">Schema curățare laser — îndepărtare rugină de pe componentă metalică fără chimicale</title>
      <defs>
        <GridBackground />
        <ArrowMarker />
        <linearGradient id="rust" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7a4a2c" />
          <stop offset="100%" stopColor="#a0623c" />
        </linearGradient>
      </defs>
      <rect width="600" height="320" fill="url(#grid)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        CURĂȚARE LASER · ZERO CHIMICALE
      </text>

      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        rugină îndepărtată fără sablare, fără solvenți
      </text>

      <g transform="translate(150,140)">
        <rect x={0} y={0} width={300} height={50} fill="#dde4ef" stroke={STROKE_INK} strokeWidth="1" />

        <motion.rect
          x={0}
          y={0}
          width={300}
          height={50}
          fill="url(#rust)"
          animate={{ width: [300, 300, 0, 0] }}
          transition={{ duration: 8, times: [0, 0.1, 0.6, 1], repeat: Infinity, ease: "linear" }}
        />

        <motion.g
          animate={{ x: [0, 300, 300, 0] }}
          transition={{ duration: 8, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
        >
          <line x1={0} y1={-65} x2={0} y2={0} stroke={LASER} strokeWidth="1.4" strokeDasharray="2 2" />
          <ellipse cx={0} cy={1} rx={14} ry={3} fill={LASER} fillOpacity={0.45} />
          <circle cx={0} cy={1} r={3} fill={LASER} />
        </motion.g>

        <line x1={0} y1={65} x2={300} y2={65} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={0} y1={60} x2={0} y2={70} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={300} y1={60} x2={300} y2={70} stroke={STROKE_DIM} strokeWidth="0.5" />
        <text x={150} y={82} textAnchor="middle" fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
          suprafața curățată · 0,3 m²/min
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-LASER", "REV. A"],
          ["SCALA 1:5", "DIM mm"],
          ["IMPACT MEDIU", "ZERO"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

function CutDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto"
      role="img"
      aria-labelledby="cut-title"
    >
      <title id="cut-title">Schema debitare laser — tăiere precisă pe tablă metalică pentru ajustare componente</title>
      <defs>
        <GridBackground />
        <ArrowMarker />
      </defs>
      <rect width="600" height="320" fill="url(#grid)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        DEBITARE LASER · PRECIZIE
      </text>

      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        tăieturi precise pe oțel și aluminiu, fără disc abraziv
      </text>

      <g transform="translate(140,115)">
        <rect x={0} y={0} width={320} height={120} fill="#eef3fa" stroke={STROKE_INK} strokeWidth="1" />

        <motion.path
          d="M 30 30 L 90 30 L 90 90 L 230 90 L 230 30 L 290 30"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          strokeDasharray="4 3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 8, times: [0, 0.5, 0.55, 1], repeat: Infinity, ease: "linear" }}
        />

        <motion.g
          animate={{
            offsetDistance: ["0%", "100%", "100%", "0%"],
          }}
          transition={{ duration: 8, times: [0, 0.5, 0.55, 1], repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath:
              "path('M 30 30 L 90 30 L 90 90 L 230 90 L 230 30 L 290 30')",
          }}
        >
          <circle cx={0} cy={0} r={4} fill={LASER} />
          <circle cx={0} cy={0} r={9} fill={LASER} fillOpacity={0.25} />
        </motion.g>

        <line x1={0} y1={140} x2={320} y2={140} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={0} y1={135} x2={0} y2={145} stroke={STROKE_DIM} strokeWidth="0.5" />
        <line x1={320} y1={135} x2={320} y2={145} stroke={STROKE_DIM} strokeWidth="0.5" />
        <text x={160} y={156} textAnchor="middle" fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
          contur custom · toleranță ± 0,1 mm
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-LASER", "REV. A"],
          ["SCALA 1:3", "DIM mm"],
          ["UNIT mm", "FEG-001"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function LaserApplicationDiagrams() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
      <figure className="border hairline bg-white">
        <WeldDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Aplicația 1 · sudură
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Cordoane premium pe aluminiu, inox și oțel. Owner-ul FEG a învățat
            tehnica în două ore, fără experiență anterioară.
          </p>
        </figcaption>
      </figure>
      <figure className="border hairline bg-white">
        <CleanDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Aplicația 2 · curățare
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Îndepărtare rugină și impurități fără chimicale, fără sablare.
            Alternativă curată pentru pregătirea suprafețelor înainte de sudură.
          </p>
        </figcaption>
      </figure>
      <figure className="border hairline bg-white">
        <CutDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Aplicația 3 · debitare
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Tăieturi precise pentru ajustarea componentelor pe șantier.
            Fără disc abraziv, fără praf, fără scântei.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
