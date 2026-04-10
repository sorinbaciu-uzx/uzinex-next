import { Header } from "@/components/Header";
import { Hero, type HeroData } from "@/components/Hero";
import { AuthorityStrip, type AuthorityData } from "@/components/AuthorityStrip";
import { Certifications, type CertificationsData } from "@/components/Certifications";
import { CatalogTabs } from "@/components/CatalogTabs";
import { VideoGallery } from "@/components/VideoGallery";
import { NewsSection, type NewsData } from "@/components/NewsSection";
import { Solutions, type SolutionsData } from "@/components/Solutions";
import { CaseStudies } from "@/components/CaseStudies";
import { TestimonialMarquee } from "@/components/TestimonialMarquee";
import { QASection, type QAData } from "@/components/QASection";
import { ContactCTA, type ContactCTAData } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";

const heroEN: HeroData = {
  eyebrow: "Industrial integrator · Design · Implementation · Service",
  titleLine1: "High-performance",
  titleLine2: "industrial technology &",
  titleHighlight: "superior services.",
  description:
    "We supply heavy equipment and turnkey industrial technology for the private sector, government institutions and the defence sector. We optimise procurement through European funds or government procedures, ensuring full compliance, traceability and a 100% local technical support ecosystem.",
  ctaLabel: "Browse the catalogue",
  ctaHref: "/magazin",
  secondaryCtaLabel: "Talk to an engineer",
  secondaryCtaHref: "#contact",
  stats: [
    { label: "On-site intervention", value: "under 24h" },
    { label: "Engineering team", value: "technical consulting" },
    { label: "Standard warranty", value: "60 months" },
  ],
};

const authorityEN: AuthorityData = {
  items: [
    { value: "+30", label: "Years of technical expertise" },
    { value: "+500", label: "Solutions in portfolio" },
    { value: "40+", label: "Industries served" },
    { value: "0", label: "Issues in EU audits" },
  ],
};

const certificationsEN: CertificationsData = {
  eyebrow: "— Compliance",
  titleLine1: "Certified, eligible,",
  titleLine2: "sustainable.",
  description:
    "All equipment delivered complies with European quality standards and the DNSH principle, is eligible for EU and PNRR-funded procurement, and includes AI-powered interactive manuals for operation, maintenance and operator training.",
  certs: [
    "ISO 9001",
    "ISO 14001",
    "CE Mark",
    "EN 1090",
    "DNSH",
    "PNRR",
    "EBRD",
    "AI Manuals",
  ],
  brandsTitle: "Key components from",
  brands: [
    "Siemens",
    "Mitsubishi Electric",
    "Schneider Electric",
    "ABB",
    "Samsung",
    "Panasonic",
    "Omron",
    "Yaskawa",
    "WEG",
    "Fanuc",
    "Bosch Rexroth",
    "Festo",
    "SMC",
    "Rockwell Automation",
    "Allen-Bradley",
    "Danfoss",
    "SEW-Eurodrive",
  ],
};

const solutionsEN: SolutionsData = {
  eyebrow: "06 / Industry 4.0",
  titleLine1: "Integrated solutions",
  titleLine2: "for the factory of the future.",
  description:
    "Six technology directions we integrate turnkey: from plug & play IIoT sensors, to cobots, predictive maintenance, optical inspection, MES connectivity and custom industrial software.",
  ctaLabel: "Request a free assessment",
  ctaHref: "#contact",
  items: [
    {
      num: "01",
      industry: "IIoT & Plug & Play Monitoring",
      image: "",
      description:
        "Find out in real time how much each machine produces and how much it stands idle. We mount sensors on any equipment — new or old — and within hours you have the OEE dashboard on your phone.",
      bullets: ["OEE dashboard from day one", "Installation without stopping production", "Investment recovered in 3-6 months"],
      package: "UZX-IIoT",
    },
    {
      num: "02",
      industry: "Collaborative Robotics",
      image: "",
      description:
        "Solve the labour shortage without tripling your costs. The cobot works safely alongside your people — palletising, feeding the CNC, welding — while you recover your investment in 12-18 months.",
      bullets: ["ROI in 12-18 months", "Installation + programming included", "30-40% below European distributors"],
      package: "UZX-Cobots",
    },
    {
      num: "03",
      industry: "Predictive Maintenance",
      image: "",
      description:
        "Don't wait for it to break. Our algorithms analyse sensor data and tell you exactly which part will fail and when — we bring the spare part to your production line before the failure occurs.",
      bullets: ["Zero unplanned production stops", "Spare part arrives before failure", "Essential for public contracts & defence"],
      package: "UZX-Predictive",
    },
    {
      num: "04",
      industry: "Optical Inspection",
      image: "",
      description:
        "Eliminate rejects before they reach your client. Our cameras inspect every piece at speeds impossible to match manually, detecting sub-millimetre defects.",
      bullets: ["Defects under 1mm detected live", "Mounts on existing conveyor belt", "90%+ fewer rejects for export clients"],
      package: "UZX-Vision",
    },
    {
      num: "05",
      industry: "Edge Computing & MES Connectivity",
      image: "",
      description:
        "Connect your machines to your office, regardless of brand or age. Our gateway automatically translates data from any machine into your ERP format.",
      bullets: ["Compatible with any machine brand", "Live production data in ERP/MES", "Implementation under 2 weeks"],
      package: "UZX-Edge",
    },
    {
      num: "06",
      industry: "Custom Industrial Software",
      image: "",
      description:
        "Got a process no off-the-shelf software can solve? We develop custom industrial applications — from personalised SCADA panels to lot traceability. The code is yours, runs on your servers.",
      bullets: ["Custom SCADA & HMI panels", "Complete lot-by-lot traceability", "Proprietary code, zero recurring licenses"],
      package: "UZX-Software",
    },
  ],
};

const newsEN: NewsData = {
  eyebrow: "05 / News & press releases",
  titleLine1: "Latest articles,",
  titleHighlight: "press releases & studies.",
  description:
    "Editorial perspective on industrial integration, European funding and trends in automation and defence.",
  articles: [],
};

const qaEN: QAData = {
  eyebrow: "07 / FAQ",
  titleLine1: "Frequently",
  titleLine2: "asked questions.",
  description:
    "Answers to the most common technical and commercial questions. Can't find what you're looking for?",
  contactLabel: "Contact the team →",
  items: [
    {
      q: "What warranty do you offer?",
      a: "All equipment comes with a standard 60-month warranty covering manufacturing defects, functional performance and availability of original spare parts. Extended warranty and custom SLA contracts are available for mission-critical installations.",
    },
    {
      q: "Do you deliver and install nationwide?",
      a: "Yes. Uzinex delivers and installs across Romania with on-site intervention guaranteed under 24 hours. We have service centres in Iași, Bucharest and Cluj-Napoca, plus mobile intervention units for priority calls.",
    },
    {
      q: "Can I procure equipment through European funds (PNRR/POIM)?",
      a: "Absolutely. All equipment in our portfolio is EU-eligible and DNSH-compliant. We provide free pre-contractual consulting to help structure your funding file — from technical specifications to audit-ready documentation.",
    },
    {
      q: "Do you serve the defence sector?",
      a: "Yes. Uzinex is an accredited supplier for classified government procurement. Our portfolio is eligible for contracts with MApN, IGSU and other defence operators, with full origin traceability and NATO compliance where applicable.",
    },
    {
      q: "What is the AI service manual?",
      a: "Every piece of equipment delivered by Uzinex comes with a digital interactive manual powered by artificial intelligence. Operators can ask questions in natural language, by voice or through images and receive precise, step-by-step instructions specific to their equipment. Available offline, 24/7.",
    },
  ],
};

const contactEN: ContactCTAData = {
  eyebrow: "08 / Contact",
  titleLine1: "Let's build together",
  titleLine2: "your next",
  titleHighlight: "project.",
  description:
    "Contact our team and receive a personalised quote within 24 business hours.",
  phoneLabel: "Phone",
  phone: "+40 769 081 081",
  emailLabel: "Email",
  email: "info@uzinex.ro",
  addressLabel: "Headquarters",
  addressLine1: "Science & Technology Park Tehnopolis",
  addressLine2: "Bd. Poitiers no. 10, 700671 Iași, Romania",
  ctaLabel: "Talk to an engineer",
  ctaHref: "#",
};

export default function EnHomePage() {
  return (
    <>
      <Header lang="en" />
      <Hero data={heroEN} />
      <AuthorityStrip data={authorityEN} />
      <CaseStudies />
      <Certifications data={certificationsEN} />
      <VideoGallery />
      <TestimonialMarquee />
      <CatalogTabs />
      <Solutions data={solutionsEN} />
      <NewsSection data={newsEN} />
      <QASection data={qaEN} />
      <ContactCTA data={contactEN} />
      <Footer />
    </>
  );
}
