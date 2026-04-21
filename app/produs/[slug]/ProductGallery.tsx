"use client";

import { useCallback, useEffect, useState } from "react";
import {
  type MediaItem,
  mediaThumbnailUrl,
  youtubeEmbedUrl,
} from "@/lib/media";

type HeroImage = { type: "image"; url: string; alt: string };
type GalleryList = Array<HeroImage | MediaItem>;

/**
 * Galeria de produs afișată pe /produs/[slug].
 *
 * Layout:
 * - Imaginea principală (hero) e afișată de componenta părinte (layout unchanged)
 * - Acest component randează thumbnail strip + lightbox modal
 * - Click pe orice thumbnail → deschide lightbox la indexul respectiv
 * - Lightbox: full size image sau YouTube iframe embed, prev/next, ESC close
 */
export function ProductGallery({
  mainImage,
  mainAlt,
  gallery,
}: {
  mainImage: string;
  mainAlt: string;
  gallery: MediaItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Combined list: main image + gallery items.
  // Videos (YouTube) ALWAYS come first — user priority pentru brand
  // storytelling (demo, operare, testimonial) înainte de galerie foto.
  // Array.sort este stable din ES2019, deci imaginile păstrează
  // ordinea definită de admin în editor.
  const items: GalleryList = [
    { type: "image" as const, url: mainImage, alt: mainAlt },
    ...gallery,
  ]
    .filter((m) => m.type !== "image" || !!m.url)
    .sort((a, b) => {
      if (a.type === "youtube" && b.type !== "youtube") return -1;
      if (a.type !== "youtube" && b.type === "youtube") return 1;
      return 0;
    });

  const total = items.length;
  const hasGallery = total > 1;

  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    // prevent body scroll while lightbox open
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [openIndex, prev, next]);

  if (!hasGallery) return null;

  return (
    <>
      {/* THUMBNAIL STRIP — apare sub hero image card */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
        {items.map((item, i) => {
          const thumb =
            item.type === "image"
              ? item.url
              : mediaThumbnailUrl(item as MediaItem);
          const isYt = item.type === "youtube";
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="relative flex-shrink-0 w-16 h-16 bg-white border border-white/20 hover:border-uzx-orange overflow-hidden transition group"
              title={(item as { alt?: string }).alt || "Media " + (i + 1)}
              aria-label={"Deschide imagine " + (i + 1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumb}
                alt={(item as { alt?: string }).alt || "Media " + (i + 1)}
                className="w-full h-full object-cover"
              />
              {isYt && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="#000">
                      <path d="M2.5 1.5v7l5.5-3.5z" />
                    </svg>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-uzx-orange/0 group-hover:bg-uzx-orange/20 transition pointer-events-none" />
            </button>
          );
        })}
        <div className="text-[10px] text-white/60 font-mono shrink-0 pl-2">
          +{total - 1} {total - 1 === 1 ? "item" : "items"}
        </div>
      </div>

      {/* LIGHTBOX */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            aria-label="Închide"
          >
            ✕
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/50 text-xs font-mono uppercase tracking-wider z-10">
            {openIndex + 1} / {total}
          </div>

          {/* Prev */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 text-white/70 hover:text-white text-3xl z-10 flex items-center justify-center"
              aria-label="Anterior"
            >
              ‹
            </button>
          )}

          {/* Content */}
          <div
            className="w-full h-full max-w-6xl max-h-[88vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {(() => {
              const item = items[openIndex];
              if (item.type === "image") {
                return (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.url}
                      alt={
                        (item as { alt?: string }).alt || "Imagine " + (openIndex + 1)
                      }
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                );
              }
              if (item.type === "youtube") {
                return (
                  <div
                    className="relative w-full"
                    style={{ maxWidth: "1280px", aspectRatio: "16 / 9" }}
                  >
                    <iframe
                      src={youtubeEmbedUrl(item.videoId, true)}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={(item as { alt?: string }).alt || "Video YouTube"}
                    />
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Next */}
          {total > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 text-white/70 hover:text-white text-3xl z-10 flex items-center justify-center"
              aria-label="Următor"
            >
              ›
            </button>
          )}

          {/* Alt text caption */}
          {items[openIndex] && (items[openIndex] as { alt?: string }).alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm max-w-2xl text-center px-4">
              {(items[openIndex] as { alt?: string }).alt}
            </div>
          )}
        </div>
      )}
    </>
  );
}

