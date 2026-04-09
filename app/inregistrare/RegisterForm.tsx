"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    acceptedTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Eroare la crearea contului");
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
      <Field
        label="Nume complet *"
        value={form.name}
        onChange={(v) => set("name", v)}
        autoComplete="name"
        required
      />
      <Field
        label="Email *"
        type="email"
        value={form.email}
        onChange={(v) => set("email", v)}
        autoComplete="email"
        placeholder="nume@companie.ro"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field
          label="Companie"
          value={form.company}
          onChange={(v) => set("company", v)}
          autoComplete="organization"
        />
        <Field
          label="Telefon"
          type="tel"
          value={form.phone}
          onChange={(v) => set("phone", v)}
          autoComplete="tel"
        />
      </div>
      <Field
        label="Parolă * (min 8 caractere)"
        type="password"
        value={form.password}
        onChange={(v) => set("password", v)}
        autoComplete="new-password"
        required
      />
      <label className="flex items-start gap-2 text-xs text-ink-600">
        <input
          type="checkbox"
          checked={form.acceptedTerms}
          onChange={(e) => set("acceptedTerms", e.target.checked)}
          className="border hairline w-4 h-4 mt-0.5 accent-uzx-blue"
          required
        />
        <span>
          Sunt de acord cu{" "}
          <a
            href="/termeni-conditii"
            target="_blank"
            className="text-uzx-blue underline"
          >
            Termenii și condițiile
          </a>{" "}
          și{" "}
          <a
            href="/politica-confidentialitate"
            target="_blank"
            className="text-uzx-blue underline"
          >
            Politica de confidențialitate
          </a>
          .
        </span>
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
        {loading ? "Se creează contul..." : "Creează contul"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-ink-500 mb-2 font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full border hairline px-4 py-3 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
      />
    </label>
  );
}
