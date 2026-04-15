import { Header } from "@/components/Header";
import { Hero, type HeroData } from "@/components/Hero";
import { AuthorityStrip, type AuthorityData } from "@/components/AuthorityStrip";
import { Certifications, type CertificationsData } from "@/components/Certifications";
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

// ISR: re-render at most once per minute, plus instant invalidation
// triggered by `revalidatePath` from /api/admin/content/[key].
// This keeps Lighthouse / first-byte fast (static HTML cached at edge).
export const revalidate = 60;

export default async function Home() {
  const c = await getContents([
    "hero",
    "authority",
    "certifications",
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
      <main>
        <Hero data={c.hero as HeroData | undefined} />
        <AuthorityStrip data={c.authority as AuthorityData | undefined} />
        <CaseStudies data={c.case_studies_home as CaseStudiesHomeData | undefined} />
        <Certifications data={c.certifications as CertificationsData | undefined} />
        <VideoGallery data={c.video_gallery as VideoGalleryData | undefined} />
        <TestimonialMarquee data={c.testimonials as TestimonialsData | undefined} />
        <CatalogTabs />
        <Solutions data={c.solutions as SolutionsData | undefined} />
        <NewsSection data={c.news as NewsData | undefined} />
        <QASection data={c.qa as QAData | undefined} />
        <ContactCTA data={c.contact_cta as ContactCTAData | undefined} />
      </main>
      <Footer />
    </>
  );
}
