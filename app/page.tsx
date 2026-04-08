import { Header } from "@/components/Header";
import { Hero, type HeroData } from "@/components/Hero";
import { AuthorityStrip } from "@/components/AuthorityStrip";
import { Certifications } from "@/components/Certifications";
import { CatalogTabs } from "@/components/CatalogTabs";
import { VideoGallery, type VideoGalleryData } from "@/components/VideoGallery";
import { NewsSection, type NewsData } from "@/components/NewsSection";
import { Solutions, type SolutionsData } from "@/components/Solutions";
import { CaseStudies, type CaseStudiesHomeData } from "@/components/CaseStudies";
import { TestimonialMarquee, type TestimonialsData } from "@/components/TestimonialMarquee";
import { QASection, type QAData } from "@/components/QASection";
import { ContactCTA, type ContactCTAData } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { getContents } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const c = await getContents([
    "hero",
    "case_studies_home",
    "video_gallery",
    "testimonials",
    "news",
    "solutions",
    "qa",
    "contact_cta",
  ]);
  return (
    <>
      <Header />
      <Hero data={c.hero as HeroData | undefined} />
      <AuthorityStrip />
      <CaseStudies data={c.case_studies_home as CaseStudiesHomeData | undefined} />
      <Certifications />
      <VideoGallery data={c.video_gallery as VideoGalleryData | undefined} />
      <TestimonialMarquee data={c.testimonials as TestimonialsData | undefined} />
      <CatalogTabs />
      <NewsSection data={c.news as NewsData | undefined} />
      <Solutions data={c.solutions as SolutionsData | undefined} />
      <QASection data={c.qa as QAData | undefined} />
      <ContactCTA data={c.contact_cta as ContactCTAData | undefined} />
      <Footer />
    </>
  );
}
