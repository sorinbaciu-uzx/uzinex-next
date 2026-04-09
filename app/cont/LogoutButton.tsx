"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      disabled={busy}
      className="text-xs uppercase tracking-wider text-ink-500 hover:text-red-600 border hairline px-4 py-2 bg-white hover:border-red-300 transition disabled:opacity-50"
    >
      {busy ? "..." : "Deconectare →"}
    </button>
  );
}
