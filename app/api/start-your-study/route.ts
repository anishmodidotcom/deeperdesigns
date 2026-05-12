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
  otpVerified: boolean;
  industry?: string;
  objective?: string;
};

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "anish.modi@deeperdesigns.in";

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden." },
      { status: 403 }
    );
  }

  const rate = checkRate(
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
    if (!body.otpVerified) {
      return NextResponse.json(
        { ok: false, error: "Email not verified." },
        { status: 400 }
      );
    }
    if (!body.name || !body.business || !body.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const subject = `New possibility request from ${body.name}`;
    const text = renderText(body);
    const html = renderHtml(body);

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

function renderText(s: Submission): string {
  const lines = [
    `Name: ${s.name}`,
    `Business: ${s.business}`,
    `Team size: ${s.teamSize}`,
    `Bottleneck:`,
    s.bottleneck,
    ``,
    `Country: ${s.country}`,
    `Phone: +${s.country === "IN" ? "91" : "971"}${s.phone}`,
    `Email (verified): ${s.email}`,
    `Budget: ${s.budget}`,
    `Preferred slot: ${s.slot}`,
  ];
  if (s.industry) lines.push(`From filter, industry: ${s.industry}`);
  if (s.objective) lines.push(`From filter, objective: ${s.objective}`);
  return lines.join("\n");
}

function renderHtml(s: Submission): string {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#888;font:13px/1.5 system-ui">${k}</td><td style="padding:6px 0;color:#111;font:13px/1.5 system-ui">${escapeHtml(v)}</td></tr>`;
  const filterRow = (k: string, v: string | undefined) =>
    v ? row(k, v) : "";
  return `<!doctype html><html><body style="background:#f7f8f8;margin:0;padding:24px;font-family:system-ui,sans-serif">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6e6ea;border-radius:12px;padding:28px">
      <p style="margin:0 0 14px;font:11px/1 monospace;letter-spacing:0.18em;color:#5E6AD2;text-transform:uppercase">POSSIBILITY REQUEST</p>
      <h1 style="margin:0 0 18px;font:300 24px/1.2 system-ui;letter-spacing:-0.02em;color:#111">${escapeHtml(s.name)} · ${escapeHtml(s.business)}</h1>
      <p style="margin:0 0 22px;font:15px/1.6 system-ui;color:#333">${escapeHtml(s.bottleneck)}</p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #eee">
        ${row("Team size", s.teamSize)}
        ${row("Phone", `+${s.country === "IN" ? "91" : "971"}${s.phone}`)}
        ${row("Email", s.email)}
        ${row("Budget", s.budget)}
        ${row("Preferred slot", s.slot)}
        ${filterRow("Filter industry", s.industry)}
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
