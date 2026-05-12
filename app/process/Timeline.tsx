"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Step = {
  num: string;
  name: string;
  range: string;
  summary: string;
  bullets: string[];
  output: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    name: "Discovery",
    range: "1 to 3 days",
    summary:
      "Understand the business, identify the highest-leverage tool to build, agree the brief.",
    bullets: [
      "Two long calls with the founder, no deck.",
      "We walk the actual workflow that the tool replaces or augments.",
      "We map the pieces we will build, and the pieces we will deliberately leave manual.",
      "We write a one-page brief together and sign it.",
    ],
    output: "One-page build brief, fixed scope and fixed price.",
  },
  {
    num: "02",
    name: "Design",
    range: "3 to 5 days",
    summary:
      "Brand world, wireframes, copy strategy, image and motion direction.",
    bullets: [
      "Brand world: palette, type, illustration, photography, motion vocabulary.",
      "Wireframes for every screen, including empty and error states.",
      "Copy strategy: voice, register, sample paragraphs in tone.",
      "AI image and video direction shots so generation lands close on first run.",
    ],
    output: "Approved design system, content brief, sample renders.",
  },
  {
    num: "03",
    name: "Build",
    range: "10 to 20 days",
    summary:
      "AI-led custom development. Bespoke code. Real data. Real users in by day eighteen.",
    bullets: [
      "Built in Next.js, React, TypeScript. Hosted on Vercel by default.",
      "AI handles boilerplate, scaffolding, image generation, copy drafts.",
      "We handle architecture, data modelling, security, integrations, taste.",
      "Daily build updates on WhatsApp. Live staging URL from day three.",
    ],
    output: "Staging URL, integration tests passing, founder UAT signed off.",
  },
  {
    num: "04",
    name: "Ship and iterate",
    range: "Day one onward",
    summary:
      "Launch, monitor, refine. We stay close for thirty days, then hand off.",
    bullets: [
      "Production launch on a date you choose, not by surprise.",
      "Thirty days of post-launch support included.",
      "We instrument the tool so you can see what is actually being used.",
      "Clean handoff to your team or a long-term maintenance partner of your choosing.",
    ],
    output: "Live tool. Owned by you. Ready for the next thirty days of business.",
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const line = lineRef.current;
      if (!line) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        line.style.height = "100%";
        setActiveStep(STEPS.length - 1);
        return;
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 30%",
        end: "bottom 70%",
        scrub: 0.6,
        onUpdate: (self) => {
          line.style.height = `${self.progress * 100}%`;
          setActiveStep(
            Math.min(
              STEPS.length - 1,
              Math.floor(self.progress * STEPS.length)
            )
          );
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 96,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 64,
          }}
          className="proc-timeline"
        >
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 11,
              top: 24,
              bottom: 24,
              width: 1,
              background: "var(--border)",
              pointerEvents: "none",
            }}
          />
          <div
            ref={lineRef}
            aria-hidden
            style={{
              position: "absolute",
              left: 11,
              top: 24,
              width: 1,
              height: "0%",
              background: "var(--accent)",
              pointerEvents: "none",
              transition: "height 0.1s linear",
            }}
          />

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 96,
            }}
          >
            {STEPS.map((step, i) => {
              const isActive = i <= activeStep;
              return (
                <li
                  key={step.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 32,
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: isActive
                        ? "var(--accent)"
                        : "var(--surface-1)",
                      border: isActive
                        ? "2px solid var(--accent)"
                        : "2px solid var(--border-2)",
                      transition: "background 0.4s ease, border 0.4s ease",
                      marginTop: 6,
                      flexShrink: 0,
                      boxShadow: isActive ? "0 0 16px var(--accent)" : "none",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        flexWrap: "wrap",
                        gap: 16,
                        marginBottom: 16,
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          fontSize: 11,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: isActive
                            ? "var(--accent)"
                            : "var(--text-3)",
                          margin: 0,
                          transition: "color 0.4s ease",
                        }}
                      >
                        STEP {step.num} · {step.range}
                      </p>
                    </div>
                    <h2
                      style={{
                        fontFamily:
                          "var(--font-fraunces), Georgia, serif",
                        fontWeight: 500,
                        fontSize: "clamp(32px, 4.5vw, 56px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1.1,
                        color: "var(--text)",
                        margin: 0,
                        marginBottom: 20,
                      }}
                    >
                      {step.name}
                    </h2>
                    <p
                      style={{
                        fontSize: 18,
                        color: "var(--text-2)",
                        lineHeight: 1.7,
                        margin: 0,
                        marginBottom: 28,
                        maxWidth: 640,
                      }}
                    >
                      {step.summary}
                    </p>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        marginBottom: 32,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {step.bullets.map((b) => (
                        <li
                          key={b}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            fontSize: 15,
                            color: "var(--text-2)",
                            lineHeight: 1.65,
                            maxWidth: 640,
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              color: "var(--accent-2)",
                              fontFamily: "var(--font-geist-mono), monospace",
                              fontSize: 11,
                              paddingTop: 3,
                              flexShrink: 0,
                            }}
                          >
                            ✦
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div
                      style={{
                        paddingTop: 18,
                        borderTop: "1px dashed var(--border-2)",
                        maxWidth: 640,
                      }}
                    >
                      <p
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--text-3)",
                          margin: 0,
                          marginBottom: 6,
                        }}
                      >
                        DELIVERABLE
                      </p>
                      <p
                        style={{
                          fontFamily:
                            "var(--font-fraunces), Georgia, serif",
                          fontStyle: "italic",
                          fontSize: 17,
                          color: "var(--text)",
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {step.output}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
