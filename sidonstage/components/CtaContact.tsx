"use client";

import { useState } from "react";
import MagneticButton from "./MagneticButton";
import RevealOnScroll from "./RevealOnScroll";
import { LINKS, W3F_KEY } from "@/lib/links";
import { useReducedMotion } from "@/lib/useReducedMotion";

const BASE = "/sidonstage";

export default function CtaContact() {
  const reduced = useReducedMotion();
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden py-32 md:py-40"
      style={{ background: "var(--stage-black)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BASE}/assets/atmos/spotlight-cone.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          mixBlendMode: "screen",
          opacity: 0.55,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BASE}/assets/atmos/haze-2.webp)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "screen",
          opacity: 0.4,
          animation: reduced ? "none" : "drift 26s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 gradient-fade-bottom pointer-events-none"
      />

      <div className="relative z-[3] mx-auto max-w-[1100px] px-6 lg:px-10 text-center">
        <RevealOnScroll>
          <h2 className="font-display text-[44px] md:text-[80px] leading-[0.95] uppercase text-white">
            <span className="text-shimmer">Ready to make your event unforgettable?</span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.06}>
          <p className="mt-8 text-[18px] md:text-[20px] text-[color:var(--mist)] max-w-[640px] mx-auto">
            Tell Siddhant about your event and get a fast reply.
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagneticButton
              href={LINKS.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              ariaLabel="Message Siddhant on WhatsApp"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-[var(--radius-pill)] bg-[color:var(--azure)] text-white font-medium shadow-azure-glow hover:bg-[color:var(--azure-bright)] transition-colors"
            >
              <WhatsAppIcon />
              <span>Message on WhatsApp</span>
            </MagneticButton>

            <div className="flex items-center gap-3">
              <SocialButton href={LINKS.instagram} label="Instagram">
                <InstagramIcon />
              </SocialButton>
              <SocialButton href={LINKS.youtube} label="YouTube">
                <YouTubeIcon />
              </SocialButton>
            </div>
          </div>
        </RevealOnScroll>

        {W3F_KEY ? <ContactForm /> : null}
      </div>
    </section>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-[color:var(--navy-line)] text-white hover:border-[color:var(--azure-bright)] hover:text-[color:var(--azure-bright)] transition-colors"
    >
      {children}
    </a>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!W3F_KEY) return;
    setStatus("sending");
    const data = new FormData(e.currentTarget);
    data.append("access_key", W3F_KEY);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      setStatus(json.success ? "ok" : "err");
      if (json.success) e.currentTarget.reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-14 mx-auto max-w-[640px] text-left rounded-[var(--radius-card)] border border-[color:var(--navy-line)] bg-[color:var(--navy)] p-7 md:p-10"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Name" name="name" type="text" required />
        <Field label="Email" name="email" type="email" required />
      </div>
      <Field label="Event type" name="event_type" type="text" placeholder="Annual conference, product launch, gala night..." />
      <div className="mt-4">
        <label className="block text-[12px] uppercase tracking-[0.18em] text-[color:var(--mist-dim)] mb-2 font-kicker">
          Message
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full rounded-xl bg-[color:var(--stage-black)] border border-[color:var(--navy-line)] px-4 py-3 text-white focus:border-[color:var(--azure-bright)] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex items-center justify-center px-7 py-3 rounded-[var(--radius-pill)] bg-[color:var(--azure)] text-white font-medium shadow-azure-glow hover:bg-[color:var(--azure-bright)] transition-colors disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send to Siddhant"}
      </button>
      {status === "ok" && (
        <p className="mt-4 text-[14px] text-[color:var(--azure-bright)]">Sent. Siddhant will reply soon.</p>
      )}
      {status === "err" && (
        <p className="mt-4 text-[14px] text-[color:var(--mist)]">Could not send. Please WhatsApp instead.</p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  type,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-[0.18em] text-[color:var(--mist-dim)] mb-2 font-kicker">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[color:var(--stage-black)] border border-[color:var(--navy-line)] px-4 py-3 text-white focus:border-[color:var(--azure-bright)] focus:outline-none"
      />
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 0 0 3.6 18l-1.5 5.4L7.7 22a11 11 0 0 0 12.8-18.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3 .8.8-3-.2-.3A9 9 0 1 1 12 20.5zm5.2-6.7c-.3-.2-1.7-.8-2-.9s-.5-.2-.7.2c-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-3.7-3.2c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2 3.1 5 4.4c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor" />
    </svg>
  );
}
