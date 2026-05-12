"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

type Item = {
  name: string;
  href?: string;
};

type Outcome = {
  code: string;
  title: string;
  body: string;
  items: Item[];
};

const OUTCOMES: Outcome[] = [
  {
    code: "01",
    title: "Customer Experience",
    body: "The systems your customers actually touch. Quizzes that recommend. Portals that brief. Bots that triage. Designed so every interaction feels considered, not bolted on.",
    items: [
      { name: "Customer onboarding systems" },
      { name: "Recommendation tools and quizzes", href: "/work/veda-glow" },
      { name: "Booking and reservation flows", href: "/work/pawstay" },
      { name: "Customer portals", href: "/work/studio-noor" },
      { name: "Lead qualification systems", href: "/work/karan-legal" },
      { name: "Conversational systems (WhatsApp, chat, voice)", href: "/work/bharat-steel" },
    ],
  },
  {
    code: "02",
    title: "Operations",
    body: "The tools your team uses to run the place. Dashboards that tell you where the day is going. Internal portals that replace six chat threads. Schedulers that hold the line.",
    items: [
      { name: "Operational dashboards", href: "/work/zaatar-republic" },
      { name: "Workflow automation tools" },
      { name: "Reporting and analytics interfaces", href: "/work/sahaja-farms" },
      { name: "Internal team portals", href: "/work/hivedesk" },
      { name: "Inventory and resource management", href: "/work/autobazaar" },
      { name: "Calendar and scheduling systems", href: "/work/smilefirst" },
    ],
  },
  {
    code: "03",
    title: "Growth",
    body: "The systems that bring people in and keep them. Lead magnets that earn the email. Landing pages that convert the click. Retention loops that turn one purchase into ten.",
    items: [
      { name: "Sales enablement tools", href: "/work/zara-fitness" },
      { name: "Interactive lead magnets", href: "/work/oud-and-ember" },
      { name: "Conversion-focused landing pages", href: "/work/kadak-chai" },
      { name: "Customer retention systems", href: "/work/brightpath" },
      { name: "Business intelligence interfaces", href: "/work/stumpvision" },
      { name: "Content and social automation" },
    ],
  },
];

type Tier = {
  range: string;
  label: string;
  examples: string;
};

const TIERS: Tier[] = [
  {
    range: "From ₹25,000 / $300",
    label: "Single-tool builds",
    examples: "A simple quiz. A landing page. A WhatsApp form. A small dashboard.",
  },
  {
    range: "₹1L to ₹3L / $1,200 to $3,500",
    label: "Custom tools",
    examples: "Custom calculators, recommendation engines, single-purpose AI tools, branded sites that convert.",
  },
  {
    range: "₹3L to ₹10L / $3,500 to $12,000",
    label: "Multi-tool systems",
    examples: "A portal and a dashboard. A site, a booking flow, and an inventory system. A brand world and a store.",
  },
  {
    range: "₹10L+ / $12,000+",
    label: "Full operational redesigns",
    examples: "The operating system for a business. Brand, site, internal tools, customer-facing tools, the works.",
  },
];

export default function Services() {
  return (
    <section
      style={{
        paddingBlock: 96,
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          What we ship, organized by outcome
        </p>

        <h2
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(32px, 5vw, 64px)",
            letterSpacing: "-0.03em",
            color: "var(--text)",
            margin: 0,
            lineHeight: 1.06,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          Three things a business is usually trying to do.
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          Win the customer. Run the operation. Grow the base. We organize our
          work the same way our clients organize their week.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            borderTop: "1px solid var(--border)",
            marginBottom: 96,
          }}
        >
          {OUTCOMES.map((outcome, i) => (
            <motion.article
              key={outcome.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
              style={{
                paddingBlock: 48,
                borderBottom: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 32,
              }}
              className="srv-row"
            >
              <div className="srv-row-left">
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    letterSpacing: "0.22em",
                    color: "var(--text-3)",
                    margin: 0,
                    marginBottom: 10,
                  }}
                >
                  {outcome.code}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(28px, 3.8vw, 48px)",
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    margin: 0,
                    lineHeight: 1.06,
                  }}
                >
                  {outcome.title}
                </h3>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--text-2)",
                    lineHeight: 1.7,
                    margin: 0,
                    marginTop: 20,
                    maxWidth: 380,
                  }}
                >
                  {outcome.body}
                </p>
              </div>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {outcome.items.map((item) => (
                  <li key={item.name}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        data-cursor="view"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 16,
                          paddingBlock: 14,
                          paddingInline: 18,
                          borderRadius: 10,
                          border: "1px solid var(--border-2)",
                          color: "var(--text)",
                          fontSize: 15,
                          fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                          textDecoration: "none",
                          transition: "border-color 0.2s var(--ease-spring)",
                        }}
                        className="srv-item"
                      >
                        <span>{item.name}</span>
                        <span
                          style={{
                            fontFamily:
                              "var(--font-geist-mono), monospace",
                            fontSize: 11,
                            letterSpacing: "0.16em",
                            color: "var(--text-3)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          See study →
                        </span>
                      </Link>
                    ) : (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: 16,
                          paddingBlock: 14,
                          paddingInline: 18,
                          borderRadius: 10,
                          border: "1px solid var(--border-2)",
                          color: "var(--text-2)",
                          fontSize: 15,
                          fontFamily:
                            "var(--font-geist-sans), system-ui, sans-serif",
                        }}
                      >
                        {item.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--accent)",
              margin: 0,
              marginBottom: 18,
            }}
          >
            Indicative pricing
          </p>
          <h3
            style={{
              fontFamily: "var(--font-fraunces), Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(28px, 4vw, 44px)",
              letterSpacing: "-0.02em",
              color: "var(--text)",
              margin: 0,
              marginBottom: 32,
              lineHeight: 1.08,
              maxWidth: 720,
            }}
          >
            What it costs, before we know what you need.
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 16,
            }}
            className="srv-tier-grid"
          >
            {TIERS.map((tier) => (
              <div
                key={tier.label}
                style={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    margin: 0,
                  }}
                >
                  {tier.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: 22,
                    color: "var(--text)",
                    margin: 0,
                  }}
                >
                  {tier.range}
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--text-2)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {tier.examples}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: 17,
              color: "var(--text-2)",
              marginTop: 32,
              lineHeight: 1.65,
              maxWidth: 760,
            }}
          >
            Most businesses spend more on a single industry conference than on
            a custom DD tool. The tool, unlike the conference, ships value
            every day after.
          </p>

          <p
            style={{
              fontSize: 14,
              color: "var(--text-3)",
              marginTop: 16,
              fontStyle: "italic",
              lineHeight: 1.6,
              maxWidth: 760,
            }}
          >
            Pricing depends on scope, integrations, and timeline. Most projects
            ship in 2 to 6 weeks. The studio takes a small number of new
            engagements each month.
          </p>

          <div
            style={{
              marginTop: 32,
              padding: "24px 24px",
              border: "1px dashed var(--border-2)",
              borderRadius: 12,
              maxWidth: 760,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--accent)",
                margin: 0,
                marginBottom: 10,
              }}
            >
              Budget constraints?
            </p>
            <p
              style={{
                fontSize: 16,
                color: "var(--text)",
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              Tell us anyway. If it is not a fit, we will say so within a day,
              no posturing.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.srv-row) {
            grid-template-columns: 360px 1fr !important;
            gap: 80px !important;
            align-items: start;
          }
          :global(.srv-row-left) {
            position: sticky;
            top: 120px;
          }
          :global(.srv-tier-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1280px) {
          :global(.srv-tier-grid) {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
        :global(.srv-item:hover) {
          border-color: var(--accent) !important;
        }
      `}</style>
    </section>
  );
}
