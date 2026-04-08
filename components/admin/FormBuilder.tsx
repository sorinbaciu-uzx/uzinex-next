"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { BlockSchema, FieldSchema, ObjectShape } from "@/lib/schemas";

type Value = unknown;

// ---------- helpers ----------

function getAt(obj: Record<string, Value>, path: (string | number)[]): Value {
  let cur: Value = obj;
  for (const p of path) {
    if (cur == null) return undefined;
    cur = (cur as Record<string, Value>)[p as string];
  }
  return cur;
}

function setAt(
  obj: Record<string, Value>,
  path: (string | number)[],
  value: Value
): Record<string, Value> {
  if (path.length === 0) return value as Record<string, Value>;
  const [head, ...rest] = path;
  const isArr = typeof head === "number";
  const copy: Record<string, Value> | Value[] = isArr
    ? ([...((obj as unknown as Value[]) || [])] as Value[])
    : { ...(obj || {}) };
  (copy as Record<string | number, Value>)[head] = setAt(
    (obj as Record<string, Value>)?.[head as string] as Record<string, Value>,
    rest,
    value
  );
  return copy as Record<string, Value>;
}

function defaultForField(field: FieldSchema): Value {
  switch (field.type) {
    case "text":
    case "textarea":
    case "url":
    case "image":
    case "select":
      return "";
    case "string_list":
      return [];
    case "list":
      return [];
    case "group":
      return defaultForShape(field.fields);
  }
}

function defaultForShape(shape: ObjectShape): Record<string, Value> {
  const out: Record<string, Value> = {};
  for (const [k, f] of Object.entries(shape)) out[k] = defaultForField(f);
  return out;
}

// ---------- field renderers ----------

function TextField({
  label,
  value,
  onChange,
  multiline,
  rows,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-ink-500 mb-1.5 font-medium">
        {label}
      </span>
      {multiline ? (
        <textarea
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 3}
          className="w-full border hairline px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
        />
      ) : (
        <input
          type={type || "text"}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border hairline px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-ink-500 mb-1.5 font-medium">
        {label}
      </span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border hairline px-3 py-2 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
      >
        <option value="">—</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function StringListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const arr = Array.isArray(value) ? value : [];
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-ink-500 mb-2 font-medium">
        {label}
      </div>
      <div className="space-y-2">
        {arr.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={s}
              onChange={(e) => {
                const copy = [...arr];
                copy[i] = e.target.value;
                onChange(copy);
              }}
              className="flex-1 border hairline px-3 py-2 text-sm bg-white focus:outline-none focus:border-uzx-blue"
            />
            <button
              type="button"
              onClick={() => onChange(arr.filter((_, j) => j !== i))}
              className="border hairline px-3 text-sm text-red-600 hover:bg-red-50"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...arr, ""])}
          className="border hairline border-dashed px-4 py-2 text-xs text-ink-600 hover:bg-ink-50"
        >
          + Adaugă
        </button>
      </div>
    </div>
  );
}

function ListField({
  label,
  value,
  itemShape,
  itemLabelField,
  onChange,
}: {
  label: string;
  value: Record<string, Value>[];
  itemShape: ObjectShape;
  itemLabelField?: string;
  onChange: (v: Record<string, Value>[]) => void;
}) {
  const arr = Array.isArray(value) ? value : [];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  function add() {
    const next = [...arr, defaultForShape(itemShape)];
    onChange(next);
    setOpenIdx(next.length - 1);
  }
  function remove(i: number) {
    if (!confirm("Șterge acest element?")) return;
    onChange(arr.filter((_, j) => j !== i));
    if (openIdx === i) setOpenIdx(null);
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    const copy = [...arr];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  function updateItem(i: number, item: Record<string, Value>) {
    const copy = [...arr];
    copy[i] = item;
    onChange(copy);
  }

  return (
    <div className="border hairline bg-white">
      <div className="px-4 py-3 border-b hairline bg-ink-50 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-ink-700 font-medium">
          {label} <span className="text-ink-400">({arr.length})</span>
        </div>
        <button
          type="button"
          onClick={add}
          className="text-xs text-uzx-blue hover:text-uzx-blue2"
        >
          + Adaugă element
        </button>
      </div>
      <div className="divide-y divide-ink-200">
        {arr.length === 0 && (
          <div className="px-4 py-6 text-sm text-ink-400 italic">
            Nicio intrare. Apasă &quot;+ Adaugă element&quot;.
          </div>
        )}
        {arr.map((item, i) => {
          const isOpen = openIdx === i;
          const title =
            (itemLabelField && (item?.[itemLabelField] as string)) ||
            `Element ${i + 1}`;
          return (
            <div key={i}>
              <div
                className="px-4 py-3 flex items-center gap-2 cursor-pointer hover:bg-ink-50"
                onClick={() => setOpenIdx(isOpen ? null : i)}
              >
                <span className="font-mono text-xs text-ink-400 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 text-sm text-ink-900 truncate">
                  {title || `Element ${i + 1}`}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    move(i, -1);
                  }}
                  className="text-ink-400 hover:text-ink-700 px-1 text-sm"
                  title="Sus"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    move(i, 1);
                  }}
                  className="text-ink-400 hover:text-ink-700 px-1 text-sm"
                  title="Jos"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(i);
                  }}
                  className="text-red-500 hover:text-red-700 px-2 text-sm"
                  title="Șterge"
                >
                  ✕
                </button>
                <span className="text-ink-400 text-lg ml-1">
                  {isOpen ? "▾" : "▸"}
                </span>
              </div>
              {isOpen && (
                <div className="px-4 py-4 bg-ink-50/50 border-t hairline">
                  <ShapeFields
                    shape={itemShape}
                    value={item || {}}
                    onChange={(v) => updateItem(i, v)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ShapeFields({
  shape,
  value,
  onChange,
}: {
  shape: ObjectShape;
  value: Record<string, Value>;
  onChange: (v: Record<string, Value>) => void;
}) {
  const update = useCallback(
    (k: string, v: Value) => onChange({ ...value, [k]: v }),
    [value, onChange]
  );

  const entries = Object.entries(shape);
  const simpleEntries = entries.filter(
    ([, f]) => f.type !== "list" && f.type !== "string_list" && f.type !== "group"
  );
  const complexEntries = entries.filter(
    ([, f]) => f.type === "list" || f.type === "string_list" || f.type === "group"
  );

  return (
    <div className="space-y-5">
      {simpleEntries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {simpleEntries.map(([k, field]) => (
            <div
              key={k}
              className={
                field.type === "textarea" ? "md:col-span-2" : undefined
              }
            >
              <FieldRenderer
                field={field}
                value={value?.[k]}
                onChange={(v) => update(k, v)}
              />
            </div>
          ))}
        </div>
      )}
      {complexEntries.map(([k, field]) => (
        <div key={k}>
          <FieldRenderer
            field={field}
            value={value?.[k]}
            onChange={(v) => update(k, v)}
          />
        </div>
      ))}
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FieldSchema;
  value: Value;
  onChange: (v: Value) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <TextField
          label={field.label}
          value={(value as string) ?? ""}
          onChange={onChange}
        />
      );
    case "url":
    case "image":
      return (
        <TextField
          label={field.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          type="url"
        />
      );
    case "textarea":
      return (
        <TextField
          label={field.label}
          value={(value as string) ?? ""}
          onChange={onChange}
          multiline
          rows={field.rows}
        />
      );
    case "select":
      return (
        <SelectField
          label={field.label}
          value={(value as string) ?? ""}
          options={field.options}
          onChange={onChange}
        />
      );
    case "string_list":
      return (
        <StringListField
          label={field.label}
          value={(value as string[]) ?? []}
          onChange={(v) => onChange(v)}
        />
      );
    case "list":
      return (
        <ListField
          label={field.label}
          value={(value as Record<string, Value>[]) ?? []}
          itemShape={field.item}
          itemLabelField={field.itemLabelField}
          onChange={(v) => onChange(v)}
        />
      );
    case "group":
      return (
        <div className="border hairline p-4 bg-white">
          <div className="text-xs uppercase tracking-wider text-ink-500 mb-3 font-medium">
            {field.label}
          </div>
          <ShapeFields
            shape={field.fields}
            value={(value as Record<string, Value>) ?? {}}
            onChange={(v) => onChange(v)}
          />
        </div>
      );
  }
}

// ---------- main component ----------

export function FormBuilder({
  schema,
  contentKey,
  initial,
  defaultValue,
}: {
  schema: BlockSchema;
  contentKey: string;
  initial: Record<string, Value>;
  defaultValue: Record<string, Value>;
}) {
  const router = useRouter();
  const [data, setData] = useState<Record<string, Value>>(initial ?? {});
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"form" | "json">("form");
  const [jsonText, setJsonText] = useState(JSON.stringify(initial, null, 2));

  async function save() {
    setError("");
    let body: unknown = data;
    if (mode === "json") {
      try {
        body = JSON.parse(jsonText);
        setData(body as Record<string, Value>);
      } catch (e) {
        setError("JSON invalid: " + (e as Error).message);
        setStatus("error");
        return;
      }
    }
    setStatus("saving");
    const res = await fetch(`/api/admin/content/${contentKey}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
    if (!confirm("Resetezi la valorile implicite din cod? Modificările nesalvate se pierd."))
      return;
    setData(defaultValue);
    setJsonText(JSON.stringify(defaultValue, null, 2));
  }

  function switchToJson() {
    setJsonText(JSON.stringify(data, null, 2));
    setMode("json");
  }
  function switchToForm() {
    try {
      const parsed = JSON.parse(jsonText);
      setData(parsed);
      setError("");
      setMode("form");
    } catch (e) {
      setError("JSON invalid: " + (e as Error).message);
    }
  }

  return (
    <div className="space-y-5">
      {/* toolbar */}
      <div className="sticky top-0 z-10 bg-ink-50/95 backdrop-blur border-b hairline -mx-6 px-6 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={mode === "form" ? switchToJson : switchToForm}
            className="text-xs text-ink-500 hover:text-ink-900 underline"
          >
            {mode === "form" ? "Editor JSON (avansat)" : "← Înapoi la formular"}
          </button>
        </div>
        <div className="flex items-center gap-3">
          {status === "saved" && (
            <span className="text-sm text-green-700">✓ Salvat</span>
          )}
          <button
            type="button"
            onClick={reset}
            className="border hairline px-3 py-2 text-xs text-ink-600 hover:bg-white"
          >
            Resetează
          </button>
          <button
            type="button"
            onClick={save}
            disabled={status === "saving"}
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-2 text-sm font-medium transition disabled:opacity-50"
          >
            {status === "saving" ? "Se salvează..." : "Salvează"}
          </button>
        </div>
      </div>

      {error && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-3 text-sm">
          {error}
        </div>
      )}

      {mode === "form" ? (
        <div className="bg-white border hairline p-6">
          <ShapeFields shape={schema.fields} value={data} onChange={setData} />
        </div>
      ) : (
        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          spellCheck={false}
          className="w-full font-mono text-sm bg-white border hairline p-4 focus:outline-none focus:border-uzx-blue"
          style={{ minHeight: "60vh" }}
        />
      )}
    </div>
  );
}

// util exports for callers
export { setAt, getAt };
