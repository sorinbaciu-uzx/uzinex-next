import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadWorld } from "@/lib/newsroom/world";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Perspective globale — datele internaționale ale României | Newsroom UZINEX",
  description:
    "Datoria publică (IMF), cheltuielile federale SUA (USASpending), comerțul mondial (UN Comtrade), emisiile industriale (Climate TRACE). 4 perspective globale ale economiei și industriei românești cu cifre verificabile.",
  alternates: { canonical: "/newsroom/lume" },
};

const fmtMld = (v: number) => `${(v / 1_000_000_000).toFixed(1)} mld`;
const fmtMil = (v: number) => `${(v / 1_000_000).toFixed(1)} mil`;

export default function LumeIndexPage() {
  const w = loadWorld();
  if (!w) {
    return (
      <>
        <Header solid />
        <main className="container-x py-14"><p className="text-center text-ink-500">Datele globale nu sunt încă disponibile.</p></main>
        <Footer />
      </>
    );
  }

  // Compute hero metrics
  const roDebt2025 = w.imf.debt_gdp.ROU?.find((p) => p.year === 2025)?.value;
  const roDebt2030 = w.imf.debt_gdp.ROU?.find((p) => p.year === 2030)?.value;

  const cards = [
    {
      href: "/newsroom/lume/datorie-publica",
      eyebrow: "IMF DataMapper",
      title: "Datoria publică va atinge 70% din PIB până în 2030",
      bigNumber: roDebt2025 ? `${roDebt2025.toFixed(1)}% → ${roDebt2030?.toFixed(1) ?? "70,4"}%` : "70,4%",
      bigNumberLabel: "DEBT/GDP RO 2025 → 2030 (PROIECȚIE)",
      subtitle: `Trajectoria datoriei publice a României vs Polonia, Cehia, Ungaria și media UE — ${Object.keys(w.imf.debt_gdp).filter((c) => w.imf.debt_gdp[c].length).length} țări × 30 ani de date IMF.`,
      sources: ["IMF", "Eurostat", "World Bank"],
    },
    {
      href: "/newsroom/lume/sua-in-romania",
      eyebrow: "USASpending + DoD + NSPA",
      title: "Cheltuielile federale SUA în România FY2026",
      bigNumber: `$${fmtMil(w.usaspending.total).replace(" mil", "M")}`,
      bigNumberLabel: `${w.usaspending.awardsCount} CONTRACTE FEDERALE`,
      subtitle: `Awards către recipienți din România, distribuite pe ${w.usaspending.agencies.length} agenții federale. Plus ${w.dod.announcements.length} anunțuri DoD recente și ${w.nato.nspaOpenOpportunities} oportunități NSPA NATO deschise.`,
      sources: ["USASpending.gov", "DoD RSS", "NSPA"],
    },
    {
      href: "/newsroom/lume/comert-mondial",
      eyebrow: "UN Comtrade · World Bank",
      title: "Comerțul exterior al României — context macro",
      bigNumber: w.comtrade.totalExport > 0 ? `${fmtMld(w.comtrade.totalExport)} USD` : "în așteptare",
      bigNumberLabel: w.comtrade.totalExport > 0 ? "EXPORT TOTAL 2024" : "TIER GRATUIT — necesită COMTRADE_API_KEY",
      subtitle: `Pondere export în PIB (World Bank), FDI ca % din PIB, investiții străine — comparație România vs vecini regionali. Tier gratuit UN Comtrade returnează doar count, nu agregate world.`,
      sources: ["UN Comtrade", "World Bank"],
    },
    {
      href: "/newsroom/lume/emisii-industriale",
      eyebrow: "Climate TRACE",
      title: "Emisii industriale ale României",
      bigNumber: w.climate.ranking.length > 0 ? `${w.climate.ranking.length}` : "în pregătire",
      bigNumberLabel: w.climate.ranking.length > 0 ? "SECTOARE EMITENTE INDEXATE" : "DATA SOURCE — 2026 Q1",
      subtitle: `Emisii globale per asset industrial, cross-referențiate cu firmele tracked (Liberty Galați, Holcim, Nuclearelectrica). Date Climate TRACE asset-level.`,
      sources: ["Climate TRACE", "EU ETS"],
    },
  ];

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <div className="max-w-5xl mx-auto space-y-10 pb-10">
          <header>
            <Link href="/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Newsroom</Link>
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mt-3 mb-2">Perspective globale</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 mb-3">România în context internațional — 4 perspective cu cifre proprii</h1>
            <p className="text-lg text-ink-600 leading-relaxed max-w-3xl">
              Newsroom-ul agregă date din IMF DataMapper (40.000+ puncte), USASpending.gov,
              UN Comtrade, Climate TRACE și DoD RSS pentru a oferi context internațional verificabil.
              Click pe orice perspectivă → pagină completă cu charts, surse și export CSV.
            </p>
          </header>

          <div className="grid gap-4">
            {cards.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="block border border-ink-100 rounded-lg bg-white p-6 md:p-8 hover:border-uzx-blue transition-colors group"
              >
                <div className="grid md:grid-cols-[1fr_240px] gap-6 items-start">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">{c.eyebrow}</div>
                    <h2 className="serif text-2xl md:text-[28px] tracking-tight text-ink-900 group-hover:text-uzx-blue transition-colors mb-3 leading-tight">{c.title}</h2>
                    <p className="text-sm text-ink-600 leading-relaxed mb-4">{c.subtitle}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {c.sources.map((s) => (
                        <span key={s} className="bg-ink-50 text-ink-700 px-2 py-0.5 rounded mono">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm text-uzx-orange font-medium group-hover:gap-2.5 transition-all">
                      Vezi pagina completă
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <aside className="border-l-4 border-uzx-orange pl-5">
                    <div className="serif text-3xl md:text-4xl text-uzx-orange leading-tight num">{c.bigNumber}</div>
                    <div className="text-[11px] text-ink-500 uppercase tracking-widest mt-2 leading-snug">{c.bigNumberLabel}</div>
                  </aside>
                </div>
              </Link>
            ))}
          </div>

          <footer className="border-t border-ink-100 pt-6 text-xs text-ink-500 leading-relaxed">
            Generat automat din pipeline-ul Newsroom UZINEX. Toate cifrele sunt verificabile prin endpoint-urile oficiale citate. Pentru întrebări de metodologie: <a href="mailto:sorin.baciu@uzinex.ro" className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2">sorin.baciu@uzinex.ro</a>.
          </footer>
        </div>
      </main>
      <Footer />
    </>
  );
}
