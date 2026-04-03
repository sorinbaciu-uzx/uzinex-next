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
    id: "camma",
    client: "CAMMA Tehno Metal S.R.L.",
    industry: "Procesare & reciclare",
    location: "Transilvania, România",
    year: "2025",
    title: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România",
    excerpt:
      "CAMMA Tehno Metal a ales Uzinex pentru implementarea unei linii complete de producție pentru cea mai mare fabrică de cărămidă modulară din România. Proiectul a inclus dimensionare tehnică, livrare echipamente, instalare și training pentru operatori, finanțat prin fonduri europene.",
    equipment: ["Presă hidraulică", "Linie de uscare", "Sistem de paletizare", "Conveyor industrial"],
    metrics: [
      { label: "Capacitate", value: "+300%" },
      { label: "Status", value: "Operațional" },
      { label: "Finanțare", value: "Fonduri UE" },
    ],
    image: "/cases/camma-tehno-metal-linie-productie-caramida-modulara-uzinex.webp",
    alt: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România — CAMMA Tehno Metal",
    featured: true,
  },
  {
    id: "airone",
    client: "AIRONE",
    industry: "Producție & manufactură",
    location: "România",
    year: "2025",
    title: "Fabrică de echipamente HoReCa pentru cel mai important jucător din piața din România",
    excerpt:
      "AIRONE, liderul pieței românești de echipamente HoReCa, a colaborat cu Uzinex pentru dotarea fabricii de producție cu utilaje industriale de ultimă generație. Proiectul a inclus utilaje de prelucrare inox, presare, sudură și asamblare automatizată pentru fabricarea de echipamente profesionale de bucătărie.",
    equipment: [
      "Utilaje prelucrare inox",
      "Mașini de presare",
      "Sisteme sudură TIG/MIG",
      "Linie asamblare automatizată",
    ],
    metrics: [
      { label: "Poziție piață", value: "#1 RO" },
      { label: "Segment", value: "HoReCa" },
      { label: "Integrare", value: "Completă" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80&auto=format&fit=crop",
    alt: "Echipamente de producție Uzinex pentru AIRONE — lider piață HoReCa România",
    featured: true,
  },
  {
    id: "feg",
    client: "Future Energy Group S.R.L.",
    industry: "Energie & infrastructură",
    location: "Iași, România",
    year: "2026",
    title: "Instalație de sudură industrială pusă în funcțiune în 2 ore",
    excerpt:
      "Future Energy Group, producător român de echipamente energetice, avea nevoie urgentă de o instalație de sudură industrială pentru un proiect cu termen contractual strict. Inginerii Uzinex au livrat soluția completă și au efectuat commissioning-ul în doar 2 ore.",
    equipment: ["Aparat sudură industrială", "Sistem de protecție", "Set consumabile"],
    metrics: [
      { label: "Timp instalare", value: "2 ore" },
      { label: "Reducere downtime", value: "85%" },
      { label: "Conformitate", value: "100%" },
    ],
    image: "/cases/feg-instalatie-sudura-industriala-uzinex.webp",
    alt: "Instalație de sudură industrială Uzinex livrată Future Energy Group — pusă în funcțiune în 2 ore",
    featured: true,
  },
  {
    id: "geo-ex",
    client: "Geo-Ex Construct",
    industry: "Procesare & reciclare",
    location: "România",
    year: "2025",
    title: "Fabrică completă de procesare a pietrei pentru blaturi, chiuvete și monumente funerare",
    excerpt:
      "Geo-Ex Construct, specialist în prelucrarea pietrei naturale, a colaborat cu Uzinex pentru echiparea unei fabrici complete de procesare a pietrei. Portofoliul acoperă blaturi de bucătărie, chiuvete din piatră, monumente funerare și elemente arhitecturale personalizate.",
    equipment: [
      "Centru CNC prelucrare piatră",
      "Mașini de tăiere cu disc diamantat",
      "Sistem de lustruire automată",
      "Pod rulant pentru manipulare blocuri",
    ],
    metrics: [
      { label: "Specializare", value: "Piatră" },
      { label: "Capacitate", value: "Industrială" },
      { label: "Livrare", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80&auto=format&fit=crop",
    alt: "Fabrică completă de prelucrare a pietrei Uzinex pentru Geo-Ex Construct — blaturi, chiuvete, monumente",
  },
  {
    id: "geomar",
    client: "Geomar S.R.L.",
    industry: "Auto & metalurgie",
    location: "Pitești, România",
    year: "2025",
    title: "Fabrică de confecții metalice dotată integral cu echipamente Uzinex",
    excerpt:
      "Geomar S.R.L. din Pitești a ales Uzinex pentru dotarea completă a fabricii de confecții metalice. Proiectul a inclus utilaje de prelucrare metal, sudură, vopsire și asamblare, configurate pentru producție de serie și pentru comenzi personalizate.",
    equipment: [
      "Mașini de tăiere laser",
      "Sudură robotizată",
      "Ștanțe și abkant",
      "Cabină vopsire industrială",
    ],
    metrics: [
      { label: "Dotare", value: "Integrală" },
      { label: "Proces", value: "Automatizat" },
      { label: "Flexibilitate", value: "Ridicată" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    alt: "Fabrică de confecții metalice Geomar Pitești — dotare completă cu echipamente Uzinex",
  },
  {
    id: "goldpack",
    client: "Gold Pack S.R.L.",
    industry: "Procesare & reciclare",
    location: "Râmnicu Sărat, România",
    year: "2025",
    title: "Fabrică de ambalaje personalizate din carton cu linie de producție completă",
    excerpt:
      "Gold Pack S.R.L. din Râmnicu Sărat a implementat, prin Uzinex, o fabrică completă de ambalaje personalizate din carton. Linia acoperă tăiere, ștanțare, imprimare și asamblare, permițând producție flexibilă pentru clienți din diverse industrii.",
    equipment: [
      "Mașini de tăiere și ștanțare carton",
      "Sistem de imprimare flexo/offset",
      "Linie de asamblare cutii",
      "Paletizare automată",
    ],
    metrics: [
      { label: "Segment", value: "Ambalaje" },
      { label: "Material", value: "Carton" },
      { label: "Flexibilitate", value: "Custom" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Linie de producție ambalaje carton Uzinex pentru Gold Pack Râmnicu Sărat",
    featured: true,
  },
  {
    id: "victoria-unic",
    client: "Victoria Unic",
    industry: "Procesare & reciclare",
    location: "Huși, România",
    year: "2025",
    title: "Concasor pentru betoane în industria de reciclare",
    excerpt:
      "Victoria Unic din Huși operează în industria de reciclare a deșeurilor din construcții. Uzinex a furnizat un concasor industrial de betoane de mare capacitate, contribuind la transformarea deșeurilor în agregate reutilizabile pentru construcții noi — în linie cu principiile economiei circulare.",
    equipment: [
      "Concasor industrial pentru beton",
      "Sistem de sortare agregate",
      "Conveyor cu banda",
      "Sistem de reducere praf",
    ],
    metrics: [
      { label: "Aplicație", value: "Reciclare" },
      { label: "Impact", value: "DNSH ✓" },
      { label: "Capacitate", value: "Mare" },
    ],
    image:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1200&q=80&auto=format&fit=crop",
    alt: "Concasor industrial de betoane Uzinex pentru Victoria Unic Huși — reciclare deșeuri construcții",
  },
  {
    id: "alin-carp",
    client: "Întreprindere Individuală Alin Carp",
    industry: "Producție & manufactură",
    location: "Botoșani, România",
    year: "2025",
    title: "Secție de tricotaje completă într-o mică afacere de familie",
    excerpt:
      "Întreprinderea Individuală Alin Carp din județul Botoșani a fost dotată de Uzinex cu o secție de tricotaje completă. Proiectul demonstrează angajamentul nostru de a sprijini și afaceri mici, nu doar corporațiile, oferind soluții industriale accesibile pentru producători locali.",
    equipment: [
      "Mașini de tricotat industriale",
      "Sistem de pregătire fire",
      "Mașini de finisare",
      "Utilaje de control calitate",
    ],
    metrics: [
      { label: "Profil", value: "Afacere familie" },
      { label: "Dotare", value: "Completă" },
      { label: "Tip", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Secție de tricotaje completă Uzinex pentru Întreprindere Individuală Alin Carp Botoșani",
  },
  {
    id: "specat",
    client: "Specat S.R.L.",
    industry: "Procesare & reciclare",
    location: "Craiova, România",
    year: "2025",
    title: "Precurățător de cereale de mare capacitate pentru industria agro",
    excerpt:
      "Specat S.R.L. din Craiova a integrat în fluxul său de procesare un precurățător de cereale industrial livrat de Uzinex. Echipamentul îmbunătățește calitatea cerealelor înainte de procesare sau depozitare, reducând pierderile și crescând eficiența operațională.",
    equipment: [
      "Precurățător de cereale industrial",
      "Sistem de aspirație impurități",
      "Conveyor cu elevator",
      "Sistem de control automat",
    ],
    metrics: [
      { label: "Industrie", value: "Agro" },
      { label: "Funcție", value: "Precurățare" },
      { label: "Capacitate", value: "Mare" },
    ],
    image:
      "https://images.unsplash.com/photo-1595855759920-86582396756a?w=1200&q=80&auto=format&fit=crop",
    alt: "Precurățător de cereale industrial Uzinex pentru Specat Craiova",
  },
  {
    id: "magnius",
    client: "Magnius",
    industry: "Producție & manufactură",
    location: "Iași, România",
    year: "2025",
    title: "Aparat CNC de îndoit litere volumetrice pentru industria publicitară",
    excerpt:
      "Magnius, brand de referință în industria publicitară din Iași, a investit într-un aparat CNC specializat de îndoit litere volumetrice, furnizat de Uzinex. Echipamentul permite producția rapidă și precisă de litere 3D pentru firmele luminoase, signalistică și branding corporate.",
    equipment: [
      "Aparat CNC îndoit litere volumetrice",
      "Software CAD pentru design",
      "Accesorii pentru materiale diverse (aluminiu, inox, acrilic)",
    ],
    metrics: [
      { label: "Industrie", value: "Publicitate" },
      { label: "Tehnologie", value: "CNC 3D" },
      { label: "Precizie", value: "Mare" },
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80&auto=format&fit=crop",
    alt: "Aparat CNC de îndoit litere volumetrice Uzinex pentru Magnius Iași — industria publicitară",
  },
  {
    id: "fier-forjat-limanu",
    client: "Fier-Forjat Limanu S.R.L.",
    industry: "Auto & metalurgie",
    location: "Limanu, Constanța",
    year: "2025",
    title: "Fabrică completă de confecții metalice din fier forjat",
    excerpt:
      "Fier-Forjat Limanu S.R.L. din localitatea Limanu, județul Constanța, este specializată în confecții metalice artizanale și industriale din fier forjat. Uzinex a furnizat fabrica completă cu utilaje pentru forjare, prelucrare, îndoire și finisare, păstrând caracterul tradițional al meșteșugului combinat cu eficiența industrială.",
    equipment: [
      "Presă hidraulică de forjare",
      "Mașini de îndoit fier forjat",
      "Cuptoare industriale de încălzire",
      "Utilaje de finisare și vopsire",
    ],
    metrics: [
      { label: "Specializare", value: "Fier forjat" },
      { label: "Dotare", value: "Completă" },
      { label: "Profil", value: "Artizanal + Industrial" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    alt: "Fabrică completă de fier forjat Uzinex pentru Fier-Forjat Limanu Constanța",
  },
  {
    id: "birou-proiectare-iasi",
    client: "Birou de proiectare drumuri",
    industry: "Energie & infrastructură",
    location: "Iași, România",
    year: "2025",
    title: "Echipare completă pentru un birou de proiectare drumuri",
    excerpt:
      "Un birou specializat în proiectarea infrastructurii rutiere din Iași a fost echipat integral de Uzinex. Proiectul a inclus stații de lucru CAD performante, plottere de format mare, echipamente de măsurare topografică și infrastructură IT dedicată — totul pentru un mediu de proiectare modern și productiv.",
    equipment: [
      "Stații de lucru CAD profesionale",
      "Plottere A0 și scanere",
      "Echipamente de măsurare topo",
      "Infrastructură IT și rețea",
    ],
    metrics: [
      { label: "Tip proiect", value: "Birotică" },
      { label: "Domeniu", value: "Infrastructură" },
      { label: "Dotare", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Echipare completă birou proiectare drumuri Iași — Uzinex",
  },
  {
    id: "sablare-laser-ocnele-mari",
    client: "Atelier industrial Ocnele Mari",
    industry: "Producție & manufactură",
    location: "Ocnele Mari, Vâlcea",
    year: "2025",
    title: "Echipament de sablare cu laser pentru prelucrări de precizie",
    excerpt:
      "Un atelier industrial din Ocnele Mari, județul Vâlcea, a fost dotat de Uzinex cu un echipament modern de sablare cu laser. Tehnologia permite curățare, marcare și pregătire superficială non-abrazivă, fără chimicale, ideală pentru componente tehnice, piese auto vintage și aplicații muzeale.",
    equipment: [
      "Sistem de sablare cu laser",
      "Sistem de filtrare și ventilație",
      "Cabină de lucru închisă",
      "Software de control",
    ],
    metrics: [
      { label: "Tehnologie", value: "Laser" },
      { label: "Impact mediu", value: "Zero chimicale" },
      { label: "Aplicații", value: "Multiple" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&auto=format&fit=crop",
    alt: "Echipament sablare cu laser Uzinex pentru atelier industrial Ocnele Mari Vâlcea",
  },
  {
    id: "venus-mobila",
    client: "Fabrica de mobilă Venus",
    industry: "Logistică & depozitare",
    location: "Pitești, România",
    year: "2025",
    title: "Macara pentru manipulare plăci de PAL la o fabrică de mobilă",
    excerpt:
      "Fabrica de mobilă Venus din Pitești a implementat, cu ajutorul Uzinex, o macara industrială dedicată manipulării eficiente a plăcilor de PAL în procesul de producție. Echipamentul reduce timpul de încărcare/descărcare, elimină efortul fizic al operatorilor și crește siguranța la locul de muncă.",
    equipment: [
      "Macara industrială cu braț rotativ",
      "Sistem de prindere pentru plăci PAL",
      "Comandă electrică și manuală",
      "Sistem de siguranță CE",
    ],
    metrics: [
      { label: "Aplicație", value: "Manipulare PAL" },
      { label: "Siguranță", value: "CE certificat" },
      { label: "Productivitate", value: "Crescută" },
    ],
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop",
    alt: "Macara pentru manipulare PAL Uzinex la fabrica de mobilă Venus Pitești",
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
      {/* HERO — extends under the sticky header so the brand-blue bg flows behind it */}
      <section
        className="relative overflow-hidden border-b text-white -mt-[140px] pt-[140px]"
        style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 80% 50%, rgba(30,107,184,0.45) 0%, rgba(30,107,184,0.1) 50%, transparent 80%)",
          }}
        />
        <div className="container-x pt-16 lg:pt-20 pb-16 lg:pb-20 relative z-10">
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
                  Proiecte prezentate
                </div>
              </div>
              <div>
                <div className="serif text-3xl text-white num">6</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Industrii deservite
                </div>
              </div>
              <div>
                <div className="serif text-3xl text-white num">RO</div>
                <div className="text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Clienți din toată țara
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR — sticky, wrap instead of horizontal scroll */}
      <section className="sticky top-16 lg:top-20 z-30 border-b hairline bg-white/95 backdrop-blur">
        <div className="container-x py-4 lg:py-5">
          <div className="flex flex-wrap gap-x-5 gap-y-3 lg:gap-x-7">
            {INDUSTRIES.map((ind) => {
              const isActive = filter === ind;
              return (
                <button
                  key={ind}
                  onClick={() => setFilter(ind)}
                  className={`relative text-xs lg:text-sm tracking-wide transition inline-flex items-center gap-2 px-3 py-1.5 border ${
                    isActive
                      ? "border-uzx-orange text-uzx-orange bg-uzx-orange/5"
                      : "border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900"
                  }`}
                >
                  {ind}
                  <span
                    className={`text-[10px] mono num ${
                      isActive ? "text-uzx-orange" : "text-ink-400"
                    }`}
                  >
                    {counts[ind] || 0}
                  </span>
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
