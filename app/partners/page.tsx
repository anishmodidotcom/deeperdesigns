import type { Metadata } from "next";
import LeadForm from "../start-your-study/LeadForm";
import { StructuredData } from "@/components/StructuredData";
import { renderSerif } from "@/components/industry/text";

// v26 Part 5: the partner and consultant referral page. Linked from the
// footer only, never the main nav. Uses the shared LeadForm via
// variant="partner", which tags source=partner, fires PartnerEnquiry on
// confirmed submission, and never fires Lead.

const DESCRIPTION =
  "Consultants, CAs, agencies and advisors who introduce us to businesses that need software built. Referral terms agreed in writing before anything starts.";

const LINES = [
  "Warm introductions only. No cold lists, no lead scraping.",
  "Referral terms in writing before we approach anyone.",
  "You stay in the loop, or you hand it over. Your call.",
];

export const metadata: Metadata = {
  title: "For Consultants and Partners · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/partners" },
  openGraph: {
    title: "For Consultants and Partners · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/partners",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "For Consultants and Partners · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Consultants and Partners · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const PARTNERS_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Referral partnership",
  serviceType: "Referral partnership for custom software projects",
  description: DESCRIPTION,
  provider: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://www.deeperdesigns.in",
  },
  areaServed: "India",
};

export default function Partners() {
  return (
    <main id="main" style={{ paddingTop: "120px", minHeight: "100vh" }}>
      <StructuredData data={PARTNERS_LD} />
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
            {renderSerif("For consultants {serif}and partners.{/serif}")}
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
            Consultants, CAs, agencies and advisors send us work. If you know a
            business that needs software built, introduce us.
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 32px",
              maxWidth: "620px",
            }}
          >
            We pay 10 to 15 percent of the first project value, agreed in
            writing before anything starts. We sell and we deliver. You keep
            the relationship and the credit for bringing it.
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: "0 0 44px",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              maxWidth: "620px",
            }}
          >
            {LINES.map((line) => (
              <li
                key={line}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "14px",
                  fontSize: "17px",
                  lineHeight: 1.55,
                  color: "var(--fg)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: "10px",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                  }}
                />
                {line}
              </li>
            ))}
          </ul>

          <LeadForm variant="partner" />
        </div>
      </section>
    </main>
  );
}
