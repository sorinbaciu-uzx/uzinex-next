"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const SOURCES = ["CNC-01", "Presă-02", "Laser-03", "Robot-04", "Conv-05"];
const RAW_CHARS = "0x4F 9A 7C FF 02 E3 B1 48 6D A0 F2 1B C8 3E 7F 55".split(" ");
const TABLE_ROWS = [
  { ts: "14:32:01", machine: "CNC-01", oee: "87.4%", status: "OK" },
  { ts: "14:32:01", machine: "Presă-02", oee: "91.2%", status: "OK" },
  { ts: "14:32:02", machine: "Laser-03", oee: "78.6%", status: "⚠" },
  { ts: "14:32:02", machine: "Robot-04", oee: "94.1%", status: "OK" },
  { ts: "14:32:03", machine: "Conv-05", oee: "82.3%", status: "OK" },
];

export function EdgeWaterfall() {
  const [visibleRows, setVisibleRows] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setVisibleRows(0);
    TABLE_ROWS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleRows(i + 1), 3000 + i * 600));
    });
    timers.push(setTimeout(() => setCycle((c) => c + 1), 9000));
    return () => timers.forEach(clearTimeout);
  }, [cycle]);

  return (
    <div className="w-full aspect-[16/10] bg-[#0a0e14] relative overflow-hidden">
      {/* RAW DATA — falling from sources */}
      <div className="absolute top-0 left-0 right-0 h-[45%] flex gap-0 overflow-hidden">
        {SOURCES.map((src, col) => (
          <div
            key={src}
            className="flex-1 relative overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="text-[7px] mono text-white/30 text-center py-1 uppercase tracking-wider">
              {src}
            </div>
            {Array.from({ length: 8 }).map((_, row) => (
              <motion.div
                key={`${cycle}-${col}-${row}`}
                className="text-[8px] mono text-center leading-tight"
                style={{ color: "rgba(30,107,184,0.5)" }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: [0, 0.7, 0.3, 0], y: [-10, 0, 10, 20] }}
                transition={{
                  duration: 2,
                  delay: row * 0.25 + col * 0.1,
                  repeat: 2,
                  repeatDelay: 0.5,
                }}
              >
                {RAW_CHARS[(col * 3 + row) % RAW_CHARS.length]}
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* CONVERSION LINE — Gateway */}
      <div className="absolute top-[43%] left-0 right-0 z-10">
        <div className="h-px bg-uzx-orange/40 relative">
          <motion.div
            className="absolute inset-0 h-px bg-uzx-orange"
            animate={{ scaleX: [0, 1], transformOrigin: "left" }}
            transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 7 }}
          />
        </div>
        <div className="flex items-center justify-center -mt-3">
          <div className="bg-[#0a0e14] px-3 py-1 border border-uzx-orange/30 flex items-center gap-2">
            <motion.div
              className="w-2.5 h-2.5 border border-uzx-orange bg-uzx-orange/20"
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <span className="text-[9px] mono text-uzx-orange uppercase tracking-widest font-bold">
              Edge Gateway
            </span>
          </div>
        </div>
      </div>

      {/* STRUCTURED TABLE — appears below */}
      <div className="absolute bottom-0 left-0 right-0 h-[48%] px-4 pb-3 pt-2">
        {/* Header */}
        <div className="grid grid-cols-4 gap-1 mb-1">
          {["Timestamp", "Utilaj", "OEE", "Status"].map((h) => (
            <div key={h} className="text-[7px] mono text-white/25 uppercase tracking-wider">
              {h}
            </div>
          ))}
        </div>
        {/* Rows */}
        <div className="space-y-0.5">
          {TABLE_ROWS.slice(0, visibleRows).map((row, i) => (
            <motion.div
              key={`${cycle}-${i}`}
              className="grid grid-cols-4 gap-1 py-1 border-b border-white/5"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-[9px] mono text-white/50">{row.ts}</span>
              <span className="text-[9px] mono text-white/70">{row.machine}</span>
              <span className={`text-[9px] mono font-bold ${row.status === "⚠" ? "text-uzx-orange" : "text-green-400"}`}>
                {row.oee}
              </span>
              <span className={`text-[9px] mono ${row.status === "⚠" ? "text-uzx-orange" : "text-green-400"}`}>
                {row.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Output label */}
        <motion.div
          className="mt-2 text-[8px] mono text-white/30 uppercase tracking-wider text-right"
          animate={{ opacity: [0, 0, 1, 1, 0] }}
          transition={{ duration: 9, repeat: Infinity, times: [0, 0.5, 0.6, 0.85, 0.95] }}
        >
          → JSON/REST → ERP client
        </motion.div>
      </div>
    </div>
  );
}
