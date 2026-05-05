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
 * Galerie produs — "in-place swap" style:
 * - Click pe thumbnail → schimbă DOAR imaginea hero (nu deschide lightbox)
 * - Săgeți prev/next pe hero → navighează între items
 * - Click pe "Toată galeria" → deschide lightbox
 * - Click pe hero (imagine) → deschide lightbox pentru zoom
 * - Click pe hero (video) → deschide lightbox cu autoplay
 *
 * Ordine items: videoclipurile primele, apoi imaginea principală, apoi galerie
 * (stable sort).
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeItem = items[Math.min(activeIndex, total - 1)];

  const prev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  // Keyboard nav in lightbox + close
  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, prev, next]);

  const showStrip = total > 1;
  const showArrows = total > 1;

  return (
    <div className="max-w-lg mx-auto">
      {/* HERO BOX */}
      <div className="relative bg-white overflow-hidden group">
        <div className="h-[340px] lg:h-[420px] flex items-center justify-center p-8 lg:p-10">
          {activeItem && activeItem.type === "youtube" ? (
            // HERO = VIDEO THUMBNAIL cu play button
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative w-full h-full overflow-hidden cursor-pointer"
              aria-label={`Redă video: ${activeItem.alt || productName}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={youtubeThumbnailUrl(activeItem.videoId, "maxres")}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = youtubeThumbnailUrl(
                    activeItem.videoId,
                    "hq"
                  );
                }}
                alt={activeItem.alt || productName}
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
          ) : activeItem && activeItem.type === "image" ? (
            // HERO = IMAGE (click opens lightbox zoom)
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative w-full h-full cursor-zoom-in"
              aria-label="Mărește imaginea"
            >
              <Image
                src={activeItem.url}
                alt={activeItem.alt || productName}
                width={600}
                height={420}
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-contain max-h-full w-full"
                priority={activeIndex === 0}
              />
            </button>
          ) : (
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

        {/* NAV ARROWS — inline pe hero (swap, nu deschide lightbox) */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-ink-700 flex items-center justify-center shadow-sm transition z-10"
              aria-label="Imagine anterioară"
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
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-ink-700 flex items-center justify-center shadow-sm transition z-10"
              aria-label="Imagine următoare"
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

            {/* Counter în colț jos dreapta */}
            <div className="absolute bottom-3 right-3 text-[10px] mono uppercase tracking-wider text-ink-400 bg-white/80 px-2 py-1 z-10">
              {activeIndex + 1} / {total}
            </div>
          </>
        )}

        {/* Prefetch vecinii (prev/next) ca să fie deja în cache la click pe săgeată */}
        {total > 1 && (
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 pointer-events-none -z-10"
          >
            {items.map((it, i) => {
              if (it.type !== "image") return null;
              const isNeighbor =
                i === (activeIndex + 1) % total ||
                i === (activeIndex - 1 + total) % total;
              if (!isNeighbor) return null;
              return (
                <Image
                  key={`prefetch-${i}-${it.url}`}
                  src={it.url}
                  alt=""
                  width={600}
                  height={420}
                  sizes="(max-width: 1024px) 100vw, 600px"
                  loading="eager"
                />
              );
            })}
          </div>
        )}
      </div>

      {/* STRIP */}
      {showStrip && (
        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 h-16 bg-white border border-ink-200 hover:border-uzx-orange text-ink-700 text-xs font-medium transition shrink-0"
            aria-label="Deschide toată galeria media (lightbox)"
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
            Toată galeria
          </button>
          {items.slice(0, 3).map((item, i) => {
            const thumb =
              item.type === "image"
                ? item.url
                : mediaThumbnailUrl(item as MediaItem);
            const isYt = item.type === "youtube";
            const isActive = activeIndex === i;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={
                  "relative flex-shrink-0 w-16 h-16 bg-white overflow-hidden transition " +
                  (isActive
                    ? "border-2 border-uzx-orange"
                    : "border border-ink-200 hover:border-uzx-orange")
                }
                title={(item as { alt?: string }).alt || "Media " + (i + 1)}
                aria-label={`Arată media ${i + 1}`}
                aria-pressed={isActive}
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
              onClick={() => setLightboxOpen(true)}
              className="relative w-16 h-16 bg-white border border-ink-200 hover:border-uzx-orange flex items-center justify-center text-ink-700 text-sm font-medium transition shrink-0"
              aria-label={`Vezi toate ${total} media items`}
            >
              +{total - 3}
            </button>
          )}
        </div>
      )}

      {/* LIGHTBOX — doar când lightboxOpen = true */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white w-full max-w-[1400px] max-h-[92vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER BAR */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-ink-100 bg-gradient-to-b from-ink-50 to-white">
              <div className="text-base text-ink-700 font-medium">
                {items[activeIndex]?.type === "image" ? "Imagine" : "Video"}{" "}
                {activeIndex + 1}/{total}
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
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

            {/* CONTENT */}
            <div className="relative flex-1 flex items-center justify-center min-h-[400px] overflow-hidden">
              {showArrows && (
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

              <div className="w-full h-full flex items-center justify-center p-8 lg:p-16">
                {(() => {
                  const item = items[activeIndex];
                  if (!item) return null;
                  if (item.type === "image") {
                    return (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.url}
                        alt={
                          (item as { alt?: string }).alt ||
                          "Imagine " + (activeIndex + 1)
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

              {showArrows && (
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

            {/* FOOTER */}
            {items[activeIndex] &&
              (items[activeIndex] as { alt?: string }).alt && (
                <div className="px-6 py-3 border-t border-ink-100 text-sm text-ink-600 text-center">
                  {(items[activeIndex] as { alt?: string }).alt}
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
