import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadWorld } from "@/lib/newsroom/world";
import { CompanyComparisonBar } from "@/components/newsroom/CompanyChart";
import { loadCompanies } from "@/lib/newsroom/companies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Emisiile industriale ale României — Climate TRACE per sector | Newsroom UZINEX",
  description:
    "Date Climate TRACE asset-level pentru sectoarele industriale românești. Cross-referențiat cu firmele tracked (Liberty Galați, Holcim, Nuclearelectrica) și cu obiectivele EU ETS.",
  alternates: { canonical: "/newsroom/lume/emisii-industriale" },
};

const SECTOR_LABELS: Record<string, string> = {
  "power": "Energie & utilități",
  "manufacturing": "Industria prelucrătoare",
  "buildings": "Clădiri",
  "transportation": "Transport",
  "fossil-fuel-operations": "Operațiuni combustibili fosili",
  "mineral-extraction": "Extracție minerală",
  "waste": "Deșeuri",
  "fluorinated-gases": "Gaze fluorurate",
  "agriculture": "Agricultură",
  "forestry-and-land-use": "Silvicultură",
  "maritime": "Maritim",
};

export default function EmisiiPage() {
  const w = loadWorld();
  const companies = loadCompanies();

  // Cross-reference: industrial firms with relevant emissions sectors
  const relevantFirms = companies.filter((c) =>
    ["metalurgie", "metalurgie_aluminiu", "ciment", "energie_nucleara", "transport_gaz", "petrol_gas", "rafinare", "chimie_ingrasaminte"].includes(c.sector),
  );

  const hasClimateData = w?.climate.ranking.length && w.climate.ranking.length > 0;

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <article className="max-w-4xl mx-auto pb-20">
          <Link href="/newsroom/lume" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Perspective globale</Link>

          <header className="mt-6 mb-10">
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">Climate TRACE · EU ETS · ANAF</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Emisiile industriale ale României — sectoare și firme</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              Climate TRACE este o coaliție internațională (Al Gore + 100+ universități) care produce inventarul global al emisiilor de CO2 echivalent <strong>per asset industrial</strong> — fiecare fabrică, centrală sau facilitate este indexată cu emisiile sale anuale, derivate din date satelit + algoritmi.
            </p>
          </header>

          {!hasClimateData ? (
            <section className="bg-amber-50 border-l-4 border-amber-400 rounded-r p-6 mb-10">
              <div className="text-xs uppercase tracking-widest text-amber-900 font-medium mb-2">Date în pregătire</div>
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Pipeline-ul Climate TRACE — re-colectare programată</h2>
              <p className="text-sm text-ink-700 leading-relaxed mb-4">
                Endpoint-ul Climate TRACE (<code className="mono text-xs">api.climatetrace.org/v6/country/emissions</code>) a returnat un răspuns gol pentru ultima rulare a pipeline-ului. Există două motive posibile:
              </p>
              <ul className="text-sm text-ink-700 leading-relaxed space-y-1 mb-4 list-disc pl-6">
                <li>Schimbare de schemă API între versiunile v5 și v6 (în curs de adaptare)</li>
                <li>Climate TRACE actualizează datele anual în Q1 — datele 2025 nu sunt încă publicate</li>
              </ul>
              <p className="text-sm text-ink-700">
                Newsroom UZINEX va re-rula colectorul când Climate TRACE publică ediția 2025 (estimat martie 2026).
                Pentru emisiile EU ETS (industriile mari obligate să raporteze), se folosește bulk download anual de la EUTL — în implementare separată.
              </p>
            </section>
          ) : (
            <section className="mb-12">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Emisii ROU per sector — Climate TRACE</h2>
              <p className="text-sm text-ink-500 mb-4">Date asset-level agregate la nivel de sector pentru România.</p>
              <CompanyComparisonBar
                data={w!.climate.ranking.slice(0, 8).map((r) => ({
                  cui: 0,
                  name: SECTOR_LABELS[r.sector] || r.sector,
                  value: r.value,
                }))}
                unit="tCO2e"
                divisor={1_000_000}
                title="Emisii ROU per sector (mil tCO2e)"
              />
            </section>
          )}

          {/* CROSS-REF: relevant firms */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Firme industriale tracked cu impact climatic semnificativ</h2>
            <p className="text-sm text-ink-500 mb-4">
              Cele 8 firme din portofoliul newsroom-ului care au emisii directe semnificative — operează în sectoare cu intensitate ridicată de carbon (metalurgie, ciment, rafinare, energie).
              Fiecare profil firmă include link spre EU ETS (când datele vor fi importate).
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {relevantFirms.map((c) => {
                const turnover = c.financials.anaf_company_turnover?.slice(-1)[0];
                return (
                  <Link
                    key={c.cui}
                    href={`/newsroom/firme/${c.cui}`}
                    className="block border border-ink-100 rounded-lg p-4 bg-white hover:border-uzx-blue transition-colors group"
                  >
                    <div className="text-xs uppercase tracking-widest text-uzx-orange mb-1 font-medium">{c.sectorLabel}</div>
                    <div className="font-medium text-ink-900 group-hover:text-uzx-blue transition-colors">{c.name}</div>
                    {turnover && (
                      <div className="text-xs text-ink-500 num mt-1">
                        Cifră afaceri {turnover.year}: {(turnover.value / 1_000_000_000).toFixed(2)} mld RON
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </section>

          {/* METHODOLOGY */}
          <section className="border-t border-ink-100 pt-10 mb-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="prose-newsroom text-[15px]">
              <p>
                <strong>Climate TRACE</strong> este o platformă lansată de Al Gore + Carbon Mapper + WattTime + 100+ instituții academice care produce inventarul global al emisiilor GHG la nivel de asset (peste 70.000 fabrici, centrale și facilități indexate). Datele combină măsurători satelit (CO2, CH4, NO2) cu algoritmi de atribuire la nivel de operator.
              </p>
              <p>
                <strong>EU ETS</strong> (Emissions Trading System) este sistemul european de comercializare a emisiilor — firmele mari (peste 25.000 instalații industriale și ~ 600 operatori aviație în UE) sunt obligate să raporteze anual emisiile la EUTL (European Union Transaction Log).
              </p>
              <p>
                <strong>Pentru firmele românești tracked</strong>, intersecția semnificativă este la sectoarele:
              </p>
              <ul>
                <li>Metalurgie oțel — Liberty Galați, ArcelorMittal Hunedoara (potențial Climate TRACE manufacturing/iron-and-steel)</li>
                <li>Aluminiu — Alro Slatina (manufacturing/aluminum)</li>
                <li>Ciment — Holcim Romania, Heidelberg Materials (manufacturing/cement)</li>
                <li>Rafinare — Rompetrol Rafinare, OMV Petrom (fossil-fuel-operations)</li>
                <li>Energie nucleară — Nuclearelectrica (power, sub-categoria nuclear — emisii directe negligibile)</li>
              </ul>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
