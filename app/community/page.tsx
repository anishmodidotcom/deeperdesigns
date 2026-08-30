import type { Metadata } from "next";
import LeadForm from "../start-your-study/LeadForm";

// v23: the founders community page. Inherits the DD shell, indexable, in the
// sitemap. Reuses the lead form via variant="community" so the fields, code
// flow, and styling are identical to /start-your-study, while the events,
// completion email, and copy are the community versions. Free to join; no
// pricing anywhere on this page.
export const metadata: Metadata = {
  title: "Community · Deeper Designs",
  description:
    "A peer group of Indian founders, directors and CXOs figuring out what AI actually does for a business. Free to join. Anish curates who gets in.",
  alternates: { canonical: "https://www.deeperdesigns.in/community" },
  openGraph: {
    title: "Community · Deeper Designs",
    description:
      "A peer group of Indian founders, directors and CXOs figuring out what AI actually does for a business. Free to join. Anish curates who gets in.",
    url: "https://www.deeperdesigns.in/community",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "Community · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Community · Deeper Designs",
    description:
      "A peer group of Indian founders, directors and CXOs figuring out what AI actually does for a business. Free to join. Anish curates who gets in.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

export default function Community() {
  return (
    <main id="main" style={{ paddingTop: "120px", minHeight: "100vh" }}>
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
          <p className="eyebrow" style={{ marginBottom: "28px" }}>
            THE COMMUNITY
          </p>

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
            Figuring out AI for your business?{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              You are not doing it alone.
            </span>
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
            We are building a room of founders, directors and CXOs helping each
            other work out what AI actually does for a business. Real questions,
            real answers, no noise.
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
            It is not a course and not a broadcast list. It is a peer group of
            people running real businesses, figuring this out together. Anish
            reads every request and adds people by hand.
          </p>

          <LeadForm variant="community" />

          <p
            style={{
              marginTop: "24px",
              fontSize: "14px",
              color: "var(--fg-dim)",
              lineHeight: 1.6,
            }}
          >
            Free to join. Drop your details and we will be in touch.
          </p>

          <p
            style={{
              marginTop: "16px",
              fontSize: "13px",
              color: "var(--fg-dim)",
              lineHeight: 1.6,
            }}
          >
            What you share is handled per our{" "}
            <a
              href="/privacy"
              style={{
                color: "var(--accent)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
