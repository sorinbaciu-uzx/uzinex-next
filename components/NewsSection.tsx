"use client";

import { motion } from "motion/react";

type Article = {
  category: "Comunicat" | "Articol" | "Anunț" | "Studiu";
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
};

const ARTICLES: Article[] = [
  {
    category: "Comunicat",
    date: "2026",
    title: "Uzinex devine furnizor acreditat pentru sectorul de apărare",
    excerpt:
      "Echipamentele din portofoliu sunt acum eligibile pentru proceduri guvernamentale clasificate și pentru contracte cu MApN și IGSU.",
    readTime: "3 min",
  },
  {
    category: "Articol",
    date: "2026",
    title: "Cum optimizezi achizițiile industriale cu fonduri europene",
    excerpt:
      "Ghid practic pentru companii care vor să implementeze linii de producție prin PNRR, POCU sau POIM fără riscul dezangajării.",
    readTime: "7 min",
  },
  {
    category: "Anunț",
    date: "2026",
    title: "Extindere: punct de lucru nou în Parcul Tehnopolis Iași",
    excerpt:
      "Uzinex își deschide sediul central în Parcul Științific & Tehnologic Tehnopolis din Iași, cu laborator de training pentru clienți.",
    readTime: "2 min",
  },
  {
    category: "Studiu",
    date: "2025",
    title: "Raport: starea automatizării în industria românească",
    excerpt:
      "Analiză a adopției roboticii industriale, blocajelor în finanțarea UE și direcțiilor de dezvoltare 2026-2028.",
    readTime: "12 min",
  },
];

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

export function NewsSection() {
  return (
    <section id="noutati" className="border-b hairline py-16 lg:py-20 bg-white">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">
              05 / Noutăți & comunicări
            </div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Ultimele articole,<br />
              <span className="font-light text-uzx-orange">comunicate și studii.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-500 text-base leading-relaxed">
              Perspectivă editorială asupra integrării industriale, finanțărilor europene și tendințelor din
              automatizare și apărare.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
          {ARTICLES.map((a, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-white p-8 lg:p-10 hover:bg-ink-50 transition flex flex-col"
            >
              <div className="flex items-center justify-between mb-8">
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

              <h3 className="serif text-xl lg:text-2xl text-ink-900 leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                {a.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed mb-8">{a.excerpt}</p>

              <div className="mt-auto pt-6 border-t hairline flex items-center justify-between">
                <span className="text-xs text-ink-700 uppercase tracking-wider">Citește articolul</span>
                <span className="text-xl text-uzx-blue group-hover:translate-x-1 transition">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
