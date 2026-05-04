"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

export function VerticalVideoSlot({
  videoSrc,
  posterSrc,
  caption,
}: {
  videoSrc?: string;
  posterSrc?: string;
  caption?: string;
}) {
  if (videoSrc) {
    const isYouTube = /youtube\.com|youtu\.be/.test(videoSrc);
    const ytShortMatch = videoSrc.match(/(?:shorts\/|v=|youtu\.be\/)([\w-]{11})/);
    const ytId = ytShortMatch?.[1];
    return (
      <figure className="bg-ink-900 border hairline overflow-hidden">
        <div className="relative mx-auto" style={{ aspectRatio: "9 / 16", maxWidth: 360 }}>
          {isYouTube && ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
              title={caption || "Video vertical Future Energy Group"}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <video
              src={videoSrc}
              poster={posterSrc}
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        {caption && (
          <figcaption className="text-[10px] mono uppercase tracking-widest text-white/70 text-center py-3 px-4">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure
      className="bg-ink-50 border-2 border-dashed border-ink-300 mx-auto flex flex-col items-center justify-center text-center p-8"
      style={{ aspectRatio: "9 / 16", maxWidth: 360 }}
      data-uzx-slot="vertical-video"
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9aa6b8"
        strokeWidth="1.2"
        className="mb-4"
      >
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <circle cx="12" cy="17" r="1" fill="#9aa6b8" />
      </svg>
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-2">
        Slot video vertical · 9:16
      </div>
      <div className="serif text-base text-ink-700 mb-2">
        Adaugă din admin
      </div>
      <p className="text-xs text-ink-500 leading-relaxed max-w-[220px]">
        Configurează URL-ul în <code className="mono text-[11px]">verticalVideoSrc</code> din pagina FEG ca să apară aici.
      </p>
    </figure>
  );
}

export function VideoPlayer({
  youtubeId,
  thumbnail,
  title,
}: {
  youtubeId: string;
  thumbnail: string;
  title: string;
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
            Walkthrough video · 1:42
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

export function PaybackCalculator() {
  const [welderSalary, setWelderSalary] = useState(2500);
  const [equipmentCost, setEquipmentCost] = useState(11000);
  const [outsourcedMonthly, setOutsourcedMonthly] = useState(800);
  const [yearsHorizon, setYearsHorizon] = useState(5);

  const { paybackMonths, savedAtHorizon, totalAvoided } = useMemo(() => {
    const monthlySaved = welderSalary + outsourcedMonthly;
    const months = monthlySaved > 0 ? equipmentCost / monthlySaved : 0;
    const totalSaved = monthlySaved * yearsHorizon * 12 - equipmentCost;
    const avoided = welderSalary * yearsHorizon * 12;
    return {
      paybackMonths: months,
      savedAtHorizon: totalSaved,
      totalAvoided: avoided,
    };
  }, [welderSalary, equipmentCost, outsourcedMonthly, yearsHorizon]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-white border hairline">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
            Replică decizia FEG · estimare payback
          </div>
          <h3
            className="serif text-xl lg:text-2xl text-ink-900 mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Cât te-ar costa să nu cumperi laser-ul?
          </h3>

          <div className="space-y-5">
            <Field
              label="Salariu sudor (brut, taxe incluse) / lună"
              suffix="EUR"
              value={welderSalary}
              min={1500}
              max={5000}
              step={100}
              onChange={setWelderSalary}
            />
            <Field
              label="Cost echipament laser 3-in-1"
              suffix="EUR"
              value={equipmentCost}
              min={5000}
              max={50000}
              step={500}
              onChange={setEquipmentCost}
            />
            <Field
              label="Cost lunar lucrări externalizate (sudură + curățare + debitare)"
              suffix="EUR"
              value={outsourcedMonthly}
              min={0}
              max={5000}
              step={50}
              onChange={setOutsourcedMonthly}
            />
            <Field
              label="Orizont de calcul"
              suffix="ani"
              value={yearsHorizon}
              min={1}
              max={10}
              step={1}
              onChange={setYearsHorizon}
            />
          </div>
        </div>

        <div className="lg:col-span-2 bg-ink-50 p-6 lg:p-10 flex flex-col justify-between">
          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-3">
              Rezultat estimat
            </div>
            <div className="space-y-6">
              <Result
                label="Economii lunare totale"
                value={`${fmt(welderSalary + outsourcedMonthly)} EUR`}
                hint="salariu evitat + externalizare evitată"
              />
              <Result
                label="Payback echipament"
                value={paybackMonths > 0 ? `${paybackMonths.toFixed(1)} luni` : "—"}
                emphasized
              />
              <Result
                label={`Net economisit la ${yearsHorizon} ani`}
                value={`${fmt(savedAtHorizon)} EUR`}
                hint="după recuperarea investiției"
              />
              <Result
                label={`Cost angajare evitat la ${yearsHorizon} ani`}
                value={`${fmt(totalAvoided)} EUR`}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t hairline">
            <a
              href="/contact?subject=Echipament%20laser%203-in-1%20%E2%80%94%20probare%20%C3%AEn%20custodie"
              className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-5 py-3 inline-flex items-center justify-center gap-3 group transition w-full"
            >
              Vreau ofertă pentru cazul meu
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            <p className="text-[10px] mono text-ink-400 mt-3 leading-relaxed">
              Calcul orientativ doar pe economia salarială + externalizare. Nu include
              veniturile potențiale din servicii noi pe care le poți oferi clienților
              cu același echipament.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  suffix,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  suffix: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-xs lg:text-sm text-ink-700">{label}</label>
        <div className="num text-sm lg:text-base text-ink-900 serif">
          {new Intl.NumberFormat("ro-RO").format(value)}{" "}
          <span className="text-[10px] mono text-ink-400 uppercase tracking-wider ml-1">
            {suffix}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-uzx-orange"
      />
    </div>
  );
}

function Result({
  label,
  value,
  hint,
  emphasized,
}: {
  label: string;
  value: string;
  hint?: string;
  emphasized?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] mono uppercase tracking-wider text-ink-400 mb-1">
        {label}
      </div>
      <div
        className={`serif num leading-tight ${
          emphasized ? "text-3xl text-uzx-orange" : "text-xl text-ink-900"
        }`}
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      {hint && (
        <div className="text-[10px] mono text-ink-400 mt-1">{hint}</div>
      )}
    </div>
  );
}
