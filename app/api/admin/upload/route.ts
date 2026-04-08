import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { isAuthenticated } from "@/lib/auth";

// Max 8 MB per upload
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "BLOB_READ_WRITE_TOKEN lipsește. Creează un Blob Store din Vercel → Storage → Blob și conectează-l la proiect.",
      },
      { status: 500 }
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Fișier prea mare (max ${MAX_BYTES / 1024 / 1024} MB)` },
      { status: 413 }
    );
  }
  if (!ALLOWED.has(file.type)) {
    return NextResponse.json(
      { error: `Tip neacceptat: ${file.type}` },
      { status: 415 }
    );
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-");
  const path = `uploads/${Date.now()}-${safeName}`;

  try {
    const blob = await put(path, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: file.type,
      size: file.size,
    });
  } catch (err) {
    console.error("[upload] put() failed:", err);
    return NextResponse.json(
      { error: (err as Error).message || "upload failed" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
export const maxDuration = 60;
