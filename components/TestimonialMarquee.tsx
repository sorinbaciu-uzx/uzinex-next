"use client";

import { motion } from "motion/react";

const CLIENT_LOGOS = [
  { name: "Cărămidă Modulară România", src: "/clients/caramida.png" },
  { name: "Iron", src: "/clients/iron.png" },
  { name: "Future Energy Group", src: "/clients/feg.webp" },
  { name: "Geomar Metal Work", src: "/clients/geomar.png" },
  { name: "MDG Gold Paper", src: "/clients/mdg.webp" },
  { name: "Geo-Ex Construct", src: "/clients/geoex.jpg" },
];

type Testimonial = { quote: string; name: string; role: string };

const COL1: Testimonial[] = [
  {
    quote:
      "Linia robotizată de paletizare ne-a redus costurile cu 38% în primul an. Implementarea a fost impecabilă.",
    name: "Andrei Popescu",
    role: "Plant Manager · Auto Components SRL",
  },
  {
    quote: "Am echipat 3 depozite cu motostivuitoare Uzinex. Service-ul este disponibil 24/7.",
    name: "Daniela Marin",
    role: "Procurement · LogiPark România",
  },
  {
    quote: "Centrul CNC achiziționat lucrează 2 schimburi zilnic de 4 ani fără o singură defecțiune majoră.",
    name: "Bogdan Stan",
    role: "Director Producție · MetalTech",
  },
  {
    quote: "Echipa de ingineri Uzinex ne-a ajutat să dimensionăm corect toată linia de producție.",
    name: "Adrian Tudor",
    role: "CTO · Pack Industries",
  },
];

const COL2: Testimonial[] = [
  {
    quote:
      "Mașina de tăiere laser livrată în 3 săptămâni. Calitatea suprafețelor de tăiere este excepțională.",
    name: "Mihai Constantin",
    role: "Director · Laser Cut Pro",
  },
  {
    quote: "Sistemul de leasing pentru utilajele grele a fost aprobat în 36 de ore. Recomand cu încredere.",
    name: "Laura Dumitrescu",
    role: "CFO · Terra Energy",
  },
  {
    quote: "Cele 4 brațe robotice de sudură au transformat complet linia noastră. ROI în 14 luni.",
    name: "Cristian Ionescu",
    role: "Operations · WeldMaster Industries",
  },
  {
    quote: "Piese de schimb originale, livrate next-day din Otopeni. Zero downtime în ultimii 2 ani.",
    name: "Vlad Marinescu",
    role: "Maintenance · Heavy Lift Co.",
  },
];

const COL3: Testimonial[] = [
  {
    quote: "Linia de ambalare automată a triplat capacitatea fabricii. Investiție amortizată în 18 luni.",
    name: "Ana Petrescu",
    role: "CEO · BioPack Solutions",
  },
  {
    quote: "Lucrăm cu Uzinex de 11 ani. Singurul furnizor în care avem încredere oarbă.",
    name: "Răzvan Dima",
    role: "Owner · Mecanica Grup",
  },
  {
    quote: "Echipamente de inspecție industrială perfecte pentru linia noastră de control calitate.",
    name: "Ioana Gheorghiu",
    role: "QA Director · Precision Parts",
  },
  {
    quote:
      "Generatorul industrial livrat și pus în funcțiune în 5 zile. Continuitate operațională asigurată.",
    name: "Sorin Vasile",
    role: "Facility Manager · DataCenter One",
  },
];

function Card({ t }: { t: Testimonial }) {
  return (
    <div
      className="p-6 border"
      style={{ background: "rgba(30,107,184,0.08)", borderColor: "rgba(30,107,184,0.25)" }}
    >
      <div className="text-uzx-orange text-sm tracking-widest mb-4">★★★★★</div>
      <blockquote className="serif text-base leading-relaxed text-white/90 mb-6">„{t.quote}"</blockquote>
      <div className="pt-4 border-t" style={{ borderColor: "rgba(30,107,184,0.25)" }}>
        <div className="serif text-sm text-white">{t.name}</div>
        <div className="text-[11px] text-white/55 mt-0.5">{t.role}</div>
      </div>
    </div>
  );
}

function Column({
  data,
  duration,
  offset = 0,
}: {
  data: Testimonial[];
  duration: number;
  offset?: number;
}) {
  const doubled = [...data, ...data];
  return (
    <div className="overflow-hidden h-full">
      <motion.div
        className="flex flex-col gap-6"
        style={{ marginTop: `${offset}px` }}
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: "paused" }}
      >
        {doubled.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export function TestimonialMarquee() {
  return (
    <section id="testimoniale" className="border-b hairline py-16 lg:py-20 text-white" style={{ background: "linear-gradient(180deg, #082545 0%, #051a33 100%)" }}>
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-10">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">03 / Referințe</div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Spun ei,<br />
              <span className="font-light text-uzx-orange">nu noi.</span>
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3">
            <div className="text-xs text-ink-400 num mb-6 mono">— 12 referințe verificate</div>
            <p className="text-ink-300 leading-relaxed text-sm">
              Peste 5.000 de companii din producție, logistică și industrie au ales Uzinex ca partener strategic.
            </p>
            <a
              href="#"
              className="mt-8 inline-flex items-center gap-3 text-sm text-white border-b border-white/30 hover:border-white pb-1 group"
            >
              Toate referințele
              <span className="group-hover:translate-x-1 transition">→</span>
            </a>

            {/* Client logos bar — uniform white tint, no hover */}
            <div className="mt-12 pt-10 border-t" style={{ borderColor: "rgba(30,107,184,0.25)" }}>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-6 mono">
                — Companii care au ales Uzinex
              </div>
              <div className="overflow-hidden">
                <motion.div
                  className="flex items-center gap-10"
                  style={{ width: "max-content" }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((c, i) => (
                    <div key={i} className="shrink-0 h-14 flex items-center justify-center">
                      <img
                        src={c.src}
                        alt={c.name}
                        className="max-h-full w-auto object-contain"
                        style={{
                          filter: "brightness(0) invert(1) opacity(0.75)",
                        }}
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 testimonial-mask"
            style={{ height: 520 }}
          >
            <Column data={COL1} duration={50} />
            <div className="hidden md:block">
              <Column data={COL2} duration={40} offset={-120} />
            </div>
            <div className="hidden lg:block">
              <Column data={COL3} duration={60} offset={-60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
