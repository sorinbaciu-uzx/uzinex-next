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
import { VideoPlayer, PaybackCalculator, VerticalVideoSlot } from "./interactive";
import { LaserApplicationDiagrams } from "./diagrams";

const SLUG = "future-energy-group";
const YT_ID = "DQO74tlDNNQ";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;

const VERTICAL_VIDEO_SRC = "https://youtube.com/shorts/1rq_TD2_ZcI";

const FEG_WEBSITE = "https://fegenergy.ro/";

const PRICE_TODAY_EUR = 5500;
const PRICE_FEG_PAID_EUR = 11000;

export const metadata: Metadata = {
  title:
    "Studiu de caz Future Energy Group · Aparat sudură laser 3-in-1 fără sudor angajat",
  description:
    "Future Energy Group, instalator de sisteme fotovoltaice premium din București, a rezolvat problema forței de muncă calificate cu un aparat sudură laser 3-in-1. Owner-ul a învățat să sudeze în 2 ore, fără experiență. Salariu sudor evitat: 2.500 €/lună. Echipament similar disponibil acum la 5.500 € + TVA.",
  keywords: [
    "aparat sudura laser",
    "sudura laser 3-in-1",
    "sudura fara experienta",
    "aparat laser curatare debitare",
    "echipament fotovoltaic",
    "studiu de caz Uzinex",
    "Future Energy Group",
    "sudura aluminiu laser",
    "criza forta de munca calificata",
    "sudor Bucuresti pret",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title: "Future Energy Group · Cum un atelier de 3 oameni a învățat să sudeze în 2 ore",
    description:
      "Instalator fotovoltaic premium, fără sudor angajat. Aparat laser 3-in-1 de 2.000W. Owner-ul a învățat să sudeze cordoane premium pe aluminiu în două ore.",
    images: [HERO_IMG],
    type: "article",
    locale: "ro_RO",
  },
};

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial",
    title: "Future Energy Group, primii care s-au mișcat în zona lor",
    body:
      "Future Energy Group sunt instalatori de sisteme fotovoltaice premium din București, prezenți și ca magazin de echipamente electrice în zona lor industrială. Pe măsură ce și-au crescut standardul de livrare, au identificat o oportunitate strategică pe care vecinii lor încă nu o vedeau, capacitatea de a executa în atelier propriu cuști de aluminiu pentru organizarea cablajelor. Au cercetat soluții, au descoperit reclama noastră Google pentru aparate laser industriale și au sunat direct la CEO-ul Uzinex.",
  },
  {
    phase: "Decizia",
    title: "Aparat în custodie din showroom, validare pe materialele lor",
    body:
      "Am dimensionat tehnic nevoia: laser 3-in-1 de 2.000W, sursă MAX, pistol SUP23T, cu trei aplicații în același utilaj, sudură, curățare și debitare. Echipa FEG a făcut due-diligence-ul firesc al unor antreprenori serioși și a cerut probă pe materialele lor reale. Le-am livrat un aparat din showroom în custodie pe perioada importului aerian, fără factură proformă, fără avans. Acord clar: probați-l la voi, validați-l pe lucrările reale, iar dacă rezolvă, plătiți aparatul propriu înainte să aterizeze din import.",
  },
  {
    phase: "Probă internă",
    title: "Owner-ul a stăpânit tehnologia în 2 ore",
    body:
      "Aici se vede caracterul echipei FEG. Deși niciunul dintre cei trei oameni nu mai sudase profesional anterior, owner-ul a abordat tehnologia cu seriozitate de inginer. În două ore de probă structurată a trecut de la prima încercare la cordoane de calitate premium pe aluminiu, viteza de adopție pe care o vezi la antreprenori care chiar înțeleg ce fac. Au început imediat producția cuștilor pentru cabluri pe proiectele curente, iar plata aparatului propriu a fost făcută înainte ca acesta să aterizeze din import.",
  },
  {
    phase: "Livrare echipament propriu",
    title: "Import aerian, ridicare la cargo, montaj la sediu",
    body:
      "Aparatul propriu al FEG a aterizat la București cu o întârziere mică pe segmentul de import. L-am ridicat de la cargo cu transport propriu, l-am dus la sediul lor și am efectuat instalarea împreună cu trainingul, totul în două ore.",
  },
  {
    phase: "Commissioning",
    title: "Lipsa noastră pe consumabile, corectată în 20 minute",
    body:
      "FEG a fost proactiv și a procurat din timp sârmă de adaos de la un furnizor local, exact comportamentul unui client serios care se pregătește pentru ziua punerii în funcțiune. Sârma respectivă avea însă duritate sub-spec pentru alimentatorul aparatului. Am identificat și corectat în 20 de minute, dar lecția a fost a noastră, nu a lor. De atunci, în pachetul fiecărui aparat laser livrat de noi intră setul inițial de sârmă pre-validat în depozit.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "2 ore",
    label: "Owner · de la zero la sudură premium",
    detail:
      "Trei angajați, niciun sudor cu experiență. După două ore de probă cu laser-ul, owner-ul producea cordoane premium pe aluminiu.",
  },
  {
    value: "2.500 €",
    label: "/ lună · salariu sudor evitat",
    detail:
      "Cost mediu de angajare a unui sudor calificat în București, taxe incluse. Pentru o nevoie ocazională, angajarea nu se justifica financiar.",
  },
  {
    value: "5.500 €",
    label: "+ TVA · preț echipament astăzi",
    detail:
      "Aparat laser 3-in-1 echivalent este disponibil acum la jumătate din prețul plătit de FEG în 2024, datorită evoluției pieței.",
  },
  {
    value: "≈2,2 luni",
    label: "Payback la prețul de astăzi",
    detail:
      "Calcul simplu: 5.500 € investiție împărțit la 2.500 €/lună salariu evitat. Rezultatul: amortizare în mai puțin de un trimestru.",
  },
  {
    value: "3-în-1",
    label: "Sudură · curățare · debitare",
    detail:
      "Același echipament servește trei nevoi distincte, fără ocupare suplimentară de spațiu și fără achiziții separate.",
  },
  {
    value: "1",
    label: "Intervenție service în primul an",
    detail:
      "O singură vizită, pentru schimb de lentile de protecție consumate prin uzura normală. Niciun defect tehnic raportat.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Importul aerian a întârziat puțin, custodia din showroom a acoperit pauza",
    body:
      "Aparatul propriu al FEG a întâmpinat o întârziere mică pe segmentul de import. Pentru că livraserăm anterior aparatul din showroom în custodie, FEG nu a pierdut o singură zi de producție. Lecția: pentru aparate de sudură cu laser, livrarea în custodie pre-plată este o practică pe care am extins-o ca standard al vânzărilor noastre. FEG a fost primul caz unde am aplicat-o și a confirmat valoarea ei.",
  },
  {
    title: "Lipsa noastră pe consumabile, nu a clientului",
    body:
      "FEG a fost proactiv și a procurat sârmă de adaos de la un furnizor local înainte de instalare. Comportamentul corect al unui client serios. Sârma respectivă avea însă duritate sub-spec pentru alimentatorul aparatului. Lecția a fost a noastră: ar fi trebuit să livrăm noi consumabilele validate odată cu utilajul. De atunci, în pachetul fiecărui aparat laser intră setul inițial de sârmă pre-validat în depozitul nostru.",
  },
  {
    title: "Antreprenorii agile cumpără pe rezultate, nu pe documentație",
    body:
      "FEG a tăiat scurt prin partea de prezentări comerciale și a cerut direct o validare pe materialele lor. Lecție de business pentru noi: la antreprenori care construiesc activ ceva și care își apără timpul, fișa tehnică PDF nu vinde la fel de bine ca o probă fizică în atelierul lor. De atunci propunem custodie de probă pentru toate aparatele de sudură cu laser, iar rata de conversie și satisfacția pe termen lung au crescut vizibil.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Avem multiple probleme în a face structuri speciale care deservesc sistemelor noastre, iar soluția de aparat de sudură laser ne-a ajutat extrem de mult.",
  "O colaborare bună, lină. Întotdeauna am avut parte de suport și de ajutor.",
  "Ne-au pus la dispoziție tot ce am avut nevoie, de la manuale până la sfaturi utile din experiența lor.",
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question:
      "Cât durează să înveți să sudezi cu un aparat laser 3-in-1, fără experiență anterioară?",
    answer:
      "Pentru cordoane de calitate premium pe aluminiu, oțel și inox, curba tipică de învățare este de aproximativ două ore de probă structurată. Owner-ul Future Energy Group a învățat exact în acest interval, fără experiență anterioară de sudură. Tehnologia laser elimină majoritatea variabilelor pe care un sudor le învață în ani de practică, distanță, unghi, viteză, putere de arc, lăsând operatorului doar tehnica de focalizare.",
  },
  {
    question:
      "Cât costă astăzi un aparat de sudură laser 3-in-1 echivalent celui livrat la Future Energy Group?",
    answer:
      "Un aparat laser de 2.000W cu funcție 3-in-1 (sudură, curățare, debitare), sursă MAX și pistol echivalent SUP23T este disponibil astăzi de la 5.500 € + TVA. Future Energy Group a plătit în 2024 aproximativ 11.000 € pentru același tip de configurație, evoluția pieței a dublat efectiv accesibilitatea tehnologiei.",
  },
  {
    question:
      "Aparatul rezolvă problema lipsei sudorilor calificați pe piața din România?",
    answer:
      "Direct. Costul mediu lunar de angajare a unui sudor calificat în București este în jur de 2.500 € brut, cu taxe incluse, iar piața are deficit cronic de personal calificat. Aparatul laser 3-in-1 permite oricui din echipa ta, în câteva ore de probă, să producă cordoane premium fără ani de practică. Pentru un volum ocazional, payback-ul prin salariu evitat este sub trei luni la prețul actual.",
  },
  {
    question:
      "Pot proba aparatul în atelierul meu, pe materialele mele, înainte să decid?",
    answer:
      "Da. Pentru aparatele de sudură cu laser am introdus, după experiența cu Future Energy Group, politica de custodie pre-plată. Livrăm un aparat din showroom în atelierul tău, fără factură proformă și fără avans. Probezi tehnologia pe lucrările tale reale, iar plata se face doar dacă decizi să cumperi.",
  },
  {
    question:
      "Ce alte aplicații are aparatul, pe lângă sudură?",
    answer:
      "Trei funcții într-un singur utilaj: sudură premium pe aluminiu, inox și oțel, curățare laser ca alternativă la sablare (fără chimicale, fără praf) și debitare precisă pentru ajustarea componentelor pe șantier. La Future Energy Group, owner-ul folosește toate cele trei funcții pe proiectele de instalare PV, pentru cuști aluminiu, curățare profile metalice de rugină și ajustări fine pe teren.",
  },
  {
    question:
      "Care este garanția și ce service primesc după livrare?",
    answer:
      "Garanție standard Uzinex de 60 de luni pentru toate aparatele de sudură cu laser, cu intervenție sub 24 de ore în caz de defect. La Future Energy Group, în primul an a fost o singură vizită de service, pentru schimb de lentile de protecție consumate prin uzură normală. Niciun defect tehnic raportat.",
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
    title:
      "Future Energy Group, atelier fotovoltaic care a învățat să sudeze cu laser 3-in-1",
    excerpt:
      "Instalator de sisteme fotovoltaice premium din București cu 3 angajați, fără experiență la sudură. A evitat costul angajării unui sudor calificat (2.500 €/lună) cu un aparat laser 3-in-1.",
    category: "Studiu de caz",
    datePublished: "2024-09-01",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial Future Energy Group · aparat sudură laser",
    description:
      "Testimonial real al lui George de la Future Energy Group, București, despre utilizarea aparatului laser 3-in-1 pentru sudură, curățare și debitare structuri custom în atelierul fotovoltaic.",
    youtubeId: YT_ID,
    uploadDate: "2024-10-15T10:00:00Z",
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
                    Energie regenerabilă · fotovoltaic
                  </span>
                  <span>· București, RO</span>
                  <span>· 2024</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-5"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Future Energy Group:<br />
                  <span className="font-light text-uzx-orange">
                    cum un atelier de 3 oameni a învățat să sudeze în 2 ore.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-ink-600 leading-relaxed max-w-2xl">
                  Instalator de sisteme fotovoltaice premium din București. Trei
                  angajați, niciunul cu experiență la sudură, niciun sudor pe care
                  să-l angajeze. Aveau nevoie să producă intern cuști de aluminiu
                  pentru organizarea cablajelor, la calitatea pe care o livrează
                  clienților. Soluția nu a fost angajarea unui specialist, ci
                  alegerea unei tehnologii care nu cere ani de experiență.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="2h" label="Owner · de la zero la sudură" />
                  <HeroStat value="2.500€" label="/ lună salariu evitat" />
                  <HeroStat value="5.500€" label="+ TVA · preț astăzi" />
                </div>
              </div>

              <div className="lg:col-span-5">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Testimonial George · Future Energy Group"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ CLIENT */}
        <Section number="01" eyebrow="Cartelă client">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-12">
            <FactBlock label="Client" value="Future Energy Group" />
            <FactBlock label="Industrie" value="Sisteme fotovoltaice premium" />
            <FactBlock label="Locație" value="București, România" />
            <FactBlock label="Anul proiect" value="2024" />
            <FactBlock label="Echipă" value="3 angajați" />
            <FactBlock
              label="Activitate"
              value="Instalare PV · magazin echipamente electrice"
            />
            <FactBlock label="Cifra de afaceri 2024" value="4.952.174 lei" />
            <FactBlock label="Site oficial" value="fegenergy.ro" href={FEG_WEBSITE} external />
          </div>
        </Section>

        {/* 2. PUNCTUL DE PLECARE, focus pe forța de muncă */}
        <Section number="02" eyebrow="Punctul de plecare · forța de muncă">
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6 max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Trei oameni, calitate premium de livrat, și deficit cronic de sudori
            calificați pe piața din București.
          </h2>
          <div className="prose-uzx max-w-3xl space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
            <p>
              <Link
                href={FEG_WEBSITE}
                target="_blank"
                rel="noopener noreferrer"
                className="text-uzx-blue underline-link hover:text-uzx-orange transition"
              >
                Future Energy Group
              </Link>{" "}
              instalează sisteme fotovoltaice premium pentru clienți privați în zona
              București. Pe măsură ce și-au crescut standardul intern, au identificat
              o categorie de detaliu care diferențiază o instalație premium de una
              obișnuită, cuștile din aluminiu pentru organizarea cablajelor,
              executate la nivel vizibil în finalul lucrărilor.
            </p>
            <p>
              Soluția convențională ar fi fost angajarea unui sudor calificat. Două
              probleme practice. Una financiară: costul brut al unui sudor cu
              experiență în București este în jur de 2.500 € lunar cu taxe incluse,
              iar pentru un volum ocazional sub o normă întreagă structura nu se
              justifica. Una de piață: deficitul de sudori calificați pe piața din
              România este cronic, iar timpul mediu de recrutare pentru un
              specialist competent depășește două luni.
            </p>
            <p>
              FEG a căutat o a treia variantă, o tehnologie care să elimine
              dependența de un specialist greu de găsit. Au descoperit că aparatele
              laser 3-in-1 oferă exact asta: curba de învățare scade de la ani la
              ore, pentru că tehnologia simplifică majoritatea variabilelor pe care
              un sudor clasic le stăpânește în timp. Distanță, unghi, viteză, putere
              de arc, cele mai multe sunt automatizate de controller. Operatorul
              învață doar tehnica de focalizare.
            </p>
            <p className="text-ink-900 font-medium">
              Calculul antreprenorial pe deasupra: prezența lor în zona industrială
              respectivă, combinată cu capacitatea nouă de sudură premium, deschidea
              un canal de venit suplimentar, servicii pentru vecini de zonă, după ce
              ar fi prins tracțiune.
            </p>
          </div>
        </Section>

        {/* 3. DE CE UZINEX */}
        <Section number="03" eyebrow="Cum am ajuns să vorbim · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Au cercetat singuri și au sunat decis"
              body="FEG nu a așteptat să fie prospectați. Au făcut research activ pe Google pentru soluții tehnice, au evaluat ofertele văzute, au sunat când au identificat ce căutau. Conversația cu CEO-ul Uzinex a început tehnic, fără filtre comerciale, modul de lucru al unui antreprenor care știe ce vrea."
            />
            <ReasonCard
              num="B"
              title="Au cerut probă fizică pe materialul lor"
              body="Decizia de capital într-o echipă de 3 oameni se ia pe rezultate, nu pe demo-uri. FEG au cerut firesc o validare pe lucrările lor reale. Le-am livrat un aparat din showroom în custodie pe perioada importului. Au plătit aparatul propriu înainte ca acesta să aterizeze, exact cum facem afaceri serioase."
            />
            <ReasonCard
              num="C"
              title="Configurăm să dureze, nu să se strice"
              body="Politica noastră tehnică: configurăm echipamentele să fie cât mai fiabile, chiar dacă asta înseamnă mai puține intervenții și mai puține piese de schimb vândute pe termen lung. Pentru clienți care nu au timp să se ocupe de utilaje defecte, asta este singura politică care contează."
            />
          </div>
          <p className="text-sm text-ink-500 italic mt-8 max-w-3xl">
            Politica de probă fizică în custodie pe care am aplicat-o aici a devenit
            standardul nostru pentru aparatele de sudură cu laser. Nu pentru tot ce
            vindem, ci specific pentru această categorie unde tehnologia merită să
            fie probată în atelierul clientului.
          </p>
        </Section>

        {/* 4. SOLUȚIA + DIAGRAME */}
        <Section number="04" eyebrow="Echipamentul livrat · trei aplicații, un utilaj">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-10 lg:mb-14">
            <div className="lg:col-span-7">
              <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                Aparat laser 3-in-1
              </div>
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Sudură, curățare și debitare pe același echipament,<br />
                fără ani de experiență cerută operatorului.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow label="Putere" value="2.000W" />
                <SpecRow label="Sursă laser" value="MAX" />
                <SpecRow label="Pistol" value="SUP23T" />
                <SpecRow
                  label="Aplicații"
                  value="Sudură pe aluminiu, inox, oțel · curățare laser · debitare"
                />
                <SpecRow
                  label="Curba de învățare"
                  value="≈ 2 ore pentru cordoane premium, fără experiență anterioară"
                />
                <SpecRow label="Garanție" value="60 de luni · standard Uzinex" />
                <SpecRow label="Preț de astăzi" value="de la 5.500 € + TVA" />
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-ink-50 p-6 lg:p-8 border hairline">
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-3">
                  De ce 3-in-1 contează pentru atelierele mici
                </div>
                <ul className="space-y-3 text-sm text-ink-700">
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Sudură:</strong> cordoane
                      premium pe aluminiu fără sudor angajat. Curba de învățare 2 ore
                      în loc de luni de practică.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Curățare:</strong> alternativă
                      curată la sablare, fără chimicale, fără praf, fără spațiu separat.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Debitare:</strong> tăieri
                      precise pe oțel și aluminiu pentru ajustări pe șantier, fără disc
                      abraziv.
                    </span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Aparat%20laser%203-in-1%20%E2%80%94%20de%20la%205.500%20EUR%20%2B%20TVA"
                  className="mt-6 inline-flex items-center gap-2 text-xs text-uzx-blue hover:text-uzx-orange underline-link group"
                >
                  Cere ofertă pentru același echipament, de la 5.500 € + TVA
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </div>
          </div>

          <LaserApplicationDiagrams />
        </Section>

        {/* 5. TIMELINE */}
        <Section number="05" eyebrow="Cum s-a desfășurat · onest">
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

        {/* 6. REZULTATE */}
        <Section
          number="06"
          eyebrow="Rezultate · ce putem măsura, ce putem estima"
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
            Notă transparentă. Clientul nu ne-a transmis ROI exact. Cifra de payback
            de aproximativ 2,2 luni este calculată exclusiv pe economia salarială
            pentru aparatul similar disponibil astăzi la 5.500 €. Beneficiile
            suplimentare de la calitate intern, lucrări care altfel s-ar fi
            externalizat, eventuale servicii custom oferite în zonă, nu sunt incluse
            în calcul.
          </p>
        </Section>

        {/* 7. CITAT CLIENT + VIDEO VERTICAL */}
        <section className="border-b hairline bg-ink-50 py-14 lg:py-20">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-10 lg:mb-12 text-center">
              07 / Testimonial real · George, Future Energy Group
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {TESTIMONIAL_QUOTES.map((q, i) => (
                    <blockquote
                      key={i}
                      className="serif text-xl md:text-2xl lg:text-[28px] text-ink-900 leading-snug border-l-2 border-uzx-orange pl-6 lg:pl-8"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      „{q}"
                    </blockquote>
                  ))}
                </div>
                <div className="mt-10 flex items-center gap-4">
                  <div className="w-10 h-px bg-ink-300" />
                  <div>
                    <div className="text-sm text-ink-900 serif">
                      George ·{" "}
                      <Link
                        href={FEG_WEBSITE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-uzx-orange transition"
                      >
                        Future Energy Group
                      </Link>
                    </div>
                    <div className="text-[11px] mono uppercase tracking-wider text-ink-400 mt-1">
                      Extras transcript video testimonial · 2024
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-4">
                <VerticalVideoSlot
                  videoSrc={VERTICAL_VIDEO_SRC}
                  caption="Demo în atelier · Future Energy Group"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERVICE POST-LIVRARE */}
        <Section
          number="08"
          eyebrow="Service post-livrare · ce s-a întâmplat în primul an"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Un singur tichet în 12 luni, schimb de lentile.
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Politica noastră de a configura echipamentele să dureze înseamnă
                vânzări mai mici de piese de schimb și mai puține intervenții
                facturate. Pentru un atelier de 3 oameni, asta înseamnă
                predictibilitate operațională.
              </p>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y hairline border-y hairline">
                <ServiceRow
                  label="Intervenții service în 12 luni"
                  value="1"
                  detail="Schimb de lentile de protecție consumate prin uzura normală, nu defect tehnic."
                />
                <ServiceRow
                  label="Defecte tehnice raportate"
                  value="0"
                  detail="Niciun ticket pentru defect, eroare sau problemă cu controller-ul."
                />
                <ServiceRow
                  label="Comunicare post-implementare"
                  value="Suport on-demand"
                  detail="Manuale, sfaturi tehnice și recomandări la cerere, confirmat de client în testimonialul video."
                />
                <ServiceRow
                  label="Garanție rămasă"
                  value="≈ 48 luni"
                  detail="Standard Uzinex 60 luni, acoperă piese OEM, manopera, deplasare."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 9. GALERIE VIDEO ORIZONTAL */}
        <Section number="09" eyebrow="Galerie · testimonial video">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
            <div className="lg:col-span-12">
              <VideoPlayer
                youtubeId={YT_ID}
                thumbnail={HERO_IMG}
                title="Testimonial George · Future Energy Group"
              />
            </div>
            <div className="lg:col-span-12 mt-4 text-sm text-ink-500 max-w-3xl">
              <p className="leading-relaxed">
                În video, George explică în propriile cuvinte cum aparatul laser i-a
                ajutat la structurile speciale, demonstrează curățarea pe metal
                ruginit ca alternativă la sablare și arată tehnica de focalizare
                corectă pentru rezultat optim.
              </p>
            </div>
          </div>
        </Section>

        {/* LECȚII */}
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
                  <span className="font-light text-white/70">
                    și ce am schimbat în procesul nostru.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Niciun proiect nu se livrează „totul perfect din prima". Aici e ce
                  nu a mers la FEG și ce schimbări de proces au rămas la noi după
                  acest proiect.
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

        {/* 10. CALCULATOR */}
        <Section number="10" eyebrow="Calculator · merită investiția pentru cazul tău?">
          <p className="text-ink-600 max-w-2xl mb-8 lg:mb-10 leading-relaxed">
            Replică decizia FEG pentru cazul tău. Introdu costul lunar al unui sudor
            calificat în zona ta, costul lunar al lucrărilor pe care le externalizezi
            astăzi, și costul echipamentului laser. Vezi în câte luni se amortizează
            prin economia pură de salariu și externalizare.
          </p>
          <PaybackCalculator />
        </Section>

        {/* FAQ, pentru SEO + utilitate reală */}
        <Section number="11" eyebrow="Întrebări frecvente · sudură laser 3-in-1">
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

        {/* CTA */}
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
                  Ai atelier mic și nu găsești sudor?<br />
                  <span className="font-light text-uzx-orange">
                    Tehnologia laser rezolvă deficitul de calificare.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Aparat similar celui livrat la Future Energy Group, disponibil
                  astăzi de la 5.500 € + TVA. Pentru aparatele de sudură cu laser
                  oferim probă fizică în custodie, fără factură proformă, fără avans.
                  Probezi în atelierul tău, plătești dacă te convinge.
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
                  href="/contact?subject=Aparat%20sudur%C4%83%20laser%203-in-1%20%E2%80%94%20probare%20%C3%AEn%20custodie&context=Studiu%20de%20caz%20Future%20Energy%20Group"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Vreau aparat în custodie pentru probă
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Politica de probă fizică se aplică pentru aparatele de sudură cu
                  laser. Pentru alte categorii de echipamente, oferim demo în
                  showroom Iași sau București.
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

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-6 py-4">
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
