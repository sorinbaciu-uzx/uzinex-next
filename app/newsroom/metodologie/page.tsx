import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { loadCompanies } from "@/lib/newsroom/companies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Metodologie — cum lucrăm cu datele | Newsroom UZINEX",
  description:
    "Explicații complete despre criteriile de selecție, sursele oficiale folosite, threshold-urile algoritmilor de detecție anomalii, frecvența de update și limitări metodologice ale Newsroom UZINEX.",
  alternates: { canonical: "/newsroom/metodologie" },
};

export default function MetodologiePage() {
  const companies = loadCompanies();

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <div className="max-w-3xl mx-auto pb-20 space-y-10">
          <header>
            <Link href="/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Newsroom</Link>
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mt-3 mb-2">Metodologie</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Cum lucrăm cu datele — criterii, threshold-uri, limitări</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              Această pagină documentează exhaustiv criteriile de selecție, parametrii algoritmilor și limitele cunoscute ale pipeline-ului Newsroom UZINEX. Tot codul-sursă rulează local; datele de pe site sunt regenerate săptămânal.
            </p>
          </header>

          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">1. De ce „14 firme industriale strategice"?</h2>
            <div className="prose-newsroom text-[15px]">
              <p>Lista de {companies.length} firme tracked nu este aleatoare. A fost construită cu următoarele criterii:</p>
              <ol>
                <li><strong>Sector industrial non-echipamente</strong> — UZINEX vinde echipamente industriale și nu vrem să tracking-uim concurenți direcți. De aceea sunt excluse: distribuitorii de CNC, laser, sudură, robotizare, mașini-unelte.</li>
                <li><strong>Relevanță macro</strong> — firme care apar în clasamentul „Marii Contribuabili" la ANAF sau cu cifră de afaceri &gt;100 milioane RON anual.</li>
                <li><strong>7 sectoare distincte</strong> — pentru a asigura diversitate sectorială (petrol, rafinare, metalurgie oțel, metalurgie aluminiu, ciment, chimie/îngrășăminte, farma, energie nucleară, transport gaz, energie retail).</li>
                <li><strong>Date ANAF disponibile prin demoanaf.ro</strong> — limită tehnică: 7 din 14 firme au bilanțuri complete pe 6 ani; restul au date parțiale.</li>
                <li><strong>Status legal — funcțiune</strong> — exclusele sunt firmele radiate sau aflate în lichidare definitivă.</li>
              </ol>
              <p>
                <strong>De ce Liberty Galați și nu ArcelorMittal Galați?</strong> Liberty a preluat combinatul Galați de la ArcelorMittal în 2019. Combinatul ArcelorMittal Hunedoara este o entitate separată, mai mică, și e inclus separat.
              </p>
              <p>
                <strong>De ce Antibiotice și Biofarm și nu Zentiva sau Terapia?</strong> Zentiva România este sucursală a unei firme cehe (Zentiva International A.S. Hlohovec). Antibiotice Iași și Biofarm București sunt singurii producători 100% românești listați la BVB cu date publice complete.
              </p>
              <p>
                Lista nu este definitivă — propune adăugări sau corecții la <a href="mailto:sorin.baciu@uzinex.ro">sorin.baciu@uzinex.ro</a>.
              </p>
            </div>
          </section>

          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">2. Detecția anomaliilor — threshold și calibrare</h2>
            <div className="prose-newsroom text-[15px]">
              <p>Newsroom rulează detectoare automate săptămânal pentru patru tipuri de pattern-uri:</p>
              <ul>
                <li><strong>Anomaly</strong> (z-score) — abateri statistice pe serii temporale (ex. EUR/RON față de media celor 30 sesiuni anterioare).</li>
                <li><strong>Trend</strong> (YoY) — variații an la an pe indicatori (ex. producția industrială Eurostat).</li>
                <li><strong>Ranking</strong> — clasamente cross-country sau cross-firm pe ultimul an disponibil.</li>
                <li><strong>Cross-reference</strong> — agregări care combină multiple surse (ex. licitații TED per țară regiune).</li>
              </ul>
              <p>
                <strong>Threshold pentru anomalii statistice:</strong> <code>|z-score| &gt; 3,0</code> — corespunde unei probabilități &lt;0,3% în ipoteza distribuție normală.
                Inițial folosisem <code>|z| &gt; 1,5</code>, dar la acel prag generam multe false positives (piața valutară românească e volatilă natural). 3σ filtrează doar evenimentele genuine atipice.
              </p>
              <p>
                <strong>Limitări recunoscute:</strong>
              </p>
              <ul>
                <li>Distribuția normală este o ipoteză — în realitate, returnurile valutare au cozile mai grele. Z-score subestimează probabilitatea evenimentelor extreme.</li>
                <li>Fereastra mobilă de 30 sesiuni înseamnă că aceeași zi poate avea z-score diferit la o săptămână distanță. Pe site dedupe-uim per (metric × dată), păstrând cea mai recentă evaluare.</li>
                <li>Pentru o evaluare mai robustă a outlier-ilor, Modified Z-Score (mediana + MAD) este alternativă serioasă — evaluăm migrarea la acest algoritm în versiunea v2 a pipeline-ului.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">3. Sursele oficiale folosite — frecvență și freshness</h2>
            <div className="prose-newsroom text-[15px]">
              <p>Toate datele provin din endpoint-uri publice oficiale. Frecvența de update este săptămânală (luni dimineața) sau la cerere.</p>
            </div>
            <div className="border border-ink-100 rounded-lg overflow-hidden bg-white mt-4">
              <table className="w-full text-sm">
                <thead className="bg-ink-50 text-left text-xs uppercase tracking-widest text-ink-500 font-medium">
                  <tr>
                    <th className="px-4 py-2.5">Sursă</th>
                    <th className="px-4 py-2.5">Endpoint</th>
                    <th className="px-4 py-2.5">Freshness</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["BNR", "bnr.ro/nbrfxrates.xml", "Zilnică (T+0)"],
                    ["ANAF", "demoanaf.ro/api/company/{cui}/financials", "Anuală (bilanțuri)"],
                    ["portal.just.ro", "portalquery.just.ro/query.asmx (SOAP)", "Live"],
                    ["Eurostat", "ec.europa.eu/eurostat/api", "Lunară"],
                    ["IMF", "imf.org/external/datamapper/api/v1", "Bi-anuală (April + Oct WEO)"],
                    ["World Bank", "api.worldbank.org/v2", "Anuală"],
                    ["TED Europa", "api.ted.europa.eu/v3", "Live"],
                    ["USASpending.gov", "api.usaspending.gov/api/v2", "Lunară"],
                    ["UN Comtrade", "comtradeapi.un.org/public/v1/preview", "Anuală cu lag 6-12 luni"],
                    ["NSPA NATO", "eportal.nspa.nato.int/RssFeed.xml", "Live"],
                    ["DoD Contracts", "defense.gov/News/Contracts (RSS)", "Zilnică"],
                  ].map(([name, ep, freq]) => (
                    <tr key={name} className="border-t border-ink-100">
                      <td className="px-4 py-2.5 font-medium text-ink-900">{name}</td>
                      <td className="px-4 py-2.5 mono text-xs text-ink-600">{ep}</td>
                      <td className="px-4 py-2.5 text-xs text-ink-700">{freq}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-ink-500 mt-3">
              Pentru complete listă a celor 90 surse înregistrate (din care ~25 active live, restul în pregătire — scrapere Playwright sau API-uri plătite), vezi <Link href="/newsroom/lume" className="text-uzx-blue hover:text-uzx-orange">/newsroom/lume</Link>.
            </p>
          </section>

          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">4. Limitări metodologice — ce NU putem afirma</h2>
            <div className="prose-newsroom text-[15px]">
              <ul>
                <li><strong>Datoria publică IMF</strong> — proiecțiile pentru 2026-2031 sunt scenarii pe ipoteze de politici economice constante. Pot devia semnificativ de la realitate.</li>
                <li><strong>Bilanțuri ANAF</strong> — depuse de firme cu lag 6-9 luni. Cifrele 2025 sunt încă provizorii pentru majoritatea firmelor.</li>
                <li><strong>Dosare portal.just.ro</strong> — căutarea după nume de parte (numeParte) returnează maxim 1.000 dosare per query. Firmele mari (OMV, Liberty, Engie) saturează limita; numărul real este mai mare.</li>
                <li><strong>USASpending</strong> — anul fiscal SUA diferă de cel calendaristic (FY2026 = oct 2025 – sep 2026). Comparația cu date românești necesită reconciliere temporală.</li>
                <li><strong>UN Comtrade</strong> — lagul de 6-12 luni înseamnă că datele 2024 sunt cele mai recente. Pentru 2025 nu există încă agregare oficială.</li>
                <li><strong>Categorizarea cazurilor judiciare</strong> — algoritmul nostru clasifică cazurile în „PROPRIU", „CREDITOR" și „ALTĂ CALITATE" pe baza câmpului <code>calitateParte</code>. Heuristica nu este perfectă — un caz de anulare contravenție poate fi clasificat „ALTĂ CALITATE" deși firma e parte direct interesată.</li>
                <li><strong>Numele identice</strong> — căutarea ANAF/portal.just.ro după nume parțial poate returna entități cu denumiri similare. CUI-ul este cel mai sigur identifier.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">5. Reproducibilitate</h2>
            <div className="prose-newsroom text-[15px]">
              <p>Toate cifrele de pe Newsroom sunt verificabile independent:</p>
              <ol>
                <li>Pentru fiecare insight, butonul „Descarcă datele (CSV)" oferă seria temporală exactă folosită.</li>
                <li>Pentru fiecare firmă tracked, profilul include link spre demoanaf.ro pentru verificare ANAF.</li>
                <li>Pentru anomalii, datele lunare BNR sunt accesibile direct prin <a href="https://www.bnr.ro/nbrfxrates.xml">bnr.ro/nbrfxrates.xml</a>.</li>
                <li>Endpoint-urile SOAP/REST folosite sunt documentate la fiecare pagină în secțiunea Metodologie.</li>
              </ol>
              <p>
                Dacă identifici o cifră care nu se reproduce, scrie pe <a href="mailto:sorin.baciu@uzinex.ro">sorin.baciu@uzinex.ro</a> cu detalii — corectările publice se aplică în 24h.
              </p>
            </div>
          </section>

          <section className="bg-uzx-blue/5 border-l-4 border-uzx-blue rounded-r p-5 text-sm text-ink-800">
            <strong className="text-ink-900">Disclaimer editorial:</strong> Newsroom UZINEX este produs de UZINEX SC GW LASER TECHNOLOGY SRL, firmă activă în distribuția de echipamente industriale. Datele agregate au fost selectate cu intenția de a oferi context macro, NU de a evidenția competitori direcți sau de a face advertorial. Excluderea explicită a sectorului „echipamente industriale" din lista de firme tracked este o decizie editorială pentru a evita conflictele de interes.
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
