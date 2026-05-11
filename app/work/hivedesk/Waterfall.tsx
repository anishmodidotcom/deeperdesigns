"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.16, 1, 0.3, 1] as const;

type Bar = {
  label: string;
  retained: number;
};

const BARS: Bar[] = [
  { label: "Jan", retained: 100 },
  { label: "Feb", retained: 82 },
  { label: "Mar", retained: 64 },
  { label: "Apr", retained: 48 },
  { label: "May", retained: 38 },
];

const EXIT_REASONS = [
  { label: "Commute", pct: 22 },
  { label: "Found office", pct: 18 },
  { label: "Price", pct: 31 },
  { label: "Unused", pct: 29 },
];

const TOTAL_HEIGHT = 100;

export default function Waterfall() {
  const sectionRef = useRef<HTMLElement>(null);
  const fillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const fills = fillRefs.current;
      const values = valueRefs.current;
      if (fills.some((f) => !f) || values.some((v) => !v)) return;

      if (reduced) {
        BARS.forEach((b, i) => {
          const el = fills[i];
          const val = values[i];
          if (el) el.style.height = `${b.retained}%`;
          if (val) val.textContent = `${b.retained}`;
        });
        return;
      }

      BARS.forEach((b, i) => {
        const el = fills[i];
        const val = values[i];
        if (!el || !val) return;
        const obj = { h: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        });

        tl.to(
          obj,
          {
            h: TOTAL_HEIGHT,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: () => {
              el.style.height = `${obj.h}%`;
              val.textContent = `${Math.round(obj.h)}`;
            },
          },
          0
        );

        if (b.retained !== TOTAL_HEIGHT) {
          tl.to(
            obj,
            {
              h: b.retained,
              duration: 0.55,
              ease: "power2.inOut",
              onUpdate: () => {
                el.style.height = `${obj.h}%`;
                val.textContent = `${Math.round(obj.h)}`;
              },
            },
            0.6 + i * 0.15
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{ paddingBlock: 144 }}
    >
      <div
        className="container-x"
        style={{
          maxWidth: 920,
          marginInline: "auto",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          WHAT 4-MONTH CHURN ACTUALLY LOOKS LIKE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: EASE }}
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          100 members in January. 38 in May.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            lineHeight: 1.65,
            margin: 0,
            maxWidth: 680,
            marginInline: "auto",
          }}
        >
          The cohort visualization Amit had never seen. Below is
          January&rsquo;s intake, watched across five months. Bars shrink as
          the month progresses. We built this view first because seeing the
          leak is half the fix.
        </motion.p>

        <div
          className="hd-waterfall"
          style={{
            marginTop: 72,
            background: "var(--page-surface-1)",
            border: "1px solid var(--page-border)",
            borderRadius: 12,
            padding: 32,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${BARS.length}, 1fr)`,
              gap: 24,
              alignItems: "end",
              height: 320,
            }}
          >
            {BARS.map((b, i) => {
              const isHover = hovered === i;
              return (
                <div
                  key={b.label}
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                  data-cursor="pointer"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {isHover && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.15, ease: EASE }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "calc(100% + 12px)",
                        transform: "translateX(-50%)",
                        background: "var(--page-surface-2)",
                        border: "1px solid var(--page-border-2)",
                        borderRadius: 8,
                        padding: 12,
                        minWidth: 180,
                        textAlign: "left",
                        boxShadow:
                          "0 24px 60px -28px rgba(0,0,0,0.5)",
                        zIndex: 5,
                      }}
                    >
                      <p
                        style={{
                          fontFamily:
                            "var(--font-geist-mono), monospace",
                          fontSize: 10,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          color: "var(--page-text-3)",
                          margin: 0,
                          marginBottom: 8,
                        }}
                      >
                        Exit reasons
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        {EXIT_REASONS.map((r) => (
                          <li
                            key={r.label}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 12,
                              fontFamily:
                                "var(--font-geist-mono), monospace",
                              fontSize: 11,
                              color: "var(--page-text-2)",
                            }}
                          >
                            <span>{r.label}</span>
                            <span style={{ color: "var(--page-text)" }}>
                              {r.pct}%
                            </span>
                          </li>
                        ))}
                      </ul>
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: "50%",
                          bottom: -5,
                          transform:
                            "translateX(-50%) rotate(45deg)",
                          width: 8,
                          height: 8,
                          background: "var(--page-surface-2)",
                          borderRight:
                            "1px solid var(--page-border-2)",
                          borderBottom:
                            "1px solid var(--page-border-2)",
                        }}
                      />
                    </motion.div>
                  )}

                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      background: "var(--page-surface-2)",
                      borderRadius: 6,
                      overflow: "hidden",
                      border: isHover
                        ? "1px solid var(--page-accent)"
                        : "1px solid var(--page-border)",
                      transition:
                        "border-color 0.15s var(--ease-spring)",
                    }}
                  >
                    <div
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "0%",
                        background:
                          "linear-gradient(180deg, var(--page-accent-2) 0%, var(--page-accent) 100%)",
                        borderRadius: "0 0 5px 5px",
                      }}
                    />
                  </div>

                  <div style={{ marginTop: 14, textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-inter), system-ui, sans-serif",
                        fontWeight: 600,
                        fontSize: 22,
                        letterSpacing: "-0.03em",
                        color: "var(--page-text)",
                        lineHeight: 1,
                      }}
                    >
                      <span
                        ref={(el) => {
                          valueRefs.current[i] = el;
                        }}
                      >
                        0
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        color: "var(--page-text-3)",
                        marginTop: 6,
                      }}
                    >
                      {b.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p
          style={{
            fontStyle: "italic",
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontSize: 15,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 32,
          }}
        >
          Once Amit could see it, the conversation with members changed.
        </p>
      </div>
    </section>
  );
}
