import { NextResponse } from "next/server";
import { checkPassword, createSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "missing" }, { status: 400 });
  }
  if (!checkPassword(password)) {
    // small delay to slow brute force
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({ error: "invalid" }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
