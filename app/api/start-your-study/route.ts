import { NextResponse } from "next/server";
import {
  FIELD_MAX,
  LIMITS,
  checkRate,
  clientKey,
  originAllowed,
  readField,
} from "@/lib/api-guards";
import { clearVerified, emailKey, hasVerified } from "@/lib/otp-store";
import { isIndustrySlug } from "@/lib/industry-slugs";
import { normalizePhone } from "@/lib/phone";

// v25.5: the legacy 11-step fields (teamSize, bottleneck, budget, slot,
// objective, country) are gone. The single-screen form sends four fields
// plus the industry attribution and the variant.
type SubmissionSource = "lead" | "community" | "teardown" | "partner";

// v26: the label block each non-lead offer gets in Anish's inbox. The
// note lines are internal routing hints for him, not site copy.
const LABELS: Record<Exclude<SubmissionSource, "lead">, { label: string; note: string; accent: string }> = {
  community: {
    label: "COMMUNITY SIGNUP",
    note: "Founders community, free to join. Add to the peer group by hand.",
    accent: "#1F9D57",
  },
  teardown: {
    label: "TEARDOWN REQUEST",
    note: "Free teardown requested. Study the business and send the document back.",
    accent: "#F5B544",
  },
  partner: {
    label: "PARTNER ENQUIRY",
    note: "Referral partner enquiry. Reply with the referral terms in writing.",
    accent: "#7C6CFF",
  },
};

type Submission = {
  name: string;
  business: string;
  phone: string;
  email: string;
  industry?: string;
  // v23: "community" routes and labels the email as a founders community
  // signup, kept visually and textually distinct from a strategy-call lead.
  // Absent or "lead" preserves the original behaviour exactly.
  source: SubmissionSource;
};

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "anish.modi@deeperdesigns.in";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden." },
      { status: 403 }
    );
  }

  const rate = await checkRate(
    `submit:${clientKey(req)}`,
    LIMITS.submit.limit,
    LIMITS.submit.windowMs
  );
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  try {
    const raw = (await req.json()) as Record<string, unknown>;

    // v25.5: every field is validated and length capped. The route used to
    // cast the body straight to a type and trust it.
    const name = readField(raw.name, FIELD_MAX.name);
    const business = readField(raw.business, FIELD_MAX.business);
    const phone = readField(raw.phone, FIELD_MAX.phone);
    const email = readField(raw.email, FIELD_MAX.email);
    if (!name.ok || !business.ok || !phone.ok || !email.ok) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (!name.value || !business.value || !EMAIL_RE.test(email.value)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // v25.5: the industry attribution is validated against the known slugs
    // so an arbitrary ?from value cannot reach the notification email.
    const industryField = readField(raw.industry, FIELD_MAX.industry);
    const industry =
      industryField.ok && isIndustrySlug(industryField.value)
        ? industryField.value
        : undefined;

    // v25.5: server-side proof of verification. The route used to trust a
    // client-sent emailVerified boolean, so a direct POST could inject a
    // "verified" lead for any address. The verified session is written by
    // /api/otp-verify and cleared below, only once this submission is
    // accepted.
    const otpKey = emailKey(email.value);
    if (!(await hasVerified(otpKey))) {
      console.error(
        JSON.stringify({
          route: "start-your-study",
          event: "unverified_submission_rejected",
        }),
      );
      return NextResponse.json(
        { ok: false, error: "Email not verified." },
        { status: 400 }
      );
    }

    // v23: branch the whole email on source so a community signup is
    // unmistakable in Anish's inbox and never reads like a strategy-call lead.
    // v26: the same branch now covers four sources. An unknown source
    // falls back to "lead", so a malformed payload can never produce an
    // unlabelled email.
    const rawSource = raw.source;
    const source: SubmissionSource =
      rawSource === "community" ||
      rawSource === "teardown" ||
      rawSource === "partner"
        ? rawSource
        : "lead";
    const body: Submission = {
      name: name.value,
      business: business.value,
      phone: normalizePhone(phone.value),
      email: email.value,
      industry,
      source,
    };
    const label = source === "lead" ? null : LABELS[source];
    const subject = label
      ? `${label.label} from ${body.name}`
      : `New possibility request from ${body.name}`;
    const text = renderText(body, label);
    const html = renderHtml(body, label);

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM ??
            "Deeper Designs <no-reply@deeperdesigns.in>",
          to: [NOTIFY_EMAIL],
          reply_to: body.email,
          subject,
          text,
          html,
        }),
      });
      if (!res.ok) {
        const resendBody = await res.text().catch(() => "");
        console.error(
          JSON.stringify({
            route: "start-your-study",
            event: "resend_failed",
            status: res.status,
            body: resendBody.slice(0, 500),
          }),
        );
        return NextResponse.json(
          { ok: false, error: "Could not send notification." },
          { status: 502 }
        );
      }
      // v25.5: the submission is accepted, so the verified session is spent.
      // Clearing only here is what lets a failed send be retried.
      await clearVerified(otpKey);
      return NextResponse.json({ ok: true });
    }

    if (process.env.NODE_ENV !== "production") {
      console.log(`[start-your-study dev] ${subject}\n${text}`);
      await clearVerified(otpKey);
      return NextResponse.json({ ok: true });
    }

    // v25 hotfix: this used to return { ok: true } with no key configured,
    // silently dropping the lead. Never fake success.
    console.error(
      JSON.stringify({
        route: "start-your-study",
        event: "email_not_configured",
      }),
    );
    return NextResponse.json(
      { ok: false, error: "Could not finish. Try again." },
      { status: 500 }
    );
  } catch (e) {
    // v25 hotfix: log the real error server-side, return a generic
    // message. Raw e.message used to go to the client.
    console.error(
      JSON.stringify({
        route: "start-your-study",
        event: "unhandled_error",
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "Could not finish. Try again." },
      { status: 500 }
    );
  }
}

// v21: the single-step form sends only name, business, phone, email (plus
// the ?from industry).
// v25.5: the legacy long-form fields are gone, so the renderers carry only
// the fields the form actually sends. Phone arrives already normalized.
type SourceLabel = (typeof LABELS)[keyof typeof LABELS] | null;

function renderText(s: Submission, label: SourceLabel): string {
  // v23: community signups carry only the four fields, under a clear label.
  // v26: the same shape now serves teardown and partner submissions.
  if (label) {
    return [
      label.label,
      label.note,
      ``,
      `Name: ${s.name}`,
      `Business: ${s.business}`,
      `Email (verified): ${s.email}`,
      `Phone: ${formatPhone(s.phone)}`,
    ].join("\n");
  }
  const lines = [
    `Name: ${s.name}`,
    `Business: ${s.business}`,
    `Email (verified): ${s.email}`,
    `Phone: ${formatPhone(s.phone)}`,
  ];
  if (s.industry) lines.push(`From industry page: ${s.industry}`);
  return lines.join("\n");
}

function formatPhone(phone: string): string {
  return phone ? `+${phone}` : "";
}

function renderHtml(s: Submission, label: SourceLabel): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#888;font:13px/1.5 system-ui">${k}</td><td style="padding:6px 0;color:#111;font:13px/1.5 system-ui">${escapeHtml(v)}</td></tr>`;
  const filterRow = (k: string, v: string | undefined) =>
    v ? row(k, v) : "";
  const phone = formatPhone(s.phone);

  // v23: a visually distinct card for community signups. Coloured eyebrow
  // and a clear label so it is never confused with a lead request.
  // v26: the same card, with its accent and label from the source config,
  // now serves teardown and partner submissions too.
  if (label) {
    return `<!doctype html><html><body style="background:#f7f8f8;margin:0;padding:24px;font-family:system-ui,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e6ea;border-left:4px solid ${label.accent};border-radius:12px;padding:28px">
      <p style="margin:0 0 14px;font:11px/1 monospace;letter-spacing:0.18em;color:${label.accent};text-transform:uppercase">${label.label}</p>
      <h1 style="margin:0 0 10px;font:300 24px/1.2 system-ui;letter-spacing:-0.02em;color:#111">${escapeHtml(s.name)} · ${escapeHtml(s.business)}</h1>
      <p style="margin:0 0 22px;font:14px/1.6 system-ui;color:#555">${escapeHtml(label.note)}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee">
        ${row("Name", s.name)}
        ${row("Business", s.business)}
        ${row("Email", s.email)}
        ${row("Phone", phone)}
      </table>
    </div>
  </body></html>`;
  }

  return `<!doctype html><html><body style="background:#f7f8f8;margin:0;padding:24px;font-family:system-ui,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e6ea;border-radius:12px;padding:28px">
      <p style="margin:0 0 14px;font:11px/1 monospace;letter-spacing:0.18em;color:#5E6AD2;text-transform:uppercase">POSSIBILITY REQUEST</p>
      <h1 style="margin:0 0 18px;font:300 24px/1.2 system-ui;letter-spacing:-0.02em;color:#111">${escapeHtml(s.name)} · ${escapeHtml(s.business)}</h1>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee">
        ${row("Email", s.email)}
        ${row("Phone", phone)}
        ${filterRow("From industry page", s.industry)}
      </table>
    </div>
  </body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c]!
  );
}
