"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/app/magazin/products";

type Props = { items: Product[] };

export function SimilarCarousel({ items }: Props) {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(3);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w <= 640) setVisible(1);
      else if (w <= 1024) setVisible(2);
      else setVisible(3);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    setPage(0);
  }, [visible]);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / visible));
  const safePage = Math.min(page, pages - 1);
  const offsetPct = (safePage * 100) / 1; // each "page" = visible items width

  // touch swipe
  const startX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) setPage((p) => Math.max(0, Math.min(pages - 1, p + (dx > 0 ? 1 : -1))));
    startX.current = null;
  };

  if (total === 0) return null;

  return (
    <div className="relative">
      {/* prev/next — minimal arrows */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={() => setPage((p) => Math.max(0, p - 1))}
        disabled={safePage === 0}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center text-ink-500 hover:text-uzx-orange transition disabled:opacity-30 disabled:hover:text-ink-500 disabled:cursor-default"
        style={{ left: "-40px" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Următor"
        onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
        disabled={safePage >= pages - 1}
        className="hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 items-center justify-center text-ink-500 hover:text-uzx-orange transition disabled:opacity-30 disabled:hover:text-ink-500 disabled:cursor-default"
        style={{ right: "-40px" }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <div className="overflow-hidden" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offsetPct * 100}%)` }}
        >
          {items.map((p) => (
            <div
              key={p.sku}
              className="shrink-0 px-3"
              style={{ flex: `0 0 ${100 / visible}%` }}
            >
              <article className="group relative bg-white border border-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col overflow-hidden h-full">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-uzx-blue" />
                <div className="pt-8 px-5 flex items-center justify-center h-44">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={300}
                      height={220}
                      className="object-contain max-h-full w-auto group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-ink-300">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="px-5 pb-5 flex flex-col flex-1">
                  <h3 className="serif text-[15px] text-ink-900 leading-snug font-medium text-center line-clamp-3 min-h-[60px]">
                    {p.name}
                  </h3>
                  <div className="w-10 h-px bg-uzx-orange mt-2 mx-auto" />
                  <div className="mt-auto pt-5">
                    <a
                      href={`/produs/${p.slug}`}
                      className="block text-center text-[13px] py-2.5 bg-uzx-blue hover:bg-uzx-orange text-white font-semibold transition"
                    >
                      Citește Mai Mult
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      {pages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Pagina ${i + 1}`}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 transition ${
                i === safePage ? "bg-ink-600 scale-110" : "bg-ink-300 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
