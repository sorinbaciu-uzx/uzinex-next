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
  mainImage,
  mainAlt,
  productName,
  gallery,
}: {
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
    <div className="max-w-lg mx-auto">
      {/* HERO BOX — clean, no overlays */}
      <div className="relative bg-white overflow-hidden">
        <div className="h-[340px] lg:h-[420px] flex items-center justify-center p-8 lg:p-10">
          {heroItem && heroItem.type === "youtube" ? (
            // HERO = VIDEO THUMBNAIL + PLAY OVERLAY (KUKA style, clean)
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
                  (e.target as HTMLImageElement).src = youtubeThumbnailUrl(
                    heroItem.videoId,
                    "hq"
                  );
                }}
                alt={heroItem.alt || productName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
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
                width={600}
                height={420}
                className="object-contain max-h-full w-full"
                priority
              />
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

      {/* STRIP — all Media button + thumbnails */}
      {showStrip && (
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setOpenIndex(0)}
            className="inline-flex items-center gap-2 px-3.5 h-16 bg-white border border-ink-200 hover:border-uzx-orange text-ink-700 text-xs font-medium transition shrink-0"
            aria-label="Deschide toată galeria media"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="1.5" y="2.5" width="10" height="7" />
              <rect x="4.5" y="5.5" width="10" height="7" />
            </svg>
            All Media
          </button>
          {items.slice(0, 3).map((item, i) => {
            const thumb =
              item.type === "image"
                ? item.url
                : mediaThumbnailUrl(item as MediaItem);
            const isYt = item.type === "youtube";
            const isActive = heroItem === item;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpenIndex(i)}
                className={
                  "relative flex-shrink-0 w-16 h-16 bg-white overflow-hidden transition group " +
                  (isActive
                    ? "border-2 border-uzx-orange"
                    : "border border-ink-200 hover:border-uzx-orange")
                }
                title={(item as { alt?: string }).alt || "Media " + (i + 1)}
                aria-label={"Deschide media " + (i + 1)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={(item as { alt?: string }).alt || "Media " + (i + 1)}
                  className="w-full h-full object-contain"
                />
                {isYt && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                    <div className="w-6 h-6 rounded-full bg-white/95 flex items-center justify-center">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="#ef4444">
                        <path d="M2.5 1.5v7l5.5-3.5z" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
          {total > 3 && (
            <button
              type="button"
              onClick={() => setOpenIndex(3)}
              className="relative w-16 h-16 bg-white border border-ink-200 hover:border-uzx-orange flex items-center justify-center text-ink-700 text-sm font-medium transition shrink-0"
              aria-label={`Încă ${total - 3} items`}
            >
              +{total - 3}
            </button>
          )}
        </div>
      )}

      {/* LIGHTBOX — KUKA style: white modal, clear header, squared arrows */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setOpenIndex(null)}
        >
          {/* WHITE MODAL */}
          <div
            className="bg-white w-full max-w-[1400px] max-h-[92vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 bg-gradient-to-b from-ink-50 to-white">
              <div className="text-base text-ink-700 font-medium">
                {items[openIndex].type === "image" ? "Imagine" : "Video"}{" "}
                {openIndex + 1}/{total}
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(null)}
                  className="w-8 h-8 flex items-center justify-center text-ink-700 hover:text-ink-900 transition"
                  aria-label="Închide"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M4 4L16 16M16 4L4 16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* CONTENT AREA */}
            <div className="relative flex-1 flex items-center justify-center min-h-[400px] overflow-hidden">
              {/* PREV */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-ink-700 flex items-center justify-center z-10 transition"
                  aria-label="Anterior"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9,2 3,7 9,12" />
                  </svg>
                </button>
              )}

              {/* MEDIA */}
              <div className="w-full h-full flex items-center justify-center p-8 lg:p-16">
                {(() => {
                  const item = items[openIndex];
                  if (item.type === "image") {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt={
                          (item as { alt?: string }).alt ||
                          "Imagine " + (openIndex + 1)
                        }
                        className="max-w-full max-h-[70vh] object-contain"
                      />
                    );
                  }
                  if (item.type === "youtube") {
                    return (
                      <div
                        className="relative w-full"
                        style={{ maxWidth: "1200px", aspectRatio: "16 / 9" }}
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

              {/* NEXT */}
              {total > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-ink-700 flex items-center justify-center z-10 transition"
                  aria-label="Următor"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="5,2 11,7 5,12" />
                  </svg>
                </button>
              )}
            </div>

            {/* FOOTER — alt text caption */}
            {items[openIndex] && (items[openIndex] as { alt?: string }).alt && (
              <div className="px-6 py-3 border-t border-ink-100 text-sm text-ink-600 text-center">
                {(items[openIndex] as { alt?: string }).alt}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
