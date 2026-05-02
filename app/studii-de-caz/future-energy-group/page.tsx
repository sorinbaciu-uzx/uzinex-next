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
  title: "Future Energy Group · Cum un atelier fotovoltaic a sudat fără sudor",
  description:
    "Studiu de caz: Future Energy Group, instalator de sisteme fotovoltaice premium din București cu 3 angajați și zero experiență la sudură. Au cumpărat un laser 3-in-1 (sudură, curățare, debitare) de 2000W. Owner-ul a învățat să sudeze perfect în 2 ore. Salariu sudor evitat: 2.500 €/lună.",
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title: "Future Energy Group · Owner-ul a învățat să sudeze în 2 ore cu laser 3-in-1",
    description:
      "Atelier fotovoltaic cu 3 angajați, fără sudor. Laser 2000W. Owner-ul a învățat să sudeze perfect în 2 ore. Studiu de caz Uzinex.",
    images: [HERO_IMG],
    type: "article",
  },
};

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial",
    title: "Future Energy Group — primii care s-au mișcat în zona lor",
    body:
      "Future Energy Group sunt instalatori de sisteme fotovoltaice premium și operează un magazin de echipamente electrice în zona industrială din București. Pe măsură ce și-au crescut standardul de livrare, au identificat o oportunitate strategică pe care colegii lor de zonă încă nu o vedeau: capacitatea de a executa în atelier propriu cuști de aluminiu pentru organizarea cablajelor — un detaliu de calitate premium care diferențiază o instalație fotovoltaică serioasă de una obișnuită. Au cercetat soluții, au descoperit reclama noastră Google pentru aparate laser industriale și au sunat direct.",
  },
  {
    phase: "Decizia",
    title: "Aparat în custodie din showroom — au cerut probă pe materialul lor",
    body:
      "Am dimensionat tehnic nevoia: laser 3-in-1 (sudură + curățare + debitare) de 2.000W, sursă MAX, pistol SUP23T. Echipa FEG a făcut due-diligence-ul firesc al unor antreprenori serioși — voiau să vadă cum se comportă tehnologia pe materialele lor concrete, nu pe demo-uri generice. Le-am livrat un aparat din showroom-ul nostru în custodie pe perioada de import aerian a aparatului propriu (≈15 zile lucrătoare). Acord clar: probați-l la voi, validați-l pe lucrările reale, plătiți după ce aterizează al vostru. Fără factură proformă, fără avans.",
  },
  {
    phase: "Probă internă",
    title: "Owner-ul a stăpânit tehnologia în 2 ore",
    body:
      "Aici se vede caracterul echipei FEG: deși niciunul dintre cei trei oameni nu mai sudase profesional anterior, owner-ul a abordat tehnologia cu seriozitate de inginer. În două ore de probă structurată a trecut de la prima încercare la cordoane de calitate premium pe aluminiu — viteza de adopție pe care o vezi la antreprenori care chiar înțeleg ce fac. Au început imediat producția cuștilor pentru cabluri pentru proiectele lor curente.",
  },
  {
    phase: "Livrare echipament propriu",
    title: "≈15 zile lucrătoare · import aerian + montaj la sediu",
    body:
      "Aparatul propriu al FEG a aterizat la București cu mică întârziere față de estimarea inițială. L-am ridicat de la cargo, l-am dus la sediul lor și am efectuat instalarea + trainingul (2 ore). Plata s-a făcut după instalare, conform înțelegerii.",
  },
  {
    phase: "Commissioning · ce nu a mers din prima",
    title: "Lipsa noastră: nu am pre-livrat consumabilele validate",
    body:
      "FEG s-a pregătit din timp pentru ziua punerii în funcțiune și a procurat din proprie inițiativă sârma de adaos de la un furnizor local — exact comportamentul pe care-l vrei la un client serios. Problema: noi ar fi trebuit să-i livrăm setul de consumabile validate odată cu echipamentul. Sârma local-procurată avea duritate sub-spec pentru alimentatorul aparatului. Am identificat și corectat în 20 minute, dar lecția a fost a noastră — nu a lor. De atunci, la fiecare vânzare de aparat laser livrăm setul inițial de sârmă validată în pachet.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "2 ore",
    label: "Owner-ul · de la zero la sudură premium",
    detail:
      "Trei angajați, niciun sudor. După 2h de probă cu laser-ul, owner-ul producea cordoane de calitate premium pe aluminiu.",
  },
  {
    value: "2.500 €",
    label: "/ lună · salariu sudor evitat",
    detail:
      "Cost mediu de angajare a unui sudor calificat în București (brut + taxe). Pentru o nevoie ocazională, angajarea nu se justifica financiar.",
  },
  {
    value: "11.000 €",
    label: "Investiție echipament",
    detail:
      "Costul aparatului laser 3-in-1 livrat — sudură + curățare + debitare în același utilaj.",
  },
  {
    value: "≈4,4 luni",
    label: "Payback estimat doar din salarii",
    detail:
      "Calcul simplu: 11.000 € / 2.500 €/lună ≈ 4,4 luni. Fără să luăm în calcul lucrările pe care altfel le-ar fi externalizat.",
  },
  {
    value: "3-în-1",
    label: "Sudură · curățare · debitare",
    detail:
      "Același echipament servește trei nevoi: sudură premium pe inox/aluminiu/oțel, curățare cu laser (alternativă la sablare), debitare.",
  },
  {
    value: "1",
    label: "Intervenție service în primul an",
    detail:
      "O singură vizită — pentru schimb de lentile de protecție consumate. Niciun defect tehnic raportat pe utilaj.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Importul aerian — întârziere minoră, custodia din showroom a acoperit-o",
    body:
      "Aparatul propriu al FEG a întâmpinat o întârziere mică pe segmentul de import aerian. Pentru că livraserăm anterior aparatul din showroom în custodie, FEG nu a pierdut o singură zi de producție. Lecția: pentru tehnologii pe care clientul nu le-a mai folosit, livrarea în custodie pre-plată e o practică pe care am extins-o ca standard al vânzărilor noastre. FEG a fost primul caz unde am aplicat-o — și a confirmat valoarea ei.",
  },
  {
    title: "Lipsa noastră: nu am pre-livrat consumabilele validate cu aparatul",
    body:
      "FEG a fost proactiv și a procurat din timp sârmă de adaos de la un furnizor local — exact comportamentul corect al unui client serios care vrea să fie pregătit pentru ziua punerii în funcțiune. Sârma respectivă avea însă duritate sub-spec pentru alimentatorul aparatului. Lecția a fost a noastră: ar fi trebuit să livrăm noi consumabilele validate odată cu utilajul. De atunci, în pachetul fiecărui aparat laser intră setul inițial de sârmă pre-validat în depozitul nostru.",
  },
  {
    title: "Antreprenorii agile cumpără pe rezultate, nu pe documentație",
    body:
      "FEG a tăiat scurt prin partea de prezentări comerciale și a cerut direct o validare pe materialele lor. Lecție de business pentru noi: la antreprenori care construiesc activ ceva — și care își apără timpul — fișa tehnică PDF nu vinde la fel de bine ca o probă fizică în atelierul lor. De atunci propunem custodie de probă pentru orice tehnologie nouă, și vedem rate de conversie mai bune și clienți mai mulțumiți pe termen lung.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Avem multiple probleme în a face structuri speciale care deservesc sistemelor noastre, și soluția de aparat de sudură laser ne-a ajutat extrem de mult.",
  "O colaborare bună, lină. Întotdeauna am avut parte de suport și de ajutor.",
  "Ne-au pus la dispoziție tot ce am avut nevoie, de la manuale până la sfaturi utile din experiența lor.",
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
      "Future Energy Group — atelier fotovoltaic care a învățat să sudeze cu laser 3-in-1",
    excerpt:
      "Cum un instalator de sisteme fotovoltaice cu 3 angajați și zero experiență la sudură a evitat costul angajării unui sudor (2.500 €/lună) cu un laser 3-in-1.",
    category: "Studiu de caz",
    datePublished: "2024-09-01",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial Future Energy Group · aparat sudură laser",
    description:
      "Testimonial real al lui George de la Future Energy Group, București — utilizare aparat laser 3-in-1 pentru sudură, curățare și debitare structuri custom în atelierul fotovoltaic.",
    youtubeId: YT_ID,
    uploadDate: "2024-10-15T10:00:00Z",
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
                  angajați. Zero experiență la sudură. Aveau nevoie să producă intern
                  cuști de aluminiu pentru cabluri — calitate premium, fără să
                  externalizeze. Angajarea unui sudor în București: 2.500 €/lună.
                  Soluția: laser 3-in-1 de 2.000W. Owner-ul a învățat în două ore.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="2h" label="Owner · de la zero la sudură" />
                  <HeroStat value="2.500€" label="/ lună salariu evitat" />
                  <HeroStat value="3-în-1" label="Sudură + curățare + debitare" />
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
              value="Instalare PV + magazin echipamente electrice"
            />
            <FactBlock label="Cifra de afaceri 2024" value="4.952.174 lei" />
            <FactBlock label="Tip vânzare" value="Custodie pre-plată · import aerian" />
          </div>
        </Section>

        {/* 2. PUNCTUL DE PLECARE */}
        <Section number="02" eyebrow="Punctul de plecare">
          <h2
            className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6 max-w-3xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            O echipă de 3 oameni cu standard de livrare premium și o decizie
            financiară inteligentă de luat.
          </h2>
          <div className="prose-uzx max-w-3xl space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
            <p>
              Future Energy Group instalează sisteme fotovoltaice premium pentru
              clienți privați în zona București. Pe măsură ce și-au crescut
              standardul intern, au identificat o categorie de detaliu care
              diferențiază o instalație premium: <strong className="text-ink-900">
              cuști din aluminiu pentru organizarea cablajelor</strong>, executate
              la nivel vizibil în instalații finite. Pentru a păstra control complet
              pe calitate și termen, voiau să le producă intern.
            </p>
            <p>
              Soluția convențională — angajarea unui sudor calificat — nu era
              optimă pentru economia operațională a unei echipe agile. Costul brut
              al unui sudor cu experiență în București:{" "}
              <strong className="text-ink-900">circa 2.500 € lunar (taxe incluse)</strong>.
              Pentru un volum ocazional (sub o normă întreagă), structura de cost
              nu se justifica. Externalizarea ar fi însemnat pierderea controlului
              pe calitate. FEG a căutat o a treia variantă — și a găsit-o.
            </p>
            <p>
              <strong className="text-ink-900">Calculul antreprenorial pe deasupra:</strong>{" "}
              prezența lor în zona industrială respectivă, combinată cu capacitatea
              nouă de sudură premium, deschidea un canal de venit suplimentar —
              servicii pentru vecini de zonă, după ce ar fi prins tracțiune. Tipul
              de gândire în paralel pe care îl vezi la antreprenori care construiesc
              ceva, nu doar la cei care răspund la cerere.
            </p>
          </div>
        </Section>

        {/* 3. DE CE UZINEX */}
        <Section number="03" eyebrow="Cum am ajuns să vorbim · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Au cercetat singuri și au sunat decis"
              body="FEG nu a așteptat să fie prospectați. Au făcut research activ pe Google pentru soluții tehnice, au evaluat ofertele văzute, au sunat când au identificat ce căutau. Conversația cu CEO-ul Uzinex a început tehnic, nu cu filtre comerciale — modul de lucru al unui antreprenor care știe ce vrea."
            />
            <ReasonCard
              num="B"
              title="Au cerut probă fizică pe materialul lor"
              body="Decizia de capital într-o echipă de 3 oameni se ia pe rezultate, nu pe demo-uri. FEG au cerut firesc o validare pe lucrările lor reale. Le-am livrat un aparat din showroom în custodie pe perioada importului. Au plătit aparatul propriu după ce au confirmat că rezolvă — exact cum facem afaceri serioase."
            />
            <ReasonCard
              num="C"
              title="Configurăm să dureze, nu să se strice"
              body="Politica noastră tehnică: configurăm echipamentele să fie cât mai fiabile, chiar dacă asta înseamnă mai puține intervenții și mai puține piese de schimb vândute pe termen lung. Pentru clienți care nu au timp să se ocupe de utilaje defecte, asta este singura politică care contează."
            />
          </div>
          <p className="text-sm text-ink-500 italic mt-8 max-w-3xl">
            Politica de probă fizică în custodie pe care am aplicat-o aici a devenit
            standardul nostru pentru tehnologii pe care clientul nu le-a mai folosit
            anterior. Pentru noi e o filtrare naturală — vinzi doar dacă tehnologia
            chiar livrează. Pentru clienți, e siguranța că nu plătesc pentru o promisiune.
          </p>
        </Section>

        {/* 4. SOLUȚIA */}
        <Section number="04" eyebrow="Echipamentul livrat">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                Aparat laser 3-in-1
              </div>
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Sudură + curățare + debitare ·<br />
                același utilaj, trei aplicații.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow label="Putere" value="2.000W" />
                <SpecRow label="Sursă laser" value="MAX" />
                <SpecRow label="Pistol" value="SUP23T" />
                <SpecRow
                  label="Aplicații"
                  value="Sudură (inox, aluminiu, oțel) · curățare laser · debitare"
                />
                <SpecRow
                  label="Configurare"
                  value="Standard · validată tehnic la pre-comissioning în depozit"
                />
                <SpecRow label="Garanție" value="60 luni · standard Uzinex" />
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-ink-50 p-6 lg:p-8 border hairline">
                <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-3">
                  De ce 3-in-1 (și nu 3 echipamente separate)
                </div>
                <ul className="space-y-3 text-sm text-ink-700">
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Sudură:</strong> cordoane
                      premium pe aluminiu, fără cunoștințe avansate de sudor —
                      curba de învățare 2h în loc de 6 luni.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Curățare:</strong>{" "}
                      alternativă curată la sablare — fără chimicale, fără praf,
                      fără spațiu separat de curățare.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-uzx-orange num shrink-0">→</span>
                    <span>
                      <strong className="text-ink-900">Debitare:</strong> tăieri
                      precise pe oțel/aluminiu pentru ajustarea componentelor pe
                      teren, fără disc abraziv.
                    </span>
                  </li>
                </ul>
                <Link
                  href="/contact?subject=Echipament%20laser%203-in-1%20-%20sudur%C4%83%2C%20cur%C4%83%C8%9Bare%2C%20debitare"
                  className="mt-6 inline-flex items-center gap-2 text-xs text-uzx-blue hover:text-uzx-orange underline-link group"
                >
                  Cere ofertă pentru același echipament
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </div>
          </div>
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
        <Section number="06" eyebrow="Rezultate · ce putem măsura, ce putem estima" tone="dark">
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
            Notă transparentă: clientul nu ne-a transmis ROI exact. Cifra de payback
            de 4,4 luni e calculată exclusiv pe economia salarială (echipament
            11.000 € / salariu evitat 2.500 €/lună). Beneficiile suplimentare —
            calitate intern, lucrări care altfel s-ar fi externalizat, eventuale
            servicii custom oferite în zonă — nu sunt incluse în calcul.
          </p>
        </Section>

        {/* 7. CITAT CLIENT — testimonial real */}
        <section className="border-b hairline bg-ink-50 py-14 lg:py-20">
          <div className="container-x">
            <div className="max-w-4xl mx-auto">
              <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-6 text-center">
                07 / Testimonial real · George, Future Energy Group
              </div>
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
                    George · Future Energy Group
                  </div>
                  <div className="text-[11px] mono uppercase tracking-wider text-ink-400 mt-1">
                    Extras transcript video testimonial · 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. SERVICE POST-LIVRARE */}
        <Section number="08" eyebrow="Service post-livrare · ce s-a întâmplat în primul an">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Un singur tichet în 12 luni — schimb de lentile.
              </h2>
              <p className="text-ink-600 leading-relaxed">
                Politica noastră de a configura echipamentele să dureze înseamnă
                vânzări mai mici de piese de schimb și mai puține intervenții
                facturate. Pentru un atelier de 3 oameni, asta înseamnă predictibilitate
                operațională.
              </p>
            </div>
            <div className="lg:col-span-7">
              <dl className="divide-y hairline border-y hairline">
                <ServiceRow
                  label="Intervenții service în 12 luni"
                  value="1"
                  detail="Schimb de lentile de protecție consumate prin uzura normală — nu defect tehnic."
                />
                <ServiceRow
                  label="Defecte tehnice raportate"
                  value="0"
                  detail="Niciun ticket pentru defect, eroare sau problemă cu controller-ul."
                />
                <ServiceRow
                  label="Comunicare post-implementare"
                  value="Suport on-demand"
                  detail="Manuale, sfaturi tehnice și recomandări la cerere — confirmat de client în testimonialul video."
                />
                <ServiceRow
                  label="Garanție rămasă"
                  value="≈48 luni"
                  detail="Standard Uzinex 60 luni · acoperă piese OEM, manopera, deplasare."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 9. GALERIE */}
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
                În video George explică în propriile cuvinte cum aparatul laser le-a
                rezolvat problema structurilor speciale, demonstrează curățarea cu
                laser pe metal ruginit (vs. metoda clasică cu deatea de rugină) și
                arată tehnica de focalizare corectă pentru rezultat optim.
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
                  <span className="font-light text-white/70">și ce am schimbat în procesul nostru.</span>
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
            calificat în zona ta, ore de sudură efectivă pe săptămână, și costul
            unui echipament laser similar. Vezi în câte luni se amortizează prin
            economia pură de salariu.
          </p>
          <PaybackCalculator />
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
                  Atelier mic,<br />
                  <span className="font-light text-uzx-orange">nevoie de calitate premium?</span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Dacă nu ai sudor angajat și o nevoie ocazională nu justifică
                  angajarea, hai să discutăm. Putem livra echipamentul în custodie
                  pentru probă fizică în atelierul tău — exact cum am făcut pentru
                  Future Energy Group. Plătești după ce vezi că funcționează.
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
                  href="/contact?subject=Echipament%20laser%203-in-1%20%E2%80%94%20probare%20%C3%AEn%20custodie&context=Studiu%20de%20caz%20Future%20Energy%20Group"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Vreau aparat în custodie pentru probă
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Nu factură proformă, nu avans. Aparat în atelierul tău, pe materialul
                  tău. Plătești dacă vezi că rezolvă.
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
