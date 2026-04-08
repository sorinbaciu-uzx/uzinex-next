import Link from "next/link";
import { prisma } from "@/lib/db";
import { KEY_LABELS, CONTENT_KEYS } from "@/lib/content";
import { DEFAULT_CONTENT, WIRED_KEYS } from "@/lib/defaults";
import { SCHEMAS } from "@/lib/schemas";
import { ContentEditor } from "./ContentEditor";
import { FormBuilder } from "@/components/admin/FormBuilder";

export const dynamic = "force-dynamic";

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const isKnown = (CONTENT_KEYS as readonly string[]).includes(key);
  if (!isKnown) {
    return (
      <div>
        <Link href="/admin" className="text-uzx-blue text-sm">
          ← Înapoi
        </Link>
        <h1 className="serif text-2xl mt-4">Bloc necunoscut: {key}</h1>
      </div>
    );
  }

  let row: { data: unknown } | null = null;
  try {
    row = await prisma.contentBlock.findUnique({ where: { key } });
  } catch {}

  const defaults = (DEFAULT_CONTENT[key] ?? {}) as Record<string, unknown>;
  const current = (row?.data as Record<string, unknown>) ?? defaults;
  const schema = SCHEMAS[key];
  const isWired = WIRED_KEYS.has(key);

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-uzx-blue text-sm">
          ← Înapoi la panoul de administrare
        </Link>
        <h1 className="serif text-3xl text-ink-900 mt-3">
          {schema?.title || KEY_LABELS[key] || key}
        </h1>
        {schema?.description && (
          <p className="text-ink-500 text-sm mt-1">{schema.description}</p>
        )}
        <div className="flex items-center gap-3 mt-3">
          <code className="font-mono text-xs text-ink-400">{key}</code>
          {!isWired && (
            <span className="text-[10px] uppercase tracking-wider bg-yellow-100 text-yellow-800 px-2 py-0.5">
              În pregătire — componenta încă nu citește din DB
            </span>
          )}
        </div>
      </div>

      {schema ? (
        <FormBuilder
          schema={schema}
          contentKey={key}
          initial={current}
          defaultValue={defaults}
        />
      ) : (
        <>
          <div className="border border-yellow-300 bg-yellow-50 text-yellow-900 p-3 text-sm">
            Acest bloc nu are încă un editor vizual. Folosește editorul JSON.
          </div>
          <ContentEditor
            contentKey={key}
            initial={current}
            defaultValue={defaults}
          />
        </>
      )}
    </div>
  );
}
