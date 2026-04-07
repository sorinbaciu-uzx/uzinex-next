import Link from "next/link";
import { prisma } from "@/lib/db";
import { CONTENT_KEYS, KEY_LABELS } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let existing: { key: string; updatedAt: Date }[] = [];
  let dbError: string | null = null;
  try {
    existing = await prisma.contentBlock.findMany({
      select: { key: true, updatedAt: true },
    });
  } catch (e) {
    dbError = (e as Error).message;
  }
  const map = new Map(existing.map((r) => [r.key, r.updatedAt]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="serif text-3xl text-ink-900">Conținut site</h1>
        <p className="text-ink-500 mt-2">
          Editează blocurile de conținut. Modificările se publică imediat.
        </p>
      </div>

      {dbError && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-4 text-sm">
          Eroare DB: {dbError}
          <div className="mt-2 text-xs">
            Verifică <code>DATABASE_URL</code> în Vercel \u2192 Project Settings \u2192
            Environment Variables, apoi rulează{" "}
            <code>npx prisma db push</code> și <code>npm run db:seed</code>.
          </div>
        </div>
      )}

      <div>
        <h2 className="serif text-xl text-ink-900 mb-3">Administrare</h2>
        <Link
          href="/admin/users"
          className="block bg-white border hairline p-5 hover:bg-ink-50 transition group"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono">
                users
              </div>
              <div className="serif text-lg text-ink-900 mt-1">
                Conturi clienți
              </div>
              <div className="text-xs text-ink-500 mt-1">
                Creează, modifică și dezactivează conturile care se pot
                autentifica pe site.
              </div>
            </div>
            <span className="text-2xl text-ink-300 group-hover:text-uzx-blue transition">
              →
            </span>
          </div>
        </Link>
      </div>

      <h2 className="serif text-xl text-ink-900 !mt-10">Conținut editorial</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
        {CONTENT_KEYS.map((key) => {
          const updated = map.get(key);
          return (
            <Link
              key={key}
              href={`/admin/content/${key}`}
              className="bg-white p-5 hover:bg-ink-50 transition flex items-center justify-between group"
            >
              <div>
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono">
                  {key}
                </div>
                <div className="serif text-lg text-ink-900 mt-1">
                  {KEY_LABELS[key] || key}
                </div>
                <div className="text-xs text-ink-500 mt-1">
                  {updated
                    ? `Actualizat ${new Date(updated).toLocaleString("ro-RO")}`
                    : "Nu a fost editat — folosește valorile implicite din cod"}
                </div>
              </div>
              <span className="text-2xl text-ink-300 group-hover:text-uzx-blue transition">
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
