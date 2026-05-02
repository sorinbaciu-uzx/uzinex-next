"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ORANGE = "#f5851f";
const IRON = "#5b6273";
const FORGE = "#c83a17";
const OK = "#16a34a";
const ALERT = "#dc2626";

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
      <line x1={0} y1={0} x2={28} y2={0} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-fl)" />
      <line x1={0} y1={0} x2={0} y2={-28} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-fl)" />
      <text x={32} y={3} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">x</text>
      <text x={-3} y={-32} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">z</text>
    </g>
  );
}

export function WorkshopFlowDiagram() {
  const stations = [
    { x: 30, w: 90, label: "DEBITARE", detail: "fierăstrău + ghilotină" },
    { x: 130, w: 90, label: "GĂURIRE", detail: "avans automat" },
    { x: 230, w: 90, label: "FORJARE", detail: "A150A · ciocan 40 kg" },
    { x: 330, w: 90, label: "SUDURĂ", detail: "MIG/MAG/TIG" },
    { x: 430, w: 110, label: "FINISARE", detail: "freză · CNC" },
  ];

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="ff-flow-title">
      <title id="ff-flow-title">
        Flux atelier confecții metalice fier forjat · 5 stații semi-automatizate
      </title>
      <defs>
        <GridBg id="grid-ff-flow" />
        <ArrowMarker id="arrow-axis-fl" />
        <ArrowMarker id="arrow-flow-fl" color={STROKE_INK} />
      </defs>
      <rect width="600" height="320" fill="url(#grid-ff-flow)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        FLUX ATELIER · LIMANU
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        oțel brut → debit → găurire → forjare → sudură → finisare → produs custom
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

        {[120, 220, 320, 420].map((x, i) => (
          <g key={i}>
            <line x1={x} y1={26} x2={x + 10} y2={26} stroke={STROKE_INK} strokeWidth="1" markerEnd="url(#arrow-flow-fl)" />
            <motion.circle
              cx={x}
              cy={26}
              r={2.6}
              fill={IRON}
              animate={{ cx: [x, x + 10, x] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
            />
          </g>
        ))}

        <motion.g
          animate={{ scale: [1, 1.15, 1] }}
          style={{ transformOrigin: "275px 26px", transformBox: "fill-box" }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <circle cx={275} cy={26} r={4} fill={FORGE} fillOpacity={0.5} />
          <circle cx={275} cy={26} r={2} fill={FORGE} />
        </motion.g>
      </g>

      <g transform="translate(40,200)">
        <text x={0} y={0} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OPERATORI
        </text>
        <text x={92} y={0} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          1 om operează 3–4 utilaje · sub-stații supravegheate
        </text>
        <text x={0} y={18} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          PRODUS
        </text>
        <text x={92} y={18} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          porți · garduri · balustrade · mobilier · replici · custom
        </text>
        <text x={0} y={36} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OUTPUT
        </text>
        <text x={92} y={36} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          ×5–6 viteză vs flux manual · +50% calitate cordoane
        </text>
      </g>

      <AxisXY />
      <CornerTable
        rows={[
          ["UZX-FFL", "REV. A"],
          ["SCALA 1:50", "DIM m"],
          ["LOC", "LIMANU CT"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function ProductivityCompareDiagram() {
  return (
    <svg viewBox="0 0 600 340" className="w-full h-auto" role="img" aria-labelledby="ff-prod-title">
      <title id="ff-prod-title">
        Productivitate atelier confecții metalice manual versus semi-automatizat
      </title>
      <defs>
        <GridBg id="grid-ff-prod" />
        <ArrowMarker id="arrow-axis-fl" />
      </defs>
      <rect width="600" height="340" fill="url(#grid-ff-prod)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        VITEZĂ PRODUCȚIE · ×5–6
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        același atelier, aceleași comenzi, ×5–6 viteza pe ciclu de execuție
      </text>

      <g transform="translate(60,110)">
        <text x={120} y={0} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          MANUAL · UTILAJE VECHI
        </text>

        <line x1={0} y1={50} x2={240} y2={50} stroke={STROKE_INK} strokeWidth="0.9" />
        <text x={-6} y={54} textAnchor="end" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          0
        </text>
        <text x={246} y={54} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          8h
        </text>

        <motion.rect
          x={0}
          y={42}
          height={16}
          fill={ALERT}
          fillOpacity={0.85}
          animate={{ width: [0, 40, 40, 0] }}
          transition={{ duration: 5, times: [0, 0.4, 0.95, 1], repeat: Infinity, ease: "linear" }}
        />

        <text x={120} y={86} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold">
          1 unitate / 8h
        </text>
        <text x={120} y={102} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          debit + găurire + sudură fără utilaje moderne
        </text>
        <text x={120} y={120} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" fontStyle="italic">
          remediere frecventă · 3–4 oameni necesari
        </text>
      </g>

      <g transform="translate(360,110)">
        <text x={120} y={0} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          SEMI-AUTO · UZINEX
        </text>

        <line x1={0} y1={50} x2={240} y2={50} stroke={STROKE_INK} strokeWidth="0.9" />
        <text x={-6} y={54} textAnchor="end" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          0
        </text>
        <text x={246} y={54} fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          8h
        </text>

        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={i * 48}
            y={42}
            width={40}
            height={16}
            fill={OK}
            fillOpacity={0.85}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            style={{ transformOrigin: `${i * 48}px 50px` }}
            transition={{ duration: 5, times: [0, 0.4, 0.95, 1], repeat: Infinity, delay: i * 0.08, ease: "linear" }}
          />
        ))}

        <text x={120} y={86} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          5 unități / 8h
        </text>
        <text x={120} y={102} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          A150A CNC + ghilotină + ciocan 40 kg + filetare auto
        </text>
        <text x={120} y={120} textAnchor="middle" fontSize="7" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" fontStyle="italic">
          dacă tăiem odată, e bine tăiat · 1 om / 3–4 mașini
        </text>
      </g>

      <g transform="translate(60,260)">
        <rect width="480" height="50" fill="white" stroke={STROKE_DIM} strokeWidth="0.7" />
        <text x={12} y={16} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          TIMP/COMANDĂ
        </text>
        <text x={12} y={34} fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          8h → 1,3h
        </text>
        <text x={12} y={45} fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace">
          la aceeași comandă tipică · multiplier ×5–6
        </text>

        <text x={170} y={16} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CALITATE
        </text>
        <text x={170} y={34} fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          +50%
        </text>
        <text x={170} y={45} fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace">
          remediere eliminată · cordoane uniforme
        </text>

        <text x={290} y={16} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          PERSONAL
        </text>
        <text x={290} y={34} fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          3–4 → 1 om
        </text>
        <text x={290} y={45} fontSize="7" fill={ORANGE} fontFamily="ui-monospace, monospace">
          1 operator supraveghează 3–4 utilaje
        </text>
      </g>

      <AxisXY x={20} y={296} />
      <CornerTable
        rows={[
          ["UZX-FFL", "REV. A"],
          ["UNIT", "BUC/8H"],
          ["YR", "23 vs 22"],
        ]}
        x={444}
        y={296}
      />
    </svg>
  );
}

export function ErgonomicLoadDiagram() {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="ff-erg-title">
      <title id="ff-erg-title">
        Sarcină ergonomică operator atelier fier forjat înainte și după semi-automatizare
      </title>
      <defs>
        <GridBg id="grid-ff-erg" />
        <ArrowMarker id="arrow-axis-fl" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-ff-erg)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        SARCINĂ ERGONOMICĂ · OPERATOR
      </text>
      <text x="300" y="75" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        kgf manipulate manual · ore/zi efort fizic continuu
      </text>

      <g transform="translate(60,100)">
        <text x={100} y={0} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          ÎNAINTE · MANUAL
        </text>

        <g transform="translate(80,30)">
          <circle cx={0} cy={-26} r={10} fill="none" stroke={ALERT} strokeWidth="1.4" />
          <line x1={0} y1={-16} x2={0} y2={6} stroke={ALERT} strokeWidth="1.4" />
          <line x1={0} y1={-8} x2={-12} y2={2} stroke={ALERT} strokeWidth="1.4" />
          <line x1={0} y1={-8} x2={12} y2={2} stroke={ALERT} strokeWidth="1.4" />
          <line x1={0} y1={6} x2={-8} y2={26} stroke={ALERT} strokeWidth="1.4" />
          <line x1={0} y1={6} x2={8} y2={26} stroke={ALERT} strokeWidth="1.4" />

          <motion.text
            x={0}
            y={-44}
            textAnchor="middle"
            fontSize="11"
            fill={ALERT}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            !
          </motion.text>
        </g>

        <g transform="translate(0,80)">
          <text x={0} y={0} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
            kgf manual / oră
          </text>
          <rect x={0} y={6} width={200} height={8} fill="#eef0f5" stroke={STROKE_DIM} strokeWidth="0.4" />
          <motion.rect
            x={0}
            y={6}
            height={8}
            fill={ALERT}
            animate={{ width: [0, 175, 175, 0] }}
            transition={{ duration: 4, times: [0, 0.4, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
          />
          <text x={205} y={13} fontSize="8" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold">
            ≈ 800 kgf
          </text>
        </g>

        <g transform="translate(0,108)">
          <text x={0} y={0} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
            ore efort fizic continuu / zi
          </text>
          <rect x={0} y={6} width={200} height={8} fill="#eef0f5" stroke={STROKE_DIM} strokeWidth="0.4" />
          <motion.rect
            x={0}
            y={6}
            height={8}
            fill={ALERT}
            animate={{ width: [0, 175, 175, 0] }}
            transition={{ duration: 4, times: [0, 0.4, 0.85, 1], repeat: Infinity, delay: 0.2, ease: "easeOut" }}
          />
          <text x={205} y={13} fontSize="8" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold">
            ≈ 7 / 8h
          </text>
        </g>

        <text x={100} y={170} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" fontWeight="bold" letterSpacing="2">
          DURERI DE SPATE · CRONIC
        </text>
      </g>

      <g transform="translate(360,100)">
        <text x={100} y={0} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          DUPĂ · SEMI-AUTO
        </text>

        <g transform="translate(80,30)">
          <circle cx={0} cy={-26} r={10} fill="none" stroke={OK} strokeWidth="1.4" />
          <line x1={0} y1={-16} x2={0} y2={6} stroke={OK} strokeWidth="1.4" />
          <line x1={0} y1={-8} x2={-12} y2={-4} stroke={OK} strokeWidth="1.4" />
          <line x1={0} y1={-8} x2={12} y2={-4} stroke={OK} strokeWidth="1.4" />
          <line x1={0} y1={6} x2={-8} y2={26} stroke={OK} strokeWidth="1.4" />
          <line x1={0} y1={6} x2={8} y2={26} stroke={OK} strokeWidth="1.4" />
          <motion.text
            x={20}
            y={-20}
            fontSize="9"
            fill={OK}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          >
            ✓
          </motion.text>
        </g>

        <g transform="translate(0,80)">
          <text x={0} y={0} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
            kgf manual / oră
          </text>
          <rect x={0} y={6} width={200} height={8} fill="#eef0f5" stroke={STROKE_DIM} strokeWidth="0.4" />
          <motion.rect
            x={0}
            y={6}
            height={8}
            fill={OK}
            animate={{ width: [0, 30, 30, 0] }}
            transition={{ duration: 4, times: [0, 0.4, 0.85, 1], repeat: Infinity, ease: "easeOut" }}
          />
          <text x={205} y={13} fontSize="8" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold">
            ≈ 120 kgf
          </text>
        </g>

        <g transform="translate(0,108)">
          <text x={0} y={0} fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
            ore efort fizic continuu / zi
          </text>
          <rect x={0} y={6} width={200} height={8} fill="#eef0f5" stroke={STROKE_DIM} strokeWidth="0.4" />
          <motion.rect
            x={0}
            y={6}
            height={8}
            fill={OK}
            animate={{ width: [0, 50, 50, 0] }}
            transition={{ duration: 4, times: [0, 0.4, 0.85, 1], repeat: Infinity, delay: 0.2, ease: "easeOut" }}
          />
          <text x={205} y={13} fontSize="8" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold">
            ≈ 2 / 8h
          </text>
        </g>

        <text x={100} y={170} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" fontWeight="bold" letterSpacing="2">
          MEȘTERUL POATE LUCRA DIN NOU
        </text>
      </g>

      <text x="300" y="306" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace" letterSpacing="3" fontWeight="bold">
        AUTOMATIZAREA SALVEAZĂ NU DOAR TIMP · SALVEAZĂ MEȘTERI
      </text>
    </svg>
  );
}

export function FierForjatDiagramFigure({
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
          {number}
        </div>
        <p className="text-xs text-ink-600 leading-relaxed">{caption}</p>
      </figcaption>
    </figure>
  );
}
