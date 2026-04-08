"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOLUTIONS = [
  {
    num: "01",
    industry: "Producție & manufactură",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=80&auto=format&fit=crop",
    description:
      "Linii complete pentru fabrici de procesare metal, plastic și ansamble: debitare laser, prelucrare CNC, sudură robotizată și inspecție automată.",
    bullets: ["Mașini de tăiere laser fibră", "Centre CNC & strunguri", "Brațe robotice de sudură"],
    package: "UZX-Manufacturing",
  },
  {
    num: "02",
    industry: "Logistică & depozitare",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80&auto=format&fit=crop",
    description:
      "Echipamente complete pentru centre de distribuție și depozite e-commerce: manipulare, paletizare, sortare automată și soluții de depozitare verticală.",
    bullets: ["Motostivuitoare electrice & diesel", "Linii automate de paletizare", "Sisteme de rafturi industriale"],
    package: "UZX-Logistics",
  },
  {
    num: "03",
    industry: "Energie & infrastructură",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80&auto=format&fit=crop",
    description:
      "Utilaje grele și echipamente energetice pentru proiecte de infrastructură mare: termo, eolian, hidro, transport energie și exploatări miniere.",
    bullets: ["Macarale & utilaje de ridicare", "Generatoare & echipamente energetice", "Excavatoare grele heavy-duty"],
    package: "UZX-Energy",
  },
  {
    num: "04",
    industry: "Procesare & reciclare",
    image: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=600&q=80&auto=format&fit=crop",
    description:
      "Linii complete pentru reciclare deșeuri, ambalare, etichetare și dozare. Soluții turnkey pentru fabrici de procesare materiale și economie circulară.",
    bullets: ["Linii de sortare & granulare", "Mașini de ambalare automată", "Sisteme de etichetare & dozare"],
    package: "UZX-Process",
  },
  {
    num: "05",
    industry: "Auto & metalurgie",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80&auto=format&fit=crop",
    description:
      "Echipamente pentru industria auto și prelucrarea metalelor: linii de asamblare robotizate, presse, sudură automată și control dimensional.",
    bullets: ["Celule robotice de sudură", "Mașini de inspecție 3D", "Linii de asamblare modulare"],
    package: "UZX-Automotive",
  },
];

export function Solutions() {
  return (
    <section id="solutii" className="border-b hairline py-16 lg:py-20 bg-ink-50">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">06 / Soluții tehnice</div>
            <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
              Recomandări în<br />funcție de aplicație.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-500 text-lg leading-relaxed">
              Selectează tipul de aplicație, iar inginerii noștri îți recomandă combinația optimă de echipamente.
            </p>
          </div>
        </div>

        <div className="space-y-px bg-ink-200">
          {SOLUTIONS.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 lg:p-12 items-center"
            >
              <div className="lg:col-span-3">
                <div className="aspect-[4/3] overflow-hidden bg-ink-100 relative">
                  <Image
                    src={s.image}
                    alt={s.industry}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover grayscale-[30%]"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="serif text-2xl text-ink-300 num">{s.num}</div>
              </div>
              <div className="lg:col-span-4">
                <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">Industrie</div>
                <h3 className="serif text-2xl lg:text-3xl text-ink-900 leading-tight">{s.industry}</h3>
                <p className="text-ink-600 leading-relaxed mt-4">{s.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-ink-700">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="text-ink-300 num">—</span> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:col-span-3 lg:border-l hairline lg:pl-8">
                <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">Pachet recomandat</div>
                <div className="serif text-2xl text-ink-900">{s.package}</div>
                <a href="#" className="text-xs text-ink-700 underline-link mt-4 inline-block">
                  Vezi detalii →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <a
            href="#contact"
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center gap-3 group transition"
          >
            Solicită o recomandare personalizată
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
