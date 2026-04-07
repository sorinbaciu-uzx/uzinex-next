import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClientSession, verifyPassword } from "@/lib/client-auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const remember = !!body?.remember;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email și parolă obligatorii" },
      { status: 400 }
    );
  }

  // constant-ish delay to slow brute force
  const delay = new Promise((r) => setTimeout(r, 300));

  try {
    const user = await prisma.clientUser.findUnique({ where: { email } });
    await delay;
    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Email sau parolă incorecte" },
        { status: 401 }
      );
    }
    const ok = await verifyPassword(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json(
        { error: "Email sau parolă incorecte" },
        { status: 401 }
      );
    }
    await createClientSession(user.id, remember);
    return NextResponse.json({
      ok: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        company: user.company,
      },
    });
  } catch (e) {
    console.error("[login] error:", e);
    return NextResponse.json(
      { error: "Eroare de server. Încearcă din nou." },
      { status: 500 }
    );
  }
}
