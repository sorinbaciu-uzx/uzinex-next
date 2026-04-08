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
  youtubeId?: string;
};

const CASES: CaseStudy[] = [
  {
    client: "FUTURE ENERGY GROUP S.R.L.",
    image: "https://img.youtube.com/vi/DQO74tlDNNQ/maxresdefault.jpg",
    alt: "Instalație de sudură industrială Uzinex livrată Future Energy Group — pusă în funcțiune în 2 ore",
    title: "Future Energy Group reduce timpul de instalare",
    subtitle: "cu o nouă instalație de sudură industrială pusă în funcțiune în doar 2 ore",
    youtubeId: "DQO74tlDNNQ",
  },
  {
    client: "CAMMA TEHNO METAL S.R.L.",
    image: "https://img.youtube.com/vi/AoMfOAPQzVQ/maxresdefault.jpg",
    alt: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România — echipamente Uzinex pentru CAMMA Tehno Metal",
    title: "Linie completă de producție pentru cea mai mare fabrică",
    subtitle: "de cărămidă modulară din România",
    youtubeId: "AoMfOAPQzVQ",
  },
  {
    client: "AIRONE",
    image: "https://img.youtube.com/vi/LVRLKCO4yQY/maxresdefault.jpg",
    alt: "Echipamente Uzinex pentru AIRONE — lider piață HoReCa România",
    title: "Fabrică de echipamente HoReCa pentru cel mai important",
    subtitle: "jucător din piața din România",
    youtubeId: "LVRLKCO4yQY",
  },
  {
    client: "GEOMAR S.R.L.",
    image: "https://img.youtube.com/vi/Ofsgi59eWI4/maxresdefault.jpg",
    alt: "Fabrică de confecții metalice Geomar Pitești — dotare completă cu echipamente Uzinex",
    title: "Fabrică de confecții metalice dotată integral",
    subtitle: "cu echipamente Uzinex la Pitești",
    youtubeId: "Ofsgi59eWI4",
  },
  {
    client: "GOLD PACK S.R.L.",
    image: "https://img.youtube.com/vi/Jqy_Rx89lH0/maxresdefault.jpg",
    alt: "Linie de producție ambalaje carton Uzinex pentru Gold Pack Râmnicu Sărat",
    title: "Fabrică de ambalaje personalizate din carton",
    subtitle: "cu linie de producție completă la Râmnicu Sărat",
    youtubeId: "Jqy_Rx89lH0",
  },
];

export function CaseStudies() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [activeVideo, setActiveVideo] = useState<CaseStudy | null>(null);

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
    <section id="studii" className="border-b hairline py-10 lg:py-14 bg-white">
      <div className="container-x">
        <div className="text-center mb-8">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
            01 / Studii de caz
          </div>
          <h2
            className="serif text-2xl md:text-3xl lg:text-4xl text-ink-900 leading-[0.95]"
            style={{ letterSpacing: "-0.03em" }}
          >
            Cazuri de succes <span className="font-light text-uzx-orange">remarcabile.</span>
          </h2>
          <p className="text-ink-500 mt-5 max-w-xl mx-auto text-base">
            Produse și servicii care au câștigat aprecierea și încrederea clienților din industrie.
          </p>
        </div>

        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "pan-y" }}
        >
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
              <button
                type="button"
                onClick={() => c.youtubeId && setActiveVideo(c)}
                disabled={!c.youtubeId}
                aria-label={c.youtubeId ? `Vezi videoclipul: ${c.title}` : c.title}
                className="relative overflow-hidden h-72 lg:h-auto group disabled:cursor-default"
              >
                <Image
                  src={c.image}
                  alt={c.alt ?? c.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition duration-700"
                  priority={index === 0}
                />
                {c.youtubeId && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,37,69,0) 40%, rgba(8,37,69,0.55) 100%)",
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-20 h-20 bg-white/15 backdrop-blur border border-white/40 flex items-center justify-center group-hover:bg-uzx-orange group-hover:border-uzx-orange transition">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </button>
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
                <p
                  className="serif text-2xl lg:text-3xl text-ink-500 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {c.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-6 mt-10">
                  {c.youtubeId && (
                    <button
                      type="button"
                      onClick={() => setActiveVideo(c)}
                      className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-6 py-3 inline-flex items-center gap-3 group transition"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      Vezi video
                    </button>
                  )}
                  <a
                    href="/studii-de-caz"
                    className="inline-flex items-center gap-3 text-sm text-ink-700 underline-link group w-fit"
                  >
                    Citește mai mult
                    <span className="group-hover:translate-x-1 transition">→</span>
                  </a>
                </div>
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

        {/* Link la pagina completă */}
        <div className="flex justify-center mt-8">
          <a
            href="/studii-de-caz"
            className="group inline-flex items-center gap-3 text-sm text-ink-700 hover:text-uzx-blue transition"
          >
            <span className="w-12 h-px bg-ink-300 group-hover:bg-uzx-blue transition" />
            Vezi toate studiile de caz
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>

      {/* YouTube lightbox */}
      <AnimatePresence>
        {activeVideo && activeVideo.youtubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(5,15,30,0.92)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl cursor-default"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Închide"
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
              >
                ✕
              </button>
              <div className="aspect-video bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-white">
                <div className="text-[11px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  {activeVideo.client}
                </div>
                <div className="serif text-xl">{activeVideo.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
