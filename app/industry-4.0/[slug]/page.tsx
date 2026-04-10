import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { UnboxingChecklist } from "@/components/solution-anims/UnboxingChecklist";
import { FlowchartSteps } from "@/components/solution-anims/FlowchartSteps";
import { CounterMetrics } from "@/components/solution-anims/CounterMetrics";

type SectionAnim =
  | { type: "checklist"; items: string[] }
  | { type: "flowchart"; steps: { label: string; time?: string }[]; totalTime?: string }
  | { type: "counter"; metrics: { value: number; prefix?: string; suffix?: string; label: string }[] };

type Direction = {
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  accent: string;
  heroDescription: string;
  sections: { title: string; body: string; anim?: SectionAnim }[];
  benefits: { label: string; value: string }[];
  useCases: string[];
  ctaTitle: string;
  ctaBody: string;
};

const DIRECTIONS: Direction[] = [
  {
    slug: "iiot-monitorizare",
    num: "01",
    title: "IIoT & Monitorizare Plug & Play",
    subtitle: "Digitalizare rapidă cu ROI din prima lună",
    accent: "#1e6bb8",
    heroDescription:
      "Montăm senzori inteligenți pe orice utilaj din hala ta — nou sau vechi, indiferent de brand. În câteva ore ai dashboard-ul OEE pe telefon, cu date live despre temperatură, vibrații, consum energetic și ciclu de lucru. Fără cablaje complicate, fără oprirea producției.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Kit-ul de Digitalizare Nivel 1 include senzori IIoT industriali (temperatură, vibrații triaxiale, consum energetic), gateway de comunicare LoRa/Wi-Fi, configurarea completă și un dashboard web + mobile accesibil de pe orice dispozitiv. Toate datele sunt stocate local, fără dependență de cloud extern.",
        anim: { type: "checklist", items: ["Senzori IIoT industriali", "Gateway LoRa/Wi-Fi", "Dashboard web + mobile", "Configurare completă", "Stocare date locală"] },
      },
      {
        title: "Cum funcționează",
        body: "Tehnicienii Uzinex vin la fața locului, montează senzorii pe utilajele selectate (fără găurire, fără oprire, montaj magnetic sau adeziv industrial) și configurează gateway-ul în rețeaua ta. În 2-4 ore ești online. Dashboard-ul arată OEE, timpi de staționare, alerte de prag și istoric pe 12 luni.",
        anim: { type: "flowchart", steps: [{ label: "Analiză", time: "T+0h" }, { label: "Montaj", time: "T+1h" }, { label: "Config", time: "T+2h" }, { label: "Online", time: "T+4h" }], totalTime: "2-4 ore" },
      },
      {
        title: "De ce contează pentru tine",
        body: "Fără date, deciziile se iau pe intuiție. Cu monitorizare IIoT, știi exact cât produce fiecare utilaj, unde sunt blocajele și ce echipament trebuie înlocuit sau reparat. Clienții noștri recuperează investiția în 3-6 luni doar prin reducerea timpilor de staționare.",
        anim: { type: "counter", metrics: [{ value: 47000, prefix: "€", label: "economisiți / an" }, { value: 95, suffix: "%", label: "mai puțin downtime" }, { value: 320, suffix: "%", label: "ROI în an 1" }] },
      },
    ],
    benefits: [
      { label: "Instalare", value: "2-4 ore" },
      { label: "ROI", value: "3-6 luni" },
      { label: "Compatibilitate", value: "Orice brand" },
      { label: "Stocare date", value: "Local" },
    ],
    useCases: [
      "Fabrici cu flotă mixtă de utilaje (multi-brand, multi-generație)",
      "Companii care pregătesc dosare de finanțare UE (PNRR/POIM) — monitorizarea e cerință",
      "Manageri care vor vizibilitate asupra OEE fără investiție masivă",
      "Primul pas concret în strategia de digitalizare Industry 4.0",
    ],
    ctaTitle: "Începe cu un Kit de Digitalizare",
    ctaBody: "Evaluare gratuită la fața locului + ofertă în 48h. Zero angajament.",
  },
  {
    slug: "robotica-colaborativa",
    num: "02",
    title: "Robotică colaborativă",
    subtitle: "Rezolvă lipsa de personal, nu triplezi costurile",
    accent: "#f5851f",
    heroDescription:
      "Cobotul lucrează în siguranță lângă oamenii tăi — paletizează, alimentează CNC-ul, sudează, asamblează — fără cuști de protecție masive. Integrăm branduri asiatice de top cu prețuri cu 30-40% sub distribuitorii europeni, cu instalare, programare și suport incluse.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Un braț robotic colaborativ complet integrat: selecție model pe baza aplicației tale, instalare mecanică și electrică, programare proceduri standard de mișcare, training operatori și suport tehnic post-instalare. Totul la cheie, fără surprize.",
        anim: { type: "checklist", items: ["Selecție model pe aplicație", "Instalare mecanică + electrică", "Programare proceduri mișcare", "Training operatori 2 zile", "Suport tehnic post-instalare"] },
      },
      {
        title: "Cum funcționează integrarea",
        body: "Analizăm fluxul tău de producție, identificăm operațiile repetitive sau periculoase și propunem configurația optimă. Instalarea + programarea durează 3-5 zile. Operatorii învață să lucreze cu cobotul în maxim 2 zile — interfața este intuitivă, nu necesită cunoștințe de robotică.",
        anim: { type: "flowchart", steps: [{ label: "Analiză flux", time: "Ziua 1" }, { label: "Instalare", time: "Ziua 2-3" }, { label: "Programare", time: "Ziua 4" }, { label: "Training", time: "Ziua 5" }], totalTime: "3-5 zile" },
      },
      {
        title: "De ce contează pentru tine",
        body: "Lipsa forței de muncă este realitate. Un cobot operează 24/7 fără pauze, concedii sau erori de oboseală. ROI-ul tipic este 12-18 luni. Iar cu prețurile Uzinex (30-40% sub piață), pragul de profitabilitate vine și mai repede.",
        anim: { type: "counter", metrics: [{ value: 35, suffix: "%", label: "sub prețul pieței" }, { value: 14, suffix: " luni", label: "ROI mediu" }, { value: 24, suffix: "/7", label: "funcționare non-stop" }] },
      },
    ],
    benefits: [
      { label: "Integrare", value: "3-5 zile" },
      { label: "ROI", value: "12-18 luni" },
      { label: "vs. piață", value: "-35%" },
      { label: "Training", value: "2 zile" },
    ],
    useCases: [
      "Paletizare la capăt de linie — manipulare cutii, saci, baxuri",
      "Alimentare/descărcare CNC — ciclu pick-and-place repetitiv",
      "Sudură colaborativă — operatorul fixează, cobotul sudează",
      "Asamblare componente — precizie repetabilă sub 0.1mm",
    ],
    ctaTitle: "Solicită o simulare gratuită",
    ctaBody: "Venim la tine, analizăm fluxul și îți arătăm exact cum ar funcționa cobotul pe linia ta.",
  },
  {
    slug: "mentenanta-predictiva",
    num: "03",
    title: "Mentenanță predictivă",
    subtitle: "Zero opriri neplanificate, liniște operațională totală",
    accent: "#155290",
    heroDescription:
      "Algoritmii noștri analizează datele de la senzorii IIoT și îți spun exact ce piesă va ceda și când. Noi o aducem pe linia ta de producție înainte de defecțiune — zero opriri neplanificate, zero penalități contractuale.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Monitorizare continuă a parametrilor critici (vibrații, temperatură, consum), modele de predicție antrenate pe datele tale specifice, alerte automate cu prioritizare și integrare cu stocul de piese de schimb Uzinex pentru livrare preventivă.",
        anim: { type: "checklist", items: ["Monitorizare parametri critici", "Modele predicție personalizate", "Alerte automate prioritizate", "Integrare stoc piese OEM", "Livrare preventivă next-day"] },
      },
      {
        title: "Cum funcționează",
        body: "Senzorii IIoT (Kit Nivel 1 sau superiori) colectează date continuu. Algoritmii identifică tiparele de degradare și calculează timpul rămas până la defecțiune. Când o componentă se apropie de prag, primești alertă și piesa este deja în drum.",
        anim: { type: "flowchart", steps: [{ label: "Senzori", time: "Continuu" }, { label: "Analiză AI", time: "Real-time" }, { label: "Alertă", time: "72h+" }, { label: "Piesă livrată", time: "Next-day" }], totalTime: "Automat 24/7" },
      },
      {
        title: "De ce contează pentru tine",
        body: "O oprire neplanificată costă între 5.000 și 50.000 EUR pe oră, depinzând de industrie. Cu mentenanță predictivă, elimini aceste costuri complet. Este esențial și pentru contractele publice și sectorul apărării, unde reziliența operațională este obligatorie.",
        anim: { type: "counter", metrics: [{ value: 95, suffix: "%", label: "downtime eliminat" }, { value: 40, suffix: "%", label: "costuri mentenanță reduse" }, { value: 50000, prefix: "€", label: "economie / oprire evitată" }] },
      },
    ],
    benefits: [
      { label: "Downtime redus", value: "95%+" },
      { label: "Costuri mentenanță", value: "-40%" },
      { label: "Predicție", value: "72h+" },
      { label: "Piese preventive", value: "Next-day" },
    ],
    useCases: [
      "Linii de producție critice cu penalități contractuale pentru opriri",
      "Contracte publice și sector apărare — reziliență operațională obligatorie",
      "Flote mari de utilaje unde mentenanța reactivă este prea costisitoare",
      "Companii cu audituri UE unde trasabilitatea intervențiilor este cerință",
    ],
    ctaTitle: "Evaluare gratuită a riscului de downtime",
    ctaBody: "Analizăm flota ta de utilaje și îți arătăm exact unde pierzi bani pe opriri neplanificate.",
  },
  {
    slug: "inspectie-optica",
    num: "04",
    title: "Inspecție optică",
    subtitle: "Elimină rebuturile înainte să ajungă la client",
    accent: "#082545",
    heroDescription:
      "Camere de înaltă rezoluție și software AI care inspectează fiecare piesă la viteze imposibil de atins manual, detectând defecte sub-milimetrice. Se montează pe banda existentă, fără modificări ale liniei.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Sistem complet de inspecție vizuală: cameră(e) industrială HD/4K, iluminare specializată, software de analiză cu modele AI antrenate pe tipologia pieselor tale, PLC de integrare cu banda și raportare automată lot-by-lot.",
        anim: { type: "checklist", items: ["Cameră industrială HD/4K", "Iluminare specializată", "Software AI antrenat pe piesele tale", "PLC integrare bandă", "Raportare automată lot-by-lot"] },
      },
      {
        title: "Cum funcționează",
        body: "Montăm camerele deasupra benzii existente. Software-ul este antrenat pe mostre bune și defecte din producția ta (nu pe date generice). Fiecare piesă este inspectată în timp real. Cele cu defecte sunt marcate sau ejectate automat. Toate datele sunt loggate pentru audit.",
        anim: { type: "flowchart", steps: [{ label: "Montaj", time: "Ziua 1" }, { label: "Mostre", time: "Ziua 2" }, { label: "Antrenare AI", time: "Ziua 3-4" }, { label: "Producție", time: "Ziua 5" }], totalTime: "5 zile" },
      },
      {
        title: "De ce contează pentru tine",
        body: "Dacă produci repere pentru export, clauze de calitate stricte (PPM sub 50) pot face diferența între a păstra sau a pierde un contract. Inspecția optică reduce rebuturile cu peste 90% și generează documentație de calitate automată.",
        anim: { type: "counter", metrics: [{ value: 90, suffix: "%+", label: "rebuturi eliminate" }, { value: 120, suffix: " fps", label: "viteză inspecție" }, { value: 50, suffix: " PPM", label: "sub pragul export" }] },
      },
    ],
    benefits: [
      { label: "Detecție", value: "sub 1mm" },
      { label: "Rebuturi", value: "-90%" },
      { label: "Viteză", value: "120+ fps" },
      { label: "Montare", value: "Pe bandă existentă" },
    ],
    useCases: [
      "Producție repere auto pentru export — clauze PPM sub 50",
      "Fabrici de packaging care cer etichetare 100% corectă",
      "Producție farmaceutică cu cerințe de conformitate stricte",
      "Orice linie unde controlul manual nu ține pasul cu viteza de producție",
    ],
    ctaTitle: "Demo pe piesele tale, la fața locului",
    ctaBody: "Aducem echipamentul, setăm parametrii pe piesele tale reale și îți arătăm rezultatul în 2 ore.",
  },
  {
    slug: "edge-computing-mes",
    num: "05",
    title: "Edge Computing & Conectivitate MES",
    subtitle: "Conectează orice utilaj la biroul tău",
    accent: "#0a4d96",
    heroDescription:
      "Gateway-ul nostru Edge traduce automat datele din orice mașină — indiferent de brand sau protocol — în formatul ERP-ului tău. Managerul vede producția live, operatorul primește instrucțiuni digitale, fără hârtie, fără erori.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Module Edge Gateway compatibile multi-protocol (Modbus, OPC-UA, Profinet, EtherNet/IP), scripturile de comunicare personalizate pe utilajele tale, integrare cu ERP-ul/MES-ul existent și un dashboard de monitorizare a conectivității.",
        anim: { type: "checklist", items: ["Edge Gateway multi-protocol", "Scripturi comunicare custom", "Integrare ERP/MES existent", "Dashboard conectivitate", "Suport Modbus, OPC-UA, Profinet"] },
      },
      {
        title: "Cum funcționează",
        body: "Montăm gateway-ul fizic lângă utilaj (sau pe șina DIN din tablou). Scriem scripturile care traduc protocoalele utilajelor tale în REST/JSON compatibil cu sistemul tău. Configurarea tipică durează sub 2 săptămâni. Datele curg automat, fără intervenție umană.",
        anim: { type: "flowchart", steps: [{ label: "Audit", time: "Ziua 1-2" }, { label: "Montaj GW", time: "Ziua 3-5" }, { label: "Scripturi", time: "Ziua 6-10" }, { label: "Live", time: "Ziua 12" }], totalTime: "Sub 2 săptămâni" },
      },
      {
        title: "De ce contează pentru tine",
        body: "Fișele de producție pe hârtie generează erori, pierd timp și nu pot fi auditate ușor. Cu Edge Computing, fiecare operație este logată digital în timp real. Managerul ia decizii pe date reale, nu pe estimări de acum 3 zile.",
        anim: { type: "counter", metrics: [{ value: 100, suffix: "%", label: "date digitale, zero hârtie" }, { value: 200, suffix: "ms", label: "latență date live" }, { value: 14, suffix: " zile", label: "timp implementare" }] },
      },
    ],
    benefits: [
      { label: "Implementare", value: "sub 2 săpt." },
      { label: "Protocoale", value: "Multi-brand" },
      { label: "Erori manuale", value: "Eliminate" },
      { label: "Date", value: "Live în ERP" },
    ],
    useCases: [
      "Fabrici cu utilaje de la producători diferiți care nu comunică între ele",
      "Companii care vor să elimine fișele de producție pe hârtie",
      "Manageri care au nevoie de date de producție actualizate, nu rapoarte de ieri",
      "Pregătire pentru certificări ISO care cer trasabilitate digitală",
    ],
    ctaTitle: "Audit de conectivitate gratuit",
    ctaBody: "Venim, cartografiem utilajele și protocoalele și îți dăm un plan concret de digitalizare.",
  },
  {
    slug: "software-industrial",
    num: "06",
    title: "Software industrial pe comandă",
    subtitle: "Codul e al tău, fără licențe recurente, niciodată",
    accent: "#6b3410",
    heroDescription:
      "Ai un proces pe care niciun soft de raft nu-l rezolvă? Îți dezvoltăm aplicații industriale la comandă — de la panouri SCADA personalizate și interfețe HMI, la sisteme de planificare producție, trasabilitate lot și raportare automată. Codul e al tău, rulează pe serverele tale.",
    sections: [
      {
        title: "Ce primești concret",
        body: "Software dezvoltat de la zero sau adaptat pe specificul tău industrial: panouri SCADA cu sinoptice custom, interfețe HMI pentru operatori, module de trasabilitate lot-by-lot, generare automată rapoarte pentru audit și integrare cu orice sistem existent (ERP, MES, PLC).",
        anim: { type: "checklist", items: ["Panouri SCADA personalizate", "Interfețe HMI operatori", "Trasabilitate lot-by-lot", "Raportare automată audit", "Integrare ERP/MES/PLC", "Cod sursă complet livrat"] },
      },
      {
        title: "Cum funcționează",
        body: "Pornim de la o analiză funcțională a procesului tău (1-2 zile la fața locului). Propunem o arhitectură tehnică, dezvoltăm iterativ cu feedback-ul tău, instalăm pe serverele tale și facem training. Totul livrat cu cod sursă complet, fără licențe recurente.",
        anim: { type: "flowchart", steps: [{ label: "Analiză", time: "1-2 zile" }, { label: "Arhitectură", time: "Săpt. 1" }, { label: "Dezvoltare", time: "Săpt. 2-6" }, { label: "Deploy", time: "Săpt. 7" }], totalTime: "6-8 săptămâni" },
      },
      {
        title: "De ce contează pentru tine",
        body: "Software-ul SaaS generic te forțează să-ți adaptezi procesul la soft, nu invers. Cu software pe comandă, softul se adaptează la tine. Nu plătești abonamente lunare, nu depinzi de vendor, și ai control total asupra datelor și funcționalității.",
        anim: { type: "counter", metrics: [{ value: 0, prefix: "€", suffix: "/lună", label: "licențe recurente" }, { value: 100, suffix: "%", label: "cod proprietar" }, { value: 0, suffix: "", prefix: "", label: "dependență vendor" }] },
      },
    ],
    benefits: [
      { label: "Licențe", value: "€0/lună" },
      { label: "Cod sursă", value: "Al tău 100%" },
      { label: "Hosting", value: "Pe serverele tale" },
      { label: "Dependență vendor", value: "Zero" },
    ],
    useCases: [
      "Procese industriale unice pe care niciun ERP standard nu le acoperă",
      "Nevoia de panouri SCADA/HMI personalizate pe liniile tale specifice",
      "Cerințe stricte de trasabilitate lot-by-lot pentru audituri UE",
      "Companii care vor independență totală de vendor-i SaaS",
    ],
    ctaTitle: "Discută cu un arhitect software",
    ctaBody: "Spune-ne ce proces vrei să digitalizezi și primești o propunere de arhitectură în 5 zile.",
  },
];

export async function generateStaticParams() {
  return DIRECTIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = DIRECTIONS.find((x) => x.slug === slug);
  if (!d) return { title: "Industry 4.0 — Uzinex" };
  return {
    title: `${d.title} — Industry 4.0 | Uzinex`,
    description: d.heroDescription,
  };
}

export default async function DirectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = DIRECTIONS.find((x) => x.slug === slug);
  if (!d) notFound();

  const others = DIRECTIONS.filter((x) => x.slug !== slug);

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* HEADER */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-ink-400 mb-6">
                <Link href="/" className="hover:text-uzx-blue transition">
                  Acasă
                </Link>
                <span className="text-ink-300">/</span>
                <Link
                  href="/industry-4.0"
                  className="hover:text-uzx-blue transition"
                >
                  Industry 4.0
                </Link>
                <span className="text-ink-300">/</span>
                <span className="text-ink-700">{d.title}</span>
              </nav>
              <div
                className="text-[11px] uppercase tracking-[0.25em] mono font-bold mb-4"
                style={{ color: d.accent }}
              >
                {d.num} / Industry 4.0
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                {d.title}
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                {d.heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* KPI STRIP */}
        <section className="border-b hairline bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
                {d.benefits.map((b, i) => (
                  <div key={i} className="py-8 px-4 lg:px-8">
                    <div
                      className="serif text-3xl lg:text-4xl num"
                      style={{ color: d.accent }}
                    >
                      {b.value}
                    </div>
                    <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-2">
                      {b.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT SECTIONS */}
        {d.sections.map((s, i) => (
          <section
            key={i}
            className={`border-b hairline py-14 lg:py-20 ${
              i % 2 === 1 ? "bg-ink-50" : "bg-white"
            }`}
          >
            <div className="container-x">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                  <div
                    className="text-[11px] uppercase tracking-[0.2em] mono mb-3"
                    style={{ color: d.accent }}
                  >
                    — {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2
                    className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {s.title}
                  </h2>
                </div>
                <div className="lg:col-span-6 lg:col-start-7 space-y-8">
                  <p className="text-ink-600 leading-relaxed text-base">
                    {s.body}
                  </p>
                  {s.anim?.type === "checklist" && (
                    <UnboxingChecklist items={s.anim.items} accent={d.accent} />
                  )}
                  {s.anim?.type === "flowchart" && (
                    <FlowchartSteps steps={s.anim.steps} totalTime={s.anim.totalTime} accent={d.accent} />
                  )}
                  {s.anim?.type === "counter" && (
                    <CounterMetrics metrics={s.anim.metrics} accent={d.accent} />
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* USE CASES */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                — Cazuri de utilizare
              </div>
              <h2
                className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-10"
                style={{ letterSpacing: "-0.03em" }}
              >
                Când ai nevoie de {d.title.toLowerCase()}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
                {d.useCases.map((uc, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 lg:p-8 flex items-start gap-4"
                  >
                    <span
                      className="text-[11px] mono font-bold shrink-0 mt-0.5"
                      style={{ color: d.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-ink-700 leading-relaxed">
                      {uc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="border-b py-14 lg:py-20 text-white relative overflow-hidden"
          style={{
            background: d.accent,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 80% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)",
            }}
          />
          <div className="container-x relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h2
                  className="serif text-3xl md:text-4xl leading-[0.95] mb-4"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  {d.ctaTitle}
                </h2>
                <p className="text-white/80 leading-relaxed">{d.ctaBody}</p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
                <a
                  href="/#contact"
                  className="bg-white hover:bg-ink-100 text-ink-900 text-sm px-6 py-4 transition flex items-center justify-center gap-3 group font-medium"
                >
                  Solicită evaluare gratuită
                  <span className="group-hover:translate-x-1 transition">
                    →
                  </span>
                </a>
                <a
                  href="tel:+40769081081"
                  className="border border-white/30 hover:border-white text-white text-sm px-6 py-3 transition flex items-center justify-center gap-2"
                >
                  +40 769 081 081
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OTHER DIRECTIONS */}
        <section className="py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[10px] uppercase tracking-[0.25em] text-ink-400 mono mb-3">
                — Celelalte direcții Industry 4.0
              </div>
              <h2
                className="serif text-2xl md:text-3xl text-ink-900 leading-[0.95] mb-8"
                style={{ letterSpacing: "-0.03em" }}
              >
                Explorează ecosistemul complet
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-ink-200 border hairline">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/industry-4.0/${o.slug}`}
                    className="bg-white p-5 group hover:bg-ink-50 transition"
                  >
                    <div
                      className="text-[10px] mono font-bold mb-2"
                      style={{ color: o.accent }}
                    >
                      — {o.num}
                    </div>
                    <div
                      className="serif text-base text-ink-900 leading-tight group-hover:text-uzx-blue transition"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {o.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
