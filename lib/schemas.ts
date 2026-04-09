// Field schemas for the visual admin form builder.
// Each top-level key corresponds to a ContentBlock key.

export type FieldSchema =
  | { type: "text"; label: string; placeholder?: string; help?: string }
  | { type: "textarea"; label: string; rows?: number; help?: string }
  | { type: "url"; label: string; help?: string }
  | { type: "image"; label: string; help?: string }
  | { type: "select"; label: string; options: string[] }
  | { type: "string_list"; label: string; placeholder?: string; help?: string }
  | { type: "text_or_list"; label: string; help?: string }
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
      heroVideoId: {
        type: "text",
        label: "YouTube Video ID pentru hero /noutati",
        help: "Doar ID-ul (ex: a-e4NhkxGGY), nu URL-ul complet. Lasă gol pentru a afișa imaginea articolului featured.",
      },
      railVideoId: {
        type: "text",
        label: "YouTube Video ID pentru widget-ul sticky (reportaj)",
        help: "Doar ID-ul (ex: cnXAYqGYX5A). Se afișează în widget-ul fixat pe dreapta, după hero.",
      },
      articles: {
        type: "list",
        label: "Articole",
        itemLabelField: "title",
        item: {
          slug: {
            type: "text",
            label: "Slug URL (ex: comunicat-aparare-2026)",
            help: "Apare în URL: /noutati/<slug>. Folosește litere mici, fără diacritice și cratime în loc de spații.",
          },
          category: {
            type: "select",
            label: "Categorie",
            options: ["Comunicat", "Articol", "Anunț", "Studiu"],
          },
          date: { type: "text", label: "Dată (ex: 15 Martie 2025)" },
          title: { type: "text", label: "Titlu" },
          excerpt: { type: "textarea", label: "Rezumat (apare pe carduri)", rows: 3 },
          readTime: { type: "text", label: "Timp de citire (ex: 5 min)" },
          image: { type: "image", label: "Imagine articol (opțional)" },
          body: {
            type: "textarea",
            label: "Conținut complet",
            rows: 12,
            help: "Separă paragrafele cu o linie goală. Va apărea pe pagina /noutati/<slug>.",
          },
          authors: {
            type: "list",
            label: "Autori",
            itemLabelField: "name",
            item: {
              name: { type: "text", label: "Nume" },
              role: { type: "text", label: "Rol" },
              avatar: { type: "image", label: "Avatar (pătrat)" },
            },
          },
        },
      },
      highlights: {
        type: "list",
        label: "Momente importante (carduri colorate orizontal)",
        itemLabelField: "title",
        item: {
          title: { type: "text", label: "Titlu" },
          date: { type: "text", label: "Dată" },
          excerpt: { type: "textarea", label: "Descriere", rows: 4 },
          color: {
            type: "text",
            label: "Culoare fundal (hex)",
            help: "Ex: #1e6bb8 (albastru brand), #f5851f (portocaliu), #082545 (albastru închis)",
          },
          href: { type: "text", label: "Link (opțional)" },
        },
      },
      changelog: {
        type: "group",
        label: "Actualizări operaționale (changelog)",
        fields: {
          title: { type: "text", label: "Titlu secțiune" },
          date: { type: "text", label: "Perioada" },
          href: { type: "text", label: "Link «Toate actualizările»" },
          entries: {
            type: "list",
            label: "Intrări",
            itemLabelField: "category",
            item: {
              category: { type: "text", label: "Categorie (ex: Service, Catalog)" },
              date: { type: "text", label: "Dată (ex: Aprilie 2026)" },
              text: { type: "textarea", label: "Text actualizare", rows: 3 },
              href: { type: "text", label: "Link detalii (opțional)" },
            },
          },
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
          thumbnail: { type: "image", label: "Thumbnail" },
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
          image: { type: "image", label: "Imagine" },
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
          image: { type: "image", label: "Imagine" },
          alt: { type: "text", label: "Alt text (SEO)" },
          youtubeId: { type: "text", label: "YouTube ID (opțional)" },
        },
      },
    },
  },

  authority: {
    title: "Authority Strip — KPI-uri sub Hero",
    fields: {
      items: {
        type: "list",
        label: "KPI-uri",
        itemLabelField: "label",
        item: {
          value: { type: "text", label: "Valoare (ex: +30)" },
          label: { type: "text", label: "Etichetă" },
        },
      },
    },
  },

  certifications: {
    title: "Certificări & conformitate",
    fields: {
      eyebrow: { type: "text", label: "Eyebrow" },
      titleLine1: { type: "text", label: "Titlu — linia 1" },
      titleLine2: { type: "text", label: "Titlu — linia 2" },
      description: { type: "textarea", label: "Descriere", rows: 4 },
      certs: { type: "string_list", label: "Certificări" },
      brandsTitle: { type: "text", label: "Titlu bară branduri" },
      brands: { type: "string_list", label: "Branduri" },
    },
  },

  case_studies_all: {
    title: "Studii de caz — pagina /studii-de-caz",
    description: "Toate studiile de caz afișate pe pagina dedicată.",
    fields: {
      items: {
        type: "list",
        label: "Studii de caz",
        itemLabelField: "client",
        item: {
          id: { type: "text", label: "ID (slug, ex: camma)" },
          client: { type: "text", label: "Client" },
          industry: {
            type: "select",
            label: "Industrie",
            options: [
              "Producție & manufactură",
              "Logistică & depozitare",
              "Energie & infrastructură",
              "Procesare & reciclare",
              "Auto & metalurgie",
              "Apărare & securitate",
            ],
          },
          location: { type: "text", label: "Locație" },
          year: { type: "text", label: "An" },
          title: { type: "text", label: "Titlu" },
          excerpt: { type: "textarea", label: "Rezumat", rows: 4 },
          image: { type: "image", label: "Imagine" },
          alt: { type: "text", label: "Alt text (SEO)" },
          youtubeId: { type: "text", label: "YouTube ID (opțional)" },
          equipment: { type: "string_list", label: "Echipamente" },
          metrics: {
            type: "list",
            label: "Metrici",
            itemLabelField: "label",
            item: {
              label: { type: "text", label: "Etichetă" },
              value: { type: "text", label: "Valoare" },
            },
          },
        },
      },
    },
  },

  team: {
    title: "Pagina /echipa",
    fields: {
      title: { type: "text", label: "Titlu pagină" },
      updated: { type: "text", label: "Data actualizării" },
      sections: {
        type: "list",
        label: "Secțiuni",
        itemLabelField: "title",
        item: {
          title: { type: "text", label: "Titlu secțiune" },
          body: { type: "text_or_list", label: "Conținut" },
        },
      },
    },
  },

  cariere: {
    title: "Pagina /cariere",
    fields: {
      title: { type: "text", label: "Titlu pagină" },
      updated: { type: "text", label: "Data actualizării" },
      sections: {
        type: "list",
        label: "Secțiuni",
        itemLabelField: "title",
        item: {
          title: { type: "text", label: "Titlu secțiune" },
          body: { type: "text_or_list", label: "Conținut" },
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
          src: { type: "image", label: "Imagine logo" },
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
