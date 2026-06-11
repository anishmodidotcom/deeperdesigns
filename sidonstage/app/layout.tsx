import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import FilmGrain from "@/components/FilmGrain";
import ParticleField from "@/components/ParticleField";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Sid on Stage. The Voice of Your Event. Siddhant Pamnani, Corporate Emcee.",
  description:
    "Siddhant Pamnani is a corporate emcee creating powerful stage experiences for India's leading corporate events, leadership summits, product launches, and high impact business gatherings.",
  openGraph: {
    title: "Sid on Stage. The Voice of Your Event.",
    description:
      "Siddhant Pamnani, corporate emcee. Stage experiences for India's leading events.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sid on Stage. The Voice of Your Event.",
    description: "Siddhant Pamnani, corporate emcee.",
  },
};

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Anton&family=Bricolage+Grotesque:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={FONT_URL} />
      </head>
      <body className="antialiased">
        <SmoothScroll>
          <ScrollProgress />
          {children}
          <ParticleField />
          <FilmGrain />
        </SmoothScroll>
      </body>
    </html>
  );
}
