// Map (sourceId, insight) → primary source URL where a journalist can verify
// the exact number. Each source has a different UI/UX, so we send them to the
// most specific page possible (country profile, dataset filter, notice page).
//
// Some sources don't expose deep links (only datasets behind login or ad-hoc
// queries) — in that case we link to the search/landing page where the
// journalist can re-construct the query themselves.

import type { Insight } from "./data";

export type SourceLink = {
  label: string;
  url: string;
  hint?: string;
};

const ROU = "ROU";

/**
 * Build the primary "verify at source" URL for an insight.
 * Returns null when no good deep-link exists (then the UI falls back to Google).
 */
export function buildPrimarySourceUrl(insight: Insight): SourceLink | null {
  const sourceId = insight.sources[0];
  const data = insight.data || {};

  switch (sourceId) {
    case "bnr": {
      // Daily FX archive — shows the day's official rates.
      const date = data.latest?.date ? new Date(data.latest.date) : null;
      const year = date ? date.getFullYear() : new Date().getFullYear();
      return {
        label: "Verifică pe BNR.ro",
        url: `https://www.bnr.ro/Cursul-de-schimb-3544.aspx`,
        hint: `Curs oficial publicat zilnic ora 13:00${date ? ` · cere arhivat ${year}` : ""}`,
      };
    }

    case "imf": {
      // DataMapper country profile (renders the indicator chart for that country).
      const country = data.country || ROU;
      return {
        label: "Verifică pe IMF DataMapper",
        url: `https://www.imf.org/external/datamapper/profile/${country}`,
        hint: "Profil țară IMF (toate indicatorii + chart interactiv)",
      };
    }

    case "worldbank": {
      const country = data.country || ROU;
      // World Bank country page lists all indicators; specific indicator page is even better.
      const ind = data.metric === "manufacturing_share_gdp" ? "NV.IND.MANF.ZS"
        : data.metric === "exports_share_gdp" ? "NE.EXP.GNFS.ZS"
        : data.metric === "fdi_share_gdp" ? "BX.KLT.DINV.WD.GD.ZS"
        : null;
      return {
        label: "Verifică pe World Bank",
        url: ind
          ? `https://data.worldbank.org/indicator/${ind}?locations=${country}`
          : `https://data.worldbank.org/country/${country.toLowerCase()}`,
        hint: "Date oficiale World Bank Open Data",
      };
    }

    case "usaspending": {
      // Pre-filtered search for awards with recipient location = Romania
      const filters = encodeURIComponent(JSON.stringify({
        recipient_locations: [{ country: "ROU" }],
        time_period: [{ start_date: `${new Date().getFullYear() - 1}-10-01`, end_date: `${new Date().getFullYear()}-09-30` }],
      }));
      return {
        label: "Verifică pe USASpending.gov",
        url: `https://www.usaspending.gov/search/?hash=${filters}`,
        hint: "Awards către recipienți din România, an fiscal curent",
      };
    }

    case "sam": {
      // If we have a specific notice ID in metadata, link directly to that opp.
      const meta = data.metadata ? (typeof data.metadata === "string" ? safeParse(data.metadata) : data.metadata) : null;
      const noticeId = meta?.ref || data.ref;
      if (noticeId) {
        return {
          label: "Vezi notice pe SAM.gov",
          url: `https://sam.gov/opp/${noticeId}/view`,
          hint: "Pagină oficială oportunitate federală SUA",
        };
      }
      return {
        label: "Caută pe SAM.gov",
        url: `https://sam.gov/search/?index=opp&page=1&pageSize=25&sort=-modifiedDate&sfm%5Bstatus%5D%5Bis_active%5D=true`,
        hint: "Toate licitațiile/awards-urile federale SUA active",
      };
    }

    case "ted": {
      // TED Europa search filtered to recent procurement notices, RO if applicable.
      const country = data.country === ROU ? "RO" : "";
      return {
        label: "Verifică pe TED Europa",
        url: `https://ted.europa.eu/en/search/result?ntyp=7${country ? `&place-of-performance=${country}` : ""}`,
        hint: "Toate licitațiile UE peste pragul european, ultimele 30 zile",
      };
    }

    case "eurostat": {
      // Eurostat doesn't have great deep links to specific tables; link to the
      // Industrial production database (most common metric we use).
      const dataset = data.metric === "industry_production_idx" ? "sts_inpr_m" : null;
      return {
        label: "Verifică pe Eurostat",
        url: dataset
          ? `https://ec.europa.eu/eurostat/databrowser/view/${dataset}/default/table?lang=en`
          : "https://ec.europa.eu/eurostat/data/database",
        hint: "Statistici oficiale UE — tabel interactiv cu export CSV/Excel",
      };
    }

    case "ecb": {
      return {
        label: "Verifică pe ECB",
        url: "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html",
        hint: "Cursuri de referință zona euro publicate zilnic",
      };
    }

    case "anaf": {
      // anaf.ro/InfoCUI returns 403 to non-browser clients and the official
      // search is form-based. demoanaf.ro is a public read-only viewer over
      // the same ANAF dataset (it's the source our collector scrapes), with
      // stable per-CUI URLs that work for journalists in any browser.
      const cui = data.topCompany?.cui || data.cui;
      if (cui) {
        return {
          label: `Verifică firma pe ANAF (CUI ${cui})`,
          url: `https://demoanaf.ro/${cui}/dosare-fiscale`,
          hint: "Bilanțuri + dosare fiscale (oglindă publică ANAF, datele oficiale)",
        };
      }
      return {
        label: "Caută pe ANAF (demoanaf.ro)",
        url: "https://demoanaf.ro/",
        hint: "Tastă CUI pentru a deschide bilanțul depus oficial",
      };
    }

    case "portal_just": {
      // portal.just.ro doesn't expose stable deep links — provide search entry.
      return {
        label: "Caută pe portal.just.ro",
        url: "https://portal.just.ro/SitePages/dosare.aspx",
        hint: "Caută după nume parte sau CUI; toate dosarele sunt publice",
      };
    }

    case "dod_contracts": {
      return {
        label: "Verifică pe DoD",
        url: "https://www.defense.gov/News/Contracts/",
        hint: "Anunțuri zilnice contracte Department of Defense > $7,5M",
      };
    }

    case "nspa": {
      return {
        label: "Verifică pe NSPA",
        url: "https://eportal.nspa.nato.int/AC135Public/scripts/UNCLogon.asp",
        hint: "Portal oficial NATO Support and Procurement Agency",
      };
    }

    case "un_comtrade": {
      const country = data.year ? `&Period=${data.year}` : "";
      return {
        label: "Verifică pe UN Comtrade",
        url: `https://comtradeplus.un.org/TradeFlow?Frequency=A&Flows=X,M&Reporters=642&Partners=0${country}`,
        hint: "Reporter ROU, agregat la nivel world (cmdCode TOTAL)",
      };
    }

    case "github": {
      return {
        label: "Caută pe GitHub",
        url: "https://github.com/search/advanced",
        hint: "Caută utilizatori cu location filter",
      };
    }

    case "cordis": {
      return {
        label: "Verifică pe CORDIS",
        url: "https://cordis.europa.eu/projects?q=contenttype%3D%27project%27%20AND%20%2Fproject%2Frelations%2Fassociations%2FrelatedCountry%2Fcountry%2Fid%3D%27ROU%27",
        hint: "Proiecte Horizon Europe / H2020 cu participare RO",
      };
    }

    case "date_gov_ro": {
      return {
        label: "Verifică pe date.gov.ro",
        url: "https://data.gov.ro/dataset",
        hint: "Catalog dataset-uri guvernamentale RO",
      };
    }

    default:
      return null;
  }
}

/**
 * Build a Google search URL for cross-source verification. Restricts to
 * authoritative .gov / .eu domains plus known data sources to avoid SEO spam.
 */
export function buildCrossCheckUrl(insight: Insight): SourceLink {
  // Strip diacritics + parentheticals from title for a cleaner search.
  const cleanTitle = insight.title
    .replace(/\([^)]*\)/g, "")
    .replace(/[—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);

  const restrictedSites = [
    "site:.gov",
    "site:.eu",
    "site:bnr.ro",
    "site:imf.org",
    "site:worldbank.org",
    "site:europa.eu",
    "site:anaf.ro",
    "site:insse.ro",
  ].join(" OR ");

  const query = `"${cleanTitle}" (${restrictedSites})`;
  return {
    label: "Cross-check (Google)",
    url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    hint: "Caută cifra pe site-uri .gov / .eu / instituții oficiale (filtru SEO spam)",
  };
}

function safeParse(s: string): any {
  try { return JSON.parse(s); } catch { return null; }
}
