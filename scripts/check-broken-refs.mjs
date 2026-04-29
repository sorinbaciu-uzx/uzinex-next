import { readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";

const status = execSync("git status --porcelain public/images/produse", { encoding: "utf8" });
const deleted = [];
for (const line of status.split(/\r?\n/)) {
  if (line.trim() && line.slice(0, 2).includes("D")) {
    deleted.push(path.basename(line.slice(3).trim()));
  }
}

const produse = readFileSync("data/produse.json", "utf8");
const enrich = readFileSync("data/product-enrichments.json", "utf8");

let stale = 0;
for (const d of deleted) {
  const needle = `/images/produse/${d}`;
  if (produse.includes(needle) || enrich.includes(needle)) {
    stale++;
    console.log("STILL referenced:", d);
  }
}
console.log(`Total stale refs remaining: ${stale}`);
