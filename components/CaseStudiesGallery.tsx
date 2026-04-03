"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type Industry =
  | "Toate"
  | "Producție & manufactură"
  | "Logistică & depozitare"
  | "Energie & infrastructură"
  | "Procesare & reciclare"
  | "Auto & metalurgie"
  | "Apărare & securitate";

type CaseStudy = {
  id: string;
  client: string;
  industry: Exclude<Industry, "Toate">;
  location: string;
  year: string;
  title: string;
  excerpt: string;
  quote?: { text: string; author: string };
  equipment: string[];
  metrics?: { label: string; value: string }[];
  image: string;
  alt: string;
  featured?: boolean;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "feg",
    client: "Future Energy Group S.R.L.",
    industry: "Energie & infrastructură",
    location: "Iași, România",
    year: "2026",
    title: "Instalație de sudură industrială pusă în funcțiune în 2 ore",
    excerpt:
      "Future Energy Group, producător român de echipamente energetice, avea nevoie urgentă de o instalație de sudură industrială pentru un proiect cu termen contractual strict. Inginerii Uzinex au livrat soluția completă, au efectuat instalarea și commissioning-ul în doar 2 ore, salvând proiectul de la întârzieri.",
    quote: {
      text: "Echipa Uzinex a fost extraordinară — au livrat și pus în funcțiune instalația într-un timp record. Fără ei, am fi pierdut termenul de finanțare.",
      author: "Reprezentant FEG",
    },
    equipment: ["Aparat sudură industrială", "Sistem de protecție", "Set consumabile"],
    metrics: [
      { label: "Timp instalare", value: "2 ore" },
      { label: "Reducere downtime", value: "85%" },
      { label: "Conformitate UE", value: "100%" },
    ],
    image: "/cases/feg-instalatie-sudura-industriala-uzinex.webp",
    alt: "Instalație de sudură industrială Uzinex livrată Future Energy Group — pusă în funcțiune în 2 ore",
    featured: true,
  },
  {
    id: "camma",
    client: "CAMMA Tehno Metal S.R.L.",
    industry: "Procesare & reciclare",
    location: "Transilvania, România",
    year: "2025",
    title: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România",
    excerpt:
      "CAMMA Tehno Metal a ales Uzinex pentru implementarea unei linii complete de producție pentru cea mai mare fabrică de cărămidă modulară din România. Proiectul a inclus dimensionare tehnică, livrare echipamente, instalare și training pentru operatori, totul finanțat prin fonduri europene.",
    quote: {
      text: "O linie de producție impecabilă, livrată la cheie. Inginerii Uzinex au înțeles exact ce avem nevoie și au livrat la timp, în limita bugetului.",
      author: "Conducerea CAMMA",
    },
    equipment: ["Presă hidraulică", "Linie de uscare", "Sistem de paletizare", "Conveyor industrial"],
    metrics: [
      { label: "Capacitate producție", value: "+300%" },
      { label: "Eficiență energetică", value: "98%" },
      { label: "Termen finanțare", value: "Respectat" },
    ],
    image: "/cases/camma-tehno-metal-linie-productie-caramida-modulara-uzinex.webp",
    alt: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România — CAMMA Tehno Metal",
    featured: true,
  },
  {
    id: "metaltech",
    client: "MetalTech Industries",
    industry: "Auto & metalurgie",
    location: "Brașov, România",
    year: "2025",
    title: "Centru CNC vertical pentru două schimburi zilnic, fără defecțiuni",
    excerpt:
      "MetalTech Industries a investit într-un centru CNC vertical de înaltă precizie pentru linia de producție automotive. După 4 ani de operare în două schimburi zilnic, echipamentul nu a avut o singură defecțiune majoră, asigurând o continuitate operațională exemplară.",
    quote: {
      text: "4 ani de operare 16 ore pe zi fără o singură defecțiune. Investiția cea mai bună pe care am făcut-o.",
      author: "Bogdan Stan, Director Producție",
    },
    equipment: ["Centru CNC vertical 5 axe", "Sistem palletizare", "Software CAM"],
    metrics: [
      { label: "Uptime", value: "99.8%" },
      { label: "Ani de operare", value: "4+" },
      { label: "Defecțiuni majore", value: "0" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    alt: "Centru CNC vertical Uzinex pentru MetalTech Industries — operare 16 ore/zi fără defecțiuni",
  },
  {
    id: "logipark",
    client: "LogiPark România",
    industry: "Logistică & depozitare",
    location: "București · Cluj · Timișoara",
    year: "2025",
    title: "3 depozite echipate cu motostivuitoare și sisteme automatizate",
    excerpt:
      "LogiPark România, lider în servicii logistice, a echipat trei centre de distribuție majore cu o flotă completă de motostivuitoare electrice și diesel, sisteme de paletizare automatizată și soluții de stocare verticală. Service 24/7 inclus în contract.",
    quote: {
      text: "Service-ul Uzinex este disponibil 24/7. În 18 luni nu am avut o singură întrerupere logistică majoră.",
      author: "Daniela Marin, Procurement",
    },
    equipment: [
      "32 × Motostivuitoare electrice",
      "12 × Motostivuitoare diesel",
      "Linie automată paletizare",
      "Rafturi industriale VNA",
    ],
    metrics: [
      { label: "Centre echipate", value: "3" },
      { label: "Service SLA", value: "24/7" },
      { label: "Întreruperi", value: "0" },
    ],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&q=80&auto=format&fit=crop",
    alt: "Motostivuitoare Uzinex livrate către LogiPark România — flotă pentru 3 centre de distribuție",
  },
  {
    id: "auto-components",
    client: "Auto Components SRL",
    industry: "Producție & manufactură",
    location: "Pitești, România",
    year: "2026",
    title: "Linie robotizată de paletizare cu reducere costuri 38%",
    excerpt:
      "Auto Components SRL, furnizor pentru industria auto, a implementat o linie robotizată de paletizare cu 4 brațe robotice, integrate într-o celulă de producție automată. Implementarea Uzinex a fost livrată la cheie, iar costurile operaționale s-au redus cu 38% în primul an.",
    quote: {
      text: "Linia robotizată de paletizare ne-a redus costurile cu 38% în primul an. Implementarea a fost impecabilă.",
      author: "Andrei Popescu, Plant Manager",
    },
    equipment: [
      "4 × Brațe robotice 6 axe (200 kg payload)",
      "Sistem de viziune AI",
      "Conveyor inteligent",
      "Sistem SCADA",
    ],
    metrics: [
      { label: "Reducere costuri", value: "38%" },
      { label: "ROI", value: "14 luni" },
      { label: "Productivitate", value: "+220%" },
    ],
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80&auto=format&fit=crop",
    alt: "Linie robotizată de paletizare cu 4 brațe robotice Uzinex pentru Auto Components SRL",
    featured: true,
  },
  {
    id: "terra-energy",
    client: "Terra Energy",
    industry: "Energie & infrastructură",
    location: "Constanța, România",
    year: "2025",
    title: "Linie completă turnkey livrată cu 3 săptămâni înainte de deadline POIM",
    excerpt:
      "Pentru un contract POIM cu termen extrem de strict, Terra Energy avea nevoie de o linie completă într-un calendar imposibil. Inginerii Uzinex au propus o configurație alternativă, conformă cu cerințele de finanțare, și au livrat cu 3 săptămâni înainte de deadline.",
    quote: {
      text: "Uzinex a propus o configurație alternativă conformă cu finanțarea și a livrat cu 3 săptămâni înainte de termen.",
      author: "Laura Dumitrescu, CFO",
    },
    equipment: [
      "Generatoare industriale",
      "Tablouri electrice automatizate",
      "Sistem de monitorizare",
      "Echipamente de protecție",
    ],
    metrics: [
      { label: "Avans deadline", value: "3 săptămâni" },
      { label: "Conformitate POIM", value: "100%" },
      { label: "DNSH", value: "Validat" },
    ],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80&auto=format&fit=crop",
    alt: "Linie energetică turnkey Uzinex pentru Terra Energy — proiect POIM livrat înainte de termen",
  },
  {
    id: "biopack",
    client: "BioPack Solutions",
    industry: "Procesare & reciclare",
    location: "Oradea, România",
    year: "2025",
    title: "Linie de ambalare automată — capacitate triplată în 18 luni",
    excerpt:
      "BioPack Solutions, producător de ambalaje sustenabile, a investit într-o linie de ambalare complet automatizată livrată de Uzinex. Capacitatea fabricii s-a triplat în 18 luni, iar investiția a fost amortizată complet în acest interval.",
    quote: {
      text: "Linia de ambalare automată a triplat capacitatea fabricii. Investiție amortizată în 18 luni.",
      author: "Ana Petrescu, CEO",
    },
    equipment: [
      "Mașini de ambalare automată",
      "Etichetare și dozare",
      "Conveyor multi-nivel",
      "Sistem control calitate",
    ],
    metrics: [
      { label: "Creștere capacitate", value: "300%" },
      { label: "Amortizare", value: "18 luni" },
      { label: "Eficiență", value: "+85%" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Linie de ambalare automată Uzinex pentru BioPack Solutions — capacitate triplată",
  },
  {
    id: "weldmaster",
    client: "WeldMaster Industries",
    industry: "Auto & metalurgie",
    location: "Cluj-Napoca, România",
    year: "2025",
    title: "4 brațe robotice de sudură transformă linia de producție",
    excerpt:
      "WeldMaster Industries a integrat 4 brațe robotice de sudură furnizate de Uzinex în linia principală de producție. Transformarea a redus eroarea umană, a accelerat ciclurile și a generat ROI în doar 14 luni.",
    quote: {
      text: "Cele 4 brațe robotice de sudură au transformat complet linia noastră. ROI în 14 luni.",
      author: "Cristian Ionescu, Operations",
    },
    equipment: [
      "4 × Brațe robotice de sudură",
      "Tabel rotativ",
      "Sistem aspirație fum",
      "Software off-line programming",
    ],
    metrics: [
      { label: "ROI", value: "14 luni" },
      { label: "Reducere defecte", value: "92%" },
      { label: "Cicluri/oră", value: "+180%" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80&auto=format&fit=crop",
    alt: "Brațe robotice de sudură Uzinex pentru WeldMaster Industries — ROI în 14 luni",
  },
  {
    id: "datacenter-one",
    client: "DataCenter One",
    industry: "Energie & infrastructură",
    location: "București, România",
    year: "2025",
    title: "Generator industrial livrat și pus în funcțiune în 5 zile",
    excerpt:
      "În plin audit PNRR, DataCenter One avea nevoie urgent de un generator industrial care nu mai apăruse de la furnizorul anterior. Uzinex a livrat și pus în funcțiune echipamentul în 5 zile, salvând auditul de la observații.",
    quote: {
      text: "Uzinex l-a livrat și pus în funcțiune în 5 zile. Auditorii au plecat mulțumiți, dosarul a trecut fără observații.",
      author: "Sorin Vasile, Facility Manager",
    },
    equipment: ["Generator industrial 500 kVA", "Tablou ATS", "Sistem monitorizare la distanță"],
    metrics: [
      { label: "Timp livrare", value: "5 zile" },
      { label: "Audit PNRR", value: "Trecut" },
      { label: "Observații", value: "0" },
    ],
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80&auto=format&fit=crop",
    alt: "Generator industrial Uzinex livrat DataCenter One în 5 zile — audit PNRR salvat",
  },
  {
    id: "lasercut",
    client: "Laser Cut Pro",
    industry: "Producție & manufactură",
    location: "Sibiu, România",
    year: "2026",
    title: "Mașină de tăiere laser fibră livrată în 3 săptămâni",
    excerpt:
      "Laser Cut Pro a achiziționat o mașină de tăiere laser fibră de înaltă precizie pentru extinderea capacității de producție. Uzinex a livrat în 3 săptămâni, cu calitate excepțională a tăieturilor.",
    quote: {
      text: "Calitatea suprafețelor de tăiere este excepțională. Recomand cu încredere.",
      author: "Mihai Constantin, Director",
    },
    equipment: ["Mașină laser fibră 6 kW", "Sistem de încărcare automată", "Software CAD/CAM"],
    metrics: [
      { label: "Termen livrare", value: "3 săpt." },
      { label: "Precizie", value: "±0.05mm" },
      { label: "Capacitate", value: "+150%" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    alt: "Mașină de tăiere laser fibră Uzinex pentru Laser Cut Pro — livrată în 3 săptămâni",
  },
];

const INDUSTRIES: Industry[] = [
  "Toate",
  "Producție & manufactură",
  "Logistică & depozitare",
  "Energie & infrastructură",
  "Procesare & reciclare",
  "Auto & metalurgie",
  "Apărare & securitate",
];

export function CaseStudiesGallery() {
  const [filter, setFilter] = useState<Industry>("Toate");

  const filtered = useMemo(() => {
    if (filter === "Toate") return CASE_STUDIES;
    return CASE_STUDIES.filter((c) => c.industry === filter);
  }, [filter]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Toate: CASE_STUDIES.length };
    CASE_STUDIES.forEach((c) => {
      map[c.industry] = (map[c.industry] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <>
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b text-white"
        style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 80% 50%, rgba(30,107,184,0.45) 0%, rgba(30,107,184,0.1) 50%, transparent 80%)",
          }}
        />
        <div className="container-x pt-28 lg:pt-32 pb-16 lg:pb-20 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 mono">
              <span className="w-8 h-px bg-white/40" />
              <span>Portofoliu de proiecte · 2024 — prezent</span>
            </div>
            <h1
              className="serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.95] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Studii de caz<br />
              <span className="font-light text-uzx-orange">livrate pentru clienții noștri.</span>
            </h1>
            <p className="text-base lg:text-lg text-ink-200 leading-relaxed max-w-2xl">
              Proiecte reale, rezultate măsurabile, clienți mulțumiți. Descoperă cum integrăm
              tehnologie industrială la cheie pentru companii din producție, logistică, energie,
              procesare, auto și apărare — toate cu respectarea cerințelor europene de finanțare și
              conformitate.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-10 max-w-md">
              <div>
                <div className="serif text-3xl text-white num">{CASE_STUDIES.length}+</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Proiecte livrate
                </div>
              </div>
              <div>
                <div className="serif text-3xl text-white num">6</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Industrii deservite
                </div>
              </div>
              <div>
                <div className="serif text-3xl text-white num">100%</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Termen respectat
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR — sticky */}
      <section className="sticky top-16 lg:top-20 z-30 border-b hairline bg-white/95 backdrop-blur">
        <div className="container-x">
          <div className="flex gap-6 lg:gap-10 overflow-x-auto py-4 lg:py-5 -mb-px">
            {INDUSTRIES.map((ind) => {
              const isActive = filter === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`relative whitespace-nowrap text-xs lg:text-sm tracking-wide transition flex items-center gap-2 ${
                    isActive ? "text-uzx-orange" : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  {ind}
                  <span
                    className={`text-[10px] mono num ${
                      isActive ? "text-uzx-orange" : "text-ink-400"
                    }`}
                  >
                    ({counts[ind] || 0})
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="industry-underline"
                      className="absolute -bottom-4 lg:-bottom-5 left-0 right-0 h-0.5 bg-uzx-orange"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CASE GRID */}
      <section className="py-14 lg:py-20 bg-ink-50">
        <div className="container-x">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-ink-200 border hairline"
            >
              {filtered.map((c, i) => (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white flex flex-col group"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-100">
                    <Image
                      src={c.image}
                      alt={c.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,37,69,0) 50%, rgba(8,37,69,0.85) 100%)",
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <div className="text-[10px] mono uppercase tracking-widest text-white px-2.5 py-1 bg-uzx-orange">
                        {c.industry}
                      </div>
                    </div>
                    {c.featured && (
                      <div className="absolute top-4 right-4">
                        <div className="text-[10px] mono uppercase tracking-widest text-white px-2.5 py-1 border border-white/40 backdrop-blur">
                          ★ Featured
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-[11px] mono uppercase tracking-wider opacity-80">
                        {c.client}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 lg:p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[11px] mono text-ink-400 mb-4">
                      <span>{c.location}</span>
                      <span className="text-ink-300">·</span>
                      <span className="num">{c.year}</span>
                    </div>

                    <h3
                      className="serif text-xl lg:text-2xl text-ink-900 leading-tight mb-4"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {c.title}
                    </h3>

                    <p className="text-sm text-ink-600 leading-relaxed mb-6">{c.excerpt}</p>

                    {c.quote && (
                      <blockquote className="border-l-2 border-uzx-orange pl-4 my-4">
                        <p className="serif text-sm italic text-ink-700 leading-relaxed">
                          „{c.quote.text}"
                        </p>
                        <footer className="text-[11px] text-ink-500 mt-2 mono">
                          — {c.quote.author}
                        </footer>
                      </blockquote>
                    )}

                    {c.metrics && c.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-4 mb-6 py-4 border-y hairline">
                        {c.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="serif text-lg text-uzx-blue num">{m.value}</div>
                            <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mt-1">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-4">
                      <div className="text-[11px] mono text-ink-400 uppercase tracking-wider mb-2">
                        Echipamente
                      </div>
                      <ul className="text-xs text-ink-600 space-y-1">
                        {c.equipment.map((e) => (
                          <li key={e} className="flex gap-2">
                            <span className="text-ink-300 num">—</span>
                            <span>{e}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a
                      href="#"
                      className="mt-6 inline-flex items-center gap-2 text-sm text-uzx-blue hover:text-uzx-blue2 transition group/cta"
                    >
                      Citește studiul complet
                      <span className="group-hover/cta:translate-x-1 transition">→</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-ink-500">
              Nu există studii de caz în această categorie momentan.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b hairline py-16 lg:py-20 bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">
                Următorul proiect
              </div>
              <h2
                className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Construim împreună<br />
                <span className="font-light text-uzx-orange">povestea ta de succes.</span>
              </h2>
              <p className="text-ink-500 mt-6 max-w-xl">
                Indiferent de industrie, mărime sau complexitate, inginerii Uzinex sunt pregătiți
                să-ți proiecteze, livreze și pună în funcțiune soluția potrivită. Discută cu noi
                despre proiectul tău.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
              <a
                href="/#contact"
                className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center justify-center gap-3 group transition"
              >
                Discută cu un inginer
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
              <a
                href="tel:+40769081081"
                className="border hairline text-ink-700 hover:border-uzx-blue hover:text-uzx-blue text-sm px-7 py-4 inline-flex items-center justify-center transition"
              >
                (+40) 769 081 081
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
