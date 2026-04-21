"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { analyzeSEO } from "@/lib/seo/analyzer";
import type { SEOAnalysis } from "@/lib/seo/types";
import type { Product } from "@/app/magazin/products";
import type { SEOOverride } from "@/lib/seo/product-seo";
import { SEOScorePanel } from "./SEOScorePanel";
import { SERPPreview } from "./SERPPreview";
import { HistoryPanel } from "./HistoryPanel";
import { AIRewriteModal } from "./AIRewriteModal";
import { CompetitorModal } from "./CompetitorModal";

export function SEOEditor({
  product,
  override,
  initialAnalysis,
  keywordSuggestions,
}: {
  product: Product;
  override: SEOOverride | null;
  initialAnalysis: SEOAnalysis;
  keywordSuggestions: string[];
}) {
  const router = useRouter();
  const [focusKeyword, setFocusKeyword] = useState(product.focusKeyword || "");
  const [seoTitle, setSeoTitle] = useState(product.seoTitle || product.name);
  const [seoDescription, setSeoDescription] = useState(
    product.seoDescription || product.shortSpec
  );
  const [description, setDescription] = useState(product.description);

  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [showAIModal, setShowAIModal] = useState(false);
  const [showCompetitorModal, setShowCompetitorModal] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);

  // Live analysis — re-run when any SEO field changes
  const analysis = useMemo<SEOAnalysis>(() => {
    return analyzeSEO({
      focusKeyword,
      seoTitle,
      seoDescription,
      slug: product.slug,
      content: description,
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      image: product.image,
      sku: product.sku,
      hasSchema: true,
      hasCanonical: true,
    });
  }, [
    focusKeyword,
    seoTitle,
    seoDescription,
    description,
    product.slug,
    product.name,
    product.category,
    product.subcategory,
    product.image,
    product.sku,
  ]);

  const isDirty =
    focusKeyword !== (product.focusKeyword || "") ||
    seoTitle !== (product.seoTitle || product.name) ||
    seoDescription !== (product.seoDescription || product.shortSpec) ||
    description !== product.description;

  // Warn on unsaved changes
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // Ctrl+S / Cmd+S to save
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (isDirty && status !== "saving") {
          save();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty, status]);

  async function save() {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch(
        "/api/admin/seo/product/" + product.slug,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            focusKeyword,
            seoTitle,
            seoDescription,
            description,
          }),
        }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Eroare " + res.status);
      }
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  async function resetToDefaults() {
    if (!override) return;
    if (!confirm("Ștergi toate modificările SEO? Se revine la textul din import.")) return;
    setStatus("saving");
    try {
      const res = await fetch(
        "/api/admin/seo/product/" + product.slug,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("HTTP " + res.status);
      router.refresh();
      // Full page reload to reset local state
      window.location.reload();
    } catch (err) {
      setError((err as Error).message);
      setStatus("error");
    }
  }

  async function generateMetaOnly() {
    if (!focusKeyword.trim()) {
      alert("Setează întâi focus keyword-ul.");
      return;
    }
    setMetaLoading(true);
    try {
      // First save current keyword so API can read it
      await fetch("/api/admin/seo/product/" + product.slug, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ focusKeyword }),
      });
      const res = await fetch(
        "/api/admin/seo/product/" + product.slug + "/ai-meta",
        { method: "POST" }
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Eroare AI meta");
      }
      const data = await res.json();
      if (data.seoTitle) setSeoTitle(data.seoTitle);
      if (data.seoDescription) setSeoDescription(data.seoDescription);
      alert(
        "Generat de AI (Claude Opus). Cost: $" +
          (data.usage?.estimatedCostUSD || 0).toFixed(4) +
          ". Revizuiește și apasă Salvează dacă îți place."
      );
    } catch (err) {
      alert("Eroare: " + (err as Error).message);
    } finally {
      setMetaLoading(false);
    }
  }

  function applyAIRewrite(draft: {
    seoTitle?: string;
    seoDescription?: string;
    description?: string;
  }) {
    if (draft.seoTitle) setSeoTitle(draft.seoTitle);
    if (draft.seoDescription) setSeoDescription(draft.seoDescription);
    if (draft.description) setDescription(draft.description);
    setShowAIModal(false);
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="serif text-3xl text-ink-900 leading-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-xs text-ink-500 flex-wrap">
            <span className="font-mono">SKU: {product.sku}</span>
            <span>·</span>
            <Link
              href={"/produs/" + product.slug}
              target="_blank"
              className="text-uzx-blue hover:underline"
            >
              Vezi live ↗
            </Link>
            <span>·</span>
            <span className="font-mono">slug: {product.slug}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowCompetitorModal(true)}
            className="border hairline bg-white px-3 py-2 text-xs hover:bg-ink-50 transition"
          >
            🔍 Analizează concurent
          </button>
          {override && (
            <button
              onClick={resetToDefaults}
              disabled={status === "saving"}
              className="border hairline bg-white px-3 py-2 text-xs hover:bg-ink-50 transition text-red-600"
            >
              ↺ Resetează
            </button>
          )}
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-gradient-to-r from-purple-600 to-uzx-blue hover:opacity-90 text-white px-4 py-2 text-sm font-medium transition"
          >
            ✨ Rescrie complet cu AI (Opus)
          </button>
          <button
            onClick={save}
            disabled={status === "saving" || !isDirty}
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-2 text-sm font-medium transition disabled:opacity-50"
          >
            {status === "saving"
              ? "Se salvează..."
              : status === "saved"
                ? "✓ Salvat"
                : "Salvează"}
          </button>
        </div>
      </div>

      {error && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-3 text-sm">
          {error}
        </div>
      )}

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: FORM */}
        <div className="lg:col-span-8 space-y-5">
          {/* FOCUS KEYWORD */}
          <div className="bg-white border hairline p-5">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                Focus keyword
              </label>
              {keywordSuggestions.length > 0 && !focusKeyword && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-xs text-ink-400">sugestii:</span>
                  {keywordSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFocusKeyword(s)}
                      className="text-xs bg-ink-100 hover:bg-uzx-blue hover:text-white px-2 py-1 transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <input
              type="text"
              value={focusKeyword}
              onChange={(e) => setFocusKeyword(e.target.value)}
              placeholder='Ex: "presă de balotat", "centru CNC 5 axe"'
              className="w-full border hairline px-4 py-2.5 text-base focus:outline-none focus:border-uzx-blue"
            />
            <div className="text-xs text-ink-500 mt-2">
              Keyword-ul principal pentru care vrei să rankezi în Google.
              Analiza întreagă se face relativ la acesta.
            </div>
          </div>

          {/* SEO TITLE */}
          <div className="bg-white border hairline p-5">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                SEO title
              </label>
              <span
                className={
                  "text-xs font-mono " +
                  (seoTitle.length >= 30 && seoTitle.length <= 60
                    ? "text-green-600"
                    : "text-red-600")
                }
              >
                {seoTitle.length}/60
              </span>
            </div>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              className="w-full border hairline px-4 py-2.5 text-base focus:outline-none focus:border-uzx-blue"
            />
            <div className="text-xs text-ink-500 mt-2">
              Apare ca titlul albastru în Google. Target 30-60 caractere.
              Include keyword + power word (ex: "profesional", "industrial") +
              număr dacă e relevant.
            </div>
          </div>

          {/* META DESCRIPTION */}
          <div className="bg-white border hairline p-5">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                Meta description
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={generateMetaOnly}
                  disabled={metaLoading || !focusKeyword.trim()}
                  className="text-xs border hairline bg-white px-2 py-1 hover:bg-ink-50 transition disabled:opacity-50"
                  title="Generează cu Claude Opus — doar title + meta, rapid și ieftin"
                >
                  {metaLoading ? "..." : "✨ Generează cu AI"}
                </button>
                <span
                  className={
                    "text-xs font-mono " +
                    (seoDescription.length >= 120 &&
                    seoDescription.length <= 160
                      ? "text-green-600"
                      : "text-red-600")
                  }
                >
                  {seoDescription.length}/160
                </span>
              </div>
            </div>
            <textarea
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              rows={3}
              className="w-full border hairline px-4 py-2.5 text-base focus:outline-none focus:border-uzx-blue resize-y"
            />
            <div className="text-xs text-ink-500 mt-2">
              Apare sub title în Google. Target 120-160 caractere. Include
              keyword + CTA (ex: "Cere ofertă", "Afla preț").
            </div>
          </div>

          {/* SERP PREVIEW */}
          <SERPPreview
            title={seoTitle}
            description={seoDescription}
            url={"uzinex.ro/produs/" + product.slug}
          />

          {/* DESCRIPTION (full text) */}
          <div className="bg-white border hairline p-5">
            <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
              <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                Descriere produs (corpul paginii)
              </label>
              <span className="text-xs font-mono text-ink-500">
                {analysis.wordCount} cuvinte
              </span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={22}
              className="w-full border hairline px-4 py-2.5 text-sm focus:outline-none focus:border-uzx-blue resize-y font-mono leading-relaxed"
              spellCheck={false}
            />
            <div className="text-xs text-ink-500 mt-2">
              Textul complet al paginii de produs. Markdown-ul (##, ###, **
              bold **, - listă) e suportat. Modificările aici se reflectă live
              în scor și în pagina publică după Salvează.
            </div>
          </div>

          {/* HISTORY */}
          {override?.history && override.history.length > 0 && (
            <HistoryPanel history={override.history} />
          )}
        </div>

        {/* RIGHT: SCORE */}
        <div className="lg:col-span-4">
          <div className="sticky top-6">
            <SEOScorePanel analysis={analysis} />
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showAIModal && (
        <AIRewriteModal
          slug={product.slug}
          onClose={() => setShowAIModal(false)}
          onApply={applyAIRewrite}
          currentTitle={seoTitle}
          currentDescription={seoDescription}
          currentContent={description}
          focusKeyword={focusKeyword}
        />
      )}

      {showCompetitorModal && (
        <CompetitorModal
          focusKeyword={focusKeyword}
          onClose={() => setShowCompetitorModal(false)}
        />
      )}
    </div>
  );
}
