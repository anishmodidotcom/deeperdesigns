"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PARAGRAPH =
  "A traditional agency promises and pitches. We prototype and show. Twenty working studies, each inspired by a real operational bottleneck of a real business archetype. Pick the one that sounds like you. We will customize it, ship it, and hand you the keys.";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const paragraphEl = paragraphRef.current;
      const sectionEl = sectionRef.current;
      if (!paragraphEl || !sectionEl) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const wordEls = Array.from(
        paragraphEl.querySelectorAll<HTMLElement>("[data-word]")
      );

      if (reduced) {
        gsap.set(wordEls, { opacity: 1 });
        return;
      }

      gsap.set(wordEls, { opacity: 0.18 });

      gsap.to(wordEls, {
        opacity: 1,
        stagger: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 75%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef }
  );

  const words = PARAGRAPH.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      id="studio-mind"
      style={{
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: 144,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 48,
          maxWidth: 1080,
          marginInline: "auto",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
          }}
        >
          § THE STUDIO MIND
        </p>

        <h2
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.02,
            margin: 0,
            maxWidth: 900,
          }}
        >
          We prototype. We do not pitch.
        </h2>

        <p
          ref={paragraphRef}
          style={{
            fontSize: "clamp(20px, 2.4vw, 28px)",
            fontWeight: 300,
            lineHeight: 1.45,
            letterSpacing: "-0.015em",
            color: "var(--text)",
            maxWidth: 880,
            margin: 0,
          }}
        >
          {words.map((word, i) => (
            <span
              key={`${word}-${i}`}
              data-word
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>

        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 14,
            color: "var(--accent)",
            margin: 0,
            letterSpacing: "0.02em",
          }}
        >
          Operational relief, designed carefully, shipped efficiently.
        </p>

        <figure
          style={{
            margin: 0,
            paddingTop: 32,
            borderTop: "1px solid var(--border)",
            maxWidth: 820,
          }}
        >
          <blockquote
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(22px, 3vw, 34px)",
              lineHeight: 1.35,
              color: "var(--text)",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;I am not interested in building the next Salesforce. I am
            interested in building the next thing the chai vendor at the
            corner wishes existed.&rdquo;
          </blockquote>
          <figcaption
            style={{
              marginTop: 18,
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-3)",
            }}
          >
            Anish Modi, Founder
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
