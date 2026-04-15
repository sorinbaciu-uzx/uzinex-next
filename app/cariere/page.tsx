"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   /cariere — pagină de recrutare Uzinex
   Focus: ingineri + specialiști digitalizare
   Design modern, animații SVG tehnice, 3 CTA-uri "Aplică"
   ───────────────────────────────────────────────────────────────────── */

const APPLY_HREF = "mailto:info@uzinex.ro?subject=Aplicatie%20Uzinex";

const HERO_STATS = [
  { v: "5", label: "Ingineri în echipă", hint: "În creștere · 7-8 până la final 2026" },
  { v: "15", label: "Ani experiență", hint: "Integrator industrial" },
  { v: "200+", label: "Proiecte livrate", hint: "B2B · B2G · apărare" },
  { v: "24h", label: "Timp răspuns aplicație", hint: "Screening inițial" },
];

const BENEFITS = [
  { icon: "01", title: "Proiecte cu impact real", desc: "Lucrezi la linii de producție, cobots, laser fiber, MES și stații fotovoltaice industriale. Nu la demo-uri — la instalații care funcționează 24/7." },
  { icon: "02", title: "Tehnologii premium", desc: "Siemens, Mitsubishi, ABB, Schneider, Fanuc, Yaskawa, IPG. Certificări producător plătite integral." },
  { icon: "03", title: "Mentorat + seniori", desc: "Fiecare junior e asociat cu un inginer senior 3-5 ani experiență. Nu te arunci în gol." },
  { icon: "04", title: "Parc științific Iași", desc: "Sediu în Tehnopolis — clădire modernă cu laborator propriu, parcare, cafeteria, spațiu de prototipare." },
  { icon: "05", title: "Pachet transparent", desc: "Salariu fix + bonus performanță + bonus proiect. Grila publică intern, fără negociere ascunsă." },
  { icon: "06", title: "Training & conferințe", desc: "Participare la Hannover Messe, Automatica, EMO, plus cursuri TÜV / Siemens / Fanuc anual." },
];

type Role = {
  title: string;
  level: "Junior" | "Mid" | "Senior" | "Toate nivelele";
  location: string;
  type: string;
  tags: string[];
};

const ENG_ROLES: Role[] = [
  {
    title: "Inginer proiectant CNC & laser + ofertare",
    level: "Mid",
    location: "Iași · hibrid 2 zile/săpt.",
    type: "Full-time",
    tags: ["SolidWorks", "G-code", "CAM", "Fanuc / Siemens", "Proforme"],
  },
  {
    title: "Inginer automatizări & PLC + ofertare",
    level: "Toate nivelele",
    location: "Iași · on-site",
    type: "Full-time",
    tags: ["Siemens TIA", "Beckhoff", "Ladder", "SCADA", "Proforme tehnice"],
  },
  {
    title: "Inginer robotică industrială + ofertare",
    level: "Senior",
    location: "Iași + deplasări",
    type: "Full-time",
    tags: ["Fanuc", "ABB RobotStudio", "Cobots UR", "Vision", "Costing"],
  },
  {
    title: "Inginer punere în funcțiune (commissioning)",
    level: "Mid",
    location: "Deplasări naționale · 60%",
    type: "Full-time",
    tags: ["CNC / laser", "Training operatori", "Raportare tehnică"],
  },
  {
    title: "Inginer mentenanță & service",
    level: "Junior",
    location: "Iași + deplasări",
    type: "Full-time",
    tags: ["Diagnoză hardware", "Hidraulică", "Pneumatică", "Intervenție 24h"],
  },
  {
    title: "Inginer vânzări tehnice B2B/B2G",
    level: "Mid",
    location: "București sau Iași",
    type: "Full-time",
    tags: ["Consultanță", "Proforme", "SEAP / SICAP", "CAEN"],
  },
];

const DIGI_ROLES: Role[] = [
  {
    title: "Specialist IIoT & edge computing",
    level: "Mid",
    location: "Iași · hibrid",
    type: "Full-time",
    tags: ["MQTT", "Node-RED", "Modbus", "OPC UA"],
  },
  {
    title: "Specialist MES & digitalizare producție",
    level: "Senior",
    location: "Iași + deplasări",
    type: "Full-time",
    tags: ["Ignition", "SQL", "KPI producție", "Industry 4.0"],
  },
  {
    title: "Data engineer industrial",
    level: "Mid",
    location: "Iași · hibrid",
    type: "Full-time",
    tags: ["Python", "PostgreSQL", "Grafana", "time-series"],
  },
  {
    title: "AI/ML engineer — vision industrial",
    level: "Senior",
    location: "Iași · hibrid",
    type: "Full-time",
    tags: ["OpenCV", "YOLO", "PyTorch", "Edge inference"],
  },
  {
    title: "Software engineer (full-stack)",
    level: "Mid",
    location: "Iași · hibrid 3 zile/săpt.",
    type: "Full-time",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
  },
  {
    title: "DevOps & cloud industrial",
    level: "Mid",
    location: "Remote RO",
    type: "Full-time",
    tags: ["Docker", "K8s", "Linux", "CI/CD"],
  },
];

const PROCESS = [
  { num: "01", title: "Aplicare", desc: "CV + 3 rânduri despre ce te pasionează. Fără scrisoare de intenție formală." },
  { num: "02", title: "Screening 24h", desc: "Echipa HR analizează aplicația și revine în maxim 24h lucrătoare cu răspuns." },
  { num: "03", title: "Interviu tehnic", desc: "45 min cu echipa ta viitoare. Discuție pe scenarii reale din proiecte, nu puzzle-uri." },
  { num: "04", title: "Ofertă & start", desc: "Pachet clar în 48h. Onboarding structurat 4 săptămâni cu buddy senior." },
];

/* ═══════════════════════════════════════════════════════════════════════
   SVG ANIMATIONS
   ═════════════════════════════════════════════════════════════════════ */

const CSS_ANIM = `
@keyframes car-rot { to { transform: rotate(360deg); } }
@keyframes car-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.2; } }
@keyframes car-dash { to { stroke-dashoffset: -24; } }
@keyframes car-count { 0%,100% { opacity: 0.25; } 50% { opacity: 1; } }
@keyframes car-drop { 0% { transform: translateY(-10%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(130%); opacity: 0; } }
@keyframes car-glow { 0%,100% { r: 4; opacity: 0.4; } 50% { r: 12; opacity: 0; } }
@keyframes car-slide { 0% { transform: translateX(-20%); } 100% { transform: translateX(120%); } }
@keyframes car-grow { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
@keyframes car-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0.15; } }
`;

function HeroAnim() {
  // Hiring beacon + network of skill nodes
  const skills = [
    { label: "CNC", x: 60, y: 50 },
    { label: "PLC", x: 120, y: 35 },
    { label: "ROBOT", x: 80, y: 110 },
    { label: "AI", x: 260, y: 50 },
    { label: "MES", x: 240, y: 120 },
    { label: "IIoT", x: 180, y: 90 },
    { label: "PYTHON", x: 290, y: 170 },
    { label: "CAD", x: 40, y: 150 },
    { label: "LASER", x: 140, y: 170 },
  ];
  const edges: [number, number][] = [
    [0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 6], [5, 7], [5, 8],
  ];
  return (
    <svg className="w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      {/* Grid backdrop */}
      <defs>
        <pattern id="carhero-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill="url(#carhero-grid)" />

      {/* Central hiring beacon */}
      <circle cx="180" cy="90" r="4" fill="#f5851f" style={{ animation: "car-glow 2s ease-in-out infinite" }} />
      <circle cx="180" cy="90" r="4" fill="#f5851f" style={{ animation: "car-glow 2s ease-in-out infinite 0.66s" }} />
      <circle cx="180" cy="90" r="4" fill="#f5851f" style={{ animation: "car-glow 2s ease-in-out infinite 1.33s" }} />
      <circle cx="180" cy="90" r="8" fill="#f5851f" />
      <circle cx="180" cy="90" r="3" fill="#fff" />

      {/* Connection edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={skills[a].x}
          y1={skills[a].y}
          x2={skills[b].x}
          y2={skills[b].y}
          stroke="#f5851f"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.7"
          style={{ animation: `car-dash 1.2s linear infinite ${i * 0.15}s` }}
        />
      ))}

      {/* Skill nodes */}
      {skills.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <circle cx={s.x} cy={s.y} r="3" fill="#f5851f" style={{ animation: `car-pulse 2s ease-in-out infinite ${i * 0.2}s` }} />
          <text x={s.x} y={s.y + 24} textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="7" fontFamily="monospace" fontWeight="bold">
            {s.label}
          </text>
        </g>
      ))}

      {/* HUD corners */}
      <g stroke="#f5851f" strokeWidth="1" fill="none">
        <path d="M 8 8 L 8 22 M 8 8 L 22 8" />
        <path d="M 312 8 L 312 22 M 312 8 L 298 8" />
        <path d="M 8 212 L 8 198 M 8 212 L 22 212" />
        <path d="M 312 212 L 312 198 M 312 212 L 298 212" />
      </g>
      <text x="12" y="18" fill="#f5851f" fontSize="7" fontFamily="monospace">● HIRING</text>
      <text x="268" y="18" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">UZX · 2026</text>
      <text x="12" y="206" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">SKILL-GRAPH</text>
      <text x="260" y="206" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">T+00:{new Date().getMinutes()}</text>
    </svg>
  );
}

function EngineerAnim() {
  // Rotating gear + blueprint lines + calipers
  return (
    <svg className="w-full h-full" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      {/* Main gear */}
      <g style={{ transformOrigin: "70px 70px", animation: "car-rot 14s linear infinite" }}>
        <circle cx="70" cy="70" r="32" fill="none" stroke="#082545" strokeWidth="1.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 70 + Math.cos(a) * 32;
          const y1 = 70 + Math.sin(a) * 32;
          const x2 = 70 + Math.cos(a) * 40;
          const y2 = 70 + Math.sin(a) * 40;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#082545" strokeWidth="4" />;
        })}
        <circle cx="70" cy="70" r="10" fill="none" stroke="#f5851f" strokeWidth="1.5" />
        <circle cx="70" cy="70" r="4" fill="#f5851f" />
      </g>

      {/* Small counter-gear */}
      <g style={{ transformOrigin: "130px 90px", animation: "car-rot 8s linear infinite reverse" }}>
        <circle cx="130" cy="90" r="16" fill="none" stroke="#082545" strokeWidth="1.2" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const x1 = 130 + Math.cos(a) * 16;
          const y1 = 90 + Math.sin(a) * 16;
          const x2 = 130 + Math.cos(a) * 22;
          const y2 = 90 + Math.sin(a) * 22;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#082545" strokeWidth="3" />;
        })}
        <circle cx="130" cy="90" r="4" fill="#1e6bb8" />
      </g>

      {/* Blueprint dimension lines */}
      <line x1="20" y1="20" x2="180" y2="20" stroke="#1e6bb8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
      <line x1="20" y1="15" x2="20" y2="25" stroke="#1e6bb8" strokeWidth="0.8" />
      <line x1="180" y1="15" x2="180" y2="25" stroke="#1e6bb8" strokeWidth="0.8" />
      <text x="92" y="16" fill="#1e6bb8" fontSize="6" fontFamily="monospace">160.00 mm</text>

      <line x1="20" y1="125" x2="180" y2="125" stroke="#1e6bb8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.6" />
      <text x="85" y="133" fill="#1e6bb8" fontSize="6" fontFamily="monospace">TOL ±0.02</text>

      {/* Corner tags */}
      <text x="8" y="10" fill="#f5851f" fontSize="7" fontFamily="monospace">DWG: UZX-2026-014</text>
    </svg>
  );
}

function DigitalAnim() {
  // Code rain + data packets flowing + cloud
  return (
    <svg className="w-full h-full" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      {/* Code matrix falling */}
      {[20, 40, 60, 155, 175].map((x, i) => (
        <g key={i}>
          {["10", "AF", "2B", "E1"].map((t, j) => (
            <text
              key={j}
              x={x}
              y={20 + j * 22}
              fill="#f5851f"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.7"
              style={{ animation: `car-drop 3s linear infinite ${i * 0.3 + j * 0.5}s` }}
            >
              {t}
            </text>
          ))}
        </g>
      ))}

      {/* Central cloud */}
      <g transform="translate(85, 50)">
        <path d="M 5 25 Q 0 15, 10 10 Q 12 0, 25 3 Q 35 -5, 45 5 Q 55 2, 55 15 Q 60 25, 50 28 L 8 28 Q 0 28, 5 25 Z"
          fill="#1e6bb8" opacity="0.85" />
        <text x="30" y="20" textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace" fontWeight="bold">CLOUD</text>
      </g>

      {/* Data packets */}
      <g>
        <rect x="0" y="110" width="6" height="3" fill="#f5851f" style={{ animation: "car-slide 2s linear infinite" }} />
        <rect x="0" y="117" width="6" height="3" fill="#f5851f" style={{ animation: "car-slide 2s linear infinite 0.5s" }} />
        <rect x="0" y="124" width="6" height="3" fill="#f5851f" style={{ animation: "car-slide 2s linear infinite 1s" }} />
      </g>

      {/* Terminal prompt */}
      <rect x="10" y="100" width="180" height="32" fill="none" stroke="#082545" strokeWidth="1" opacity="0.4" />
      <text x="15" y="111" fill="#082545" fontSize="7" fontFamily="monospace">$ deploy --edge --target=factory-01</text>
      <text x="15" y="122" fill="#f5851f" fontSize="7" fontFamily="monospace">
        ✓ MES online · 12 machines connected
        <tspan style={{ animation: "car-blink 0.7s linear infinite" }}>_</tspan>
      </text>

      {/* Top label */}
      <text x="8" y="10" fill="#082545" fontSize="7" fontFamily="monospace" fontWeight="bold">CI/CD · INDUSTRY 4.0</text>
    </svg>
  );
}

function ProcessAnim() {
  // CV → review → interview → offer pipeline
  return (
    <svg className="w-full h-full" viewBox="0 0 320 110" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      {[
        { x: 40, label: "CV" },
        { x: 120, label: "REVIEW" },
        { x: 200, label: "INTERVIU" },
        { x: 280, label: "OFERTĂ" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x - 28} y="40" width="56" height="30" fill={i === 3 ? "#f5851f" : "rgba(30,107,184,0.1)"} stroke={i === 3 ? "#f5851f" : "#1e6bb8"} strokeWidth="1.2" />
          <text x={s.x} y="59" textAnchor="middle" fill={i === 3 ? "#fff" : "#082545"} fontSize="8" fontFamily="monospace" fontWeight="bold">
            {s.label}
          </text>
          <text x={s.x} y="82" textAnchor="middle" fill="#082545" fontSize="7" fontFamily="monospace" opacity="0.6">
            {["Day 0", "24h", "Day 3-5", "Day 7"][i]}
          </text>
        </g>
      ))}
      {/* Arrows connecting */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <line
            x1={68 + i * 80}
            y1="55"
            x2={92 + i * 80}
            y2="55"
            stroke="#f5851f"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            style={{ animation: `car-dash 1s linear infinite ${i * 0.2}s` }}
          />
          <polygon points={`${92 + i * 80},55 ${87 + i * 80},52 ${87 + i * 80},58`} fill="#f5851f" />
        </g>
      ))}
      <text x="10" y="15" fill="#082545" fontSize="7" fontFamily="monospace" opacity="0.6">PIPELINE RECRUTARE · 7 ZILE</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═════════════════════════════════════════════════════════════════════ */

function RoleCard({ role, accent }: { role: Role; accent: string }) {
  return (
    <motion.a
      href={APPLY_HREF}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4 }}
      className="bg-white border hairline p-5 block group relative overflow-hidden"
      style={{ borderLeftWidth: 3, borderLeftColor: accent }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h4 className="serif text-base lg:text-lg text-ink-900 leading-tight group-hover:text-uzx-orange transition" style={{ letterSpacing: "-0.02em" }}>
          {role.title}
        </h4>
        <span className="text-[9px] mono uppercase tracking-wider border hairline px-2 py-0.5 text-ink-600 shrink-0">
          {role.level}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {role.tags.map((t, j) => (
          <span key={j} className="text-[10px] mono bg-ink-50 text-ink-700 px-2 py-0.5">
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-[10px] mono text-ink-500 uppercase tracking-wider pt-3 border-t hairline">
        <span>
          {role.location} · {role.type}
        </span>
        <span className="text-uzx-orange group-hover:translate-x-0.5 transition">Aplică →</span>
      </div>
    </motion.a>
  );
}

function BigApplyCTA({ title, desc, accent = "#0b2c52" }: { title: string; desc: string; accent?: string }) {
  return (
    <section className="py-10 lg:py-14 relative overflow-hidden text-white" style={{ background: accent }}>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container-x relative">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-uzx-orange mono mb-2">
              <span className="w-6 h-px bg-uzx-orange" />
              Aplică acum
            </div>
            <h3 className="serif text-xl lg:text-2xl leading-tight" style={{ letterSpacing: "-0.02em" }}>
              {title}
            </h3>
            <p className="text-sm text-ink-300 mt-2 max-w-2xl">{desc}</p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <Link
              href={APPLY_HREF}
              className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-6 py-3.5 transition flex items-center gap-3 group font-medium"
            >
              Trimite CV
              <span className="group-hover:translate-x-1 transition">→</span>
            </Link>
            <a href="tel:+40769081081" className="text-sm text-white/90 underline-link hover:text-white self-center">
              +40 769 081 081
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═════════════════════════════════════════════════════════════════════ */

export default function CarierePage() {
  const [pillar, setPillar] = useState<"ingineri" | "digitalizare">("ingineri");

  return (
    <div className="min-h-screen bg-white text-ink-900">
      <Header solid />

      <main>
        {/* ───── HERO ───── */}
        <section className="border-b hairline relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-white/50 mb-6">
                <Link href="/" className="hover:text-uzx-orange transition">Acasă</Link>
                <span className="text-white/30">/</span>
                <span className="text-uzx-orange">Cariere</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/70 mb-6 mono">
                    <span className="w-8 h-px bg-white/40" />
                    <span>Cariere · Iași & remote</span>
                    <span className="inline-flex items-center gap-1.5 text-uzx-orange ml-2">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-uzx-orange"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      12 poziții active
                    </span>
                  </div>
                  <h1
                    className="serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white mb-6"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Construim viitorul<br />
                    industriei românești.<br />
                    <span className="text-uzx-orange font-light">Inginerește.</span>
                  </h1>
                  <p className="text-base lg:text-lg text-ink-200 max-w-2xl leading-relaxed">
                    Căutăm <strong className="text-white">ingineri</strong> și <strong className="text-white">specialiști digitalizare</strong> care
                    vor să lucreze pe proiecte reale: linii de producție, cobots, laser fiber, MES, stații
                    fotovoltaice industriale. Fără ceremonii, fără KPI absurzi — doar inginerie care funcționează.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <a
                      href={APPLY_HREF}
                      className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
                    >
                      Aplică acum
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </a>
                    <a
                      href="#roluri"
                      className="bg-white/10 hover:bg-white/20 text-white text-sm px-7 py-4 transition border border-white/20"
                    >
                      Vezi rolurile deschise
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="w-full aspect-[8/5.5] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                    <HeroAnim />
                  </div>
                </div>
              </div>

              {/* Hero stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-12 lg:mt-16 pt-10 border-t border-white/10">
                {HERO_STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="border-l-2 border-uzx-orange pl-4"
                  >
                    <div className="serif text-2xl lg:text-4xl text-white num" style={{ letterSpacing: "-0.02em" }}>
                      {s.v}
                    </div>
                    <div className="text-[10px] mono text-white/60 uppercase tracking-wider mt-1.5">{s.label}</div>
                    <div className="text-[10px] text-ink-300 mt-0.5">{s.hint}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── BENEFITS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— De ce Uzinex</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                    Ce primești dincolo<br />
                    <span className="font-light text-uzx-orange">de salariu.</span>
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-ink-600 text-base leading-relaxed">
                    Suntem o echipă mică și agilă — <strong className="text-ink-900">5 ingineri</strong> care
                    livrează proiecte industriale reale. Creștem cu grijă, nu cu headcount forțat. Fiecare nou
                    coleg e o decizie conștientă — ai impact direct din săptămâna întâi.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200 border hairline">
                {BENEFITS.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="bg-white p-7 lg:p-8"
                  >
                    <div className="serif text-4xl text-uzx-orange num mb-5" style={{ letterSpacing: "-0.04em" }}>
                      {b.icon}
                    </div>
                    <h3 className="serif text-lg text-ink-900 leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                      {b.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{b.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── INLINE APPLY CTA ───── */}
        <BigApplyCTA
          title="Gata să aplici? Trimite CV-ul cu un rând despre ce te pasionează."
          desc="Răspundem în maxim 24h lucrătoare. Nu primești formulare ATS, nu trece prin 5 runde absurde. Doar inginerie."
        />

        {/* ───── TWO ROLE PILLARS ───── */}
        <section id="roluri" className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Roluri deschise</div>
              <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                Două direcții.<br />
                <span className="font-light text-uzx-orange">Aceeași echipă.</span>
              </h2>
              <p className="text-sm text-ink-500 max-w-3xl mb-10">
                Inginerii proiectează și pun în funcțiune echipamentele. Specialiștii digitalizare conectează
                mașinile la cloud, construiesc MES-ul și pun AI la fabrică. Împreună livrăm Industry 4.0.
              </p>

              {/* Pillar switcher */}
              <div className="flex gap-0 mb-10 border hairline bg-white w-fit">
                <button
                  type="button"
                  onClick={() => setPillar("ingineri")}
                  className={`px-6 py-3 text-sm transition flex items-center gap-2 ${pillar === "ingineri" ? "bg-uzx-blue text-white" : "text-ink-700 hover:bg-ink-50"}`}
                >
                  <span className="mono text-[10px] opacity-70">01</span>
                  Ingineri ({ENG_ROLES.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPillar("digitalizare")}
                  className={`px-6 py-3 text-sm transition flex items-center gap-2 border-l hairline ${pillar === "digitalizare" ? "bg-uzx-orange text-white" : "text-ink-700 hover:bg-ink-50"}`}
                >
                  <span className="mono text-[10px] opacity-70">02</span>
                  Digitalizare ({DIGI_ROLES.length})
                </button>
              </div>

              {/* Pillar intro + animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={pillar}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-center">
                    <div className="lg:col-span-7">
                      <div className="text-[10px] mono text-uzx-orange uppercase tracking-wider mb-2">
                        {pillar === "ingineri" ? "Direcția 01" : "Direcția 02"}
                      </div>
                      <h3 className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                        {pillar === "ingineri" ? (
                          <>
                            Ingineri care livrează<br />
                            <span className="font-light text-uzx-blue">fier, nu slide-uri.</span>
                          </>
                        ) : (
                          <>
                            Specialiști care conectează<br />
                            <span className="font-light text-uzx-orange">mașina la cloud.</span>
                          </>
                        )}
                      </h3>
                      <p className="text-sm text-ink-600 leading-relaxed max-w-xl">
                        {pillar === "ingineri"
                          ? "Proiectare, ofertare tehnică, punere în funcțiune, mentenanță. Lucrezi cu CNC, laser fiber, cobots, PLC Siemens/Beckhoff, robotică Fanuc. Ești responsabil end-to-end: de la discuția cu clientul și construirea proformei cu preț ferm, până la predarea echipamentului instalat și operatorul format. Nu există silos între proiectare și comercial — fiecare inginer face și ofertare."
                          : "MES, IIoT, AI vision, data engineering. Construiești platforme care iau date din PLC-uri și le duc la Grafana/dashboard-uri decizionale. Scrii cod care rulează pe edge devices lângă utilaje, nu doar pe laptop."}
                      </p>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="w-full aspect-[8/5.5] bg-white border hairline p-4">
                        {pillar === "ingineri" ? <EngineerAnim /> : <DigitalAnim />}
                      </div>
                    </div>
                  </div>

                  {/* Role grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(pillar === "ingineri" ? ENG_ROLES : DIGI_ROLES).map((r, i) => (
                      <RoleCard key={i} role={r} accent={pillar === "ingineri" ? "#1e6bb8" : "#f5851f"} />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ───── PROCESS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-center">
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Proces</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                    De la CV la ofertă.<br />
                    <span className="font-light text-uzx-orange">7 zile.</span>
                  </h2>
                  <p className="text-sm text-ink-500 max-w-md">
                    Nu ghosting-uim candidați. Nu te punem să aștepți 3 săptămâni până la prima discuție.
                    Dacă aplici astăzi, în 24h primești răspuns.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="w-full aspect-[32/11] bg-ink-50 border hairline p-3">
                    <ProcessAnim />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border hairline">
                {PROCESS.map((s) => (
                  <div key={s.num} className="bg-white p-7 lg:p-8 flex flex-col">
                    <div className="serif text-5xl text-uzx-orange num mb-6" style={{ letterSpacing: "-0.04em" }}>
                      {s.num}
                    </div>
                    <h3 className="serif text-lg text-ink-900 leading-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── SPONTANEOUS / OFFER ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
              <div className="bg-white p-8 lg:p-10">
                <div className="text-[10px] mono text-uzx-orange uppercase tracking-wider mb-3">— Aplicație spontană</div>
                <h3 className="serif text-2xl text-ink-900 leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Nu vezi rolul tău?<br />Aplică oricum.
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed mb-6">
                  Dacă ești inginer/ă sau specialist/ă digitalizare și vrei să lucrezi la proiecte industriale
                  reale — trimite CV-ul cu subiectul <strong className="text-ink-900">[APLICATIE SPONTANA]</strong>.
                  Revenim când apare ceva potrivit.
                </p>
                <a
                  href="mailto:info@uzinex.ro?subject=%5BAPLICATIE%20SPONTANA%5D"
                  className="text-sm text-uzx-blue underline-link hover:text-uzx-orange transition inline-flex items-center gap-2 group"
                >
                  info@uzinex.ro
                  <span className="group-hover:translate-x-0.5 transition">↗</span>
                </a>
              </div>
              <div className="bg-white p-8 lg:p-10 relative" style={{ borderTop: "3px solid #f5851f" }}>
                <div className="inline-flex items-center gap-2 text-[10px] mono uppercase tracking-wider mb-3 text-uzx-orange">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-uzx-orange"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Studenți · practică & stagii
                </div>
                <h3 className="serif text-2xl text-ink-900 leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                  Acceptăm studenți<br />pentru <span className="text-uzx-orange font-light">practică.</span>
                </h3>
                <p className="text-sm text-ink-600 leading-relaxed mb-4">
                  Primim studenți la <strong className="text-ink-900">practică de vară</strong> (90-120 ore conform programei)
                  și <strong className="text-ink-900">internship-uri plătite</strong> (3-6 luni). Domenii: Automatică,
                  Mecanică, Electrotehnică, Calculatoare, IT.
                </p>
                <ul className="space-y-1.5 text-sm text-ink-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-[7px] w-1.5 h-1.5 bg-uzx-orange" />
                    Semnăm convenție de practică cu facultatea
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-[7px] w-1.5 h-1.5 bg-uzx-orange" />
                    Tutore dedicat · mentor inginer senior
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-[7px] w-1.5 h-1.5 bg-uzx-orange" />
                    Proiect real cu deliverable la final
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-[7px] w-1.5 h-1.5 bg-uzx-orange" />
                    Posibilitate conversie full-time după absolvire
                  </li>
                </ul>
                <a
                  href="mailto:info@uzinex.ro?subject=%5BPRACTICA%20STUDENT%5D"
                  className="inline-flex items-center gap-2 bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-5 py-3 transition font-medium group"
                >
                  Aplică pentru practică
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ───── FINAL DARK CTA ───── */}
        <section className="py-14 lg:py-20 text-white relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">— Gata să începi</div>
              <h2 className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-6" style={{ letterSpacing: "-0.03em" }}>
                Un email poate schimba totul.<br />
                <span className="font-light text-uzx-orange">Să vedem dacă suntem potriviți.</span>
              </h2>
              <p className="text-ink-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Trimite CV-ul la <strong className="text-white">info@uzinex.ro</strong> cu rolul în subiect și
                3 rânduri despre ce proiecte te-ar pasiona la noi. Îți răspundem în 24h lucrătoare.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href={APPLY_HREF}
                  className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-base px-8 py-4 transition font-medium inline-flex items-center gap-3 group"
                >
                  Aplică acum
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <a href="tel:+40769081081" className="text-sm underline-link hover:text-ink-200">
                  +40 769 081 081
                </a>
              </div>
              <div className="text-[10px] mono text-white/40 uppercase tracking-wider mt-8">
                Sediu · Parc Științific Tehnopolis · Bd. Poitiers nr. 10 · Iași
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
