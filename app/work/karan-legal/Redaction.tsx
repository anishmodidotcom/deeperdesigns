"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.7, 0, 0.3, 1] as const;

type Line = { speaker: "QUALIFIER" | "PROSPECT"; text: string };

const TRANSCRIPT: Line[] = [
  { speaker: "QUALIFIER", text: "Hello. What kind of legal help are you looking for?" },
  { speaker: "PROSPECT", text: "I need help drafting a SAFE for an angel." },
  { speaker: "QUALIFIER", text: "Got it. What is the SAFE size, and are you the founder or the investor?" },
  { speaker: "PROSPECT", text: "Founder. $50K SAFE. First angel." },
  { speaker: "QUALIFIER", text: "Standard YC SAFE or modified?" },
  { speaker: "PROSPECT", text: "Standard, post-money, valuation cap $5M." },
  { speaker: "QUALIFIER", text: "Perfect. This is template territory. Karan can have a clean draft to you in 24 hours for Rs. 15,000. Want me to schedule a 15-min call to confirm details and get it on his calendar?" },
  { speaker: "PROSPECT", text: "Yes please." },
  { speaker: "QUALIFIER", text: "Done. Karan will call Wednesday 4:00 PM. Confirmation sent to your email." },
];

export default function Redaction() {
  const sectionRef = useRef<HTMLElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const bars = barRefs.current.filter(Boolean) as HTMLDivElement[];
      if (bars.length === 0) return;

      if (reduced) {
        gsap.set(bars, { xPercent: 110 });
        return;
      }

      gsap.set(bars, { xPercent: 0 });
      gsap.to(bars, {
        xPercent: 110,
        stagger: 0.08,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 30%",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1100, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          §02 · THE INTERVENTION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-spectral), 'Source Serif 4', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(36px, 5.4vw, 60px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          What was underneath the noise.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          style={{
            fontSize: 16,
            color: "var(--page-text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 64,
            maxWidth: 560,
          }}
        >
          Below is an actual prospect intake from week one. Scroll to
          reveal.
        </motion.p>

        <div
          style={{
            maxWidth: 720,
            background: "var(--page-surface-1)",
            border: "1px solid var(--page-border)",
            padding: 32,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--page-border)",
              paddingBottom: 16,
              marginBottom: 24,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--page-text)",
              }}
            >
              PROSPECT INTAKE · 2025-05-04 · 19:47 IST
            </span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "var(--page-text-3)",
              }}
            >
              FILE NO. KL-0014
            </span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {TRANSCRIPT.map((line, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  paddingBlock: 4,
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--page-text)",
                    margin: 0,
                  }}
                >
                  <span
                    style={{
                      color:
                        line.speaker === "QUALIFIER"
                          ? "var(--page-oxblood)"
                          : "var(--page-text-3)",
                      letterSpacing: "0.06em",
                      marginRight: 12,
                    }}
                  >
                    {line.speaker}:
                  </span>
                  {line.text}
                </p>
                <div
                  ref={(el) => {
                    barRefs.current[i] = el;
                  }}
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "var(--page-text)",
                    transformOrigin: "left center",
                    willChange: "transform",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontStyle: "italic",
            fontSize: 12,
            letterSpacing: "0.04em",
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 28,
          }}
        >
          This entire intake took 4 minutes. Karan never picked up.
        </p>
      </div>
    </section>
  );
}
