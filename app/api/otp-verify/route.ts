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
    // v25 hotfix: log the real error server-side, return a generic
    // message. Raw e.message used to go to the client.
    console.error(
      JSON.stringify({
        route: "otp-verify",
        event: "unhandled_error",
        error: e instanceof Error ? `${e.name}: ${e.message}` : String(e),
      }),
    );
    return NextResponse.json(
      { ok: false, error: "Could not check the code. Try again." },
      { status: 500 }
    );
  }
}
