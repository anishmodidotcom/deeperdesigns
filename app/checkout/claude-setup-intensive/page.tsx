import type { Metadata } from "next";
import "./checkout.css";
import CheckoutForm from "./_components/CheckoutForm";
import { requestCountry } from "@/lib/checkout/geo";
import { PRODUCTS, approximatePriceLine } from "@/lib/products";

// The Claude Setup Intensive checkout (v33).
//
// An Anish Modi product. Deeper Designs is the payment rail and nothing
// else: this page appears on no DD surface, is in no sitemap, is linked
// from no DD page, and carries no DD identity. Razorpay's own modal
// shows the merchant account name, which is unavoidable and fine.
//
// Buyers arrive from anishmodi.com having already decided. This is a
// checkout, not a sales page, so there is nothing here to persuade
// anyone: the thing, the price, the form.

const product = PRODUCTS["claude-setup-intensive"];

// The root layout sets Deeper Designs openGraph and twitter metadata,
// which every route inherits. This page is not a DD surface, so it
// overrides them with its own. The favicon set is the one piece of DD
// identity that remains: there is no anishmodi.com icon in this repo to
// put there, and inventing one is not this pass's job. Flagged.
export const metadata: Metadata = {
  title: "Claude Setup Intensive",
  description: "A working session with Anish Modi.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Claude Setup Intensive",
    description: "A working session with Anish Modi.",
    siteName: "Anish Modi",
    images: [],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Claude Setup Intensive",
    description: "A working session with Anish Modi.",
    images: [],
  },
};

// The geo header is a request-time value, so the page is dynamic. It is
// a checkout; there is nothing to cache.
export const dynamic = "force-dynamic";

// Precomputed on the server for the two countries that have a figure,
// plus the line an "anywhere else" buyer sees. Pricing never crosses
// into the client.
function approximations(): Record<string, string> {
  const out: Record<string, string> = {};
  const ae = approximatePriceLine(product, "AE");
  if (ae) out.AE = ae;
  const other = approximatePriceLine(product, "US");
  if (other) out.OTHER = other;
  return out;
}

export default async function ClaudeSetupIntensiveCheckout() {
  const country = await requestCountry();

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
            Claude Setup Intensive
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 17,
              lineHeight: 1.6,
              color: "#5C5C68",
            }}
          >
            A working session with Anish Modi. Pay below and he will be in
            touch to schedule.
          </p>
        </header>

        <CheckoutForm
          product={{
            slug: product.slug,
            name: product.name,
            description: product.description,
            priceInr: product.priceInr,
            thankYouPath: product.thankYouPath,
            collectGstDetails: product.collectGstDetails,
          }}
          serverCountry={country}
          approximationFor={approximations()}
        />
      </div>
    </main>
  );
}
