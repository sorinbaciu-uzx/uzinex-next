import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createClientSession, hashPassword } from "@/lib/client-auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const acceptedTerms = !!body?.acceptedTerms;

  if (!name || name.length < 2) {
    return NextResponse.json({ error: "Numele este obligatoriu" }, { status: 400 });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email invalid" }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Parola trebuie să aibă minim 8 caractere" },
      { status: 400 }
    );
  }
  if (!acceptedTerms) {
    return NextResponse.json(
      { error: "Trebuie să accepți Termenii și Politica de confidențialitate" },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.clientUser.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Există deja un cont cu acest email. Încearcă să te autentifici." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.clientUser.create({
      data: {
        email,
        name,
        company: company || null,
        phone: phone || null,
        passwordHash,
        active: true,
      },
    });

    await createClientSession(user.id, false);

    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    console.error("[register] error:", e);
    return NextResponse.json(
      { error: "Eroare de server. Încearcă din nou." },
      { status: 500 }
    );
  }
}
