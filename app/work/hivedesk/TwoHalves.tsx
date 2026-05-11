"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TOFU = [
  "Landing page A/B testing",
  "Tour booking flow",
  "WhatsApp lead capture",
  "UTM and source attribution",
  "First-30-day onboarding sequence",
];

const RETENTION = [
  "Member health score (engagement, bookings, attendance)",
  "Auto-flagged at-risk accounts",
  "Workshop and community event tracking",
  "Renewal nudges before expiry",
  "Exit interview automation",
];

type Half = {
  kicker: string;
  heading: string;
  imageSrc: string;
  imageAlt: string;
  items: string[];
  callout: string;
  borderSide: "top" | "bottom";
};

const HALVES: Half[] = [
  {
    kicker: "TOFU MACHINE",
    heading: "Top of funnel",
    imageSrc: "/images/hivedesk/member-portrait-1.webp",
    imageAlt: "Member working on a laptop in soft window light",
    items: TOFU,
    callout: "Tracks every lead from impression to invoice.",
    borderSide: "top",
  },
  {
    kicker: "RETENTION ENGINE",
    heading: "Retention",
    imageSrc: "/images/hivedesk/member-portrait-2.webp",
    imageAlt: "Member on a video call inside a glass phone booth",
    items: RETENTION,
    callout: "Knows who is about to leave 30 days before they say so.",
    borderSide: "bottom",
  },
];

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="var(--page-accent)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ flexShrink: 0, marginTop: 2 }}
    >
      <polyline points="3 8 7 12 13 4" />
    </svg>
  );
}

export default function TwoHalves() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div
        className="container-x"
        style={{ maxWidth: 1200, marginInline: "auto" }}
      >
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
            maxWidth: 820,
          }}
        >
          Two problems pretending to be one.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.06, ease: EASE }}
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            maxWidth: 640,
            lineHeight: 1.6,
            margin: 0,
            marginTop: 20,
          }}
        >
          Filling the pipeline and keeping people past month four require
          completely different machinery. We built both, separated cleanly.
        </motion.p>

        <div className="hd-halves" style={{ marginTop: 64 }}>
          {HALVES.map((half, i) => (
            <motion.article
              key={half.heading}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.4,
                delay: i * 0.08,
                ease: EASE,
              }}
              style={{
                background: "var(--page-surface-1)",
                border: "1px solid var(--page-border)",
                borderTop:
                  half.borderSide === "top"
                    ? "2px solid var(--page-accent)"
                    : "1px solid var(--page-border)",
                borderBottom:
                  half.borderSide === "bottom"
                    ? "2px solid var(--page-accent)"
                    : "1px solid var(--page-border)",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={half.imageSrc}
                  alt={half.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              <div
                style={{
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--page-accent)",
                    margin: 0,
                  }}
                >
                  {half.kicker}
                </p>

                <h3
                  style={{
                    fontFamily:
                      "var(--font-inter), system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 32,
                    letterSpacing: "-0.03em",
                    color: "var(--page-text)",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {half.heading}
                </h3>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {half.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 13,
                        color: "var(--page-text)",
                        lineHeight: 1.5,
                      }}
                    >
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p
                  style={{
                    fontFamily:
                      "var(--font-inter), system-ui, sans-serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 14,
                    color: "var(--page-text-2)",
                    margin: 0,
                    paddingTop: 16,
                    borderTop: "1px solid var(--page-border)",
                  }}
                >
                  {half.callout}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hd-halves {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .hd-halves {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
