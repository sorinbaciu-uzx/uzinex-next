"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const QA = [
  {
    q: "Cât durează livrarea în România?",
    a: "Termenul de livrare se confirmă individual pentru fiecare proiect, în funcție de configurația și complexitatea echipamentului. Pentru soluții standard livrăm rapid în întreaga țară, iar pentru proiectele custom inginerii noștri îți propun un calendar realist.",
  },
  {
    q: "Ce garanție oferiți pentru produse?",
    a: "Toate produsele Uzinex beneficiază de garanție standard de 60 de luni pentru defecte de fabricație. Pentru produsele realizate la comandă, garanția este de 24 luni. Reparațiile în garanție sunt efectuate gratuit, inclusiv transportul.",
  },
  {
    q: "Pot comanda o cupă după desen propriu?",
    a: "Da. Realizăm cupe și atașamente la comandă, conform desenelor și specificațiilor furnizate. Inginerii noștri pot, de asemenea, dezvolta soluții complete pornind de la cerințele tale tehnice. Proiectul include validare 3D înainte de fabricație.",
  },
  {
    q: "Ce metode de plată acceptați?",
    a: "Acceptăm transfer bancar, plată în rate prin parteneri de leasing și finanțare pentru companii cu istoric. Pentru clienții noi, putem oferi termene de plată flexibile după evaluarea financiară.",
  },
  {
    q: "Sunt produsele compatibile cu utilajul meu?",
    a: "Lucrăm cu echipamente compatibile cu majoritatea brandurilor de pe piață: Caterpillar, Komatsu, Volvo, Hitachi, JCB, Liebherr, Case, Doosan, Hyundai și Bobcat. Ne poți trimite seria utilajului și inginerii noștri îți confirmă compatibilitatea.",
  },
  {
    q: "Oferiți consultanță tehnică gratuită?",
    a: "Da. Echipa noastră de ingineri oferă consultanță gratuită pentru selecția corectă a echipamentelor, dimensionarea atașamentelor și optimizarea costurilor de exploatare. Sunăm sau ne vizităm clienții la fața locului.",
  },
  {
    q: "Cum funcționează leasingul prin Uzinex?",
    a: "Lucrăm cu cele mai mari instituții de leasing din România. Avans de la 10%, perioade între 12 și 60 de luni, dobânzi de la 4.9%. Pre-aprobarea vine în 48 de ore lucrătoare după depunerea documentelor.",
  },
];

export function QASection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="qa" className="border-b hairline py-16 lg:py-20">
      <div className="container-x grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">05 / Întrebări</div>
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
