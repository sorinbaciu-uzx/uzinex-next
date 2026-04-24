"use client";

import { useState, type ReactNode } from "react";

export function ExpandableDescription({
  short,
  full,
}: {
  short: string;
  full: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

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