import type { Metadata } from "next";
import LeadForm from "../start-your-study/LeadForm";
import { StructuredData } from "@/components/StructuredData";
import { renderSerif } from "@/components/industry/text";

// v26 Part 4: the teardown offer, a second front-end offer beside the
// strategy call. Same form machinery as /community: the shared LeadForm
// via variant="teardown", which tags source=teardown, fires
// TeardownRequest on confirmed submission, and never fires Lead.

const DESCRIPTION =
  "Send us your details and we will study how your business runs, then write down where it leaks and send it to you. Free, no call required.";

export const metadata: Metadata = {
  title: "Free Teardown · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/teardown" },
  openGraph: {
    title: "Free Teardown · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/teardown",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "Free Teardown · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Teardown · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const TEARDOWN_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Business teardown",
  serviceType: "Business process review",
  description: DESCRIPTION,
  provider: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://www.deeperdesigns.in",
  },
  areaServed: "India",
  offers: {
    "@type": "Offer",
    price: 0,
    priceCurrency: "INR",
  },
};

export default function Teardown() {
  return (
    <main id="main" style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <StructuredData data={TEARDOWN_LD} />
      <section style={{ paddingBlock: "40px 64px" }}>
        <div
          className="container"
          style={{
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
            }}
          >
            {renderSerif(
              "We will take your business apart {serif}and show you where it leaks.{/serif}",
            )}
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 20px",
              maxWidth: "620px",
            }}
          >
            Send us your details and we will study how your business runs:
            where enquiries go cold, where staff time disappears into copying
            between systems, where money slips out quietly. Then we write it
            down and send it to you.
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 44px",
              maxWidth: "620px",
            }}
          >
            Free. No call required. You get the document whether you ever hire
            us or not.
          </p>

          <LeadForm variant="teardown" />

          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "var(--fg-dim)",
              lineHeight: 1.6,
            }}
          >
            We usually send it back within a few working days.
          </p>
        </div>
      </section>
    </main>
  );
}
