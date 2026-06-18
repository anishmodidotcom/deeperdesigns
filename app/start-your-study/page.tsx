import type { Metadata } from "next";
import StudyForm from "./StudyForm";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";

export const metadata: Metadata = {
  title: "Start Your Study · Deeper Designs",
  description: "Start a conversation with Deeper Designs. WhatsApp us with your business and what's slowing you down. We respond within 4 hours.",
  alternates: { canonical: "https://www.deeperdesigns.in/start-your-study" },
  openGraph: {
    title: "Start Your Study · Deeper Designs",
    description: "Start a conversation with Deeper Designs. WhatsApp us with your business and what's slowing you down. We respond within 4 hours.",
    url: "https://www.deeperdesigns.in/start-your-study",
    siteName: "Deeper Designs",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Start Your Study · Deeper Designs" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Study · Deeper Designs",
    description: "Start a conversation with Deeper Designs. WhatsApp us with your business and what's slowing you down. We respond within 4 hours.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

export default function StartYourStudy() {
  return (
    <main style={{ paddingTop: "120px", minHeight: "100vh" }}>
      {/* F3 (v16): WhatsApp-first primary CTA per locked DNA. The 11-question
          wizard remains below for those who prefer to start in writing. */}
      <section
        style={{
          paddingBlock: "32px 96px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: "720px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>
            TALK TO US
          </p>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            WhatsApp first. Discovery call. Written scope in 24 hours.
          </h1>
          <p
            style={{
              fontSize: "19px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              marginBottom: "40px",
              maxWidth: "560px",
            }}
          >
            Send us a sentence on your business and what is slowing you
            down. We respond within four hours, in your timezone.
          </p>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "48px",
            }}
          >
            <TrackedWhatsAppLink
              href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business."
              className="btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ padding: "16px 24px", fontSize: "16px" }}
            >
              Start on WhatsApp · +91 99687 16498
            </TrackedWhatsAppLink>
          </div>
          <p
            style={{
              fontSize: "14px",
              color: "var(--fg-dim)",
              lineHeight: 1.6,
            }}
          >
            Prefer to start in writing?{" "}
            <a
              href="#study-form"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Take the 11-question study below.
            </a>
          </p>
        </div>
      </section>

      <section id="study-form" style={{ scrollMarginTop: "100px" }}>
        <StudyForm />
      </section>

      <div className="container" style={{ maxWidth: "720px" }}>
        <p
          style={{
            fontSize: "13px",
            color: "var(--fg-dim)",
            lineHeight: 1.6,
            paddingBlock: "28px 8px",
          }}
        >
          What you share is handled per our{" "}
          <a
            href="/privacy"
            style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
