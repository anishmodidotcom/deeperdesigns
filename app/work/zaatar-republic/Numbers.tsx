"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Card = {
  number: string;
  numberColor?: string;
  description: string;
  sub: string;
  tint?: string;
};

const CARDS: Card[] = [
  {
    number: "800-1,000",
    description: "Daily orders across all branches",
    sub: "Dine-in, takeaway, Talabat, Deliveroo, own drivers",
    tint: "rgba(232,93,42,0.06)",
  },
  {
    number: "35 AED",
    description: "Average ticket size",
    sub: "Room to grow with better upselling and combo optimization",
  },
  {
    number: "15-20%",
    numberColor: "#EF4444",
    description: "Perishable waste on bad days",
    sub: "Over-ordering chicken, bread, vegetables based on gut feel",
  },
  {
    number: "Unknown",
    numberColor: "var(--page-accent)",
    description: "Actual margin per dish",
    sub: "Best-seller might be the worst earner. No data to prove it.",
  },
];

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - section.clientWidth);

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div
        className="container-x"
        style={{
          marginBottom: 48,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          THE BUSINESS
        </p>
      </div>

      <div className="zr-numbers-wrap">
        <div ref={trackRef} className="zr-track">
          {CARDS.map((c) => (
            <article
              key={c.description}
              className="zr-card"
              style={{
                background: c.tint
                  ? `linear-gradient(160deg, ${c.tint}, var(--page-surface))`
                  : "var(--page-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 48,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: c.numberColor ?? "var(--page-text)",
                  margin: 0,
                }}
              >
                {c.number}
              </p>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--page-text-2)",
                  marginTop: 24,
                  marginBottom: 0,
                  lineHeight: 1.4,
                }}
              >
                {c.description}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--page-text-2)",
                  opacity: 0.7,
                  marginTop: 8,
                  marginBottom: 0,
                  lineHeight: 1.5,
                }}
              >
                {c.sub}
              </p>
            </article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .zr-numbers-wrap {
          width: 100%;
        }
        .zr-track {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-inline: 24px;
        }
        .zr-card {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
          aspect-ratio: auto;
          background: var(--page-surface);
          border-radius: 12px;
          padding: 32px;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .zr-track {
            padding-inline: 48px;
          }
        }
        @media (min-width: 900px) {
          .zr-track {
            flex-direction: row;
            gap: 24px;
            padding-inline: 80px;
            will-change: transform;
          }
          .zr-card {
            width: 400px;
            max-width: none;
            aspect-ratio: 4 / 5;
            padding: 40px;
            margin: 0;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
          }
        }
      `}</style>
    </section>
  );
}
