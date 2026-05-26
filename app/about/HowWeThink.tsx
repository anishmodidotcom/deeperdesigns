"use client";

import { motion } from "motion/react";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;

type Principle = {
  n: string;
  title: string;
  body: string;
  refLabel: string;
  refSlug: string;
};

const PRINCIPLES: Principle[] = [
  {
    n: "01",
    title: "The system before the screen.",
    body: "Most software gets built around a designed screen. We build around the system underneath. The screen is the last thing. The system is the work. This is why our builds keep working when the business changes, and most others don't.",
    refLabel: "→ SEE HIVEDESK",
    refSlug: "hivedesk",
  },
  {
    n: "02",
    title: "Specifics over generics, always.",
    body: "We don't build \"a dashboard for restaurants.\" We build the dashboard Faisal needs for his four shawarma branches in Sharjah. Specifics are how you make something that actually fits. Generics are how you make something that gets abandoned in three months.",
    refLabel: "→ SEE ZAATAR REPUBLIC",
    refSlug: "zaatar-republic",
  },
  {
    n: "03",
    title: "Custom beats template, every time.",
    body: "A template was built for someone else's business. Yours is a specific shape, your customers, your team, your inventory, your seasons. The wrong tool slows you down quietly. A tool built around your shape disappears into the work.",
    refLabel: "→ SEE STUDIO NOOR",
    refSlug: "studio-noor",
  },
  {
    n: "04",
    title: "The founder is the user. Build for them.",
    body: "Most internal tools are built for the company. They become dashboards nobody opens, reports nobody reads, software the team quietly works around. We build for the person who needs to make the decision, in the format they need it in, on the device they're holding.",
    refLabel: "→ SEE SAHAJA FARMS",
    refSlug: "sahaja-farms",
  },
  {
    n: "05",
    title: "Done is better than perfect. Shipped is better than scoped.",
    body: "A perfect plan that takes six months loses every time to a working version shipped in two weeks. We pick the smallest version of the right thing, ship it, then iterate. The first version teaches us more than any planning meeting could.",
    refLabel: "→ SEE PAWSTAY",
    refSlug: "pawstay",
  },
];

export default function HowWeThink() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <p className="eyebrow" style={{ marginBottom: "24px", color: "var(--dd-text-faint)" }}>
          HOW WE THINK
        </p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "64px" }}>
          Five principles that show up in everything we build.
        </h2>

        <div className="hwt-list">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              className="hwt-row"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
            >
              <p className="hwt-n">{p.n}</p>
              <div className="hwt-body">
                <h3 className="hwt-title">{p.title}</h3>
                <p className="hwt-text">{p.body}</p>
                <Link
                  href={`/work/${p.refSlug}`}
                  className="hwt-ref"
                  data-cursor="pointer"
                >
                  {p.refLabel}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hwt-list {
          display: flex;
          flex-direction: column;
          gap: 80px;
        }
        .hwt-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 32px;
          align-items: baseline;
        }
        .hwt-n {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 56px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--dd-accent-primary);
          margin: 0;
          line-height: 1;
        }
        .hwt-body {
          min-width: 0;
        }
        .hwt-title {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: -0.01em;
          line-height: 1.2;
          color: var(--dd-text-high);
          margin: 0 0 16px;
        }
        .hwt-text {
          font-family: var(--font-geist-sans), system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: var(--dd-text-mid);
          margin: 0 0 20px;
          max-width: 640px;
        }
        .hwt-ref {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--dd-text-faint);
          text-decoration: none;
          transition: color 150ms var(--ease-out);
          display: inline-block;
        }
        .hwt-ref:hover {
          color: var(--dd-accent-primary);
        }

        @media (max-width: 767px) {
          .hwt-list {
            gap: 56px;
          }
          .hwt-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          .hwt-n {
            font-size: 40px;
          }
          .hwt-title {
            font-size: 22px;
          }
          .hwt-text {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}
