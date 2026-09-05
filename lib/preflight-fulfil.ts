// Preflight fulfilment (v29). Runs exactly once per captured payment.
//
// Two callers race for every sale: the browser's success handler POSTing
// to /api/preflight/verify, and Razorpay's payment.captured webhook.
// Whichever arrives first sets the idempotency key and does the work; the
// second sees the key and exits. A webhook replay is therefore a no-op.
//
// Order of work, per spec:
//   1. Fetch the payment from Razorpay and confirm captured + amount.
//   2. Append one row to the fulfilment-queue sheet.
//   3. Email Anish with the GST breakdown.
//   4. Fire the server-side Purchase through the CAPI forwarder.
//   5. Log a structured success line.
//
// Anything that fails after the key is set logs an error naming the
// payment id, because at that point the work cannot be retried by a
// second delivery.

import { kv } from "@vercel/kv";
import {
  PREFLIGHT_AMOUNT_PAISE,
  PREFLIGHT_CURRENCY,
  PREFLIGHT_NOTIFY_EMAIL,
  PREFLIGHT_PRICE_INR,
  formatInr,
  gstBreakdown,
} from "@/lib/preflight";
import {
  appendSheetRow,
  isSheetsConfigured,
  sheetHasPayment,
} from "@/lib/preflight-sheets";
import { sendCapiEvent } from "@/lib/meta-capi";

const KV_ENABLED = !!process.env.KV_REST_API_URL;

// A year. The key only has to outlive any plausible webhook retry window,
// but it costs nothing to keep and it doubles as a duplicate-sale guard.
const PAID_TTL_SECONDS = 365 * 24 * 60 * 60;

export type FulfilSource = "verify" | "webhook";

export type FulfilResult =
  | { ok: true; fulfilled: true }
  | { ok: true; fulfilled: false; reason: "already_fulfilled" }
  | { ok: false; error: string };

type RazorpayPayment = {
  id: string;
  order_id: string;
  status: string;
  amount: number;
  currency: string;
  email?: string;
  contact?: string;
  notes?: Record<string, string>;
};

function log(
  level: "info" | "error",
  event: string,
  fields: Record<string, unknown>,
): void {
  const line = JSON.stringify({ scope: "preflight-fulfil", event, ...fields });
  if (level === "error") console.error(line);
  else console.log(line);
}

function authHeader(): string {
  const id = process.env.RAZORPAY_KEY_ID ?? "";
  const secret = process.env.RAZORPAY_KEY_SECRET ?? "";
  return `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`;
}

export async function fetchRazorpayPayment(
  paymentId: string,
): Promise<RazorpayPayment> {
  const res = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
    { headers: { authorization: authHeader() } },
  );
  if (!res.ok) {
    throw new Error(
      `razorpay_payment_fetch_${res.status}: ${(await res.text()).slice(0, 200)}`,
    );
  }
  return (await res.json()) as RazorpayPayment;
}

// Claim the payment for this process. Returns true if we won the race.
//
// KV is the primary. When KV is unavailable the fallback is a read of the
// sheet's payment-id column, which is slower and racier but still stops a
// second row being written for a payment already fulfilled. The fallback
// logs loudly, because a KV outage during a sale is worth knowing about.
async function claim(paymentId: string): Promise<boolean> {
  const key = `preflight:paid:${paymentId}`;
  if (KV_ENABLED) {
    try {
      const set = await kv.set(key, Date.now(), {
        nx: true,
        ex: PAID_TTL_SECONDS,
      });
      return set === "OK";
    } catch (e) {
      log("error", "kv_unavailable", {
        payment_id: paymentId,
        fallback: "sheet_scan",
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      });
    }
  } else {
    log("error", "kv_not_configured", {
      payment_id: paymentId,
      fallback: "sheet_scan",
    });
  }

  if (!isSheetsConfigured()) {
    // Nothing to check against. Proceed rather than drop a paid order on
    // the floor; a duplicate row is recoverable, a lost sale is not.
    return true;
  }
  try {
    const seen = await sheetHasPayment(paymentId);
    return !seen;
  } catch (e) {
    log("error", "sheet_scan_failed", {
      payment_id: paymentId,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    });
    return true;
  }
}

async function releaseClaim(paymentId: string): Promise<void> {
  if (!KV_ENABLED) return;
  try {
    await kv.del(`preflight:paid:${paymentId}`);
  } catch {
    // Best effort. A stuck key means one manual fulfilment, which the
    // error log below names explicitly.
  }
}

function notificationBodies(fields: {
  name: string;
  email: string;
  note: string;
  paymentId: string;
  orderId: string;
}): { text: string; html: string } {
  const g = gstBreakdown();
  const lines = [
    `Name: ${fields.name}`,
    `Email: ${fields.email}`,
    `What are you building: ${fields.note || "(not given)"}`,
    "",
    `Amount: ₹${formatInr(g.price)} ${PREFLIGHT_CURRENCY} (GST inclusive)`,
    `Base: ₹${formatInr(g.base)}`,
    `GST at ${g.rate}%: ₹${formatInr(g.gst)}`,
    `SAC: ${g.sac}`,
    "",
    `Razorpay payment id: ${fields.paymentId}`,
    `Razorpay order id: ${fields.orderId}`,
    "",
    "Send the Preflight package to this address within 24 hours, then fill",
    "sent_at and sent_by on the sheet row.",
  ];
  const text = lines.join("\n");
  const html = `<div style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px;line-height:1.6;color:#111"><pre style="margin:0;font:inherit;white-space:pre-wrap">${lines
    .map((l) =>
      l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"),
    )
    .join("\n")}</pre></div>`;
  return { text, html };
}

const NOTIFY_RETRY_DELAY_MS = 1500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendNotification(fields: {
  name: string;
  email: string;
  note: string;
  paymentId: string;
  orderId: string;
}): Promise<void> {
  const { text, html } = notificationBodies(fields);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "Deeper Designs <no-reply@deeperdesigns.in>",
      to: [PREFLIGHT_NOTIFY_EMAIL],
      reply_to: fields.email,
      subject: `PREFLIGHT SALE · ₹${formatInr(PREFLIGHT_PRICE_INR)} · ${fields.name}`,
      text,
      html,
    }),
  });
  if (!res.ok) {
    throw new Error(
      `resend_${res.status}: ${(await res.text()).slice(0, 200)}`,
    );
  }
}

// v29.1: one retry after a short delay, then give up and log. The sale is
// already written to the sheet by the time this runs, so a permanently
// failing mailer costs a notification, never the order. Never throws: the
// caller must not be able to fail a recorded sale on a mail problem.
async function notifyAnish(fields: {
  name: string;
  email: string;
  note: string;
  paymentId: string;
  orderId: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    log("error", "email_not_configured", { payment_id: fields.paymentId });
    return;
  }

  const attempts = 2;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await sendNotification(fields);
      if (attempt > 1) {
        log("info", "notification_sent_on_retry", {
          payment_id: fields.paymentId,
          attempt,
        });
      }
      return;
    } catch (e) {
      const reason =
        e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      if (attempt < attempts) {
        log("error", "notification_attempt_failed", {
          payment_id: fields.paymentId,
          attempt,
          retrying_in_ms: NOTIFY_RETRY_DELAY_MS,
          error: reason,
        });
        await sleep(NOTIFY_RETRY_DELAY_MS);
        continue;
      }
      log("error", "notification_failed", {
        payment_id: fields.paymentId,
        order_id: fields.orderId,
        to: PREFLIGHT_NOTIFY_EMAIL,
        attempts,
        error: reason,
        // The row is already on the sheet, so the sale is recoverable by
        // hand from there. This line is the only signal that nobody was
        // told about it.
        impact: "sale_recorded_but_not_notified",
      });
      return;
    }
  }
}

export async function fulfilPayment(
  paymentId: string,
  source: FulfilSource,
): Promise<FulfilResult> {
  if (!paymentId) return { ok: false, error: "missing_payment_id" };

  // 1. Verify with Razorpay BEFORE claiming, so a bogus id never burns
  //    the idempotency key for a real payment that arrives later.
  let payment: RazorpayPayment;
  try {
    payment = await fetchRazorpayPayment(paymentId);
  } catch (e) {
    log("error", "payment_fetch_failed", {
      payment_id: paymentId,
      source,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    });
    return { ok: false, error: "payment_fetch_failed" };
  }

  if (payment.status !== "captured") {
    log("error", "payment_not_captured", {
      payment_id: paymentId,
      source,
      status: payment.status,
    });
    return { ok: false, error: "payment_not_captured" };
  }
  if (
    payment.amount !== PREFLIGHT_AMOUNT_PAISE ||
    payment.currency !== PREFLIGHT_CURRENCY
  ) {
    log("error", "payment_amount_mismatch", {
      payment_id: paymentId,
      source,
      got_amount: payment.amount,
      got_currency: payment.currency,
      want_amount: PREFLIGHT_AMOUNT_PAISE,
      want_currency: PREFLIGHT_CURRENCY,
    });
    return { ok: false, error: "payment_amount_mismatch" };
  }

  // 2. Claim. Losing the race is a success: the other caller did the work.
  if (!(await claim(paymentId))) {
    log("info", "already_fulfilled", { payment_id: paymentId, source });
    return { ok: true, fulfilled: false, reason: "already_fulfilled" };
  }

  const notes = payment.notes ?? {};
  const name = notes.name ?? "";
  const email = notes.email ?? payment.email ?? "";
  const note = notes.note ?? "";

  // 3. The sheet row is the fulfilment queue. If it cannot be written the
  //    sale is invisible to the person who has to send the package, so
  //    the claim is released and the caller gets an error: a webhook
  //    retry can then try again.
  try {
    await appendSheetRow({
      timestamp: new Date().toISOString(),
      name,
      email,
      note,
      amount: PREFLIGHT_PRICE_INR,
      currency: PREFLIGHT_CURRENCY,
      razorpay_payment_id: payment.id,
      razorpay_order_id: payment.order_id,
      status: "paid",
      sent_at: "",
      sent_by: "",
    });
  } catch (e) {
    log("error", "sheet_append_failed", {
      payment_id: paymentId,
      source,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    });
    await releaseClaim(paymentId);
    return { ok: false, error: "sheet_append_failed" };
  }

  // 4. Everything past this point is best effort: the row is written, so
  //    the order will be fulfilled by hand even if these fail. Each logs
  //    an error naming the payment id.
  // notifyAnish handles its own retry and never throws, so a mail
  // failure cannot stop the Purchase event below or fail the request.
  await notifyAnish({
    name,
    email,
    note,
    paymentId: payment.id,
    orderId: payment.order_id,
  });

  try {
    const result = await sendCapiEvent({
      event_name: "Purchase",
      // The payment id is the dedup key. The thank-you page fires the
      // browser Purchase under the same id.
      event_id: payment.id,
      user_data: email ? { em: email } : {},
      custom_data: {
        content_name: "Preflight",
        content_category: "digital_product",
        value: PREFLIGHT_PRICE_INR,
        currency: PREFLIGHT_CURRENCY,
      },
      event_source_url: "https://www.deeperdesigns.in/preflight",
    });
    if (!result.ok) {
      log("error", "capi_purchase_failed", {
        payment_id: paymentId,
        source,
        error: result.error,
      });
    }
  } catch (e) {
    log("error", "capi_purchase_threw", {
      payment_id: paymentId,
      source,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    });
  }

  log("info", "fulfilled", {
    payment_id: payment.id,
    order_id: payment.order_id,
    source,
    amount: PREFLIGHT_PRICE_INR,
    currency: PREFLIGHT_CURRENCY,
    has_email: Boolean(email),
  });
  return { ok: true, fulfilled: true };
}
