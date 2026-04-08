"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ContentEditor({
  contentKey,
  initial,
  defaultValue,
}: {
  contentKey: string;
  initial: unknown;
  defaultValue: unknown;
}) {
  const router = useRouter();
  const [text, setText] = useState(JSON.stringify(initial, null, 2));
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function save() {
    setError("");
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      setError("JSON invalid: " + (e as Error).message);
      setStatus("error");
      return;
    }
    setStatus("saving");
    const res = await fetch(`/api/admin/content/${contentKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      setError("Eroare la salvare (" + res.status + ")");
      setStatus("error");
      return;
    }
    setStatus("saved");
    router.refresh();
    setTimeout(() => setStatus("idle"), 2000);
  }

  function reset() {
    if (!confirm("Resetezi la valorile implicite din cod?")) return;
    setText(JSON.stringify(defaultValue, null, 2));
  }

  function format() {
    try {
      setText(JSON.stringify(JSON.parse(text), null, 2));
      setError("");
    } catch (e) {
      setError("JSON invalid: " + (e as Error).message);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={save}
          disabled={status === "saving"}
          className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-2.5 text-sm font-medium transition disabled:opacity-50"
        >
          {status === "saving" ? "Se salvează..." : "Salvează"}
        </button>
        <button
          onClick={format}
          className="border hairline px-4 py-2.5 text-sm hover:bg-ink-50"
        >
          Format JSON
        </button>
        <button
          onClick={reset}
          className="border hairline px-4 py-2.5 text-sm hover:bg-ink-50"
        >
          Resetează la valorile din cod
        </button>
        {status === "saved" && (
          <span className="text-sm text-green-700">✓ Salvat</span>
        )}
      </div>
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-3 text-sm">
          {error}
        </div>
      )}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        spellCheck={false}
        className="w-full font-mono text-sm bg-white border hairline p-4 focus:outline-none focus:border-uzx-blue"
        style={{ minHeight: "60vh" }}
      />
      <p className="text-xs text-ink-500">
        Editare directă JSON. Toate câmpurile sunt opționale — orice lipsă cade
        înapoi pe valoarea implicită din cod.
      </p>
    </div>
  );
}
