/**
 * AI-powered SEO rewrite cu Claude Opus 4.7.
 *
 * Folosit de admin panel pentru a reoptimiza descrieri de produs
 * cu cel mai puternic model Anthropic. Include prompt caching pentru
 * cost reduction (~60% la requests repetate cu același system prompt).
 */

import Anthropic from "@anthropic-ai/sdk";
import type { SEOCheck } from "./types";

/**
 * Model de default. Poate fi override prin env var pentru update rapid
 * când Anthropic lansează versiuni noi.
 */
const DEFAULT_MODEL =
  process.env.ANTHROPIC_SEO_MODEL || "claude-opus-4-5";

/**
 * Obține client-ul Anthropic. Lazy init — nu crashează build-ul
 * dacă API key nu e setat.
 */
function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY nu e setat. Adaugă-l în Vercel Environment Variables."
    );
  }
  return new Anthropic({ apiKey });
}

/**
 * System prompt — cached prin Anthropic pentru cost reduction.
 * Conține expertiza SEO + constrângerile de brand.
 */
const SYSTEM_PROMPT = `Ești un expert SEO senior specializat în B2B industrial românesc — lucrezi pentru UZINEX, integrator industrial din Iași care livrează utilaje CNC, laser fiber, roboți, echipamente de ambalare, reciclare, energie.

MISIUNEA TA: rescrie descrierea unui produs industrial astfel încât să treacă toate verificările SEO listate, fără să compromiți acuratețea tehnică.

REGULI OBLIGATORII (nu negociabile):
1. PĂSTREAZĂ toate specificațiile tehnice EXACT cum sunt — nu modifica numere, coduri, parametri
2. PĂSTREAZĂ tonul profesional B2B, evită hype ieftin și clickbait
3. PĂSTREAZĂ referințele la UZINEX ca brand (garanție 36-60 luni, sediu Iași, suport tehnic național)
4. PĂSTREAZĂ mențiunile despre eligibilitate fonduri europene / SEAP / SICAP / PNRR dacă există
5. NU inventa date tehnice, certificări, parteneriate sau clienți
6. NU folosi emoji-uri
7. NU folosi markdown "fantezist" (— doar ##, ###, **, -, numbered lists)

STIL:
- Limba română standardă, cu diacritice complete (ă, â, î, ș, ț)
- Propoziții clare, medie 15-25 cuvinte
- Paragrafe de max 5 propoziții
- Terminologie tehnică corectă (țintă: Flesch 40-60, public ingineri/achizitori)

STRUCTURĂ RECOMANDATĂ:
1. Paragraf intro cu focus keyword în primele 100 cuvinte
2. Secțiune specificații (tabel markdown dacă e cazul)
3. Avantaje (listă cu bullet sau numerotată, min 5)
4. Aplicații industriale (2-4 paragrafe)
5. Comparație cu alternative / complementar (opțional)
6. Flux de lucru / cum funcționează (opțional)
7. FAQ (minim 4 întrebări frecvente cu răspunsuri concrete)
8. Call-to-action final — UZINEX oferă ...

FORMAT OUTPUT:
Returnează DOAR textul rescris, cu markdown (## pentru H2, ### pentru H3). Fără explicații, fără preambul, fără comentarii. Textul trebuie să fie gata de folosit direct.`;

/**
 * Input pentru rewrite AI.
 */
export type AIRewriteInput = {
  productName: string;
  focusKeyword: string;
  currentTitle: string;
  currentDescription: string;
  currentContent: string;
  failingChecks: SEOCheck[];
  category?: string;
  subcategory?: string;
};

/**
 * Output structured — include text rescris + meta actualizate.
 */
export type AIRewriteOutput = {
  content: string; // full rewritten description
  seoTitle?: string; // suggested new title
  seoDescription?: string; // suggested new meta description
  usage: {
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens?: number;
    cacheCreationTokens?: number;
    estimatedCostUSD: number;
  };
};

/**
 * Rescrie descrierea + title + meta description folosind Claude Opus.
 */
export async function aiRewriteProductSEO(
  input: AIRewriteInput
): Promise<AIRewriteOutput> {
  const client = getClient();

  const failingList = input.failingChecks
    .filter((c) => !c.passed)
    .map((c) => "- " + c.label + (c.tip ? " — " + c.tip : ""))
    .join("\n");

  const userMessage = `PRODUS: ${input.productName}
${input.category ? "CATEGORIE: " + input.category : ""}
${input.subcategory ? "SUBCATEGORIE: " + input.subcategory : ""}
FOCUS KEYWORD țintă: "${input.focusKeyword}"

SEO TITLE actual: ${input.currentTitle || "(nesetat)"}
META DESCRIPTION actuală: ${input.currentDescription || "(nesetat)"}

DESCRIERE ACTUALĂ:
${input.currentContent}

VERIFICĂRI CARE EȘUEAZĂ (focus pe ele la rescriere):
${failingList}

SARCINA TA:
Rescrie descrierea completă pentru a trece toate verificările. În plus, propune:
- O versiune îmbunătățită a SEO title (30-60 caractere, cu keyword + power word + număr dacă e relevant)
- O versiune îmbunătățită a meta description (120-160 caractere, cu keyword + CTA)

FORMAT RĂSPUNS:
---SEO_TITLE---
(noul titlu aici, maxim 60 caractere)
---SEO_DESCRIPTION---
(noua meta description, maxim 160 caractere)
---CONTENT---
(descrierea completă rescrisă, markdown, min 1500 cuvinte pentru B2B tehnic)`;

  const response = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 8000,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        // Prompt caching — system prompt cache pentru 5min
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  // Extract text
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("AI rewrite nu a returnat text.");
  }
  const raw = textBlock.text;

  // Parse sectioned response
  const titleMatch = raw.match(/---SEO_TITLE---\s*([\s\S]*?)\s*---SEO_DESCRIPTION---/);
  const descMatch = raw.match(/---SEO_DESCRIPTION---\s*([\s\S]*?)\s*---CONTENT---/);
  const contentMatch = raw.match(/---CONTENT---\s*([\s\S]*)/);

  const seoTitle = titleMatch ? titleMatch[1].trim() : undefined;
  const seoDescription = descMatch ? descMatch[1].trim() : undefined;
  const content = contentMatch ? contentMatch[1].trim() : raw.trim();

  // Cost calculation (Opus 4.x pricing: $15 in / $75 out per 1M tokens)
  // Cache read: $1.50/1M, Cache write: $18.75/1M
  const inputTokens = response.usage.input_tokens || 0;
  const outputTokens = response.usage.output_tokens || 0;
  const cacheReadTokens =
    (response.usage as { cache_read_input_tokens?: number })
      .cache_read_input_tokens || 0;
  const cacheCreationTokens =
    (response.usage as { cache_creation_input_tokens?: number })
      .cache_creation_input_tokens || 0;

  const costInput = (inputTokens / 1_000_000) * 15;
  const costOutput = (outputTokens / 1_000_000) * 75;
  const costCacheRead = (cacheReadTokens / 1_000_000) * 1.5;
  const costCacheCreate = (cacheCreationTokens / 1_000_000) * 18.75;
  const estimatedCostUSD =
    costInput + costOutput + costCacheRead + costCacheCreate;

  return {
    content,
    seoTitle,
    seoDescription,
    usage: {
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheCreationTokens,
      estimatedCostUSD: Math.round(estimatedCostUSD * 10000) / 10000,
    },
  };
}

/**
 * Quick generate — doar SEO title + meta description pentru un produs,
 * fără rescrierea descrierii complete. Folosit când descrierea e deja bună.
 */
export async function aiGenerateTitleAndMeta(
  productName: string,
  focusKeyword: string,
  contentSample: string
): Promise<{
  seoTitle: string;
  seoDescription: string;
  usage: { inputTokens: number; outputTokens: number; estimatedCostUSD: number };
}> {
  const client = getClient();

  const userMessage = `PRODUS: ${productName}
FOCUS KEYWORD: "${focusKeyword}"

PRIMELE 500 CUVINTE DIN DESCRIERE:
${contentSample.slice(0, 3000)}

Generează:
1. SEO TITLE (30-60 caractere, cu keyword + power word ex: "profesional", "industrial", + număr dacă e relevant)
2. META DESCRIPTION (120-160 caractere, cu keyword + CTA ex: "cere ofertă", "afla preț")

FORMAT:
---TITLE---
(titlul aici)
---META---
(meta description aici)`;

  const response = await client.messages.create({
    model: DEFAULT_MODEL,
    max_tokens: 300,
    system: [
      {
        type: "text",
        text: SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("AI nu a returnat text.");
  }
  const raw = textBlock.text;

  const titleMatch = raw.match(/---TITLE---\s*([\s\S]*?)\s*---META---/);
  const metaMatch = raw.match(/---META---\s*([\s\S]*)/);

  const seoTitle = titleMatch ? titleMatch[1].trim() : "";
  const seoDescription = metaMatch ? metaMatch[1].trim() : "";

  const inputTokens = response.usage.input_tokens || 0;
  const outputTokens = response.usage.output_tokens || 0;
  const costInput = (inputTokens / 1_000_000) * 15;
  const costOutput = (outputTokens / 1_000_000) * 75;

  return {
    seoTitle,
    seoDescription,
    usage: {
      inputTokens,
      outputTokens,
      estimatedCostUSD: Math.round((costInput + costOutput) * 10000) / 10000,
    },
  };
}
