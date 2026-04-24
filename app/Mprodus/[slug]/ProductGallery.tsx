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
  const galleryImages = gallery.filter(
    (m): m is MediaItem & { type: "image" } => m.type === "image"
  );

  const videos = gallery.filter((m): m is MediaItem & { type: "youtube" } =>
    m.type === "youtube"
  );

  const mainAsItem: HeroImage | null = mainImage
    ? { type: "image", url: mainImage, alt: mainAlt }
    : null;

  // În poza de referință imaginea principală este prima, iar video-ul apare la final în thumbnails.
  const items: ViewerItem[] = [
    ...(mainAsItem ? [mainAsItem] : []),
    ...galleryImages,
    ...videos,
  ];

  const total = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeItem = items[Math.min(activeIndex, Math.max(total - 1, 0))];

  const prev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((i) => (i + 1) % total);
  }, [total]);

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

  const showArrows = total > 1;
  const visibleThumbs = items.slice(0, 5);

  return (
    <div className="w-full">
      {/* MAIN IMAGE BOX */}
      <div className="relative border border-ink-200 bg-[#f7f8fb] overflow-hidden group">
        {/* Counter */}
        {total > 0 && (
          <div className="absolute left-3 top-3 z-10 border border-ink-300 bg-white px-2.5 py-1 text-[12px] font-bold text-[#0b2b66] shadow-sm">
            {activeIndex + 1}/{total}
          </div>
        )}

        <div className="relative h-[330px] md:h-[390px] lg:h-[430px] flex items-center justify-center p-6 lg:p-8">
          {activeItem && activeItem.type === "youtube" ? (
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

              <div className="absolute inset-0 bg-black/25" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-uzx-orange text-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 26 26"
                    fill="currentColor"
                    className="translate-x-0.5"
                  >
                    <path d="M6 3v20l17-10z" />
                  </svg>
                </div>
              </div>
            </button>
          ) : activeItem && activeItem.type === "image" ? (
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="relative w-full h-full cursor-zoom-in flex items-center justify-center"
              aria-label="Mărește imaginea"
            >
              <Image
                src={activeItem.url}
                alt={activeItem.alt || productName}
                width={760}
                height={520}
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
              <span className="mt-3 text-[10px] uppercase tracking-wider text-ink-300">
                imagine indisponibilă
              </span>
            </div>
          )}
        </div>

        {/* ARROWS */}
        {showArrows && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-ink-300 bg-white text-[#0b2b66] hover:border-uzx-orange hover:text-uzx-orange shadow-sm transition"
              aria-label="Imagine anterioară"
            >
              <span className="flex h-full w-full items-center justify-center">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9,2 3,7 9,12" />
                </svg>
              </span>
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 border border-ink-300 bg-white text-[#0b2b66] hover:border-uzx-orange hover:text-uzx-orange shadow-sm transition"
              aria-label="Imagine următoare"
            >
              <span className="flex h-full w-full items-center justify-center">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="5,2 11,7 5,12" />
                </svg>
              </span>
            </button>
          </>
        )}

        {/* ZOOM BUTTON */}
        {activeItem && activeItem.type === "image" && (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="absolute bottom-3 right-3 z-10 w-11 h-11 border border-ink-300 bg-white text-[#0b2b66] hover:border-uzx-orange hover:text-uzx-orange shadow-sm transition"
            aria-label="Mărește imaginea"
          >
            <span className="flex h-full w-full items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M13 13l4 4" />
                <path d="M8.5 6v5M6 8.5h5" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* THUMBNAILS */}
      {total > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-3">
          {visibleThumbs.map((item, i) => {
            const isYt = item.type === "youtube";
            const thumb =
              item.type === "image"
                ? item.url
                : mediaThumbnailUrl(item as MediaItem);

            const isActive = activeIndex === i;

            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={
                  "relative h-[72px] md:h-[82px] overflow-hidden bg-white transition " +
                  (isActive
                    ? "border-2 border-uzx-blue"
                    : "border border-ink-200 hover:border-uzx-orange")
                }
                aria-label={`Arată media ${i + 1}`}
                aria-pressed={isActive}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt={(item as { alt?: string }).alt || `Media ${i + 1}`}
                  className={
                    isYt
                      ? "w-full h-full object-cover"
                      : "w-full h-full object-contain p-1.5"
                  }
                />

                {isYt && (
                  <>
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="w-9 h-9 rounded-full bg-uzx-orange flex items-center justify-center">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 12 12"
                          fill="currentColor"
                          className="translate-x-0.5"
                        >
                          <path d="M3 1.5v9l7-4.5z" />
                        </svg>
                      </div>
                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wide">
                        Vezi video
                      </span>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* LIGHTBOX */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 lg:p-8"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="bg-white w-full max-w-[1350px] max-h-[92vh] flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 lg:px-6 py-4 border-b border-ink-100 bg-white">
              <div className="text-[14px] font-semibold text-[#0b2b66]">
                {items[activeIndex]?.type === "image" ? "Imagine" : "Video"}{" "}
                {activeIndex + 1}/{total}
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-9 h-9 border border-ink-200 flex items-center justify-center text-[#0b2b66] hover:border-uzx-orange hover:text-uzx-orange transition"
                aria-label="Închide"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path d="M4 4L16 16M16 4L4 16" />
                </svg>
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center min-h-[420px] overflow-hidden bg-white">
              {showArrows && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-[#0b2b66] flex items-center justify-center z-10 transition shadow-sm"
                  aria-label="Anterior"
                >
                  <svg
                    width="16"
                    height="16"
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

              <div className="w-full h-full flex items-center justify-center p-6 lg:p-14">
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
                          `Imagine ${activeIndex + 1}`
                        }
                        className="max-w-full max-h-[72vh] object-contain"
                      />
                    );
                  }

                  if (item.type === "youtube") {
                    return (
                      <div
                        className="relative w-full"
                        style={{ maxWidth: "1180px", aspectRatio: "16 / 9" }}
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-ink-200 hover:border-uzx-orange hover:text-uzx-orange text-[#0b2b66] flex items-center justify-center z-10 transition shadow-sm"
                  aria-label="Următor"
                >
                  <svg
                    width="16"
                    height="16"
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
          </div>
        </div>
      )}
    </div>
  );
}