"use client";

// Razorpay Standard Checkout, client side (v33).
//
// The types and the loader were duplicated in the Preflight form and the
// Anish Modi form. They live here once, because two `declare global`
// blocks for the same window property is a type error and two copies of
// a loader is a bug waiting to diverge.
//
// The cached promise matters: a failed warm-up used to leave listeners
// attached to a dead script tag, so the promise never settled and the
// pay button stayed disabled forever. One shared attempt with a timeout
// that resolves false sends the caller down the failure path instead.

export type RazorpaySuccess = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

export type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact?: string };
  theme: { color: string };
  handler: (response: RazorpaySuccess) => void;
  modal: { ondismiss: () => void };
};

export type RazorpayInstance = {
  open: () => void;
  on: (event: string, handler: (payload: unknown) => void) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const SCRIPT_TIMEOUT_MS = 12_000;

let checkoutLoad: Promise<boolean> | null = null;

export function loadCheckoutScript(): Promise<boolean> {
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
