import { NextResponse } from "next/server";
import { generateCode, phoneKey, setCode } from "@/lib/otp-store";

// Provider integration points. Configure one of these envs to enable real
// SMS delivery. Without them, the route falls back to dev mode and returns
// the code in the response so the form is still walkable.
//
// MSG91:        MSG91_AUTH_KEY, MSG91_SENDER_ID, MSG91_TEMPLATE_ID
// Twilio:       TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SID
// Supabase:     SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY (use auth.signInWithOtp)
//
// TODO Anish: pick one provider, drop the keys into Vercel envs.

const COUNTRY_CODES: Record<string, string> = {
  IN: "91",
  AE: "971",
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { country?: string; phone?: string };
    const country = body.country ?? "";
    const phone = body.phone ?? "";
    const cc = COUNTRY_CODES[country];
    if (!cc) {
      return NextResponse.json(
        { ok: false, error: "Unsupported country." },
        { status: 400 }
      );
    }
    if (!/^[0-9]{7,12}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    const code = generateCode();
    const fullNumber = `+${cc}${phone}`;
    const key = phoneKey(country, phone);

    if (process.env.MSG91_AUTH_KEY) {
      const senderId = process.env.MSG91_SENDER_ID ?? "DDESGN";
      const templateId = process.env.MSG91_TEMPLATE_ID ?? "";
      const url = "https://control.msg91.com/api/v5/otp";
      const params = new URLSearchParams({
        otp: code,
        mobile: `${cc}${phone}`,
        authkey: process.env.MSG91_AUTH_KEY,
        sender: senderId,
        template_id: templateId,
      });
      const res = await fetch(`${url}?${params.toString()}`, {
        method: "POST",
      });
      if (!res.ok) {
        return NextResponse.json(
          { ok: false, error: "Provider failed. Try again." },
          { status: 502 }
        );
      }
      setCode(key, code);
      return NextResponse.json({ ok: true });
    }

    setCode(key, code);
    console.log(`[otp-send dev] ${fullNumber} -> ${code}`);
    return NextResponse.json({ ok: true, devCode: code });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
