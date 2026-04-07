"use client";

import { useState } from "react";
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
    title: "Uzinex la TVR — soluții industriale pentru proiecte cu fonduri europene",
    type: "TV",
    date: "2026",
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80&auto=format&fit=crop",
    youtubeId: "BYtV6hoJ28Y",
    duration: "8:42",
  },
  {
    id: "v2",
    title: "Demo aparat sudură industrială — pus în funcțiune în 2 ore",
    type: "Demo",
    date: "2026",
    thumbnail: "/cases/feg-instalatie-sudura-industriala-uzinex.webp",
    youtubeId: "BYtV6hoJ28Y",
    duration: "3:15",
  },
  {
    id: "v3",
    title: "Hannover Messe — prezentarea noilor linii robotizate Uzinex",
    type: "Târg",
    date: "2025",
    thumbnail: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=900&q=80&auto=format&fit=crop",
    youtubeId: "BYtV6hoJ28Y",
    duration: "12:08",
  },
  {
    id: "v4",
    title: "Romexpo IndustryExpo — stand interactiv cu echipamente CNC",
    type: "Târg",
    date: "2025",
    thumbnail: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=80&auto=format&fit=crop",
    youtubeId: "BYtV6hoJ28Y",
    duration: "6:20",
  },
  {
    id: "v5",
    title: "Interviu CEO Uzinex — strategia integrator industrial 2026",
    type: "Interviu",
    date: "2026",
    thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80&auto=format&fit=crop",
    youtubeId: "BYtV6hoJ28Y",
    duration: "15:47",
  },
  {
    id: "v6",
    title: "Reportaj ProTV — automatizarea unei fabrici cu echipamente Uzinex",
    type: "Reportaj",
    date: "2025",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&q=80&auto=format&fit=crop",
    youtubeId: "BYtV6hoJ28Y",
    duration: "5:03",
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

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.button
              key={v.id}
              onClick={() => setActive(v)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group text-left relative overflow-hidden border hairline hover:border-uzx-blue transition"
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

        <div className="flex justify-center mt-12">
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-sm text-ink-700 hover:text-uzx-blue transition"
          >
            <span className="w-12 h-px bg-ink-300 group-hover:bg-uzx-blue transition" />
            Vezi toate aparițiile media
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
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
