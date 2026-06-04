import type { Metadata } from "next";
import HomeHero from "./_home/HomeHero";
import HomeOutcomes from "./_home/HomeOutcomes";
import HomeFounderQuote from "./_home/HomeFounderQuote";
import HomeGallery from "./_home/HomeGallery";
import HomeLiveBuilds from "./_home/HomeLiveBuilds";
import HomeStudioMind from "./_home/HomeStudioMind";
import HomeBrings from "./_home/HomeBrings";
import HomeStack from "./_home/HomeStack";
import HomeFAQ from "./_home/HomeFAQ";
import HomeCTA from "./_home/HomeCTA";

// v18: explicit home metadata so it does not silently inherit. The
// description leads with the "AI-led build studio" positioning and
// stays inside the 140 to 160 char window.
export const metadata: Metadata = {
  title: "Deeper Designs · AI-led build studio for ambitious Indian businesses",
  description:
    "India's AI-led build studio. We design and ship custom digital tools, AI agents, and operational systems for ambitious Indian businesses. From ₹25,000.",
  alternates: { canonical: "https://www.deeperdesigns.in/" },
  openGraph: {
    title: "Deeper Designs · AI-led build studio for ambitious Indian businesses",
    siteName: "Deeper Designs",
    description: "India's AI-led build studio. We design and ship custom digital tools, AI agents, and operational systems. From ₹25,000.",
    url: "https://www.deeperdesigns.in/",
    type: "website",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Deeper Designs · Custom tools, built around how your business actually works." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Designs · AI-led build studio for ambitious Indian businesses",
    description: "India's AI-led build studio. We design and ship custom digital tools, AI agents, and operational systems. From ₹25,000.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeOutcomes />
      <HomeFounderQuote />
      <HomeGallery />
      <HomeLiveBuilds />
      <HomeStudioMind />
      <HomeBrings />
      <HomeStack />
      <HomeFAQ />
      <HomeCTA />
    </main>
  );
}
