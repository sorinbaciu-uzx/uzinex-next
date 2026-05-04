import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CopyButton } from "@/components/newsroom/CopyButton";
import { loadManifest } from "@/lib/newsroom/data";
import { loadCompanies } from "@/lib/newsroom/companies";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Press Center — pentru jurnaliști | Newsroom UZINEX",
  description:
    "Resurse pentru presă: bio Sorin Baciu, politica de citare, logo download, calendar editorial Newsroom UZINEX, contact pentru interviu, embed code pentru grafice și API public.",
  alternates: { canonical: "/newsroom/press" },
};

export default function PressCenterPage() {
  const manifest = loadManifest();
  const companies = loadCompanies();

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <div className="max-w-4xl mx-auto pb-20 space-y-12">
          <header>
            <Link href="/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Newsroom</Link>
            <div className="text-xs uppercase tracking-widest text-uzx-orange font-medium mt-3 mb-2">Press Center</div>
            <h1 className="serif text-4xl md:text-5xl tracking-tight text-ink-900 leading-[1.05] mb-4">Pentru jurnaliști — resurse complete</h1>
            <p className="text-lg text-ink-600 leading-relaxed">
              Newsroom UZINEX este o redacție digitală de date economice cu unghi industrial.
              Toate datele de pe site sunt accesibile gratuit, citabile cu credit, descărcabile ca CSV/JSON.
              Pentru întrebări, comentariu pe story-uri sau acces avansat, contactează-ne direct.
            </p>
          </header>

          {/* QUICK STATS */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Stat label="Surse oficiale" value="90" sublabel={`${manifest.counts.sources}+ înregistrate`} />
            <Stat label="Insights publicate" value={String(manifest.counts.insights)} sublabel="dedupe automat" />
            <Stat label="Firme tracked" value={String(companies.length)} sublabel="bilanțuri ANAF" />
            <Stat label="Story-uri" value={String(manifest.counts.stories)} sublabel="cu Press Kit ZIP" accent />
          </section>

          {/* CONTACT */}
          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Contact pentru presă</h2>
            <div className="bg-ink-900 text-white rounded-lg p-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-uzx-orange mb-2 font-medium">Spokesperson principal</div>
                  <h3 className="serif text-2xl tracking-tight mb-1">Sorin Baciu</h3>
                  <div className="text-white/70 text-sm mb-4">Director General UZINEX SC GW LASER TECHNOLOGY SRL</div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    Inginer cu peste 15 ani de experiență în industria distribuției de echipamente industriale (CNC, laser, sudură, robotizare). Lider al UZINEX, integrator industrial cu sediul în Iași.
                    Disponibil pentru comentariu pe subiecte de industrie românească comparativă, achiziții publice industriale, importuri de echipamente, lanțuri de aprovizionare defense.
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <div><a href="mailto:sorin.baciu@uzinex.ro" className="text-uzx-orange hover:underline">sorin.baciu@uzinex.ro</a></div>
                    <div><a href="tel:+40769081081" className="text-uzx-orange hover:underline">+40 769 081 081</a></div>
                    <div className="text-white/50 text-xs mt-2">Disponibilitate &lt;24h pentru telefonic / TV / podcast</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-lg p-5">
                  <div className="text-xs uppercase tracking-widest text-white/60 mb-2 font-medium">Programare interviu</div>
                  <p className="text-sm text-white/80 leading-relaxed mb-4">
                    Pentru un slot de 30 minute (telefonic, video sau în persoană la sediul UZINEX din Iași Tehnopolis), trimite email cu intervalul preferat și subiectul.
                  </p>
                  <a
                    href="mailto:sorin.baciu@uzinex.ro?subject=Cerere%20interviu%20-%20Newsroom%20UZINEX&body=Subiect:%20%0A%0AInterval%20preferat:%20%0A%0APublicație:%20"
                    className="block bg-uzx-orange text-white text-sm font-medium px-4 py-2.5 rounded text-center hover:bg-uzx-orange2 transition"
                  >
                    Trimite email pentru interviu
                  </a>
                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/60 leading-relaxed">
                    <strong className="text-white/80">Răspuns garantat:</strong> primă confirmare în 4 ore lucrătoare. Slot programat în maximum 24h.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CITATION POLICY */}
          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Politica de citare</h2>
            <div className="prose-newsroom text-[15px]">
              <p>
                <strong>Toate datele de pe Newsroom UZINEX sunt liber de utilizat</strong> de către presa de specialitate, cu cerința minimă de a cita sursa.
                Nu există paywall, nu există tracking, nu există restricții pe redistribuire.
              </p>
              <p>Format minim acceptat de citare:</p>
            </div>
            <div className="mt-4 space-y-3">
              <CitationRow
                label="HTML — pentru articol web (cel mai folosit)"
                value={`<a href="https://uzinex.ro/newsroom" rel="noopener">Sursă: UZINEX Newsroom</a>`}
              />
              <CitationRow label="Text simplu" value="Sursă: UZINEX Newsroom — https://uzinex.ro/newsroom" />
              <CitationRow
                label="APA Style"
                value="UZINEX Newsroom (2026). [Titlul story-ului]. Newsroom UZINEX. https://uzinex.ro/newsroom/[slug]"
              />
            </div>
            <p className="text-sm text-ink-600 mt-4 leading-relaxed">
              Pentru republicare integrală a unui story, te rugăm să ne anunți printr-un email scurt — nu pentru permisiune (e implicită), ci pentru a putea include articolul tău în secțiunea „Au scris despre noi" și pentru a transmite eventuale corecturi sau actualizări.
            </p>
          </section>

          {/* EDITORIAL CALENDAR */}
          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Calendar editorial</h2>
            <p className="text-sm text-ink-500 mb-4">Următoarele subiecte planificate. Datele sunt indicative — confirmate cu 48h înainte de publicare.</p>
            <div className="border border-ink-100 rounded-lg overflow-hidden bg-white">
              <ul className="divide-y divide-ink-100">
                <CalendarEntry
                  date="Săptămâna 19 (4-10 mai)"
                  status="published"
                  title="Industria strategică a României: 14 firme, 7 sectoare"
                  href="/newsroom/stories/bilantul-firmelor-industriale-strategice-romania-2019-2025"
                  sources={["ANAF", "Eurostat", "World Bank"]}
                />
                <CalendarEntry
                  date="Săptămâna 19 (4-10 mai)"
                  status="published"
                  title="5.433 dosare comerciale la 14 firme industriale strategice"
                  href="/newsroom/stories/5433-dosare-firme-industriale-portal-just-ro"
                  sources={["portal.just.ro", "ANAF"]}
                />
                <CalendarEntry
                  date="Săptămâna 20 (11-17 mai)"
                  status="planned"
                  title="Datoria publică RO va atinge 70% din PIB în 2030 — analiza IMF + impact pentru investiții publice"
                  sources={["IMF", "Eurostat", "World Bank"]}
                />
                <CalendarEntry
                  date="Săptămâna 21 (18-24 mai)"
                  status="planned"
                  title="Defense supply chain RO: $58M cheltuieli federale SUA + pipeline NSPA NATO"
                  sources={["USASpending", "DoD RSS", "NSPA"]}
                />
                <CalendarEntry
                  date="Săptămâna 22 (25-31 mai)"
                  status="planned"
                  title="Top contracte SEAP în Q1 2026 — concentrarea câștigătorilor pe sectoare critice"
                  sources={["TED Europa", "ANAF", "ONRC (planificat)"]}
                />
                <CalendarEntry
                  date="Săptămâna 23 (1-7 iunie)"
                  status="planned"
                  title="Comerțul mondial al României 2024 — UN Comtrade & World Bank"
                  sources={["UN Comtrade", "World Bank"]}
                />
              </ul>
            </div>
            <p className="text-xs text-ink-500 mt-3">Pentru a fi notificat când se publică un story dintr-un calendar, trimite email la <a href="mailto:sorin.baciu@uzinex.ro" className="text-uzx-blue hover:text-uzx-orange">sorin.baciu@uzinex.ro</a> cu subjectul <em>„Newsletter Newsroom"</em>.</p>
          </section>

          {/* WHO CITED US */}
          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Au scris despre datele noastre</h2>
            <div className="border border-dashed border-ink-200 rounded-lg p-6 text-center text-ink-500">
              <p className="text-sm mb-2">Newsroom-ul a fost lansat în mai 2026.</p>
              <p className="text-xs">Această secțiune va lista publicațiile care preiau și citează datele noastre — pe măsură ce primim notificări sau identificăm citările.</p>
            </div>
          </section>

          {/* RESOURCES */}
          <section>
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Resurse descărcabile</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <ResourceCard
                title="Logo UZINEX"
                description="SVG vectorial pentru imprimare și web. Folosește varianta color pe fundal alb."
                href="/logo.svg"
                cta="Descarcă logo SVG"
              />
              <ResourceCard
                title="Foto Sorin Baciu"
                description="Foto profil pentru articole de presă. Trimite cerere prin email pentru fișiere high-res."
                href="mailto:sorin.baciu@uzinex.ro?subject=Cerere%20foto%20press"
                cta="Cere foto high-res"
              />
              <ResourceCard
                title="API public REST"
                description="Endpoint /api/newsroom/insights/[id]/data.csv pentru fiecare insight. Press Kit ZIP per story."
                href="/newsroom/lume"
                cta="Vezi documentație"
              />
              <ResourceCard
                title="Bio Sorin Baciu"
                description="Text scurt + lung pentru atribuire în articole."
                href="#bio"
                cta="Copiază bio"
              />
            </div>
          </section>

          {/* BIO */}
          <section id="bio" className="bg-ink-50 rounded-lg p-6">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-4">Bio Sorin Baciu — pentru atribuire</h2>
            <div className="space-y-4">
              <BioBlock
                label="Versiune scurtă (100 caractere)"
                text="Sorin Baciu — Director General UZINEX SC GW LASER TECHNOLOGY SRL, integrator industrial Iași."
              />
              <BioBlock
                label="Versiune medie (300 caractere)"
                text="Sorin Baciu este Director General al UZINEX (SC GW LASER TECHNOLOGY SRL), integrator industrial cu sediul în Iași Tehnopolis. Conduce o firmă specializată în distribuția de echipamente CNC, laser, sudură și robotizare pentru industria românească."
              />
              <BioBlock
                label="Versiune extinsă (600 caractere)"
                text="Sorin Baciu este Director General al UZINEX (SC GW LASER TECHNOLOGY SRL), integrator industrial cu sediul în Parcul Științific Iași Tehnopolis. UZINEX distribuie peste 180 de echipamente industriale (CNC, laser fibră, sudură, robotizare colaborativă, mașini-unelte) către clienți din sectorul privat, instituțiile publice și apărare. În 2026 a lansat Newsroom UZINEX, o redacție digitală de date economice cu unghi industrial care agregă date din peste 90 de surse oficiale și publică săptămânal analize cu cifre verificabile pentru presa de specialitate."
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, sublabel, accent }: { label: string; value: string; sublabel?: string; accent?: boolean }) {
  return (
    <div className={`border rounded-lg p-4 bg-white ${accent ? "border-uzx-orange/30 bg-uzx-orange/5" : "border-ink-100"}`}>
      <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">{label}</div>
      <div className={`serif text-3xl tracking-tight mt-1 num ${accent ? "text-uzx-orange" : "text-ink-900"}`}>{value}</div>
      {sublabel && <div className="text-xs text-ink-500 mt-1">{sublabel}</div>}
    </div>
  );
}

function CitationRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink-100 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">{label}</div>
        <CopyButton value={value} label="Copiază" />
      </div>
      <code className="mono text-xs text-ink-700 break-all whitespace-pre-wrap leading-relaxed">{value}</code>
    </div>
  );
}

function CalendarEntry({ date, status, title, href, sources }: { date: string; status: "published" | "planned"; title: string; href?: string; sources: string[] }) {
  const inner = (
    <div className="px-4 py-3.5 hover:bg-ink-50/60 transition-colors">
      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase ${status === "published" ? "bg-uzx-orange text-white" : "bg-ink-100 text-ink-700"}`}>
            {status === "published" ? "publicat" : "planificat"}
          </span>
          <span className="text-xs text-ink-500 num">{date}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {sources.map((s) => (
            <span key={s} className="bg-ink-50 text-ink-700 px-1.5 py-0.5 rounded mono text-[10px]">{s}</span>
          ))}
        </div>
      </div>
      <div className={`text-sm leading-snug ${status === "published" ? "text-ink-900 font-medium" : "text-ink-700"}`}>{title}</div>
    </div>
  );
  return (
    <li>{href ? <Link href={href}>{inner}</Link> : inner}</li>
  );
}

function ResourceCard({ title, description, href, cta }: { title: string; description: string; href: string; cta: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  const inner = (
    <div className="border border-ink-100 rounded-lg p-4 bg-white hover:border-uzx-blue transition-colors h-full">
      <div className="font-medium text-ink-900 mb-1">{title}</div>
      <p className="text-xs text-ink-600 mb-3 leading-relaxed">{description}</p>
      <div className="text-xs text-uzx-orange font-medium">{cta} →</div>
    </div>
  );
  return isExternal ? <a href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener">{inner}</a> : <Link href={href}>{inner}</Link>;
}

function BioBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="bg-white border border-ink-100 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">{label}</div>
        <CopyButton value={text} label="Copiază" />
      </div>
      <p className="text-sm text-ink-800 leading-relaxed">{text}</p>
    </div>
  );
}
