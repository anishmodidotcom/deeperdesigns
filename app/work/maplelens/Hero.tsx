"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1320,
          marginInline: "auto",
          width: "100%",
        }}
      >
        <div className="ml-hero-grid">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 40,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 12px",
                border: "1px solid var(--page-border)",
                borderRadius: 9999,
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: "var(--page-accent)",
                }}
              />
              MAPLE LENS · LIVE PRODUCT · FURNITURE MAKERS
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(44px, 7.4vw, 96px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.02,
                margin: 0,
              }}
            >
              Workshop photo in.
              <br />
              <span style={{ color: "var(--page-accent)" }}>
                Studio shot out.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
              style={{
                fontSize: 18,
                color: "var(--page-text-2)",
                maxWidth: 520,
                margin: 0,
                marginTop: 32,
                lineHeight: 1.65,
              }}
            >
              Catalog-ready studio and lifestyle images from a phone photo.
              Built for Indian furniture makers who do not have a catalog
              studio budget.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginTop: 40,
              }}
            >
              <a
                href="https://maplelens.vercel.app/app"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  paddingInline: 24,
                  paddingBlock: 14,
                  background: "var(--page-accent)",
                  color: "#1A1612",
                  borderRadius: 9999,
                  fontFamily:
                    "var(--font-inter), system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                  textDecoration: "none",
                }}
              >
                Try Maple Lens
                <span aria-hidden>↗</span>
              </a>
              <a
                href="#showcase"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  paddingInline: 24,
                  paddingBlock: 14,
                  background: "transparent",
                  color: "var(--page-text)",
                  border: "1px solid var(--page-border)",
                  borderRadius: 9999,
                  fontFamily:
                    "var(--font-inter), system-ui, sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                See before / after
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="ml-hero-pair"
          >
            <div className="ml-hero-card ml-hero-before">
              <span className="ml-hero-tag">PHONE PHOTO</span>
              <Image
                src="/images/maplelens/hero-workshop.webp"
                alt="A workshop photo of a wooden chair before Maple Lens"
                fill
                priority
                sizes="(min-width: 1024px) 360px, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="ml-hero-card ml-hero-after">
              <span className="ml-hero-tag" style={{ background: "var(--page-accent)", color: "#1A1612" }}>
                CATALOG SHOT
              </span>
              <Image
                src="/images/maplelens/hero-catalog.webp"
                alt="A catalog-ready studio image of the same chair after Maple Lens"
                fill
                priority
                sizes="(min-width: 1024px) 360px, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ml-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        .ml-hero-pair {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          max-width: 540px;
          margin-inline: auto;
        }
        .ml-hero-card {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid var(--page-border);
          background: var(--page-surface);
        }
        .ml-hero-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(15, 12, 10, 0.78);
          color: var(--page-text);
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          padding: 5px 8px;
          border-radius: 4px;
          font-weight: 600;
        }
        @media (min-width: 1024px) {
          .ml-hero-grid {
            grid-template-columns: 1fr 1fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}
