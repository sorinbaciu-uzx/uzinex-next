/**
 * Monday.com CRM integration
 *
 * Single entry point: `createLead(input)` — decides the correct board based on
 * `intent`, formats column_values per board, and pushes via GraphQL.
 *
 * Env vars required (configured in .env.local + Vercel):
 *   MONDAY_API_TOKEN              — long-lived personal token
 *   MONDAY_BOARD_LEADS            — 5092118529 (board YWRAQ portat din WordPress)
 *   MONDAY_BOARD_SERVICE          — 5094675030
 *   MONDAY_BOARD_FINANTARE        — 5094675033
 *   MONDAY_BOARD_HR               — 5094675039
 *
 * Board column IDs are hard-coded here because they were created programmatically
 * and their IDs are stable. If a column is renamed in Monday, the ID does NOT change.
 * If a column is DELETED and recreated, update the COLUMNS map below.
 */

import { SITE_URL } from "./site";
import type { AnafData } from "./anaf";

const MONDAY_API_URL = "https://api.monday.com/v2";

type Intent = "leads" | "service" | "finantare" | "hr";

export type LeadInput = {
  intent: Intent;
  /** Item name on the board (usually candidate/person/company short label) */
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  /** Full URL of the page where the lead originated */
  sourceUrl?: string;
  /** Free-form subject line / intent tag from the CTA (e.g. "Oferta echipament") */
  subject?: string;
  /** Extra structured fields that map to board-specific columns */
  extra?: {
    cui?: string;
    regiune?: string;
    valoareInvestitie?: number;
    echipament?: string;
    locatie?: string;
    tipInterventie?: string;
    tipFinantare?: string;
    tipAplicatie?: string;
    pilon?: string;
    rolAplicat?: string;
    universitate?: string;
    linkedin?: string;
    tipCerere?: string;
    /** Products in the quote cart — used by `leads` intent to build the Produs column */
    products?: Array<{ sku?: string; name: string; slug: string; qty?: number }>;
    /** ANAF enrichment — fetched server-side in /api/lead before createLead */
    anaf?: AnafData;
  };
};

/** Which board gets each intent (trim in case env var has trailing newline) */
const BOARD_IDS: Record<Intent, string | undefined> = {
  leads: process.env.MONDAY_BOARD_LEADS?.trim(),
  service: process.env.MONDAY_BOARD_SERVICE?.trim(),
  finantare: process.env.MONDAY_BOARD_FINANTARE?.trim(),
  hr: process.env.MONDAY_BOARD_HR?.trim(),
};

/**
 * Column ID map per board, generated when boards were created.
 * Workspace: Website Uzinex (CRM) — 6171291
 * DO NOT edit unless a column was deleted/recreated in Monday UI.
 */
const COLUMNS = {
  leads: {
    // Board 5092118529 — YWRAQ (portat din WordPress)
    company: "lead_company",
    cui: "text_mm1s607t",
    productDisplay: "text",
    email: "lead_email",
    phone: "lead_phone",
    seap: "text_mm1q870v",
    message: "long_text_mm1q2mrq",
    manufacturerLink: "long_text_mm1qay42",
    // ANAF enrichment
    county: "text_mm2kbwb8",
    locality: "text_mm2kwwme",
    caenCode: "text_mm2k2td3",
    caenDescription: "text_mm2kvjah",
    vatPayer: "boolean_mm2kqyn4",
    companyStatus: "color_mm2k8sz6",
    foundingDate: "date_mm2kd7da",
    turnover: "numeric_mm2kscqx",
    netProfit: "numeric_mm2k3b03",
    employees: "numeric_mm2krskv",
  },
  service: {
    // Board 5094675030
    status: "color_mm2ey1t",
    tipInterventie: "color_mm2ehaq1",
    email: "email_mm2ebq3j",
    phone: "phone_mm2e80ed",
    company: "text_mm2ek9we",
    echipament: "text_mm2egz3d",
    locatie: "text_mm2ebkp5",
    message: "long_text_mm2exdgg",
    sourcePage: "link_mm2ec0gb",
    dateReceived: "date_mm2edax6",
  },
  finantare: {
    // Board 5094675033
    status: "color_mm2emv08",
    tipFinantare: "color_mm2e4a2q",
    email: "email_mm2e2208",
    phone: "phone_mm2et3ww",
    company: "text_mm2ebkaj",
    cui: "text_mm2ey102",
    regiune: "text_mm2e3mc7",
    valoare: "numeric_mm2enx05",
    message: "long_text_mm2ev30a",
    sourcePage: "link_mm2e76kj",
    dateReceived: "date_mm2erry",
  },
  hr: {
    // Board 5094675039
    status: "color_mm2ebae0",
    tipAplicatie: "color_mm2ee35a",
    pilon: "color_mm2emwes",
    email: "email_mm2et3ay",
    phone: "phone_mm2e8typ",
    rolAplicat: "text_mm2emxqw",
    universitate: "text_mm2efc6p",
    linkedin: "link_mm2exrdk",
    message: "long_text_mm2eyafe",
    sourcePage: "link_mm2edm6j",
    dateReceived: "date_mm2eydd9",
  },
} as const;

/** Build the column_values payload for a given intent */
function buildColumnValues(input: LeadInput): Record<string, unknown> {
  const today = new Date().toISOString().slice(0, 10);
  const base: Record<string, unknown> = {};

  const safe = (s?: string) => (s ? s.trim().slice(0, 2000) : undefined);
  const url = (s?: string) => (s ? { url: s, text: s.replace(/^https?:\/\//, "").slice(0, 50) } : undefined);

  if (input.intent === "leads") {
    const c = COLUMNS.leads;
    if (input.company) base[c.company] = safe(input.company);
    if (input.extra?.cui) base[c.cui] = safe(input.extra.cui);
    // Produs: primul produs cu link + (+N alte produse) daca sunt mai multe.
    // Lista completa ramane in coloana Mesaj.
    const products = input.extra?.products?.filter((p) => p.slug);
    if (products && products.length) {
      const first = products[0];
      const firstLine = `${first.name}\n${SITE_URL}/produs/${first.slug}`;
      const rest = products.length - 1;
      base[c.productDisplay] = rest > 0 ? `${firstLine}\n(+${rest} alte produse)` : firstLine;
    } else if (input.subject) {
      base[c.productDisplay] = safe(input.subject);
    }
    if (input.email) base[c.email] = { email: input.email, text: input.email };
    if (input.phone) base[c.phone] = { phone: input.phone, countryShortName: "RO" };
    // SEAP derived from tipCerere (se poate extinde cu un flag dedicat mai tarziu)
    base[c.seap] = input.extra?.tipCerere === "Licitatie SEAP/SICAP" ? "Da" : "Nu";
    if (input.message) base[c.message] = safe(input.message);
    // ANAF enrichment — populated server-side in /api/lead when CUI is present
    const anaf = input.extra?.anaf;
    if (anaf) {
      if (anaf.county) base[c.county] = safe(anaf.county);
      if (anaf.locality) base[c.locality] = safe(anaf.locality);
      if (anaf.caenCode) base[c.caenCode] = safe(anaf.caenCode);
      if (anaf.caenDescription) base[c.caenDescription] = safe(anaf.caenDescription);
      if (typeof anaf.vatActive === "boolean") base[c.vatPayer] = { checked: anaf.vatActive ? "true" : "false" };
      if (anaf.companyStatus) base[c.companyStatus] = { label: anaf.companyStatus };
      if (anaf.registrationDate) base[c.foundingDate] = { date: anaf.registrationDate };
      if (typeof anaf.turnoverRon === "number") base[c.turnover] = anaf.turnoverRon;
      if (typeof anaf.netProfitRon === "number") base[c.netProfit] = anaf.netProfitRon;
      if (typeof anaf.avgEmployees === "number") base[c.employees] = anaf.avgEmployees;
    }
  } else if (input.intent === "service") {
    const c = COLUMNS.service;
    base[c.status] = { label: "New" };
    if (input.extra?.tipInterventie) base[c.tipInterventie] = { label: input.extra.tipInterventie };
    if (input.email) base[c.email] = { email: input.email, text: input.email };
    if (input.phone) base[c.phone] = { phone: input.phone, countryShortName: "RO" };
    if (input.company) base[c.company] = safe(input.company);
    if (input.extra?.echipament) base[c.echipament] = safe(input.extra.echipament);
    if (input.extra?.locatie) base[c.locatie] = safe(input.extra.locatie);
    if (input.message) base[c.message] = safe(input.message);
    if (input.sourceUrl) base[c.sourcePage] = url(input.sourceUrl);
    base[c.dateReceived] = { date: today };
  } else if (input.intent === "finantare") {
    const c = COLUMNS.finantare;
    base[c.status] = { label: "New" };
    if (input.extra?.tipFinantare) base[c.tipFinantare] = { label: input.extra.tipFinantare };
    if (input.email) base[c.email] = { email: input.email, text: input.email };
    if (input.phone) base[c.phone] = { phone: input.phone, countryShortName: "RO" };
    if (input.company) base[c.company] = safe(input.company);
    if (input.extra?.cui) base[c.cui] = safe(input.extra.cui);
    if (input.extra?.regiune) base[c.regiune] = safe(input.extra.regiune);
    if (typeof input.extra?.valoareInvestitie === "number") base[c.valoare] = input.extra.valoareInvestitie;
    if (input.message) base[c.message] = safe(input.message);
    if (input.sourceUrl) base[c.sourcePage] = url(input.sourceUrl);
    base[c.dateReceived] = { date: today };
  } else if (input.intent === "hr") {
    const c = COLUMNS.hr;
    base[c.status] = { label: "New" };
    if (input.extra?.tipAplicatie) base[c.tipAplicatie] = { label: input.extra.tipAplicatie };
    if (input.extra?.pilon) base[c.pilon] = { label: input.extra.pilon };
    if (input.email) base[c.email] = { email: input.email, text: input.email };
    if (input.phone) base[c.phone] = { phone: input.phone, countryShortName: "RO" };
    if (input.extra?.rolAplicat) base[c.rolAplicat] = safe(input.extra.rolAplicat);
    if (input.extra?.universitate) base[c.universitate] = safe(input.extra.universitate);
    if (input.extra?.linkedin) base[c.linkedin] = url(input.extra.linkedin);
    if (input.message) base[c.message] = safe(input.message);
    if (input.sourceUrl) base[c.sourcePage] = url(input.sourceUrl);
    base[c.dateReceived] = { date: today };
  }

  return base;
}

/**
 * Create an item on the correct Monday board.
 * Returns the item id on success, throws on error (caller handles fallback).
 */
export async function createLead(input: LeadInput): Promise<{ id: string; board: string }> {
  const token = process.env.MONDAY_API_TOKEN?.trim();
  if (!token) throw new Error("MONDAY_API_TOKEN not configured");

  const boardId = BOARD_IDS[input.intent];
  if (!boardId) throw new Error(`Board ID missing for intent=${input.intent}`);

  const itemName = (input.name || input.email || "Lead fara nume").trim().slice(0, 255);
  const columnValues = buildColumnValues(input);

  const query = `
    mutation CreateLead($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
      create_item(
        board_id: $boardId,
        item_name: $itemName,
        column_values: $columnValues,
        create_labels_if_missing: true
      ) {
        id
      }
    }
  `;

  const res = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      "API-Version": "2024-10",
    },
    body: JSON.stringify({
      query,
      variables: {
        boardId,
        itemName,
        columnValues: JSON.stringify(columnValues),
      },
    }),
  });

  const json = (await res.json()) as {
    data?: { create_item?: { id: string } };
    errors?: { message: string }[];
  };

  if (json.errors?.length) {
    throw new Error(`Monday API error: ${json.errors.map((e) => e.message).join("; ")}`);
  }
  const id = json.data?.create_item?.id;
  if (!id) throw new Error("Monday returned no item id");

  return { id, board: boardId };
}
