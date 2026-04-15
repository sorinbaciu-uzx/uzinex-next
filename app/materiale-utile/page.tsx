"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/* ─────────────────────────────────────────────────────────────────────────
   /materiale-utile — bibliotecă video cu 48 de resurse gratuite
   Importate din canalul YouTube UzineX, organizate în 3 playlisturi.
   ───────────────────────────────────────────────────────────────────── */

type Video = { id: string; title: string; duration?: string };
type Playlist = {
  key: "lean" | "stiri" | "podcast";
  title: string;
  tagline: string;
  accent: string;
  videos: Video[];
};

const PLAYLISTS: Playlist[] = [
  {
    key: "lean",
    title: "Producție Lean",
    tagline: "Optimizare, logistică și management industrial",
    accent: "#1e6bb8",
    videos: [
      { id: "01WoOGmMnxE", title: "Cum funcționează strategia Make-to-Stock" },
      { id: "SET5ImJOVwU", title: "Cum să îmbunătățești fluxul de producție prin eliminarea Muda, Mura și Miri" },
      { id: "dyObDECnxkc", title: "Cum să transformi logistica afacerii tale cu metoda Milk Run" },
      { id: "RhWwH3r7uLs", title: "Cum să îți optimizezi managementul calității pentru rezultate excepționale" },
      { id: "QMMB7_F-zgA", title: "De ce rezolvarea problemelor nu se termină niciodată" },
      { id: "49pt1x9gI5M", title: "De la depozit la client — cum să gestionezi perfect logistica" },
      { id: "jWkyD7FkCe0", title: "De ce ai nevoie de un panou de comunicare în organizația ta" },
      { id: "gp2OMBep7G0", title: "Maximizarea eficienței în uzine — calcularea timpului de producție" },
      { id: "XQTx6U2Mb7U", title: "Cum să alegi tehnologia potrivită pentru afacerea ta" },
      { id: "NGqCm-7sBG8", title: "Cum să crești eficiența în producție — secretul japonez al Heijunka" },
      { id: "TtS03Wr73oQ", title: "Cum să eviți stocurile excedentare cu prognoza cererii eficientă" },
      { id: "DrUqfuHCJSQ", title: "Cum să îți aliniezi echipa și să atingi scopuri ambițioase cu OKR-uri" },
      { id: "IvIglm4RPqs", title: "Cum să îți optimizezi procesul de producție — eficiența reală explicată" },
      { id: "ncg88gVYF2w", title: "Cum să îți transformi fabrica într-un model de eficiență — activități adăugătoare de valoare" },
      { id: "W8Zlo60f3vI", title: "Cum să realizezi o analiză SWOT eficientă pentru succesul afacerii tale" },
      { id: "NvCvOlDlpwA", title: "Cum să transformi proiectele de construcții cu metodologia Lean" },
      { id: "8jh8jm9pEsU", title: "De ce eficiența producției tale contează — îmbunătățește PCE-ul acum" },
      { id: "Ju2CpDq2UlE", title: "De ce Toyota Kata este cheia succesului în Lean Manufacturing" },
      { id: "0plQwICsJ-0", title: "De la Ford la Lean Manufacturing — transformarea industriei moderne" },
      { id: "AW5klcoIxAk", title: "De la haos la eficiență — beneficiile managementului vizual în producție" },
      { id: "Q_njGwx6X_I", title: "De la idee la produs — cum metoda 3P îți poate schimba afacerea" },
      { id: "7cNMeGOChEw", title: "De la teorie la practică — implementarea Six Sigma în fabrica ta" },
      { id: "7v5ZqKkn3PA", title: "Descoperă secretul gestionării ratei de blocaj în producția Lean" },
      { id: "uiF8gdsP5KY", title: "Eficientizează-ți operațiunile cu plimbările Gemba" },
      { id: "879JeeNKc9w", title: "EPEX — cheia pentru a minimiza stocurile și pierderile în producție" },
      { id: "mZS_BzbVZO0", title: "Ești gata să previi problemele industriale încă de la rădăcină — tehnica celor 5 De ce" },
      { id: "s1GkXFqdnDI", title: "FIFO — cel mai eficient mod de a gestiona stocurile în fabrică" },
      { id: "w-xZ0EFWm1A", title: "Găsește și rezolvă problema reală din fabrica ta cu RCA" },
      { id: "z4Yujh6UzOQ", title: "Productivitatea în afaceri — cum să faci mai mult cu resurse limitate" },
      { id: "d8TFRkKKw58", title: "Revoluția în producție — ce este Kaikaku și cum poate schimba totul" },
      { id: "avulbXhQAB8", title: "Rolul crucial al managerului logistic — cum fac diferența în afaceri" },
      { id: "euzAgdWkNyA", title: "Secretul producției personalizate — descoperă Make-to-Order" },
      { id: "4ErGc4KkoKk", title: "Strategii eficiente pentru gestionarea costurilor de inventar" },
      { id: "-CHpkbVmSI0", title: "Strategii eficiente pentru planificarea capacității în producția Lean" },
      { id: "U9d0Y8V62lw", title: "Tabla Kamishibai — instrumentul japonez care revoluționează managementul sarcinilor" },
      { id: "NYG2eGmX1k4", title: "Transformă-ți producția — tehnici avansate de management al capacității" },
      { id: "2I73pztafCo", title: "VMI — strategia care îți optimizează lanțul de aprovizionare și crește profitul" },
      { id: "MbW5ncPJFEY", title: "Ce este eficiența echipamentelor și cum se calculează" },
      { id: "CLJb3g8rVhQ", title: "Criticitatea activelor — un concept esențial în managementul operațiunilor" },
      { id: "bbHdu_Zn7Vo", title: "Cum faci întreținerea preventivă la echipamentele din fabrică" },
      { id: "E6Y6yxReFTg", title: "Întreținerea reactivă — să lași echipamentele să funcționeze până se strică" },
    ],
  },
  {
    key: "stiri",
    title: "Știri industriale",
    tagline: "Episoade săptămânale cu Sorin Baciu și Cristian Munthiu",
    accent: "#f5851f",
    videos: [
      { id: "6NFRA8-iVmc", title: "Știrile industriale cu UzineX — episodul pilot" },
      { id: "QhG459JWL_U", title: "Știri industriale cu Sorin Baciu și Cristian Munthiu" },
      { id: "RRzjXeia8nM", title: "Știri industriale cu Cristian Munthiu — episodul 2" },
      { id: "Sao06JRPHjQ", title: "Știri industriale cu Cristian Munthiu — episodul 3" },
    ],
  },
  {
    key: "podcast",
    title: "Podcast industrial",
    tagline: "Interviuri cu experți, antreprenori și lideri de industrie",
    accent: "#2f855a",
    videos: [
      { id: "mrA-PYYM7tc", title: "Automatizări industriale și viitorul mecatronicii — cu Bogdan Anușca" },
      { id: "jenyQ6WNDAQ", title: "Cum să construiești un business durabil — cu Dumitru Rascanu" },
      { id: "PDVzf8KwJSo", title: "Podcast cu Paul Butnariu, Președintele CCI Iași — provocări și oportunități pentru antreprenori" },
    ],
  },
];

const HERO_STATS = [
  { v: "48", label: "Resurse video", hint: "Lean · știri · podcast" },
  { v: "3", label: "Playlisturi tematice", hint: "Organizate pe tematică" },
  { v: "100%", label: "Gratuit & acces deschis", hint: "Fără cont · fără paywall" },
  { v: "@UZINEX", label: "Canal YouTube", hint: "Abonează-te pentru noutăți" },
];

/* ─────── Technical animation ─────── */

const CSS_ANIM = `
@keyframes mu-rot { to { transform: rotate(360deg); } }
@keyframes mu-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
@keyframes mu-dash { to { stroke-dashoffset: -24; } }
@keyframes mu-scan { 0% { transform: translateX(-10%); } 100% { transform: translateX(110%); } }
@keyframes mu-blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0.2; } }
@keyframes mu-pop { 0% { transform: scale(0); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
`;

function HeroAnim() {
  return (
    <svg className="w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet">
      <style>{CSS_ANIM}</style>
      <defs>
        <pattern id="mu-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill="url(#mu-grid)" />

      {/* Film reel left */}
      <g transform="translate(60, 110)" style={{ transformOrigin: "0 0", animation: "mu-rot 20s linear infinite" }}>
        <circle r="42" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
        <circle r="8" fill="#f5851f" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(a) * 28} cy={Math.sin(a) * 28} r="4" fill="rgba(255,255,255,0.3)" />;
        })}
      </g>

      {/* Film strip */}
      <g style={{ animation: "mu-scan 5s linear infinite" }}>
        <rect x="100" y="90" width="140" height="40" fill="rgba(245,133,31,0.15)" stroke="#f5851f" strokeWidth="1" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={108 + i * 22} y="96" width="18" height="10" fill="#f5851f" opacity="0.7" />
        ))}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={108 + i * 22} y="114" width="18" height="10" fill="#f5851f" opacity="0.5" />
        ))}
      </g>

      {/* Play button right */}
      <g transform="translate(260, 110)">
        <circle r="28" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeDasharray="3 3" style={{ transformOrigin: "0 0", animation: "mu-rot 15s linear infinite reverse" }}/>
        <polygon points="-8,-12 -8,12 14,0" fill="#f5851f" style={{ animation: "mu-pulse 2s ease-in-out infinite" }} />
      </g>

      {/* Episode counters drifting */}
      {[
        { x: 40, y: 40, t: "EP.01" },
        { x: 260, y: 50, t: "EP.24" },
        { x: 230, y: 180, t: "EP.48" },
        { x: 70, y: 180, t: "EP.12" },
      ].map((e, i) => (
        <g key={i} style={{ animation: `mu-pulse 2.5s ease-in-out infinite ${i * 0.3}s` }}>
          <rect x={e.x - 12} y={e.y - 6} width="24" height="12" fill="none" stroke="#f5851f" strokeWidth="0.8" />
          <text x={e.x} y={e.y + 3} textAnchor="middle" fill="#f5851f" fontSize="7" fontFamily="monospace" fontWeight="bold">{e.t}</text>
        </g>
      ))}

      {/* HUD corners */}
      <g stroke="#f5851f" strokeWidth="1" fill="none">
        <path d="M 8 8 L 8 22 M 8 8 L 22 8" />
        <path d="M 312 8 L 312 22 M 312 8 L 298 8" />
        <path d="M 8 212 L 8 198 M 8 212 L 22 212" />
        <path d="M 312 212 L 312 198 M 312 212 L 298 212" />
      </g>
      <text x="12" y="18" fill="#f5851f" fontSize="7" fontFamily="monospace">● REC</text>
      <text x="268" y="18" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">48 / 48</text>
      <text x="12" y="206" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">UZX · TV</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   PAGE
   ═════════════════════════════════════════════════════════════════════ */

export default function MaterialeUtilePage() {
  const [activeKey, setActiveKey] = useState<Playlist["key"]>("lean");
  const [activeVideo, setActiveVideo] = useState<string>(PLAYLISTS[0].videos[0].id);

  const activePlaylist = PLAYLISTS.find((p) => p.key === activeKey)!;
  const currentVideo = activePlaylist.videos.find((v) => v.id === activeVideo) ?? activePlaylist.videos[0];

  const switchPlaylist = (k: Playlist["key"]) => {
    setActiveKey(k);
    const pl = PLAYLISTS.find((p) => p.key === k)!;
    setActiveVideo(pl.videos[0].id);
  };

  return (
    <div className="min-h-screen bg-white text-ink-900">
      <Header solid />

      <main>
        {/* ───── HERO ───── */}
        <section className="border-b hairline relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-white/50 mb-6">
                <Link href="/" className="hover:text-uzx-orange transition">Acasă</Link>
                <span className="text-white/30">/</span>
                <span className="text-white/80">Resurse</span>
                <span className="text-white/30">/</span>
                <span className="text-uzx-orange">Materiale utile</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-white/70 mb-6 mono">
                    <span className="w-8 h-px bg-white/40" />
                    <span>Bibliotecă video · gratuit</span>
                    <span className="inline-flex items-center gap-1.5 text-uzx-orange ml-2">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-uzx-orange"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      48 episoade
                    </span>
                  </div>
                  <h1
                    className="serif text-3xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white mb-6"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Materiale utile<br />
                    pentru oameni care<br />
                    <span className="text-uzx-orange font-light">construiesc fabrici.</span>
                  </h1>
                  <p className="text-base lg:text-lg text-ink-200 max-w-2xl leading-relaxed">
                    48 de episoade gratuite despre <strong className="text-white">Lean Manufacturing</strong>,
                    optimizare producție, logistică, mentenanță preventivă, plus știri industriale săptămânale
                    și interviuri podcast cu experți din industria românească.
                  </p>
                  <div className="flex flex-wrap items-center gap-4 mt-8">
                    <a
                      href="#player"
                      className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-sm px-7 py-4 transition flex items-center gap-3 group font-medium"
                    >
                      Începe să vizionezi
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </a>
                    <a
                      href="https://www.youtube.com/@UZINEX"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-white/20 text-white text-sm px-7 py-4 transition border border-white/20 flex items-center gap-2"
                    >
                      <span>Canal YouTube @UZINEX</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-5 relative">
                  <div className="w-full aspect-[8/5.5] bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10">
                    <HeroAnim />
                  </div>
                </div>
              </div>

              {/* Hero stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-12 lg:mt-16 pt-10 border-t border-white/10">
                {HERO_STATS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="border-l-2 border-uzx-orange pl-4"
                  >
                    <div className="serif text-2xl lg:text-4xl text-white num" style={{ letterSpacing: "-0.02em" }}>
                      {s.v}
                    </div>
                    <div className="text-[10px] mono text-white/60 uppercase tracking-wider mt-1.5">{s.label}</div>
                    <div className="text-[10px] text-ink-300 mt-0.5">{s.hint}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── PLAYLIST TABS + PLAYER ───── */}
        <section id="player" className="border-b hairline py-14 lg:py-20 bg-ink-50">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Player</div>
                  <h2
                    className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    3 playlisturi tematice.<br />
                    <span className="font-light text-uzx-orange">Alege-ți direcția.</span>
                  </h2>
                </div>
              </div>

              {/* Playlist tabs */}
              <div className="flex flex-wrap gap-0 mb-8 border hairline bg-white w-full lg:w-fit">
                {PLAYLISTS.map((pl, i) => (
                  <button
                    key={pl.key}
                    type="button"
                    onClick={() => switchPlaylist(pl.key)}
                    className={`px-5 lg:px-6 py-4 text-sm transition flex items-center gap-3 text-left ${i > 0 ? "border-l hairline" : ""} ${
                      activeKey === pl.key ? "text-white" : "text-ink-700 hover:bg-ink-50"
                    }`}
                    style={activeKey === pl.key ? { background: pl.accent } : {}}
                  >
                    <span className={`mono text-[10px] ${activeKey === pl.key ? "opacity-80" : "text-ink-400"}`}>
                      0{i + 1}
                    </span>
                    <div className="flex flex-col items-start">
                      <span className="serif text-base">{pl.title}</span>
                      <span className={`text-[10px] mono uppercase tracking-wider ${activeKey === pl.key ? "text-white/80" : "text-ink-500"}`}>
                        {pl.videos.length} episoade
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Player + sidebar layout */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeKey}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  {/* Main player */}
                  <div className="lg:col-span-8">
                    <div
                      className="bg-ink-900 aspect-video border hairline relative overflow-hidden"
                      style={{ borderTopWidth: 3, borderTopColor: activePlaylist.accent }}
                    >
                      <iframe
                        key={activeVideo}
                        src={`https://www.youtube.com/embed/${activeVideo}?rel=0`}
                        title={currentVideo.title}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    {/* Current video info */}
                    <div className="mt-5 bg-white border hairline p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider" style={{ color: activePlaylist.accent }}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: activePlaylist.accent }} />
                          {activePlaylist.title}
                        </span>
                        <span className="text-[10px] mono text-ink-400">·</span>
                        <span className="text-[10px] mono text-ink-500 uppercase tracking-wider">
                          Ep. {activePlaylist.videos.findIndex((v) => v.id === activeVideo) + 1} / {activePlaylist.videos.length}
                        </span>
                      </div>
                      <h3 className="serif text-xl lg:text-2xl text-ink-900 leading-tight" style={{ letterSpacing: "-0.02em" }}>
                        {currentVideo.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t hairline">
                        <a
                          href={`https://www.youtube.com/watch?v=${activeVideo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-ink-700 hover:text-uzx-orange transition inline-flex items-center gap-2 group"
                        >
                          Vizionează pe YouTube
                          <span className="group-hover:translate-x-0.5 transition">↗</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Playlist sidebar */}
                  <div className="lg:col-span-4">
                    <div className="bg-white border hairline">
                      <div
                        className="px-5 py-4 border-b hairline flex items-center justify-between"
                        style={{ background: activePlaylist.accent + "0f" }}
                      >
                        <div>
                          <div className="serif text-base text-ink-900" style={{ letterSpacing: "-0.02em" }}>
                            {activePlaylist.title}
                          </div>
                          <div className="text-[10px] mono uppercase tracking-wider text-ink-500 mt-0.5">
                            {activePlaylist.tagline}
                          </div>
                        </div>
                        <div className="text-[10px] mono text-ink-500">
                          {activePlaylist.videos.findIndex((v) => v.id === activeVideo) + 1}/{activePlaylist.videos.length}
                        </div>
                      </div>
                      <div className="max-h-[600px] lg:max-h-[540px] overflow-y-auto divide-y hairline">
                        {activePlaylist.videos.map((v, i) => {
                          const isActive = v.id === activeVideo;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setActiveVideo(v.id)}
                              className={`w-full text-left p-3 transition flex gap-3 ${
                                isActive ? "bg-ink-50" : "hover:bg-ink-50"
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="shrink-0 w-24 aspect-video bg-ink-900 relative overflow-hidden">
                                <img
                                  src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                                  alt=""
                                  loading="lazy"
                                  width={320}
                                  height={180}
                                  className="w-full h-full object-cover"
                                />
                                {isActive && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                    <motion.div
                                      className="w-2 h-2 rounded-full"
                                      style={{ background: activePlaylist.accent }}
                                      animate={{ opacity: [1, 0.3, 1] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <span className="ml-2 text-[9px] mono uppercase tracking-wider text-white">
                                      Acum
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1">
                                  Ep. {String(i + 1).padStart(2, "0")}
                                </div>
                                <div
                                  className={`text-xs leading-snug line-clamp-3 ${
                                    isActive ? "text-ink-900 font-medium" : "text-ink-700"
                                  }`}
                                >
                                  {v.title}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ───── CATEGORY STATS ───── */}
        <section className="border-b hairline py-14 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                <div className="lg:col-span-5">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">— Ce vei învăța</div>
                  <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95]" style={{ letterSpacing: "-0.03em" }}>
                    48 de episoade,<br />
                    <span className="font-light text-uzx-orange">8 teme tehnice.</span>
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-ink-600 text-base leading-relaxed">
                    Conținut produs de echipa Uzinex pentru manageri, ingineri și antreprenori. Nu reciclăm bloguri
                    — fiecare episod e bazat pe proiecte reale pe care le-am implementat la clienții noștri industriali.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-200 border hairline">
                {[
                  { num: "01", title: "Lean Manufacturing", count: "20+ ep.", desc: "Heijunka, Kaizen, Kanban, Gemba, 5S, Six Sigma" },
                  { num: "02", title: "Logistică & supply chain", count: "8 ep.", desc: "Milk Run, FIFO, VMI, inventory management" },
                  { num: "03", title: "Managementul calității", count: "6 ep.", desc: "OKR, RCA, 5 De ce, SWOT, Toyota Kata" },
                  { num: "04", title: "Mentenanță echipamente", count: "5 ep.", desc: "Preventivă, reactivă, criticitate active, OEE" },
                  { num: "05", title: "Strategie & leadership", count: "4 ep.", desc: "Kaikaku, Make-to-Stock, Make-to-Order, capacitate" },
                  { num: "06", title: "Știri industriale", count: "4 ep.", desc: "Evenimente săptămânale cu experți UzineX" },
                  { num: "07", title: "Podcast antreprenori", count: "3 ep.", desc: "Interviuri cu lideri români din industrie" },
                  { num: "08", title: "Studii de caz", count: "7+ ep.", desc: "Aplicații reale integrate în alte episoade" },
                ].map((t, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="bg-white p-6 lg:p-7 flex flex-col"
                  >
                    <div className="serif text-3xl text-uzx-orange num mb-4" style={{ letterSpacing: "-0.04em" }}>
                      {t.num}
                    </div>
                    <h3 className="serif text-base text-ink-900 leading-tight mb-1" style={{ letterSpacing: "-0.02em" }}>
                      {t.title}
                    </h3>
                    <div className="text-[10px] mono text-uzx-blue uppercase tracking-wider mb-3">{t.count}</div>
                    <p className="text-xs text-ink-600 leading-relaxed">{t.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───── FINAL CTA ───── */}
        <section className="py-14 lg:py-20 text-white relative overflow-hidden" style={{ background: "#082545" }}>
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="container-x relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">— Nu pierde următorul episod</div>
              <h2 className="serif text-3xl md:text-4xl lg:text-5xl leading-[0.95] mb-6" style={{ letterSpacing: "-0.03em" }}>
                Abonează-te pe YouTube<br />
                <span className="font-light text-uzx-orange">și primești notificare la fiecare episod nou.</span>
              </h2>
              <p className="text-ink-300 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Publicăm săptămânal episoade noi — Lean Manufacturing, podcast-uri cu antreprenori,
                știri industriale. Canalul e gratuit și fără paywall.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5">
                <a
                  href="https://www.youtube.com/@UZINEX?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-uzx-orange hover:bg-uzx-orange/90 text-white text-base px-8 py-4 transition font-medium inline-flex items-center gap-3 group"
                >
                  Abonează-te la @UZINEX
                  <span className="group-hover:translate-x-1 transition">→</span>
                </a>
                <a
                  href="mailto:info@uzinex.ro?subject=Sugestie%20materiale%20utile"
                  className="text-sm underline-link hover:text-ink-200"
                >
                  Sugerează un topic
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
