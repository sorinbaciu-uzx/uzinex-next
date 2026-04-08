import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { OfertaClient } from "./OfertaClient";

export const metadata: Metadata = {
  title: "Cere ofertă — Uzinex",
  description:
    "Solicită o ofertă personalizată pentru echipamentele Uzinex. Completează datele și echipa noastră te contactează.",
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
