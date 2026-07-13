import { NextResponse } from "next/server";
import {
  LIMITS,
  checkRate,
  clientKey,
  originAllowed,
} from "@/lib/api-guards";

type Submission = {
  name: string;
  business: string;
  teamSize: string;
  bottleneck: string;
  country: string;
  phone: string;
  email: string;
  budget: string;
  slot: string;
  emailVerified: boolean;
  industry?: string;
  objective?: string;
  // v23: "community" routes and labels the email as a founders community
  // signup, kept visually and textually distinct from a strategy-call lead.
  // Absent or "lead" preserves the original behaviour exactly.
  source?: "lead" | "community";
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
    const body = (await req.json()) as Submission;
    if (!body.emailVerified) {
      return NextResponse.json(
        { ok: false, error: "Email not verified." },
        { status: 400 }
      );
    }
    if (!body.name || !body.business || !EMAIL_RE.test(body.email)) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // v23: branch the whole email on source so a community signup is
    // unmistakable in Anish's inbox and never reads like a strategy-call lead.
    const isCommunity = body.source === "community";
    const subject = isCommunity
      ? `COMMUNITY SIGNUP from ${body.name}`
      : `New possibility request from ${body.name}`;
    const text = renderText(body, isCommunity);
    const html = renderHtml(body, isCommunity);

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
        console.error("[start-your-study] Resend failed", await res.text());
        return NextResponse.json(
          { ok: false, error: "Could not send notification." },
          { status: 502 }
        );
      }
    } else if (process.env.NODE_ENV !== "production") {
      console.log(`[start-your-study dev] ${subject}\n${text}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

// v21: the single-step form sends only name, business, phone, email (plus
// the ?from industry). The legacy long-form fields stay supported but
// empty values no longer render as blank rows.
function renderText(s: Submission, isCommunity: boolean): string {
  // v23: community signups carry only the four fields, under a clear label.
  if (isCommunity) {
    return [
      `COMMUNITY SIGNUP`,
      `Founders community, free to join. Add to the peer group by hand.`,
      ``,
      `Name: ${s.name}`,
      `Business: ${s.business}`,
      `Email (verified): ${s.email}`,
      `Phone: ${s.country ? `+${s.country === "IN" ? "91" : "971"} ` : ""}${s.phone}`,
    ].join("\n");
  }
  const lines = [`Name: ${s.name}`, `Business: ${s.business}`];
  if (s.teamSize) lines.push(`Team size: ${s.teamSize}`);
  if (s.bottleneck) lines.push(`Bottleneck:`, s.bottleneck, ``);
  lines.push(
    `Email (verified): ${s.email}`,
    `Phone: ${s.country ? `+${s.country === "IN" ? "91" : "971"} ` : ""}${s.phone}`,
  );
  if (s.budget) lines.push(`Budget: ${s.budget}`);
  if (s.slot) lines.push(`Preferred slot: ${s.slot}`);
  if (s.industry) lines.push(`From industry page: ${s.industry}`);
  if (s.objective) lines.push(`From filter, objective: ${s.objective}`);
  return lines.join("\n");
}

function renderHtml(s: Submission, isCommunity: boolean): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#888;font:13px/1.5 system-ui">${k}</td><td style="padding:6px 0;color:#111;font:13px/1.5 system-ui">${escapeHtml(v)}</td></tr>`;
  const filterRow = (k: string, v: string | undefined) =>
    v ? row(k, v) : "";
  const phone = `${s.country ? `+${s.country === "IN" ? "91" : "971"} ` : ""}${s.phone}`;

  // v23: a visually distinct card for community signups. Green eyebrow and
  // a "COMMUNITY SIGNUP" label so it is never confused with a lead request.
  if (isCommunity) {
    return `<!doctype html><html><body style="background:#f7f8f8;margin:0;padding:24px;font-family:system-ui,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e6ea;border-left:4px solid #1F9D57;border-radius:12px;padding:28px">
      <p style="margin:0 0 14px;font:11px/1 monospace;letter-spacing:0.18em;color:#1F9D57;text-transform:uppercase">COMMUNITY SIGNUP</p>
      <h1 style="margin:0 0 10px;font:300 24px/1.2 system-ui;letter-spacing:-0.02em;color:#111">${escapeHtml(s.name)} · ${escapeHtml(s.business)}</h1>
      <p style="margin:0 0 22px;font:14px/1.6 system-ui;color:#555">Founders community request. Free to join, added to the peer group by hand.</p>
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
      ${s.bottleneck ? `<p style="margin:0 0 22px;font:15px/1.6 system-ui;color:#333">${escapeHtml(s.bottleneck)}</p>` : ""}
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee">
        ${filterRow("Team size", s.teamSize)}
        ${row("Email", s.email)}
        ${row("Phone", phone)}
        ${filterRow("Budget", s.budget)}
        ${filterRow("Preferred slot", s.slot)}
        ${filterRow("From industry page", s.industry)}
        ${filterRow("Filter objective", s.objective)}
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
