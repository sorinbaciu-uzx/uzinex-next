"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Product } from "@/app/magazin/products";

type Props = { items: Product[] };

export function SimilarCarousel({ items }: Props) {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setVisible(1);
      else if (w < 1024) setVisible(2);
      else setVisible(3);
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / visible));
  const safePage = Math.min(page, pages - 1);
  const showControls = pages > 1;

  useEffect(() => {
    setPage((prev) => Math.min(prev, pages - 1));
  }, [pages]);

  const startIndex = safePage * visible;
  const currentItems = items.slice(startIndex, startIndex + visible);

  // swipe
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.changedTouches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;

    const dx = startX.current - e.changedTouches[0].clientX;

    if (Math.abs(dx) > 40 && showControls) {
      setPage((p) =>
        Math.max(0, Math.min(pages - 1, p + (dx > 0 ? 1 : -1)))
      );
    }

    startX.current = null;
  };

  if (total === 0) return null;

  return (
    <div className="relative">
      {showControls && (
        <>
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="hidden md:flex absolute -left-3 lg:-left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center border border-ink-200 bg-white shadow-sm text-ink-500 hover:text-uzx-orange hover:border-uzx-orange transition disabled:opacity-30 disabled:cursor-default"
            >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Următor"
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={safePage >= pages - 1}
            className="hidden md:flex absolute -right-3 lg:-right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center border border-ink-200 bg-white shadow-sm text-ink-500 hover:text-uzx-orange hover:border-uzx-orange transition disabled:opacity-30 disabled:cursor-default"
            >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      <div
        className="overflow-hidden md:px-12"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentItems.map((p) => (
            <article
              key={p.sku}
              className="group relative bg-white border border-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col overflow-hidden h-full"
            >
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
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
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
          ))}
        </div>
      </div>

      {showControls && (
        <div className="md:hidden mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Anterior"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={safePage === 0}
            className="w-12 h-12 border border-ink-200 hairline flex items-center justify-center text-ink-700 hover:border-ink-900 hover:text-ink-900 transition text-lg disabled:opacity-30 disabled:cursor-default"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Următor"
            onClick={() => setPage((p) => Math.min(pages - 1, p + 1))}
            disabled={safePage >= pages - 1}
            className="w-12 h-12 border border-ink-200 hairline flex items-center justify-center text-ink-700 hover:border-ink-900 hover:text-ink-900 transition text-lg disabled:opacity-30 disabled:cursor-default"
          >
            →
          </button>
        </div>
      )}

      {showControls && (
        <div className="mt-4 md:mt-6 flex items-center justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Pagina ${i + 1}`}
              onClick={() => setPage(i)}
              className={`w-2.5 h-2.5 transition ${
                i === safePage
                  ? "bg-ink-600 scale-110"
                  : "bg-ink-300 hover:bg-ink-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}