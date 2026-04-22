/**
 * Fetch the official EUR→RON reference rate from the National Bank of Romania
 * (Banca Națională a României, BNR). The endpoint publishes a small XML file
 * that updates once per working day around 13:00 EET; weekends and bank
 * holidays keep the previous working day's values.
 *
 * WHY we use this:
 *  - It's the official reference rate Romanian businesses and tax authorities
 *    use for VAT conversions on EUR-quoted invoices. Showing it next to a
 *    price is the right way to give a RON estimate without picking a private
 *    rate provider.
 *  - The XML format has been stable for ~20 years, so a simple regex
 *    extraction is safer than pulling in a full XML parser dependency.
 *
 * The function is defensive: any failure — network, parse, sanity — returns
 * null and the UI hides the RON-equivalent line. The page never breaks.
 */

const BNR_URL = "https://www.bnr.ro/nbrfxrates.xml";

/**
 * Cache lifetime for the BNR fetch. 1 hour balances:
 *  - freshness (catches the daily ~13:00 publication within 60 min)
 *  - BNR politeness (no more than ~24 requests/day from our origin)
 * Paired with `export const revalidate = 3600` at the page level, so the
 * product pages themselves regenerate within the same window.
 */
const CACHE_SECONDS = 3600;

/**
 * Sanity bounds on the rate. Currently ~4.9–5.0 RON/EUR (2026). If BNR returns
 * something outside a generous band, we treat it as a parse error and fall
 * back to hiding the line rather than showing obviously wrong numbers.
 */
const MIN_PLAUSIBLE_RATE = 3;
const MAX_PLAUSIBLE_RATE = 10;

export type BnrEurRate = {
  /** RON per 1 EUR. */
  rate: number;
  /** Rate publication date, YYYY-MM-DD (from the Cube@date attribute). */
  date: string;
};

/**
 * Fetch and parse the BNR EUR reference rate.
 * Returns `null` on any failure (network, non-2xx, parse, sanity).
 *
 * Do NOT `throw` from this function — its callers display an optional UI
 * accent. A thrown error would crash the product page, which is an
 * unacceptable tradeoff.
 */
export async function getBnrEurRate(): Promise<BnrEurRate | null> {
  try {
    const res = await fetch(BNR_URL, {
      next: { revalidate: CACHE_SECONDS },
    });
    if (!res.ok) return null;
    const xml = await res.text();

    const dateMatch = xml.match(/<Cube[^>]*\bdate="(\d{4}-\d{2}-\d{2})"/);
    const eurMatch = xml.match(
      /<Rate[^>]*\bcurrency="EUR"[^>]*>([\d.]+)<\/Rate>/
    );
    if (!dateMatch || !eurMatch) return null;

    const rate = parseFloat(eurMatch[1]);
    if (
      !Number.isFinite(rate) ||
      rate < MIN_PLAUSIBLE_RATE ||
      rate > MAX_PLAUSIBLE_RATE
    ) {
      return null;
    }

    return { rate, date: dateMatch[1] };
  } catch {
    return null;
  }
}

/**
 * Convert an EUR amount to the RON equivalent at the given rate, rounded to
 * the nearest whole leu. Returns null if inputs are invalid.
 */
export function eurToRon(eur: number, rate: number): number | null {
  if (!Number.isFinite(eur) || !Number.isFinite(rate) || rate <= 0) return null;
  return Math.round(eur * rate);
}

/**
 * Human-readable RON amount with thousands separator (ro-RO locale).
 */
export function formatRon(amount: number): string {
  return (
    new Intl.NumberFormat("ro-RO", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(amount) + " lei"
  );
}

/**
 * Human-readable BNR publication date (DD.MM.YYYY).
 */
export function formatBnrDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-");
  if (!y || !m || !d) return isoDate;
  return `${d}.${m}.${y}`;
}
