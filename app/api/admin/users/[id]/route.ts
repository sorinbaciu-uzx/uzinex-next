import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { isAuthenticated } from "@/lib/auth";
import { hashPassword } from "@/lib/client-auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const data: {
    name?: string;
    company?: string | null;
    phone?: string | null;
    active?: boolean;
    passwordHash?: string;
  } = {};

  if (typeof body.name === "string") data.name = body.name.trim();
  if (typeof body.company === "string") data.company = body.company.trim() || null;
  if (typeof body.phone === "string") data.phone = body.phone.trim() || null;
  if (typeof body.active === "boolean") data.active = body.active;
  if (typeof body.password === "string" && body.password.length >= 8) {
    data.passwordHash = await hashPassword(body.password);
    // also kill existing sessions so new password takes effect
    await prisma.clientSession.deleteMany({ where: { userId: id } });
  }

  const user = await prisma.clientUser.update({
    where: { id },
    data,
    select: {
      id: true,
      email: true,
      name: true,
      company: true,
      phone: true,
      active: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ user });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.clientUser.delete({ where: { id } }).catch(() => {});
  return NextResponse.json({ ok: true });
}
