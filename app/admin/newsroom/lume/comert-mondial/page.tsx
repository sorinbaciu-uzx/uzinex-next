import Link from "next/link";
import type { Metadata } from "next";
import { loadWorld } from "@/lib/newsroom/world";
import { MultiLineChart } from "@/components/newsroom/MultiLineChart";
import { CopyButton } from "@/components/newsroom/CopyButton";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Comerțul exterior al României 2024 — UN Comtrade + World Bank | Newsroom UZINEX",
  description:
    "Date oficiale UN Comtrade și World Bank pentru exporturile și importurile României. Pondere comerțului în PIB, comparație cu Polonia, Ungaria, Cehia, Germania.",
  alternates: { canonical: "/admin/newsroom/lume/comert-mondial" },
};

const fmtMld = (v: number) => `${(v / 1_000_000_000).toLocaleString("ro-RO", { maximumFractionDigits: 1 })} mld`;

export default function ComertMondialPage() {
  const w = loadWorld();
  if (!w) return <ErrorPage />;

  const labels = w.countryLabels;
  const series = (data: typeof w.worldbank.exports_share_gdp) =>
    Object.entries(data)
      .filter(([, points]) => points.length > 0)
      .map(([country, points]) => ({ country, label: labels[country] || country, data: points }));

  const c = w.comtrade;
  const roExportShare = w.worldbank.exports_share_gdp.ROU?.slice(-1)[0];
  const roFdiShare = w.worldbank.fdi_share_gdp.ROU?.slice(-1)[0];

  return (
    <>
      
      <div>
        <article className="max-w-4xl mx-auto pb-20">
          <Link href="/admin/newsroom/lume" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Perspective globale</Link>

          <header className="mt-6 mb-10">
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">UN Comtrade · World Bank · Eurostat</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Comerțul exterior al României — UN Comtrade 2024 + context macro</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              Datele oficiale UN Comtrade pentru reporter ROU în 2024, plus pondere a comerțului în PIB și investiții străine directe (FDI) ca % din PIB pentru România și vecinii regionali — World Bank Open Data.
            </p>
          </header>

          {/* HERO */}
          <section className="border-y border-ink-100 py-10 mb-10">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mb-2">Export 2024</div>
                <div className="serif text-5xl md:text-6xl text-uzx-orange num">{c.totalExport > 0 ? fmtMld(c.totalExport) : "în așteptare"}</div>
                <div className="text-xs text-ink-400 mt-1">{c.totalExport > 0 ? "USD, UN Comtrade" : "necesită COMTRADE_API_KEY"}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">Import 2024</div>
                <div className="serif text-5xl md:text-6xl text-ink-900 num">{c.totalImport > 0 ? fmtMld(c.totalImport) : "în așteptare"}</div>
                <div className="text-xs text-ink-400 mt-1">{c.totalImport > 0 ? "USD, UN Comtrade" : "necesită COMTRADE_API_KEY"}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-ink-500 mb-2">Pondere export în PIB</div>
                <div className="serif text-5xl md:text-6xl text-ink-900 num">{roExportShare?.value.toFixed(1) ?? "—"}%</div>
                <div className="text-xs text-ink-400 mt-1">{roExportShare?.year ?? ""}, World Bank</div>
              </div>
            </div>
            {(c.totalExport === 0 || c.totalImport === 0) && (
              <div className="mt-6 max-w-2xl mx-auto bg-amber-50 border-l-4 border-amber-400 p-4 text-sm text-amber-900 rounded-r">
                <strong>Notă transparență:</strong> Tier-ul gratuit UN Comtrade returnează numărul de înregistrări (446 pentru reporter ROU, an 2024), dar fără descrierea fluxului (export/import) și fără partener — agregarea totalurilor este imposibilă fără cheie API plătită. Decizia editorială UZINEX: NU publicăm cifre sintetice (precum „473 mld USD" generate prin sumarea coloanelor null). Pentru date utilizabile, vezi pondere export în PIB de la World Bank (coloana 3) — sursa primară pentru analize macro.
              </div>
            )}
          </section>

          {/* EXPORTS SHARE GDP */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Pondere a exporturilor în PIB — 2010-2024</h2>
            <p className="text-sm text-ink-500 mb-4">World Bank indicator <code className="mono">NE.EXP.GNFS.ZS</code>. România vs vecini.</p>
            <MultiLineChart series={series(w.worldbank.exports_share_gdp)} unit="%" height={300} />
          </section>

          {/* FDI SHARE */}
          <section className="mb-12">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Investiții străine directe (FDI) ca % din PIB</h2>
            <p className="text-sm text-ink-500 mb-4">World Bank indicator <code className="mono">BX.KLT.DINV.WD.GD.ZS</code>. Indicator al atractivității economiilor pentru capitalul extern.</p>
            <MultiLineChart series={series(w.worldbank.fdi_share_gdp)} unit="%" height={300} />
            {roFdiShare && (
              <p className="text-sm text-ink-600 mt-3">
                Cea mai recentă valoare pentru România: <strong className="text-ink-900">{roFdiShare.value.toFixed(2)}%</strong> ({roFdiShare.year}).
              </p>
            )}
          </section>

          {/* METHODOLOGY */}
          <section className="border-t border-ink-100 pt-10 mb-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="prose-newsroom text-[15px]">
              <p>
                Datele UN Comtrade provin din endpoint-ul oficial <code>comtradeapi.un.org/public/v1/preview/C/A/HS</code>, filtrat pe <code>reporterCode=642</code> (România), <code>period=2024</code>, <code>partnerCode=0</code> (lume), <code>flowCode=M,X</code> (importuri și exporturi). <strong>Important:</strong> tier-ul gratuit returnează doar numărul de înregistrări (count); coloanele <code>flowDesc</code> și <code>partnerDesc</code> vin null, iar <code>primaryValue</code> reflectă slice-uri parțiale, nu agregate world TOTAL. Pentru cifre publicabile, este nevoie de cheie API plătită (variabila de mediu <code>COMTRADE_API_KEY</code>). Politica UZINEX: <strong>nu publicăm cifre derivate prin agregare nesigură</strong> — preferăm tăcerea unei cifre lipsă față de o cifră greșită.
              </p>
              <p>
                Datele World Bank Open Data sunt accesate prin <code>api.worldbank.org/v2/country/[ISO]/indicator/[CODE]?format=json</code>. Pentru această pagină folosim:
              </p>
              <ul>
                <li><code>NE.EXP.GNFS.ZS</code> — exporturi de bunuri și servicii (% din PIB)</li>
                <li><code>BX.KLT.DINV.WD.GD.ZS</code> — FDI net inflows (% din PIB)</li>
                <li><code>NV.IND.MANF.ZS</code> — pondere industria prelucrătoare în PIB (vezi <Link href="/admin/newsroom/firme">/newsroom/firme</Link>)</li>
              </ul>
              <p>
                <strong>Limitări:</strong> Comtrade poate avea decalaj de 6-12 luni între raportarea statului și disponibilitatea în baza de date globală. World Bank actualizează majoritatea indicatorilor anual cu lag de 12-18 luni — ultimul an disponibil pentru majoritatea indicatorilor este 2024.
              </p>
            </div>
          </section>

          <section className="bg-ink-50 rounded-lg p-5">
            <h3 className="serif text-lg tracking-tight text-ink-900 mb-3">Citare oficială</h3>
            <div className="flex items-center justify-between gap-3 text-sm">
              <code className="mono text-xs text-ink-700 break-all">UZINEX Newsroom (2026). Comerțul exterior al României — UN Comtrade 2024. https://uzinex.ro/newsroom/lume/comert-mondial</code>
              <CopyButton value={`UZINEX Newsroom (2026). Comerțul exterior al României — UN Comtrade 2024. https://uzinex.ro/newsroom/lume/comert-mondial`} label="Copiază" />
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
