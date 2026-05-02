import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import {
  breadcrumbSchema,
  articleSchema,
  faqSchema,
} from "@/lib/seo";
import {
  NatoDiagramFigure,
  HangarDiagram,
  WindCompareDiagram,
  MuscleMemoryDiagram,
  HAZComparisonDiagram,
  MultiAppDiagram,
} from "./diagrams";
import { PenaltyRiskCalculator } from "./interactive";

const SLUG = "baza-nato-aluminium-laser";

export const metadata: Metadata = {
  title:
    "Studiu de caz · 5 aparate sudură laser pe o bază NATO din România · contractor apărare",
  description:
    "Cum un contractor român cu acreditare NATO a livrat hangare expediționare din aluminiu pe o bază militară terestră, cu termen ferm și penalități, în condiții meteo care făceau imposibilă sudura MIG sau TIG. Soluția: 5 aparate laser identice, 3 active și 2 în standby, operate de oameni fără experiență care s-au adaptat mai rapid decât sudorii cu zece ani vechime.",
  keywords: [
    "aparat sudura laser baza nato",
    "hangare aluminiu baza militara",
    "sudura aluminiu vant ploaie",
    "contractor aparare romania",
    "abonament inlocuire 24h echipament",
    "AWS D17.1 sudura aluminiu",
    "NATO STANAG construcții expeditionare",
    "sudor laser fara experienta",
    "TIG MIG aluminiu in vant",
    "redundanta echipamente santier",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title: "5 aparate laser pe o bază NATO · vremea bloca sudura conventională",
    description:
      "Hangare expediționare din aluminiu pe o bază NATO terestră din România, livrate la termen ferm cu vânt 7 m/s și ploaie. Cum laserul a făcut posibilă sudura când TIG și MIG nu mai puteau lucra.",
    type: "article",
    locale: "ro_RO",
  },
};

const PROFILE: Array<{ label: string; value: string }> = [
  { label: "Client", value: "Contractor român · construcții apărare" },
  { label: "Acreditare", value: "NATO terestră · clearance securitate" },
  { label: "Sediu", value: "București, România" },
  { label: "Echipă", value: "31 angajați" },
  { label: "Aplicație", value: "Hangare aluminiu · bază NATO RO" },
  { label: "Volum livrat", value: "5 unități laser identice" },
  { label: "Tip vânzare", value: "Direct + abonament înlocuire 24h" },
  { label: "Confidențialitate", value: "Anonimizat la cererea clientului · OPSEC" },
];

const ALU_REASONS: Array<{ title: string; body: string }> = [
  {
    title: "Greutate redusă pentru hangare expediționare",
    body:
      "Un hangar din aluminiu cântărește între o treime și jumătate din echivalentul din oțel. Pentru construcții expediționare care trebuie transportate, asamblate rapid și eventual relocate, fiecare tonă mai puțin înseamnă mai puține curse de transport, fundații mai simple și echipe mai mici de montaj.",
  },
  {
    title: "Rezistență la coroziune în mediu deschis",
    body:
      "Aluminiul formează natural un strat de oxid pasiv care îl protejează de coroziune fără pasivare suplimentară. Pentru hangare amplasate în câmp, expuse la umiditate, înghețuri repetate și praf, asta înseamnă mentenanță minimă și durată de viață crescută față de oțelul vopsit.",
  },
  {
    title: "Profil electromagnetic și termic favorabil",
    body:
      "Aluminiul nu este magnetic, ceea ce contează în medii cu echipamente sensibile la câmp magnetic. Conductivitatea termică ridicată permite hangarului să disipe căldura rapid, iar amprenta termică în infraroșu este mai uniformă decât la oțel.",
  },
  {
    title: "Aliniere cu standardele NATO pentru rapid-deploy",
    body:
      "Standardele NATO pentru infrastructura expediționară, cu referință la STANAG-urile din familia logistică terestră, favorizează aluminiul seria 5xxx, în special aliajele 5083 și 5754, pentru aplicații de tip rapid-deploy. Caracteristicile mecanice rămân stabile pe intervale largi de temperatură, iar materialul este sudabil cu tehnologii moderne fără tratament termic post-sudură.",
  },
];

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial",
    title: "Au sunat după ce ne-au găsit pe Google",
    body:
      "Contractorul a căutat activ soluții pentru sudură pe aluminiu compatibile cu condițiile de șantier ale unei baze NATO terestre din România. Au descoperit reclama noastră Google pentru aparate laser industriale și au sunat direct la CEO-ul Uzinex. Conversația a început tehnic, sub presiune de timp.",
  },
  {
    phase: "Decizia",
    title: "Cumpărare directă, fără probă în custodie",
    body:
      "Spre deosebire de alți clienți care cer probă fizică înainte de plată, contractorul a cumpărat direct cele 5 unități. Motivul: termenul ferm contractual cu penalități zilnice nu permitea pierderea unei zile pentru validare. Decizia a fost ancorată în trei elemente concrete: nevoia tehnică imposibil de acoperit cu MIG sau TIG, garanția standard Uzinex de 60 de luni cu suport tehnic, și abonamentul de înlocuire în 24 de ore în caz de defect.",
  },
  {
    phase: "Livrare etapizată",
    title: "2 unități din stoc + 3 prin import aerian în 15 zile",
    body:
      "Două aparate au fost livrate în 24-48 de ore din stoc local, suficiente pentru pornirea șantierului. Restul de 3 unități au sosit în 15 zile lucrătoare prin import aerian, completând echipa de 3 active plus 2 în standby imediat lângă șantier.",
  },
  {
    phase: "Punere în funcțiune",
    title: "Commissioning în două etape, training 2 ore per echipă",
    body:
      "Punerea în funcțiune s-a făcut secvențial: întâi cele 2 unități din stoc, apoi cele 3 din import. Trainingul a durat circa două ore pentru fiecare echipă de operatori, suficient pentru autonomie completă. Software-ul aparatelor este în limba română, iar manualul digital cu inteligență artificială permite rezolvarea problemelor curente fără apel la suport.",
  },
  {
    phase: "Service post-livrare",
    title: "Un singur incident, rezolvat remote în 30 minute",
    body:
      "Pe parcursul utilizării, o singură unitate a avut un bug software. Conexiunea remote securizată ne-a permis să diagnosticăm și să remediem problema în 30 de minute, fără deplasare la baza NATO. Pentru un client cu clearance de securitate, capacitatea de intervenție remote validată tehnic a fost decisivă.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "5 unități",
    label: "Echipamente livrate",
    detail:
      "Configurație identică pe toate aparatele, 2.000W cu sursă MAX și pistol SUP23T. Distribuție 3 active plus 2 în standby pentru redundanță.",
  },
  {
    value: "0 ore",
    label: "Pierdere pentru vreme rea",
    detail:
      "Spre deosebire de TIG sau MIG, laserul nu este afectat de vânt și ploaie. Echipa a putut lucra continuu pe parcursul șantierului.",
  },
  {
    value: "30 min",
    label: "Răspuns remote la bug software",
    detail:
      "Singurul incident pe parcursul utilizării. Rezolvat la distanță, fără deplasare la baza NATO și fără pierdere operațională semnificativă.",
  },
  {
    value: "2 ore",
    label: "Training per echipă",
    detail:
      "Software în limba română și manual cu inteligență artificială. Operatorii fără experiență de sudură au atins conformitate înainte de finalul zilei.",
  },
  {
    value: "12 luni",
    label: "Pachet consumabile inițial",
    detail:
      "Set complet de lentile de protecție și piese de uzură pentru toate cele 5 aparate, suficient pentru un an de operare continuă.",
  },
  {
    value: "60 luni",
    label: "Garanție echipament",
    detail:
      "Standard Uzinex pe toate aparatele de sudură cu laser, cu suport tehnic și acoperire piese OEM, manopera, deplasare.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Pe proiecte cu termen ferm și penalități, redundanța 60% e mai ieftină decât întârzierea",
    body:
      "Cele 2 unități standby au reprezentat sub 30% din valoarea totală a comenzii. O singură zi de întârziere contractuală ar fi depășit această sumă, iar pe șantier cu echipe în mai multe schimburi backup-ul a permis continuitate fără pauze de înlocuire piese sau diagnoză. Pentru contractori publici cu termene ferme, redundanța nu este un cost, ci o asigurare ieftină.",
  },
  {
    title: "Curba de învățare la sudori experimentați poate fi negativă pe tehnologii noi",
    body:
      "Sudorii cu zece ani de experiență MIG sau TIG au sudat constant mai prost decât operatorii fără experiență anterioară. Reflexul automatizat de pendulare în zig-zag, esențial pentru sudura conventională pe aluminiu subțire, scoate fasciculul laser din zona de focalizare și produce cordoane neuniforme. Pe acest șantier, sudorii experimentați au fost mutați la pregătirea materialelor, adică debavurare, fitting și alignment, iar laserele au fost operate de oameni necalificați cu rezultate mai bune.",
  },
  {
    title: "Vremea în România este un avantaj competitiv consistent pentru laser",
    body:
      "Pe șantierele din câmp, un număr semnificativ de zile pe an au vânt peste 5 m/s sau precipitații care fac sudura conventională pe aluminiu subțire imposibilă fără cort tehnic și fără ralizarea unui mediu controlat. Laserul elimină dependența de cort, de gaz protector în volume mari și de cordoane laminat plane. Pentru contractori care construiesc în teren deschis, aceasta este diferența între termen respectat și penalitate.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "De ce nu a funcționat sudura MIG sau TIG pe șantierul de pe baza NATO?",
    answer:
      "Sudura TIG și MIG depinde de un flux de gaz protector, Argon pur sau mix Argon cu CO₂, în jurul arcului. Vântul peste 5-7 m/s deviază gazul din zona băii de sudură, iar oxigenul atmosferic intră în topitură. Pe aluminiu subțire de 3-4 mm tipic pentru hangare expediționare, rezultatul este porozitate, oxizi de aluminiu și cordoane respinse la inspecție. Standardele aerospatiale precum AWS D17.1 cer mediu controlat pentru sudura aluminiului. Sudura laser are zona afectată termic foarte mică, fascicul focalizat și volum minim de gaz, ceea ce o face practic imună la vânt și ploaie.",
  },
  {
    question: "De ce aluminiu pentru hangarele de pe baza NATO și nu oțel?",
    answer:
      "Patru motive verificabile. Greutatea redusă, sub jumătate din echivalentul din oțel, facilitează transportul și asamblarea rapidă a hangarelor expediționare. Rezistența naturală la coroziune elimină nevoia de pasivare și reduce costul de mentenanță în câmp. Aluminiul nu este magnetic, ceea ce este avantajos în medii cu echipamente sensibile, iar amprenta termică este mai uniformă. Standardele NATO pentru infrastructură expediționară favorizează aliajele de aluminiu serie 5xxx, sudabile cu tehnologii moderne fără tratament post-sudură.",
  },
  {
    question: "Cum este posibil ca operatorii fără experiență să sudeze mai bine decât sudorii cu zece ani vechime?",
    answer:
      "Sudura MIG și TIG cere o mișcare de pendulare în zig-zag, prin care pistolul „pictează” baia de sudură pe lățimea cordonului. După mii de ore de practică, această mișcare devine automatizată reflexă, iar sudorul nu o mai gândește deloc, mâna o face singură. Sudura laser cere exact opusul: mișcare strict liniară uniformă, fără pendulare, pentru că fasciculul are deja focalizare definită. Sudorul cu zece ani de experiență „luptă” cu reflexul propriu și produce cordoane neuniforme. Operatorul fără experiență învață direct mișcarea liniară pe care o cere laserul și ajunge la conformitate în două ore de training. Acest paradox îl observăm pe aproape toate proiectele de sudură laser pe care le-am livrat.",
  },
  {
    question: "Ce înseamnă concret abonamentul de înlocuire în 24 de ore pentru aparate laser?",
    answer:
      "Este un model asemănător leasing-ului operațional pentru utilaje critice. Clientul plătește aparatele plus o taxă de abonament lunară. În caz de defect care necesită intervenție extinsă, livrăm un aparat de schimb în 24 de ore care rămâne la client până la remedierea celui original. Pentru contractori cu proiecte sub termen ferm și penalități zilnice, garanția standard de 60 luni nu este suficientă, iar abonamentul transformă echipamentul într-un serviciu cu uptime garantat. Detalii tehnice și niveluri de SLA pe pagina noastră de [abonamente service](/service/abonamente).",
  },
  {
    question: "Cum s-a asigurat securitatea conexiunii remote pentru un client cu clearance NATO?",
    answer:
      "Conexiunea remote pe care am folosit-o pentru rezolvarea bug-ului software este criptată end-to-end și inițiată exclusiv de la fața locului. Operatorul de pe șantier deschide sesiunea, controlează ce vede tehnicianul Uzinex și o închide la final. Aparatul nu rămâne accesibil din afară permanent. Pentru clienți cu cerințe suplimentare de securitate, putem opera și în regim de intervenție pur telefonică, ghidând operatorul pas cu pas, sau cu deplasare fizică sub supraveghere.",
  },
  {
    question: "De ce este utilă o redundanță de 60%, cu 2 unități standby la 3 active, pe un proiect cu termen ferm?",
    answer:
      "Pentru un șantier cu echipe în mai multe schimburi și termen contractual cu penalități zilnice, valoarea unei zile de pauză depășește valoarea unui aparat de schimb. Două aparate în standby permit continuitate completă în caz de defecțiune, intervenție de mentenanță programată sau rotație pentru consumabile. Costul lor se amortizează deja la prima zi de întârziere evitată. Strategia este standard în industrii militare și aerospatiale unde uptime-ul este obligatoriu.",
  },
  {
    question: "Cât durează trainingul operatorilor pe un aparat laser 3-in-1?",
    answer:
      "Aproximativ două ore per echipă, indiferent dacă operatorii au sau nu experiență anterioară de sudură. Software-ul aparatelor este în limba română, iar fiecare aparat este livrat cu manual digital de mentenanță și utilizare cu inteligență artificială. Operatorii pot pune întrebări manualului în limbaj natural și pot rezolva probleme operaționale curente fără apel la suport tehnic. Detalii pe pagina [manual AI](/service/manual-ai).",
  },
];

export default function NatoCasePage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    {
      name: "Bază NATO · 5 aparate laser",
      url: `/studii-de-caz/${SLUG}`,
    },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title:
      "Bază NATO România · 5 aparate laser pentru hangare aluminiu pe vreme imposibilă pentru TIG/MIG",
    excerpt:
      "Contractor român cu acreditare NATO livrează hangare expediționare din aluminiu pe o bază militară terestră, cu termen ferm și vânt care făcea imposibilă sudura conventională. Soluția: 5 aparate laser identice, dintre care 3 active și 2 în standby.",
    category: "Studiu de caz · Apărare & infrastructură",
    datePublished: "2025-03-15",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header solid />

      <main className="bg-white">
        {/* HERO — military tone */}
        <section
          className="border-b text-white relative overflow-hidden"
          style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
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
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 text-[10px] lg:text-[11px] mono uppercase tracking-[0.2em] text-white/70 mb-5">
                  <span className="bg-uzx-orange text-white px-2 py-0.5">
                    Apărare & infrastructură
                  </span>
                  <span>· Bază NATO România</span>
                  <span className="text-uzx-orange">· OPSEC anonimizat</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-white leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  5 aparate laser pentru o bază NATO<br />
                  <span className="font-light text-uzx-orange">
                    unde vremea bloca sudura conventională.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-2xl">
                  Un contractor român cu acreditare pentru construcții de apărare a
                  livrat hangare expediționare din aluminiu pe o bază NATO terestră
                  din România, cu termen ferm și penalități zilnice. Vântul și
                  ploaia făceau imposibilă sudura MIG sau TIG pe aluminiu subțire.
                  Soluția: 5 aparate laser identice, 3 active pe șantier și 2 în
                  standby imediat, operate de oameni fără experiență de sudură care
                  s-au adaptat mai rapid decât sudorii cu zece ani vechime.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-10 max-w-xl">
                  <HeroStat value="5" label="Unități · 3 active + 2 standby" />
                  <HeroStat value="24h" label="Înlocuire la defect · abonament" />
                  <HeroStat value="0 ore" label="Pierdere pentru vreme rea" />
                </div>
              </div>

              <aside className="lg:col-span-4">
                <div
                  className="border border-white/15 p-5 lg:p-6"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
                    Confidențialitate operațională
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    Toate datele care ar permite identificarea clientului, locației
                    bazei sau a destinației operaționale a hangarelor au fost
                    omise la cererea clientului. Restul informațiilor, precum
                    contextul tehnic, configurația livrării și lecțiile, sunt
                    reale și verificabile la sediul Uzinex.
                  </p>
                  <div className="border-t border-white/10 mt-5 pt-5">
                    <div className="text-[10px] mono uppercase tracking-widest text-white/50 mb-2">
                      Studiu de caz conex
                    </div>
                    <Link
                      href="/studii-de-caz/future-energy-group"
                      className="text-sm text-white hover:text-uzx-orange underline-link transition"
                    >
                      Future Energy Group · atelier civil cu același echipament →
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ */}
        <Section number="01" eyebrow="Cartelă client · anonimizat la cerere">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-12">
            {PROFILE.map((p) => (
              <FactBlock key={p.label} label={p.label} value={p.value} />
            ))}
          </div>
        </Section>

        {/* 2. DE CE ALUMINIU */}
        <Section number="02" eyebrow="De ce aluminiu pentru hangare militare · patru motive verificabile">
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-8 max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Aluminiul nu este o decizie estetică pe construcții militare. Este o
            specificație tehnică cu argumente reproducibile.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {ALU_REASONS.map((r, i) => (
              <article key={i} className="border hairline bg-white p-6 lg:p-7">
                <div className="serif text-3xl text-uzx-orange mb-4 num leading-none">
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
        </Section>

        {/* 3. DE CE LASER ȘI NU TIG/MIG */}
        <Section number="03" eyebrow="De ce vremea bloca sudura conventională">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                TIG și MIG depind de un gaz protector pe care vântul îl ia din baia
                de sudură. Laserul nu are această dependență.
              </h2>
              <div className="space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
                <p>
                  Sudura aluminiului subțire în atmosferă deschisă cu MIG sau TIG
                  cere un flux constant de gaz protector în jurul arcului, Argon
                  pur la TIG sau mix Argon plus CO₂ la MIG. Gazul împiedică oxigenul
                  atmosferic să ajungă la baia de topitură. Aluminiul oxidează
                  instantaneu în prezența oxigenului, formând oxizi cu temperatură
                  de topire mult mai mare decât metalul de bază. Rezultatul: porozitate,
                  cordoane neuniforme, defecte respinse la inspecție.
                </p>
                <p>
                  La un vânt de peste 5-7 metri pe secundă, pe care îl întâlnești
                  curent pe șantierele din România, gazul protector este pur și
                  simplu suflat din zona de lucru. Standardele aerospatiale precum
                  AWS D17.1 pentru sudura aluminiului cer explicit medii controlate.
                  Pe șantier deschis, asta înseamnă cort tehnic etanș, ventilație
                  controlată și consum semnificativ de gaz, cu pierderi mari de
                  productivitate.
                </p>
                <p>
                  <strong className="text-ink-900">Sudura laser elimină problema
                  fundamental.</strong> Fasciculul focalizat are zona afectată
                  termic de ordinul fracțiunilor de milimetru, gazul de asistență
                  este consumat în volum minim direct prin nozzle, iar fasciculul
                  în sine nu este afectat de mediul atmosferic. La vânt 7 m/s și
                  ploaie, aparatul lucrează identic cu o zi calmă în atelier
                  închis. Pentru un șantier pe termen ferm, aceasta este diferența
                  între respectarea contractului și plata penalităților.
                </p>
              </div>
            </div>
            <aside className="lg:col-span-5 border hairline bg-ink-50 p-6 lg:p-8">
              <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
                Comparație rapidă · sudură pe aluminiu în câmp deschis
              </div>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b hairline">
                    <th className="text-left py-2 text-[10px] mono uppercase tracking-widest text-ink-400">
                      Criteriu
                    </th>
                    <th className="text-right py-2 text-[10px] mono uppercase tracking-widest text-ink-400">
                      TIG / MIG
                    </th>
                    <th className="text-right py-2 text-[10px] mono uppercase tracking-widest text-uzx-orange">
                      Laser
                    </th>
                  </tr>
                </thead>
                <tbody className="text-ink-700">
                  {[
                    ["Vânt > 5 m/s", "Reject", "OK"],
                    ["Ploaie", "Întrerupere", "OK"],
                    ["Cort tehnic obligatoriu", "Da", "Nu"],
                    ["Consum de gaz", "Mare", "Minim"],
                    ["Curba învățare operator", "Ani", "≈ 2 ore"],
                    ["Aluminiu sub 4 mm", "Dificil", "Standard"],
                  ].map(([crit, tig, las]) => (
                    <tr key={crit} className="border-b hairline">
                      <td className="py-2.5 text-xs lg:text-sm">{crit}</td>
                      <td className="py-2.5 text-right text-xs lg:text-sm text-ink-500">{tig}</td>
                      <td className="py-2.5 text-right text-xs lg:text-sm text-uzx-orange font-medium">
                        {las}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-[11px] text-ink-500 mt-4 leading-relaxed">
                Estimări orientative pentru sudură pe aluminiu seria 5xxx, grosime
                3-4 mm, în condiții deschise de șantier.
              </p>
            </aside>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mt-10 lg:mt-14">
            <NatoDiagramFigure
              number="Schema 1 · imunitate la vânt și ploaie"
              diagram={<WindCompareDiagram />}
              caption="Stânga: TIG/MIG cu argonul suflat de vânt din zona arcului, oxigen în baia de sudură, porozitate, reject. Dreapta: laser cu fascicul focalizat și volum minim de gaz, cordon uniform conform indiferent de meteo."
            />
            <NatoDiagramFigure
              number="Schema 2 · zona afectată termic"
              diagram={<HAZComparisonDiagram />}
              caption="Arcul electric depune energie pe o suprafață largă, HAZ de 5-10 mm, distorsiune termică, îndreptare necesară. Laserul concentrează energia în punct, HAZ sub 0,5 mm, piesa se montează direct fără corecții geometrice."
            />
          </div>
        </Section>

        {/* 4. DE CE 5 UNITĂȚI */}
        <Section number="04" eyebrow="De ce cinci unități · strategia de redundanță">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-ink-600 text-base lg:text-[17px] leading-relaxed">
              <p>
                Pentru un șantier cu echipe în mai multe schimburi, cu termen ferm
                contractual și penalități zilnice, calculul nu este „câte aparate
                produc volumul de sudură" ci „câte aparate garantează continuitatea
                până la termen".
              </p>
              <p>
                <strong className="text-ink-900">Trei active</strong> dimensionează
                capacitatea de producție pe puncte de lucru simultane diferite ale
                hangarului. <strong className="text-ink-900">Două în standby</strong>{" "}
                imediat lângă șantier acoperă scenariile previzibile: schimb pentru
                mentenanță programată, înlocuire în caz de defecțiune neașteptată,
                rotație în timpul schimbării consumabilelor.
              </p>
              <p>
                Costul celor 2 unități standby reprezintă sub 30% din valoarea totală
                a comenzii. O singură zi de întârziere contractuală depășește această
                sumă. Redundanța de 60% nu este overengineering, este o asigurare
                simplă cu raport favorabil între cost și risc evitat.
              </p>
              <p className="text-ink-900 font-medium">
                Pentru clienți cu proiecte similare, această strategie de redundanță
                a devenit pattern-ul nostru standard de propunere. Recomandăm
                dimensionarea pe baza penalității zilnice contractuale, nu pe baza
                capacității teoretice de producție.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <NatoDiagramFigure
                  number="Schema 3 · distribuție echipamente pe șantier"
                  diagram={<HangarDiagram />}
                  caption="3 aparate active operate simultan pe puncte diferite ale structurii, 2 în standby imediat lângă șantier. Pentru un proiect cu termen ferm și penalități, redundanța de 60% costă mai puțin decât o singură zi de întârziere."
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
              title="Au cercetat și au sunat sub presiune de timp"
              body="Contractorul a căutat activ soluții pentru sudură pe aluminiu în condiții meteo dificile. Au descoperit reclama Google a Uzinex, au sunat direct la CEO și au început conversația tehnic, fără filtre comerciale. Termenul ferm cu penalități nu lăsa loc de prospectare extinsă."
            />
            <ReasonCard
              num="B"
              title="Decizia ancorată în trei elemente concrete"
              body="Necesitatea tehnică imposibil de acoperit cu MIG sau TIG pe vremea pe care o aveau. Garanția standard Uzinex de 60 luni cu suport tehnic inclus, cu detalii pe pagina noastră de [service inclus la livrare](/service). Și abonamentul de înlocuire în 24 de ore care transformă fiecare aparat într-un serviciu cu uptime garantat."
            />
            <ReasonCard
              num="C"
              title="Cumpărare directă, fără probă în custodie"
              body="Spre deosebire de antreprenorii civili care cer probă fizică înainte de plată, contractorul a comandat direct cele 5 unități. Presiunea termenului contractual a fost mai mare decât nevoia de validare independentă. Pentru noi, asta a însemnat responsabilitate maximă pe livrare, fără loc pentru „dacă nu merge”."
            />
          </div>
        </Section>

        {/* 6. SOLUȚIA */}
        <Section number="06" eyebrow="Echipamentul livrat · 5 unități identice">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Aceeași configurație ca la majoritatea proiectelor noastre B2B,
                pentru că este raportul optim între calitate, preț și acoperire de
                nevoi.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow label="Cantitate" value="5 unități identice" />
                <SpecRow label="Putere" value="2.000W per unitate" />
                <SpecRow label="Sursă laser" value="MAX" />
                <SpecRow label="Pistol" value="SUP23T" />
                <SpecRow
                  label="Aplicații"
                  value="Sudură pe aluminiu, inox, oțel · curățare laser · debitare"
                />
                <SpecRow
                  label="Distribuție pe șantier"
                  value="3 active + 2 standby · redundanță 60%"
                />
                <SpecRow
                  label="Pachet consumabile"
                  value="12 luni · lentile de protecție și piese de uzură"
                />
                <SpecRow
                  label="Software"
                  value="Limbă RO · manual digital cu inteligență artificială"
                />
                <SpecRow
                  label="Garanție"
                  value="60 luni standard cu suport tehnic inclus"
                />
              </dl>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-uzx-blue text-white p-6 lg:p-8">
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-3">
                  Abonament înlocuire 24 ore
                </div>
                <h3
                  className="serif text-xl lg:text-2xl leading-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Asemănător leasing-ului operațional, dar pentru utilaje critice.
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-5">
                  Plata aparatelor plus o taxă lunară de abonament. În caz de
                  defecțiune care necesită intervenție extinsă, livrăm un aparat
                  de schimb în 24 de ore care rămâne la client până la remediere.
                  Pentru contractori cu termene ferme și penalități, aparatul devine
                  un serviciu cu uptime garantat.
                </p>
                <Link
                  href="/service/abonamente"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-uzx-orange underline-link group"
                >
                  Detalii abonamente service și SLA
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </aside>
          </div>

          <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <NatoDiagramFigure
                number="Schema 4 · 3 aplicații pe același aparat"
                diagram={<MultiAppDiagram />}
                caption="Aparatele 3-in-1 livrate pe baza NATO sudează cordoanele de aluminiu, curăță suprafețele de oxizi și grăsimi înainte de sudură și debitează corecții geometrice direct pe șantier. Operatorul comută pistolul în câteva secunde."
              />
            </div>
            <div className="lg:col-span-5 lg:pt-4">
              <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-3">
                De ce 3-in-1 contează pe șantier expediționar
              </div>
              <p className="text-sm lg:text-base text-ink-600 leading-relaxed mb-3">
                Pe un șantier expediționar cu logistică limitată, fiecare utilaj
                separat înseamnă o cursă de transport în plus, un consumabil în
                plus de inventariat și un alt punct potențial de defecțiune.
              </p>
              <p className="text-sm lg:text-base text-ink-600 leading-relaxed">
                Aparatele livrate la baza NATO acoperă cele trei nevoi într-o
                singură unitate: sudura cordoanelor de aluminiu, curățarea
                suprafețelor înainte de sudură și debitarea corecțiilor
                geometrice făcute pe loc. Mai puțin echipament de transportat,
                mai puțin de mentenat și o singură curbă de învățare pe operator.
              </p>
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
        <Section
          number="08"
          eyebrow="Rezultate · măsurate sau anonimizate la cerere"
          tone="dark"
        >
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
            Notă transparentă. Numărul exact de hangare construite, suprafața
            sudată, valoarea contractului și ROI-ul calculat de client au fost
            omise la cerere. Cifrele de mai sus reflectă fapte verificabile la
            sediul Uzinex despre livrare, configurare și service.
          </p>
        </Section>

        {/* 9. SERVICE POST-LIVRARE */}
        <Section number="09" eyebrow="Service post-livrare · suport tehnic continuu">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Un singur incident, rezolvat remote în 30 de minute.
              </h2>
              <p className="text-ink-600 leading-relaxed mb-5">
                Pentru un client cu clearance de securitate, capacitatea de
                intervenție remote validată tehnic este la fel de importantă ca
                garanția standard. Nu putem garanta deplasare fizică imediată pe
                o bază NATO, dar putem rezolva majoritatea problemelor software
                fără să părăsim sediul.
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
                  label="Incidente raportate"
                  value="1 software"
                  detail="Un singur bug software pe parcursul utilizării celor 5 aparate."
                />
                <ServiceRow
                  label="Timp mediu de remediere"
                  value="30 min"
                  detail="Diagnoză și fix prin conexiune remote securizată, fără deplasare la baza NATO."
                />
                <ServiceRow
                  label="Defecte hardware"
                  value="0"
                  detail="Niciun defect mecanic sau electric raportat pe parcursul utilizării."
                />
                <ServiceRow
                  label="Manual digital cu AI"
                  value="Inclus"
                  detail="Operatorii pot pune întrebări manualului în limbaj natural și pot rezolva probleme operaționale curente fără apel la suport."
                />
                <ServiceRow
                  label="Abonament 24h replacement"
                  value="Activ"
                  detail="Aparat de schimb livrat în 24h în caz de defect care cere intervenție extinsă, până la remedierea celui original."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 10. LECȚII */}
        <section className="border-b hairline text-white py-14 lg:py-20" style={{ background: "#082545" }}>
          <div className="container-x">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                  10 / Lecții & provocări
                </div>
                <h2
                  className="serif text-2xl lg:text-3xl leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Ce am învățat din<br />
                  <span className="font-light text-white/70">
                    livrarea pentru un client cu termen ferm și OPSEC.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Trei observații care au schimbat felul în care propunem proiecte
                  similare. Aplicabile nu doar pentru construcții de apărare ci
                  pentru orice contractor cu penalități zilnice și echipe în câmp.
                </p>
              </div>
              <div className="lg:col-span-8 space-y-6 lg:space-y-8">
                {LESSONS.map((l, i) => (
                  <div key={i}>
                    <div className="border-l-2 border-uzx-orange pl-5 lg:pl-6">
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
                    {i === 1 && (
                      <div className="mt-6 lg:mt-8">
                        <NatoDiagramFigure
                          number="Schema 5 · paradoxul forței de muncă"
                          diagram={<MuscleMemoryDiagram />}
                          caption="Sudorul cu zece ani de experiență MIG/TIG are mâna automatizată pe pendulare în zig-zag, esențială pentru sudura conventională. La laser, fasciculul are deja focalizare definită, iar pendularea îl scoate din focare. Operatorul fără experiență învață direct mișcarea liniară uniformă pe care o cere laserul, fără reflex contradictoriu."
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <Section number="11" eyebrow="Întrebări tehnice · sudură laser în condiții dificile">
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
                  {q.answer.split(/\[([^\]]+)\]\(([^)]+)\)/g).map((part, idx) => {
                    if (idx % 3 === 1) return null;
                    if (idx % 3 === 2) {
                      const label = q.answer.split(/\[([^\]]+)\]\(([^)]+)\)/g)[idx - 1];
                      return (
                        <Link
                          key={idx}
                          href={part}
                          className="text-uzx-blue underline-link hover:text-uzx-orange transition"
                        >
                          {label}
                        </Link>
                      );
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                </p>
              </details>
            ))}
          </div>
        </Section>

        {/* 12. TOOL INTERACTIV · calculator penalități */}
        <Section
          number="12"
          eyebrow="Tool interactiv · calculează expunerea ta la penalități"
        >
          <PenaltyRiskCalculator />
        </Section>

        {/* 13. CONTACT · CTA enterprise */}
        <section className="border-b hairline py-14 lg:py-20" style={{ background: "#082545" }}>
          <div className="container-x text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                  13 / Contact · proiect cu termen ferm și penalități?
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Contractor public sau privat<br />
                  <span className="font-light text-uzx-orange">
                    cu cerințe de uptime?
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Discutăm sub NDA dacă proiectul cere confidențialitate. Configurăm
                  flota de echipamente pe baza penalității zilnice contractuale, nu
                  pe baza capacității teoretice. Abonamentul de înlocuire în 24 de
                  ore transformă echipamentele în serviciu cu uptime garantat.
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
                  href="/contact?subject=Proiect%20enterprise%20cu%20termen%20ferm%20%E2%80%94%20aparate%20laser%203-in-1&context=Studiu%20de%20caz%20bază%20NATO"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit configurare flotă echipamente
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Pentru clienți cu cerințe de securitate suplimentare, semnăm NDA
                  înainte de discutarea oricăror detalii tehnice ale proiectului.
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
  const parts = body.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  return (
    <div className="border hairline bg-white p-6 lg:p-7 flex flex-col h-full">
      <div className="serif text-3xl text-uzx-orange mb-4 num leading-none">{num}</div>
      <h3
        className="serif text-base lg:text-lg text-ink-900 leading-snug mb-3"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <p className="text-sm text-ink-600 leading-relaxed">
        {parts.map((p, idx) => {
          if (idx % 3 === 0) return <span key={idx}>{p}</span>;
          if (idx % 3 === 1) {
            const href = parts[idx + 1];
            return (
              <Link
                key={idx}
                href={href}
                className="text-uzx-blue underline-link hover:text-uzx-orange transition"
              >
                {p}
              </Link>
            );
          }
          return null;
        })}
      </p>
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
