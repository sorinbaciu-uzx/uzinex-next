"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

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
              "linear-gradient(180deg, rgba(8,37,69,0) 30%, rgba(8,37,69,0.7) 100%)",
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
            Testimonial Octav Damasken{duration ? ` · ${duration}` : ""}
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

function formatRON(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(n / 1_000_000)} M lei`;
  }
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} lei`;
}

function formatHours(n: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n);
}

function formatNumber(n: number, digits = 0): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function DowntimeCostCalculator() {
  const [hoursPerDay, setHoursPerDay] = useState<number>(16);
  const [costPerHourRON, setCostPerHourRON] = useState<number>(800);
  const [yearsOfOperation, setYearsOfOperation] = useState<number>(9);
  const [cheapDowntimePct, setCheapDowntimePct] = useState<number>(5);
  const [reliableDowntimePct, setReliableDowntimePct] = useState<number>(1);

  const calc = useMemo(() => {
    const workdaysPerYear = 250;
    const productiveHoursPerYear = hoursPerDay * workdaysPerYear;
    const totalProductiveHours = productiveHoursPerYear * yearsOfOperation;

    const cheapDowntimeHours = totalProductiveHours * (cheapDowntimePct / 100);
    const reliableDowntimeHours = totalProductiveHours * (reliableDowntimePct / 100);
    const aironeDowntimeHours = 0;

    const cheapLossRON = cheapDowntimeHours * costPerHourRON;
    const reliableLossRON = reliableDowntimeHours * costPerHourRON;
    const aironeLossRON = 0;

    const savingsVsCheap = cheapLossRON - reliableLossRON;
    const savingsVsCheapDays = (cheapDowntimeHours - reliableDowntimeHours) / hoursPerDay;

    const max = Math.max(cheapLossRON, reliableLossRON, 1);

    return {
      totalProductiveHours,
      cheapDowntimeHours,
      reliableDowntimeHours,
      aironeDowntimeHours,
      cheapLossRON,
      reliableLossRON,
      aironeLossRON,
      savingsVsCheap,
      savingsVsCheapDays,
      max,
      cheapBarPct: (cheapLossRON / max) * 100,
      reliableBarPct: (reliableLossRON / max) * 100,
    };
  }, [hoursPerDay, costPerHourRON, yearsOfOperation, cheapDowntimePct, reliableDowntimePct]);

  const contactHref = useMemo(() => {
    const ctx = `Calculator downtime · ${yearsOfOperation} ani · ${hoursPerDay}h/zi · economie estimată ${formatRON(calc.savingsVsCheap)}`;
    const subject = "Echipamente industriale · uptime garantat";
    return `/contact?subject=${encodeURIComponent(subject)}&context=${encodeURIComponent(ctx)}`;
  }, [yearsOfOperation, hoursPerDay, calc.savingsVsCheap]);

  return (
    <div className="border hairline bg-white">
      <div
        className="px-6 lg:px-8 py-6 border-b hairline"
        style={{ background: "linear-gradient(180deg, #f4f7fb 0%, white 100%)" }}
      >
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-2 text-uzx-orange">
          Calculator interactiv · costul real al unui utilaj de fabrică
        </div>
        <h3
          className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cât te costă un utilaj „ieftin care se strică des" pe durata reală de viață?
        </h3>
        <p className="text-sm text-ink-600 mt-3 max-w-2xl leading-relaxed">
          Introdu profilul tău de operare și compari pierderea financiară
          cumulată dintre un utilaj cu 5% downtime tipic și un utilaj
          configurat să țină ani de zile cu sub 1% downtime, plus referința
          de la AIRONE Inox unde laserul fiber 6 kW are 9 ani de funcționare
          cu zero intervenții service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r hairline space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Ore productive / zi
              </label>
              <span className="serif text-xl text-ink-900 num">
                {hoursPerDay} h
              </span>
            </div>
            <input
              type="range"
              min={4}
              max={24}
              step={1}
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Ore productive pe zi"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>4 h · 1 schimb</span>
              <span>24 h · non-stop</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Cost pierdut / oră oprire
              </label>
              <span className="serif text-xl text-ink-900 num">
                {formatRON(costPerHourRON)}
              </span>
            </div>
            <input
              type="range"
              min={100}
              max={5000}
              step={50}
              value={costPerHourRON}
              onChange={(e) => setCostPerHourRON(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Cost pierdut pe oră de oprire"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>100 lei</span>
              <span>5.000 lei</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Ani de operare
              </label>
              <span className="serif text-xl text-ink-900 num">
                {yearsOfOperation}
              </span>
            </div>
            <input
              type="range"
              min={3}
              max={15}
              step={1}
              value={yearsOfOperation}
              onChange={(e) => setYearsOfOperation(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Ani de operare planificați"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>3 ani</span>
              <span>15 ani</span>
            </div>
          </div>

          <div className="border-t hairline pt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                  Downtime utilaj „ieftin"
                </label>
                <span className="serif text-base text-ink-900 num">
                  {cheapDowntimePct} %
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={cheapDowntimePct}
                onChange={(e) => setCheapDowntimePct(parseFloat(e.target.value))}
                className="w-full accent-red-500"
                aria-label="Downtime utilaj ieftin procent"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                  Downtime utilaj Uzinex
                </label>
                <span className="serif text-base text-ink-900 num">
                  {reliableDowntimePct} %
                </span>
              </div>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.1}
                value={reliableDowntimePct}
                onChange={(e) => setReliableDowntimePct(parseFloat(e.target.value))}
                className="w-full accent-green-500"
                aria-label="Downtime utilaj Uzinex procent"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-8 space-y-5" style={{ background: "#f4f7fb" }}>
          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Ore productive pierdute · pe durata operării
            </div>
            <div className="grid grid-cols-3 gap-3">
              <ResultCard
                label="Utilaj „ieftin”"
                value={`${formatHours(calc.cheapDowntimeHours)} h`}
                detail={`${cheapDowntimePct}% downtime tipic`}
                tone="alert"
              />
              <ResultCard
                label="Utilaj Uzinex"
                value={`${formatHours(calc.reliableDowntimeHours)} h`}
                detail={`${reliableDowntimePct}% downtime configurat`}
                tone="ok"
              />
              <ResultCard
                label="AIRONE flagship"
                value="0 h"
                detail="record · 9 ani 0 intervenții"
                tone="brand"
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Pierdere financiară cumulată
            </div>
            <div className="space-y-3">
              <ExposureBar
                label="Utilaj „ieftin”"
                value={formatRON(calc.cheapLossRON)}
                pct={calc.cheapBarPct}
                tone="alert"
              />
              <ExposureBar
                label="Utilaj Uzinex"
                value={formatRON(calc.reliableLossRON)}
                pct={calc.reliableBarPct}
                tone="ok"
              />
              <ExposureBar
                label="AIRONE flagship"
                value="0 lei"
                pct={0.5}
                tone="brand"
              />
            </div>
          </div>

          <div className="bg-white border-l-2 p-5" style={{ borderColor: "#f5851f" }}>
            <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
              Diferență netă · economie alegând Uzinex în loc de „ieftin"
            </div>
            <div
              className="serif text-3xl lg:text-4xl text-ink-900 num leading-none mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              {formatRON(calc.savingsVsCheap)}
            </div>
            <p className="text-sm text-ink-600 leading-relaxed">
              Economie cumulată pe {yearsOfOperation} ani de operare doar din
              {" "}
              {formatNumber(calc.savingsVsCheapDays)} zile de producție pe care
              nu le pierzi. Costul utilajului se amortizează implicit prin
              uptime. Pentru AIRONE, recordul de 9 ani fără chemări service ar
              fi pus la zero pierderea financiară din downtime.
            </p>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 text-xs text-uzx-orange hover:underline mt-4 font-medium"
            >
              Solicit configurare echipament cu uptime garantat
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-4 border-t hairline bg-white">
        <p className="text-[11px] text-ink-500 leading-relaxed italic">
          Estimări orientative la 250 zile lucrătoare/an. Pierderea financiară
          se compune din capacitate ne-vândută, salariu pe ore neproductive
          și costul redirecționării comenzilor către alte schimburi.
          Procentul de downtime variază pe categorie de utilaj și pe profilul
          mentenanței. Recordul AIRONE Inox este excepția demonstrabilă pe
          care țintim la fiecare livrare nouă, nu o garanție universală.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  tone: "alert" | "ok" | "brand";
}) {
  const color =
    tone === "alert" ? "#dc2626" : tone === "ok" ? "#16a34a" : "#f5851f";
  return (
    <div className="bg-white border hairline p-4">
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div className="serif text-xl lg:text-2xl num leading-tight" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] text-ink-500 mt-1.5 leading-snug">{detail}</div>
    </div>
  );
}

function ExposureBar({
  label,
  value,
  pct,
  tone,
}: {
  label: string;
  value: string;
  pct: number;
  tone: "alert" | "ok" | "brand";
}) {
  const color =
    tone === "alert" ? "#dc2626" : tone === "ok" ? "#16a34a" : "#f5851f";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs text-ink-700">{label}</div>
        <div className="serif text-base text-ink-900 num font-medium">{value}</div>
      </div>
      <div className="w-full h-4 bg-white border hairline overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${Math.max(pct, 1)}%`, background: color }}
        />
      </div>
    </div>
  );
}
