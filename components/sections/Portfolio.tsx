"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Link } from "next-view-transitions";

type Project = {
  number: string;
  name: string;
  client: string;
  bg: string;
  slug: string;
  image: string;
};

const PROJECTS: Project[] = [
  { number: "01", name: "Skin Advisor", client: "Veda Glow", bg: "#2D1810", slug: "veda-glow", image: "/images/veda-glow/hero-bottle.webp" },
  { number: "02", name: "Inventory Dashboard", client: "Bharat Steel Corp", bg: "#1A1F2E", slug: "bharat-steel", image: "/images/bharat-steel/hero-coil.webp" },
  { number: "03", name: "Wellness Hub", client: "Meera Wellness", bg: "#1C2A1E", slug: "meera-wellness", image: "/images/meera-wellness/hero-pose.webp" },
  { number: "04", name: "Ops Intelligence", client: "Zaatar Republic", bg: "#2E1F0A", slug: "zaatar-republic", image: "/images/zaatar-republic/hero-wrap.webp" },
  { number: "05", name: "Client Portal", client: "Studio Noor", bg: "#1E1A28", slug: "studio-noor", image: "/images/studio-noor/hero-room.webp" },
  { number: "06", name: "Clinic Manager", client: "SmileFirst", bg: "#0F2028", slug: "smilefirst", image: "/images/smilefirst/hero-clinic.webp" },
  { number: "07", name: "Dynamic Pricing", client: "AutoBazaar", bg: "#1F1209", slug: "autobazaar", image: "/images/autobazaar/hero-sedan.webp" },
  { number: "08", name: "Academy Platform", client: "StumpVision", bg: "#0A1F0A", slug: "stumpvision", image: "/images/stumpvision/hero-batsman.webp" },
  { number: "09", name: "Fragrance Finder", client: "Oud and Ember", bg: "#201518", slug: "oud-and-ember", image: "/images/oud-and-ember/hero-bottle.webp" },
  { number: "10", name: "Member Hub", client: "HiveDesk", bg: "#18181F", slug: "hivedesk", image: "/images/hivedesk/hero-space.webp" },
  { number: "11", name: "Product Showcase", client: "Malabar Spice House", bg: "#2A1A08", slug: "malabar-spice", image: "/images/malabar-spice/hero-pepper.webp" },
  { number: "12", name: "Pet Portal", client: "PawStay", bg: "#1A2220", slug: "pawstay", image: "/images/pawstay/hero-dog.webp" },
  { number: "13", name: "Farm Dashboard", client: "Sahaja Farms", bg: "#1A2010", slug: "sahaja-farms", image: "/images/sahaja-farms/hero-field.webp" },
  { number: "14", name: "Lead Qualifier", client: "Karan Legal", bg: "#14141E", slug: "karan-legal", image: "/images/karan-legal/hero-pen.webp" },
  { number: "15", name: "Fitness Platform", client: "Zara Fitness", bg: "#1A1A1A", slug: "zara-fitness", image: "/images/zara-fitness/hero-zara.webp" },
  { number: "16", name: "Product Builder", client: "Earth and Fire", bg: "#2A1810", slug: "earth-and-fire", image: "/images/earth-and-fire/hero-vase.webp" },
  { number: "17", name: "Brand Experience", client: "Kadak Chai", bg: "#201508", slug: "kadak-chai", image: "/images/kadak-chai/hero-tin.webp" },
  { number: "18", name: "Trip Companion", client: "Nomad Trails", bg: "#0F1820", slug: "nomad-trails", image: "/images/nomad-trails/hero-ridge.webp" },
  { number: "19", name: "Order Studio", client: "Sugar Lane", bg: "#201A1E", slug: "sugar-lane", image: "/images/sugar-lane/hero-cake.webp" },
  { number: "20", name: "Parent Portal", client: "BrightPath", bg: "#101828", slug: "brightpath", image: "/images/brightpath/hero-classroom.webp" },
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
          POSSIBILITY GALLERY
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
            marginBottom: 24,
          }}
        >
          Twenty Possibility Studies.
        </h2>

        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            maxWidth: 640,
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 64,
          }}
        >
          Working prototypes of custom business tools, each inspired by a real
          operational bottleneck. Pick any. Commission your own version.
        </p>

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
                className="portfolio-card"
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
                <Image
                  src={p.image}
                  alt={`${p.client} hero image`}
                  fill
                  sizes="(min-width: 1200px) 300px, (min-width: 768px) 33vw, 90vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.6s var(--ease-spring), opacity 0.4s var(--ease-spring)",
                  }}
                  className="portfolio-img"
                />
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, ${p.bg}66 0%, ${p.bg}cc 60%, ${p.bg}f2 100%)`,
                    pointerEvents: "none",
                  }}
                />
                <div
                  className="portfolio-inner"
                  style={{
                    position: "relative",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: 28,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      opacity: 0.8,
                      marginBottom: 10,
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
                      fontSize: 13,
                      opacity: 0.8,
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

      <style jsx>{`
        :global(.portfolio-card:hover .portfolio-img) {
          transform: scale(1.06);
          opacity: 0.85;
        }
      `}</style>
    </section>
  );
}
