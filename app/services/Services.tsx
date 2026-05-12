"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

const EASE = [0.22, 1, 0.36, 1] as const;

type Service = {
  code: string;
  title: string;
  body: string;
  price: string;
  timeline: string;
  examples: { name: string; href: string }[];
};

const SERVICES: Service[] = [
  {
    code: "01",
    title: "AI-built websites",
    body: "Bespoke marketing sites in 24 to 48 hours. The portfolio you are reading is the example. Brand-led, scroll-choreographed, image-and-video-generated, mobile-tuned. Not a template.",
    price: "From Rs. 3,50,000 / $4,200",
    timeline: "24-48 hours, then a polish week",
    examples: [
      { name: "Earth and Fire", href: "/work/earth-and-fire" },
      { name: "Sugar Lane", href: "/work/sugar-lane" },
      { name: "Kadak Chai", href: "/work/kadak-chai" },
    ],
  },
  {
    code: "02",
    title: "Custom tools for businesses",
    body: "The core of what we do. Dashboards, AI image generators, interactive quizzes, calculators, chatbots, voice agents, CRMs, portals, lead magnets, sales agents, internal tools. One tool, one business, the right way.",
    price: "From Rs. 6,00,000 / $7,200",
    timeline: "14-28 days",
    examples: [
      { name: "Veda Glow · Skin Advisor", href: "/work/veda-glow" },
      { name: "Karan Legal · Lead Qualifier", href: "/work/karan-legal" },
      { name: "Bharat Steel · Inventory Dashboard", href: "/work/bharat-steel" },
      { name: "Zara Fitness · Training Platform", href: "/work/zara-fitness" },
    ],
  },
  {
    code: "03",
    title: "Social content, design, ecommerce",
    body: "Brand-led content at the cadence of a strong agency, run by a small team and AI. Includes brand identity, product photography (generated and directed), launch campaigns, and direct-to-consumer store setup.",
    price: "From Rs. 2,50,000 / month",
    timeline: "Ongoing, 30-day commitments",
    examples: [
      { name: "Earth and Fire pottery brand", href: "/work/earth-and-fire" },
      { name: "Sugar Lane home bakery", href: "/work/sugar-lane" },
    ],
  },
  {
    code: "04",
    title: "Lead generation and ads",
    body: "Paid acquisition that ties a creative spend to a clear lead pipeline. Meta, LinkedIn, and Google. Creative shipped by us, audiences set by us, attribution wired into a dashboard you can actually read.",
    price: "From Rs. 1,80,000 / month + ad spend",
    timeline: "Ongoing, 30-day commitments",
    examples: [
      { name: "PawStay pet portal", href: "/work/pawstay" },
      { name: "BrightPath tutoring portal", href: "/work/brightpath" },
    ],
  },
  {
    code: "05",
    title: "LinkedIn sales agent as a service",
    body: "We build, train, and operate a LinkedIn outreach agent on your account. Researches, writes, sends, and books meetings while keeping the voice yours. Compliance-aware. Reviewed weekly.",
    price: "From Rs. 1,20,000 / month",
    timeline: "Two-week ramp, then live",
    examples: [
      { name: "Karan Legal lead qualifier", href: "/work/karan-legal" },
    ],
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            borderTop: "1px solid var(--border)",
          }}
        >
          {SERVICES.map((service, i) => (
            <motion.article
              key={service.code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.06, ease: EASE }}
              style={{
                paddingBlock: 40,
                borderBottom: "1px solid var(--border)",
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: 24,
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
                  {service.code}
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontWeight: 500,
                    fontSize: "clamp(28px, 3.6vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: "var(--text)",
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  {service.title}
                </h2>
              </div>

              <div>
                <p
                  style={{
                    fontSize: 16,
                    color: "var(--text-2)",
                    lineHeight: 1.75,
                    margin: 0,
                    marginBottom: 28,
                    maxWidth: 640,
                  }}
                >
                  {service.body}
                </p>

                <dl
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 20,
                    margin: 0,
                    marginBottom: 28,
                    maxWidth: 560,
                  }}
                >
                  <div>
                    <dt
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-3)",
                        margin: 0,
                        marginBottom: 8,
                      }}
                    >
                      INDICATIVE PRICE
                    </dt>
                    <dd
                      style={{
                        fontFamily:
                          "var(--font-fraunces), Georgia, serif",
                        fontWeight: 500,
                        fontSize: 17,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {service.price}
                    </dd>
                  </div>
                  <div>
                    <dt
                      style={{
                        fontFamily:
                          "var(--font-geist-mono), monospace",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--text-3)",
                        margin: 0,
                        marginBottom: 8,
                      }}
                    >
                      TIMELINE
                    </dt>
                    <dd
                      style={{
                        fontFamily:
                          "var(--font-fraunces), Georgia, serif",
                        fontWeight: 500,
                        fontSize: 17,
                        color: "var(--text)",
                        margin: 0,
                      }}
                    >
                      {service.timeline}
                    </dd>
                  </div>
                </dl>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 10,
                    paddingTop: 24,
                    borderTop: "1px dashed var(--border-2)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-3)",
                      paddingTop: 8,
                    }}
                  >
                    Examples in the portfolio:
                  </span>
                  {service.examples.map((ex) => (
                    <Link
                      key={ex.name}
                      href={ex.href}
                      data-cursor="view"
                      style={{
                        paddingInline: 12,
                        paddingBlock: 6,
                        border: "1px solid var(--border-2)",
                        borderRadius: 9999,
                        fontFamily:
                          "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: 13,
                        color: "var(--text)",
                      }}
                    >
                      {ex.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.srv-row) {
            grid-template-columns: 300px 1fr !important;
            gap: 64px !important;
            align-items: start;
          }
          :global(.srv-row-left) {
            position: sticky;
            top: 120px;
          }
        }
      `}</style>
    </section>
  );
}
