"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const QA = [
  {
    q: "Sunt echipamentele voastre disponibile prin SEAP / SICAP?",
    a: "Da. Toate categoriile din catalogul tehnic sunt disponibile prin SEAP și SICAP, iar echipa noastră te asistă cu dosarul tehnic, fișele de conformitate și încadrarea CPV. Lucrăm frecvent cu autorități contractante pe proceduri simplificate, licitații deschise și achiziții directe.",
  },
  {
    q: "Cum ajutați proiectele cu fonduri europene sau PNRR?",
    a: "Asigurăm conformitate DNSH, eligibilitate pentru fonduri UE (PNRR, POIM, POCU) și livrare în termenul de finanțare. Dacă ai un dosar blocat de un furnizor anterior, preluăm specificațiile tehnice, reconfigurăm soluția și livrăm înainte de deadline — am salvat zeci de proiecte de la dezangajare.",
  },
  {
    q: "Ce garanție oferiți la echipamente?",
    a: "Garanția standard este de 60 de luni — printre cele mai lungi din piață. Include defecte de fabricație, suport tehnic telefonic și intervenție fizică la fața locului în sub 24 de ore. Pentru echipamente custom, garanția se stabilește individual.",
  },
  {
    q: "Ce sunt manualele interactive cu inteligență artificială?",
    a: "Fiecare echipament livrat include un manual digital cu AI integrat: poți pune întrebări tehnice în limbaj natural, obține proceduri pas-cu-pas pentru exploatare și mentenanță, și accesa training pentru operatori. Reduce timpul de onboarding și eroarea umană.",
  },
  {
    q: "Lucrați cu instituții din apărare și securitate?",
    a: "Da. Avem o categorie dedicată echipamentelor pentru MApN, IGSU, poliție și operatori privați de securitate. Lucrăm pe proceduri guvernamentale clasificate, conforme cu standardele NATO STANAG, cu trasabilitate totală a componentelor.",
  },
  {
    q: "Cum funcționează procesul de integrare end-to-end?",
    a: "Uzinex este integrator industrial complet: proiectare → implementare → service. Inginerii noștri analizează fluxul tău de producție, propun configurația optimă, coordonează livrarea și instalarea, apoi preiau mentenanța preventivă și suportul tehnic. Un singur partener pentru tot ciclul de viață al echipamentului.",
  },
  {
    q: "Care este durata tipică a unui proiect la cheie?",
    a: "Pentru soluții standard din catalog, livrarea începe în câteva săptămâni. Pentru linii complete personalizate — de la dimensionare tehnică la punere în funcțiune — termenul este între 8 și 16 săptămâni, în funcție de complexitate. Îți propunem calendar realist la primul call tehnic.",
  },
  {
    q: "Cu ce branduri industriale lucrați?",
    a: "Livrăm componente și echipamente cheie de la Siemens, Mitsubishi Electric, Schneider Electric, ABB, Samsung, Panasonic, Omron, Yaskawa, WEG, Fanuc, Bosch Rexroth, Festo, SMC, Rockwell Automation și alții. Parteneriate oficiale pentru piese, drive-uri, PLC-uri și automatizare.",
  },
];

export function QASection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="qa" className="border-b hairline py-16 lg:py-20">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">07 / Întrebări</div>
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
            Întrebări<br />frecvente.
          </h2>
          <p className="text-ink-500 mt-8 leading-relaxed max-w-sm">
            Răspunsuri la cele mai comune întrebări tehnice și comerciale. Nu găsești ce cauți?
          </p>
          <a href="#contact" className="text-sm text-ink-700 underline-link mt-6 inline-block">
            Contactează echipa →
          </a>
        </div>

        <div className="lg:col-span-7 lg:col-start-6 border-t hairline">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b hairline">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 lg:py-6 text-left"
                >
                  <span className="serif text-lg lg:text-xl text-ink-900 pr-8">{item.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl text-uzx-orange font-light shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 text-ink-500 leading-relaxed max-w-2xl">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
