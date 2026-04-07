"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type Product = { name: string; spec: string; img: string };
type Category = {
  id: string;
  num: string;
  tab: string;
  title: string;
  description: string;
  cta: string;
  products: Product[];
};

const CATEGORIES: Category[] = [
  {
    id: "t1",
    num: "01",
    tab: "Intralogistică",
    title: "Intralogistică &\nmanipulare mărfuri",
    description:
      "Echipamente de transport, ridicare, tractare și depozitare pentru fluxuri industriale moderne și centre de distribuție.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Motostivuitoare diesel", spec: "3 — 16 tone · Heavy duty", img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80&auto=format&fit=crop" },
      { name: "Electrostivuitoare", spec: "Li-Ion · Zero emisii", img: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=500&q=80&auto=format&fit=crop" },
      { name: "Transpaleți electrici", spec: "1 — 3 tone · Compact", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80&auto=format&fit=crop" },
      { name: "Sisteme de rafturi", spec: "Heavy / VNA / Drive-in", img: "https://images.unsplash.com/photo-1586528116493-a029325540fa?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t2",
    num: "02",
    tab: "Laser & CNC",
    title: "Prelucrare laser\n& CNC de precizie",
    description:
      "Soluții de debitare laser, sudură de precizie și marcare industrială pentru linii de producție intensivă și ateliere mecanice.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Tăiere laser fibră", spec: "1.5 — 30 kW · IPG / nLight", img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&q=80&auto=format&fit=crop" },
      { name: "Centre CNC verticale", spec: "3 / 4 / 5 axe", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80&auto=format&fit=crop" },
      { name: "Strunguri CNC", spec: "Turnare & filetare", img: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=500&q=80&auto=format&fit=crop" },
      { name: "Mașini de sudură", spec: "MIG / TIG / Plasma", img: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t3",
    num: "03",
    tab: "Robotică & automatizare",
    title: "Robotică &\nautomatizare fluxuri",
    description:
      "Brațe robotice, celule de paletizare și linii automatizate care reduc costurile operaționale și eroarea umană.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Brațe robotice 6 axe", spec: "5 — 500 kg payload", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80&auto=format&fit=crop" },
      { name: "Celule de paletizare", spec: "Turnkey · până la 1500 cps/h", img: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=500&q=80&auto=format&fit=crop" },
      { name: "Cobots colaborativi", spec: "Sigur lângă operator", img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&q=80&auto=format&fit=crop" },
      { name: "Sisteme de viziune", spec: "AI · Defect detection", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t4",
    num: "04",
    tab: "Utilaje grele",
    title: "Utilaje grele &\ninfrastructură",
    description:
      "Soluții robuste pentru proiecte de infrastructură mare, energie, exploatări miniere și șantiere civile.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Excavatoare", spec: "5 — 90 tone", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=500&q=80&auto=format&fit=crop" },
      { name: "Macarale & ridicare", spec: "Fixe & mobile", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80&auto=format&fit=crop" },
      { name: "Echipamente energetice", spec: "Generatoare & turbine", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80&auto=format&fit=crop" },
      { name: "Cupe & atașamente", spec: "Hardox 500 / custom", img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t5",
    num: "05",
    tab: "Piese de schimb",
    title: "Piese de schimb\n& consumabile",
    description:
      "Identificăm și aducem rapid piesele de care ai nevoie pentru a minimiza timpii de staționare ai utilajelor.",
    cta: "Caută piese",
    products: [
      { name: "Piese OEM", spec: "Garanție producător", img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&q=80&auto=format&fit=crop" },
      { name: "Filtre & lubrifianți", spec: "Toate clasele ISO", img: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=500&q=80&auto=format&fit=crop" },
      { name: "Kituri uzură", spec: "Dinți, lame, bolțuri", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80&auto=format&fit=crop" },
      { name: "Componente hidraulice", spec: "Cilindri · pompe · valve", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t6",
    num: "06",
    tab: "Service tehnic",
    title: "Service tehnic\n& mentenanță",
    description:
      "Echipă de tehnicieni specializați, intervenții la fața locului și contracte de mentenanță preventivă cu SLA garantat.",
    cta: "Discută cu un inginer",
    products: [
      { name: "Punere în funcțiune", spec: "Instalare & training", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80&auto=format&fit=crop" },
      { name: "Mentenanță preventivă", spec: "Plan anual personalizat", img: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=500&q=80&auto=format&fit=crop" },
      { name: "Reparații în garanție", spec: "60 luni · Toate produsele", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80&auto=format&fit=crop" },
      { name: "Intervenție rapidă", spec: "Sub 24h · Național", img: "https://images.unsplash.com/photo-1574170609180-ec61b03f5d2c?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t7",
    num: "07",
    tab: "Apărare & Securitate",
    title: "Apărare &\nsecuritate",
    description:
      "Echipamente tehnologice pentru MApN, IGSU, instituții de forță și operatori privați de securitate. Conforme NATO STANAG și eligibile prin proceduri guvernamentale clasificate.",
    cta: "Solicită dosar tehnic",
    products: [
      { name: "Sisteme de supraveghere", spec: "Termoviziune · AI detection", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80&auto=format&fit=crop" },
      { name: "Generatoare autonome", spec: "Hibrid · silent · tactice", img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&q=80&auto=format&fit=crop" },
      { name: "Adăposturi modulare", spec: "Containere operaționale NATO", img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&q=80&auto=format&fit=crop" },
      { name: "Simulatoare training", spec: "VR · AR · scenarii tactice", img: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=500&q=80&auto=format&fit=crop" },
    ],
  },
];

export function CatalogTabs() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === active)!;

  return (
    <section id="catalog" className="border-b hairline py-16 lg:py-20">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">03 / Catalog tehnic</div>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
              Categorii din<br />portofoliul nostru.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col items-start justify-end gap-5">
            <p className="text-ink-500 text-base leading-relaxed">
              Sute de soluții organizate pe categorii tehnice, cu specificații complete, fișe tehnice descărcabile și
              consultanță inginerească pentru fiecare proiect.
            </p>
            <div className="inline-flex items-center gap-3 border border-uzx-blue/30 bg-uzx-blue/5 px-4 py-2.5">
              <div className="w-2 h-2 rounded-full bg-uzx-blue animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-uzx-blue font-medium mono">
                Toate echipamentele disponibile prin SEAP / SICAP
              </span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="border-b hairline mb-12">
          <div className="flex gap-10 overflow-x-auto -mb-px">
            {CATEGORIES.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`relative whitespace-nowrap pb-5 text-sm tracking-wide transition ${
                    isActive ? "text-uzx-orange" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {c.tab}
                  {isActive && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute left-0 right-0 -bottom-px h-0.5 bg-uzx-orange"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* PANEL */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Big dark card */}
            <div className="text-white p-8 lg:p-10 relative overflow-hidden flex flex-col justify-between min-h-[440px]" style={{ background: "#082545" }}>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mono">— Categorie {cat.num}</div>
                  <div className="inline-flex items-center gap-1.5 border border-white/25 px-2 py-1 text-[9px] uppercase tracking-wider mono text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange" />
                    SEAP / SICAP
                  </div>
                </div>
                <h3 className="serif text-2xl lg:text-3xl leading-tight whitespace-pre-line">{cat.title}</h3>
                <p className="text-ink-300 text-sm leading-relaxed mt-6 max-w-xs">{cat.description}</p>
              </div>
              <div
                className="absolute right-0 bottom-0 w-2/3 h-2/3 opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 50%, #1e6bb8 50%, #1e6bb8 55%, transparent 55%, transparent 60%, #1e6bb8 60%, #1e6bb8 65%, transparent 65%)",
                }}
              />
              <a href="#" className="relative inline-flex items-center gap-2 text-sm text-white hover:text-uzx-orange transition mt-8">
                {cat.cta} <span>→</span>
              </a>
            </div>

            {/* Product grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cat.products.map((p, i) => (
                <motion.a
                  key={`${cat.id}-${i}`}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="group bg-ink-50 p-6 hover:bg-white hover:shadow-lg transition flex flex-col"
                >
                  <div className="text-sm text-ink-700">{p.name}</div>
                  <div className="w-10 h-px bg-uzx-orange mt-2" />
                  <div className="flex-1 flex items-center justify-center my-6 relative h-32">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={500}
                      height={128}
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="w-full h-32 object-cover grayscale group-hover:grayscale-0 transition"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[10px] mono text-ink-400 uppercase">{p.spec}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
