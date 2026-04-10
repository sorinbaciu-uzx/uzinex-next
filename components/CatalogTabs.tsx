"use client";

import { useEffect, useRef, useState } from "react";
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
  {
    id: "t8",
    num: "08",
    tab: "Prelucrare lemn",
    title: "Mașini pentru\nprelucrarea lemnului",
    description:
      "Utilaje industriale pentru fabrici de mobilă, tâmplărie PVC și procesatori lemn. De la mașini de aplicat cant la fierăstraie și linii de finisare.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Mașini de aplicat cant", spec: "Automate & semi-auto", img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80&auto=format&fit=crop" },
      { name: "Mașini pentru uși", spec: "Linii complete producție", img: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=500&q=80&auto=format&fit=crop" },
      { name: "Fierăstraie pentru lemn", spec: "Panglică · circular · sector", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&q=80&auto=format&fit=crop" },
      { name: "Mașini de finisat lemn", spec: "Șlefuire · lăcuire · polishing", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t9",
    num: "09",
    tab: "Ambalare",
    title: "Echipamente\nde ambalare",
    description:
      "Soluții complete pentru fabrici de ambalaje și linii de producție cu produse finite: fabricare cutii carton, paletizare, sigilare, termocontractabilă și legare cu bandă.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Fabricare cutii carton", spec: "Flexo · offset · digital", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80&auto=format&fit=crop" },
      { name: "Ambalare paleți", spec: "Înfășurare stretch automată", img: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=500&q=80&auto=format&fit=crop" },
      { name: "Sigilare & formare cutii", spec: "Linii continue", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&q=80&auto=format&fit=crop" },
      { name: "Termocontractabilă", spec: "Tunele & mașini cu cameră", img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t10",
    num: "10",
    tab: "Etichetare & dozare",
    title: "Etichetare,\numplere & dozare",
    description:
      "Echipamente pentru linii de producție farma, food, cosmetică și industrială: mașini de etichetare, umplere și plafonare, dozare precisă și marcare automată.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Mașini de etichetare", spec: "Wrap-around · top · side", img: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=500&q=80&auto=format&fit=crop" },
      { name: "Umplere & plafonare", spec: "Lichide · vâscoase · pudre", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500&q=80&auto=format&fit=crop" },
      { name: "Mașini de dezmembrat", spec: "Linii dedicate", img: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500&q=80&auto=format&fit=crop" },
      { name: "Marcare industrială", spec: "Inkjet · laser · hot-stamp", img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t11",
    num: "11",
    tab: "Reciclare",
    title: "Echipamente\nde reciclare",
    description:
      "Soluții complete pentru economia circulară și operatori de deșeuri: balotare, presare, tocare, sortare, separare materiale — toate conforme DNSH și eligibile pentru finanțări europene.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Balotare & presare", spec: "Hârtie · carton · plastic · metal", img: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=500&q=80&auto=format&fit=crop" },
      { name: "Tocare & mărunțire", spec: "Shredder · granulatoare", img: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500&q=80&auto=format&fit=crop" },
      { name: "Echipamente separare", spec: "Magnetic · optic · densimetric", img: "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=500&q=80&auto=format&fit=crop" },
      { name: "Auxiliare reciclare", spec: "Conveyor · buncăre · alimentatoare", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&q=80&auto=format&fit=crop" },
    ],
  },
  {
    id: "t12",
    num: "12",
    tab: "Inspecție industrială",
    title: "Inspecție & mentenanță\npredictivă",
    description:
      "Sisteme pentru inspecția conductelor, canalizării, structurilor interne și control NDT: roboți CCTV, camere push și PTZ, videoscoape industriale, echipamente pentru testări nedistructive.",
    cta: "Vezi toate modelele",
    products: [
      { name: "Roboți CCTV conducte", spec: "Diametru 50 — 2000 mm", img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&q=80&auto=format&fit=crop" },
      { name: "Camere push", spec: "Inspecție canalizare & țevi", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80&auto=format&fit=crop" },
      { name: "Camere PTZ / periscop", spec: "Cămine & spații închise", img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500&q=80&auto=format&fit=crop" },
      { name: "Videoscoape industriale", spec: "Inspecții NDT certificate", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80&auto=format&fit=crop" },
    ],
  },
];

export function CatalogTabs() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const cat = CATEGORIES.find((c) => c.id === active)!;
  const activeIdx = CATEGORIES.findIndex((c) => c.id === active);

  const goTo = (dir: 1 | -1) => {
    const n = (activeIdx + dir + CATEGORIES.length) % CATEGORIES.length;
    setActive(CATEGORIES[n].id);
  };

  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <section id="catalog" className="border-b hairline py-10 lg:py-14">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-2">04 / Catalog tehnic</div>
            <h2 className="serif text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
              Categorii din<br />portofoliul nostru.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col items-start justify-end gap-3">
            <p className="text-ink-500 text-sm leading-relaxed">
              Sute de soluții organizate pe categorii tehnice, cu specificații complete, fișe tehnice descărcabile și
              consultanță inginerească pentru fiecare proiect.
            </p>
            <div className="inline-flex items-center gap-2 border border-uzx-blue/30 bg-uzx-blue/5 px-3 py-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-uzx-blue animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-uzx-blue font-medium mono">
                Toate echipamentele disponibile prin SEAP / SICAP
              </span>
            </div>
          </div>
        </div>

        {/* CATEGORY SELECTOR — arrows left, dropdown right */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          {/* LEFT: category counter + arrows below */}
          <div className="flex flex-col gap-3">
            <div className="hidden sm:flex items-center gap-3 text-[11px] mono uppercase tracking-[0.2em] text-ink-400">
              <span className="w-8 h-px bg-ink-300" />
              <span>
                Categoria {cat.num} <span className="text-ink-300">/</span> {String(CATEGORIES.length).padStart(2, "0")}
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(-1)}
                aria-label="Categoria anterioară"
                className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition text-sm"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                aria-label="Categoria următoare"
                className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition text-sm"
              >
                →
              </button>
            </div>
          </div>

          {/* RIGHT: dropdown selector (compact) */}
          <div ref={dropdownRef} className="relative flex-1 sm:flex-none sm:min-w-[280px] sm:max-w-[320px]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-uzx-orange mono mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange animate-pulse" />
              Selectează o categorie
            </div>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className="w-full flex items-center gap-2.5 px-3 py-2 border-2 border-uzx-orange bg-white hover:bg-uzx-orange/5 transition text-left group shadow-[0_2px_0_0_rgba(245,133,31,0.15)]"
            >
              <span className="serif text-base text-uzx-orange num shrink-0 mono">
                {cat.num}
              </span>
              <span className="w-px h-5 bg-ink-200 shrink-0" />
              <span className="flex-1 min-w-0">
                <span className="block text-[8px] uppercase tracking-widest text-ink-400 mono leading-tight">
                  Categorie activă
                </span>
                <span className="serif text-sm text-ink-900 block truncate leading-tight">
                  {cat.tab}
                </span>
              </span>
              <span
                className="flex items-center justify-center w-6 h-6 bg-uzx-orange text-white text-[10px] shrink-0 transition-transform group-hover:scale-110"
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "none" }}
              >
                ▾
              </span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  role="listbox"
                  className="absolute left-0 right-0 top-full mt-2 bg-white border hairline shadow-lg z-40 max-h-[70vh] overflow-y-auto"
                >
                  {CATEGORIES.map((c) => {
                    const isActive = c.id === active;
                    return (
                      <li key={c.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setActive(c.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition text-left ${
                            isActive
                              ? "text-uzx-orange bg-uzx-orange/5"
                              : "text-ink-700 hover:bg-ink-50"
                          }`}
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <span
                              className={`text-[10px] mono shrink-0 num ${
                                isActive ? "text-uzx-orange" : "text-ink-400"
                              }`}
                            >
                              {c.num}
                            </span>
                            <span className="truncate">{c.tab}</span>
                          </span>
                          {isActive && (
                            <span className="text-uzx-orange text-xs shrink-0">✓</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* PANEL */}
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ touchAction: "pan-y" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            {/* Big dark card */}
            <div className="text-white p-6 lg:p-7 relative overflow-hidden flex flex-col justify-between min-h-[340px]" style={{ background: "#082545" }}>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-uzx-orange mono">— Categorie {cat.num}</div>
                  <div className="inline-flex items-center gap-1.5 border border-white/25 px-2 py-0.5 text-[9px] uppercase tracking-wider mono text-white/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange" />
                    SEAP / SICAP
                  </div>
                </div>
                <h3 className="serif text-xl lg:text-2xl leading-tight whitespace-pre-line">{cat.title}</h3>
                <p className="text-ink-300 text-xs lg:text-sm leading-relaxed mt-4 max-w-xs">{cat.description}</p>
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
            <div className="lg:col-span-2 grid grid-cols-2 gap-3 lg:gap-4">
              {cat.products.map((p, i) => (
                <motion.a
                  key={`${cat.id}-${i}`}
                  href="#"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="group bg-ink-50 p-4 hover:bg-white hover:shadow-lg transition flex flex-col"
                >
                  <div className="text-xs lg:text-sm text-ink-700 leading-tight">{p.name}</div>
                  <div className="w-8 h-px bg-uzx-orange mt-1.5" />
                  <div className="flex-1 flex items-center justify-center my-3 relative h-20 lg:h-24">
                    <Image
                      src={p.img}
                      alt={p.name}
                      width={400}
                      height={96}
                      sizes="(max-width: 768px) 50vw, 20vw"
                      className="w-full h-20 lg:h-24 object-cover grayscale group-hover:grayscale-0 transition"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-[9px] mono text-ink-400 uppercase truncate">{p.spec}</div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
