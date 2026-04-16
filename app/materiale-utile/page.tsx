import type { Metadata } from "next";
import MaterialeUtileClient from "./MaterialeUtileClient";
import { PLAYLISTS } from "./playlists";
import { breadcrumbSchema, videoSchema, itemListSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Materiale utile — 48 episoade gratuite Lean Manufacturing",
  description:
    "Bibliotecă video cu 48 de episoade gratuite: Lean Manufacturing, optimizare producție, logistică, mentenanță preventivă, podcast industrial cu experți. Fără paywall, acces liber pe YouTube @UZINEX.",
  alternates: { canonical: "/materiale-utile" },
  openGraph: {
    title: "Materiale utile Uzinex — 48 episoade gratuite",
    description:
      "Lean Manufacturing, logistică, mentenanță, podcast industrial. Bibliotecă video gratuită pentru manageri și ingineri.",
    url: "/materiale-utile",
    type: "website",
  },
  keywords: [
    "Lean Manufacturing",
    "optimizare producție",
    "logistică",
    "mentenanță preventivă",
    "Toyota Kata",
    "Six Sigma",
    "FIFO",
    "VMI",
    "Heijunka",
    "Kaizen",
    "podcast industrial",
  ],
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Resurse", url: "/materiale-utile" },
    { name: "Materiale utile", url: "/materiale-utile" },
  ]);

  // Flatten all 48 videos from 3 playlists
  const allVideos = PLAYLISTS.flatMap((pl) =>
    pl.videos.map((v) => ({
      ...v,
      playlistKey: pl.key,
      playlistTitle: pl.title,
    }))
  );

  // ItemList with all videos (max 100 per schema guidelines)
  const videoListSchema = itemListSchema(
    allVideos.map((v) => ({
      name: v.title,
      url: `/materiale-utile#${v.id}`,
    })),
    "Materiale utile Uzinex — 48 episoade video gratuite"
  );

  // Individual VideoObject schemas for each video — helps Google/Bing rank for
  // video searches and may surface in Google Video carousels.
  const videoSchemas = allVideos.map((v) =>
    videoSchema({
      name: v.title,
      description: `${v.playlistTitle}. Episod din biblioteca Uzinex — ${v.title}.`,
      youtubeId: v.id,
    })
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoListSchema) }}
      />
      {videoSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <MaterialeUtileClient />
    </>
  );
}
