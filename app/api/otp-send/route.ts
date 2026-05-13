import { NextResponse } from "next/server";
import {
  LIMITS,
  checkRate,
  clientKey,
  originAllowed,
} from "@/lib/api-guards";
import { emailKey, generateCode, setCode } from "@/lib/otp-store";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden." },
      { status: 403 }
    );
  }

  const rate = checkRate(
    `otpSend:${clientKey(req)}`,
    LIMITS.otpSend.limit,
    LIMITS.otpSend.windowMs
  );
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many code requests. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  try {
    const body = (await req.json()) as { email?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Enter a valid email." },
        { status: 400 }
      );
    }

    const code = generateCode();
    setCode(emailKey(email), code);

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
          to: [email],
          subject: "Your Deeper Designs verification code",
          text: `Your code is ${code}. Expires in 10 minutes. If you didn't request this, ignore.`,
          html: `<!doctype html><html><body style="background:#f7f8f8;padding:24px;font-family:system-ui,sans-serif;color:#111">
            <div style="max-width:480px;margin:0 auto;background:#fff;border:1px solid #e6e6ea;border-radius:12px;padding:28px;text-align:center">
              <p style="margin:0 0 14px;font:11px/1 monospace;letter-spacing:0.18em;color:#5E6AD2;text-transform:uppercase">DEEPER DESIGNS</p>
              <h1 style="margin:0 0 18px;font:300 22px/1.2 system-ui;letter-spacing:-0.02em">Your verification code</h1>
              <div style="display:inline-block;padding:14px 24px;background:#0A0A0A;color:#fff;border-radius:10px;font:600 30px/1 monospace;letter-spacing:0.4em;margin:8px 0 18px">${code}</div>
              <p style="margin:0;font:13px/1.6 system-ui;color:#666">Expires in 10 minutes. If you did not request this, ignore.</p>
            </div>
          </body></html>`,
        }),
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Could not send the code. Try again." },
          { status: 502 }
        );
      }
      return NextResponse.json({ ok: true });
    }

    // Dev fallback: surface the code in the response so the form is
    // walkable. Gated behind NODE_ENV so production never leaks codes.
    if (process.env.NODE_ENV !== "production") {
      console.log(`[otp-send dev] ${email} -> ${code}`);
      return NextResponse.json({ ok: true, devCode: code });
    }
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured." },
      { status: 500 }
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
