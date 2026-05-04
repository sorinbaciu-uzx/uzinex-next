// Static loader for /public/newsroom/world.json — pre-aggregated international data
// for /newsroom/lume/* pages (IMF + WB + USASpending + DoD + Comtrade + NATO + Climate).

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "newsroom");

export type CountrySeries = Record<string, Array<{ year: number; value: number }>>;

export type WorldData = {
  generatedAt: string;
  countries: string[];
  countryLabels: Record<string, string>;
  imf: {
    debt_gdp: CountrySeries;
    gdp_growth: CountrySeries;
    inflation: CountrySeries;
    current_account_gdp: CountrySeries;
  };
  worldbank: {
    manufacturing_share_gdp: CountrySeries;
    exports_share_gdp: CountrySeries;
    fdi_share_gdp: CountrySeries;
  };
  usaspending: {
    total: number;
    awardsCount: number;
    agencies: Array<{ agency: string; amount: number }>;
    recentAwards: Array<{ amount: number; agency: string; recipient: string; date: string; awardId?: string }>;
  };
  dod: {
    totalRecent: number;
    announcements: Array<{ title: string; date: string; link: string | null }>;
  };
  comtrade: { totalExport: number; totalImport: number; balance: number };
  nato: { nspaOpenOpportunities: number };
  climate: { ranking: Array<{ sector: string; value: number }> };
};

export function loadWorld(): WorldData | null {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "world.json"), "utf8")) as WorldData;
  } catch {
    return null;
  }
}
