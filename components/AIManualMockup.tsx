"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Conversation = {
  userQuestion: string;
  aiHeader: string;
  aiText: string;
  aiSteps: string[];
  inputType: "text" | "voice" | "image";
};

const CONVERSATIONS: Conversation[] = [
  {
    userQuestion: "Cum resetez parametrii pentru tăiere inox 5 mm pe UZX-Laser F12?",
    aiHeader: "UZX AI · MANUAL TEHNIC",
    aiText:
      "Pentru tăiere inox 5 mm, setează puterea laser la 2400 W, presiune azot 18 bar, viteza 2.8 m/min. Urmează acești pași:",
    aiSteps: [
      "→ Meniu → Parametri material → Stainless 5mm",
      "→ Încarcă preset UZX-INX-05",
      "→ Verifică focus la +1.2 mm",
      "→ Test cut pe probă înainte producție",
    ],
    inputType: "text",
  },
  {
    userQuestion: "🎙️ Care e procedura de oprire de urgență pentru robotul de paletizare?",
    aiHeader: "UZX AI · RĂSPUNS VOCAL",
    aiText:
      "Procedura de oprire de urgență este disponibilă atât manual, cât și prin comandă vocală. Pașii:",
    aiSteps: [
      "→ Apasă butonul roșu E-STOP de pe panou",
      "→ Sau spune comanda vocală: UZX, oprire urgență",
      "→ Așteaptă confirmarea sonoră (3 bip-uri)",
      "→ Verifică status pe HMI înainte repornire",
    ],
    inputType: "voice",
  },
  {
    userQuestion: "📷 Imagine atașată: ce piesă este și unde se montează?",
    aiHeader: "UZX AI · ANALIZĂ IMAGINE",
    aiText:
      "Am identificat piesa: cuplaj rapid hidraulic SKU UZX-CR-3408. Se montează între cilindrul principal și brațul telescopic.",
    aiSteps: [
      "→ Tipul: Cuplaj M22 × 1.5 mm filetat",
      "→ Stoc: Disponibil în depozit Iași",
      "→ Compatibilitate: 12 modele excavator",
      "→ Comandă piesă din UZX Portal →",
    ],
    inputType: "image",
  },
];

function useTypewriter(text: string, speed = 20, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) {
      setOut("");
      return;
    }
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

export function AIManualMockup() {
  const [convIdx, setConvIdx] = useState(0);
  const [phase, setPhase] = useState<"typing-q" | "thinking" | "typing-a" | "showing-steps" | "pause">(
    "typing-q"
  );
  const [visibleSteps, setVisibleSteps] = useState(0);

  const conv = CONVERSATIONS[convIdx];
  const userText = useTypewriter(conv.userQuestion, 28, phase === "typing-q");
  const aiText = useTypewriter(conv.aiText, 18, phase === "typing-a" || phase === "showing-steps" || phase === "pause");

  // Phase transitions
  useEffect(() => {
    if (phase === "typing-q") {
      const t = setTimeout(() => setPhase("thinking"), conv.userQuestion.length * 28 + 400);
      return () => clearTimeout(t);
    }
    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("typing-a"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "typing-a") {
      const t = setTimeout(() => setPhase("showing-steps"), conv.aiText.length * 18 + 300);
      return () => clearTimeout(t);
    }
    if (phase === "showing-steps") {
      if (visibleSteps < conv.aiSteps.length) {
        const t = setTimeout(() => setVisibleSteps((s) => s + 1), 350);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 2500);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      const t = setTimeout(() => {
        setVisibleSteps(0);
        setConvIdx((i) => (i + 1) % CONVERSATIONS.length);
        setPhase("typing-q");
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase, conv, visibleSteps]);

  const inputPlaceholder = {
    text: "Pune o întrebare tehnică…",
    voice: "🎙️ Înregistrare audio activă…",
    image: "📷 Atașează o imagine…",
  }[conv.inputType];

  return (
    <div className="lg:col-span-5">
      <div
        className="relative border hairline p-6 lg:p-8 min-h-[520px]"
        style={{ background: "linear-gradient(180deg, #0a1a2e 0%, #082545 100%)" }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-uzx-orange"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="ml-3 text-[10px] mono uppercase tracking-widest text-white/50">
            UZX Manual Assistant
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-green-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
            />
            <span className="text-[9px] mono text-white/40 uppercase">live</span>
          </div>
        </div>

        {/* Chat */}
        <div className="space-y-5 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`q-${convIdx}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[10px] mono text-uzx-orange mb-2">OPERATOR</div>
              <div className="text-sm text-white/90 leading-relaxed min-h-[40px]">
                {userText}
                {phase === "typing-q" && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-1.5 h-4 bg-uzx-orange ml-0.5 -mb-0.5 align-middle"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {(phase === "thinking" || phase === "typing-a" || phase === "showing-steps" || phase === "pause") && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-white/10 pt-5"
            >
              <div className="text-[10px] mono text-uzx-blue mb-2 flex items-center gap-2">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-uzx-blue"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                {conv.aiHeader}
              </div>

              {phase === "thinking" ? (
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                  <span className="ml-2 text-[11px] mono text-white/40">analizează manualul…</span>
                </div>
              ) : (
                <>
                  <div className="text-sm text-white/80 leading-relaxed">{aiText}</div>
                  <div className="mt-3 space-y-1.5 text-[11px] mono text-white/60">
                    {conv.aiSteps.slice(0, visibleSteps).map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {step}
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
          <div className="flex-1 h-9 border border-white/15 px-3 flex items-center text-[11px] mono text-white/40">
            {inputPlaceholder}
          </div>
          <motion.div
            className="w-9 h-9 bg-uzx-orange flex items-center justify-center text-white shrink-0"
            whileHover={{ scale: 1.05 }}
          >
            →
          </motion.div>
        </div>

        {/* Input mode selector */}
        <div className="mt-4 flex items-center gap-2">
          {[
            { type: "text", label: "TEXT", icon: "Aa" },
            { type: "voice", label: "VOCE", icon: "🎙" },
            { type: "image", label: "IMAGINE", icon: "📷" },
          ].map((m) => {
            const active = conv.inputType === m.type;
            return (
              <div
                key={m.type}
                className={`px-2.5 py-1 text-[9px] mono uppercase tracking-widest transition border ${
                  active
                    ? "border-uzx-orange text-uzx-orange bg-uzx-orange/10"
                    : "border-white/15 text-white/40"
                }`}
              >
                <span className="mr-1">{m.icon}</span>
                {m.label}
              </div>
            );
          })}
        </div>

        {/* Decorative corner */}
        <div
          className="absolute -top-px -right-px w-16 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(245,133,31,0.4) 50%)",
          }}
        />
      </div>
      <div className="text-center mt-4 text-[10px] mono uppercase tracking-widest text-ink-400">
        — Demo live · Text · Voce · Imagine
      </div>
    </div>
  );
}
