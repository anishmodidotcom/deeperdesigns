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

type Outcome = {
  number: string;
  label: string;
};

const OUTCOMES: Outcome[] = [
  { number: "45min → 0min", label: "Partner time per unqualified prospect" },
  { number: "+40%", label: "Increase in custom matter fees over 90 days" },
  { number: "12hr → 4hr", label: "Average weekly hours on template work" },
  { number: "23 → 5", label: "Calls per week" },
];

export default function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const rows = sectionRef.current?.querySelectorAll(
        "[data-outcome-row]"
      );
      if (!rows) return;

      gsap.fromTo(
        Array.from(rows),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          stagger: 0.18,
          ease: "linear",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
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
            marginBottom: 56,
          }}
        >
          §05 · OUTCOMES
        </motion.p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {OUTCOMES.map((o) => (
            <li
              key={o.label}
              data-outcome-row
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                alignItems: "baseline",
                paddingBlock: 36,
                borderBottom: "1px solid var(--page-border)",
                gap: 12,
              }}
              className="kl-outcome-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontWeight: 500,
                  fontSize: "clamp(28px, 4vw, 44px)",
                  letterSpacing: "-0.01em",
                  color: "var(--page-text)",
                  lineHeight: 1,
                }}
              >
                {o.number}
              </span>
              <span
                style={{
                  fontFamily:
                    "var(--font-spectral), 'Source Serif 4', Georgia, serif",
                  fontWeight: 400,
                  fontSize: 18,
                  letterSpacing: "-0.005em",
                  color: "var(--page-text-2)",
                }}
              >
                {o.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @media (min-width: 720px) {
          .kl-outcome-row {
            grid-template-columns: 30% 70% !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
