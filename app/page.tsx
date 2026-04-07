import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { Certifications } from "@/components/Certifications";
import { CatalogTabs } from "@/components/CatalogTabs";
import { VideoGallery } from "@/components/VideoGallery";
import { Solutions } from "@/components/Solutions";
import { CaseStudies } from "@/components/CaseStudies";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";
import { QASection } from "@/components/QASection";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AuthorityStrip />
      <CaseStudies />
      <Certifications />
      <VideoGallery />
      <TestimonialMarquee />
      <CatalogTabs />
      <Solutions />
      <QASection />
      <ContactCTA />
      <Footer />
    </>
  );
}
