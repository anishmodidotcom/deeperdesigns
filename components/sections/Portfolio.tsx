"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";

type Project = {
  number: string;
  name: string;
  client: string;
  bg: string;
  slug: string;
};

const PROJECTS: Project[] = [
  { number: "01", name: "Skin Advisor", client: "Veda Glow", bg: "#2D1810", slug: "veda-glow" },
  { number: "02", name: "Inventory Dashboard", client: "Bharat Steel Corp", bg: "#1A1F2E", slug: "bharat-steel" },
  { number: "03", name: "Wellness Hub", client: "Meera Wellness", bg: "#1C2A1E", slug: "meera-wellness" },
  { number: "04", name: "Ops Intelligence", client: "Zaatar Republic", bg: "#2E1F0A", slug: "zaatar-republic" },
  { number: "05", name: "Client Portal", client: "Studio Noor", bg: "#1E1A28", slug: "studio-noor" },
  { number: "06", name: "Clinic Manager", client: "SmileFirst", bg: "#0F2028", slug: "smilefirst" },
  { number: "07", name: "Dynamic Pricing", client: "AutoBazaar", bg: "#1F1209", slug: "autobazaar" },
  { number: "08", name: "Academy Platform", client: "StumpVision", bg: "#0A1F0A", slug: "stumpvision" },
  { number: "09", name: "Fragrance Finder", client: "Oud and Ember", bg: "#201518", slug: "oud-and-ember" },
  { number: "10", name: "Member Hub", client: "HiveDesk", bg: "#18181F", slug: "hivedesk" },
  { number: "11", name: "Product Showcase", client: "Malabar Spice House", bg: "#2A1A08", slug: "malabar-spice" },
  { number: "12", name: "Pet Portal", client: "PawStay", bg: "#1A2220", slug: "pawstay" },
  { number: "13", name: "Farm Dashboard", client: "Sahaja Farms", bg: "#1A2010", slug: "sahaja-farms" },
  { number: "14", name: "Lead Qualifier", client: "Karan Legal", bg: "#14141E", slug: "karan-legal" },
  { number: "15", name: "Fitness Platform", client: "Zara Fitness", bg: "#1A1A1A", slug: "zara-fitness" },
  { number: "16", name: "Product Builder", client: "Earth and Fire", bg: "#2A1810", slug: "earth-and-fire" },
  { number: "17", name: "Brand Experience", client: "Kadak Chai", bg: "#201508", slug: "kadak-chai" },
  { number: "18", name: "Trip Companion", client: "Nomad Trails", bg: "#0F1820", slug: "nomad-trails" },
  { number: "19", name: "Order Studio", client: "Sugar Lane", bg: "#201A1E", slug: "sugar-lane" },
  { number: "20", name: "Parent Portal", client: "BrightPath", bg: "#101828", slug: "brightpath" },
];

export default function Portfolio() {
  return (
    <section className="section">
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--text-3)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          SELECTED WORK
        </p>

        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
            margin: 0,
            maxWidth: 800,
            marginBottom: 64,
          }}
        >
          20 tools. 20 businesses. Each one built from scratch.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: (i % 6) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/work/${p.slug}`}
                data-cursor="view"
                style={{
                  display: "block",
                  position: "relative",
                  aspectRatio: "4 / 3",
                  background: p.bg,
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  color: "#ffffff",
                }}
              >
                <div
                  className="portfolio-inner"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 32,
                    transition: "transform 0.4s var(--ease-spring)",
                    transformOrigin: "bottom left",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.03)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      opacity: 0.6,
                      marginBottom: 12,
                    }}
                  >
                    {p.number}
                  </span>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      opacity: 0.7,
                      marginTop: 4,
                    }}
                  >
                    {p.client}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
