"use client";

/**
 * BLUEPRINT primitives — stil grafic comun pentru toate animatiile de aplicatii.
 *
 * Estetica: hartie milimetrica + cote tehnice + caseta de identificare a desenului.
 * Spune "noi suntem ingineri", nu "noi facem ilustratii drăguțe".
 *
 * Toate animatiile folosesc viewBox "0 0 280 145" si paleta:
 *   NAVY = linii principale, FILL_NAVY = umplere subtila
 *   ORANGE = punct de actiune (taiere/frezare/pulse)
 *   ANNOT = cote, leader lines, text tehnic
 *   GRID = liniile de hartie milimetrica
 */

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";

export const NAVY = "#0b2b66";
export const FILL_NAVY = "rgba(11,43,102,0.06)";
export const ORANGE = "#f5851f";
export const FILL_ORANGE = "rgba(245,133,31,0.10)";
export const ANNOT = "#64748b";
export const GRID = "#cbd5e1";
export const PAPER = "#fafbfc";

export const VIEW = { w: 280, h: 145 };

/**
 * Hartie milimetrica — pattern dublu (5mm fin + 25mm bold).
 * Generam ID-uri unice pe instanta cu useId-style — dar pentru SSR
 * avem nevoie de string stabil, asa ca primim ca prop.
 */
export function GridPaper({ uid = "default" }: { uid?: string }) {
  const fineId = `bp-grid-fine-${uid}`;
  const boldId = `bp-grid-bold-${uid}`;
  return (
    <>
      <defs>
        <pattern id={fineId} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="M 5 0 L 0 0 0 5" fill="none" stroke={GRID} strokeWidth="0.2" opacity="0.5" />
        </pattern>
        <pattern id={boldId} width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke={GRID} strokeWidth="0.4" opacity="0.7" />
        </pattern>
      </defs>
      <rect width={VIEW.w} height={VIEW.h} fill={PAPER} />
      <rect width={VIEW.w} height={VIEW.h} fill={`url(#${fineId})`} />
      <rect width={VIEW.w} height={VIEW.h} fill={`url(#${boldId})`} />
    </>
  );
}

/** Cota tehnica cu sageti si extension lines. */
export function Dim({
  x1,
  y1,
  x2,
  y2,
  label,
  side = "top",
  delay = 0,
  offset = 8,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  label: string;
  side?: "top" | "bottom" | "left" | "right";
  delay?: number;
  offset?: number;
}) {
  const horizontal = y1 === y2;
  const oy = side === "top" ? -offset : side === "bottom" ? offset : 0;
  const ox = side === "left" ? -offset : side === "right" ? offset : 0;
  const ay = horizontal ? y1 + oy : y1;
  const by = horizontal ? y2 + oy : y2;
  const ax = horizontal ? x1 : x1 + ox;
  const bx = horizontal ? x2 : x2 + ox;
  const tx = (ax + bx) / 2;
  const ty = (ay + by) / 2;
  const labelW = Math.max(label.length * 2.2 + 4, 10);
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      stroke={ANNOT}
      fill={ANNOT}
      strokeWidth="0.3"
    >
      {/* extension lines */}
      <line x1={x1} y1={y1} x2={ax} y2={ay} strokeDasharray="2 1.5" strokeWidth="0.25" />
      <line x1={x2} y1={y2} x2={bx} y2={by} strokeDasharray="2 1.5" strokeWidth="0.25" />
      {/* dimension line */}
      <line x1={ax} y1={ay} x2={bx} y2={by} />
      {/* arrows */}
      {horizontal ? (
        <>
          <polygon points={`${ax},${ay} ${ax + 3},${ay - 1.2} ${ax + 3},${ay + 1.2}`} />
          <polygon points={`${bx},${by} ${bx - 3},${by - 1.2} ${bx - 3},${by + 1.2}`} />
        </>
      ) : (
        <>
          <polygon points={`${ax},${ay} ${ax - 1.2},${ay + 3} ${ax + 1.2},${ay + 3}`} />
          <polygon points={`${bx},${by} ${bx - 1.2},${by - 3} ${bx + 1.2},${by - 3}`} />
        </>
      )}
      {/* label background */}
      <rect x={tx - labelW / 2} y={ty - 2.6} width={labelW} height="3.6" fill={PAPER} stroke="none" />
      <text
        x={tx}
        y={ty + 0.3}
        textAnchor="middle"
        fontSize="3.2"
        fontFamily="ui-monospace, monospace"
        fill={ANNOT}
        stroke="none"
      >
        {label}
      </text>
    </motion.g>
  );
}

/** Adnotare cu leader line. */
export function Annotation({
  x,
  y,
  tx,
  ty,
  text,
  color = ORANGE,
  delay = 0,
}: {
  x: number;
  y: number;
  tx: number;
  ty: number;
  text: string;
  color?: string;
  delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay }}
      fontFamily="ui-monospace, monospace"
    >
      <line x1={x} y1={y} x2={tx} y2={ty} stroke={ANNOT} strokeWidth="0.3" />
      <circle cx={x} cy={y} r="0.7" fill={ANNOT} />
      <text x={tx} y={ty - 1.5} fontSize="3.3" fill={color}>
        {text}
      </text>
    </motion.g>
  );
}

/** Titlul desenului — sus, centrat, monospaced spread. */
export function DrawingTitle({ text }: { text: string }) {
  return (
    <text
      x={VIEW.w / 2}
      y="11"
      textAnchor="middle"
      fontSize="5.6"
      fill={NAVY}
      fontFamily="ui-monospace, monospace"
      letterSpacing="2"
      fontWeight="600"
    >
      {text.toUpperCase()}
    </text>
  );
}

/** Caseta de identificare a desenului — colt dreapta-jos. */
export function CornerStamp({
  code,
  rev = "REV.A",
  scale = "1:5",
  std = "DIN 919",
}: {
  code: string;
  rev?: string;
  scale?: string;
  std?: string;
}) {
  return (
    <g fontFamily="ui-monospace, monospace" fontSize="2.8" fill={ANNOT}>
      <rect x="218" y="125" width="58" height="16" fill="none" stroke={ANNOT} strokeWidth="0.3" />
      <line x1="218" y1="130" x2="276" y2="130" stroke={ANNOT} strokeWidth="0.3" />
      <line x1="218" y1="135" x2="276" y2="135" stroke={ANNOT} strokeWidth="0.3" />
      <line x1="248" y1="125" x2="248" y2="141" stroke={ANNOT} strokeWidth="0.3" />
      <text x="220" y="129">{code}</text>
      <text x="250" y="129">{rev}</text>
      <text x="220" y="134">SCALA {scale}</text>
      <text x="250" y="134">{std}</text>
      <text x="220" y="139">UNIT: mm</text>
      <text x="250" y="139">UZINEX</text>
    </g>
  );
}

/** Indicator axe X/Y/Z — colt stanga jos. */
export function AxesIndicator({
  axes = ["X", "Z"],
}: {
  axes?: ("X" | "Y" | "Z")[];
}) {
  return (
    <g
      stroke={ANNOT}
      fill={ANNOT}
      fontFamily="ui-monospace, monospace"
    >
      <line x1="6" y1="138" x2="18" y2="138" strokeWidth="0.4" />
      <polygon points="18,138 16,137 16,139" />
      <text x="20" y="139.5" fontSize="3.2" stroke="none">
        {axes[0]}
      </text>
      <line x1="6" y1="138" x2="6" y2="126" strokeWidth="0.4" />
      <polygon points="6,126 5,128 7,128" />
      <text x="3" y="124" fontSize="3.2" stroke="none">
        {axes[1] ?? "Y"}
      </text>
    </g>
  );
}

/**
 * Frame standard — wraps any blueprint animation:
 *   <BlueprintFrame uid="laser" title="Tăiere laser fiber" code="UZX-001">
 *     ...continut animatie cu primitive blueprint...
 *   </BlueprintFrame>
 */
export function BlueprintFrame({
  uid,
  title,
  code,
  rev,
  scale,
  std,
  axes,
  children,
}: {
  uid: string;
  title: string;
  code: string;
  rev?: string;
  scale?: string;
  std?: string;
  axes?: ("X" | "Y" | "Z")[];
  children: ReactNode;
}) {
  return (
    <svg viewBox={`0 0 ${VIEW.w} ${VIEW.h}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet">
      <GridPaper uid={uid} />
      <DrawingTitle text={title} />
      {children}
      {axes && <AxesIndicator axes={axes} />}
      <CornerStamp code={code} rev={rev} scale={scale} std={std} />
    </svg>
  );
}

/** Helper — pulse subtil (folosit pentru puncte de actiune). */
export const PULSE_TRANSITION: Transition = {
  duration: 0.6,
  repeat: Infinity,
  ease: "easeInOut",
};

/** Helper — outline + fill subtil pentru piese principale. */
export function Workpiece(props: {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  fillColor?: string;
}) {
  const c = props.color ?? NAVY;
  const f = props.fillColor ?? FILL_NAVY;
  return (
    <>
      <rect x={props.x} y={props.y} width={props.width} height={props.height} fill={f} />
      <rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill="none"
        stroke={c}
        strokeWidth="0.7"
      />
    </>
  );
}
