/**
 * Monday.com CRM integration
 *
 * Single entry point: `createLead(input)` — decides the correct board based on
 * `intent`, formats column_values per board, and pushes via GraphQL.
 *
 * Env vars required (configured in .env.local + Vercel):
 *   MONDAY_API_TOKEN              — long-lived personal token
 *   MONDAY_BOARD_LEADS            — 5094672978
 *   MONDAY_BOARD_SERVICE          — 5094672984
 *   MONDAY_BOARD_FINANTARE        — 5094672987
 *   MONDAY_BOARD_HR               — 5094672991
 *
 * Board column IDs are hard-coded here because they were created programmatically
 * and their IDs are stable. If a column is renamed in Monday, the ID does NOT change.
 * If a column is DELETED and recreated, update the COLUMNS map below.
 */

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
 * DO NOT edit unless a column was deleted/recreated in Monday UI.
 */
const COLUMNS = {
  leads: {
    status: "color_mm2e2jdv",
    tipCerere: "color_mm2exjx1",
    email: "email_mm2e3s0m",
    phone: "phone_mm2eegcf",
    company: "text_mm2ehtkm",
    message: "long_text_mm2eh7nt",
    sourcePage: "link_mm2ena4g",
    dateReceived: "date_mm2eq7y8",
  },
  service: {
    status: "color_mm2ew446",
    tipInterventie: "color_mm2e5vrf",
    email: "email_mm2e31b2",
    phone: "phone_mm2e4mkn",
    company: "text_mm2em8gj",
    echipament: "text_mm2efgj7",
    locatie: "text_mm2edb08",
    message: "long_text_mm2e6d0z",
    sourcePage: "link_mm2eb1at",
    dateReceived: "date_mm2ery2p",
  },
  finantare: {
    status: "color_mm2e62x6",
    tipFinantare: "color_mm2etr8n",
    email: "email_mm2e12sm",
    phone: "phone_mm2ea20y",
    company: "text_mm2eavk4",
    cui: "text_mm2ex1rp",
    regiune: "text_mm2eqwjf",
    valoare: "numeric_mm2e6nbk",
    message: "long_text_mm2ezyff",
    sourcePage: "link_mm2edt9a",
    dateReceived: "date_mm2eercw",
  },
  hr: {
    status: "color_mm2e55qx",
    tipAplicatie: "color_mm2ej6ht",
    pilon: "color_mm2esjdc",
    email: "email_mm2e9w1n",
    phone: "phone_mm2ex032",
    rolAplicat: "text_mm2etm6j",
    universitate: "text_mm2egssb",
    linkedin: "link_mm2ejy0f",
    message: "long_text_mm2ep8c4",
    sourcePage: "link_mm2e1c9p",
    dateReceived: "date_mm2er00g",
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
    base[c.status] = { label: "New" };
    if (input.extra?.tipCerere) base[c.tipCerere] = { label: input.extra.tipCerere };
    if (input.email) base[c.email] = { email: input.email, text: input.email };
    if (input.phone) base[c.phone] = { phone: input.phone, countryShortName: "RO" };
    if (input.company) base[c.company] = safe(input.company);
    if (input.message) base[c.message] = safe(input.message);
    if (input.sourceUrl) base[c.sourcePage] = url(input.sourceUrl);
    base[c.dateReceived] = { date: today };
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
