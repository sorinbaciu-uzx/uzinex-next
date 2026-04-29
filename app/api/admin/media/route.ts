import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import manifest from "@/data/media-manifest.json";

const PAGE_SIZE = 60;

type LibItem = { name: string; url: string; size: number };

export async function GET(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));

  const all = manifest as LibItem[];
  const filtered = q ? all.filter((it) => it.name.toLowerCase().includes(q)) : all;

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const items = filtered.slice(start, start + PAGE_SIZE);

  return NextResponse.json({ items, total, page, pageSize: PAGE_SIZE });
}

export const runtime = "nodejs";
