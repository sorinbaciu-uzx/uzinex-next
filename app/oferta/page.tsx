import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OfertaClient } from "./OfertaClient";

export const metadata: Metadata = {
  title: "Cere ofertă personalizată",
  description:
    "Solicită o ofertă personalizată pentru echipamentele Uzinex. Completează datele și echipa noastră te contactează în 24h lucrătoare.",
  alternates: { canonical: "/oferta" },
};

export default function Page() {
  return (
    <div className="bg-white">
      <div style={{ background: "#082545" }}>
        <Header />
      </div>
      <OfertaClient />
      <Footer />
    </div>
  );
}
