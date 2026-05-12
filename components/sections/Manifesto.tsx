"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const QUOTE =
  "A traditional agency promises and pitches. We prototype and show. Twenty working studies, each inspired by a real operational bottleneck of a real business archetype. Pick the one that sounds like you. We will customize it, ship it, and hand you the keys.";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const quoteEl = quoteRef.current;
      const sectionEl = sectionRef.current;
      if (!quoteEl || !sectionEl) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const wordEls = Array.from(
        quoteEl.querySelectorAll<HTMLElement>("[data-word]")
      );

      if (reduced) {
        gsap.set(wordEls, { opacity: 1 });
        return;
      }

      gsap.set(wordEls, { opacity: 0.15 });

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

  const words = QUOTE.split(/\s+/);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--surface-1)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        paddingBlock: 128,
      }}
    >
      <div
        className="container-x"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <p
          ref={quoteRef}
          style={{
            fontSize: "clamp(24px, 4vw, 44px)",
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: "-0.03em",
            color: "var(--text)",
            maxWidth: 800,
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
            fontSize: 16,
            color: "var(--accent)",
            marginTop: 32,
            fontFamily: "var(--font-geist-mono), monospace",
          }}
        >
          Systems that save time, lower hassle, and bring wow.
        </p>
      </div>
    </section>
  );
}
