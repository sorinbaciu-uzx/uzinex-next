"use client";

import { motion } from "motion/react";

type Card = {
  value: string;
  title: string;
  body: string;
  icon?: "headset" | "cap";
};

const CARDS: Card[] = [
  {
    value: "24/7",
    title: "Service tehnic la distanță",
    body: "Echipa noastră de ingineri este disponibilă non-stop pentru asistență tehnică, diagnoză și suport prin telefon, email sau conexiune securizată la echipament.",
  },
  {
    value: "30 min",
    title: "Timp de răspuns rapid",
    body: "Ne mândrim că răspundem la solicitările clienților în maxim 30 de minute de la primirea tichetului, pentru minimizarea opririlor neprogramate.",
  },
  {
    value: "5 zile",
    title: "Livrare piese de schimb",
    body: "Pentru piesele care nu sunt în stocul nostru, coordonăm cu producătorii OEM și livrăm direct la sediul clientului în maxim 5 zile lucrătoare.",
  },
  {
    value: "",
    title: "Echipă dedicată de after-sales",
    body: "Tehnicieni specializați pe regiuni geografice, cu cunoașterea specifică a fiecărui tip de echipament livrat, pentru intervenții rapide și eficiente la fața locului.",
    icon: "headset",
  },
  {
    value: "",
    title: "Training complet pentru operatori",
    body: "Uzinex organizează sesiuni complete de training pentru operatorii clienților, cu materiale în limba română și manuale interactive cu inteligență artificială.",
    icon: "cap",
  },
];

function IconHeadset() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#1e6bb8" strokeWidth="2">
      <path d="M12 34 L12 28 C12 16 20 8 32 8 C44 8 52 16 52 28 L52 34" />
      <rect x="8" y="34" width="12" height="18" rx="2" />
      <rect x="44" y="34" width="12" height="18" rx="2" />
      <path d="M52 52 C52 56 48 58 44 58 L36 58" />
      <circle cx="34" cy="58" r="2" />
    </svg>
  );
}

function IconCap() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#1e6bb8" strokeWidth="2">
      <path d="M4 24 L32 12 L60 24 L32 36 Z" />
      <path d="M14 28 L14 42 C14 42 20 48 32 48 C44 48 50 42 50 42 L50 28" />
      <path d="M60 24 L60 40" />
      <circle cx="60" cy="42" r="2" fill="#1e6bb8" />
    </svg>
  );
}

export function ServiceGrid() {
  return (
    <section className="border-b hairline py-16 lg:py-24 bg-ink-50">
      <div className="container-x">
        <div className="text-center mb-12 lg:mb-16">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
            — Rețeaua noastră de suport
          </div>
          <h2
            className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Centre de service <span className="font-light text-uzx-orange">naționale.</span>
          </h2>
          <p className="text-ink-500 mt-5 max-w-2xl mx-auto text-base">
            Uzinex asigură un ecosistem complet de suport tehnic 100% local, cu intervenție rapidă,
            piese de schimb gestionate eficient și training profesional pentru operatorii echipamentelor.
          </p>
        </div>

        {/* Top row — 3 cards with big value */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {CARDS.slice(0, 3).map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white p-8 lg:p-10 border hairline"
            >
              <div
                className="serif text-5xl lg:text-6xl text-uzx-blue num mb-6"
                style={{ letterSpacing: "-0.03em" }}
              >
                {c.value}
              </div>
              <h3
                className="serif text-lg lg:text-xl text-ink-900 mb-3 leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {c.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom row — 2 cards with icon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CARDS.slice(3).map((c, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i + 3) * 0.08 }}
              className="bg-white p-8 lg:p-12 border hairline flex gap-6 lg:gap-10 items-start"
            >
              <div className="shrink-0">{c.icon === "headset" ? <IconHeadset /> : <IconCap />}</div>
              <div>
                <h3
                  className="serif text-lg lg:text-xl text-ink-900 mb-3 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {c.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed">{c.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
