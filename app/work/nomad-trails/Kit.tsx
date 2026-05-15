"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

type KitItem = {
  num: string;
  name: string;
  detail: string;
  x: string;
  y: string;
};

const ITEMS: KitItem[] = [
  { num: "01", name: "Insulated jacket", detail: "−10°C to −20°C", x: "22%", y: "28%" },
  { num: "02", name: "Down sleeping bag", detail: "Below −15°C", x: "62%", y: "20%" },
  { num: "03", name: "Trekking boots", detail: "B2 rated, broken-in", x: "75%", y: "62%" },
  { num: "04", name: "Headlamp + spare batt", detail: "300+ lumens", x: "30%", y: "72%" },
];

export default function Kit() {
  return (
    <section
      style={{
        paddingBlock: 144,
        background: "var(--page-surface-1)",
        position: "relative",
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
            fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent-deep)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          SECTION 04 · THE KIT
        </motion.p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 64,
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
              fontWeight: 500,
              fontSize: "clamp(40px, 6vw, 72px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "var(--page-text)",
              margin: 0,
              maxWidth: 720,
            }}
          >
            What you pack
            <br />
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--page-accent-deep)",
              }}
            >
              is what we say to pack.
            </em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.15, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-body-clean), 'Inter', system-ui, sans-serif",
              fontSize: 16,
              color: "var(--page-text-2)",
              maxWidth: 380,
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            Two weeks before your trip you get a kit checklist and a
            video walkthrough from Arjun, showing how to pack each item.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.0, ease: SOFT }}
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
            borderRadius: 4,
          }}
        >
          <Image
            src="/images/nomad-trails/gear-flatlay.webp"
            alt="Trekking gear arranged top-down: insulated jacket, boots, headlamp, sleeping bag, water bottle, gloves"
            fill
            sizes="(min-width: 1024px) 1320px, 90vw"
            style={{ objectFit: "cover" }}
          />

          {ITEMS.map((item, i) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.6,
                delay: 0.4 + i * 0.1,
                ease: SOFT,
              }}
              style={{
                position: "absolute",
                left: item.x,
                top: item.y,
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--page-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--page-bg)",
                  border: "2px solid #FAF8F4",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                {item.num}
              </div>
              <div
                style={{
                  padding: "8px 12px",
                  background: "rgba(250,248,244,0.96)",
                  borderRadius: 2,
                  border: "1px solid var(--page-border)",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "var(--font-body-clean), 'Inter', system-ui, sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--page-text)",
                    marginBottom: 2,
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontFamily:
                      "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--page-text-3)",
                  }}
                >
                  {item.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
