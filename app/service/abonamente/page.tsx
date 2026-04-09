import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceSubscriptions } from "@/components/ServiceSubscriptions";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Abonamente Service — Uzinex",
  description:
    "Contracte de mentenanță preventivă Uzinex cu SLA garantat: costuri previzibile, intervenție sub 24 de ore, rapoarte tehnice lunare și piese originale OEM incluse.",
};

export default function ServiceAbonamentePage() {
  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* HEADER */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-ink-400 mb-6">
                <Link href="/" className="hover:text-uzx-blue transition">
                  Acasă
                </Link>
                <span className="text-ink-300">/</span>
                <Link href="/service" className="hover:text-uzx-blue transition">
                  Service
                </Link>
                <span className="text-ink-300">/</span>
                <span className="text-ink-700">Abonamente</span>
              </nav>
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                02 / Mentenanță preventivă
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Abonamente Service{" "}
                <span className="font-light italic text-uzx-orange">
                  cu SLA garantat.
                </span>
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                Costuri previzibile, zero surprize. Alege dintre trei niveluri
                de abonament — Esențial, Avansat sau Premium — în funcție de
                criticitatea echipamentelor și dimensiunea flotei tale. Toate
                contractele includ intervenție rapidă, rapoarte tehnice și
                piese originale OEM.
              </p>
            </div>
          </div>
        </section>

        {/* SLA strip */}
        <section className="border-b hairline py-14 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
                <div className="py-4 px-4 lg:px-8">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    60
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Luni garanție standard
                  </div>
                </div>
                <div className="py-4 px-4 lg:px-8">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    24h
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Intervenție fizică națională
                  </div>
                </div>
                <div className="py-4 px-4 lg:px-8">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    30 min
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Răspuns la tichet
                  </div>
                </div>
                <div className="py-4 px-4 lg:px-8">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    100%
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Piese originale OEM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ServiceSubscriptions />

        {/* Details section */}
        <section className="border-b hairline py-16 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  — Abordarea noastră
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Un singur partener
                  <br />
                  <span className="font-light text-uzx-orange">
                    pentru tot ciclul de viață.
                  </span>
                </h2>
                <p className="text-ink-500 leading-relaxed">
                  Uzinex nu este doar un furnizor de echipamente — suntem
                  integrator industrial complet. Asta înseamnă că îți preluăm
                  proiectul din faza de analiză tehnică și te însoțim până la
                  scoaterea din uz a echipamentului, cu aceeași echipă, aceleași
                  standarde și aceeași responsabilitate.
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
                  {[
                    {
                      num: "01",
                      title: "Punere în funcțiune",
                      body: "Instalare, configurare, teste SAT, integrare cu infrastructura existentă și training inițial al operatorilor.",
                    },
                    {
                      num: "02",
                      title: "Mentenanță preventivă",
                      body: "Planuri personalizate de revizie, verificare periodică, înlocuire componente consumabile și rapoarte tehnice.",
                    },
                    {
                      num: "03",
                      title: "Intervenții rapide",
                      body: "Diagnoză remote 24/7, deplasare la fața locului sub 24 de ore, reparații în garanție și post-garanție.",
                    },
                    {
                      num: "04",
                      title: "Upgrade & retrofitting",
                      body: "Modernizarea echipamentelor existente cu componente noi, actualizări software și extinderi de funcționalitate.",
                    },
                  ].map((s) => (
                    <div key={s.num} className="bg-white p-8">
                      <div className="text-[11px] mono text-ink-400 mb-4">
                        {s.num}
                      </div>
                      <h3
                        className="serif text-lg text-ink-900 mb-3 leading-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-sm text-ink-500 leading-relaxed">
                        {s.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SATISFACTION dark section */}
        <section
          className="border-b py-16 lg:py-24 text-white relative overflow-hidden"
          style={{
            background: "#082545",
            borderColor: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 90% 80% at 20% 40%, rgba(30,107,184,0.5) 0%, rgba(8,37,69,0) 60%)",
            }}
          />
          <div className="container-x relative z-10">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-6">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  — Satisfacția ta
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Singurul standard
                  <br />
                  <span className="font-light text-uzx-orange">
                    care contează cu adevărat.
                  </span>
                </h2>
                <p className="text-ink-200 leading-relaxed mb-5">
                  Vrem să beneficiezi de service-ul Uzinex la cel mai înalt
                  standard. Suntem ferm convinși că îți putem câștiga încrederea
                  doar ascultându-te cu atenție, înțelegându-ți cerințele și
                  îndeplinindu-le cu fiabilitate absolută.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-6">
                  <div className="border border-white/15 p-5">
                    <div
                      className="serif text-5xl text-uzx-orange num"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      97%
                    </div>
                    <div className="text-[11px] mono text-white/60 uppercase tracking-widest mt-2">
                      Satisfacție clienți
                    </div>
                  </div>
                  <div className="border border-white/15 p-5">
                    <div
                      className="serif text-5xl text-uzx-orange num"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      100+
                    </div>
                    <div className="text-[11px] mono text-white/60 uppercase tracking-widest mt-2">
                      Companii partenere
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 lg:col-start-8">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-5 mono">
                  — Simply Efficient
                </div>
                <p className="text-ink-200 leading-relaxed mb-8">
                  Atributele de performanță reprezintă reperul eficienței
                  economice. Ca orice produs Uzinex, service-ul pe care ți-l
                  oferim este construit pe cinci principii fundamentale.
                </p>

                <div className="space-y-px bg-white/10 border-y border-white/10">
                  {[
                    { word: "Simply safe", desc: "Conformitate totală cu standardele de siguranță." },
                    { word: "Simply easy", desc: "Procese clare, comunicare directă, decizii rapide." },
                    { word: "Simply powerful", desc: "Tehnicieni cu experiență, instrumente de top." },
                    { word: "Simply connected", desc: "Digital end-to-end, fără hârtie inutilă." },
                    { word: "Simply flexible", desc: "Pachete adaptate exact nevoilor tale." },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="bg-transparent py-4 px-5 flex items-baseline gap-4"
                    >
                      <div
                        className="serif text-lg text-white shrink-0"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {s.word}
                      </div>
                      <div className="text-xs text-white/60 leading-relaxed">
                        {s.desc}
                      </div>
                    </div>
                  ))}
                </div>
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
