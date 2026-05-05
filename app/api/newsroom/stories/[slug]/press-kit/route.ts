import { NextResponse } from "next/server";
import JSZip from "jszip";
import { loadStory } from "@/lib/newsroom/data";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = loadStory(slug);
  if (!story) return NextResponse.json({ error: "Story not found" }, { status: 404 });

  const url = new URL(req.url);
  // Newsroom is now admin-only (internal content engine). The URL inside the
  // press kit references the admin path so the team has a source link when
  // copy-pasting into external publications. Replace with a public-facing URL
  // (e.g. /noutati/) once a story gets promoted to a public article.
  const fullUrl = `${url.protocol}//${url.host}/admin/newsroom/stories/${story.slug}`;

  const zip = new JSZip();
  const created = new Date(story.createdAt).toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  const tldr: string[] = story.tldr || [];

  zip.file(
    "README.md",
    `# Press Kit — ${story.title}

**Sursă:** Newsroom UZINEX (UZINEX SC GW LASER TECHNOLOGY SRL)
**Publicat:** ${created}
**URL canonic:** ${fullUrl}

## Conținutul pachetului

| Fișier | Pentru ce |
|---|---|
| articol.md | Articolul complet în Markdown — gata pentru CMS |
| articol.txt | Articolul ca text simplu — copy-paste rapid |
| tldr.txt | Bullet points pentru chapeau / lead |
| quote-uri.txt | Citat atribuit gata de copy-paste |
| citare.txt | Format citare APA / HTML / Markdown |
| date-brute.json | Date structurate pentru verificare |
| date-brute.csv | Date pentru Excel / Google Sheets |
| metodologie.txt | Metodologie + surse oficiale citate |

## Politica de citare

Toate datele sunt liber de utilizat cu citarea sursei. Format minim acceptat:

> Sursă: UZINEX Newsroom — ${fullUrl}

## Contact pentru interviu

**Sorin Baciu** — Director General UZINEX
Email: sorin.baciu@uzinex.ro
Telefon central UZINEX: +40 769 081 081
Disponibilitate: <24h pentru telefonic / TV / podcast.

---

Pachet generat automat de pipeline-ul Newsroom UZINEX.
`,
  );

  zip.file(
    "articol.md",
    `# ${story.title}

> ${story.subtitle || ""}

${story.body}

## Reacții

> "${story.quoteSorin || ""}"
>
> — Sorin Baciu, Director General UZINEX
`,
  );

  const stripMd = (md: string) =>
    md
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/\[(.+?)\]\(.+?\)/g, "$1")
      .replace(/`(.+?)`/g, "$1");
  zip.file(
    "articol.txt",
    `${story.title}

${story.subtitle || ""}

${stripMd(story.body)}

REACȚII

"${story.quoteSorin || ""}"
— Sorin Baciu, Director General UZINEX

---
Sursă: ${fullUrl}
`,
  );

  if (tldr.length) {
    zip.file("tldr.txt", tldr.map((b) => `• ${b}`).join("\n"));
  }

  zip.file(
    "quote-uri.txt",
    `QUOTE — Sorin Baciu
"${story.quoteSorin || ""}"
Atribuire: Sorin Baciu, Director General UZINEX SC GW LASER TECHNOLOGY SRL
`,
  );

  const citationApa = `UZINEX Newsroom (${new Date(story.createdAt).getFullYear()}). ${story.title}. Newsroom UZINEX. ${fullUrl}`;
  const citationHtml = `<a href="${fullUrl}" target="_blank" rel="noopener">Sursă: UZINEX Newsroom — ${story.title}</a>`;
  const citationMd = `[Sursă: UZINEX Newsroom — ${story.title}](${fullUrl})`;
  zip.file(
    "citare.txt",
    `=== APA ===
${citationApa}

=== HTML (pentru articol web) ===
${citationHtml}

=== Markdown ===
${citationMd}

=== Citare scurtă text ===
(Sursă: UZINEX Newsroom, ${created})
`,
  );

  zip.file(
    "metodologie.txt",
    `METODOLOGIE — ${story.title}

${story.methodology || "Articolul a fost generat din insight-uri produse de pipeline-ul Newsroom UZINEX care colectează date din 90+ surse oficiale (peste 25 cu API public funcțional la momentul publicării)."}

INSIGHT-URI FOLOSITE: ${JSON.stringify(story.insightIds)}

SURSE OFICIALE CITATE EXPLICIT (după caz):
- BNR — Banca Națională a României (cursuri valutare oficiale, https://www.bnr.ro)
- Eurostat — Oficiul Statistic UE (https://ec.europa.eu/eurostat)
- World Bank Open Data (https://data.worldbank.org)
- ECB — Banca Centrală Europeană (https://data.ecb.europa.eu)
- TED Europa — Tenders Electronic Daily (https://ted.europa.eu)
- SAM.gov — US Federal Contracts (https://sam.gov)
- USASpending.gov (https://usaspending.gov)
- IMF DataMapper (https://www.imf.org/external/datamapper)
- UN Comtrade (https://comtradeapi.un.org)
- Date.gov.ro — Portal Date Deschise (https://data.gov.ro)

GENERAT: ${new Date().toISOString()}
URL CANONIC: ${fullUrl}
`,
  );

  const chartData = story.chartData || [];
  zip.file(
    "date-brute.json",
    JSON.stringify(
      { story: { id: story.id, slug: story.slug, title: story.title, createdAt: story.createdAt }, charts: chartData },
      null,
      2,
    ),
  );

  const csvRows: string[] = ["insight_id,insight_type,insight_title,dimension,date,value"];
  for (const c of chartData) {
    const data: any = c.data || {};
    if (Array.isArray(data.chart)) {
      for (const p of data.chart) {
        csvRows.push(`${c.insightId},"${c.type}","${c.title.replace(/"/g, '""')}",,${new Date(p.date).toISOString().slice(0, 10)},${p.value}`);
      }
    }
    if (Array.isArray(data.ranking)) {
      for (const r of data.ranking) {
        csvRows.push(`${c.insightId},"${c.type}","${c.title.replace(/"/g, '""')}","${r.country}",,${r.value ?? r.count ?? ""}`);
      }
    }
  }
  zip.file("date-brute.csv", csvRows.join("\n"));

  const buffer = await zip.generateAsync({ type: "uint8array" });
  const filename = `press-kit-${story.slug}.zip`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Content-Length": String(buffer.byteLength),
    },
  });
}
