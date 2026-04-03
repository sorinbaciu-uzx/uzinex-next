"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Plan = {
  num: string;
  name: string;
  tagline: string;
  image: string;
  imageAlt: string;
  description: string[];
  includes: string[];
  idealFor: string;
  highlight?: boolean;
  badge?: string;
};

const PLANS: Plan[] = [
  {
    num: "01",
    name: "Intervenție 24h",
    tagline: "Diagnoză rapidă pentru situațiile critice",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=900&q=80&auto=format&fit=crop",
    imageAlt:
      "Tehnician Uzinex efectuând diagnoză la un echipament industrial într-o fabrică",
    description: [
      "Abonamentul de intervenție în 24 de ore este pachetul nostru de asistență rapidă pentru momentele în care nu îți permiți să aștepți. Când un echipament critic se oprește, fiecare oră înseamnă pierderi de producție, comenzi întârziate și furnizori nemulțumiți.",
      "Cu acest abonament, un inginer Uzinex ajunge la sediul tău în maxim 24 de ore de la sesizare, efectuează diagnoza completă a problemei și, dacă defecțiunea nu necesită piese de schimb sau manoperă extinsă, o remediază pe loc. Primești un raport tehnic clar, cu recomandări concrete și un plan de acțiune.",
    ],
    includes: [
      "3 intervenții specializate de diagnoză pe an",
      "Timp garantat de deplasare sub 24 ore oriunde în România",
      "Raport tehnic complet cu fotografii, măsurători și recomandări",
      "Remediere pe loc a defecțiunilor minore (fără piese, fără manoperă extinsă)",
      "Acces prioritar la linia de suport telefonic (response sub 30 min)",
      "Discount 10% la orice piese de schimb comandate în timpul intervenției",
    ],
    idealFor:
      "Companii cu utilaje critice care au nevoie de diagnoză rapidă, dar care își gestionează intern reviziile periodice.",
  },
  {
    num: "02",
    name: "Revizii Programate",
    tagline: "Mentenanță preventivă planificată profesional",
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80&auto=format&fit=crop",
    imageAlt:
      "Inginer Uzinex verificând parametrii unui echipament industrial în cadrul unei revizii planificate",
    description: [
      "Abonamentul de revizii programate este soluția pentru companiile care înțeleg că mentenanța preventivă costă mult mai puțin decât reparațiile de urgență. În locul intervențiilor reactive, primești un calendar de revizii planificate de inginerii noștri, bazat pe specificul tehnic al echipamentului tău și pe volumul real de utilizare.",
      "Fiecare revizie include o inspecție generală completă: analiza parametrilor de funcționare, verificarea subansamblelor critice, înlocuirea uleiurilor și filtrelor, verificarea sistemelor de siguranță și un raport tehnic detaliat cu recomandări pentru perioada următoare. Scopul este să îți prelungim semnificativ durata de viață a echipamentului și să previi defecțiunile înainte să apară.",
    ],
    includes: [
      "Plan personalizat de revizii, adaptat intensității de utilizare",
      "Analiză detaliată a parametrilor de funcționare la fiecare vizită",
      "Înlocuire uleiuri, filtre și consumabile (piese incluse în pachet)",
      "Inspecție completă a sistemelor de siguranță și alarmare",
      "Raport tehnic după fiecare revizie, cu istoric complet pe echipament",
      "Recomandări proactive pentru optimizarea costurilor operaționale",
      "Notificări automate înainte de fiecare vizită planificată",
    ],
    idealFor:
      "Companii care vor să elimine surprizele, să bugetereze predictibil cheltuielile de mentenanță și să prelungească durata de viață a investiției.",
    highlight: true,
    badge: "Cel mai popular",
  },
  {
    num: "03",
    name: "All-Inclusive",
    tagline: "Totul inclus — zero griji, zero surprize",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
    imageAlt:
      "Echipă Uzinex efectuând un pachet complet de mentenanță all-inclusive într-o hală industrială",
    description: [
      "Pachetul all-inclusive este cea mai avantajoasă formulă pentru companiile care vor o liniște totală în privința utilajelor lor. Combini tot ce este mai bun: intervenția rapidă sub 24 de ore pentru situațiile neprevăzute, reviziile programate pentru mentenanța preventivă, plus beneficii exclusive care nu sunt disponibile separat.",
      "Practic, echipamentele tale sunt monitorizate și îngrijite permanent de inginerii Uzinex, ca și cum ai avea propriul departament tehnic intern — dar fără costurile salariale, fără bătăile de cap administrative și fără riscul rotației de personal. Îți garantăm că utilajele tale vor funcționa la parametri optimi pe toată durata contractului, iar orice problemă este rezolvată fără cost suplimentar.",
    ],
    includes: [
      "Totul din pachetele Intervenție 24h și Revizii Programate",
      "Număr nelimitat de intervenții de diagnoză și depanare",
      "Piese de schimb originale OEM incluse (fără costuri suplimentare)",
      "Manoperă nelimitată pentru reparații și ajustări",
      "Uleiuri, filtre, consumabile și fluide tehnice incluse în integralitate",
      "Acces la manualul interactiv AI personalizat pe echipamentul tău",
      "Training periodic gratuit pentru operatori și personal de întreținere",
      "Consultanță strategică pentru upgrade-uri și modernizări",
      "SLA garantat cu penalități pentru Uzinex în caz de nerespectare",
    ],
    idealFor:
      "Companii care își bazează producția pe funcționarea neîntreruptă a echipamentelor și care vor o relație de parteneriat real, pe termen lung, cu un furnizor dedicat.",
  },
];

export function ServiceSubscriptions() {
  return (
    <section className="border-b hairline py-16 lg:py-24 bg-white" id="abonamente">
      <div className="container-x">
        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 lg:mb-20">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Abonamente service & mentenanță
            </div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Cum te ajutăm<br />
              <span className="font-light text-uzx-orange">să-ți întreții utilajul.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-600 leading-relaxed">
              La Uzinex, grija pentru echipamentele clienților noștri este o preocupare constantă. Livrăm
              cele mai fiabile utilaje industriale și venim în întâmpinarea ta cu servicii complete. De
              aceea, am creat trei pachete de abonamente care îți asigură asistență de specialitate la
              costuri predictibile, executate de inginerii și tehnicienii noștri cu pregătire dedicată
              pe fiecare categorie de echipament.</p>
          </div>
        </div>

        {/* Intro block — team photo context */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-20">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] border hairline overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=900&q=80&auto=format&fit=crop"
                alt="Echipa de ingineri Uzinex specializată pe service și mentenanță industrială"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover grayscale-[15%]"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
            <p className="text-ink-700 leading-relaxed text-base mb-5">
              Ca și tine, la Uzinex suntem{" "}
              <strong className="text-ink-900">
                pasionați de utilaje și preocupați de găsirea celor mai bune soluții pentru întreținerea
                și prelungirea vieții acestor echipamente.
              </strong>{" "}
              Pornind de la această nevoie a pieței și ca răspuns la solicitările clienților, am
              structurat un set de abonamente flexibile care acoperă integral ciclul de viață al
              utilajelor tale.
            </p>
            <p className="text-ink-700 leading-relaxed text-base">
              Indiferent dacă ai nevoie doar de o plasă de siguranță pentru urgențe, de un partener care
              să-ți gestioneze reviziile periodice sau de o soluție completă fără bătăi de cap, ai aici
              pachetul potrivit. Și pentru că înțelegem că fluxul de numerar este vital, îți oferim{" "}
              <strong className="text-ink-900">2 variante de plată — lunară sau trimestrială —</strong>{" "}
              ca să îți administrezi bugetul așa cum îți convine.
            </p>
          </div>
        </div>

        {/* PLANS */}
        <div className="space-y-px bg-ink-200 border-y border-ink-200">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 lg:p-12 ${
                p.highlight ? "bg-ink-50" : "bg-white"
              }`}
            >
              {/* Image */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] border hairline overflow-hidden bg-ink-100">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover grayscale-[20%]"
                  />
                  {p.badge && (
                    <div className="absolute top-4 left-4 bg-uzx-orange text-white text-[10px] mono uppercase tracking-widest px-3 py-1.5">
                      {p.badge}
                    </div>
                  )}
                </div>
                <div className="mt-6 flex items-start gap-4">
                  <div
                    className="serif text-5xl lg:text-6xl text-uzx-blue num leading-none"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    {p.num}
                  </div>
                  <div className="pt-2">
                    <div className="text-[11px] mono text-ink-400 uppercase tracking-widest">
                      Abonament
                    </div>
                    <div
                      className="serif text-2xl text-ink-900 leading-tight"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {p.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  — {p.tagline}
                </div>
                <h3
                  className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-6"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Abonamentul {p.name}
                </h3>

                {p.description.map((para, j) => (
                  <p key={j} className="text-ink-600 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}

                <div className="mt-8">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono mb-4">
                    — Ce este inclus în pachet
                  </div>
                  <ul className="space-y-2.5">
                    {p.includes.map((item, j) => (
                      <li key={j} className="flex gap-3 text-sm text-ink-700">
                        <span className="text-uzx-blue shrink-0 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t hairline">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono mb-2">
                    Ideal pentru
                  </div>
                  <p className="text-sm text-ink-600 italic leading-relaxed">{p.idealFor}</p>
                </div>

                <div className="mt-8 flex items-center gap-5 flex-wrap">
                  <a
                    href="#contact"
                    className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-6 py-3 transition inline-flex items-center gap-3 group"
                  >
                    Solicită ofertă personalizată
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </a>
                  <a
                    href="mailto:info@uzinex.ro"
                    className="text-sm text-ink-700 hover:text-uzx-blue underline-link transition"
                  >
                    sau vorbește cu un inginer
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Payment options strip */}
        <div
          className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 lg:p-12 border hairline"
          style={{ background: "rgba(30,107,184,0.04)" }}
        >
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Flexibilitate financiară
            </div>
            <h3
              className="serif text-2xl md:text-3xl text-ink-900 leading-tight mb-5"
              style={{ letterSpacing: "-0.02em" }}
            >
              Alegi cum plătești —{" "}
              <span className="font-light text-uzx-orange">lunar sau trimestrial.</span>
            </h3>
            <p className="text-ink-600 leading-relaxed mb-6">
              Pentru ca parteneriatul cu Uzinex să fie cu adevărat avantajos, venim în sprijinul tău cu
              două variante de plată pentru toate abonamentele de diagnoză, revizii și all-inclusive.
              Tu decizi cum îți structurezi cash-flow-ul și cum îți administrezi bugetul tehnic — noi ne
              adaptăm preferințelor tale, nu invers.
            </p>
            <ul className="space-y-2.5 text-sm text-ink-700">
              <li className="flex gap-3">
                <span className="text-uzx-blue shrink-0">→</span>
                <span>
                  <strong className="text-ink-900">Plata lunară</strong> — ideal pentru companiile care
                  preferă predictibilitate în cheltuielile operaționale lunare.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-uzx-blue shrink-0">→</span>
                <span>
                  <strong className="text-ink-900">Plata trimestrială</strong> — cu discount suplimentar
                  față de plata lunară, pentru companiile care optimizează cash-flow-ul pe perioade mai
                  lungi.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-uzx-blue shrink-0">→</span>
                <span>
                  Facturare electronică e-Factura, contract standard avizat juridic, termene de plată
                  negociabile pentru clienții strategici.
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center gap-4">
            <div className="border hairline p-6 bg-white">
              <div className="text-[10px] mono text-ink-400 uppercase tracking-widest mb-2">
                Fără cost ascuns
              </div>
              <div
                className="serif text-2xl text-ink-900 mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                Ofertă personalizată în 48h
              </div>
              <p className="text-xs text-ink-600 leading-relaxed mb-5">
                Trimite-ne tipul și vechimea echipamentelor tale, intensitatea de utilizare și obiectivele
                de mentenanță. Primești o ofertă transparentă pentru pachetul potrivit.
              </p>
              <a
                href="#contact"
                className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-5 py-3 transition inline-flex items-center justify-center gap-3 group w-full"
              >
                Cere ofertă abonament
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
