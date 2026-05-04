import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadWorld } from "@/lib/newsroom/world";
import { CompanyComparisonBar } from "@/components/newsroom/CompanyChart";
import { CopyButton } from "@/components/newsroom/CopyButton";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cheltuielile federale SUA în România FY2026 | Newsroom UZINEX",
  description:
    "USASpending.gov + DoD RSS + NSPA: care agenții federale americane cheltuie în România, top awards, pipeline DoD recent și oportunități NATO deschise prin NSPA.",
  alternates: { canonical: "/newsroom/lume/sua-in-romania" },
};

const fmtUsd = (v: number) => `$${(v / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;
const fmtUsdK = (v: number) => `$${(v / 1_000).toLocaleString("en-US", { maximumFractionDigits: 0 })}K`;

export default function SuaInRomaniaPage() {
  const w = loadWorld();
  if (!w) return <ErrorPage />;

  const u = w.usaspending;
  const agencyChartData = u.agencies.slice(0, 8).map((a) => ({
    cui: 0,
    name: a.agency.replace(/^Department of /, "Dept ").slice(0, 30),
    value: a.amount,
  }));

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <article className="max-w-4xl mx-auto pb-20">
          <Link href="/newsroom/lume" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Perspective globale</Link>

          <header className="mt-6 mb-10">
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">USASpending.gov · DoD · NSPA NATO</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Cheltuielile federale SUA în România — FY2026</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              Newsroom UZINEX agregă date din USASpending.gov (toate contractele federale SUA cu loc de execuție România), feed-ul RSS al Departamentului Apărării (DoD)
              pentru anunțuri zilnice și platforma NSPA (NATO Support and Procurement Agency) pentru oportunități contractare NATO deschise.
            </p>
          </header>

          {/* HERO */}
          <section className="border-y border-ink-100 py-10 mb-10">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">Total awards</div>
                <div className="serif text-5xl md:text-6xl text-uzx-orange num">{fmtUsd(u.total)}</div>
                <div className="text-xs text-ink-400 mt-1">FY2026, USASpending.gov</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">Awards individuale</div>
                <div className="serif text-5xl md:text-6xl text-ink-900 num">{u.awardsCount}</div>
                <div className="text-xs text-ink-400 mt-1">contracte federale</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">Agenții implicate</div>
                <div className="serif text-5xl md:text-6xl text-ink-900 num">{u.agencies.length}</div>
                <div className="text-xs text-ink-400 mt-1">departamente federale</div>
              </div>
            </div>
          </section>

          {/* AGENCIES */}
          {u.agencies.length > 0 && (
            <section className="mb-12">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Top agenții federale SUA care cheltuie în România</h2>
              <p className="text-sm text-ink-500 mb-4">FY2026 (Oct 2025 – Sep 2026), date USASpending.gov filtrate pe loc de execuție = România.</p>
              <div className="border border-ink-100 rounded-lg overflow-hidden bg-white mb-4">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-xs uppercase tracking-widest text-ink-500 font-medium">
                    <tr>
                      <th className="px-4 py-2.5">#</th>
                      <th className="px-4 py-2.5">Agenție</th>
                      <th className="px-4 py-2.5 text-right">Total awards FY2026</th>
                      <th className="px-4 py-2.5 text-right">% din total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.agencies.map((a, i) => (
                      <tr key={a.agency} className="border-t border-ink-100">
                        <td className="px-4 py-2.5 mono text-xs text-ink-500">{i + 1}</td>
                        <td className="px-4 py-2.5 text-ink-900 font-medium">{a.agency}</td>
                        <td className="px-4 py-2.5 text-right num font-medium">{fmtUsd(a.amount)}</td>
                        <td className="px-4 py-2.5 text-right num text-xs text-ink-500">{u.total > 0 ? ((a.amount / u.total) * 100).toFixed(1) : "—"}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {agencyChartData.length > 1 && (
                <CompanyComparisonBar data={agencyChartData} unit="USD" divisor={1_000_000} title="Top agenții (USD millions)" />
              )}
            </section>
          )}

          {/* RECENT AWARDS */}
          {u.recentAwards.length > 0 && (
            <section className="mb-12">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Top awards individuale recente</h2>
              <p className="text-sm text-ink-500 mb-4">Mostră de contracte federale, sortate descrescător după valoare. Pentru detalii complete vezi USASpending.gov cu Award ID-ul de mai jos.</p>
              <div className="border border-ink-100 rounded-lg overflow-hidden bg-white">
                <table className="w-full text-sm">
                  <thead className="bg-ink-50 text-left text-xs uppercase tracking-widest text-ink-500 font-medium">
                    <tr>
                      <th className="px-4 py-2.5">Recipient</th>
                      <th className="px-4 py-2.5">Agenție</th>
                      <th className="px-4 py-2.5 text-right">Sumă</th>
                      <th className="px-4 py-2.5">Action date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {u.recentAwards.slice(0, 15).map((a, i) => (
                      <tr key={i} className="border-t border-ink-100">
                        <td className="px-4 py-2.5 text-xs">{a.recipient}</td>
                        <td className="px-4 py-2.5 text-xs text-ink-700">{a.agency}</td>
                        <td className="px-4 py-2.5 text-right num font-medium">{a.amount >= 1_000_000 ? fmtUsd(a.amount) : fmtUsdK(a.amount)}</td>
                        <td className="px-4 py-2.5 num text-xs text-ink-500">{a.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* DOD RSS */}
          {w.dod.announcements.length > 0 && (
            <section className="mb-12">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Pipeline DoD recent — anunțuri RSS</h2>
              <p className="text-sm text-ink-500 mb-4">
                Departamentul Apărării al SUA publică zilnic un feed RSS cu toate contractele federale &gt;$7,5M.
                Mostră a celor mai recente {w.dod.announcements.length} anunțuri (din total {w.dod.totalRecent} colectate). Unele pot avea relevanță pentru România prin componenta supply-chain.
              </p>
              <div className="border border-ink-100 rounded-lg overflow-hidden bg-white">
                <ul className="divide-y divide-ink-100">
                  {w.dod.announcements.slice(0, 10).map((a, i) => (
                    <li key={i} className="px-4 py-3 text-sm flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1 min-w-0">
                        {a.link ? (
                          <a href={a.link} target="_blank" rel="noopener" className="text-ink-900 hover:text-uzx-orange transition-colors">
                            {a.title}
                          </a>
                        ) : (
                          <span className="text-ink-900">{a.title}</span>
                        )}
                      </div>
                      <span className="num text-xs text-ink-400 shrink-0">{a.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* NSPA */}
          <section className="mb-12 bg-ink-50 rounded-lg p-6">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">NSPA — NATO Support and Procurement Agency</h2>
            <div className="serif text-4xl text-uzx-blue num mb-1">{w.nato.nspaOpenOpportunities}</div>
            <p className="text-sm text-ink-600">oportunități contractare NATO deschise în feed-ul oficial NSPA. Firmele românești pot aplica direct prin platforma NSPA.</p>
            <p className="text-xs text-ink-500 mt-3">Acces direct: <a href="https://eportal.nspa.nato.int/eProcurement/FBO/" target="_blank" rel="noopener" className="text-uzx-blue hover:text-uzx-orange underline underline-offset-2">eportal.nspa.nato.int/eProcurement/FBO</a></p>
          </section>

          {/* METHODOLOGY */}
          <section className="border-t border-ink-100 pt-10 mb-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="prose-newsroom text-[15px]">
              <p>
                Datele USASpending.gov sunt accesate prin endpoint-ul oficial <code>api.usaspending.gov/api/v2/search/spending_by_award</code>, filtrat pe <code>place_of_performance.country = ROU</code> și <code>award_type_codes = [A, B, C, D]</code> (contracte federale standard). Anul fiscal SUA (FY2026) acoperă perioada 1 octombrie 2025 — 30 septembrie 2026.
              </p>
              <p>
                Anunțurile DoD provin din feed-ul RSS public <code>defense.gov/News/Contracts</code> (toate contractele federale &gt;$7,5M anunțate zilnic). Nu toate au relevanță pentru România — interpretarea anunțurilor specifice necesită lectură caz-cu-caz.
              </p>
              <p>
                NSPA expune oportunitățile printr-un feed XML public <code>eportal.nspa.nato.int/eProcurement/FBO/Production/RSSFeed/RssFeed.xml</code> — colectat săptămânal de pipeline-ul Newsroom UZINEX.
              </p>
            </div>
          </section>

          <section className="bg-ink-50 rounded-lg p-5">
            <h3 className="serif text-lg tracking-tight text-ink-900 mb-3">Citare oficială</h3>
            <div className="flex items-center justify-between gap-3 text-sm">
              <code className="mono text-xs text-ink-700 break-all">UZINEX Newsroom (2026). Cheltuielile federale SUA în România FY2026. https://uzinex.ro/newsroom/lume/sua-in-romania</code>
              <CopyButton value={`UZINEX Newsroom (2026). Cheltuielile federale SUA în România FY2026. https://uzinex.ro/newsroom/lume/sua-in-romania`} label="Copiază" />
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function ErrorPage() {
  return (
    <>
      <Header solid />
      <main className="container-x py-14"><p className="text-center text-ink-500">Datele globale nu sunt încă disponibile.</p></main>
      <Footer />
    </>
  );
}
