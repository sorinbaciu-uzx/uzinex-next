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
  article,
  videoId,
}: {
  article: Article;
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
    : article.image;

  return (
    <>
      <div className="bg-white border hairline shadow-[0_20px_60px_-20px_rgba(8,37,69,0.25)] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* ── LEFT: TEXT CARD ── */}
          <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            <div
              className="text-[11px] uppercase tracking-[0.22em] mono font-bold mb-4"
              style={{
                color: CATEGORY_COLORS[article.category] || "#1e6bb8",
              }}
            >
              {article.category}
            </div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[1.05] mb-6"
              style={{ letterSpacing: "-0.025em" }}
            >
              {article.title}
            </h2>
            {article.authors && article.authors.length > 0 && (
              <div className="flex items-center gap-3 mb-5">
                <div className="flex -space-x-2">
                  {article.authors.map((a, i) =>
                    a.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={a.avatar}
                        alt={a.name}
                        className="w-10 h-10 object-cover border-2 border-white bg-ink-100"
                      />
                    ) : (
                      <div
                        key={i}
                        className="w-10 h-10 border-2 border-white bg-uzx-blue text-white text-xs font-bold flex items-center justify-center"
                        aria-label={a.name}
                      >
                        {a.name
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                    )
                  )}
                </div>
                <div className="text-sm">
                  <div className="text-ink-900 font-medium leading-tight">
                    {article.authors.map((a) => a.name).join(", ")}
                  </div>
                  {article.authors[0].role && (
                    <div className="text-ink-500 text-xs leading-tight">
                      {article.authors[0].role}
                    </div>
                  )}
                </div>
              </div>
            )}
            <p className="text-base text-ink-600 leading-relaxed mb-6">
              {article.excerpt}
            </p>
            <Link
              href={`/noutati/${article.slug}`}
              className="inline-flex items-center gap-2 text-sm text-uzx-blue font-medium hover:gap-3 transition-all"
            >
              Citește mai departe
              <span>›</span>
            </Link>
          </div>

          {/* ── RIGHT: MEDIA ── */}
          <div
            className={`relative ${
              videoId ? "cursor-pointer group" : ""
            } min-h-[280px] lg:min-h-full`}
            onClick={() => videoId && setPlaying(true)}
          >
            {thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnail}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1e6bb8 0%, #082545 50%, #6b3410 100%)",
                }}
              >
                <div
                  className="absolute inset-0 opacity-25"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, rgba(245,133,31,0.35), transparent 50%), radial-gradient(circle at 80% 20%, rgba(30,107,184,0.4), transparent 50%)",
                  }}
                />
                <div className="serif text-white/90 text-6xl font-light relative z-10">
                  uzinex
                </div>
              </div>
            )}
            {videoId && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

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
