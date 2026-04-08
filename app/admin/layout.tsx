import Link from "next/link";
import { isAuthenticated } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const pathname = h.get("x-invoke-path") || h.get("next-url") || "";
  // login page renders without auth
  if (pathname.endsWith("/admin/login")) return <>{children}</>;

  const ok = await isAuthenticated();
  if (!ok && !pathname.endsWith("/admin/login")) {
    // middleware also handles this; double-check at server
  }

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <header className="bg-[#082545] text-white border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/admin" className="font-medium tracking-wide">
            UZINEX · admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" target="_blank" className="text-white/70 hover:text-white">
              Vezi siteul ↗
            </Link>
            <form action="/api/admin/logout" method="post">
              <button
                type="submit"
                className="text-white/70 hover:text-white text-sm"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
