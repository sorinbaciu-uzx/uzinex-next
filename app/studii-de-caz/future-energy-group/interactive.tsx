"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

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
  const [downtimeHours, setDowntimeHours] = useState(8);
  const [hourlyValue, setHourlyValue] = useState(450);
  const [contractValue, setContractValue] = useState(75000);
  const [equipmentCost, setEquipmentCost] = useState(28000);

  const { savedPerIncident, paybackIncidents, paybackMonths } = useMemo(() => {
    const saved = downtimeHours * hourlyValue;
    const incidents = equipmentCost > 0 && saved > 0 ? equipmentCost / saved : 0;
    const months = incidents > 0 ? incidents / 1.5 : 0;
    return {
      savedPerIncident: saved,
      paybackIncidents: incidents,
      paybackMonths: months,
    };
  }, [downtimeHours, hourlyValue, equipmentCost]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n);

  return (
    <div className="bg-white border hairline">
      <div className="grid grid-cols-1 lg:grid-cols-5">
        <div className="lg:col-span-3 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r hairline">
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
            Calculator payback · estimare
          </div>
          <h3
            className="serif text-xl lg:text-2xl text-ink-900 mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            Cât te-ar costa un downtime similar?
          </h3>

          <div className="space-y-5">
            <Field
              label="Ore de downtime fără echipament backup"
              suffix="ore"
              value={downtimeHours}
              min={1}
              max={120}
              step={1}
              onChange={setDowntimeHours}
            />
            <Field
              label="Valoare medie generată / oră producție"
              suffix="RON"
              value={hourlyValue}
              min={50}
              max={5000}
              step={50}
              onChange={setHourlyValue}
            />
            <Field
              label="Valoare contract sub risc de penalitate"
              suffix="RON"
              value={contractValue}
              min={5000}
              max={1000000}
              step={5000}
              onChange={setContractValue}
            />
            <Field
              label="Investiție echipament nou"
              suffix="RON"
              value={equipmentCost}
              min={5000}
              max={500000}
              step={1000}
              onChange={setEquipmentCost}
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
                label="Valoare salvată / incident"
                value={`${fmt(savedPerIncident)} RON`}
              />
              <Result
                label="Acoperire risc contract"
                value={
                  contractValue > 0 && equipmentCost > 0
                    ? `${Math.round((contractValue / equipmentCost) * 100)}%`
                    : "—"
                }
                hint="raport contract / investiție"
              />
              <Result
                label="Payback (incidente echivalente)"
                value={paybackIncidents > 0 ? `${fmt(paybackIncidents)} incidente` : "—"}
              />
              <Result
                label="Payback estimat"
                value={paybackMonths > 0 ? `${paybackMonths.toFixed(1)} luni` : "—"}
                hint="la 1.5 incidente / lună medie sectoriala"
                emphasized
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t hairline">
            <a
              href="/contact?subject=Configurare%20echipament%20de%20sudur%C4%83%20industrial%C4%83"
              className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-5 py-3 inline-flex items-center justify-center gap-3 group transition w-full"
            >
              Vreau ofertă pentru cazul meu
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>
            <p className="text-[10px] mono text-ink-400 mt-3 leading-relaxed">
              Estimare orientativă pe baza valorilor introduse. Pentru calcul exact
              cere un studiu personalizat de la un inginer Uzinex.
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
