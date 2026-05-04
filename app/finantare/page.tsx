import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";
import { InstrumentAnimation } from "./animations";

export const metadata: Metadata = {
  title:
    "Finanțare echipamente industriale · credite, leasing, fonduri UE și credit furnizor — Uzinex",
  description:
    "Trei instrumente de finanțare pentru echipamente industriale: credite și leasing prin 10 parteneri financiari, fonduri europene și guvernamentale prin 12 programe, sau credit furnizor direct cu 7 tipuri de garanții. Dosar tehnic pregătit de Uzinex inclus.",
  keywords: [
    "finantare echipamente industriale",
    "leasing utilaje industriale",
    "credit echipamente productie",
    "fonduri europene utilaje PNRR",
    "credit furnizor echipamente",
    "GRENKE leasing",
    "BT Leasing",
    "Horizon Europe utilaje",
    "Fondul Modernizare echipamente",
    "Industria Prelucratoare 447M",
  ],
  alternates: { canonical: "/finantare" },
  openGraph: {
    title: "Finanțare echipamente · trei instrumente · Uzinex",
    description:
      "Credite și leasing prin 10 parteneri, 12 programe UE și guvernamentale, plus credit furnizor direct. Dosar tehnic pregătit de noi.",
    url: "/finantare",
    type: "website",
    locale: "ro_RO",
  },
};

const INSTRUMENTS: Array<{
  href: string;
  eyebrow: string;
  title: string;
  intro: string;
  stats: Array<{ value: string; label: string }>;
  bullets: string[];
  cta: string;
  fit: string;
}> = [
  {
    href: "/finantare/credite-leasing",
    eyebrow: "01 · Standard",
    title: "Credite & leasing",
    intro:
      "Cea mai rapidă cale către echipament când vrei rate fixe predictibile și nu vrei să blochezi capital de lucru. 10 parteneri financiari acoperă toate categoriile de utilaje, de la 5.000 € la peste 1.000.000 €.",
    stats: [
      { value: "0%", label: "Avans minim" },
      { value: "48h", label: "Aprobare" },
      { value: "10", label: "Parteneri" },
    ],
    bullets: [
      "GRENKE, BT Leasing, BRD, Garanti, UniCredit, BCR, OTP, Impuls, Autonom",
      "Rate fixe pe 24, 36, 48 sau 60 luni",
      "Documentație 1 pagină plus ultimele 2 bilanțuri",
      "Proforma și specificațiile tehnice pregătite de Uzinex",
    ],
    cta: "Vezi cele 10 parteneriate",
    fit: "Pentru companii cu cifră de afaceri stabilă care vor să intre în posesia utilajului acum, fără proces lung de eligibilitate.",
  },
  {
    href: "/finantare/europeana-guvernamentala",
    eyebrow: "02 · Nerambursabil",
    title: "Finanțare europeană & guvernamentală",
    intro:
      "Până la 100% intensitate pentru proiecte care se încadrează în liniile de finanțare deschise. Acoperim 12 programe active: Horizon Europe, PNRR, PoCIDIF, Industria Prelucrătoare cu plafon de 447M€, Fondul Modernizare, E-MOBILITY RO și altele.",
    stats: [
      { value: "12", label: "Programe active" },
      { value: "30–100%", label: "Intensitate ajutor" },
      { value: "447M€", label: "Plafon Industria Prelucr." },
    ],
    bullets: [
      "Dosar tehnic complet (specificații, oferte, plan implementare)",
      "Lucrăm cu consultanți acreditați pentru întocmirea cererii",
      "Acoperim atât IMM cât și întreprinderi mari",
      "Eligibilitate verificată pe sector CAEN și locație",
    ],
    cta: "Vezi cele 12 programe disponibile",
    fit: "Pentru proiecte care pot aștepta 4–9 luni cu evaluarea cererii și pentru companii eligibile pe scheme deschise.",
  },
  {
    href: "/finantare/credit-furnizor",
    eyebrow: "03 · Direct cu Uzinex",
    title: "Credit furnizor",
    intro:
      "Plătești echipamentul direct nouă, în rate, cu termen de la 12 până la 60 luni, garantat printr-unul din cele 7 instrumente acceptate. Pentru clienți cu istoric solid, e cea mai rapidă cale fără intermediar financiar.",
    stats: [
      { value: "12–60", label: "Luni rambursare" },
      { value: "7", label: "Tipuri garanții" },
      { value: "0", label: "Intermediari" },
    ],
    bullets: [
      "Bilet la ordin avalizat, gaj, CEC, cesiune, fidejusiune, ipotecă mobiliară, SGB",
      "Decizia de creditare se ia intern, fără bancă terță",
      "Eligibilitate riguroasă pe baza istoricului comercial",
      "Termen contract maxim 60 luni cu rate negociabile",
    ],
    cta: "Vezi tipurile de garanții acceptate",
    fit: "Pentru clienți Uzinex existenți cu istoric comercial bun și pentru proiecte unde rapiditatea decizională e mai importantă decât dobânda minimă.",
  },
];

const COMPARE_ROWS: Array<[string, string, string, string]> = [
  ["Cine aprobă", "Partener financiar", "Comisie evaluare program", "Uzinex direct"],
  ["Timp până la decizie", "≈ 48 ore", "4–9 luni", "5–10 zile lucrătoare"],
  ["Avans necesar", "0%", "Variabil pe program", "Negociabil"],
  ["Documentație", "Standardă · 1 pagină", "Complexă · plan + buget", "Comercială + garanții"],
  ["Cost total", "Dobândă piață", "Doar partea contributivă", "Dobândă negociată"],
  ["Risc respingere", "Scăzut", "Mediu–ridicat", "Scăzut pentru clienți existenți"],
];

const FAQ: Array<{ question: string; answer: string }> = [
  {
    question:
      "Care instrument se potrivește cel mai bine pentru o investiție de 50.000 € într-un utilaj nou?",
    answer:
      "Pentru o sumă de acest ordin, recomandarea standard este leasing-ul prin parteneri precum GRENKE sau BT Leasing, deoarece aprobarea durează 48 de ore, avansul poate fi 0%, iar contractul se semnează direct online sau la sediu. Dacă proiectul este parte dintr-o investiție mai mare cu componentă de digitalizare sau eficiență energetică, merită verificată eligibilitatea pe Industria Prelucrătoare sau Fondul Modernizare.",
  },
  {
    question:
      "Ce înseamnă concret că Uzinex pregătește dosarul tehnic pentru fondurile europene?",
    answer:
      "Pentru o cerere validă pe Horizon, PNRR, PoCIDIF sau alte programe, dosarul are nevoie de specificații tehnice detaliate ale utilajelor, plan de implementare cu termene și milestones, justificare tehnică a alegerii echipamentului, și buget defalcat pe categorii eligibile. Toate acestea le pregătim noi pe baza ofertei comerciale, iar consultantul acreditat le integrează în formatul cerut de program.",
  },
  {
    question: "Pot combina mai multe instrumente pentru același proiect?",
    answer:
      "Da, în multe cazuri. Combinația tipică este finanțare europeană pe partea nerambursabilă (de exemplu 50% intensitate ajutor) plus leasing pe contribuția proprie. Pentru proiecte cu termen scurt, alternativa este credit furnizor pe contribuția proprie, decuplat de durata procesării cererii UE. Verificăm compatibilitatea pe fiecare program în parte.",
  },
  {
    question: "Cât de rigide sunt criteriile de eligibilitate pentru credit furnizor direct?",
    answer:
      "Credit furnizor este destinat clienților cu istoric comercial cu Uzinex, cu cifră de afaceri stabilă în ultimele 2-3 exerciții și fără incidente bancare majore. Acceptăm 7 tipuri de instrumente de garanție, iar combinația concretă se negociază în funcție de suma finanțată și de profilul clientului. Pentru clienți noi, procesul este mai rapid prin leasing standard.",
  },
  {
    question: "Există restricții pe categoria de echipament pentru fondurile UE?",
    answer:
      "Fiecare program are o listă de coduri CAEN și o listă de tipuri de active eligibile. Echipamentele de producție industrială, automatizările, robotizarea, sistemele de eficiență energetică și utilajele cu impact pe digitalizare sunt eligibile pe majoritatea programelor active. Echipamentele de transport, mobilier și componente IT generale au eligibilitate variabilă. Verificarea o facem pe baza ofertei concrete.",
  },
];

export default function FinantareHubPage() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Finanțare", url: "/finantare" },
  ]);
  const faq = faqSchema(FAQ);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />

      <Header solid />

      <main className="bg-white">
        {/* HERO */}
        <section
          className="border-b text-white relative overflow-hidden"
          style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 80% 40%, rgba(245,133,31,0.18) 0%, transparent 60%)",
            }}
          />
          <div className="container-x py-10 lg:py-20 relative z-10">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-white/70 mb-5">
              Finanțare echipamente industriale · 2026
            </div>
            <h1
              className="serif text-3xl md:text-4xl lg:text-5xl text-white leading-[0.95] mb-6 max-w-4xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              Trei instrumente complementare<br />
              <span className="font-light text-uzx-orange">
                pentru echipamente industriale între 5.000 € și milioane.
              </span>
            </h1>
            <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-3xl">
              Indiferent dacă proiectul tău cere decizie rapidă, intensitate maximă
              de ajutor nerambursabil sau o relație directă cu furnizorul,
              instrumentele acoperă toate cazurile. Dosarul tehnic îl pregătim noi.
              Specificațiile, proforma, planul de implementare și justificările
              tehnice intră în pachet, indiferent de partener.
            </p>

            <div className="grid grid-cols-3 gap-3 lg:gap-6 mt-10 max-w-2xl">
              <HeroStat value="10" label="Parteneri credite & leasing" />
              <HeroStat value="12" label="Programe UE & guvernamentale" />
              <HeroStat value="7" label="Tipuri garanții credit furnizor" />
            </div>
          </div>
        </section>

        {/* INSTRUMENTS */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              Cele trei instrumente
            </div>
            <h2
              className="serif text-2xl lg:text-4xl text-ink-900 leading-tight max-w-3xl mb-10 lg:mb-14"
              style={{ letterSpacing: "-0.02em" }}
            >
              Alege drumul care se potrivește cel mai bine timpului și profilului
              proiectului tău.
            </h2>

            <div className="space-y-6 lg:space-y-8">
              {INSTRUMENTS.map((it, i) => (
                <Link
                  key={it.href}
                  href={it.href}
                  className="group block border hairline bg-white hover:border-uzx-orange transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    <div className="lg:col-span-7 p-6 lg:p-8 lg:border-r hairline">
                      <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                        {it.eyebrow}
                      </div>
                      <h3
                        className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-4"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {it.title}
                      </h3>
                      <p className="text-sm lg:text-base text-ink-600 leading-relaxed mb-5">
                        {it.intro}
                      </p>
                      <ul className="space-y-1.5 mb-5">
                        {it.bullets.map((b) => (
                          <li
                            key={b}
                            className="text-sm text-ink-700 flex gap-2 leading-snug"
                          >
                            <span className="text-uzx-orange shrink-0 mt-[2px]">—</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t hairline pt-4 mt-4">
                        <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1.5">
                          Cui i se potrivește
                        </div>
                        <p className="text-sm text-ink-700 leading-relaxed">
                          {it.fit}
                        </p>
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-6 lg:p-8 bg-ink-50 flex flex-col">
                      <div className="grid grid-cols-3 gap-4 mb-5">
                        {it.stats.map((s) => (
                          <div key={s.label}>
                            <div
                              className="serif text-xl lg:text-2xl text-ink-900 num leading-none"
                              style={{ letterSpacing: "-0.02em" }}
                            >
                              {s.value}
                            </div>
                            <div className="text-[9px] lg:text-[10px] mono uppercase tracking-wider text-ink-500 mt-2 leading-snug">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white border hairline mb-5">
                        <InstrumentAnimation index={i} />
                      </div>
                      <div className="mt-auto inline-flex items-center gap-2 text-sm text-uzx-blue group-hover:text-uzx-orange transition font-medium">
                        {it.cta}
                        <span className="group-hover:translate-x-1 transition">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* COMPARISON */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              Comparație rapidă
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              Care e diferența concretă între cele trei.
            </h2>

            <div className="overflow-x-auto -mx-4 lg:mx-0 px-4 lg:px-0">
              <table className="w-full border-collapse text-sm bg-white border hairline min-w-[640px]">
                <thead>
                  <tr className="border-b hairline">
                    <th className="text-left p-4 text-[10px] mono uppercase tracking-widest text-ink-400 bg-ink-50">
                      Criteriu
                    </th>
                    <th className="text-left p-4 text-[10px] mono uppercase tracking-widest text-uzx-orange">
                      Credite & leasing
                    </th>
                    <th className="text-left p-4 text-[10px] mono uppercase tracking-widest text-uzx-orange">
                      Fonduri UE
                    </th>
                    <th className="text-left p-4 text-[10px] mono uppercase tracking-widest text-uzx-orange">
                      Credit furnizor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row[0]} className="border-b hairline">
                      <td className="p-4 text-xs lg:text-sm text-ink-500 bg-ink-50/50 font-medium">
                        {row[0]}
                      </td>
                      <td className="p-4 text-xs lg:text-sm text-ink-900">
                        {row[1]}
                      </td>
                      <td className="p-4 text-xs lg:text-sm text-ink-900">
                        {row[2]}
                      </td>
                      <td className="p-4 text-xs lg:text-sm text-ink-900">
                        {row[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-ink-500 mt-4 leading-relaxed italic max-w-3xl">
              Estimări orientative pe baza experienței noastre cu cele trei
              instrumente. Detaliile se confirmă în funcție de partenerul concret,
              programul activ în acel moment și profilul clientului.
            </p>
          </div>
        </section>

        {/* DECISION HELPER */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              Cum alegi
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl mb-10"
              style={{ letterSpacing: "-0.02em" }}
            >
              Trei întrebări care decid de obicei pe ce drum mergi.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <DecisionCard
                num="01"
                question="Cât de repede vrei utilajul în fabrică?"
                answers={[
                  "≤ 1 lună · credite și leasing sau credit furnizor",
                  "1–3 luni · oricare dintre cele trei, în funcție de profil",
                  "Pot aștepta 6+ luni · adăugăm fonduri UE pe componenta nerambursabilă",
                ]}
              />
              <DecisionCard
                num="02"
                question="Cât de mult contează costul total minim?"
                answers={[
                  "Critic · fonduri UE cu intensitate 50–100% nerambursabil",
                  "Important · leasing cu rate fixe + componentă UE pe contribuție proprie",
                  "Secundar · credit furnizor cu rapiditate decizională",
                ]}
              />
              <DecisionCard
                num="03"
                question="Cât de complex e profilul tău financiar?"
                answers={[
                  "IMM standard · leasing prin parteneri sau fonduri UE",
                  "Întreprindere mare cu istoric · oricare dintre cele trei",
                  "Companie nouă · leasing cu fidejusiune sau credit furnizor cu garanții",
                ]}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              Întrebări frecvente
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl mb-8"
              style={{ letterSpacing: "-0.02em" }}
            >
              Răspunsuri la întrebările pe care le primim cel mai des.
            </h2>

            <div className="max-w-4xl divide-y hairline border-y hairline bg-white">
              {FAQ.map((q, i) => (
                <details key={i} className="group py-5 lg:py-6 px-5 lg:px-6">
                  <summary className="flex items-start justify-between gap-4 cursor-pointer">
                    <h3
                      className="serif text-base lg:text-xl text-ink-900 leading-snug pr-4"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {q.question}
                    </h3>
                    <span className="serif text-uzx-orange text-2xl leading-none shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="text-sm lg:text-base text-ink-600 leading-relaxed mt-4 pr-8">
                    {q.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="border-b hairline py-14 lg:py-20"
          style={{ background: "#0d1828" }}
        >
          <div className="container-x text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-4">
                  Următorul pas · dimensionare financiară
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Trimite-ne specificațiile<br />
                  <span className="font-light text-uzx-orange">
                    și-ți spunem ce instrument se potrivește.
                  </span>
                </h2>
                <p className="text-white/85 leading-relaxed mt-6 max-w-xl">
                  Pe baza valorii investiției, profilului companiei și termenului
                  proiectului, recomandăm instrumentul cu raport optim între cost
                  total, timp până la decizie și risc de respingere. Răspunsul
                  inițial vine în 24-48 ore.
                </p>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-3">
                <a
                  href="tel:+40769081081"
                  className="bg-white hover:bg-ink-50 text-uzx-blue text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition serif text-lg"
                >
                  (+40) 769 081 081
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <Link
                  href="/contact?subject=Finan%C8%9Bare%20echipamente&context=Hub%20finan%C8%9Bare"
                  className="border border-white/30 hover:border-white text-white text-sm px-7 py-4 inline-flex items-center justify-between gap-3 group transition"
                >
                  Solicit dimensionare financiară
                  <span className="group-hover:translate-x-1 transition">→</span>
                </Link>
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

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div
        className="serif text-2xl lg:text-4xl text-white num leading-none"
        style={{ letterSpacing: "-0.02em" }}
      >
        {value}
      </div>
      <div className="text-[9px] lg:text-[10px] mono uppercase tracking-wider text-white/60 mt-2">
        {label}
      </div>
    </div>
  );
}

function DecisionCard({
  num,
  question,
  answers,
}: {
  num: string;
  question: string;
  answers: string[];
}) {
  return (
    <div className="border hairline bg-white p-6 lg:p-7 flex flex-col h-full">
      <div className="serif text-3xl text-uzx-orange mb-4 num leading-none">
        {num}
      </div>
      <h3
        className="serif text-base lg:text-lg text-ink-900 leading-snug mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        {question}
      </h3>
      <ul className="space-y-2.5 text-sm text-ink-600 leading-relaxed">
        {answers.map((a) => (
          <li key={a} className="flex gap-2">
            <span className="text-uzx-orange shrink-0 mt-[2px]">→</span>
            <span>{a}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
