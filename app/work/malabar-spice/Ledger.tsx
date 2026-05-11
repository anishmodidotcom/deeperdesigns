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

const EASE = [0.25, 1, 0.5, 1] as const;

type Stat = {
  ref: React.RefObject<HTMLSpanElement | null>;
  target: number;
  duration: number;
  display: (v: number) => string;
  label: string;
};

export default function Ledger() {
  const sectionRef = useRef<HTMLElement>(null);
  const entriesRef = useRef<HTMLSpanElement>(null);
  const yearsRef = useRef<HTMLSpanElement>(null);
  const gensRef = useRef<HTMLSpanElement>(null);
  const familyRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const stats: Stat[] = [
        {
          ref: entriesRef,
          target: 12847,
          duration: 3.0,
          display: (v) =>
            Math.round(v).toLocaleString("en-IN"),
          label: "entries",
        },
        {
          ref: yearsRef,
          target: 64,
          duration: 1.8,
          display: (v) => `${Math.round(v)}`,
          label: "years",
        },
        {
          ref: gensRef,
          target: 3,
          duration: 1.4,
          display: (v) => `${Math.round(v)}`,
          label: "generations",
        },
        {
          ref: familyRef,
          target: 1,
          duration: 1.2,
          display: (v) => `${Math.round(v)}`,
          label: "family",
        },
      ];

      stats.forEach((s) => {
        const el = s.ref.current;
        if (!el) return;
        if (reduced) {
          el.textContent = s.display(s.target);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.target,
          duration: s.duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
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
    fontFamily: "var(--font-fraunces), Georgia, serif",
    fontWeight: 400,
    fontSize: "clamp(28px, 3.8vw, 44px)",
    letterSpacing: "-0.02em",
    color: "var(--page-text)",
    lineHeight: 1,
    fontVariationSettings: "'opsz' 144",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "var(--page-text-3)",
    marginTop: 10,
  };

  return (
    <section ref={sectionRef} style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="ms-ledger-grid">
          <motion.div
            initial={{ opacity: 0, rotate: -1, y: 24 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: EASE }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "4 / 5",
              overflow: "hidden",
              borderRadius: 4,
              boxShadow:
                "0 40px 80px -40px rgba(232,155,45,0.25), 0 0 0 1px rgba(232,155,45,0.06)",
              transformOrigin: "center",
            }}
          >
            <Image
              src="/images/malabar-spice/ledger-detail.webp"
              alt="An open antique handwritten ledger with Malayalam and English spice trade entries"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              style={{ objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              1962 → 2026
            </p>
            <h2
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(34px, 5vw, 52px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                fontVariationSettings: "'opsz' 144",
              }}
            >
              We kept the ledger. We just gave it a URL.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                margin: 0,
                lineHeight: 1.8,
                maxWidth: 540,
              }}
            >
              Every shipment since 1962 has been recorded by hand. We scanned
              sixty-four years of ledger pages and built a private archive
              that Rashid&rsquo;s grandchildren can browse. The original
              ledgers still live in the office. The digital version lives
              forever.
            </p>

            <div
              style={{
                marginTop: 48,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                maxWidth: 460,
              }}
            >
              <div>
                <div style={numberStyle}>
                  <span ref={entriesRef}>0</span>
                </div>
                <div style={labelStyle}>Entries</div>
              </div>
              <div>
                <div style={numberStyle}>
                  <span ref={yearsRef}>0</span>
                </div>
                <div style={labelStyle}>Years of records</div>
              </div>
              <div>
                <div style={numberStyle}>
                  <span ref={gensRef}>0</span>
                </div>
                <div style={labelStyle}>Generations of handwriting</div>
              </div>
              <div>
                <div style={numberStyle}>
                  <span ref={familyRef}>0</span>
                </div>
                <div style={labelStyle}>Family</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ms-ledger-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .ms-ledger-grid {
            grid-template-columns: 60fr 40fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
