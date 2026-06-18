import type { Metadata } from "next";
import React from "react";
import {
  STUDIO_EMAIL,
  STUDIO_EMAIL_HREF,
  WHATSAPP_NUMBER,
  WHATSAPP_HREF,
} from "@/lib/contact";

const LAST_UPDATED = "18 June 2026";
const CANONICAL = "https://www.deeperdesigns.in/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy · Deeper Designs",
  description:
    "How Deeper Designs collects, uses, and protects your information, including our use of cookies, analytics, and the Meta Pixel and Conversions API.",
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: "Privacy Policy · Deeper Designs",
    description:
      "How Deeper Designs collects, uses, and protects your information.",
    url: CANONICAL,
    siteName: "Deeper Designs",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · Deeper Designs",
    description:
      "How Deeper Designs collects, uses, and protects your information.",
  },
};

type Section = { heading: string; body?: string; bullets?: string[]; after?: string };

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: `Deeper Designs is an AI-led studio that builds custom digital tools and systems for businesses. You can reach us at ${STUDIO_EMAIL} or on WhatsApp at ${WHATSAPP_NUMBER}.`,
  },
  {
    heading: "Information we collect",
    bullets: [
      "Information you give us. When you fill in a form, request a study, or message us, we collect what you share, such as your name, email, phone or WhatsApp number, your business, and the details of your enquiry.",
      "Information collected automatically. When you visit the site we automatically collect standard technical data such as your device and browser type, IP address, pages viewed, time on page, and how you arrived (for example from an advertisement). We collect this through cookies and similar technologies, including analytics and advertising tools described below.",
    ],
  },
  {
    heading: "Cookies and tracking technologies",
    body: "We use cookies and similar technologies to run the site, understand how it is used, and measure and improve our advertising. This includes:",
    bullets: [
      "The Meta (Facebook) Pixel and Conversions API, which help us understand which ads bring visitors to our site and how those visitors interact with it, so we can measure and improve our campaigns. This may involve sharing limited event information (such as a page view or a button click) with Meta. Meta may use this data in line with its own data policy.",
      "Analytics tools that help us understand site usage in aggregate.",
    ],
    after: "You can control cookies through your browser settings, and you can manage ad preferences through the settings offered by the relevant platforms (for example, Meta's ad preferences).",
  },
  {
    heading: "How we use your information",
    body: "We use the information we collect to:",
    bullets: [
      "respond to your enquiries and provide the services you ask for;",
      "operate, maintain and improve the website and our offerings;",
      "measure and improve our marketing and advertising;",
      "communicate with you about your enquiry or our services;",
      "meet legal and regulatory obligations.",
    ],
  },
  {
    heading: "How we share information",
    body: "We do not sell your personal information. We share information only with:",
    bullets: [
      "service providers who help us run the site and our business (for example hosting, email delivery, analytics and advertising platforms), who may process data on our behalf;",
      "advertising and analytics platforms such as Meta, as described above;",
      "authorities or others where required by law.",
    ],
  },
  {
    heading: "Advertising",
    body: "We advertise on platforms such as Meta. With the Meta Pixel and Conversions API we measure the results of our ads and may show ads to people based on their visit to our site. You can opt out of personalised advertising through the ad settings of the relevant platform and through your browser and device controls.",
  },
  {
    heading: "Data retention",
    body: "We keep personal information only as long as needed for the purposes described here, to provide our services, and to meet legal obligations, after which we delete or anonymise it.",
  },
  {
    heading: "Your choices and rights",
    body: `You can ask us to access, correct, or delete the personal information we hold about you, and you can withdraw consent to marketing communications at any time. To make a request, contact us at ${STUDIO_EMAIL}. Depending on your location, you may have additional rights under applicable data protection law.`,
  },
  {
    heading: "International users",
    body: "We operate from India and serve clients in India and abroad. If you contact us from another country, your information may be processed in India and other locations where we or our service providers operate.",
  },
  {
    heading: "Children",
    body: "The site and our services are intended for businesses and adults. We do not knowingly collect personal information from children.",
  },
  {
    heading: "Changes to this policy",
    body: 'We may update this policy from time to time. When we do, we will change the "Last updated" date above. Significant changes will be made clear on this page.',
  },
  {
    heading: "Contact us",
    body: `If you have questions about this policy or your information, contact us at ${STUDIO_EMAIL} or on WhatsApp at ${WHATSAPP_NUMBER}.`,
  },
];

// Linkify the email and WhatsApp number wherever they appear in the prose.
function renderWithLinks(text: string): React.ReactNode {
  const parts = text.split(new RegExp(`(${STUDIO_EMAIL}|${WHATSAPP_NUMBER.replace(/[+]/g, "\\+")})`, "g"));
  return parts.map((part, i) => {
    if (part === STUDIO_EMAIL) {
      return (
        <a key={i} href={STUDIO_EMAIL_HREF} style={{ color: "var(--dd-indigo-soft, #818CF8)" }}>
          {part}
        </a>
      );
    }
    if (part === WHATSAPP_NUMBER) {
      return (
        <a key={i} href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dd-indigo-soft, #818CF8)" }}>
          {part}
        </a>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

const pageStyle = {
  background: "var(--dd-bg)",
  color: "var(--dd-text-high)",
  minHeight: "100vh",
} as React.CSSProperties;

const bodyStyle: React.CSSProperties = {
  fontSize: 17,
  lineHeight: 1.7,
  color: "var(--dd-text-mid)",
  margin: 0,
  maxWidth: 680,
};

export default function PrivacyPolicy() {
  return (
    <main style={pageStyle}>
      <section
        style={{
          maxWidth: 840,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
          paddingTop: 160,
          paddingBottom: 120,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dd-indigo-soft, #818CF8)",
            margin: "0 0 32px",
          }}
        >
          LEGAL · PRIVACY
        </p>

        <h1
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.04,
            margin: "0 0 20px",
          }}
        >
          Privacy Policy
        </h1>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 13,
            letterSpacing: "0.04em",
            color: "var(--dd-text-low)",
            margin: "0 0 40px",
          }}
        >
          Last updated: {LAST_UPDATED}
        </p>

        <p style={{ ...bodyStyle, marginBottom: 16 }}>
          Deeper Designs Private Limited (&quot;Deeper Designs&quot;, &quot;we&quot;, &quot;us&quot;) operates the website
          deeperdesigns.in. This policy explains what information we collect, how we use it, and the choices you
          have. We keep this simple and plain.
        </p>

        {SECTIONS.map((s) => (
          <article key={s.heading} style={{ paddingBlock: 40, borderTop: "1px solid var(--dd-border)", marginTop: 16 }}>
            <h2
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                margin: "0 0 16px",
              }}
            >
              {s.heading}
            </h2>

            {s.body ? <p style={bodyStyle}>{renderWithLinks(s.body)}</p> : null}

            {s.bullets ? (
              <ul
                style={{
                  listStyle: "disc",
                  paddingLeft: 22,
                  margin: s.body ? "14px 0 0" : 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  maxWidth: 680,
                }}
              >
                {s.bullets.map((b, bi) => (
                  <li key={bi} style={{ fontSize: 17, lineHeight: 1.6, color: "var(--dd-text-mid)" }}>
                    {renderWithLinks(b)}
                  </li>
                ))}
              </ul>
            ) : null}

            {s.after ? <p style={{ ...bodyStyle, marginTop: 14 }}>{renderWithLinks(s.after)}</p> : null}
          </article>
        ))}

        <p
          style={{
            paddingTop: 40,
            borderTop: "1px solid var(--dd-border)",
            marginTop: 16,
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dd-text-low)",
            margin: 0,
          }}
        >
          DEEPER DESIGNS PRIVATE LIMITED · DELHI · {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}
