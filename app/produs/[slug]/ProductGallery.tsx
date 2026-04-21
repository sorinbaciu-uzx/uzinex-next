"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  type MediaItem,
  mediaThumbnailUrl,
  youtubeEmbedUrl,
  youtubeThumbnailUrl,
} from "@/lib/media";

type HeroImage = { type: "image"; url: string; alt: string };
type ViewerItem = HeroImage | MediaItem;

/**
 * Galeria completă a produsului — hero + strip + lightbox.
 *
 * Comportament:
 * - Dacă există video YouTube în galerie → hero afișează thumbnailul
 *   videoclipului cu overlay play, click pe hero → deschide lightbox
 *   la video (autoplay).
 * - Dacă nu există video → hero afișează imaginea principală.
 * - Strip sub hero apare când sunt >1 items totale (incl. main + gallery).
 * - Lightbox: navigare prev/next, ESC close, click outside close.
 *
 * Ordinea în strip și lightbox: videoclipuri primele, apoi imaginea principală,
 * apoi galerie foto — stable sort (ES2019+).
 */
export function ProductGallery({
  sku,
  categoryBadge,
  mainImage,
  mainAlt,
  productName,
  gallery,
}: {
  sku: string;
  categoryBadge: string;
  mainImage: string;
  mainAlt: string;
  productName: string;
  gallery: MediaItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Build ordered list: videos first, main image, then rest
  const videos = gallery.filter((m): m is MediaItem & { type: "youtube" } =>
    m.type === "youtube"
  );
  const galleryImages = gallery.filter(
    (m): m is MediaItem & { type: "image" } => m.type === "image"
  );
  const mainAsItem: HeroImage | null = mainImage
    ? { type: "image", url: mainImage, alt: mainAlt }
    : null;

  const items: ViewerItem[] = [
    ...videos,
    ...(mainAsItem ? [mainAsItem] : []),
    ...galleryImages,
  ];

  const total = items.length;
  const firstVideo = videos[0];
  const heroItem: ViewerItem | null = firstVideo || mainAsItem;

  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  // Keyboard nav + body scroll lock
  useEffect(() => {
    if (openIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [openIndex, prev, next]);

  const showStrip = total > 1;

  return (
    <div className="max-w-md mx-auto">
      {/* HERO BOX */}
      <div className="relative bg-white shadow-2xl shadow-black/30 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-uzx-orange z-10" />
        <div className="absolute top-4 left-4 text-[10px] mono uppercase tracking-[0.15em] text-ink-400 z-10">
          {sku}
        </div>
        <div className="absolute top-4 right-4 text-[9px] mono uppercase tracking-[0.15em] text-uzx-blue border border-uzx-blue/20 bg-uzx-blue/5 px-2 py-0.5 z-10">
          {categoryBadge}
        </div>

        <div className="h-[280px] lg:h-[320px] flex items-center justify-center px-4 pt-6 pb-4">
          {heroItem && heroItem.type === "youtube" ? (
            // HERO = VIDEO THUMBNAIL + PLAY OVERLAY
            <button
              type="button"
              onClick={() => setOpenIndex(0)}
              className="relative w-full h-full group overflow-hidden cursor-pointer"
              aria-label={`Redă video: ${heroItem.alt || productName}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youtubeThumbnailUrl(heroItem.videoId, "maxres")}
                onError={(e) => {
                  // fallback to hqdefault if maxres doesn't exist
                  (e.target as HTMLImageElement).src = youtubeThumbnailUrl(
                    heroItem.videoId,
                    "hq"
                  );
                }}
                alt={heroItem.alt || productName}
                className="w-full h-full object-cover"
              />
              {/* Dark overlay + play button */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/95 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="#ef4444"
                    className="translate-x-0.5"
                  >
                    <path d="M6 3v20l17-10z" />
                  </svg>
                </div>
              </div>
              {/* Badge YouTube */}
              <div className="absolute bottom-3 right-3 bg-red-600 text-white text-[9px] mono uppercase tracking-wider px-2 py-1">
                ▶ Video · YouTube
              </div>
            </button>
          ) : heroItem && heroItem.type === "image" ? (
            // HERO = MAIN IMAGE (clickable pentru lightbox)
            <button
              type="button"
              onClick={() => setOpenIndex(items.indexOf(heroItem))}
              className="relative w-full h-full group cursor-zoom-in"
              aria-label="Deschide galeria"
            >
              <Image
                src={heroItem.url}
                alt={heroItem.alt || productName}
                width={500}
                height={360}
                className="object-contain max-h-full w-full"
                priority
              />
              {showStrip && (
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[9px] mono uppercase tracking-wider px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                  + {total - 1} items · click
                </div>
              )}
            </button>
          ) : (
            // NO MEDIA
            <div className="flex flex-col items-center justify-center text-ink-300">
              <svg
                width="80"
                height="80"
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
              <span className="mt-3 text-[10px] mono uppercase tracking-wider text-ink-300">
                imagine indisponibilă
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STRIP — doar când sunt > 1 items */}
      {showStrip && (
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1">
          {items.map((item, i) => {
            const thumb =
              item.type === "image"
                ? item.url
                : mediaThumbnailUrl(item as MediaItem);
            const isYt = item.type === "youtube";
            const isActive =
              heroItem === item || (openIndex !== null && openIndex === i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={
                  "relative flex-shrink-0 w-16 h-16 bg-white overflow-hidden transition group " +
                  (isActive
                    ? "border-2 border-uzx-orange"
                    : "border border-white/20 hover:border-uzx-orange")
                }
                title={(item as { alt?: string }).alt || "Media " + (i + 1)}
                aria-label={"Deschide media " + (i + 1)}
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
            {total} {total === 1 ? "item" : "items"}
          </div>
        </div>
      )}

      {/* LIGHTBOX */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            aria-label="Închide"
          >
            ✕
          </button>

          <div className="absolute top-4 left-4 text-white/50 text-xs font-mono uppercase tracking-wider z-10">
            {openIndex + 1} / {total}
          </div>

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
                        (item as { alt?: string }).alt ||
                        "Imagine " + (openIndex + 1)
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

          {items[openIndex] && (items[openIndex] as { alt?: string }).alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm max-w-2xl text-center px-4">
              {(items[openIndex] as { alt?: string }).alt}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
