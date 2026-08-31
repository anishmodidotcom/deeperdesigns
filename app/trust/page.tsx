import type { Metadata } from "next";
import { StructuredData } from "@/components/StructuredData";
import StandardCTA from "@/components/StandardCTA";
import { renderSerif } from "@/components/industry/text";

// v28 Part 5: the trust, security and reliability page. Answers the three
// real objections to custom software from a small studio: is it secure,
// does it hold up, and what happens if you disappear.
//
// Deliberately contains NO response time, resolution time or uptime
// percentage. Those numbers are pending confirmation and inventing one here
// would be exactly the kind of claim the rest of the site refuses to make.
// A follow-up pass adds the real commitments.

const DESCRIPTION =
  "How we build, secure and support the software we make: access control, encrypted and backed up data, real cloud infrastructure, and code and data you own and can take with you.";

const SECTIONS = [
  {
    label: "How we build it",
    body: "Every system we build has proper login and access control, so people see only what their role allows. No shared logins. Data is encrypted, backed up regularly, and stays yours. We do not train anything on your business data, and we do not sell it.",
  },
  {
    label: "What it runs on",
    body: "Your software runs on the same cloud infrastructure large companies use, so it scales when your traffic does. We monitor it, and we know when something is wrong before you call us.",
  },
  {
    label: "When something breaks",
    body: "Things break. What matters is what happens next. We maintain what we build, and you can reach us on WhatsApp, not a ticket portal that answers in three days.",
  },
  {
    label: "If you ever want to leave",
    body: "You own the code and the data, and we hand over both, documented, whenever you ask. You are never locked to us. That is the point of owning your software instead of renting it. We build on standard, widely used technology, not anything exotic, so any competent development team can pick it up and carry on.",
  },
  {
    label: "We run our own on it",
    body: "Outpost, Oviya Studio, Deeper Content and Maple Lens are our own products, live, running on the same stack we build yours on. If it were fragile, we would be the first to know.",
  },
];

export const metadata: Metadata = {
  title: "Trust, Security and Support · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/trust" },
  openGraph: {
    title: "Trust, Security and Support · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/trust",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "Trust, Security and Support · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust, Security and Support · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const TRUST_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Software you can actually rely on, and keep",
  description: DESCRIPTION,
  url: "https://www.deeperdesigns.in/trust",
  isPartOf: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://www.deeperdesigns.in",
  },
};

export default function Trust() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <StructuredData data={TRUST_LD} />

      <section style={{ padding: "60px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            {renderSerif(
              "Software you can actually rely on, {serif}and keep.{/serif}",
            )}
          </h1>
          <p
            style={{
              fontSize: "21px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "760px",
            }}
          >
            The honest worry with custom software is not whether it works on
            day one. It is whether it is secure, whether it holds up, and what
            happens to you if the people who built it disappear. Here are the
            answers.
          </p>
        </div>
      </section>

      {SECTIONS.map((s) => (
        <section key={s.label} style={{ paddingBottom: "var(--section-py)" }}>
          <div className="container" style={{ maxWidth: "820px" }}>
            <h2
              className="mono"
              style={{
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--dd-eyebrow-on-dark)",
                margin: "0 0 18px",
              }}
            >
              {s.label}
            </h2>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.65,
                color: "var(--fg)",
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </div>
        </section>
      ))}

      <StandardCTA />
    </main>
  );
}
