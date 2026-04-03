import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudiesGallery } from "@/components/CaseStudiesGallery";

export const metadata: Metadata = {
  title: "Studii de caz — Uzinex",
  description:
    "Descoperă proiectele Uzinex livrate pentru clienți din producție, logistică, energie, infrastructură, procesare, apărare și auto. Soluții industriale la cheie cu rezultate măsurabile.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <CaseStudiesGallery />
      </main>
      <Footer />
    </>
  );
}
