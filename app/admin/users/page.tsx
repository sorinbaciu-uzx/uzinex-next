import Link from "next/link";
import { prisma } from "@/lib/db";
import { UsersManager } from "./UsersManager";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  let users: {
    id: string;
    email: string;
    name: string;
    company: string | null;
    phone: string | null;
    active: boolean;
    createdAt: Date;
  }[] = [];
  let dbError: string | null = null;
  try {
    users = await prisma.clientUser.findMany({
      orderBy: { createdAt: "desc" },
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
  } catch (e) {
    dbError = (e as Error).message;
  }

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-uzx-blue text-sm">
          ← Înapoi la panoul de administrare
        </Link>
        <h1 className="serif text-3xl text-ink-900 mt-3">
          Conturi clienți
        </h1>
        <p className="text-ink-500 text-sm mt-1">
          Creează, modifică și dezactivează conturile clienților care se pot
          autentifica pe site la <code>/autentificare</code>.
        </p>
      </div>
      {dbError && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-3 text-sm">
          {dbError}
        </div>
      )}
      <UsersManager
        initialUsers={users.map((u) => ({
          ...u,
          createdAt: u.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
