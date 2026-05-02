"use client";

import { motion } from "motion/react";

const GRID = "#cfd6e3";
const INK = "#1c2940";
const DIM = "#7d8aa1";
const ACCENT = "#f5851f";
const BRICK = "#c87b3c";
const BRICK_DEEP = "#8a4f23";
const ALERT = "#dc2626";
const OK = "#16a34a";
const NIGHT_BG = "#0d1828";

function GridDefs({ id, color = GRID }: { id: string; color?: string }) {
  return (
    <pattern id={id} width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke={color} strokeWidth="0.5" />
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

function StationBox({
  x,
  y,
  w,
  h,
  label,
  detail,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  detail?: string;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={w} height={h} fill="white" stroke={INK} strokeWidth="0.9" />
      <rect width={w} height={12} fill={INK} />
      <text
        x={w / 2}
        y={9}
        textAnchor="middle"
        fontSize="7.5"
        fill="white"
        fontFamily="ui-monospace, monospace"
        letterSpacing="1.5"
        fontWeight="bold"
      >
        {label}
      </text>
      {detail && (
        <text
          x={w / 2}
          y={h - 8}
          textAnchor="middle"
          fontSize="7"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
        >
          {detail}
        </text>
      )}
    </g>
  );
}

function ProductionFlowDiagram() {
  const stations = [
    { x: 30, w: 88, h: 60, label: "MOARĂ", detail: "ciocane" },
    { x: 138, w: 88, h: 60, label: "CERNĂTOR", detail: "site fine" },
    { x: 246, w: 88, h: 60, label: "MALAXOR", detail: "amestec" },
    { x: 354, w: 88, h: 60, label: "PRESĂ HIDR.", detail: "compactare" },
    { x: 462, w: 108, h: 60, label: "PALETIZARE", detail: "manuală" },
  ];

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-auto"
      role="img"
      aria-labelledby="flow-title"
    >
      <title id="flow-title">
        Schemă flux tehnologic CAMMA · moară cu ciocane, cernător, malaxor, presă hidraulică, paletizare
      </title>
      <defs>
        <GridDefs id="grid-flow" />
        <ArrowMarker id="arrow-flow" color={INK} />
      </defs>
      <rect width="600" height="360" fill="url(#grid-flow)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        FLUX TEHNOLOGIC · LINIE COMPLETĂ
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        argilă uscată · cernere · amestec · presare semi-uscată · maturare
      </text>

      <g transform="translate(0,90)">
        <text x={70} y={12} fontSize="8" fill={DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          INTRARE · ARGILĂ + NISIP + CIMENT
        </text>

        {stations.map((s) => (
          <StationBox key={s.label} x={s.x} y={28} w={s.w} h={s.h} label={s.label} detail={s.detail} />
        ))}

        {[118, 226, 334, 442].map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1={58}
              x2={x + 20}
              y2={58}
              stroke={INK}
              strokeWidth="1"
              markerEnd="url(#arrow-flow)"
            />
            <motion.circle
              cx={x}
              cy={58}
              r={3}
              fill={BRICK}
              animate={{ cx: [x, x + 20, x] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: i * 0.35,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        <motion.g
          animate={{ x: [0, 88, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <circle cx={45} cy={62} r={1.6} fill={BRICK_DEEP} />
          <circle cx={62} cy={64} r={1.4} fill={BRICK_DEEP} />
          <circle cx={80} cy={62} r={1.6} fill={BRICK_DEEP} />
          <circle cx={100} cy={64} r={1.2} fill={BRICK_DEEP} />
        </motion.g>

        <motion.g
          animate={{ x: [0, 88, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          <circle cx={150} cy={62} r={1.2} fill={BRICK_DEEP} />
          <circle cx={170} cy={64} r={1} fill={BRICK_DEEP} />
          <circle cx={195} cy={62} r={1.2} fill={BRICK_DEEP} />
        </motion.g>

        <motion.g
          animate={{ scaleY: [1, 1.18, 1] }}
          style={{ transformOrigin: "398px 70px", transformBox: "fill-box" }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <line x1={398} y1={42} x2={398} y2={62} stroke={ALERT} strokeWidth="2.4" />
          <polygon points="394,42 402,42 398,52" fill={ALERT} />
        </motion.g>

        {[0, 1, 2].map((i) => (
          <motion.rect
            key={i}
            x={488 + i * 18}
            y={64}
            width={14}
            height={8}
            fill={BRICK}
            stroke={BRICK_DEEP}
            strokeWidth="0.6"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              times: [0, 0.3, 0.85, 1],
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </g>

      <g transform="translate(30,210)">
        <rect width="540" height="100" fill="white" stroke={DIM} strokeWidth="0.7" strokeDasharray="3 3" />
        <text x={12} y={18} fontSize="8" fill={ACCENT} fontFamily="ui-monospace, monospace" letterSpacing="2" fontWeight="bold">
          CONTROL · CALCULATOR UMIDITATE MATERIE PRIMĂ
        </text>
        <text x={12} y={36} fontSize="8" fill={INK} fontFamily="ui-monospace, monospace">
          ARGILĂ
        </text>
        <text x={12} y={56} fontSize="8" fill={INK} fontFamily="ui-monospace, monospace">
          NISIP
        </text>
        <text x={12} y={76} fontSize="8" fill={INK} fontFamily="ui-monospace, monospace">
          CIMENT
        </text>
        <text x={12} y={92} fontSize="7" fill={DIM} fontFamily="ui-monospace, monospace">
          recalc proporții la fiecare șarjă · constanță calitate
        </text>

        {[
          { y: 32, base: 0.62, label: "62%" },
          { y: 52, base: 0.34, label: "34%" },
          { y: 72, base: 0.045, label: "4.5%" },
        ].map((b, i) => (
          <g key={i}>
            <rect x={70} y={b.y} width={300} height={6} fill="#e6e9f0" />
            <motion.rect
              x={70}
              y={b.y}
              height={6}
              fill={ACCENT}
              animate={{ width: [300 * (b.base - 0.05), 300 * (b.base + 0.05), 300 * (b.base - 0.05)] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            />
            <text
              x={380}
              y={b.y + 6}
              fontSize="7.5"
              fill={INK}
              fontFamily="ui-monospace, monospace"
              fontWeight="bold"
            >
              {b.label}
            </text>
          </g>
        ))}

        <g transform="translate(430,30)">
          <rect width="98" height="60" fill={NIGHT_BG} stroke={ACCENT} strokeWidth="0.6" />
          <text x={49} y={14} textAnchor="middle" fontSize="7" fill={ACCENT} fontFamily="ui-monospace, monospace" letterSpacing="2">
            UMIDITATE
          </text>
          <motion.text
            x={49}
            y={36}
            textAnchor="middle"
            fontSize="14"
            fill="white"
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            8.4%
          </motion.text>
          <motion.circle
            cx={88}
            cy={14}
            r={2.5}
            fill={ACCENT}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <text x={49} y={50} textAnchor="middle" fontSize="6.5" fill={DIM} fontFamily="ui-monospace, monospace">
            sensor în malaxor
          </text>
        </g>
      </g>

      <TitleBlock
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["LINIE", "TURNKEY"],
          ["LOC", "BUZĂU · RO"],
        ]}
        x={444}
        y={322}
      />
    </svg>
  );
}

function PressureChemistryDiagram() {
  return (
    <svg
      viewBox="0 0 600 380"
      className="w-full h-auto"
      role="img"
      aria-labelledby="pc-title"
    >
      <title id="pc-title">
        Paradoxul forței de presare versus chimia materiei prime în producția de cărămidă modulară
      </title>
      <defs>
        <GridDefs id="grid-pc" />
      </defs>
      <rect width="600" height="380" fill="url(#grid-pc)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        FORȚĂ DE PRESARE ≠ PRODUCȚIE
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        de ce 2 prese ucrainene cu forțe enorme nu produceau nimic
      </text>

      <g transform="translate(50,90)">
        <text
          x={100}
          y={0}
          textAnchor="middle"
          fontSize="9"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
          fontWeight="bold"
        >
          PRESE UCRAINENE · BRUTE
        </text>

        <rect x={40} y={40} width={120} height={80} fill="white" stroke={INK} strokeWidth="1.2" />
        <rect x={50} y={50} width={100} height={6} fill={DIM} />
        <line x1={55} y1={56} x2={55} y2={106} stroke={INK} strokeWidth="1" />
        <line x1={145} y1={56} x2={145} y2={106} stroke={INK} strokeWidth="1" />

        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1={70 + i * 20}
            y1={20}
            x2={70 + i * 20}
            y2={50}
            stroke={ALERT}
            strokeWidth="3"
            animate={{ y2: [50, 56, 50], opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <motion.polygon
            key={i}
            points={`${66 + i * 20},50 ${74 + i * 20},50 ${70 + i * 20},58`}
            fill={ALERT}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
        <text
          x={100}
          y={16}
          textAnchor="middle"
          fontSize="8"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          PRESIUNE++
        </text>

        <rect x={60} y={88} width={80} height={18} fill={BRICK_DEEP} fillOpacity={0.3} />
        <motion.path
          d="M 70 95 Q 80 88 90 95 Q 100 102 110 95 Q 120 88 130 95"
          fill="none"
          stroke={BRICK_DEEP}
          strokeWidth="0.8"
          strokeDasharray="2 2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <text x={100} y={132} textAnchor="middle" fontSize="7" fill={DIM} fontFamily="ui-monospace, monospace">
          materie primă fără rețetă
        </text>

        <text
          x={100}
          y={170}
          textAnchor="middle"
          fontSize="22"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="3"
        >
          0
        </text>
        <text
          x={100}
          y={188}
          textAnchor="middle"
          fontSize="9"
          fill={ALERT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          CĂRĂMIZI / ZI
        </text>
        <text
          x={100}
          y={205}
          textAnchor="middle"
          fontSize="7"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
        >
          fără suport tehnic · fără know-how
        </text>
      </g>

      <line x1={300} y1={70} x2={300} y2={310} stroke={DIM} strokeWidth="0.5" strokeDasharray="3 3" />

      <g transform="translate(350,90)">
        <text
          x={100}
          y={0}
          textAnchor="middle"
          fontSize="9"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
          fontWeight="bold"
        >
          LINIE UZINEX · OPTIMIZATĂ
        </text>

        <rect x={40} y={40} width={120} height={80} fill="white" stroke={INK} strokeWidth="1.2" />
        <rect x={50} y={50} width={100} height={6} fill={DIM} />
        <line x1={55} y1={56} x2={55} y2={106} stroke={INK} strokeWidth="1" />
        <line x1={145} y1={56} x2={145} y2={106} stroke={INK} strokeWidth="1" />

        {[0, 1].map((i) => (
          <motion.line
            key={i}
            x1={85 + i * 30}
            y1={30}
            x2={85 + i * 30}
            y2={50}
            stroke={ACCENT}
            strokeWidth="2.4"
            animate={{ y2: [50, 56, 50] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
        {[0, 1].map((i) => (
          <motion.polygon
            key={i}
            points={`${82 + i * 30},50 ${88 + i * 30},50 ${85 + i * 30},56`}
            fill={ACCENT}
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
        <text
          x={100}
          y={22}
          textAnchor="middle"
          fontSize="8"
          fill={ACCENT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          PRESIUNE CALIBRATĂ
        </text>

        <rect x={60} y={88} width={80} height={18} fill={BRICK} />
        <line x1={70} y1={91} x2={70} y2={103} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={90} y1={91} x2={90} y2={103} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={110} y1={91} x2={110} y2={103} stroke={BRICK_DEEP} strokeWidth="0.5" />
        <line x1={130} y1={91} x2={130} y2={103} stroke={BRICK_DEEP} strokeWidth="0.5" />

        <motion.text
          x={100}
          y={132}
          textAnchor="middle"
          fontSize="7"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          rețetă: argilă · nisip · ciment · apă
        </motion.text>

        <motion.text
          x={100}
          y={170}
          textAnchor="middle"
          fontSize="22"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
          animate={{ scale: [1, 1.05, 1] }}
          style={{ transformOrigin: "100px 165px", transformBox: "fill-box" }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          20.000
        </motion.text>
        <text
          x={100}
          y={188}
          textAnchor="middle"
          fontSize="9"
          fill={OK}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
        >
          CĂRĂMIZI / ZI
        </text>
        <text
          x={100}
          y={205}
          textAnchor="middle"
          fontSize="7"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
        >
          transfer know-how · suport tehnic local
        </text>
      </g>

      <text
        x="300"
        y="328"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
        letterSpacing="3"
        fontWeight="bold"
      >
        CHEIA NU E FORȚA · E CHIMIA + FLUXUL CALIBRAT
      </text>

      <TitleBlock
        rows={[
          ["UZX-CAMMA", "REV. A"],
          ["KNOW-HOW", "INCLUS"],
          ["MAT", "BUZĂU"],
        ]}
        x={20}
        y={342}
      />
    </svg>
  );
}

function CapacityDiagram() {
  return (
    <svg
      viewBox="0 0 600 380"
      className="w-full h-auto"
      role="img"
      aria-labelledby="cap-title"
    >
      <title id="cap-title">
        Capacitate CAMMA înainte de Uzinex 200 cărămizi pe zi versus 20.000 cărămizi pe zi după
      </title>
      <defs>
        <GridDefs id="grid-cap" />
      </defs>
      <rect width="600" height="380" fill="url(#grid-cap)" />

      <text
        x="300"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill={INK}
        fontFamily="ui-monospace, monospace"
        letterSpacing="6"
      >
        SALT DE CAPACITATE · ×100
      </text>
      <text
        x="300"
        y="50"
        textAnchor="middle"
        fontSize="9"
        fill={ACCENT}
        fontFamily="ui-monospace, monospace"
      >
        de la 200 cărămizi/zi cu pierderi mari, la 20.000 cărămizi/zi cu pierderi minime
      </text>

      <g transform="translate(60,80)">
        <line x1={0} y1={200} x2={480} y2={200} stroke={INK} strokeWidth="1" />
        <line x1={0} y1={0} x2={0} y2={200} stroke={INK} strokeWidth="1" />

        {[0, 50, 100, 150, 200].map((v, i) => {
          const y = 200 - (v / 200) * 180;
          return (
            <g key={i}>
              <line x1={-4} y1={y} x2={0} y2={y} stroke={INK} strokeWidth="0.8" />
              <text
                x={-8}
                y={y + 3}
                textAnchor="end"
                fontSize="7"
                fill={DIM}
                fontFamily="ui-monospace, monospace"
              >
                {v === 0 ? "0" : v === 200 ? "20k" : `${v / 10}k`}
              </text>
            </g>
          );
        })}
        <text
          x={-44}
          y={108}
          fontSize="7.5"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
          letterSpacing="2"
          transform="rotate(-90, -44, 108)"
        >
          BUC / ZI · MII
        </text>

        <g>
          <motion.rect
            x={80}
            y={198}
            width={80}
            height={2}
            fill={ALERT}
            animate={{ height: [0, 2], y: [200, 198] }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <text
            x={120}
            y={222}
            textAnchor="middle"
            fontSize="9"
            fill={ALERT}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            200 buc/zi
          </text>
          <text
            x={120}
            y={236}
            textAnchor="middle"
            fontSize="7"
            fill={DIM}
            fontFamily="ui-monospace, monospace"
          >
            pre-Uzinex · pierderi mari
          </text>
          <text
            x={120}
            y={252}
            textAnchor="middle"
            fontSize="6.5"
            fill={DIM}
            fontFamily="ui-monospace, monospace"
            fontStyle="italic"
          >
            doar 2 prese fără rețetă
          </text>
        </g>

        <g>
          <motion.rect
            x={300}
            y={200}
            width={80}
            fill={OK}
            initial={{ height: 0, y: 200 }}
            animate={{ height: 180, y: 20 }}
            transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
          />
          <motion.rect
            x={300}
            y={20}
            width={80}
            height={180}
            fill="url(#brick-pattern)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          />
          <defs>
            <pattern id="brick-pattern" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
              <rect width="20" height="10" fill="none" />
              <line x1="0" y1="0" x2="20" y2="0" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
              <line x1="0" y1="5" x2="20" y2="5" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
              <line x1="10" y1="0" x2="10" y2="5" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
              <line x1="0" y1="5" x2="0" y2="10" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
              <line x1="20" y1="5" x2="20" y2="10" stroke={BRICK_DEEP} strokeOpacity="0.4" strokeWidth="0.8" />
            </pattern>
          </defs>
          <text
            x={340}
            y={222}
            textAnchor="middle"
            fontSize="9"
            fill={OK}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            20.000 buc/zi
          </text>
          <text
            x={340}
            y={236}
            textAnchor="middle"
            fontSize="7"
            fill={DIM}
            fontFamily="ui-monospace, monospace"
          >
            cu Uzinex · pierderi minime
          </text>
          <text
            x={340}
            y={252}
            textAnchor="middle"
            fontSize="6.5"
            fill={DIM}
            fontFamily="ui-monospace, monospace"
            fontStyle="italic"
          >
            linie completă + know-how
          </text>
        </g>

        <motion.path
          d="M 160 198 C 220 100, 250 30, 300 25"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 1.4 }}
        />
        <motion.text
          x={250}
          y={90}
          textAnchor="middle"
          fontSize="14"
          fill={ACCENT}
          fontFamily="ui-monospace, monospace"
          fontWeight="bold"
          letterSpacing="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          ×100
        </motion.text>
        <motion.text
          x={250}
          y={106}
          textAnchor="middle"
          fontSize="7"
          fill={DIM}
          fontFamily="ui-monospace, monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.4 }}
        >
          capacitate operațională
        </motion.text>
      </g>

      <g transform="translate(40,310)">
        <rect width="240" height="50" fill="white" stroke={DIM} strokeWidth="0.7" />
        <text x={12} y={16} fontSize="7.5" fill={DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CIFRĂ DE AFACERI · CAMMA
        </text>
        <text x={12} y={34} fontSize="11" fill={INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          900 K → 1.5 M lei
        </text>
        <text x={12} y={45} fontSize="7" fill={ACCENT} fontFamily="ui-monospace, monospace">
          +66% · 2023 vs 2024
        </text>
        <motion.line
          x1={170}
          y1={36}
          x2={220}
          y2={20}
          stroke={ACCENT}
          strokeWidth="1.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <polygon points="220,20 218,26 226,22" fill={ACCENT} />
      </g>

      <g transform="translate(310,310)">
        <rect width="240" height="50" fill="white" stroke={DIM} strokeWidth="0.7" />
        <text x={12} y={16} fontSize="7.5" fill={DIM} fontFamily="ui-monospace, monospace" letterSpacing="2">
          CAPACITATE TEORETICĂ · LINIE
        </text>
        <text x={12} y={34} fontSize="11" fill={INK} fontFamily="ui-monospace, monospace" fontWeight="bold">
          800.000 m³/an
        </text>
        <text x={12} y={45} fontSize="7" fill={ACCENT} fontFamily="ui-monospace, monospace">
          1M+ m³ total · cu cele 2 prese refolosite
        </text>
      </g>
    </svg>
  );
}

export function CammaCaseDiagrams() {
  return (
    <div className="space-y-3 lg:space-y-4">
      <figure className="border hairline bg-white">
        <ProductionFlowDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 1 · fluxul tehnologic livrat la Buzău
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Argila uscată intră în moara cu ciocane, se cerne pe site fine ca să elimine
            bucățile mari, se amestecă în malaxor cu nisip, ciment și apă conform
            rețetei, apoi se compactează în presa hidraulică. Cărămizile crude ies
            pe banda de evacuare și se așază manual pe paleți pentru maturare.
            Calculatorul de umiditate recalcula proporțiile la fiecare șarjă, ținând
            calitatea constantă indiferent de umiditatea materiei prime din carieră.
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <PressureChemistryDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 2 · de ce 2 prese ucrainene cu forțe enorme nu produceau
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Furnizorul ucrainean a vândut prese cu forță de presare enormă, fără să
            înțeleagă tehnologia de producție. Forța brută nu compensează lipsa
            rețetei: argilă fără calcul corect de umiditate, fără adaos calibrat de
            nisip și ciment, fără flux tehnologic complet. Cheia producției de
            cărămidă modulară hyper-presată stă în chimia betoanelor semi-uscate, nu
            în tonajul presei. Linia Uzinex a venit cu rețeta și fluxul, presiunea a
            fost calibrată pe materialul real din Buzău.
          </p>
        </figcaption>
      </figure>

      <figure className="border hairline bg-white">
        <CapacityDiagram />
        <figcaption className="px-5 py-4 border-t hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1.5">
            Schema 3 · saltul operațional × 100
          </div>
          <p className="text-xs lg:text-sm text-ink-600 leading-relaxed">
            Înainte de intrarea liniei Uzinex în funcțiune, CAMMA reușea să producă
            sub 200 de cărămizi pe zi, cu pierderi mari pe fiecare șarjă. După
            implementare și transferul de know-how, capacitatea operațională a
            ajuns la 20.000 de cărămizi pe zi, iar pierderile s-au redus la minim.
            Cifra de afaceri a urmat: 900K lei în 2023, 1.5M lei în 2024. Capacitatea
            teoretică a liniei este de 800.000 m³ de cărămidă pe an, iar adăugând
            cele 2 prese ucrainene refolosite cu rețeta corectă, CAMMA depășește
            1.000.000 m³ pe an.
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
