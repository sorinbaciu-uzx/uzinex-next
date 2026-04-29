import { NextResponse } from "next/server";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { isAuthenticated } from "@/lib/auth";

const MEDIA_DIR = path.join(process.cwd(), "public", "images", "produse");
const IMAGE_EXT = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".avif"]);
const PAGE_SIZE = 60;

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  let files: string[];
  try {
    files = await readdir(MEDIA_DIR);
  } catch {
    return NextResponse.json({ items: [], total: 0, page, pageSize: PAGE_SIZE });
  }

  const filtered = files
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .filter((f) => (q ? f.toLowerCase().includes(q) : true))
    .sort((a, b) => a.localeCompare(b));

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const slice = filtered.slice(start, start + PAGE_SIZE);

  const items = await Promise.all(
    slice.map(async (name) => {
      try {
        const s = await stat(path.join(MEDIA_DIR, name));
        return { name, url: `/images/produse/${name}`, size: s.size };
      } catch {
        return { name, url: `/images/produse/${name}`, size: 0 };
      }
    })
  );

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

export const runtime = "nodejs";
