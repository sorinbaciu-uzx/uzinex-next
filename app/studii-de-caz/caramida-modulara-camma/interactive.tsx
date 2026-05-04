"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

const BRICK = "#c87b3c";
const BRICK_DEEP = "#8a4f23";
const MORTAR = "#d8d4cb";

export function VideoPlayer({
  youtubeId,
  thumbnail,
  title,
  duration,
}: {
  youtubeId: string;
  thumbnail: string;
  title: string;
  duration?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Vezi videoclipul: ${title}`}
        className="relative block w-full aspect-video bg-ink-100 group overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,37,69,0) 30%, rgba(8,37,69,0.65) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/15 backdrop-blur border border-white/40 flex items-center justify-center group-hover:bg-uzx-orange group-hover:border-uzx-orange transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
          <div className="text-[10px] mono uppercase tracking-widest opacity-85">
            Testimonial fondator CAMMA{duration ? ` · ${duration}` : ""}
          </div>
          <div className="serif text-base lg:text-lg mt-1 line-clamp-2">{title}</div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(5,15,30,0.92)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl cursor-default"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Închide"
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
              >
                ✕
              </button>
              <div className="aspect-video bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export type GallerySlot = {
  id: string;
  title: string;
  hint: string;
  url?: string;
  alt?: string;
  caption?: string;
};

export function GalleryGrid({ slots }: { slots: GallerySlot[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
      {slots.map((s) => (
        <figure
          key={s.id}
          className="bg-ink-50 border hairline overflow-hidden"
          style={{ borderColor: s.url ? undefined : BRICK + "55" }}
        >
          <div className="relative aspect-[4/3] bg-ink-100">
            {s.url ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.url}
                  alt={s.alt || s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div
                  className="w-12 h-12 mb-3 flex items-center justify-center"
                  style={{
                    background: BRICK + "22",
                    border: `1px dashed ${BRICK}`,
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BRICK_DEEP} strokeWidth="1.4">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                </div>
                <div
                  className="text-[10px] mono uppercase tracking-widest mb-2"
                  style={{ color: BRICK_DEEP }}
                >
                  Slot {s.id}
                </div>
                <div className="serif text-sm text-ink-700 mb-1">{s.title}</div>
                <div className="text-[11px] text-ink-500 leading-snug max-w-[220px]">
                  {s.hint}
                </div>
              </div>
            )}
          </div>
          {(s.caption || !s.url) && (
            <figcaption className="px-4 py-3 border-t hairline">
              <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1">
                {s.id} · {s.title}
              </div>
              <p className="text-[11px] lg:text-xs text-ink-600 leading-relaxed">
                {s.caption || "Adaugă din admin · /admin/studii-de-caz/camma"}
              </p>
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

const BRICK_TYPES: Array<{
  id: string;
  label: string;
  L: number;
  H: number;
  D: number;
  weight: number;
}> = [
  { id: "std", label: "Standard · 250 × 125 × 65 mm", L: 250, H: 65, D: 125, weight: 3.2 },
  { id: "lego", label: "Modular LEGO · 250 × 250 × 100 mm", L: 250, H: 100, D: 250, weight: 8.4 },
  { id: "thin", label: "Subțire · 250 × 125 × 50 mm", L: 250, H: 50, D: 125, weight: 2.4 },
];

function formatNumber(n: number, digits = 0): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function WallBuilderTool() {
  const [length, setLength] = useState(8);
  const [height, setHeight] = useState(3);
  const [brickIdx, setBrickIdx] = useState(0);

  const brick = BRICK_TYPES[brickIdx];

  const calc = useMemo(() => {
    const wallM2 = length * height;
    const wallM3 = wallM2 * (brick.D / 1000);
    const bricksPerM2 = 1 / ((brick.L / 1000) * (brick.H / 1000));
    const bricksTotal = Math.round(wallM2 * bricksPerM2);
    const totalWeight = bricksTotal * brick.weight;

    const energyModularMJ = wallM3 * 631;
    const energyTradMJ = wallM3 * 2356;
    const energySavedMJ = energyTradMJ - energyModularMJ;
    const energySavedKWh = energySavedMJ / 3.6;

    const co2ModularKg = wallM3 * 56.79;
    const co2TradKg = wallM3 * 230.06;
    const co2SavedKg = co2TradKg - co2ModularKg;

    const mortarLitersTrad = wallM2 * 28;
    const mortarLitersModular = 0;
    const mortarSaved = mortarLitersTrad - mortarLitersModular;

    const tradMason_m2_per_day = 8;
    const modularMason_m2_per_day = 18;
    const daysTrad = wallM2 / tradMason_m2_per_day;
    const daysModular = wallM2 / modularMason_m2_per_day;
    const daysSaved = daysTrad - daysModular;

    const carKmEquivalent = co2SavedKg / 0.12;
    const treesYearsEquivalent = co2SavedKg / 22;

    return {
      wallM2,
      wallM3,
      bricksTotal,
      totalWeight,
      energySavedKWh,
      co2SavedKg,
      co2TradKg,
      co2ModularKg,
      mortarSaved,
      daysSaved,
      daysTrad,
      daysModular,
      carKmEquivalent,
      treesYearsEquivalent,
    };
  }, [length, height, brick]);

  const wallVB_W = 600;
  const wallVB_H = 280;

  const visualScale = useMemo(() => {
    const padX = 40;
    const padY = 40;
    const usableW = wallVB_W - padX * 2;
    const usableH = wallVB_H - padY * 2;
    const scale = Math.min(usableW / length, usableH / height);
    return { scale, padX, padY };
  }, [length, height]);

  const bricksGrid = useMemo(() => {
    const bL = brick.L / 1000;
    const bH = brick.H / 1000;
    const cols = Math.ceil(length / bL);
    const rows = Math.ceil(height / bH);
    const items: Array<{ x: number; y: number; w: number; h: number; row: number; col: number }> = [];
    for (let r = 0; r < rows; r++) {
      const offset = r % 2 === 0 ? 0 : bL / 2;
      for (let c = 0; c < cols + 1; c++) {
        const x = c * bL - offset;
        const y = r * bH;
        if (x >= length || y >= height) continue;
        const w = Math.min(bL, length - x);
        const h = Math.min(bH, height - y);
        if (w <= 0 || h <= 0) continue;
        items.push({ x: Math.max(0, x), y, w: x < 0 ? w + x : w, h, row: r, col: c });
      }
    }
    return items;
  }, [length, height, brick]);

  return (
    <div className="border hairline bg-white">
      <div className="px-6 lg:px-8 py-6 border-b hairline" style={{ background: "linear-gradient(180deg, #faf6f1 0%, white 100%)" }}>
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-2" style={{ color: BRICK_DEEP }}>
          Configurator interactiv · estimează un perete real
        </div>
        <h3
          className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cât economisești în CO₂, mortar și zile-om dacă alegi cărămidă modulară?
        </h3>
        <p className="text-sm text-ink-600 mt-3 max-w-2xl leading-relaxed">
          Mută slider-ele pentru un perete pe care vrei să-l ridici. Calculatorul
          îți arată câte cărămizi modulare îți trebuie și cât ai economisi față de
          aceeași suprafață cu cărămidă arsă tradițională, pe baza datelor publicate
          de producători internaționali din segment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r hairline space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Lungime perete
              </label>
              <span className="serif text-2xl text-ink-900 num">
                {length} <span className="text-sm text-ink-500">m</span>
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              step={0.5}
              value={length}
              onChange={(e) => setLength(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Lungime perete în metri"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>1 m</span>
              <span>50 m</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Înălțime perete
              </label>
              <span className="serif text-2xl text-ink-900 num">
                {height} <span className="text-sm text-ink-500">m</span>
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={12}
              step={0.25}
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Înălțime perete în metri"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>2 m</span>
              <span>12 m</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-2">
              Tip cărămidă modulară
            </div>
            <div className="space-y-1.5">
              {BRICK_TYPES.map((b, i) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBrickIdx(i)}
                  className={`w-full text-left px-3 py-2.5 border hairline text-sm transition flex items-center gap-3 ${
                    brickIdx === i
                      ? "border-uzx-orange bg-uzx-orange/5"
                      : "hover:bg-ink-50"
                  }`}
                >
                  <div
                    className="w-6 h-4 shrink-0"
                    style={{
                      background: BRICK,
                      border: `1px solid ${BRICK_DEEP}`,
                      transform: `scaleX(${b.L / 250}) scaleY(${b.H / 100})`,
                      transformOrigin: "left center",
                    }}
                  />
                  <span className="text-ink-700">{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t hairline pt-5">
            <div className="grid grid-cols-2 gap-4">
              <Stat label="Suprafață" value={`${formatNumber(calc.wallM2, 1)} m²`} />
              <Stat label="Volum" value={`${formatNumber(calc.wallM3, 2)} m³`} />
              <Stat label="Cărămizi necesare" value={formatNumber(calc.bricksTotal)} accent />
              <Stat label="Greutate totală" value={`${formatNumber(calc.totalWeight)} kg`} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-8" style={{ background: "#faf6f1" }}>
          <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
            Vizualizare perete · scară automată
          </div>
          <svg
            viewBox={`0 0 ${wallVB_W} ${wallVB_H}`}
            className="w-full h-auto block bg-white border hairline"
          >
            <defs>
              <pattern id="bg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#dbe2ec" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width={wallVB_W} height={wallVB_H} fill="url(#bg-grid)" />

            <g
              transform={`translate(${visualScale.padX}, ${visualScale.padY}) scale(${visualScale.scale}, ${visualScale.scale})`}
            >
              <rect
                x={0}
                y={0}
                width={length}
                height={height}
                fill={MORTAR}
                opacity={0.3}
              />

              {bricksGrid.map((b, i) => (
                <motion.g
                  key={`${b.row}-${b.col}-${brick.id}-${length}-${height}`}
                  initial={{ opacity: 0, y: -0.05 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(i * 0.005, 1.2) }}
                >
                  <rect
                    x={b.x}
                    y={height - b.y - b.h}
                    width={b.w}
                    height={b.h}
                    fill={BRICK}
                    stroke={BRICK_DEEP}
                    strokeWidth={Math.min(0.01, b.h / 30)}
                  />
                </motion.g>
              ))}

              <line x1={0} y1={0} x2={0} y2={height} stroke="#2d3a4f" strokeWidth={Math.max(0.02, 2 / visualScale.scale)} />
              <line x1={0} y1={height} x2={length} y2={height} stroke="#2d3a4f" strokeWidth={Math.max(0.02, 2 / visualScale.scale)} />
            </g>

            <g transform={`translate(${visualScale.padX}, ${visualScale.padY + height * visualScale.scale + 10})`}>
              <line x1={0} y1={0} x2={length * visualScale.scale} y2={0} stroke="#9aa6b8" strokeWidth="0.5" />
              <line x1={0} y1={-3} x2={0} y2={3} stroke="#9aa6b8" strokeWidth="0.5" />
              <line x1={length * visualScale.scale} y1={-3} x2={length * visualScale.scale} y2={3} stroke="#9aa6b8" strokeWidth="0.5" />
              <text x={(length * visualScale.scale) / 2} y={14} textAnchor="middle" fontSize="9" fill="#2d3a4f" fontFamily="ui-monospace, monospace">
                {length} m
              </text>
            </g>
            <g transform={`translate(${visualScale.padX - 10}, ${visualScale.padY})`}>
              <line x1={0} y1={0} x2={0} y2={height * visualScale.scale} stroke="#9aa6b8" strokeWidth="0.5" />
              <line x1={-3} y1={0} x2={3} y2={0} stroke="#9aa6b8" strokeWidth="0.5" />
              <line x1={-3} y1={height * visualScale.scale} x2={3} y2={height * visualScale.scale} stroke="#9aa6b8" strokeWidth="0.5" />
              <text x={-14} y={(height * visualScale.scale) / 2} textAnchor="middle" fontSize="9" fill="#2d3a4f" fontFamily="ui-monospace, monospace" transform={`rotate(-90, -14, ${(height * visualScale.scale) / 2})`}>
                {height} m
              </text>
            </g>
          </svg>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <ImpactCard
              label="CO₂ economisit"
              value={`${formatNumber(calc.co2SavedKg)} kg`}
              detail={`vs cărămidă arsă · ${formatNumber(calc.co2TradKg)} kg → ${formatNumber(calc.co2ModularKg)} kg`}
              tone="green"
            />
            <ImpactCard
              label="Energie încorporată"
              value={`-${formatNumber(calc.energySavedKWh)} kWh`}
              detail="energie de producție · față de varianta arsă în cuptor"
              tone="green"
            />
            <ImpactCard
              label="Mortar economisit"
              value={`${formatNumber(calc.mortarSaved)} L`}
              detail="zidărie uscată · interlock fără rost umed structural"
              tone="orange"
            />
            <ImpactCard
              label="Timp economisit"
              value={`${formatNumber(calc.daysSaved, 1)} zile-om`}
              detail={`${formatNumber(calc.daysTrad, 1)} zile arsă vs ${formatNumber(calc.daysModular, 1)} zile modulară`}
              tone="orange"
            />
          </div>

          <div className="mt-4 p-4 border-l-2 border-uzx-orange bg-white">
            <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
              Echivalențe impact · CO₂ evitat
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="serif text-base text-ink-900">
                  ≈ {formatNumber(calc.carKmEquivalent)} km
                </div>
                <div className="text-[11px] text-ink-500">
                  cu o mașină pe benzină standard
                </div>
              </div>
              <div>
                <div className="serif text-base text-ink-900">
                  ≈ {formatNumber(calc.treesYearsEquivalent, 1)} copaci/an
                </div>
                <div className="text-[11px] text-ink-500">
                  absorbție anuală echivalentă
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-4 border-t hairline bg-white">
        <p className="text-[11px] text-ink-500 leading-relaxed italic">
          Estimare orientativă bazată pe date publicate de producători
          internaționali de cărămidă modulară hyper-presată: 631 vs 2.356 MJ/m³
          energie încorporată, 56,79 vs 230,06 kg/m³ CO₂. Timpul de execuție
          presupune zidari calificați. Pentru cifrele exacte ale unui proiect
          concret, contactează-ne.
        </p>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div
        className={`serif text-lg num leading-tight ${
          accent ? "text-uzx-orange" : "text-ink-900"
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function ImpactCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "green" | "orange";
}) {
  const color = tone === "green" ? "#16a34a" : BRICK_DEEP;
  return (
    <div className="bg-white border hairline p-4">
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div className="serif text-xl num leading-tight" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] text-ink-500 mt-1.5 leading-snug">{detail}</div>
    </div>
  );
}
