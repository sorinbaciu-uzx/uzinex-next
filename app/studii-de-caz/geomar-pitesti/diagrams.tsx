"use client";

import { motion } from "motion/react";

const GRID_COLOR = "#dbe2ec";
const STROKE_INK = "#2d3a4f";
const STROKE_DIM = "#9aa6b8";
const ORANGE = "#f5851f";
const STEEL = "#7a8499";
const LASER = "#ff5722";

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
      <line x1={0} y1={0} x2={28} y2={0} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-gm)" />
      <line x1={0} y1={0} x2={0} y2={-28} stroke={STROKE_INK} strokeWidth="0.8" markerEnd="url(#arrow-axis-gm)" />
      <text x={32} y={3} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">x</text>
      <text x={-3} y={-32} fontSize="9" fill={STROKE_INK} fontFamily="ui-monospace, monospace">z</text>
    </g>
  );
}

export function B2CWorkflowDiagram() {
  const stations = [
    { x: 30, w: 84, label: "CERERE", detail: "client direct B2C" },
    { x: 124, w: 84, label: "DESEN CAD", detail: "soft proiectare" },
    { x: 218, w: 84, label: "DEBIT LASER", detail: "6 kW · tablă curată" },
    { x: 312, w: 84, label: "SUDURĂ", detail: "laser inox / aluminiu" },
    { x: 406, w: 110, label: "LIVRARE", detail: "fără finisaj suplimentar" },
  ];

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="gm-flow-title">
      <title id="gm-flow-title">
        Flux atelier confecții metalice B2C cu laser fiber 6 kW · de la cerere la produs livrat
      </title>
      <defs>
        <GridBg id="grid-gm-flow" />
        <ArrowMarker id="arrow-axis-gm" />
        <ArrowMarker id="arrow-flow-gm" color={STROKE_INK} />
      </defs>
      <rect width="600" height="320" fill="url(#grid-gm-flow)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        FLUX ATELIER B2C · GEOMAR
      </text>
      <text x="300" y="62" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        cerere directă client → produs custom livrat fără finisaj suplimentar
      </text>

      <g transform="translate(0,100)">
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
            <line x1={x} y1={26} x2={x + 10} y2={26} stroke={STROKE_INK} strokeWidth="1" markerEnd="url(#arrow-flow-gm)" />
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
          style={{ transformOrigin: "260px 26px", transformBox: "fill-box" }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <circle key="laser-glow" cx={260} cy={26} r={3.5} fill={LASER} fillOpacity={0.45} />
          <circle key="laser-core" cx={260} cy={26} r={1.8} fill={LASER} />
        </motion.g>
      </g>

      <g transform="translate(40,180)">
        <text x={0} y={0} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          INTRARE
        </text>
        <text x={92} y={0} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          tablă inox · aluminiu · oțel · grosimi 0,5–8 mm
        </text>
        <text x={0} y={18} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          VOLUM
        </text>
        <text x={92} y={18} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          serii mici și unicate · porți, balustrade, mobilier exterior, decor
        </text>
        <text x={0} y={36} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OPERATORI
        </text>
        <text x={92} y={36} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          2 oameni cu fondator · supraveghere flux + asamblare
        </text>
        <text x={0} y={54} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          PIVOT
        </text>
        <text x={92} y={54} fontSize="8" fill={ORANGE} fontFamily="ui-monospace, monospace">
          tabla curată · finisaj fair-faced direct din laser
        </text>
      </g>

      <AxisXY x={20} y={296} />
      <CornerTable
        rows={[
          ["UZX-GEO", "REV. A"],
          ["SCALA 1:50", "DIM m"],
          ["LOC", "PITEȘTI"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function ProductRangeDiagram() {
  const products = [
    { x: 60, label: "PORȚI", detail: "fier · inox · custom" },
    { x: 200, label: "BALUSTRADE", detail: "inox · interior · exterior" },
    { x: 340, label: "MOBILIER", detail: "metal exterior · custom" },
    { x: 60, label: "DECOR", detail: "tablă curată · vizibil", row: 1 },
    { x: 200, label: "REPLICI", detail: "istorice · ornamentale", row: 1 },
    { x: 340, label: "CUSTOM", detail: "comenzi unicat", row: 1 },
  ];

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto" role="img" aria-labelledby="gm-range-title">
      <title id="gm-range-title">
        Gama de produse confecții metalice Geomar pentru clienți B2C din Pitești și Argeș
      </title>
      <defs>
        <GridBg id="grid-gm-range" />
        <ArrowMarker id="arrow-axis-gm" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-gm-range)" />

      <text x="300" y="40" textAnchor="middle" fontSize="11" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="6">
        GAMĂ PRODUSE · B2C ARGEȘ
      </text>
      <text x="300" y="62" textAnchor="middle" fontSize="9" fill={ORANGE} fontFamily="ui-monospace, monospace">
        atelier mic, gama largă, finisaj fair-faced direct din laser
      </text>

      <g transform="translate(50,100)">
        {products.map((p) => {
          const cx = p.x;
          const cy = (p.row ?? 0) * 80;
          return (
            <g key={p.label} transform={`translate(${cx},${cy})`}>
              <rect width={120} height={56} fill="white" stroke={STROKE_INK} strokeWidth="0.9" />
              <rect width={120} height={14} fill={STROKE_INK} />
              <text x={60} y={10} textAnchor="middle" fontSize="8" fill="white" fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
                {p.label}
              </text>
              <text x={60} y={32} textAnchor="middle" fontSize="7.5" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
                {p.detail}
              </text>
              <motion.line
                x1={6}
                y1={42}
                x2={114}
                y2={42}
                stroke={LASER}
                strokeWidth="1.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: (p.row ?? 0) * 0.3, ease: "easeOut" }}
              />
              <text x={60} y={50} textAnchor="middle" fontSize="6" fill={LASER} fontFamily="ui-monospace, monospace">
                tablă curată · laser
              </text>
            </g>
          );
        })}
      </g>

      <g transform="translate(50,260)">
        <text x={0} y={0} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          MATERIALE
        </text>
        <text x={92} y={0} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          inox AISI 304 · aluminiu seria 5xxx · oțel construcție
        </text>
        <text x={0} y={18} fontSize="8" fill={STROKE_INK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CLIENT TIP
        </text>
        <text x={92} y={18} fontSize="8" fill={STROKE_DIM} fontFamily="ui-monospace, monospace">
          proprietar de casă · arhitect · designer · primării locale
        </text>
      </g>

      <AxisXY x={20} y={296} />
      <CornerTable
        rows={[
          ["UZX-GEO", "REV. A"],
          ["RANGE", "B2C"],
          ["LOC", "ARGEȘ"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

export function GeomarDiagramFigure({
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
