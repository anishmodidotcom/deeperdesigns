"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { WHATSAPP_HREF } from "@/lib/contact";
import {
  PREFLIGHT_FIELD_MAX,
  PREFLIGHT_PRICE_INR,
  RAZORPAY_CHECKOUT_DESCRIPTION,
  RAZORPAY_CHECKOUT_NAME,
  RAZORPAY_NOTE_MAX,
  RAZORPAY_THEME_COLOR,
} from "@/lib/preflight";
import { withUtm } from "@/lib/preflight-utm";
import { trackPreflightInitiateCheckout } from "@/lib/meta-events";

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

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

const FAILURE_MESSAGE =
  "The payment did not go through and nothing was charged. Try again, or message us on WhatsApp and we will sort it there.";

type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string };
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void;
  modal: { ondismiss: () => void };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (payload: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// One shared attempt, cached, so the warm-up on mount and the load on
// submit are the same promise rather than two racing script tags. Two
// things this protects against, both seen in testing: a second call
// attaching listeners to a tag that already failed (they never fire, and
// the button stays disabled forever), and a request that neither loads
// nor errors, which a network in the middle can produce. The timeout
// resolves false so the failure path runs instead of hanging.
const SCRIPT_TIMEOUT_MS = 12_000;
let checkoutLoad: Promise<boolean> | null = null;

function loadCheckoutScript(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (checkoutLoad) return checkoutLoad;

  checkoutLoad = new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      // A failed attempt is not cached: the visitor may be on a flaky
      // connection and the retry should get a fresh script tag.
      if (!ok) checkoutLoad = null;
      resolve(ok);
    };

    const timer = window.setTimeout(() => finish(false), SCRIPT_TIMEOUT_MS);
    const done = (ok: boolean) => {
      window.clearTimeout(timer);
      finish(ok);
    };

    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.async = true;
    script.onload = () => done(Boolean(window.Razorpay));
    script.onerror = () => {
      script.remove();
      done(false);
    };
    document.head.appendChild(script);
  });

  return checkoutLoad;
}

const MONO = "var(--font-geist-mono), monospace";

const labelStyle: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#A8A8A8",
};

export default function OrderForm() {
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
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

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
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setMessage(null);
    if (!validate()) return;

    setBusy(true);
    try {
      trackPreflightInitiateCheckout(PREFLIGHT_PRICE_INR);
    } catch {
      // Analytics never blocks a sale.
    }

    try {
      const scriptReady = await loadCheckoutScript();
      if (!scriptReady) {
        setMessage(FAILURE_MESSAGE);
        setBusy(false);
        return;
      }

      const orderRes = await fetch("/api/preflight/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          note: withUtm(note.trim(), RAZORPAY_NOTE_MAX),
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
        amount: order.amount ?? PREFLIGHT_PRICE_INR * 100,
        currency: order.currency ?? "INR",
        name: RAZORPAY_CHECKOUT_NAME,
        description: RAZORPAY_CHECKOUT_DESCRIPTION,
        order_id: order.order_id,
        prefill: { name: name.trim(), email: email.trim() },
        theme: { color: RAZORPAY_THEME_COLOR },
        handler: (response) => {
          void (async () => {
            try {
              const verifyRes = await fetch("/api/preflight/verify", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(response),
              });
              const verified = (await verifyRes.json()) as { ok?: boolean };
              if (verifyRes.ok && verified.ok) {
                router.push(
                  `/preflight/thank-you?pid=${encodeURIComponent(response.razorpay_payment_id)}`,
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

  const showDevNotice =
    configured === false && process.env.NODE_ENV !== "production";

  return (
    <form
      onSubmit={onSubmit}
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
