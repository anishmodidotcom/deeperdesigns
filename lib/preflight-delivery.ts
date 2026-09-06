// Buyer delivery (v29.3).
//
// Delivery used to be a person reading the fulfilment sheet and sending
// the package by hand. On a verified payment the buyer now gets their
// download automatically, and the sheet row is stamped so the manual
// fallback knows not to send it again.
//
// The send is guarded three ways, because emailing a customer twice is
// worse than emailing them late:
//   1. fulfilPayment itself runs once per payment (KV claim).
//   2. sent_at on the sheet row is checked immediately before sending.
//   3. sent_at is written immediately after a successful send.
//
// Nothing here can fail a recorded sale. Every path returns a result
// rather than throwing, and every failure logs the payment id so the
// row can be delivered by hand.

import { SUPPORT_EMAIL, WHATSAPP_NUMBER } from "@/lib/contact";
import type { Product } from "@/lib/products";
import { findSheetRow, markSheetRowSent } from "@/lib/preflight-sheets";

const RETRY_DELAY_MS = 1500;
const SENT_BY = "auto";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function log(
  level: "info" | "error",
  event: string,
  fields: Record<string, unknown>,
): void {
  const line = JSON.stringify({ scope: "preflight-delivery", event, ...fields });
  if (level === "error") console.error(line);
  else console.log(line);
}

export type DeliveryResult =
  | { ok: true; sent: true; sentAt: string }
  | {
      ok: true;
      sent: false;
      reason: "no_delivery_url" | "already_sent" | "no_buyer_email";
    }
  | { ok: false; reason: "row_not_found" | "send_failed" | "stamp_failed" };

// Per-product copy. A second product adds its own entry here; the send,
// the retry and the sheet bookkeeping below are product agnostic.
type DeliveryCopy = {
  subject: string;
  body: (name: string, link: string) => string;
};

const DELIVERY_COPY: Record<string, DeliveryCopy> = {
  preflight: {
    subject: "Your Preflight download",
    body: (name, link) => `Hi ${name},

Thank you for buying Preflight. Your download is here:

${link}

Inside: five audit protocols, the operator guide, four checklists, the report template and the field notes. Start with the operator guide, then run Security hardening first.

Refreshes ship for 12 months. You will get an email from us each time one does.

Questions, reply to this email or WhatsApp ${WHATSAPP_NUMBER}.

Anish
Deeper Designs
deeperdesigns.in
`,
  },
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// The plain-text body is the source of truth. The HTML part is the same
// text, escaped, with the download line turned into a real link so the
// buyer can click it rather than copy it.
function htmlFromText(text: string, link: string): string {
  const escapedLink = escapeHtml(link);
  const body = escapeHtml(text).replace(
    escapedLink,
    `<a href="${escapedLink}" style="color:#7C6CFF">${escapedLink}</a>`,
  );
  return `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111"><pre style="margin:0;font:inherit;white-space:pre-wrap">${body}</pre></div>`;
}

async function sendOnce(
  to: string,
  subject: string,
  text: string,
  link: string,
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from:
        process.env.RESEND_FROM ?? "Deeper Designs <no-reply@deeperdesigns.in>",
      to: [to],
      // A reply goes to the company inbox, not to the no-reply sender.
      reply_to: SUPPORT_EMAIL,
      subject,
      text,
      html: htmlFromText(text, link),
    }),
  });
  if (!res.ok) {
    throw new Error(`resend_${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}

export async function deliverToBuyer(
  product: Product,
  fields: { name: string; email: string; paymentId: string },
): Promise<DeliveryResult> {
  const { paymentId } = fields;

  // No link configured. The sale stands, sent_at stays blank, and the
  // warning is what tells the manual fallback there is a row waiting.
  if (!product.deliveryUrl?.trim()) {
    log("error", "delivery_url_missing", {
      payment_id: paymentId,
      product: product.slug,
      variable: "PREFLIGHT_DELIVERY_URL",
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: true, sent: false, reason: "no_delivery_url" };
  }

  if (!fields.email.trim()) {
    log("error", "buyer_email_missing", {
      payment_id: paymentId,
      product: product.slug,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: true, sent: false, reason: "no_buyer_email" };
  }

  const copy = DELIVERY_COPY[product.slug];
  if (!copy) {
    log("error", "delivery_copy_missing", {
      payment_id: paymentId,
      product: product.slug,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: true, sent: false, reason: "no_delivery_url" };
  }

  if (!process.env.RESEND_API_KEY) {
    log("error", "email_not_configured", {
      payment_id: paymentId,
      product: product.slug,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: false, reason: "send_failed" };
  }

  // The row is both the idempotency guard and the place the result is
  // recorded, so it is found before anything is sent.
  let row: Awaited<ReturnType<typeof findSheetRow>>;
  try {
    row = await findSheetRow(product.sheetId, paymentId);
  } catch (e) {
    log("error", "row_lookup_failed", {
      payment_id: paymentId,
      product: product.slug,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: false, reason: "row_not_found" };
  }

  if (!row) {
    log("error", "row_not_found", {
      payment_id: paymentId,
      product: product.slug,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: false, reason: "row_not_found" };
  }

  // Already delivered. This is the guard that holds even when the KV
  // claim does not: a manual re-run, or a fulfilment replayed after the
  // key expired, both stop here.
  if (row.sentAt) {
    log("info", "already_delivered", {
      payment_id: paymentId,
      product: product.slug,
      sent_at: row.sentAt,
      sent_by: row.sentBy,
    });
    return { ok: true, sent: false, reason: "already_sent" };
  }

  const text = copy.body(fields.name.trim() || "there", product.deliveryUrl);

  const attempts = 2;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await sendOnce(
        fields.email.trim(),
        copy.subject,
        text,
        product.deliveryUrl,
      );
      break;
    } catch (e) {
      const reason = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      if (attempt < attempts) {
        log("error", "delivery_attempt_failed", {
          payment_id: paymentId,
          product: product.slug,
          attempt,
          retrying_in_ms: RETRY_DELAY_MS,
          error: reason,
        });
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      log("error", "delivery_failed", {
        payment_id: paymentId,
        product: product.slug,
        attempts,
        error: reason,
        // sent_at is deliberately left blank so the row still reads as
        // undelivered to whoever works the queue.
        impact: "buyer_not_emailed_deliver_by_hand",
      });
      return { ok: false, reason: "send_failed" };
    }
  }

  // Sent. Stamp the row so nothing sends it again.
  const sentAt = new Date().toISOString();
  try {
    await markSheetRowSent(product.sheetId, row.rowNumber, sentAt, SENT_BY);
  } catch (e) {
    // The buyer has their download; only the bookkeeping failed. Loud,
    // because the row now reads as undelivered and a person working the
    // queue could send it a second time.
    log("error", "stamp_failed", {
      payment_id: paymentId,
      product: product.slug,
      row: row.rowNumber,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      impact: "buyer_emailed_but_row_not_stamped",
    });
    return { ok: false, reason: "stamp_failed" };
  }

  log("info", "delivered", {
    payment_id: paymentId,
    product: product.slug,
    row: row.rowNumber,
    sent_at: sentAt,
    sent_by: SENT_BY,
  });
  return { ok: true, sent: true, sentAt };
}
