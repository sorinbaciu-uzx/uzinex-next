import { notFound } from "next/navigation";
import { loadInsights } from "@/lib/newsroom/data";
import { extractInsightView } from "@/lib/newsroom/extract";
import { Sparkline, MiniBar } from "@/components/newsroom/Sparkline";

// Minimal embed page — no header/footer, iframe-friendly, with backlink credit.
// Loaded by journalists' iframe embeds in their articles.

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export default async function EmbedInsightPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const insight = loadInsights().find((i) => i.id === Number(id));
  if (!insight) notFound();

  const view = extractInsightView(insight);

  return (
    <html lang="ro">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{insight.title} — UZINEX Newsroom embed</title>
        <link rel="stylesheet" href="/_next/static/css/app/layout.css" />
        <style>{`
          html, body { margin: 0; padding: 0; background: #fff; font-family: var(--font-inter), system-ui, sans-serif; }
          .embed-card { padding: 16px; border: 1px solid #eeeef0; border-radius: 8px; height: calc(100vh - 4px); display: flex; flex-direction: column; box-sizing: border-box; }
          .embed-title { font-family: 'Space Grotesk', system-ui, sans-serif; font-weight: 500; letter-spacing: -0.02em; font-size: 16px; line-height: 1.3; color: #0e0e12; margin: 0 0 4px; }
          .embed-meta { font-size: 11px; color: #5f5f6b; margin-bottom: 10px; }
          .embed-big { font-family: 'Space Grotesk', system-ui, sans-serif; font-weight: 500; letter-spacing: -0.02em; font-size: 28px; color: #f5851f; line-height: 1; }
          .embed-big-label { font-size: 10px; color: #5f5f6b; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }
          .embed-chart { flex: 1; min-height: 100px; margin-top: 10px; }
          .embed-credit { margin-top: 10px; padding-top: 8px; border-top: 1px solid #eeeef0; font-size: 10px; color: #5f5f6b; display: flex; justify-content: space-between; align-items: center; }
          .embed-credit a { color: #1e6bb8; text-decoration: none; }
          .embed-credit a:hover { color: #f5851f; }
        `}</style>
      </head>
      <body>
        <div className="embed-card">
          <h1 className="embed-title">{insight.title}</h1>
          <div className="embed-meta">
            {insight.sources.join(", ")} · {new Date(insight.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" })}
          </div>
          <div>
            <div className="embed-big">{view.bigNumber}</div>
            <div className="embed-big-label">{view.bigNumberLabel}</div>
          </div>
          <div className="embed-chart">
            {view.chartType === "line" && view.chartData.length > 1 && (
              <Sparkline data={view.chartData as Array<{ date: string; value: number }>} height={120} />
            )}
            {view.chartType === "bar" && view.chartData.length > 1 && (
              <MiniBar data={view.chartData as Array<{ label: string; value: number }>} height={120} />
            )}
          </div>
          <div className="embed-credit">
            <span>Sursă: <a href="https://uzinex.ro/newsroom" target="_blank" rel="noopener">UZINEX Newsroom</a></span>
            <a href={`https://uzinex.ro/newsroom/anomalii`} target="_blank" rel="noopener">vezi feed-ul complet →</a>
          </div>
        </div>
      </body>
    </html>
  );
}
