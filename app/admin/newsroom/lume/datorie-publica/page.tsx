import Link from "next/link";
import type { Metadata } from "next";
import { loadWorld } from "@/lib/newsroom/world";
import { MultiLineChart } from "@/components/newsroom/MultiLineChart";
import { CopyButton } from "@/components/newsroom/CopyButton";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Datoria publică RO vs vecini — proiecție IMF 2018-2031 | Newsroom UZINEX",
  description:
    "Datoria publică a României crește de la 60,6% PIB (2025) la 70,4% PIB (2031), conform proiecțiilor IMF DataMapper. Comparație cu Polonia, Ungaria, Cehia, Germania și media zonei euro.",
  alternates: { canonical: "/admin/newsroom/lume/datorie-publica" },
};

export default function DatoriePublicaPage() {
  const w = loadWorld();
  if (!w) return <ErrorPage />;

  const labels = w.countryLabels;
  const series = (data: typeof w.imf.debt_gdp) =>
    Object.entries(data)
      .filter(([, points]) => points.length > 0)
      .map(([country, points]) => ({ country, label: labels[country] || country, data: points }));

  const ro = w.imf.debt_gdp.ROU;
  const roCurrent = ro?.find((p) => p.year === 2025);
  const roFuture = ro?.find((p) => p.year === 2030);
  const roOldest = ro?.[0];

  const roGdpGrowthLatest = w.imf.gdp_growth.ROU?.find((p) => p.year === 2025);
  const roInflationLatest = w.imf.inflation.ROU?.find((p) => p.year === 2025);

  // Build rankings for 2030 debt
  const debt2030 = Object.entries(w.imf.debt_gdp)
    .map(([c, points]) => ({ country: c, label: labels[c] || c, value: points.find((p) => p.year === 2030)?.value }))
    .filter((r): r is { country: string; label: string; value: number } => typeof r.value === "number")
    .sort((a, b) => b.value - a.value);

  return (
    <>
      
      <div>
        <article className="max-w-4xl mx-auto pb-20">
          <Link href="/admin/newsroom/lume" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Perspective globale</Link>

          <header className="mt-6 mb-10">
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">IMF DataMapper · GGXWDG_NGDP</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Datoria publică a României: traiectoria 2000-2031</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              IMF prognozează creșterea datoriei publice de la {roCurrent?.value.toFixed(1) ?? "60,6"}% PIB în 2025 la {roFuture?.value.toFixed(1) ?? "68,8"}% în 2030.
              Comparație cu Polonia, Ungaria, Cehia, Germania și media zonei euro pe baza datelor oficiale.
            </p>
          </header>

          {/* HERO */}
          {roCurrent && roFuture && (
            <section className="border-y border-ink-100 py-10 mb-10">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">Acum (2025)</div>
                  <div className="serif text-5xl md:text-6xl text-ink-900 num">{roCurrent.value.toFixed(1)}%</div>
                  <div className="text-xs text-ink-400 mt-1">din PIB</div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-xs uppercase tracking-widest text-ink-400">Trajectoria</div>
                  <div className="serif text-4xl text-uzx-orange mt-1">→ +{(roFuture.value - roCurrent.value).toFixed(1)} pp</div>
                  <div className="text-xs text-ink-400 mt-1">în 5 ani</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">Proiecție 2030</div>
                  <div className="serif text-5xl md:text-6xl text-uzx-orange num">{roFuture.value.toFixed(1)}%</div>
                  <div className="text-xs text-ink-400 mt-1">din PIB</div>
                </div>
              </div>
            </section>
          )}

          {/* MAIN CHART */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Datoria publică ca % din PIB — 2000-2031</h2>
            <p className="text-sm text-ink-500 mb-4">Linia portocalie groasă = România. Datele după 2025 sunt proiecții IMF (World Economic Outlook).</p>
            <MultiLineChart series={series(w.imf.debt_gdp)} unit="%" currentYear={2025} height={400} />
          </section>

          {/* RANKING 2030 */}
          {debt2030.length > 0 && (
            <section className="mb-12">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Clasamentul țărilor după datorie 2030 (proiecție IMF)</h2>
              <div className="border border-ink-100 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-xs uppercase tracking-widest text-ink-500 font-medium">
                    <tr>
                      <th className="px-4 py-2.5">#</th>
                      <th className="px-4 py-2.5">Țară</th>
                      <th className="px-4 py-2.5 text-right">Debt/GDP 2030</th>
                      <th className="px-4 py-2.5 text-right">vs România</th>
                    </tr>
                  </thead>
                  <tbody>
                    {debt2030.map((r, i) => {
                      const isRo = r.country === "ROU";
                      const roVal = debt2030.find((d) => d.country === "ROU")?.value || 0;
                      const diff = r.value - roVal;
                      return (
                        <tr key={r.country} className={`border-t border-ink-100 ${isRo ? "bg-uzx-orange/5" : ""}`}>
                          <td className="px-4 py-2.5 mono text-xs text-ink-500">{i + 1}</td>
                          <td className={`px-4 py-2.5 ${isRo ? "font-medium text-ink-900" : "text-ink-700"}`}>
                            {r.label} {isRo && <span className="text-xs text-uzx-orange ml-1">← noi</span>}
                          </td>
                          <td className="px-4 py-2.5 text-right num font-medium">{r.value.toFixed(1)}%</td>
                          <td className="px-4 py-2.5 text-right num text-xs text-ink-500">{isRo ? "—" : `${diff >= 0 ? "+" : ""}${diff.toFixed(1)} pp`}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* SECONDARY INDICATORS */}
          <section className="mb-12 grid md:grid-cols-2 gap-6">
            <div className="border border-ink-100 rounded-lg p-5">
              <div className="text-xs uppercase tracking-widest text-ink-500 font-medium mb-2">Creșterea PIB 2025</div>
              <div className="serif text-4xl text-uzx-blue num">{roGdpGrowthLatest?.value.toFixed(1) ?? "—"}%</div>
              <div className="text-xs text-ink-500 mt-1">prognoză IMF</div>
            </div>
            <div className="border border-ink-100 rounded-lg p-5">
              <div className="text-xs uppercase tracking-widest text-ink-500 font-medium mb-2">Inflația 2025</div>
              <div className="serif text-4xl text-uzx-blue num">{roInflationLatest?.value.toFixed(1) ?? "—"}%</div>
              <div className="text-xs text-ink-500 mt-1">prognoză IMF</div>
            </div>
          </section>

          {/* GDP GROWTH CHART */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Creșterea PIB — 2018-2031</h2>
            <MultiLineChart series={series(w.imf.gdp_growth).filter((s) => s.data.length > 0)} unit="%" currentYear={2025} height={300} />
          </section>

          {/* INFLATION CHART */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Inflația — 2018-2031</h2>
            <MultiLineChart series={series(w.imf.inflation).filter((s) => s.data.length > 0)} unit="%" currentYear={2025} height={300} />
          </section>

          {/* METHODOLOGY */}
          <section className="border-t border-ink-100 pt-10 mb-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="prose-newsroom text-[15px]">
              <p>
                Datele provin din <strong>IMF DataMapper API</strong> — endpoint-ul oficial al Fondului Monetar Internațional pentru proiecții macroeconomice. Indicatorii folosiți:
              </p>
              <ul>
                <li><code>GGXWDG_NGDP</code> — datoria publică ca % din PIB (general government gross debt)</li>
                <li><code>NGDP_RPCH</code> — creșterea PIB-ului real (% YoY)</li>
                <li><code>PCPIPCH</code> — inflația (% YoY, CPI mediu anual)</li>
                <li><code>BCA_NGDPD</code> — soldul contului curent (% din PIB)</li>
              </ul>
              <p>
                Țările urmărite: România (ROU), Polonia (POL), Ungaria (HUN), Cehia (CZE), Germania (DEU), zona euro agregată (EUQ). Datele istoric sunt actuale (verificare IMF cu Eurostat). Datele după 2025 sunt proiecții IMF din World Economic Outlook (April 2025 issue).
              </p>
              <p>
                <strong>Limitări:</strong> proiecțiile IMF se bazează pe ipoteze de politici economice constante. Se actualizează de două ori pe an (April + October WEO). Pentru cifrele anului curent, se compară cu Eurostat (date trimestriale) ca cross-validation.
              </p>
            </div>
          </section>

          {/* CITATION */}
          <section className="bg-ink-50 rounded-lg p-5 mb-8">
            <h3 className="serif text-lg tracking-tight text-ink-900 mb-3">Citare oficială</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-3">
                <code className="mono text-xs text-ink-700 break-all">UZINEX Newsroom (2026). Datoria publică a României — proiecție IMF 2030. https://uzinex.ro/newsroom/lume/datorie-publica</code>
                <CopyButton value={`UZINEX Newsroom (2026). Datoria publică a României — proiecție IMF 2030. https://uzinex.ro/newsroom/lume/datorie-publica`} label="Copiază" />
              </div>
            </div>
          </section>
        </article>
      </div>
      
    </>
  );
}

function ErrorPage() {
  return (
    <>
      
      <div><p className="text-center text-ink-500">Datele globale nu sunt încă disponibile.</p></div>
      
    </>
  );
}
