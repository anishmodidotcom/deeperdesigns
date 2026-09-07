import type { Metadata } from "next";
import Link from "next/link";
import "../preflight.css";
import { SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";
import { PRODUCTS } from "@/lib/products";

// v29.4: Razorpay requires a shipping or delivery policy before it will
// enable international payments, digital goods included. Indexable and
// in the sitemap, because their review reads the live page.

export const metadata: Metadata = {
  title: "Delivery policy · Preflight",
  description:
    "How Preflight is delivered: a digital download emailed on payment, normally within minutes and always within 24 hours.",
  alternates: {
    canonical: "https://www.deeperdesigns.in/preflight/delivery-policy",
  },
  robots: { index: true, follow: true },
};

const MONO = "var(--font-geist-mono), monospace";

const product = PRODUCTS.preflight;

const PARAGRAPHS = [
  `${product.name} is a digital product. There is no physical shipping.`,
  "On successful payment, your download link is emailed to the address you entered, normally within minutes and always within 24 hours.",
  `If the email has not arrived within 24 hours, check your spam folder, then reply to your payment confirmation or WhatsApp ${WHATSAPP_NUMBER} and we will resend it.`,
  "Refreshes are delivered by email for 12 months from purchase.",
];

export default function PreflightDeliveryPolicyPage() {
  return (
    <main id="main" className="pf-root">
      <section
        style={{
          padding: "clamp(64px,9vh,112px) clamp(20px,4vw,48px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              margin: "0 0 24px",
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#7C6CFF",
            }}
          >
            Preflight · Launch audit suite for AI-built products
          </p>

          <h1
            style={{
              margin: "0 0 clamp(36px,4vw,52px)",
              fontSize: "clamp(34px,4.6vw,56px)",
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Delivery policy
          </h1>

          <div style={{ display: "grid", gap: 24 }}>
            {PARAGRAPHS.map((text) => (
              <p
                key={text}
                style={{
                  margin: 0,
                  maxWidth: "68ch",
                  fontSize: "clamp(16px,1.2vw + 8px,18px)",
                  lineHeight: 1.6,
                  color: "#F5F5F5",
                  textWrap: "pretty",
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "clamp(40px,5vh,64px) clamp(20px,4vw,48px)",
          background: "#0A0A0B",
        }}
      >
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px 28px",
            alignItems: "center",
            fontSize: 16,
          }}
        >
          <Link href="/preflight" className="pf-link-underline">
            Back to Preflight
          </Link>
          <Link href={product.termsPath} className="pf-link-underline">
            Terms
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="pf-link-underline">
            {SUPPORT_EMAIL}
          </a>
          <Link href="/privacy" className="pf-link-underline">
            Privacy
          </Link>
        </div>
      </footer>
    </main>
  );
}
