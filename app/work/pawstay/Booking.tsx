"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const CAL: ("avail" | "low" | "full" | "selected" | "today")[] = [
  "avail", "avail", "avail", "today", "avail", "low", "avail",
  "avail", "avail", "full", "avail", "selected", "low", "full",
  "avail", "avail", "avail", "avail", "avail", "avail", "avail",
];

const ADDONS = [
  { label: "Premium grooming", price: "₹1,200" },
  { label: "Vet check-in", price: "₹800" },
  { label: "Photo session", price: "₹500" },
  { label: "Birthday cake", price: "₹750" },
  { label: "Pickup and drop", price: "₹400" },
];

function dayStyle(kind: typeof CAL[number]): React.CSSProperties {
  const base: React.CSSProperties = {
    aspectRatio: "1 / 1",
    borderRadius: 8,
    fontFamily: "var(--font-geist-mono), monospace",
    fontSize: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid var(--page-border)",
  };
  if (kind === "full") {
    return {
      ...base,
      color: "var(--page-text-3)",
      textDecoration: "line-through",
      opacity: 0.5,
    };
  }
  if (kind === "selected") {
    return {
      ...base,
      background: "var(--page-accent)",
      color: "#1A120A",
      borderColor: "var(--page-accent)",
      fontWeight: 600,
    };
  }
  if (kind === "today") {
    return {
      ...base,
      borderColor: "var(--page-accent)",
      color: "var(--page-accent)",
    };
  }
  if (kind === "low") {
    return {
      ...base,
      color: "var(--page-accent-2)",
      borderColor: "rgba(136,166,130,0.3)",
    };
  }
  return { ...base, color: "var(--page-text)" };
}

export default function Booking() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <div className="ps-booking-grid">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              BOOKING
            </p>
            <h3
              style={{
                fontFamily:
                  "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.6vw, 40px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 20,
              }}
            >
              From WhatsApp chaos to confirmed in 90 seconds.
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                margin: 0,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              Parents book straight through the portal. The calendar
              shows real availability per dog, with breed and size limits
              enforced automatically. No overbooking, no phone tag.
              Deposit taken at confirmation.
            </p>

            <div
              style={{
                background: "var(--page-surface-1)",
                border: "1px solid var(--page-border)",
                borderRadius: 12,
                padding: 24,
                maxWidth: 420,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 16,
                    color: "var(--page-text)",
                    margin: 0,
                  }}
                >
                  This month
                </p>
                <span
                  style={{
                    fontFamily:
                      "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    color: "var(--page-text-3)",
                  }}
                >
                  Indie · Small
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 6,
                  marginBottom: 8,
                }}
              >
                {DAYS.map((d, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: "center",
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      color: "var(--page-text-3)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: 6,
                }}
              >
                {CAL.map((k, i) => (
                  <div key={i} style={dayStyle(k)}>
                    {i + 4}
                  </div>
                ))}
              </div>

              <p
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 11,
                  color: "var(--page-accent-2)",
                  margin: 0,
                  marginTop: 14,
                  letterSpacing: "0.06em",
                }}
              >
                ● 2 spots left · next Saturday
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              ADDONS
            </p>
            <h3
              style={{
                fontFamily:
                  "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.6vw, 40px)",
                letterSpacing: "-0.025em",
                lineHeight: 1.15,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 20,
              }}
            >
              Treats, grooming, vet visits. One tap.
            </h3>
            <p
              style={{
                fontSize: 16,
                color: "var(--page-text-2)",
                lineHeight: 1.7,
                margin: 0,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              Treats, grooming, vet visits. One tap, at booking or
              mid-stay. Pooja gets a notification and the next
              morning&rsquo;s prep list updates itself.
            </p>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                background: "var(--page-surface-1)",
                border: "1px solid var(--page-border)",
                borderRadius: 12,
                overflow: "hidden",
                maxWidth: 420,
              }}
            >
              {ADDONS.map((a, i) => (
                <li
                  key={a.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 16,
                    borderTop:
                      i === 0
                        ? "none"
                        : "1px solid var(--page-border)",
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      border: "1px solid var(--page-accent)",
                      background:
                        i % 2 === 0
                          ? "var(--page-accent)"
                          : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#1A120A",
                      fontSize: 10,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i % 2 === 0 ? "✓" : ""}
                  </span>
                  <span
                    style={{
                      flex: 1,
                      fontFamily:
                        "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                      fontSize: 14,
                      color: "var(--page-text)",
                    }}
                  >
                    {a.label}
                  </span>
                  <span
                    style={{
                      fontFamily:
                        "var(--font-geist-mono), monospace",
                      fontSize: 13,
                      color: "var(--page-text-2)",
                    }}
                  >
                    {a.price}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .ps-booking-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
        }
        @media (min-width: 900px) {
          .ps-booking-grid {
            grid-template-columns: 1fr 1fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
