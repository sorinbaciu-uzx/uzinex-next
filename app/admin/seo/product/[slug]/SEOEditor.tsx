"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { analyzeSEO } from "@/lib/seo/analyzer";
import type { SEOAnalysis } from "@/lib/seo/types";
import type { Product, DescriptionBlock } from "@/app/magazin/products";
import type { ProductOverride } from "@/lib/seo/product-seo";
import { SEOScorePanel } from "./SEOScorePanel";
import { SERPPreview } from "./SERPPreview";
import { HistoryPanel } from "./HistoryPanel";
import { AIRewriteModal } from "./AIRewriteModal";
import { CompetitorModal } from "./CompetitorModal";
import { ImageUploadField } from "./ImageUploadField";
import { MediaGalleryField } from "./MediaGalleryField";
import { DescriptionBlocksEditor } from "./DescriptionBlocksEditor";
import { ProductSpecsEditor } from "./ProductSpecsEditor";
import type { MediaItem } from "@/lib/media";
import type { ProductSpec } from "@/lib/product-specs";
import { extractTopSpecs } from "@/lib/product-specs";

type Tab = "basic" | "description" | "seo";

export function SEOEditor({
  product,
  override,
  initialAnalysis: _initialAnalysis,
  keywordSuggestions,
}: {
  product: Product;
  override: ProductOverride | null;
  initialAnalysis: SEOAnalysis;
  keywordSuggestions: string[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("basic");

  // Basic fields
  const [name, setName] = useState(product.name);
  const [shortSpec, setShortSpec] = useState(product.shortSpec);
  const [image, setImage] = useState(product.image);
  const [imageAlt, setImageAlt] = useState(product.imageAlt || "");
  const [gallery, setGallery] = useState<MediaItem[]>(product.gallery || []);
  const [datasheetUrl, setDatasheetUrl] = useState(product.datasheetUrl || "");
  const [category, setCategory] = useState(product.category);
  const [subcategory, setSubcategory] = useState(product.subcategory || "");
  const [subSubcategory, setSubSubcategory] = useState(
    product.subSubcategory || ""
  );

  // Description fields
  const [description, setDescription] = useState(product.description);
  const [descriptionBlocks, setDescriptionBlocks] = useState<DescriptionBlock[]>(
    product.descriptionBlocks || []
  );
  const [specs, setSpecs] = useState<ProductSpec[] | undefined>(product.specs);

  // SEO fields
  const [focusKeyword, setFocusKeyword] = useState(product.focusKeyword || "");
  const [seoTitle, setSeoTitle] = useState(product.seoTitle || product.name);
  const [seoDescription, setSeoDescription] = useState(
    product.seoDescription || product.shortSpec
  );

  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [showAIModal, setShowAIModal] = useState(false);
  const [showCompetitorModal, setShowCompetitorModal] = useState(false);
  const [metaLoading, setMetaLoading] = useState(false);

  // Live analysis — re-run when any field that affects SEO changes
  const analysis = useMemo<SEOAnalysis>(() => {
    return analyzeSEO({
      focusKeyword,
      seoTitle,
      seoDescription,
      slug: product.slug,
      content: description,
      name,
      category,
      subcategory,
      image,
      sku: product.sku,
      hasSchema: true,
      hasCanonical: true,
    });
  }, [
    focusKeyword,
    seoTitle,
    seoDescription,
    description,
    name,
    category,
    subcategory,
    image,
    product.slug,
    product.sku,
  ]);

  const isDirty =
    name !== product.name ||
    shortSpec !== product.shortSpec ||
    image !== product.image ||
    imageAlt !== (product.imageAlt || "") ||
    JSON.stringify(gallery) !== JSON.stringify(product.gallery || []) ||
    datasheetUrl !== (product.datasheetUrl || "") ||
    category !== product.category ||
    subcategory !== (product.subcategory || "") ||
    subSubcategory !== (product.subSubcategory || "") ||
    description !== product.description ||
    JSON.stringify(descriptionBlocks) !==
      JSON.stringify(product.descriptionBlocks || []) ||
    JSON.stringify(specs ?? null) !== JSON.stringify(product.specs ?? null) ||
    focusKeyword !== (product.focusKeyword || "") ||
    seoTitle !== (product.seoTitle || product.name) ||
    seoDescription !== (product.seoDescription || product.shortSpec);

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
            name,
            shortSpec,
            image,
            imageAlt,
            gallery,
            datasheetUrl,
            category,
            subcategory,
            subSubcategory,
            description,
            descriptionBlocks,
            specs,
            focusKeyword,
            seoTitle,
            seoDescription,
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
    if (
      !confirm(
        "Ștergi TOATE modificările acestui produs și revii la valorile din importul original?"
      )
    )
      return;
    setStatus("saving");
    try {
      const res = await fetch(
        "/api/admin/seo/product/" + product.slug,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("HTTP " + res.status);
      router.refresh();
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
          ". Revizuiește și apasă Salvează."
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
    setTab("seo"); // show result in SEO tab
  }

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <h1 className="serif text-2xl text-ink-900 leading-tight">{name}</h1>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-500 flex-wrap">
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
          {override && (
            <button
              onClick={resetToDefaults}
              disabled={status === "saving"}
              className="border hairline bg-white px-3 py-2 text-xs hover:bg-ink-50 transition text-red-600"
              title="Șterge toate modificările, revine la importul original"
            >
              ↺ Reset
            </button>
          )}
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

      {/* TAB NAV */}
      <div className="flex items-center gap-px bg-ink-200 border hairline">
        <TabButton active={tab === "basic"} onClick={() => setTab("basic")}>
          <span className="text-uzx-orange mr-1.5">01</span> Date produs
          {isDirty && (name !== product.name ||
            shortSpec !== product.shortSpec ||
            image !== product.image ||
            datasheetUrl !== (product.datasheetUrl || "") ||
            category !== product.category) && (
            <span className="ml-2 w-1.5 h-1.5 rounded-full bg-uzx-orange inline-block" />
          )}
        </TabButton>
        <TabButton
          active={tab === "description"}
          onClick={() => setTab("description")}
        >
          <span className="text-uzx-orange mr-1.5">02</span> Conținut &
          specificații
          {JSON.stringify(descriptionBlocks) !==
            JSON.stringify(product.descriptionBlocks || []) && (
            <span className="ml-2 w-1.5 h-1.5 rounded-full bg-uzx-orange inline-block" />
          )}
        </TabButton>
        <TabButton active={tab === "seo"} onClick={() => setTab("seo")}>
          <span className="text-uzx-orange mr-1.5">03</span> SEO & vizibilitate
          <span
            className="ml-2 inline-flex items-center justify-center w-6 h-6 text-[10px] font-mono font-bold rounded-full"
            style={{
              background: analysis.verdictColor,
              color: "white",
            }}
          >
            {analysis.score}
          </span>
        </TabButton>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-5">
          {/* BASIC TAB */}
          {tab === "basic" && (
            <>
              <ImageUploadField
                value={image}
                onChange={setImage}
                label="Imagine principală produs (hero + OpenGraph)"
                altValue={imageAlt}
                onAltChange={setImageAlt}
                altPlaceholder={`Ex: ${name} — Uzinex (industrial, garantat 60 luni)`}
              />

              <MediaGalleryField value={gallery} onChange={setGallery} />

              <ProductSpecsEditor
                autoExtracted={extractTopSpecs(descriptionBlocks, 4)}
                value={specs}
                onChange={setSpecs}
              />

              <div className="bg-white border hairline p-5">
                <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                  Nume produs (titlu H1 pe pagină)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 border hairline px-4 py-2.5 text-base focus:outline-none focus:border-uzx-blue"
                />
                <div className="text-xs text-ink-500 mt-2">
                  Titlu vizibil în hero-ul paginii. Diferit de SEO title (care
                  apare în Google).
                </div>
              </div>

              <div className="bg-white border hairline p-5">
                <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                  Short spec (sub-titlu în hero)
                </label>
                <textarea
                  value={shortSpec}
                  onChange={(e) => setShortSpec(e.target.value)}
                  rows={3}
                  className="w-full mt-2 border hairline px-4 py-2.5 text-sm focus:outline-none focus:border-uzx-blue resize-y"
                />
                <div className="text-xs text-ink-500 mt-2">
                  Sub-titlul alb din hero-ul albastru de pe pagina produs.
                  Frază scurtă — 1-2 propoziții.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border hairline">
                <div className="bg-white p-5">
                  <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                    Categorie
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-2 border hairline px-3 py-2 text-sm focus:outline-none focus:border-uzx-blue"
                  />
                </div>
                <div className="bg-white p-5">
                  <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                    Subcategorie
                  </label>
                  <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full mt-2 border hairline px-3 py-2 text-sm focus:outline-none focus:border-uzx-blue"
                  />
                </div>
                <div className="bg-white p-5">
                  <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                    Sub-sub categorie
                  </label>
                  <input
                    type="text"
                    value={subSubcategory}
                    onChange={(e) => setSubSubcategory(e.target.value)}
                    className="w-full mt-2 border hairline px-3 py-2 text-sm focus:outline-none focus:border-uzx-blue"
                  />
                </div>
              </div>

              <div className="bg-white border hairline p-5">
                <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                  Fișă tehnică (URL descărcare)
                </label>
                <input
                  type="url"
                  value={datasheetUrl}
                  onChange={(e) => setDatasheetUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/..."
                  className="w-full mt-2 border hairline px-4 py-2 text-sm focus:outline-none focus:border-uzx-blue font-mono"
                />
                <div className="text-xs text-ink-500 mt-2">
                  Link către PDF-ul fișei tehnice. Apare ca buton "Descarcă
                  fișa tehnică" pe pagina produs.
                </div>
              </div>

              <div className="bg-ink-50 border hairline p-4 text-xs text-ink-600">
                <div className="flex items-start gap-2">
                  <span className="text-uzx-blue">ℹ</span>
                  <div>
                    <b>SKU</b> ({product.sku}) și <b>slug</b> ({product.slug})
                    nu pot fi modificate — sunt identificatori unici folosiți
                    pentru URL-uri și integrări (Monday CRM, sitemap, etc.).
                    Dacă ai nevoie să schimbi slug-ul, facem un redirect
                    manual.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* DESCRIPTION TAB */}
          {tab === "description" && (
            <>
              <div className="bg-white border hairline p-5">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
                    Descriere plată (text complet)
                  </label>
                  <span className="text-xs font-mono text-ink-500">
                    {analysis.wordCount} cuvinte
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={24}
                  className="w-full border hairline px-4 py-2.5 text-sm focus:outline-none focus:border-uzx-blue resize-y font-mono leading-relaxed"
                  spellCheck={false}
                />
                <div className="text-xs text-ink-500 mt-2">
                  Textul complet al descrierii — folosit de motorul SEO pentru
                  scoring și de Google pentru indexare. Editează-l direct sau
                  folosește AI rewrite.
                </div>
              </div>

              <DescriptionBlocksEditor
                blocks={descriptionBlocks}
                onChange={setDescriptionBlocks}
              />

              <div className="bg-ink-50 border hairline p-4 text-xs text-ink-600">
                <div className="flex items-start gap-2">
                  <span className="text-uzx-blue">ℹ</span>
                  <div>
                    <b>Blocurile</b> sunt afișate pe pagina produs în secțiunea
                    "Detalii produs" — paragrafele apar ca text, tabelele apar
                    ca tabele HTML. Ordonează-le cum vrei să fie vizibile
                    clientului.
                  </div>
                </div>
              </div>
            </>
          )}

          {/* SEO TAB */}
          {tab === "seo" && (
            <>
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
                    SEO title (apare în Google)
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
                  Target 30-60 caractere. Include keyword + power word (ex:
                  "profesional", "industrial") + număr dacă e relevant.
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
                      title="Generează cu Claude Opus — rapid și ieftin"
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
              </div>

              {/* SERP PREVIEW */}
              <SERPPreview
                title={seoTitle}
                description={seoDescription}
                url={"uzinex.ro/produs/" + product.slug}
              />

              {/* AI REWRITE ACTIONS */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setShowCompetitorModal(true)}
                  className="border hairline bg-white px-3 py-2 text-xs hover:bg-ink-50 transition"
                >
                  🔍 Analizează concurent
                </button>
                <button
                  onClick={() => setShowAIModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-uzx-blue hover:opacity-90 text-white px-4 py-2 text-sm font-medium transition"
                >
                  ✨ Rescrie descrierea complet cu AI (Opus)
                </button>
              </div>

              {/* HISTORY */}
              {override?.history && override.history.length > 0 && (
                <HistoryPanel history={override.history} />
              )}
            </>
          )}
        </div>

        {/* RIGHT: SCORE (always visible) */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-3">
            <SEOScorePanel analysis={analysis} />
            {isDirty && (
              <div className="bg-uzx-orange/10 border border-uzx-orange/30 p-3 text-xs text-uzx-orange text-center font-medium">
                ⚠ Ai modificări nesalvate. Ctrl+S să salvezi.
              </div>
            )}
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

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 px-4 py-3 text-sm font-medium transition flex items-center justify-center font-mono"
      style={
        active
          ? { background: "white", color: "#111827" }
          : {
              background: "#f9fafb",
              color: "#6b7280",
            }
      }
    >
      {children}
    </button>
  );
}
