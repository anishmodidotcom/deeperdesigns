"use client";

import { useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(
    () => TRANSCRIPT.map(() => false)
  );

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const bars = barRefs.current.filter(Boolean) as HTMLDivElement[];
      if (bars.length === 0) return;

      if (reduced) {
        gsap.set(bars, { xPercent: 110 });
        setRevealed(TRANSCRIPT.map(() => true));
        return;
      }

      gsap.set(bars, { xPercent: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.floor(self.progress * bars.length);
            setRevealed((prev) => {
              if (prev.every((v, i) => v === i < idx)) return prev;
              return TRANSCRIPT.map((_, i) => i < idx);
            });
          },
        },
      });

      bars.forEach((bar, i) => {
        tl.to(
          bar,
          {
            xPercent: 110,
            duration: 0.7,
            ease: "power2.inOut",
          },
          i * 0.6
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        borderTop: "1px solid var(--page-border)",
        display: "flex",
        alignItems: "center",
        paddingBlock: 96,
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1100, marginInline: "auto", width: "100%" }}
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
            marginBottom: 24,
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
            fontSize: "clamp(32px, 5vw, 52px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 16,
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
            fontSize: 15,
            color: "var(--page-text-2)",
            lineHeight: 1.7,
            margin: 0,
            marginBottom: 40,
            maxWidth: 560,
          }}
        >
          Below is an actual prospect intake from week one. Scroll to
          reveal, line by line.
        </motion.p>

        <div
          ref={cardRef}
          style={{
            maxWidth: 760,
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
              gap: 12,
            }}
          >
            {TRANSCRIPT.map((line, i) => (
              <TranscriptLine
                key={i}
                line={line}
                index={i}
                revealed={revealed[i]}
                barRef={(el) => {
                  barRefs.current[i] = el;
                }}
              />
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
            marginTop: 24,
          }}
        >
          This entire intake took 4 minutes. Karan never picked up.
        </p>
      </div>
    </section>
  );
}

function TranscriptLine({
  line,
  revealed,
  barRef,
}: {
  line: Line;
  index: number;
  revealed: boolean;
  barRef: (el: HTMLDivElement | null) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => revealed && setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBlock: 6,
        paddingInline: revealed && hover ? 10 : 0,
        marginInline: revealed && hover ? -10 : 0,
        background: revealed && hover ? "var(--page-surface-2)" : "transparent",
        borderRadius: 2,
        transition: "background 0.25s ease, padding 0.25s ease, margin 0.25s ease",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
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
        ref={barRef}
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
  );
}
