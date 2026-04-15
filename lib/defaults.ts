// Central registry of default content for each editable block.

import { HERO_DEFAULT } from "@/components/Hero";
import { NEWS_DEFAULT } from "@/components/NewsSection";
import { QA_DEFAULT } from "@/components/QASection";
import { VIDEO_GALLERY_DEFAULT } from "@/components/VideoGallery";
import { TESTIMONIALS_DEFAULT } from "@/components/TestimonialMarquee";
import { SOLUTIONS_DEFAULT } from "@/components/Solutions";
import { CASE_STUDIES_HOME_DEFAULT } from "@/components/CaseStudies";
import { CONTACT_CTA_DEFAULT } from "@/components/ContactCTA";
import { AUTHORITY_DEFAULT } from "@/components/AuthorityStrip";
import { CERTIFICATIONS_DEFAULT } from "@/components/Certifications";
import { CASE_STUDIES_ALL_DEFAULT } from "@/components/CaseStudiesGallery";
import { TEAM_DEFAULT } from "@/app/echipa/page";

export const DEFAULT_CONTENT: Record<string, unknown> = {
  hero: HERO_DEFAULT,
  authority: AUTHORITY_DEFAULT,
  case_studies_home: CASE_STUDIES_HOME_DEFAULT,
  case_studies_all: CASE_STUDIES_ALL_DEFAULT,
  certifications: CERTIFICATIONS_DEFAULT,
  video_gallery: VIDEO_GALLERY_DEFAULT,
  testimonials: TESTIMONIALS_DEFAULT,
  news: NEWS_DEFAULT,
  solutions: SOLUTIONS_DEFAULT,
  qa: QA_DEFAULT,
  contact_cta: CONTACT_CTA_DEFAULT,
  team: TEAM_DEFAULT,
  // still not wired
  catalog_tabs: {},
  footer: {},
  header: {},
  service: {},
};

export const WIRED_KEYS = new Set([
  "hero",
  "authority",
  "case_studies_home",
  "case_studies_all",
  "certifications",
  "video_gallery",
  "testimonials",
  "news",
  "solutions",
  "qa",
  "contact_cta",
  "team",
]);
