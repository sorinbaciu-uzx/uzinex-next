"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type CaseStudy = {
  client: string;
  image: string;
  alt?: string;
  title: string;
  subtitle: string;
};

const CASES: CaseStudy[] = [
  {
    client: "FUTURE ENERGY GROUP S.R.L.",
    image: "/cases/feg-instalatie-sudura-industriala-uzinex.webp",
    alt: "Instalație de sudură industrială Uzinex livrată Future Energy Group — pusă în funcțiune în 2 ore",
    title: "Future Energy Group reduce timpul de instalare",
    subtitle: "cu o nouă instalație de sudură industrială pusă în funcțiune în doar 2 ore",
  },
  {
    client: "CAMMA TEHNO METAL S.R.L.",
    image: "/cases/camma-tehno-metal-linie-productie-caramida-modulara-uzinex.webp",
    alt: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România — echipamente Uzinex pentru CAMMA Tehno Metal",
    title: "Linie completă de producție pentru cea mai mare fabrică",
    subtitle: "de cărămidă modulară din România",
  },
  {
    client: "MDG GOLD PAPER",
    image:
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1400&q=80&auto=format&fit=crop",
    title: "Procesator de hârtie își triplează capacitatea",
    subtitle: "cu o linie automatizată Uzinex",
  },
  {
    client: "GEOMAR METAL WORK",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1400&q=80&auto=format&fit=crop",
    title: "Atelier metalurgic implementează tăiere laser",
    subtitle: "și obține ROI în doar 14 luni",
  },
  {
    client: "GEO-EX CONSTRUCT",
    image:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1400&q=80&auto=format&fit=crop",
    title: "Soluție completă de utilaje grele pentru lucrări",
    subtitle: "în piatră naturală și exploatări de carieră",
  },
];

export function CaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((i) => (i + 1) % CASES.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + CASES.length) % CASES.length);
  };

  // Swipe gestures for mobile
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const c = CASES[index];

  return (
    <section className="border-b hairline py-16 lg:py-20 bg-white">
      <div className="container-x">
        <div className="text-center mb-12">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
            01 / Studii de caz
          </div>
          <h2
            className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Cazuri de succes <span className="font-light text-uzx-orange">remarcabile.</span>
          </h2>
          <p className="text-ink-500 mt-5 max-w-xl mx-auto text-base">
            Produse și servicii care au câștigat aprecierea și încrederea clienților din industrie.
          </p>
        </div>

        <div className="relative overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ touchAction: "pan-y" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 bg-ink-50 min-h-[460px]"
            >
              <div className="relative overflow-hidden h-72 lg:h-auto">
                <Image
                  src={c.image}
                  alt={c.alt ?? c.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
              <div className="flex flex-col justify-center p-10 lg:p-16">
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink-400 mono mb-6">
                  {c.client}
                </div>
                <h3
                  className="serif text-2xl lg:text-3xl text-ink-900 leading-tight mb-2"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {c.title}
                </h3>
                <p className="serif text-2xl lg:text-3xl text-ink-500 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                  {c.subtitle}
                </p>
                <a
                  href="#"
                  className="mt-10 inline-flex items-center gap-3 text-sm text-ink-700 underline-link group w-fit"
                >
                  Citește mai mult
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prev}
            aria-label="Studiul anterior"
            className="w-12 h-12 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition"
          >
            ←
          </button>
          <div className="text-xs mono text-ink-400 num min-w-[60px] text-center">
            {String(index + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
          </div>
          <button
            onClick={next}
            aria-label="Studiul următor"
            className="w-12 h-12 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
