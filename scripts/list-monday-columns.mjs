// List Monday.com columns on the Leads board — helper to find new column IDs.
// Usage: node scripts/list-monday-columns.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(ROOT, ".env.local");
const env = Object.fromEntries(
  fs
    .readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith("#") && l.includes("="))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

const TOKEN = env.MONDAY_API_TOKEN;
const BOARD = env.MONDAY_BOARD_LEADS;
if (!TOKEN || !BOARD) throw new Error("Missing MONDAY_API_TOKEN or MONDAY_BOARD_LEADS");

const query = `query { boards(ids: ${BOARD}) { columns { id title type settings_str } } }`;
const res = await fetch("https://api.monday.com/v2", {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: TOKEN, "API-Version": "2024-10" },
  body: JSON.stringify({ query }),
});
const json = await res.json();
const cols = json.data?.boards?.[0]?.columns ?? [];
console.log(`Board ${BOARD} — ${cols.length} columns:\n`);
for (const c of cols) {
  console.log(`  ${c.id.padEnd(30)} | ${c.type.padEnd(15)} | ${c.title}`);
}
