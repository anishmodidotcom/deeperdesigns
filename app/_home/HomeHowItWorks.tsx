"use client";

import { motion } from "motion/react";
import { renderSerif } from "@/components/industry/text";

const EASE = [0.16, 1, 0.3, 1] as const;

// v30 part 3: the how-it-works slot becomes the method section. Same
// position on the page, new content. The three generic steps are
// replaced by the thing that actually distinguishes the work: every
// project starts by agreeing the number it is supposed to move.
//
// Copy is final and verbatim.

const FLOW = [
  { label: "Your objective", example: "Get paid faster" },
  {
    label: "The bottleneck",
    example: "Invoices chased by memory, seventy-plus days out",
  },
  {
    label: "The intervention",
    example: "Collections system with reminders and payment links",
  },
  { label: "The number we measure", example: "Collection days, tracked weekly" },
];

const POINTS = [
  {
    icon: <IconTarget />,
    lead: "The objective sets the brief",
    body: "What you want to change, in your words.",
  },
  {
    icon: <IconCalculator />,
    lead: "The economics decide the build",
    body: "If building it will not pay for itself, we tell you, and we do not build it.",
  },
  {
    icon: <IconFlask />,
    lead: "We test before we scale",
    body: "Prototype, measure, then expand what works.",
  },
];

export default function HomeHowItWorks() {
  return (
    <section style={{ padding: "var(--section-py) 0" }} aria-label="How we think">
      <div className="container">
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
          How we think
        </p>

        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
          }}
        >
          {renderSerif("Every project starts {serif}with a number.{/serif}")}
        </h2>

        <p
          style={{
            fontSize: "clamp(17px, 1vw + 12px, 20px)",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            margin: "0 0 clamp(40px, 5vw, 64px)",
            maxWidth: "62ch",
            textWrap: "pretty",
          }}
        >
          Collection days, quote turnaround, response time, hours saved, repeat
          orders. We agree what we are trying to move before anyone builds
          anything.
        </p>

        {/* The four-node flow. On a wide screen the connector runs between
            the nodes; on a narrow one they stack and the connector is
            hidden, because a horizontal rule between stacked cards reads
            as a divider rather than a flow. */}
        <ol
          style={{
            listStyle: "none",
            margin: "0 0 clamp(40px, 5vw, 64px)",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
            gap: "20px",
          }}
        >
          {FLOW.map((node, i) => (
            <motion.li
              key={node.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.06 }}
              style={{ position: "relative" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "14px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    flexShrink: 0,
                  }}
                />
                <span
                  aria-hidden="true"
                  className="dd-flow-line"
                  style={{
                    flex: 1,
                    height: 1,
                    background: "var(--accent)",
                    opacity: i === FLOW.length - 1 ? 0 : 0.4,
                  }}
                />
              </div>
              <p
                className="mono"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  margin: "0 0 10px",
                }}
              >
                {node.label}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.55,
                  color: "var(--fg-muted)",
                  textWrap: "pretty",
                }}
              >
                {node.example}
              </p>
            </motion.li>
          ))}
        </ol>

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
      </div>
    </section>
  );
}

/* Line icons, uniform 1.5 stroke on a 24 grid, matching the set used on
   the Preflight page so the site reads as one system. */

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

function IconTarget() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" />
    </Svg>
  );
}

function IconCalculator() {
  return (
    <Svg>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
      <path d="M8 6.5h8" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
    </Svg>
  );
}

function IconFlask() {
  return (
    <Svg>
      <path d="M9.5 2.5h5" />
      <path d="M10.5 2.5v6L5.2 18.2A2 2 0 007 21.2h10a2 2 0 001.8-3L13.5 8.5v-6" />
      <path d="M7.6 14.5h8.8" />
    </Svg>
  );
}
