"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";

/* ─────── SVG tech animations ─────── */

const SHARED_CSS = `
@keyframes fg-rot { to { transform: rotate(360deg); } }
@keyframes fg-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes fg-dash { to { stroke-dashoffset: -20; } }
@keyframes fg-count { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes fg-grow { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
@keyframes fg-flow { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes fg-drop { 0% { transform: translateY(-10%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(120%); opacity: 0; } }
`;

/** Hero animation — EU flag with flowing capital streams into industrial coin */
function HeroAnim() {
  return (
    <svg className="w-full h-full" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet">
      <style>{SHARED_CSS}</style>
      {/* EU stars orbit */}
      <g style={{ transformOrigin: "80px 80px", animation: "fg-rot 20s linear infinite" }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x = 80 + Math.cos(a) * 42;
          const y = 80 + Math.sin(a) * 42;
          return (
            <polygon
              key={i}
              points={`${x},${y - 4} ${x + 1},${y - 1} ${x + 4},${y - 1} ${x + 1.5},${y + 1} ${x + 2.5},${y + 4} ${x},${y + 2} ${x - 2.5},${y + 4} ${x - 1.5},${y + 1} ${x - 4},${y - 1} ${x - 1},${y - 1}`}
              fill="#f5851f"
              style={{ animation: `fg-pulse 2s ease-in-out infinite ${i * 0.1}s` }}
            />
          );
        })}
      </g>
      <circle cx="80" cy="80" r="8" fill="#f5851f" />
      <text x="80" y="84" textAnchor="middle" fill="#082545" fontSize="10" fontFamily="monospace" fontWeight="bold">€</text>

      {/* Flow lines EU → industrial */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path
            d={`M 100 ${70 + i * 10} Q 160 ${70 + i * 10}, 220 ${100}`}
            fill="none"
            stroke="#f5851f"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            style={{ animation: `fg-dash 1.5s linear infinite ${i * 0.2}s` }}
          />
        </g>
      ))}

      {/* Industrial gear receiver */}
      <g style={{ transformOrigin: "240px 100px", animation: "fg-rot 10s linear infinite" }}>
        <circle cx="240" cy="100" r="26" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 240 + Math.cos(a) * 26;
          const y1 = 100 + Math.sin(a) * 26;
          const x2 = 240 + Math.cos(a) * 32;
          const y2 = 100 + Math.sin(a) * 32;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.8)" strokeWidth="3" />;
        })}
        <circle cx="240" cy="100" r="8" fill="#1e6bb8" />
      </g>

      {/* Bar chart rising */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={40 + i * 14}
          y={160 - (i + 1) * 10}
          width="10"
          height={(i + 1) * 10}
          fill="#f5851f"
          opacity="0.8"
          style={{ transformOrigin: `${45 + i * 14}px 160px`, animation: `fg-grow 2s ease-out infinite ${i * 0.2}s` }}
        />
      ))}
      <line x1="30" y1="160" x2="110" y2="160" stroke="rgba(255,255,255,0.4)" />

      {/* Telemetry tags */}
      <text x="40" y="175" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">
        VAL. INV. ↗
      </text>
      <text x="210" y="140" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">
        CAPACITATE PRODUCTIVĂ
      </text>
      <text x="105" y="60" fill="#f5851f" fontSize="7" fontFamily="monospace">
        NERAMBURSABIL
      </text>
    </svg>
  );
}

/** EU programs section banner animation — network topology */
function NetworkAnim() {
  const nodes = [
    { x: 40, y: 40, label: "UE" },
    { x: 120, y: 20, label: "HZE" },
    { x: 200, y: 40, label: "DGT" },
    { x: 280, y: 20, label: "ERS" },
    { x: 160, y: 80, label: "RO" },
    { x: 80, y: 100, label: "IMM" },
    { x: 240, y: 100, label: "R&D" },
  ];
  const edges: [number, number][] = [
    [0, 4], [1, 4], [2, 4], [3, 4], [4, 5], [4, 6], [0, 1], [2, 3],
  ];
  return (
    <svg className="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet">
      <style>{SHARED_CSS}</style>
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="#f5851f"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.6"
          style={{ animation: `fg-dash 1.5s linear infinite ${i * 0.15}s` }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="10" fill="rgba(30,107,184,0.15)" stroke="#1e6bb8" />
          <circle cx={n.x} cy={n.y} r="4" fill="#f5851f" style={{ animation: `fg-pulse 2s ease-in-out infinite ${i * 0.2}s` }}/>
          <text x={n.x} y={n.y + 22} textAnchor="middle" fill="#082545" fontSize="7" fontFamily="monospace" fontWeight="bold">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

/** Government programs section banner animation — budget distribution */
function BudgetAnim() {
  const bars = [
    { label: "IND. PREL.", v: 90, color: "#c05621" },
    { label: "PoCIDIF", v: 35, color: "#2b6cb0" },
    { label: "FM — ENERGIE", v: 62, color: "#2f855a" },
    { label: "POR", v: 28, color: "#4a90e2" },
    { label: "PoTJ", v: 50, color: "#c05621" },
    { label: "E-MOBILITY", v: 40, color: "#4a90e2" },
  ];
  return (
    <svg className="w-full h-full" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid meet">
      <style>{SHARED_CSS}</style>
      {/* Baseline */}
      <line x1="20" y1="95" x2="300" y2="95" stroke="#082545" strokeWidth="1" opacity="0.3"/>
      {/* Grid */}
      {[20, 40, 60, 80].map((y, i) => (
        <line key={i} x1="20" y1={95 - y} x2="300" y2={95 - y} stroke="#082545" strokeWidth="0.4" strokeDasharray="2 3" opacity="0.15"/>
      ))}
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={30 + i * 45}
            y={95 - b.v}
            width="30"
            height={b.v}
            fill={b.color}
            opacity="0.85"
            style={{ transformOrigin: `${45 + i * 45}px 95px`, animation: `fg-grow 2s ease-out infinite ${i * 0.2}s` }}
          />
          <text x={45 + i * 45} y="108" textAnchor="middle" fill="#082545" fontSize="6" fontFamily="monospace" fontWeight="bold">{b.label}</text>
        </g>
      ))}
      <text x="20" y="15" fill="#082545" fontSize="8" fontFamily="monospace" opacity="0.6">BUGET ALOCAT (mil. EUR)</text>
      <text x="270" y="15" fill="#f5851f" fontSize="8" fontFamily="monospace" fontWeight="bold">2025–2029</text>
    </svg>
  );
}

/** Process section animation — funnel */
function FunnelAnim() {
  return (
    <svg className="w-full h-full" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
      <style>{SHARED_CSS}</style>
      {/* Funnel shape */}
      <polygon points="30,30 290,30 230,90 230,160 90,160 90,90" fill="none" stroke="#082545" strokeWidth="1.2" opacity="0.25"/>
      {/* Input items descending */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={60 + i * 50}
          cy={40}
          r="5"
          fill="#1e6bb8"
          style={{ animation: `fg-drop 2.4s ease-in infinite ${i * 0.3}s` }}
        />
      ))}
      {/* Stage labels */}
      <text x="160" y="45" textAnchor="middle" fill="#082545" fontSize="9" fontFamily="monospace" opacity="0.6">EVALUARE</text>
      <text x="160" y="88" textAnchor="middle" fill="#082545" fontSize="9" fontFamily="monospace" opacity="0.6">DOSAR TEHNIC</text>
      <text x="160" y="125" textAnchor="middle" fill="#082545" fontSize="9" fontFamily="monospace" opacity="0.6">APROBARE</text>
      {/* Output - approved contract */}
      <g style={{ animation: "fg-pulse 2s ease-in-out infinite" }}>
        <rect x="140" y="150" width="40" height="14" fill="#f5851f"/>
        <text x="160" y="161" textAnchor="middle" fill="#fff" fontSize="8" fontFamily="monospace" fontWeight="bold">SEMNAT ✓</text>
      </g>
    </svg>
  );
}

/* Mini CTA banner component */
function InlineCTA({ title, desc, action, href, accent = "#f5851f" }: { title: string; desc: string; action: string; href: string; accent?: string }) {
  return (
    <section className="py-10 lg:py-14 relative overflow-hidden" style={{ background: "#0b2c52" }}>
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container-x relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] mono mb-2" style={{ color: accent }}>
              <span className="w-6 h-px" style={{ background: accent }} />
              Next step
            </div>
            <h3 className="serif text-xl lg:text-2xl text-white leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {title}
            </h3>
            <p className="text-sm text-ink-300 mt-2 max-w-2xl">{desc}</p>
          </div>
          <Link
            href={href}
            className="shrink-0 bg-white hover:bg-ink-100 text-ink-900 text-sm px-6 py-3.5 transition flex items-center gap-3 group font-medium self-start"
          >
            {action}
            <span className="group-hover:translate-x-1 transition">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   /finantare/europeana-guvernamentala — Pagină dedicată fondurilor europene
   și schemelor de ajutor de stat pentru achiziția de echipamente industriale.
   Datele sunt consolidate din surse publice oficiale (UEFISCDI, Ministerul
   Economiei, Ministerul Energiei, Comisia Europeană, InAfaceri, inafaceri.ro).
   Valorile sunt orientative — fiecare program are ghid propriu și linkuri
   către documentația oficială.
   ───────────────────────────────────────────────────────────────────── */

const HERO_STATS = [
  { value: "447M€", label: "Industria prelucrătoare", hint: "Schemă națională 2025–2029" },
  { value: "3M€", label: "Per proiect IT", hint: "PoCIDIF 2.1" },
  { value: "75%", label: "Intensitate max.", hint: "Regiunile defavorizate" },
  { value: "20M€", label: "Autoconsum energie", hint: "Fondul pentru Modernizare" },
];

type Program = {
  id: string;
  name: string;
  subtitle: string;
  budget: string;
  amount: string;
  intensity: string;
  beneficiary: string;
  description: string;
  eligible: string[];
  deadline: string;
  source: string;
  sourceUrl: string;
  accent: string;
};

const EU_PROGRAMS: Program[] = [
  {
    id: "horizon",
    name: "Horizon Europe — Cluster 5 (Energy & Mobility)",
    subtitle: "Cel mai mare program de cercetare & inovare al UE (2021–2027)",
    budget: "95,5 miliarde EUR total program",
    amount: "1 — 15 milioane EUR per proiect",
    intensity: "70% — 100% (funcție de tip proiect)",
    beneficiary: "Consorții internaționale (universități, companii, institute)",
    description:
      "Apeluri pentru digitalizare industrială, hidrogen verde, tehnologii manufacturing avansate, producție circulară și tranziție energetică. Necesită consorții cu minim 3 parteneri din state membre diferite. Uzinex a sprijinit consorții industriale pentru echipamente de producție eligibile.",
    eligible: [
      "Echipamente de producție & pilot lines",
      "Tehnologii manufacturing avansate (additive, robotics)",
      "Digital twins & MES industrial",
      "Echipamente pentru economie circulară",
      "Cercetare aplicată cu TRL 6+",
    ],
    deadline: "Apeluri lunare — verifică portalul Funding & Tenders",
    source: "Comisia Europeană — Funding & Tenders Portal",
    sourceUrl:
      "https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/opportunities/topic-details/HORIZON-CL5-2027-07-D3-16",
    accent: "#1e6bb8",
  },
  {
    id: "digital-europe",
    name: "Digital Europe Programme",
    subtitle: "Accelerarea transformării digitale — AI, cloud, cybersecurity, HPC",
    budget: "7,9 miliarde EUR (2021–2027)",
    amount: "500k — 20M EUR",
    intensity: "50% — 75% (IMM beneficiază de intensități mai mari)",
    beneficiary: "Companii, IMM-uri, hub-uri digitale, instituții publice",
    description:
      "Finanțează adoptarea tehnologiilor digitale avansate (AI, data analytics, cloud), centrele European Digital Innovation Hubs (EDIH) și digitalizarea IMM-urilor. PNCDI IV — SP 5.8.2 Digital Europe oferă co-finanțare națională pentru proiecte aprobate de Comisia Europeană.",
    eligible: [
      "Platforme AI & data spaces",
      "Echipamente HPC (high-performance computing)",
      "Soluții cybersecurity industrial",
      "Hub-uri de inovare digitală",
      "Digitalizarea liniilor de producție",
    ],
    deadline: "Depunere continuă la UEFISCDI (2025 Call)",
    source: "UEFISCDI — PNCDI IV, SP 5.8.2",
    sourceUrl: "https://uefiscdi-direct.ro/",
    accent: "#4a90e2",
  },
  {
    id: "eureka",
    name: "EUREKA — Eurostars",
    subtitle: "Cel mai mare program de finanțare pentru R&D internațional la IMM-uri",
    budget: "2 miliarde EUR (2021–2027)",
    amount: "250k — 2M EUR per proiect",
    intensity: "40% — 60% (granturi combinate RO + partener)",
    beneficiary: "IMM-uri inovatoare (cu co-aplicant din alt stat EUREKA)",
    description:
      "Proiecte bilaterale/multilaterale de cercetare aplicată cu TRL 6+, durată 36 luni, condus de un IMM. Uzinex acționează ca integrator tehnologic pentru componenta de echipamente, testare și scale-up industrial.",
    eligible: [
      "Prototipare echipamente noi",
      "Integrare tehnologii industriale",
      "Software embedded & IIoT",
      "Testare laborator + pilot industrial",
      "Servicii tehnice pentru validare",
    ],
    deadline: "Cut-off semestrial (martie, septembrie)",
    source: "UEFISCDI — EUREKA-EUROSTARS 2025",
    sourceUrl: "https://uefiscdi-direct.ro/",
    accent: "#2b6cb0",
  },
  {
    id: "erasmus",
    name: "Erasmus+ VET (Vocational Education & Training)",
    subtitle: "Mobilitate, acreditare și parteneriate de cooperare pentru formare profesională",
    budget: "26,2 miliarde EUR (2021–2027)",
    amount: "60k — 400k EUR per proiect",
    intensity: "80% — 100% (lump sum)",
    beneficiary: "Firme cu departament de formare, școli profesionale, ONG-uri educaționale",
    description:
      "Finanțează programe de training pe echipamente industriale moderne (CNC, cobots, viziune industrială), mobilități pentru operatori și ingineri, precum și parteneriate între angajatori și școli VET. Uzinex furnizează echipamente didactice și conținut tehnic pentru școli duale.",
    eligible: [
      "Echipamente pentru ateliere de training",
      "Cursuri cobots / CNC / viziune industrială",
      "Mobilități pentru operatori",
      "Dezvoltare curriculum dual",
      "Software de simulare & e-learning",
    ],
    deadline: "29 septembrie (acreditare anuală)",
    source: "Agenția Națională Erasmus+ România",
    sourceUrl: "https://www.erasmusplus.ro/",
    accent: "#c05621",
  },
  {
    id: "pnrr",
    name: "PNRR — Componenta C6 Energie & C9 Business",
    subtitle: "Planul Național de Redresare și Reziliență",
    budget: "29,2 miliarde EUR (2021–2026)",
    amount: "200k — 50M EUR funcție de măsură",
    intensity: "50% — 100% (diferă pe componentă)",
    beneficiary: "IMM-uri, companii mari, administrație publică, consorții industriale",
    description:
      "PNRR include măsuri pentru digitalizarea IMM-urilor, eficiență energetică, capacități de producție energie regenerabilă și infrastructură verde. Multe apeluri s-au încheiat, însă componentele C6 și C9 continuă până în 2026 cu calendare trimestriale.",
    eligible: [
      "Digitalizare IMM & echipamente smart",
      "Panouri fotovoltaice autoconsum",
      "Capacități producție componente verzi",
      "Pompe de căldură industriale",
      "Sisteme de stocare energie",
    ],
    deadline: "Apeluri trimestriale — termen final decembrie 2026",
    source: "Ministerul Investițiilor și Proiectelor Europene",
    sourceUrl: "https://mfe.gov.ro/pnrr/",
    accent: "#2f855a",
  },
];

const GOV_PROGRAMS: Program[] = [
  {
    id: "industria-prelucratoare",
    name: "Granturi Industria Prelucrătoare — HG 702/2024",
    subtitle: "Cea mai mare schemă de ajutor de stat pentru echipamente de producție (2025–2029)",
    budget: "447 milioane EUR",
    amount: "1M — 50M EUR per investiție",
    intensity: "30% — 75% (funcție de județ + dimensiune firmă)",
    beneficiary: "Companii din industria prelucrătoare, toate regiunile exceptând București",
    description:
      "Schema operată de Ministerul Economiei vizează reducerea deficitului comercial prin stimularea producției interne de bunuri prelucrate. Grila de punctaj favorizează investițiile verzi și digitale (Industry 4.0). Uzinex livrează echipamente eligibile — utilaje CNC, linii de producție, automatizări, sisteme IIoT.",
    eligible: [
      "Utilaje CNC, linii de producție, roboți industriali",
      "Automatizare & MES / SCADA",
      "Echipamente pentru trasabilitate & viziune industrială",
      "Sisteme eficiență energetică integrate",
      "Infrastructură IT industrială",
    ],
    deadline: "Acorduri de finanțare până la 31 decembrie 2026",
    source: "Ministerul Economiei — DGPE",
    sourceUrl: "https://economie.gov.ro/schema-de-ajutor-de-stat-privind-acordarea-de-granturi-pentru-investitii-destinate-industriei-prelucratoare/",
    accent: "#c05621",
  },
  {
    id: "pocidif-it",
    name: "PoCIDIF 2.1 — Dezvoltare produse IT prin inovare",
    subtitle: "Programul Operațional Creștere Inteligentă, Digitalizare și Instrumente Financiare",
    budget: "48,8 milioane EUR (ERDF + buget de stat)",
    amount: "200k — 3M EUR",
    intensity: "30% — 85% (funcție de regiune și tip firmă)",
    beneficiary: "IMM-uri și companii nou-înființate din sectorul ICT (CAEN 6201, 6202, 6203, 6209, 6311, 6312, 6399, 7490, 7112)",
    description:
      "Finanțează dezvoltarea de noi servicii, aplicații și produse prin cercetare-dezvoltare-inovare folosind tehnologii avansate (AI, big data, cybersecurity, edge computing). Eligibile pentru achiziția de servere, stații de lucru, echipamente de testare și software specializat.",
    eligible: [
      "Servere HPC & stații de lucru R&D",
      "Echipamente de testare & măsurare",
      "Licențe software specializat",
      "Consultanță tehnică pentru implementare",
      "Salarii echipă R&D (plafonat)",
    ],
    deadline: "Relansare II decembrie 2025 — ianuarie 2026",
    source: "Oportunități UE — PoCIDIF 2021–2027",
    sourceUrl: "https://inafaceri.ro/finantari/finantare-nerambursabila-pentru-firmele-de-it-intre-200-000-si-3-000-000-euro",
    accent: "#2b6cb0",
  },
  {
    id: "por-bucuresti",
    name: "Programul Regional București-Ilfov",
    subtitle: "POR BI 2021–2027 — sprijin pentru IMM-uri din capitală",
    budget: "~1,4 miliarde EUR (regiunea)",
    amount: "25k — 200k EUR",
    intensity: "60% — 85% (funcție de dimensiune firmă)",
    beneficiary: "Microîntreprinderi & IMM-uri cu sediul în București sau Ilfov",
    description:
      "Cofinanțare FEDR pentru investiții în echipamente productive, digitalizare și eficiență energetică la scară mică-medie. Schema are aplicabilitate restrânsă pentru regiunea București-Ilfov, cu intensități reduse față de regiunile mai puțin dezvoltate.",
    eligible: [
      "Utilaje & echipamente tehnologice noi",
      "Software ERP / CAD / CAM",
      "Modernizarea spațiilor de producție",
      "Sisteme eficiență energetică",
      "Echipamente pentru digitalizare",
    ],
    deadline: "Apeluri deschise periodic — consultă ADR BI",
    source: "ADR București-Ilfov",
    sourceUrl: "https://inafaceri.ro/finantari/programul-regional-bucuresti-ilfov-25-000-200-000-euro-0001",
    accent: "#4a90e2",
  },
  {
    id: "por-nord-est",
    name: "Programul Regional Nord-Est (RST) 2021–2027",
    subtitle: "Modernizarea microîntreprinderilor din regiunea Nord-Est",
    budget: "~1,6 miliarde EUR (regiunea)",
    amount: "100k — 300k EUR",
    intensity: "Până la 85% (ajutor regional)",
    beneficiary: "Microîntreprinderi din județele Bacău, Botoșani, Iași, Neamț, Suceava, Vaslui",
    description:
      "Sprijin pentru modernizare și creșterea capacității productive a microîntreprinderilor din cea mai puțin dezvoltată regiune din UE. Intensitate maximă — cea mai avantajoasă schemă pentru firmele din zonă.",
    eligible: [
      "Utilaje & echipamente noi",
      "Linii de producție automatizate",
      "Software & infrastructură IT",
      "Certificări calitate & brevetare",
      "Modernizare spații de producție",
    ],
    deadline: "Apeluri periodice — consultă ADR Nord-Est",
    source: "ADR Nord-Est",
    sourceUrl: "https://inafaceri.ro/finantari/programul-regional-nord-rst-2021-2027-100-000%E2%80%93si-300-000-euro-pentru-modernizarea-micro%C3%AEntreprinderilor",
    accent: "#2f855a",
  },
  {
    id: "potj",
    name: "PoTJ — Programul Tranziție Justă",
    subtitle: "Investiții în IMM-uri pentru creșterea durabilă (regiunile miniere & siderurgice)",
    budget: "~2,5 miliarde EUR",
    amount: "200k — 5M EUR",
    intensity: "50% — 75%",
    beneficiary: "IMM-uri din județele Gorj, Hunedoara, Mureș, Galați, Prahova, Dolj",
    description:
      "Finanțare dedicată pentru reconversia economică a regiunilor afectate de tranziția energetică. Priorități: crearea locurilor de muncă, diversificarea economiei locale, adoptarea tehnologiilor curate. Eligibile: echipamente industriale, linii noi de producție, automatizări.",
    eligible: [
      "Echipamente pentru industrii alternative minerit",
      "Linii de producție moderne",
      "Utilaje CNC & automatizări",
      "Sisteme eficiență energetică",
      "Formare profesională integrată",
    ],
    deadline: "Apeluri deschise — 2026",
    source: "Ministerul Investițiilor și Proiectelor Europene",
    sourceUrl: "https://inafaceri.ro/finantari/potj-200-000-5-000-000-euro-investitii-pt-dezvoltarea-imm-care-sprijina-cresterea-durabila-si-crearea-de-locuri-de-munca",
    accent: "#c05621",
  },
  {
    id: "pro-infra",
    name: "PRO-INFRA — Producție materii prime & produse",
    subtitle: "Schemă de ajutor pentru susținerea producției interne de materiale strategice",
    budget: "Buget multianual (HG dedicată)",
    amount: "1M — 50M EUR per investiție",
    intensity: "30% — 70% (funcție de regiune)",
    beneficiary: "Companii producătoare de materii prime, materiale și produse industriale",
    description:
      "Schemă operată de Ministerul Economiei pentru reducerea dependenței de importuri la materiale strategice. Eligibile: linii de producție, utilaje grele, echipamente de prelucrare primară și secundară, infrastructură industrială.",
    eligible: [
      "Utilaje grele & echipamente de producție",
      "Linii complete de prelucrare",
      "Automatizare & control calitate",
      "Infrastructură de energie industrială",
      "Sisteme de trasabilitate",
    ],
    deadline: "Acorduri până la 31 decembrie 2026",
    source: "Ministerul Economiei",
    sourceUrl: "https://inafaceri.ro/finantari/pro-infra-schema-de-ajutor-de-stat-privind-promovarea-productiei-de-materii-prime-materiale-si-produse-pentru-sustinerea",
    accent: "#b8430f",
  },
  {
    id: "fm-autoconsum",
    name: "Fondul pentru Modernizare — Panouri solare autoconsum",
    subtitle: "Capacități noi de producție energie regenerabilă pentru autoconsum industrial",
    budget: "310 milioane EUR (apelul 2025–2026)",
    amount: "Până la 20M EUR per întreprindere",
    intensity: "Până la 100% (schema de ajutor regional)",
    beneficiary: "Întreprinderi (IMM-uri, firme mari) cu consum energetic industrial",
    description:
      "Schema operată de Ministerul Energiei prin Fondul pentru Modernizare (venituri din EU ETS). Finanțează instalarea de parcuri fotovoltaice sub/peste 1 MW pentru autoconsum industrial, cu sau fără stocare. Plafon: 650k EUR/MW până la 1 MW și 550k EUR/MW peste 1 MW.",
    eligible: [
      "Panouri fotovoltaice pentru autoconsum",
      "Sisteme de stocare energie (BESS)",
      "Invertoare & infrastructură conectare",
      "SCADA & monitoring energetic",
      "Lucrări de racordare la rețea",
    ],
    deadline: "Apeluri deschise 2025–2026",
    source: "Ministerul Energiei",
    sourceUrl: "https://inafaceri.ro/finantari/fondul-pentru-modernizare-panouri-solare-pentru-autoconsum",
    accent: "#2f855a",
  },
  {
    id: "fm-agricultura",
    name: "Fondul pentru Modernizare — Energie verde agricultură",
    subtitle: "200M EUR pentru fermieri & procesatori alimentari (AFIR)",
    budget: "200 milioane EUR",
    amount: "Până la 20M EUR per proiect",
    intensity: "100% (ajutor nerambursabil)",
    beneficiary: "Fermieri, procesatori alimentari, cooperative agricole",
    description:
      "Apel AFIR 2026 pentru panouri solare și sisteme de stocare la baterii destinate exploatațiilor agricole și unităților de procesare. Finanțează capacități noi de producție energie electrică pentru autoconsum din surse solare.",
    eligible: [
      "Panouri fotovoltaice pentru ferme",
      "Baterii & sisteme stocare",
      "Pompe de căldură industriale",
      "Infrastructură racordare",
      "Monitoring & management energetic",
    ],
    deadline: "Apel 2026 — conform calendar AFIR",
    source: "AFIR — Agenția pentru Finanțarea Investițiilor Rurale",
    sourceUrl: "https://inafaceri.ro/finantari/fondul-pentru-modernizare-schema-de-ajutor-pentru-energie-verde-pentru-agricultura-romaneasca",
    accent: "#22543d",
  },
  {
    id: "emove",
    name: "E-MOVE RO — Mobilitate cu emisii zero",
    subtitle: "Infrastructură de sprijin pentru transport electric (HG dedicată)",
    budget: "Multianual — fonduri Fondul pentru Modernizare",
    amount: "500k — 20M EUR",
    intensity: "30% — 75%",
    beneficiary: "Operatori de transport, flote comerciale, municipalități",
    description:
      "Schemă de ajutor de stat pentru sprijinirea investițiilor în infrastructura de mobilitate cu emisii zero. Include stații rapide DC, depouri de încărcare pentru flote, infrastructură aferentă și integrare cu producția de energie verde.",
    eligible: [
      "Stații de încărcare rapide DC",
      "Depouri flote electrice",
      "Infrastructură smart grid",
      "Sisteme management flotă",
      "Stocare energie la puncte încărcare",
    ],
    deadline: "Apeluri deschise 2025–2026",
    source: "Ministerul Energiei",
    sourceUrl: "https://inafaceri.ro/finantari/e-move-ro-schema-de-ajutor-de-stat-privind-promovarea-infrastructurii-pentru-o-mobilitate-cu-emisii-zero-in-sprijinul",
    accent: "#2b6cb0",
  },
  {
    id: "emobility",
    name: "E-MOBILITY RO — Infrastructură reîncărcare",
    subtitle: "Dezvoltarea infrastructurii de reîncărcare pentru vehicule electrice",
    budget: "Multianual",
    amount: "100k — 5M EUR",
    intensity: "50% — 75%",
    beneficiary: "Companii private, parcuri industriale, centre comerciale, operatori logistică",
    description:
      "Finanțează instalarea de stații de reîncărcare publice și semi-publice în zone strategice: parcări comerciale, hub-uri logistice, benzinării, parcuri de afaceri. Poate fi combinată cu panouri fotovoltaice și stocare pentru infrastructură energetică integrată.",
    eligible: [
      "Stații AC & DC de încărcare",
      "Transformatoare și cabluri",
      "Sistem de plată & monitoring",
      "Panouri solare & stocare complementare",
      "Lucrări de racordare",
    ],
    deadline: "Apeluri deschise 2025–2026",
    source: "Ministerul Energiei",
    sourceUrl: "https://inafaceri.ro/finantari/e-mobility-ro-schema-de-ajutor-de-stat-privind-dezvoltarea-infrastructurii-de-reincarcare-a-vehiculelor-electrice-pe",
    accent: "#4a90e2",
  },
  {
    id: "vehicule-zero",
    name: "Vehicule cu emisii zero — Achiziție",
    subtitle: "Schemă ajutor stat pentru achiziția de vehicule electrice comerciale",
    budget: "Multianual",
    amount: "Per vehicul: 2,5k — 50k EUR",
    intensity: "30% — 50% din valoare achiziție",
    beneficiary: "IMM-uri, firme de logistică, operatori flote comerciale",
    description:
      "Sprijin pentru înlocuirea flotelor diesel/benzină cu vehicule electrice. Eligibile: autoutilitare electrice (N1), camioane medii (N2), autobuze electrice, vehicule speciale industriale. Poate fi cumulată cu E-MOBILITY RO pentru infrastructura de încărcare.",
    eligible: [
      "Autoutilitare electrice N1",
      "Camioane medii N2 electrice",
      "Autobuze & microbuze electrice",
      "Vehicule industriale speciale",
      "Scutere / motociclete electrice comerciale",
    ],
    deadline: "Sesiuni anuale AFM",
    source: "Administrația Fondului pentru Mediu",
    sourceUrl: "https://inafaceri.ro/finantari/schema-de-ajutor-de-stat-privind-sprijinirea-investitiilor-destinate-achizitiei-de-vehicule-cu-emisii-zero",
    accent: "#2f855a",
  },
];

/* Process steps */
const STEPS = [
  {
    num: "01",
    title: "Evaluare eligibilitate",
    desc: "Analizăm obiectul tău de activitate (CAEN), regiunea, dimensiunea firmei și intenția de investiție. Te ghidăm către programul cu cea mai mare intensitate pentru tine.",
  },
  {
    num: "02",
    title: "Specificații tehnice Uzinex",
    desc: "Inginerii noștri pregătesc fișele tehnice, proformele și studiul de fezabilitate pentru echipamentele eligibile. Furnizăm dovezi de conformitate și trasabilitate.",
  },
  {
    num: "03",
    title: "Dosar cu consultant acreditat",
    desc: "Colaborăm cu consultanți acreditați pentru redactarea cererii de finanțare. Uzinex contribuie cu partea tehnică, tu și consultantul cu partea financiară.",
  },
  {
    num: "04",
    title: "Livrare & audit",
    desc: "După semnarea contractului, livrăm echipamentul și asistăm la auditul tehnic al organismului de implementare. Facilităm raportarea tehnică pentru plățile intermediare.",
  },
];

const FAQ = [
  {
    q: "Uzinex redactează cererile de finanțare?",
    a: "Nu — Uzinex este integrator tehnic, nu consultant de fonduri. Colaborăm însă cu consultanți acreditați ANAP și pregătim partea tehnică a dosarului: specificații, proforme, fișe tehnice, studiu de fezabilitate și plan de implementare.",
  },
  {
    q: "Ce echipamente Uzinex sunt eligibile prin fonduri europene?",
    a: "Practic toate echipamentele din catalogul nostru pot fi încadrate într-un program adecvat: utilaje CNC, linii de producție, roboți industriali, panouri solare, stații de încărcare EV, echipamente pentru reciclare și inspecție. Contactează-ne pentru mapare exactă.",
  },
  {
    q: "Cât durează până la livrarea efectivă?",
    a: "Evaluarea eligibilității — 3–5 zile lucrătoare. Pregătirea dosarului tehnic — 2–4 săptămâni. Evaluarea organismului — 3–9 luni funcție de program. Livrarea post-contractare — 4–16 săptămâni funcție de complexitatea echipamentului.",
  },
  {
    q: "Pot combina mai multe fonduri?",
    a: "Da, în anumite condiții. De exemplu: un parc fotovoltaic pentru autoconsum poate fi cofinanțat simultan prin Fondul pentru Modernizare (energie verde) + PoCIDIF (componenta IT). Regula cheie: nu poți duble-finanța aceeași cheltuială, dar poți combina componente diferite ale aceleiași investiții.",
  },
  {
    q: "Ce pondere de investiție acoperim prin fonduri?",
    a: "Variază larg: 30% (București, firmă mare) până la 100% (microîntreprindere din regiune defavorizată, schemă verde). Majoritatea clienților noștri obțin între 50% și 70% nerambursabil pe investiție, restul fiind acoperit prin leasing sau credit punte.",
  },
  {
    q: "Uzinex oferă finanțare punte până la rambursare?",
    a: "Da, indirect — lucrăm cu partenerii noștri financiari (GRENKE, BT Leasing, BRD, UniCredit) pentru credite punte care acoperă gap-ul între plata către furnizor și rambursarea din fonduri. Vezi pagina /finantare/credite-leasing pentru detalii.",
  },
];

export default function EuropeanaGuvernamentalaClient() {
  return (
    <div className="min-h-screen bg-white text-ink-900">
      <Header solid />

      <main>
        {/* ───── HERO ───── */}
        <section className="border-b hairline relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-white/50 mb-6">
                <Link href="/" className="hover:text-uzx-orange transition">Acasă</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/80">Finanțare</span>
                <span className="text-white/30">/</span>
                <span className="text-uzx-orange">Europeană & guvernamentală</span>
              </nav>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 mono">
                    <span className="w-8 h-px bg-white/40" />
                    <span>Finanțare · Europeană & guvernamentală</span>
                  </div>
                  <h1
                    className="serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white mb-6"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Până la <span className="text-uzx-orange font-light">75%</span> nerambursabil<br />
                    pentru echipamentele tale<br />
                    <span className="text-uzx-orange font-light">industriale.</span>
                  </h1>
                  <p className="text-base lg:text-lg text-ink-200 max-w-2xl leading-relaxed">
                    Consolidăm dosarul tehnic pentru fonduri europene (Horizon, PNRR, POR, PoCIDIF) și scheme
                    guvernamentale (Industria Prelucrătoare, Fondul pentru Modernizare, E-MOBILITY RO). Uzinex
                    livrează echipamentele eligibile; partenerii consultanți acreditați redactează cererea.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <a
                      href="#programe"
                      className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
                    >
                      Vezi programele eligibile
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </a>
                    <a
                      href="#contact"
                      className="bg-white/10 hover:bg-white/20 text-white text-sm px-7 py-4 transition flex items-center gap-3 group font-medium border border-white/20"
                    >
                      Evaluare eligibilitate 48h
                    </a>
                    <a href="tel:+40769081081" className="text-sm text-white underline-link hover:text-ink-200">
                      +40 769 081 081
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="w-full aspect-[8/5] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                    <HeroAnim />
                  </div>
                </div>
              </div>

              {/* Hero stats — full width below */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-12 lg:mt-16 pt-10 border-t border-white/10">
                {HERO_STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    className="border-l-2 border-uzx-orange pl-4"
                  >
                    <div className="serif text-2xl lg:text-4xl text-white num" style={{ letterSpacing: "-0.02em" }}>
                      {s.value}
                    </div>
                    <div className="text-[10px] mono text-white/60 uppercase tracking-wider mt-1.5">{s.label}</div>
                    <div className="text-[10px] text-ink-300 mt-0.5">{s.hint}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── INTRO / HOW WE HELP ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Rolul Uzinex</div>
                <h2
                  className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Nu redactăm dosare.<br />
                  <span className="font-light text-uzx-orange">Furnizăm partea tehnică.</span>
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-5 text-ink-600 text-base leading-relaxed">
                <p>
                  Fondurile europene și schemele guvernamentale nu sunt un produs — sunt un proces cu 3 actori:
                  <strong className="text-ink-900"> beneficiarul</strong> (tu), <strong className="text-ink-900">consultantul acreditat</strong> (redactor de cerere)
                  și <strong className="text-ink-900">furnizorul echipamentului</strong> (Uzinex).
                </p>
                <p>
                  Uzinex acoperă strict componenta tehnică: specificații detaliate, proforme cu prețuri ferme,
                  studiu de fezabilitate cu justificare tehnico-economică, plan de implementare, dosar de conformitate
                  (CE, ISO, STANAG) și trasabilitatea furnizorilor. Această parte este cea mai des respinsă în evaluări —
                  o tratăm cu rigoare industrială.
                </p>
                <p>
                  Lucrăm cu 3 consultanți acreditați ANAP pentru redactarea cererilor. La cerere, facem intermedierea
                  și supervizăm integrarea dosarului tehnic-financiar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA after intro ───── */}
        <InlineCTA
          title="Nu știi de unde să începi? Începe cu un apel de 30 de minute."
          desc="Un inginer Uzinex analizează obiectul tău de activitate și îți sugerează programele cu cea mai mare intensitate. Fără documente, fără angajament."
          action="Programează apel"
          href="mailto:info@uzinex.ro?subject=Apel%20evaluare%20finantare"
        />

        {/* ───── EU PROGRAMS ───── */}
        <section id="programe" className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                    — Programe europene
                  </div>
                  <h2
                    className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Fonduri europene<br />
                    <span className="font-light text-uzx-orange">directe & prin autoritățile naționale.</span>
                  </h2>
                  <p className="text-sm text-ink-500 max-w-2xl">
                    Programe gestionate de Comisia Europeană (Horizon, Digital Europe, Erasmus+) sau cofinanțate la nivel
                    național (PoCIDIF, PNRR, POR). Intensitățile variază între 50% și 100% funcție de regiune și tipul proiectului.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="w-full aspect-[8/3] bg-white border hairline p-3">
                    <NetworkAnim />
                  </div>
                </div>
              </div>
              <ProgramsList programs={EU_PROGRAMS} />
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA between EU & GOV ───── */}
        <InlineCTA
          title="Ai echipament clar în minte? Trimite-ne specificațiile."
          desc="Îți pregătim proforma cu preț ferm + fișa tehnică detaliată + dovezile de conformitate necesare pentru dosarul de finanțare, în 5 zile lucrătoare."
          action="Trimite spec. tehnice"
          href="mailto:info@uzinex.ro?subject=Spec%20tehnice%20pentru%20dosar"
        />

        {/* ───── GOVERNMENT PROGRAMS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                    — Scheme guvernamentale
                  </div>
                  <h2
                    className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Ajutor de stat național<br />
                    <span className="font-light text-uzx-orange">pentru investiții industriale.</span>
                  </h2>
                  <p className="text-sm text-ink-500 max-w-2xl">
                    Scheme de ajutor gestionate de Ministerul Economiei, Ministerul Energiei, AFIR și AFM. Dedicate
                    firmelor stabilite în România, cu sediu productiv pe teritoriul național.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="w-full aspect-[8/3] bg-ink-50 border hairline p-3">
                    <BudgetAnim />
                  </div>
                </div>
              </div>
              <ProgramsList programs={GOV_PROGRAMS} />
            </div>
          </div>
        </section>

        {/* ───── INLINE CTA before process ───── */}
        <InlineCTA
          title="Lucrezi cu consultant propriu? Îl sprijinim cu fișele noastre."
          desc="Trimitem consultantului tău acreditat toată documentația tehnică necesară: proforme, specificații, certificate CE/ISO, studiu de fezabilitate — în formatul cerut de autoritatea de management."
          action="Trimite CUI consultant"
          href="mailto:info@uzinex.ro?subject=Colaborare%20consultant"
        />

        {/* ───── PROCESS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Proces</div>
                  <h2
                    className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    De la evaluare la livrare.<br />
                    <span className="font-light text-uzx-orange">4 pași, transparent.</span>
                  </h2>
                  <p className="text-sm text-ink-500 max-w-2xl">
                    Procesul standard din momentul primului apel până la instalarea echipamentului în hală.
                    Fără surprize de parcurs — fiecare etapă are livrabil clar.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="w-full aspect-[16/9] bg-white border hairline p-3">
                    <FunnelAnim />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border hairline">
                {STEPS.map((s) => (
                  <div key={s.num} className="bg-white p-7 lg:p-8 flex flex-col">
                    <div className="serif text-5xl text-uzx-orange num mb-6" style={{ letterSpacing: "-0.04em" }}>
                      {s.num}
                    </div>
                    <h3 className="serif text-xl text-ink-900 leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-4xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Întrebări frecvente</div>
              <h2
                className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-12"
                style={{ letterSpacing: "-0.03em" }}
              >
                Ce întreabă clienții<br />
                <span className="font-light text-uzx-orange">cel mai des.</span>
              </h2>
              <FaqList />
            </div>
          </div>
        </section>

        {/* ───── FINAL DARK CTA ───── */}
        <section id="contact" className="py-14 lg:py-20 text-white relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-4 mono">— Următorul pas</div>
              <h2
                className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                30 de minute cu un inginer Uzinex<br />
                <span className="font-light text-uzx-orange">+ evaluare eligibilitate gratuită.</span>
              </h2>
              <p className="text-ink-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Primim detaliile firmei tale (CAEN, cifra de afaceri, regiune, intenție de investiție) și îți
                trimitem în 48h o matrice cu programele în care ești eligibil, intensitatea estimată și echipamentele
                Uzinex care se potrivesc.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href="mailto:info@uzinex.ro?subject=Evaluare%20eligibilitate%20fonduri"
                  className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-7 py-4 transition font-medium inline-flex items-center gap-3 group"
                >
                  Trimite solicitare
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <a href="tel:+40212000000" className="text-sm underline-link hover:text-ink-200">
                  +40 21 200 00 00
                </a>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═════════════════════════════════════════════════════════════════════ */

function ProgramsList({ programs }: { programs: Program[] }) {
  return (
    <div className="space-y-6">
      {programs.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05, duration: 0.4 }}
          className="bg-white border hairline p-6 lg:p-8"
          style={{ borderLeftWidth: 3, borderLeftColor: p.accent }}
        >
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="min-w-0">
              <div className="serif text-xl lg:text-2xl text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                {p.name}
              </div>
              <div className="text-sm text-ink-500 mt-1">{p.subtitle}</div>
            </div>
            <span className="text-[10px] mono uppercase tracking-wider border hairline px-3 py-1 text-ink-600 shrink-0 hidden sm:inline-block">
              {p.budget}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 pb-6 border-b hairline">
            <div>
              <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">Buget total</div>
              <div className="serif text-base text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                {p.budget}
              </div>
            </div>
            <div>
              <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">Per proiect</div>
              <div className="serif text-base text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                {p.amount}
              </div>
            </div>
            <div>
              <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">Intensitate</div>
              <div className="serif text-base text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                {p.intensity}
              </div>
            </div>
            <div>
              <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">Beneficiari</div>
              <div className="text-xs text-ink-700 leading-tight mt-1">{p.beneficiary}</div>
            </div>
          </div>

          <p className="text-sm text-ink-600 leading-relaxed mb-5">{p.description}</p>

          <div className="mb-5">
            <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-2">Echipamente eligibile (Uzinex)</div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {p.eligible.map((e, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm text-ink-600">
                  <span className="shrink-0 mt-[6px] w-1.5 h-1.5" style={{ background: p.accent }} />
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t hairline">
            <div className="text-xs text-ink-500">
              <span className="mono uppercase tracking-wider text-ink-400">Termen:</span> {p.deadline}
            </div>
            <a
              href={p.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-700 hover:text-uzx-orange transition inline-flex items-center gap-2 group"
            >
              {p.source}
              <span className="group-hover:translate-x-0.5 transition">↗</span>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FaqList() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y hairline border-y hairline">
      {FAQ.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => setOpen(open === i ? null : i)}
          className="w-full text-left py-5 flex flex-col gap-2 group"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="serif text-lg lg:text-xl text-ink-900 leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {item.q}
            </div>
            <span
              className="text-uzx-orange text-xl shrink-0 transition-transform"
              style={{ transform: open === i ? "rotate(45deg)" : "none" }}
            >
              +
            </span>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="text-sm text-ink-600 leading-relaxed overflow-hidden"
              >
                {item.a}
              </motion.p>
            )}
          </AnimatePresence>
        </button>
      ))}
    </div>
  );
}

