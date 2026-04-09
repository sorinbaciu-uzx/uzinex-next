"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Article } from "@/components/NewsSection";

const CATEGORY_COLORS: Record<Article["category"], string> = {
  Comunicat: "#f5851f",
  Articol: "#1e6bb8",
  Anunț: "#e06d00",
  Studiu: "#155290",
};

export function HeroFeatured({
  primary,
  secondary,
  videoId,
}: {
  primary: Article;
  secondary?: Article;
  videoId?: string;
}) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(false);
    };
    if (playing) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [playing]);

  const thumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : primary.image;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ── PRIMARY (video + overlaid card) ── */}
        <div className="lg:col-span-8 relative">
          <div
            className="relative border hairline overflow-hidden group cursor-pointer"
            onClick={() => videoId && setPlaying(true)}
          >
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt={primary.title}
                className="w-full aspect-[16/10] object-cover"
              />
            ) : (
              <div
                className="w-full aspect-[16/10] flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #082545 0%, #1e6bb8 100%)",
                }}
              >
                <div className="serif text-white/90 text-6xl font-light">
                  uzinex
                </div>
              </div>
            )}

            {/* play button */}
            {videoId && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 lg:w-24 lg:h-24 bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-105 transition">
                  <svg
                    viewBox="0 0 24 24"
                    fill="#082545"
                    className="w-9 h-9 lg:w-11 lg:h-11 ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* small video indicator top-right */}
            {videoId && (
              <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] uppercase tracking-wider mono px-2 py-1 flex items-center gap-1.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Video
              </div>
            )}
          </div>

          {/* overlaid card — sits over the bottom-left of the image on desktop */}
          <Link
            href={`/noutati/${primary.slug}`}
            className="block lg:absolute lg:bottom-8 lg:left-8 lg:max-w-md bg-ink-50 p-6 lg:p-8 mt-4 lg:mt-0 shadow-xl border hairline hover:bg-white transition z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="text-[10px] uppercase tracking-[0.22em] mono font-bold mb-3"
              style={{
                color: CATEGORY_COLORS[primary.category] || "#1e6bb8",
              }}
            >
              {primary.category}
            </div>
            <h2
              className="serif text-2xl lg:text-[28px] text-ink-900 leading-[1.1] mb-3"
              style={{ letterSpacing: "-0.02em" }}
            >
              {primary.title}
            </h2>
            <p className="text-sm text-ink-600 leading-relaxed">
              {primary.excerpt}
            </p>
          </Link>
        </div>

        {/* ── SECONDARY featured (right column) ── */}
        {secondary && (
          <div className="lg:col-span-4">
            <Link
              href={`/noutati/${secondary.slug}`}
              className="group block"
            >
              <div className="border hairline overflow-hidden relative">
                {secondary.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={secondary.image}
                    alt={secondary.title}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div
                    className="w-full aspect-[4/5] flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, #082545 0%, #1e6bb8 100%)",
                    }}
                  >
                    <div className="serif text-white/90 text-4xl font-light">
                      uzinex
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <div
                  className="text-[10px] uppercase tracking-[0.22em] mono font-bold mb-2"
                  style={{
                    color: CATEGORY_COLORS[secondary.category] || "#1e6bb8",
                  }}
                >
                  {secondary.category}
                </div>
                <h3
                  className="serif text-lg lg:text-xl text-ink-900 leading-[1.15] mb-2 group-hover:text-uzx-blue transition"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {secondary.title}
                </h3>
                <p className="text-sm text-ink-500 leading-relaxed line-clamp-3">
                  {secondary.excerpt}
                </p>
              </div>
            </Link>
          </div>
        )}
      </div>

      {/* ── LIGHTBOX ── */}
      {playing && videoId && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 lg:p-8"
          onClick={() => setPlaying(false)}
        >
          <button
            type="button"
            onClick={() => setPlaying(false)}
            className="absolute top-4 right-4 lg:top-6 lg:right-6 text-white text-3xl hover:text-uzx-orange transition leading-none"
            aria-label="Închide"
          >
            ✕
          </button>
          <div
            className="w-full max-w-5xl aspect-video border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
