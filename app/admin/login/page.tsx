"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Parolă incorectă");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm bg-white border hairline p-8 space-y-5"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-2">
            Uzinex · Admin
          </div>
          <h1 className="serif text-2xl text-ink-900">Autentificare</h1>
        </div>
        <div>
          <label className="text-xs uppercase tracking-wider text-ink-500 block mb-2">
            Parolă
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border hairline px-4 py-3 text-ink-900 focus:outline-none focus:border-uzx-blue"
            autoFocus
            required
          />
        </div>
        {error && <div className="text-sm text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-uzx-blue hover:bg-uzx-blue2 text-white py-3 text-sm font-medium transition disabled:opacity-50"
        >
          {loading ? "Se verifică..." : "Intră în admin"}
        </button>
      </form>
    </div>
  );
}
