// Buyer delivery (v29.3, signed links since v29.4).
//
// On a verified payment the buyer gets their download automatically, and
// the sheet row is stamped so the manual fallback knows not to send it
// again.
//
// The link is signed per send against a private Supabase bucket and
// expires after seven days, so a forwarded email stops working rather
// than leaking the product forever. If storage is not configured or
// signing fails, delivery falls back to the shared Drive link rather
// than stopping: a buyer with a working link beats a buyer with none.
// Which path was used is always logged.
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

import { SUPPORT_EMAIL } from "@/lib/contact";
import {
  DELIVERY_SUBJECT,
  deliveryHtml,
  deliveryText,
} from "@/lib/preflight-email";
import type { Product } from "@/lib/products";
import {
  findSheetRow,
  markSheetRowSent,
  updateSheetNote,
} from "@/lib/preflight-sheets";
import { isStorageConfigured, signDownloadUrl } from "@/lib/preflight-storage";

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
  | { ok: true; sent: true; sentAt: string; link: "signed" | "fallback" }
  | {
      ok: true;
      sent: false;
      reason: "no_link" | "already_sent" | "no_buyer_email";
    }
  | { ok: false; reason: "row_not_found" | "send_failed" | "stamp_failed" };

export type ResolvedLink = {
  url: string;
  source: "signed" | "fallback";
  expiresAt: Date | null;
};

// A signed URL when storage can produce one, the shared Drive link when
// it cannot. Never throws: the fallback is the point.
export async function resolveDownloadLink(
  product: Product,
  paymentId: string,
): Promise<ResolvedLink | null> {
  if (product.deliveryObject?.trim() && isStorageConfigured()) {
    try {
      const signed = await signDownloadUrl(product.deliveryObject);
      log("info", "link_signed", {
        payment_id: paymentId,
        product: product.slug,
        object: product.deliveryObject,
        expires_at: signed.expiresAt.toISOString(),
      });
      return {
        url: signed.url,
        source: "signed",
        expiresAt: signed.expiresAt,
      };
    } catch (e) {
      log("error", "link_signing_failed", {
        payment_id: paymentId,
        product: product.slug,
        object: product.deliveryObject,
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
        fallback: product.deliveryUrl ? "drive_url" : "none",
      });
    }
  } else {
    log("info", "storage_not_configured", {
      payment_id: paymentId,
      product: product.slug,
      fallback: product.deliveryUrl ? "drive_url" : "none",
    });
  }

  if (product.deliveryUrl?.trim()) {
    return { url: product.deliveryUrl, source: "fallback", expiresAt: null };
  }
  return null;
}

async function sendOnce(
  to: string,
  name: string,
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
      subject: DELIVERY_SUBJECT,
      text: deliveryText(name, link),
      html: deliveryHtml(name, link),
    }),
  });
  if (!res.ok) {
    throw new Error(`resend_${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
}

// One send with a single retry. Returns true when the buyer has it.
async function sendWithRetry(
  to: string,
  name: string,
  link: string,
  logFields: Record<string, unknown>,
): Promise<boolean> {
  const attempts = 2;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      await sendOnce(to, name, link);
      return true;
    } catch (e) {
      const reason = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
      if (attempt < attempts) {
        log("error", "delivery_attempt_failed", {
          ...logFields,
          attempt,
          retrying_in_ms: RETRY_DELAY_MS,
          error: reason,
        });
        await sleep(RETRY_DELAY_MS);
        continue;
      }
      log("error", "delivery_failed", {
        ...logFields,
        attempts,
        error: reason,
        // sent_at is deliberately left blank so the row still reads as
        // undelivered to whoever works the queue.
        impact: "buyer_not_emailed_deliver_by_hand",
      });
      return false;
    }
  }
  return false;
}

// The Sheet schema is fixed at eleven columns, so the link expiry rides
// in the note rather than getting a column of its own.
//
// Any previous expiry is removed first, so a re-sent row carries exactly
// one expiry and it is the one that is actually true. The [resent ...]
// stamps are left alone: those are the history worth keeping.
const EXPIRY_STAMP = /\s*\[link expires [^\]]*\]/g;

export function withExpiryNote(note: string, expiresAt: Date | null): string {
  const cleaned = note.replace(EXPIRY_STAMP, "").trim();
  if (!expiresAt) return cleaned;
  const stamp = `[link expires ${expiresAt.toISOString()}]`;
  return cleaned ? `${cleaned} ${stamp}` : stamp;
}

export function withResentNote(note: string): string {
  const stamp = `[resent ${new Date().toISOString()}]`;
  return note ? `${note} ${stamp}` : stamp;
}

export async function deliverToBuyer(
  product: Product,
  fields: { name: string; email: string; paymentId: string },
): Promise<DeliveryResult> {
  const { paymentId } = fields;
  const base = { payment_id: paymentId, product: product.slug };

  if (!fields.email.trim()) {
    log("error", "buyer_email_missing", {
      ...base,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: true, sent: false, reason: "no_buyer_email" };
  }

  if (!process.env.RESEND_API_KEY) {
    log("error", "email_not_configured", {
      ...base,
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
      ...base,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: false, reason: "row_not_found" };
  }

  if (!row) {
    log("error", "row_not_found", {
      ...base,
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: false, reason: "row_not_found" };
  }

  // Already delivered. This is the guard that holds even when the KV
  // claim does not: a manual re-run, or a fulfilment replayed after the
  // key expired, both stop here.
  if (row.sentAt) {
    log("info", "already_delivered", {
      ...base,
      sent_at: row.sentAt,
      sent_by: row.sentBy,
    });
    return { ok: true, sent: false, reason: "already_sent" };
  }

  const link = await resolveDownloadLink(product, paymentId);
  if (!link) {
    // Neither a signed link nor a Drive fallback. The sale stands,
    // sent_at stays blank, and this is what tells the manual fallback
    // there is a row waiting.
    log("error", "no_download_link", {
      ...base,
      checked: ["PREFLIGHT_DELIVERY_OBJECT + Supabase", "PREFLIGHT_DELIVERY_URL"],
      impact: "buyer_not_emailed_deliver_by_hand",
    });
    return { ok: true, sent: false, reason: "no_link" };
  }

  const name = fields.name.trim() || "there";
  const sent = await sendWithRetry(fields.email.trim(), name, link.url, {
    ...base,
    link_source: link.source,
  });
  if (!sent) return { ok: false, reason: "send_failed" };

  // Sent. Stamp the row so nothing sends it again, and record when the
  // link stops working.
  const sentAt = new Date().toISOString();
  try {
    await markSheetRowSent(
      product.sheetId,
      row.rowNumber,
      sentAt,
      SENT_BY,
      withExpiryNote(row.note, link.expiresAt),
    );
  } catch (e) {
    // The buyer has their download; only the bookkeeping failed. Loud,
    // because the row now reads as undelivered and a person working the
    // queue could send it a second time.
    log("error", "stamp_failed", {
      ...base,
      row: row.rowNumber,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      impact: "buyer_emailed_but_row_not_stamped",
    });
    return { ok: false, reason: "stamp_failed" };
  }

  log("info", "delivered", {
    ...base,
    row: row.rowNumber,
    sent_at: sentAt,
    sent_by: SENT_BY,
    link_source: link.source,
    link_expires_at: link.expiresAt?.toISOString() ?? null,
  });
  return { ok: true, sent: true, sentAt, link: link.source };
}

// v29.4: support re-send. Unlike deliverToBuyer this deliberately
// ignores sent_at, because the whole point is that the first link did
// not reach the buyer or has expired. It never clears sent_at either:
// the original delivery still happened. The re-send is appended to the
// note instead.
export type ResendResult =
  | { ok: true; email: string; link: "signed" | "fallback" }
  | { ok: false; reason: "row_not_found" | "no_link" | "no_email" | "send_failed" };

export async function resendToBuyer(
  product: Product,
  paymentId: string,
): Promise<ResendResult> {
  const base = { payment_id: paymentId, product: product.slug, mode: "resend" };

  let row: Awaited<ReturnType<typeof findSheetRow>>;
  try {
    row = await findSheetRow(product.sheetId, paymentId);
  } catch (e) {
    log("error", "row_lookup_failed", {
      ...base,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
    });
    return { ok: false, reason: "row_not_found" };
  }
  if (!row) {
    log("error", "row_not_found", base);
    return { ok: false, reason: "row_not_found" };
  }
  if (!row.email) {
    log("error", "buyer_email_missing", base);
    return { ok: false, reason: "no_email" };
  }
  if (!process.env.RESEND_API_KEY) {
    log("error", "email_not_configured", base);
    return { ok: false, reason: "send_failed" };
  }

  const link = await resolveDownloadLink(product, paymentId);
  if (!link) {
    log("error", "no_download_link", base);
    return { ok: false, reason: "no_link" };
  }

  const sent = await sendWithRetry(row.email, row.name || "there", link.url, {
    ...base,
    link_source: link.source,
  });
  if (!sent) return { ok: false, reason: "send_failed" };

  // Record the re-send and the new expiry. sent_at is left as it was.
  try {
    await updateSheetNote(
      product.sheetId,
      row.rowNumber,
      withExpiryNote(withResentNote(row.note), link.expiresAt),
    );
  } catch (e) {
    log("error", "note_update_failed", {
      ...base,
      row: row.rowNumber,
      error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      impact: "buyer_emailed_but_note_not_updated",
    });
  }

  log("info", "resent", {
    ...base,
    row: row.rowNumber,
    link_source: link.source,
    link_expires_at: link.expiresAt?.toISOString() ?? null,
  });
  return { ok: true, email: row.email, link: link.source };
}
