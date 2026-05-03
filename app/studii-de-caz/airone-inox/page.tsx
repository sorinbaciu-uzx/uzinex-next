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
import { VideoPlayer, DowntimeCostCalculator } from "./interactive";
import {
  AironeDiagramFigure,
  NineYearRecordDiagram,
  InoxProductionFlowDiagram,
  CapabilityMatrixDiagram,
} from "./diagrams";

const SLUG = "airone-inox";
const YT_ID = "LVRLKCO4yQY";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;
const AIRONE_WEBSITE = "https://airone.ro/";

export const metadata: Metadata = {
  title:
    "Studiu de caz AIRONE Inox · 9 ani · 0 intervenții service · recordul Uzinex",
  description:
    "Cum DORASERV SRL cu brandul AIRONE Inox, lider de piață pe echipamente HoReCa și partener white label pentru branduri italiene, a construit din 2017 până azi o fabrică completă de inox cu echipamente Uzinex. Recordul: 9 ani de funcționare cu zero intervenții service pe laserul fiber 6 kW livrat în 2017.",
  keywords: [
    "AIRONE Inox",
    "DORASERV SRL Macin",
    "fabrica echipamente HoReCa",
    "laser fiber 6kW inox",
    "presa formare la rece 600 tone",
    "robot sudura inox",
    "waterjet debitare",
    "abkant inox",
    "studiu de caz Uzinex",
    "white label Italia",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title:
      "AIRONE Inox · 9 ani · 0 intervenții service · recordul Uzinex pe laser fiber 6 kW",
    description:
      "Lider HoReCa pe piața românească, partener white label cu branduri italiene. 7 echipamente majore din 2017 până în 2026, ≈500.000 € investiție continuă, recordul absolut Uzinex pe laserul fiber.",
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
  { label: "Client juridic", value: "DORASERV SRL" },
  { label: "Brand comercial", value: "AIRONE Inox" },
  { label: "Director", value: "Octav Damasken" },
  { label: "Sediu", value: "Măcin, Tulcea" },
  { label: "Echipă", value: "peste 20 angajați" },
  { label: "Vechime piață", value: "24 ani" },
  { label: "Prima livrare Uzinex", value: "2017 · laser fiber 6 kW" },
  { label: "Investiție Uzinex 2017–2026", value: "≈ 500.000 €" },
  {
    label: "Site oficial",
    value: "airone.ro",
    href: AIRONE_WEBSITE,
    external: true,
  },
  { label: "Piețe deservite", value: "România · Italia · white label" },
];

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial · 2017",
    title: "Recomandare Google și prima conversație tehnică",
    body:
      "AIRONE căuta să-și moderniseze fabrica de inox la Măcin pentru a face față cerințelor de calitate ale partenerilor white label din Italia. Au ajuns la noi printr-o căutare Google și o recomandare. Conversația a început cu Octav Damasken pe nevoia concretă de modernizare a debitării, sudurii și formării, fără filtre comerciale.",
  },
  {
    phase: "Flagship · 2017",
    title: "Laser fiber 6 kW cu masă de transfer și cabină închisă",
    body:
      "Prima livrare a fost flagship-ul: o mașină de tăiat cu laser fiber de 6 kW, masă de transfer pentru schimb rapid de tablă, cabină închisă pentru siguranță. Configurația a fost dimensionată pe gama lor de inox AISI 304 și 316, grosimi între 0,5 și 10 mm. La momentul livrării a fost una dintre cele mai performante mașini din segmentul HoReCa românesc.",
  },
  {
    phase: "Achiziții recurente · 2017–2024",
    title: "Abkant, sudură laser, robot sudură, waterjet",
    body:
      "După flagship, AIRONE a continuat să adauge utilaje în ritm constant. Abkant pentru îndoire, aparat de sudură cu laser de 2 kW pentru cordoane fine pe tablă subțire, robot de sudură pentru repetabilitate pe componente seriale, mașină de debitat cu jet de apă pentru secțiuni groase și forme complexe care nu se pretau la laser. Plus software industrial de proiectare a elementelor metalice.",
  },
  {
    phase: "Update flagship · 2025",
    title: "Presă de formare la rece 600 tone",
    body:
      "Cea mai recentă investiție majoră este o presă de formare la rece de 600 tone, dimensionată pentru piesele structurale ale echipamentelor HoReCa de gabarit mare: cuptoare profesionale, vitrine refrigerate, structuri pentru bucătării industriale. Presa închide capabilitatea fabricii în arcul complet inox, de la tablă brută la produs asamblat.",
  },
  {
    phase: "9 ani de operare · prezent",
    title: "Recordul Uzinex · zero intervenții service pe laserul flagship",
    body:
      "Laserul fiber 6 kW livrat în 2017 funcționează în 2026 fără să fi necesitat o singură chemare în garanție. Singura intervenție pe parcurs a fost un update de software al producătorului upstream, rezolvat remote în câteva ore fără deplasare. Pentru noi este recordul absolut pe care îl folosim ca referință internă pentru echipamentele pe care le configurăm pentru clienți noi.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "9 ani",
    label: "Funcționare laser fiber 6 kW · 0 intervenții",
    detail:
      "Recordul Uzinex absolut. Laserul livrat în 2017 funcționează în 2026 fără o singură chemare în garanție. Singurul update a fost de software, rezolvat remote.",
  },
  {
    value: "7",
    label: "Echipamente majore livrate · 2017–2026",
    detail:
      "Laser fiber 6 kW, abkant, sudură laser 2 kW, robot sudură, waterjet, presă formare 600 tone, plus software industrial proiectare elemente metalice.",
  },
  {
    value: "≈ 500K €",
    label: "Investiție continuă · 2017–2026",
    detail:
      "Achiziții recurente pe nouă ani consecutivi. Pentru o fabrică privată cu peste 20 angajați, este o investiție de capital substanțială care reflectă încredere repetată în furnizor.",
  },
  {
    value: "24 ani",
    label: "Lider de piață HoReCa · România",
    detail:
      "AIRONE este pe piață din 2002, partener white label pentru branduri italiene consacrate, plus clienți direcți pe piața românească din restaurante, hoteluri și cantine industriale.",
  },
  {
    value: "RO + IT",
    label: "Piețe deservite",
    detail:
      "Brand propriu pe piața românească, white label pentru export către brandurile consacrate din Italia. Capabilitate dublă confirmă maturitatea fabricii.",
  },
  {
    value: "AISI 304 / 316",
    label: "Inox prelucrat · grosimi 0,5–10 mm",
    detail:
      "Capabilitatea fabricii acoperă întreaga gamă de inox alimentar pentru bucătării profesionale. Toate procesele majore de debit, îndoire, formare și sudură sunt calibrate pe aceste materiale.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Echipamentele care țin nouă ani fără service nu se vând la cel mai mic preț",
    body:
      "AIRONE a venit la noi căutând utilaje care fac față standardului de calitate cerut de partenerii italieni. Nu căutau cel mai ieftin laser, ci pe acela care îți oferă uptime predictibil ani de zile. Recordul de 9 ani pe laserul flagship validează în mod direct decizia: amortizarea reală a unui utilaj se face prin orele productive cumulate, nu prin discount-ul comercial inițial.",
  },
  {
    title: "Un client revine 9 ani consecutiv dacă primul utilaj livrat își face treaba",
    body:
      "Din 2017 până în 2026, AIRONE ne-a făcut 7 comenzi distincte, totalizând circa 500.000 € investiție. Niciuna nu a venit cu reevaluare de furnizor. Pentru noi, asta este măsura cea mai relevantă a unei livrări reușite: nu testimonialul de la commissioning, ci comanda următoare. Politica internă a devenit să configurăm fiecare utilaj cu marjă de fiabilitate care reduce ferm probabilitatea unei intervenții post-livrare.",
  },
  {
    title: "Capacitatea de integrare a 7 utilaje diferite e mai grea decât livrarea unuia complex",
    body:
      "Pe gama largă AIRONE pentru inox subțire, inox gros, profile, formare la rece, sudură fină și sudură serie, utilajele Uzinex trebuie să se completeze tehnic cu cele existente în fabrică, nu să dubleze capacități. Pentru a integra laser, waterjet, abkant, presă, sudură laser și robot sudură, am dimensionat fiecare achiziție în funcție de ce există deja în fabrică, inclusiv utilajele anterioare ale AIRONE care au rămas în producție. Lecția: pentru clienți care cumpără în etape, fiecare utilaj nou trebuie configurat în context, nu izolat.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Cum a apărut recordul de 9 ani fără intervenții service pe laserul fiber 6 kW?",
    answer:
      "Laserul a fost configurat în 2017 cu specificații care țineau cont de profilul real de operare AIRONE: schimburi extinse, inox alimentar AISI 304 și 316, grosimi mixte. Plus o cabină închisă cu sistem de filtrare adecvat și o masă de transfer care permite schimbul rapid al pieselor fără a stresa optica. Combinația de utilizare disciplinată din partea operatorilor AIRONE, plus configurarea inițială corectă, plus update-urile de software preventive făcute remote, au produs cei 9 ani de funcționare fără chemări service. Singurul update de software pe parcurs a fost rezolvat remote de producător în câteva ore.",
  },
  {
    question: "De ce AIRONE a continuat să cumpere de la Uzinex 9 ani consecutiv?",
    answer:
      "Citat direct din testimonialul lui Octav Damasken: „Cred că la timpul în care am făcut-o, mi s-a părut că s-a făcut o singură opțiune. Nu am găsit un alt colaborator care să poată să facă conform cerințelor.” Pentru noi, motivul real este că prima livrare a creat un standard pe care clientul nu a vrut să-l rupă. Fiecare utilaj nou cumpărat de la altcineva ar fi însemnat o nouă curbă de calibrare, un nou set de proceduri de service, un nou interlocutor tehnic. La AIRONE, alegerea a fost să rămână cu echipa care le cunoștea fabrica.",
  },
  {
    question: "Ce înseamnă concret „white label” pentru fabrica AIRONE și de ce contează pentru calitate?",
    answer:
      "AIRONE produce echipamente HoReCa pe care le marchează cu brandul lor pentru piața românească, dar și pentru partenerii italieni consacrați care le marchează cu propriul lor brand pentru export. Modelul white label cere ca finisajul, dimensiunile, sudurile și asamblarea să fie identice între producția italiană originală și cea românească. Pentru asta, calitatea nu este un parametru pe care îl negociezi în jos. Echipamentele Uzinex livrate la AIRONE au fost dimensionate pentru exact acest standard, iar relația de 9 ani este consecința directă a faptului că standardul a fost atins consistent.",
  },
  {
    question: "Care este lista completă a utilajelor livrate la AIRONE între 2017 și 2026?",
    answer:
      "Mașină de tăiat cu laser fiber de 6 kW cu masă de transfer și cabină închisă, livrată 2017. Abkant pentru îndoire tablă inox. Aparat de sudură cu laser de 2 kW pentru cordoane fine pe tablă subțire. Robot de sudură pentru repetabilitate pe serii. Mașină de debitat cu jet de apă pentru secțiuni groase și forme complexe. Presă de formare la rece de 600 tone livrată în 2025 pentru piesele structurale ale echipamentelor de gabarit mare. Plus software industrial de proiectare a elementelor metalice. Toate sunt în producție continuă la fabrica din Măcin.",
  },
  {
    question: "Cât de greu este să integrezi 7 utilaje cumpărate în etape pe parcursul a 9 ani?",
    answer:
      "Pentru clienți care cumpără în etape, fiecare utilaj nou trebuie configurat în contextul celorlalte deja prezente. La AIRONE am dimensionat fiecare achiziție în funcție de gama de produse, profilul de inox folosit și capabilitățile pe care fabrica le avea deja. Laserul fiber și waterjet-ul nu se concurează, ci se completează: laserul pe tablă subțire și medie, waterjet-ul pe secțiuni groase și forme complexe care nu se pretau la fascicul laser. Sudura laser și robotul de sudură nu sunt redundante: laserul pe cordoane fine, robotul pe serie repetată. Cei doi consultanți Uzinex implicați direct în proiect sunt Cristian Munthiu pe partea tehnologică și Sorin Baciu pe partea comercială.",
  },
  {
    question: "Recordul de 9 ani fără service e o garanție universală pe care o oferă Uzinex?",
    answer:
      "Nu. Recordul AIRONE este excepția demonstrabilă pe care țintim la fiecare livrare nouă, nu o garanție universală. Probabilitatea unui utilaj să funcționeze 9 ani fără chemări service depinde de configurația de la livrare, profilul de operare al clientului, calitatea consumabilelor folosite, schimburile programate de mentenanță preventivă. Politica noastră este să configurăm utilajul cu marjă de fiabilitate explicită și să oferim garanție standard plus suport tehnic pe parcurs. Pentru AIRONE, combinația acestor factori a produs recordul. Pentru fiecare client nou, urmărim să recreăm aceleași condiții.",
  },
  {
    question: "Pentru un fabricant care vrea să intre în segmentul HoReCa premium, ce echipamente sunt esențiale de la început?",
    answer:
      "Recomandarea noastră pe baza experienței AIRONE este următoarea. Mașină de tăiat cu laser fiber pentru tablă inox subțire și medie, deoarece debitul calitativ este fundamentul tuturor produselor HoReCa. Abkant pentru îndoire precisă a tablei. Sistem de sudură care să acopere atât cordoane fine vizibile cu laser, cât și suduri seriale repetabile cu robot sau MIG/MAG. Capabilitate de formare la rece dacă produci structuri de gabarit mare. Plus software industrial de proiectare. Configurația de bază pornește de la circa 250.000 €, iar capacitatea se extinde modular în următorii ani. Pentru un audit pe profilul tău concret, contactează-ne cu lista de produse pe care vrei să le faci în atelier.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Facem activitate de confecții metalice din inox dedicate pentru bucătării de restaurante. Echipamentele de la Uzinex au fost o schimbare radicală: modernizare, creșterea producției și a calității.",
  "La timpul în care am făcut-o, mi s-a părut că s-a făcut o singură opțiune. Nu am găsit un alt colaborator care să poată să facă conform cerințelor.",
  "Dovada că totul a fost bine e că acum funcționează echipamentele. Avem o experiență de peste trei ani fără probleme. Sau când au fost chestiuni, au fost susținere. Suntem mulțumiți de colaborare.",
];

export default function AironeInoxPage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    {
      name: "AIRONE Inox · 9 ani · 0 intervenții service",
      url: `/studii-de-caz/${SLUG}`,
    },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title:
      "AIRONE Inox · 9 ani · 0 intervenții service · recordul Uzinex pe laser fiber 6 kW",
    excerpt:
      "Cum DORASERV SRL cu brandul AIRONE Inox, lider HoReCa pe piața românească și partener white label pentru branduri italiene, a construit din 2017 până azi o fabrică completă de inox cu echipamente Uzinex.",
    category: "Studiu de caz · Producție industrială",
    datePublished: "2020-09-15",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial Octav Damasken · AIRONE Inox · echipamente Uzinex pentru fabrica HoReCa",
    description:
      "Octav Damasken, director DORASERV SRL cu brandul AIRONE Inox din Măcin, despre experiența cu echipamentele Uzinex livrate din 2017: laser fiber 6 kW, abkant, sudură laser, robot sudură, waterjet și presă de formare 600 tone. Fabrica produce echipamente HoReCa pentru restaurante și hoteluri din România, plus white label pentru branduri italiene.",
    youtubeId: YT_ID,
    uploadDate: "2020-10-01T10:00:00Z",
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
        <section className="border-b hairline bg-ink-50">
          <div className="container-x py-10 lg:py-16">
            <Link
              href="/studii-de-caz"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-8"
            >
              <span>←</span> Toate studiile de caz
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-center gap-3 text-[10px] lg:text-[11px] mono uppercase tracking-[0.2em] text-ink-500 mb-5">
                  <span className="bg-uzx-orange text-white px-2 py-0.5">
                    Producție industrială · HoReCa premium
                  </span>
                  <span>· Măcin, Tulcea</span>
                  <span>· 2017–2026</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-5"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  9 ani · 0 intervenții service<br />
                  <span className="font-light text-uzx-orange">
                    pe laserul fiber 6 kW livrat la AIRONE Inox în 2017.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-ink-600 leading-relaxed max-w-2xl">
                  DORASERV SRL cu brandul comercial AIRONE Inox produce de
                  24 de ani echipamente pentru bucătării profesionale, lider
                  pe piața românească și partener white label pentru branduri
                  italiene consacrate. Din 2017 până în 2026, a investit
                  aproximativ 500.000 € în 7 echipamente Uzinex care formează
                  astăzi fabrica completă de inox la Măcin. Recordul absolut
                  Uzinex se află aici: laserul fiber 6 kW livrat acum 9 ani
                  funcționează fără să fi necesitat o singură chemare service.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="9 / 0" label="Ani · intervenții service · record Uzinex" />
                  <HeroStat value="≈ 500K €" label="Investiție continuă 2017–2026" />
                  <HeroStat value="24 ani" label="Lider piață HoReCa · România" />
                </div>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:self-stretch">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Octav Damasken · AIRONE Inox · prezentare echipamente Uzinex"
                  duration="2:30"
                />
                <p className="text-[11px] mono uppercase tracking-widest text-ink-500 mt-3">
                  Interviu video cu directorul AIRONE Inox
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ */}
        <Section number="01" eyebrow="Cartelă client · DORASERV SRL · AIRONE Inox">
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

        {/* 2. PUNCTUL DE PLECARE */}
        <Section number="02" eyebrow="Punctul de plecare · standardul white label italian">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Pe piața HoReCa, calitatea inoxului nu este un argument comercial. Este o condiție de a vinde.
              </h2>
              <div className="space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
                <p>
                  AIRONE produce echipamente pentru bucătării profesionale
                  pe două canale paralele. Pe piața românească, sub brandul
                  propriu, vinde restaurantelor, hotelurilor și cantinelor
                  industriale. Pentru piața italiană, lucrează white label,
                  marcând producția cu brandurile consacrate ale partenerilor
                  italieni. Modelul cere ca finisajul, sudurile și asamblarea
                  să fie identice între producția italiană originală
                  și cea făcută la Măcin.
                </p>
                <p>
                  În 2017, fabrica avea utilaje vechi care nu mai țineau pasul
                  cu standardul de calitate cerut de această dublă piață.
                  Întrebarea nu era cum scalează, ci cum rămân lideri pe
                  segmentul lor.
                </p>
                <p>
                  <strong className="text-ink-900">
                    Modernizarea trebuia să acopere fundamentul fabricii
                    inox, nu doar o stație individuală.
                  </strong>{" "}
                  Debitarea, sudura, formarea, fiecare cu cerințe specifice
                  pe gama lor de produse. Decizia AIRONE a fost să înceapă cu
                  flagship-ul: un laser fiber de 6 kW care să închidă întreaga
                  capabilitate de debitare pentru următorii ani.
                </p>
              </div>
            </div>

            <aside className="lg:col-span-5 border hairline bg-ink-50 p-6 lg:p-8">
              <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
                Modelul AIRONE · două canale, un singur standard
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    Brand propriu · România
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Restaurante, hoteluri, cantine industriale. Echipament
                    standard plus configurații custom la cerere. Marca
                    AIRONE Inox.
                  </p>
                </div>
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    White label · Italia
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Producție pentru branduri italiene consacrate care
                    distribuie european. Marcaj cu logo-ul partenerului,
                    standard de finisaj italian.
                  </p>
                </div>
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    Materiale prelucrate
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Inox alimentar AISI 304 și 316, grosimi 0,5 până la 10 mm
                    pe debitare laser, până la 50 mm pe waterjet, până la 12 mm
                    pe formare la rece.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </Section>

        {/* 3. DE CE NOI */}
        <Section number="03" eyebrow="Cum am ajuns să livrăm noi · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Recomandare Google și o singură conversație decisivă"
              body="AIRONE ne-a găsit printr-o căutare Google și o recomandare. Citat direct din testimonial: „La timpul în care am făcut-o, mi s-a părut că s-a făcut o singură opțiune. Nu am găsit un alt colaborator care să poată să facă conform cerințelor.” Conversația a început tehnic, fără filtre comerciale, sub presiunea concretă a standardului white label italian."
            />
            <ReasonCard
              num="B"
              title="Capacitate de integrare a 7 utilaje diferite în etape"
              body="Pe gama largă AIRONE pentru inox subțire, inox gros, profile, formare la rece, sudură fină și sudură serie, utilajele Uzinex trebuie să se completeze tehnic cu utilajele deja prezente în fabrică, nu să dubleze capacități. Am dimensionat fiecare achiziție în funcție de ce fabrica avea deja, calibrând pe profilul lor real de operare."
            />
            <ReasonCard
              num="C"
              title="Suport tehnic care aduce un client înapoi 9 ani consecutiv"
              body="Citat din testimonial: „Sau când au fost chestiuni, au fost susținere. Chestiuni de service, de piese și de orice. Suntem mulțumiți de colaborare.” Pentru un client cu 7 utilaje active simultan, suportul nu este un departament secundar, este o parte din contractul implicit. Două persoane Uzinex sunt direct alocate proiectului: Cristian Munthiu pe tehnologie, Sorin Baciu pe partea comercială."
            />
          </div>
        </Section>

        {/* 4. ECHIPAMENTE LIVRATE */}
        <Section number="04" eyebrow="Echipamente livrate de Uzinex · 7 utilaje cheie 2017–2026">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cele șapte utilaje Uzinex care formează fundamentul fabricii AIRONE de astăzi.
              </h2>

              <p className="text-ink-600 leading-relaxed mb-6 text-sm lg:text-base">
                Fabrica AIRONE de la Măcin operează cu un parc de utilaje
                semnificativ mai larg, acumulat în 24 de ani de activitate.
                Lista de mai jos cuprinde doar utilajele livrate de Uzinex
                între 2017 și 2026, cele care au modernizat capabilitatea
                strategică pe debitare, formare, sudură fină și sudură serie.
                Restul fabricii rămâne configurat cu utilajele anterioare ale
                clientului, calibrate să se completeze cu echipamentele
                Uzinex în fluxul integrat.
              </p>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow
                  label="Laser fiber 6 kW · 2017"
                  value="masă transfer · cabină închisă · inox 0,5–10 mm · flagship · record 9 ani 0 service"
                />
                <SpecRow label="Abkant" value="îndoire tablă inox precisă · pe gabarit AIRONE" />
                <SpecRow
                  label="Sudură laser 2 kW"
                  value="cordoane fine pe tablă subțire · pentru zone vizibile finisaj"
                />
                <SpecRow
                  label="Robot sudură"
                  value="serii repetabile · componente standardizate"
                />
                <SpecRow
                  label="Waterjet"
                  value="secțiuni groase · forme complexe · până la 50 mm inox"
                />
                <SpecRow
                  label="Presă formare la rece · 2025"
                  value="600 tone · piese structurale gabarit mare · cuptoare, vitrine, structuri"
                />
                <SpecRow
                  label="Software industrial proiectare"
                  value="elemente metalice · custom design · biblioteci pe segment HoReCa"
                />
              </dl>

              <p className="text-[11px] text-ink-500 mt-5 leading-relaxed italic">
                Producătorii utilajelor majore sunt fabricanți industriali
                consacrați, integrați și calibrați de echipa Uzinex. Răspunderea
                contractuală pentru funcționare a fost integral a noastră, nu
                a producătorului upstream. Brandurile concrete sunt anonimizate
                pe pagina publică, disponibile la cerere pentru clienții
                interesați.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div
                className="text-white p-6 lg:p-8 mb-4"
                style={{ background: "#082545" }}
              >
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-3">
                  Capabilitate fabrică · acoperire procese
                </div>
                <h3
                  className="serif text-xl lg:text-2xl leading-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Cele 7 utilaje Uzinex acoperă coloana vertebrală a procesului inox.
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-5">
                  Debitare laser și waterjet pe gama largă de grosimi,
                  îndoire abkant, formare la rece până la 600 tone, sudură
                  laser pentru cordoane fine și robot pentru serii. În
                  combinație cu utilajele preexistente ale AIRONE, asta
                  înseamnă control total al lanțului de fabricație fără
                  dependență de subcontractori externi pe operațiile cheie.
                </p>
                <Link
                  href="/contact?subject=Fabric%C4%83%20inox%20HoReCa%20%E2%80%94%20dimensionare%20utilaje&context=Studiu%20de%20caz%20AIRONE"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-uzx-orange underline-link group"
                >
                  Solicit dimensionare fabrică inox
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>

              <AironeDiagramFigure
                number="Schema 1 · matrice capacitate prelucrare"
                caption="Cele 6 operații tehnologice livrate de Uzinex, cu intervalul optim de grosime pe care fiecare utilaj operează cu cea mai bună precizie. Acoperirea matricii permite AIRONE să facă atât tablă subțire vizibilă, cât și piese structurale groase pentru gabarit mare."
              >
                <CapabilityMatrixDiagram />
              </AironeDiagramFigure>
            </aside>
          </div>
        </Section>

        {/* 5. RECORDUL · 9 ANI */}
        <Section number="05" eyebrow="Recordul Uzinex · 9 ani · 0 intervenții service">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Laserul fiber 6 kW livrat în 2017 funcționează în 2026 fără o singură chemare în garanție.
              </h2>
              <p>
                Pentru noi este recordul absolut pe care îl folosim ca
                referință internă. Combinația care l-a produs: configurarea
                inițială pe profilul real de operare AIRONE, cabina închisă
                cu sistem de filtrare adecvat, masă de transfer pentru schimb
                rapid de tablă fără stres pe optică, plus utilizare disciplinată
                din partea operatorilor și mentenanță preventivă programată.
              </p>
              <p>
                Singurul update pe parcurs a fost de software, rezolvat
                remote de producătorul upstream în câteva ore, fără deplasare
                și fără oprire prelungită a fabricii. Niciuna dintre cele 9
                campanii anuale de producție de la AIRONE nu a fost afectată
                de o problemă tehnică pe laser.
              </p>
              <p className="text-ink-900 font-medium">
                Pentru clienții care întreabă cât de fiabil ne sunt utilajele,
                răspunsul scurt este AIRONE. Răspunsul lung este să configurăm
                fiecare livrare nouă cu marja de fiabilitate care să facă
                recordul reproductibil.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AironeDiagramFigure
                number="Schema 2 · timeline 9 ani · 0 intervenții"
                caption="Linia verde uptime curge continuu de la 2017 la 2026. Linia ticketelor service este zero pe toată durata. Cele 6 echipamente livrate în etape sunt marcate cronologic, cu laserul flagship pulsing pe data de instalare."
              >
                <NineYearRecordDiagram />
              </AironeDiagramFigure>
            </div>
          </div>
        </Section>

        {/* 6. FLUX FABRICĂ */}
        <Section number="06" eyebrow="Flux fabrică · de la inox brut la produs HoReCa">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cinci procese, două canale de piață, o singură fabrică integrată.
              </h2>
              <p>
                Tabla de inox AISI 304 sau 316 intră în fabrică, parcurge
                cele cinci stații tehnologice principale și iese ca echipament
                profesional gata de instalat. Pe drum, software-ul industrial
                proiectează custom fiecare lot, controlul de calitate verifică
                tolerantele de finisaj cerute de standardul white label, iar
                etapa de asamblare integrează componentele standard cu cele
                custom.
              </p>
              <p>
                Pentru AIRONE, capabilitatea închisă pe orizontal de
                debitare, îndoire, formare, sudură și asamblare înseamnă că
                nu există furnizori externi în lanțul de calitate. Fiecare
                etapă este sub control intern, calibrată pe gama de produse,
                scalabilă pentru ambele canale de piață.
              </p>
            </div>
            <div className="lg:col-span-7">
              <AironeDiagramFigure
                number="Schema 3 · flux producție inox"
                caption="Cinci stații tehnologice cu echipamente Uzinex, conectate prin transport intern și control de calitate intermediar. Iesirea: gama HoReCa premium pentru piața românească și piața white label italiană."
              >
                <InoxProductionFlowDiagram />
              </AironeDiagramFigure>
            </div>
          </div>
        </Section>

        {/* 7. TIMELINE */}
        <Section number="07" eyebrow="Cum s-a desfășurat · onest">
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

        {/* 8. REZULTATE */}
        <Section number="08" eyebrow="Rezultate · măsurate sau publice" tone="dark">
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
            Notă transparentă. Cifrele de uptime, durata relației și valoarea
            cumulată a investiției sunt confirmate explicit. Volumele de
            producție și cifrele financiare interne ale AIRONE sunt
            confidențiale și nu apar pe pagina publică.
          </p>
        </Section>

        {/* 9. SERVICE */}
        <Section number="09" eyebrow="Service · livrăm echipamente configurate să nu se strice">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Zero intervenții service pe 9 ani · politica e mai mult decât pachet de mentenanță.
              </h2>
              <p className="text-ink-600 leading-relaxed mb-5">
                Filozofia Uzinex pe service la AIRONE este simplă: cea mai
                bună intervenție este cea care nu trebuie făcută niciodată.
                Configurarea inițială pe profilul real, marja de fiabilitate
                explicită, mentenanța preventivă programată, plus update-urile
                de software remote la nevoie. Toate acestea reduc dramatic
                probabilitatea unei chemări în garanție.
              </p>
              <Link
                href="/service"
                className="inline-flex items-center gap-2 text-xs text-uzx-blue hover:text-uzx-orange underline-link group"
              >
                Detalii politica service Uzinex
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y hairline border-y hairline">
                <ServiceRow
                  label="Chemări în garanție"
                  value="0"
                  detail="Pe laserul fiber 6 kW livrat în 2017, niciuna în 9 ani de funcționare continuă."
                />
                <ServiceRow
                  label="Update-uri software remote"
                  value="1"
                  detail="Singurul update pe parcurs, rezolvat de producătorul upstream în câteva ore, fără deplasare."
                />
                <ServiceRow
                  label="Mentenanță preventivă"
                  value="In-house"
                  detail="AIRONE preia operarea curentă cu echipa proprie. Ne sună la nevoie pentru sfaturi sau piese."
                />
                <ServiceRow
                  label="Echipa Uzinex alocată"
                  value="2 oameni"
                  detail="Cristian Munthiu pe partea tehnologică, Sorin Baciu pe partea comercială și relația continuă."
                />
                <ServiceRow
                  label="Tip relație"
                  value="Recurentă"
                  detail="9 ani consecutivi cu 7 livrări distincte. Fiecare achiziție nouă e prelungire a relației, nu reevaluare."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 10. TESTIMONIAL */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-8">
              10 / Testimonial · fragmente din interviul video
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl">
              {TESTIMONIAL_QUOTES.map((q, i) => (
                <blockquote
                  key={i}
                  className="border-l-2 border-uzx-orange pl-5 py-2"
                >
                  <p className="serif text-base lg:text-lg text-ink-900 leading-snug italic">
                    „{q}”
                  </p>
                </blockquote>
              ))}
            </div>
            <p className="text-[11px] text-ink-500 mt-8 leading-relaxed italic max-w-3xl">
              Citate editate pentru claritate, păstrând sensul exact al
              declarațiilor lui Octav Damasken, director DORASERV SRL.
              Interviul video integral este disponibil în secțiunea hero.
            </p>
          </div>
        </section>

        {/* 11. LECȚII */}
        <section className="border-b hairline text-white py-14 lg:py-20" style={{ background: "#082545" }}>
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                  11 / Lecții & provocări
                </div>
                <h2
                  className="serif text-2xl lg:text-3xl leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Ce am învățat din<br />
                  <span className="font-light text-white/70">
                    nouă ani de relație continuă cu un client mare.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Trei observații care au schimbat felul în care propunem
                  fabrici complete pentru jucători cu standarde duble.
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

        {/* 12. FAQ */}
        <Section number="12" eyebrow="Întrebări tehnice · fabrică inox HoReCa">
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

        {/* 13. CALCULATOR */}
        <Section number="13" eyebrow="Tool interactiv · costul real al unui utilaj">
          <DowntimeCostCalculator />
        </Section>

        {/* 14. CONTACT */}
        <section
          className="border-b hairline py-14 lg:py-20"
          style={{ background: "#082545" }}
        >
          <div className="container-x text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                  14 / Contact · vrei o fabrică inox cu uptime garantat?
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Echipamente configurate<br />
                  <span className="font-light text-uzx-orange">
                    să țină ani de zile fără chemări service.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Pentru fabricanți HoReCa, confecții metalice premium și
                  alți clienți cu cerințe duble de calitate, configurăm
                  utilaje care țintesc recordul AIRONE. Două persoane Uzinex
                  alocate proiectului, suport pe parcurs, achiziții recurente
                  fără reevaluare de furnizor.
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
                  href="/contact?subject=Fabric%C4%83%20inox%20HoReCa%20%E2%80%94%20configurare%20uptime%20garantat&context=Studiu%20de%20caz%20AIRONE"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit dimensionare fabrică inox
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Pentru clienți cu cerințe similare AIRONE, semnăm NDA pe
                  partea de configurație concretă a utilajelor și volume
                  înainte de discutarea ofertei.
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
        className="serif text-2xl lg:text-4xl text-ink-900 num leading-none"
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className="text-[9px] lg:text-[10px] mono uppercase tracking-wider text-ink-500 mt-2">
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
