import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CaseStudiesGallery, type CaseStudiesAllData } from "@/components/CaseStudiesGallery";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Studii de caz — Uzinex",
  description:
    "Descoperă proiectele Uzinex livrate pentru clienți din producție, logistică, energie, infrastructură, procesare, apărare și auto. Soluții industriale la cheie cu rezultate măsurabile.",
};

export default async function Page() {
  const data = await getContent<CaseStudiesAllData>("case_studies_all");
  return (
    <>
      <Header />
      <main>
        <CaseStudiesGallery data={data} />
      </main>
      <Footer />
    </>
  );
}
