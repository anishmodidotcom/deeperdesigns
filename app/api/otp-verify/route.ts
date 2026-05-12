import { NextResponse } from "next/server";
import { phoneKey, verifyCode } from "@/lib/otp-store";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      country?: string;
      phone?: string;
      otp?: string;
    };
    const country = body.country ?? "";
    const phone = body.phone ?? "";
    const otp = body.otp ?? "";
    if (!/^[0-9]{6}$/.test(otp)) {
      return NextResponse.json(
        { ok: false, error: "Enter the six-digit code." },
        { status: 400 }
      );
    }
    const result = verifyCode(phoneKey(country, phone), otp);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: result.reason },
        { status: 400 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
