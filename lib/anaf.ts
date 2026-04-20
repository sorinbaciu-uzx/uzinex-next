/**
 * ANAF company lookup via demoanaf.ro public API.
 *
 * Endpoints used (server-to-server, no CORS issues):
 *   GET https://demoanaf.ro/api/company/{cui}          — general data (name, address, legal status, etc.)
 *   GET https://demoanaf.ro/api/company/{cui}/balance/{year}  — annual balance sheet (turnover, profit, employees, CAEN)
 *
 * Result is merged into a flat `AnafData` object and attached to the lead payload
 * before submission to Monday. Failures are non-fatal — the lead is still created
 * without ANAF enrichment.
 */

const DEMOANAF_BASE = "https://demoanaf.ro/api";
const REQUEST_TIMEOUT_MS = 6000;

export type AnafData = {
  name?: string;
  registrationNumber?: string;
  legalForm?: string;
  registrationDate?: string; // ISO YYYY-MM-DD
  county?: string;
  locality?: string;
  vatActive?: boolean;
  companyStatus?: string; // e.g. "Funcțiune", "Radiată"
  caenCode?: string;
  caenDescription?: string;
  turnoverRon?: number; // Cifra de afaceri
  netProfitRon?: number; // Profit net
  avgEmployees?: number; // Nr. angajați
  balanceYear?: number;
};

/** Strip "RO" prefix and non-digits; return null if result isn't a valid CUI. */
export function normalizeCui(raw?: string | null): string | null {
  if (!raw) return null;
  const digits = String(raw).replace(/^RO/i, "").replace(/\D/g, "");
  if (digits.length < 2 || digits.length > 10) return null;
  return digits;
}

/** Convert DD/MM/YYYY → YYYY-MM-DD. Returns undefined if input malformed. */
function toISODate(ddmmyyyy?: string): string | undefined {
  if (!ddmmyyyy) return undefined;
  const m = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!m) return undefined;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T | null> {
  try {
    const res = await fetch(url, {
      signal,
      headers: { Accept: "application/json", "User-Agent": "uzinex-next/1.0" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

type CompanyResp = {
  success: boolean;
  data?: {
    name?: string;
    registrationNumber?: string;
    legalForm?: string;
    registrationDate?: string;
    vatStatus?: string; // "active" | "inactive" | "verifying" | ...
    onrcStatusLabel?: string;
    headquartersAddress?: { county?: string; locality?: string };
  };
};

type BalanceResp = {
  success: boolean;
  data?: {
    year?: number;
    caenCode?: string;
    caenDescription?: string;
    indicators?: Array<{ code?: string; value?: number; label?: string }>;
  };
};

/**
 * Fetch and merge ANAF data for a given CUI. Tries last 2 fiscal years for the balance.
 * Returns null if neither call succeeds or CUI is invalid.
 */
export async function fetchAnafData(cuiRaw: string): Promise<AnafData | null> {
  const cui = normalizeCui(cuiRaw);
  if (!cui) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const currentYear = new Date().getFullYear();
  const [company, balanceY1, balanceY2] = await Promise.all([
    fetchJson<CompanyResp>(`${DEMOANAF_BASE}/company/${cui}`, controller.signal),
    fetchJson<BalanceResp>(`${DEMOANAF_BASE}/company/${cui}/balance/${currentYear - 1}`, controller.signal),
    fetchJson<BalanceResp>(`${DEMOANAF_BASE}/company/${cui}/balance/${currentYear - 2}`, controller.signal),
  ]);
  clearTimeout(timer);

  const cd = company?.success ? company.data : undefined;
  const bal = (balanceY1?.success && balanceY1.data) || (balanceY2?.success && balanceY2.data) || undefined;

  if (!cd && !bal) return null;

  const indicatorValue = (code: string): number | undefined => {
    const i = bal?.indicators?.find((x) => x.code === code);
    return typeof i?.value === "number" ? i.value : undefined;
  };

  return {
    name: cd?.name,
    registrationNumber: cd?.registrationNumber,
    legalForm: cd?.legalForm,
    registrationDate: toISODate(cd?.registrationDate),
    county: cd?.headquartersAddress?.county,
    locality: cd?.headquartersAddress?.locality,
    vatActive: cd?.vatStatus === "active",
    companyStatus: cd?.onrcStatusLabel,
    caenCode: bal?.caenCode,
    caenDescription: bal?.caenDescription,
    turnoverRon: indicatorValue("I13"),
    netProfitRon: indicatorValue("I18"),
    avgEmployees: indicatorValue("I20"),
    balanceYear: bal?.year,
  };
}
