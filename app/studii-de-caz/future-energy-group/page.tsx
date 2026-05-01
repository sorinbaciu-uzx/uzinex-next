import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { breadcrumbSchema, articleSchema, videoSchema } from "@/lib/seo";
import { VideoPlayer, PaybackCalculator } from "./interactive";

const SLUG = "future-energy-group";
const YT_ID = "DQO74tlDNNQ";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

export const metadata: Metadata = {
  title: "Future Energy Group · Sudură industrială pusă în funcțiune în 2 ore",
  description:
    "Studiu de caz: cum am livrat și pus în funcțiune o instalație de sudură industrială pentru Future Energy Group din Iași în 72h, salvând un contract energetic cu termen ferm. Date reale, KPI-uri măsurate, lecții învățate.",
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title: "Future Energy Group · Sudură industrială pusă în funcțiune în 2 ore",
    description:
      "De la cerere în vineri seară la primul cordon de sudură pe șantier luni la prânz — studiu de caz Uzinex pentru Future Energy Group.",
    images: [HERO_IMG],
    type: "article",
  },
};

const TIMELINE: Array<{ day: string; date: string; title: string; body: string }> = [
  {
    day: "Ziua 0",
    date: "Vineri, 17:42",
    title: "Cerere primită pe WhatsApp",
    body:
      "Director producție FEG ne contactează direct: aparatul lor de sudură industrială cedase în după-amiaza aceea, la 36h de demararea operațiunilor pe un șantier de stație electrică contractat cu termen ferm.",
  },
  {
    day: "Ziua 0",
    date: "Vineri, 19:10",
    title: "Confirmare stoc + ofertă",
    body:
      "Inginer comercial verifică stocul depozit Iași, trimite ofertă fermă pentru aparat sudură industrială MIG/MAG echivalent + accesorii. Acceptată la 19:55.",
  },
  {
    day: "Ziua 1",
    date: "Sâmbătă",
    title: "Pregătire transport + verificare tehnică",
    body:
      "Echipa tehnică Uzinex testează echipamentul în depozit (parametri sudură, ciclu de lucru, calibrare amperaj) înainte de livrare. Set consumabile pre-configurat pentru oțel structural S355.",
  },
  {
    day: "Ziua 3",
    date: "Luni, 09:00",
    title: "Livrare fizică la sediul FEG · Iași",
    body:
      "Transport propriu Uzinex, fără intermediar. Descărcare cu motostivuitor pus la dispoziție de FEG.",
  },
  {
    day: "Ziua 3",
    date: "Luni, 09:00 – 11:00",
    title: "Commissioning · 2 ore",
    body:
      "Conectare electrică, calibrare cu probe pe oțel S355 din lotul șantierului, training operatori (2 sudori), verificare parametri MIG cu placa de probă.",
  },
  {
    day: "Ziua 3",
    date: "Luni, 13:30",
    title: "Primul cordon de sudură pe șantier",
    body:
      "Echipa FEG sudează prima componentă pe stația energetică. Termen contractual respectat. Penalitate evitată: 14.500 RON/zi întârziere.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "2h",
    label: "Commissioning + training",
    detail:
      "De la sosire la prima sudură de probă acceptată — fără tichet de service deschis ulterior.",
  },
  {
    value: "72h",
    label: "Cerere → producție",
    detail:
      "Vineri 17:42 cerere, luni 13:30 prima sudură pe șantier. Inclusiv weekend.",
  },
  {
    value: "100%",
    label: "Conformitate suduri",
    detail:
      "Inspecție VT + RT pe primele 12 cordoane critice — rebut zero la dirigintele de șantier.",
  },
  {
    value: "85%",
    label: "Reducere downtime estimat",
    detail:
      "Față de scenariul „comandă echipament nou pe canal standard” estimat la ~14 zile.",
  },
  {
    value: "14.500",
    label: "RON / zi penalitate evitată",
    detail:
      "Calcul pe baza clauzei contract energetic — minim o zi întârziere ar fi declanșat penalități.",
  },
  {
    value: "60 luni",
    label: "Garanție echipament",
    detail:
      "Standard Uzinex pe toate aparatele de sudură industriale livrate, cu intervenție sub 24h.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Cablajul de la fața locului era sub-standard",
    body:
      "La ora 09:30 luni dimineață, la conectare, am descoperit că secțiunea cablurilor de alimentare existente la FEG (16 mm²) era sub-dimensionată pentru intensitatea nominală a noului aparat. Am livrat în 90 min un set de cabluri 25 mm² din depozitul Iași și am refăcut conectarea. Întârziere netă: 1h 20min. Lecție pentru clienți: la upgrade de putere, verifică secțiunea cablajului de alimentare ÎNAINTE de comandă — nu după. Trimitem o fișă tehnică pre-comandă cu cerințele de instalație începând cu acest proiect.",
  },
  {
    title: "Trainingul standard de 30 min nu a fost suficient",
    body:
      "Operatorii FEG aveau experiență doar cu un model invertor TIG mai vechi. Tranziția la noul controller MIG sinergic a cerut training extins la 90 min, cu probă pe placa de control. Am rămas pe șantier până la 14:00 pentru asistență la primele 12 cordoane. Lecție: pentru clienți cu echipamente legacy, recomandăm acum implicit pachetul de training extins (90–120 min) din prima discuție comercială.",
  },
  {
    title: "Decizia de stoc a fost critică",
    body:
      "Dacă echipamentul ar fi trebuit comandat la furnizor și expediat din afara țării, termenul minim ar fi fost 9–14 zile lucrătoare — peste fereastra contractuală a FEG. Politica noastră de a păstra în depozitul Iași stoc tampon din 4 categorii de echipamente critice (sudură, tăiere, manipulare, instrumentație) a făcut diferența. Costul de oportunitate al stocului local s-a amortizat într-o singură zi.",
  },
];

const EQUIPMENT: Array<{ name: string; spec: string; href: string }> = [
  {
    name: "Aparat sudură industrială MIG/MAG sinergic",
    spec: "350A · ciclu de lucru 60% · controller digital · compatibil oțel structural S355, S420",
    href: "/contact?subject=Aparat%20sudur%C4%83%20industrial%C4%83%20MIG%2FMAG",
  },
  {
    name: "Set cabluri putere 25 mm² + reductor presiune",
    spec: "Cabluri Cu izolație neopren · reductor 2 trepte cu manometru dublu · regulator debit",
    href: "/contact?subject=Set%20cabluri%20%C8%99i%20accesorii%20sudur%C4%83",
  },
  {
    name: "Pistol MIG răcit cu apă + kit consumabile S355",
    spec: "Pistol MB 401 · 4m · duze + difuzori + sârmă SG2 1.2mm · gaz protector M21 (Ar+CO₂)",
    href: "/contact?subject=Consumabile%20sudur%C4%83%20MIG%20S355",
  },
  {
    name: "Sistem de protecție operator",
    spec: "Mască sudură auto-întunecare DIN 4/9-13 · mănuși · șorț din piele crupon · aspirator local fum",
    href: "/contact?subject=Sistem%20protec%C8%9Bie%20operator%20sudur%C4%83",
  },
];

export default function FegCaseStudyPage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    { name: "Future Energy Group", url: `/studii-de-caz/${SLUG}` },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title: "Future Energy Group — sudură industrială pusă în funcțiune în 2 ore",
    excerpt:
      "Cum am livrat în 72h o instalație de sudură industrială pentru un șantier energetic cu termen contractual ferm — cifre, timeline real și lecții învățate.",
    category: "Studiu de caz",
    datePublished: "2026-03-12",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Instalație de sudură industrială Uzinex pentru Future Energy Group",
    description:
      "Walkthrough livrare și commissioning aparat sudură industrială MIG/MAG pentru Future Energy Group, Iași — pus în funcțiune în 2 ore.",
    youtubeId: YT_ID,
    uploadDate: "2026-03-12T10:00:00Z",
    duration: "PT1M42S",
  });

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
                    Energie & infrastructură
                  </span>
                  <span>· Iași, RO</span>
                  <span>· 2026</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-5"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Future Energy Group:<br />
                  <span className="font-light text-uzx-orange">
                    de la cerere vineri seară la primul cordon de sudură luni la 13:30.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-ink-600 leading-relaxed max-w-2xl">
                  Aparatul de sudură principal s-a defectat la 36h de demararea unui
                  șantier energetic cu termen contractual ferm. Livrare echipament,
                  punere în funcțiune și training — în 72h, weekend inclus. Penalitate
                  evitată: 14.500 RON / zi.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="72h" label="Cerere → producție" />
                  <HeroStat value="2h" label="Commissioning" />
                  <HeroStat value="100%" label="Conformitate suduri" />
                </div>
              </div>

              <div className="lg:col-span-5">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Future Energy Group · livrare și commissioning în 2 ore"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ CLIENT */}
        <Section number="01" eyebrow="Cartelă client">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-12">
            <FactBlock label="Client" value="Future Energy Group S.R.L." />
            <FactBlock label="Industrie" value="Energie & infrastructură" />
            <FactBlock label="Locație" value="Iași, România" />
            <FactBlock label="Anul proiect" value="2026" />
            <FactBlock label="Dimensiune" value="~45 angajați" />
            <FactBlock label="Profil" value="Producător echipamente energetice" />
            <FactBlock label="Tip proiect" value="Echipare șantier · livrare urgentă" />
            <FactBlock label="Status" value="Operațional · sub garanție" />
          </div>
        </Section>

        {/* 2. PUNCTUL DE PLECARE */}
        <Section number="02" eyebrow="Punctul de plecare">
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6 max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Nu „voiau să se digitalizeze". Aveau un aparat defect și 36h până la primul
            cordon contractat.
          </h2>
          <div className="prose-uzx max-w-3xl space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
            <p>
              Future Energy Group avea contractat echiparea unei stații electrice
              regionale. Termenul ferm: prima sudură pe componentele structurale luni
              dimineață, dirigintele de șantier prezent la inspecția cordoanelor.
            </p>
            <p>
              Vineri la 16:30 — cu 36 de ore înainte de demararea operațiunilor —
              aparatul lor principal de sudură industrială a cedat în atelierul de
              pre-fabricație. Plăcile de control de pe controller-ul invertor s-au
              ars. Reparația estimată de service-ul autorizat: 7–10 zile lucrătoare,
              piesă de schimb din afara țării.
            </p>
            <p>
              <strong className="text-ink-900">Riscul real:</strong> contract anulat sau
              penalitate de 14.500 RON pentru fiecare zi de întârziere. Plus reputația
              de subcontractor cu termen depășit pe un proiect cu finanțator
              instituțional.
            </p>
            <p className="text-ink-500 italic border-l-2 border-uzx-orange pl-5 mt-6">
              „Nu aveam timp să cer trei oferte și să compar specificații. Aveam nevoie
              de cineva care să-mi spună în 30 de minute dacă rezolvă, și să fie aici
              luni dimineață."
              <span className="block not-italic mt-2 text-[11px] mono uppercase tracking-wider text-ink-400">
                — Director producție FEG, vineri 17:35
              </span>
            </p>
          </div>
        </Section>

        {/* 3. DE CE UZINEX */}
        <Section number="03" eyebrow="De ce ne-au ales pe noi · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Răspuns pe WhatsApp în 90 minute"
              body="Cererea a sosit la 17:42 vineri. Ofertă fermă cu disponibilitate în depozit Iași — la 19:10. Niciun alt furnizor contactat nu a confirmat stoc fizic în mai puțin de 24h."
            />
            <ReasonCard
              num="B"
              title="Stoc fizic în depozit Iași"
              body="Pe categoriile critice (sudură, tăiere, manipulare, instrumentație) păstrăm permanent stoc tampon. FEG putea ridica echipamentul personal sâmbătă dimineață dacă alegea — am livrat noi, cu transport propriu, luni la 9:00."
            />
            <ReasonCard
              num="C"
              title="Garanția de 60 luni + intervenție sub 24h"
              body="Subcontractor pe șantier energetic = orice oprire neplanificată ulterior costă scump. Cei 60 de luni standard pe aparate de sudură au fost decisivi — față de 24 luni la importatorii direcți."
            />
          </div>
          <p className="text-sm text-ink-500 italic mt-8 max-w-3xl">
            Au comparat 2 oferte. Una avea preț cu ~9% mai mic dar livrare „în maxim 5
            zile lucrătoare". Au ales pe noi pentru certitudinea de luni dimineață.
            Diferența s-a recuperat în prima zi.
          </p>
        </Section>

        {/* 4. SOLUȚIA CONFIGURATĂ */}
        <Section number="04" eyebrow="Soluția configurată">
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-8 max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Aparat de sudură + accesorii configurate pentru oțel structural S355.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {EQUIPMENT.map((eq) => (
              <Link
                key={eq.name}
                href={eq.href}
                className="border hairline bg-white p-5 lg:p-6 hover:border-uzx-blue group transition flex flex-col"
              >
                <div className="serif text-base lg:text-lg text-ink-900 leading-snug mb-2 group-hover:text-uzx-blue transition">
                  {eq.name}
                </div>
                <div className="text-xs lg:text-sm text-ink-500 leading-relaxed flex-1">
                  {eq.spec}
                </div>
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mt-4 inline-flex items-center gap-2">
                  Cere ofertă similară
                  <span className="group-hover:translate-x-1 transition">→</span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* 5. TIMELINE */}
        <Section number="05" eyebrow="Timeline livrare · date reale">
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
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-[10px] mono uppercase tracking-widest text-uzx-orange">
                      {t.day}
                    </span>
                    <span className="text-[10px] mono uppercase tracking-widest text-ink-400 num">
                      {t.date}
                    </span>
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

        {/* 6. REZULTATE */}
        <Section number="06" eyebrow="Rezultate cuantificate" tone="dark">
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
        </Section>

        {/* 7. CITAT CLIENT */}
        <section className="border-b hairline bg-ink-50 py-14 lg:py-20">
          <div className="container-x">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-6">
                07 / Citat client
              </div>
              <blockquote
                className="serif text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-snug"
                style={{ letterSpacing: "-0.02em" }}
              >
                „Au fost lângă noi luni la 8 dimineața să verifice primele 12 cordoane
                pe șantier — fără să-i fi rugat. Asta nu se vede în PDF-ul de ofertă,
                dar asta înseamnă <span className="text-uzx-orange">subcontractor
                serios</span>."
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="w-10 h-px bg-ink-300" />
                <div className="text-left">
                  <div className="text-sm text-ink-900 serif">Director producție</div>
                  <div className="text-[11px] mono uppercase tracking-wider text-ink-400 mt-1">
                    Future Energy Group · Iași
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERVICE POST-LIVRARE */}
        <Section number="08" eyebrow="Service post-livrare · primele 90 zile">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Aici se vinde efectiv garanția de 60 luni.
              </h2>
              <p className="text-ink-600 leading-relaxed">
                După instalare urmărim activ comportamentul echipamentului în primele
                90 de zile — perioada în care apar majoritatea problemelor de fit
                operațional. Toate intervențiile sunt acoperite de garanția standard.
              </p>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y hairline border-y hairline">
                <ServiceRow
                  label="Intervenții pe șantier"
                  value="2 vizite preventive"
                  detail="Verificare cordoane în T-uri critice (zilele 14 și 45) — la cerere FEG, fără cost."
                />
                <ServiceRow
                  label="Tichete service deschise"
                  value="0"
                  detail="Niciun defect tehnic raportat pe echipament în primele 90 zile."
                />
                <ServiceRow
                  label="Timp mediu răspuns telefon"
                  value="< 4 minute"
                  detail="Pe linia dedicată tehnică Uzinex, în ore lucrătoare."
                />
                <ServiceRow
                  label="Piese consumabile livrate"
                  value="2 seturi · luna 1 + luna 3"
                  detail="Duze, difuzori, sârmă SG2 — abonament setat automat la commissioning."
                />
                <ServiceRow
                  label="Garanție rămasă"
                  value="58 luni · până 03/2031"
                  detail="Inclusiv schimb piese OEM, manopera, deplasare."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 9. GALERIE */}
        <Section number="09" eyebrow="Galerie · livrare și commissioning">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
            <div className="lg:col-span-8 lg:row-span-2">
              <VideoPlayer
                youtubeId={YT_ID}
                thumbnail={HERO_IMG}
                title="Walkthrough complet livrare + commissioning · 1:42"
              />
            </div>
            <GalleryTile
              src={`https://img.youtube.com/vi/${YT_ID}/hq1.jpg`}
              alt="Aparat sudură industrial pregătit pentru transport în depozitul Uzinex Iași"
              caption="Pregătire transport · sâmbătă dimineață"
            />
            <GalleryTile
              src={`https://img.youtube.com/vi/${YT_ID}/hq2.jpg`}
              alt="Calibrare aparat sudură MIG/MAG cu probă pe oțel structural S355 la sediul Future Energy Group"
              caption="Calibrare cu probă · luni 09:30"
            />
            <GalleryTile
              src={`https://img.youtube.com/vi/${YT_ID}/hq3.jpg`}
              alt="Training operatori sudură FEG · controller MIG sinergic"
              caption="Training operatori · luni 10:30"
            />
            <GalleryTile
              src={`https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`}
              alt="Primul cordon de sudură pe șantierul stației electrice — proiect Future Energy Group"
              caption="Primul cordon pe șantier · luni 13:30"
            />
          </div>
        </Section>

        {/* LECȚII (onestitate calculată) */}
        <section className="border-b hairline bg-ink-900 text-white py-14 lg:py-20">
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                  Lecții & provocări
                </div>
                <h2
                  className="serif text-2xl lg:text-3xl leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Ce nu a mers din prima<br />
                  <span className="font-light text-white/70">și cum am rezolvat.</span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Niciun proiect industrial nu se livrează „totul perfect din prima".
                  Aici e ce a apărut neașteptat — și ce am schimbat în procesul nostru
                  ca să nu se repete.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                {LESSONS.map((l, i) => (
                  <div
                    key={i}
                    className="border-l-2 border-uzx-orange pl-5 lg:pl-6"
                  >
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

        {/* 10. PAYBACK CALCULATOR */}
        <Section number="10" eyebrow="Calculator payback · estimează cazul tău">
          <p className="text-ink-600 max-w-2xl mb-8 lg:mb-10 leading-relaxed">
            Introdu valorile tale operaționale și vezi în câte luni se amortizează o
            decizie similară. Funcționează indiferent de tipul de echipament — sudură,
            tăiere, manipulare, ambalare. Datele rămân la tine, nimic nu se trimite
            pe server.
          </p>
          <PaybackCalculator />
        </Section>

        {/* CTA SPECIFIC */}
        <section className="border-b hairline py-14 lg:py-20 bg-uzx-blue text-white">
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-white/70 mb-4">
                  Vreau o soluție similară
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Ai un termen ferm<br />
                  <span className="font-light text-uzx-orange">și echipamentul a cedat?</span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Sună-ne acum. Verificăm stocul Iași în maxim 30 de minute și îți
                  spunem cinstit dacă rezolvăm — sau dacă mai sigur e să-ți recomandăm
                  alt furnizor. Nu pierdem timpul nimănui.
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
                  href="/contact?subject=Echipament%20sudur%C4%83%20industrial%C4%83%20%E2%80%94%20livrare%20urgent%C4%83&context=Studiu%20de%20caz%20Future%20Energy%20Group"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Cere ofertă pre-completată
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Răspuns garantat în 90 minute pe ore lucrătoare. Pe weekend, prin
                  WhatsApp, în maxim 4 ore.
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
        <div
          className={`text-[11px] mono uppercase tracking-[0.2em] mb-8 lg:mb-10 ${
            isDark ? "text-uzx-orange" : "text-uzx-orange"
          }`}
        >
          {number} / {eyebrow}
        </div>
        {children}
      </div>
    </section>
  );
}

function FactBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-2">
        {label}
      </div>
      <div className="serif text-base lg:text-lg text-ink-900 leading-tight">
        {value}
      </div>
    </div>
  );
}

function ReasonCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="border hairline bg-white p-6 lg:p-7 flex flex-col h-full">
      <div className="serif text-3xl text-uzx-orange mb-4 num leading-none">{num}</div>
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
      <div className="serif text-base lg:text-lg text-ink-900 num md:text-right md:min-w-[180px] md:self-center">
        {value}
      </div>
    </div>
  );
}

function GalleryTile({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="lg:col-span-2 relative aspect-[4/3] bg-ink-100 overflow-hidden group">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover grayscale-[15%] group-hover:grayscale-0 transition duration-500"
      />
      <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] mono uppercase tracking-wider">
        {caption}
      </figcaption>
    </figure>
  );
}
