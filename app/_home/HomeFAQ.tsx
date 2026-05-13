"use client";

import { useState } from "react";

const QA = [
  { q: "How much does this cost?", a: "Starts at ₹25,000 for a single small tool. Most projects sit between ₹1L and ₹10L. We share a number after a 20-minute call." },
  { q: "How long does it take?", a: "Depends on the build. Some small tools ship in days. Larger systems take a few weeks. Faster than traditional software either way." },
  { q: "Do you only work with Indian businesses?", a: "Mostly, yes. We are set up for Indian SMBs, but we also work with select clients in the UAE. Anywhere else, we say no unless it is a strong fit." },
  { q: "What if I do not know exactly what I need?", a: "That is the most common starting point. The first call is to figure out what to build, not to sell you a build." },
  { q: "Will I own the code and the brand?", a: "Yes. Everything we ship is yours. Code, design files, copy, brand assets. Hosted wherever you want." },
  { q: "What if I just want to talk?", a: "WhatsApp us at +91 99687 16498. No form required." },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <p className="eyebrow" style={{ marginBottom: "24px" }}>06 · QUESTIONS</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "64px" }}>
          The questions we hear most.
        </h2>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {QA.map((item, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", textAlign: "left" }}>
                <span style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                  <span className="mono" style={{ color: "var(--fg-dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: "19px", fontWeight: 500 }}>{item.q}</span>
                </span>
                <span style={{ fontSize: "20px", color: "var(--fg-muted)", transition: "transform 200ms", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
              </button>
              {open === i && (
                <p style={{ paddingLeft: "44px", paddingBottom: "24px", fontSize: "16px", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "700px" }}>{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
