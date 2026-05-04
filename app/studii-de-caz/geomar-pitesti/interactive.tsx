"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

export function VideoPlayer({
  youtubeId,
  thumbnail,
  title,
  duration,
}: {
  youtubeId: string;
  thumbnail: string;
  title: string;
  duration?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Vezi videoclipul: ${title}`}
        className="relative block w-full aspect-video bg-ink-100 group overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,37,69,0) 30%, rgba(8,37,69,0.7) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-white/15 backdrop-blur border border-white/40 flex items-center justify-center group-hover:bg-uzx-orange group-hover:border-uzx-orange transition">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white text-left">
          <div className="text-[10px] mono uppercase tracking-widest opacity-85">
            Testimonial Marian{duration ? ` · ${duration}` : ""}
          </div>
          <div className="serif text-base lg:text-lg mt-1 line-clamp-2">{title}</div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(5,15,30,0.92)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl cursor-default"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Închide"
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
              >
                ✕
              </button>
              <div className="aspect-video bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

type EdgeData = {
  bavura: string;
  oxidare: "Nu" | "Ușoară" | "Medie" | "Mare";
  zat: string;
  finishScore: number;
  speedScore: number;
  costScore: number;
  b2cVerdict: "Respins" | "Marginal" | "Bun" | "Optim";
  edgePath: string;
  edgeColor: string;
  notes: string;
};

const METHODS = [
  { id: "manual", label: "Manual cu disc", short: "MANUAL" },
  { id: "plasma", label: "Plasma", short: "PLASMA" },
  { id: "waterjet", label: "Waterjet", short: "WATERJET" },
  { id: "laser", label: "Laser fiber 6 kW", short: "LASER 6 kW" },
] as const;

const MATERIALS = [
  { id: "inox", label: "Inox AISI 304", short: "INOX" },
  { id: "aluminiu", label: "Aluminiu seria 5xxx", short: "ALU" },
  { id: "otel", label: "Oțel construcție", short: "OȚEL" },
] as const;

const DATA: Record<string, Record<string, EdgeData>> = {
  manual: {
    inox: {
      bavura: "2–3 mm",
      oxidare: "Ușoară",
      zat: "n/a",
      finishScore: 3,
      speedScore: 2,
      costScore: 5,
      b2cVerdict: "Respins",
      edgePath: "M 0 60 L 30 58 L 50 62 L 75 56 L 100 65 L 125 60 L 150 55 L 175 64 L 200 58 L 200 100 L 0 100 Z",
      edgeColor: "#8a4f23",
      notes: "Muchie rugoasă cu bavuri vizibile. Cere finisaj suplimentar prin polizare manuală pentru produse vizibile clientului final.",
    },
    aluminiu: {
      bavura: "2 mm",
      oxidare: "Nu",
      zat: "n/a",
      finishScore: 4,
      speedScore: 3,
      costScore: 6,
      b2cVerdict: "Respins",
      edgePath: "M 0 60 L 30 58 L 50 62 L 75 56 L 100 64 L 125 58 L 150 56 L 175 62 L 200 58 L 200 100 L 0 100 Z",
      edgeColor: "#9aa6b8",
      notes: "Aluminiul se taie mai curat decât inoxul cu disc, dar bavuri rămân la marginea inferioară. Polizare necesară.",
    },
    otel: {
      bavura: "2–3 mm",
      oxidare: "Medie",
      zat: "n/a",
      finishScore: 3,
      speedScore: 2,
      costScore: 5,
      b2cVerdict: "Respins",
      edgePath: "M 0 60 L 30 56 L 50 64 L 75 58 L 100 65 L 125 58 L 150 62 L 175 56 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#5b6273",
      notes: "Tăierea cu disc abraziv lasă scântei și oxidare la margine. Pentru oțel decorativ, finisajul cere șlefuire și vopsire.",
    },
  },
  plasma: {
    inox: {
      bavura: "1–2 mm",
      oxidare: "Mare",
      zat: "2–3 mm",
      finishScore: 5,
      speedScore: 7,
      costScore: 7,
      b2cVerdict: "Marginal",
      edgePath: "M 0 60 L 50 60 L 100 60 L 150 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#c83a17",
      notes: "Plasma e rapidă, dar pe inox lasă oxidare cromată semnificativă pe muchie. Pentru produse vizibile B2C, oxidul cere polizare obligatorie.",
    },
    aluminiu: {
      bavura: "1–2 mm",
      oxidare: "Medie",
      zat: "2 mm",
      finishScore: 4,
      speedScore: 6,
      costScore: 6,
      b2cVerdict: "Marginal",
      edgePath: "M 0 60 L 50 60 L 100 60 L 150 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#a0623c",
      notes: "Plasma standard pe aluminiu cere amestec special de gaz. Bavuri și oxidare ușoară. Pentru B2C cere prelucrare suplimentară.",
    },
    otel: {
      bavura: "1–2 mm",
      oxidare: "Medie",
      zat: "1–2 mm",
      finishScore: 6,
      speedScore: 8,
      costScore: 7,
      b2cVerdict: "Marginal",
      edgePath: "M 0 60 L 50 60 L 100 60 L 150 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#7a4a2c",
      notes: "Plasma e bună pe oțel structural, dar muchia are oxidare reziduală care nu e ideală pentru produse decorative finite.",
    },
  },
  waterjet: {
    inox: {
      bavura: "< 0,1 mm",
      oxidare: "Nu",
      zat: "Zero",
      finishScore: 9,
      speedScore: 4,
      costScore: 4,
      b2cVerdict: "Bun",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#a8d4ff",
      notes: "Waterjet livrează muchie excelentă fără oxidare și fără zonă afectată termic. Limitarea e viteza (de 4-5× mai lent decât laserul) și costul de operare ridicat.",
    },
    aluminiu: {
      bavura: "< 0,1 mm",
      oxidare: "Nu",
      zat: "Zero",
      finishScore: 9,
      speedScore: 4,
      costScore: 4,
      b2cVerdict: "Bun",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#a8d4ff",
      notes: "Pentru aluminiu, waterjet evită complet zona afectată termic și deformările. Calitate excelentă, dar cost ridicat pentru atelier B2C cu volume mici.",
    },
    otel: {
      bavura: "< 0,1 mm",
      oxidare: "Nu",
      zat: "Zero",
      finishScore: 9,
      speedScore: 4,
      costScore: 4,
      b2cVerdict: "Bun",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#a8d4ff",
      notes: "Waterjet e bun pe oțel gros (peste 10 mm). Pentru tablă subțire decorativă, viteza redusă face metoda neeconomică pentru atelier mic.",
    },
  },
  laser: {
    inox: {
      bavura: "< 0,05 mm",
      oxidare: "Nu",
      zat: "0,1–0,3 mm",
      finishScore: 10,
      speedScore: 10,
      costScore: 9,
      b2cVerdict: "Optim",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#dde4ef",
      notes: "Laser fiber 6 kW cu azot livrează tablă curată fără bavură, fără oxidare cromată, ZAT minim. Pentru produsele vizibile B2C, este standardul de muchie.",
    },
    aluminiu: {
      bavura: "< 0,05 mm",
      oxidare: "Nu",
      zat: "0,1–0,3 mm",
      finishScore: 9,
      speedScore: 9,
      costScore: 9,
      b2cVerdict: "Optim",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#e8edf5",
      notes: "Laser pe aluminiu cere parametri specifici, dar cu setup corect livrează muchie curată comparabilă cu inox. Atelierul Geomar e calibrat pentru ambele materiale.",
    },
    otel: {
      bavura: "< 0,1 mm",
      oxidare: "Ușoară",
      zat: "0,1–0,3 mm",
      finishScore: 9,
      speedScore: 10,
      costScore: 9,
      b2cVerdict: "Optim",
      edgePath: "M 0 60 L 200 60 L 200 100 L 0 100 Z",
      edgeColor: "#cfd6e3",
      notes: "Laser cu oxigen pe oțel construcție livrează viteză mare cu oxidare ușoară pe muchie, ușor de eliminat la finisaj. Optim pentru porți și balustrade exterioare vopsite.",
    },
  },
};

function ScoreBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10px] mono uppercase tracking-widest text-ink-500">{label}</div>
        <div className="text-xs serif text-ink-900 num">{score}/10</div>
      </div>
      <div className="w-full h-2 bg-white border hairline">
        <motion.div
          className="h-full"
          initial={{ width: 0 }}
          animate={{ width: `${score * 10}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export function EdgeQualityComparator() {
  const [method, setMethod] = useState<string>("laser");
  const [material, setMaterial] = useState<string>("inox");

  const data = DATA[method][material];
  const verdictColor: Record<string, string> = {
    Respins: "#dc2626",
    Marginal: "#f59e0b",
    Bun: "#3b82f6",
    Optim: "#16a34a",
  };

  return (
    <div className="border hairline bg-white">
      <div
        className="px-6 lg:px-8 py-6 border-b hairline"
        style={{ background: "linear-gradient(180deg, #faf6f1 0%, white 100%)" }}
      >
        <div className="text-[11px] mono uppercase tracking-[0.2em] mb-2 text-uzx-orange">
          Comparator interactiv · calitatea muchiei pentru B2C
        </div>
        <h3
          className="serif text-2xl lg:text-3xl text-ink-900 leading-tight max-w-3xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Cum arată muchia pe inox, aluminiu sau oțel · pentru fiecare metodă de tăiere?
        </h3>
        <p className="text-sm text-ink-600 mt-3 max-w-2xl leading-relaxed">
          Pentru un atelier care vinde B2C, muchia tăieturii este vizibilă
          direct clientului final. Compară aici cele patru metode pe trei
          materiale tipice. Fiecare combinație arată grosimea bavurii,
          oxidarea, zona afectată termic, plus un verdict B2C.
        </p>
      </div>

      <div className="p-6 lg:p-8 space-y-6" style={{ background: "#faf6f1" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Metodă de tăiere
            </div>
            <div className="grid grid-cols-2 gap-2">
              {METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMethod(m.id)}
                  className={`px-3 py-2.5 text-xs lg:text-sm border hairline transition ${
                    method === m.id
                      ? "border-uzx-orange bg-uzx-orange/5 text-ink-900 font-medium"
                      : "bg-white hover:bg-ink-50 text-ink-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Material prelucrat
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MATERIALS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMaterial(m.id)}
                  className={`px-3 py-2.5 text-xs lg:text-sm border hairline transition ${
                    material === m.id
                      ? "border-uzx-orange bg-uzx-orange/5 text-ink-900 font-medium"
                      : "bg-white hover:bg-ink-50 text-ink-700"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5">
            <div className="text-[10px] mono uppercase tracking-widest text-ink-500 mb-3">
              Vizualizare muchie · secțiune transversală
            </div>
            <div className="bg-white border hairline">
              <svg viewBox="0 0 200 100" className="w-full h-auto block">
                <defs>
                  <pattern id="metal-tex" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="#e9eef6" />
                    <line x1="0" y1="3" x2="6" y2="3" stroke="#cfd6e3" strokeWidth="0.4" />
                  </pattern>
                </defs>

                <rect x={0} y={0} width={200} height={60} fill="url(#metal-tex)" />

                <motion.path
                  d={data.edgePath}
                  fill={data.edgeColor}
                  initial={false}
                  animate={{ d: data.edgePath, fill: data.edgeColor }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {data.zat !== "n/a" && data.zat !== "Zero" && (
                  <motion.line
                    x1={0}
                    y1={50}
                    x2={200}
                    y2={50}
                    stroke="#dc2626"
                    strokeOpacity={0.35}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                )}

                <line x1={5} y1={5} x2={5} y2={95} stroke="#9aa6b8" strokeWidth="0.4" />
                <text x={8} y={10} fontSize="5" fill="#9aa6b8" fontFamily="ui-monospace, monospace">
                  z
                </text>
                <line x1={5} y1={95} x2={195} y2={95} stroke="#9aa6b8" strokeWidth="0.4" />
                <text x={193} y={92} fontSize="5" fill="#9aa6b8" fontFamily="ui-monospace, monospace">
                  x
                </text>
              </svg>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <StatBox label="Bavură" value={data.bavura} />
              <StatBox label="Oxidare muchie" value={data.oxidare} />
              <StatBox label="ZAT (zonă termic)" value={data.zat} />
            </div>

            <div className="bg-white border hairline p-4 space-y-3">
              <ScoreBar label="Calitate finisaj" score={data.finishScore} color="#16a34a" />
              <ScoreBar label="Viteză execuție" score={data.speedScore} color="#3b82f6" />
              <ScoreBar label="Cost-eficiență" score={data.costScore} color="#f5851f" />
            </div>

            <div className="bg-white border-l-2 p-4" style={{ borderColor: verdictColor[data.b2cVerdict] }}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] mono uppercase tracking-widest text-ink-500">
                  Verdict pentru B2C
                </div>
                <div
                  className="text-xs serif font-bold uppercase tracking-wider px-2 py-0.5"
                  style={{ background: verdictColor[data.b2cVerdict], color: "white" }}
                >
                  {data.b2cVerdict}
                </div>
              </div>
              <p className="text-sm text-ink-700 leading-relaxed">{data.notes}</p>
            </div>
          </div>
        </div>

        <div className="bg-white border-l-2 p-4" style={{ borderColor: "#f5851f" }}>
          <div className="text-[10px] mono uppercase tracking-widest text-uzx-orange mb-1">
            Concluzia Geomar
          </div>
          <p className="text-sm text-ink-700 leading-relaxed">
            Pentru un atelier B2C unde clientul vede direct muchia produsului,
            laserul fiber este singura metodă care livrează verdict OPTIM pe
            toate cele trei materiale tipice. Diferența nu se vede pe factura
            de utilaj, se vede pe ce poți accepta să livrezi fără finisaj
            suplimentar.
          </p>
          <Link
            href="/contact?subject=Atelier%20confec%C8%9Bii%20metalice%20B2C%20%E2%80%94%20laser%20fiber%206%20kW&context=Studiu%20de%20caz%20Geomar"
            className="inline-flex items-center gap-2 text-xs text-uzx-orange hover:underline mt-3 font-medium"
          >
            Solicit dimensionare laser pentru atelierul meu
            <span>→</span>
          </Link>
        </div>
      </div>

      <div className="px-6 lg:px-8 py-4 border-t hairline bg-white">
        <p className="text-[11px] text-ink-500 leading-relaxed italic">
          Estimări orientative pentru muchii la grosimi tipice de 1–4 mm.
          Valorile concrete depind de parametrii reali ai utilajului, de
          calitatea materialului și de gazul de asistență folosit la metodele
          termice. Verdictul B2C reflectă experiența noastră cu atelierele de
          confecții metalice care livrează direct clienților finali.
        </p>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border hairline p-3">
      <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-1">
        {label}
      </div>
      <div className="serif text-base lg:text-lg num leading-tight text-ink-900">
        {value}
      </div>
    </div>
  );
}
