"use client";

import React, { useEffect, useRef, useState } from "react";

type Country = "IN" | "AE";

type FormState = {
  firstName: string;
  lastName: string;
  business: string;
  teamSize: string;
  industry: string;
  country: Country;
  phone: string;
  email: string;
  emailVerified: boolean;
  bottleneck: string;
  budget: string;
  slot: string;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  business: "",
  teamSize: "",
  industry: "",
  country: "IN",
  phone: "",
  email: "",
  emailVerified: false,
  bottleneck: "",
  budget: "",
  slot: "",
};

const LS_KEY = "dd-study-form-state-v1";

const TEAM_SIZES = ["Just me", "2 to 5", "6 to 20", "21 to 50", "51 to 200", "200+"];

const INDUSTRIES = [
  "F&B / Restaurants",
  "Wellness / Beauty / Skincare",
  "Retail / D2C",
  "Professional Services",
  "Manufacturing / Industrial",
  "Hospitality / Travel",
  "Healthcare / Clinics",
  "Creative / Studios",
  "Agriculture / Farms",
  "Other",
];

const BUDGETS = [
  "Under ₹50,000",
  "₹50,000 to ₹1L",
  "₹1L to ₹3L",
  "₹3L to ₹10L",
  "₹10L+",
  "Not sure yet",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const STEPS = [
  "intro",
  "firstName",
  "lastName",
  "business",
  "teamSize",
  "industry",
  "phone",
  "email",
  "otp",
  "bottleneck",
  "budget",
  "slot",
  "review",
  "success",
] as const;
type StepName = (typeof STEPS)[number];

export default function StudyForm() {
  const [step, setStep] = useState<StepName>("intro");
  const [data, setData] = useState<FormState>(INITIAL);
  const [hydrated, setHydrated] = useState(false);

  const [otp, setOtp] = useState("");
  const [otpSending, setOtpSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  // F4 (v16): step container ref for scroll-to-top on advance, so the
  // current question lands below the sticky nav + progress bar instead
  // of falling into the overlap zone.
  const stepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FormState>;
        setData({ ...INITIAL, ...parsed });
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch {}
  }, [data, hydrated]);

  useEffect(() => {
    // F4: scroll the active step into view with header offset, then focus.
    // scrollIntoView with block:start respects scroll-margin-top on the
    // wrapper section (set to 100px in page.tsx), which clears both the
    // sticky nav (~80px) and the sticky progress bar (~40px).
    if (step !== "intro" && stepRef.current) {
      stepRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const idx = STEPS.indexOf(step);
  const totalQuestions = 11;
  const questionNumber = Math.min(Math.max(idx, 0), totalQuestions);
  const progress = step === "success" ? 100 : (questionNumber / totalQuestions) * 100;

  const goPrev = () => {
    if (idx > 0 && step !== "success") setStep(STEPS[idx - 1]);
  };
  const goNext = (next: StepName) => setStep(next);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData(d => ({ ...d, [k]: v }));

  const sendOtp = async () => {
    setOtpError(null);
    setOtpSending(true);
    try {
      const res = await fetch("/api/otp-send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = await res.json();
      if (!json.ok) {
        setOtpError(json.error || "Could not send the code.");
        return;
      }
      setOtpSent(true);
      goNext("otp");
    } catch {
      setOtpError("Could not send the code.");
    } finally {
      setOtpSending(false);
    }
  };

  const verifyOtp = async () => {
    setOtpError(null);
    setVerifying(true);
    try {
      const res = await fetch("/api/otp-verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email, otp }),
      });
      const json = await res.json();
      if (!json.ok) {
        setOtpError(json.error || "Invalid code.");
        return;
      }
      update("emailVerified", true);
      goNext("bottleneck");
    } catch {
      setOtpError("Could not verify the code.");
    } finally {
      setVerifying(false);
    }
  };

  const submit = async () => {
    setSubmitError(null);
    setSubmitting(true);
    try {
      const payload = {
        name: `${data.firstName} ${data.lastName}`.trim(),
        business: data.business,
        teamSize: data.teamSize,
        bottleneck: data.bottleneck,
        country: data.country,
        phone: data.phone,
        email: data.email,
        budget: data.budget,
        slot: data.slot,
        emailVerified: data.emailVerified,
        industry: data.industry,
      };
      const res = await fetch("/api/start-your-study", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!json.ok) {
        setSubmitError(json.error || "Could not submit.");
        return;
      }
      try { localStorage.removeItem(LS_KEY); } catch {}
      goNext("success");
    } catch {
      setSubmitError("Could not submit.");
    } finally {
      setSubmitting(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (step) {
      case "firstName": return data.firstName.trim().length > 0;
      case "lastName": return data.lastName.trim().length > 0;
      case "business": return data.business.trim().length > 0;
      case "teamSize": return data.teamSize.length > 0;
      case "industry": return data.industry.length > 0;
      case "phone": return data.phone.trim().length >= 7;
      case "email": return EMAIL_RE.test(data.email);
      case "otp": return /^[0-9]{6}$/.test(otp);
      case "bottleneck": return data.bottleneck.trim().length >= 10;
      case "budget": return data.budget.length > 0;
      case "slot": return data.slot.trim().length > 0;
      default: return true;
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && isStepValid()) {
      e.preventDefault();
      advance();
    }
  };

  const advance = () => {
    if (!isStepValid()) return;
    switch (step) {
      case "firstName": return goNext("lastName");
      case "lastName": return goNext("business");
      case "business": return goNext("teamSize");
      case "teamSize": return goNext("industry");
      case "industry": return goNext("phone");
      case "phone": return goNext("email");
      case "email": return sendOtp();
      case "otp": return verifyOtp();
      case "bottleneck": return goNext("budget");
      case "budget": return goNext("slot");
      case "slot": return goNext("review");
      case "review": return submit();
      default: return;
    }
  };

  const ctaLabel = (() => {
    switch (step) {
      case "email": return otpSending ? "Sending code..." : "Send verification code";
      case "otp": return verifying ? "Verifying..." : "Verify and continue";
      case "review": return submitting ? "Sending..." : "Send to the studio";
      default: return "Next";
    }
  })();

  return (
    <div ref={stepRef} style={{ minHeight: "calc(100vh - 200px)", display: "flex", flexDirection: "column", scrollMarginTop: "100px" }}>
      <div style={{ position: "sticky", top: "80px", zIndex: 10, background: "var(--bg)", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ flex: 1, height: "2px", background: "var(--border)", borderRadius: "999px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, height: "100%", background: "var(--accent)", transition: "width 300ms var(--ease-out)" }} />
          </div>
          <p className="mono" style={{ color: "var(--fg-dim)" }}>
            {step === "intro" || step === "success" ? "" : `${questionNumber} / ${totalQuestions}`}
          </p>
        </div>
      </div>

      <div className="container" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBlock: "64px" }}>
        <div style={{ width: "100%", maxWidth: "640px" }}>
          {step === "intro" && (
            <div>
              <p className="eyebrow" style={{ marginBottom: "24px" }}>11-QUESTION STUDY</p>
              <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                Or send a written brief.
              </h2>
              <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "40px" }}>
                Eleven quick questions, a verified email, a reply within 24 hours with a plan, a timeline, and a number. If you have already pinged us on WhatsApp, you can skip this.
              </p>
              <button onClick={() => goNext("firstName")} className="btn-outline" style={{ background: "var(--accent)", borderColor: "var(--accent)", color: "#fff" }}>Start the 11 questions</button>
            </div>
          )}

          {step === "firstName" && (
            <Field label="What is your first name?" labelMono="01">
              <input ref={el => { inputRef.current = el; }} type="text" autoComplete="given-name" value={data.firstName} onChange={e => update("firstName", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="" />
            </Field>
          )}

          {step === "lastName" && (
            <Field label="And your last name?" labelMono="02">
              <input ref={el => { inputRef.current = el; }} type="text" autoComplete="family-name" value={data.lastName} onChange={e => update("lastName", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="" />
            </Field>
          )}

          {step === "business" && (
            <Field label="What is your business called?" labelMono="03">
              <input ref={el => { inputRef.current = el; }} type="text" autoComplete="organization" value={data.business} onChange={e => update("business", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="" />
            </Field>
          )}

          {step === "teamSize" && (
            <Field label="How big is your team?" labelMono="04" sub="Including you.">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {TEAM_SIZES.map(s => (
                  <PillRadio key={s} active={data.teamSize === s} onClick={() => { update("teamSize", s); }}>{s}</PillRadio>
                ))}
              </div>
            </Field>
          )}

          {step === "industry" && (
            <Field label="What kind of business is it?" labelMono="05">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {INDUSTRIES.map(i => (
                  <PillRadio key={i} active={data.industry === i} onClick={() => { update("industry", i); }}>{i}</PillRadio>
                ))}
              </div>
            </Field>
          )}

          {step === "phone" && (
            <Field label="What is the best number to reach you on?" labelMono="06" sub="We text first. We do not cold call.">
              <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                <CountryToggle active={data.country === "IN"} onClick={() => update("country", "IN")}>+91 India</CountryToggle>
                <CountryToggle active={data.country === "AE"} onClick={() => update("country", "AE")}>+971 UAE</CountryToggle>
              </div>
              <input ref={el => { inputRef.current = el; }} type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={e => update("phone", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="" />
            </Field>
          )}

          {step === "email" && (
            <Field label="What is your email?" labelMono="07" sub="We send a six-digit code to confirm it.">
              <input ref={el => { inputRef.current = el; }} type="email" inputMode="email" autoComplete="email" value={data.email} onChange={e => update("email", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="" />
              {otpError && <p style={errorStyle}>{otpError}</p>}
            </Field>
          )}

          {step === "otp" && (
            <Field label="Enter the six-digit code" labelMono="08" sub={`Sent to ${data.email}. Check spam if it does not arrive in a minute.`}>
              <input ref={el => { inputRef.current = el; }} type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} onKeyDown={onEnter} style={{ ...inputStyle, letterSpacing: "0.4em", fontFamily: "var(--font-geist-mono), monospace", fontSize: "22px" }} placeholder="000000" />
              {otpError && <p style={errorStyle}>{otpError}</p>}
              <button onClick={sendOtp} disabled={otpSending} style={{ marginTop: "16px", fontSize: "13px", color: "var(--accent)" }}>
                {otpSending ? "Resending..." : otpSent ? "Resend code" : "Send code"}
              </button>
            </Field>
          )}

          {step === "bottleneck" && (
            <Field label="What is slowing the business down right now?" labelMono="09" sub="A few sentences is fine. The more specific, the better.">
              <textarea ref={el => { inputRef.current = el; }} rows={5} value={data.bottleneck} onChange={e => update("bottleneck", e.target.value)} onKeyDown={onEnter} style={{ ...inputStyle, resize: "vertical", minHeight: "140px" }} placeholder="" />
            </Field>
          )}

          {step === "budget" && (
            <Field label="What is the budget you are working with?" labelMono="10" sub="If you are not sure, pick the closest range. Real numbers help us be honest with you.">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {BUDGETS.map(b => (
                  <PillRadio key={b} active={data.budget === b} onClick={() => { update("budget", b); }}>{b}</PillRadio>
                ))}
              </div>
            </Field>
          )}

          {step === "slot" && (
            <Field label="When works for a 45-minute call?" labelMono="11" sub="A day and a window in your time zone is enough.">
              <input ref={el => { inputRef.current = el; }} type="text" value={data.slot} onChange={e => update("slot", e.target.value)} onKeyDown={onEnter} style={inputStyle} placeholder="Thursday afternoon IST" />
            </Field>
          )}

          {step === "review" && (
            <div>
              <p className="eyebrow" style={{ marginBottom: "16px" }}>READY TO SEND</p>
              <h2 style={{ fontSize: "var(--fs-h2)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                Does this look right?
              </h2>
              <dl style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "8px 24px", fontSize: "15px", marginBottom: "32px", color: "var(--fg-muted)" }}>
                <dt style={dtStyle}>Name</dt><dd style={ddStyle}>{data.firstName} {data.lastName}</dd>
                <dt style={dtStyle}>Business</dt><dd style={ddStyle}>{data.business}</dd>
                <dt style={dtStyle}>Team size</dt><dd style={ddStyle}>{data.teamSize}</dd>
                <dt style={dtStyle}>Industry</dt><dd style={ddStyle}>{data.industry}</dd>
                <dt style={dtStyle}>Phone</dt><dd style={ddStyle}>+{data.country === "IN" ? "91" : "971"} {data.phone}</dd>
                <dt style={dtStyle}>Email</dt><dd style={ddStyle}>{data.email}</dd>
                <dt style={dtStyle}>Budget</dt><dd style={ddStyle}>{data.budget}</dd>
                <dt style={dtStyle}>Slot</dt><dd style={ddStyle}>{data.slot}</dd>
              </dl>
              <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "24px", padding: "16px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "8px" }}>
                <strong style={{ color: "var(--fg)", fontWeight: 500 }}>Bottleneck:</strong><br />
                {data.bottleneck}
              </p>
              {submitError && <p style={errorStyle}>{submitError}</p>}
            </div>
          )}

          {step === "success" && (
            <div style={{ textAlign: "center" }}>
              <p className="eyebrow" style={{ marginBottom: "24px" }}>RECEIVED</p>
              <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                We&apos;ve got it.
              </h2>
              <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "32px" }}>
                We&apos;ll come back within 24 hours with a plan, a timeline, and a number. If you&apos;d rather talk now, WhatsApp us at +91 99687 16498.
              </p>
              <a href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business." className="btn-whatsapp">Start a conversation</a>
            </div>
          )}

          {step !== "intro" && step !== "success" && (
            <div style={{ display: "flex", gap: "12px", marginTop: "32px", alignItems: "center" }}>
              <button onClick={goPrev} disabled={idx <= 1} style={{ fontSize: "14px", color: "var(--fg-muted)", padding: "12px 16px", opacity: idx <= 1 ? 0.3 : 1, cursor: idx <= 1 ? "not-allowed" : "pointer" }}>
                ← Back
              </button>
              <div style={{ flex: 1 }} />
              <button
                onClick={advance}
                disabled={!isStepValid() || otpSending || verifying || submitting}
                className="btn-outline"
                style={{ background: isStepValid() ? "var(--accent)" : "transparent", borderColor: isStepValid() ? "var(--accent)" : "var(--border-strong)", color: isStepValid() ? "#fff" : "var(--fg-muted)", opacity: (!isStepValid() || otpSending || verifying || submitting) ? 0.6 : 1 }}
              >
                {ctaLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, labelMono, sub, children }: { label: string; labelMono: string; sub?: string; children: React.ReactNode }) {
  // F11 (v16): the H2 question doubles as the input's accessible name.
  // We attach a stable id from the mono label index ("01" → "study-q-01")
  // and surface it to the input via aria-labelledby cloned into children.
  const id = `study-q-${labelMono.replace(/[^a-z0-9]/gi, "").toLowerCase()}`;
  const subId = sub ? `${id}-sub` : undefined;
  const labelledBy = subId ? `${id} ${subId}` : id;
  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    return React.cloneElement(child as React.ReactElement<{ "aria-labelledby"?: string }>, {
      "aria-labelledby": labelledBy,
    });
  });
  return (
    <div>
      <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>{labelMono}</p>
      <h2 id={id} style={{ fontSize: "var(--fs-h2)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: sub ? "8px" : "24px" }}>{label}</h2>
      {sub && <p id={subId} style={{ fontSize: "15px", color: "var(--fg-muted)", marginBottom: "24px", lineHeight: 1.5 }}>{sub}</p>}
      {enhancedChildren}
    </div>
  );
}

function PillRadio({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "14px 18px",
        borderRadius: "10px",
        border: "1px solid",
        borderColor: active ? "var(--accent)" : "var(--border-strong)",
        background: active ? "rgba(124,108,255,0.12)" : "transparent",
        color: active ? "var(--fg)" : "var(--fg-muted)",
        fontSize: "15px",
        transition: "all 150ms var(--ease-out)",
      }}
    >
      {children}
    </button>
  );
}

function CountryToggle({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: "999px",
        border: "1px solid",
        borderColor: active ? "var(--accent)" : "var(--border-strong)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#fff" : "var(--fg-muted)",
        fontSize: "13px",
      }}
    >
      {children}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "16px 18px",
  background: "var(--bg-card)",
  border: "1px solid var(--border-strong)",
  borderRadius: "10px",
  color: "var(--fg)",
  fontSize: "17px",
  fontFamily: "inherit",
  outline: "none",
};

const errorStyle: React.CSSProperties = {
  marginTop: "12px",
  fontSize: "14px",
  color: "#FFB4A8",
};

const dtStyle: React.CSSProperties = {
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "12px",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--fg-dim)",
  alignSelf: "baseline",
};

const ddStyle: React.CSSProperties = {
  color: "var(--fg)",
  margin: 0,
};
