"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Stat = {
  ref: React.RefObject<HTMLSpanElement | null>;
  target: number;
  label: string;
  display: (v: number) => string;
};

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLSpanElement>(null);
  const minRef = useRef<HTMLSpanElement>(null);
  const peopleRef = useRef<HTMLSpanElement>(null);

  const stats: Stat[] = [
    {
      ref: rowsRef,
      target: 600,
      label: "Rows in the inventory Excel sheet",
      display: (v) => `${Math.round(v)}+`,
    },
    {
      ref: minRef,
      target: 30,
      label: "Average time to respond to a price inquiry",
      display: (v) => `${Math.round(v)} min`,
    },
    {
      ref: peopleRef,
      target: 8,
      label: "People running the entire operation",
      display: (v) => `${Math.round(v)}`,
    },
  ];

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

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
          duration: 1.6,
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

  return (
    <section ref={sectionRef} style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <div className="bs-story-grid">
          <div>
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              THE BUSINESS
            </p>
            <p
              style={{
                fontFamily:
                  "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: 28,
                fontWeight: 300,
                color: "var(--page-text)",
                lineHeight: 1.4,
                margin: 0,
                letterSpacing: "-0.01em",
              }}
            >
              A buyer asks for 12mm TMT, Fe500D, twenty tonnes. Rahul
              calls the office. Someone checks the Excel. Calls back.
              Fifteen to thirty minutes, every time.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-space-grotesk), system-ui, sans-serif",
                    fontWeight: 700,
                    fontSize: 48,
                    color: "var(--page-accent)",
                    margin: 0,
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  <span ref={s.ref}>{s.display(0)}</span>
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--page-text-2)",
                    margin: 0,
                    marginTop: 12,
                  }}
                >
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .bs-story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 900px) {
          .bs-story-grid {
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
