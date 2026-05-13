"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { WHATSAPP_HREF, CALENDLY_HREF } from "@/lib/contact";

const EASE = [0.16, 1, 0.3, 1] as const;
const STORAGE_KEY = "dd-study-form-state-v1";

type TeamSize = "Solo" | "2 to 10" | "11 to 50" | "50+";
type Budget =
  | "Under ₹1L"
  | "₹1L to 5L"
  | "₹5L to 15L"
  | "₹15L+"
  | "Not sure yet";
type Country = "IN" | "AE" | "Other";

type FormState = {
  name: string;
  business: string;
  teamSize: TeamSize | "";
  bottleneck: string;
  email: string;
  emailVerified: boolean;
  otp: string;
  country: Country;
  phone: string;
  budget: Budget | "";
  slot: string;
};

const INITIAL: FormState = {
  name: "",
  business: "",
  teamSize: "",
  bottleneck: "",
  email: "",
  emailVerified: false,
  otp: "",
  country: "IN",
  phone: "",
  budget: "",
  slot: "",
};

const TEAM_SIZES: TeamSize[] = ["Solo", "2 to 10", "11 to 50", "50+"];

const BUDGETS: Budget[] = [
  "Under ₹1L",
  "₹1L to 5L",
  "₹5L to 15L",
  "₹15L+",
  "Not sure yet",
];

const STEP_LABELS = [
  "Name",
  "Business",
  "Team",
  "Bottleneck",
  "Email",
  "Verify",
  "Phone",
  "Budget",
  "When",
];

const TOTAL_STEPS = STEP_LABELS.length;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validPhone(country: Country, phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, "");
  if (country === "IN") return digits.length === 10;
  if (country === "AE") return digits.length === 9;
  return digits.length >= 6 && digits.length <= 15;
}

function nextSlots(): { value: string; label: string }[] {
  const now = new Date();
  const slots: { value: string; label: string }[] = [];
  const times: [number, string][] = [
    [10, "10:00"],
    [14, "14:00"],
    [17, "17:00"],
  ];
  let added = 0;
  let offset = 1;
  while (added < 4 && offset < 12) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    const dow = d.getDay();
    if (dow === 0 || dow === 6) {
      offset += 1;
      continue;
    }
    const [hour, hLabel] = times[added % times.length];
    d.setHours(hour, 0, 0, 0);
    const value = d.toISOString();
    const dayLabel = d.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    slots.push({ value, label: `${dayLabel} · ${hLabel} IST` });
    added += 1;
    offset += 1;
  }
  return slots;
}

type Phase = "intro" | "questions" | "done";

export default function StudyForm() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(INITIAL);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [otpSending, setOtpSending] = useState(false);
  const [otpHint, setOtpHint] = useState<string | null>(null);
  const [prefilled, setPrefilled] = useState<{
    industry?: string;
    objective?: string;
  }>({});
  const slots = useMemo(() => nextSlots(), []);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  // Hydrate prefilled filter params and any saved form state on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const industry = params.get("industry");
    const objective = params.get("objective");
    if (industry || objective) {
      setPrefilled({
        industry: industry ?? undefined,
        objective: objective ?? undefined,
      });
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as { data?: FormState; step?: number };
        if (parsed.data) setData({ ...INITIAL, ...parsed.data });
        if (typeof parsed.step === "number")
          setStep(Math.max(0, Math.min(parsed.step, TOTAL_STEPS - 1)));
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  // Persist on every change once the user has entered the questions phase.
  useEffect(() => {
    if (phase !== "questions") return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
    } catch {
      // Ignore storage errors.
    }
  }, [data, step, phase]);

  // Exit intent: if the user has typed anything, ask before leaving.
  useEffect(() => {
    if (phase !== "questions") return;
    const hasInput =
      data.name.length > 0 ||
      data.business.length > 0 ||
      data.bottleneck.length > 0 ||
      data.email.length > 0 ||
      data.phone.length > 0;
    if (!hasInput) return;
    function handler(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [phase, data]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step, phase]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function canAdvance(): boolean {
    switch (step) {
      case 0:
        return data.name.trim().length > 1;
      case 1:
        return data.business.trim().length > 1;
      case 2:
        return data.teamSize !== "";
      case 3:
        return data.bottleneck.trim().length > 10;
      case 4:
        return EMAIL_RE.test(data.email.trim());
      case 5:
        return data.emailVerified;
      case 6:
        return validPhone(data.country, data.phone);
      case 7:
        return data.budget !== "";
      case 8:
        return data.slot.length > 0;
      default:
        return false;
    }
  }

  async function requestOtp() {
    setOtpSending(true);
    setError(null);
    setOtpHint(null);
    try {
      const res = await fetch("/api/otp-send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        devCode?: string;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Could not send code.");
      }
      if (json.devCode) {
        setOtpHint(`Dev mode: use code ${json.devCode}.`);
      }
      setStep(5);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send code.");
    } finally {
      setOtpSending(false);
    }
  }

  async function verifyOtp() {
    setOtpSending(true);
    setError(null);
    try {
      const res = await fetch("/api/otp-verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.email, otp: data.otp }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Incorrect code.");
      }
      update("emailVerified", true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Incorrect code.");
    } finally {
      setOtpSending(false);
    }
  }

  async function submitFinal() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/start-your-study", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          industry: prefilled.industry,
          objective: prefilled.objective,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "Submission failed.");
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore storage errors.
      }
      setPhase("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Submission failed.");
    } finally {
      setSending(false);
    }
  }

  function goNext() {
    setError(null);
    if (step === 4) {
      requestOtp();
      return;
    }
    if (step === 5 && !data.emailVerified) {
      verifyOtp();
      return;
    }
    if (step === TOTAL_STEPS - 1) {
      submitFinal();
      return;
    }
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  }

  function goBack() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  if (phase === "done") {
    return <Confirmation name={data.name} />;
  }

  if (phase === "intro") {
    return <Intro start={() => setPhase("questions")} prefilled={prefilled} />;
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBlock: "clamp(80px, 14vh, 144px)",
        paddingInline: 24,
      }}
    >
      <div
        style={{
          maxWidth: 720,
          width: "100%",
          marginInline: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>
            STEP {String(step + 1).padStart(2, "0")} / {TOTAL_STEPS} ·{" "}
            <span style={{ color: "var(--text-2)" }}>{STEP_LABELS[step]}</span>
          </span>
          <button
            type="button"
            onClick={() => {
              if (
                confirm(
                  "Leave the form and open WhatsApp instead? Your answers will be saved."
                )
              ) {
                window.location.href = WHATSAPP_HREF;
              }
            }}
            data-cursor="pointer"
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-3)",
              fontFamily: "inherit",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Skip to WhatsApp ↗
          </button>
        </div>

        <Progress step={step} total={TOTAL_STEPS} />

        <div style={{ minHeight: 380, marginTop: 56 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {renderStep(step, data, update, slots)}
            </motion.div>
          </AnimatePresence>
        </div>

        {otpHint ? (
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              color: "var(--text-3)",
              marginTop: 16,
            }}
          >
            {otpHint}
          </p>
        ) : null}

        {error ? (
          <p
            role="alert"
            style={{
              color: "#D87575",
              fontSize: 14,
              marginTop: 20,
              fontFamily: "var(--font-geist-mono), monospace",
            }}
          >
            {error}
          </p>
        ) : null}

        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || sending || otpSending}
            data-cursor="pointer"
            style={{
              paddingInline: 22,
              paddingBlock: 12,
              background: "transparent",
              color: step === 0 ? "var(--text-3)" : "var(--text-2)",
              border: "1px solid var(--border-2)",
              borderRadius: 9999,
              fontSize: 14,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              cursor: step === 0 ? "not-allowed" : "pointer",
              opacity: step === 0 ? 0.4 : 1,
            }}
          >
            ← Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={!canAdvance() || sending || otpSending}
            data-cursor="pointer"
            style={{
              paddingInline: 28,
              paddingBlock: 14,
              background: canAdvance() ? "var(--accent)" : "var(--text-3)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              cursor: canAdvance() ? "pointer" : "not-allowed",
              opacity: sending || otpSending ? 0.6 : 1,
            }}
          >
            {nextLabel(step, sending, otpSending, data.emailVerified)}
          </button>
        </div>
      </div>
    </section>
  );
}

function nextLabel(
  step: number,
  sending: boolean,
  otpSending: boolean,
  verified: boolean
): string {
  if (sending) return "Sending...";
  if (otpSending && step === 4) return "Sending code...";
  if (otpSending && step === 5) return "Verifying...";
  if (step === 4) return "Send verification code →";
  if (step === 5) return verified ? "Continue →" : "Verify code →";
  if (step === TOTAL_STEPS - 1) return "Send to studio →";
  return "Continue →";
}

function renderStep(
  step: number,
  data: FormState,
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void,
  slots: { value: string; label: string }[]
) {
  switch (step) {
    case 0:
      return (
        <Question title="What is your name?" hint="Just the first name is fine.">
          <input
            autoFocus
            type="text"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            aria-label="First name"
            style={inputStyle}
            placeholder="First name"
          />
        </Question>
      );
    case 1:
      return (
        <Question
          title="What is your business?"
          hint="What you sell. What it is called."
        >
          <input
            autoFocus
            type="text"
            value={data.business}
            onChange={(e) => update("business", e.target.value)}
            aria-label="Business name and what it does"
            style={inputStyle}
            placeholder="Your business name and what it does"
          />
        </Question>
      );
    case 2:
      return (
        <Question title="How big is your team?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {TEAM_SIZES.map((t) => (
              <Chip
                key={t}
                active={data.teamSize === t}
                onClick={() => update("teamSize", t)}
              >
                {t}
              </Chip>
            ))}
          </div>
        </Question>
      );
    case 3:
      return (
        <Question
          title="What is slowing you down?"
          hint="The thing that eats hours every week. One to three sentences."
        >
          <textarea
            autoFocus
            rows={5}
            value={data.bottleneck}
            onChange={(e) => update("bottleneck", e.target.value)}
            aria-label="What is slowing your business down"
            style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
            placeholder="Customers asking the same questions on WhatsApp. We copy paste the same answers all day."
          />
        </Question>
      );
    case 4:
      return (
        <Question
          title="What is the best email for follow-up?"
          hint="We will send a six-digit code to verify it. No spam, ever."
        >
          <input
            autoFocus
            type="email"
            value={data.email}
            onChange={(e) => {
              update("email", e.target.value);
              update("emailVerified", false);
            }}
            aria-label="Email address"
            style={inputStyle}
            placeholder="you@yourbusiness.com"
          />
        </Question>
      );
    case 5:
      return (
        <Question
          title="Enter the code we sent you."
          hint="Six digits. Check your inbox at the address you entered."
        >
          <input
            autoFocus
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={data.otp}
            onChange={(e) =>
              update("otp", e.target.value.replace(/[^0-9]/g, ""))
            }
            disabled={data.emailVerified}
            aria-label="Six-digit verification code"
            style={{
              ...inputStyle,
              maxWidth: 260,
              fontSize: 24,
              letterSpacing: "0.4em",
              fontFamily: "var(--font-geist-mono), monospace",
            }}
            placeholder="000000"
          />
          {data.emailVerified ? (
            <p
              style={{
                marginTop: 12,
                color: "var(--accent-2, #79C9A0)",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Verified.
            </p>
          ) : null}
        </Question>
      );
    case 6:
      return (
        <Question
          title="What is your phone number?"
          hint="So we can reach you. We do not verify it."
        >
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <select
              value={data.country}
              onChange={(e) => update("country", e.target.value as Country)}
              aria-label="Country code"
              style={{ ...inputStyle, maxWidth: 150 }}
            >
              <option value="IN">IN +91</option>
              <option value="AE">AE +971</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="tel"
              value={data.phone}
              onChange={(e) =>
                update("phone", e.target.value.replace(/[^0-9+ ]/g, ""))
              }
              aria-label="Phone number"
              style={{ ...inputStyle, flex: 1, minWidth: 200 }}
              placeholder="Phone number"
            />
          </div>
        </Question>
      );
    case 7:
      return (
        <Question title="What is your budget thinking?">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {BUDGETS.map((b) => (
              <Chip
                key={b}
                active={data.budget === b}
                onClick={() => update("budget", b)}
              >
                {b}
              </Chip>
            ))}
          </div>
        </Question>
      );
    case 8:
      return (
        <Question
          title="When can we talk?"
          hint="A short call to walk you through what we would build. Times in IST."
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {slots.map((s) => (
              <Chip
                key={s.value}
                active={data.slot === s.value}
                onClick={() => update("slot", s.value)}
                wide
              >
                {s.label}
              </Chip>
            ))}
            <Chip
              active={data.slot === "calendly"}
              onClick={() => update("slot", "calendly")}
              wide
            >
              Send me a Calendly link
            </Chip>
          </div>
        </Question>
      );
    default:
      return null;
  }
}

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 6, height: 4 }} aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          style={{
            flex: 1,
            borderRadius: 9999,
            background: i <= step ? "var(--accent)" : "var(--border-2)",
            transition: "background 0.4s var(--ease-spring)",
          }}
        />
      ))}
    </div>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <h2
        style={{
          fontSize: "clamp(28px, 4.8vw, 44px)",
          fontWeight: 300,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          margin: 0,
          lineHeight: 1.12,
        }}
      >
        {title}
      </h2>
      {hint ? (
        <p
          style={{
            margin: 0,
            color: "var(--text-2)",
            fontSize: 15,
            lineHeight: 1.5,
            maxWidth: 540,
          }}
        >
          {hint}
        </p>
      ) : null}
      <div>{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  wide,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="pointer"
      style={{
        paddingInline: wide ? 22 : 18,
        paddingBlock: wide ? 14 : 12,
        background: active ? "var(--accent)" : "transparent",
        color: active ? "#FFFFFF" : "var(--text)",
        border: `1px solid ${active ? "var(--accent)" : "var(--border-2)"}`,
        borderRadius: 9999,
        fontSize: 14,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        cursor: "pointer",
        textAlign: wide ? "left" : "center",
        width: wide ? "100%" : "auto",
        maxWidth: wide ? 480 : "none",
        transition: "all 0.2s var(--ease-spring)",
      }}
    >
      {children}
    </button>
  );
}

function Intro({
  start,
  prefilled,
}: {
  start: () => void;
  prefilled: { industry?: string; objective?: string };
}) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingBlock: "clamp(96px, 16vh, 144px)",
        paddingInline: 24,
      }}
    >
      <div style={{ maxWidth: 780, width: "100%", marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 20,
          }}
        >
          INTAKE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Let&apos;s explore possibilities for your business.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.6,
            margin: 0,
            marginTop: 24,
            maxWidth: 640,
          }}
        >
          Nine quick questions. A verified email. We come back within 24 hours
          with a plan, a timeline, and a number.
        </motion.p>

        {prefilled.industry || prefilled.objective ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            style={{
              marginTop: 24,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            Pre-noted from your filter:{" "}
            {[prefilled.industry, prefilled.objective]
              .filter(Boolean)
              .join(" · ")}
          </motion.p>
        ) : null}

        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginTop: 40,
            display: "flex",
            flexDirection: "column",
            gap: 14,
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            {
              icon: "clock",
              label: "9 quick questions",
              hint: "Three to five minutes.",
            },
            {
              icon: "shield",
              label: "Verified email, never spammed",
              hint: "One code, one time. We do not market to you.",
            },
            {
              icon: "mail",
              label: "Reply within 24 hours",
              hint: "A plan, a timeline, and a number.",
            },
          ].map((row) => (
            <li
              key={row.label}
              style={{
                display: "flex",
                gap: 18,
                paddingBlock: 16,
                borderBottom: "1px solid var(--border)",
                alignItems: "center",
              }}
            >
              <IntroIcon name={row.icon} />
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 16,
                    color: "var(--text)",
                    fontWeight: 500,
                  }}
                >
                  {row.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "var(--text-3)",
                    marginTop: 2,
                  }}
                >
                  {row.hint}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          style={{
            marginTop: 40,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={start}
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 28,
              paddingBlock: 16,
              background: "var(--accent)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              cursor: "pointer",
            }}
          >
            Start the questions
            <span aria-hidden>→</span>
          </button>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 28,
              paddingBlock: 16,
              background: "transparent",
              color: "var(--text)",
              border: "1px solid var(--border-2)",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Skip and WhatsApp us instead ↗
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "var(--text-3)",
          }}
        >
          Prefer to talk first?{" "}
          <a
            href={CALENDLY_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              color: "var(--text-2)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Book a 20-min call →
          </a>
        </motion.p>
      </div>
    </section>
  );
}

function IntroIcon({ name }: { name: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--accent)",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    style: { flexShrink: 0 },
  };
  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (name === "shield") {
    return (
      <svg {...common}>
        <path d="M12 3l8 3v6c0 4.5 -3.5 7.5 -8 9c-4.5 -1.5 -8 -4.5 -8 -9V6z" />
        <path d="M9 12l2 2l4 -4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 7l9 6l9 -6" />
    </svg>
  );
}

function Confirmation({ name }: { name: string }) {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingInline: 24,
      }}
    >
      <div style={{ maxWidth: 720, textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          REQUEST RECEIVED
        </p>
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          We&apos;ve got it{name ? `, ${name}` : ""}.
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            marginTop: 28,
            lineHeight: 1.6,
          }}
        >
          We will come back within 24 hours with a plan, a timeline, and a
          number. If you would rather talk now, WhatsApp us at +91 99687
          16498.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: 40,
          }}
        >
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 28,
              paddingBlock: 16,
              background: "#25D366",
              color: "#0F2A1B",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Start a conversation ↗
          </a>
          <a
            href="/"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              paddingInline: 24,
              paddingBlock: 14,
              borderRadius: 9999,
              border: "1px solid var(--border-2)",
              color: "var(--text)",
              fontSize: 14,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Back to the gallery
          </a>
        </div>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  paddingInline: 18,
  paddingBlock: 14,
  background: "var(--surface-1)",
  border: "1px solid var(--border-2)",
  borderRadius: 10,
  color: "var(--text)",
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: 16,
  outline: "none",
  transition: "border-color 0.2s var(--ease-spring)",
};
