"use client";

import Image from "next/image";
import { motion } from "motion/react";

export type Solution = {
  num: string;
  industry: string;
  image: string;
  description: string;
  bullets: string[];
  package: string;
};
export type SolutionsData = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  items: Solution[];
};

const SOLUTIONS: Solution[] = [
  {
    num: "01",
    industry: "IIoT & Monitorizare Plug & Play",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80&auto=format&fit=crop",
    description:
      "Află în timp real cât produce fiecare utilaj și cât timp stă degeaba. Montăm senzori pe orice echipament — nou sau vechi — și în câteva ore ai dashboard-ul OEE pe telefon. Fără cablaje complicate, fără oprirea producției. Primul pas concret spre digitalizare, cu ROI vizibil din prima lună.",
    bullets: ["Dashboard OEE pe telefon din prima zi", "Montare pe orice utilaj, fără oprirea producției", "Investiție recuperată în 3-6 luni"],
    package: "UZX-IIoT",
  },
  {
    num: "02",
    industry: "Robotică colaborativă",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80&auto=format&fit=crop",
    description:
      "Rezolvă lipsa de personal fără să triplezi costurile. Cobotul lucrează în siguranță lângă oamenii tăi — paletizează, alimentează CNC-ul, sudează — în timp ce tu recuperezi investiția în 12-18 luni. Prețuri cu 30-40% sub distribuitorii europeni, cu instalare și programare incluse de la noi.",
    bullets: ["ROI în 12-18 luni, fără personal suplimentar", "Instalare + programare incluse în pachet", "Cu 30-40% sub prețurile distribuitorilor europeni"],
    package: "UZX-Cobots",
  },
  {
    num: "03",
    industry: "Mentenanță predictivă",
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=600&q=80&auto=format&fit=crop",
    description:
      "Nu mai aștepta să se strice. Algoritmii noștri analizează datele de la senzori și îți spun exact ce piesă va ceda și când — noi o aducem pe linia ta de producție înainte de defecțiune. Zero opriri neplanificate, zero penalități contractuale, liniște operațională totală.",
    bullets: ["Zero opriri neplanificate ale producției", "Piesa de schimb ajunge înainte de defecțiune", "Esențial pentru contracte publice și sector apărare"],
    package: "UZX-Predictive",
  },
  {
    num: "04",
    industry: "Inspecție optică",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80&auto=format&fit=crop",
    description:
      "Elimină rebuturile înainte să ajungă la client. Camerele noastre inspectează fiecare piesă la viteze pe care niciun operator nu le poate atinge, detectând defecte sub-milimetrice. Se montează pe banda existentă, fără modificări. Ideal dacă produci pentru export și ai clauze stricte de calitate.",
    bullets: ["Detectare defecte sub 1mm, în timp real", "Montare pe bandă existentă, fără modificări", "Rebuturi cu 90%+ mai puține la clienții de export"],
    package: "UZX-Vision",
  },
  {
    num: "05",
    industry: "Edge Computing & Conectivitate MES",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop",
    description:
      "Conectează utilajele la biroul tău, indiferent de brand sau vechime. Gateway-ul nostru traduce automat datele din orice mașină în formatul ERP-ului tău — fără introducere manuală, fără fișe de hârtie, fără erori umane. Managerul vede producția live, operatorul primește instrucțiuni digitale.",
    bullets: ["Compatibil cu orice brand de utilaj", "Date de producție live în ERP/MES, fără hârtie", "Timp de implementare: sub 2 săptămâni"],
    package: "UZX-Edge",
  },
  {
    num: "06",
    industry: "Software industrial pe comandă",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&q=80&auto=format&fit=crop",
    description:
      "Ai un proces pe care niciun soft de raft nu-l rezolvă? Îți dezvoltăm aplicații industriale la comandă — de la panouri SCADA personalizate și interfețe HMI, la sisteme de planificare producție, trasabilitate lot și raportare automată. Codul e al tău, rulează pe serverele tale, fără abonamente lunare sau dependență de vendor.",
    bullets: ["SCADA, HMI și panouri de control personalizate", "Trasabilitate completă lot-by-lot pentru audit", "Cod proprietar, fără licențe recurente"],
    package: "UZX-Software",
  },
];

export const SOLUTIONS_DEFAULT: SolutionsData = {
  eyebrow: "06 / Industry 4.0",
  titleLine1: "Soluții integrate",
  titleLine2: "pentru fabrica viitorului.",
  description:
    "Cinci direcții tehnologice pe care le integrăm la cheie: de la senzorii IIoT plug & play, la cobots, mentenanță predictivă, inspecție optică și conectivitate MES.",
  ctaLabel: "Solicită o evaluare gratuită",
  ctaHref: "#contact",
  items: SOLUTIONS,
};

export function Solutions({ data }: { data?: SolutionsData | null }) {
  const d = data ?? SOLUTIONS_DEFAULT;
  return (
    <section id="solutii" className="border-b hairline py-10 lg:py-14 bg-ink-50">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-6">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">{d.eyebrow}</div>
            <h2 className="serif text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
              {d.titleLine1}<br />{d.titleLine2}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-500 text-lg leading-relaxed">
              {d.description}
            </p>
          </div>
        </div>

        <div className="space-y-px bg-ink-200">
          {d.items.map((s, i) => (
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
            href={d.ctaHref}
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center gap-3 group transition"
          >
            {d.ctaLabel}
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
