"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ORANGE = "#f5851f";
const STEEL = "#7a8499";
const LASER = "#ff5722";
const OK = "#16a34a";

function GridBg({ id }: { id: string }) {
  return (
    <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke={GRID_COLOR} strokeWidth="0.5" />
    </pattern>
  );
}

function ArrowMarker({ id, color = STROKE_INK }: { id: string; color?: string }) {
  return (
    <marker id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L6,3 Z" fill={color} />
    </marker>
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
          <rect x={0} y={0} width={colW} height={rowH} fill="white" stroke={STROKE_DIM} strokeWidth="0.5" />
          <rect x={colW} y={0} width={colW} height={rowH} fill="white" stroke={STROKE_DIM} strokeWidth="0.5" />
          <text x={6} y={11} fontSize="7" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
            {key}
          </text>
          <text x={colW + 6} y={11} fontSize="7" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
            {val}
          </text>
        </g>
      ))}
    </g>
  );
}

function AxisXY({ x = 20, y = 260 }: { x?: number; y?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={0} y1={0} x2={28} y2={0} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-ai)" />
      <line x1={0} y1={0} x2={0} y2={-28} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-ai)" />
      <text x={32} y={3} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">x</text>
      <text x={-3} y={-32} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">z</text>
    </g>
  );
}

export function NineYearRecordDiagram() {
  const equipment: Array<{ year: number; label: string; flagship?: boolean }> = [
    { year: 2017, label: "LASER 6 kW", flagship: true },
    { year: 2017, label: "ABKANT" },
    { year: 2019, label: "SUDURĂ LASER 2 kW" },
    { year: 2021, label: "ROBOT SUDURĂ" },
    { year: 2023, label: "WATERJET" },
    { year: 2025, label: "PRESĂ 600 t" },
  ];

  const startYear = 2017;
  const endYear = 2026;
  const totalYears = endYear - startYear;

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="ai-record-title">
      <title id="ai-record-title">
        9 ani fără intervenții service pe laserul fiber 6 kW livrat la AIRONE Inox în 2017
      </title>
      <defs>
        <GridBg id="grid-ai-record" />
        <ArrowMarker id="arrow-axis-ai" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-ai-record)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        9 ANI · 0 INTERVENȚII SERVICE
      </text>
      <text x="300" y="62" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        recordul Uzinex pe un laser fiber 6 kW · livrat în 2017, în producție continuă
      </text>

      <g transform="translate(60,150)">
        <line x1={0} y1={0} x2={480} y2={0} stroke={STROKE_INK} strokeWidth="1.4" />

        {Array.from({ length: totalYears + 1 }).map((_, i) => {
          const y = startYear + i;
          const x = (i / totalYears) * 480;
          const isFlag = y === 2017 || y === 2026;
          return (
            <g key={i}>
              <line x1={x} y1={-5} x2={x} y2={5} stroke={STROKE_INK} strokeWidth={isFlag ? 1.4 : 0.6} />
              <text x={x} y={20} textAnchor="middle" fontSize="8" fill={isFlag ? STROKE_INK : STROKE_DIM} fontFamily="ui-monospace, monospace" fontWeight={isFlag ? "bold" : "normal"}>
                {y}
              </text>
            </g>
          );
        })}

        <motion.line
          x1={0}
          y1={-30}
          x2={0}
          y2={-30}
          stroke={OK}
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ x2: [0, 480] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <text x={-8} y={-26} textAnchor="end" fontSize="8" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          UPTIME
        </text>

        <text x={488} y={-50} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="1.5">
          TICKETS SERVICE
        </text>
        <line x1={0} y1={-50} x2={480} y2={-50} stroke={STROKE_DIM} strokeWidth="0.4" strokeDasharray="2 3" />
        <text x={4} y={-40} fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          0
        </text>
        <text x={476} y={-40} textAnchor="end" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          0
        </text>

        {equipment.map((e, i) => {
          const x = ((e.year - startYear) / totalYears) * 480;
          const offset = i % 2 === 0 ? 38 : 60;
          const isFlag = !!e.flagship;
          return (
            <g key={`eq-${i}`}>
              <line
                x1={x}
                y1={5}
                x2={x}
                y2={offset - 6}
                stroke={isFlag ? LASER : STEEL}
                strokeWidth="0.8"
                strokeDasharray={isFlag ? "0" : "2 2"}
              />
              {isFlag ? (
                <motion.circle
                  cx={x}
                  cy={5}
                  r={4.5}
                  fill={LASER}
                  stroke="white"
                  strokeWidth="1"
                  animate={{ scale: [1, 1.25, 1] }}
                  style={{ transformOrigin: `${x}px 5px`, transformBox: "fill-box" }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              ) : (
                <circle cx={x} cy={5} r={3.2} fill={STEEL} stroke="white" strokeWidth="1" />
              )}
              <text
                x={x}
                y={offset}
                textAnchor="middle"
                fontSize="7"
                fill={isFlag ? LASER : STROKE_INK}
                fontFamily="ui-monospace, monospace"
                fontWeight={isFlag ? "bold" : "normal"}
              >
                {e.label}
              </text>
            </g>
          );
        })}
      </g>

      <g transform="translate(60,250)">
        <rect width={220} height={30} fill="white" stroke={LASER} strokeWidth="0.8" />
        <text x={10} y={11} fontSize="7" fill={LASER} fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          FLAGSHIP · LASER FIBER 6 kW
        </text>
        <text x={10} y={23} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          masă transfer · cabină închisă · 9 ani 0 service
        </text>
      </g>
      <g transform="translate(320,250)">
        <rect width={220} height={30} fill="white" stroke={OK} strokeWidth="0.8" />
        <text x={10} y={11} fontSize="7" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
          INVESTIȚIE TOTALĂ · 7 ECHIPAMENTE
        </text>
        <text x={10} y={23} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          ≈ 500.000 € · achiziții recurente 2017–2026
        </text>
      </g>

      <AxisXY x={20} y={296} />
      <CornerTable
        rows={[
          ["UZX-AIR", "REV. A"],
          ["YR", "2017–26"],
          ["LOC", "MĂCIN"],
        ]}
        x={444}
        y={296}
      />
    </svg>
  );
}

export function InoxProductionFlowDiagram() {
  const stations = [
    { x: 30, w: 88, label: "DEBITARE", detail: "laser 6 kW · waterjet" },
    { x: 128, w: 88, label: "ÎNDOIRE", detail: "abkant" },
    { x: 226, w: 88, label: "FORMARE", detail: "presă 600 t" },
    { x: 324, w: 88, label: "SUDURĂ", detail: "laser + robot" },
    { x: 422, w: 110, label: "ASAMBLARE", detail: "manual + control" },
  ];

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="ai-flow-title">
      <title id="ai-flow-title">
        Flux producție echipamente HoReCa inox · de la tablă brută la bucătărie profesională
      </title>
      <defs>
        <GridBg id="grid-ai-flow" />
        <ArrowMarker id="arrow-axis-ai" />
        <ArrowMarker id="arrow-flow-ai" color={STROKE_INK} />
      </defs>
      <rect width="600" height="320" fill="url(#grid-ai-flow)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        FLUX FABRICĂ INOX · HoReCa
      </text>
      <text x="300" y="62" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        tablă inox brută → echipament profesional pentru bucătării de restaurant
      </text>

      <g transform="translate(0,90)">
        {stations.map((s) => (
          <g key={s.label} transform={`translate(${s.x},0)`}>
            <rect width={s.w} height={50} fill="white" stroke={STROKE_INK} strokeWidth="0.9" />
            <rect width={s.w} height={11} fill={STROKE_INK} />
            <text x={s.w / 2} y={8.5} textAnchor="middle" fontSize="7" fill="white" fontFamily="ui-monospace, monospace" letterSpacing="1.5" fontWeight="bold">
              {s.label}
            </text>
            <text x={s.w / 2} y={42} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
              {s.detail}
            </text>
          </g>
        ))}

        {[118, 216, 314, 412].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={26} x2={x + 10} y2={26} stroke={STROKE_INK} strokeWidth="1" markerEnd="url(#arrow-flow-ai)" />
            <motion.circle
              cx={x}
              cy={26}
              r={2.6}
              fill={STEEL}
              animate={{ cx: [x, x + 10, x] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          </g>
        ))}

        <motion.g
          animate={{ scale: [1, 1.18, 1] }}
          style={{ transformOrigin: "74px 26px", transformBox: "fill-box" }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <circle key="laser-glow" cx={74} cy={26} r={3.5} fill={LASER} fillOpacity={0.45} />
          <circle key="laser-core" cx={74} cy={26} r={1.8} fill={LASER} />
        </motion.g>
      </g>

      <g transform="translate(0,170)">
        <text x={30} y={10} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          INTRARE
        </text>
        <text x={84} y={10} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          tablă inox AISI 304 / 316 · grosimi 0,5–10 mm
        </text>
        <text x={30} y={28} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          IEȘIRE
        </text>
        <text x={84} y={28} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          mese inox · dulapuri · cuptoare · vitrine · plite · echipament HoReCa premium
        </text>
        <text x={30} y={46} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          PIEȚE
        </text>
        <text x={84} y={46} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          România · Italia · white label pentru branduri italiene consacrate
        </text>
        <text x={30} y={64} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          STANDARD
        </text>
        <text x={84} y={64} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          calitate ridicată · gama largă · proiectare custom în software industrial
        </text>
      </g>

      <AxisXY x={20} y={296} />
      <CornerTable
        rows={[
          ["UZX-AIR", "REV. A"],
          ["MAT", "INOX 304/316"],
          ["LOC", "MĂCIN"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function CapabilityMatrixDiagram() {
  const operations = [
    { id: "cut-laser", label: "Tăiere laser", row: 0, range: [0.5, 10], strong: [1, 8] },
    { id: "cut-water", label: "Tăiere waterjet", row: 1, range: [0.5, 50], strong: [3, 30] },
    { id: "bend", label: "Îndoire abkant", row: 2, range: [0.5, 10], strong: [1, 6] },
    { id: "form", label: "Formare presă 600 t", row: 3, range: [1, 12], strong: [2, 10] },
    { id: "weld-laser", label: "Sudură laser 2 kW", row: 4, range: [0.5, 5], strong: [1, 4] },
    { id: "weld-robot", label: "Sudură robot", row: 5, range: [1, 12], strong: [2, 8] },
  ];

  const minMM = 0;
  const maxMM = 50;

  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto" role="img" aria-labelledby="ai-cap-title">
      <title id="ai-cap-title">
        Matrice capacitate prelucrare inox · grosimi acoperite de cele 6 operații Uzinex livrate la AIRONE
      </title>
      <defs>
        <GridBg id="grid-ai-cap" />
        <ArrowMarker id="arrow-axis-ai" />
      </defs>
      <rect width="600" height="340" fill="url(#grid-ai-cap)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        MATRICE CAPACITATE · INOX
      </text>
      <text x="300" y="62" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        grosimea pe care o pot prelucra fiecare dintre cele 6 utilaje Uzinex
      </text>

      <g transform="translate(140,90)">
        <line x1={0} y1={0} x2={400} y2={0} stroke={STROKE_INK} strokeWidth="0.8" />
        {[0, 5, 10, 20, 30, 40, 50].map((v) => {
          const x = (v / maxMM) * 400;
          return (
            <g key={v}>
              <line x1={x} y1={-3} x2={x} y2={3} stroke={STROKE_INK} strokeWidth="0.6" />
              <text x={x} y={-8} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
                {v}
              </text>
            </g>
          );
        })}
        <text x={416} y={-2} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="1.5">
          mm
        </text>

        {operations.map((op) => {
          const y = 22 + op.row * 30;
          const x1 = (op.range[0] / maxMM) * 400;
          const x2 = (op.range[1] / maxMM) * 400;
          const xs1 = (op.strong[0] / maxMM) * 400;
          const xs2 = (op.strong[1] / maxMM) * 400;

          return (
            <g key={op.id}>
              <text x={-8} y={y + 4} textAnchor="end" fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
                {op.label}
              </text>

              <line x1={x1} y1={y} x2={x2} y2={y} stroke={STEEL} strokeWidth="1" strokeOpacity={0.5} />
              <line x1={x1} y1={y - 3} x2={x1} y2={y + 3} stroke={STEEL} strokeWidth="0.8" strokeOpacity={0.5} />
              <line x1={x2} y1={y - 3} x2={x2} y2={y + 3} stroke={STEEL} strokeWidth="0.8" strokeOpacity={0.5} />

              <motion.rect
                x={xs1}
                y={y - 4}
                height={8}
                fill={ORANGE}
                fillOpacity={0.85}
                initial={{ width: 0 }}
                animate={{ width: xs2 - xs1 }}
                transition={{ duration: 1.2, delay: op.row * 0.12, ease: "easeOut" }}
              />

              <text x={xs2 + 4} y={y + 3} fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace" fontWeight="bold">
                {op.strong[0]}–{op.strong[1]} mm
              </text>
            </g>
          );
        })}
      </g>

      <g transform="translate(60,290)">
        <rect width={10} height={4} fill={ORANGE} fillOpacity={0.85} />
        <text x={16} y={5} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          interval optim de operare
        </text>
        <line x1={150} y1={3} x2={170} y2={3} stroke={STEEL} strokeOpacity={0.5} strokeWidth="1" />
        <text x={176} y={5} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          interval extins · cu calibrări
        </text>
      </g>

      <AxisXY x={20} y={310} />
      <CornerTable
        rows={[
          ["UZX-AIR", "REV. A"],
          ["UNIT", "mm"],
          ["MAT", "INOX 304/316"],
        ]}
        x={444}
        y={266}
      />
    </svg>
  );
}

export function AironeDiagramFigure({
  children,
  caption,
  number,
}: {
  children: React.ReactNode;
  caption: string;
  number: string;
}) {
  return (
    <figure className="border hairline bg-white">
      {children}
      <figcaption className="px-5 py-3 border-t hairline">
        <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1">
          {number}
        </div>
        <p className="text-xs text-ink-600 leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}
