import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import {
  breadcrumbSchema,
  articleSchema,
  videoSchema,
  faqSchema,
} from "@/lib/seo";
import { VideoPlayer, GalleryGrid, WallBuilderTool } from "./interactive";
import {
  CammaDiagramFigure,
  InterlockBrickDiagram,
  PressureChemistryDiagram,
  HumidityCalculatorDiagram,
  ProductionFlowDiagram,
  CapacityDiagram,
} from "./diagrams";
import { getCammaGallery } from "./gallery";

const SLUG = "caramida-modulara-camma";
const YT_ID = "AoMfOAPQzVQ";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;
const CAMMA_FB = "https://www.facebook.com/CaramidaModularaRomania/";

export const metadata: Metadata = {
  title:
    "Studiu de caz CAMMA · Linie completă pentru cea mai mare fabrică de cărămidă modulară din România",
  description:
    "Cum CAMMA Tehno Metal a trecut de la 200 de cărămizi pe zi cu 2 prese ucrainene fără suport tehnic, la 20.000 de cărămizi pe zi cu o linie completă Uzinex și transferul de know-how pentru chimia betoanelor hyper-presate semi-uscate. Capacitate teoretică 800.000 m³/an.",
  keywords: [
    "fabrica caramida modulara romania",
    "linie productie caramida lego",
    "presa hidraulica caramida modulara",
    "caramida hyper presata semi uscata",
    "moara cu ciocane argila",
    "malaxor materie prima caramida",
    "calculator umiditate productie caramida",
    "studiu de caz CAMMA Buzau",
    "transfer know-how productie industriala",
    "linie completa turnkey Uzinex",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title:
      "CAMMA · de la 200 la 20.000 cărămizi pe zi cu o linie completă Uzinex",
    description:
      "Linie completă turnkey, calculator de umiditate pentru materia primă și transferul de know-how pentru rețeta de chimie au transformat o fabrică blocată într-o linie funcțională cu capacitate teoretică de 800.000 m³ pe an.",
    images: [HERO_IMG],
    type: "article",
    locale: "ro_RO",
  },
};

const PROFILE: Array<{
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}> = [
  { label: "Client", value: "CAMMA Tehno Metal SRL" },
  { label: "Industrie", value: "Cărămidă modulară hyper-presată" },
  { label: "Sediu", value: "Buzău, România" },
  { label: "Echipă", value: "8 angajați" },
  { label: "Anul proiect", value: "2022 · final de an" },
  { label: "Operatori per schimb", value: "2 · cu paletizare manuală" },
  { label: "Tip vânzare", value: "Linie completă turnkey + transfer know-how" },
  {
    label: "Pagină Facebook",
    value: "Cărămida Modulară România",
    href: CAMMA_FB,
    external: true,
  },
];

const WHY_BRICK: Array<{ title: string; body: string }> = [
  {
    title: "Construcție rapidă fără mortar, prin sistem tongue-and-groove",
    body:
      "Cărămida modulară hyper-presată are profiluri tip tongue-and-groove care se îmbină mecanic, similar pieselor unei jucării de construcții. Zidăria se ridică fără mortar pe rosturile orizontale și verticale, iar viteza de execuție pe șantier crește semnificativ comparativ cu cărămida arsă tradițională.",
  },
  {
    title: "Amprentă de carbon redusă față de cărămida arsă",
    body:
      "Cărămida hyper-presată semi-uscată consumă energie încorporată de circa 631 MJ/m³, comparativ cu 2.356 MJ/m³ la cărămida arsă în cuptor, conform datelor publicate de producători internaționali din segment. Emisiile de CO₂ sunt sub 60 kg/m³, față de peste 230 kg/m³ la varianta arsă. Pentru proiecte cu cerințe ESG sau sustenabilitate, diferența se vede direct pe raportul de mediu al construcției.",
  },
  {
    title: "Finisaj fair-faced, fără tencuieli ulterioare",
    body:
      "Suprafața cărămizii iese din presă cu finisaj curat, geometric, care se poate lăsa expus arhitectural fără tencuială sau placare suplimentară. Pentru proiecte cu buget controlat sau pentru estetică industrială modernă, asta înseamnă mai puțină manoperă și mai puține straturi de material pe șantier.",
  },
  {
    title: "Aplicații versatile în construcții civile și industriale",
    body:
      "Aceeași tehnologie de producție acoperă cărămidă modulară pentru ridicare zidărie, dale tip pavele, bolțari pentru fundații și alte elemente presate-vibrate. CAMMA produce mai multe tipodimensiuni pe aceeași linie, iar matrițele se schimbă în câteva minute pentru tranziția între produse.",
  },
];

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial · 2022",
    title: "CAMMA ne găsește pe Google după experiența eșuată cu Ucraina",
    body:
      "CAMMA Tehno Metal cumpărase anterior 2 prese hidraulice din Ucraina cu forțe de presare enorme, gândindu-se că tonajul este factorul determinant. Furnizorul ucrainean nu cunoștea însă tehnologia de producție a cărămizii modulare, nu a livrat rețeta de materie primă, iar suportul tehnic post-vânzare a dispărut. Cele 2 prese stăteau funcționale dar fără să producă o cărămidă utilă. Echipa CAMMA a cercetat soluții pe Google și a ajuns la Uzinex.",
  },
  {
    phase: "Proiectare tehnică",
    title: "Audit pe ce aveau, propunere pentru linie completă turnkey",
    body:
      "Am dimensionat tehnic ce le lipsea: nu doar o presă mai bună, ci un flux complet. Moară cu ciocane pentru spargerea argilei în pudră fină, cernător pentru eliminarea bucăților mari rămase din moară, malaxor pentru amestecul calibrat al materiei prime, presă hidraulică optimizată, benzi transportoare care unesc fluxul, plus calculator de umiditate care recalculează proporțiile la fiecare șarjă. Plus transferul de rețetă pentru chimia betoanelor hyper-presate semi-uscate.",
  },
  {
    phase: "Adaptare rețetă · materia primă din Buzău",
    title: "Argila locală nu se comporta ca cea de la testele furnizorului",
    body:
      "Furnizorul liniei a făcut testele inițiale pe materia primă din zona lor. La Buzău, profilul de argilă era diferit: granulometrie alta, umiditate naturală alta, conținut de minerale alta. A trebuit să adaptăm in-situ atât rețeta de amestec cât și calibrarea liniei pe profilul local. Aici a fost momentul critic al proiectului, iar transferul de know-how a fost partea care l-a salvat.",
  },
  {
    phase: "Punere în funcțiune",
    title: "De la contact la producție în aproximativ 3 luni",
    body:
      "Întregul proiect a durat circa 3 luni de la contactul inițial până la momentul în care linia producea constant la parametrii proiectați. Două persoane Uzinex au fost direct implicate: Sorin Baciu pe partea de logistică și transfer rețetar producție, iar Cosmin Florea pe partea tehnică, inginerie mecatronică, automatizări și PLC-uri. Trainingul operatorilor s-a făcut împreună cu commissioning-ul.",
  },
  {
    phase: "Salt operațional",
    title: "200 → 20.000 cărămizi pe zi după transferul de know-how",
    body:
      "Înainte de noi, CAMMA reușea să producă sub 200 de cărămizi pe zi, cu pierderi mari pe fiecare șarjă. După punerea în funcțiune și transferul rețetei, capacitatea operațională a sărit la circa 20.000 cărămizi pe zi cu pierderi minime. Mai mult, după ce am transferat know-how-ul de mixaj corect al materiei prime, CAMMA a reușit să facă productive și cele 2 prese ucrainene cumpărate anterior, depășind 1.000.000 m³ de cărămidă pe an la nivel total.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "×100",
    label: "Capacitate operațională",
    detail:
      "De la sub 200 cărămizi/zi cu cele 2 prese ucrainene fără rețetă, la 20.000 cărămizi/zi cu linia Uzinex și transferul de know-how, cu pierderi minime pe șarjă.",
  },
  {
    value: "800.000 m³",
    label: "Capacitate teoretică linie · /an",
    detail:
      "Capacitatea proiectată a liniei livrate la Buzău. Adăugând cele 2 prese ucrainene refolosite cu rețeta corectă, CAMMA depășește 1.000.000 m³ de cărămidă pe an la nivel de fabrică.",
  },
  {
    value: "1.5M lei",
    label: "Cifră de afaceri 2024",
    detail:
      "În creștere de la 900.000 lei în 2023, după primul an complet de producție stabilă pe linia Uzinex. Plus de 66% pe cifra de afaceri publică a CAMMA Tehno Metal.",
  },
  {
    value: "0",
    label: "Chemări în garanție post-PIF",
    detail:
      "Niciun apel pentru defect tehnic raportat după punerea în funcțiune. Linia operează continuu, cu mentenanță planificată făcută in-house de echipa CAMMA.",
  },
  {
    value: "≈3 luni",
    label: "Contact → producție stabilă",
    detail:
      "De la apelul inițial până la momentul în care linia producea constant la parametrii proiectați, inclusiv adaptarea rețetei pe materia primă locală.",
  },
  {
    value: "2 ingineri",
    label: "Echipa Uzinex pe proiect",
    detail:
      "Sorin Baciu pe logistică plus rețetar producție, Cosmin Florea pe inginerie mecatronică, automatizări și PLC. Transferul tehnologic a fost direct, fără intermediari.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Echipament fără know-how tehnologic este un eșec scump",
    body:
      "CAMMA cumpărase 2 prese cu forțe enorme de la un furnizor care nu înțelegea tehnologia de producție. Banii investiți în tonaj brut nu au produs nici o cărămidă utilă. Lecția aplicată la noi: pentru linii complete de producție, vinzi rețeta și fluxul împreună cu utilajele, sau nu vinzi deloc. Astăzi, orice linie turnkey Uzinex include transfer de know-how documentat și asistență la prima campanie de producție.",
  },
  {
    title: "Materia primă diferă pe zone, testele furnizorului nu se aplică direct",
    body:
      "Argila din Buzău nu se comportă identic cu argila pe care furnizorul liniei a făcut testele inițiale. Granulometrie alta, umiditate naturală alta, mineralogie alta. Fără adaptare in-situ a rețetei, linia ar fi rulat la jumătate de capacitate. De atunci, pe orice proiect cu materie primă variabilă propunem o etapă explicită de calibrare locală, cu prelevare de probă înainte de comandă și ajustare de rețetă în primele șarje.",
  },
  {
    title: "Calculatorul de umiditate compensează variabilitatea naturală a materiei prime",
    body:
      "Argila din carieră are umiditate diferită vara față de iarna, după ploaie față de zi uscată, și de la o stratificație geologică la alta. Calculatorul de umiditate livrat ca parte a liniei recalcula proporțiile de adaos la fiecare șarjă, păstrând constanta de calitate fără intervenție manuală. Pentru orice fabrică cu materie primă naturală, acest sub-sistem face diferența între consistență și rebut.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question:
      "De ce 2 prese cu forțe de presare enorme nu produceau nici o cărămidă utilă la CAMMA?",
    answer:
      "Pentru că forța de presare nu este factorul limitator în producția de cărămidă modulară hyper-presată semi-uscată. Cheia stă în chimia materiei prime: proporția corectă între argilă, nisip, ciment și apă, granulometria după moară, umiditatea de presare. Furnizorul ucrainean a vândut tonaj fără să livreze rețeta sau fluxul tehnologic complet. Presele compactau materie primă neoptimizată și ieșeau cărămizi care se sfărâmau. Fără rețetă și fără flux, presa cu forță dublă produce dublu rebut, nu dublu produs bun.",
  },
  {
    question: "Ce înseamnă concret cărămidă modulară hyper-presată semi-uscată?",
    answer:
      "Este o cărămidă produsă prin compactare la presiune mare a unui amestec semi-uscat de argilă, nisip, ciment și apă în proporții calibrate. Spre deosebire de cărămida tradițională arsă în cuptor, nu intră într-un proces termic, ci se maturează la temperatura ambiantă timp de câteva săptămâni. Profilul cu canelură de îmbinare permite ridicarea zidăriei fără mortar pe rosturile structurale, iar suprafața iese cu finisaj curat care nu necesită tencuială.",
  },
  {
    question: "Termenul „LEGO” menționat de fondatorul CAMMA are legătură cu compania LEGO Group?",
    answer:
      "Nu. „LEGO” este folosit colocvial în industria cărămizii modulare ca să descrie forma de îmbinare prin canelură și sistemul de punere în operă fără mortar, similar pieselor unei jucării de construcții. Nu există nicio legătură comercială, juridică sau de licență cu LEGO Group A/S din Danemarca, iar termenul este folosit strict ca metaforă tehnică. Denumirea oficială a produsului CAMMA este cărămidă modulară hyper-presată.",
  },
  {
    question:
      "Cum a făcut Uzinex transferul de know-how pentru chimia betoanelor hyper-presate?",
    answer:
      "Prin combinație de documentare scrisă, calibrare in-situ pe materialele reale și asistență directă la primele șarje de producție. Echipa Uzinex a livrat rețeta de bază adaptată pe profilul de argilă din Buzău, calculatorul de umiditate care recalcula automat proporțiile, plus prezența fizică pe șantier la commissioning. Adaptarea rețetei pe materia primă locală a fost partea cea mai delicată a proiectului, iar fără transferul direct între ingineri pe șantier nu ar fi funcționat.",
  },
  {
    question: "Cât de repede se construiește cu cărămidă modulară comparativ cu cea clasică?",
    answer:
      "Pentru zidărie de gabarit standard, cărămida modulară hyper-presată permite execuție mai rapidă decât cea cu cărămidă arsă plus mortar, deoarece elimină cea mai mare parte a operațiilor de pregătire mortar și aplicare pe rost. Estimările publicate de producători internaționali din segment arată reducere semnificativă pe timp și pe consum de material auxiliar. Cifrele exacte depind de proiect, calificarea echipei de zidari și de gabaritul construcției.",
  },
  {
    question: "De ce a contat calculatorul de umiditate pe linia livrată la CAMMA?",
    answer:
      "Argila din carieră nu are umiditate constantă. Variază pe sezon, pe stratificație geologică, pe condițiile meteo dintre extragere și procesare. Pentru o cărămidă hyper-presată semi-uscată, umiditatea finală a amestecului determină calitatea compactării: prea uscat înseamnă cărămidă casantă, prea umed înseamnă deformare la maturare. Calculatorul măsoară umiditatea curentă a materiei prime și recalculează cantitățile de nisip, ciment și apă pentru fiecare șarjă, eliminând nevoia de ajustare manuală făcută din ochi de operator.",
  },
  {
    question: "Care este astăzi capacitatea reală de producție a CAMMA?",
    answer:
      "Linia Uzinex are capacitate teoretică de circa 800.000 m³ de cărămidă pe an. Adăugând cele 2 prese ucrainene cumpărate anterior, care au devenit productive după transferul de know-how primit cu ocazia liniei noi, CAMMA Tehno Metal depășește la nivel de fabrică 1.000.000 m³ de cărămidă pe an, devenind cel mai mare producător de cărămidă modulară din România.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Echipamentul în sine este bunicel, dacă nu chiar foarte bun. Problema fundamentală a fost suportul tehnic. Pentru un fabricant, asistența este foarte, foarte importantă.",
  "În cazul Uzinex, m-am simțit foarte bine protejat de asistența pe care au făcut-o. Atunci când stai cu un schimb întreg blocat și ai nevoie de cineva care să-ți răspundă rapid, contează enorm.",
  "Suntem în topul producătorilor din România pe acest produs. Nu m-aș fi gândit la asta când porneam, dar lucrurile s-au așezat.",
];

export default async function CammaCasePage() {
  const gallery = await getCammaGallery();

  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    {
      name: "CAMMA · Linie completă cărămidă modulară",
      url: `/studii-de-caz/${SLUG}`,
    },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title:
      "CAMMA Tehno Metal · Linie completă pentru cea mai mare fabrică de cărămidă modulară din România",
    excerpt:
      "Cum CAMMA a trecut de la 200 de cărămizi pe zi cu 2 prese ucrainene fără suport tehnic, la 20.000 de cărămizi pe zi cu o linie completă Uzinex și transferul de know-how pentru chimia betoanelor hyper-presate.",
    category: "Studiu de caz · Producție industrială",
    datePublished: "2023-03-01",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial CAMMA Tehno Metal · linie completă cărămidă modulară Uzinex",
    description:
      "Testimonial al fondatorului CAMMA Tehno Metal din Buzău despre experiența cu linia completă Uzinex pentru producția de cărămidă modulară hyper-presată, transferul de know-how și suportul tehnic local.",
    youtubeId: YT_ID,
    uploadDate: "2024-06-01T10:00:00Z",
  });

  const faq = faqSchema(FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(video) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header solid />

      <main className="bg-white">
        {/* HERO */}
        <section
          className="border-b text-white relative overflow-hidden"
          style={{ background: "#0d1828", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0 60px, rgba(200,123,60,0.6) 60px 64px, transparent 64px 124px), linear-gradient(0deg, transparent 0 30px, rgba(200,123,60,0.6) 30px 34px, transparent 34px 60px)",
              backgroundSize: "124px 60px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(245,133,31,0.18) 0%, transparent 60%)",
            }}
          />
          <div className="container-x py-10 lg:py-20 relative z-10">
            <Link
              href="/studii-de-caz"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-white/60 hover:text-uzx-orange transition mb-8"
            >
              <span>←</span> Toate studiile de caz
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 text-[10px] lg:text-[11px] mono uppercase tracking-[0.2em] text-white/70 mb-5">
                  <span className="bg-uzx-orange text-white px-2 py-0.5">
                    Producție industrială · construcții
                  </span>
                  <span>· Buzău, RO</span>
                  <span>· 2022</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-white leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  De la 200 la 20.000 de cărămizi pe zi<br />
                  <span className="font-light text-uzx-orange">
                    cu o linie completă și o rețetă care funcționează.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl">
                  CAMMA Tehno Metal cumpărase din Ucraina 2 prese hidraulice cu
                  forțe de presare enorme, gândind că tonajul rezolvă tot. Fără
                  rețetă pentru chimia betoanelor hyper-presate semi-uscate și
                  fără suport tehnic post-vânzare, presele stăteau funcționale
                  dar fără să producă cărămidă utilă. Soluția a fost o linie
                  completă turnkey, calculator de umiditate pentru materia primă
                  și transferul direct al rețetei adaptate pe argila din Buzău.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-10 max-w-xl">
                  <HeroStat value="×100" label="Capacitate · 200 → 20.000 buc/zi" />
                  <HeroStat value="800K m³" label="/an · capacitate teoretică linie" />
                  <HeroStat value="0" label="Chemări în garanție post-PIF" />
                </div>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:self-stretch">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Fondatorul CAMMA · cum a apărut colaborarea cu Uzinex"
                />
                <p className="text-[11px] mono uppercase tracking-widest text-white/50 mt-3">
                  Testimonial real · interviu video la Buzău
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ */}
        <Section number="01" eyebrow="Cartelă client · CAMMA Tehno Metal SRL">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-12">
            {PROFILE.map((p) => (
              <FactBlock
                key={p.label}
                label={p.label}
                value={p.value}
                href={p.href}
                external={p.external}
              />
            ))}
          </div>
        </Section>

        {/* 2. DE CE CĂRĂMIDĂ MODULARĂ, text + diagram interlock */}
        <Section
          number="02"
          eyebrow="De ce cărămidă modulară hyper-presată · patru argumente verificabile"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mb-10 lg:mb-12">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cărămida modulară nu este o variantă mai ieftină a celei clasice.
                Este o tehnologie de construcție diferită, cu logică proprie pe
                materiale, execuție și amprentă de mediu.
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Profilul tongue-and-groove al cărămizii hyper-presate permite
                ridicarea zidăriei fără mortar pe rosturile structurale. Cărămizile
                se așază decalat pe rânduri alterne, similar pieselor unei jucării
                de construcții, iar îmbinarea mecanică ține peretele rigid în
                timpul ridicării. Mai jos vezi schema simplificată a îmbinării.
              </p>
            </div>
            <div className="lg:col-span-5">
              <CammaDiagramFigure
                number="01 · îmbinare modulară"
                diagram={<InterlockBrickDiagram />}
                caption="Tongue-and-groove vizibil între rândurile alterne. Ridicarea zidăriei se face uscat, fără mortar structural pe rost, cu finisaj direct fair-faced."
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {WHY_BRICK.map((r, i) => (
              <article key={i} className="border hairline bg-white p-6 lg:p-7">
                <div
                  className="serif text-3xl mb-4 num leading-none"
                  style={{ color: i % 2 === 0 ? "#f5851f" : "#c87b3c" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3
                  className="serif text-base lg:text-lg text-ink-900 leading-snug mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {r.title}
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed">{r.body}</p>
              </article>
            ))}
          </div>
          <p className="text-[11px] text-ink-500 mt-6 max-w-3xl leading-relaxed italic">
            Disclaimer terminologie. Termenul „LEGO” folosit colocvial în
            industria de cărămidă modulară descrie sistemul de îmbinare prin
            canelură, similar pieselor unei jucării de construcții. Nu există
            nicio legătură comercială sau juridică cu LEGO Group A/S, iar termenul
            apare strict ca metaforă tehnică.
          </p>
        </Section>

        {/* 3. PARADOXUL UCRAINEAN, text + diagram paradox */}
        <Section
          number="03"
          eyebrow="Punctul de plecare · paradoxul forței de presare"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Două prese cu forțe enorme și 0 cărămizi utile pe zi. Tonajul
                fără rețetă nu produce, doar consumă material.
              </h2>
              <div className="space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
                <p>
                  Înainte de Uzinex, CAMMA cumpărase din Ucraina 2 prese
                  hidraulice cu forțe de presare semnificativ peste media
                  industriei. Logica vânzării a fost simplă: presiune mai mare
                  înseamnă cărămidă mai compactă, deci mai bună. În realitate,
                  presele compactau o materie primă neoptimizată și ieșeau
                  cărămizi care se sfărâmau la primele manevre.
                </p>
                <p>
                  Furnizorul ucrainean nu cunoștea tehnologia de producție a
                  cărămizii modulare. Nu a livrat rețeta de chimie a betoanelor
                  hyper-presate semi-uscate, nu a livrat fluxul tehnologic
                  complet, iar suportul tehnic post-vânzare a dispărut. CAMMA
                  rămăsese cu utilaje funcționale dar fără producție utilă.
                </p>
                <p>
                  <strong className="text-ink-900">
                    Cheia producției de cărămidă modulară stă în chimia materiei
                    prime, nu în forța de presare.
                  </strong>{" "}
                  Granulometria după moară, calibrarea umidității, proporția
                  între argilă, nisip și ciment, presiunea calibrată pe profilul
                  matriței. Toate astea formează rețeta. Fără rețetă, presa cu
                  forță dublă produce dublu rebut, nu dublu produs bun.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <CammaDiagramFigure
                number="02 · forță vs. chimie"
                diagram={<PressureChemistryDiagram />}
                caption="Stânga: presele Ucraina cu pistoane brute pe materie primă fără rețetă, output ≈ 0. Dreapta: linia Uzinex cu presiune calibrată pe rețetă adaptată local, output 20.000 buc/zi."
              />
              <aside className="border hairline bg-ink-50 p-5">
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-3">
                  Comparație rapidă · Ucraina vs. Uzinex
                </div>
                <table className="w-full text-sm border-collapse">
                  <tbody className="text-ink-700">
                    {[
                      ["Forță presare", "Enormă", "Calibrată"],
                      ["Rețetă materie primă", "Lipsă", "Inclusă"],
                      ["Flux tehnologic", "Doar presa", "Linie completă"],
                      ["Calculator umiditate", "Nu", "Da"],
                      ["Suport tehnic local", "0", "Direct ingineri"],
                      ["Cărămizi utile/zi", "≈0", "≈20.000"],
                    ].map(([crit, ua, ro]) => (
                      <tr key={crit} className="border-b hairline">
                        <td className="py-2 text-xs">{crit}</td>
                        <td className="py-2 text-right text-xs text-ink-500">
                          {ua}
                        </td>
                        <td className="py-2 text-right text-xs text-uzx-orange font-medium">
                          {ro}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </aside>
            </div>
          </div>
        </Section>

        {/* 4. CHIMIA + FLUXUL, text + diagram humidity calc */}
        <Section
          number="04"
          eyebrow="Cheia tehnologică · chimia materiei prime și fluxul calibrat"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-ink-600 text-base lg:text-[17px] leading-relaxed">
              <p>
                O linie de cărămidă modulară hyper-presată semi-uscată funcționează
                dacă patru parametri sunt aliniați simultan: granulometria după
                moară, umiditatea de presare, proporția argilă-nisip-ciment și
                presiunea aplicată pe matriță. Modificarea oricăruia dintre ei
                afectează direct rezistența și aspectul final al cărămizii.
              </p>
              <p>
                <strong className="text-ink-900">
                  Granulometria fină este responsabilitatea morii și a cernătorului.
                </strong>{" "}
                Argila uscată intră în moara cu ciocane care o sparge în pudră
                fină, apoi cernătorul reține bucățile mari care scapă din moară.
                Fără cernător în flux, cărămida iese cu defecte la suprafață și
                cu rezistență neuniformă.
              </p>
              <p>
                <strong className="text-ink-900">
                  Umiditatea calibrată este responsabilitatea malaxorului și a
                  calculatorului dedicat.
                </strong>{" "}
                Argila din carieră are umiditate naturală variabilă pe sezon,
                stratificație și meteo. Calculatorul de umiditate măsoară materia
                primă curentă și recalculează automat proporțiile pentru fiecare
                șarjă, păstrând constanța de calitate fără ajustări făcute din ochi
                de operator. Vezi schema dreapta.
              </p>
              <p>
                <strong className="text-ink-900">
                  Presiunea calibrată pe matriță este responsabilitatea presei
                  hidraulice configurate pe rețeta locală.
                </strong>{" "}
                Forța de presare nu e o valoare brută urmărită până la maxim, e o
                valoare calibrată pe geometria matriței și pe consistența mixului
                semi-uscat. Pe linia livrată la Buzău, presiunea a fost calibrată
                direct pe materialul real, nu pe valori teoretice.
              </p>
              <p className="text-ink-900 font-medium pt-2 border-t hairline">
                Pentru fabricanți care s-au lovit de același paradox al forței de
                presare, recomandarea noastră este consistentă: cumperi linie
                completă cu rețetă inclusă și calibrare locală, sau nu cumperi.
                Tonajul singur nu produce, doar consumă curent și material.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <CammaDiagramFigure
                  number="03 · calculator umiditate"
                  diagram={<HumidityCalculatorDiagram />}
                  caption="Trei bare oscilează proporțiile recalculate live pentru argilă, nisip, ciment. Senzor în malaxor citește umiditatea curentă și ajustează amestecul șarjă cu șarjă."
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 5. DE CE NOI */}
        <Section number="05" eyebrow="Cum am ajuns să livrăm noi · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Au cercetat după experiența negativă cu Ucraina"
              body="După ce presele ucrainene nu produceau, CAMMA a căutat activ pe Google soluții complete pentru fabrica de cărămidă modulară. Au găsit Uzinex și au inițiat conversația tehnic, fără filtre comerciale, sub presiunea utilajelor blocate care consumau capital fără să producă."
            />
            <ReasonCard
              num="B"
              title="Diferențiator: suport tehnic local plus know-how chimie betoane"
              body="Față de furnizorul anterior, am venit cu două avantaje structurale. Prezență fizică și suport tehnic în România, cu ingineri pe care îi puteau apela direct. Plus transferul de rețetă pentru chimia betoanelor hyper-presate semi-uscate, adaptată in-situ pe argila din Buzău, nu o foaie de hârtie cu valori teoretice."
            />
            <ReasonCard
              num="C"
              title="Linie completă turnkey, nu doar utilaje izolate"
              body="Am livrat fluxul integral, de la moara cu ciocane până la banda de evacuare, plus calculatorul de umiditate plus rețetar adaptat. CAMMA nu mai trebuia să integreze utilaje cumpărate de la furnizori diferiți, cu interfețe care nu se potrivesc, ci primea fabrica gata calibrată pe profilul lor de materie primă."
            />
          </div>
        </Section>

        {/* 6. SOLUȚIA + GALERIE FOTO */}
        <Section number="06" eyebrow="Linia livrată · echipamente, sub-sisteme și foto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 lg:mb-12">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Flux complet de la argila uscată la cărămida pe palet, cu
                automatizare pe toate etapele intermediare.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow label="Moară cu ciocane" value="Spargere argilă uscată în pudră fină" />
                <SpecRow
                  label="Cernător"
                  value="Site fine pentru eliminarea bucăților mari rămase din moară"
                />
                <SpecRow
                  label="Malaxor materie primă"
                  value="Amestec calibrat argilă + nisip + ciment + apă"
                />
                <SpecRow
                  label="Presă hidraulică"
                  value="Compactare cu presiune calibrată pe matriță"
                />
                <SpecRow
                  label="Benzi transportoare"
                  value="Interconectare flux + evacuare cărămizi crude la paletizare"
                />
                <SpecRow
                  label="Calculator umiditate"
                  value="Recalculare automată proporții pentru fiecare șarjă"
                />
                <SpecRow
                  label="Automatizare flux"
                  value="Integral, cu excepția paletizării manuale"
                />
                <SpecRow
                  label="Operatori per schimb"
                  value="2 angajați CAMMA · paletizare + supraveghere flux"
                />
                <SpecRow
                  label="Rețetă inclusă"
                  value="Chimie betoane hyper-presate adaptată pe argila din Buzău"
                />
              </dl>

              <p className="text-[11px] text-ink-500 mt-5 leading-relaxed italic">
                Producătorii utilajelor majore sunt fabricanți industriali din
                Asia, integrați și calibrați de echipa Uzinex în proiectul
                turnkey. Răspunderea contractuală pentru funcționare a fost
                integral a Uzinex, nu a producătorului upstream.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <CammaDiagramFigure
                number="04 · flux linie"
                diagram={<ProductionFlowDiagram />}
                caption="Cinci stații conectate prin benzi transportoare, automatizate integral cu excepția paletizării manuale. Două operatori per schimb."
              />
              <div
                className="bg-uzx-blue text-white p-5 lg:p-6"
                style={{
                  background:
                    "linear-gradient(135deg, #082545 0%, #0d2240 100%)",
                }}
              >
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-2">
                  Calculator umiditate · sub-sistem cheie
                </div>
                <h3
                  className="serif text-lg lg:text-xl leading-tight mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Constanța de calitate fără ajustări din ochi de operator.
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-4">
                  Sensor în malaxor măsoară umiditatea curentă și controller-ul
                  recalculează automat proporțiile de nisip, ciment și apă
                  pentru fiecare șarjă. Pentru fabrici cu materie primă
                  naturală, acest sub-sistem face diferența între consistență
                  și rebut sistematic.
                </p>
                <Link
                  href="/contact?subject=Linie%20produc%C8%9Bie%20c%C4%83r%C4%83mid%C4%83%20modular%C4%83&context=Studiu%20de%20caz%20CAMMA"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-uzx-orange underline-link group"
                >
                  Solicit detalii pentru fabrica mea
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] mono uppercase tracking-widest mb-4" style={{ color: "#8a4f23" }}>
              Foto · linia în fabrica CAMMA
            </div>
            <GalleryGrid slots={gallery} />
            <p className="text-[11px] text-ink-500 mt-4 leading-relaxed italic">
              Sloturile fără imagine sunt placeholder-e. Fotografiile reale se
              adaugă din admin la /admin/studii-de-caz/camma.
            </p>
          </div>
        </Section>

        {/* 7. SCHEMA DE ANSAMBLU + CAPACITY */}
        <Section number="07" eyebrow="Salt operațional · în cifre">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                ×100 capacitate operațională, +66% cifră de afaceri într-un singur an.
              </h2>
              <p>
                Înainte de intrarea liniei Uzinex în funcțiune, CAMMA reușea să
                producă sub 200 de cărămizi pe zi, cu pierderi mari pe fiecare
                șarjă. După implementare și transferul de know-how, capacitatea
                operațională a ajuns la 20.000 de cărămizi pe zi, iar pierderile
                s-au redus la minim.
              </p>
              <p>
                Cifra de afaceri publică a urmat: 900K lei în 2023, 1.5M lei în
                2024. Capacitatea teoretică a liniei este de 800.000 m³ de
                cărămidă pe an, iar adăugând cele 2 prese ucrainene refolosite cu
                rețeta corectă, CAMMA depășește 1.000.000 m³ pe an la nivel de
                fabrică.
              </p>
            </div>
            <div className="lg:col-span-7">
              <CammaDiagramFigure
                number="05 · salt capacitate"
                diagram={<CapacityDiagram />}
                caption="200 → 20.000 cărămizi/zi reprezentat la scară reală pe axă lineară. Curba portocalie marchează tranziția pre vs. post Uzinex. Panou lateral: cifră de afaceri publică."
              />
            </div>
          </div>
        </Section>

        {/* 8. TIMELINE */}
        <Section number="08" eyebrow="Cum s-a desfășurat · onest">
          <ol className="space-y-6 lg:space-y-8 max-w-3xl">
            {TIMELINE.map((t, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-4 lg:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 lg:w-11 lg:h-11 border hairline bg-white flex items-center justify-center text-[10px] mono uppercase text-uzx-orange num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="w-px flex-1 bg-ink-200 my-2" />
                  )}
                </div>
                <div className="pb-2">
                  <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
                    {t.phase}
                  </div>
                  <h3
                    className="serif text-lg lg:text-xl text-ink-900 leading-tight mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {t.title}
                  </h3>
                  <p className="text-sm lg:text-base text-ink-600 leading-relaxed">
                    {t.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* 9. REZULTATE */}
        <Section number="09" eyebrow="Rezultate · măsurate sau publice" tone="dark">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {RESULTS.map((r) => (
              <div key={r.label} className="bg-[#082545] p-6 lg:p-8">
                <div
                  className="serif text-3xl lg:text-4xl text-uzx-orange num leading-none mb-3"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {r.value}
                </div>
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-3">
                  {r.label}
                </div>
                <div className="text-xs lg:text-sm text-white/80 leading-relaxed">
                  {r.detail}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs lg:text-sm text-white/60 mt-8 max-w-3xl italic leading-relaxed">
            Notă transparentă. Cifrele de capacitate, cifră de afaceri și salt
            operațional sunt publice sau confirmate de fondatorul CAMMA. Detalii
            financiare suplimentare, valoarea contractului Uzinex și ROI-ul
            calculat de client nu sunt incluse în această pagină.
          </p>
        </Section>

        {/* 10. SERVICE POST-LIVRARE */}
        <Section
          number="10"
          eyebrow="Service post-livrare · linia operează in-house"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Zero chemări în garanție după punerea în funcțiune.
              </h2>
              <p className="text-ink-600 leading-relaxed mb-5">
                După commissioning și transferul de know-how complet, echipa
                CAMMA a preluat operarea liniei integral in-house. Niciun apel
                pentru defect tehnic raportat post-PIF, mentenanță planificată
                făcută local, iar aparatura funcționează continuu pe parametrii
                proiectați.
              </p>
              <Link
                href="/service"
                className="inline-flex items-center gap-2 text-xs text-uzx-blue hover:text-uzx-orange underline-link group"
              >
                Detalii service inclus la livrare
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y hairline border-y hairline">
                <ServiceRow
                  label="Chemări garanție post-PIF"
                  value="0"
                  detail="Niciun apel pentru defect tehnic în perioada post-punere în funcțiune."
                />
                <ServiceRow
                  label="Mentenanță planificată"
                  value="In-house"
                  detail="Echipa CAMMA preia operarea curentă și mentenanța preventivă, după trainingul livrat la commissioning."
                />
                <ServiceRow
                  label="Transfer know-how"
                  value="Inclus"
                  detail="Rețetă chimică, calibrare presă, calibrare calculator umiditate, toate adaptate pe materia primă din Buzău."
                />
                <ServiceRow
                  label="Echipa Uzinex implicată"
                  value="2 ingineri"
                  detail="Sorin Baciu pe logistică plus rețetar producție, Cosmin Florea pe inginerie mecatronică, automatizări și PLC."
                />
                <ServiceRow
                  label="Disponibilitate suport"
                  value="La cerere"
                  detail="Pentru extinderi viitoare sau modificări de rețetă pe noi tipodimensiuni, asistența rămâne disponibilă."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 11. TESTIMONIAL */}
        <section className="border-b hairline py-14 lg:py-20" style={{ background: "#faf6f1" }}>
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-8">
              11 / Testimonial · fragmente din interviul video
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl">
              {TESTIMONIAL_QUOTES.map((q, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 pl-5 py-2"
                  style={{ borderColor: "#c87b3c" }}
                >
                  <p className="serif text-base lg:text-lg text-ink-900 leading-snug italic">
                    „{q}"
                  </p>
                </blockquote>
              ))}
            </div>
            <p className="text-[11px] text-ink-500 mt-8 leading-relaxed italic max-w-3xl">
              Citate editate pentru claritate, păstrând sensul exact al
              declarațiilor. Interviul video integral este disponibil în
              secțiunea hero a paginii.
            </p>
          </div>
        </section>

        {/* 12. LECȚII */}
        <section className="border-b hairline bg-ink-900 text-white py-14 lg:py-20">
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                  12 / Lecții & provocări
                </div>
                <h2
                  className="serif text-2xl lg:text-3xl leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Ce am învățat din<br />
                  <span className="font-light text-white/70">
                    livrarea unei fabrici complete pentru o industrie de nișă.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Trei observații care au schimbat felul în care propunem linii
                  complete pentru clienți cu materie primă naturală variabilă.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                {LESSONS.map((l, i) => (
                  <div key={i} className="border-l-2 border-uzx-orange pl-5 lg:pl-6">
                    <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-2">
                      Lecție {i + 1} / {LESSONS.length}
                    </div>
                    <h3
                      className="serif text-lg lg:text-xl text-white mb-3"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {l.title}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-white/80 leading-relaxed">
                      {l.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. FAQ */}
        <Section
          number="13"
          eyebrow="Întrebări tehnice · cărămidă modulară hyper-presată"
        >
          <div className="max-w-4xl divide-y hairline border-y hairline">
            {FAQ.map((q, i) => (
              <details key={i} className="group py-5 lg:py-6">
                <summary className="flex items-start justify-between gap-4 cursor-pointer">
                  <h3
                    className="serif text-base lg:text-xl text-ink-900 leading-snug pr-4"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {q.question}
                  </h3>
                  <span className="serif text-uzx-orange text-2xl leading-none shrink-0 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="text-sm lg:text-base text-ink-600 leading-relaxed mt-4 pr-8">
                  {q.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>

        {/* 14. WALL BUILDER TOOL */}
        <Section
          number="14"
          eyebrow="Tool interactiv · estimează un perete real"
        >
          <WallBuilderTool />
        </Section>

        {/* 15. CONTACT · CTA */}
        <section
          className="border-b hairline py-14 lg:py-20"
          style={{ background: "#0d1828" }}
        >
          <div className="container-x text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                  15 / Contact · vrei o linie completă pentru fabrica ta?
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Linie turnkey cu rețetă inclusă<br />
                  <span className="font-light text-uzx-orange">
                    și ingineri români la telefon.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Pentru fabrici cu materie primă naturală variabilă, livrăm
                  linii complete cu rețetă chimică inclusă, calculator de
                  umiditate și calibrare in-situ pe profilul tău local.
                  Răspunderea contractuală pentru funcționarea liniei este
                  integral a Uzinex, nu a producătorului upstream.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3">
                <a
                  href="tel:+40769081081"
                  className="bg-white hover:bg-ink-50 text-uzx-blue text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition serif text-lg"
                >
                  (+40) 769 081 081
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <Link
                  href="/contact?subject=Linie%20produc%C8%9Bie%20c%C4%83r%C4%83mid%C4%83%20modular%C4%83%20%E2%80%94%20fabric%C4%83%20complet%C4%83&context=Studiu%20de%20caz%20CAMMA"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit dimensionare linie pentru fabrica mea
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Pentru proiecte cu cerințe de confidențialitate comercială,
                  semnăm NDA înainte de discutarea oricăror detalii tehnice ale
                  fabricii.
                </p>
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

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="serif text-2xl lg:text-4xl text-white num leading-none"
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className="text-[9px] lg:text-[10px] mono uppercase tracking-wider text-white/60 mt-2">
        {label}
      </div>
    </div>
  );
}

function Section({
  number,
  eyebrow,
  children,
  tone = "light",
}: {
  number: string;
  eyebrow: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  const isDark = tone === "dark";
  return (
    <section
      className={`border-b hairline py-14 lg:py-20 ${
        isDark ? "bg-[#082545] text-white" : "bg-white"
      }`}
    >
      <div className="container-x">
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-8 lg:mb-10 text-uzx-orange">
          {number} / {eyebrow}
        </div>
        {children}
      </div>
    </section>
  );
}

function FactBlock({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-2">
        {label}
      </div>
      <div className="serif text-base lg:text-lg text-ink-900 leading-tight">
        {value}
        {href && external && (
          <span className="ml-1 text-uzx-orange text-xs">↗</span>
        )}
      </div>
    </>
  );
  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="block hover:opacity-80 transition"
      >
        {inner}
      </Link>
    );
  }
  return <div>{inner}</div>;
}

function ReasonCard({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border hairline bg-white p-6 lg:p-7 flex flex-col h-full">
      <div className="serif text-3xl text-uzx-orange mb-4 num leading-none">
        {num}
      </div>
      <h3
        className="serif text-base lg:text-lg text-ink-900 leading-snug mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <p className="text-sm text-ink-600 leading-relaxed">{body}</p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 py-4">
      <dt className="text-[11px] mono uppercase tracking-widest text-ink-400 self-center">
        {label}
      </dt>
      <dd className="text-sm lg:text-base text-ink-900 leading-relaxed">{value}</dd>
    </div>
  );
}

function ServiceRow({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-8 py-5">
      <div>
        <dt className="text-[11px] mono uppercase tracking-widest text-ink-400 mb-1">
          {label}
        </dt>
        <dd className="text-sm text-ink-600 leading-relaxed">{detail}</dd>
      </div>
      <div className="serif text-base lg:text-lg text-ink-900 num md:text-right md:min-w-[160px] md:self-center">
        {value}
      </div>
    </div>
  );
}
