"use client";

import { motion } from "motion/react";

export default function ContactCTA() {
  return (
    <section className="section">
      <div
        className="container-x"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(28px, 4.5vw, 56px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.1,
            margin: 0,
            maxWidth: 900,
          }}
        >
          Got a business? Got a problem?
          <br />
          We have probably already thought of a solution.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 16,
            marginTop: 48,
          }}
        >
          <a
            href="https://wa.me/919968716498?text=Hey%2C%20I%27m%20interested%20in%20working%20with%20Deeper%20Designs"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--accent)",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "var(--radius-md)",
              fontSize: 16,
              fontWeight: 500,
              transition: "background var(--t-base) var(--ease-spring)",
              border: "1px solid var(--accent)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent-2)";
              e.currentTarget.style.borderColor = "var(--accent-2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.borderColor = "var(--accent)";
            }}
          >
            Start a conversation
          </a>

          <a
            href="mailto:modianish11@gmail.com"
            data-cursor="pointer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "1px solid var(--border-2)",
              color: "var(--text-2)",
              padding: "16px 32px",
              borderRadius: "var(--radius-md)",
              fontSize: 16,
              transition:
                "border-color var(--t-base) var(--ease-spring), color var(--t-base) var(--ease-spring)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border-2)";
              e.currentTarget.style.color = "var(--text-2)";
            }}
          >
            modianish11@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
