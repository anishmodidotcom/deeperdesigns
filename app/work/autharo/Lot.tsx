"use client";

import { motion } from "motion/react";

type Car = {
  name: string;
  price: string;
  days: number;
};

const CARS: Car[] = [
  { name: "2019 Camry", price: "AED 42,000", days: 12 },
  { name: "2021 Civic", price: "AED 38,500", days: 8 },
  { name: "2018 Patrol", price: "AED 75,000", days: 87 },
  { name: "2020 Corolla", price: "AED 35,000", days: 22 },
  { name: "2019 Pajero", price: "AED 58,000", days: 45 },
  { name: "2017 Land Cruiser", price: "AED 95,000", days: 92 },
  { name: "2020 Accord", price: "AED 44,000", days: 18 },
  { name: "2018 Altima", price: "AED 31,000", days: 38 },
  { name: "2021 Sonata", price: "AED 49,000", days: 9 },
  { name: "2019 Tucson", price: "AED 39,500", days: 28 },
  { name: "2017 X-Trail", price: "AED 36,000", days: 71 },
  { name: "2020 RAV4", price: "AED 64,000", days: 16 },
  { name: "2018 Optima", price: "AED 32,500", days: 52 },
  { name: "2019 Sportage", price: "AED 41,000", days: 25 },
  { name: "2017 Sentra", price: "AED 24,000", days: 68 },
  { name: "2020 Tiguan", price: "AED 56,000", days: 14 },
  { name: "2019 Forte", price: "AED 28,000", days: 41 },
  { name: "2021 Yaris", price: "AED 27,500", days: 6 },
];

function ageColor(days: number) {
  if (days < 30) return "#22C55E";
  if (days < 60) return "#EAB308";
  return "#EF4444";
}

function ageWidth(days: number) {
  return Math.min(95, Math.max(8, days));
}

export default function Lot() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE INVENTORY
        </p>

        <h2
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 4vw, 48px)",
            letterSpacing: "-0.03em",
            color: "var(--page-text)",
            lineHeight: 1.1,
            margin: 0,
            marginBottom: 48,
          }}
        >
          60 cars. Zero pricing strategy.
        </h2>

        <div className="ab-lot">
          {CARS.map((car, i) => {
            const color = ageColor(car.days);
            return (
              <motion.div
                key={car.name + i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  background: "var(--page-surface)",
                  border: "1px solid rgba(34,211,238,0.1)",
                  borderRadius: 6,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  minHeight: 80,
                }}
              >
                <p
                  style={{
                    fontFamily:
                      "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    color: "var(--page-text)",
                    margin: 0,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {car.name}
                </p>
                <p
                  style={{
                    fontFamily:
                      "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
                    fontWeight: 800,
                    fontSize: 16,
                    color: "var(--page-accent)",
                    letterSpacing: "-0.02em",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {car.price}
                </p>
                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 9999,
                      background: "rgba(255,255,255,0.05)",
                      overflow: "hidden",
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        width: `${ageWidth(car.days)}%`,
                        height: "100%",
                        background: color,
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      color: "var(--page-text-2)",
                      margin: 0,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {car.days} days
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p
          style={{
            fontFamily:
              "var(--font-outfit), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 15,
            color: "var(--page-text-2)",
            maxWidth: 560,
            marginTop: 48,
            margin: 0,
            marginBlockStart: 48,
            lineHeight: 1.6,
          }}
        >
          The longer a car sits, the more it costs him. Yard rent,
          insurance, depreciation. And he has no idea which cars are aging
          out.
        </p>
      </div>

      <style jsx>{`
        .ab-lot {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 10px;
        }
      `}</style>
    </section>
  );
}
