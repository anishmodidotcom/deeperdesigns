"use client";

import { motion } from "motion/react";
import { renderSerif } from "@/components/industry/text";

const EASE = [0.16, 1, 0.3, 1] as const;

// v22 A2: name the confusion. A quiet editorial block directly under the
// hero.
//
// v35 part 2.1: the block no longer tells an owner that their confusion
// is normal. It answers the four objections an owner actually has, and
// names the thing being bought: the responsibility, handed to a
// specialist, the way the books go to a CA. Copy is final and verbatim.

const POINTS = [
  {
    icon: <IconShield />,
    lead: "Model-agnostic by design",
    body: "Every system can switch providers. No single vendor holds you.",
  },
  {
    icon: <IconDoor />,
    lead: "Exit paths built in",
    body: "You can leave with the system intact. We build for that from day one.",
  },
  {
    icon: <IconKey />,
    lead: "Your data in your control",
    body: "It stays where you can see it and take it. Never used to train anything, never sold.",
  },
  {
    icon: <IconDocument />,
    lead: "A written protocol for every block",
    body: "How it runs, what it must never do, and who decides. Handed over with the system.",
  },
];

export default function HomeConfusion() {
  return (
    <section id="confusion" style={{ padding: "var(--section-py) 0", scrollMarginTop: "80px" }}>
      <div className="container">
        {/* v30.2: the column used to be centred by narrowing the
            container itself, which pushed the heading in from the
            house measure. The container stays full width and the
            column is set on the block inside it, so the left edge
            sits at 128 at 1440 like every other section. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p
            className="mono"
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
              margin: "0 0 20px",
            }}
          >
            Why hand it to us
          </p>

          <h2
            style={{
              fontSize: "var(--fs-h2)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
              maxWidth: "880px",
            }}
          >
            {renderSerif(
              "You have a CA for the books and a lawyer for the contracts. {serif}AI needs the same.{/serif}",
            )}
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: 1.65,
              color: "var(--fg-muted)",
              margin: "0 0 clamp(40px, 5vw, 64px)",
              maxWidth: "760px",
              textWrap: "pretty",
            }}
          >
            Owners want AI in the business and are right to be careful. A model
            can get expensive or disappear. A tool can go out of date while a
            competitor who never depended on it keeps growing. Data can walk out
            through a third party. Nobody on the team can judge the technology.
            Every one of those is real, and every one is answered the way Indian
            business has always answered it: hand the responsibility to a
            specialist who carries it.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: "28px",
              paddingTop: "clamp(32px, 4vw, 48px)",
              borderTop: "1px solid var(--border)",
            }}
          >
            {POINTS.map((point) => (
              <div
                key={point.lead}
                style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}
              >
                <span
                  style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}
                >
                  {point.icon}
                </span>
                <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.55 }}>
                  <span style={{ fontWeight: 500 }}>{point.lead}</span>
                  <br />
                  <span style={{ color: "var(--fg-muted)" }}>{point.body}</span>
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* Line icons, uniform 1.5 stroke on a 24 grid, matching the set used in
   HomeHowItWorks and on the Preflight page so the site reads as one
   system. */

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        stroke: "currentColor",
        strokeWidth: 1.5,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        display: "block",
      }}
    >
      {children}
    </svg>
  );
}

function IconShield() {
  return (
    <Svg>
      <path d="M12 3l7.5 3v5.4c0 4.6-3.1 7.7-7.5 10.1C7.6 19.1 4.5 16 4.5 11.4V6z" />
      <path d="M8.8 11.8l2.3 2.4 4.1-4.6" />
    </Svg>
  );
}

function IconDoor() {
  return (
    <Svg>
      <path d="M3.5 21h17" />
      <path d="M6.5 21V4a1.5 1.5 0 011.5-1.5h8A1.5 1.5 0 0117.5 4v17" />
      <path d="M14 12h.01" />
    </Svg>
  );
}

function IconKey() {
  return (
    <Svg>
      <circle cx="7.5" cy="15.5" r="4" />
      <path d="M10.4 12.6L20 3" />
      <path d="M17 6l2.3 2.3M14.6 8.4l2.3 2.3" />
    </Svg>
  );
}

function IconDocument() {
  return (
    <Svg>
      <path d="M13.5 3H7A1.5 1.5 0 005.5 4.5v15A1.5 1.5 0 007 21h10a1.5 1.5 0 001.5-1.5V8z" />
      <path d="M13.5 3v5h5" />
      <path d="M9 12.5h6M9 16h4" />
    </Svg>
  );
}
