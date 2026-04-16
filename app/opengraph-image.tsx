import { ImageResponse } from "next/og";

/**
 * Default Open Graph image for uzinex.ro
 *
 * Next.js generează automat un PNG 1200×630 din acest JSX la build time.
 * Se servește pe `/opengraph-image` și e folosit implicit de OpenGraph pe
 * orice pagină care nu-și definește proprie imagine OG.
 *
 * Twitter Cards folosesc același fișier (Next.js le mapează automat).
 */

export const alt =
  "Uzinex — Tehnologie industrială performantă și servicii superioare";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: "#fff",
          background:
            "radial-gradient(ellipse 80% 90% at 75% 50%, #1a4a7a 0%, #0e3866 30%, #082545 60%, #051a33 100%)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top bar — brand + eyebrow */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "32px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fff",
            }}
          >
            <span>UZINE</span>
            <span style={{ color: "#f5851f" }}>X</span>
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginLeft: "12px",
            }}
          >
            · Integrator industrial · Iași
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 500,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#fff",
              maxWidth: "900px",
            }}
          >
            Tehnologie industrială
          </div>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#f5851f",
              maxWidth: "900px",
            }}
          >
            performantă & servicii superioare.
          </div>
        </div>

        {/* Footer — stats bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "48px" }}>
            <Stat value="180+" label="ECHIPAMENTE" />
            <Stat value="24H" label="INTERVENȚIE" />
            <Stat value="60 LUNI" label="GARANȚIE" />
          </div>
          <div
            style={{
              fontSize: "16px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            uzinex.ro
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          fontSize: "36px",
          fontWeight: 600,
          color: "#fff",
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "12px",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.15em",
          marginTop: "4px",
        }}
      >
        {label}
      </div>
    </div>
  );
}
