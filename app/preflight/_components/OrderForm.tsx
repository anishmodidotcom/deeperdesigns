"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WHATSAPP_HREF } from "@/lib/contact";
import {
  PREFLIGHT_FIELD_MAX,
  RAZORPAY_NOTE_MAX,
  RAZORPAY_THEME_COLOR,
  checkoutName,
} from "@/lib/preflight";
import { withUtm } from "@/lib/preflight-utm";
import {
  type RazorpaySuccess,
  loadCheckoutScript,
} from "@/lib/checkout/razorpay-client";
import { trackCheckoutInitiate } from "@/lib/checkout/track";
import BillingFields, {
  type BillingErrors,
} from "@/components/checkout/BillingFields";
import {
  EMPTY_BILLING,
  GSTIN_ERROR,
  type BillingDetails,
  isValidGstin,
} from "@/lib/gstin";

// Section 09's form and Razorpay Standard Checkout (v29).
//
// The client never decides the price. It posts the three fields, gets an
// order id back, and opens checkout against it. The success handler does
// not mark anything paid either: it POSTs the signature to /verify, and
// the server is the only thing that decides a payment happened.
//
// Failure never clears the form. A dismissed modal, a declined card and a
// network error all land in the same inline message above the button with
// every field still filled in.


const FAILURE_MESSAGE =
  "The payment did not go through and nothing was charged. Try again, or message us on WhatsApp and we will sort it there.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MONO = "var(--font-geist-mono), monospace";

const labelStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#A8A8A8",
};

// v29.2: the product's identity and price arrive as props from the
// server page rather than being read from process.env here. A client
// bundle cannot see a non-public variable, so reading the price here
// would silently use the default if the env value ever changed.
export type OrderFormProduct = {
  slug: string;
  name: string;
  description: string;
  priceInr: number;
  thankYouPath: string;
  /** v33: whether to offer the optional GST invoice control. */
  collectGstDetails: boolean;
};

export default function OrderForm({ product }: { product: OrderFormProduct }) {
  // Checkout availability is asked for at request time rather than read
  // from a build-time env value, because /preflight is statically
  // prerendered: baking it in would turn the test-key to live-key swap
  // into a redeploy. Until the answer lands the button is disabled, which
  // is also the correct state when the keys really are missing.
  const [configured, setConfigured] = useState<boolean | null>(null);
  useEffect(() => {
    let live = true;
    void (async () => {
      try {
        const res = await fetch("/api/preflight/status", { cache: "no-store" });
        const body = (await res.json()) as { configured?: boolean };
        if (live) setConfigured(Boolean(body.configured));
      } catch {
        if (live) setConfigured(false);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  const router = useRouter();
  const ids = useId();
  const nameId = `${ids}-name`;
  const emailId = `${ids}-email`;
  const noteId = `${ids}-note`;
  const statusId = `${ids}-status`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; note?: string }>({});
  // v33: the optional GST invoice details. Closed by default, so a buyer
  // who ignores it posts exactly what they posted before.
  const [gstOpen, setGstOpen] = useState(false);
  const [billing, setBilling] = useState<BillingDetails>(EMPTY_BILLING);
  const [billingErrors, setBillingErrors] = useState<BillingErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  // v34 part 6.2: the real double-submit guard. `busy` drives the
  // button's disabled state, but a React state update is not applied
  // until the next render, so two clicks inside one tick both read
  // busy === false and both create a Razorpay order. This ref is set
  // synchronously on the first click and cleared only when the modal is
  // up or the attempt has failed.
  const inFlight = useRef(false);

  // Clears both halves of the lock: the button becomes clickable again
  // and a fresh order may be created.
  function release(): void {
    inFlight.current = false;
    setBusy(false);
  }

  // Warm the checkout script once the section is on screen rather than on
  // the click, so the modal opens without a visible wait.
  const warmed = useRef(false);
  useEffect(() => {
    if (configured !== true || warmed.current) return;
    warmed.current = true;
    void loadCheckoutScript();
  }, [configured]);

  function validate(): boolean {
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Enter your name.";
    else if (name.trim().length > PREFLIGHT_FIELD_MAX.name)
      next.name = "That name is too long.";
    if (!email.trim()) next.email = "Enter your email address.";
    else if (!EMAIL_RE.test(email.trim()))
      next.email = "That does not look like an email address.";
    else if (email.trim().length > PREFLIGHT_FIELD_MAX.email)
      next.email = "That email address is too long.";
    if (note.length > PREFLIGHT_FIELD_MAX.note)
      next.note = `Keep this under ${PREFLIGHT_FIELD_MAX.note} characters.`;
    setErrors(next);

    // The billing block is validated separately, so nothing about the
    // three fields above changes. When the control is closed there is
    // nothing to check; when it is open all three are required.
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
    if (inFlight.current || busy) return;
    setMessage(null);
    if (!validate()) return;

    inFlight.current = true;
    setBusy(true);
    try {
      trackCheckoutInitiate(product);
    } catch {
      // Analytics never blocks a sale.
    }

    try {
      const scriptReady = await loadCheckoutScript();
      if (!scriptReady) {
        setMessage(FAILURE_MESSAGE);
        release();
        return;
      }

      const orderRes = await fetch("/api/preflight/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          product: product.slug,
          name: name.trim(),
          email: email.trim(),
          note: withUtm(note.trim(), RAZORPAY_NOTE_MAX),
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
        release();
        return;
      }

      const RazorpayCtor = window.Razorpay;
      if (!RazorpayCtor) {
        setMessage(FAILURE_MESSAGE);
        release();
        return;
      }

      const checkout = new RazorpayCtor({
        key: order.key_id,
        amount: order.amount ?? product.priceInr * 100,
        currency: order.currency ?? "INR",
        name: checkoutName(product.name),
        description: product.description,
        order_id: order.order_id,
        prefill: { name: name.trim(), email: email.trim() },
        theme: { color: RAZORPAY_THEME_COLOR },
        handler: (response) => {
          void (async () => {
            try {
              const verifyRes = await fetch("/api/preflight/verify", {
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
            release();
          })();
        },
        modal: {
          ondismiss: () => {
            setMessage(FAILURE_MESSAGE);
            release();
          },
        },
      });

      checkout.on("payment.failed", () => {
        setMessage(FAILURE_MESSAGE);
        release();
      });

      checkout.open();
      inFlight.current = false;
    } catch {
      setMessage(FAILURE_MESSAGE);
      release();
    }
  }

  const showDevNotice =
    configured === false && process.env.NODE_ENV !== "production";

  return (
    <form
      onSubmit={onSubmit}
      // v29.3: noValidate stays, and it is what makes the plain-language
      // messages below the only ones a visitor ever sees: without it the
      // browser would raise its own bubble first and the field-level
      // errors would never render.
      //
      // The two required fields now also carry the native attribute. It
      // is not redundant: it marks them required in the accessibility
      // tree, so a screen reader announces them as such rather than
      // leaving the requirement to the visual layout, and it is the
      // constraint that takes over if noValidate is ever lifted.
      noValidate
      style={{
        padding: "clamp(24px,2.6vw,36px)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "#161616",
        display: "grid",
        gap: 18,
      }}
    >
      <div style={{ display: "grid", gap: 9 }}>
        <label htmlFor={nameId} style={labelStyle}>
          Name
        </label>
        <input
          id={nameId}
          className="pf-input"
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder="Your name"
          value={name}
          maxLength={PREFLIGHT_FIELD_MAX.name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
        />
        {errors.name ? (
          <p
            id={`${nameId}-error`}
            style={{ margin: 0, fontSize: 15, lineHeight: 1.4, color: "#E5847C" }}
          >
            {errors.name}
          </p>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        <label htmlFor={emailId} style={labelStyle}>
          Email
        </label>
        <input
          id={emailId}
          className="pf-input"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          value={email}
          maxLength={PREFLIGHT_FIELD_MAX.email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
        />
        {errors.email ? (
          <p
            id={`${emailId}-error`}
            style={{ margin: 0, fontSize: 15, lineHeight: 1.4, color: "#E5847C" }}
          >
            {errors.email}
          </p>
        ) : null}
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        <label htmlFor={noteId} style={labelStyle}>
          What are you building? (optional)
        </label>
        <textarea
          id={noteId}
          className="pf-input"
          name="note"
          rows={3}
          placeholder="One line is enough"
          value={note}
          maxLength={PREFLIGHT_FIELD_MAX.note}
          onChange={(e) => setNote(e.target.value)}
          style={{ resize: "vertical" }}
          aria-invalid={errors.note ? true : undefined}
          aria-describedby={errors.note ? `${noteId}-error` : undefined}
        />
        {errors.note ? (
          <p
            id={`${noteId}-error`}
            style={{ margin: 0, fontSize: 15, lineHeight: 1.4, color: "#E5847C" }}
          >
            {errors.note}
          </p>
        ) : null}
      </div>

      {product.collectGstDetails ? (
        <BillingFields
          open={gstOpen}
          onOpenChange={setGstOpen}
          value={billing}
          onChange={setBilling}
          errors={billingErrors}
          inputClassName="pf-input"
          labelStyle={labelStyle}
          errorStyle={{
            margin: 0,
            fontSize: 15,
            lineHeight: 1.4,
            color: "#E5847C",
          }}
          toggleStyle={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 14,
            color: "#A8A8A8",
            cursor: "pointer",
          }}
        />
      ) : null}

      <output
        id={statusId}
        aria-live="polite"
        style={{
          margin: 0,
          fontSize: 16,
          lineHeight: 1.5,
          color: "#E5847C",
          display: message ? "block" : "none",
        }}
      >
        {message}{" "}
        {message ? (
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener"
            className="pf-link-underline"
            style={{ color: "#25D366" }}
          >
            WhatsApp us
          </a>
        ) : null}
      </output>

      {showDevNotice ? (
        <p
          style={{
            margin: 0,
            fontFamily: MONO,
            fontSize: 12,
            lineHeight: 1.5,
            letterSpacing: "0.04em",
            color: "#F5B544",
          }}
        >
          Razorpay keys are not set in this environment, so the payment button is
          disabled. Set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET and
          NEXT_PUBLIC_RAZORPAY_KEY_ID to enable it.
        </p>
      ) : null}

      <button
        type="submit"
        className="pf-btn-primary"
        disabled={configured !== true || busy}
        aria-describedby={statusId}
        style={{
          marginTop: 6,
          padding: "17px 30px",
          borderRadius: 999,
          border: 0,
          background: "#7C6CFF",
          color: "#0A0A0A",
          fontFamily: "inherit",
          fontSize: 17,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        Pay with Razorpay
      </button>

      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5, color: "#A8A8A8" }}>
        Delivered to your inbox within 24 hours. Questions or delays,{" "}
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener"
          className="pf-link-underline"
        >
          WhatsApp us
        </a>
        .
      </p>
    </form>
  );
}
