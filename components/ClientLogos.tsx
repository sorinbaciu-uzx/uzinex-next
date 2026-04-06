"use client";

import { motion } from "motion/react";

const CLIENTS = [
  { name: "Cărămidă Modulară România", src: "/clients/caramida.png" },
  { name: "Iron", src: "/clients/iron.png" },
  { name: "Future Energy Group", src: "/clients/feg.webp" },
  { name: "Geomar Metal Work", src: "/clients/geomar.png" },
  { name: "MDG Gold Paper", src: "/clients/mdg.webp" },
];

export function ClientLogos() {
  // Duplicate for seamless loop
  const track = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="bg-ink-900 border-b border-ink-800 py-10">
      <div className="container-x">
        <div className="text-center text-[11px] uppercase tracking-[0.2em] text-ink-400 mb-8 mono">
          — Companii care lucrează cu noi
        </div>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-16 lg:gap-24"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          >
            {track.map((c, i) => (
              <div
                key={i}
                className="shrink-0 h-16 lg:h-20 flex items-center justify-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition"
                title={c.name}
              >
                <img
                  src={c.src}
                  alt={c.name}
                  className="max-h-full w-auto object-contain"
                  style={{ filter: "brightness(1.1) contrast(1.1)" }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
