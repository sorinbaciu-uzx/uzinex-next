"use client";

import { useEffect, useRef, useState } from "react";
import { feature } from "topojson-client";
import { geoEquirectangular, geoPath } from "d3-geo";
// Real world map (Natural Earth 110m, ~250 countries) as TopoJSON.
// We convert it to GeoJSON paths once at module load.
import worldData from "world-atlas/countries-110m.json";
import type { Topology } from "topojson-specification";
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from "geojson";

/* ─── LOCATIONS ───
   Coords are mapped onto a 1000×500 equirectangular canvas:
   x = ((lon + 180) / 360) * 1000
   y = ((90 - lat) / 180) * 500
*/
type Location = {
  id: string;
  country: string;
  city: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  lat: number;
  lon: number;
  hq?: boolean;
  /** Show the hover tooltip below the pin instead of above (used when
      another pin is so close above that the upward label would overlap). */
  labelBelow?: boolean;
  /** Force the tooltip to the left of the pin (default is right unless the
      pin is near the right edge of the map). */
  labelLeft?: boolean;
};

const LOCATIONS: Location[] = [
  {
    id: "ro",
    country: "România",
    city: "Iași",
    company: "Uzinex HQ",
    contact: "Sorin Baciu",
    email: "sorin.baciu@uzinex.ro",
    phone: "+40 769 081 081",
    lat: 47.16,
    lon: 27.59,
    hq: true,
    // Iași's label sits above-right of its pin so it stays clear of the
    // arc/packet flows heading east (China) and south (Bulgaria/UAE).
  },
  {
    id: "bg",
    country: "Bulgaria",
    city: "Ruse",
    company: "MAXMAN Transit Hub",
    contact: "Cristian Munthiu",
    email: "logistics@bg.uzinex.ro",
    phone: "+40 765 741 420",
    lat: 43.85,
    lon: 25.97,
    // Ruse's label sits below-left of its pin so it doesn't collide
    // with Iași's pin (which is just above) or its label.
    labelLeft: true,
    labelBelow: true,
  },
  {
    id: "ae",
    country: "Emiratele Arabe Unite",
    city: "Dubai",
    company: "MENA Logistics Route",
    contact: "Karim Hassan",
    email: "trade@mena.uzinex.ro",
    phone: "+971 4 330 0188",
    lat: 25.2,
    lon: 55.27,
    labelLeft: true,
    labelBelow: true,
  },
  {
    id: "cn",
    country: "China",
    city: "Shenzhen",
    company: "Sourcing & Quality Assurance Hub",
    contact: "David Chen",
    email: "sourcing@asia.uzinex.ro",
    phone: "+86 755 8320 0199",
    lat: 22.54,
    lon: 114.06,
    labelLeft: true,
    labelBelow: true,
  },
  {
    id: "us",
    country: "SUA",
    city: "Washington, D.C.",
    company: "Public & Defense Liaison Node",
    contact: "Robert Sterling",
    email: "defense@us.uzinex.ro",
    phone: "+1 (202) 555-0139",
    lat: 38.9,
    lon: -77.04,
    labelBelow: true,
  },
];

const VIEW_W = 1000;
const VIEW_H = 500;

// Crop window — focus on the region containing all pins (NY → Shenzhen).
// Pin x-range ≈ 294..817, y-range ≈ 95..188. We pad around it.
const CROP_X = 220;
const CROP_Y = 40;
const CROP_W = 680;
const CROP_H = 250;

function project(lat: number, lon: number) {
  return {
    x: ((lon + 180) / 360) * VIEW_W,
    y: ((90 - lat) / 180) * VIEW_H,
  };
}

/* Pre-compute SVG path strings for each country, projected to the same
   1000×500 equirectangular canvas as the pins (matches `project()`). */
const projection = geoEquirectangular()
  .scale(VIEW_W / (2 * Math.PI))
  .translate([VIEW_W / 2, VIEW_H / 2]);
const pathGen = geoPath(projection);
const worldFeatures = feature(
  worldData as unknown as Topology,
  (worldData as unknown as Topology).objects.countries
) as unknown as FeatureCollection<Geometry, GeoJsonProperties>;
const COUNTRY_PATHS: string[] = (worldFeatures.features as Feature[])
  .map((f) => pathGen(f) ?? "")
  .filter(Boolean);

/** Curved great-circle-ish arc between two points (quadratic with lifted control). */
function arcPath(ax: number, ay: number, bx: number, by: number) {
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2;
  // Lift the curve toward the top of the map for a "global hop" feel
  const dx = bx - ax;
  const dy = by - ay;
  const dist = Math.hypot(dx, dy);
  const lift = Math.min(140, dist * 0.35);
  const cx = mx;
  const cy = my - lift;
  return `M ${ax} ${ay} Q ${cx} ${cy} ${bx} ${by}`;
}

export function GlobalNetwork() {
  const [active, setActive] = useState<string>("ro");
  const [hovered, setHovered] = useState<string | null>(null);

  const activeLoc = LOCATIONS.find((l) => l.id === active) ?? LOCATIONS[0];
  const hq = LOCATIONS.find((l) => l.hq)!;
  const hqProj = project(hq.lat, hq.lon);

  // Cycle through pins automatically until the user picks one
  const [autoCycle, setAutoCycle] = useState(true);
  useEffect(() => {
    if (!autoCycle) return;
    const id = setInterval(() => {
      setActive((cur) => {
        const idx = LOCATIONS.findIndex((l) => l.id === cur);
        return LOCATIONS[(idx + 1) % LOCATIONS.length].id;
      });
    }, 3500);
    return () => clearInterval(id);
  }, [autoCycle]);

  // Entrance — kick off animations when the section scrolls into view
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      // Trigger as soon as any part of the section enters the viewport,
      // so the entrance animation starts a bit sooner.
      { threshold: 0, rootMargin: "0px 0px -5% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden border-b text-white ${
        started ? "uzx-anim-on" : ""
      }`}
      style={{
        background: "#082545",
        borderColor: "rgba(255,255,255,0.08)",
        backgroundImage:
          "radial-gradient(ellipse 70% 80% at 50% 40%, #1a4a7a 0%, #0e3866 35%, transparent 65%), linear-gradient(rgba(127,176,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(127,176,255,0.05) 1px, transparent 1px)",
        backgroundSize: "auto, 40px 40px, 40px 40px",
      }}
    >
      <style>{`
        /* ── ENTRANCE keyframes ── */
        @keyframes uzx-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes uzx-pop-in {
          0%   { opacity: 0; transform: scale(0); }
          70%  { opacity: 1; transform: scale(1.4); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes uzx-arc-draw {
          from { stroke-dashoffset: 600; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }

        /* ── LIVE keyframes — only the inter-pin flow ── */
        @keyframes uzx-arc-flow {
          0%   { stroke-dashoffset: 220; opacity: 0.0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.9; }
          100% { stroke-dashoffset: -220; opacity: 0.0; }
        }
        @keyframes uzx-packet-fade {
          0%, 100% { opacity: 0; }
          15%, 85% { opacity: 1; }
        }
        @keyframes uzx-pulse-ring-active {
          0%   { r: 8; opacity: 0.85; }
          100% { r: 32; opacity: 0; }
        }
        @keyframes uzx-card-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── BEFORE entrance: hide everything that animates ── */
        .uzx-cells, .uzx-grid, .uzx-arc-base, .uzx-pin,
        .uzx-arc-flow, .uzx-packet { opacity: 0; }
        .uzx-arc-base { stroke-dasharray: 600; stroke-dashoffset: 600; }
        .uzx-pin { transform: scale(0); transform-origin: center; transform-box: fill-box; }

        /* ── ENTRANCE: 3 faze, flux rapid ──
           t = 0     →  0.5s   harta face fade-in
           t = 0.5   →  1.0s   harta singură (0.5s pauză)
           t = 1.0   →  ~2.3s  pinurile pop-in
           t = 2.0+            arcele încep să se deseneze (overlap cu ultimele pinuri)
        */
        .uzx-anim-on .uzx-cells   { animation: uzx-fade-in 0.5s ease-out 0s   forwards; }
        .uzx-anim-on .uzx-grid    { animation: uzx-fade-in 0.5s ease-out 0.2s forwards; }
        .uzx-anim-on .uzx-pin     { animation: uzx-pop-in 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .uzx-anim-on .uzx-arc-base { animation: uzx-arc-draw 1s ease-out forwards; }

        /* ── LIVE: only the flow between pins persists.
             'backwards' fill-mode keeps opacity:0 (first keyframe) during
             the per-element animation-delay, so the flow stays hidden until
             the arcs have finished drawing. */
        .uzx-anim-on .uzx-arc-flow { stroke-dasharray: 60 220; animation: uzx-arc-flow 4.5s linear infinite backwards; }
        .uzx-anim-on .uzx-packet   { animation: uzx-packet-fade 4.5s linear infinite backwards; }
        .uzx-anim-on .uzx-pulse-ring-active { animation: uzx-pulse-ring-active 1.8s ease-out infinite; transform-origin: center; transform-box: fill-box; }
        .uzx-anim-on .uzx-card-in          { animation: uzx-card-in 0.35s ease-out; }

        @media (prefers-reduced-motion: reduce) {
          .uzx-cells, .uzx-grid, .uzx-arc-base, .uzx-pin { opacity: 1; }
          .uzx-arc-base { stroke-dashoffset: 0; }
          .uzx-pin { transform: scale(1); }
          .uzx-anim-on .uzx-cells,
          .uzx-anim-on .uzx-grid,
          .uzx-anim-on .uzx-arc-base,
          .uzx-anim-on .uzx-pin,
          .uzx-anim-on .uzx-arc-flow,
          .uzx-anim-on .uzx-packet,
          .uzx-anim-on .uzx-pulse-ring-active,
          .uzx-anim-on .uzx-card-in
            { animation: none !important; }
        }
      `}</style>

      <div className="container-x py-10 lg:py-14 relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-3 mono">
          <span className="w-8 h-px bg-white/40" />
          <span>06 / Prezență internațională</span>
        </div>
        <h2
          className="serif font-medium leading-[1.05] text-white max-w-3xl mb-6 lg:mb-4"
          style={{ letterSpacing: "-0.03em" }}
        >
          <span className="block text-2xl md:text-3xl lg:text-4xl">
            Uzinex,{" "}
            <span className="font-light text-uzx-orange">grup mondial</span>
          </span>
          <span className="block font-light text-white/75 text-sm md:text-base lg:text-lg mt-2 leading-snug">
            Conectăm operațiuni industriale între Europa, Asia, Orientul
            Mijlociu{" "}
            <span className="hidden md:inline">
              <br />
            </span>
            și America de Nord.
          </span>
        </h2>

        {/* Map + Card layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Map */}
          <div className="lg:col-span-8 relative flex">
            <div
              className="relative w-full h-full min-h-[320px] flex flex-col overflow-hidden rounded-sm"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,37,69,0.6) 0%, rgba(8,37,69,0.9) 100%)",
                border: "1px solid rgba(127,176,255,0.12)",
              }}
            >
              {/* HUD corners */}
              <Corners />

              <svg
                viewBox={`${CROP_X} ${CROP_Y} ${CROP_W} ${CROP_H}`}
                preserveAspectRatio="xMidYMid meet"
                className="block w-full flex-1 min-h-0"
                role="img"
                aria-label="Harta locațiilor Uzinex"
              >
                {/* Latitude / longitude grid (subtle reference frame) */}
                <g
                  className="uzx-grid"
                  stroke="rgba(127,176,255,0.07)"
                  strokeWidth={0.4}
                  fill="none"
                >
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                    (lon) => {
                      const x = (lon / 360) * VIEW_W;
                      return (
                        <line
                          key={`m-${lon}`}
                          x1={x}
                          y1={0}
                          x2={x}
                          y2={VIEW_H}
                        />
                      );
                    }
                  )}
                  {[-60, -30, 0, 30, 60].map((lat) => {
                    const y = ((90 - lat) / 180) * VIEW_H;
                    return (
                      <line
                        key={`p-${lat}`}
                        x1={0}
                        y1={y}
                        x2={VIEW_W}
                        y2={y}
                      />
                    );
                  })}
                  {/* Equator emphasized (static) */}
                  <line
                    x1={0}
                    y1={VIEW_H / 2}
                    x2={VIEW_W}
                    y2={VIEW_H / 2}
                    stroke="rgba(127,176,255,0.16)"
                    strokeDasharray="4 4"
                  />
                </g>

                {/* Realistic filled continents — polygons traced from real
                    coastlines, rendered as smooth shapes with a subtle stroke
                    for definition. Soft drop-shadow gives map-like depth. */}
                <defs>
                  <linearGradient id="uzx-land" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(150,195,250,0.35)" />
                    <stop offset="100%" stopColor="rgba(110,160,225,0.22)" />
                  </linearGradient>
                </defs>
                <g
                  className="uzx-cells"
                  style={{
                    filter:
                      "drop-shadow(0 1px 2px rgba(8,37,69,0.4))",
                  }}
                >
                  {COUNTRY_PATHS.map((d, i) => (
                    <path
                      key={i}
                      d={d}
                      fill="url(#uzx-land)"
                      stroke="rgba(190,220,255,0.6)"
                      strokeWidth={0.4}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                  ))}
                </g>

                {/* Arcs from HQ to other locations */}
                <g
                  fill="none"
                  stroke="#f5851f"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 4px rgba(245,133,31,0.5))" }}
                >
                  {LOCATIONS.filter((l) => !l.hq).map((l, i) => {
                    const a = hqProj;
                    const b = project(l.lat, l.lon);
                    const dOut = arcPath(a.x, a.y, b.x, b.y);
                    const dIn = arcPath(b.x, b.y, a.x, a.y);
                    const pathOutId = `uzx-arc-${l.id}-out`;
                    const pathInId = `uzx-arc-${l.id}-in`;
                    // Entrance: arcs start at 2.0s — they begin drawing while
                    // the last pins are still popping in, so the flow feels
                    // continuous and fast.
                    const drawDelay = 2.0 + i * 0.1;
                    // Live: outbound flow kicks in right after the arc is drawn.
                    const liveDelayOut = drawDelay + 0.25 + i * 0.12;
                    // Inbound flow is offset by half the cycle so a packet
                    // is always travelling on each route in one direction or the other.
                    const liveDelayIn = liveDelayOut + 2.25;
                    return (
                      <g key={l.id}>
                        {/* faint base arc — drawn during entrance, stays as motion path for both flows */}
                        <path
                          id={pathOutId}
                          d={dOut}
                          className="uzx-arc-base"
                          stroke="rgba(245,133,31,0.28)"
                          strokeWidth={0.8}
                          style={{ animationDelay: `${drawDelay}s` }}
                        />
                        {/* invisible reverse-direction motion path (same arc, opposite traversal) */}
                        <path
                          id={pathInId}
                          d={dIn}
                          fill="none"
                          stroke="none"
                        />
                        {/* outbound flow: HQ → location */}
                        <path
                          d={dOut}
                          className="uzx-arc-flow"
                          style={{ animationDelay: `${liveDelayOut}s` }}
                        />
                        <circle
                          r={2.6}
                          fill="#ffe0b8"
                          className="uzx-packet"
                          style={{
                            animationDelay: `${liveDelayOut}s`,
                            filter:
                              "drop-shadow(0 0 4px rgba(255,200,140,0.9))",
                          }}
                        >
                          <animateMotion
                            dur="4.5s"
                            repeatCount="indefinite"
                            begin={`${liveDelayOut}s`}
                            rotate="auto"
                          >
                            <mpath href={`#${pathOutId}`} />
                          </animateMotion>
                        </circle>
                        {/* inbound flow: location → HQ */}
                        <path
                          d={dIn}
                          className="uzx-arc-flow"
                          style={{ animationDelay: `${liveDelayIn}s` }}
                        />
                        <circle
                          r={2.6}
                          fill="#ffe0b8"
                          className="uzx-packet"
                          style={{
                            animationDelay: `${liveDelayIn}s`,
                            filter:
                              "drop-shadow(0 0 4px rgba(255,200,140,0.9))",
                          }}
                        >
                          <animateMotion
                            dur="4.5s"
                            repeatCount="indefinite"
                            begin={`${liveDelayIn}s`}
                            rotate="auto"
                          >
                            <mpath href={`#${pathInId}`} />
                          </animateMotion>
                        </circle>
                      </g>
                    );
                  })}
                </g>

                {/* Pins — HQ pops first, then others stagger in */}
                {LOCATIONS.map((l, idx) => {
                  const p = project(l.lat, l.lon);
                  const isActive = active === l.id;
                  const isHovered = hovered === l.id;
                  // Pins start at 1s (= 0.5s after map fully visible), HQ first.
                  const orderIdx = l.hq ? 0 : idx + 1;
                  const popDelay = 1.0 + orderIdx * 0.12;
                  return (
                    <g
                      key={l.id}
                      transform={`translate(${p.x}, ${p.y})`}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setActive(l.id);
                        setAutoCycle(false);
                      }}
                      onMouseEnter={() => setHovered(l.id)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <g
                        className="uzx-pin"
                        style={{ animationDelay: `${popDelay}s` }}
                      >
                      {/* invisible hit area — easier click/tap target */}
                      <circle
                        cx={0}
                        cy={-9}
                        r={16}
                        fill="transparent"
                      />

                      {/* selected-pin pulse — radiates from the pin head */}
                      {isActive && (
                        <circle
                          cx={0}
                          cy={-9}
                          className="uzx-pulse-ring-active"
                          fill="none"
                          stroke="#ffffff"
                          strokeWidth={1.4}
                        />
                      )}

                      {/* shadow under pin tip */}
                      <ellipse
                        cx={0}
                        cy={0.6}
                        rx={3.5}
                        ry={1.1}
                        fill="rgba(0,0,0,0.4)"
                      />

                      {/* Iconic Google Maps pin shape — derived from the
                          Material Design "place" path. Default state: orange
                          body with white inner dot. Active or hovered pin:
                          inverted to white body with orange inner dot. */}
                      <path
                        d="M 0 -14 C -2.7 -14 -4.9 -11.8 -4.9 -9.1 C -4.9 -5.4 0 0 0 0 C 0 0 4.9 -5.4 4.9 -9.1 C 4.9 -11.8 2.7 -14 0 -14 Z"
                        fill={isActive || isHovered ? "#ffffff" : "#f5851f"}
                        stroke={isActive || isHovered ? "#f5851f" : "#ffffff"}
                        strokeWidth={isActive || isHovered ? 1.4 : 1}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        style={{ transition: "fill 0.2s ease, stroke 0.2s ease" }}
                      />

                      {/* inner dot inside the pin head */}
                      <circle
                        cx={0}
                        cy={-9}
                        r={2.4}
                        fill={isActive || isHovered ? "#f5851f" : "#ffffff"}
                        style={{ transition: "fill 0.2s ease" }}
                      />

                      {/* tooltip — inside the pin scale group so it stays hidden
                          until the pin pops in during entrance. Positioned
                          above the new teardrop pin so it doesn't overlap. */}
                      {(isHovered || isActive) && (
                        <g pointerEvents="none">
                          <PinLabel
                            x={
                              l.labelLeft || p.x > VIEW_W * 0.7 ? -4 : 8
                            }
                            y={l.labelBelow ? 2 : -46}
                            anchor={
                              l.labelLeft || p.x > VIEW_W * 0.7
                                ? "end"
                                : "start"
                            }
                            country={l.country}
                            city={l.city}
                            hq={!!l.hq}
                          />
                        </g>
                      )}
                      </g>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom HUD strip */}
              <div className="px-3 py-2 flex items-center justify-between text-[10px] mono uppercase tracking-widest text-white/50 border-t border-white/10 bg-[rgba(8,37,69,0.6)]">
                <span>UZX · GLOBAL NETWORK</span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {LOCATIONS.length} NODES · ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Detail card — min-h locked to Iași's full content so the grid row
              doesn't shrink when switching to locations with shorter addresses
              (which would also shrink the map next to it). */}
          <div className="lg:col-span-4">
            <div
              key={activeLoc.id}
              className="uzx-card-in relative h-full lg:min-h-[460px] p-5 lg:p-7"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(127,176,255,0.18)",
              }}
            >
              {/* corner accent */}
              <div
                className="absolute top-0 left-0 w-12 h-px"
                style={{ background: "#f5851f" }}
              />
              <div
                className="absolute top-0 left-0 h-12 w-px"
                style={{ background: "#f5851f" }}
              />

              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-uzx-orange mono">
                <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange animate-pulse" />
                {activeLoc.hq ? "HQ · CENTRAL" : "NOD OPERAȚIONAL"}
              </div>

              <div className="mt-3 text-[11px] mono uppercase tracking-[0.2em] text-white/60">
                {activeLoc.country}
              </div>
              <div
                className="serif text-xl md:text-2xl lg:text-3xl mt-1 text-white"
                style={{ letterSpacing: "-0.02em" }}
              >
                {activeLoc.city}
              </div>

              <div className="mt-5 lg:mt-6 space-y-3 lg:space-y-4 text-sm">
                <Field label="Companie" value={activeLoc.company} />
                <Field label="Reprezentant Regional" value={activeLoc.contact} />
                <Field label="Email" value={activeLoc.email} mono />
                <Field label="Telefon" value={activeLoc.phone} mono />
              </div>

              {/* Pin selector */}
              <div className="mt-6 lg:mt-7 pt-5 border-t border-white/10">
                <div className="text-[10px] mono uppercase tracking-[0.25em] text-white/50 mb-3">
                  Toate locațiile
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {LOCATIONS.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setActive(l.id);
                        setAutoCycle(false);
                      }}
                      onMouseEnter={() => setHovered(l.id)}
                      onMouseLeave={() => setHovered(null)}
                      className={`text-[11px] mono uppercase tracking-wider px-2.5 py-1.5 transition border ${
                        active === l.id
                          ? "border-uzx-orange text-white bg-[rgba(245,133,31,0.15)]"
                          : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {l.country}
                    </button>
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

function Field({
  label,
  value,
  mono,
  multiline,
}: {
  label: string;
  value: string;
  mono?: boolean;
  multiline?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] mono uppercase tracking-[0.25em] text-white/50">
        {label}
      </div>
      <div
        className={`mt-1 text-white ${mono ? "mono text-base" : ""} ${
          multiline ? "leading-relaxed" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function PinLabel({
  x,
  y,
  anchor,
  country,
  city,
  hq,
}: {
  x: number;
  y: number;
  anchor: "start" | "end";
  country: string;
  city: string;
  hq: boolean;
}) {
  const w = Math.max(country.length, city.length) * 6 + 24;
  const rx = anchor === "start" ? x : x - w;
  return (
    <g transform={`translate(${rx}, ${y})`}>
      <rect
        x={0}
        y={0}
        width={w}
        height={32}
        fill="rgba(8,37,69,0.92)"
        stroke="rgba(245,133,31,0.5)"
        strokeWidth={0.7}
      />
      <text
        x={6}
        y={13}
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={9}
        fill="rgba(255,255,255,0.95)"
        fontWeight={600}
      >
        {city.toUpperCase()}
      </text>
      <text
        x={6}
        y={25}
        fontFamily="'IBM Plex Mono', monospace"
        fontSize={8}
        fill={hq ? "#f5851f" : "rgba(255,255,255,0.55)"}
      >
        {hq ? `${country} · HQ` : country}
      </text>
    </g>
  );
}

function Corners() {
  const stroke = "rgba(245,133,31,0.55)";
  const sw = 1.2;
  const len = 14;
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <g stroke={stroke} strokeWidth={sw} fill="none" vectorEffect="non-scaling-stroke">
        {/* using percentages via 0-100 viewBox with non-scaling-stroke */}
        <polyline points={`0,${len} 0,0 ${len},0`} />
        <polyline points={`${100 - len},0 100,0 100,${len}`} />
        <polyline points={`100,${100 - len} 100,100 ${100 - len},100`} />
        <polyline points={`${len},100 0,100 0,${100 - len}`} />
      </g>
    </svg>
  );
}

