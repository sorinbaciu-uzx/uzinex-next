"use client";

import { motion } from "motion/react";

export function CrawlerTracksAnim() {
  return (
    <svg viewBox="0 0 280 145" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="280" height="145" fill="#ffffff" />

      <line x1="20" y1="105" x2="260" y2="105" stroke="#cdd7e4" strokeWidth="1.2" strokeDasharray="3 4" />

      <g transform="translate(95 60)">
        <rect x="0" y="0" width="90" height="32" rx="3" fill="#0b2b66" />
        <rect x="6" y="6" width="78" height="20" rx="2" fill="#1e6bb8" />

        <circle cx="68" cy="16" r="6" fill="#f5851f" />
        <circle cx="68" cy="16" r="2.5" fill="#ffffff" />

        <rect x="14" y="10" width="36" height="12" rx="1" fill="#0b2b66" opacity="0.7" />
        <line x1="20" y1="13" x2="44" y2="13" stroke="#f5851f" strokeWidth="0.8" />
        <line x1="20" y1="16" x2="44" y2="16" stroke="#f5851f" strokeWidth="0.8" opacity="0.6" />
        <line x1="20" y1="19" x2="44" y2="19" stroke="#f5851f" strokeWidth="0.8" opacity="0.4" />

        <rect x="-4" y="32" width="98" height="14" rx="7" fill="#0b2b66" />

        {[8, 24, 40, 56, 72, 86].map((cx, i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy="39"
            r="3.5"
            fill="#1e6bb8"
            stroke="#ffffff"
            strokeWidth="0.8"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
            style={{ transformOrigin: `${cx}px 39px` }}
          />
        ))}
      </g>

      <motion.g
        animate={{ x: [0, -16, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
      >
        {[40, 56, 72, 88, 104, 120, 136, 152, 168, 184, 200, 216, 232].map((x, i) => (
          <rect key={i} x={x} y="103" width="8" height="4" fill="#f5851f" opacity="0.5" />
        ))}
      </motion.g>

      <text
        x="140"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fill="#0b2b66"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="ui-monospace, monospace"
      >
        CRAWLER · 4 ROȚI MOTOARE
      </text>

      <text
        x="140"
        y="135"
        textAnchor="middle"
        fontSize="8"
        fill="#6b7a92"
        fontFamily="ui-monospace, monospace"
      >
        0–25 m/min · IP68
      </text>
    </svg>
  );
}
