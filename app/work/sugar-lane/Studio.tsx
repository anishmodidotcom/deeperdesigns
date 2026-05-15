"use client";

import Image from "next/image";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

const FLAVOURS = ["Pistachio rose", "Karak caramel", "Lemon saffron", "Chocolate fudge"];
const SIZES = [
  { label: "6 in", note: "8 to 10 slices" },
  { label: "8 in", note: "16 to 18 slices" },
  { label: "10 in", note: "24 to 28 slices" },
];

export default function Studio() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface-1)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
        }}
      >
        <Image
          src="/images/sugar-lane/order-form-bg.webp"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, var(--page-surface-1) 0%, rgba(255,248,242,0.75) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1280,
          marginInline: "auto",
        }}
      >
        <div className="sl-studio-grid">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              SECTION 04 · THE ORDER STUDIO
            </p>
            <h2
              style={{
                margin: 0,
                marginBottom: 32,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 72px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--page-text)",
              }}
            >
              Brief the cake
              <br />
              <span
                style={{
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontWeight: 400,
                  fontSize: "1.2em",
                  color: "var(--page-accent)",
                }}
              >
                in three minutes.
              </span>
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: 18,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              Pick a base, a flavour, a size. Choose the date. Upload a
              reference photo if you have one. Pay the deposit. Farah
              gets one clean brief instead of thirty messages. You get
              a date.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 24,
                marginTop: 48,
                maxWidth: 460,
              }}
            >
              {[
                { value: "3 min", label: "Avg brief time" },
                { value: "AED 50", label: "Deposit, refundable" },
                { value: "7 days", label: "Min lead time" },
                { value: "Free", label: "Abu Dhabi delivery" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-display-script), 'Yellowtail', cursive",
                      fontWeight: 400,
                      fontSize: 36,
                      color: "var(--page-accent)",
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--page-text-3)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, delay: 0.15, ease: SOFT }}
            style={{
              background: "#FFFFFF",
              border: "1px solid var(--page-border)",
              borderRadius: 20,
              padding: 32,
              boxShadow: "0 30px 80px -40px rgba(201,64,90,0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-display-script), 'Yellowtail', cursive",
                  fontWeight: 400,
                  fontSize: 32,
                  color: "var(--page-accent)",
                }}
              >
                Build your cake
              </p>
              <span
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  color: "var(--page-text-3)",
                  textTransform: "uppercase",
                }}
              >
                STEP 02 / 04
              </span>
            </div>

            <FieldGroup label="01 · FLAVOUR">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                {FLAVOURS.map((flavour, i) => (
                  <div
                    key={flavour}
                    style={{
                      padding: "12px 14px",
                      border: i === 0
                        ? "1.5px solid var(--page-accent)"
                        : "1px solid var(--page-border)",
                      background: i === 0
                        ? "var(--page-blush)"
                        : "transparent",
                      borderRadius: 9999,
                      fontFamily:
                        "var(--font-body), 'DM Sans', sans-serif",
                      fontSize: 13,
                      fontWeight: i === 0 ? 600 : 500,
                      color: i === 0
                        ? "var(--page-accent)"
                        : "var(--page-text)",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        border: i === 0
                          ? "3.5px solid var(--page-accent)"
                          : "1.5px solid var(--page-border)",
                      }}
                    />
                    {flavour}
                  </div>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="02 · SIZE">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 8,
                }}
              >
                {SIZES.map((size, i) => (
                  <div
                    key={size.label}
                    style={{
                      padding: 14,
                      border: i === 1
                        ? "1.5px solid var(--page-accent)"
                        : "1px solid var(--page-border)",
                      background: i === 1
                        ? "var(--page-blush)"
                        : "transparent",
                      borderRadius: 12,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily:
                          "var(--font-body), 'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: 18,
                        color: i === 1
                          ? "var(--page-accent)"
                          : "var(--page-text)",
                      }}
                    >
                      {size.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: 9,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "var(--page-text-3)",
                        marginTop: 4,
                      }}
                    >
                      {size.note}
                    </div>
                  </div>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="03 · DATE">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  border: "1px solid var(--page-border)",
                  borderRadius: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                    fontSize: 14,
                    color: "var(--page-text)",
                  }}
                >
                  Friday, June 7
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    color: "var(--page-text-3)",
                    textTransform: "uppercase",
                  }}
                >
                  EDIT
                </span>
              </div>
            </FieldGroup>

            <button
              type="button"
              data-cursor="pointer"
              style={{
                marginTop: 28,
                width: "100%",
                paddingBlock: 16,
                background: "var(--page-accent)",
                color: "#FFFFFF",
                border: "none",
                borderRadius: 9999,
                fontFamily: "var(--font-body), 'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.06em",
                cursor: "pointer",
              }}
            >
              Next · Reference photo →
            </button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .sl-studio-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 64px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .sl-studio-grid {
            grid-template-columns: 45fr 55fr;
            gap: 96px;
          }
        }
      `}</style>
    </section>
  );
}

function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 22 }}>
      <p
        style={{
          margin: 0,
          marginBottom: 10,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--page-text-3)",
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
