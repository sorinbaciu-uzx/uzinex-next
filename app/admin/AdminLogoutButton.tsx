"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="text-white/70 hover:text-white text-sm disabled:opacity-50"
    >
      {busy ? "..." : "Logout"}
    </button>
  );
}
