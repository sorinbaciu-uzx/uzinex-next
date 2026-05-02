"use client";

import { motion } from "motion/react";

const GRID = "#cfd6e3";
const INK = "#1c2940";
const DIM = "#7d8aa1";
const ACCENT = "#f5851f";
const LASER = "#ff5722";
const ALERT = "#dc2626";
const OK = "#16a34a";
const NIGHT_BG = "#0d1828";

function GridDefs({ id, color = GRID }: { id: string; color?: string }) {
  return (
    <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
      <path d={`M 20 0 L 0 0 0 20`} fill="none" stroke={color} strokeWidth="0.5" />
    </pattern>
  );
}

function ArrowMarker({ id, color = INK }: { id: string; color?: string }) {
  return (
    <marker
      id={id}
      markerWidth="6"
      markerHeight="6"
      refX="5"
      refY="3"
      orient="auto"
      markerUnits="strokeWidth"
    >
      <path d="M0,0 L0,6 L6,3 Z" fill={color} />
    </marker>
  );
}

function TitleBlock({
  rows,
  x,
  y,
}: {
  rows: Array<[string, string]>;
  x: number;
  y: number;
}) {
  const colW = 78;
  const rowH = 14;
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x={-3}
        y={-3}
        width={colW * 2 + 6}
        height={rows.length * rowH + 6}
        fill={NIGHT_BG}
        opacity={0.04}
      />
      {rows.map(([k, v], i) => (
        <g key={i} transform={`translate(0,${i * rowH})`}>
          <rect x={0} y={0} width={colW} height={rowH} fill="white" stroke={DIM} strokeWidth="0.5" />
          <rect x={colW} y={0} width={colW} height={rowH} fill="white" stroke={DIM} strokeWidth="0.5" />
          <text x={5} y={10} fontSize="7" fill={INK} fontFamily="ui-monospace, monospace">
            {k}
          </text>
          <text x={colW + 5} y={10} fontSize="7" fill={INK} fontFamily="ui-monospace, monospace">
            {v}
          </text>
        </g>
      ))}
    </g>
  );
}

function ClassifiedStamp({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(-12)`} opacity={0.55}>
      <rect
        x={-46}
        y={-13}
        width={92}
        height={26}
        fill="none"
        stroke={ALERT}
        strokeWidth="1.4"
      />
      <text
        x={0}
        y={5}
        textAnchor="middle"
        fontSize="11"
        fill={ALERT}
        fontFamily="ui-monospace, monospace"
        letterSpacing="3"
        fontWeight="bold"
      >
        OPSEC ANON
      </text>
    </g>
  );
}

function CompassRose({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx={0} cy={0} r={r} fill="white" stroke={INK} strokeWidth="0.7" />
      <line x1={0} y1={-r} x2={0} y2={r} stroke={INK} strokeWidth="0.5" />
      <line x1={-r} y1={0} x2={r} y2={0} stroke={INK} strokeWidth="0.5" />
      <text x={0} y={-r - 3} textAnchor="middle" fontSize="8" fill={INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
        N
      </text>
    </g>
  );
}

function HangarDiagram() {
  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-auto"
      role="img"
      aria-labelledby="hangar-title"
    >
      <title id="hangar-title">
        Schemă hangar aluminiu cu 3 aparate laser active simultan și 2 unități în standby pentru proiecte cu termen ferm
      </title>
      <defs>
        <GridDefs id="grid-hangar" />
        <ArrowMarker id="arrow-hangar" />
      </defs>
      <rect width="600" height="360" fill="url(#grid-hangar)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        HANGAR EXPEDITIONARE · ALUMINIU
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        3 unități active + 2 standby · redundanță 60%
      </text>

      <g transform="translate(150,170)">
        <line x1={0} y1={0} x2={300} y2={0} stroke={INK} strokeWidth="1.2" />
        <line x1={0} y1={0} x2={0} y2={-90} stroke={INK} strokeWidth="1.2" />
        <line x1={300} y1={0} x2={300} y2={-90} stroke={INK} strokeWidth="1.2" />
        <line x1={0} y1={-90} x2={150} y2={-130} stroke={INK} strokeWidth="1.2" />
        <line x1={300} y1={-90} x2={150} y2={-130} stroke={INK} strokeWidth="1.2" />

        <line x1={50} y1={0} x2={50} y2={-90} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1={150} y1={0} x2={150} y2={-90} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1={250} y1={0} x2={250} y2={-90} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1={0} y1={-30} x2={300} y2={-30} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />
        <line x1={0} y1={-60} x2={300} y2={-60} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />

        {[
          { cx: 50, cy: -45, label: "L1" },
          { cx: 150, cy: -45, label: "L2" },
          { cx: 250, cy: -45, label: "L3" },
        ].map((p, i) => (
          <g key={p.label}>
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r={5}
              fill={LASER}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx={p.cx}
              cy={p.cy}
              r={11}
              fill={LASER}
              fillOpacity={0.18}
              animate={{ scale: [1, 1.6, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
            <text
              x={p.cx}
              y={p.cy - 16}
              textAnchor="middle"
              fontSize="8"
              fill={INK}
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
            >
              {p.label}
            </text>
          </g>
        ))}

        <line x1={0} y1={20} x2={300} y2={20} stroke={DIM} strokeWidth="0.5" />
        <line x1={0} y1={15} x2={0} y2={25} stroke={DIM} strokeWidth="0.5" />
        <line x1={300} y1={15} x2={300} y2={25} stroke={DIM} strokeWidth="0.5" />
        <text x={150} y={36} textAnchor="middle" fontSize="9" fill={INK} fontFamily="ui-monospace, monospace">
          deschidere 30 m · cordoane Al 5083
        </text>
      </g>

      <g transform="translate(80,290)">
        <text
          x={0}
          y={0}
          fontSize="8"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          STANDBY
        </text>
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${i * 30 + 4},10)`}>
            <rect x={0} y={0} width={20} height={12} fill="white" stroke={DIM} strokeWidth="0.7" />
            <text x={10} y={9} textAnchor="middle" fontSize="7" fill={DIM} fontFamily="ui-monospace, monospace">
              S{i + 1}
            </text>
          </g>
        ))}
      </g>

      <g transform="translate(440,290)">
        <text x={0} y={0} fontSize="8" fill={LASER} fontFamily="ui-monospace, monospace" letterSpacing="2">
          ACTIVE
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 30 + 4},10)`}>
            <rect x={0} y={0} width={20} height={12} fill={LASER} fillOpacity={0.15} stroke={LASER} strokeWidth="0.8" />
            <text x={10} y={9} textAnchor="middle" fontSize="7" fill={LASER} fontFamily="ui-monospace, monospace">
              L{i + 1}
            </text>
          </g>
        ))}
      </g>

      <CompassRose x={50} y={70} />
      <ClassifiedStamp x={300} y={245} />
      <TitleBlock
        rows={[
          ["UZX-LASER", "REV. A"],
          ["SCALA 1:100", "DIM m"],
          ["MAT", "Al 5083"],
          ["LOC", "RO · NATO"],
        ]}
        x={444}
        y={296}
      />
    </svg>
  );
}

function WindCompareDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto"
      role="img"
      aria-labelledby="wind-title"
    >
      <title id="wind-title">
        Comparație TIG MIG sudură conventională vs sudură laser în condiții de vânt și ploaie pe șantier
      </title>
      <defs>
        <GridDefs id="grid-wind" />
        <ArrowMarker id="arrow-wind" />
        <ArrowMarker id="arrow-wind-red" color={ALERT} />
      </defs>
      <rect width="600" height="320" fill="url(#grid-wind)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        TIG/MIG vs LASER · VÂNT 7 m/s
      </text>

      <g transform="translate(0,80)">
        <text x={75} y={0} fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          TIG/MIG · GAZ Ar
        </text>

        <g transform="translate(50,40)">
          <rect x={0} y={70} width={200} height={20} fill="#dde4ef" stroke={INK} strokeWidth="0.8" />

          <line x1={100} y1={20} x2={100} y2={70} stroke={INK} strokeWidth="2" />
          <polygon points="92,20 108,20 100,5" fill={INK} />

          <motion.path
            d="M 100 70 Q 130 50 165 60"
            fill="none"
            stroke={ALERT}
            strokeWidth="1.2"
            strokeOpacity={0.6}
            strokeDasharray="3 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.4, 0.6, 1], repeat: Infinity, ease: "linear" }}
          />

          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M -10 ${30 + i * 8} L 30 ${30 + i * 8}`}
              stroke={ALERT}
              strokeWidth="1.2"
              fill="none"
              markerEnd="url(#arrow-wind-red)"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
          <text x={-10} y={20} fontSize="8" fill={ALERT} fontFamily="ui-monospace, monospace">
            VÂNT
          </text>

          {[30, 60, 110, 145, 180].map((cx, i) => (
            <circle key={i} cx={cx} cy={80} r={1.5 + (i % 2)} fill={ALERT} />
          ))}

          <text
            x={100}
            y={115}
            textAnchor="middle"
            fontSize="9"
            fill={ALERT}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            letterSpacing="2"
          >
            POROZITATE · REJECT
          </text>
        </g>
      </g>

      <line x1={300} y1={70} x2={300} y2={290} stroke={DIM} strokeWidth="0.5" strokeDasharray="3 3" />

      <g transform="translate(300,80)">
        <text x={75} y={0} fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          LASER · FOCALIZAT
        </text>

        <g transform="translate(50,40)">
          <rect x={0} y={70} width={200} height={20} fill="#dde4ef" stroke={INK} strokeWidth="0.8" />

          <line x1={100} y1={20} x2={100} y2={70} stroke={LASER} strokeWidth="1.4" strokeDasharray="3 2" />
          <circle cx={100} cy={70} r={3.5} fill={LASER} />
          <circle cx={100} cy={70} r={8} fill={LASER} fillOpacity={0.2} />

          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M -10 ${30 + i * 8} L 30 ${30 + i * 8}`}
              stroke={ALERT}
              strokeWidth="1.2"
              fill="none"
              markerEnd="url(#arrow-wind-red)"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
          <text x={-10} y={20} fontSize="8" fill={ALERT} fontFamily="ui-monospace, monospace">
            VÂNT
          </text>

          <motion.line
            x1={0}
            y1={80}
            x2={0}
            y2={80}
            stroke={OK}
            strokeWidth="2.5"
            strokeLinecap="round"
            animate={{ x2: [0, 200, 200, 0] }}
            transition={{ duration: 4, times: [0, 0.5, 0.5, 1], repeat: Infinity, ease: "linear" }}
          />

          <text
            x={100}
            y={115}
            textAnchor="middle"
            fontSize="9"
            fill={OK}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            letterSpacing="2"
          >
            CORDON UNIFORM · CONFORM
          </text>
        </g>
      </g>

      <TitleBlock
        rows={[
          ["UZX-LASER", "REV. A"],
          ["AWS D17.1", "Al 3-4 mm"],
          ["VÂNT", "7 m/s"],
        ]}
        x={444}
        y={252}
      />
    </svg>
  );
}

function MuscleMemoryDiagram() {
  return (
    <svg
      viewBox="0 0 600 320"
      className="w-full h-auto"
      role="img"
      aria-labelledby="mm-title"
    >
      <title id="mm-title">
        Comparație tehnică sudură conventională cu pendulare reflexă vs sudură laser cu mișcare liniară uniformă
      </title>
      <defs>
        <GridDefs id="grid-mm" />
      </defs>
      <rect width="600" height="320" fill="url(#grid-mm)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        PARADOXUL FORȚEI DE MUNCĂ
      </text>
      <text x="300" y="50" textAnchor="middle" fontSize="9" fill={ACCENT} fontFamily="ui-monospace, monospace">
        de ce sudorii cu 10 ani sudează mai prost cu laser
      </text>

      <g transform="translate(50,90)">
        <text x={100} y={0} textAnchor="middle" fontSize="9" fill={ALERT} fontFamily="ui-monospace, monospace" letterSpacing="2">
          SUDOR CONVENTIONAL · 10 ANI
        </text>

        <line x1={0} y1={70} x2={200} y2={70} stroke={INK} strokeWidth="1" />

        <motion.path
          d="M 0 70 Q 10 50 20 70 Q 30 90 40 70 Q 50 50 60 70 Q 70 90 80 70 Q 90 50 100 70 Q 110 90 120 70 Q 130 50 140 70 Q 150 90 160 70 Q 170 50 180 70 Q 190 90 200 70"
          fill="none"
          stroke={ALERT}
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <text x={100} y={120} textAnchor="middle" fontSize="8" fill={ALERT} fontFamily="ui-monospace, monospace">
          pendulare reflexă · zig-zag
        </text>
        <text x={100} y={138} textAnchor="middle" fontSize="8" fill={DIM} fontFamily="ui-monospace, monospace">
          mâna „pictează" baia · automatizat
        </text>
        <text
          x={100}
          y={170}
          textAnchor="middle"
          fontSize="10"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          CORDOANE NEUNIFORME
        </text>
      </g>

      <line x1={300} y1={70} x2={300} y2={290} stroke={DIM} strokeWidth="0.5" strokeDasharray="3 3" />

      <g transform="translate(350,90)">
        <text x={100} y={0} textAnchor="middle" fontSize="9" fill={OK} fontFamily="ui-monospace, monospace" letterSpacing="2">
          OPERATOR NOU · 0 EXPERIENȚĂ
        </text>

        <line x1={0} y1={70} x2={200} y2={70} stroke={INK} strokeWidth="1" />

        <motion.line
          x1={0}
          y1={70}
          x2={0}
          y2={70}
          stroke={OK}
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ x2: [0, 200, 200, 0] }}
          transition={{ duration: 3, times: [0, 0.95, 0.95, 1], repeat: Infinity, ease: "linear" }}
        />

        <motion.circle
          cx={0}
          cy={70}
          r={4}
          fill={LASER}
          animate={{ cx: [0, 200, 200, 0] }}
          transition={{ duration: 3, times: [0, 0.95, 0.95, 1], repeat: Infinity, ease: "linear" }}
        />

        <text x={100} y={120} textAnchor="middle" fontSize="8" fill={OK} fontFamily="ui-monospace, monospace">
          mișcare liniară uniformă
        </text>
        <text x={100} y={138} textAnchor="middle" fontSize="8" fill={DIM} fontFamily="ui-monospace, monospace">
          fără reflex de „dezvăț"
        </text>
        <text
          x={100}
          y={170}
          textAnchor="middle"
          fontSize="10"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          CORDON CONFORM
        </text>
      </g>

      <TitleBlock
        rows={[
          ["UZX-LASER", "REV. A"],
          ["TRAINING", "2h"],
          ["LB", "RO · AI"],
        ]}
        x={20}
        y={252}
      />
    </svg>
  );
}

function HAZComparisonDiagram() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full h-auto"
      role="img"
      aria-labelledby="haz-title"
    >
      <title id="haz-title">
        Comparație zonă afectată termic HAZ pentru sudură TIG MIG vs sudură laser pe aluminiu subțire
      </title>
      <defs>
        <GridDefs id="grid-haz" />
      </defs>
      <rect width="600" height="340" fill="url(#grid-haz)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        ZONA AFECTATĂ TERMIC · HAZ
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        cu cât e mai mică, cu atât piesa stă mai plată
      </text>

      <g transform="translate(0,90)">
        <text
          x={150}
          y={0}
          textAnchor="middle"
          fontSize="9"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          TIG / MIG · ARC ELECTRIC
        </text>

        <rect x={50} y={70} width={200} height={20} fill="#dde4ef" stroke={INK} strokeWidth="0.8" />

        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={150}
            cy={80}
            r={10}
            fill={ALERT}
            fillOpacity={0.35}
            stroke={ALERT}
            strokeWidth="0.6"
            strokeOpacity={0.5}
            animate={{ r: [8, 50, 8], opacity: [0.55, 0, 0.55] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
          />
        ))}

        <circle cx={150} cy={80} r={6} fill={ALERT} />

        <line x1={108} y1={120} x2={192} y2={120} stroke={ALERT} strokeWidth="1.2" />
        <line x1={108} y1={115} x2={108} y2={125} stroke={ALERT} strokeWidth="1.2" />
        <line x1={192} y1={115} x2={192} y2={125} stroke={ALERT} strokeWidth="1.2" />
        <text
          x={150}
          y={140}
          textAnchor="middle"
          fontSize="10"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
        >
          HAZ ≈ 5–10 mm
        </text>
        <text
          x={150}
          y={160}
          textAnchor="middle"
          fontSize="8"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
        >
          distorsiune termică · warp
        </text>
        <text
          x={150}
          y={185}
          textAnchor="middle"
          fontSize="9"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          ÎNDREPTARE NECESARĂ
        </text>
      </g>

      <line x1={300} y1={70} x2={300} y2={290} stroke={DIM} strokeWidth="0.5" strokeDasharray="3 3" />

      <g transform="translate(300,90)">
        <text
          x={150}
          y={0}
          textAnchor="middle"
          fontSize="9"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          LASER · FOCUS ÎN PUNCT
        </text>

        <rect x={50} y={70} width={200} height={20} fill="#dde4ef" stroke={INK} strokeWidth="0.8" />

        <line x1={150} y1={20} x2={150} y2={70} stroke={LASER} strokeWidth="1.4" strokeDasharray="3 2" />

        <motion.circle
          cx={150}
          cy={80}
          r={4}
          fill={LASER}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <circle cx={150} cy={80} r={2} fill={LASER} />

        <line x1={147} y1={120} x2={153} y2={120} stroke={OK} strokeWidth="1.4" />
        <line x1={147} y1={115} x2={147} y2={125} stroke={OK} strokeWidth="1.4" />
        <line x1={153} y1={115} x2={153} y2={125} stroke={OK} strokeWidth="1.4" />
        <text
          x={150}
          y={140}
          textAnchor="middle"
          fontSize="10"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
        >
          HAZ &lt; 0.5 mm
        </text>
        <text
          x={150}
          y={160}
          textAnchor="middle"
          fontSize="8"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
        >
          piesă plată · zero warp
        </text>
        <text
          x={150}
          y={185}
          textAnchor="middle"
          fontSize="9"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          MONTAJ DIRECT
        </text>
      </g>

      <TitleBlock
        rows={[
          ["UZX-LASER", "REV. A"],
          ["AWS D17.1", "Al 3-4 mm"],
          ["MEAS", "mm"],
        ]}
        x={444}
        y={285}
      />
    </svg>
  );
}

function MultiAppDiagram() {
  const panels: Array<{
    x: number;
    title: string;
    subtitle: string;
    tag: string;
    delay: number;
  }> = [
    { x: 35, title: "SUDURĂ", subtitle: "cordon Al 5083 · hangare", tag: "PROD HANGAR", delay: 0 },
    { x: 225, title: "CURĂȚARE", subtitle: "oxizi · vopsea · grăsimi", tag: "PREP MATERIAL", delay: 0.6 },
    { x: 415, title: "DEBITARE", subtitle: "tablă Al · oțel · inox", tag: "AJUSTARE PE LOC", delay: 1.2 },
  ];

  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full h-auto"
      role="img"
      aria-labelledby="multiapp-title"
    >
      <title id="multiapp-title">
        Acelasi aparat laser face sudură, curățare și debitare 3-in-1, cu un singur set de scule
      </title>
      <defs>
        <GridDefs id="grid-multi" />
      </defs>
      <rect width="600" height="340" fill="url(#grid-multi)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        ACELAȘI APARAT · 3 APLICAȚII
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        sudură + curățare + debitare cu un singur set de scule
      </text>

      {panels.map((p) => (
        <g key={p.title} transform={`translate(${p.x},90)`}>
          <rect x={0} y={0} width={150} height={150} fill="white" stroke={INK} strokeWidth="0.8" />
          <text
            x={75}
            y={20}
            textAnchor="middle"
            fontSize="10"
            fill={INK}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            letterSpacing="2"
          >
            {p.title}
          </text>

          {p.title === "SUDURĂ" && (
            <>
              <rect x={20} y={66} width={50} height={8} fill="#dde4ef" stroke={INK} strokeWidth="0.5" />
              <rect x={80} y={66} width={50} height={8} fill="#dde4ef" stroke={INK} strokeWidth="0.5" />
              <motion.rect
                x={70}
                y={68}
                width={10}
                height={4}
                fill={LASER}
                animate={{ x: [55, 85, 55] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              />
              <motion.line
                x1={75}
                y1={40}
                x2={75}
                y2={66}
                stroke={LASER}
                strokeWidth="1.2"
                strokeDasharray="2 2"
                animate={{ x1: [60, 90, 60], x2: [60, 90, 60] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
              />
            </>
          )}

          {p.title === "CURĂȚARE" && (
            <>
              <rect x={20} y={64} width={110} height={14} fill="#dde4ef" stroke={INK} strokeWidth="0.5" />
              {[28, 42, 56, 70, 84, 98, 112].map((cx, i) => (
                <motion.circle
                  key={i}
                  cx={cx}
                  cy={71}
                  r={1.6}
                  fill="#7d4d00"
                  animate={{ opacity: [1, 1, 0, 0, 1] }}
                  transition={{
                    duration: 3,
                    times: [0, 0.18 + i * 0.06, 0.32 + i * 0.06, 0.92, 1],
                    repeat: Infinity,
                    delay: p.delay,
                  }}
                />
              ))}
              <motion.line
                x1={20}
                y1={71}
                x2={20}
                y2={71}
                stroke={LASER}
                strokeWidth="2.5"
                strokeOpacity={0.85}
                animate={{ x2: [20, 130, 130, 20] }}
                transition={{
                  duration: 3,
                  times: [0, 0.5, 0.55, 1],
                  repeat: Infinity,
                  ease: "linear",
                  delay: p.delay,
                }}
              />
              <motion.line
                x1={20}
                y1={40}
                x2={20}
                y2={64}
                stroke={LASER}
                strokeWidth="1"
                strokeDasharray="2 2"
                animate={{ x1: [20, 130, 130, 20], x2: [20, 130, 130, 20] }}
                transition={{
                  duration: 3,
                  times: [0, 0.5, 0.55, 1],
                  repeat: Infinity,
                  ease: "linear",
                  delay: p.delay,
                }}
              />
            </>
          )}

          {p.title === "DEBITARE" && (
            <>
              <rect x={20} y={50} width={110} height={50} fill="#dde4ef" stroke={INK} strokeWidth="0.5" />
              <motion.path
                d="M 35 60 L 35 92 L 115 92 L 115 60"
                fill="none"
                stroke={LASER}
                strokeWidth="1.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 1, 0] }}
                transition={{
                  duration: 3.2,
                  times: [0, 0.7, 0.85, 1],
                  repeat: Infinity,
                  delay: p.delay,
                }}
              />
              <motion.circle
                cx={35}
                cy={60}
                r={3.2}
                fill={LASER}
                animate={{
                  cx: [35, 35, 115, 115, 35],
                  cy: [60, 92, 92, 60, 60],
                }}
                transition={{
                  duration: 3.2,
                  times: [0, 0.25, 0.5, 0.7, 1],
                  repeat: Infinity,
                  ease: "linear",
                  delay: p.delay,
                }}
              />
            </>
          )}

          <text
            x={75}
            y={120}
            textAnchor="middle"
            fontSize="8"
            fill={DIM}
            fontFamily="ui-monospace, monospace"
          >
            {p.subtitle}
          </text>
          <rect
            x={15}
            y={128}
            width={120}
            height={14}
            fill={LASER}
            fillOpacity={0.1}
            stroke={LASER}
            strokeWidth="0.6"
          />
          <text
            x={75}
            y={138}
            textAnchor="middle"
            fontSize="8"
            fill={LASER}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
            letterSpacing="1"
          >
            {p.tag}
          </text>
        </g>
      ))}

      <g transform="translate(110,265)">
        <line x1={0} y1={0} x2={380} y2={0} stroke={DIM} strokeWidth="0.6" strokeDasharray="3 2" />
        <motion.circle
          cx={0}
          cy={0}
          r={4}
          fill={LASER}
          animate={{ cx: [0, 190, 380, 190, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
        <text
          x={190}
          y={18}
          textAnchor="middle"
          fontSize="8"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
        >
          UN SINGUR APARAT · COMUTARE PISTOL
        </text>
      </g>

      <TitleBlock
        rows={[
          ["UZX-LASER", "REV. A"],
          ["MAX", "2.000W"],
          ["GUN", "SUP23T"],
        ]}
        x={444}
        y={285}
      />
    </svg>
  );
}

export function NatoCaseDiagrams() {
  return (
    <div className="space-y-3 lg:space-y-4">
      <figure className="border hairline bg-white">
        <HangarDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 1 · distribuție echipamente pe șantier
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            3 aparate active operate simultan pe puncte diferite ale structurii, 2 în
            standby imediat lângă șantier. Pentru un proiect cu termen ferm și
            penalități, redundanța de 60% costă mai puțin decât o singură zi de
            întârziere.
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <WindCompareDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 2 · imunitate la vânt și ploaie
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            La TIG și MIG, gazul protector Argon este suflat de vânt din zona arcului
            și oxigenul atmosferic intră în baia de sudură. Rezultatul: porozitate,
            oxizi de aluminiu, cordoane respinse la inspecție. Laserul, cu fascicul
            focalizat și volum minim de gaz, rămâne stabil chiar și la vânt 7 m/s.
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <MuscleMemoryDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 3 · paradoxul forței de muncă
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Un sudor cu zece ani de experiență MIG/TIG are mâna automatizată pe o
            mișcare de pendulare în zig-zag, necesară ca să distribuie baia de sudură
            pe lățimea cordonului. La laser, fasciculul are deja focalizare definită
            iar pendularea îl scoate din focare. Operatorul fără experiență învață
            direct mișcarea liniară uniformă pe care o cere laserul, fără reflex
            contradictoriu de „dezvăț".
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <HAZComparisonDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 4 · zona afectată termic și distorsiunea piesei
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Arcul electric depune energie pe o suprafață largă, iar zona afectată
            termic ajunge la 5-10 mm pe aluminiu subțire. Tabla se deformează și
            cere îndreptare după sudură. Fasciculul laser are focus în punct, iar
            zona afectată termic rămâne sub jumătate de milimetru. Pentru hangare
            expediționare cu toleranțe strânse, asta înseamnă montaj direct fără
            corecții geometrice intermediare.
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <MultiAppDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 5 · acelasi aparat, trei aplicații
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Aparatele 3-in-1 livrate pe baza NATO sudează cordoanele de aluminiu,
            curăță suprafețele de oxizi și grăsimi înainte de sudură și debitează
            corecții geometrice direct pe șantier. Echipa nu mai cară trei utilaje
            separate, iar operatorul comută pistolul în câteva secunde. Pe un
            șantier expediționar cu logistică limitată, versatilitatea înseamnă
            mai puține curse de transport și mai puține echipamente de mentenat.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
