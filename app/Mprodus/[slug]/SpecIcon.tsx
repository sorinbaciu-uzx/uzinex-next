import type { SpecIcon as SpecIconKey } from "@/lib/product-specs";

/**
 * Librărie de SVG icons pentru specificații tehnice produse.
 * Toate iconițele sunt stroke-based (nu fill), 24×24 viewBox, linework 1.4.
 * Optimizate pentru afișare alb/albastru/gri pe fundaluri deschise.
 */

type Props = { className?: string };

const common = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ═══════ ICON COMPONENTS ═══════

const Dimensions = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M3 21h18M3 3v18M3 21l6-6M3 3l6 6M21 3v18M21 3l-6 6M21 21l-6-6" />
    <path d="M7 7l10 10" strokeDasharray="2 2" />
  </svg>
);

const Weight = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M5 7h14l-2 13H7L5 7z" />
    <circle cx="12" cy="5" r="2.5" />
    <path d="M10 5a2 2 0 1 1 4 0" />
  </svg>
);

const Power = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

const Voltage = (p: Props) => (
  <svg {...common} className={p.className}>
    <rect x="4" y="8" width="16" height="10" rx="1.5" />
    <path d="M8 8V5M16 8V5M9 13h2M13 13h2" />
  </svg>
);

const Battery = (p: Props) => (
  <svg {...common} className={p.className}>
    <rect x="2" y="7" width="18" height="10" rx="1.5" />
    <path d="M20 10v4" />
    <rect x="4" y="9" width="8" height="6" fill="currentColor" opacity="0.3" />
  </svg>
);

const Capacity = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M5 3h14l-2 17H7L5 3z" />
    <path d="M5 10h14" />
  </svg>
);

const Speed = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M12 21a9 9 0 1 0-9-9" />
    <path d="M12 12l5-3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const Temperature = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M10 15V4a2 2 0 1 1 4 0v11a4 4 0 1 1-4 0z" />
    <circle cx="12" cy="17" r="1.5" fill="currentColor" />
  </svg>
);

const Certification = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M12 2l8 4v6c0 5-3 8-8 10-5-2-8-5-8-10V6l8-4z" />
    <path d="M8.5 12l2.5 2.5L16 9" />
  </svg>
);

const Material = (p: Props) => (
  <svg {...common} className={p.className}>
    <rect x="3" y="8" width="18" height="12" rx="1" />
    <path d="M3 12h18M7 8V4h10v4" />
  </svg>
);

const Control = (p: Props) => (
  <svg {...common} className={p.className}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <rect x="7" y="7" width="10" height="10" />
    <path d="M3 9h1M3 15h1M20 9h1M20 15h1M9 3v1M15 3v1M9 20v1M15 20v1" />
  </svg>
);

const Axis = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M4 20V4M4 20h16" />
    <path d="M4 20l16-16" strokeDasharray="2 2" />
    <path d="M4 4l3 3M4 4l3-1M20 20l-3-3M20 20l-1-3" />
  </svg>
);

const Diameter = (p: Props) => (
  <svg {...common} className={p.className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5 19L19 5" strokeDasharray="2 2" />
  </svg>
);

const Travel = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M3 12h18" />
    <path d="M6 9l-3 3 3 3M18 9l3 3-3 3" />
  </svg>
);

const Tools = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M14 4a4 4 0 1 1-4.5 5.5L4 15l5 5 5.5-5.5A4 4 0 0 1 14 4z" />
    <circle cx="15" cy="8" r="1.2" fill="currentColor" />
  </svg>
);

const Config = (p: Props) => (
  <svg {...common} className={p.className}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
  </svg>
);

const Output = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M3 20V4M3 20h18" />
    <path d="M7 16V10M11 16V7M15 16v-9M19 16v-4" />
  </svg>
);

const Consumption = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M12 3c-4 4-7 7-7 10a7 7 0 1 0 14 0c0-3-3-6-7-10z" />
  </svg>
);

const Rpm = (p: Props) => (
  <svg {...common} className={p.className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a9 9 0 0 1 6.4 15.3" />
    <path d="M12 12v-4M12 12l3 2" />
  </svg>
);

const Precision = (p: Props) => (
  <svg {...common} className={p.className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const Protection = (p: Props) => (
  <svg {...common} className={p.className}>
    <path d="M12 2l9 4v6c0 5.5-3.8 9.8-9 11-5.2-1.2-9-5.5-9-11V6l9-4z" />
  </svg>
);

const Default = (p: Props) => (
  <svg {...common} className={p.className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4l2.5 2.5" />
  </svg>
);

// ═══════ MAIN COMPONENT ═══════

const iconMap: Record<SpecIconKey, (p: Props) => React.JSX.Element> = {
  dimensions: Dimensions,
  weight: Weight,
  power: Power,
  voltage: Voltage,
  battery: Battery,
  capacity: Capacity,
  speed: Speed,
  temperature: Temperature,
  certification: Certification,
  material: Material,
  control: Control,
  axis: Axis,
  diameter: Diameter,
  travel: Travel,
  tools: Tools,
  config: Config,
  output: Output,
  consumption: Consumption,
  rpm: Rpm,
  precision: Precision,
  protection: Protection,
  default: Default,
};

export function SpecIcon({
  icon,
  className = "",
}: {
  icon: SpecIconKey;
  className?: string;
}) {
  const Comp = iconMap[icon] || Default;
  return <Comp className={className} />;
}
