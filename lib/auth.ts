import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { prisma } from "./db";

export const SESSION_COOKIE = "uzx_admin";
const SESSION_DAYS = 14;

export async function createSession(): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await prisma.adminSession.create({ data: { token, expiresAt } });
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
  return token;
}

export async function destroySession(): Promise<void> {
  const c = await cookies();
  const token = c.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.adminSession
      .delete({ where: { token } })
      .catch(() => {});
  }
  c.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;
  const c = await cookies();
  const token = c.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    const session = await prisma.adminSession.findUnique({ where: { token } });
    if (!session) return false;
    if (session.expiresAt < new Date()) {
      await prisma.adminSession.delete({ where: { token } }).catch(() => {});
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  // constant-time compare
  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ input.charCodeAt(i);
  }
  return diff === 0;
}
