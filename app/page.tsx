import type { Metadata } from "next";
import HomeHero from "./_home/HomeHero";
import HomeOwnership from "./_home/HomeOwnership";
import HomeBuildIntegrate from "./_home/HomeBuildIntegrate";
import HomeArchitecture from "./_home/HomeArchitecture";
import HomeConfusion from "./_home/HomeConfusion";
import HomeProof from "./_home/HomeProof";
import HomeHowItWorks from "./_home/HomeHowItWorks";
import HomeOutcomes from "./_home/HomeOutcomes";
import HomeFounderQuote from "./_home/HomeFounderQuote";
import HomeGallery from "./_home/HomeGallery";
import HomeLiveBuilds from "./_home/HomeLiveBuilds";
import HomeStudioMind from "./_home/HomeStudioMind";
import HomeBrings from "./_home/HomeBrings";
import HomeStack from "./_home/HomeStack";
import HomeFAQ from "./_home/HomeFAQ";
import HomeCommunity from "./_home/HomeCommunity";
import HomeCTA from "./_home/HomeCTA";

// v22: outcome-first metadata (part of the de-tech sweep). The old
// description led with "AI-led build studio ... AI agents"; the audience
// is owners, so the promise leads with what the software does, not what
// it is made of.
export const metadata: Metadata = {
  title: "Deeper Designs · Software that quietly runs your business",
  description:
    "We build working tools for how your business actually runs. Enquiries answered, follow-ups that never slip, payments chased without you. From ₹25,000.",
  alternates: { canonical: "https://www.deeperdesigns.in/" },
  openGraph: {
    title: "Deeper Designs · Software that quietly runs your business",
    siteName: "Deeper Designs",
    description: "Working tools for how your business actually runs. Enquiries answered, follow-ups that never slip. From ₹25,000.",
    url: "https://www.deeperdesigns.in/",
    type: "website",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Deeper Designs · Custom tools, built around how your business actually works." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deeper Designs · Software that quietly runs your business",
    description: "Working tools for how your business actually runs. Enquiries answered, follow-ups that never slip. From ₹25,000.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

export default function Home() {
  return (
    <main id="main">
      <HomeHero />
      {/* v26: the ownership layer, directly beneath the untouched hero. */}
      <HomeOwnership />
      {/* v27: why a build can cost a fraction, placed before the confusion
          block so the claim above it is answered immediately. */}
      <HomeArchitecture />
      <HomeConfusion />
      <HomeOutcomes />
      <HomeProof />
      {/* v26: what we build and what we integrate, after the proof strip. */}
      <HomeBuildIntegrate />
      <HomeFounderQuote />
      <HomeGallery />
      <HomeLiveBuilds />
      <HomeStudioMind />
      <HomeBrings />
      <HomeHowItWorks />
      <HomeStack />
      <HomeFAQ />
      <HomeCommunity />
      <HomeCTA />
    </main>
  );
}
