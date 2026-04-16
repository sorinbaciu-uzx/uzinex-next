import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Uzinex — Industrial Equipment & Technology Solutions",
  description:
    "Complete industrial integration: intralogistics, laser & CNC, robotics, heavy machinery, spare parts and technical service. Talk to an engineer.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      ro: `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
