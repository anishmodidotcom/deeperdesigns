import type { Metadata } from "next";
import Link from "next/link";
import "../preflight.css";
import PurchaseEcho from "./PurchaseEcho";
import { SUPPORT_EMAIL, WHATSAPP_HREF } from "@/lib/contact";
import { formatInr } from "@/lib/preflight";
import { PRODUCTS, gstBreakdown } from "@/lib/products";

export const metadata: Metadata = {
  title: "Payment received · Preflight",
  description: "Your Preflight order is confirmed.",
  robots: { index: false, follow: false },
};

const MONO = "var(--font-geist-mono), monospace";

function receiptId(value: string | string[] | undefined): string | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  // Razorpay ids are short ASCII tokens. Anything else is not one, and is
  // not going into the page or an analytics event.
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
  const product = PRODUCTS.preflight;
  const gst = gstBreakdown(product);

  const receiptLines: [string, string][] = [
    ["Base", `₹${formatInr(gst.base)}`],
    [`GST at ${gst.rate}%`, `₹${formatInr(gst.gst)}`],
    ["Payment id", paymentId ?? "Not recorded"],
  ];

  return (
    <main id="main" className="pf-root">
      <PurchaseEcho paymentId={paymentId} value={product.priceInr} />

      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          padding: "clamp(64px,10vh,120px) clamp(20px,4vw,48px)",
        }}
      >
        <div style={{ maxWidth: 720, margin: "0 auto", width: "100%" }}>
          <p
            style={{
              margin: "0 0 28px",
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
              margin: "0 0 20px",
              fontSize: "clamp(34px,4.6vw,58px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Payment received.
          </h1>

          <p
            style={{
              margin: "0 0 36px",
              maxWidth: 560,
              fontSize: "clamp(17px,1.1vw + 9px,21px)",
              lineHeight: 1.6,
              color: "#A8A8A8",
              textWrap: "pretty",
            }}
          >
            Preflight will be in your inbox within 24 hours. Questions or delays,
            WhatsApp us.
          </p>

          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener"
            className="pf-btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 30px",
              borderRadius: 999,
              background: "#25D366",
              color: "#0A0A0A",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            WhatsApp us <span aria-hidden="true">→</span>
          </a>

          <div
            style={{
              marginTop: "clamp(40px,5vw,56px)",
              padding: "clamp(22px,2.4vw,30px)",
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "#161616",
            }}
          >
            <p
              style={{
                margin: "0 0 18px",
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#A8A8A8",
              }}
            >
              Receipt
            </p>
            <p
              style={{
                margin: "0 0 18px",
                fontSize: "clamp(16px,1.2vw + 8px,18px)",
                lineHeight: 1.5,
                color: "#F5F3EF",
              }}
            >
              {`${product.name} · ₹${formatInr(product.priceInr)} including GST · SAC ${gst.sac}`}
            </p>
            <dl style={{ margin: 0, display: "grid", gap: 10 }}>
              {receiptLines.map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px 16px",
                    justifyContent: "space-between",
                    fontFamily: MONO,
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  <dt style={{ margin: 0, color: "#6B6B6B" }}>{label}</dt>
                  <dd
                    style={{
                      margin: 0,
                      color: "#A8A8A8",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p
            style={{
              margin: "28px 0 0",
              fontSize: 16,
              lineHeight: 1.6,
              color: "#A8A8A8",
            }}
          >
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="pf-link-underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>

          <p
            style={{
              margin: "36px 0 0",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px 24px",
              fontSize: 16,
            }}
          >
            <Link href="/preflight" className="pf-link-underline">
              Back to Preflight
            </Link>
            <Link href={product.termsPath} className="pf-link-underline">
              Terms
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
