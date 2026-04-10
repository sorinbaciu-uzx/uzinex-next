"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { Highlight } from "@/components/NewsSection";

export function Highlights({ items }: { items: Highlight[] }) {
  if (!items || items.length === 0) return null;

  // duplicate items for seamless infinite loop
  const doubled = [...items, ...items];

  return (
    <section className="bg-ink-50 border-y hairline">
      <div className="container-x py-12 lg:py-16">
        <div className="max-w-6xl mx-auto lg:pr-[340px]">
          <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
            <h2
              className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]"
              style={{ letterSpacing: "-0.025em" }}
            >
              Momente importante
            </h2>
          </div>
        </div>
      </div>

      {/* Infinite marquee track */}
      <div className="overflow-hidden pb-12 lg:pb-16 lg:mr-[340px]">
        <motion.div
          className="flex gap-5 lg:gap-6 hl-marquee"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: items.length * 6,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          <style>{`
            .hl-marquee:hover { animation-play-state: paused !important; }
            .hl-marquee > * { flex-shrink: 0; }
          `}</style>
          {doubled.map((h, i) => {
            const bg = h.color || "#1e6bb8";
            const card = (
              <div
                className="w-[280px] lg:w-[320px] h-[400px] lg:h-[440px] p-7 lg:p-8 flex flex-col shadow-[0_24px_50px_-20px_rgba(8,37,69,0.35)] text-white transition-transform hover:-translate-y-1"
                style={{ background: bg }}
              >
                <div className="serif text-[22px] lg:text-2xl leading-[1.12] mb-3">
                  {h.title}
                </div>
                <div className="text-[11px] mono text-white/70 mb-5">
                  {h.date}
                </div>
                <p className="text-sm text-white/85 leading-relaxed line-clamp-[8] mb-auto">
                  {h.excerpt}
                </p>
                <div className="mt-6 text-[13px] inline-flex items-center gap-1.5 text-white">
                  Află mai mult <span>›</span>
                </div>
              </div>
            );
            return h.href ? (
              <Link
                key={`${i}-${h.title}`}
                href={h.href}
                draggable={false}
                className="shrink-0 block"
              >
                {card}
              </Link>
            ) : (
              <div key={`${i}-${h.title}`} className="shrink-0">
                {card}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
