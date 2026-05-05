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
import { VideoPlayer, WorkshopPaybackCalculator } from "./interactive";
import {
  FierForjatDiagramFigure,
  WorkshopFlowDiagram,
  ProductivityCompareDiagram,
  ErgonomicLoadDiagram,
} from "./diagrams";

const SLUG = "fier-forjat-limanu";
const YT_ID = "bCxoVN1QgQM";
const HERO_IMG = `https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`;
const FFL_WEBSITE = "https://fierforjat-constanta.ro/";

export const metadata: Metadata = {
  title:
    "Studiu de caz Fier-Forjat Limanu · Atelier confecții metalice cu finanțare nerambursabilă",
  description:
    "Cum un meșter în fier forjat din Limanu, Constanța, cu dureri cronice de spate și utilaje vechi manuale, a construit un atelier semi-automat de 68.000 € cu finanțare Start-Up Nation. Rezultate: ×5–6 viteză producție, +50% calitate, 1 om operează 3–4 mașini.",
  keywords: [
    "atelier fier forjat",
    "confectii metalice custom",
    "Start-Up Nation atelier",
    "ghilotina combinata",
    "masina forjat fier rece A150A",
    "ciocan pneumatic 40 kg",
    "studiu de caz Uzinex",
    "Fier-Forjat Limanu",
    "fonduri europene atelier metal",
    "atelier semi automatizat",
  ],
  alternates: { canonical: `/studii-de-caz/${SLUG}` },
  openGraph: {
    title:
      "Fier-Forjat Limanu · ×5–6 viteză cu 68.000 € investiție și fonduri Start-Up Nation",
    description:
      "Un meșter cu accident la coloană trece de la utilaje manuale la atelier semi-automat. Aceeași echipă, ×5–6 producție, calitate +50%, durerile de spate în spate.",
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
  { label: "Client", value: "Fier-Forjat Limanu SRL" },
  { label: "Fondator", value: "Jan Paul Elhor" },
  { label: "Sediu", value: "Limanu, Constanța" },
  { label: "Echipă", value: "3 oameni cu fondatorul" },
  { label: "Anul aplicare finanțare", value: "2020 · Start-Up Nation" },
  { label: "Anul producție efectivă", value: "2023" },
  { label: "Investiție echipamente", value: "≈ 68.000 € · finanțare nerambursabilă" },
  {
    label: "Site web",
    value: "fierforjat-constanta.ro",
    href: FFL_WEBSITE,
    external: true,
  },
];

const TIMELINE: Array<{ phase: string; title: string; body: string }> = [
  {
    phase: "Apel inițial · 2020",
    title: "Reclamă pe Facebook și apel direct",
    body:
      "Jan a văzut o reclamă pe Facebook despre fonduri Start-Up Nation. A sunat imediat, iar a doua zi am avut o conferință video. Am verificat codurile CAEN și am discutat ce echipamente i-ar rezolva durerile concrete în atelier, nu doar ergonomic, ci și de viteză și calitate. Conversația a început tehnic, fără filtre comerciale.",
  },
  {
    phase: "Consultanță finanțare · 2020-2021",
    title: "Dosarul Start-Up Nation pregătit fără cost de consultanță",
    body:
      "Am pregătit împreună dosarul tehnic pentru aplicația Start-Up Nation: justificare echipamente, plan de implementare, buget defalcat. Nu am luat bani de consultanță, pentru că politica noastră pe finanțare e că dacă lucrăm împreună la dosar și la furnizarea echipamentelor, asistența e inclusă. Pentru un meșter care încă nu primise banii, asta a contat enorm.",
  },
  {
    phase: "Aprobare și aștept",
    title: "Banii s-au amânat, am amânat și noi comanda",
    body:
      "Procesul Start-Up Nation a durat mai mult decât speram, banii au sosit abia în 2023. Între timp am ținut legătura, am ajustat oferta tehnică pe specificațiile reale ale atelierului din Limanu și am pregătit livrarea pentru momentul exact al disbursării.",
  },
  {
    phase: "Livrare · blocaje globale",
    title: "Conflicte internaționale, transport blocat, matrițe rătăcite",
    body:
      "Comanda a coincis cu o perioadă tensionată pe transportul internațional. Au apărut întârzieri neplanificate la livrare. Mai mult, au dispărut din transport o parte din matrițele pentru ghilotină și ciocanul pneumatic. Le-am recuperat ulterior, iar pentru perioada de așteptare i-am livrat lui Jan câteva accesorii primite cadou de la producători. Pierderea timpului contractual am compensat-o cu valoare reală în atelier.",
  },
  {
    phase: "Punere în funcțiune · 2023",
    title: "Cosmin Florea în atelier, training pe echipamente, prima zi de producție",
    body:
      "Cosmin Florea a făcut commissioning-ul în atelierul din Limanu, training pentru Jan și echipa lui. Trei oameni Uzinex au fost direct implicați: Sorin Baciu pe consultanța de finanțare, Cristian Munthiu pe fluxul tehnologic, Cosmin Florea pe punere în funcțiune. Atelierul a intrat în producție în 2023 imediat ce ultima mașină a fost calibrată.",
  },
  {
    phase: "Prima lună de producție",
    title: "Sorin, producem la viteza de 5–6 ori mai rapid",
    body:
      "După câteva săptămâni de producție stabilă, Jan m-a sunat. „Sorin, avem de lucru la fel de mult ca înainte. Doar că acum stăm și o grămadă de timp degeaba, pentru că producem la viteza de 5–6 ori mai rapid.” A fost momentul în care am înțeles că proiectul a depășit așteptările pentru ambele părți.",
  },
];

const RESULTS: Array<{ value: string; label: string; detail: string }> = [
  {
    value: "×5–6",
    label: "Viteză producție · pe ciclu",
    detail:
      "Aceleași comenzi care durau o zi întreagă manual ies acum în 1-2 ore pe utilaje semi-automate. Confirmat de Jan în primele săptămâni de producție.",
  },
  {
    value: "+50%",
    label: "Calitate cordoane și debit",
    detail:
      "Citat din testimonialul video: „Dacă tăiem odată, e bine tăiat. Nu mai ne chinuim cu remediere.” Calitatea producției s-a îmbunătățit cu peste 50% conform fondatorului.",
  },
  {
    value: "1 → 3–4",
    label: "Mașini supravegheate per operator",
    detail:
      "Înainte aveau nevoie de 3-4 oameni pentru același lucru. Acum un singur operator poate supraveghea 3-4 utilaje în paralel datorită avansului automat și CNC-ului.",
  },
  {
    value: "0",
    label: "Chemări în garanție majore",
    detail:
      "O singură intervenție minoră, garnitură de ulei la ciocanul pneumatic, rezolvată rapid. Toate celelalte echipamente funcționează fără probleme.",
  },
  {
    value: "≈ 68K €",
    label: "Investiție totală echipamente",
    detail:
      "Fierăstrău cu bandă, ghilotină combinată, mașină de îndoit fier la rece A150A (Spania, CNC), mașină de găurit cu avans automat, freză, CNC, MIG/MAG/TIG, ciocan pneumatic 40 kg-forță, forjă plus accesorii.",
  },
  {
    value: "Subcontractor",
    label: "Pentru proiectele Uzinex",
    detail:
      "Atelierul Fier-Forjat Limanu execută astăzi pentru noi partea metalică a centralelor fotovoltaice mobile pe care le livrăm la ARS Industrial. Clientul a devenit furnizor.",
  },
];

const LESSONS: Array<{ title: string; body: string }> = [
  {
    title: "Sănătatea fondatorului e KPI-ul ascuns al oricărui atelier mic",
    body:
      "Jan suferea de dureri cronice de spate după un accident de pe acoperiș. Munca manuală cu utilaje vechi îi punea în pericol nu doar timpul, ci și capacitatea de a continua meseria. Am înțeles din proiectul Limanu că la atelierele de meșteșugar, automatizarea nu e un lux operațional, e o investiție în sănătatea operatorului unic. Ciocanul pneumatic de 40 kg-forță nu e doar un upgrade de viteză, e diferența între a continua sau a abandona meseria.",
  },
  {
    title: "Asistența gratuită pe finanțare schimbă cine ajunge să se candideze",
    body:
      "Mulți meșteri și antreprenori mici nu aplică la fonduri pentru că procesul pare imposibil de navigat. Am decis ca pe proiectele unde ne livrăm și echipamentele, consultanța de finanțare să fie inclusă fără cost. Jan ne-a confirmat că fără acest sprijin nu ar fi reușit singur. Politica a rămas standard: dacă lucrăm împreună pe utilaje, te ajutăm și pe dosar.",
  },
  {
    title: "Blocajele de transport internațional sunt ale noastre, nu ale clientului",
    body:
      "Când matrițele s-au rătăcit pe traseu, prima reacție corectă a fost să-i livrăm lui Jan accesorii primite cadou de la producători, nu să așteptăm. Pierderea unei zile pentru un client care a așteptat trei ani după aprobare e o trădare. Lecția: asumăm riscul logistic integral, ne revanjăm prin valoare adăugată reală, nu prin scuze.",
  },
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "Cum funcționează asistența de finanțare gratuită pe care o oferiți?",
    answer:
      "Pentru proiectele unde livrăm echipamentele, consultanța pe dosarul de finanțare este inclusă fără cost adițional. Ajutăm cu identificarea programului potrivit precum Start-Up Nation, Femeia Antreprenor, Microîntreprinderi sau Industria Prelucrătoare, pregătim partea tehnică a dosarului cu specificații, justificări, plan de implementare și buget defalcat, apoi o transmitem consultantului acreditat care depune cererea. Politica este standard pentru clienții care comandă echipamentele de la noi.",
  },
  {
    question: "De ce a durat atât de mult de la aplicarea finanțării la livrarea echipamentelor?",
    answer:
      "Procesul Start-Up Nation a fost mai lent decât planificat: aplicare în 2020, banii efectiv primiți în 2023. În acea perioadă am menținut legătura cu Jan, am ajustat oferta tehnică și am amânat comanda exact pentru momentul disbursării. Pentru programele de finanțare nerambursabilă, această etapă de așteptare e normală. Important este ca furnizorul să rămână alături de client, nu să dispară între aprobare și plată.",
  },
  {
    question: "Ce lista exactă de echipamente compune un atelier complet de fier forjat de circa 68.000 €?",
    answer:
      "Fierăstrău mare pentru metal cu bandă, ghilotină combinată multifuncțională cu pedaul (taie tablă groasă plus găurire), mașină de îndoit fier la rece A150A fabricată în Spania cu comandă numerică (programe pentru S-uri, C-uri, cercuri, răsuciri de platbandă, lățime până la 2,20m), mașină de găurit cu avans automat și cutie de schimbători de viteze (cu tabele de filetat și filetare automată), freză, CNC, aparate de sudură MIG/MAG/TIG, ciocan pneumatic de 40 kg-forță, forjă plus accesorii. Configurația este replicabilă pe alte ateliere similare.",
  },
  {
    question: "Cum a ajuns un client Uzinex să devină subcontractor pentru proiectele noastre?",
    answer:
      "După ce atelierul a intrat în producție stabilă și calitatea s-a confirmat la nivel real, am înțeles că Jan poate executa partea metalică pentru proiectele noastre de centrale fotovoltaice mobile pe care le livrăm la ARS Industrial. Atelierul Limanu produce structurile metalice ale acestor centrale, iar Uzinex le integrează în soluția finală. Pentru noi este o validare directă a calității investiției: clientul devine furnizor de încredere pentru un alt client mare al nostru.",
  },
  {
    question: "Care este avantajul concret al unei mașini de îndoit fier la rece cu CNC versus manual?",
    answer:
      "Pe un atelier de fier forjat custom, formele se repetă pe serii mici (un set de 6 stâlpi pentru o poartă, 12 elemente decorative pentru o balustradă etc.). La îndoit manual, fiecare element diferă cu câțiva milimetri, iar montajul cere ajustări. Mașina A150A salvează programul de îndoire în memorie și execută identic toate elementele dintr-o serie. Înseamnă timp mai scurt pe lot, dar mai ales montaj fără ajustări, deoarece elementele sunt geometric identice.",
  },
  {
    question: "Ce înseamnă un ciocan pneumatic de 40 kg-forță în practica de zi cu zi a unui atelier de fier forjat?",
    answer:
      "În forjarea tradițională, fierul încălzit se modelează prin lovituri repetate cu ciocanul. La un atelier mic, asta înseamnă brațul fondatorului ridicând și coborând un ciocan greu pentru ore întregi. Un ciocan pneumatic de 40 kg-forță elimină efortul fizic, dar și standardizează lovitura, iar fiecare impact are aceeași presiune și unghi, deci forjarea iese uniformă. Pentru un meșter cu probleme de spate, este diferența dintre a continua meseria sau a o abandona.",
  },
  {
    question: "Cât de critic a fost suportul tehnic post-livrare pentru succesul atelierului?",
    answer:
      "Citat direct din testimonial: „Indiferent că am sunat la 2 dimineața sau la 9 dimineața, problemele s-au rezolvat.” Pentru un atelier cu un singur fondator-tehnician, blocajul unei mașini într-o zi cu comenzi în aer înseamnă pierderi imediate. Răspunsul rapid pe canal direct, nu prin call-center, este parte din pachetul nostru standard pentru clienții cu echipamente Uzinex.",
  },
];

const TESTIMONIAL_QUOTES = [
  "Folosim un singur om care poate să opereze 3-4 mașini. Înainte aveam 3-4 oameni ca să facem același lucru.",
  "Calitatea producției s-a îmbunătățit peste 50%, iar timpii s-au ușurat. Dacă tăiem odată, știm că e bine tăiat.",
  "Indiferent că am sunat la 2 dimineața sau la 9 dimineața, problemele s-au rezolvat. Suntem mulțumiți și vom mai colabora.",
];

const HERO_QUOTE = {
  text: "Cea mai așteptată piesă din atelier este acest ciocan de 40 kg-forță. Cu siguranță, ne va ajuta să nu ne mai rupem oasele.",
  source: "Jan Paul Elhor · fondator Fier-Forjat Limanu",
};

const FOUNDER_CALL_QUOTE = {
  text: "Sorin, avem de lucru la fel de mult ca înainte. Doar că acum stăm și o grămadă de timp degeaba, pentru că producem la viteza de 5-6 ori mai rapid.",
  source: "Jan Paul Elhor · telefon către Sorin Baciu, prima lună de producție",
};

export default function FierForjatLimanuPage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Studii de caz", url: "/studii-de-caz" },
    {
      name: "Fier-Forjat Limanu · atelier complet",
      url: `/studii-de-caz/${SLUG}`,
    },
  ]);

  const article = articleSchema({
    slug: SLUG,
    title:
      "Fier-Forjat Limanu · atelier complet de confecții metalice cu finanțare nerambursabilă",
    excerpt:
      "Cum un meșter în fier forjat din Limanu, Constanța, cu dureri cronice de spate, a construit un atelier semi-automat de 68.000 € cu Start-Up Nation. Rezultate: ×5-6 viteză, +50% calitate, 1 om operează 3-4 mașini.",
    category: "Studiu de caz · Auto & metalurgie",
    datePublished: "2023-09-01",
    image: HERO_IMG,
  });

  const video = videoSchema({
    name: "Testimonial Jan Paul Elhor · Fier-Forjat Limanu · atelier confecții metalice",
    description:
      "Testimonial real al lui Jan Paul Elhor, fondatorul atelierului Fier-Forjat Limanu din Constanța, despre experiența cu Uzinex: consultanță finanțare Start-Up Nation, livrare echipamente semi-automate, ×5-6 viteză producție, +50% calitate, eliminarea efortului fizic excesiv.",
    youtubeId: YT_ID,
    uploadDate: "2024-04-15T10:00:00Z",
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
                    Auto & metalurgie · fier forjat custom
                  </span>
                  <span>· Limanu, Constanța</span>
                  <span>· 2020 → 2023</span>
                </div>
                <h1
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-5"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Un meșter, durerile lui de spate<br />
                  <span className="font-light text-uzx-orange">
                    și un atelier care produce de 5–6 ori mai rapid.
                  </span>
                </h1>
                <p className="text-base lg:text-lg text-ink-600 leading-relaxed max-w-2xl">
                  Jan Paul Elhor face fier forjat artizanal de aproape toată
                  viața în Limanu, Constanța. Un accident pe acoperiș îi
                  lăsase dureri cronice de spate, iar utilajele lui erau în
                  mare parte construite manual sau cumpărate second-hand.
                  Întrebarea nu era „cum vând mai mult", ci „cum continui să
                  pot lucra". Soluția: un atelier semi-automat de 68.000 €
                  finanțat prin Start-Up Nation, cu consultanță de dosar
                  inclusă fără cost. Rezultatul: ×5-6 viteza pe ciclu și un
                  meșter care își poate proteja sănătatea.
                </p>

                <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-8 max-w-lg">
                  <HeroStat value="×5–6" label="Viteză producție · pe ciclu" />
                  <HeroStat value="+50%" label="Calitate · cordoane și debit" />
                  <HeroStat value="1→3-4" label="Mașini per operator" />
                </div>
              </div>

              <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:self-stretch">
                <VideoPlayer
                  youtubeId={YT_ID}
                  thumbnail={HERO_IMG}
                  title="Atelier Fier-Forjat Limanu · prezentare echipamente Uzinex"
                  duration="5:17"
                />
                <p className="text-[11px] mono uppercase tracking-widest text-ink-500 mt-3">
                  Interviu video în atelier · prezentare echipamente
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 1. CARTELĂ */}
        <Section number="01" eyebrow="Cartelă client · Fier-Forjat Limanu SRL">
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
        <Section number="02" eyebrow="Punctul de plecare · sănătatea meșterului">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Un atelier ține de brațul fondatorului. Dacă brațul cedează,
                atelierul cedează cu el.
              </h2>
              <div className="space-y-4 text-ink-600 text-base lg:text-[17px] leading-relaxed">
                <p>
                  Jan a căzut de pe un acoperiș cu ani în urmă. Accidentul i-a
                  lăsat dureri cronice de spate care se acutizau la fiecare zi
                  de muncă fizică intensă. La un atelier de fier forjat
                  manual, asta înseamnă fiecare zi.
                </p>
                <p>
                  Înainte de Uzinex, utilajele lui erau aproape toate
                  construite de el sau cumpărate second-hand: noi erau doar
                  aparatele de sudură. Restul, adică fierăstraul, ghilotina,
                  mașinile de îndoit și ciocanul, toate cereau efort fizic
                  direct, manual, repetitiv.
                </p>
                <p>
                  <strong className="text-ink-900">
                    Întrebarea nu era cum scalează afacerea, ci cum continuă
                    să poată lucra.
                  </strong>{" "}
                  Reclama de Facebook despre Start-Up Nation a venit la
                  momentul potrivit. Apelul a urmat în aceeași zi, conferința
                  video a doua zi.
                </p>
              </div>

              <blockquote className="border-l-2 mt-7 pl-5 py-2" style={{ borderColor: "#c83a17" }}>
                <p className="serif text-lg lg:text-xl text-ink-900 leading-snug italic">
                  „{HERO_QUOTE.text}"
                </p>
                <div className="text-[11px] mono uppercase tracking-widest text-ink-500 mt-3">
                  {HERO_QUOTE.source}
                </div>
              </blockquote>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <FierForjatDiagramFigure
                  number="Schema 1 · sarcina ergonomică operator"
                  diagram={<ErgonomicLoadDiagram />}
                  caption="Atelier manual: ≈800 kgf manipulate / oră, ≈7h efort fizic continuu / 8h schimb. Atelier semi-automat: sub 120 kgf / oră, ≈2h efort fizic. Diferența nu se vede pe bilanț, se vede în coloana operatorului."
                />
              </div>
            </div>
          </div>
        </Section>

        {/* 3. SOLUȚIA */}
        <Section number="03" eyebrow="Soluția · echipamente moderne pe finanțare nerambursabilă">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Un atelier complet de circa 68.000 €, ales nu pentru tonaj, ci
                pentru ergonomie și flux.
              </h2>

              <dl className="divide-y hairline border-y hairline">
                <SpecRow label="Fierăstrău mare metal" value="cu bandă · debit secțiuni mari" />
                <SpecRow label="Ghilotină combinată" value="taie tablă groasă + găurire pe pedaul · multifuncțională" />
                <SpecRow
                  label="Mașină îndoit la rece"
                  value="A150A · Spania · CNC · platbandă până la 2,20m · S-uri, C-uri, cercuri, răsuciri"
                />
                <SpecRow
                  label="Mașină de găurit"
                  value="avans automat · cutie schimbători viteze · tabele filetat · filetare automată"
                />
                <SpecRow label="Freză + CNC" value="prelucrări precise pe componente metalice" />
                <SpecRow label="Aparate sudură" value="MIG / MAG / TIG · acoperă întreaga gamă de aplicații" />
                <SpecRow label="Ciocan pneumatic" value="40 kg-forță · înlocuiește lovitura manuală" />
                <SpecRow label="Forjă" value="încălzire fier pentru forjare clasică" />
                <SpecRow label="Software proiectare" value="elemente metalice · forme custom în memorie" />
              </dl>

              <p className="text-[11px] text-ink-500 mt-5 leading-relaxed italic">
                Producătorii utilajelor majore sunt fabricanți industriali din
                Europa și Asia, integrați și calibrați de echipa Uzinex.
                Răspunderea contractuală pentru funcționare este integral a
                noastră, nu a producătorului upstream.
              </p>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-uzx-blue text-white p-6 lg:p-8" style={{ background: "#082545" }}>
                <div className="text-[10px] mono uppercase tracking-widest text-white/70 mb-3">
                  Diferențiator · consultanță finanțare gratuită
                </div>
                <h3
                  className="serif text-xl lg:text-2xl leading-tight mb-4"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Pe proiectele unde livrăm echipamentele, dosarul de finanțare
                  e inclus fără cost.
                </h3>
                <p className="text-sm text-white/85 leading-relaxed mb-5">
                  Pentru Jan, am pregătit dosarul Start-Up Nation împreună,
                  fără să luăm bani de consultanță. Politica e simplă: dacă
                  echipamentele vin de la noi, asistența pe finanțare vine la
                  pachet. Pentru meșterii și antreprenorii mici care nu și-ar
                  permite consultant separat, asta deschide accesul la fonduri
                  nerambursabile pe care altfel le-ar fi pierdut.
                </p>
                <Link
                  href="/finantare"
                  className="inline-flex items-center gap-2 text-xs text-white hover:text-uzx-orange underline-link group"
                >
                  Toate cele trei instrumente de finanțare
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </Section>

        {/* 4. SCHEMA FLUX */}
        <Section number="04" eyebrow="Fluxul atelierului · cinci stații semi-automatizate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Cinci stații, un singur operator, comenzi custom de la cap la coadă.
              </h2>
              <p>
                Atelierul Limanu nu este o linie de producție în serie. Este
                un flux artizanal cu 5 stații tehnologice unde aceeași
                comandă, fie poartă custom, balustradă pentru o vilă sau
                replică istorică pentru o biserică, trece de la oțel brut la
                produs finit fără să schimbe atelierul.
              </p>
              <p>
                Avansul automat de pe mașina de găurit, comanda numerică de pe
                mașina de îndoit și ghilotina cu pedaul permit unui singur om
                să supravegheze 3-4 utilaje simultan. Ce era manual și consuma
                trei oameni, e acum un flux pe care îl gestionează Jan singur
                cu echipa lui de 2 oameni.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FierForjatDiagramFigure
                number="Schema 2 · flux atelier"
                diagram={<WorkshopFlowDiagram />}
                caption="Cinci stații tehnologice cu utilaje moderne. Un singur operator coordonează fluxul, unitatea de producție trece de la oțel brut la produs custom finit fără schimbare de incintă."
              />
            </div>
          </div>
        </Section>

        {/* 5. DE CE NOI */}
        <Section number="05" eyebrow="Cum am ajuns să livrăm noi · onest">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <ReasonCard
              num="A"
              title="Reclamă pe Facebook · apel direct și conferință video"
              body="Jan a văzut o reclamă pe Facebook despre fonduri Start-Up Nation. A sunat imediat, iar a doua zi am avut o conferință video. Conversația a început tehnic, fără filtre comerciale, sub presiunea reală a unui meșter cu durere cronică de spate care voia să-și păstreze meseria."
            />
            <ReasonCard
              num="B"
              title="Consultanță finanțare gratuită"
              body="Am pregătit împreună dosarul Start-Up Nation fără să luăm bani de consultanță. Politica noastră e standard: pe proiectele unde furnizăm echipamentele, asistența de finanțare e inclusă. Pentru clienți care nu și-ar permite consultant separat, asta înseamnă acces real la fondurile nerambursabile."
            />
            <ReasonCard
              num="C"
              title="Suport tehnic la 2 dimineața sau la 9 dimineața"
              body="Citat din testimonialul lui Jan: „Indiferent că am sunat la 2 dimineața sau la 9 dimineața, problemele s-au rezolvat.” La un atelier cu un singur fondator-tehnician, blocajul unei mașini într-o zi cu comenzi în aer înseamnă pierderi imediate. Răspunsul direct, fără call-center, e parte din pachetul standard."
            />
          </div>
        </Section>

        {/* 6. PRODUCTIVITATE */}
        <Section number="06" eyebrow="Salt productivitate · ×5–6 pe ciclu">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-5 text-ink-600 leading-relaxed">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                Aceleași comenzi, ×5–6 viteza pe ciclu de execuție.
              </h2>
              <p>
                Pentru o comandă tipică pe care un atelier manual o termină
                într-o zi de 8 ore prin debit, găurire, îndoire, sudură și
                finisare, atelierul semi-automat livrează 5-6 comenzi în
                același interval. Multiplier-ul nu vine dintr-o schimbare de
                calificare a echipei, ci din eliminarea ajustărilor, a
                remedierii și a etapelor manual repetitive.
              </p>
              <blockquote className="border-l-2 pl-5 py-2 my-5" style={{ borderColor: "#c83a17" }}>
                <p className="serif text-base lg:text-lg text-ink-900 leading-snug italic">
                  „{FOUNDER_CALL_QUOTE.text}"
                </p>
                <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mt-2">
                  {FOUNDER_CALL_QUOTE.source}
                </div>
              </blockquote>
              <p>
                Capacitatea suplimentară nu se traduce automat în comenzi
                noi, dar deschide spațiu pentru a accepta proiecte mai
                ambițioase, pentru a cere prețuri mai bune pe lucrări și
                pentru a trimite acasă o săptămână întreagă de stres pe care
                fluxul vechi nu o permitea.
              </p>
            </div>
            <div className="lg:col-span-7">
              <FierForjatDiagramFigure
                number="Schema 3 · productivitate manual vs. semi-auto"
                diagram={<ProductivityCompareDiagram />}
                caption="8 ore manual produc 1 unitate cu remedieri și 3-4 oameni. 8 ore semi-automatizate produc 5 unități cu 1 operator. Multiplier ×5-6 pe ciclu de execuție, calitate +50% pe debit și sudură."
              />
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
            Notă transparentă. Cifrele de viteză și calitate sunt confirmate
            de Jan în testimonialul video filmat la atelier. Detalii
            financiare suplimentare nu sunt publicate fără acord explicit.
          </p>
        </Section>

        {/* 9. SERVICE */}
        <Section number="09" eyebrow="Service post-livrare · linia operează in-house">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <h2
                className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                style={{ letterSpacing: "-0.02em" }}
              >
                O singură intervenție în garanție · garnitură de ulei la ciocanul pneumatic.
              </h2>
              <p className="text-ink-600 leading-relaxed mb-5">
                După punere în funcțiune, atelierul a operat fără probleme
                tehnice majore. Singura intervenție pe parcurs a fost o
                garnitură de ulei la ciocanul pneumatic, rezolvată rapid pe
                deplasare. Toate celelalte echipamente A150A, ghilotina,
                fierăstraul și mașina de găurit funcționează fără chemări în
                garanție.
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
                  value="1 minoră"
                  detail="Garnitură de ulei la ciocanul pneumatic, rezolvată rapid."
                />
                <ServiceRow
                  label="Defecte hardware majore"
                  value="0"
                  detail="Niciun defect mecanic sau electric raportat la celelalte 8 echipamente."
                />
                <ServiceRow
                  label="Abonament service"
                  value="Nu"
                  detail="Atelierul operează in-house, mentenanță făcută de Jan și echipa lui."
                />
                <ServiceRow
                  label="Echipa Uzinex implicată"
                  value="3 ingineri"
                  detail="Sorin Baciu pe consultanță finanțare, Cristian Munthiu pe fluxul tehnologic, Cosmin Florea pe punere în funcțiune."
                />
                <ServiceRow
                  label="Disponibilitate suport"
                  value="2:00–9:00"
                  detail="Suport telefonic direct, fără call-center, indiferent de oră."
                />
              </dl>
            </div>
          </div>
        </Section>

        {/* 10. BONUS · CLIENTUL DEVINE FURNIZOR */}
        <section className="border-b hairline py-14 lg:py-20" style={{ background: "#faf6f1" }}>
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] mb-4" style={{ color: "#c83a17" }}>
              10 / Bonus story · clientul devine furnizor
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <h2
                  className="serif text-2xl lg:text-4xl text-ink-900 leading-tight mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  De la client · la subcontractor pentru Uzinex.
                </h2>
                <div className="space-y-4 text-ink-600 leading-relaxed">
                  <p>
                    După ce atelierul a intrat în producție stabilă și
                    calitatea s-a confirmat la nivel real pe lucrări reale,
                    am înțeles că Jan poate produce pentru noi piese cu
                    cerință de calitate strictă. Astăzi, atelierul Limanu
                    execută pentru noi structurile metalice ale centralelor
                    fotovoltaice mobile pe care le livrăm către ARS
                    Industrial.
                  </p>
                  <p>
                    Pentru noi e o validare directă a investiției pe care am
                    făcut-o împreună: clientul devine furnizor de încredere
                    pentru un alt client mare. Pentru Jan, e diversificare de
                    venit cu un partener care îi cunoaște deja capacitățile
                    tehnice și ergonomice.
                  </p>
                </div>
                <Link
                  href="/studii-de-caz"
                  className="inline-flex items-center gap-2 text-sm text-uzx-blue hover:text-uzx-orange underline-link mt-6 group"
                >
                  Vezi și studiul de caz ARS · centrale fotovoltaice mobile
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
              </div>
              <aside
                className="lg:col-span-5 border hairline p-6 lg:p-8 bg-white"
                style={{ borderLeft: "2px solid #c83a17" }}
              >
                <div className="text-[10px] mono uppercase tracking-widest mb-3" style={{ color: "#c83a17" }}>
                  Cum arată parteneriatul azi
                </div>
                <ul className="space-y-3 text-sm text-ink-700">
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#c83a17" }}>,</span>
                    <span>
                      <strong className="text-ink-900">Producție atelier propriu:</strong>{" "}
                      porți, garduri, balustrade, replici istorice, comenzi
                      custom pentru clienți Constanța.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#c83a17" }}>,</span>
                    <span>
                      <strong className="text-ink-900">Subcontractor Uzinex:</strong>{" "}
                      structuri metalice pentru centralele fotovoltaice
                      mobile livrate către ARS Industrial.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0 mt-[2px]" style={{ color: "#c83a17" }}>,</span>
                    <span>
                      <strong className="text-ink-900">Relația continuă:</strong>{" "}
                      mentenanță, consumabile, suport tehnic la cerere.
                    </span>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* 11. TESTIMONIAL CITATE */}
        <Section number="11" eyebrow="Testimonial · fragmente din interviul video">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl">
            {TESTIMONIAL_QUOTES.map((q, i) => (
              <blockquote
                key={i}
                className="border-l-2 pl-5 py-2"
                style={{ borderColor: "#c83a17" }}
              >
                <p className="serif text-base lg:text-lg text-ink-900 leading-snug italic">
                  „{q}"
                </p>
              </blockquote>
            ))}
          </div>
          <p className="text-[11px] text-ink-500 mt-8 leading-relaxed italic max-w-3xl">
            Citate editate pentru claritate, păstrând sensul exact al
            declarațiilor lui Jan Paul Elhor. Interviul video integral este
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
                    livrarea unui atelier de meșteșugar.
                  </span>
                </h2>
                <p className="text-sm text-white/60 mt-5 leading-relaxed">
                  Trei observații care au schimbat felul în care propunem
                  ateliere mici cu un singur fondator-tehnician.
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
        <Section number="13" eyebrow="Întrebări frecvente · atelier de fier forjat">
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

        {/* 14. CALCULATOR */}
        <Section number="14" eyebrow="Tool interactiv · estimează atelierul tău">
          <WorkshopPaybackCalculator />
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
                  15 / Contact · vrei un atelier complet pentru afacerea ta?
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Echipamente, finanțare și<br />
                  <span className="font-light text-uzx-orange">
                    suport tehnic la 2 dimineața.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Dimensionăm împreună atelierul tău, te ghidăm pe dosarul de
                  finanțare nerambursabilă fără să luăm bani de consultanță,
                  livrăm echipamentele și rămânem alături la apel direct.
                  Așa am livrat la Limanu, așa livrăm și pentru tine.
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
                  href="/contact?subject=Atelier%20confec%C8%9Bii%20metalice%20%E2%80%94%20dimensionare%20%2B%20finan%C8%9Bare&context=Studiu%20de%20caz%20Fier-Forjat%20Limanu"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit dimensionare atelier + ghidaj finanțare
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
                <p className="text-[11px] text-white/60 mt-2 leading-relaxed">
                  Pentru meșteri și antreprenori mici care încă nu au aplicat
                  la fonduri, asistența pe dosar este inclusă fără cost
                  pentru clienții care comandă echipamentele de la noi.
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
