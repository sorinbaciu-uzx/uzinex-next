"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ACCENT = "#f5851f";
const BRICK = "#c87b3c";
const BRICK_DEEP = "#8a4f23";
const ALERT = "#dc2626";
const OK = "#16a34a";

function GridBackground({ id }: { id: string }) {
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
      <line x1={0} y1={0} x2={28} y2={0} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis)" />
      <line x1={0} y1={0} x2={0} y2={-28} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis)" />
      <text x={32} y={3} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
        x
      </text>
      <text x={-3} y={-32} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
        z
      </text>
    </g>
  );
}

export function InterlockBrickDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="ib-title">
      <title id="ib-title">
        Cărămidă modulară hyper-presată cu îmbinare tongue-and-groove fără mortar
      </title>
      <defs>
        <GridBackground id="grid-ib" />
        <ArrowMarker id="arrow-axis" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-ib)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        ÎMBINARE MODULARĂ · ZERO MORTAR
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        sistem tongue-and-groove · ridicare zidărie uscată
      </text>

      <g transform="translate(150,110)">
        {[0, 1, 2].map((row) => (
          <g key={row} transform={`translate(${(row % 2) * 30},${row * 32})`}>
            {[0, 1, 2, 3].map((col) => (
              <motion.g
                key={col}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: row * 0.6 + col * 0.18, ease: "easeOut" }}
                style={{ transformOrigin: `${col * 60 + 30}px 16px` }}
              >
                <rect
                  x={col * 60}
                  y={0}
                  width={60}
                  height={28}
                  fill={BRICK}
                  stroke={BRICK_DEEP}
                  strokeWidth="1"
                />
                <rect
                  x={col * 60 + 22}
                  y={-4}
                  width={16}
                  height={4}
                  fill={BRICK}
                  stroke={BRICK_DEEP}
                  strokeWidth="0.8"
                />
                <rect
                  x={col * 60 + 22}
                  y={28}
                  width={16}
                  height={4}
                  fill={BRICK_DEEP}
                  fillOpacity={0.4}
                />
              </motion.g>
            ))}
          </g>
        ))}
      </g>

      <g>
        <line x1={140} y1={120} x2={120} y2={120} stroke={STROKE_DIM} strokeWidth="0.6" />
        <text x={114} y={123} textAnchor="end" fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
          tongue
        </text>
        <line x1={140} y1={156} x2={120} y2={156} stroke={STROKE_DIM} strokeWidth="0.6" />
        <text x={114} y={159} textAnchor="end" fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
          groove
        </text>
      </g>

      <text x={300} y={235} textAnchor="middle" fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">
        zidărie uscată · finisaj fair-faced direct
      </text>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["SCALA 1:5", "DIM mm"],
          ["MAT", "Al-Ar-Ce"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function PressureChemistryDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="pc-title">
      <title id="pc-title">
        Paradox forță presare versus chimie materie primă
      </title>
      <defs>
        <GridBackground id="grid-pc" />
        <ArrowMarker id="arrow-axis" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-pc)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        FORȚĂ ≠ PRODUCȚIE
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        cheia stă în chimia rețetei, nu în tonajul presei
      </text>

      <g transform="translate(60,110)">
        <text x={90} y={0} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          UCRAINA · BRUT
        </text>
        <rect x={20} y={20} width={140} height={50} fill="white" stroke={STROKE_INK} strokeWidth="1" />
        <rect x={26} y={26} width={128} height={6} fill={STROKE_DIM} />

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.g key={i}>
            <motion.line
              x1={36 + i * 24}
              y1={4}
              x2={36 + i * 24}
              y2={26}
              stroke={ALERT}
              strokeWidth="2.4"
              animate={{ y2: [26, 30, 26], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.04 }}
            />
            <motion.polygon
              points={`${33 + i * 24},26 ${39 + i * 24},26 ${36 + i * 24},32`}
              fill={ALERT}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.04 }}
            />
          </motion.g>
        ))}

        <rect x={36} y={50} width={108} height={16} fill={BRICK_DEEP} fillOpacity={0.25} />

        <text x={90} y={92} textAnchor="middle" fontSize="22" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold" letterSpacing="3">
          ≈ 0
        </text>
        <text x={90} y={108} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          BUC UTILE / ZI
        </text>
        <text x={90} y={124} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          fără rețetă · fără flux
        </text>
      </g>

      <line x1={300} y1={100} x2={300} y2={250} stroke={STROKE_DIM} strokeWidth="0.5" strokeDasharray="3 3" />

      <g transform="translate(360,110)">
        <text x={90} y={0} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          UZINEX · CALIBRAT
        </text>
        <rect x={20} y={20} width={140} height={50} fill="white" stroke={STROKE_INK} strokeWidth="1" />
        <rect x={26} y={26} width={128} height={6} fill={STROKE_DIM} />

        {[0, 1].map((i) => (
          <motion.g key={i}>
            <motion.line
              x1={70 + i * 40}
              y1={10}
              x2={70 + i * 40}
              y2={26}
              stroke={ACCENT}
              strokeWidth="2.4"
              animate={{ y2: [26, 30, 26] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
            <motion.polygon
              points={`${67 + i * 40},26 ${73 + i * 40},26 ${70 + i * 40},32`}
              fill={ACCENT}
              animate={{ opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.1 }}
            />
          </motion.g>
        ))}

        <rect x={36} y={50} width={108} height={16} fill={BRICK} />
        <line x1={45} y1={52} x2={45} y2={64} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={70} y1={52} x2={70} y2={64} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={95} y1={52} x2={95} y2={64} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={120} y1={52} x2={120} y2={64} stroke={BRICK_DEEP} strokeWidth="0.5" />

        <motion.text
          x={90}
          y={92}
          textAnchor="middle"
          fontSize="22"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          20.000
        </motion.text>
        <text x={90} y={108} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          BUC / ZI
        </text>
        <text x={90} y={124} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          rețetă + flux + suport tehnic
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["SCALA 1:1", "DIM —"],
          ["KNOW-HOW", "INCLUS"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function HumidityCalculatorDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="hc-title">
      <title id="hc-title">
        Calculator umiditate · recalculare automată proporții materie primă
      </title>
      <defs>
        <GridBackground id="grid-hc" />
        <ArrowMarker id="arrow-axis" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-hc)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        CALCULATOR UMIDITATE · LIVE
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        recalculare proporții la fiecare șarjă · constanță calitate
      </text>

      <g transform="translate(80,110)">
        {[
          { y: 0, label: "ARGILĂ", base: 0.62, valLabel: "62%" },
          { y: 32, label: "NISIP", base: 0.34, valLabel: "34%" },
          { y: 64, label: "CIMENT", base: 0.045, valLabel: "4.5%" },
        ].map((b, i) => (
          <g key={i}>
            <text x={0} y={b.y + 12} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
              {b.label}
            </text>
            <rect x={70} y={b.y + 4} width={240} height={10} fill="#eef0f5" stroke={STROKE_DIM} strokeWidth="0.5" />
            <motion.rect
              x={70}
              y={b.y + 4}
              height={10}
              fill={ACCENT}
              animate={{ width: [240 * (b.base - 0.05), 240 * (b.base + 0.05), 240 * (b.base - 0.05)] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
            <text x={320} y={b.y + 13} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
              {b.valLabel}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(440,110)">
        <rect x={0} y={0} width={108} height={86} fill="#0d1828" stroke={ACCENT} strokeWidth="0.7" />
        <text x={54} y={16} textAnchor="middle" fontSize="7.5" fill={ACCENT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          UMIDITATE
        </text>
        <motion.text
          x={54}
          y={48}
          textAnchor="middle"
          fontSize="20"
          fill="white"
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          8.4 %
        </motion.text>
        <motion.circle
          cx={92}
          cy={16}
          r={3}
          fill={ACCENT}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <text x={54} y={68} textAnchor="middle" fontSize="6.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          sensor în malaxor
        </text>
        <text x={54} y={80} textAnchor="middle" fontSize="6.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          măsurătoare/șarjă
        </text>
      </g>

      <g transform="translate(60,225)">
        <text x={0} y={0} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          INTRARE: ARGILĂ + NISIP + APĂ → SENSOR → CONTROLLER → MALAXOR
        </text>
        <line x1={0} y1={6} x2={480} y2={6} stroke={STROKE_DIM} strokeWidth="0.5" strokeDasharray="3 2" />
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["RANGE", "0–18 %"],
          ["RES.", "± 0,3 %"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function ProductionFlowDiagram() {
  const stations = [
    { x: 30, w: 84, label: "MOARĂ", detail: "ciocane" },
    { x: 124, w: 84, label: "CERNĂTOR", detail: "site fine" },
    { x: 218, w: 84, label: "MALAXOR", detail: "amestec" },
    { x: 312, w: 84, label: "PRESĂ HIDR.", detail: "compactare" },
    { x: 406, w: 110, label: "EVAC. + PALET", detail: "manuală" },
  ];

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="flow-title">
      <title id="flow-title">
        Schemă flux tehnologic CAMMA · linie completă cărămidă modulară
      </title>
      <defs>
        <GridBackground id="grid-flow" />
        <ArrowMarker id="arrow-axis" />
        <ArrowMarker id="arrow-flow" color={STROKE_INK} />
      </defs>
      <rect width="600" height="320" fill="url(#grid-flow)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        FLUX LINIE COMPLETĂ
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        argilă → pudră → amestec → cărămidă crudă → palet
      </text>

      <g transform="translate(0,110)">
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

        {[114, 208, 302, 396].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={26} x2={x + 10} y2={26} stroke={STROKE_INK} strokeWidth="1" markerEnd="url(#arrow-flow)" />
            <motion.circle
              cx={x}
              cy={26}
              r={2.6}
              fill={BRICK}
              animate={{ cx: [x, x + 10, x] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          </g>
        ))}

        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={430 + i * 24}
            y={32}
            width={18}
            height={10}
            fill={BRICK}
            stroke={BRICK_DEEP}
            strokeWidth="0.6"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.3, 0.85, 1], repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </g>

      <g transform="translate(40,200)">
        <text x={0} y={0} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          AUTOMATIZARE
        </text>
        <text x={92} y={0} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          integral · cu excepția paletizării manuale
        </text>
        <text x={0} y={18} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OPERATORI
        </text>
        <text x={92} y={18} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          2 angajați CAMMA / schimb · paletizare + supraveghere flux
        </text>
        <text x={0} y={36} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OUTPUT
        </text>
        <text x={92} y={36} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          ≈ 20.000 buc/zi · 800.000 m³/an capacitate teoretică
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["SCALA 1:50", "DIM m"],
          ["LOC", "BUZĂU"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function CapacityDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="cap-title">
      <title id="cap-title">
        Salt capacitate · 200 cărămizi/zi pre-Uzinex versus 20.000 cărămizi/zi după
      </title>
      <defs>
        <GridBackground id="grid-cap" />
        <ArrowMarker id="arrow-axis" />
        <pattern id="brick-fill" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <rect width="20" height="10" fill={BRICK} />
          <line x1="0" y1="0" x2="20" y2="0" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="0" y1="5" x2="20" y2="5" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="10" y1="0" x2="10" y2="5" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="0" y1="5" x2="0" y2="10" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1="20" y1="5" x2="20" y2="10" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="600" height="320" fill="url(#grid-cap)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        SALT CAPACITATE · ×100
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        de la 200 buc/zi cu pierderi mari, la 20.000 buc/zi cu pierderi minime
      </text>

      <g transform="translate(80,105)">
        <line x1={0} y1={150} x2={420} y2={150} stroke={STROKE_INK} strokeWidth="0.9" />
        <line x1={0} y1={0} x2={0} y2={150} stroke={STROKE_INK} strokeWidth="0.9" />

        {[0, 50, 100, 150, 200].map((v, i) => {
          const y = 150 - (v / 200) * 130;
          return (
            <g key={i}>
              <line x1={-3} y1={y} x2={0} y2={y} stroke={STROKE_INK} strokeWidth="0.8" />
              <text x={-7} y={y + 3} textAnchor="end" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
                {v === 0 ? "0" : `${v / 10}k`}
              </text>
            </g>
          );
        })}

        <motion.rect
          x={70}
          y={148}
          width={70}
          height={2}
          fill={ALERT}
          initial={{ height: 0, y: 150 }}
          animate={{ height: 2, y: 148 }}
          transition={{ duration: 0.8 }}
        />
        <text x={105} y={170} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold">
          200 buc/zi
        </text>
        <text x={105} y={184} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          pre-Uzinex · pierderi mari
        </text>

        <motion.rect
          x={250}
          width={70}
          fill="url(#brick-fill)"
          stroke={BRICK_DEEP}
          strokeWidth="0.6"
          initial={{ height: 0, y: 150 }}
          animate={{ height: 130, y: 20 }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        />
        <text x={285} y={170} textAnchor="middle" fontSize="9" fill={BRICK_DEEP} fontFamily="ui-monospace, monospace" fontWeight="bold">
          20.000 buc/zi
        </text>
        <text x={285} y={184} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          cu Uzinex · pierderi minime
        </text>

        <motion.path
          d="M 140 148 C 200 80, 230 30, 250 22"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.4"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />
        <motion.text
          x={205}
          y={70}
          textAnchor="middle"
          fontSize="14"
          fill={ACCENT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          ×100
        </motion.text>

        <text x={350} y={20} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CIFRĂ AFACERI
        </text>
        <text x={350} y={36} fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          900K → 1.5M lei
        </text>
        <text x={350} y={50} fontSize="7" fill={ACCENT} fontFamily="ui-monospace, monospace">
          +66% · 2023 vs 2024
        </text>

        <text x={350} y={75} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CAPACITATE TEORETICĂ
        </text>
        <text x={350} y={91} fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          800.000 m³/an
        </text>
        <text x={350} y={105} fontSize="7" fill={ACCENT} fontFamily="ui-monospace, monospace">
          1M+ m³ · cu cele 2 prese refolosite
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["UNIT", "BUC/ZI"],
          ["YR", "23 vs 24"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function CammaDiagramFigure({
  diagram,
  caption,
  number,
}: {
  diagram: React.ReactNode;
  caption: string;
  number: string;
}) {
  return (
    <figure className="border hairline bg-white">
      {diagram}
      <figcaption className="px-5 py-3 border-t hairline">
        <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1">
          Schemă {number}
        </div>
        <p className="text-xs text-ink-600 leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}
