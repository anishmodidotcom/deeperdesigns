"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const PARAGRAPH =
  "We don't sell templates. We don't resell software. We sit with a business, find what's leaking time, what's frustrating customers, what's been broken for years, and we design a focused system around that. Sometimes it's a tool. Sometimes a workflow. Sometimes an interface that didn't exist yet.";

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
          03 · THE THINKING BEHIND THE WORK
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
      </div>
    </section>
  );
}
