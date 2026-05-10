"use client";

import Image from "next/image";
import { motion } from "motion/react";

const EASE = [0.19, 1, 0.22, 1] as const;

const RESULT_BOTTLES = [
  { name: "Layla", note: "Saffron, Damask Rose, Oud" },
  { name: "Saffron Hour", note: "Saffron, Amber, Tobacco" },
  { name: "Ember Veil", note: "Smoked Oud, Sandalwood, Vanilla" },
];

export default function Quiz() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div
        className="container-x"
        style={{ textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          THE FIND YOUR FRAGRANCE TOOL
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-cormorant-display), Cormorant, Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 56px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 720,
            marginInline: "auto",
          }}
        >
          Eight questions. One fragrance. Yours.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 1.02, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
          style={{
            maxWidth: 960,
            margin: "0 auto",
            background: "var(--page-surface)",
            border: "1px solid var(--page-border)",
            borderRadius: 12,
            padding: 36,
            textAlign: "left",
            boxShadow:
              "0 40px 90px -50px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06) inset",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 28,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-text-2)",
              }}
            >
              Question 03 / 08
            </span>
            <div style={{ flex: 1, minWidth: 160, maxWidth: 320 }}>
              <div
                style={{
                  height: 2,
                  background: "rgba(201,168,76,0.15)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "37.5%",
                    height: "100%",
                    background: "var(--page-accent)",
                  }}
                />
              </div>
            </div>
          </div>

          <h3
            style={{
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 3.6vw, 40px)",
              letterSpacing: "-0.02em",
              color: "var(--page-text)",
              margin: 0,
              marginBottom: 32,
              lineHeight: 1.15,
            }}
          >
            Which world feels more like home?
          </h3>

          <div className="oe-quiz-options">
            <ChoiceCard
              label="Petrichor"
              description="Rain on warm stone."
              imageSrc="/images/oud-and-ember/ingredients-grid-2.webp"
              imageAlt="Soft rose petal evoking the smell of rain"
              selected={false}
            />
            <ChoiceCard
              label="Amber & Wood"
              description="Resin, oud, late afternoon sun."
              imageSrc="/images/oud-and-ember/ingredients-grid-3.webp"
              imageAlt="Glowing amber resin chunks"
              selected
            />
          </div>

          <p
            style={{
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 16,
              color: "var(--page-text-3)",
              margin: 0,
              marginTop: 28,
              textAlign: "center",
            }}
          >
            Pick what calls to you. There are no wrong answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            marginTop: 48,
            flexWrap: "wrap",
          }}
        >
          {RESULT_BOTTLES.map((b) => (
            <div
              key={b.name}
              style={{
                width: 140,
                textAlign: "center",
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 64,
                  height: 96,
                  margin: "0 auto",
                  borderRadius: "10px 10px 18px 18px",
                  background:
                    "linear-gradient(180deg, rgba(201,168,76,0.45) 0%, rgba(201,168,76,0.25) 22%, rgba(120,80,30,0.65) 100%)",
                  border: "1px solid rgba(201,168,76,0.35)",
                  position: "relative",
                  boxShadow: "0 16px 30px -20px rgba(201,168,76,0.4)",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -8,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 18,
                    height: 10,
                    background:
                      "linear-gradient(180deg, var(--page-accent), var(--page-accent-2))",
                    borderRadius: 2,
                  }}
                />
              </div>
              <p
                style={{
                  fontFamily:
                    "var(--font-cormorant-display), Cormorant, Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 20,
                  color: "var(--page-text)",
                  margin: 0,
                  marginTop: 14,
                  letterSpacing: "-0.005em",
                }}
              >
                {b.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--page-text-3)",
                  margin: 0,
                  marginTop: 6,
                }}
              >
                {b.note}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .oe-quiz-options {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 720px) {
          .oe-quiz-options {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}

type ChoiceProps = {
  label: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  selected: boolean;
};

function ChoiceCard({
  label,
  description,
  imageSrc,
  imageAlt,
  selected,
}: ChoiceProps) {
  return (
    <div
      style={{
        position: "relative",
        background: "var(--page-surface-2)",
        border: selected
          ? "1px solid var(--page-accent)"
          : "1px solid var(--page-border)",
        borderRadius: 10,
        padding: 14,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition:
          "border-color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 3",
          overflow: "hidden",
          borderRadius: 6,
        }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 720px) 40vw, 90vw"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: selected ? "var(--page-accent)" : "var(--page-text-2)",
              margin: 0,
            }}
          >
            {label}
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 4,
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        </div>

        <span
          aria-hidden
          style={{
            width: 14,
            height: 14,
            borderRadius: 9999,
            background: selected ? "var(--page-accent)" : "transparent",
            border: selected
              ? "1px solid var(--page-accent)"
              : "1px solid var(--page-border)",
            flexShrink: 0,
            boxShadow: selected
              ? "0 0 0 4px rgba(201,168,76,0.18)"
              : "none",
            transition:
              "all 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        />
      </div>
    </div>
  );
}
