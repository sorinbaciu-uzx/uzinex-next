"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";

/* ─────── DATA ─────── */

const CONDITIONS = [
  { value: "10 — 30%", label: "Avans obligatoriu", desc: "Minim 10% din valoare. Procentul crește proporțional cu riscul evaluat." },
  { value: "3 — 18", label: "Rate lunare", desc: "Eșalonare cu rată fixă stabilită la semnare, incluzând costul finanțării." },
  { value: "Fixă", label: "Dobândă transparentă", desc: "Dobândă fixă pe toată durata, stabilită la evaluare — nu există dobândă 0%." },
  { value: "Riguros", label: "Proces de calificare", desc: "Analiză financiară internă: bilanț, datorii, capacitate de plată, garanții." },
];

const GUARANTEES = [
  {
    num: "01",
    title: "Bilete la ordin",
    icon: "",
    desc: "Emise de client la valoarea fiecărei rate, cu scadența lunară corespunzătoare graficului de plată. La maturitate, biletul la ordin devine titlu executoriu — cea mai frecventă și cea mai simplă garanție utilizată în creditul furnizor.",
    details: ["Titlu executoriu la scadență", "Un BO per rată sau BO global", "Emise de SRL/SA, avalizate de administrator"],
    accent: "#1e6bb8",
  },
  {
    num: "02",
    title: "Gaj pe echipament",
    icon: "",
    desc: "Echipamentul livrat servește drept garanție reală mobiliară până la plata integrală. Gajul se înscrie în Arhiva Electronică de Garanții Reale Mobiliare (AEGRM) și se radiază automat după ultima rată.",
    details: ["Înscriere în AEGRM", "Echipamentul rămâne la client", "Radiere la plata integrală"],
    accent: "#082545",
  },
  {
    num: "03",
    title: "CEC-uri postdatate",
    icon: "",
    desc: "File CEC emise la valoarea fiecărei rate cu scadența corespunzătoare graficului. Oferă un nivel suplimentar de siguranță prin circuitul bancar și devin titlu executoriu la refuzul la plată.",
    details: ["O filă CEC per rată lunară", "Circuitul bancar asigură transparența", "Executare directă la neplată"],
    accent: "#f5851f",
  },
  {
    num: "04",
    title: "Cesiune de creanțe",
    icon: "",
    desc: "Clientul cesionează către Uzinex creanțele pe care le are de încasat de la proprii clienți, în valoare echivalentă cu soldul rămas din creditul furnizor. Se notifică debitorul cedat.",
    details: ["Notificare debitor cedat", "Valoare echivalentă soldului restant", "Mecanism sigur pentru sume mari"],
    accent: "#155290",
  },
  {
    num: "05",
    title: "Garanție personală administrator",
    icon: "",
    desc: "Administratorul sau asociatul majoritar semnează un angajament personal de plată (fidejusiune) prin care garantează solidar cu societatea obligațiile din contractul de credit furnizor.",
    details: ["Fidejusiune personală solidară", "Semnată de administrator/asociat", "Complementară altor garanții"],
    accent: "#0a4d96",
  },
  {
    num: "06",
    title: "Ipotecă mobiliară",
    icon: "",
    desc: "Ipotecă constituită asupra echipamentului industrial livrat, cu înscriere la Cartea Funciară sau AEGRM. Oferă drept de preferință la executare și se aplică de regulă pentru echipamente cu valoare mare (peste €50.000).",
    details: ["Drept de preferință la executare", "Înscriere în registrele publice", "Recomandat pentru valori > €50.000"],
    accent: "#004990",
  },
  {
    num: "07",
    title: "Scrisoare de garanție bancară",
    icon: "",
    desc: "Banca clientului emite o scrisoare de garanție irevocabilă și necondiționată în favoarea Uzinex, acoperind valoarea integrală sau parțială a creditului furnizor. Cea mai puternică garanție posibilă.",
    details: ["Irevocabilă și necondiționată", "Emisă de banca clientului", "Acoperire integrală sau parțială"],
    accent: "#2d7d46",
  },
];

const STEPS = [
  { num: "01", title: "Comanda fermă", desc: "Semnezi contractul de achiziție + anexa de credit furnizor cu graficul de plată agreat." },
  { num: "02", title: "Constituire garanții", desc: "Emiți garanțiile agreate (BO-uri, CEC-uri, gaj, etc.) conform contractului." },
  { num: "03", title: "Avans (dacă e cazul)", desc: "Plătești avansul stabilit (0-30%). Uzinex comandă/pregătește echipamentul." },
  { num: "04", title: "Livrare & instalare", desc: "Echipamentul e livrat, instalat, pus în funcțiune. Prima rată la 30 zile." },
  { num: "05", title: "Plata ratelor", desc: "Plătești conform graficului. Garanțiile se eliberează progresiv la fiecare rată achitată." },
];

const ADVANTAGES = [
  { title: "Decizie rapidă", desc: "Evaluarea e internă, nu trece prin comitete bancare. Dacă te califici, primești răspuns în 1-3 zile lucrătoare." },
  { title: "Fără CIP/BNR", desc: "Creditul furnizor nu se raportează la Centrala Riscului de Credit. Nu îți afectează scoring-ul bancar." },
  { title: "Costuri transparente", desc: "Dobânda e fixă, stabilită la semnare. Rata include totul — fără comisioane ascunse sau variabile." },
  { title: "Livrare la semnare", desc: "Echipamentul se comandă imediat ce contractul e semnat și garanțiile constituite. Nu aștepți banca." },
  { title: "Garanții structurate", desc: "7 tipuri de garanții combinabile. Structura se adaptează la profilul tău — nu e o formulă unică." },
  { title: "Evaluare serioasă", desc: "Analizăm bilanțul, datoriile și capacitatea reală de plată. Aprobăm doar clienții care pot susține ratele." },
];

const FAQ = [
  { q: "Ce se întâmplă dacă nu pot plăti o rată la timp?", a: "Te contactăm proactiv cu 7 zile înainte de scadență. Dacă ai o situație temporară, putem discuta restructurarea. Dacă rata rămâne neplătită, se execută garanția aferentă (BO sau CEC la scadență) conform contractului. Neplata repetată duce la rezilierea contractului și recuperarea echipamentului." },
  { q: "Pot plăti anticipat fără penalități?", a: "Da. Plata anticipată totală sau parțială se face fără penalități. Garanțiile corespunzătoare se eliberează imediat." },
  { q: "Cât este dobânda?", a: "Dobânda este fixă pe toată durata contractului, stabilită la momentul evaluării. Nivelul depinde de valoarea comenzii, durata eșalonării, garanțiile oferite și profilul financiar al companiei. Nu există dobândă 0% — costul finanțării este real și transparent." },
  { q: "Ce valoare maximă pot finanța prin credit furnizor?", a: "Depinde de garanțiile oferite și capacitatea de plată demonstrată. Orientativ, finanțăm prin credit furnizor comenzi de până la €100.000. Pentru sume mai mari, recomandăm leasing bancar sau structuri mixte." },
  { q: "Cine se califică și cine nu?", a: "Se califică companiile cu minim 1 an de activitate, bilanțul depus, fără datorii restante semnificative și cu capacitate demonstrabilă de a susține ratele lunare. Nu acordăm credit furnizor start-up-urilor fără istoric, companiilor cu datorii mari la buget sau celor care nu pot constitui garanțiile minime." },
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

/* ─────── GUARANTEE ANIMATION ─────── */
function GuaranteeShield() {
  return (
    <div className="bg-[#0a0e14] p-6 lg:p-8 border border-white/10">
      <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-5">
        Structură garanții — model tipic
      </div>
      <div className="relative flex items-center justify-center py-8">
        {/* Central shield */}
        <motion.div
          className="relative z-10 w-20 h-24 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 60 72" fill="none" className="w-full h-full">
            <motion.path
              d="M30 4L6 16v20c0 16 10 27 24 30 14-3 24-14 24-30V16L30 4z"
              fill="rgba(30,107,184,0.15)"
              stroke="#1e6bb8"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            />
            <motion.path
              d="M22 36l6 6 12-14"
              stroke="#f5851f"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 0, 1, 1] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, 0.3, 0.45, 1] }}
            />
          </svg>
        </motion.div>

        {/* Orbiting guarantee types */}
        {["BO", "Gaj", "CEC", "Cesiune", "SGB"].map((g, i) => {
          const angle = (i * 72 - 90) * (Math.PI / 180);
          const r = 70;
          return (
            <motion.div
              key={g}
              className="absolute text-[8px] mono text-white/60 border border-white/15 px-2 py-1 bg-[#0a0e14]"
              style={{ left: `calc(50% + ${Math.cos(angle) * r}px - 20px)`, top: `calc(50% + ${Math.sin(angle) * r}px - 10px)` }}
              animate={{ opacity: [0.3, 0.3, 1, 1, 0.3], scale: [0.9, 0.9, 1.05, 1, 0.9] }}
              transition={{ duration: 6, repeat: Infinity, times: [0, i * 0.12, i * 0.12 + 0.1, 0.8, 1], delay: i * 0.3 }}
            >
              {g}
            </motion.div>
          );
        })}
      </div>
      <div className="text-center text-[9px] mono text-white/40 mt-2">
        Combinație flexibilă adaptată profilului clientului
      </div>
    </div>
  );
}

/* ─────── PAGE ─────── */
export default function CreditFurnizorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [stepCycle, setStepCycle] = useState(0);

  useEffect(() => {
    setActiveStep(-1);
    const timers = STEPS.map((_, i) => setTimeout(() => setActiveStep(i), 600 + i * 1100));
    timers.push(setTimeout(() => setStepCycle((c) => c + 1), 9000));
    return () => timers.forEach(clearTimeout);
  }, [stepCycle]);

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
                <span className="text-ink-700">Credit furnizor</span>
              </nav>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-7">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                    Finanțare directă de la Uzinex
                  </div>
                  <h1 className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                    Credit furnizor{" "}
                    <span className="font-light italic text-uzx-orange">direct de la Uzinex.</span>
                  </h1>
                  <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                    Achiziționezi echipamentul în rate direct de la noi, fără intermediar bancar. Procesul de calificare este riguros — analizăm bilanțul, capacitatea de plată, istoricul comercial și garanțiile oferite. Nu acordăm finanțare oricui, dar clienților care se califică le oferim condiții corecte și decizie rapidă.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:col-start-9">
                  <div className="grid grid-cols-2 gap-3">
                    {CONDITIONS.map((c, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }} className="bg-white border hairline p-4">
                        <div className="serif text-2xl text-uzx-blue num" style={{ letterSpacing: "-0.02em" }}>{c.value}</div>
                        <div className="text-[10px] mono text-ink-500 uppercase tracking-wider mt-1">{c.label}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── WHAT IS IT ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Ce este</div>
                <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                  Plătești în rate,<br /><span className="font-light text-uzx-orange">direct la noi.</span>
                </h2>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-ink-600 leading-relaxed mb-5">
                  Creditul furnizor este o formă de finanțare comercială în care Uzinex, în calitate de furnizor, îți acordă un termen de plată eșalonat pentru echipamentele achiziționate. Plata se face pe o perioadă de 3 până la 18 de luni, cu dobândă fixă stabilită în funcție de risc.
                </p>
                <p className="text-ink-600 leading-relaxed mb-5">
                  Spre deosebire de creditul bancar, relația contractuală este exclusiv între tine și Uzinex — fără intermediar financiar și fără raportare la CIP/BNR. Dar asta nu înseamnă că procesul e superficial.
                </p>
                <p className="text-ink-600 leading-relaxed">
                  <strong className="text-ink-900">Calificarea este riguroasă.</strong> Analizăm ultimele 2 bilanțuri, datoriile curente, capacitatea reală de plată a ratelor și garanțiile pe care le poți constitui. Clienții cu istoric comercial la Uzinex și profil financiar solid beneficiază de condiții preferențiale. Ceilalți sunt redirecționați către soluțiile de leasing bancar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───── GUARANTEES ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Garanții acceptate</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-6" style={{ letterSpacing: "-0.03em" }}>
                    7 tipuri de garanții<br /><span className="font-light text-uzx-orange">combinabile flexibil.</span>
                  </h2>
                  <p className="text-ink-600 leading-relaxed mb-8">
                    Nu cerem o singură garanție rigidă. Combinăm mai multe instrumente în funcție de valoarea comenzii, profilul companiei tale și istoricul relației comerciale.
                  </p>
                  <GuaranteeShield />
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="space-y-4">
                    {GUARANTEES.map((g, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06, duration: 0.35 }}
                        className="bg-white border hairline p-5 lg:p-6"
                        style={{ borderLeftWidth: 3, borderLeftColor: g.accent }}
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-[10px] mono font-bold" style={{ color: g.accent }}>{g.num}</span>
                              <h3 className="serif text-lg text-ink-900 leading-tight">{g.title}</h3>
                            </div>
                            <p className="text-sm text-ink-600 leading-relaxed mb-3">{g.desc}</p>
                            <ul className="flex flex-wrap gap-2">
                              {g.details.map((d, j) => (
                                <li key={j} className="text-[10px] mono border hairline px-2 py-0.5 text-ink-600">{d}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── PROCESS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Proces</div>
              <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-12" style={{ letterSpacing: "-0.03em" }}>
                De la comandă la prima rată<br /><span className="font-light text-uzx-orange">în 5 pași simpli.</span>
              </h2>

              <div className="bg-[#0a0e14] p-6 lg:p-10 border border-white/10">
                <div className="text-[9px] mono text-white/40 uppercase tracking-widest mb-6">Flux credit furnizor</div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative">
                  <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-px bg-white/10" />
                  <motion.div className="hidden md:block absolute top-5 left-[10%] h-px bg-uzx-orange origin-left" style={{ right: "10%" }} animate={{ scaleX: STEPS.length > 0 ? Math.min(1, (activeStep + 1) / STEPS.length) : 0 }} transition={{ duration: 0.6 }} />
                  {STEPS.map((s, i) => {
                    const done = i <= activeStep;
                    return (
                      <div key={i} className="flex flex-col items-center text-center relative z-10">
                        <motion.div className="w-10 h-10 border flex items-center justify-center mb-3" style={{ borderColor: done ? "#f5851f" : "rgba(255,255,255,0.15)", background: done ? "rgba(245,133,31,0.15)" : "transparent" }} animate={i === activeStep ? { scale: [1, 1.15, 1] } : {}} transition={{ duration: 0.3 }}>
                          {done ? <svg viewBox="0 0 24 24" fill="none" stroke="#f5851f" strokeWidth="3" className="w-4 h-4"><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg> : <span className="text-[10px] mono text-white/25">{s.num}</span>}
                        </motion.div>
                        <div className={`text-[10px] mono uppercase tracking-wider mb-1.5 ${done ? "text-uzx-orange" : "text-white/30"}`}>{s.title}</div>
                        <p className={`text-[9px] leading-relaxed max-w-[150px] ${done ? "text-white/70" : "text-white/20"}`}>{s.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <motion.div className="mt-6 text-center" animate={{ opacity: activeStep >= STEPS.length - 1 ? 1 : 0 }} transition={{ duration: 0.5 }}>
                  <span className="text-[10px] mono text-uzx-orange font-bold uppercase tracking-wider">✓ Garanțiile se eliberează progresiv la fiecare rată achitată</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── ADVANTAGES vs BANK ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Avantaje</div>
              <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-12" style={{ letterSpacing: "-0.03em" }}>
                De ce credit furnizor<br /><span className="font-light text-uzx-orange">în loc de credit bancar.</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200 border-y border-ink-200">
                {ADVANTAGES.map((a, i) => (
                  <div key={i} className="bg-white p-8">
                    <div className="text-[11px] mono text-uzx-blue mb-4">— {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="serif text-lg text-ink-900 mb-3 leading-tight">{a.title}</h3>
                    <p className="text-sm text-ink-600 leading-relaxed">{a.desc}</p>
                  </div>
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
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num"><AnimCounter target={200} suffix="+" /></div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Contracte credit furnizor</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num">1-3 zile</div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Decizie de aprobare</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num">Fixă</div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Dobândă transparentă</div>
              </div>
              <div className="py-4 px-4 lg:px-8">
                <div className="serif text-4xl lg:text-5xl text-uzx-blue num"><AnimCounter target={7} /></div>
                <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">Tipuri garanții acceptate</div>
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
                <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>Despre creditul furnizor.</h2>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="divide-y hairline">
                  {FAQ.map((item, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i}>
                        <button type="button" onClick={() => setOpenFaq(isOpen ? null : i)} className="w-full flex items-center justify-between py-5 text-left group">
                          <span className="serif text-base lg:text-lg text-ink-900 leading-tight pr-4 group-hover:text-uzx-blue transition">{item.q}</span>
                          <span className="text-xl text-ink-400 shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                              <p className="text-sm text-ink-600 leading-relaxed pb-5">{item.a}</p>
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
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: "radial-gradient(ellipse 80% 80% at 20% 50%, #1e6bb8 0%, transparent 60%)" }} />
          <div className="container-x relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h2 className="serif text-3xl md:text-4xl leading-[0.95] mb-4" style={{ letterSpacing: "-0.03em" }}>
                  Verifică dacă te califici<br /><span className="font-light text-uzx-orange">pentru credit furnizor.</span>
                </h2>
                <p className="text-white/70 leading-relaxed">
                  Spune-ne ce echipament te interesează, trimite-ne ultimul bilanț și primești o evaluare preliminară în 1-3 zile lucrătoare: dacă te califici, ce avans e necesar, structura ratelor și garanțiile solicitate.
                </p>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
                <a href="/#contact" className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-6 py-4 transition flex items-center justify-center gap-3 group font-medium">
                  Solicită evaluare preliminară <span className="group-hover:translate-x-1 transition">→</span>
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
