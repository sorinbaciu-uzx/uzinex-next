"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { Highlight } from "@/components/NewsSection";

export function Highlights({ items }: { items: Highlight[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [dragged, setDragged] = useState(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  if (!items || items.length === 0) return null;

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!trackRef.current) return;
    setIsDown(true);
    setDragged(false);
    startX.current = e.clientX;
    startScroll.current = trackRef.current.scrollLeft;
    trackRef.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!isDown || !trackRef.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 5) setDragged(true);
    trackRef.current.scrollLeft = startScroll.current - dx;
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    setIsDown(false);
    if (trackRef.current) {
      try {
        trackRef.current.releasePointerCapture(e.pointerId);
      } catch {}
    }
    // clear dragged flag after click bubble so links can be suppressed
    setTimeout(() => setDragged(false), 0);
  }

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
            <div className="text-xs mono text-ink-400 hidden md:block">
              — Trage pentru a naviga →
            </div>
          </div>
        </div>
      </div>

      {/* drag track — full width, no max container so cards overflow gracefully */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`hl-track overflow-x-auto overscroll-x-contain select-none pb-12 lg:pb-16 ${
          isDown ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>{`.hl-track::-webkit-scrollbar { display: none; }`}</style>
        <div className="flex gap-5 lg:gap-6 px-6 lg:px-[max(calc((100vw-72rem)/2),1.5rem)]">
          {items.map((h, i) => {
            const bg = h.color || "#1e6bb8";
            const card = (
              <div
                className="w-[280px] lg:w-[320px] h-[400px] lg:h-[440px] p-7 lg:p-8 flex flex-col shadow-[0_24px_50px_-20px_rgba(8,37,69,0.35)] text-white transition-transform hover:-translate-y-1 pointer-events-none"
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
                key={i}
                href={h.href}
                draggable={false}
                onClick={(e) => {
                  if (dragged) e.preventDefault();
                }}
                className="shrink-0 block pointer-events-auto"
              >
                {card}
              </Link>
            ) : (
              <div key={i} className="shrink-0 pointer-events-auto">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
