import { NextResponse } from "next/server";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "modianish11@gmail.com";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { product?: string; email?: string };
    const product = body.product ?? "";
    const email = body.email ?? "";
    if (!product || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid request." },
        { status: 400 }
      );
    }

    const subject = `Deeper Designs · Notify request for ${product}`;
    const text = `Email: ${email}\nProduct: ${product}`;

    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:
            process.env.RESEND_FROM ?? "Deeper Designs <studio@deeperdesigns.in>",
          to: [NOTIFY_EMAIL],
          reply_to: email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error("[notify-me] Resend failed", await res.text());
        return NextResponse.json(
          { ok: false, error: "Could not record interest." },
          { status: 502 }
        );
      }
    } else {
      console.log(`[notify-me dev] ${subject}\n${text}`);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
