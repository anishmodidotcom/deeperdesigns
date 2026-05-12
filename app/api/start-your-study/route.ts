import { NextResponse } from "next/server";

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
};

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "anish.modi@deeperdesigns.in";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Submission;
    if (!body.otpVerified) {
      return NextResponse.json(
        { ok: false, error: "Phone not verified." },
        { status: 400 }
      );
    }
    if (!body.name || !body.business || !body.email) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const subject = `Deeper Designs · New study request from ${body.name}`;
    const text = render(body);

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
          reply_to: body.email,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        console.error("[start-your-study] Resend failed", await res.text());
        return NextResponse.json(
          { ok: false, error: "Could not send notification." },
          { status: 502 }
        );
      }
    } else {
      console.log(`[start-your-study dev] ${subject}\n${text}`);
    }

    // TODO Anish: when Supabase is wired up, also insert the row into
    // a `study_requests` table so the admin view can list it. For now
    // notification email is the system of record.

    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

function render(s: Submission): string {
  return [
    `Name: ${s.name}`,
    `Business: ${s.business}`,
    `Team size: ${s.teamSize}`,
    `Bottleneck:`,
    s.bottleneck,
    ``,
    `Country: ${s.country}`,
    `Phone (verified): +${s.country === "IN" ? "91" : "971"}${s.phone}`,
    `Email: ${s.email}`,
    `Budget: ${s.budget}`,
    `Preferred slot: ${s.slot}`,
  ].join("\n");
}
