"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ChangelogData } from "@/components/NewsSection";

export function Changelog({ data }: { data: ChangelogData }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDate, setActiveDate] = useState<string>(data?.date || "");

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-entry-date]")
    );
    if (items.length === 0) return;

    // Initial: first visible entry's date
    setActiveDate(items[0].dataset.entryDate || data?.date || "");

    const io = new IntersectionObserver(
      (entries) => {
        // find the topmost visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          )[0];
        if (visible) {
          const d = (visible.target as HTMLElement).dataset.entryDate;
          if (d) setActiveDate(d);
        }
      },
      {
        root: container,
        rootMargin: "-10% 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [data]);

  if (!data || !data.entries || data.entries.length === 0) return null;

  return (
    <section className="border-t hairline">
      <div className="container-x py-14 lg:py-20">
        <div className="max-w-6xl mx-auto lg:pr-[340px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT — sticky title + live-updating date */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[140px]">
                <h2
                  className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                  style={{ letterSpacing: "-0.025em" }}
                >
                  {data.title}
                </h2>
                <div className="text-xs mono text-ink-400 uppercase tracking-wider mb-2">
                  Perioada afișată
                </div>
                <div
                  key={activeDate}
                  className="serif text-2xl text-uzx-blue transition-opacity duration-300"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {activeDate || data.date}
                </div>
              </div>
            </div>

            {/* RIGHT — internal scroll with IO-tracked entries */}
            <div className="lg:col-span-8">
              <div
                ref={scrollRef}
                className="changelog-track max-h-[420px] lg:max-h-[480px] overflow-y-auto pr-2 -mr-2"
                style={{
                  scrollbarWidth: "thin",
                }}
              >
                <style>{`
                  .changelog-track::-webkit-scrollbar { width: 4px; }
                  .changelog-track::-webkit-scrollbar-track { background: transparent; }
                  .changelog-track::-webkit-scrollbar-thumb { background: #d6d6da; }
                  .changelog-track::-webkit-scrollbar-thumb:hover { background: #1e6bb8; }
                `}</style>
                <div className="divide-y divide-ink-200 divide-dashed">
                  {data.entries.map((e, i) => (
                    <div
                      key={i}
                      data-entry-date={e.date || data.date}
                      className="py-5 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 items-start"
                    >
                      <div>
                        <span className="inline-block text-[10px] uppercase tracking-widest mono font-bold text-uzx-blue bg-uzx-blue/10 px-2 py-1">
                          {e.category}
                        </span>
                      </div>
                      <div className="text-sm text-ink-700 leading-relaxed">
                        {e.text}
                        {e.href && (
                          <>
                            {" "}
                            <Link
                              href={e.href}
                              className="text-uzx-blue font-medium hover:underline inline-flex items-center gap-1"
                            >
                              Detalii <span>›</span>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
