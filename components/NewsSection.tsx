"use client";

import { motion } from "motion/react";

export type Author = {
  name: string;
  role?: string;
  avatar?: string;
};

export type Article = {
  slug: string;
  category: "Comunicat" | "Articol" | "Anunț" | "Studiu";
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  body?: string;
  authors?: Author[];
};

export type Highlight = {
  title: string;
  date: string;
  excerpt: string;
  href?: string;
  color?: string;
};

export type ChangelogEntry = {
  category: string;
  text: string;
  href?: string;
};

export type ChangelogData = {
  title: string;
  date: string;
  href: string;
  entries: ChangelogEntry[];
};

export type NewsData = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  heroVideoId?: string;
  articles: Article[];
  highlights?: Highlight[];
  changelog?: ChangelogData;
};

const ARTICLES: Article[] = [
  {
    slug: "uzinex-furnizor-acreditat-aparare",
    category: "Comunicat",
    date: "2026",
    title: "Uzinex devine furnizor acreditat pentru sectorul de apărare",
    excerpt:
      "Echipamentele din portofoliu sunt acum eligibile pentru proceduri guvernamentale clasificate și pentru contracte cu MApN și IGSU.",
    readTime: "3 min",
    body: "Uzinex anunță acreditarea oficială ca furnizor de echipamente industriale pentru sectorul de apărare al României. Începând cu luna aceasta, întregul portofoliu de utilaje, sisteme de prelucrare metalică, soluții de automatizare și piese de schimb este eligibil pentru proceduri guvernamentale clasificate.\n\nAcreditarea include capacitatea de a livra echipamente cu trasabilitate completă a originii, conformitate NATO unde este aplicabil, și garanția unui canal de service 100% local. Această capacitate poziționează Uzinex ca partener strategic pentru contracte cu Ministerul Apărării Naționale (MApN), Inspectoratul General pentru Situații de Urgență (IGSU), Romarm și alți operatori din domeniul apărării.\n\nClienții instituționali pot solicita ofertă tehnică direct prin contact@uzinex.ro sau prin platformele SEAP/SICAP.",
  },
  {
    slug: "achizitii-industriale-fonduri-europene",
    category: "Articol",
    date: "2026",
    title: "Cum optimizezi achizițiile industriale cu fonduri europene",
    excerpt:
      "Ghid practic pentru companii care vor să implementeze linii de producție prin PNRR, POCU sau POIM fără riscul dezangajării.",
    readTime: "7 min",
    body: "Finanțarea europeană pentru investiții industriale rămâne, în 2026, una dintre cele mai puternice pârghii pentru companiile românești care vor să-și moderneze capacitățile de producție. Totuși, multe proiecte se blochează în execuție din cauza unor decizii tehnice luate prea devreme — adesea înainte de a avea o dimensionare reală a echipamentelor și a furnizorilor.\n\nAcest ghid sintetizează cele mai frecvente capcane întâlnite în proiectele finanțate prin PNRR, POCU și POIM, precum și recomandările echipei Uzinex pentru a evita dezangajarea fondurilor.\n\n1. Specificațiile tehnice trebuie agreate cu un integrator înainte de depunerea cererii. O specificație generică poate fi imposibil de respectat la livrare, iar modificările contractuale ulterioare sunt deseori respinse de Autoritatea de Management.\n\n2. Furnizorii din afara UE necesită planificare suplimentară pentru transport, vamă și conformitate CE.\n\n3. Principiul DNSH (Do No Significant Harm) trebuie verificat pentru fiecare echipament încă din faza de ofertă.\n\n4. Trasabilitatea documentelor este critică la audit — păstrează versiuni cu semnătură digitală pentru toate ofertele și contractele.\n\nUzinex oferă consultanță pre-contractuală gratuită pentru companiile care pregătesc dosare cu finanțare europeană.",
  },
  {
    slug: "extindere-tehnopolis-iasi",
    category: "Anunț",
    date: "2026",
    title: "Extindere: punct de lucru nou în Parcul Tehnopolis Iași",
    excerpt:
      "Uzinex își deschide sediul central în Parcul Științific & Tehnologic Tehnopolis din Iași, cu laborator de training pentru clienți.",
    readTime: "2 min",
    body: "Uzinex își consolidează prezența în nord-estul țării prin deschiderea sediului central în Parcul Științific & Tehnologic Tehnopolis din Iași, Bd. Poitiers nr. 10. Noul spațiu include un laborator de training echipat cu mostre demonstrative din portofoliu, săli pentru workshop-uri tehnice și o zonă dedicată întâlnirilor cu clienți instituționali.\n\nLaboratorul va găzdui sesiuni regulate de training pentru operatori, precum și demonstrații live ale celor mai noi tehnologii de prelucrare metalică, automatizare și inspecție industrială. Toți clienții care au comandat echipamente prin Uzinex în ultimele 12 luni primesc acces gratuit la primul training tematic.",
  },
  {
    slug: "raport-automatizare-industrie-romaneasca",
    category: "Studiu",
    date: "2025",
    title: "Raport: starea automatizării în industria românească",
    excerpt:
      "Analiză a adopției roboticii industriale, blocajelor în finanțarea UE și direcțiilor de dezvoltare 2026-2028.",
    readTime: "12 min",
    body: "Raportul anual Uzinex pe automatizare industrială oferă o radiografie a adopției roboticii și sistemelor automate în companiile din România. Bazat pe date colectate din peste 200 de fabrici partenere, raportul identifică principalele tendințe, blocaje și oportunități pentru perioada 2026–2028.\n\nPrincipalele concluzii: densitatea roboților industriali per 10 000 de angajați rămâne sub media UE, dar ritmul de creștere este accelerat de fondurile PNRR. Sectoarele cu cea mai rapidă adopție sunt automotive, packaging și prelucrări metalice. Blocajele majore sunt legate de lipsa personalului calificat, complexitatea integrării și finanțarea capitalului de lucru.\n\nRaportul complet este disponibil la cerere pentru clienții Uzinex.",
  },
  {
    slug: "parteneriat-siemens-automatizare",
    category: "Anunț",
    date: "2025",
    title: "Parteneriat strategic cu Siemens pentru linii de automatizare",
    excerpt:
      "Uzinex devine partener oficial Siemens Digital Industries pentru integrarea liniilor de producție automatizate în România.",
    readTime: "4 min",
    body: "Parteneriatul oficial cu Siemens Digital Industries deschide accesul clienților Uzinex la întregul portofoliu Siemens de controlere logice programabile, drive-uri, motoare industriale și platforme de digitalizare TIA Portal și MindSphere.\n\nAcordul include training tehnic certificat pentru echipa de ingineri Uzinex, acces prioritar la componente critice și suport comun pentru proiecte mari de integrare. Primele livrări comune sunt așteptate în primul trimestru al anului viitor.",
  },
  {
    slug: "livrare-48h-vama-echipament",
    category: "Articol",
    date: "2025",
    title: "Cum am livrat în 48h un echipament blocat la vamă",
    excerpt:
      "Un client cu finanțare PNRR avea termenul de punere în funcțiune la limită. Iată cum am rezolvat criza logistică.",
    readTime: "6 min",
    body: "Povestea unei intervenții care a salvat un proiect de 1.2M EUR finanțat prin PNRR. Clientul, o fabrică de procesare a metalelor, avea termen contractual la 72 de ore pentru punerea în funcțiune a unei linii de tăiere laser. Echipamentul comandat de la un furnizor european s-a blocat în vamă din cauza unor documente incomplete.\n\nEchipa Uzinex a preluat dosarul, a refăcut declarațiile vamale, a coordonat transportul cu un partener local și a livrat echipamentul la destinație în 48 de ore. Instalarea și punerea în funcțiune au fost încheiate cu 6 ore înainte de termen.\n\nProiectul a trecut auditul tehnic al Autorității de Management fără observații, iar clientul și-a păstrat integral finanțarea.",
  },
  {
    slug: "kit-mentenanta-predictiva-cnc",
    category: "Comunicat",
    date: "2025",
    title: "Lansare: kit mentenanță predictivă pentru CNC-uri",
    excerpt:
      "Senzori IIoT, dashboard cloud și alerte automate pentru reducerea downtime-ului cu până la 40%.",
    readTime: "3 min",
    body: "Uzinex lansează un nou kit de mentenanță predictivă pentru centrele de prelucrare CNC — o soluție plug-and-play care combină senzori IIoT pentru vibrații, temperatură și consum energetic cu un dashboard cloud și alerte automate către echipa de mentenanță.\n\nKitul este compatibil cu majoritatea centrelor CNC din portofoliul Uzinex și poate fi retrofit-at pe echipamente existente. Primele implementări la clienții pilot au arătat o reducere a downtime-ului neplanificat de până la 40% și o extindere a intervalelor de service planificat cu 25%.\n\nKitul este disponibil la comandă prin canalele comerciale Uzinex.",
  },
  {
    slug: "expansiune-centru-service-cluj",
    category: "Anunț",
    date: "2025",
    title: "Expansiune: centru nou de service tehnic la Cluj-Napoca",
    excerpt:
      "Cel de-al treilea centru Uzinex acoperă acum întreaga zonă de vest și centru a României, cu intervenție sub 4h.",
    readTime: "2 min",
    body: "Uzinex își extinde acoperirea națională prin deschiderea celui de-al treilea centru de service tehnic, la Cluj-Napoca. Noul centru deservește clienții din Transilvania, Banat și Crișana, reducând timpul mediu de intervenție la fața locului la sub 4 ore.\n\nCentrul este echipat cu un atelier complet pentru reparații mecanice și electronice, un depozit de piese de schimb pentru cele mai comune echipamente din portofoliu și două unități mobile de intervenție.",
  },
  {
    slug: "ghid-achizitii-echipamente-aparare",
    category: "Articol",
    date: "2025",
    title: "Ghid: cum cumperi echipamente industriale prin SEAP pentru sectorul de apărare",
    excerpt:
      "De la specificații tehnice la criteriile de atribuire, ghid complet pentru autoritățile contractante din sectorul de apărare.",
    readTime: "9 min",
    body: "Achizițiile publice din sectorul de apărare au particularități tehnice și legislative care complică procesul pentru multe autorități contractante. Acest ghid sintetizează experiența echipei Uzinex după peste 40 de proceduri SEAP câștigate pentru MApN, IGSU și alte instituții din sector.\n\nAspecte esențiale: specificațiile tehnice trebuie să fie neutre față de producători, criteriile de atribuire să permită raportul calitate-preț, iar garanțiile post-livrare să includă obligatoriu accesul la piese de schimb pentru minim 10 ani.\n\nGhidul complet este disponibil la cerere pentru reprezentanți ai autorităților contractante.",
  },
  {
    slug: "studiu-caz-paletizare-robotizata",
    category: "Studiu",
    date: "2025",
    title: "Studiu de caz: ROI 14 luni pe o linie robotizată de paletizare",
    excerpt:
      "Analiză financiară completă a unui proiect de automatizare: investiție, economii operaționale și break-even.",
    readTime: "8 min",
    body: "Acest studiu de caz prezintă în detaliu rezultatele financiare ale unei linii robotizate de paletizare livrate în 2024 pentru un client din industria alimentară. Investiția totală, incluzând echipamentul, integrarea și training-ul, a fost de 320 000 EUR.\n\nEconomiile operaționale realizate în primul an au inclus: reducerea costurilor de personal cu 180 000 EUR, reducerea rebuturilor cu 45 000 EUR, și creșterea capacității cu 22% (fără investiții suplimentare). Break-even-ul a fost atins în luna 14, iar în anul doi linia a generat economii nete de peste 270 000 EUR.",
  },
];

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

const SORIN: Author = { name: "Sorin Baciu", role: "Founder, Uzinex" };
const ANDREI: Author = { name: "Andrei Popescu", role: "Director Tehnic" };
const MARIA: Author = { name: "Maria Ionescu", role: "Head of Engineering" };
const VLAD: Author = { name: "Vlad Marinescu", role: "Director Service" };
const ANA: Author = { name: "Ana Dumitrescu", role: "Consultant Fonduri UE" };

// attach authors to the default articles
ARTICLES[0].authors = [SORIN];
ARTICLES[1].authors = [ANA];
ARTICLES[2].authors = [SORIN, ANDREI];
ARTICLES[3].authors = [MARIA];
if (ARTICLES[4]) ARTICLES[4].authors = [SORIN];
if (ARTICLES[5]) ARTICLES[5].authors = [VLAD, ANDREI];
if (ARTICLES[6]) ARTICLES[6].authors = [MARIA];
if (ARTICLES[7]) ARTICLES[7].authors = [VLAD];
if (ARTICLES[8]) ARTICLES[8].authors = [ANA];
if (ARTICLES[9]) ARTICLES[9].authors = [ANDREI, MARIA];

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Intervenție service garantată sub 24h",
    date: "Martie 2026",
    excerpt:
      "Toate echipamentele în garanție beneficiază de intervenție fizică la sediul clientului în maxim 24 de ore de la semnalare.",
    color: "#1e6bb8",
  },
  {
    title: "Catalog extins cu 50+ modele noi CNC",
    date: "Februarie 2026",
    excerpt:
      "Am adăugat centre de prelucrare verticale, strunguri și mașini de tăiere laser fibră de la producători certificați EU.",
    color: "#0a4d96",
  },
  {
    title: "Sediu nou la Cluj-Napoca",
    date: "Ianuarie 2026",
    excerpt:
      "Al treilea centru de service acoperă acum Transilvania, Banat și Crișana cu intervenție sub 4h.",
    color: "#082545",
  },
  {
    title: "Consultanță gratuită fonduri PNRR",
    date: "Decembrie 2025",
    excerpt:
      "Sprijin pre-contractual pentru companii care pregătesc dosare de finanțare europeană — de la specificații la audit.",
    color: "#f5851f",
  },
  {
    title: "Partener oficial Siemens Digital Industries",
    date: "Noiembrie 2025",
    excerpt:
      "Acces prioritar la portofoliul Siemens pentru linii de automatizare și platforme TIA Portal / MindSphere.",
    color: "#6b3410",
  },
  {
    title: "Kit mentenanță predictivă pentru CNC",
    date: "Octombrie 2025",
    excerpt:
      "Senzori IIoT + dashboard cloud + alerte automate. Reducere downtime cu până la 40% în implementările pilot.",
    color: "#155290",
  },
];

const CHANGELOG: ChangelogData = {
  title: "Actualizări operaționale",
  date: "Aprilie 2026",
  href: "/noutati",
  entries: [
    {
      category: "Service",
      text: "Timpul mediu de intervenție la sediul clientului scade de la 4h la 3h pentru toată zona Transilvania, datorită deschiderii centrului de la Cluj.",
    },
    {
      category: "Catalog",
      text: "Extindere cu 12 modele de electrostivuitoare Li-Ion de la producători europeni cu certificare CE și eligibilitate pentru fonduri UE.",
    },
    {
      category: "Consultanță",
      text: "Toate cererile de ofertă pentru echipamente peste 100 000 EUR primesc acum consultanță gratuită pentru eligibilitate PNRR / POIM.",
    },
    {
      category: "Piese de schimb",
      text: "Stoc permanent pentru cele mai comune 500 de piese OEM la depozitul central Otopeni — livrare next-day în toată țara.",
    },
    {
      category: "Training",
      text: "Laborator nou de training operator CNC deschis în Tehnopolis Iași, cu sesiuni săptămânale gratuite pentru clienți.",
    },
  ],
};

export const NEWS_DEFAULT: NewsData = {
  eyebrow: "05 / Noutăți & comunicări",
  titleLine1: "Ultimele articole,",
  titleHighlight: "comunicate și studii.",
  description:
    "Perspectivă editorială asupra integrării industriale, finanțărilor europene și tendințelor din automatizare și apărare.",
  heroVideoId: "a-e4NhkxGGY",
  articles: ARTICLES,
  highlights: HIGHLIGHTS,
  changelog: CHANGELOG,
};

export function NewsSection({ data }: { data?: NewsData | null }) {
  const d = data ?? NEWS_DEFAULT;
  return (
    <section id="noutati" className="border-b hairline py-12 lg:py-14 bg-white">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">
              {d.eyebrow}
            </div>
            <h2
              className="serif text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              {d.titleLine1}<br />
              <span className="font-light text-uzx-orange">{d.titleHighlight}</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-500 text-base leading-relaxed">
              {d.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
          {d.articles.slice(0, 4).map((a, i) => (
            <motion.a
              key={a.slug || i}
              href={`/noutati/${a.slug}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white p-6 lg:p-8 hover:bg-ink-50 transition flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="text-[10px] uppercase tracking-widest mono text-white px-2.5 py-1"
                    style={{ background: CATEGORY_COLORS[a.category] }}
                  >
                    {a.category}
                  </div>
                  <div className="text-[11px] mono text-ink-400 num">{a.date}</div>
                </div>
                <div className="text-[11px] mono text-ink-400">{a.readTime}</div>
              </div>

              <h3 className="serif text-lg lg:text-xl text-ink-900 leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                {a.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-6">{a.excerpt}</p>

              <div className="mt-auto pt-5 border-t hairline flex items-center justify-between">
                <span className="text-xs text-ink-700 uppercase tracking-wider">Citește articolul</span>
                <span className="text-xl text-uzx-blue group-hover:translate-x-1 transition">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <a
            href="/noutati"
            className="group inline-flex items-center gap-3 text-sm text-ink-700 hover:text-uzx-blue transition"
          >
            <span className="w-12 h-px bg-ink-300 group-hover:bg-uzx-blue transition" />
            Vezi toate articolele
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
