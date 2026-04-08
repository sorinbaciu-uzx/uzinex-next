// Central registry of default content for each editable block.
// Components import their typed default from here AND export it,
// so the admin "Reset" button and DB seeder always have a single source of truth.
//
// Blocks marked as `null` are not yet wired to the DB — admin can still edit
// them but changes won't appear on the site until the matching component is
// updated to read from `getContent()`.

import { HERO_DEFAULT } from "@/components/Hero";
import { NEWS_DEFAULT } from "@/components/NewsSection";
import { QA_DEFAULT } from "@/components/QASection";
import { VIDEO_GALLERY_DEFAULT } from "@/components/VideoGallery";
import { TESTIMONIALS_DEFAULT } from "@/components/TestimonialMarquee";
import { SOLUTIONS_DEFAULT } from "@/components/Solutions";
import { CASE_STUDIES_HOME_DEFAULT } from "@/components/CaseStudies";
import { CONTACT_CTA_DEFAULT } from "@/components/ContactCTA";

export const DEFAULT_CONTENT: Record<string, unknown> = {
  hero: HERO_DEFAULT,
  case_studies_home: CASE_STUDIES_HOME_DEFAULT,
  video_gallery: VIDEO_GALLERY_DEFAULT,
  testimonials: TESTIMONIALS_DEFAULT,
  news: NEWS_DEFAULT,
  solutions: SOLUTIONS_DEFAULT,
  qa: QA_DEFAULT,
  contact_cta: CONTACT_CTA_DEFAULT,
  // not yet wired — editor still works for these
  authority: {},
  case_studies_all: {},
  certifications: {},
  catalog_tabs: {},
  footer: {},
  header: {},
  team: {},
  service: {},
  cariere: {},
};

export const WIRED_KEYS = new Set([
  "hero",
  "case_studies_home",
  "video_gallery",
  "testimonials",
  "news",
  "solutions",
  "qa",
  "contact_cta",
]);
