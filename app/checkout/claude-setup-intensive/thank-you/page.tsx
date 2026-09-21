import type { Metadata } from "next";
import "../checkout.css";
import { lookupBilling } from "@/lib/checkout/receipt";
import { hasBilling } from "@/lib/gstin";
import { receiptLine } from "@/lib/preflight-delivery";
import { PRODUCTS } from "@/lib/products";

// Payment received (v33). Same rules as the checkout: no DD identity, no
// index, no sitemap entry.

const product = PRODUCTS["claude-setup-intensive"];

export const metadata: Metadata = {
  title: "Payment received · Claude Setup Intensive",
  description: "Your Claude Setup Intensive is booked.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Payment received",
    description: "Your Claude Setup Intensive is booked.",
    siteName: "Anish Modi",
    images: [],
    type: "website",
  },
  twitter: { card: "summary", title: "Payment received", images: [] },
};

function receiptId(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  // Razorpay ids are short ASCII tokens. Anything else is not one, and is
  // not going into the page.
  if (!trimmed || trimmed.length > 64 || !/^[A-Za-z0-9_-]+$/.test(trimmed)) {
    return null;
  }
  return trimmed;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const paymentId = receiptId(params.pid);
  const billing = await lookupBilling(paymentId);

  const muted: React.CSSProperties = {
    margin: 0,
    fontSize: 15,
    lineHeight: 1.6,
    color: "#5C5C68",
  };

  return (
    <main id="main" className="am-root">
      <div
        style={{
          maxWidth: 520,
          margin: "0 auto",
          padding: "clamp(48px,8vh,96px) 20px clamp(64px,10vh,120px)",
          display: "grid",
          gap: 28,
        }}
      >
        <header style={{ display: "grid", gap: 10 }}>
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(28px,5vw,36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Payment received.
          </h1>
          <p style={{ ...muted, fontSize: 17 }}>
            Anish will be in touch to schedule your session. If you would
            rather pick a time now, use the link below.
          </p>
        </header>

        <p style={{ margin: 0 }}>
          <a
            className="am-button"
            href={product.schedulingUrl}
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex",
              width: "auto",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            Choose a time
          </a>
        </p>

        <section
          style={{
            borderTop: "1px solid #E2E0D9",
            paddingTop: 20,
            display: "grid",
            gap: 6,
          }}
        >
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 500 }}>
            {receiptLine(product)}
          </p>
          <p style={muted}>{`Payment id ${paymentId ?? "Not recorded"}`}</p>
          {hasBilling(billing) ? (
            <>
              <p style={muted}>{billing.companyName}</p>
              <p style={muted}>{`GSTIN ${billing.gstin}`}</p>
              <p style={{ ...muted, color: "#14141A" }}>
                A GST invoice will be emailed to you.
              </p>
            </>
          ) : null}
        </section>
      </div>
    </main>
  );
}
