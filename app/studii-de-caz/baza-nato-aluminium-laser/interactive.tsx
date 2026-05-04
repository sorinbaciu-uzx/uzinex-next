"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const REGIONS: Array<{
  id: string;
  label: string;
  blockedRate: number;
  note: string;
}> = [
  { id: "buc", label: "București · Ilfov", blockedRate: 0.12, note: "câmpie continentală · vânt moderat" },
  { id: "ct", label: "Constanța · Tulcea · litoral", blockedRate: 0.32, note: "vânt frecvent peste 5 m/s la mare" },
  { id: "is", label: "Iași · Moldova", blockedRate: 0.22, note: "variabilitate sezonieră ridicată" },
  { id: "cj", label: "Cluj · Transilvania N-V", blockedRate: 0.18, note: "influențe montane moderate" },
  { id: "tm", label: "Timișoara · Banat", blockedRate: 0.18, note: "câmpie de vest · vânt moderat" },
  { id: "bv", label: "Brașov · Sibiu · Carpați", blockedRate: 0.28, note: "vânt și precipitații montane" },
  { id: "bz", label: "Buzău · Brăila · Bărăgan", blockedRate: 0.28, note: "câmp deschis · vânt frecvent" },
  { id: "default", label: "Altă zonă din România", blockedRate: 0.20, note: "media națională orientativă" },
];

type PenaltyType = "percent" | "ron";

function formatRON(n: number): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1_000_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 2 }).format(n / 1_000_000)} M lei`;
  }
  if (Math.abs(n) >= 10_000) {
    return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} lei`;
  }
  return `${new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 }).format(n)} lei`;
}

function formatDays(n: number): string {
  return new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 1 }).format(n);
}

export function PenaltyRiskCalculator() {
  const [contractValue, setContractValue] = useState<number>(2_000_000);
  const [penaltyType, setPenaltyType] = useState<PenaltyType>("percent");
  const [penaltyPercent, setPenaltyPercent] = useState<number>(0.5);
  const [penaltyRon, setPenaltyRon] = useState<number>(8_000);
  const [projectDays, setProjectDays] = useState<number>(180);
  const [regionId, setRegionId] = useState<string>("ct");
  const [withSubscription, setWithSubscription] = useState<boolean>(true);

  const region = REGIONS.find((r) => r.id === regionId) || REGIONS[0];

  const calc = useMemo(() => {
    const dailyPenalty =
      penaltyType === "percent"
        ? contractValue * (penaltyPercent / 100)
        : penaltyRon;

    // TIG/MIG: pierde toate zilele blocate de vreme
    const daysLostTigMig = projectDays * region.blockedRate;

    // Laser: imun la vreme; pierde doar zile pentru defecțiuni
    // - cu abonament 24h + redundanță 60%: ~0,5 zile pe șantier mediu
    // - fără abonament: ~2 zile
    const daysLostLaserBreakdown = withSubscription ? 0.5 : 2;
    const daysLostLaser = daysLostLaserBreakdown;

    const daysSaved = daysLostTigMig - daysLostLaser;

    const penaltyExposureTigMig = daysLostTigMig * dailyPenalty;
    const penaltyExposureLaser = daysLostLaser * dailyPenalty;
    const savings = penaltyExposureTigMig - penaltyExposureLaser;

    // Pentru bar visualization
    const maxExposure = Math.max(penaltyExposureTigMig, penaltyExposureLaser, 1);

    return {
      dailyPenalty,
      daysLostTigMig,
      daysLostLaser,
      daysSaved,
      penaltyExposureTigMig,
      penaltyExposureLaser,
      savings,
      maxExposure,
      tigBarPct: (penaltyExposureTigMig / maxExposure) * 100,
      laserBarPct: (penaltyExposureLaser / maxExposure) * 100,
    };
  }, [contractValue, penaltyType, penaltyPercent, penaltyRon, projectDays, region, withSubscription]);

  const contactHref = useMemo(() => {
    const ctx = `Calculator penalități · contract ${formatRON(contractValue)} · ${region.label} · ${projectDays} zile · economie ${formatRON(calc.savings)}`;
    const subject = "Configurare flotă laser · termen ferm cu penalități";
    return `/contact?subject=${encodeURIComponent(subject)}&context=${encodeURIComponent(ctx)}`;
  }, [contractValue, region, projectDays, calc.savings]);

  return (
    <div className="border hairline bg-white">
      <div className="px-6 lg:px-8 py-6 border-b hairline" style={{ background: "linear-gradient(180deg, #f4f7fb 0%, white 100%)" }}>
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-2 text-uzx-orange">
          Calculator interactiv · expunere la penalități contractuale
        </div>
        <h3
          className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cât te costă vremea pe un contract cu termen ferm dacă sudezi cu TIG sau MIG?
        </h3>
        <p className="text-sm text-ink-600 mt-3 max-w-2xl leading-relaxed">
          Introdu valoarea contractului, penalitatea zilnică și regiunea
          șantierului. Calculatorul estimează câte zile productive ai pierde din
          vânt și ploaie cu sudură conventională, expunerea financiară totală
          și diferența față de o flotă de aparate laser cu abonament de
          înlocuire în 24 de ore.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r hairline space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Valoare contract
              </label>
              <span className="serif text-xl text-ink-900 num">
                {formatRON(contractValue)}
              </span>
            </div>
            <input
              type="range"
              min={100_000}
              max={20_000_000}
              step={50_000}
              value={contractValue}
              onChange={(e) => setContractValue(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Valoarea contractului în RON"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>100K lei</span>
              <span>20M lei</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-2">
              Penalitate zilnică · tip
            </div>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setPenaltyType("percent")}
                className={`px-3 py-2 border hairline text-xs transition ${
                  penaltyType === "percent"
                    ? "border-uzx-orange bg-uzx-orange/5 text-ink-900"
                    : "hover:bg-ink-50 text-ink-600"
                }`}
              >
                % din contract
              </button>
              <button
                type="button"
                onClick={() => setPenaltyType("ron")}
                className={`px-3 py-2 border hairline text-xs transition ${
                  penaltyType === "ron"
                    ? "border-uzx-orange bg-uzx-orange/5 text-ink-900"
                    : "hover:bg-ink-50 text-ink-600"
                }`}
              >
                Sumă fixă RON / zi
              </button>
            </div>
            {penaltyType === "percent" ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] mono uppercase tracking-widest text-ink-400">
                    Procent zilnic
                  </label>
                  <span className="serif text-lg text-ink-900 num">
                    {penaltyPercent.toFixed(2)} %
                  </span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={3}
                  step={0.05}
                  value={penaltyPercent}
                  onChange={(e) => setPenaltyPercent(parseFloat(e.target.value))}
                  className="w-full accent-uzx-orange"
                  aria-label="Penalitate zilnică procent"
                />
                <div className="text-[10px] mono text-ink-400 mt-1">
                  ≈ {formatRON(calc.dailyPenalty)} / zi
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] mono uppercase tracking-widest text-ink-400">
                    Sumă fixă
                  </label>
                  <span className="serif text-lg text-ink-900 num">
                    {formatRON(penaltyRon)}
                  </span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={50_000}
                  step={250}
                  value={penaltyRon}
                  onChange={(e) => setPenaltyRon(parseFloat(e.target.value))}
                  className="w-full accent-uzx-orange"
                  aria-label="Penalitate zilnică RON"
                />
                <div className="text-[10px] mono text-ink-400 mt-1">
                  500 lei → 50.000 lei / zi
                </div>
              </>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] mono uppercase tracking-widest text-ink-500">
                Durată șantier
              </label>
              <span className="serif text-xl text-ink-900 num">
                {projectDays} <span className="text-sm text-ink-500">zile</span>
              </span>
            </div>
            <input
              type="range"
              min={30}
              max={720}
              step={10}
              value={projectDays}
              onChange={(e) => setProjectDays(parseFloat(e.target.value))}
              className="w-full accent-uzx-orange"
              aria-label="Durata șantierului în zile"
            />
            <div className="flex justify-between text-[10px] mono text-ink-400 mt-1">
              <span>30 zile</span>
              <span>2 ani</span>
            </div>
          </div>

          <div>
            <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-2">
              Regiune șantier
            </div>
            <select
              value={regionId}
              onChange={(e) => setRegionId(e.target.value)}
              className="w-full px-3 py-2.5 border hairline text-sm text-ink-900 bg-white"
            >
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label} · {Math.round(r.blockedRate * 100)}% zile blocate
                </option>
              ))}
            </select>
            <div className="text-[11px] text-ink-500 mt-2 leading-snug italic">
              {region.note}
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 border hairline cursor-pointer hover:bg-ink-50 transition">
            <input
              type="checkbox"
              checked={withSubscription}
              onChange={(e) => setWithSubscription(e.target.checked)}
              className="mt-1 accent-uzx-orange"
            />
            <div>
              <div className="text-sm text-ink-900 font-medium">
                Include abonament înlocuire 24 ore
              </div>
              <div className="text-[11px] text-ink-500 leading-snug mt-0.5">
                Reduce zilele pierdute la defecțiuni de la ~2 la ~0,5 zile pe
                durata șantierului, prin aparat de schimb livrat în 24h.
              </div>
            </div>
          </label>
        </div>

        <div className="lg:col-span-7 p-6 lg:p-8 space-y-6" style={{ background: "#f4f7fb" }}>
          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Zile productive pierdute · estimat
            </div>
            <div className="grid grid-cols-3 gap-3">
              <DaysCard
                label="TIG / MIG"
                value={`${formatDays(calc.daysLostTigMig)} zile`}
                detail="vânt + ploaie + cort tehnic"
                tone="alert"
              />
              <DaysCard
                label="Laser"
                value={`${formatDays(calc.daysLostLaser)} zile`}
                detail={withSubscription ? "imun la vreme · abonament 24h" : "imun la vreme · doar defecțiuni"}
                tone="ok"
              />
              <DaysCard
                label="Salvate cu laser"
                value={`${formatDays(calc.daysSaved)} zile`}
                detail="diferență netă în favoarea laserului"
                tone="brand"
              />
            </div>
          </div>

          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Expunere financiară · pe durata șantierului
            </div>

            <div className="space-y-3">
              <ExposureBar
                label="TIG / MIG · expunere maximă"
                value={formatRON(calc.penaltyExposureTigMig)}
                pct={calc.tigBarPct}
                tone="alert"
              />
              <ExposureBar
                label="Laser · expunere reziduală"
                value={formatRON(calc.penaltyExposureLaser)}
                pct={calc.laserBarPct}
                tone="ok"
              />
            </div>
          </div>

          <div className="bg-white border-l-2 p-5" style={{ borderColor: "#f5851f" }}>
            <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
              Diferență netă · penalitate evitată cu laser
            </div>
            <div className="serif text-3xl lg:text-4xl text-ink-900 num leading-none mb-3" style={{ letterSpacing: "-0.02em" }}>
              {formatRON(calc.savings)}
            </div>
            <p className="text-sm text-ink-600 leading-relaxed">
              Atât ai economisi din penalitățile evitate pe acest contract,
              folosind o flotă laser în loc de TIG/MIG, pe baza valorilor
              introduse. Costul flotei recomandate (3 active + 2 standby
              configurabilă pe valoarea contractului) se discută cu un inginer
              Uzinex la cerere.
            </p>
            <Link
              href={contactHref}
              className="inline-flex items-center gap-2 text-xs text-uzx-orange hover:underline mt-4 font-medium"
            >
              Solicit configurare flotă cu valorile mele
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-4 border-t hairline bg-white">
        <p className="text-[11px] text-ink-500 leading-relaxed italic">
          Estimări orientative bazate pe statistici meteo regionale (% zile/an
          cu vânt peste 5 m/s și/sau precipitații care fac sudura conventională
          pe aluminiu subțire imposibilă fără cort tehnic), pe experiența
          noastră cu clienții de pe șantiere similare și pe numerele publicate
          în cazul de față. Calculatorul nu înlocuiește o ofertă tehnico-comercială
          personalizată. Pentru un calcul exact pe contractul tău, scrie-ne.
        </p>
      </div>
    </div>
  );
}

function DaysCard({
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
  tone: "alert" | "ok";
}) {
  const color = tone === "alert" ? "#dc2626" : "#16a34a";
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
