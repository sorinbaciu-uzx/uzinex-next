"use client";

import { motion } from "motion/react";

export type Article = {
  slug: string;
  category: "Comunicat" | "Articol" | "Anunț" | "Studiu";
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  image?: string;
  body?: string;
};

export type NewsData = {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  articles: Article[];
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
];

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

export const NEWS_DEFAULT: NewsData = {
  eyebrow: "05 / Noutăți & comunicări",
  titleLine1: "Ultimele articole,",
  titleHighlight: "comunicate și studii.",
  description:
    "Perspectivă editorială asupra integrării industriale, finanțărilor europene și tendințelor din automatizare și apărare.",
  articles: ARTICLES,
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
