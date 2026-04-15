"use client";

/* ─────────────────────────────────────────────────────────────────────────
   CatalogAnim — 48 animații tehnice SVG pentru secțiunea "Catalog tehnic".
   Fiecare variantă este pe fundal dark (#082545 → #0b2c52) cu accent
   portocaliu (#f5851f) și detalii albastre (#1e6bb8). Animațiile sunt
   pure CSS keyframes — fără motion runtime, pentru performanță maximă.
   ───────────────────────────────────────────────────────────────────── */

export type CatalogAnimKind =
  // t1 Intralogistică
  | "forklift-diesel" | "forklift-electric" | "pallet-jack" | "racking"
  // t2 Laser & CNC
  | "laser-fiber" | "cnc-mill" | "cnc-lathe" | "welding"
  // t3 Robotică & automatizare
  | "robot-arm" | "palletizer" | "cobot" | "vision"
  // t4 Utilaje grele
  | "excavator" | "crane" | "generator" | "bucket"
  // t5 Piese de schimb
  | "oem-parts" | "filters" | "wear-kit" | "hydraulic"
  // t6 Service
  | "commissioning" | "preventive" | "warranty" | "rapid"
  // t7 Apărare
  | "thermal" | "autonomous-gen" | "shelter" | "simulator"
  // t8 Prelucrare lemn
  | "edgebander" | "door-machine" | "saw-wood" | "sander"
  // t9 Ambalare
  | "carton" | "stretch" | "sealing" | "shrink"
  // t10 Etichetare
  | "labeling" | "filling" | "disassembly" | "marking"
  // t11 Reciclare
  | "baler" | "shredder" | "separator" | "conveyor"
  // t12 Inspecție
  | "cctv-crawler" | "push-cam" | "ptz" | "videoscope";

const ORANGE = "#f5851f";
const BLUE = "#1e6bb8";
const WHITE = "#ffffff";
const DIM = "rgba(255,255,255,0.35)";
const DIM2 = "rgba(255,255,255,0.6)";

/* Shared style block — included once per render; CSS dedupes selectors. */
const SHARED_CSS = `
@keyframes ca-rot { to { transform: rotate(360deg); } }
@keyframes ca-rot-rev { to { transform: rotate(-360deg); } }
@keyframes ca-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes ca-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0.15; } }
@keyframes ca-scan-x { 0% { transform: translateX(-30%); } 100% { transform: translateX(130%); } }
@keyframes ca-scan-y { 0% { transform: translateY(-30%); } 100% { transform: translateY(130%); } }
@keyframes ca-lift { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes ca-arm { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(12deg); } }
@keyframes ca-drop { 0% { transform: translateY(-20%); opacity: 0; } 30%,70% { opacity: 1; } 100% { transform: translateY(120%); opacity: 0; } }
@keyframes ca-dash { to { stroke-dashoffset: -24; } }
@keyframes ca-fill-v { 0% { transform: scaleY(0); } 100% { transform: scaleY(1); } }
@keyframes ca-fill-h { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
@keyframes ca-wave { 0%,100% { d: path("M0 20 Q 25 10, 50 20 T 100 20"); } 50% { d: path("M0 20 Q 25 30, 50 20 T 100 20"); } }
@keyframes ca-spark { 0%,100% { opacity: 0; } 20% { opacity: 1; } }
@keyframes ca-zoom { 0%,100% { transform: scale(0.9); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 1; } }
@keyframes ca-count { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes ca-slide-l { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
@keyframes ca-slide-r { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
@keyframes ca-pan { 0%,100% { transform: rotate(-25deg); } 50% { transform: rotate(25deg); } }
.ca-stage { position: relative; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(135deg, #082545 0%, #0b2c52 100%); }
.ca-grid { position:absolute; inset:0; background-image: linear-gradient(rgba(126,176,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(126,176,255,0.08) 1px, transparent 1px); background-size: 16px 16px; }
.ca-svg { position:absolute; inset:0; width:100%; height:100%; }
`;

/* Wrapper — applies stage bg + grid + injects shared CSS once per tile. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="ca-stage">
      <style>{SHARED_CSS}</style>
      <div className="ca-grid" />
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATION RENDERERS
   Each takes no props; returns the SVG/content inside <Stage>.
   ═════════════════════════════════════════════════════════════════════ */

function ForkliftDiesel() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid meet">
      {/* Forks + pallet lifting */}
      <g style={{ animation: "ca-lift 2.4s ease-in-out infinite" }}>
        <rect x="70" y="20" width="60" height="10" fill={ORANGE} />
        <rect x="70" y="32" width="60" height="4" fill={BLUE} />
        <line x1="60" y1="24" x2="130" y2="24" stroke={DIM2} strokeWidth="1" />
      </g>
      {/* Body */}
      <rect x="30" y="45" width="50" height="20" fill={BLUE} />
      <rect x="45" y="38" width="30" height="10" fill={WHITE} opacity="0.9" />
      {/* Mast */}
      <line x1="60" y1="10" x2="60" y2="55" stroke={DIM2} strokeWidth="2" />
      {/* Wheels */}
      <circle cx="40" cy="68" r="6" fill="#222" stroke={ORANGE} strokeWidth="1" style={{ transformOrigin: "40px 68px", animation: "ca-rot 1.2s linear infinite" }}/>
      <circle cx="72" cy="68" r="6" fill="#222" stroke={ORANGE} strokeWidth="1" style={{ transformOrigin: "72px 68px", animation: "ca-rot 1.2s linear infinite" }}/>
      {/* Exhaust puff */}
      <circle cx="25" cy="50" r="3" fill={DIM} style={{ animation: "ca-pulse 1.5s ease-in-out infinite" }} />
      <text x="100" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">DIESEL · 16T</text>
    </svg>
  );
}

function ForkliftElectric() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Battery bars */}
      <rect x="20" y="20" width="60" height="40" fill="none" stroke={DIM2} strokeWidth="1.5" />
      <rect x="80" y="30" width="4" height="20" fill={DIM2} />
      <g>
        <rect x="23" y="50" width="54" height="7" fill={ORANGE} style={{ animation: "ca-count 1.8s ease-in-out infinite" }}/>
        <rect x="23" y="41" width="54" height="7" fill={ORANGE} style={{ animation: "ca-count 1.8s ease-in-out infinite 0.3s" }}/>
        <rect x="23" y="32" width="54" height="7" fill={ORANGE} style={{ animation: "ca-count 1.8s ease-in-out infinite 0.6s" }}/>
        <rect x="23" y="23" width="54" height="7" fill="#2d8b5f" style={{ animation: "ca-count 1.8s ease-in-out infinite 0.9s" }}/>
      </g>
      {/* Lightning bolt */}
      <path d="M130 25 L120 45 L130 45 L125 62 L145 42 L135 42 Z" fill={ORANGE} style={{ animation: "ca-pulse 1.2s ease-in-out infinite" }} />
      <text x="110" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">LI-ION · 0 EMISII</text>
    </svg>
  );
}

function PalletJack() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Pallet sliding */}
      <g style={{ animation: "ca-slide-r 3s linear infinite" }}>
        <rect x="0" y="30" width="70" height="18" fill={BLUE} />
        <line x1="0" y1="35" x2="70" y2="35" stroke={DIM2} />
        <line x1="0" y1="43" x2="70" y2="43" stroke={DIM2} />
        <rect x="5" y="48" width="8" height="6" fill={DIM2} />
        <rect x="35" y="48" width="8" height="6" fill={DIM2} />
        <rect x="55" y="48" width="8" height="6" fill={DIM2} />
      </g>
      {/* Ground line */}
      <line x1="0" y1="62" x2="200" y2="62" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="4 3" style={{ animation: "ca-dash 1s linear infinite" }}/>
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">3T · COMPACT</text>
    </svg>
  );
}

function Racking() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Shelf uprights */}
      {[30, 90, 150].map((x, i) => (
        <line key={i} x1={x} y1="10" x2={x} y2="68" stroke={DIM2} strokeWidth="1.5" />
      ))}
      {/* Beams */}
      {[22, 40, 58].map((y, i) => (
        <line key={i} x1="30" y1={y} x2="150" y2={y} stroke={DIM2} strokeWidth="1" />
      ))}
      {/* Boxes appearing */}
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={35 + col * 60}
            y={24 + row * 18}
            width="50"
            height="13"
            fill={ORANGE}
            opacity="0.9"
            style={{ animation: `ca-count 2.4s ease-in-out infinite ${(row * 2 + col) * 0.25}s` }}
          />
        ))
      )}
      <text x="120" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">VNA · HEAVY</text>
    </svg>
  );
}

function LaserFiber() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Sheet metal */}
      <rect x="10" y="50" width="180" height="14" fill={BLUE} opacity="0.4" />
      <rect x="10" y="50" width="180" height="14" fill="none" stroke={DIM2} />
      {/* Cutting head */}
      <g style={{ animation: "ca-slide-r 2.4s linear infinite" }}>
        <rect x="-8" y="12" width="16" height="34" fill={WHITE} />
        <polygon points="0,46 -6,58 6,58" fill={ORANGE} />
        {/* Laser beam */}
        <line x1="0" y1="46" x2="0" y2="68" stroke={ORANGE} strokeWidth="2" style={{ animation: "ca-blink 0.25s linear infinite" }} />
        {/* Sparks */}
        <circle cx="-4" cy="66" r="1.5" fill={ORANGE} style={{ animation: "ca-spark 0.4s linear infinite" }} />
        <circle cx="4" cy="68" r="1.2" fill={ORANGE} style={{ animation: "ca-spark 0.4s linear infinite 0.1s" }} />
        <circle cx="0" cy="70" r="1" fill={WHITE} style={{ animation: "ca-spark 0.4s linear infinite 0.2s" }} />
      </g>
      <text x="10" y="10" fill={DIM2} fontSize="7" fontFamily="monospace">FIBER 30kW</text>
    </svg>
  );
}

function CncMill() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Workpiece */}
      <rect x="50" y="52" width="100" height="16" fill={BLUE} opacity="0.5" stroke={DIM2}/>
      {/* Spindle tool */}
      <g style={{ transform: "translate(100px, 30px)" }}>
        <rect x="-8" y="-18" width="16" height="28" fill={WHITE} />
        <g style={{ transformOrigin: "0 10px", animation: "ca-rot 0.35s linear infinite" }}>
          <polygon points="-4,10 4,10 0,30" fill={ORANGE} />
          <rect x="-3" y="10" width="6" height="16" fill={ORANGE} opacity="0.7"/>
        </g>
      </g>
      {/* Chips flying */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={100 + (i - 1) * 6} cy="62" r="0.8" fill={ORANGE} style={{ animation: `ca-spark 0.35s linear infinite ${i * 0.1}s` }} />
      ))}
      {/* Axis indicators */}
      <text x="10" y="15" fill={DIM2} fontSize="7" fontFamily="monospace">5-AXIS</text>
      <text x="170" y="15" fill={ORANGE} fontSize="7" fontFamily="monospace">●CNC</text>
    </svg>
  );
}

function CncLathe() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Chuck */}
      <g style={{ transformOrigin: "50px 40px", animation: "ca-rot 1s linear infinite" }}>
        <circle cx="50" cy="40" r="18" fill="none" stroke={WHITE} strokeWidth="2" />
        <line x1="50" y1="22" x2="50" y2="58" stroke={WHITE} />
        <line x1="32" y1="40" x2="68" y2="40" stroke={WHITE} />
        <line x1="37" y1="27" x2="63" y2="53" stroke={WHITE} />
        <line x1="37" y1="53" x2="63" y2="27" stroke={WHITE} />
      </g>
      {/* Workpiece rod */}
      <rect x="68" y="37" width="90" height="6" fill={BLUE} />
      <rect x="68" y="37" width="90" height="6" fill="none" stroke={DIM2} strokeDasharray="3 2" style={{ animation: "ca-dash 1.2s linear infinite" }}/>
      {/* Tool */}
      <g style={{ animation: "ca-lift 2s ease-in-out infinite" }}>
        <polygon points="120,55 130,55 125,43" fill={ORANGE} />
      </g>
      <text x="10" y="75" fill={DIM2} fontSize="7" fontFamily="monospace">TURN · THREAD</text>
    </svg>
  );
}

function Welding() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Weld torch */}
      <g style={{ animation: "ca-slide-r 2.8s linear infinite" }}>
        <line x1="-20" y1="10" x2="0" y2="40" stroke={WHITE} strokeWidth="3" />
        <circle cx="0" cy="40" r="2" fill={ORANGE} />
      </g>
      {/* Workpieces */}
      <rect x="20" y="48" width="160" height="10" fill={BLUE} opacity="0.4" stroke={DIM2}/>
      <line x1="20" y1="48" x2="180" y2="48" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="2 2" style={{ animation: "ca-dash 0.6s linear infinite" }}/>
      {/* Arc flash */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="100" y1="42" x2={100 + (i - 2) * 8} y2="55" stroke={ORANGE} strokeWidth="0.8" style={{ animation: `ca-blink 0.15s linear infinite ${i * 0.03}s` }}/>
      ))}
      <text x="140" y="12" fill={DIM2} fontSize="7" fontFamily="monospace">MIG · TIG</text>
    </svg>
  );
}

function RobotArm() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      <g style={{ transformOrigin: "30px 65px" }}>
        <circle cx="30" cy="65" r="6" fill={BLUE} />
        <g style={{ transformOrigin: "30px 65px", animation: "ca-arm 3s ease-in-out infinite" }}>
          <line x1="30" y1="65" x2="80" y2="30" stroke={WHITE} strokeWidth="4" />
          <circle cx="80" cy="30" r="5" fill={ORANGE} />
          <g style={{ transformOrigin: "80px 30px", animation: "ca-pan 3s ease-in-out infinite" }}>
            <line x1="80" y1="30" x2="130" y2="20" stroke={WHITE} strokeWidth="3" />
            <rect x="128" y="15" width="10" height="10" fill={ORANGE} />
          </g>
        </g>
      </g>
      <text x="10" y="15" fill={DIM2} fontSize="7" fontFamily="monospace">6-AXIS</text>
      <text x="150" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">500kg</text>
    </svg>
  );
}

function Palletizer() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Pallet base */}
      <rect x="50" y="65" width="100" height="6" fill={DIM2} />
      {/* Boxes stacking */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={60 + (i % 2) * 40}
          y={55 - Math.floor(i / 2) * 14}
          width="35"
          height="12"
          fill={ORANGE}
          opacity="0.9"
          style={{ animation: `ca-count 2.8s ease-in-out infinite ${i * 0.4}s` }}
        />
      ))}
      {/* Arm */}
      <g style={{ animation: "ca-lift 2s ease-in-out infinite" }}>
        <line x1="100" y1="10" x2="100" y2="32" stroke={WHITE} strokeWidth="3" />
        <rect x="94" y="30" width="12" height="6" fill={ORANGE} />
      </g>
      <text x="10" y="75" fill={DIM2} fontSize="7" fontFamily="monospace">1500 CPS/H</text>
    </svg>
  );
}

function Cobot() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Operator silhouette */}
      <circle cx="50" cy="30" r="6" fill={DIM2} />
      <path d="M50 36 L45 55 L40 70 M50 36 L55 55 L60 70 M50 40 L35 52 M50 40 L65 52" stroke={DIM2} strokeWidth="2" fill="none" />
      {/* Cobot arm */}
      <g style={{ transformOrigin: "140px 65px", animation: "ca-arm 3.2s ease-in-out infinite" }}>
        <line x1="140" y1="65" x2="110" y2="40" stroke={WHITE} strokeWidth="3" />
        <circle cx="140" cy="65" r="5" fill={BLUE} />
        <circle cx="110" cy="40" r="4" fill={ORANGE} />
      </g>
      {/* Safety ring */}
      <circle cx="90" cy="40" r="28" fill="none" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" style={{ animation: "ca-dash 2s linear infinite" }} />
      <text x="10" y="15" fill={ORANGE} fontSize="7" fontFamily="monospace">● SAFE-ZONE</text>
    </svg>
  );
}

function Vision() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Camera */}
      <rect x="85" y="8" width="30" height="14" fill={WHITE} />
      <circle cx="100" cy="15" r="3" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite" }} />
      {/* View cone */}
      <path d="M100 22 L50 70 L150 70 Z" fill={ORANGE} opacity="0.08" stroke={ORANGE} strokeWidth="0.8" strokeDasharray="2 2" />
      {/* Part being inspected */}
      <rect x="75" y="50" width="50" height="14" fill={BLUE} />
      {/* Detection box */}
      <g style={{ animation: "ca-zoom 1.6s ease-in-out infinite" }}>
        <rect x="82" y="52" width="14" height="10" fill="none" stroke={ORANGE} strokeWidth="1.5" />
        <text x="82" y="50" fill={ORANGE} fontSize="5" fontFamily="monospace">DEFECT</text>
      </g>
      <text x="130" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">AI · 98%</text>
    </svg>
  );
}

function Excavator() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Cab */}
      <rect x="30" y="40" width="30" height="20" fill={ORANGE} />
      <rect x="35" y="43" width="12" height="10" fill={WHITE} opacity="0.8" />
      {/* Tracks */}
      <rect x="20" y="60" width="50" height="10" fill="#222" />
      {[25, 35, 45, 55, 65].map((x, i) => (
        <circle key={i} cx={x} cy="65" r="3" fill={DIM2} />
      ))}
      {/* Boom */}
      <g style={{ transformOrigin: "60px 50px", animation: "ca-arm 3s ease-in-out infinite" }}>
        <line x1="60" y1="50" x2="110" y2="25" stroke={WHITE} strokeWidth="4" />
        <line x1="110" y1="25" x2="140" y2="45" stroke={WHITE} strokeWidth="4" />
        {/* Bucket */}
        <path d="M135 45 L150 45 L148 58 L138 58 Z" fill={ORANGE} />
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">90T</text>
    </svg>
  );
}

function Crane() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Tower */}
      <line x1="40" y1="8" x2="40" y2="70" stroke={WHITE} strokeWidth="2.5" />
      {[15, 25, 35, 45, 55, 65].map((y, i) => (
        <line key={i} x1="36" y1={y} x2="44" y2={y} stroke={DIM2} />
      ))}
      {/* Jib */}
      <line x1="40" y1="12" x2="170" y2="12" stroke={WHITE} strokeWidth="2" />
      <line x1="40" y1="16" x2="170" y2="16" stroke={DIM2} />
      {/* Cable + hook */}
      <g style={{ animation: "ca-lift 2.4s ease-in-out infinite" }}>
        <line x1="130" y1="16" x2="130" y2="48" stroke={ORANGE} strokeWidth="1" />
        <rect x="124" y="48" width="12" height="8" fill={ORANGE} />
      </g>
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">FIX · MOBIL</text>
    </svg>
  );
}

function Generator() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Power wave */}
      <path d="M0 40 Q 25 20, 50 40 T 100 40 T 150 40 T 200 40" fill="none" stroke={ORANGE} strokeWidth="2" strokeDasharray="4 2" style={{ animation: "ca-dash 1s linear infinite" }}/>
      {/* Generator box */}
      <rect x="40" y="22" width="50" height="36" fill={WHITE} opacity="0.9" />
      <circle cx="65" cy="40" r="10" fill="none" stroke={BLUE} strokeWidth="2" />
      <g style={{ transformOrigin: "65px 40px", animation: "ca-rot 1s linear infinite" }}>
        <line x1="65" y1="30" x2="65" y2="50" stroke={BLUE} strokeWidth="2" />
        <line x1="55" y1="40" x2="75" y2="40" stroke={BLUE} strokeWidth="2" />
      </g>
      {/* Voltage meter */}
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={110 + i * 10} y="36" width="7" height="8" fill={ORANGE} style={{ animation: `ca-count 1.2s ease-in-out infinite ${i * 0.15}s` }}/>
        ))}
      </g>
      <text x="110" y="60" fill={DIM2} fontSize="7" fontFamily="monospace">400V · 50Hz</text>
    </svg>
  );
}

function Bucket() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Arm */}
      <line x1="10" y1="15" x2="80" y2="40" stroke={WHITE} strokeWidth="3" />
      {/* Bucket */}
      <g style={{ transformOrigin: "80px 40px", animation: "ca-arm 2.8s ease-in-out infinite" }}>
        <path d="M80 40 L130 40 L135 62 L85 62 Z" fill={ORANGE} stroke={WHITE} strokeWidth="1.5" />
        {/* Teeth */}
        {[90, 100, 110, 120].map((x, i) => (
          <polygon key={i} points={`${x},62 ${x + 4},62 ${x + 2},68`} fill={WHITE} />
        ))}
      </g>
      {/* Ground particles */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={130 + i * 10} cy="72" r="1.2" fill={DIM2} style={{ animation: `ca-drop 1.2s linear infinite ${i * 0.2}s` }}/>
      ))}
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">HARDOX 500</text>
    </svg>
  );
}

function OemParts() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Exploded gear parts */}
      <g style={{ transformOrigin: "100px 40px", animation: "ca-rot 6s linear infinite" }}>
        <circle cx="100" cy="40" r="14" fill="none" stroke={ORANGE} strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <rect key={i} x="98" y="22" width="4" height="6" fill={ORANGE} style={{ transformOrigin: "100px 40px", transform: `rotate(${a}deg)` }} />
        ))}
        <circle cx="100" cy="40" r="4" fill={WHITE} />
      </g>
      {/* Floating parts */}
      <circle cx="40" cy="25" r="5" fill={BLUE} style={{ animation: "ca-pulse 2s ease-in-out infinite" }} />
      <rect x="35" y="55" width="10" height="10" fill={BLUE} style={{ animation: "ca-pulse 2s ease-in-out infinite 0.5s" }}/>
      <circle cx="160" cy="25" r="4" fill={BLUE} style={{ animation: "ca-pulse 2s ease-in-out infinite 1s" }}/>
      <polygon points="160,55 170,65 150,65" fill={BLUE} style={{ animation: "ca-pulse 2s ease-in-out infinite 1.5s" }}/>
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">OEM · GARANTAT</text>
    </svg>
  );
}

function Filters() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Filter housing */}
      <rect x="70" y="20" width="60" height="50" fill="none" stroke={WHITE} strokeWidth="2" />
      {/* Pleats */}
      {[75, 82, 89, 96, 103, 110, 117, 124].map((x, i) => (
        <line key={i} x1={x} y1="22" x2={x} y2="68" stroke={DIM2} />
      ))}
      {/* Oil drops */}
      {[90, 100, 110].map((x, i) => (
        <g key={i} style={{ animation: `ca-drop 2s linear infinite ${i * 0.5}s` }}>
          <ellipse cx={x} cy="10" rx="2.5" ry="3.5" fill={ORANGE} />
        </g>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">ISO 4406</text>
    </svg>
  );
}

function WearKit() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Gauge */}
      <path d="M40 60 A 40 40 0 0 1 160 60" fill="none" stroke={DIM2} strokeWidth="3" />
      <path d="M40 60 A 40 40 0 0 1 120 28" fill="none" stroke={ORANGE} strokeWidth="3" style={{ animation: "ca-pulse 2s ease-in-out infinite" }}/>
      {/* Needle */}
      <g style={{ transformOrigin: "100px 60px", animation: "ca-pan 3s ease-in-out infinite" }}>
        <line x1="100" y1="60" x2="100" y2="30" stroke={WHITE} strokeWidth="2" />
      </g>
      <circle cx="100" cy="60" r="3" fill={WHITE} />
      {/* Ticks */}
      {[40, 70, 100, 130, 160].map((x, i) => (
        <line key={i} x1={x} y1="60" x2={x} y2="55" stroke={DIM2} />
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">UZURĂ</text>
      <text x="140" y="76" fill={ORANGE} fontSize="7" fontFamily="monospace">72%</text>
    </svg>
  );
}

function Hydraulic() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Cylinder */}
      <rect x="30" y="32" width="80" height="18" fill={WHITE} />
      {/* Rod */}
      <g style={{ animation: "ca-lift 1.4s ease-in-out infinite", transformOrigin: "0 0" }}>
        <rect x="110" y="37" width="50" height="8" fill={DIM2} style={{ animation: "ca-scan-x 1.4s ease-in-out infinite alternate" }} />
      </g>
      {/* Piston indicator */}
      <circle cx="160" cy="41" r="3" fill={ORANGE} style={{ animation: "ca-scan-x 1.4s ease-in-out infinite alternate" }}/>
      {/* Pressure lines */}
      <line x1="30" y1="60" x2="110" y2="60" stroke={ORANGE} strokeWidth="1" strokeDasharray="4 2" style={{ animation: "ca-dash 0.6s linear infinite" }}/>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">350 BAR</text>
    </svg>
  );
}

function Commissioning() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Checklist */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} style={{ animation: `ca-count 3s ease-in-out infinite ${i * 0.4}s` }}>
          <rect x="30" y={14 + i * 14} width="10" height="10" fill="none" stroke={WHITE} strokeWidth="1.5" />
          <path d={`M32 ${19 + i * 14} L35 ${23 + i * 14} L40 ${16 + i * 14}`} stroke={ORANGE} strokeWidth="2" fill="none" />
          <line x1="46" y1={19 + i * 14} x2={100 + i * 15} y2={19 + i * 14} stroke={DIM2} strokeWidth="1.5" />
        </g>
      ))}
      <text x="110" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">INSTALL OK</text>
    </svg>
  );
}

function Preventive() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Calendar grid */}
      <rect x="30" y="14" width="140" height="52" fill="none" stroke={DIM2} />
      {[0, 1, 2, 3, 4].map((col) => (
        <line key={`c${col}`} x1={30 + (col + 1) * 28} y1="14" x2={30 + (col + 1) * 28} y2="66" stroke={DIM2} />
      ))}
      {[0, 1, 2].map((row) => (
        <line key={`r${row}`} x1="30" y1={14 + (row + 1) * 13} x2="170" y2={14 + (row + 1) * 13} stroke={DIM2} />
      ))}
      {/* Highlighted dates */}
      {[[1, 0], [3, 1], [0, 2], [4, 2]].map(([c, r], i) => (
        <rect key={i} x={32 + c * 28} y={16 + r * 13} width="24" height="11" fill={ORANGE} style={{ animation: `ca-count 2s ease-in-out infinite ${i * 0.3}s` }}/>
      ))}
      <text x="30" y="10" fill={DIM2} fontSize="7" fontFamily="monospace">MENT. PREV.</text>
    </svg>
  );
}

function Warranty() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Shield */}
      <path d="M100 10 L130 20 L130 45 Q 130 62, 100 72 Q 70 62, 70 45 L70 20 Z" fill="none" stroke={ORANGE} strokeWidth="2" style={{ animation: "ca-pulse 2s ease-in-out infinite" }}/>
      <path d="M85 40 L95 50 L115 30" fill="none" stroke={WHITE} strokeWidth="3" />
      <text x="90" y="64" fill={WHITE} fontSize="8" fontFamily="monospace" fontWeight="bold">60 LUNI</text>
    </svg>
  );
}

function Rapid() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Clock */}
      <circle cx="100" cy="40" r="28" fill="none" stroke={WHITE} strokeWidth="2" />
      {[0, 90, 180, 270].map((a, i) => (
        <line key={i} x1="100" y1="14" x2="100" y2="18" stroke={WHITE} strokeWidth="2" style={{ transformOrigin: "100px 40px", transform: `rotate(${a}deg)` }} />
      ))}
      {/* Sweep hand */}
      <g style={{ transformOrigin: "100px 40px", animation: "ca-rot 2s linear infinite" }}>
        <line x1="100" y1="40" x2="100" y2="16" stroke={ORANGE} strokeWidth="2" />
      </g>
      <circle cx="100" cy="40" r="3" fill={ORANGE} />
      <text x="85" y="75" fill={DIM2} fontSize="7" fontFamily="monospace">SUB 24H</text>
    </svg>
  );
}

function Thermal() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Heatmap grid */}
      {Array.from({ length: 8 }).map((_, col) =>
        Array.from({ length: 4 }).map((_, row) => {
          const v = (Math.sin((col + row) * 1.3) + 1) / 2;
          return (
            <rect
              key={`${col}-${row}`}
              x={20 + col * 20}
              y={14 + row * 14}
              width="19"
              height="13"
              fill={v > 0.7 ? ORANGE : v > 0.4 ? "#c94f1a" : "#4a2540"}
              style={{ animation: `ca-pulse 2s ease-in-out infinite ${(col + row) * 0.1}s` }}
            />
          );
        })
      )}
      <text x="20" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">THERMAL IR</text>
    </svg>
  );
}

function AutonomousGen() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Solar + battery + grid */}
      <rect x="20" y="14" width="40" height="26" fill={BLUE} opacity="0.5" stroke={DIM2} />
      <line x1="30" y1="14" x2="30" y2="40" stroke={DIM2} />
      <line x1="40" y1="14" x2="40" y2="40" stroke={DIM2} />
      <line x1="50" y1="14" x2="50" y2="40" stroke={DIM2} />
      {/* Flow line */}
      <path d="M60 27 Q 85 27, 85 45 L 95 45" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="3 2" style={{ animation: "ca-dash 1s linear infinite" }}/>
      {/* Battery */}
      <rect x="95" y="38" width="30" height="20" fill="none" stroke={WHITE} strokeWidth="1.5" />
      <rect x="125" y="44" width="3" height="8" fill={WHITE} />
      {[97, 105, 113].map((x, i) => (
        <rect key={i} x={x} y="42" width="6" height="12" fill={ORANGE} style={{ animation: `ca-count 1.5s ease-in-out infinite ${i * 0.2}s` }}/>
      ))}
      {/* Output */}
      <path d="M128 48 Q 150 48, 150 30 L 175 30" fill="none" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="3 2" style={{ animation: "ca-dash 1s linear infinite" }}/>
      <circle cx="175" cy="30" r="4" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite" }}/>
      <text x="20" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">HYBRID · SILENT</text>
    </svg>
  );
}

function Shelter() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Stacked containers */}
      {[0, 1, 2].map((i) => (
        <g key={i} style={{ animation: `ca-count 2.4s ease-in-out infinite ${i * 0.3}s` }}>
          <rect x={30 + i * 5} y={60 - i * 16} width={140 - i * 10} height="14" fill={BLUE} stroke={DIM2}/>
          <line x1={40 + i * 5} y1={60 - i * 16} x2={40 + i * 5} y2={74 - i * 16} stroke={DIM2}/>
          <line x1={50 + i * 5} y1={60 - i * 16} x2={50 + i * 5} y2={74 - i * 16} stroke={DIM2}/>
          <line x1={60 + i * 5} y1={60 - i * 16} x2={60 + i * 5} y2={74 - i * 16} stroke={DIM2}/>
        </g>
      ))}
      {/* NATO star */}
      <g style={{ animation: "ca-pulse 2s ease-in-out infinite" }}>
        <polygon points="100,14 104,22 112,22 106,28 108,36 100,32 92,36 94,28 88,22 96,22" fill={ORANGE}/>
      </g>
      <text x="130" y="12" fill={DIM2} fontSize="7" fontFamily="monospace">STANAG</text>
    </svg>
  );
}

function Simulator() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* VR headset silhouette */}
      <path d="M60 30 Q 100 20, 140 30 L 140 50 Q 100 60, 60 50 Z" fill={WHITE} opacity="0.9"/>
      <circle cx="78" cy="42" r="5" fill={BLUE} />
      <circle cx="122" cy="42" r="5" fill={BLUE} />
      <circle cx="78" cy="42" r="2" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite" }}/>
      <circle cx="122" cy="42" r="2" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite 0.5s" }}/>
      {/* Waves */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${20 + i * 60} 70 Q ${30 + i * 60} 64, ${40 + i * 60} 70`} fill="none" stroke={ORANGE} strokeWidth="1" style={{ animation: `ca-pulse 1.6s ease-in-out infinite ${i * 0.3}s` }}/>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">VR · AR</text>
    </svg>
  );
}

function Edgebander() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Panel */}
      <rect x="10" y="32" width="180" height="16" fill={BLUE} opacity="0.4" />
      {/* Edge band being applied */}
      <g style={{ animation: "ca-slide-r 3s linear infinite" }}>
        <rect x="-10" y="28" width="30" height="4" fill={ORANGE} />
      </g>
      {/* Rollers */}
      {[60, 100, 140].map((x, i) => (
        <circle key={i} cx={x} cy="24" r="6" fill={WHITE} style={{ transformOrigin: `${x}px 24px`, animation: "ca-rot 0.8s linear infinite" }}/>
      ))}
      <line x1="10" y1="48" x2="190" y2="48" stroke={DIM2} />
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">EDGE BAND</text>
    </svg>
  );
}

function DoorMachine() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Door panel forming piece by piece */}
      <rect x="65" y="14" width="70" height="56" fill="none" stroke={WHITE} strokeWidth="1.5" />
      {/* Frame pieces appear */}
      {[
        { x: 65, y: 14, w: 70, h: 4, d: 0 },
        { x: 65, y: 66, w: 70, h: 4, d: 0.4 },
        { x: 65, y: 18, w: 4, h: 48, d: 0.8 },
        { x: 131, y: 18, w: 4, h: 48, d: 1.2 },
      ].map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} fill={ORANGE} style={{ animation: `ca-count 2.4s ease-in-out infinite ${r.d}s` }}/>
      ))}
      {/* Panel inside */}
      <rect x="75" y="26" width="50" height="32" fill={BLUE} opacity="0.5" style={{ animation: "ca-count 2.4s ease-in-out infinite 1.6s" }}/>
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">USI · CNC</text>
    </svg>
  );
}

function SawWood() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Wood plank */}
      <rect x="10" y="44" width="180" height="16" fill={BLUE} opacity="0.5" />
      {[20, 40, 60, 80, 120, 140, 160].map((x, i) => (
        <line key={i} x1={x} y1="44" x2={x} y2="60" stroke={DIM2} strokeWidth="0.5" />
      ))}
      {/* Circular saw */}
      <g style={{ transformOrigin: "100px 30px", animation: "ca-rot 0.3s linear infinite" }}>
        <circle cx="100" cy="30" r="18" fill="none" stroke={WHITE} strokeWidth="2" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
          <line key={i} x1="100" y1="12" x2="100" y2="16" stroke={ORANGE} strokeWidth="2" style={{ transformOrigin: "100px 30px", transform: `rotate(${a}deg)` }}/>
        ))}
        <circle cx="100" cy="30" r="3" fill={ORANGE} />
      </g>
      {/* Sawdust */}
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={95 + i * 4} cy="64" r="0.8" fill={DIM2} style={{ animation: `ca-drop 1s linear infinite ${i * 0.2}s` }}/>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">CIRCULAR · 3000RPM</text>
    </svg>
  );
}

function Sander() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Surface */}
      <rect x="10" y="52" width="180" height="14" fill={BLUE} opacity="0.5" />
      {/* Sander head */}
      <g style={{ animation: "ca-slide-r 2.4s ease-in-out infinite alternate" }}>
        <rect x="-15" y="28" width="30" height="22" fill={WHITE} />
        <g style={{ transformOrigin: "0 50px", animation: "ca-rot 0.25s linear infinite" }}>
          <rect x="-14" y="48" width="28" height="4" fill={ORANGE} />
        </g>
      </g>
      {/* Dust */}
      {[40, 70, 120, 150].map((x, i) => (
        <circle key={i} cx={x} cy="48" r="1" fill={DIM2} style={{ animation: `ca-drop 1.2s linear infinite ${i * 0.2}s` }}/>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">ȘLEFUIRE</text>
    </svg>
  );
}

function Carton() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Flat carton folding into box */}
      <g style={{ transformOrigin: "100px 50px" }}>
        <polygon points="60,50 100,36 140,50 100,64" fill={ORANGE} opacity="0.8" />
        <polygon points="60,50 60,66 100,80 100,64" fill={ORANGE} opacity="0.5" style={{ animation: "ca-pulse 2s ease-in-out infinite" }}/>
        <polygon points="140,50 140,66 100,80 100,64" fill={ORANGE} opacity="0.6" style={{ animation: "ca-pulse 2s ease-in-out infinite 0.4s" }}/>
        {/* Top flaps */}
        <polygon points="60,50 100,36 100,20 60,34" fill={WHITE} opacity="0.4" style={{ animation: "ca-pulse 2s ease-in-out infinite 0.8s" }}/>
        <polygon points="140,50 100,36 100,20 140,34" fill={WHITE} opacity="0.3" style={{ animation: "ca-pulse 2s ease-in-out infinite 1.2s" }}/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">FLEXO · OFFSET</text>
    </svg>
  );
}

function Stretch() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Pallet */}
      <rect x="65" y="60" width="70" height="6" fill={DIM2}/>
      {/* Wrap lines spiraling */}
      <ellipse cx="100" cy="20" rx="40" ry="8" fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.7" style={{ animation: "ca-pulse 1.5s ease-in-out infinite" }}/>
      <ellipse cx="100" cy="30" rx="40" ry="8" fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.7" style={{ animation: "ca-pulse 1.5s ease-in-out infinite 0.2s" }}/>
      <ellipse cx="100" cy="40" rx="40" ry="8" fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.7" style={{ animation: "ca-pulse 1.5s ease-in-out infinite 0.4s" }}/>
      <ellipse cx="100" cy="50" rx="40" ry="8" fill="none" stroke={ORANGE} strokeWidth="1" opacity="0.7" style={{ animation: "ca-pulse 1.5s ease-in-out infinite 0.6s" }}/>
      {/* Inner product */}
      <rect x="75" y="14" width="50" height="46" fill={BLUE} opacity="0.5"/>
      <text x="130" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">STRETCH</text>
    </svg>
  );
}

function Sealing() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Box */}
      <rect x="50" y="30" width="100" height="35" fill={BLUE} opacity="0.5" stroke={DIM2}/>
      {/* Tape being applied */}
      <g style={{ animation: "ca-slide-r 2.4s linear infinite" }}>
        <rect x="-20" y="28" width="40" height="4" fill={ORANGE} />
      </g>
      {/* Roller */}
      <g style={{ animation: "ca-slide-r 2.4s linear infinite" }}>
        <circle cx="0" cy="22" r="6" fill={WHITE}/>
        <circle cx="0" cy="22" r="2" fill={ORANGE} />
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">TAPE · SEAL</text>
    </svg>
  );
}

function Shrink() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Heat tunnel */}
      <rect x="30" y="25" width="140" height="40" fill="none" stroke={WHITE} strokeWidth="1.5" />
      {/* Heat waves */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={`M${45 + i * 30} 60 Q ${50 + i * 30} 50, ${45 + i * 30} 40 Q ${40 + i * 30} 30, ${45 + i * 30} 22`}
          fill="none"
          stroke={ORANGE}
          strokeWidth="1.5"
          opacity="0.7"
          style={{ animation: `ca-pulse 1s ease-in-out infinite ${i * 0.15}s` }}
        />
      ))}
      {/* Product */}
      <g style={{ animation: "ca-slide-r 3s linear infinite" }}>
        <rect x="-18" y="38" width="18" height="14" fill={BLUE}/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">HEAT SHRINK</text>
    </svg>
  );
}

function Labeling() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Bottle moving */}
      <g style={{ animation: "ca-slide-r 2.8s linear infinite" }}>
        <rect x="-10" y="22" width="20" height="38" rx="3" fill={BLUE}/>
        {/* Label appearing */}
        <rect x="-8" y="32" width="16" height="16" fill={ORANGE}/>
        <line x1="-6" y1="38" x2="6" y2="38" stroke={WHITE}/>
        <line x1="-6" y1="42" x2="4" y2="42" stroke={WHITE}/>
      </g>
      {/* Label dispenser */}
      <rect x="90" y="10" width="20" height="14" fill={WHITE}/>
      <line x1="100" y1="24" x2="100" y2="30" stroke={ORANGE} strokeWidth="2"/>
      {/* Conveyor */}
      <line x1="0" y1="62" x2="200" y2="62" stroke={DIM2} strokeWidth="1.5" strokeDasharray="3 2" style={{ animation: "ca-dash 0.6s linear infinite" }}/>
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">WRAP · TOP</text>
    </svg>
  );
}

function Filling() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Bottle */}
      <rect x="85" y="18" width="30" height="50" rx="4" fill="none" stroke={WHITE} strokeWidth="2"/>
      {/* Liquid filling */}
      <rect x="87" y="28" width="26" height="38" fill={ORANGE} opacity="0.8" style={{ transformOrigin: "87px 66px", animation: "ca-fill-v 2s ease-in-out infinite" }}/>
      {/* Nozzle */}
      <rect x="96" y="10" width="8" height="10" fill={DIM2}/>
      {/* Drop */}
      <circle cx="100" cy="22" r="1.5" fill={ORANGE} style={{ animation: "ca-drop 0.8s linear infinite" }}/>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">PRECIZIE ±1%</text>
    </svg>
  );
}

function Disassembly() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Conveyor */}
      <line x1="0" y1="50" x2="200" y2="50" stroke={DIM2} strokeWidth="2" strokeDasharray="5 3" style={{ animation: "ca-dash 0.5s linear infinite" }}/>
      {/* Stations */}
      {[30, 70, 110, 150].map((x, i) => (
        <g key={i}>
          <rect x={x - 8} y="30" width="16" height="16" fill={BLUE} opacity="0.7" style={{ animation: `ca-count 2s ease-in-out infinite ${i * 0.25}s` }}/>
          <circle cx={x} cy="20" r="3" fill={ORANGE} style={{ animation: `ca-pulse 1s ease-in-out infinite ${i * 0.2}s` }}/>
        </g>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">LINIE ASAMBLARE</text>
    </svg>
  );
}

function Marking() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Surface */}
      <rect x="40" y="40" width="120" height="28" fill={BLUE} opacity="0.5"/>
      {/* Code appearing */}
      <g>
        <text x="60" y="60" fill={ORANGE} fontSize="10" fontFamily="monospace" fontWeight="bold">
          UZX-
          <tspan style={{ animation: "ca-blink 1s linear infinite" }}>2026</tspan>
        </text>
      </g>
      {/* Laser head */}
      <g style={{ animation: "ca-slide-r 2.4s ease-in-out infinite alternate" }}>
        <rect x="-6" y="12" width="12" height="16" fill={WHITE}/>
        <line x1="0" y1="28" x2="0" y2="40" stroke={ORANGE} strokeWidth="1.5" style={{ animation: "ca-blink 0.2s linear infinite" }}/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">INKJET · LASER</text>
    </svg>
  );
}

function Baler() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Press chamber */}
      <rect x="50" y="30" width="100" height="40" fill="none" stroke={WHITE} strokeWidth="2"/>
      {/* Top piston */}
      <g style={{ animation: "ca-lift 1.6s ease-in-out infinite" }}>
        <rect x="50" y="10" width="100" height="12" fill={DIM2}/>
        <rect x="54" y="22" width="92" height="10" fill={ORANGE}/>
      </g>
      {/* Compressed bale */}
      <rect x="55" y="58" width="90" height="10" fill={ORANGE} opacity="0.6"/>
      <line x1="55" y1="62" x2="145" y2="62" stroke={WHITE} strokeWidth="0.5"/>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">BALOTARE · 60T</text>
    </svg>
  );
}

function Shredder() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Input material */}
      <g style={{ animation: "ca-drop 2s linear infinite" }}>
        <rect x="85" y="0" width="30" height="14" fill={BLUE}/>
      </g>
      {/* Shredder teeth */}
      <g style={{ transformOrigin: "80px 40px", animation: "ca-rot 0.8s linear infinite" }}>
        <circle cx="80" cy="40" r="14" fill="none" stroke={WHITE} strokeWidth="1.5"/>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <polygon key={i} points="76,28 84,28 80,22" fill={ORANGE} style={{ transformOrigin: "80px 40px", transform: `rotate(${a}deg)` }}/>
        ))}
      </g>
      <g style={{ transformOrigin: "120px 40px", animation: "ca-rot-rev 0.8s linear infinite" }}>
        <circle cx="120" cy="40" r="14" fill="none" stroke={WHITE} strokeWidth="1.5"/>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <polygon key={i} points="116,28 124,28 120,22" fill={ORANGE} style={{ transformOrigin: "120px 40px", transform: `rotate(${a}deg)` }}/>
        ))}
      </g>
      {/* Output chips */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={85 + i * 8} y="62" width="3" height="3" fill={DIM2} style={{ animation: `ca-drop 1.2s linear infinite ${i * 0.2}s` }}/>
      ))}
      <text x="10" y="76" fill={DIM2} fontSize="7" fontFamily="monospace">GRANULATOR</text>
    </svg>
  );
}

function Separator() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Conveyor line */}
      <line x1="0" y1="50" x2="200" y2="50" stroke={DIM2} strokeWidth="2" strokeDasharray="4 2" style={{ animation: "ca-dash 0.8s linear infinite" }}/>
      {/* Magnet above */}
      <rect x="88" y="12" width="24" height="10" fill={BLUE}/>
      <line x1="88" y1="22" x2="88" y2="28" stroke={BLUE} strokeWidth="3"/>
      <line x1="112" y1="22" x2="112" y2="28" stroke={BLUE} strokeWidth="3"/>
      {/* Particles — some magnetic going up, others passing */}
      <g style={{ animation: "ca-slide-r 3s linear infinite" }}>
        <rect x="-15" y="44" width="6" height="6" fill={ORANGE}/>
        <rect x="-5" y="44" width="6" height="6" fill={DIM2}/>
        <rect x="5" y="44" width="6" height="6" fill={ORANGE}/>
      </g>
      {/* Captured iron */}
      <rect x="94" y="28" width="5" height="5" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite" }}/>
      <rect x="102" y="28" width="5" height="5" fill={ORANGE} style={{ animation: "ca-pulse 1s ease-in-out infinite 0.3s" }}/>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">MAGNETIC · OPTIC</text>
    </svg>
  );
}

function Conveyor() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Belt */}
      <rect x="10" y="36" width="180" height="16" fill={DIM2}/>
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1={10 + i * 20} y1="36" x2={10 + i * 20} y2="52" stroke={WHITE} opacity="0.3"/>
        ))}
      </g>
      {/* Rollers */}
      <circle cx="20" cy="44" r="8" fill="none" stroke={WHITE} strokeWidth="1.5" style={{ transformOrigin: "20px 44px", animation: "ca-rot 1s linear infinite" }}/>
      <circle cx="180" cy="44" r="8" fill="none" stroke={WHITE} strokeWidth="1.5" style={{ transformOrigin: "180px 44px", animation: "ca-rot 1s linear infinite" }}/>
      {/* Items moving */}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={30 + i * 60} y="28" width="16" height="8" fill={ORANGE} style={{ animation: "ca-slide-r 3s linear infinite", animationDelay: `${i * 1}s` }}/>
      ))}
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">BELT · HOPPER</text>
    </svg>
  );
}

function CctvCrawler() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Pipe tunnel */}
      <rect x="0" y="20" width="200" height="50" fill="none" stroke={WHITE} strokeWidth="2"/>
      <line x1="0" y1="30" x2="200" y2="30" stroke={DIM2}/>
      <line x1="0" y1="60" x2="200" y2="60" stroke={DIM2}/>
      {/* Crawler */}
      <g style={{ animation: "ca-slide-r 3.5s linear infinite" }}>
        <rect x="-15" y="38" width="30" height="16" fill={ORANGE}/>
        <circle cx="-10" cy="54" r="3" fill="#222" style={{ transformOrigin: "-10px 54px", animation: "ca-rot 0.6s linear infinite" }}/>
        <circle cx="10" cy="54" r="3" fill="#222" style={{ transformOrigin: "10px 54px", animation: "ca-rot 0.6s linear infinite" }}/>
        {/* Light cone */}
        <path d="M15 44 L40 32 L40 52 Z" fill={WHITE} opacity="0.25"/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">Ø 50–2000mm</text>
    </svg>
  );
}

function PushCam() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Pipe */}
      <rect x="50" y="32" width="140" height="28" fill="none" stroke={WHITE} strokeWidth="2"/>
      {/* Reel */}
      <circle cx="30" cy="46" r="14" fill="none" stroke={WHITE} strokeWidth="2"/>
      <circle cx="30" cy="46" r="8" fill="none" stroke={DIM2}/>
      <g style={{ transformOrigin: "30px 46px", animation: "ca-rot 1.5s linear infinite" }}>
        <line x1="30" y1="34" x2="30" y2="58" stroke={ORANGE} strokeWidth="2"/>
      </g>
      {/* Cable extending */}
      <line x1="44" y1="46" x2="160" y2="46" stroke={ORANGE} strokeWidth="1.5" strokeDasharray="4 2" style={{ animation: "ca-dash 0.8s linear infinite" }}/>
      {/* Camera head */}
      <g style={{ animation: "ca-slide-r 3s ease-in-out infinite alternate" }}>
        <circle cx="0" cy="46" r="5" fill={ORANGE} style={{ transform: "translateX(55px)" }}/>
        <circle cx="0" cy="46" r="2" fill={WHITE} style={{ transform: "translateX(55px)" }}/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">PUSH · 60m</text>
    </svg>
  );
}

function Ptz() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Manhole / pit */}
      <rect x="0" y="66" width="200" height="14" fill={DIM2}/>
      <rect x="60" y="58" width="80" height="8" fill="#222"/>
      {/* PTZ camera on periscope */}
      <line x1="100" y1="66" x2="100" y2="40" stroke={WHITE} strokeWidth="3"/>
      <g style={{ transformOrigin: "100px 40px", animation: "ca-pan 3s ease-in-out infinite" }}>
        <rect x="88" y="28" width="24" height="12" rx="3" fill={ORANGE}/>
        <circle cx="100" cy="34" r="3" fill={WHITE}/>
        {/* View cone */}
        <path d="M100 34 L70 10 L130 10 Z" fill={ORANGE} opacity="0.12"/>
      </g>
      <text x="10" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">PAN 360° · TILT</text>
    </svg>
  );
}

function Videoscope() {
  return (
    <svg className="ca-svg" viewBox="0 0 200 80">
      {/* Handle */}
      <rect x="14" y="34" width="40" height="14" rx="3" fill={WHITE}/>
      <rect x="20" y="36" width="28" height="4" fill={BLUE}/>
      {/* Flexible probe */}
      <path d="M54 41 Q 80 20, 110 45 T 170 35" fill="none" stroke={ORANGE} strokeWidth="2" strokeDasharray="2 2" style={{ animation: "ca-dash 1s linear infinite" }}/>
      {/* Probe tip */}
      <circle cx="170" cy="35" r="4" fill={ORANGE}/>
      <circle cx="170" cy="35" r="1.5" fill={WHITE} style={{ animation: "ca-pulse 1s ease-in-out infinite" }}/>
      {/* Screen readout */}
      <rect x="10" y="14" width="30" height="10" fill="none" stroke={DIM2}/>
      <line x1="12" y1="19" x2="25" y2="19" stroke={ORANGE}/>
      <line x1="12" y1="22" x2="30" y2="22" stroke={DIM2}/>
      <text x="50" y="14" fill={DIM2} fontSize="7" fontFamily="monospace">NDT CERT.</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═════════════════════════════════════════════════════════════════════ */

export function CatalogAnim({ kind }: { kind: CatalogAnimKind }) {
  let content: React.ReactNode = null;
  switch (kind) {
    case "forklift-diesel": content = <ForkliftDiesel />; break;
    case "forklift-electric": content = <ForkliftElectric />; break;
    case "pallet-jack": content = <PalletJack />; break;
    case "racking": content = <Racking />; break;
    case "laser-fiber": content = <LaserFiber />; break;
    case "cnc-mill": content = <CncMill />; break;
    case "cnc-lathe": content = <CncLathe />; break;
    case "welding": content = <Welding />; break;
    case "robot-arm": content = <RobotArm />; break;
    case "palletizer": content = <Palletizer />; break;
    case "cobot": content = <Cobot />; break;
    case "vision": content = <Vision />; break;
    case "excavator": content = <Excavator />; break;
    case "crane": content = <Crane />; break;
    case "generator": content = <Generator />; break;
    case "bucket": content = <Bucket />; break;
    case "oem-parts": content = <OemParts />; break;
    case "filters": content = <Filters />; break;
    case "wear-kit": content = <WearKit />; break;
    case "hydraulic": content = <Hydraulic />; break;
    case "commissioning": content = <Commissioning />; break;
    case "preventive": content = <Preventive />; break;
    case "warranty": content = <Warranty />; break;
    case "rapid": content = <Rapid />; break;
    case "thermal": content = <Thermal />; break;
    case "autonomous-gen": content = <AutonomousGen />; break;
    case "shelter": content = <Shelter />; break;
    case "simulator": content = <Simulator />; break;
    case "edgebander": content = <Edgebander />; break;
    case "door-machine": content = <DoorMachine />; break;
    case "saw-wood": content = <SawWood />; break;
    case "sander": content = <Sander />; break;
    case "carton": content = <Carton />; break;
    case "stretch": content = <Stretch />; break;
    case "sealing": content = <Sealing />; break;
    case "shrink": content = <Shrink />; break;
    case "labeling": content = <Labeling />; break;
    case "filling": content = <Filling />; break;
    case "disassembly": content = <Disassembly />; break;
    case "marking": content = <Marking />; break;
    case "baler": content = <Baler />; break;
    case "shredder": content = <Shredder />; break;
    case "separator": content = <Separator />; break;
    case "conveyor": content = <Conveyor />; break;
    case "cctv-crawler": content = <CctvCrawler />; break;
    case "push-cam": content = <PushCam />; break;
    case "ptz": content = <Ptz />; break;
    case "videoscope": content = <Videoscope />; break;
  }
  return <Stage>{content}</Stage>;
}
