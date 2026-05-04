"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const FORGE = "#c83a17";
const IRON = "#5b6273";

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
            Testimonial Jan Paul Elhor{duration ? ` · ${duration}` : ""}
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

const FUNDING_OPTIONS: Array<{
  id: string;
  label: string;
  intensityPct: number;
}> = [
  { id: "sun", label: "Start-Up Nation · ~70% nerambursabil", intensityPct: 70 },
  { id: "fa", label: "Femeia Antreprenor · 95% nerambursabil", intensityPct: 95 },
  { id: "micro", label: "Microîntreprinderi · 50% nerambursabil", intensityPct: 50 },
  { id: "ip", label: "Industria Prelucrătoare · 50% nerambursabil", intensityPct: 50 },
  { id: "none", label: "Fără finanțare · contribuție 100%", intensityPct: 0 },
];

function formatRON(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(n / 1_000_000)} M lei`;
  }
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} lei`;
}

function formatEUR(n: number): string {
  if (Math.abs(n) >= 1_000_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(n / 1_000_000)} M €`;
  }
  if (Math.abs(n) >= 10_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} €`;
  }
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} €`;
}

function formatNumber(n: number, digits = 0): string {
  return new Intl.NumberFormat("ro-RO", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
}

export function WorkshopPaybackCalculator() {
  const [investmentEUR, setInvestmentEUR] = useState<number>(68_000);
  const [salaryRON, setSalaryRON] = useState<number>(5500);
  const [teamSize, setTeamSize] = useState<number>(4);
  const [multiplier, setMultiplier] = useState<number>(5);
  const [fundingId, setFundingId] = useState<string>("sun");

  const funding = FUNDING_OPTIONS.find((f) => f.id === fundingId) || FUNDING_OPTIONS[0];

  const calc = useMemo(() => {
    const FX = 5.0;
    const investmentRON = investmentEUR * FX;
    const grantRON = (investmentRON * funding.intensityPct) / 100;
    const ownContribRON = investmentRON - grantRON;

    const peopleAvoided = Math.max(teamSize - 1, 0);
    const monthlySavingRON = peopleAvoided * salaryRON;
    const annualSavingRON = monthlySavingRON * 12;

    const paybackMonths = monthlySavingRON > 0 ? ownContribRON / monthlySavingRON : Infinity;

    const fiveYearSavingRON = annualSavingRON * 5;
    const roi5yr = ownContribRON > 0 ? ((fiveYearSavingRON - ownContribRON) / ownContribRON) * 100 : 0;

    const ordersBefore = 22;
    const ordersAfter = ordersBefore * multiplier;
    const ordersExtra = ordersAfter - ordersBefore;

    return {
      investmentRON,
      grantRON,
      ownContribRON,
      peopleAvoided,
      monthlySavingRON,
      annualSavingRON,
      paybackMonths,
      fiveYearSavingRON,
      roi5yr,
      ordersBefore,
      ordersAfter,
      ordersExtra,
    };
  }, [investmentEUR, salaryRON, teamSize, multiplier, funding]);

  const contactHref = useMemo(() => {
    const ctx = `Calculator atelier · investiție ${formatEUR(investmentEUR)} · ${funding.label} · payback ${formatNumber(calc.paybackMonths, 1)} luni · economie anuală ${formatRON(calc.annualSavingRON)}`;
    const subject = "Atelier confecții metalice · dimensionare + finanțare";
    return `/contact?subject=${encodeURIComponent(subject)}&context=${encodeURIComponent(ctx)}`;
  }, [investmentEUR, funding, calc.paybackMonths, calc.annualSavingRON]);

  return (
    <div className="border hairline bg-white">
      <div
        className="px-6 lg:px-8 py-6 border-b hairline"
        style={{ background: "linear-gradient(180deg, #faf6f1 0%, white 100%)" }}
      >
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-2" style={{ color: FORGE }}>
          Configurator interactiv · atelier confecții metalice cu finanțare nerambursabilă
        </div>
        <h3
          className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          În cât timp se amortizează un atelier semi-automat la profilul tău de afacere?
        </h3>
        <p className="text-sm text-ink-600 mt-3 max-w-2xl leading-relaxed">
          Mută slider-ele pentru a estima contribuția proprie reală după
          finanțarea nerambursabilă, salariile evitate cu utilaje moderne și
          payback-ul în luni. Cifrele se bazează pe modelul real al atelierului
          Fier-Forjat Limanu.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r hairline space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Valoare investiție echipamente
              </label>
              <span className="serif text-xl text-ink-900 num">
                {formatEUR(investmentEUR)}
              </span>
            </div>
            <input
              type="range"
              min={30_000}
              max={250_000}
              step={1000}
              value={investmentEUR}
              onChange={(e) => setInvestmentEUR(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Valoare investiție echipamente"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>30K €</span>
              <span>250K €</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-2">
              Tip finanțare
            </div>
            <select
              value={fundingId}
              onChange={(e) => setFundingId(e.target.value)}
              className="w-full px-3 py-2.5 border hairline text-sm text-ink-900 bg-white"
            >
              {FUNDING_OPTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="text-[10px] mono text-ink-400 mt-1.5">
              Contribuție proprie: {formatEUR(calc.ownContribRON / 5)}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Salariu mediu meșter / lună
              </label>
              <span className="serif text-xl text-ink-900 num">
                {formatRON(salaryRON)}
              </span>
            </div>
            <input
              type="range"
              min={3000}
              max={12000}
              step={100}
              value={salaryRON}
              onChange={(e) => setSalaryRON(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Salariu mediu meșter pe lună"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>3.000 lei</span>
              <span>12.000 lei</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Echipa actuală · oameni
              </label>
              <span className="serif text-xl text-ink-900 num">
                {teamSize}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              step={1}
              value={teamSize}
              onChange={(e) => setTeamSize(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Mărime echipă manual"
            />
            <div className="text-[10px] mono text-ink-400 mt-1">
              Cu utilaje, 1 om operează 3-4 mașini · economisești {calc.peopleAvoided} salarii
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Multiplier viteză
              </label>
              <span className="serif text-xl text-ink-900 num">
                ×{multiplier}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={8}
              step={1}
              value={multiplier}
              onChange={(e) => setMultiplier(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Multiplier viteză producție"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>×2 modest</span>
              <span>×8 max</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-8 space-y-5" style={{ background: "#faf6f1" }}>
          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Contribuție proprie · după finanțare nerambursabilă
            </div>
            <div className="grid grid-cols-3 gap-3">
              <ResultCard
                label="Investiție brută"
                value={formatEUR(investmentEUR)}
                tone="neutral"
              />
              <ResultCard
                label="Grant nerambursabil"
                value={formatEUR(calc.grantRON / 5)}
                tone="ok"
                detail={`${funding.intensityPct}% intensitate`}
              />
              <ResultCard
                label="Contribuție proprie"
                value={formatEUR(calc.ownContribRON / 5)}
                tone="brand"
                detail="ce plătești efectiv"
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Economie operațională · anual
            </div>
            <div className="grid grid-cols-3 gap-3">
              <ResultCard
                label="Salarii lunare evitate"
                value={formatRON(calc.monthlySavingRON)}
                tone="ok"
                detail={`${calc.peopleAvoided} salarii ${formatRON(salaryRON)}/lună`}
              />
              <ResultCard
                label="Economie anuală"
                value={formatRON(calc.annualSavingRON)}
                tone="ok"
              />
              <ResultCard
                label="Economie 5 ani"
                value={formatRON(calc.fiveYearSavingRON)}
                tone="ok"
              />
            </div>
          </div>

          <div className="bg-white border-l-2 p-5" style={{ borderColor: "#f5851f" }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  Payback contribuție proprie
                </div>
                <div className="serif text-3xl text-ink-900 num leading-none" style={{ letterSpacing: "-0.02em" }}>
                  {isFinite(calc.paybackMonths) ? `${formatNumber(calc.paybackMonths, 1)}` : "—"}
                </div>
                <div className="text-xs text-ink-500 mt-1.5">
                  luni · doar din salarii evitate
                </div>
              </div>
              <div>
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  ROI 5 ani
                </div>
                <div className="serif text-3xl text-ink-900 num leading-none" style={{ letterSpacing: "-0.02em" }}>
                  {formatNumber(calc.roi5yr, 0)}%
                </div>
                <div className="text-xs text-ink-500 mt-1.5">
                  randament la contribuția ta
                </div>
              </div>
              <div>
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  Capacitate suplimentară
                </div>
                <div className="serif text-3xl text-ink-900 num leading-none" style={{ letterSpacing: "-0.02em" }}>
                  +{calc.ordersExtra}
                </div>
                <div className="text-xs text-ink-500 mt-1.5">
                  comenzi/lună disponibile · venit bonus
                </div>
              </div>
            </div>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 text-xs text-uzx-orange hover:underline mt-5 font-medium"
            >
              Solicit dimensionare atelier + ghidaj finanțare
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-4 border-t hairline bg-white">
        <p className="text-[11px] text-ink-500 leading-relaxed italic">
          Estimări orientative la curs 1 € = 5 RON. Multiplier-ul de viteză și
          numărul de oameni înlocuiți reflectă pattern-ul observat la atelierul
          Fier-Forjat Limanu (×5–6 viteză, 1 om / 3–4 mașini). Cifrele exacte
          pentru proiectul tău se confirmă printr-o consultanță tehnică gratuită
          cu echipa Uzinex. Asistența pe finanțare e inclusă fără cost pentru
          clienții care comandă echipamentele de la noi.
        </p>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  tone,
  detail,
}: {
  label: string;
  value: string;
  tone: "ok" | "brand" | "neutral" | "alert";
  detail?: string;
}) {
  const color =
    tone === "ok"
      ? "#16a34a"
      : tone === "brand"
        ? "#f5851f"
        : tone === "alert"
          ? "#dc2626"
          : "#1c2940";
  return (
    <div className="bg-white border hairline p-3.5">
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div className="serif text-lg num leading-tight" style={{ color }}>
        {value}
      </div>
      {detail && <div className="text-[10px] text-ink-500 mt-1 leading-snug">{detail}</div>}
    </div>
  );
}
