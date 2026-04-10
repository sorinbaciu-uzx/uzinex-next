import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uzinex — Industrial Equipment & Technology Solutions",
  description:
    "Complete industrial integration: intralogistics, laser & CNC, robotics, heavy machinery, spare parts and technical service. Talk to an engineer.",
  alternates: {
    canonical: "https://uzinex-next.vercel.app/en",
    languages: {
      "ro": "https://uzinex-next.vercel.app/",
      "en": "https://uzinex-next.vercel.app/en",
    },
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
