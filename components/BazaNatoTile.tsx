"use client";

import { motion } from "motion/react";

const ORANGE = "#f5851f";
const SKY = "#7fb6ff";
const DIM = "#5d7090";
const NIGHT = "#06111f";
const NIGHT2 = "#0d2240";

export function BazaNatoTile() {
  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden"
      style={{ background: NIGHT }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 375"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
      >
        <defs>
          <linearGradient id="bnt-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={NIGHT2} />
            <stop offset="1" stopColor={NIGHT} />
          </linearGradient>

          <radialGradient id="bnt-glow" cx="0.7" cy="0.4" r="0.7">
            <stop offset="0" stopColor={ORANGE} stopOpacity="0.22" />
            <stop offset="1" stopColor={ORANGE} stopOpacity="0" />
          </radialGradient>

          <pattern id="bnt-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0 L0 0 0 24" fill="none" stroke="rgba(127,182,255,0.08)" strokeWidth="0.6" />
          </pattern>

          <pattern id="bnt-grid-fine" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="0.4" fill="rgba(127,182,255,0.18)" />
          </pattern>

          <radialGradient id="bnt-sweep" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={ORANGE} stopOpacity="0.55" />
            <stop offset="0.6" stopColor={ORANGE} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="375" fill="url(#bnt-bg)" />
        <rect width="600" height="375" fill="url(#bnt-grid)" />
        <rect width="600" height="375" fill="url(#bnt-grid-fine)" opacity="0.6" />
        <rect width="600" height="375" fill="url(#bnt-glow)" />

        <motion.g
          style={{ transformOrigin: "300px 200px" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <path
            d="M 300 200 L 300 80 A 120 120 0 0 1 404 260 Z"
            fill="url(#bnt-sweep)"
          />
        </motion.g>

        <g stroke={SKY} strokeWidth="0.5" fill="none" opacity="0.35">
          <circle cx="300" cy="200" r="40" />
          <circle cx="300" cy="200" r="80" />
          <circle cx="300" cy="200" r="120" />
          <circle cx="300" cy="200" r="160" strokeDasharray="2 4" />
          <line x1="300" y1="40" x2="300" y2="360" strokeDasharray="3 4" />
          <line x1="140" y1="200" x2="460" y2="200" strokeDasharray="3 4" />
        </g>

        <g transform="translate(180,170)">
          <line x1="0" y1="80" x2="240" y2="80" stroke={SKY} strokeWidth="1.4" />
          <line x1="0" y1="80" x2="0" y2="20" stroke={SKY} strokeWidth="1.4" />
          <line x1="240" y1="80" x2="240" y2="20" stroke={SKY} strokeWidth="1.4" />
          <line x1="0" y1="20" x2="120" y2="-12" stroke={SKY} strokeWidth="1.4" />
          <line x1="240" y1="20" x2="120" y2="-12" stroke={SKY} strokeWidth="1.4" />

          <motion.line
            x1="0"
            y1="80"
            x2="240"
            y2="80"
            stroke={ORANGE}
            strokeWidth="0.6"
            strokeDasharray="6 6"
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />

          {[
            { cx: 40, cy: 50, active: true, delay: 0 },
            { cx: 120, cy: 50, active: true, delay: 0.45 },
            { cx: 200, cy: 50, active: true, delay: 0.9 },
            { cx: 80, cy: 22, active: false },
            { cx: 160, cy: 22, active: false },
          ].map((p, i) => {
            const color = p.active ? ORANGE : DIM;
            return (
              <g key={i}>
                {p.active && (
                  <motion.circle
                    cx={p.cx}
                    cy={p.cy}
                    r={6}
                    fill={color}
                    fillOpacity={0.25}
                    animate={{ r: [6, 18, 6], opacity: [0.7, 0, 0.7] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: p.delay,
                      ease: "easeOut",
                    }}
                  />
                )}
                <circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.active ? 3.6 : 2.4}
                  fill={color}
                  stroke="white"
                  strokeOpacity={p.active ? 0.4 : 0.2}
                  strokeWidth="0.6"
                />
                {p.active && (
                  <motion.circle
                    cx={p.cx}
                    cy={p.cy}
                    r={1.4}
                    fill="white"
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: p.delay }}
                  />
                )}
              </g>
            );
          })}
        </g>

        {[
          { x: 90, y: 90, delay: 0 },
          { x: 90, y: 130, delay: 0.4 },
          { x: 90, y: 170, delay: 0.8 },
        ].map((w, i) => (
          <motion.path
            key={i}
            d={`M ${w.x} ${w.y} q 18 -8 36 0 q 18 8 36 0 q 18 -8 36 0`}
            fill="none"
            stroke={SKY}
            strokeOpacity={0.45}
            strokeWidth="1"
            strokeDasharray="2 3"
            animate={{ x: [0, 28, 0], opacity: [0, 0.7, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              delay: w.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        <g transform="translate(54,52)">
          <circle cx="0" cy="0" r="20" fill={NIGHT2} stroke={SKY} strokeWidth="0.7" opacity="0.85" />
          <line x1="0" y1="-20" x2="0" y2="20" stroke={SKY} strokeWidth="0.6" />
          <line x1="-20" y1="0" x2="20" y2="0" stroke={SKY} strokeWidth="0.6" />
          <polygon points="0,-16 -3,-4 3,-4" fill={ORANGE} />
          <text
            x="0"
            y="-24"
            textAnchor="middle"
            fontSize="8"
            fill={ORANGE}
            fontFamily="ui-monospace, monospace"
            fontWeight="bold"
          >
            N
          </text>
        </g>

        <motion.g
          transform="translate(490,75) rotate(-10)"
          animate={{ opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <rect x="-58" y="-15" width="116" height="30" fill="none" stroke={ORANGE} strokeWidth="1.3" />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fontSize="11"
            fill={ORANGE}
            fontFamily="ui-monospace, monospace"
            letterSpacing="3"
            fontWeight="bold"
          >
            OPSEC RO
          </text>
        </motion.g>

        <g transform="translate(38,310)">
          <rect width="180" height="44" fill={NIGHT2} stroke="rgba(127,182,255,0.3)" strokeWidth="0.7" />
          <text x="10" y="14" fontSize="8" fill={SKY} fontFamily="ui-monospace, monospace" letterSpacing="2" opacity="0.7">
            STATUS · LIVE
          </text>
          <motion.circle
            cx="160"
            cy="11"
            r="3"
            fill={ORANGE}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <text x="10" y="30" fontSize="9" fill="white" fontFamily="ui-monospace, monospace" fontWeight="bold">
            3 ACTIVE · 2 STANDBY
          </text>
          <text x="10" y="40" fontSize="7" fill={DIM} fontFamily="ui-monospace, monospace">
            UPTIME 100% · WIND 7 m/s
          </text>
        </g>

        <g transform="translate(420,310)">
          <rect width="148" height="44" fill={NIGHT2} stroke="rgba(127,182,255,0.3)" strokeWidth="0.7" />
          <text x="8" y="14" fontSize="8" fill={SKY} fontFamily="ui-monospace, monospace" letterSpacing="2" opacity="0.7">
            COORD · NATO
          </text>
          <text x="8" y="30" fontSize="9" fill="white" fontFamily="ui-monospace, monospace" fontWeight="bold">
            45°N · ANON
          </text>
          <text x="8" y="40" fontSize="7" fill={DIM} fontFamily="ui-monospace, monospace">
            AL 5083 · AWS D17.1
          </text>
        </g>

        <motion.line
          x1="0"
          x2="600"
          y1="0"
          y2="0"
          stroke={ORANGE}
          strokeOpacity={0.55}
          strokeWidth="1"
          animate={{ y1: [60, 320, 60], y2: [60, 320, 60] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
