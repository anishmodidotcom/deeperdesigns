"use client";

import { motion } from "motion/react";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ||
  "https://formspree.io/f/your-form-id";

const BUDGETS = [
  "Under Rs. 3L / $4K",
  "Rs. 3L to 8L / $4K to $10K",
  "Rs. 8L to 20L / $10K to $25K",
  "Rs. 20L+ / $25K+",
  "Not sure yet",
];

type Status = "idle" | "sending" | "ok" | "error";

export default function ContactCTA() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        setMessage("Thanks. Anish will reply within 24 hours.");
        form.reset();
      } else {
        const j = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(
          (j && j.error) ||
            "Could not send. Email modianish11@gmail.com instead."
        );
      }
    } catch {
      setStatus("error");
      setMessage(
        "Could not reach the server. Email modianish11@gmail.com instead."
      );
    }
  }

  return (
    <section className="section" id="contact">
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 64,
        }}
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              fontSize: "clamp(28px, 4.5vw, 56px)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              color: "var(--text)",
              lineHeight: 1.1,
              margin: 0,
              maxWidth: 720,
            }}
          >
            Got a business? Got a problem?
            <br />
            We have probably already thought of a solution.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            style={{
              fontSize: 17,
              color: "var(--text-2)",
              lineHeight: 1.7,
              margin: 0,
              marginTop: 28,
              maxWidth: 540,
            }}
          >
            Tell us about the business and the problem. We will send back
            a shape, a timeline, and a number within 24 hours. If it is
            not a fit, we will say so.
          </motion.p>

          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <a
              href="https://wa.me/919968716498?text=Hey%2C%20I%27m%20interested%20in%20working%20with%20Deeper%20Designs"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                paddingInline: 24,
                paddingBlock: 12,
                background: "transparent",
                color: "var(--text-2)",
                border: "1px solid var(--border-2)",
                borderRadius: 9999,
                fontSize: 14,
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              }}
            >
              Prefer WhatsApp? +91 99687 16498 →
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          onSubmit={onSubmit}
          style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border-2)",
            borderRadius: 12,
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 720,
            width: "100%",
          }}
        >
          <input type="hidden" name="_subject" value="Deeper Designs · New brief" />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="cta-row">
            <Field label="YOUR NAME">
              <input
                required
                type="text"
                name="name"
                disabled={status === "sending"}
                style={inputStyle}
              />
            </Field>
            <Field label="EMAIL">
              <input
                required
                type="email"
                name="email"
                disabled={status === "sending"}
                style={inputStyle}
              />
            </Field>
          </div>

          <Field label="BUSINESS NAME">
            <input
              required
              type="text"
              name="business"
              disabled={status === "sending"}
              style={inputStyle}
            />
          </Field>

          <Field label="WHAT DO YOU WANT TO BUILD?">
            <textarea
              required
              name="brief"
              rows={4}
              disabled={status === "sending"}
              style={{ ...inputStyle, resize: "vertical" as const, minHeight: 96 }}
            />
          </Field>

          <Field label="BUDGET RANGE">
            <select
              required
              name="budget"
              disabled={status === "sending"}
              defaultValue=""
              style={inputStyle}
            >
              <option value="" disabled>
                Pick one
              </option>
              {BUDGETS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <button
            type="submit"
            disabled={status === "sending"}
            data-cursor="pointer"
            style={{
              marginTop: 8,
              paddingBlock: 16,
              paddingInline: 28,
              background: status === "sending" ? "var(--text-3)" : "var(--accent)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 9999,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.04em",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition: "background 0.2s ease",
            }}
          >
            {status === "sending" ? "Sending..." : "Send the brief →"}
          </button>

          {status === "ok" && (
            <p
              role="status"
              style={{
                fontSize: 14,
                color: "var(--accent-2)",
                margin: 0,
                marginTop: 4,
              }}
            >
              {message}
            </p>
          )}
          {status === "error" && (
            <p
              role="status"
              style={{
                fontSize: 14,
                color: "#D87575",
                margin: 0,
                marginTop: 4,
              }}
            >
              {message}
            </p>
          )}
        </motion.form>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.section .container-x) {
            grid-template-columns: 45fr 55fr !important;
            gap: 96px !important;
            align-items: start !important;
          }
        }
        @media (max-width: 600px) {
          :global(.cta-row) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  paddingInline: 14,
  paddingBlock: 12,
  background: "var(--bg)",
  border: "1px solid var(--border-2)",
  borderRadius: 6,
  color: "var(--text)",
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: 14,
  outline: "none",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--text-3)",
          fontWeight: 500,
        }}
      >
        {label}
      </span>
      {children}
    </label>
  );
}
