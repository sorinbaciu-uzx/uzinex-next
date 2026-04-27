"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { trackLead } from "@/components/Analytics";

/* ─────────────────────────────────────────────────────────────────────────
   /contact — pagină de contact Uzinex
   Include: formular, harta Google Maps (Tehnopolis Iași),
   departamente, CTA-uri pe canale.
   ───────────────────────────────────────────────────────────────────── */

const QUICK_CONTACT = [
  {
    label: "Telefon",
    value: "+40 769 081 081",
    href: "tel:+40769081081",
    hint: "L–V · 09:00–18:00",
    accent: "#f5851f",
  },
  {
    label: "Email general",
    value: "info@uzinex.ro",
    href: "mailto:info@uzinex.ro",
    hint: "Răspuns în 24h lucrătoare",
    accent: "#1e6bb8",
  },
  {
    label: "WhatsApp business",
    value: "+40 769 081 081",
    href: "https://wa.me/40769081081",
    hint: "Mesaj rapid · foto/video",
    accent: "#25d366",
  },
  {
    label: "Sediu",
    value: "Iași · Parc Tehnopolis",
    href: "#harta",
    hint: "Bd. Poitiers nr. 10",
    accent: "#2f855a",
  },
];

const DEPARTMENTS = [
  {
    title: "Vânzări & ofertare",
    desc: "Consultanță tehnică, proforme cu preț ferm, specificații detaliate pentru dosare licitație / fonduri.",
    email: "info@uzinex.ro",
    subject: "Solicitare%20oferta%20tehnica",
    bullets: ["Echipamente CNC · laser · cobots", "SEAP / SICAP · dosare tehnice", "Fonduri UE & scheme guv."],
    accent: "#1e6bb8",
  },
  {
    title: "Service & mentenanță",
    desc: "Intervenție sub 24h la nivel național, contracte mentenanță preventivă, reparații în garanție și post-garanție.",
    email: "info@uzinex.ro",
    subject: "Cerere%20service%20sau%20mentenanta",
    bullets: ["Intervenție sub 24h", "Diagnostic + manual AI", "Garanție 60 luni standard"],
    accent: "#c05621",
  },
  {
    title: "Finanțare",
    desc: "Leasing, credite, consultanță fonduri UE și scheme guvernamentale. Pregătim dosarul tehnic împreună cu consultanții acreditați.",
    email: "info@uzinex.ro",
    subject: "Evaluare%20optiuni%20finantare",
    bullets: ["Leasing cu avans 0%", "Fonduri UE & PNRR", "Credit punte până la rambursare"],
    accent: "#2f855a",
  },
  {
    title: "Cariere & stagii",
    desc: "Ingineri, specialiști digitalizare, practică studențească. Răspundem la toate aplicațiile în maxim 24h lucrătoare.",
    email: "info@uzinex.ro",
    subject: "Aplicatie%20Uzinex",
    bullets: ["12 poziții deschise", "Practică studenți", "Internship plătit 3-6 luni"],
    accent: "#f5851f",
  },
];

/* ─────── Animation ─────── */

const CSS_ANIM = `
@keyframes co-rot { to { transform: rotate(360deg); } }
@keyframes co-pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.15); } }
@keyframes co-glow { 0% { r: 6; opacity: 0.6; } 100% { r: 30; opacity: 0; } }
@keyframes co-dash { to { stroke-dashoffset: -24; } }
@keyframes co-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0.25; } }
`;

function ContactAnim() {
  return (
    <svg className="w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      <defs>
        <pattern id="co-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill="url(#co-grid)" />

      {/* Radar sweep behind pin */}
      <g style={{ transformOrigin: "160px 120px" }}>
        <circle cx="160" cy="120" r="75" fill="none" stroke="rgba(245,133,31,0.15)" strokeWidth="1" />
        <circle cx="160" cy="120" r="50" fill="none" stroke="rgba(245,133,31,0.2)" strokeWidth="1" />
        <circle cx="160" cy="120" r="25" fill="none" stroke="rgba(245,133,31,0.3)" strokeWidth="1" />
        <g style={{ transformOrigin: "160px 120px", animation: "co-rot 6s linear infinite" }}>
          <path d="M 160 120 L 235 120 A 75 75 0 0 1 210 190 Z" fill="url(#sweepGrad)" opacity="0.5" />
        </g>
        <linearGradient id="sweepGrad">
          <stop offset="0%" stopColor="#f5851f" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f5851f" stopOpacity="0" />
        </linearGradient>
      </g>

      {/* Ping rings at location */}
      <circle cx="160" cy="120" r="6" fill="none" stroke="#f5851f" strokeWidth="2" style={{ animation: "co-glow 2.4s ease-out infinite" }} />
      <circle cx="160" cy="120" r="6" fill="none" stroke="#f5851f" strokeWidth="2" style={{ animation: "co-glow 2.4s ease-out infinite 0.8s" }} />
      <circle cx="160" cy="120" r="6" fill="none" stroke="#f5851f" strokeWidth="2" style={{ animation: "co-glow 2.4s ease-out infinite 1.6s" }} />

      {/* Central pin */}
      <g transform="translate(160, 108)">
        <path d="M 0 0 C -10 0, -10 -14, 0 -14 C 10 -14, 10 0, 0 0 Z" fill="#f5851f" />
        <circle r="4" cy="-8" fill="#fff" />
        <path d="M 0 0 L 0 14" stroke="#f5851f" strokeWidth="2" />
      </g>

      {/* Connection paths to channel nodes */}
      {[
        { x: 50, y: 40, label: "PHONE", icon: "☎" },
        { x: 280, y: 50, label: "EMAIL", icon: "✉" },
        { x: 40, y: 180, label: "CHAT", icon: "◉" },
        { x: 280, y: 180, label: "VISIT", icon: "◆" },
      ].map((n, i) => (
        <g key={i}>
          <line
            x1={n.x}
            y1={n.y}
            x2="160"
            y2="120"
            stroke="#f5851f"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.6"
            style={{ animation: `co-dash 1.5s linear infinite ${i * 0.2}s` }}
          />
          <circle cx={n.x} cy={n.y} r="10" fill="rgba(245,133,31,0.15)" stroke="#f5851f" strokeWidth="1.2" />
          <text x={n.x} y={n.y + 3} textAnchor="middle" fill="#f5851f" fontSize="9" fontFamily="monospace" fontWeight="bold">
            {n.icon}
          </text>
          <text x={n.x} y={n.y + 22} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7" fontFamily="monospace">
            {n.label}
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
      <text x="12" y="18" fill="#f5851f" fontSize="7" fontFamily="monospace">● ONLINE</text>
      <text x="256" y="18" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">LAT 47.16° N</text>
      <text x="12" y="206" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">UZX · IAȘI</text>
      <text x="256" y="206" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">LON 27.61° E</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════════ */

type SubmitState = "idle" | "sending" | "success" | "error";

export default function ContactClient() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim() ?? "";
    const company = fd.get("company")?.toString().trim() ?? "";
    const email = fd.get("email")?.toString().trim() ?? "";
    const phone = fd.get("phone")?.toString().trim() ?? "";
    const subject = fd.get("subject")?.toString() ?? "Contact de pe site";
    const message = fd.get("message")?.toString().trim() ?? "";
    const honeypot = fd.get("website")?.toString() ?? ""; // hidden anti-bot field

    const sourceUrl = typeof window !== "undefined" ? window.location.href : undefined;

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          subject,
          message,
          sourceUrl,
          honeypot,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setState("success");
        form.reset();
        // Fire conversion events (GA4, Meta Pixel, LinkedIn) — no-op if pixels not set
        trackLead("leads");
      } else {
        throw new Error(json.error ?? "Submit failed");
      }
    } catch (err) {
      // Fallback: deschide clientul de email
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Eroare necunoscută");
      const body = [
        `Nume: ${name}`,
        `Companie: ${company}`,
        `Email: ${email}`,
        `Telefon: ${phone}`,
        `Subiect: ${subject}`,
        "",
        "Mesaj:",
        message,
      ].join("\n");
      const mailto = `mailto:info@uzinex.ro?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      // Deschid într-un tab nou ca să nu piardă userul pagina
      window.location.href = mailto;
    }
  };

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
                <span className="text-uzx-orange">Contact</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/70 mb-6 mono">
                    <span className="w-8 h-px bg-white/40" />
                    <span>Contact · 4 canale</span>
                    <span className="inline-flex items-center gap-1.5 text-uzx-orange ml-2">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-uzx-orange"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      Răspuns 24h
                    </span>
                  </div>
                  <h1
                    className="serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white mb-6"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Vorbește direct<br />
                    cu un inginer.<br />
                    <span className="text-uzx-orange font-light">Fără filtre.</span>
                  </h1>
                  <p className="text-base lg:text-lg text-ink-200 max-w-2xl leading-relaxed">
                    Nu trece prin call center. Nu completa 12 câmpuri pentru un apel. Alege canalul potrivit —
                    telefon, email, WhatsApp sau vizită la sediu — și primești răspuns direct de la persoana
                    care știe cum să te ajute.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <a
                      href="tel:+40769081081"
                      className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
                    >
                      Sună acum · +40 769 081 081
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </a>
                    <a
                      href="#formular"
                      className="bg-white/10 hover:bg-white/20 text-white text-sm px-7 py-4 transition border border-white/20"
                    >
                      Scrie-ne un mesaj
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="w-full aspect-[8/5.5] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                    <ContactAnim />
                  </div>
                </div>
              </div>

              {/* Quick contact mini-cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 lg:mt-16 pt-10 border-t border-white/10">
                {QUICK_CONTACT.map((c, i) => (
                  <motion.a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    whileHover={{ y: -3 }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 p-5 transition group block"
                    style={{ borderTopWidth: 2, borderTopColor: c.accent }}
                  >
                    <div className="text-[10px] mono uppercase tracking-[0.2em] text-white/60 mb-2">{c.label}</div>
                    <div className="serif text-base lg:text-lg text-white group-hover:text-uzx-orange transition" style={{ letterSpacing: "-0.01em" }}>
                      {c.value}
                    </div>
                    <div className="text-[10px] mono text-white/50 mt-1.5">{c.hint}</div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── FORM + DEPARTMENTS ───── */}
        <section id="formular" className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Form */}
              <div className="lg:col-span-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Scrie-ne</div>
                <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                  Formular de contact.<br />
                  <span className="font-light text-uzx-orange">Te sunăm în 24h.</span>
                </h2>
                <p className="text-sm text-ink-500 mb-8 max-w-lg">
                  Completezi formularul, trimitem email-ul pre-completat la info@uzinex.ro. Primești răspuns de la
                  inginerul potrivit, nu un robot.
                </p>

                <form onSubmit={handleSubmit} className="bg-white border hairline p-6 lg:p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Nume" name="name" type="text" required placeholder="Andrei Popescu" />
                    <FormField label="Companie" name="company" type="text" placeholder="SRL / PFA (opțional)" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Email" name="email" type="email" required placeholder="email@companie.ro" />
                    <FormField label="Telefon" name="phone" type="tel" placeholder="+40 7xx xxx xxx" />
                  </div>
                  <FormSelect
                    label="Subiect"
                    name="subject"
                    required
                    options={[
                      "Oferta echipament industrial",
                      "Service & mentenanță",
                      "Consultanță finanțare",
                      "Licitație SEAP / SICAP",
                      "Colaborare comercială",
                      "Cariere & stagii",
                      "Altceva",
                    ]}
                  />
                  <FormField label="Mesaj" name="message" type="textarea" required placeholder="Descrie pe scurt nevoia ta: echipament, volum, termene, buget estimat..." />

                  {/* Honeypot — câmp ascuns pentru boți. Userii reali nu-l completează. */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label>
                      Website (nu completa)
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-ink-500 pt-2 border-t hairline">
                    <input type="checkbox" required className="mt-0.5" />
                    <label>
                      Am citit și accept{" "}
                      <Link href="/politica-confidentialitate" className="text-uzx-blue hover:text-uzx-orange underline-link">
                        politica de confidențialitate
                      </Link>{" "}
                      și prelucrarea datelor mele pentru a fi contactat/ă.
                    </label>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="bg-uzx-orange hover:bg-uzx-orange/90 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm px-7 py-3.5 transition flex items-center gap-3 group font-medium"
                    >
                      {state === "sending" ? "Se trimite..." : "Trimite mesajul"}
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </button>
                    {state === "success" && (
                      <span className="text-xs text-uzx-blue mono flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                        ✓ Mulțumim! Mesajul tău a ajuns la noi. Te contactăm în 24h.
                      </span>
                    )}
                    {state === "error" && (
                      <span className="text-xs text-ink-600 mono">
                        Am deschis clientul de email ca fallback. Finalizează trimiterea acolo.
                      </span>
                    )}
                  </div>
                </form>
              </div>

              {/* Departments sidebar */}
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Departamente</div>
                <h2 className="serif text-2xl md:text-3xl text-ink-900 leading-[0.95] mb-6" style={{ letterSpacing: "-0.03em" }}>
                  Contact rapid<br />
                  <span className="font-light text-uzx-orange">pe departamente.</span>
                </h2>
                <div className="space-y-4">
                  {DEPARTMENTS.map((d, i) => (
                    <motion.a
                      key={i}
                      href={`mailto:${d.email}?subject=${d.subject}`}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.4 }}
                      className="block bg-white border hairline p-5 group hover:shadow-md transition"
                      style={{ borderLeftWidth: 3, borderLeftColor: d.accent }}
                    >
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="serif text-base text-ink-900 group-hover:text-uzx-orange transition" style={{ letterSpacing: "-0.02em" }}>
                          {d.title}
                        </h3>
                        <span className="text-xs text-uzx-orange opacity-0 group-hover:opacity-100 transition">→</span>
                      </div>
                      <p className="text-xs text-ink-600 leading-relaxed mb-3">{d.desc}</p>
                      <ul className="space-y-1">
                        {d.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-[11px] text-ink-600">
                            <span className="shrink-0 mt-[5px] w-1 h-1" style={{ background: d.accent }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── MAP + ADDRESS ───── */}
        <section id="harta" className="border-b hairline bg-white">
          <div className="container-x py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10 items-end">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Vizitează-ne</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                    Parc Științific Tehnopolis.<br />
                    <span className="font-light text-uzx-orange">Iași · Moldova.</span>
                  </h2>
                  <p className="text-sm text-ink-500 max-w-lg">
                    Sediul nostru e în Parcul Științific & Tehnologic Tehnopolis, în zona Copou—Păcurari.
                    Parcare gratuită, laborator propriu, spațiu de prezentare echipamente. Te așteptăm cu programare.
                  </p>
                </div>
                <div className="lg:col-span-5">
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=Parc+Stiintific+Tehnopolis+Iasi+Bd+Poitiers+10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-6 py-3 transition flex items-center gap-2 font-medium"
                    >
                      Rută Google Maps
                      <span>↗</span>
                    </a>
                    <a
                      href="https://waze.com/ul?q=Parc+Stiintific+Tehnopolis+Iasi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-ink-100 border hairline text-ink-900 text-sm px-6 py-3 transition flex items-center gap-2"
                    >
                      Deschide în Waze
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Address grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-ink-200 border hairline mb-8">
                {[
                  { label: "Adresă", value: "Bd. Poitiers nr. 10", hint: "700671 · Iași" },
                  { label: "Locație", value: "Parc Tehnopolis", hint: "Parc Științific & Tehnologic" },
                  { label: "Program", value: "L–V · 09:00–18:00", hint: "Vizite cu programare" },
                  { label: "Coordonate", value: "47.16° N · 27.61° E", hint: "GPS · WGS 84" },
                ].map((a, i) => (
                  <div key={i} className="bg-white p-5">
                    <div className="text-[10px] mono uppercase tracking-wider text-ink-400 mb-1.5">{a.label}</div>
                    <div className="serif text-base text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                      {a.value}
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5">{a.hint}</div>
                  </div>
                ))}
              </div>

              {/* Map embed */}
              <div className="relative border hairline bg-ink-50" style={{ borderTopWidth: 3, borderTopColor: "#f5851f" }}>
                <div className="absolute top-3 left-3 z-10 bg-white px-3 py-1.5 border hairline text-[10px] mono uppercase tracking-wider text-ink-700 flex items-center gap-2">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-uzx-orange"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Uzinex · Tehnopolis Iași
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2708.0!2d27.605!3d47.1594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zUGFyYyBUZWhub3BvbGlzIElhyJlp!5e0!3m2!1sro!2sro!4v1735000000000"
                  className="w-full h-[450px] lg:h-[520px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Harta sediu Uzinex — Parc Tehnopolis Iași"
                />
                {/* Fallback link below iframe */}
                <div className="absolute bottom-3 right-3 z-10 bg-white px-3 py-1.5 border hairline text-[10px] mono">
                  <a
                    href="https://maps.app.goo.gl/?q=Parc+Tehnopolis+Iasi+Bd+Poitiers+10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-uzx-blue hover:text-uzx-orange transition flex items-center gap-1"
                  >
                    Deschide hartă mare ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
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
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">— Urmează-ne</div>
              <h2 className="serif text-3xl md:text-4xl leading-[0.95] mb-6" style={{ letterSpacing: "-0.03em" }}>
                Pe YouTube e conținutul tehnic.<br />
                <span className="font-light text-uzx-orange">Aici e conversația.</span>
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <a
                  href="https://www.youtube.com/@UZINEX?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-6 py-3 transition flex items-center gap-2"
                >
                  YouTube @UZINEX
                  <span>↗</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/uzinex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-6 py-3 transition flex items-center gap-2"
                >
                  LinkedIn
                  <span>↗</span>
                </a>
                <a
                  href="/materiale-utile"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-6 py-3 transition"
                >
                  Materiale utile
                </a>
                <a
                  href="/cariere"
                  className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-6 py-3 transition"
                >
                  Cariere
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ─────── Small form components ─────── */

function FormField({
  label,
  name,
  type,
  required = false,
  placeholder,
}: {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  required?: boolean;
  placeholder?: string;
}) {
  const common =
    "w-full bg-white border hairline px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:border-uzx-orange transition";
  return (
    <label className="block">
      <div className="text-[10px] mono uppercase tracking-wider text-ink-500 mb-1.5">
        {label} {required && <span className="text-uzx-orange">*</span>}
      </div>
      {type === "textarea" ? (
        <textarea name={name} required={required} placeholder={placeholder} rows={5} className={common} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={common} />
      )}
    </label>
  );
}

function FormSelect({
  label,
  name,
  required = false,
  options,
}: {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
}) {
  return (
    <label className="block">
      <div className="text-[10px] mono uppercase tracking-wider text-ink-500 mb-1.5">
        {label} {required && <span className="text-uzx-orange">*</span>}
      </div>
      <select
        name={name}
        required={required}
        className="w-full bg-white border hairline px-4 py-2.5 text-sm text-ink-900 focus:outline-none focus:border-uzx-orange transition"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
