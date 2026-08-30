"use client";

import { useRef, useState } from "react";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import { WHATSAPP_HREF } from "@/lib/contact";
import {
  trackLeadFormStart,
  trackFormLead,
  trackCommunityFormStart,
  trackCommunityJoin,
} from "@/lib/meta-events";

// v21: the single-step lead form. Four fields, a confirmation code, done.
// Replaces the 11-step study flow, which produced zero completed
// submissions. Reuses the existing Resend infrastructure unchanged:
//   /api/otp-send        sends the 6-digit code
//   /api/otp-verify      checks it
//   /api/start-your-study sends the completion email to Anish
//
// v23: the same component now backs the founders community form via the
// `variant` prop. "lead" is unchanged; "community" swaps the copy, tags the
// completion email with source: "community", and fires the separate
// CommunityFormStart / CommunityJoin events instead of LeadFormStart / Lead.
// A community signup NEVER fires Lead or LeadFormStart.
//
// Events per variant:
//   lead:       LeadFormStart (code sent) -> Lead (confirmed completion)
//   community:  CommunityFormStart (code sent) -> CommunityJoin (confirmed)
// The ?from={slug} industry attribution applies to the lead variant only.

export type LeadFormVariant = "lead" | "community";

type Screen = "form" | "code" | "done";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Fields = {
  name: string;
  business: string;
  phone: string;
  email: string;
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

function fromIndustry(): string {
  if (typeof window === "undefined") return "";
  try {
    return new URLSearchParams(window.location.search).get("from") ?? "";
  } catch {
    return "";
  }
}

// v25 hotfix: when the backend is down the person must see a plain error
// and a working path out, never a button that quietly resets.
const FAIL_MSG =
  "That did not go through. Try again in a minute, or message us on WhatsApp and we will sort it there.";

type PostResult =
  | { ok: true }
  | { ok: false; error?: string; hard: boolean };

// POST JSON and classify the failure. "hard" means the server is broken
// (5xx, empty or unparseable body, network error): show FAIL_MSG and the
// WhatsApp link. A 4xx with a message is user-correctable: show it as-is.
async function postJson(url: string, payload: unknown): Promise<PostResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    let json: { ok?: boolean; error?: string } | null = null;
    try {
      json = (await res.json()) as { ok?: boolean; error?: string };
    } catch {
      json = null;
    }
    if (res.ok && json?.ok) return { ok: true };
    if (res.status >= 500 || !json) return { ok: false, hard: true };
    return { ok: false, error: json.error, hard: false };
  } catch {
    return { ok: false, hard: true };
  }
}

export default function LeadForm({
  variant = "lead",
}: {
  variant?: LeadFormVariant;
}) {
  const isCommunity = variant === "community";
  const [screen, setScreen] = useState<Screen>("form");
  const [fields, setFields] = useState<Fields>({
    name: "",
    business: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  // v25 hotfix: true when the backend failed hard; shows the WhatsApp
  // escape hatch under the active screen.
  const [hardFail, setHardFail] = useState(false);

  const startFired = useRef(false);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields, v: string) => {
    setFields((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!fields.name.trim()) next.name = "We need a name to reach you.";
    if (!fields.business.trim()) next.business = "Tell us the business name.";
    // v22.1: empty and too-short are different mistakes; say the right thing.
    const phoneDigits = fields.phone.replace(/\D/g, "");
    if (phoneDigits.length === 0) next.phone = "We need a number to reach you.";
    else if (phoneDigits.length < 7) next.phone = "That number looks too short.";
    if (!EMAIL_RE.test(fields.email.trim()))
      next.email = "That email does not look right.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Screen 1 submit: validate, send the code, fire LeadFormStart once.
  const sendCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSendError(null);
    setHardFail(false);
    if (!validate()) return;
    setSending(true);
    try {
      const result = await postJson("/api/otp-send", {
        email: fields.email.trim(),
      });
      if (!result.ok) {
        if (result.hard) {
          setHardFail(true);
          setSendError(FAIL_MSG);
        } else {
          setSendError(result.error || "Could not send the code. Try again.");
        }
        return;
      }
      if (!startFired.current) {
        startFired.current = true;
        try {
          // v23: the community variant fires its own start event and never
          // touches LeadFormStart.
          if (isCommunity) trackCommunityFormStart();
          else trackLeadFormStart(fromIndustry());
        } catch {
          // analytics must never block the form
        }
      }
      setScreen("code");
      setTimeout(() => codeInputRef.current?.focus(), 50);
    } finally {
      setSending(false);
    }
  };

  // Resend from screen 2 (no re-validation, same email, no second
  // LeadFormStart).
  const resendCode = async () => {
    setCodeError(null);
    setHardFail(false);
    setResending(true);
    setResent(false);
    try {
      const result = await postJson("/api/otp-send", {
        email: fields.email.trim(),
      });
      if (!result.ok) {
        if (result.hard) {
          setHardFail(true);
          setCodeError(FAIL_MSG);
        } else {
          setCodeError(result.error || "Could not resend the code.");
        }
        return;
      }
      setResent(true);
    } finally {
      setResending(false);
    }
  };

  // Screen 2 submit: verify the code, send the completion email, and only
  // then fire the standard Lead. This is the single Lead call site.
  const verify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setCodeError(null);
    setHardFail(false);
    if (!/^[0-9]{6}$/.test(code)) {
      setCodeError("Enter the six digits from the email.");
      return;
    }
    setVerifying(true);
    try {
      const vResult = await postJson("/api/otp-verify", {
        email: fields.email.trim(),
        otp: code,
      });
      if (!vResult.ok) {
        if (vResult.hard) {
          setHardFail(true);
          setCodeError(FAIL_MSG);
        } else {
          setCodeError(vResult.error || "That code did not match. Try again.");
        }
        return;
      }

      // v23: industry attribution only applies to the lead variant. The
      // community form never reads ?from and posts source: "community" so
      // the completion route labels and routes the signup separately.
      const industry = isCommunity ? "" : fromIndustry();
      const sResult = await postJson("/api/start-your-study", {
        name: fields.name.trim(),
        business: fields.business.trim(),
        phone: fields.phone.trim(),
        email: fields.email.trim(),
        emailVerified: true,
        country: "",
        teamSize: "",
        bottleneck: "",
        budget: "",
        slot: "",
        industry: industry || undefined,
        source: variant,
      });
      if (!sResult.ok) {
        if (sResult.hard) {
          setHardFail(true);
          setCodeError(FAIL_MSG);
        } else {
          setCodeError(
            sResult.error || "Could not finish. Try the button again.",
          );
        }
        return;
      }

      // Confirmed completion. Lead fires here for the lead variant ONLY;
      // the community variant fires CommunityJoin and never Lead.
      try {
        if (isCommunity) {
          trackCommunityJoin({
            email: fields.email.trim(),
            phone: fields.phone.trim(),
          });
        } else {
          trackFormLead({
            industry,
            email: fields.email.trim(),
            phone: fields.phone.trim(),
          });
        }
      } catch {
        // analytics must never block the form
      }
      setScreen("done");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 560 }}>
      {screen === "form" && (
        <form onSubmit={sendCode} noValidate>
          {/* v23: the lead variant carries its own heading + intro. The
              community variant omits them because the /community page
              supplies the heading and body copy directly above the form. */}
          {!isCommunity && (
            <>
              <h1
                style={{
                  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(32px, 5vw, 52px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px",
                }}
              >
                Tell us where to reach you.{" "}
                <span
                  style={{
                    fontFamily:
                      "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                  }}
                >
                  We do the rest.
                </span>
              </h1>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--fg-muted)",
                  margin: "0 0 36px",
                  maxWidth: 480,
                }}
              >
                Thirty seconds. We will study your business and come back with
                what AI can actually do for you.
              </p>
            </>
          )}

          {/* v22.1: gap tightened because every field now carries a
              fixed-height error slot below it (no layout shift). */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <LabeledInput
              id="lead-name"
              label="Your name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(v) => set("name", v)}
              error={errors.name}
            />
            <LabeledInput
              id="lead-business"
              label="Company or business name"
              type="text"
              autoComplete="organization"
              value={fields.business}
              onChange={(v) => set("business", v)}
              error={errors.business}
            />
            <LabeledInput
              id="lead-phone"
              label="Phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={(v) => set("phone", v)}
              error={errors.phone}
            />
            <LabeledInput
              id="lead-email"
              label="Email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={fields.email}
              onChange={(v) => set("email", v)}
              error={errors.email}
            />
          </div>

          {/* v22.1: reserved slot so the button never moves. */}
          <p aria-live="polite" style={{ ...errorStyle, marginTop: 12 }}>
            {sendError ?? ""}
          </p>

          <button
            type="submit"
            disabled={sending}
            className="lead-submit"
            style={{
              marginTop: 12,
              width: "100%",
              background: "var(--dd-indigo, #7C6CFF)",
              color: "#0A0A0A",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 24px",
              borderRadius: 999,
              opacity: sending ? 0.7 : 1,
              transition: "filter var(--dur-fast) var(--ease-out)",
            }}
          >
            {sending
              ? "Sending the code..."
              : isCommunity
                ? "Send me the code"
                : "Send me the confirmation code"}
          </button>

          {hardFail && <FailWhatsAppLink />}
        </form>
      )}

      {screen === "code" && (
        <form onSubmit={verify} noValidate>
          <h1
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px, 4.5vw, 44px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Check your inbox.
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "var(--fg-muted)",
              margin: "0 0 32px",
            }}
          >
            We sent a 6-digit code to{" "}
            <span style={{ color: "var(--fg)" }}>{fields.email.trim()}</span>.
            Enter it below.
          </p>

          <input
            ref={codeInputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            aria-label="Six-digit confirmation code"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            style={{
              ...inputStyle,
              letterSpacing: "0.4em",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 22,
              textAlign: "center",
            }}
            placeholder="000000"
          />

          {/* v22.1: one reserved slot for both messages so the button never
              moves when an error or the resend note appears. */}
          <p
            aria-live="polite"
            style={{
              ...errorStyle,
              marginTop: 12,
              ...(resent && !codeError ? { color: "var(--fg-muted)" } : {}),
            }}
          >
            {codeError ??
              (resent
                ? "Sent again. Check spam if it does not arrive in a minute."
                : "")}
          </p>

          <button
            type="submit"
            disabled={verifying}
            className="lead-submit"
            style={{
              marginTop: 12,
              width: "100%",
              background: "var(--dd-indigo, #7C6CFF)",
              color: "#0A0A0A",
              fontSize: 16,
              fontWeight: 600,
              padding: "16px 24px",
              borderRadius: 999,
              opacity: verifying ? 0.7 : 1,
              transition: "filter var(--dur-fast) var(--ease-out)",
            }}
          >
            {verifying ? "Checking..." : "Verify and finish"}
          </button>

          <button
            type="button"
            onClick={resendCode}
            disabled={resending}
            style={{
              marginTop: 18,
              fontSize: 14,
              color: "var(--accent)",
              padding: "6px 0",
            }}
          >
            {resending ? "Resending..." : "Resend the code"}
          </button>

          {hardFail && <FailWhatsAppLink />}
        </form>
      )}

      {screen === "done" && (
        <div>
          <h1
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            {isCommunity ? "You are on the list." : "You are in."}
          </h1>
          {isCommunity ? (
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.6,
                color: "var(--fg-muted)",
                margin: 0,
                maxWidth: 480,
              }}
            >
              Anish will look at your request and reach out on WhatsApp or
              email. Talk soon.
            </p>
          ) : (
            <>
              <p
                style={{
                  fontSize: 17,
                  lineHeight: 1.6,
                  color: "var(--fg-muted)",
                  margin: "0 0 32px",
                  maxWidth: 480,
                }}
              >
                We will reach out on WhatsApp or email within one working day.
                If you want to skip the wait, message us now.
              </p>
              <TrackedWhatsAppLink
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="lead-wa"
                style={{
                  background: "var(--whatsapp, #25D366)",
                  color: "#0A0A0A",
                  fontSize: 16,
                  fontWeight: 600,
                  padding: "16px 28px",
                  borderRadius: 999,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Message us on WhatsApp
              </TrackedWhatsAppLink>
            </>
          )}
        </div>
      )}

      <style>{`
        .lead-submit:hover { filter: brightness(1.08); }
        .lead-submit:active { transform: translateY(1px); }
        .lead-submit:focus-visible,
        .lead-wa:focus-visible {
          outline: 2px solid var(--dd-indigo-soft, #818CF8);
          outline-offset: 3px;
        }
        .lead-wa:hover { filter: brightness(1.05); }
        .lead-wa:active { transform: translateY(1px); }
      `}</style>
    </div>
  );
}

// v25 hotfix: the working path out when the backend fails. Same WhatsApp
// link the done screen uses, rendered under the active screen's button.
function FailWhatsAppLink() {
  return (
    <div style={{ marginTop: 16 }}>
      <TrackedWhatsAppLink
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="lead-wa"
        style={{
          background: "var(--whatsapp, #25D366)",
          color: "#0A0A0A",
          fontSize: 15,
          fontWeight: 600,
          padding: "13px 24px",
          borderRadius: 999,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        Message us on WhatsApp
      </TrackedWhatsAppLink>
    </div>
  );
}

function LabeledInput({
  id,
  label,
  type,
  inputMode,
  autoComplete,
  value,
  onChange,
  error,
}: {
  id: string;
  label: string;
  type: string;
  inputMode?: "tel" | "email";
  autoComplete: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 14,
          color: "var(--fg-muted)",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          ...inputStyle,
          borderColor: error ? "#E5847C" : "var(--border-strong)",
        }}
      />
      {/* v22.1: the error line always occupies its slot (fixed min-height),
          so showing or clearing it never moves the fields below. */}
      <p id={`${id}-error`} aria-live="polite" style={errorStyle}>
        {error ?? ""}
      </p>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "15px 18px",
  background: "var(--bg-card)",
  border: "1px solid var(--border-strong)",
  borderRadius: 12,
  color: "var(--fg)",
  fontSize: 17,
  fontFamily: "inherit",
  outline: "none",
};

// v22.1: minHeight reserves the line whether or not a message is showing.
const errorStyle: React.CSSProperties = {
  marginTop: 6,
  fontSize: 14,
  lineHeight: 1.4,
  minHeight: 20,
  color: "#FFB4A8",
};
