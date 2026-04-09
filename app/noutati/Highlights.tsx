import Link from "next/link";
import type { Highlight } from "@/components/NewsSection";

export function Highlights({ items }: { items: Highlight[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="bg-ink-50 border-y hairline">
      <div className="container-x py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          <h2
            className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-8"
            style={{ letterSpacing: "-0.025em" }}
          >
            Momente importante
          </h2>

          <div className="overflow-x-auto -mx-6 px-6 pb-3 scrollbar-thin">
            <div className="flex gap-5 min-w-max">
              {items.map((h, i) => {
                const bg = h.color || "#1e6bb8";
                const CardContent = (
                  <div
                    className="w-[260px] lg:w-[280px] h-[280px] lg:h-[300px] p-6 flex flex-col shadow-[0_20px_40px_-20px_rgba(8,37,69,0.3)] text-white transition-transform hover:-translate-y-1"
                    style={{ background: bg }}
                  >
                    <div className="serif text-lg lg:text-xl leading-[1.15] mb-2">
                      {h.title}
                    </div>
                    <div className="text-[11px] mono text-white/70 mb-4">
                      {h.date}
                    </div>
                    <p className="text-xs lg:text-[13px] text-white/85 leading-relaxed line-clamp-5 mb-auto">
                      {h.excerpt}
                    </p>
                    <div className="mt-4 text-[12px] inline-flex items-center gap-1.5 text-white hover:gap-2 transition-all">
                      Află mai mult <span>›</span>
                    </div>
                  </div>
                );
                return h.href ? (
                  <Link key={i} href={h.href} className="shrink-0">
                    {CardContent}
                  </Link>
                ) : (
                  <div key={i} className="shrink-0">
                    {CardContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
