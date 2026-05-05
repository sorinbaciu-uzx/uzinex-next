import Link from "next/link";
import type { Metadata } from "next";
import { loadCompanies } from "@/lib/newsroom/companies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Firme industriale strategice — profile complete | Newsroom UZINEX",
  description:
    "14 firme industriale non-echipamente urmărite în Newsroom UZINEX: bilanțuri ANAF 2019-2025 + dosare comerciale portal.just.ro. Petrol/gaz, metalurgie, ciment, chimie, farma, energie nucleară.",
  alternates: { canonical: "/admin/newsroom/firme" },
};

function fmtNum(v: number, divisor = 1, suffix = "") {
  return (v / divisor).toLocaleString("ro-RO", { maximumFractionDigits: 2 }) + suffix;
}

export default function FirmeIndexPage() {
  const companies = loadCompanies();
  const sorted = [...companies].sort((a, b) => {
    const aT = a.financials.anaf_company_turnover?.slice(-1)[0]?.value || 0;
    const bT = b.financials.anaf_company_turnover?.slice(-1)[0]?.value || 0;
    return bT - aT;
  });

  // Group by sector
  const bySector = sorted.reduce<Record<string, typeof sorted>>((acc, c) => {
    (acc[c.sectorLabel] ||= []).push(c);
    return acc;
  }, {});

  return (
    <>
      
      <div>
        <div className="max-w-5xl mx-auto space-y-10 pb-10">
          <header>
            <Link href="/admin/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Newsroom</Link>
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mt-3 mb-2">Profile firme</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 mb-3">14 firme industriale strategice — date complete</h1>
            <p className="text-lg text-ink-600 leading-relaxed max-w-3xl">
              Bilanțuri ANAF 2019-2025 (cifră de afaceri, profit net, angajați) + dosare comerciale portal.just.ro pentru fiecare firmă din 7 sectoare industriale non-echipamente. Click pe oricare → profil complet cu charts și ședințe recente.
            </p>
          </header>

          <div className="border border-ink-100 rounded-lg p-5 bg-uzx-blue/5 text-sm leading-relaxed">
            <strong className="text-ink-900">Notă metodologică:</strong> Datele provin din endpoint-uri publice oficiale — ANAF prin demoanaf.ro și SOAP <code className="mono text-xs">portalquery.just.ro/query.asmx</code>. Numărul dosarelor afișat este capat la 1000 per query (limita SOAP); valoarea reală poate fi mai mare pentru firmele mari. Ședințele includ doar perioada 2025-2026.
          </div>

          {Object.entries(bySector).map(([sector, list]) => (
            <section key={sector}>
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">{sector}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {list.map((c) => {
                  const turnover = c.financials.anaf_company_turnover?.slice(-1)[0];
                  const profit = c.financials.anaf_company_net_profit?.slice(-1)[0];
                  const employees = c.financials.anaf_company_employees?.slice(-1)[0];
                  return (
                    <Link
                      key={c.cui}
                      href={`/admin/newsroom/firme/${c.cui}`}
                      className="block border border-ink-100 rounded-lg p-5 bg-white hover:border-uzx-blue transition-colors group"
                    >
                      <div className="font-medium text-ink-900 group-hover:text-uzx-blue mb-1">{c.name}</div>
                      <div className="text-xs mono text-ink-400 mb-3">CUI {c.cui}</div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-ink-500 uppercase tracking-wider mb-0.5">Cifră afaceri</div>
                          <div className="num text-ink-900 font-medium text-base">
                            {turnover ? fmtNum(turnover.value, 1_000_000_000, " mld RON") : "—"}
                          </div>
                          {turnover && <div className="text-ink-400 num">({turnover.year})</div>}
                        </div>
                        <div>
                          <div className="text-ink-500 uppercase tracking-wider mb-0.5">Profit net</div>
                          <div className="num text-ink-900 font-medium text-base">
                            {profit ? fmtNum(profit.value, 1_000_000, " mil RON") : "—"}
                          </div>
                          {profit && <div className="text-ink-400 num">({profit.year})</div>}
                        </div>
                        <div>
                          <div className="text-ink-500 uppercase tracking-wider mb-0.5">Angajați</div>
                          <div className="num text-ink-900 font-medium text-base">
                            {employees ? fmtNum(employees.value) : "—"}
                          </div>
                        </div>
                        <div>
                          <div className="text-ink-500 uppercase tracking-wider mb-0.5">Dosare comerciale</div>
                          <div className="num text-uzx-orange font-medium text-base">
                            {c.court.dosareCount}{c.court.dosareCount >= 1000 ? "+" : ""}
                          </div>
                          <div className="text-ink-400 num">{c.court.recentHearings} ședințe ultimele 12 luni</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
      
    </>
  );
}
