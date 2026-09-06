import type { Metadata } from "next";
import Link from "next/link";
import "../preflight.css";
import { SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";
import { formatInr } from "@/lib/preflight";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Preflight terms · Deeper Designs",
  description:
    "The terms Preflight is sold under: delivery, price and GST, refunds, scope of the product, and refreshes.",
  alternates: { canonical: "https://www.deeperdesigns.in/preflight/terms" },
  robots: { index: true, follow: true },
};

const MONO = "var(--font-geist-mono), monospace";

// v29.2: the price, SAC, product name and contact details come from the
// product record and the shared contact constants. The rendered text is
// character for character what it was when it was approved.
const product = PRODUCTS.preflight;

const CLAUSES = [
  `${product.name} is a digital download sold by Deeper Designs Private Limited, Delhi. On payment you receive a link to the package by email within 24 hours.`,
  `The price is ₹${formatInr(product.priceInr)} including GST at the applicable rate, SAC ${product.sac}. A GST breakdown is shown on your confirmation page.`,
  "No refunds. The product is delivered in full on payment.",
  `${product.name} is provided as-is for use against your own systems. It does not guarantee security or any outcome. Deeper Designs accepts no liability for results.`,
  `Refreshes are provided for 12 months from purchase. Questions: ${SUPPORT_EMAIL} or WhatsApp ${WHATSAPP_NUMBER}.`,
];

export default function PreflightTermsPage() {
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
            Preflight terms
          </h1>

          <ol
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 28,
              counterReset: "pf-clause",
            }}
          >
            {CLAUSES.map((clause, i) => (
              <li
                key={clause}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    color: "#7C6CFF",
                    paddingTop: 6,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(16px,1.2vw + 8px,18px)",
                    lineHeight: 1.6,
                    color: "#F5F5F5",
                    textWrap: "pretty",
                  }}
                >
                  {clause}
                </p>
              </li>
            ))}
          </ol>
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
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="pf-link-underline"
          >
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
