import type { Metadata } from "next";
import { Suspense } from "react";
import LeadForm from "../start-your-study/LeadForm";
import { StructuredData } from "@/components/StructuredData";
import { renderSerif } from "@/components/industry/text";

// v30: the free audit. This replaces /teardown, which now permanently
// redirects here: the teardown and the audit were the same offer
// described two ways, so they are one page with one name.
//
// The form is the shared LeadForm via variant="audit", which tags
// source=audit, fires AuditFormStart and AuditRequest, and never fires
// Lead. Lead stays a single call site on the strategy-call variant.

const DESCRIPTION =
  "A free initial business audit. A number, not a pitch. Tell us what you want to improve and we tell you what we would investigate first.";

export const metadata: Metadata = {
  title: "Free audit · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/audit" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Free audit · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/audit",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "Free audit · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free audit · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const AUDIT_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Free business audit",
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

const STEPS = [
  {
    n: "01",
    title: "A CONVERSATION",
    lead: "Thirty minutes, no deck",
    body: "How your business runs, what you want to change, what is in the way. That is the whole call.",
  },
  {
    n: "02",
    title: "A WALKTHROUGH",
    lead: "For businesses that fit",
    body: "Your processes, your team and your data. On a call or on site, depending on the business.",
  },
  {
    n: "03",
    title: "FINDINGS IN WRITING",
    lead: "What we would do first",
    body: "Where the opportunity is, what should change, what it would take, and the number it should move. You keep it whether you hire us or not.",
  },
];

const GOOD_FIT = [
  "Owner-led B2B businesses in India, roughly ten to thirty people.",
  "Manufacturers, traders, distributors, importers, exporters, and businesses like them.",
  "Running on Tally, Excel, WhatsApp and phone calls.",
  "Curious about what technology could do, not sure where to start.",
];

const NOT_FIT = [
  "You want a report and not a system. We build what we recommend.",
  "You want everything automated because it can be. We build what pays.",
];

const eyebrow: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--dd-indigo, #7C6CFF)",
  margin: "0 0 20px",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "12px",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--fg-dim)",
  margin: "0 0 28px",
};

export default function AuditPage() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <StructuredData data={AUDIT_LD} />

      {/* Hero */}
      <section style={{ paddingBlock: "40px 72px" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="mono" style={eyebrow}>
            The free audit
          </p>
          <h1
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
              textWrap: "pretty",
            }}
          >
            {renderSerif(
              "Tell us what you want to improve. {serif}We tell you what we would investigate first.{/serif}",
            )}
          </h1>
          <p
            style={{
              fontSize: "20px",
              lineHeight: 1.6,
              color: "var(--fg-muted)",
              margin: 0,
              maxWidth: "620px",
            }}
          >
            A free initial business audit. A number, not a pitch.
          </p>
        </div>
      </section>

      {/* What happens */}
      <section style={{ paddingBlock: "56px", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <p className="mono" style={sectionLabel}>
            What happens
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: "24px",
            }}
          >
            {STEPS.map((step) => (
              <div
                key={step.n}
                style={{
                  padding: "28px",
                  border: "1px solid var(--border)",
                  borderRadius: "16px",
                  background: "var(--bg-card, #161616)",
                }}
              >
                <p
                  className="mono"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    color: "var(--dd-indigo, #7C6CFF)",
                    margin: "0 0 18px",
                  }}
                >
                  {step.n} {step.title}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    lineHeight: 1.35,
                    fontWeight: 500,
                    margin: "0 0 12px",
                  }}
                >
                  {step.lead}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: "var(--fg-muted)",
                    margin: 0,
                    textWrap: "pretty",
                  }}
                >
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it fits */}
      <section style={{ paddingBlock: "56px", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "1100px" }}>
          <p className="mono" style={sectionLabel}>
            Who it fits
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
              gap: "20px",
            }}
          >
            <FitColumn
              title="A good fit"
              accent="var(--dd-indigo, #7C6CFF)"
              items={GOOD_FIT}
            />
            <FitColumn
              title="Not the right fit"
              accent="var(--fg-muted)"
              items={NOT_FIT}
            />
          </div>
        </div>
      </section>

      {/* The anti-promise */}
      <section style={{ paddingBlock: "72px", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p
            style={{
              fontFamily: "var(--font-instrument-serif), Georgia, serif",
              fontStyle: "italic",
              fontSize: "clamp(26px, 4vw, 40px)",
              lineHeight: 1.25,
              margin: 0,
              textWrap: "pretty",
            }}
          >
            If building it will not pay for itself, we tell you. And we do not
            build it.
          </p>
        </div>
      </section>

      {/* The form */}
      <section style={{ paddingBlock: "56px 96px", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          {/* The note field prefills from ?q=, which LeadForm reads on the
              client. Suspense keeps the page prerenderable. */}
          <Suspense fallback={null}>
            <LeadForm variant="audit" />
          </Suspense>
        </div>
      </section>
    </main>
  );
}

function FitColumn({
  title,
  accent,
  items,
}: {
  title: string;
  accent: string;
  items: string[];
}) {
  return (
    <div
      style={{
        padding: "clamp(24px,2.4vw,36px)",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        background: "var(--bg-card, #161616)",
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: "11px",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: accent,
          margin: "0 0 24px",
        }}
      >
        {title}
      </p>
      <div style={{ display: "grid", gap: "16px" }}>
        {items.map((item) => (
          <p
            key={item}
            style={{
              margin: 0,
              fontSize: "17px",
              lineHeight: 1.55,
              color: "var(--fg)",
              textWrap: "pretty",
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
