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
import { VideoPlayer, EdgeQualityComparator } from "./interactive";
import {
  GeomarDiagramFigure,
  B2CWorkflowDiagram,
  ProductRangeDiagram,
} from "./diagrams";

const SLUG = "geomar-pitesti";
const YT_ID = "Ofsgi59eWI4";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;
const GEOMAR_WEBSITE = "https://geomar.com.ro/";

export const metadata: Metadata = {
  title:
    "Studiu de caz Geomar · Atelier B2C confecții metalice cu laser fiber 6 kW · Pitești",
  description:
    "Cum Marian, fondatorul Geomar SRL din Pitești, a pivotat strategic spre nișa „tablă curată” pentru clienți B2C cu o investiție Start-Up Nation 2022 în laser fiber economy 6 kW, sudură laser și pachet de digitalizare. Pentru un atelier de 2 oameni care vinde direct, edge-ul curat de la laser este diferențiatorul vizibil față de concurența cu disc abraziv sau plasma.",
  keywords: [
    "Geomar Pitesti",
    "atelier confectii metalice B2C",
    "laser fiber 6 kW economy",
    "sudura laser inox aluminiu",
    "Start-Up Nation 2022 atelier",
    "tabla curata laser fiber",
    "pachet digitalizare confectii metalice",
    "studiu de caz Uzinex",
    "porti balustrade custom Arges",
    "fonduri europene atelier metal",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title:
      "Geomar · pivotare spre „tabla curată” cu laser fiber 6 kW · Start-Up Nation 2022",
    description:
      "Atelier B2C de 2 oameni din Pitești. Laser fiber economy 6 kW + sudură laser + pachet digitalizare. Pentru clienți finali, edge-ul curat din laser este diferențiatorul față de tăierea cu disc sau plasma.",
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
  { label: "Client", value: "Geomar SRL" },
  { label: "Fondator", value: "Marian" },
  { label: "Sediu", value: "Pitești, Argeș" },
  { label: "Echipă", value: "2 angajați cu fondatorul" },
  { label: "Anul aplicare finanțare", value: "2022 · Start-Up Nation" },
  { label: "Investiție echipamente", value: "≈ 50.000 € · finanțare nerambursabilă" },
  { label: "Canal vânzare", value: "B2C · clienți finali direct" },
  {
    label: "Site web",
    value: "geomar.com.ro",
    href: GEOMAR_WEBSITE,
    external: true,
  },
];

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial · 2022",
    title: "Reclamă pe Facebook și o conversație despre Start-Up Nation",
    body:
      "Marian a văzut o reclamă pe Facebook despre fonduri Start-Up Nation. Avea atelierul de confecții metalice de mai mulți ani, dar utilajele lui nu țineau pasul cu cerințele de finisaj ale clienților direcți. A sunat, am stabilit o conferință video, am verificat eligibilitatea pe codurile CAEN și am identificat utilajele cheie: laser fiber economy 6 kW, sudură laser și pachet de digitalizare.",
  },
  {
    phase: "Consultanță finanțare · 2022",
    title: "Dosarul Start-Up Nation pregătit fără cost de consultanță",
    body:
      "La fel ca în cazul Fier-Forjat Limanu, am pregătit împreună dosarul tehnic pentru aplicația Start-Up Nation: justificare echipamente, plan de implementare, buget defalcat. Politica e standard pentru clienții care comandă echipamentele de la noi: dacă lucrăm împreună la utilaje, asistența pe finanțare e inclusă fără cost.",
  },
  {
    phase: "Aprobare și aștept",
    title: "Procesul de finanțare a durat mai mult decât planificat",
    body:
      "Procesul Start-Up Nation a urmat ritmul standard al programului. Între timp am ținut legătura cu Marian, am ajustat oferta tehnică și am pregătit livrarea pentru momentul disbursării. Pentru un atelier B2C cu volume modeste, rămânerea aproape în perioada de așteptare a fost critică.",
  },
  {
    phase: "Livrare · 2023",
    title: "Trei utilaje cheie pentru pivotarea spre tabla curată",
    body:
      "Comanda a inclus laser fiber economy 6 kW pentru debit, aparat de sudură cu laser pentru cordoane fine pe inox și aluminiu, plus pachet de digitalizare cu software industrial de proiectare a elementelor metalice. Dimensionarea a fost făcută pentru profilul real al atelierului Geomar: serii mici, comenzi unicat, finisaj vizibil.",
  },
  {
    phase: "Punere în funcțiune și producție",
    title: "Pivotare imediată spre comenzi cu finisaj fair-faced",
    body:
      "După commissioning, Marian a putut accepta comenzi pe care nu le mai accepta înainte: porți cu modele decorative, balustrade interior cu muchii vizibile, mobilier exterior din inox. La B2C, clientul vede direct produsul, iar muchia curată de laser este un argument de vânzare imediat. Pivotarea de business a fost rapidă și concretă.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "6 kW",
    label: "Laser fiber economy · debit tablă curată",
    detail:
      "Configurația economy este optimă pentru atelier B2C cu volume modeste. Putere suficientă pentru inox, aluminiu și oțel construcție pe grosimi 0,5–8 mm.",
  },
  {
    value: "≈ 50K €",
    label: "Investiție Start-Up Nation 2022",
    detail:
      "Trei utilaje cheie: laser fiber 6 kW, aparat sudură laser, pachet digitalizare cu software proiectare. Finanțarea nerambursabilă a făcut investiția accesibilă pentru atelier de 2 oameni.",
  },
  {
    value: "0",
    label: "Chemări service post-PIF",
    detail:
      "Toate cele trei echipamente funcționează fără probleme. Niciun apel pentru defect tehnic raportat după punerea în funcțiune.",
  },
  {
    value: "B2C",
    label: "Pivot strategic · vânzare directă",
    detail:
      "Marian a observat că nișa „tablă curată” se poartă mainstream pe B2C. Laserul livrează exact acest finisaj fără prelucrări suplimentare, deschizând segmente de comenzi inaccesibile cu utilajele vechi.",
  },
  {
    value: "0",
    label: "Cost consultanță finanțare",
    detail:
      "Pentru clienții care comandă echipamentele de la noi, consultanța pe dosarul Start-Up Nation este inclusă fără cost adițional. La Geomar, ca și la Fier-Forjat Limanu, asta a fost diferențiatorul.",
  },
  {
    value: "Următorul pas",
    label: "Linie vopsire electrostatică · în pregătire",
    detail:
      "Relația continuă. După atelierul de bază, urmează să livrăm o linie de vopsire electrostatică pentru finisaj final pe produsele Geomar destinate exteriorului. Story-ul evoluează.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "La B2C, edge-ul vizibil al tăieturii este un argument de vânzare imediat",
    body:
      "Pentru un atelier care vinde direct clientului final, muchia produsului este vizibilă, iar finisajul nu poate fi negociat în jos. Tăierea cu disc abraziv sau plasma cere prelucrări suplimentare ca produsul să arate prezentabil. Laserul fiber livrează tablă curată direct din mașină, ceea ce înseamnă că Marian poate accepta comenzi pe care altfel le-ar fi refuzat din lipsă de timp pentru finisaj.",
  },
  {
    title: "Pachetul de digitalizare e diferența între comandă acceptată și comandă pierdută",
    body:
      "Software-ul industrial de proiectare a elementelor metalice permite atelierului să transforme rapid o cerere de client într-un fișier tăiabil pe laser. Pentru B2C, viteza de la cerere la confirmare contează. La Geomar, digitalizarea a fost piesa care a închis bucla între capacitatea tehnică și agilitatea comercială.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Ce înseamnă concret „tabla curată” și de ce contează pentru un atelier B2C?",
    answer:
      "Tabla curată este termenul folosit colocvial pentru tăieturile cu muchie netedă, fără bavură, fără oxidare, fără urme de finisaj manual. Se obține cu metode termice de precizie precum laserul fiber sau cu metode reci precum waterjet-ul. Pentru un atelier B2C, importanța e directă: clientul final vede muchia produsului în casa lui, pe gardul lui, pe balustrada lui. Dacă muchia e curată, produsul arată profesional fără prelucrări suplimentare. Dacă muchia are bavură sau oxidare, atelierul trebuie să șlefuiască manual fiecare element, ceea ce dublează timpul de execuție și reduce marja.",
  },
  {
    question: "De ce laser fiber economy 6 kW și nu o variantă mai puternică sau mai ieftină?",
    answer:
      "Configurația economy 6 kW este optimă pentru atelierul B2C cu volume modeste. Sub 6 kW, ai limitări pe grosimi peste 5–6 mm pe inox. Peste 6 kW, plătești putere suplimentară pe care un atelier mic nu o folosește des, plus consum mai mare de electricitate și de gaz de asistență. Configurația economy reduce costul utilajului fără să sacrifice calitatea muchiei pe gama tipică de produse Geomar de 1–4 mm grosime.",
  },
  {
    question: "Cum funcționează asistența gratuită de finanțare pe care o oferiți pe Start-Up Nation?",
    answer:
      "Pentru proiectele unde livrăm echipamentele, consultanța pe dosarul de finanțare este inclusă fără cost adițional. Ajutăm cu identificarea programului potrivit, pregătim partea tehnică a dosarului cu specificații, justificări, plan de implementare și buget defalcat, apoi o transmitem consultantului acreditat care depune cererea. Politica este standard pentru clienții care comandă echipamentele de la noi. La Geomar și la Fier-Forjat Limanu, ambele aplicații Start-Up Nation 2022 au fost pregătite în acest mod.",
  },
  {
    question: "Ce diferență concretă face sudura laser pe inox față de sudura conventională MIG/TIG?",
    answer:
      "Citat din testimonialul lui Marian despre prima sudură laser pe inox: „E altceva, e cu totul altceva.” Concret: cordonul iese fin, fără pori, cu zona afectată termic minimă, fără modificări de culoare pe oțelul inox. Pentru produse vizibile clientului B2C, asta înseamnă că nu mai e nevoie de polizare ulterioară a cordoanelor. Pe aluminiu, laserul evită problemele tipice ale TIG-ului cu vântul și gazul protector. Pentru un atelier mic care lucrează multe materiale diferite, sudura laser închide capabilitatea cu un singur aparat.",
  },
  {
    question: "Ce face „pachetul de digitalizare” pentru un atelier de confecții metalice?",
    answer:
      "Pachetul include software industrial de proiectare a elementelor metalice plus integrare cu utilajul de tăiere laser. Practic, atelierul primește o comandă de la client, desenează rapid în software, generează fișierul de tăiere și pornește laserul fără pași intermediari de conversie sau ajustare manuală. Pentru un atelier B2C cu serii mici și comenzi unicat, digitalizarea reduce timpul de la cerere la confirmare comercială, ceea ce influențează direct rata de conversie și capacitatea de a accepta comenzi suplimentare.",
  },
  {
    question: "După atelier, urmează o linie de vopsire electrostatică · ce înseamnă pentru relația continuă?",
    answer:
      "Vopsirea electrostatică este pasul final pentru produsele Geomar destinate exteriorului: porți, balustrade, mobilier de grădină. După debit laser și sudură, produsul are nevoie de finisaj de protecție durabilă. Linia de vopsire electrostatică pe care urmează să o livrăm va închide capabilitatea atelierului, transformând Geomar într-un atelier complet de la materie primă la produs finit gata de instalat. Pentru noi, e validarea că relația continuă natural, fiecare investiție următoare construind pe ce am livrat anterior.",
  },
  {
    question: "Pentru un atelier B2C similar, care e configurația minimă de pornire cu finanțare nerambursabilă?",
    answer:
      "Recomandarea de bază pe baza experienței Geomar: laser fiber 6 kW economy plus aparat de sudură (laser sau MIG/MAG/TIG în funcție de gama produselor) plus software industrial de proiectare. Pentru un atelier B2C de 1–3 oameni, configurația pornește de la circa 50.000 € total, dintre care contribuția proprie după Start-Up Nation poate scădea la 15.000–20.000 €. Pentru un audit pe profilul tău concret, contactează-ne cu lista de produse pe care vrei să le faci.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Am achiziționat acest laser ca să pot să mă extind. Eu făcând confecții metalice și văzând că se poartă foarte mult tabla curată, am decis să achiziționez un laser pentru confecțiile pe care vreau să le susțin.",
  "Sudura laser pe inox e altceva, e cu totul altceva. Calitatea aparatelor e indubitabilă, mostrele spun totul.",
  "Cu prețul și raportul calității, au fost cel mai bun preț și cea mai bună calitate de pe piață. Ne-am înțeles bine și suntem mulțumiți.",
];

const HERO_QUOTE = {
  text: "Eu făcând confecții metalice și văzând că se poartă foarte mult tabla curată, am decis să achiziționez un laser.",
  source: "Marian · fondator Geomar SRL",
};

export default function GeomarPitestiPage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    {
      name: "Geomar Pitești · atelier B2C cu laser fiber 6 kW",
      url: `/studii-de-caz/${SLUG}`,
    },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title:
      "Geomar SRL · atelier B2C confecții metalice cu laser fiber 6 kW economy · Start-Up Nation 2022",
    excerpt:
      "Cum Marian, fondatorul Geomar SRL din Pitești, a pivotat spre nișa „tablă curată” pentru clienți B2C cu o investiție Start-Up Nation 2022 în trei utilaje Uzinex.",
    category: "Studiu de caz · Auto & metalurgie",
    datePublished: "2023-06-01",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial Marian · Geomar SRL · laser fiber și sudură laser pentru atelier B2C confecții metalice",
    description:
      "Marian, fondatorul Geomar SRL din Pitești, despre experiența cu echipamentele Uzinex: laser fiber 6 kW pentru tăiere, aparat de sudură cu laser pentru cordoane fine, plus pachet de digitalizare. Atelier B2C care vinde direct clienților finali porți, balustrade, mobilier și decor metalic.",
    youtubeId: YT_ID,
    uploadDate: "2024-02-15T10:00:00Z",
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
                    Auto & metalurgie · atelier B2C
                  </span>
                  <span>· Pitești, Argeș</span>
                  <span>· Start-Up Nation 2022</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-5"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Pivotare strategică spre tabla curată<br />
                  <span className="font-light text-uzx-orange">
                    cu laser fiber 6 kW și consultanță finanțare gratuită.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-ink-600 leading-relaxed max-w-2xl">
                  Marian face confecții metalice de mai mulți ani la Pitești.
                  Vinde direct clienților finali porți, balustrade, mobilier
                  exterior și decor custom. A observat că nișa „tablă curată”
                  devine mainstream și a decis să-și transforme atelierul
                  spre acest segment cu o investiție Start-Up Nation 2022 în
                  trei utilaje Uzinex: laser fiber economy 6 kW pentru debit,
                  aparat de sudură laser pentru cordoane fine, plus pachet de
                  digitalizare. Pentru un atelier B2C, edge-ul curat din
                  laser nu este un parametru tehnic, este un argument de
                  vânzare imediat.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="6 kW" label="Laser fiber economy · tablă curată" />
                  <HeroStat value="≈ 50K €" label="Investiție Start-Up Nation 2022" />
                  <HeroStat value="0" label="Chemări service post-PIF" />
                </div>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:self-stretch">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Marian · Geomar SRL · laser fiber 6 kW și sudură laser pentru atelier B2C"
                  duration="2:52"
                />
                <p className="text-[11px] mono uppercase tracking-widest text-ink-500 mt-3">
                  Interviu video la atelier · prezentare echipamente
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ */}
        <Section number="01" eyebrow="Cartelă client · Geomar SRL">
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
        <Section number="02" eyebrow="Punctul de plecare · pivotarea spre tabla curată">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                La B2C, clientul vede direct muchia produsului. Finisajul nu poate fi negociat în jos.
              </h2>
              <div className="space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
                <p>
                  Marian observă o tendință clară pe piața locală din Argeș:
                  clienții finali, proprietarii de case, arhitecții și
                  designerii cer din ce în ce mai mult produse din metal cu
                  finisaj curat, fără urme de polizare manuală sau bavură
                  vizibilă. Estetica „tablă curată” nu mai e premium, devine
                  standard.
                </p>
                <p>
                  Atelierul lui de confecții metalice avea utilaje vechi care
                  nu țineau pasul cu această cerință. Tăierea cu disc abraziv
                  și sudura conventională produceau muchii și cordoane care
                  cereau prelucrări suplimentare manuale, dublând timpul de
                  execuție și limitând tipul de comenzi pe care le putea
                  accepta.
                </p>
                <p>
                  <strong className="text-ink-900">
                    Întrebarea nu era cum mărește atelierul, ci cum schimbă
                    profilul de produs pe care îl vinde.
                  </strong>{" "}
                  Reclama de Facebook despre Start-Up Nation a venit la
                  momentul potrivit. Apelul a urmat în aceeași zi, conferința
                  video a doua zi.
                </p>
              </div>

              <blockquote className="border-l-2 mt-7 pl-5 py-2" style={{ borderColor: "#f5851f" }}>
                <p className="serif text-lg lg:text-xl text-ink-900 leading-snug italic">
                  „{HERO_QUOTE.text}”
                </p>
                <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mt-3">
                  {HERO_QUOTE.source}
                </div>
              </blockquote>
            </div>

            <aside className="lg:col-span-5 border hairline bg-ink-50 p-6 lg:p-8">
              <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-4">
                Modelul Geomar · atelier B2C de proximitate
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    Canal vânzare
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Direct clientului final pe piața locală din Argeș.
                    Proprietari de case, arhitecți, designeri, primării
                    locale. Niciun intermediar.
                  </p>
                </div>
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    Gama de produse
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Porți, balustrade, mobilier exterior, decor metalic,
                    replici ornamentale, comenzi unicat. Volume mici, comenzi
                    custom.
                  </p>
                </div>
                <div className="border-l-2 border-uzx-orange pl-4">
                  <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mb-1">
                    Echipa
                  </div>
                  <p className="text-sm text-ink-700 leading-relaxed">
                    Marian plus un al doilea om, total 2 oameni operațional.
                    Fluxul artizanal cu utilaje semi-auto.
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
              title="Reclamă pe Facebook · apel direct"
              body="Marian a văzut o reclamă pe Facebook despre fonduri Start-Up Nation. A sunat imediat, am stabilit conferința video pentru ziua următoare. Conversația a început tehnic, fără filtre comerciale, sub presiunea reală a unui atelier care voia să pivoteze pe nișa tablă curată."
            />
            <ReasonCard
              num="B"
              title="Cei mai buni de pe piață · pe preț și calitate"
              body="Citat direct din testimonial: „Cu prețul și raportul calității, au fost cel mai bun preț și cea mai bună calitate de pe piață.” Pentru un atelier mic cu buget limitat după contribuția proprie din Start-Up Nation, raportul calitate-preț a fost decisiv. Configurația economy 6 kW reduce costul fără să sacrifice calitatea muchiei."
            />
            <ReasonCard
              num="C"
              title="Consultanță finanțare gratuită + suport tehnic"
              body="Pe proiectele unde livrăm echipamentele, dosarul Start-Up Nation e inclus fără cost. La Geomar, ca și la Fier-Forjat Limanu (ambele aplicații 2022), am pregătit împreună dosarul tehnic. Plus suport tehnic continuu post-livrare pe canal direct, fără call-center."
            />
          </div>
        </Section>

        {/* 4. ECHIPAMENTE LIVRATE */}
        <Section number="04" eyebrow="Echipamente livrate · 3 utilaje cheie pentru pivotare B2C">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Configurație minimă viabilă pentru atelier B2C cu pretenții pe finisaj.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow
                  label="Laser fiber economy"
                  value="6 kW · debit tablă inox / aluminiu / oțel · grosimi 0,5–8 mm"
                />
                <SpecRow
                  label="Aparat sudură laser"
                  value="cordoane fine pe inox și aluminiu · zona afectată termic minimă"
                />
                <SpecRow
                  label="Pachet digitalizare"
                  value="software industrial proiectare elemente metalice · integrare cu laserul"
                />
                <SpecRow
                  label="Tip flux"
                  value="hibrid · automatizat pe debit, manual pe sudură și asamblare"
                />
                <SpecRow
                  label="Operatori per schimb"
                  value="2 oameni · Marian plus un al doilea operator"
                />
                <SpecRow
                  label="Materiale tipice"
                  value="inox AISI 304 · aluminiu seria 5xxx · oțel construcție"
                />
              </dl>

              <p className="text-[11px] text-ink-500 mt-5 leading-relaxed italic">
                Configurația economy reduce costul utilajului fără să
                sacrifice calitatea muchiei pe gama tipică Geomar de 1–4 mm
                grosime. Pentru atelierul lui Marian, asta înseamnă acoperire
                completă a cerințelor B2C cu un cost de utilaj sub jumătate
                din varianta industrială.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div
                className="text-white p-6 lg:p-8"
                style={{ background: "#082545" }}
              >
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-3">
                  De ce „economy” pe atelier B2C
                </div>
                <h3
                  className="serif text-xl lg:text-2xl leading-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Aceeași calitate a muchiei la jumătate din costul industrial.
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-5">
                  Configurația economy a laserului fiber este dimensionată
                  pentru atelier mic cu volume modeste. Putere identică pe
                  fasciculul activ, automatizări reduse pe încărcare și
                  schimbare materiale. Pentru un atelier B2C cu serii mici și
                  comenzi unicat, asta este combinația optimă: muchie premium
                  fără cost industrial.
                </p>
                <Link
                  href="/contact?subject=Atelier%20confec%C8%9Bii%20metalice%20B2C%20%E2%80%94%20laser%20fiber%206%20kW%20economy&context=Studiu%20de%20caz%20Geomar"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-uzx-orange underline-link group"
                >
                  Solicit dimensionare laser pentru atelier B2C
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        {/* 5. FLUX B2C */}
        <Section number="05" eyebrow="Fluxul atelierului · de la cerere la produs livrat">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cinci pași de la cerere directă la produs custom livrat clientului final.
              </h2>
              <p>
                Atelierul Geomar primește cererea direct de la client final.
                Marian sau colegul lui desenează rapid în software,
                generează fișierul de tăiere, pornește laserul, sudează
                părțile cu sudura laser și livrează produsul fără finisaj
                suplimentar. Fluxul este artizanal pe asamblare, dar
                semi-automatizat pe debit și sudură.
              </p>
              <p>
                Pentru un atelier B2C cu volume mici, viteza de la cerere la
                confirmare comercială contează direct pe rata de conversie.
                Pachetul de digitalizare a închis bucla între capacitatea
                tehnică și agilitatea comercială.
              </p>
            </div>
            <div className="lg:col-span-7">
              <GeomarDiagramFigure
                number="Schema 1 · flux atelier B2C"
                caption="Cinci stații de la cerere directă a clientului la produs livrat fără finisaj suplimentar. Pivotul „tabla curată” este indicat la baza diagramei ca diferențiator strategic."
              >
                <B2CWorkflowDiagram />
              </GeomarDiagramFigure>
            </div>
          </div>
        </Section>

        {/* 6. GAMĂ PRODUSE */}
        <Section number="06" eyebrow="Gama de produse · ce poate accepta atelierul după pivotare">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Șase categorii de produse care înainte cereau finisaj manual.
              </h2>
              <p>
                După instalarea laserului, Marian poate accepta comenzi care
                cer muchie vizibilă curată: porți cu modele decorative,
                balustrade interior cu detalii fine, mobilier exterior din
                inox, decor arhitectural, replici ornamentale și comenzi
                unicat. Toate aveau un cost ascuns înainte: timpul de
                șlefuire manuală pentru fiecare element.
              </p>
              <p>
                Pivotarea nu este o creștere de volum în aceeași gamă, este o
                schimbare a tipurilor de comenzi pe care atelierul le
                acceptă. Asta deschide segmente de clienți noi cu disponibilitate
                de plată mai mare pentru produse cu finisaj premium.
              </p>
            </div>
            <div className="lg:col-span-7">
              <GeomarDiagramFigure
                number="Schema 2 · gama produse după pivotare"
                caption="Șase categorii de produse posibile cu setup-ul Geomar de la 2022 încoace. Linia portocalie sub fiecare card indică finisajul fair-faced direct din laser."
              >
                <ProductRangeDiagram />
              </GeomarDiagramFigure>
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
            Notă transparentă. Detaliile financiare exacte și volumele de
            producție nu sunt publicate fără acord explicit. Cifrele vizibile
            sunt confirmate de Marian în testimonialul video sau sunt
            ordin de mărime orientativ.
          </p>
        </Section>

        {/* 9. SERVICE */}
        <Section number="09" eyebrow="Service post-livrare · zero intervenții">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                Trei utilaje livrate · zero chemări service.
              </h2>
              <p className="text-ink-600 leading-relaxed mb-5">
                Toate cele trei echipamente livrate la Geomar funcționează
                fără probleme tehnice raportate. Marian face mentenanța
                preventivă in-house cu colegul lui, iar pentru întrebări
                punctuale ne sună direct, fără call-center.
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
                  label="Chemări garanție"
                  value="0"
                  detail="Niciun apel pentru defect tehnic raportat la cele trei echipamente."
                />
                <ServiceRow
                  label="Mentenanță preventivă"
                  value="In-house"
                  detail="Marian și colegul lui preiau operarea curentă și mentenanța preventivă."
                />
                <ServiceRow
                  label="Suport tehnic"
                  value="La cerere"
                  detail="Suport telefonic direct, fără call-center. Pe canal direct, indiferent de oră."
                />
                <ServiceRow
                  label="Configurare la PIF"
                  value="Inclusă"
                  detail="Trainingul operatorilor și calibrarea pe materialele lor reale au fost făcute la commissioning."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 10. BONUS — RELAȚIA CONTINUĂ */}
        <section className="border-b hairline py-14 lg:py-20" style={{ background: "#faf6f1" }}>
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] mb-4" style={{ color: "#c83a17" }}>
              10 / Bonus story · relația continuă
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h2
                  className="serif text-2xl lg:text-4xl text-ink-900 leading-tight mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Următorul pas · linie de vopsire electrostatică în pregătire.
                </h2>
                <div className="space-y-4 text-ink-600 leading-relaxed">
                  <p>
                    După ce atelierul a intrat în producție stabilă pe noua
                    nișă „tablă curată”, Marian a identificat etapa
                    următoare: vopsirea finală a produselor destinate
                    exteriorului. Porți, balustrade exterior, mobilier de
                    grădină — toate cer un finisaj de protecție durabilă
                    împotriva intemperiilor.
                  </p>
                  <p>
                    Linia de vopsire electrostatică pe care urmează să o
                    livrăm va închide capabilitatea atelierului. Geomar va
                    deveni atelier complet de la materie primă la produs
                    finit gata de instalat, fără dependență de subcontractori
                    externi pentru finisaj.
                  </p>
                  <p>
                    Pentru noi este validarea că relația continuă natural,
                    fiecare investiție următoare construind pe ce am livrat
                    anterior. Marian e azi mai mult decât client, e
                    partener pe drumul de creștere.
                  </p>
                </div>
              </div>
              <aside
                className="lg:col-span-5 border hairline p-6 lg:p-8 bg-white"
                style={{ borderLeft: "2px solid #c83a17" }}
              >
                <div className="text-[10px] mono uppercase tracking-widest mb-3" style={{ color: "#c83a17" }}>
                  Capabilitate completă · în construcție
                </div>
                <ul className="space-y-3 text-sm text-ink-700">
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#16a34a" }}>✓</span>
                    <span>
                      <strong className="text-ink-900">Debit laser fiber 6 kW</strong>{" "}
                      · livrat 2023, în producție continuă.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#16a34a" }}>✓</span>
                    <span>
                      <strong className="text-ink-900">Sudură laser inox / aluminiu</strong>{" "}
                      · livrat 2023, cordoane fine pentru produse vizibile.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#16a34a" }}>✓</span>
                    <span>
                      <strong className="text-ink-900">Software industrial proiectare</strong>{" "}
                      · livrat 2023, integrat cu laserul.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#c83a17" }}>→</span>
                    <span>
                      <strong className="text-ink-900">Linie vopsire electrostatică</strong>{" "}
                      · în pregătire, finisaj durabil pentru produse de
                      exterior.
                    </span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* 11. TESTIMONIAL */}
        <Section number="11" eyebrow="Testimonial · fragmente din interviul video">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl">
            {TESTIMONIAL_QUOTES.map((q, i) => (
              <blockquote
                key={i}
                className="border-l-2 pl-5 py-2"
                style={{ borderColor: "#f5851f" }}
              >
                <p className="serif text-base lg:text-lg text-ink-900 leading-snug italic">
                  „{q}”
                </p>
              </blockquote>
            ))}
          </div>
          <p className="text-[11px] text-ink-500 mt-8 leading-relaxed italic max-w-3xl">
            Citate editate pentru claritate, păstrând sensul exact al
            declarațiilor lui Marian. Interviul video integral este
            disponibil în secțiunea hero a paginii.
          </p>
        </Section>

        {/* 12. LECȚII */}
        <section className="border-b hairline text-white py-14 lg:py-20" style={{ background: "#082545" }}>
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
                    livrarea unui atelier B2C de proximitate.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Două observații care au schimbat felul în care propunem
                  ateliere mici cu vânzare directă către clienți finali.
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
        <Section number="13" eyebrow="Întrebări frecvente · atelier B2C cu laser fiber">
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

        {/* 14. EDGE QUALITY COMPARATOR */}
        <Section number="14" eyebrow="Tool interactiv · compară muchia pe metode și materiale">
          <EdgeQualityComparator />
        </Section>

        {/* 15. CONTACT */}
        <section
          className="border-b hairline py-14 lg:py-20"
          style={{ background: "#082545" }}
        >
          <div className="container-x text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                  15 / Contact · vrei un atelier B2C cu finisaj premium?
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Configurație economy<br />
                  <span className="font-light text-uzx-orange">
                    cu calitate premium pentru clienți B2C.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Pentru ateliere mici de confecții metalice care vând direct
                  clienților finali, dimensionăm laserul fiber 6 kW economy
                  plus utilajele complementare, te ghidăm pe dosarul de
                  finanțare nerambursabilă fără să luăm bani de consultanță,
                  livrăm și rămânem alături la apel direct.
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
                  href="/contact?subject=Atelier%20confec%C8%9Bii%20metalice%20B2C%20%E2%80%94%20laser%20fiber%20%2B%20finan%C8%9Bare&context=Studiu%20de%20caz%20Geomar"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit dimensionare atelier B2C
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Pentru ateliere mici care încă nu au aplicat la fonduri,
                  asistența pe dosar este inclusă fără cost pentru clienții
                  care comandă echipamentele de la noi.
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
