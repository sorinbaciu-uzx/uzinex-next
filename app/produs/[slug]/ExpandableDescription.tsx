"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ExpandableDescription({
  short,
  full,
  children,
  collapsedHeight = 560,
  matchBottomSelector,
  minCollapsedHeight = 360,
}: {
  short?: string;
  full?: ReactNode;
  children?: ReactNode;
  collapsedHeight?: number;
  matchBottomSelector?: string;
  minCollapsedHeight?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [matchedHeight, setMatchedHeight] = useState<number | null>(null);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const clipRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!children || !matchBottomSelector) return;

    const target = document.querySelector(matchBottomSelector) as HTMLElement | null;
    if (!target || !clipRef.current) return;

    const updateHeight = () => {
      if (!clipRef.current) return;

      const targetRect = target.getBoundingClientRect();
      const clipRect = clipRef.current.getBoundingClientRect();
      const buttonHeight = buttonRef.current?.getBoundingClientRect().height || 0;

      const nextHeight = targetRect.bottom - clipRect.top - buttonHeight;

      setMatchedHeight(Math.max(minCollapsedHeight, Math.round(nextHeight)));
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(target);

    if (rootRef.current) observer.observe(rootRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    window.addEventListener("resize", updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, [children, matchBottomSelector, minCollapsedHeight]);

  if (children) {
    const finalCollapsedHeight = matchedHeight ?? collapsedHeight;

    return (
      <div ref={rootRef}>
        <div
          ref={clipRef}
          className="relative overflow-hidden transition-all duration-300"
          style={{
            maxHeight: expanded ? "99999px" : `${finalCollapsedHeight}px`,
          }}
        >
          {children}

          {!expanded && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/90 to-transparent" />
          )}
        </div>

        <div ref={buttonRef} className="px-8 lg:px-10 pb-8 bg-white">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="mt-2 inline-flex items-center gap-2 text-[14px] font-bold text-uzx-orange hover:text-[#fa9148] transition"
          >
            {expanded ? "Citește mai puțin ↑" : "Citește mai mult →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!expanded ? (
        <>
          <p
            className="text-[15px] leading-7 text-ink-600 whitespace-pre-line"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 14,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {short}
          </p>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-uzx-orange hover:text-[#fa9148] transition"
          >
            Citește mai mult →
          </button>
        </>
      ) : (
        <>
          <div className="text-[15px] leading-7 text-ink-600 space-y-4">
            {full}
          </div>

          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-uzx-orange hover:text-[#fa9148] transition"
          >
            Citește mai puțin ↑
          </button>
        </>
      )}
    </div>
  );
}