"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Item = {
  logo: string | null;
  name: string;
  role: string;
};

type Group = {
  label: string;
  items: Item[];
};

const GROUPS: Group[] = [
  {
    label: "AI + MODELS",
    items: [
      { logo: "/logos/claude.svg", name: "Claude", role: "STRATEGY · BRIEF" },
      { logo: "/logos/googlegemini.svg", name: "Gemini", role: "IMAGE" },
      { logo: null, name: "Veo 3", role: "VIDEO" },
    ],
  },
  {
    label: "BUILD + CODE",
    items: [
      { logo: "/logos/nextdotjs.svg", name: "Next.js", role: "APP" },
      { logo: "/logos/vercel.svg", name: "Vercel", role: "HOSTING" },
      { logo: "/logos/supabase.svg", name: "Supabase", role: "DATA" },
    ],
  },
  {
    label: "DEEPER",
    items: [
      { logo: null, name: "Deeper Designs", role: "PARENT · OPS" },
    ],
  },
];

export default function Engine() {
  return (
    <section style={{ paddingBlock: 144, borderTop: "1px solid var(--page-border)" }}>
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto", paddingInline: "clamp(20px, 4vw, 48px)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE STACK
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(36px, 5vw, 64px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 56,
          }}
        >
          The engine inside.
        </motion.h2>

        <div className="dc-engine-grid">
          {GROUPS.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: gi * 0.1, ease: EASE }}
              className="dc-engine-group"
            >
              <p className="dc-engine-label">{group.label}</p>
              <div className="dc-engine-items">
                {group.items.map((it) => (
                  <div key={it.name} className="dc-engine-item">
                    <div className="dc-engine-logo">
                      {it.logo ? (
                        <Image
                          src={it.logo}
                          alt={it.name}
                          width={22}
                          height={22}
                          style={{ display: "block" }}
                        />
                      ) : (
                        <span className="dc-engine-logo-text">{it.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="dc-engine-name">{it.name}</div>
                    <div className="dc-engine-role">{it.role}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--page-text-3)",
            margin: 0,
            marginTop: 48,
          }}
        >
          Extended video providers available on enterprise installs.
        </motion.p>
      </div>

      <style>{`
        .dc-engine-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .dc-engine-group {
          background: var(--page-surface);
          border: 1px solid var(--page-border);
          border-radius: 14px;
          padding: 28px 24px;
        }
        .dc-engine-label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--page-accent-2);
          margin: 0 0 24px 0;
        }
        .dc-engine-items {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .dc-engine-item {
          display: grid;
          grid-template-columns: 36px 1fr auto;
          align-items: center;
          gap: 14px;
        }
        .dc-engine-logo {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--page-surface-2);
          border: 1px solid var(--page-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dc-engine-logo-text {
          font-family: var(--font-geist-mono), monospace;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--page-text-2);
        }
        .dc-engine-name {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: var(--page-text);
        }
        .dc-engine-role {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--page-text-3);
        }
        @media (min-width: 768px) {
          .dc-engine-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            align-items: start;
          }
        }
      `}</style>
    </section>
  );
}
