import { NextResponse } from "next/server";
import {
  LIMITS,
  checkRate,
  clientKey,
  originAllowed,
} from "@/lib/api-guards";
import { emailKey, verifyCode } from "@/lib/otp-store";

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json(
      { ok: false, error: "Forbidden." },
      { status: 403 }
    );
  }

  const rate = await checkRate(
    `otpVerify:${clientKey(req)}`,
    LIMITS.otpVerify.limit,
    LIMITS.otpVerify.windowMs
  );
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts. Try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      }
    );
  }

  try {
    const body = (await req.json()) as { email?: string; otp?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    const otp = (body.otp ?? "").trim();
    if (!/^[0-9]{6}$/.test(otp)) {
      return NextResponse.json(
        { ok: false, error: "Enter the six-digit code." },
        { status: 400 }
      );
    }
    const result = await verifyCode(emailKey(email), otp);
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
