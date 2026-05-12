"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "next-view-transitions";

const PROMPTS = [
  "Still running operations on WhatsApp?",
  "Customers asking the same questions every day?",
  "Switching between six tools to handle one customer?",
  "Manual work eating your week?",
  "Spreadsheets becoming your second job?",
  "Your business growing faster than your systems?",
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function SoundLikeYou() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      style={{
        paddingBlock: 160,
        position: "relative",
        overflow: "hidden",
      }}
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
            marginBottom: 48,
          }}
        >
          Does this sound like you?
        </motion.p>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 1100,
          }}
        >
          {PROMPTS.map((prompt, i) => (
            <Prompt
              key={prompt}
              prompt={prompt}
              index={i}
              total={PROMPTS.length}
              scrollYProgress={scrollYProgress}
              reduced={reduced}
            />
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          style={{
            marginTop: 96,
            paddingTop: 48,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "flex-start",
          }}
        >
          <p
            style={{
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "var(--text)",
              margin: 0,
              fontWeight: 300,
              letterSpacing: "-0.01em",
              maxWidth: 700,
              lineHeight: 1.4,
            }}
          >
            Your business deserves better tools.
          </p>
          <Link
            href="/start-your-study"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              paddingInline: 28,
              paddingBlock: 16,
              borderRadius: 9999,
              background: "var(--accent)",
              color: "#FFFFFF",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              textDecoration: "none",
            }}
          >
            Start Your Possibility Study
            <span aria-hidden style={{ marginLeft: 4 }}>
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

type PromptProps = {
  prompt: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduced: boolean;
};

function Prompt({ prompt, index, total, scrollYProgress, reduced }: PromptProps) {
  const slice = 1 / total;
  const start = 0.05 + index * slice * 0.55;
  const end = start + slice * 0.55;
  const opacity = useTransform(
    scrollYProgress,
    [start, Math.min(end, 0.95)],
    reduced ? [1, 1] : [0.18, 1]
  );
  const x = useTransform(
    scrollYProgress,
    [start, Math.min(end, 0.95)],
    reduced ? [0, 0] : [-12, 0]
  );

  return (
    <motion.li
      style={{
        opacity,
        x,
        fontSize: "clamp(28px, 5vw, 64px)",
        color: "var(--text)",
        fontWeight: 300,
        letterSpacing: "-0.02em",
        lineHeight: 1.08,
      }}
    >
      {prompt}
    </motion.li>
  );
}
