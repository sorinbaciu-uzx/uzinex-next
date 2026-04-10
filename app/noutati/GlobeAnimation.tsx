"use client";

import { useEffect, useRef } from "react";

/* ─── CONFIG ─── */
const SWEEP_SPEED = 0.8;          // rotations per second
const UNITS = [
  { code: "ALPHA-01", r: 0.55, angle: 45,  status: "ACTIVE", type: "PV-MOB" },
  { code: "BRAVO-03", r: 0.72, angle: 160, status: "ACTIVE", type: "PV-FIX" },
  { code: "CHARLIE-07", r: 0.38, angle: 230, status: "STANDBY", type: "BAT-STO" },
  { code: "DELTA-12", r: 0.85, angle: 310, status: "ACTIVE", type: "PV-MOB" },
  { code: "ECHO-05", r: 0.62, angle: 90,  status: "DEPLOY", type: "PV-MOB" },
];

const RING_COUNT = 5;
const GRID_LINES = 12; // radial grid lines

export function GlobeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0, h = 0, cx = 0, cy = 0, maxR = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
      maxR = Math.min(w, h) * 0.42;
    }
    resize();
    window.addEventListener("resize", resize);

    // Pre-calculate blip history (trail positions)
    const blipTrails: { x: number; y: number; age: number }[][] = UNITS.map(() => []);

    function draw(t: number) {
      if (!ctx) return;
      const time = t * 0.001;
      ctx.clearRect(0, 0, w, h);

      // ── BACKGROUND GLOW ──
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 1.3);
      bgGrad.addColorStop(0, "rgba(30, 107, 184, 0.06)");
      bgGrad.addColorStop(0.5, "rgba(8, 37, 69, 0.03)");
      bgGrad.addColorStop(1, "transparent");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── RANGE RINGS ──
      for (let i = 1; i <= RING_COUNT; i++) {
        const r = (maxR / RING_COUNT) * i;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30, 107, 184, ${i === RING_COUNT ? 0.25 : 0.08})`;
        ctx.lineWidth = i === RING_COUNT ? 1.5 : 0.5;
        ctx.stroke();

        // Range label
        if (i % 2 === 0) {
          ctx.font = "8px 'IBM Plex Mono', monospace";
          ctx.fillStyle = "rgba(30, 107, 184, 0.25)";
          ctx.fillText(`${i * 10}km`, cx + r + 4, cy + 3);
        }
      }

      // ── RADIAL GRID LINES ──
      for (let i = 0; i < GRID_LINES; i++) {
        const a = (i / GRID_LINES) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.strokeStyle = "rgba(30, 107, 184, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Bearing labels at outer edge
        const deg = Math.round((i / GRID_LINES) * 360);
        const lx = cx + Math.cos(a) * (maxR + 12);
        const ly = cy + Math.sin(a) * (maxR + 12);
        ctx.font = "7px 'IBM Plex Mono', monospace";
        ctx.fillStyle = "rgba(30, 107, 184, 0.2)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${String(deg).padStart(3, "0")}°`, lx, ly);
      }
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";

      // ── CROSSHAIR ──
      ctx.beginPath();
      ctx.moveTo(cx - 8, cy); ctx.lineTo(cx + 8, cy);
      ctx.moveTo(cx, cy - 8); ctx.lineTo(cx, cy + 8);
      ctx.strokeStyle = "rgba(30, 107, 184, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── SWEEP LINE ──
      const sweepAngle = (time * SWEEP_SPEED * Math.PI * 2) % (Math.PI * 2);

      // Sweep trail (fading arc)
      const trailArc = Math.PI * 0.4;
      const grad = ctx.createConicGradient(sweepAngle - trailArc, cx, cy);
      // Normalize for conic gradient (0-1 = 0-360deg)
      grad.addColorStop(0, "rgba(30, 107, 184, 0)");
      grad.addColorStop(0.7, "rgba(30, 107, 184, 0.04)");
      grad.addColorStop(1, "rgba(30, 107, 184, 0.12)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, sweepAngle - trailArc, sweepAngle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Sweep line itself
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * maxR,
        cy + Math.sin(sweepAngle) * maxR
      );
      ctx.strokeStyle = "rgba(30, 107, 184, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── UNIT BLIPS ──
      for (let ui = 0; ui < UNITS.length; ui++) {
        const u = UNITS[ui];
        const unitAngle = (u.angle * Math.PI) / 180;
        const ux = cx + Math.cos(unitAngle) * u.r * maxR;
        const uy = cy + Math.sin(unitAngle) * u.r * maxR;

        // Calculate "freshness" — how recently the sweep passed over this unit
        let angleDiff = sweepAngle - unitAngle;
        while (angleDiff < 0) angleDiff += Math.PI * 2;
        while (angleDiff > Math.PI * 2) angleDiff -= Math.PI * 2;
        const freshness = Math.max(0, 1 - angleDiff / (Math.PI * 2));
        const alpha = 0.15 + freshness * 0.85;

        // Add to trail
        if (freshness > 0.95) {
          blipTrails[ui].push({ x: ux, y: uy, age: 0 });
          if (blipTrails[ui].length > 6) blipTrails[ui].shift();
        }

        // Draw trail (afterglow)
        for (const trail of blipTrails[ui]) {
          trail.age += 0.016;
          const ta = Math.max(0, 1 - trail.age * 0.8);
          if (ta > 0) {
            ctx.beginPath();
            ctx.arc(trail.x, trail.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 133, 31, ${ta * 0.3})`;
            ctx.fill();
          }
        }

        // Blip outer pulse
        const pulse = (Math.sin(time * 3 + ui) + 1) / 2;
        ctx.beginPath();
        ctx.arc(ux, uy, 6 + pulse * 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 133, 31, ${alpha * 0.2 * pulse})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Blip core
        ctx.beginPath();
        ctx.arc(ux, uy, 3, 0, Math.PI * 2);
        ctx.fillStyle = u.status === "ACTIVE"
          ? `rgba(245, 133, 31, ${alpha})`
          : u.status === "DEPLOY"
          ? `rgba(74, 222, 128, ${alpha})`
          : `rgba(100, 160, 220, ${alpha * 0.7})`;
        ctx.fill();

        // Blip diamond marker (military style)
        ctx.save();
        ctx.translate(ux, uy);
        ctx.rotate(Math.PI / 4);
        ctx.strokeStyle = `rgba(245, 133, 31, ${alpha * 0.6})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(-5, -5, 10, 10);
        ctx.restore();

        // Unit label
        if (alpha > 0.3) {
          const labelX = ux + 12;
          const labelY = uy - 6;

          // Label background
          ctx.fillStyle = `rgba(6, 10, 16, ${alpha * 0.85})`;
          const labelW = u.code.length * 6.5 + 16;
          ctx.fillRect(labelX - 2, labelY - 9, labelW, 28);
          ctx.strokeStyle = `rgba(30, 107, 184, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(labelX - 2, labelY - 9, labelW, 28);

          // Code
          ctx.font = "bold 9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
          ctx.fillText(u.code, labelX + 2, labelY + 2);

          // Type + status
          ctx.font = "7px 'IBM Plex Mono', monospace";
          ctx.fillStyle = u.status === "ACTIVE"
            ? `rgba(245, 133, 31, ${alpha * 0.7})`
            : u.status === "DEPLOY"
            ? `rgba(74, 222, 128, ${alpha * 0.7})`
            : `rgba(100, 160, 220, ${alpha * 0.5})`;
          ctx.fillText(`${u.type} · ${u.status}`, labelX + 2, labelY + 14);
        }
      }

      // ── HUD CORNERS ──
      const m = 12;
      const cs = 20;
      ctx.strokeStyle = "rgba(30, 107, 184, 0.35)";
      ctx.lineWidth = 1;
      // top-left
      ctx.beginPath(); ctx.moveTo(m, m + cs); ctx.lineTo(m, m); ctx.lineTo(m + cs, m); ctx.stroke();
      // top-right
      ctx.beginPath(); ctx.moveTo(w - m - cs, m); ctx.lineTo(w - m, m); ctx.lineTo(w - m, m + cs); ctx.stroke();
      // bottom-right
      ctx.beginPath(); ctx.moveTo(w - m, h - m - cs); ctx.lineTo(w - m, h - m); ctx.lineTo(w - m - cs, h - m); ctx.stroke();
      // bottom-left
      ctx.beginPath(); ctx.moveTo(m + cs, h - m); ctx.lineTo(m, h - m); ctx.lineTo(m, h - m - cs); ctx.stroke();

      // ── TOP-LEFT DATA ──
      ctx.font = "8px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(30, 107, 184, 0.5)";
      ctx.fillText("CLASSIFICATION: NATO RESTRICTED", m + 6, m + 14);
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillText("TACTICAL ENERGY GRID · SECTOR 7", m + 6, m + 26);

      // ── TOP-RIGHT: TIMESTAMP ──
      const now = new Date();
      const dtg = `${String(now.getUTCDate()).padStart(2,"0")}${String(now.getUTCHours()).padStart(2,"0")}${String(now.getUTCMinutes()).padStart(2,"0")}Z${["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"][now.getUTCMonth()]}${String(now.getUTCFullYear()).slice(2)}`;
      ctx.font = "8px 'IBM Plex Mono', monospace";
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(30, 107, 184, 0.5)";
      ctx.fillText(`DTG: ${dtg}`, w - m - 6, m + 14);
      ctx.fillStyle = "rgba(74, 222, 128, 0.5)";
      ctx.fillText("● GRID SYNC: NOMINAL", w - m - 6, m + 26);
      ctx.textAlign = "start";

      // ── BOTTOM-LEFT: POWER STATUS ──
      const kwGen = 12.4 + Math.sin(time * 0.7) * 1.2;
      const soc = 94 + Math.sin(time * 0.3) * 3;
      const kwLoad = 3.2 + Math.sin(time * 1.1) * 0.5;
      ctx.font = "8px 'IBM Plex Mono', monospace";
      ctx.fillStyle = "rgba(245, 133, 31, 0.6)";
      ctx.fillText(`GEN: ${kwGen.toFixed(1)} kW`, m + 6, h - m - 32);
      ctx.fillStyle = "rgba(74, 222, 128, 0.5)";
      ctx.fillText(`SOC: ${soc.toFixed(0)}%`, m + 6, h - m - 20);
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.fillText(`LOAD: ${kwLoad.toFixed(1)} kW`, m + 6, h - m - 8);

      // ── BOTTOM-RIGHT: UNIT COUNT ──
      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
      ctx.fillText(`UNITS TRACKED: ${UNITS.length}`, w - m - 6, h - m - 20);
      ctx.fillStyle = "rgba(30, 107, 184, 0.4)";
      ctx.fillText("AES-256 · ENCRYPTED", w - m - 6, h - m - 8);
      ctx.textAlign = "start";

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[280px] lg:min-h-full" style={{ background: "#060a10" }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
