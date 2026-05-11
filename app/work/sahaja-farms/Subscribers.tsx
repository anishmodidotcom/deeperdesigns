"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.4, 0, 0.2, 1] as const;

export default function Subscribers() {
  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);
  const flaggedRef = useRef<HTMLSpanElement>(null);
  const savedRef = useRef<HTMLSpanElement>(null);
  const rateRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: { ref: React.RefObject<HTMLSpanElement | null>; to: number; display: (v: number) => string }[] = [
        { ref: activeRef, to: 412, display: (v) => Math.round(v).toString() },
        { ref: flaggedRef, to: 23, display: (v) => Math.round(v).toString() },
        { ref: savedRef, to: 18, display: (v) => Math.round(v).toString() },
        { ref: rateRef, to: 78, display: (v) => `${Math.round(v)}%` },
      ];

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.to);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.to,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = s.display(obj.v);
          },
        });
      });
    },
    { scope: sectionRef }
  );

  const numberStyle: React.CSSProperties = {
    fontFamily: "var(--font-bricolage), Georgia, serif",
    fontWeight: 600,
    fontSize: "clamp(36px, 4.8vw, 56px)",
    letterSpacing: "-0.035em",
    color: "var(--page-text)",
    lineHeight: 1,
    margin: 0,
    fontVariationSettings: "'opsz' 96",
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "var(--page-text-3)",
    margin: 0,
    marginTop: 10,
    lineHeight: 1.5,
  };

  return (
    <section ref={sectionRef} style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="sf-subs-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.02, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 8,
              border: "1px solid var(--page-border)",
            }}
          >
            <Image
              src="/images/sahaja-farms/subscription-box.webp"
              alt="A wooden subscription box of organic produce on a kitchen counter"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              THE 400 FAMILIES
            </p>
            <h2
              style={{
                fontFamily:
                  "var(--font-bricolage), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(32px, 4.6vw, 52px)",
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                fontVariationSettings: "'opsz' 96",
              }}
            >
              She knows which subscribers are about to cancel before they
              do.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.75,
                margin: 0,
                marginBottom: 40,
                maxWidth: 520,
              }}
            >
              Each box delivered gets logged. Each unopened email noticed.
              Each delayed renewal flagged. The dashboard scores
              subscribers on engagement and flags the 5 to 8 percent who
              go quiet before they cancel. Lata calls them herself. Most
              stay.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 28,
                maxWidth: 460,
              }}
            >
              <div>
                <p style={numberStyle}>
                  <span ref={activeRef}>0</span>
                </p>
                <p style={labelStyle}>Active subscribers</p>
              </div>
              <div>
                <p
                  style={{
                    ...numberStyle,
                    color: "var(--page-accent-3)",
                  }}
                >
                  <span ref={flaggedRef}>0</span>
                </p>
                <p style={labelStyle}>Flagged this week</p>
              </div>
              <div>
                <p
                  style={{
                    ...numberStyle,
                    color: "var(--page-accent-2)",
                  }}
                >
                  <span ref={savedRef}>0</span>
                </p>
                <p style={labelStyle}>Saved by personal call</p>
              </div>
              <div>
                <p
                  style={{
                    ...numberStyle,
                    color: "var(--page-accent)",
                  }}
                >
                  <span ref={rateRef}>0%</span>
                </p>
                <p style={labelStyle}>Save rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sf-subs-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .sf-subs-grid {
            grid-template-columns: 40fr 60fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
