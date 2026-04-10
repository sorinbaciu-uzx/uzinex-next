"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const CODE_LINES = [
  { text: "import { SCADAPanel } from", color: "text-uzx-orange" },
  { text: "  '@uzinex/scada-core';", color: "text-green-400" },
  { text: "", color: "" },
  { text: "const config = {", color: "text-white/80" },
  { text: "  protocol: 'OPC-UA',", color: "text-uzx-blue" },
  { text: "  traceability: true,", color: "text-uzx-blue" },
  { text: "  license: 'proprietar',", color: "text-uzx-orange" },
  { text: "  fees: 0,", color: "text-green-400" },
  { text: "};", color: "text-white/80" },
];

const BUILD_LINES = [
  { text: "$ uzx build --target=client", color: "text-white/60" },
  { text: "  Compilare SCADA panel... ✓", color: "text-green-400" },
  { text: "  Integrare HMI modules... ✓", color: "text-green-400" },
  { text: "  Trasabilitate lot-by-lot... ✓", color: "text-green-400" },
  { text: "✓ Deploy pe serverul client.", color: "text-uzx-orange" },
  { text: "  Fără licențe. Niciodată.", color: "text-uzx-orange" },
];

const TABS = ["scada.config.ts", "hmi-panel.tsx", "trace.sql"];
const CYCLE = 12;

export function SoftwareIDE() {
  const [codeVisible, setCodeVisible] = useState(0);
  const [buildVisible, setBuildVisible] = useState(0);
  const [phase, setPhase] = useState<"code" | "build">("code");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setCodeVisible(0);
    setBuildVisible(0);
    setPhase("code");

    // Type code
    CODE_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setCodeVisible(i + 1), i * 350));
    });
    // Switch to build
    timers.push(
      setTimeout(() => {
        setPhase("build");
        BUILD_LINES.forEach((_, i) => {
          timers.push(setTimeout(() => setBuildVisible(i + 1), i * 500));
        });
      }, CODE_LINES.length * 350 + 800)
    );
    // Restart
    timers.push(setTimeout(() => setCycle((c) => c + 1), CYCLE * 1000));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full aspect-[16/10] bg-[#0d1117] relative overflow-hidden border border-white/10">
      {/* Tab bar */}
      <div className="flex items-center gap-0 bg-[#161b22] border-b border-white/10">
        {TABS.map((tab, i) => (
          <div
            key={tab}
            className={`px-4 py-2 text-[9px] mono uppercase tracking-wider border-r border-white/5 ${
              i === 0
                ? "bg-[#0d1117] text-white/70"
                : "text-white/30"
            }`}
          >
            {tab}
          </div>
        ))}
        <div className="ml-auto pr-3 flex items-center gap-1.5">
          <div className="w-2 h-2 bg-red-500/70" />
          <div className="w-2 h-2 bg-yellow-500/70" />
          <div className="w-2 h-2 bg-green-500/70" />
        </div>
      </div>

      {/* Editor area */}
      <div className="flex h-[calc(100%-60px)]">
        {/* Line numbers */}
        <div className="w-8 bg-[#0d1117] border-r border-white/5 pt-3 text-right pr-2">
          {(phase === "code" ? CODE_LINES : BUILD_LINES)
            .slice(0, phase === "code" ? codeVisible : buildVisible)
            .map((_, i) => (
              <div
                key={`${cycle}-${phase}-${i}`}
                className="text-[9px] mono text-white/20 leading-[1.8]"
              >
                {i + 1}
              </div>
            ))}
        </div>

        {/* Code content */}
        <div className="flex-1 pt-3 pl-4 overflow-hidden">
          <AnimatePresence mode="popLayout">
            {phase === "code" &&
              CODE_LINES.slice(0, codeVisible).map((line, i) =>
                line.text === "" ? (
                  <div key={`${cycle}-c-${i}`} className="h-[1.8em]" />
                ) : (
                  <motion.div
                    key={`${cycle}-c-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-[11px] mono leading-[1.8] ${line.color}`}
                  >
                    {line.text}
                  </motion.div>
                )
              )}
            {phase === "build" &&
              BUILD_LINES.slice(0, buildVisible).map((line, i) => (
                <motion.div
                  key={`${cycle}-b-${i}`}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`text-[11px] mono leading-[1.8] ${line.color}`}
                >
                  {line.text}
                </motion.div>
              ))}
          </AnimatePresence>

          {/* Cursor */}
          {((phase === "code" && codeVisible < CODE_LINES.length) ||
            (phase === "build" && buildVisible < BUILD_LINES.length)) && (
            <motion.span
              className="inline-block w-1.5 h-4 bg-uzx-blue"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-[#1e6bb8] flex items-center justify-between px-3">
        <span className="text-[8px] mono text-white/80">UZX IDE · Cod proprietar</span>
        <span className="text-[8px] mono text-white/80">TypeScript · UTF-8</span>
      </div>
    </div>
  );
}
