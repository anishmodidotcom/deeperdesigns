"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BillingFields, {
  type BillingErrors,
} from "@/components/checkout/BillingFields";
import {
  EMPTY_BILLING,
  GSTIN_ERROR,
  type BillingDetails,
  isValidGstin,
} from "@/lib/gstin";
import { localeCountry } from "@/lib/checkout/geo-client";
import {
  type RazorpaySuccess,
  loadCheckoutScript,
} from "@/lib/checkout/razorpay-client";

// The Claude Setup Intensive checkout form (v33).
//
// Same machinery as the Preflight form: the browser never chooses the
// amount, it posts a slug and the server prices it. Different product,
// different surface, one checkout.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FAILURE_MESSAGE =
  "The payment did not go through and nothing was charged. Try again, or email hey@deeperdesigns.in and we will sort it there.";

export type CheckoutFormProduct = {
  slug: string;
  name: string;
  description: string;
  priceInr: number;
  thankYouPath: string;
  collectGstDetails: boolean;
};

export default function CheckoutForm({
  product,
  serverCountry,
  approximationFor,
}: {
  product: CheckoutFormProduct;
  /** From the Vercel geo header. Null when the header is absent. */
  serverCountry: string | null;
  /** Precomputed line per country, so pricing never lives in the client. */
  approximationFor: Record<string, string>;
}) {
  const ids = useId();
  const router = useRouter();

  const [configured, setConfigured] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    void (async () => {
      try {
        const res = await fetch(
          `/api/checkout/status?product=${encodeURIComponent(product.slug)}`,
          { cache: "no-store" },
        );
        const json = (await res.json()) as { configured?: boolean };
        if (live) setConfigured(Boolean(json.configured));
      } catch {
        if (live) setConfigured(false);
      }
    })();
    return () => {
      live = false;
    };
  }, [product.slug]);

  // The approximation line. The server's geo header wins; the browser's
  // locale region is the fallback. Resolved after mount so the page can
  // stay static for everyone.
  const [country, setCountry] = useState<string | null>(serverCountry);
  useEffect(() => {
    if (serverCountry) return;
    setCountry(localeCountry());
  }, [serverCountry]);
  // The rule lives in approximatePriceLine in lib/products.ts; this
  // mirrors its one exclusion, because a buyer in India is charged the
  // rupee price on a rupee card and has nothing to approximate.
  const approximation =
    !country || country === "IN"
      ? null
      : (approximationFor[country] ?? approximationFor.OTHER ?? null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
  }>({});
  const [gstOpen, setGstOpen] = useState(false);
  const [billing, setBilling] = useState<BillingDetails>(EMPTY_BILLING);
  const [billingErrors, setBillingErrors] = useState<BillingErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const warmed = useRef(false);
  useEffect(() => {
    if (configured !== true || warmed.current) return;
    warmed.current = true;
    void loadCheckoutScript();
  }, [configured]);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "That does not look like an email address.";
    if (!phone.trim()) next.phone = "Enter a phone number.";
    setErrors(next);

    const bErr: BillingErrors = {};
    if (gstOpen) {
      if (!billing.companyName.trim())
        bErr.companyName = "Enter the company name for the invoice.";
      if (!billing.companyAddress.trim())
        bErr.companyAddress = "Enter the company address for the invoice.";
      if (!isValidGstin(billing.gstin)) bErr.gstin = GSTIN_ERROR;
    }
    setBillingErrors(bErr);
    return Object.keys(next).length === 0 && Object.keys(bErr).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setMessage(null);
    if (!validate()) return;
    setBusy(true);

    try {
      const scriptReady = await loadCheckoutScript();
      if (!scriptReady) {
        setMessage(FAILURE_MESSAGE);
        setBusy(false);
        return;
      }

      const orderRes = await fetch("/api/checkout/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          product: product.slug,
          name: name.trim(),
          email: email.trim(),
          // The phone and the brief both travel in the note, which is the
          // field the order route already carries end to end.
          note: [phone.trim(), note.trim()].filter(Boolean).join(" · "),
          company_name: gstOpen ? billing.companyName.trim() : "",
          company_address: gstOpen ? billing.companyAddress.trim() : "",
          gstin: gstOpen ? billing.gstin.trim() : "",
        }),
      });
      const order = (await orderRes.json()) as {
        ok: boolean;
        order_id?: string;
        amount?: number;
        currency?: string;
        key_id?: string;
        error?: string;
      };
      if (!orderRes.ok || !order.ok || !order.order_id || !order.key_id) {
        setMessage(order.error ?? FAILURE_MESSAGE);
        setBusy(false);
        return;
      }

      const RazorpayCtor = window.Razorpay;
      if (!RazorpayCtor) {
        setMessage(FAILURE_MESSAGE);
        setBusy(false);
        return;
      }

      const checkout = new RazorpayCtor({
        key: order.key_id,
        amount: order.amount ?? product.priceInr * 100,
        currency: order.currency ?? "INR",
        name: product.name,
        description: product.description,
        order_id: order.order_id,
        prefill: { name: name.trim(), email: email.trim(), contact: phone.trim() },
        theme: { color: "#2F5BEA" },
        handler: (response) => {
          void (async () => {
            try {
              const verifyRes = await fetch("/api/checkout/verify", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...response, product: product.slug }),
              });
              const verified = (await verifyRes.json()) as { ok?: boolean };
              if (verifyRes.ok && verified.ok) {
                router.push(
                  `${product.thankYouPath}?pid=${encodeURIComponent(response.razorpay_payment_id)}`,
                );
                return;
              }
            } catch {
              // Fall through to the failure message.
            }
            setMessage(FAILURE_MESSAGE);
            setBusy(false);
          })();
        },
        modal: {
          ondismiss: () => {
            setMessage(FAILURE_MESSAGE);
            setBusy(false);
          },
        },
      });
      checkout.on("payment.failed", () => {
        setMessage(FAILURE_MESSAGE);
        setBusy(false);
      });
      checkout.open();
    } catch {
      setMessage(FAILURE_MESSAGE);
      setBusy(false);
    }
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 500,
    color: "#5C5C68",
  };
  const errorStyle: React.CSSProperties = {
    margin: 0,
    fontSize: 14,
    lineHeight: 1.4,
    color: "#B3261E",
  };

  const field = (
    key: "name" | "email" | "phone",
    label: string,
    type: string,
    value: string,
    setter: (v: string) => void,
    autoComplete: string,
  ) => (
    <div style={{ display: "grid", gap: 8 }}>
      <label htmlFor={`${ids}-${key}`} style={labelStyle}>
        {label}
      </label>
      <input
        id={`${ids}-${key}`}
        className="am-input"
        name={key}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => setter(e.target.value)}
        aria-invalid={errors[key] ? true : undefined}
        aria-describedby={errors[key] ? `${ids}-${key}-error` : undefined}
      />
      {errors[key] ? (
        <p id={`${ids}-${key}-error`} style={errorStyle}>
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "grid", gap: 20 }}>
      <div>
        <p style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: "-0.02em" }}>
          ₹{product.priceInr.toLocaleString("en-IN")}
        </p>
        {approximation ? (
          <p style={{ margin: "6px 0 0", fontSize: 14, color: "#5C5C68" }}>
            {approximation}
          </p>
        ) : null}
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#5C5C68" }}>
          Inclusive of GST.
        </p>
      </div>

      {field("name", "Name", "text", name, setName, "name")}
      {field("email", "Email", "email", email, setEmail, "email")}
      {field("phone", "Phone", "tel", phone, setPhone, "tel")}

      <div style={{ display: "grid", gap: 8 }}>
        <label htmlFor={`${ids}-note`} style={labelStyle}>
          What do you want to set up? (optional)
        </label>
        <textarea
          id={`${ids}-note`}
          className="am-input"
          name="note"
          rows={3}
          value={note}
          maxLength={400}
          onChange={(e) => setNote(e.target.value)}
          style={{ resize: "vertical" }}
        />
      </div>

      {product.collectGstDetails ? (
        <BillingFields
          open={gstOpen}
          onOpenChange={setGstOpen}
          value={billing}
          onChange={setBilling}
          errors={billingErrors}
          inputClassName="am-input"
          labelStyle={labelStyle}
          errorStyle={errorStyle}
          toggleStyle={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            color: "#5C5C68",
            cursor: "pointer",
          }}
        />
      ) : null}

      {message ? (
        <p role="status" style={{ ...errorStyle, fontSize: 15 }}>
          {message}
        </p>
      ) : null}

      <button type="submit" className="am-button" disabled={busy || configured !== true}>
        {busy ? "Opening payment…" : "Pay and book"}
      </button>
    </form>
  );
}
