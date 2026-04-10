"use client";

import Link from "next/link";
import type { Highlight } from "@/components/NewsSection";

export function Highlights({ items }: { items: Highlight[] }) {
  if (!items || items.length === 0) return null;

  const doubled = [...items, ...items];
  const dur = items.length * 6;

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

      <style>{`
        @keyframes hl-scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .hl-marquee {
          animation: hl-scroll ${dur * 2}s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .hl-marquee:hover {
          animation-play-state: paused;
        }
        .hl-marquee > * {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      <div className="overflow-hidden pb-12 lg:pb-16 lg:mr-[340px]">
        <div
          className="hl-marquee flex gap-5 lg:gap-6"
          style={{ width: "max-content" }}
        >
          {doubled.map((h, i) => {
            const bg = h.color || "#1e6bb8";
            const card = (
              <div
                className="w-[280px] lg:w-[320px] h-[400px] lg:h-[440px] p-7 lg:p-8 flex flex-col shadow-[0_24px_50px_-20px_rgba(8,37,69,0.35)] text-white"
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
        </div>
      </div>
    </section>
  );
}
