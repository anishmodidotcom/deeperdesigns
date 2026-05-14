"use client";

import { useState } from "react";

const QA = [
  { q: "Honestly, what is this AI thing actually going to do for my business?", a: "Same thing the internet did 25 years ago. It removes repetitive work and gives you tools that used to need a team. The trick is knowing which repetitive work to remove first. That's what we figure out on the first call." },
  { q: "I have an existing team and existing software. Are you saying I should replace all that?", a: "Almost never. Most of what we build sits alongside what you already have. We connect to your existing tools, plug the gaps, automate the friction. Replacement is a last resort, not a starting point." },
  { q: "How much does this actually cost?", a: "Starts at ₹25,000 for a single small tool. Most projects sit between ₹1L and ₹10L. Operational redesigns go higher. We share a number after a 20-minute call. No proposals, no procurement theatre." },
  { q: "How long until I see it working?", a: "Small tools ship in days. Most projects ship in two to four weeks. Larger systems take longer but we show working pieces every week, not a big reveal at the end." },
  { q: "What if I tried something like this with a freelancer and it didn't work?", a: "Common story. Freelancers ship code, not systems. They build what you asked for, not what you needed. Our job is figuring out what you actually need, then making it work inside your business, not just on a screen." },
  { q: "How is this different from hiring a regular agency?", a: "Agencies sell hours. We sell working tools. We work in weeks, not quarters. We don't do retainers. Once it's shipped and your team can run it, our job is done." },
  { q: "I don't know exactly what I need. Where do I even start?", a: "That's the most common starting point. The first call isn't a sales pitch. It's us asking what's eating your time, what your team complains about, what feels stuck. We come back with one focused idea worth building." },
  { q: "Will my team need training?", a: "Yes, but less than you'd think. Most tools we build are usable in under an hour. We document everything and stay close for the first 30 days while your team gets comfortable." },
  { q: "What if my industry is very specific and you've never built for it?", a: "Better. Less assumption, more listening. We've built across furniture, food, fitness, legal, hospitality, retail, agriculture, education, and healthcare. The business shape matters more than the industry label." },
  { q: "Do I own the code, or am I locked in?", a: "You own everything. Code, brand assets, documentation, accounts. We don't host your stuff on our servers. You can fire us tomorrow and the system keeps running." },
  { q: "I have a small budget. Can we still talk?", a: "Yes. If a build doesn't fit your budget, we'll say so within a day. We'd rather point you somewhere honest than oversell something that won't work." },
  { q: "I just want to chat first. No commitment.", a: "WhatsApp us at +91 99687 16498. No form. No calendar invite. Just a conversation." },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "64px" }}>
          Questions you&apos;d ask if we sat across a table.
        </h2>
        <div style={{ borderTop: "1px solid var(--border)" }}>
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px", textAlign: "left" }}
                >
                  <span style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                    <span className="mono" style={{ color: "var(--fg-dim)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: "19px", fontWeight: 500 }}>{item.q}</span>
                  </span>
                  <span style={{ fontSize: "20px", color: "var(--fg-muted)", transition: "transform 200ms", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {isOpen && (
                  <p style={{ paddingLeft: "44px", paddingBottom: "24px", fontSize: "16px", color: "var(--fg-muted)", lineHeight: 1.6, maxWidth: "700px" }}>{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
