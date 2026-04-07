"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

type VideoItem = {
  id: string;
  title: string;
  type: "TV" | "Târg" | "Demo" | "Interviu" | "Reportaj";
  date: string;
  thumbnail: string;
  youtubeId: string;
  duration?: string;
};

const VIDEOS: VideoItem[] = [
  {
    id: "v1",
    title: "Uzinex — apariție TV despre soluții industriale",
    type: "TV",
    date: "2026",
    thumbnail: "https://img.youtube.com/vi/-_1CJ3VDFhE/maxresdefault.jpg",
    youtubeId: "-_1CJ3VDFhE",
  },
  {
    id: "v2",
    title: "Reportaj Uzinex — echipamente și tehnologie la cheie",
    type: "Reportaj",
    date: "2025",
    thumbnail: "https://img.youtube.com/vi/cnXAYqGYX5A/maxresdefault.jpg",
    youtubeId: "cnXAYqGYX5A",
  },
  {
    id: "v3",
    title: "Demo tehnic — punere în funcțiune a unui echipament Uzinex",
    type: "Demo",
    date: "2025",
    thumbnail: "https://img.youtube.com/vi/pzPCtrud130/maxresdefault.jpg",
    youtubeId: "pzPCtrud130",
  },
  {
    id: "v4",
    title: "Interviu Uzinex — viziunea de integrator industrial",
    type: "Interviu",
    date: "2025",
    thumbnail: "https://img.youtube.com/vi/Ss0stt74748/maxresdefault.jpg",
    youtubeId: "Ss0stt74748",
  },
  {
    id: "v5",
    title: "Uzinex la Exclusiv TV Moldova — apariție în direct",
    type: "TV",
    date: "2025",
    thumbnail: "https://img.youtube.com/vi/ixaSRPK1mtU/maxresdefault.jpg",
    youtubeId: "ixaSRPK1mtU",
  },
];

const TYPE_COLORS: Record<VideoItem["type"], string> = {
  TV: "#f5851f",
  Târg: "#1e6bb8",
  Demo: "#155290",
  Interviu: "#e06d00",
  Reportaj: "#1e6bb8",
};

export function VideoGallery() {
  const [active, setActive] = useState<VideoItem | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("button");
    const cardWidth = card ? (card as HTMLElement).offsetWidth + 24 : 480;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="border-b hairline py-16 lg:py-20 bg-white">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">04 / Galerie video</div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
              style={{ letterSpacing: "-0.03em" }}
            >
              Uzinex la TV,<br />
              <span className="font-light text-uzx-orange">târguri și pe teren.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-ink-500 text-base leading-relaxed">
              Apariții media, demo-uri tehnice și prezentări de la cele mai importante târguri industriale din
              Europa. Vezi tehnologia noastră în acțiune.
            </p>
          </div>
        </div>

        {/* Horizontal scroll row (no scrollbar) */}
        <div
          ref={trackRef}
          className="-mx-6 px-6 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <style jsx>{`div::-webkit-scrollbar { display: none; }`}</style>
          <div className="flex gap-6 w-max">
          {VIDEOS.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={() => setActive(v)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group text-left relative overflow-hidden border hairline hover:border-uzx-blue transition shrink-0 w-[78vw] sm:w-[320px] lg:w-[360px] snap-start"
            >
              <div className="aspect-video relative overflow-hidden bg-ink-100">
                <Image
                  src={v.thumbnail}
                  alt={v.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                  loading="lazy"
                />
                {/* Dark overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(8,37,69,0.1) 0%, rgba(8,37,69,0.45) 60%, rgba(8,37,69,0.85) 100%)",
                  }}
                />

                {/* Type badge */}
                <div
                  className="absolute top-4 left-4 text-[10px] mono uppercase tracking-widest text-white px-2.5 py-1"
                  style={{ background: TYPE_COLORS[v.type] }}
                >
                  {v.type}
                </div>

                {/* Date */}
                <div className="absolute top-4 right-4 text-[10px] mono text-white/80">{v.date}</div>

                {/* Duration */}
                {v.duration && (
                  <div className="absolute bottom-4 right-4 text-[10px] mono text-white bg-black/60 px-2 py-0.5 num">
                    {v.duration}
                  </div>
                )}

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/15 backdrop-blur border border-white/40 flex items-center justify-center group-hover:bg-uzx-orange group-hover:border-uzx-orange transition"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>
              </div>

              <div className="p-5 bg-white">
                <div className="serif text-sm lg:text-base text-ink-900 leading-snug line-clamp-2">{v.title}</div>
              </div>
            </motion.button>
          ))}
          </div>
        </div>

        {/* Arrows */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Video anterior"
            className="w-12 h-12 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Video următor"
            className="w-12 h-12 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Lightbox modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
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
                onClick={() => setActive(null)}
                aria-label="Închide"
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
              >
                ✕
              </button>
              <div className="aspect-video bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-white">
                <div className="text-[11px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  {active.type} · {active.date}
                </div>
                <div className="serif text-xl">{active.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
