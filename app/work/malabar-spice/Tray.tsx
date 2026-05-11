"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.25, 1, 0.5, 1] as const;

const SPICES = [
  "Black Pepper",
  "Cardamom",
  "Turmeric",
  "Cinnamon",
  "Cloves",
  "Star Anise",
  "Nutmeg",
  "Mace",
  "Coriander",
  "Cumin",
  "Fennel",
  "Fenugreek",
  "Mustard",
  "Ajwain",
  "Asafoetida",
  "Tamarind",
  "Curry Leaves",
  "Bay Leaves",
  "Saffron",
  "Vanilla",
  "Kashmiri Chilli",
  "Long Pepper",
  "Kokum",
];

export default function Tray() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div
        className="container-x"
        style={{ textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE FULL ROSTER
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          Twenty-three spices. Eleven countries. One family.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 1.02, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            position: "relative",
            maxWidth: 720,
            marginInline: "auto",
            aspectRatio: "1 / 1",
            overflow: "hidden",
            borderRadius: 4,
            boxShadow:
              "0 40px 80px -40px rgba(232,155,45,0.2), 0 0 0 1px rgba(232,155,45,0.05)",
          }}
        >
          <Image
            src="/images/malabar-spice/spice-grid-detail.webp"
            alt="Top down wooden tray with peppercorns, cardamom, turmeric powder and cinnamon sticks"
            fill
            sizes="(min-width: 720px) 720px, 90vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            marginTop: 64,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            columnGap: 32,
            rowGap: 14,
            maxWidth: 840,
            marginInline: "auto",
          }}
        >
          {SPICES.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.7,
                delay: (i % 8) * 0.04,
                ease: EASE,
              }}
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: 18,
                color: "var(--page-text)",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
                fontVariationSettings: "'opsz' 144",
              }}
            >
              {s}
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 17,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 48,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          Each one sourced direct. Each one with a story.
        </motion.p>
      </div>
    </section>
  );
}
