"use client";

import { motion } from "motion/react";

type ChaosCard = {
  label: string;
  tint: string;
  top: string;
  left: string;
  rotate: number;
  fromX: number;
  fromY: number;
};

const CARDS: ChaosCard[] = [
  {
    label: "WhatsApp",
    tint: "rgba(37,211,102,0.5)",
    top: "8%",
    left: "8%",
    rotate: -3,
    fromX: -120,
    fromY: -80,
  },
  {
    label: "Pinterest",
    tint: "rgba(230,0,35,0.5)",
    top: "14%",
    left: "62%",
    rotate: 4,
    fromX: 140,
    fromY: -100,
  },
  {
    label: "Google Drive",
    tint: "rgba(66,133,244,0.5)",
    top: "38%",
    left: "26%",
    rotate: -2,
    fromX: -80,
    fromY: 120,
  },
  {
    label: "Excel",
    tint: "rgba(33,115,70,0.5)",
    top: "48%",
    left: "70%",
    rotate: 5,
    fromX: 100,
    fromY: 60,
  },
  {
    label: "Email",
    tint: "rgba(142,132,148,0.4)",
    top: "70%",
    left: "10%",
    rotate: 3,
    fromX: -140,
    fromY: 80,
  },
  {
    label: "Phone Calls",
    tint: "rgba(142,132,148,0.4)",
    top: "76%",
    left: "55%",
    rotate: -4,
    fromX: 80,
    fromY: 140,
  },
];

export default function Chaos() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x" style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE PROBLEM
        </p>
        <h2
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontWeight: 400,
            fontSize: "clamp(28px, 4vw, 48px)",
            color: "var(--page-text)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            margin: 0,
            marginBottom: 64,
          }}
        >
          Six apps. Zero clarity.
        </h2>

        <div
          aria-hidden
          className="sn-chaos"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 720,
            height: 360,
            margin: "0 auto",
          }}
        >
          {CARDS.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{
                opacity: 0,
                x: c.fromX,
                y: c.fromY,
                rotate: c.rotate * 3,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotate: c.rotate,
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                top: c.top,
                left: c.left,
                width: 120,
                height: 80,
                background: "var(--page-surface)",
                border: `1px solid ${c.tint}`,
                borderRadius: 6,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                color: "var(--page-text-2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 8,
                boxShadow: "0 14px 30px -20px rgba(0,0,0,0.6)",
              }}
            >
              {c.label}
            </motion.div>
          ))}
        </div>

        <p
          style={{
            fontSize: 16,
            color: "var(--page-text-2)",
            maxWidth: 560,
            marginInline: "auto",
            marginTop: 64,
            margin: 0,
            marginBlockStart: 64,
            lineHeight: 1.6,
          }}
        >
          Mood boards on Pinterest. Floor plans as PDFs on Drive. Material
          photos on WhatsApp. Invoices as screenshots. Updates scattered
          across six different apps.
        </p>

        <p
          style={{
            fontFamily: "var(--font-instrument), Georgia, serif",
            fontStyle: "italic",
            fontSize: 24,
            color: "var(--page-text)",
            maxWidth: 700,
            margin: 0,
            marginInline: "auto",
            marginBlockStart: 48,
            lineHeight: 1.4,
            letterSpacing: "-0.005em",
          }}
        >
          &ldquo;Clients ask &lsquo;what is the status?&rsquo; and Ananya has
          to scroll through 40 chats to find the answer.&rdquo;
        </p>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          .sn-chaos {
            height: 480px;
          }
        }
      `}</style>
    </section>
  );
}
