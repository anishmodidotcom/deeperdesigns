"use client";

import { motion } from "motion/react";
import StackWall from "../StackWall";

type Card = {
  eyebrow: string;
  heading: string;
  body: string;
};

const CARDS: Card[] = [
  {
    eyebrow: "01 · THE TOOLS",
    heading: "We use a lot of them.",
    body: "Claude. ChatGPT. Nano Banana. Veo 3. Kling. Gemini. Cursor. Vercel. Supabase. Resend. Google AI Studio. GitHub. Sharp. Lenis. GSAP. Plus the next ten that drop next month. AI tools are commodity. We use the best one for each job.",
  },
  {
    eyebrow: "02 · THE THINKING",
    heading: "Knowing what to build is the hard part.",
    body: "Ten years in business strategy. Marketing, brand, financial modeling, ops design. We know what to build because we have spent a decade fixing how businesses run. The AI just makes building it cheaper.",
  },
  {
    eyebrow: "03 · THE TASTE",
    heading: "Anyone can generate screens. Few can design useful systems.",
    body: "A prompt gives you a wireframe. A studio gives you a product. Brand world, copy, interaction design, conversion logic, performance, mobile behavior. Twenty hand-tuned details that separate a demo from a deliverable.",
  },
  {
    eyebrow: "04 · THE OUTPUT",
    heading: "What you get is not a prompt result. It is a system.",
    body: "Code you own. A brand you can grow. Documentation you can hand off. A working tool, not a screenshot of one.",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function WhyNotDIY() {
  return (
    <section
      style={{
        paddingBlock: 160,
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
      id="why-not-diy"
    >
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          04 · TOOLS VS THINKING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          style={{
            fontSize: "clamp(36px, 6vw, 80px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.02,
            margin: 0,
            marginBottom: 28,
            maxWidth: 1000,
          }}
        >
          Tools are easy. Good systems are hard.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
          style={{
            fontSize: "clamp(18px, 2.2vw, 22px)",
            color: "var(--text-2)",
            lineHeight: 1.5,
            margin: 0,
            marginBottom: 96,
            maxWidth: 680,
          }}
        >
          AI can generate interfaces. It cannot understand your business.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="wny-cards"
        >
          {CARDS.map((card, i) => (
            <motion.article
              key={card.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: (i % 2) * 0.08,
                ease: EASE,
              }}
              style={{
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "clamp(28px, 4vw, 48px)",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  margin: 0,
                }}
              >
                {card.eyebrow}
              </p>
              <h3
                style={{
                  fontSize: "clamp(22px, 2.6vw, 32px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {card.heading}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  color: "var(--text-2)",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div style={{ marginTop: 96 }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-3)",
              margin: 0,
              marginBottom: 24,
            }}
          >
            The stack we use. The thinking is ours.
          </motion.p>
          <StackWall />
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.wny-cards) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
