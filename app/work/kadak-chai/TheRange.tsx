"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

type Blend = {
  num: string;
  name: string;
  body: string;
  note: string;
  price: string;
};

const BLENDS: Blend[] = [
  {
    num: "01",
    name: "Bombay Cutting",
    body: "Strong · Smoky · Milky",
    note: "Assam CTC, green cardamom, fresh ginger. The cup that built the city.",
    price: "Rs. 480",
  },
  {
    num: "02",
    name: "Sample Room Masala",
    body: "Full · Spiced · Warm",
    note: "Family recipe, untouched since 1962. Cardamom forward, clove finish.",
    price: "Rs. 540",
  },
  {
    num: "03",
    name: "Kashmiri Kahwa",
    body: "Light · Saffron · Floral",
    note: "Whole-leaf green, saffron threads, slivered almond. No milk.",
    price: "Rs. 720",
  },
  {
    num: "04",
    name: "Ginger Cutting",
    body: "Sharp · Fresh · Cold-weather",
    note: "Dried ginger and crushed pepper. Monsoon office tea.",
    price: "Rs. 460",
  },
  {
    num: "05",
    name: "Madras Filter",
    body: "Strong · Roasted · No frills",
    note: "Nilgiri black, roasted chicory. South-Indian filter style.",
    price: "Rs. 520",
  },
  {
    num: "06",
    name: "Evening Mint",
    body: "Soft · Mint · Caffeine-free",
    note: "Tulsi, mint, lemongrass. The blend Devika makes for her grandmother.",
    price: "Rs. 420",
  },
];

export default function TheRange() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-bg)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1320, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          SECTION 03 · THE RANGE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 96px)",
            letterSpacing: "-0.03em",
            lineHeight: 0.92,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 24,
            textTransform: "uppercase",
            maxWidth: 1000,
          }}
        >
          Six blends.
          <br />
          <span style={{ color: "var(--page-accent)" }}>One family</span> behind each.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: SOFT }}
          style={{
            fontFamily: "var(--font-body), 'Crimson Pro', Georgia, serif",
            fontSize: 19,
            fontStyle: "italic",
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 72,
            maxWidth: 640,
            lineHeight: 1.6,
          }}
        >
          The range is small on purpose. Each blend earns its tin.
        </motion.p>

        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 7",
            overflow: "hidden",
            borderRadius: 4,
            marginBottom: 72,
          }}
        >
          <Image
            src="/images/kadak-chai/tea-grid.webp"
            alt="Six piles of different chai blends arranged on a dark warm wood surface"
            fill
            sizes="(min-width: 1024px) 1320px, 90vw"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(17,9,6,0) 60%, rgba(17,9,6,0.7) 100%)",
            }}
          />
        </div>

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {BLENDS.map((blend, i) => (
            <motion.li
              key={blend.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.05, ease: SOFT }}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr auto",
                gap: 32,
                alignItems: "baseline",
                paddingBlock: 32,
                borderBottom: "1px solid var(--page-border)",
              }}
              className="kc-blend-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 14,
                  letterSpacing: "0.15em",
                  color: "var(--page-text-3)",
                }}
              >
                {blend.num}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily:
                      "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(28px, 3.4vw, 44px)",
                    letterSpacing: "-0.02em",
                    color: "var(--page-text)",
                    margin: 0,
                    marginBottom: 6,
                    textTransform: "uppercase",
                  }}
                >
                  {blend.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--page-accent)",
                    margin: 0,
                    marginBottom: 10,
                  }}
                >
                  {blend.body}
                </p>
                <p
                  style={{
                    fontFamily:
                      "var(--font-body), 'Crimson Pro', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 17,
                    color: "var(--page-text-2)",
                    margin: 0,
                    lineHeight: 1.5,
                    maxWidth: 640,
                  }}
                >
                  {blend.note}
                </p>
              </div>
              <span
                style={{
                  fontFamily:
                    "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
                  fontSize: 24,
                  color: "var(--page-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                {blend.price}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        @media (max-width: 700px) {
          :global(.kc-blend-row) {
            grid-template-columns: 40px 1fr !important;
            gap: 16px !important;
          }
          :global(.kc-blend-row > span:last-child) {
            grid-column: 1 / -1;
            margin-top: 8px;
          }
        }
      `}</style>
    </section>
  );
}
