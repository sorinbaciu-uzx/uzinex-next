"use client";

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
  return (
    <div className="bg-white border hairline shadow-[0_20px_60px_-20px_rgba(8,37,69,0.25)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* ── LEFT: TEXT CARD ── */}
        <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center order-2 lg:order-1">
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

        {/* ── RIGHT: AUTOPLAY LOOP VIDEO (object-cover) ── */}
        <div className="relative min-h-[280px] md:min-h-[360px] lg:min-h-full order-1 lg:order-2 overflow-hidden bg-black">
          {videoId ? (
            <>
              {/* YouTube iframe sized + scaled to crop black bars */}
              <div className="absolute inset-0 pointer-events-none">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0`}
                  title={article.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[177.78vh] min-h-[56.25vw] w-[200%] h-[200%] border-0"
                  frameBorder={0}
                />
              </div>
              {/* subtle bottom gradient to keep it feeling cinematic */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(8,37,69,0.35) 100%)",
                }}
              />
              <div className="absolute top-4 right-4 bg-black/70 text-white text-[10px] uppercase tracking-wider mono px-2 py-1 flex items-center gap-1.5 z-10">
                <span className="w-1.5 h-1.5 bg-red-500 inline-block animate-pulse" />
                Live reel
              </div>
            </>
          ) : article.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.image}
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
              <div className="serif text-white/90 text-6xl font-light">
                uzinex
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
