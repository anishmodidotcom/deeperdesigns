"use client";

import { useState } from "react";

// v22 A5 (amended): straight answers, the objection FAQ. Replaces the old
// 12-question list so the homepage does not run two competing FAQ sections.
// Copy is final per the v22 spec and its amendment. The CTA pair under the
// FAQ is the HomeCTA section that renders directly below this one.
const QA = [
  {
    q: "What do I actually get?",
    a: "A working tool, built for your business, live and in use. Not a report, not a strategy deck, not a subscription you have to figure out yourself. You own it outright.",
  },
  {
    q: "Is this complicated to use?",
    a: "If you can use WhatsApp, you can use what we build. We build for owners and their staff, not for engineers.",
  },
  {
    q: "Is AI-built software safe and reliable?",
    a: "Nothing we ship runs on raw AI output. Every system has checks, and anything sensitive waits for a human yes before it acts. We trust these systems enough to run our own companies on them.",
  },
  {
    q: "Is AI not just hype right now?",
    a: "Whether AI stocks are a bubble is not your problem. The only question that matters is whether one specific tool will save you time or money this quarter. We only build things that pay for themselves, and if AI is not the answer for your business, we will tell you that on the call.",
  },
  {
    q: "Why should I trust a small studio?",
    a: "Because you talk directly to the people who build, not an account manager. And because our proof is public: Outpost, Oviya Studio, and Deeper Content are our own products, live, with real users. We eat what we cook.",
  },
  {
    q: "What does it cost?",
    a: "Small tools start at ₹25,000. Bigger systems cost more, and you get the exact number in writing before we start. Most builds pay for themselves within a few months, and we walk you through that math on the call.",
  },
  {
    q: "What if it does not work?",
    a: "Simple. If your first tool is not live and working within thirty days, you do not pay. We can offer that because we scope honestly before we start and we build fast.",
  },
  {
    q: "What happens on the call?",
    a: "Thirty minutes. You tell us how your business runs. We tell you what is worth building first, what it costs, and what it saves. You keep the plan either way. No pitch, no pressure, no follow-up spam.",
  },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "64px" }}>
          Straight answers{" "}
          <span
            style={{
              fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
            }}
          >
            to the questions everyone actually has.
          </span>
        </h2>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${i}`}
                  style={{ width: "100%", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", textAlign: "left" }}
                >
                  <span style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                    <span className="mono" style={{ color: "var(--fg-dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: "19px", fontWeight: 500 }}>{item.q}</span>
                  </span>
                  <span style={{ fontSize: "20px", color: "var(--fg-muted)", transition: "transform 200ms", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {isOpen && (
                  <p id={`faq-answer-${i}`} style={{ paddingLeft: "44px", paddingBottom: "24px", fontSize: "16px", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "700px" }}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
