"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, remember }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Eroare la autentificare");
        setLoading(false);
        return;
      }
      router.push("/cont");
      router.refresh();
    } catch {
      setError("Eroare de rețea. Verifică conexiunea.");
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label
          htmlFor="email"
          className="block text-[11px] uppercase tracking-wider text-ink-500 mb-2 font-medium"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nume@companie.ro"
          className="w-full border hairline px-4 py-3 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
        />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="text-[11px] uppercase tracking-wider text-ink-500 font-medium"
          >
            Parolă
          </label>
          <a
            href="mailto:info@uzinex.ro?subject=Recuperare%20parol%C4%83"
            className="text-[11px] text-uzx-blue hover:underline"
          >
            Am uitat parola
          </a>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border hairline px-4 py-3 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
        />
      </div>
      <label className="flex items-center gap-2 text-xs text-ink-600">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
          className="border hairline w-4 h-4 accent-uzx-blue"
        />
        Ține-mă autentificat 60 de zile
      </label>
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-900 px-3 py-2 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-uzx-blue hover:bg-uzx-blue2 text-white py-3.5 text-sm font-medium transition disabled:opacity-50"
      >
        {loading ? "Se verifică..." : "Intră în cont"}
      </button>
    </form>
  );
}
