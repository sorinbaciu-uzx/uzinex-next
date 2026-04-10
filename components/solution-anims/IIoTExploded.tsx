"use client";

import { motion } from "motion/react";

const PARTS = [
  { label: "Modul radio LoRa", x: -90, y: -30, color: "#1e6bb8" },
  { label: "Senzor temperatură", x: 90, y: -30, color: "#f5851f" },
  { label: "Accelerometru 3 axe", x: -90, y: 30, color: "#155290" },
  { label: "Baterie Li 5 ani", x: 90, y: 30, color: "#082545" },
];

export function IIoTExploded() {
  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden flex items-center justify-center">
      {/* grid bg */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,107,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(30,107,184,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* sensor body — assembled then explodes then reassembles */}
      <div className="relative w-48 h-32">
        {/* Main body */}
        <motion.div
          className="absolute inset-0 border-2 border-white/30 flex items-center justify-center"
          style={{ background: "rgba(30,107,184,0.15)" }}
          animate={{ opacity: [1, 0.3, 0.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.7, 0.9] }}
        >
          <motion.div
            className="text-white/70 mono text-[10px] uppercase tracking-widest"
            animate={{ opacity: [1, 0, 0, 1] }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.15, 0.75, 0.9] }}
          >
            UZX-IIoT Sensor
          </motion.div>
        </motion.div>

        {/* Antenna */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-8 bg-white/40"
          animate={{ scaleY: [1, 0, 0, 1] }}
          transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.7, 0.9] }}
        >
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 border border-white/40"
            style={{ borderRadius: "50%" }}
            animate={{
              scale: [1, 0, 0, 1],
              boxShadow: [
                "0 0 0 0 rgba(30,107,184,0)",
                "0 0 0 0 rgba(30,107,184,0)",
                "0 0 0 0 rgba(30,107,184,0)",
                "0 0 8px 4px rgba(30,107,184,0.5)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, times: [0, 0.2, 0.7, 0.95] }}
          />
        </motion.div>

        {/* Exploded parts */}
        {PARTS.map((part, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{
              x: [0, part.x, part.x, 0],
              y: [0, part.y, part.y, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              times: [0.15, 0.3, 0.65, 0.8],
              ease: "easeInOut",
            }}
          >
            <div
              className="px-3 py-2 border text-center whitespace-nowrap"
              style={{
                borderColor: part.color + "80",
                background: part.color + "20",
              }}
            >
              <div className="w-4 h-4 mx-auto mb-1.5 border" style={{ borderColor: part.color, background: part.color + "40" }} />
              <div className="text-[9px] mono text-white/80 uppercase tracking-wider">
                {part.label}
              </div>
            </div>
            {/* Connection line to center */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-px bg-white/20 origin-center"
              style={{
                height: Math.sqrt(part.x ** 2 + part.y ** 2) * 0.6,
                transform: `rotate(${Math.atan2(-part.y, -part.x) * (180 / Math.PI) + 90}deg)`,
              }}
              animate={{ opacity: [0, 0.5, 0.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, times: [0.2, 0.35, 0.6, 0.75] }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
