"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.7, 0, 0.2, 1] as const;

const PRODUCTS = [
  { name: "Crop top", price: "AED 220" },
  { name: "Leggings", price: "AED 290" },
  { name: "Lifting gloves", price: "AED 140" },
  { name: "Recovery hoodie", price: "AED 380" },
];

export default function ProductLine() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="zf-line-grid">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="zf-flatlay"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--page-surface-1)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "8%",
                left: "10%",
                width: "55%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              <Image
                src="/images/zara-fitness/product-sportswear.webp"
                alt="Matte black crop top and leggings folded on a dark surface"
                fill
                sizes="(min-width: 1024px) 35vw, 60vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                right: "8%",
                width: "44%",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
                border: "1px solid var(--page-accent)",
              }}
            >
              <Image
                src="/images/zara-fitness/product-gloves.webp"
                alt="Premium black leather lifting gloves with acid lime accent"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <span
              style={{
                position: "absolute",
                top: "4%",
                right: "8%",
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
              }}
            >
              DROP 01 · ETA AUG 2026
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--page-text-2)",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                margin: 0,
                marginBottom: 28,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 10,
                  height: 10,
                  background: "var(--page-accent)",
                  display: "inline-block",
                }}
              />
              THE LINE
            </p>
            <h2
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(56px, 8vw, 96px)",
                letterSpacing: "-0.01em",
                lineHeight: 0.92,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            >
              More than an app.
            </h2>
            <p
              style={{
                fontSize: 17,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                margin: 0,
                marginBottom: 40,
                maxWidth: 460,
              }}
            >
              Zara&rsquo;s own sportswear line launches with the platform.
              Members get first access. Each piece sold builds the
              community deeper.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                borderTop: "1px solid var(--page-border)",
                marginBottom: 40,
              }}
            >
              {PRODUCTS.map((p) => (
                <li
                  key={p.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBlock: 14,
                    borderBottom: "1px solid var(--page-border)",
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "var(--page-text)" }}>{p.name}</span>
                  <span style={{ color: "var(--page-accent)" }}>{p.price}</span>
                </li>
              ))}
            </ul>

            <a
              href="/start-your-study"
              data-cursor="pointer"
              style={{
                display: "inline-block",
                background: "var(--page-accent)",
                color: "#0E0E0E",
                paddingInline: 24,
                paddingBlock: 14,
                fontFamily:
                  "var(--font-anton), Impact, sans-serif",
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRadius: 9999,
              }}
            >
              View the drop
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .zf-line-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        .zf-flatlay {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border: 1px solid var(--page-border);
        }
        @media (min-width: 1024px) {
          .zf-line-grid {
            grid-template-columns: 65fr 35fr;
            gap: 64px;
          }
        }
      `}</style>
    </section>
  );
}
