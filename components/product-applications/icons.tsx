/* Icon registry: thematic mini-icons rendered to the left of each application title.
 * Each id maps to a 48×48 SVG component using stroke="currentColor" so it inherits
 * the orange accent from ApplicationsGrid.
 */

export type ApplicationIconId =
  | "pipe"
  | "sewer"
  | "ptz"
  | "crawler"
  | "bucket"
  | "crusher-jaws"
  | "shears"
  | "claw"
  | "ripper"
  | "coupler"
  | "spindle"
  | "lathe"
  | "edge"
  | "shredder"
  | "magnet"
  | "conveyor"
  | "press"
  | "pallet"
  | "shrink"
  | "strap"
  | "label"
  | "heat-pump"
  | "laser"
  | "saw"
  | "scope"
  | "excavator"
  | "compactor"
  | "screen"
  | "bottle"
  | "car"
  | "chip"
  | "tire"
  | "piston"
  | "box"
  | "fill"
  | "gear"
  | "stone"
  | "furniture"
  | "factory"
  | "spark"
  | "shield"
  | "leaf";

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
const C = "h-12 w-12";

function I(props: React.SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 48 48" className={C} {...props} />;
}

const ICONS: Record<ApplicationIconId, () => React.ReactElement> = {
  pipe: () => (
    <I {...stroke}>
      <path d="M5 24h38" />
      <path d="M14 16v16M28 16v16M40 16v16" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
    </I>
  ),
  sewer: () => (
    <I {...stroke}>
      <path d="M6 14h14M28 14h14" />
      <path d="M20 14v20M28 14v20" />
      <path d="M6 34h36" />
      <circle cx="14" cy="14" r="2" fill="currentColor" />
      <circle cx="34" cy="14" r="2" fill="currentColor" />
      <circle cx="24" cy="34" r="2" fill="currentColor" />
    </I>
  ),
  ptz: () => (
    <I {...stroke}>
      <circle cx="24" cy="24" r="6" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <path d="M30 24l12-8v16z" />
      <path d="M10 10l4 4M38 10l-4 4M10 38l4-4M38 38l-4-4" />
    </I>
  ),
  crawler: () => (
    <I {...stroke}>
      <rect x="6" y="20" width="36" height="14" rx="2" />
      <circle cx="14" cy="34" r="4" />
      <circle cx="34" cy="34" r="4" />
      <rect x="14" y="12" width="20" height="8" rx="1" />
      <circle cx="32" cy="16" r="2" fill="currentColor" />
    </I>
  ),
  bucket: () => (
    <I {...stroke}>
      <path d="M10 18l28 4 4 14-30 4z" />
      <path d="M14 36l2 4M22 36l2 4M30 36l2 4" />
      <path d="M10 18l-4-6" />
    </I>
  ),
  "crusher-jaws": () => (
    <I {...stroke}>
      <path d="M8 8l8 16-8 16" />
      <path d="M40 8l-8 16 8 16" />
      <path d="M14 18h2M14 24h2M14 30h2M32 18h2M32 24h2M32 30h2" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </I>
  ),
  shears: () => (
    <I {...stroke}>
      <path d="M6 14l28 14M6 34l28-14" />
      <circle cx="34" cy="20" r="4" />
      <circle cx="34" cy="28" r="4" />
      <circle cx="6" cy="14" r="2" fill="currentColor" />
      <circle cx="6" cy="34" r="2" fill="currentColor" />
    </I>
  ),
  claw: () => (
    <I {...stroke}>
      <path d="M24 6v8" />
      <circle cx="24" cy="14" r="2" fill="currentColor" />
      <path d="M24 14l-12 24M24 14l12 24" />
      <path d="M19 14l-3 24M29 14l3 24" />
    </I>
  ),
  ripper: () => (
    <I {...stroke}>
      <rect x="14" y="6" width="20" height="14" rx="1" />
      <path d="M14 20l2 18M22 20l2 18M30 20l2 18" />
      <path d="M6 40h36" />
    </I>
  ),
  coupler: () => (
    <I {...stroke}>
      <rect x="6" y="20" width="14" height="8" rx="1" />
      <rect x="28" y="20" width="14" height="8" rx="1" />
      <path d="M20 24h8" strokeDasharray="2 2" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </I>
  ),
  spindle: () => (
    <I {...stroke}>
      <rect x="20" y="6" width="8" height="20" />
      <path d="M20 26l-4 8 8 4 8-4-4-8" />
      <path d="M22 38v6" />
      <path d="M6 44h36" />
    </I>
  ),
  lathe: () => (
    <I {...stroke}>
      <rect x="6" y="22" width="6" height="12" />
      <rect x="36" y="24" width="6" height="8" />
      <path d="M12 28h24" />
      <circle cx="24" cy="28" r="6" />
      <path d="M24 16v6" />
    </I>
  ),
  edge: () => (
    <I {...stroke}>
      <rect x="6" y="20" width="36" height="10" />
      <path d="M6 32h36" />
      <rect x="6" y="32" width="36" height="3" fill="currentColor" />
    </I>
  ),
  shredder: () => (
    <I {...stroke}>
      <path d="M14 6l4 12M24 6l4 12" />
      <rect x="8" y="18" width="32" height="12" />
      <path d="M14 22l3 4M22 22l3 4M30 22l3 4" />
      <path d="M16 36l-2 6M24 36l-2 6M32 36l-2 6" />
    </I>
  ),
  magnet: () => (
    <I {...stroke}>
      <path d="M12 6v18a12 12 0 0024 0V6" />
      <path d="M12 6h8v18a4 4 0 008 0V6h8" />
    </I>
  ),
  conveyor: () => (
    <I {...stroke}>
      <ellipse cx="10" cy="28" rx="4" ry="4" />
      <ellipse cx="38" cy="28" rx="4" ry="4" />
      <path d="M10 24h28M10 32h28" />
      <rect x="16" y="14" width="6" height="6" />
      <rect x="26" y="14" width="6" height="6" />
    </I>
  ),
  press: () => (
    <I {...stroke}>
      <path d="M10 8h28v6h-28z" />
      <path d="M14 14v8h20v-8" />
      <path d="M10 36h28v4h-28z" />
      <rect x="14" y="22" width="20" height="14" />
    </I>
  ),
  pallet: () => (
    <I {...stroke}>
      <rect x="8" y="8" width="32" height="20" />
      <path d="M8 16h32M16 8v20M32 8v20" />
      <path d="M6 32h36M10 36h28" />
    </I>
  ),
  shrink: () => (
    <I {...stroke}>
      <rect x="10" y="10" width="28" height="28" rx="2" />
      <path d="M16 16l16 16M32 16l-16 16" strokeDasharray="2 2" />
    </I>
  ),
  strap: () => (
    <I {...stroke}>
      <rect x="10" y="14" width="28" height="20" />
      <rect x="14" y="8" width="6" height="32" fill="currentColor" />
      <rect x="28" y="8" width="6" height="32" fill="currentColor" />
    </I>
  ),
  label: () => (
    <I {...stroke}>
      <rect x="8" y="14" width="32" height="20" rx="2" />
      <path d="M14 22h20M14 26h14" />
      <path d="M30 30v4M32 30v4M34 30v4M36 30v4" />
    </I>
  ),
  "heat-pump": () => (
    <I {...stroke}>
      <circle cx="24" cy="24" r="14" />
      <path d="M24 10v28M10 24h28" strokeDasharray="2 2" />
      <path d="M14 14l20 20M34 14L14 34" />
    </I>
  ),
  laser: () => (
    <I {...stroke}>
      <rect x="20" y="6" width="8" height="14" />
      <path d="M24 20v22" strokeDasharray="2 2" />
      <path d="M14 42h20" />
      <circle cx="24" cy="34" r="3" fill="currentColor" />
    </I>
  ),
  saw: () => (
    <I {...stroke}>
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M24 10v6M24 32v6M10 24h6M32 24h6M14 14l4 4M30 30l4 4M14 34l4-4M30 18l4-4" />
    </I>
  ),
  scope: () => (
    <I {...stroke}>
      <circle cx="34" cy="14" r="6" />
      <path d="M30 18C20 28 18 36 8 38" />
      <circle cx="8" cy="38" r="2" fill="currentColor" />
    </I>
  ),
  excavator: () => (
    <I {...stroke}>
      <path d="M6 38h36" />
      <rect x="10" y="28" width="14" height="6" />
      <circle cx="14" cy="38" r="3" />
      <circle cx="22" cy="38" r="3" />
      <path d="M16 28l8-14 8 8" />
      <path d="M30 22l4 6-2 4-6-2z" />
    </I>
  ),
  compactor: () => (
    <I {...stroke}>
      <rect x="10" y="10" width="28" height="10" />
      <rect x="6" y="22" width="36" height="10" />
      <path d="M6 36h36" />
      <path d="M10 38l4 4M34 38l4 4M22 38l4 4" />
    </I>
  ),
  screen: () => (
    <I {...stroke}>
      <ellipse cx="24" cy="24" rx="18" ry="10" />
      <path d="M10 24h28" strokeDasharray="2 2" />
      <circle cx="14" cy="22" r="1.5" fill="currentColor" />
      <circle cx="22" cy="26" r="1.5" fill="currentColor" />
      <circle cx="32" cy="22" r="1.5" fill="currentColor" />
    </I>
  ),
  bottle: () => (
    <I {...stroke}>
      <path d="M20 6h8" />
      <path d="M22 6v6l-4 8v22h12V20l-4-8V6" />
      <path d="M18 26h12" />
    </I>
  ),
  car: () => (
    <I {...stroke}>
      <path d="M6 30l4-10h28l4 10v6H6z" />
      <circle cx="14" cy="36" r="3" />
      <circle cx="34" cy="36" r="3" />
      <path d="M12 22h24" />
    </I>
  ),
  chip: () => (
    <I {...stroke}>
      <rect x="14" y="14" width="20" height="20" />
      <rect x="20" y="20" width="8" height="8" fill="currentColor" />
      <path d="M14 18H8M14 24H8M14 30H8M40 18h-6M40 24h-6M40 30h-6" />
      <path d="M18 14V8M24 14V8M30 14V8M18 40v-6M24 40v-6M30 40v-6" />
    </I>
  ),
  tire: () => (
    <I {...stroke}>
      <circle cx="24" cy="24" r="16" />
      <circle cx="24" cy="24" r="6" />
      <path d="M24 8v8M24 32v8M8 24h8M32 24h8M14 14l4 4M30 30l4 4M14 34l4-4M30 18l4-4" />
    </I>
  ),
  piston: () => (
    <I {...stroke}>
      <rect x="16" y="6" width="16" height="20" />
      <rect x="20" y="26" width="8" height="14" />
      <path d="M14 40h20" />
    </I>
  ),
  box: () => (
    <I {...stroke}>
      <path d="M8 16l16-8 16 8v22l-16 8-16-8z" />
      <path d="M8 16l16 8 16-8M24 24v22" />
    </I>
  ),
  fill: () => (
    <I {...stroke}>
      <path d="M16 6h16v10l-4 8v22H20V24l-4-8z" />
      <rect x="20" y="28" width="8" height="14" fill="currentColor" />
    </I>
  ),
  gear: () => (
    <I {...stroke}>
      <circle cx="24" cy="24" r="8" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <path d="M24 6v6M24 36v6M6 24h6M36 24h6M11 11l4 4M33 33l4 4M11 37l4-4M33 15l4-4" />
    </I>
  ),
  stone: () => (
    <I {...stroke}>
      <path d="M6 30l6-12 8-2 14 4 8 12-6 8H10z" />
      <circle cx="16" cy="24" r="1.5" fill="currentColor" />
      <circle cx="28" cy="22" r="1.5" fill="currentColor" />
      <circle cx="36" cy="30" r="1.5" fill="currentColor" />
    </I>
  ),
  furniture: () => (
    <I {...stroke}>
      <path d="M8 18h32v8H8z" />
      <path d="M12 18V10h24v8" />
      <path d="M14 26v14M34 26v14" />
    </I>
  ),
  factory: () => (
    <I {...stroke}>
      <path d="M6 40V18l10 6V18l10 6V18l16 6v16z" />
      <rect x="12" y="32" width="4" height="8" fill="currentColor" />
      <rect x="22" y="32" width="4" height="8" fill="currentColor" />
      <rect x="32" y="32" width="4" height="8" fill="currentColor" />
    </I>
  ),
  spark: () => (
    <I {...stroke}>
      <path d="M24 4l4 14 14 4-14 4-4 14-4-14L6 22l14-4z" />
    </I>
  ),
  shield: () => (
    <I {...stroke}>
      <path d="M24 6l16 6v14c0 8-7 14-16 18-9-4-16-10-16-18V12z" />
      <path d="M16 24l6 6 12-12" />
    </I>
  ),
  leaf: () => (
    <I {...stroke}>
      <path d="M40 8c-20 0-32 12-32 28 0 4 2 6 4 6 16 0 28-12 28-34z" />
      <path d="M8 42c8-8 16-14 28-22" />
    </I>
  ),
};

export function ApplicationIcon({ id }: { id: ApplicationIconId }) {
  const Component = ICONS[id];
  if (!Component) return null;
  return <Component />;
}
