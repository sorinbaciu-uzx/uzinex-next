import { notFound } from "next/navigation";
import { loadInsights } from "@/lib/newsroom/data";
import { extractInsightView } from "@/lib/newsroom/extract";
import { Sparkline, MiniBar } from "@/components/newsroom/Sparkline";

// Minimal embed page — designed for iframe usage. No header/footer; only the
// card content + UZINEX backlink credit. The root layout still wraps html/body
// (Next.js App Router requires that), but we hide all chrome via the card-only
// markup and the body bg-white styling is already covered by globals.
//
// The /embed prefix is not in the sitemap and not crawled — see app/robots.ts.

export const revalidate = 3600;

export default async function EmbedInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = loadInsights().find((i) => i.id === Number(id));
  if (!insight) notFound();

  const view = extractInsightView(insight);
  const dateStr = new Date(insight.createdAt).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="embed-card"
      style={{
        padding: 16,
        border: "1px solid #eeeef0",
        borderRadius: 8,
        background: "#fff",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          fontSize: 16,
          lineHeight: 1.3,
          color: "#0e0e12",
          margin: "0 0 4px",
        }}
      >
        {insight.title}
      </h1>
      <div style={{ fontSize: 11, color: "#5f5f6b", marginBottom: 10 }}>
        {insight.sources.join(", ")} · {dateStr}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-space-grotesk), 'Space Grotesk', system-ui, sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.02em",
            fontSize: 28,
            color: "#f5851f",
            lineHeight: 1,
          }}
        >
          {view.bigNumber}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#5f5f6b",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginTop: 4,
          }}
        >
          {view.bigNumberLabel}
        </div>
      </div>
      <div style={{ minHeight: 100, marginTop: 10 }}>
        {view.chartType === "line" && view.chartData.length > 1 && (
          <Sparkline
            data={view.chartData as Array<{ date: string; value: number }>}
            height={120}
          />
        )}
        {view.chartType === "bar" && view.chartData.length > 1 && (
          <MiniBar
            data={view.chartData as Array<{ label: string; value: number }>}
            height={120}
          />
        )}
      </div>
      <div
        style={{
          marginTop: 10,
          paddingTop: 8,
          borderTop: "1px solid #eeeef0",
          fontSize: 10,
          color: "#5f5f6b",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          Sursă:{" "}
          <a
            href="https://uzinex.ro/newsroom"
            target="_blank"
            rel="noopener"
            style={{ color: "#1e6bb8", textDecoration: "none" }}
          >
            UZINEX Newsroom
          </a>
        </span>
        <a
          href="https://uzinex.ro/newsroom/anomalii"
          target="_blank"
          rel="noopener"
          style={{ color: "#1e6bb8", textDecoration: "none" }}
        >
          vezi feed-ul complet →
        </a>
      </div>
    </div>
  );
}
