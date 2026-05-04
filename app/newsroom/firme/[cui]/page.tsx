import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadCompany, loadCompanies, loadSectorPeers } from "@/lib/newsroom/companies";
import { FinancialLineChart, CompanyComparisonBar } from "@/components/newsroom/CompanyChart";
import { CopyButton } from "@/components/newsroom/CopyButton";

export const revalidate = 3600;

export async function generateStaticParams() {
  return loadCompanies().map((c) => ({ cui: String(c.cui) }));
}

export async function generateMetadata({ params }: { params: Promise<{ cui: string }> }): Promise<Metadata> {
  const { cui } = await params;
  const company = loadCompany(Number(cui));
  if (!company) return { title: "Firmă negăsită" };
  const turnover = company.financials.anaf_company_turnover?.slice(-1)[0];
  return {
    title: `${company.name} — profil ANAF + dosare portal.just.ro`,
    description: `${company.name} (CUI ${company.cui}) — bilanțuri ANAF${turnover ? `, cifră de afaceri ${(turnover.value / 1_000_000_000).toFixed(2)} mld RON (${turnover.year})` : ""}, ${company.court.dosareCount}${company.court.dosareCount >= 1000 ? "+" : ""} dosare comerciale, ${company.court.recentHearings} ședințe în ultimele 12 luni.`,
    alternates: { canonical: `/newsroom/firme/${company.cui}` },
  };
}

function fmtNum(v: number, divisor = 1, suffix = "") {
  return (v / divisor).toLocaleString("ro-RO", { maximumFractionDigits: 2 }) + suffix;
}

export default async function CompanyProfilePage({ params }: { params: Promise<{ cui: string }> }) {
  const { cui } = await params;
  const company = loadCompany(Number(cui));
  if (!company) notFound();

  const peers = loadSectorPeers(company.sector, company.cui);

  const turnover = company.financials.anaf_company_turnover || [];
  const profit = company.financials.anaf_company_net_profit || [];
  const employees = company.financials.anaf_company_employees || [];
  const liabilities = company.financials.anaf_company_total_liabilities || [];

  const latestTurnover = turnover.slice(-1)[0];
  const latestProfit = profit.slice(-1)[0];
  const latestEmployees = employees.slice(-1)[0];
  const yoyTurnover =
    turnover.length >= 2
      ? ((turnover[turnover.length - 1].value - turnover[turnover.length - 2].value) / turnover[turnover.length - 2].value) * 100
      : null;

  // Sector comparison data
  const allSector = [company, ...peers];
  const sectorTurnoverData = allSector
    .map((c) => {
      const t = c.financials.anaf_company_turnover?.slice(-1)[0];
      return t ? { cui: c.cui, name: c.name.slice(0, 25), value: t.value } : null;
    })
    .filter((x): x is { cui: number; name: string; value: number } => x !== null)
    .sort((a, b) => b.value - a.value);

  const profitMargin = latestTurnover && latestProfit && latestTurnover.value > 0
    ? (latestProfit.value / latestTurnover.value) * 100
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    identifier: `CUI ${company.cui}`,
    url: `https://uzinex.ro/newsroom/firme/${company.cui}`,
  };

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <article className="max-w-4xl mx-auto pb-20">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <Link href="/newsroom/firme" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Toate firmele</Link>

          <header className="mt-8 mb-10">
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">{company.sectorLabel}</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 mb-3">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
              <span className="mono">CUI {company.cui}</span>
              <CopyButton value={String(company.cui)} label="Copiază CUI" variant="inline" />
              <span className="text-ink-300">·</span>
              <a href={`https://demoanaf.ro/firma/${company.cui}`} target="_blank" rel="noopener" className="text-uzx-blue hover:text-uzx-orange">demoanaf.ro →</a>
            </div>
          </header>

          {/* HERO STATS */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
            <Stat
              label="Cifră de afaceri"
              value={latestTurnover ? fmtNum(latestTurnover.value, 1_000_000_000, "") + " mld" : "—"}
              sublabel={latestTurnover ? `${latestTurnover.year}${yoyTurnover !== null ? ` · ${yoyTurnover >= 0 ? "+" : ""}${yoyTurnover.toFixed(1)}% YoY` : ""}` : ""}
              accent
            />
            <Stat
              label="Profit net"
              value={latestProfit ? fmtNum(latestProfit.value, 1_000_000, "") + " mil" : "—"}
              sublabel={latestProfit ? String(latestProfit.year) : ""}
            />
            <Stat
              label="Angajați medii"
              value={latestEmployees ? fmtNum(latestEmployees.value) : "—"}
              sublabel={latestEmployees ? String(latestEmployees.year) : ""}
            />
            <Stat
              label="Dosare comerciale"
              value={`${company.court.dosareCount}${company.court.dosareCount >= 1000 ? "+" : ""}`}
              sublabel={`${company.court.recentHearings} ședințe în 12 luni`}
              warning={company.court.dosareCount >= 500}
            />
          </section>

          {profitMargin !== null && (
            <div className="border-l-4 border-uzx-blue bg-ink-50/50 rounded-r-lg p-4 mb-10 text-sm">
              <strong className="text-ink-900">Marja netă {latestProfit?.year}:</strong> {profitMargin.toFixed(2)}% — profit {fmtNum(latestProfit!.value, 1_000_000, "")} mil RON la o cifră de afaceri de {fmtNum(latestTurnover!.value, 1_000_000_000, "")} mld RON.
            </div>
          )}

          {/* CHARTS — financial time series */}
          {turnover.length >= 2 && (
            <section className="mb-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Cifra de afaceri în timp</h2>
              <FinancialLineChart data={turnover} title={`Cifra de afaceri ${turnover[0].year}-${turnover.slice(-1)[0].year}`} unit="mld RON" />
            </section>
          )}

          {profit.length >= 2 && (
            <section className="mb-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Profit net în timp</h2>
              <FinancialLineChart data={profit} title={`Profit net ${profit[0].year}-${profit.slice(-1)[0].year}`} color="#155290" unit="mil RON" divisor={1_000_000} />
            </section>
          )}

          {employees.length >= 2 && (
            <section className="mb-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Angajați medii în timp</h2>
              <FinancialLineChart data={employees} title={`Angajați medii ${employees[0].year}-${employees.slice(-1)[0].year}`} color="#f5851f" unit="angajați" divisor={1} />
            </section>
          )}

          {/* SECTOR COMPARISON */}
          {sectorTurnoverData.length >= 2 && (
            <section className="mb-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Comparație în sectorul {company.sectorLabel}</h2>
              <p className="text-sm text-ink-500 mb-4">Cifră de afaceri ultim an pentru toate firmele din sector. Bara portocalie = {company.name}.</p>
              <CompanyComparisonBar data={sectorTurnoverData} accentCui={company.cui} title={`${company.sectorLabel} — cifră de afaceri ultimul an`} />
            </section>
          )}

          {/* COURT CASES */}
          {company.court.dosareCount > 0 && (
            <section className="mb-10 border-t border-ink-100 pt-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Dosare comerciale portal.just.ro</h2>
              <p className="text-sm text-ink-500 mb-5">
                Date colectate prin SOAP din <code className="mono text-xs">portalquery.just.ro/query.asmx</code> pentru numele de parte „{company.name.split(" ").slice(0, 3).join(" ")}".
                Numărul total este capat la 1000 per query.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <Stat label="Total dosare găsite" value={`${company.court.dosareCount}${company.court.dosareCount >= 1000 ? "+" : ""}`} />
                <Stat label="Ședințe în ultimele 12 luni" value={String(company.court.recentHearings)} />
              </div>
              {company.court.recentCases.length > 0 && (
                <div className="border border-ink-100 rounded-lg overflow-hidden bg-white">
                  <div className="bg-ink-50 px-4 py-2 text-xs uppercase tracking-widest text-ink-500 font-medium">Dosare cu activitate recentă</div>
                  <ul className="divide-y divide-ink-100">
                    {company.court.recentCases.map((c, i) => (
                      <li key={i} className="px-4 py-3 text-sm">
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="mono text-xs text-ink-900 font-medium">{c.numar}</div>
                          <div className="num text-xs text-ink-400">{c.lastHearing}</div>
                        </div>
                        {c.obiect && <div className="text-xs text-ink-600 mt-0.5">{c.obiect}</div>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* PEERS */}
          {peers.length > 0 && (
            <section className="mb-10 border-t border-ink-100 pt-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Alte firme din {company.sectorLabel}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {peers.map((p) => (
                  <Link key={p.cui} href={`/newsroom/firme/${p.cui}`} className="block border border-ink-100 rounded p-3 hover:border-uzx-blue text-sm transition-colors">
                    <div className="font-medium text-ink-900">{p.name}</div>
                    <div className="text-xs text-ink-500 mt-0.5 mono">CUI {p.cui}</div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* METHODOLOGY */}
          <section className="mb-10 border-t border-ink-100 pt-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="text-sm text-ink-700 leading-relaxed space-y-3">
              <p>
                <strong>Bilanțuri financiare:</strong> Date oficiale ANAF accesate prin demoanaf.ro/api/company/{company.cui}/financials. Indicatorii folosiți sunt I13 (cifră afaceri netă), I18 (profit net), I20 (angajați medii), I7 (datorii totale), I10 (capitaluri proprii). Toate cifrele sunt în lei (RON) curenți, fără ajustări de inflație.
              </p>
              <p>
                <strong>Dosare comerciale:</strong> Colectate prin SOAP de la portalquery.just.ro/query.asmx (Ministerul Justiției), endpoint-ul oficial CautareDosare. Căutarea folosește numele firmei ca parte (numeParte) — pot exista dosare în care firma apare cu denumire variantă (de ex. „SC X SA" vs „X S.A.") care nu sunt incluse în acest count. Numărul de dosare este capat la 1000 per query (limita serviciului).
              </p>
              <p className="text-xs text-ink-400">CUI: {company.cui} · Sector: {company.sector}</p>
            </div>
          </section>

          {/* CONTACT */}
          <section className="bg-ink-900 text-white rounded-lg p-7">
            <h2 className="serif text-2xl tracking-tight mb-2">Pentru jurnaliști</h2>
            <p className="text-sm text-white/70 mb-5">Folosește datele de mai sus liber — citează „Newsroom UZINEX" cu link spre această pagină. Pentru întrebări de metodologie sau pentru a programa un interviu cu Sorin Baciu (Director General UZINEX), scrie pe sorin.baciu@uzinex.ro sau sună la +40 769 081 081.</p>
            <div className="flex flex-wrap gap-2">
              <CopyButton value={`Sursă: UZINEX Newsroom — profil ${company.name} (https://uzinex.ro/newsroom/firme/${company.cui})`} label="Copiază citarea" className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10" />
              <a href={`mailto:sorin.baciu@uzinex.ro?subject=Interviu%20-%20${encodeURIComponent(company.name)}`} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded bg-uzx-orange text-white hover:bg-uzx-orange2 font-medium transition">
                Trimite email pentru interviu
              </a>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, sublabel, accent, warning }: { label: string; value: string; sublabel?: string; accent?: boolean; warning?: boolean }) {
  return (
    <div className={`border rounded-lg p-4 bg-white ${accent ? "border-uzx-orange/30 bg-uzx-orange/5" : warning ? "border-amber-300 bg-amber-50/50" : "border-ink-100"}`}>
      <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">{label}</div>
      <div className={`serif text-2xl md:text-3xl tracking-tight mt-1 num ${accent ? "text-uzx-orange" : warning ? "text-amber-900" : "text-ink-900"}`}>{value}</div>
      {sublabel && <div className="text-xs text-ink-500 num mt-1">{sublabel}</div>}
    </div>
  );
}
