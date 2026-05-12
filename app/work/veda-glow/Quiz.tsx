"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const QUESTIONS: { q: string; opts: string[]; chosen: number }[] = [
  {
    q: "How does your skin feel by 4 PM?",
    opts: ["Tight and dry", "Oily on the T-zone", "Balanced", "Sensitive and red"],
    chosen: 1,
  },
  {
    q: "Where are you in your cycle of breakouts?",
    opts: ["Active breakout", "Healing", "Clear", "Hormonal flare-up"],
    chosen: 0,
  },
  {
    q: "How much time do you have for a routine?",
    opts: ["3 minutes", "10 minutes", "20+ minutes"],
    chosen: 1,
  },
  {
    q: "What does your dosha report say?",
    opts: ["Vata", "Pitta", "Kapha", "I do not know"],
    chosen: 3,
  },
];

export default function Quiz() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) {
        setActiveIdx(QUESTIONS.length - 1);
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            QUESTIONS.length - 1,
            Math.floor(self.progress * QUESTIONS.length)
          );
          setActiveIdx(idx);
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
        <Image
          src="/images/veda-glow/quiz-bg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, var(--page-bg) 0%, rgba(15,10,6,0.7) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 64,
          left: 0,
          right: 0,
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          THE ADVISOR · QUESTION {String(activeIdx + 1).padStart(2, "0")} / 04
        </p>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.18em",
            color: "var(--page-text-2)",
            margin: 0,
          }}
        >
          SCROLL · ANSWER FOUR QUESTIONS
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 24px 80px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "min(640px, 95vw)",
            aspectRatio: "5 / 4",
          }}
        >
          {QUESTIONS.map((question, i) => {
            const distance = i - activeIdx;
            const visible = i === activeIdx;
            return (
              <div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "var(--page-surface)",
                  border: "1px solid rgba(212,165,116,0.25)",
                  borderRadius: 8,
                  padding: 40,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible
                    ? "translateY(0) scale(1)"
                    : `translateY(${distance * 40}px) scale(${1 - Math.abs(distance) * 0.06})`,
                  transition:
                    "opacity 0.5s cubic-bezier(0.4, 0, 0.6, 1), transform 0.6s cubic-bezier(0.4, 0, 0.6, 1)",
                  pointerEvents: visible ? "auto" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 4vw, 44px)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.15,
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 36,
                  }}
                >
                  {question.q}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {question.opts.map((opt, j) => {
                    const chosen = j === question.chosen;
                    return (
                      <div
                        key={opt}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: 16,
                          border: chosen
                            ? "1.5px solid var(--page-accent)"
                            : "1px solid rgba(212,165,116,0.18)",
                          background: chosen
                            ? "rgba(212,165,116,0.08)"
                            : "transparent",
                          borderRadius: 6,
                        }}
                      >
                        <span
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: chosen
                              ? "4px solid var(--page-accent)"
                              : "1.5px solid rgba(212,165,116,0.4)",
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 15,
                            color: chosen
                              ? "var(--page-accent)"
                              : "var(--page-text)",
                            fontWeight: chosen ? 500 : 400,
                          }}
                        >
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
