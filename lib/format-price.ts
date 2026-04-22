/**
 * Formatare preț pentru afișare în română + JSON-LD.
 * Folosește `ro-RO` locale → separator mii cu punct (24.900).
 */

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  RON: "lei",
  USD: "$",
};

/**
 * Format human: "€24.900" sau "24.900 lei".
 */
export function formatPrice(
  amount: number,
  currency: "EUR" | "RON" | "USD" = "EUR"
): string {
  const formatted = new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    minimumFractionDigits: 0,
  }).format(amount);

  const symbol = CURRENCY_SYMBOLS[currency] || currency;

  // EUR and USD: symbol înainte (€24.900)
  // RON: simbol după (24.900 lei)
  if (currency === "RON") return `${formatted} ${symbol}`;
  return `${symbol}${formatted}`;
}

/**
 * Format pentru JSON-LD schema.org Offer (string fără simbol).
 * Ex: 24900 → "24900" (NU "24.900" — Google cere format pur).
 */
export function formatPriceForSchema(amount: number): string {
  return amount.toString();
}

/**
 * Label "De la" sau "Preț:" în funcție de configurabilitate.
 */
export function priceLabel(isFrom: boolean = true): string {
  return isFrom ? "De la" : "Preț";
}
