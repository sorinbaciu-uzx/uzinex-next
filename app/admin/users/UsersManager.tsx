"use client";

import { useState } from "react";

type User = {
  id: string;
  email: string;
  name: string;
  company: string | null;
  phone: string | null;
  active: boolean;
  createdAt: string;
};

export function UsersManager({ initialUsers }: { initialUsers: User[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [showNew, setShowNew] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [passwordId, setPasswordId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  // form state for create / edit
  const [form, setForm] = useState({
    email: "",
    name: "",
    company: "",
    phone: "",
    password: "",
  });

  function resetForm() {
    setForm({ email: "", name: "", company: "", phone: "", password: "" });
    setError("");
  }

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error || "Eroare");
      return;
    }
    setUsers((u) => [json.user, ...u]);
    resetForm();
    setShowNew(false);
  }

  async function saveEdit(id: string, e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        phone: form.phone,
      }),
    });
    const json = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(json.error || "Eroare");
      return;
    }
    setUsers((us) => us.map((u) => (u.id === id ? { ...u, ...json.user } : u)));
    setEditId(null);
    resetForm();
  }

  async function setPassword(id: string, e: React.FormEvent) {
    e.preventDefault();
    if (form.password.length < 8) {
      setError("Parola trebuie să aibă minim 8 caractere");
      return;
    }
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: form.password }),
    });
    setBusy(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Eroare");
      return;
    }
    setPasswordId(null);
    resetForm();
    alert("Parolă schimbată. Sesiunile active ale clientului au fost invalidate.");
  }

  async function toggleActive(u: User) {
    const res = await fetch(`/api/admin/users/${u.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !u.active }),
    });
    if (res.ok) {
      setUsers((us) =>
        us.map((x) => (x.id === u.id ? { ...x, active: !x.active } : x))
      );
    }
  }

  async function remove(u: User) {
    if (
      !confirm(
        `Șterge contul "${u.name}" (${u.email})? Această acțiune nu poate fi anulată.`
      )
    )
      return;
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    if (res.ok) setUsers((us) => us.filter((x) => x.id !== u.id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-ink-500">
          {users.length} {users.length === 1 ? "cont" : "conturi"}
        </div>
        <button
          onClick={() => {
            setShowNew(!showNew);
            setEditId(null);
            setPasswordId(null);
            resetForm();
          }}
          className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-5 py-2 text-sm font-medium transition"
        >
          {showNew ? "Anulează" : "+ Cont nou"}
        </button>
      </div>

      {showNew && (
        <form
          onSubmit={createUser}
          className="bg-white border hairline p-6 space-y-4"
        >
          <h3 className="serif text-lg text-ink-900">Cont client nou</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nume complet *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Field label="Companie" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
            <Field label="Telefon" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <div className="md:col-span-2">
              <Field
                label="Parolă inițială * (min 8 caractere)"
                type="text"
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
                required
                help="Comunică-o clientului prin canal sigur. Va putea fi schimbată ulterior."
              />
            </div>
          </div>
          {error && (
            <div className="border border-red-300 bg-red-50 text-red-900 p-2 text-sm">
              {error}
            </div>
          )}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-5 py-2 text-sm disabled:opacity-50"
            >
              {busy ? "Se creează..." : "Creează cont"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowNew(false);
                resetForm();
              }}
              className="border hairline px-5 py-2 text-sm hover:bg-ink-50"
            >
              Anulează
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border hairline divide-y divide-ink-200">
        {users.length === 0 && (
          <div className="p-8 text-center text-ink-400 italic text-sm">
            Niciun cont creat încă. Apasă &quot;+ Cont nou&quot; pentru a crea primul cont client.
          </div>
        )}
        {users.map((u) => {
          const isEditing = editId === u.id;
          const isChangingPwd = passwordId === u.id;
          return (
            <div key={u.id} className="p-5">
              {isEditing ? (
                <form onSubmit={(e) => saveEdit(u.id, e)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Nume" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                    <Field label="Email (readonly)" value={u.email} onChange={() => {}} readOnly />
                    <Field label="Companie" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                    <Field label="Telefon" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={busy}
                      className="bg-uzx-blue text-white px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Salvează
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditId(null);
                        resetForm();
                      }}
                      className="border hairline px-4 py-2 text-sm"
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              ) : isChangingPwd ? (
                <form onSubmit={(e) => setPassword(u.id, e)} className="space-y-3">
                  <div className="text-sm text-ink-600">
                    Schimbă parola pentru <strong>{u.email}</strong>
                  </div>
                  <Field
                    label="Parolă nouă (min 8 caractere)"
                    type="text"
                    value={form.password}
                    onChange={(v) => setForm({ ...form, password: v })}
                    required
                  />
                  {error && <div className="text-sm text-red-600">{error}</div>}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={busy}
                      className="bg-uzx-blue text-white px-4 py-2 text-sm disabled:opacity-50"
                    >
                      Schimbă parola
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPasswordId(null);
                        resetForm();
                      }}
                      className="border hairline px-4 py-2 text-sm"
                    >
                      Anulează
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="serif text-lg text-ink-900">{u.name}</span>
                      {!u.active && (
                        <span className="text-[10px] uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5">
                          Dezactivat
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-ink-500 mt-1">{u.email}</div>
                    <div className="text-xs text-ink-400 mt-1">
                      {u.company && <>{u.company} · </>}
                      {u.phone && <>{u.phone} · </>}
                      creat {new Date(u.createdAt).toLocaleDateString("ro-RO")}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditId(u.id);
                        setPasswordId(null);
                        setShowNew(false);
                        setForm({
                          email: u.email,
                          name: u.name,
                          company: u.company || "",
                          phone: u.phone || "",
                          password: "",
                        });
                        setError("");
                      }}
                      className="text-xs border hairline px-3 py-1.5 hover:bg-ink-50"
                    >
                      Editează
                    </button>
                    <button
                      onClick={() => {
                        setPasswordId(u.id);
                        setEditId(null);
                        setShowNew(false);
                        setForm({ ...form, password: "" });
                        setError("");
                      }}
                      className="text-xs border hairline px-3 py-1.5 hover:bg-ink-50"
                    >
                      Parolă
                    </button>
                    <button
                      onClick={() => toggleActive(u)}
                      className="text-xs border hairline px-3 py-1.5 hover:bg-ink-50"
                    >
                      {u.active ? "Dezactivează" : "Activează"}
                    </button>
                    <button
                      onClick={() => remove(u)}
                      className="text-xs border hairline border-red-200 text-red-600 px-3 py-1.5 hover:bg-red-50"
                    >
                      Șterge
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  readOnly,
  help,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  help?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-ink-500 mb-1.5 font-medium">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        readOnly={readOnly}
        className="w-full border hairline px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue read-only:bg-ink-50 read-only:text-ink-500"
      />
      {help && <span className="block text-[11px] text-ink-400 mt-1">{help}</span>}
    </label>
  );
}
