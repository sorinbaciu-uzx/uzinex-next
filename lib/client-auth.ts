import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
import { CLIENT_COOKIE } from "./session-cookie";

export { CLIENT_COOKIE };

const SESSION_DAYS = 30;
const REMEMBER_DAYS = 60;

export async function hashPassword(pwd: string): Promise<string> {
  return bcrypt.hash(pwd, 10);
}
export async function verifyPassword(
  pwd: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(pwd, hash);
}

export async function createClientSession(
  userId: string,
  remember = false
): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const days = remember ? REMEMBER_DAYS : SESSION_DAYS;
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  await prisma.clientSession.create({ data: { token, userId, expiresAt } });
  const c = await cookies();
  c.set(CLIENT_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export async function destroyClientSession(): Promise<void> {
  const c = await cookies();
  const token = c.get(CLIENT_COOKIE)?.value;
  if (token) {
    await prisma.clientSession
      .delete({ where: { token } })
      .catch(() => {});
  }
  c.delete(CLIENT_COOKIE);
}

export type CurrentUser = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  role: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (!process.env.DATABASE_URL) return null;
  const c = await cookies();
  const token = c.get(CLIENT_COOKIE)?.value;
  if (!token) return null;
  try {
    const session = await prisma.clientSession.findUnique({
      where: { token },
      include: { user: true },
    });
    if (!session || !session.user.active) return null;
    if (session.expiresAt < new Date()) {
      await prisma.clientSession
        .delete({ where: { token } })
        .catch(() => {});
      return null;
    }
    const u = session.user;
    return {
      id: u.id,
      email: u.email,
      name: u.name,
      company: u.company,
      phone: u.phone,
      role: u.role,
    };
  } catch {
    return null;
  }
}
