/**
 * Extractor automat de specificații tehnice din descriptionBlocks.
 *
 * Parsează primul tabel cu [Parametru, Valoare] pairs din descrierea produsului
 * și selectează cele mai informative 4 specs pentru afișare în hero.
 *
 * Euristici:
 * - Prefer valori cu numere (cursă, capacitate, putere, etc.)
 * - Prefer valori scurte (<40 caractere)
 * - Evită rânduri generice ("Configurabil la cerere", "La ofertare")
 * - Mapping parameter → pictogramă pe bază de keywords
 */

import type { DescriptionBlock } from "@/app/magazin/products";

export type SpecIcon =
  | "dimensions"
  | "weight"
  | "power"
  | "voltage"
  | "battery"
  | "capacity"
  | "speed"
  | "temperature"
  | "certification"
  | "material"
  | "control"
  | "axis"
  | "diameter"
  | "travel"
  | "tools"
  | "config"
  | "output"
  | "consumption"
  | "rpm"
  | "precision"
  | "protection"
  | "default";

export type ProductSpec = {
  icon: SpecIcon;
  title: string;
  value: string;
};

/**
 * Cuvinte generice care semnalează că o valoare e marketing, nu tehnic.
 */
const GENERIC_VALUE_PATTERNS: RegExp[] = [
  /configurabil\s*la\s*(cerere|comanda)/i,
  /la\s*ofertare/i,
  /consultare/i,
  /la\s*cerere/i,
  /conform\s*(cerintelor|necesitatilor|specificatiilor)/i,
  /în\s*funcție\s*de/i,
  /in\s*functie\s*de/i,
  /se\s*(stabileste|decide|determina)/i,
  /(personaliza|personaliz)/i,
  /disponibil\s*la\s*cerere/i,
  /variabil/i,
];

/**
 * Cuvinte generice pentru parametri care nu sunt utili ca "highlight".
 */
const GENERIC_PARAM_PATTERNS: RegExp[] = [
  /^configur/i,
  /^materiale?\s*compat/i,
  /^aplicatii/i,
  /^industrii/i,
  /^destinat/i,
  /^clienti/i,
  /^garantie/i, // we have this in the benefits strip
  /^livrare/i,
  /^transport/i,
  /^montaj/i,
  /^service/i,
];

/**
 * Mapare keyword-uri din parametru → tip iconiță.
 * Ordinea contează — primul match câștigă, așa că punem specifice prima.
 */
const ICON_KEYWORDS: Array<{ keywords: string[]; icon: SpecIcon }> = [
  // Protection ratings / Certifications (most specific first)
  { keywords: ["atex", "ip6", "ip5", "protectie", "protection"], icon: "protection" },
  { keywords: ["certificare", "standard", "conformitate", "ce marking"], icon: "certification" },

  // Dimensions & travels
  { keywords: ["cursa", "cursa axa", "stroke", "travel", "deplasare"], icon: "travel" },
  { keywords: ["axe", "axa", "axis"], icon: "axis" },
  { keywords: ["diametru", "diameter", "ø"], icon: "diameter" },
  { keywords: ["dimens", "gabarit", "marime", "size"], icon: "dimensions" },

  // Power electrical
  { keywords: ["tensiune", "voltage", "voltaj", "alimentare"], icon: "voltage" },
  { keywords: ["putere", "power", "consumare", "kw"], icon: "power" },
  { keywords: ["autonomie", "battery", "baterie", "durata operare"], icon: "battery" },

  // Performance
  { keywords: ["viteza", "speed", "velocity", "rapid"], icon: "speed" },
  { keywords: ["rpm", "turatie", "rotatii"], icon: "rpm" },
  { keywords: ["precizie", "acuratete", "accuracy", "repetabilitate"], icon: "precision" },
  { keywords: ["temperatura", "temperature", "temp"], icon: "temperature" },

  // Capacity
  { keywords: ["capacitate", "capacity", "volum", "sarcina", "payload"], icon: "capacity" },
  { keywords: ["productivitate", "productivity", "output", "debit"], icon: "output" },
  { keywords: ["consum", "consumption"], icon: "consumption" },

  // Weight
  { keywords: ["greutate", "masa", "weight", "kg"], icon: "weight" },

  // Material
  { keywords: ["material", "otel", "aluminiu", "inox", "steel"], icon: "material" },

  // Controls & Tools
  { keywords: ["controler", "control", "plc", "cnc", "comanda"], icon: "control" },
  { keywords: ["magazin", "scule", "tool", "atc", "carusel"], icon: "tools" },

  // Configuration
  { keywords: ["configur", "variant", "model"], icon: "config" },
];

/**
 * Determină iconița pentru un parametru.
 */
export function paramToIcon(param: string): SpecIcon {
  const p = param.toLowerCase().trim();
  for (const { keywords, icon } of ICON_KEYWORDS) {
    if (keywords.some((kw) => p.includes(kw))) return icon;
  }
  return "default";
}

/**
 * Scor pentru o specificație — cu cât mai mare, cu atât mai relevantă.
 */
function scoreSpec(param: string, value: string): number {
  let score = 0;

  // Prefer short values (fit in card)
  if (value.length <= 30) score += 10;
  else if (value.length <= 50) score += 5;
  else if (value.length > 100) score -= 10;

  // Prefer values with numbers (quantitative)
  if (/\d/.test(value)) score += 8;

  // Prefer values with units (kg, mm, kW, V, etc.)
  if (/\d\s*(mm|cm|m|kg|kw|w|v|a|hz|rpm|bar|°|%|l|ml)\b/i.test(value)) score += 5;

  // Penalize generic values
  if (GENERIC_VALUE_PATTERNS.some((re) => re.test(value))) score -= 100;

  // Penalize generic params
  if (GENERIC_PARAM_PATTERNS.some((re) => re.test(param))) score -= 100;

  // Prefer params with specific icon match (vs "default")
  if (paramToIcon(param) !== "default") score += 3;

  // Slightly penalize very short params (likely labels without context)
  if (param.length < 4) score -= 3;

  return score;
}

/**
 * Clean up value string for display (remove verbose qualifications).
 */
function cleanValue(value: string): string {
  return value
    .replace(/\s*\([^)]{40,}\)/g, "") // remove long parenthetical explanations
    .replace(/\s*—\s*.{50,}$/, "") // remove long em-dash trailing explanations
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Extrage până la maxCount specs tehnice de top din descriptionBlocks.
 */
export function extractTopSpecs(
  descriptionBlocks: DescriptionBlock[] | undefined,
  maxCount = 4
): ProductSpec[] {
  if (!descriptionBlocks || descriptionBlocks.length === 0) return [];

  // Find first table block
  const table = descriptionBlocks.find(
    (b): b is { type: "table"; rows: string[][] } => b.type === "table"
  );
  if (!table || !table.rows || table.rows.length < 2) return [];

  // Skip header, score each row
  const dataRows = table.rows.slice(1);
  const scored = dataRows
    .filter(
      (row) =>
        Array.isArray(row) &&
        row.length >= 2 &&
        row[0]?.trim() &&
        row[1]?.trim()
    )
    .map((row) => {
      const param = row[0].trim();
      const rawValue = row[1].trim();
      const value = cleanValue(rawValue);
      return {
        param,
        value,
        score: scoreSpec(param, value),
        icon: paramToIcon(param),
      };
    })
    .filter((s) => s.score > 0) // drop negative scores
    .sort((a, b) => b.score - a.score);

  // Dedupe by icon type (don't show 2 "dimensions" icons)
  const seen = new Set<SpecIcon>();
  const result: ProductSpec[] = [];
  for (const s of scored) {
    if (seen.has(s.icon)) continue;
    seen.add(s.icon);
    result.push({
      icon: s.icon,
      title: s.param,
      value: s.value,
    });
    if (result.length >= maxCount) break;
  }

  return result;
}
