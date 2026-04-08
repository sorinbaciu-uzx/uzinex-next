// Field schemas for the visual admin form builder.
// Each top-level key corresponds to a ContentBlock key.

export type FieldSchema =
  | { type: "text"; label: string; placeholder?: string; help?: string }
  | { type: "textarea"; label: string; rows?: number; help?: string }
  | { type: "url"; label: string; help?: string }
  | { type: "image"; label: string; help?: string }
  | { type: "select"; label: string; options: string[] }
  | { type: "string_list"; label: string; placeholder?: string; help?: string }
  | {
      type: "list";
      label: string;
      itemLabel?: (item: Record<string, unknown>, i: number) => string;
      itemLabelField?: string;
      minItems?: number;
      item: ObjectShape;
    }
  | { type: "group"; label: string; fields: ObjectShape };

export type ObjectShape = Record<string, FieldSchema>;
export type BlockSchema = { title: string; description?: string; fields: ObjectShape };

export const SCHEMAS: Record<string, BlockSchema> = {
  hero: {
    title: "Hero — secțiunea principală",
    description: "Primul ecran pe care îl vede vizitatorul.",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow (text mic deasupra titlului)" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleLine2: { type: "text", label: "Titlu — linia 2" },
      titleHighlight: { type: "text", label: "Titlu — evidențiat (portocaliu)" },
      description: { type: "textarea", label: "Descriere", rows: 4 },
      ctaLabel: { type: "text", label: "CTA principal — text" },
      ctaHref: { type: "url", label: "CTA principal — link" },
      secondaryCtaLabel: { type: "text", label: "CTA secundar — text" },
      secondaryCtaHref: { type: "url", label: "CTA secundar — link" },
      stats: {
        type: "list",
        label: "Statistici",
        itemLabelField: "label",
        item: {
          label: { type: "text", label: "Etichetă" },
          value: { type: "text", label: "Valoare" },
        },
      },
    },
  },

  contact_cta: {
    title: "Contact CTA — secțiunea de contact",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleLine2: { type: "text", label: "Titlu — linia 2" },
      titleHighlight: { type: "text", label: "Titlu — evidențiat" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      phoneLabel: { type: "text", label: "Etichetă telefon" },
      phone: { type: "text", label: "Telefon" },
      emailLabel: { type: "text", label: "Etichetă email" },
      email: { type: "text", label: "Email" },
      addressLabel: { type: "text", label: "Etichetă adresă" },
      addressLine1: { type: "text", label: "Adresă linia 1" },
      addressLine2: { type: "text", label: "Adresă linia 2" },
      ctaLabel: { type: "text", label: "CTA — text" },
      ctaHref: { type: "url", label: "CTA — link" },
    },
  },

  news: {
    title: "Noutăți & comunicări",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleHighlight: { type: "text", label: "Titlu — evidențiat" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      articles: {
        type: "list",
        label: "Articole",
        itemLabelField: "title",
        item: {
          category: {
            type: "select",
            label: "Categorie",
            options: ["Comunicat", "Articol", "Anunț", "Studiu"],
          },
          date: { type: "text", label: "Dată (ex: 15 Martie 2025)" },
          title: { type: "text", label: "Titlu" },
          excerpt: { type: "textarea", label: "Rezumat", rows: 3 },
          readTime: { type: "text", label: "Timp de citire (ex: 5 min)" },
        },
      },
    },
  },

  qa: {
    title: "Întrebări frecvente",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleLine2: { type: "text", label: "Titlu — linia 2" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      contactLabel: { type: "text", label: "Link contact" },
      items: {
        type: "list",
        label: "Întrebări",
        itemLabelField: "q",
        item: {
          q: { type: "text", label: "Întrebare" },
          a: { type: "textarea", label: "Răspuns", rows: 4 },
        },
      },
    },
  },

  video_gallery: {
    title: "Galerie video",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleHighlight: { type: "text", label: "Titlu — evidențiat" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      videos: {
        type: "list",
        label: "Video-uri",
        itemLabelField: "title",
        item: {
          id: { type: "text", label: "ID intern (ex: v1)" },
          title: { type: "text", label: "Titlu" },
          type: {
            type: "select",
            label: "Tip",
            options: ["TV", "Târg", "Demo", "Interviu", "Reportaj", "Prezentare"],
          },
          date: { type: "text", label: "An / dată" },
          youtubeId: { type: "text", label: "YouTube ID" },
          thumbnail: { type: "url", label: "Thumbnail URL" },
          duration: { type: "text", label: "Durată (opțional)" },
        },
      },
    },
  },

  solutions: {
    title: "Soluții pe industrie",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleLine2: { type: "text", label: "Titlu — linia 2" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      ctaLabel: { type: "text", label: "CTA — text" },
      ctaHref: { type: "url", label: "CTA — link" },
      items: {
        type: "list",
        label: "Soluții",
        itemLabelField: "industry",
        item: {
          num: { type: "text", label: "Număr (ex: 01)" },
          industry: { type: "text", label: "Industrie / aplicație" },
          image: { type: "url", label: "Imagine" },
          description: { type: "textarea", label: "Descriere", rows: 3 },
          bullets: { type: "string_list", label: "Bullet points" },
          package: { type: "text", label: "Pachet recomandat" },
        },
      },
    },
  },

  case_studies_home: {
    title: "Studii de caz — carusel home",
    fields: {
      items: {
        type: "list",
        label: "Studii de caz",
        itemLabelField: "client",
        item: {
          client: { type: "text", label: "Client" },
          title: { type: "text", label: "Titlu" },
          subtitle: { type: "text", label: "Subtitlu" },
          image: { type: "url", label: "Imagine (URL)" },
          alt: { type: "text", label: "Alt text (SEO)" },
          youtubeId: { type: "text", label: "YouTube ID (opțional)" },
        },
      },
    },
  },

  testimonials: {
    title: "Testimoniale",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleHighlight: { type: "text", label: "Titlu — evidențiat" },
      count: { type: "text", label: "Contor (ex: 12 referințe verificate)" },
      description: { type: "textarea", label: "Descriere", rows: 3 },
      ctaLabel: { type: "text", label: "CTA — text" },
      logosTitle: { type: "text", label: "Titlu bară logo-uri" },
      logos: {
        type: "list",
        label: "Logo-uri clienți",
        itemLabelField: "name",
        item: {
          name: { type: "text", label: "Nume companie" },
          src: { type: "text", label: "Path imagine (ex: /clients/x.png)" },
        },
      },
      col1: {
        type: "list",
        label: "Testimoniale — coloana 1",
        itemLabelField: "name",
        item: {
          quote: { type: "textarea", label: "Citat", rows: 3 },
          name: { type: "text", label: "Nume" },
          role: { type: "text", label: "Rol · Companie" },
        },
      },
      col2: {
        type: "list",
        label: "Testimoniale — coloana 2",
        itemLabelField: "name",
        item: {
          quote: { type: "textarea", label: "Citat", rows: 3 },
          name: { type: "text", label: "Nume" },
          role: { type: "text", label: "Rol · Companie" },
        },
      },
      col3: {
        type: "list",
        label: "Testimoniale — coloana 3",
        itemLabelField: "name",
        item: {
          quote: { type: "textarea", label: "Citat", rows: 3 },
          name: { type: "text", label: "Nume" },
          role: { type: "text", label: "Rol · Companie" },
        },
      },
    },
  },
};
