"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";

/* ─────── DATA ─────── */

const BENEFITS = [
  { value: "0%", label: "Avans minim", desc: "Obții echipamentul fără investiție inițială. Capitalul tău rămâne liber pentru operațiuni." },
  { value: "Fix", label: "Rate fixe", desc: "Fără surprize. Rata lunară e aceeași pe toată durata contractului — planificare financiară predictibilă." },
  { value: "48h", label: "Aprobare rapidă", desc: "Dosarul trece prin partenerii noștri financiari în maxim 48 de ore lucrătoare de la depunere." },
  { value: "1 pag.", label: "Documentație simplă", desc: "Formular scurt, CUI, ultimele 2 bilanțuri. Noi pregătim specificațiile tehnice și proformele." },
];

const STEPS = [
  { num: "01", title: "Alegi echipamentul", desc: "Din catalogul Uzinex sau pe baza unei oferte personalizate de la inginerii noștri." },
  { num: "02", title: "Depui dosarul", desc: "Noi pregătim proforma și specificațiile tehnice. Tu completezi formularul financiar (1 pagină)." },
  { num: "03", title: "Aprobare & semnare", desc: "Partenerul financiar aprobă în 48h. Semnezi contractul de leasing/credit digital sau la sediu." },
  { num: "04", title: "Livrare & instalare", desc: "Echipamentul e livrat, instalat și pus în funcțiune de echipa Uzinex. Plătești prima rată la 30 de zile." },
];

type Partner = {
  name: string;
  tagline: string;
  type: string;
  specs: { label: string; value: string }[];
  details: string[];
  eligibil: string;
  accent: string;
};

const PARTNERS: Partner[] = [
  {
    name: "GRENKE",
    tagline: "Lider european în leasing de echipamente",
    type: "LEASING",
    specs: [
      { label: "Avans", value: "0%" },
      { label: "Durată", value: "18 — 60 luni" },
      { label: "Valoare minimă", value: "€500 + TVA" },
      { label: "Aprobare", value: "6 — 24 ore" },
    ],
    details: [
      "Comision administrare: 1% din valoarea contractului (minim €50)",
      "Valoare reziduală: 5% din prețul inițial",
      "Rată fixă în EUR pe toată durata contractului",
      "Asigurare inclusă: 1.47% (active IT) / 2.10% (alte active fixe)",
    ],
    eligibil: "Persoane juridice și PFA",
    accent: "#1e6bb8",
  },
  {
    name: "BT Leasing",
    tagline: "Leasing financiar de la Banca Transilvania",
    type: "LEASING FINANCIAR",
    specs: [
      { label: "Avans", value: "10 — 30%" },
      { label: "Durată", value: "24 — 60 luni" },
      { label: "Valoare minimă", value: "€5.000 + TVA" },
      { label: "Aprobare", value: "24 — 48 ore" },
    ],
    details: [
      "Dobândă fixă sau variabilă, în EUR sau RON",
      "Valoare reziduală: 1 — 20% negociabilă",
      "Comision de analiză: 0.5 — 1% (negociabil la volum)",
      "Asigurare CASCO obligatorie pentru utilaje mobile",
    ],
    eligibil: "SRL, SA cu minim 1 an activitate",
    accent: "#f5851f",
  },
  {
    name: "BRD",
    tagline: "Credite pentru investiții industriale",
    type: "CREDIT INVESTIȚII",
    specs: [
      { label: "Avans", value: "15 — 25%" },
      { label: "Durată", value: "12 — 84 luni" },
      { label: "Valoare minimă", value: "€10.000" },
      { label: "Aprobare", value: "3 — 5 zile" },
    ],
    details: [
      "Dobândă variabilă: EURIBOR + marjă de la 3.5%",
      "Perioadă de grație: până la 6 luni",
      "Echipamentul devine proprietatea ta din prima zi",
      "Posibilitate refinanțare echipamente existente",
    ],
    eligibil: "SRL, SA cu minim 2 ani activitate și cifră de afaceri > €100K",
    accent: "#082545",
  },
  {
    name: "Garanti BBVA",
    tagline: "Finanțare adaptată pentru IMM-uri",
    type: "CREDIT / LEASING",
    specs: [
      { label: "Avans", value: "0 — 20%" },
      { label: "Durată", value: "12 — 72 luni" },
      { label: "Valoare minimă", value: "€3.000" },
      { label: "Aprobare", value: "24 — 72 ore" },
    ],
    details: [
      "Dobândă fixă pe primii 2 ani, apoi variabilă",
      "Structuri flexibile: leasing + credit mixt",
      "Comision de analiză: 0% pentru clienții Uzinex",
      "Posibilitate cofinanțare cu fonduri europene",
    ],
    eligibil: "PFA, SRL, SA — inclusiv start-up-uri cu minim 6 luni",
    accent: "#155290",
  },
  {
    name: "Garanti BBVA Leasing",
    tagline: "Leasing operațional și financiar pentru echipamente industriale",
    type: "LEASING",
    specs: [
      { label: "Avans", value: "0 — 25%" },
      { label: "Durată", value: "18 — 60 luni" },
      { label: "Valoare minimă", value: "€2.000 + TVA" },
      { label: "Aprobare", value: "24 — 48 ore" },
    ],
    details: [
      "Leasing financiar cu opțiune de cumpărare la final",
      "Leasing operațional cu returnare sau prelungire",
      "Rată fixă sau variabilă în EUR sau RON",
      "Asigurare CASCO inclusă în rata lunară",
    ],
    eligibil: "PFA, SRL, SA — inclusiv micro-întreprinderi",
    accent: "#0a4d96",
  },
  {
    name: "UniCredit Leasing",
    tagline: "Leasing industrial de la UniCredit Bank",
    type: "LEASING FINANCIAR / OPERAȚIONAL",
    specs: [
      { label: "Avans", value: "10 — 30%" },
      { label: "Durată", value: "12 — 60 luni" },
      { label: "Valoare minimă", value: "€5.000 + TVA" },
      { label: "Aprobare", value: "2 — 5 zile" },
    ],
    details: [
      "Finanțare în EUR sau RON cu dobândă competitivă",
      "Leasing financiar și operațional pentru utilaje industriale",
      "Sale and leaseback pentru echipamente existente",
      "Structuri adaptate pe perioadele de 12 — 60 luni",
    ],
    eligibil: "SRL, SA cu minim 1 an activitate",
    accent: "#c4161c",
  },
  {
    name: "BCR Leasing",
    tagline: "Cel mai mare portofoliu de leasing din România",
    type: "LEASING FINANCIAR",
    specs: [
      { label: "Avans", value: "10 — 25%" },
      { label: "Durată", value: "12 — 72 luni" },
      { label: "Valoare minimă", value: "€10.000" },
      { label: "Aprobare", value: "3 — 7 zile" },
    ],
    details: [
      "Portofoliu de €933 milioane (2024) — cel mai mare din România",
      "23% din portofoliu alocat echipamentelor și utilajelor",
      "Dobândă variabilă EURIBOR + marjă negociabilă",
      "Partener de finanțare pentru proiecte cofinanțate UE",
    ],
    eligibil: "SRL, SA cu minim 2 ani activitate și bilanț depus",
    accent: "#004990",
  },
  {
    name: "Impuls Leasing",
    tagline: "IFN specializat pe echipamente și utilaje",
    type: "LEASING",
    specs: [
      { label: "Avans", value: "5 — 20%" },
      { label: "Durată", value: "12 — 48 luni" },
      { label: "Valoare minimă", value: "€1.000 + TVA" },
      { label: "Aprobare", value: "24 — 48 ore" },
    ],
    details: [
      "Aprobare rapidă cu documentație minimală",
      "Specializat pe utilaje industriale și echipamente de producție",
      "Flexibilitate la structura ratelor (sezonalitate, grație)",
      "Proces simplificat pentru clienții cu istoric bun",
    ],
    eligibil: "PFA, SRL, SA — proces simplificat pentru companii cu cifră > €50K",
    accent: "#2d7d46",
  },
  {
    name: "OTP Leasing",
    tagline: "Leasing de la OTP Bank pentru echipamente industriale",
    type: "LEASING FINANCIAR",
    specs: [
      { label: "Avans", value: "10 — 30%" },
      { label: "Durată", value: "12 — 60 luni" },
      { label: "Valoare minimă", value: "€5.000" },
      { label: "Aprobare", value: "3 — 5 zile" },
    ],
    details: [
      "Finanțare în EUR și RON cu dobândă fixă pe toată durata",
      "Valoare reziduală negociabilă de la 1%",
      "Comision de administrare inclus în rată",
      "Posibilitate achitare anticipată fără penalități",
    ],
    eligibil: "SRL, SA cu minim 1 an activitate",
    accent: "#006a4e",
  },
  {
    name: "Autonom",
    tagline: "Leasing operațional pentru echipamente și flote",
    type: "LEASING OPERAȚIONAL",
    specs: [
      { label: "Avans", value: "0 — 10%" },
      { label: "Durată", value: "12 — 60 luni" },
      { label: "Valoare minimă", value: "€3.000 + TVA" },
      { label: "Aprobare", value: "24 — 48 ore" },
    ],
    details: [
      "Leasing operațional pur — off-balance sheet, nu afectează bilanțul",
      "Rata lunară include mentenanța și asigurarea (opțional)",
      "La final: returnare, prelungire sau achiziție la valoare reziduală",
      "Cel mai mare operator de leasing operațional din România",
    ],
    eligibil: "PFA, SRL, SA — inclusiv companii noi cu garanții suplimentare",
    accent: "#e30613",
  },
];

const TYPES = [
  {
    title: "Leasing financiar",
    desc: "Echipamentul devine proprietatea ta la finalul contractului. Ratele sunt deductibile fiscal, iar TVA-ul se recuperează integral. Ideal pentru investiții pe termen lung.",
    highlights: ["Proprietate la final", "TVA recuperabil", "Deductibil integral"],
    accent: "#1e6bb8",
  },
  {
    title: "Leasing operațional",
    desc: "Folosești echipamentul pe durata contractului fără să-l cumperi. La final poți prelungi, returna sau achiziționa la valoare reziduală. Ideal pentru proiecte cu durată determinată.",
    highlights: ["Fără angajament de cumpărare", "Off-balance sheet", "Flexibilitate maximă"],
    accent: "#f5851f",
  },
  {
    title: "Credit echipamente",
    desc: "Credit bancar clasic destinat achiziției de utilaje. Echipamentul devine proprietatea ta din prima zi, iar creditul se rambursează pe 12-84 luni cu dobândă fixă sau variabilă.",
    highlights: ["Proprietate imediată", "Până la 84 luni", "Dobândă competitivă"],
    accent: "#082545",
  },
];

const FAQ = [
  { q: "Pot obține finanțare și pentru echipamente second-hand?", a: "Da, pentru echipamentele recondiţionate din portofoliul Uzinex, cu condiția ca vechimea să nu depășească 7 ani la momentul achiziției." },
  { q: "Ce documente am nevoie?", a: "Certificat de înregistrare (CUI), ultimele 2 bilanțuri depuse, situația financiară curentă (balanță) și formularul de finanțare (1 pagină, pe care vi-l furnizăm noi)." },
  { q: "Există costuri ascunse?", a: "Nu. Rata lunară include totul: dobânda, comisionul de administrare și asigurarea echipamentului. TVA-ul se adaugă conform legislației în vigoare." },
  { q: "Pot combina leasingul cu fonduri europene?", a: "Da, în anumite configurații. Echipa noastră de consultanță fonduri UE vă poate structura un mix optim între leasing și cofinanțare europeană." },
];

/* ─────── ANIMATED COUNTER ─────── */

function AnimCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const dur = 1500;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / dur, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(tick);
    };
    const t = setTimeout(() => requestAnimationFrame(tick), 300);
    return () => clearTimeout(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

/* ─────── PAGE ─────── */

export default function CrediteLeasingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* ───── HERO ───── */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-ink-400 mb-6">
                <Link href="/" className="hover:text-uzx-blue transition">Acasă</Link>
                <span className="text-ink-300">/</span>
                <Link href="/finantare" className="hover:text-uzx-blue transition">Finanțare</Link>
                <span className="text-ink-300">/</span>
                <span className="text-ink-700">Credite & leasing</span>
              </nav>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                    Finanțare echipamente industriale
                  </div>
                  <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                    Credite & leasing{" "}
                    <span className="font-light italic text-uzx-orange">cu avans de la 0%.</span>
                  </h1>
                  <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                    Obții echipamentul industrial de care ai nevoie fără să-ți blochezi capitalul. Lucrăm cu 4 parteneri financiari pentru a-ți oferi cea mai bună rată, cea mai scurtă aprobare și cea mai simplă documentație din piață.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:col-start-9">
                  {/* Animated benefits mini-cards */}
                  <div className="grid grid-cols-2 gap-3">
                    {BENEFITS.map((b, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                        className="bg-white border hairline p-4"
                      >
                        <div className="serif text-2xl text-uzx-blue num" style={{ letterSpacing: "-0.02em" }}>
                          {b.value}
                        </div>
                        <div className="text-[10px] mono text-ink-500 uppercase tracking-wider mt-1">
                          {b.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── BENEFITS EXPANDED ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border-y border-ink-200">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="bg-white p-8">
                    <div className="serif text-4xl text-uzx-blue num mb-4" style={{ letterSpacing: "-0.03em" }}>
                      {b.value}
                    </div>
                    <h3 className="serif text-lg text-ink-900 mb-3">{b.label}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── PROCESS STEPS (animated flowchart) ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Proces simplu</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                    De la ofertă la<br /><span className="font-light text-uzx-orange">prima rată în 4 pași.</span>
                  </h2>
                </div>
                <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                  <p className="text-ink-600 leading-relaxed">
                    Nu te ocupi tu de birocrația financiară — o facem noi. Tu alegi echipamentul, noi pregătim dosarul, obținem aprobarea și livrăm la cheie.
                  </p>
                </div>
              </div>

              <ProcessAnimation steps={STEPS} />
            </div>
          </div>
        </section>

        {/* ───── FINANCING TYPES ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Tipuri de finanțare</div>
              <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-12" style={{ letterSpacing: "-0.03em" }}>
                Alege structura potrivită<br /><span className="font-light text-uzx-orange">pentru investiția ta.</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border hairline">
                {TYPES.map((t, i) => (
                  <div key={i} className="bg-white p-8 lg:p-10 flex flex-col">
                    <div className="h-1 w-12 mb-6" style={{ background: t.accent }} />
                    <h3 className="serif text-2xl text-ink-900 leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                      {t.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed mb-6">{t.desc}</p>
                    <ul className="space-y-2 mt-auto">
                      {t.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-ink-700">
                          <span className="shrink-0 mt-[5px] w-1.5 h-1.5" style={{ background: t.accent }} />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── PARTNERS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Parteneri financiari</div>
              <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-12" style={{ letterSpacing: "-0.03em" }}>
                Lucrăm cu cei mai buni<br /><span className="font-light text-uzx-orange">pentru rata ta optimă.</span>
              </h2>
              <div className="space-y-6">
                {PARTNERS.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="bg-white border hairline p-6 lg:p-8"
                    style={{ borderLeftWidth: 3, borderLeftColor: p.accent }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="serif text-2xl text-ink-900">{p.name}</div>
                        <div className="text-sm text-ink-500 mt-1">{p.tagline}</div>
                      </div>
                      <span className="text-[10px] mono uppercase tracking-wider border hairline px-3 py-1 text-ink-600 shrink-0">
                        {p.type}
                      </span>
                    </div>

                    {/* Specs grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 pb-6 border-b hairline">
                      {p.specs.map((s, j) => (
                        <div key={j}>
                          <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">
                            {s.label}
                          </div>
                          <div className="serif text-xl text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Details bullets */}
                    <ul className="space-y-2 mb-4">
                      {p.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-ink-600">
                          <span className="shrink-0 mt-[6px] w-1.5 h-1.5" style={{ background: p.accent }} />
                          {d}
                        </li>
                      ))}
                    </ul>

                    {/* Eligibility */}
                    <div className="text-xs text-ink-500">
                      <span className="mono uppercase tracking-wider text-ink-400">Eligibil:</span>{" "}
                      {p.eligibil}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── STATS ───── */}
        <section className="border-b hairline py-14 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num"><AnimCounter target={500} suffix="+" /></div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Echipamente finanțate</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num">0%</div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Avans minim posibil</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num"><AnimCounter target={48} />h</div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Timp aprobare maxim</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num"><AnimCounter target={4} /></div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Parteneri financiari</div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── FAQ ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Întrebări frecvente</div>
                <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                  Despre finanțare.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="divide-y hairline">
                  {FAQ.map((item, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i}>
                        <button
                          type="button"
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full flex items-center justify-between py-5 text-left group"
                        >
                          <span className="serif text-base lg:text-lg text-ink-900 leading-tight pr-4 group-hover:text-uzx-blue transition">
                            {item.q}
                          </span>
                          <span className="text-xl text-ink-400 shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>
                            +
                          </span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <p className="text-sm text-ink-600 leading-relaxed pb-5">
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── CTA DARK ───── */}
        <section className="border-b py-14 lg:py-20 text-white relative overflow-hidden" style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse 80% 80% at 80% 50%, #1e6bb8 0%, transparent 60%)" }} />
          <div className="container-x relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h2 className="serif text-3xl md:text-4xl leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                  Solicită o simulare de finanțare<br /><span className="font-light text-uzx-orange">în 24 de ore.</span>
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Spune-ne ce echipament te interesează și primești o simulare completă: rată lunară, avans, durata contractului și costul total al finanțării — pe toate cele 3 variante (leasing financiar, leasing operațional, credit).
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
                <a href="/#contact" className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-6 py-4 transition flex items-center justify-center gap-3 group font-medium">
                  Solicită simulare gratuită <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <a href="tel:+40769081081" className="border border-white/30 hover:border-white text-white text-sm px-6 py-3 transition flex items-center justify-center gap-2">
                  +40 769 081 081
                </a>
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

/* ─────── PROCESS ANIMATION COMPONENT ─────── */

function ProcessAnimation({ steps }: { steps: typeof STEPS }) {
  const [active, setActive] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    setActive(-1);
    const timers = steps.map((_, i) =>
      setTimeout(() => setActive(i), 600 + i * 1200)
    );
    timers.push(setTimeout(() => setCycle((c) => c + 1), 8000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, steps]);

  return (
    <div className="bg-[#0a0e14] p-6 lg:p-10 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-6">
        Proces de finanțare — 4 etape
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {/* Connection line (desktop only) */}
        <div className="hidden md:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-white/10" />
        <motion.div
          className="hidden md:block absolute top-5 left-[12.5%] h-px bg-uzx-orange origin-left"
          style={{ right: "12.5%" }}
          animate={{ scaleX: steps.length > 0 ? Math.min(1, (active + 1) / steps.length) : 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {steps.map((s, i) => {
          const done = i <= active;
          return (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <motion.div
                className="w-10 h-10 border flex items-center justify-center mb-4"
                style={{
                  borderColor: done ? "#f5851f" : "rgba(255,255,255,0.15)",
                  background: done ? "rgba(245,133,31,0.15)" : "transparent",
                }}
                animate={i === active ? { scale: [1, 1.15, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {done ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f5851f" strokeWidth="3" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <span className="text-[10px] mono text-white/25">{s.num}</span>
                )}
              </motion.div>
              <div className={`text-[11px] mono uppercase tracking-wider mb-2 ${done ? "text-uzx-orange" : "text-white/30"}`}>
                {s.title}
              </div>
              <p className={`text-[10px] leading-relaxed max-w-[180px] ${done ? "text-white/70" : "text-white/20"}`}>
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Completion badge */}
      <motion.div
        className="mt-8 text-center"
        animate={{ opacity: active >= steps.length - 1 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-[10px] mono text-uzx-orange font-bold uppercase tracking-wider">
          ✓ Prima rată la 30 de zile de la livrare
        </span>
      </motion.div>
    </div>
  );
}
