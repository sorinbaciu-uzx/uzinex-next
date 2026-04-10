"use client";

import { useEffect, useRef } from "react";

// Client/project locations (lat, lon) — approximate
const POINTS = [
  { lat: 47.16, lon: 27.58, label: "Iași" },        // HQ
  { lat: 44.43, lon: 26.1, label: "București" },
  { lat: 46.77, lon: 23.59, label: "Cluj" },
  { lat: 45.75, lon: 21.23, label: "Timișoara" },
  { lat: 44.32, lon: 23.8, label: "Craiova" },
  { lat: 45.65, lon: 25.6, label: "Brașov" },
  { lat: 47.05, lon: 21.93, label: "Orad" },
  { lat: 48.2, lon: 16.37, label: "Vienna" },
  { lat: 52.52, lon: 13.41, label: "Berlin" },
  { lat: 41.01, lon: 28.98, label: "Istanbul" },
  { lat: 47.0, lon: 28.85, label: "Chișinău" },
  { lat: 50.08, lon: 14.44, label: "Praha" },
];

// Convert lat/lon to 3D coords on unit sphere
function latLonTo3D(lat: number, lon: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return {
    x: -(r * Math.sin(phi) * Math.cos(theta)),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta),
  };
}

// Rotate point around Y axis
function rotateY(x: number, y: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos + z * sin, y, z: -x * sin + z * cos };
}

export function GlobeAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let w = 0;
    let h = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    const R = Math.min(w, h) * 0.38;
    const cx = w / 2;
    const cy = h / 2;

    let angle = 3.8; // start centered on Europe

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      angle += 0.001; // very slow rotation

      const r = Math.min(w, h) * 0.38;

      // Draw meridians
      ctx.strokeStyle = "rgba(30, 107, 184, 0.12)";
      ctx.lineWidth = 0.5;
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = latLonTo3D(lat, lon, r);
          const rp = rotateY(p.x, p.y, p.z, angle);
          if (rp.z < 0) continue; // back side
          const sx = cx + rp.x;
          const sy = cy - rp.y;
          if (lat === -90 || rp.z < 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Draw parallels
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 2) {
          const p = latLonTo3D(lat, lon, r);
          const rp = rotateY(p.x, p.y, p.z, angle);
          if (rp.z < 0) {
            started = false;
            continue;
          }
          const sx = cx + rp.x;
          const sy = cy - rp.y;
          if (!started) {
            ctx.moveTo(sx, sy);
            started = true;
          } else {
            ctx.lineTo(sx, sy);
          }
        }
        ctx.stroke();
      }

      // Globe outline
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(30, 107, 184, 0.2)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw connection lines between visible front-facing points
      const projected: { sx: number; sy: number; z: number; label: string }[] = [];
      for (const pt of POINTS) {
        const p = latLonTo3D(pt.lat, pt.lon, r);
        const rp = rotateY(p.x, p.y, p.z, angle);
        if (rp.z > -r * 0.1) {
          projected.push({
            sx: cx + rp.x,
            sy: cy - rp.y,
            z: rp.z,
            label: pt.label,
          });
        }
      }

      // Draw connections (only between close points)
      ctx.strokeStyle = "rgba(30, 107, 184, 0.08)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dist = Math.sqrt((a.sx - b.sx) ** 2 + (a.sy - b.sy) ** 2);
          if (dist < r * 1.2) {
            const alpha = Math.min(a.z, b.z) / r;
            if (alpha > 0) {
              ctx.globalAlpha = alpha * 0.3;
              ctx.beginPath();
              ctx.moveTo(a.sx, a.sy);
              ctx.lineTo(b.sx, b.sy);
              ctx.stroke();
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      // Draw points
      const time = Date.now() * 0.001;
      for (const pt of projected) {
        const alpha = Math.max(0, Math.min(1, (pt.z / r + 0.1) * 1.2));

        // Pulse ring
        const pulse = (Math.sin(time * 1.5 + pt.sx * 0.01) + 1) / 2;
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, 4 + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 133, 31, ${alpha * 0.2 * pulse})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Point
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 133, 31, ${alpha * 0.9})`;
        ctx.fill();

        // Label
        if (alpha > 0.4) {
          ctx.font = "9px 'IBM Plex Mono', monospace";
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.fillText(pt.label, pt.sx + 6, pt.sy + 3);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[280px] lg:min-h-full bg-[#060a10]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, rgba(6,10,16,0.7) 100%)",
        }}
      />
    </div>
  );
}
