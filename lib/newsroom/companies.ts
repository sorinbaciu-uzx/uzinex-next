// Static loader for /public/newsroom/companies.json — per-firm aggregated data
// (ANAF financials + portal.just.ro dosare) for the 14 tracked industrial firms.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "newsroom");

export type CompanyFinancialPoint = { year: number; value: number; label: string };

export type Company = {
  cui: number;
  name: string;
  sector: string;
  sectorLabel: string;
  financials: Record<string, CompanyFinancialPoint[]>;
  court: {
    dosareCount: number;
    recentHearings: number;
    recentCases: Array<{
      numar: string;
      obiect: string;
      lastHearing: string;
      calitateParte?: string;
      category?: "subject" | "creditor" | "other";
    }>;
    roleCounts?: Record<string, number>;
    categoryCounts?: { subject?: number; creditor?: number; other?: number };
  };
};

export function loadCompanies(): Company[] {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "companies.json"), "utf8")) as Company[];
  } catch {
    return [];
  }
}

export function loadCompany(cui: number): Company | null {
  return loadCompanies().find((c) => c.cui === cui) || null;
}

export function loadSectorPeers(sector: string, excludeCui?: number): Company[] {
  return loadCompanies().filter((c) => c.sector === sector && c.cui !== excludeCui);
}
