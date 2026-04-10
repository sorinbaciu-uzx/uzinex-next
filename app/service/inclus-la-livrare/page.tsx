import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ContactCTA } from "@/components/ContactCTA";
import { DiagnosisMockup } from "@/components/DiagnosisMockup";

export const metadata: Metadata = {
  title: "Service inclus la livrare — Uzinex",
  description:
    "Ce primești gratuit cu fiecare echipament livrat de Uzinex: punere în funcțiune, training operatori, garanție standard 60 luni, intervenție sub 24h, piese originale OEM, diagnoză colaborativă remote.",
};

const PROMISES = [
  {
    num: "01",
    title: "Disponibilitate",
    body: "Datorită rețelei naționale de service, echipa ta personală Uzinex — formată din manager regional, dispecer și tehnician — este mereu aproape de tine, prin toate canalele de comunicare. Telefon, email și aplicație mobilă, disponibile 24/7.",
  },
  {
    num: "02",
    title: "Fiabilitate",
    body: "Competența tehnică a echipei noastre, calitatea ridicată a pieselor originale OEM și parteneriatele internaționale cu producători de top garantează un service fără probleme și de succes pe termen lung.",
  },
  {
    num: "03",
    title: "Rapiditate",
    body: "Răspundem imediat la fiecare solicitare. Perioadele de inactivitate sunt reduse la minim datorită proceselor standardizate de reparație și întreținere, digitalizării complete și livrării next-day a pieselor de schimb.",
  },
  {
    num: "04",
    title: "Competență în consultanță",
    body: "Tehnicienii Uzinex văd mai mult. Cu o vedere antrenată la 360°, ei recunosc imediat unde și cum pot fi aduse îmbunătățiri în privința siguranței, eficienței și stării utilajelor sau spațiilor de depozitare.",
  },
];

const DIAGNOSIS_FEATURES = [
  {
    title: "Partajare ecran în timp real",
    body: "Tehnicianul de la fața locului partajează imediat camera, telemetria și parametrii utilajului cu experții remote.",
  },
  {
    title: "Intervenție în paralel",
    body: "Expertul de la birou poate efectua diagnoze, configurări sau patch-uri în paralel cu tehnicianul, fără a întrerupe fluxul.",
  },
  {
    title: "Acces la istoric complet",
    body: "Toate datele anterioare ale utilajului, manualele AI și istoricul de intervenții sunt disponibile instant pe tabletă.",
  },
  {
    title: "Comandă piese în timp real",
    body: "Dacă diagnoza identifică o piesă care trebuie înlocuită, comanda este lansată imediat pentru livrare next-day.",
  },
  {
    title: "Documentație automată",
    body: "Întreaga sesiune este înregistrată și transformată automat în raport tehnic pentru istoricul utilajului tău.",
  },
  {
    title: "Siguranță și control",
    body: "Conexiunile sunt criptate end-to-end, iar tehnicianul de la fața locului păstrează controlul total asupra echipamentului.",
  },
];

export default function ServiceInclusPage() {
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
                <span className="text-ink-700">Inclus la livrare</span>
              </nav>
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                01 / Inclus gratuit
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Tot ce primești{" "}
                <span className="font-light italic text-uzx-orange">
                  odată cu echipamentul.
                </span>
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                Service-ul Uzinex nu începe după cumpărare — e parte integrantă
                din livrare. Punerea în funcțiune, trainingul operatorilor,
                garanția standard de 60 de luni, intervenția sub 24 de ore și
                piesele originale OEM sunt incluse fără cost suplimentar.
              </p>
            </div>
          </div>
        </section>

        {/* 4 PROMISES */}
        <section className="border-b hairline py-16 lg:py-24 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 lg:mb-16">
                <div className="lg:col-span-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                    — Te poți baza pe noi
                  </div>
                  <h2
                    className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Patru promisiuni
                    <br />
                    <span className="font-light text-uzx-orange">
                      pe care nu le negociem.
                    </span>
                  </h2>
                </div>
                <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                  <p className="text-ink-600 leading-relaxed">
                    Service-ul Uzinex este construit pe patru piloni
                    fundamentali. Fiecare echipament livrat, fiecare intervenție
                    efectuată și fiecare contract semnat respectă aceste
                    promisiuni — fără excepție și fără compromisuri.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border-y border-ink-200">
                {PROMISES.map((p) => (
                  <div key={p.num} className="bg-white p-8 lg:p-10">
                    <div className="text-[11px] mono text-uzx-orange mb-6">
                      — {p.num}
                    </div>
                    <h3
                      className="serif text-xl lg:text-2xl text-ink-900 mb-4 leading-tight"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-sm text-ink-600 leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceGrid />

        {/* AI MANUAL MENTION */}
        <section className="border-b hairline py-10 lg:py-14 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div
                className="flex items-start gap-4 lg:gap-6 p-6 lg:p-8 border border-uzx-blue/25 bg-white flex-wrap"
                style={{ background: "rgba(30,107,184,0.03)" }}
              >
                <div className="text-3xl text-uzx-blue shrink-0">⚡</div>
                <div className="flex-1 min-w-[260px]">
                  <div className="text-[10px] uppercase tracking-[0.22em] mono font-bold text-uzx-orange mb-2">
                    Inclus gratuit
                  </div>
                  <div
                    className="serif text-xl lg:text-2xl text-ink-900 leading-tight mb-2"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Manual de service cu inteligență artificială
                  </div>
                  <p className="text-sm text-ink-600 leading-relaxed max-w-2xl">
                    Fiecare echipament livrat de Uzinex vine însoțit de un
                    manual digital interactiv cu AI — limbaj natural, comandă
                    vocală, recunoaștere prin imagini, proceduri pas-cu-pas.
                    Disponibil offline, 24/7, fără cost suplimentar sau
                    abonamente ascunse.
                  </p>
                </div>
                <Link
                  href="/service/manual-ai"
                  className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm font-medium px-5 py-3 transition inline-flex items-center gap-2 shrink-0 self-center"
                >
                  Vezi detalii <span>›</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* COLLABORATIVE DIAGNOSIS */}
        <section className="border-b hairline py-16 lg:py-24 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  — Service digital
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Diagnoză
                  <br />
                  <span className="font-light text-uzx-orange">
                    colaborativă remote.
                  </span>
                </h2>
                <p className="text-ink-600 leading-relaxed mb-5">
                  Pentru situațiile complexe în care un tehnician de la fața
                  locului are nevoie de input suplimentar, am dezvoltat un
                  instrument digital care permite partajarea în timp real a
                  datelor de diagnoză cu experții noștri din biroul central.
                </p>
                <p className="text-ink-600 leading-relaxed">
                  Dincolo de simpla partajare a ecranului, expertul remote poate
                  sprijini activ diagnosticarea prin dialog și poate efectua
                  intervenții în paralel, în strânsă colaborare cu tehnicianul
                  de la tine. Tehnicianul deține întotdeauna controlul asupra
                  utilajului.
                </p>

                <DiagnosisMockup />
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
                  {DIAGNOSIS_FEATURES.map((f, i) => (
                    <div key={i} className="bg-white p-6">
                      <h3
                        className="serif text-base text-ink-900 mb-2 leading-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {f.title}
                      </h3>
                      <p className="text-xs text-ink-500 leading-relaxed">
                        {f.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ORIGINAL PARTS + STATS */}
        <section className="border-b hairline py-16 lg:py-24 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
                <div className="lg:col-span-6">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                    — Piese originale OEM
                  </div>
                  <h2
                    className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Calitate cu garanție
                    <br />
                    <span className="font-light text-uzx-orange">
                      de disponibilitate.
                    </span>
                  </h2>
                  <p className="text-ink-600 leading-relaxed">
                    Lucrăm exclusiv cu piese originale, certificate de
                    producători OEM și supuse celor mai stricte teste de
                    calitate. Aceste piese nu sunt doar foarte rezistente și mai
                    puțin sensibile la uzură — ele garantează exploatarea în
                    siguranță a utilajului tău și păstrarea valorii investiției
                    pe termen lung.
                  </p>
                </div>

                <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                  <p className="text-ink-600 leading-relaxed">
                    Avem acces la rețeaua internațională de stocuri OEM cu peste
                    50.000 de piese pentru utilizare imediată, iar pentru
                    piesele care nu sunt disponibile direct, livrăm în maxim 5
                    zile lucrătoare.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-200 border-y border-ink-200">
                <div className="bg-white py-10 px-4 lg:px-8 text-center">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    50.000+
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Piese OEM disponibile
                  </div>
                </div>
                <div className="bg-white py-10 px-4 lg:px-8 text-center">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    12 ani
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Garanție disponibilitate
                  </div>
                </div>
                <div className="bg-white py-10 px-4 lg:px-8 text-center">
                  <div className="serif text-4xl lg:text-5xl text-uzx-blue num">
                    5 zile
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                    Livrare piese non-stoc
                  </div>
                </div>
                <div className="bg-white py-10 px-4 lg:px-8 text-center">
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

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
