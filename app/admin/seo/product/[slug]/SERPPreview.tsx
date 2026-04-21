"use client";

/**
 * Preview vizual al cum va apărea produsul în rezultatele Google.
 * Imită exact stilul SERP-ului Google (desktop).
 */
export function SERPPreview({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  // Google truncă title la ~60 caractere, description la ~155-160
  const truncatedTitle =
    title.length > 60 ? title.slice(0, 57).trimEnd() + "..." : title;
  const truncatedDesc =
    description.length > 160
      ? description.slice(0, 157).trimEnd() + "..."
      : description;

  const domain = url.split("/")[0];
  const path = url.split("/").slice(1).join(" › ");

  return (
    <div className="bg-white border hairline p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
          SERP preview
        </div>
        <div className="text-[10px] text-ink-400 font-mono">
          cum apare în Google
        </div>
      </div>
      <div
        style={{
          fontFamily:
            "arial, sans-serif",
          background: "white",
          padding: "12px 16px",
          maxWidth: "600px",
          border: "1px solid #f1f1f1",
        }}
      >
        {/* Favicon + URL */}
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
            style={{ background: "#f5851f" }}
          >
            U
          </div>
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontSize: "12px",
                color: "#5f6368",
                lineHeight: "1.4",
              }}
            >
              {domain}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#5f6368",
                lineHeight: "1.4",
              }}
            >
              {path && (
                <>
                  https://{domain} › {path}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "20px",
            lineHeight: "1.3",
            color: "#1a0dab",
            fontWeight: 400,
            marginBottom: "3px",
            marginTop: "2px",
          }}
        >
          {truncatedTitle || (
            <span style={{ color: "#9ca3af", fontStyle: "italic" }}>
              (titlul va apărea aici)
            </span>
          )}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "14px",
            lineHeight: "1.58",
            color: "#4d5156",
          }}
        >
          {truncatedDesc || (
            <span style={{ color: "#9ca3af", fontStyle: "italic" }}>
              (descrierea va apărea aici)
            </span>
          )}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex items-center gap-4 mt-3 text-[10px] text-ink-500 font-mono">
        {title.length > 60 && (
          <span className="text-orange-600">
            ⚠ Title se va trunchia ({title.length} caractere)
          </span>
        )}
        {description.length > 160 && (
          <span className="text-orange-600">
            ⚠ Description se va trunchia ({description.length})
          </span>
        )}
      </div>
    </div>
  );
}
