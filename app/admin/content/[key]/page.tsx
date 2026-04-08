import Link from "next/link";
import { prisma } from "@/lib/db";
import { KEY_LABELS, CONTENT_KEYS } from "@/lib/content";
import { DEFAULT_CONTENT } from "@/lib/defaults";
import { ContentEditor } from "./ContentEditor";

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

  const current = row?.data ?? DEFAULT_CONTENT[key] ?? {};

  return (
    <div className="space-y-6">
      <div>
        <Link href="/admin" className="text-uzx-blue text-sm">
          ← Înapoi
        </Link>
        <h1 className="serif text-3xl text-ink-900 mt-3">
          {KEY_LABELS[key] || key}
        </h1>
        <p className="text-ink-500 text-sm mt-1">
          Cheie: <code className="font-mono">{key}</code>
        </p>
      </div>
      <ContentEditor
        contentKey={key}
        initial={current}
        defaultValue={DEFAULT_CONTENT[key] ?? {}}
      />
    </div>
  );
}
