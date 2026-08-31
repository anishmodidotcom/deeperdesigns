import type { Metadata } from "next";
import LeadForm from "./LeadForm";

export const metadata: Metadata = {
  title: "Start Your Study · Deeper Designs",
  description: "Tell us where to reach you. Thirty seconds, four fields. We study your business and come back with what AI can actually do for you.",
  alternates: { canonical: "https://www.deeperdesigns.in/start-your-study" },
  openGraph: {
    title: "Start Your Study · Deeper Designs",
    description: "Tell us where to reach you. Thirty seconds, four fields. We study your business and come back with what AI can actually do for you.",
    url: "https://www.deeperdesigns.in/start-your-study",
    siteName: "Deeper Designs",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Start Your Study · Deeper Designs" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Start Your Study · Deeper Designs",
    description: "Tell us where to reach you. Thirty seconds, four fields. We study your business and come back with what AI can actually do for you.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

// v21: the single-step lead form replaces the 11-step study flow. The URL
// stays so every existing link, ad destination, and the ?from={industry}
// attribution keep working. WhatsApp remains available as a parallel
// channel below the form, never as a gate in front of it.
export default function StartYourStudy() {
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
            TALK TO US
          </p>

          <LeadForm />

          {/* v28.1: the inline "Rather just message" WhatsApp link is
              removed. On a form error the page showed three WhatsApp
              affordances at once: the green button in the error state, this
              inline link, and the floating button. Two is enough, and the
              floating button is always present anyway. */}

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
