import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de cookies — Uzinex",
  description: "Cum folosește site-ul uzinex.ro cookies și tehnologii similare pentru a îmbunătăți experiența utilizatorului.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de cookies"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Ce sunt cookies",
          body: "Cookies sunt fișiere text de dimensiuni mici, stocate de browser-ul tău la vizitarea unui site web. Ele permit recunoașterea dispozitivului tău la vizite ulterioare și îmbunătățesc funcționalitatea site-ului.",
        },
        {
          title: "Cookies folosite pe uzinex.ro",
          body: [
            "Cookies strict necesare: esențiale pentru funcționarea site-ului (sesiune, preferințe, securitate).",
            "Cookies de performanță: măsoară traficul și comportamentul pentru a îmbunătăți pagina (ex. Vercel Analytics).",
            "Cookies de funcționalitate: rețin preferințe (limbă, regiune).",
            "Cookies de marketing: folosite exclusiv cu acordul tău explicit pentru campanii targetate.",
          ],
        },
        {
          title: "Cum le gestionezi",
          body: "Poți accepta, respinge sau șterge cookies direct din setările browser-ului tău. Dezactivarea cookies strict necesare poate afecta funcționarea site-ului.",
        },
        {
          title: "Terțe părți",
          body: "Folosim servicii terțe precum Vercel (hosting și analytics) și YouTube (embed videoclipuri), care pot seta propriile cookies. Pentru detalii, consultă politicile lor de confidențialitate.",
        },
        {
          title: "Durata de viață",
          body: "Cookies de sesiune sunt șterse la închiderea browser-ului. Cookies persistente au durate diferite, între 30 de zile și 2 ani, în funcție de scopul lor.",
        },
        {
          title: "Consimțământ",
          body: "La prima vizită, îți solicităm acordul pentru cookies non-esențiale. Îți poți retrage consimțământul oricând din setările browser-ului sau ștergând cookies stocate.",
        },
      ]}
    />
  );
}
