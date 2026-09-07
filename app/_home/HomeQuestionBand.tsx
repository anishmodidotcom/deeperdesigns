"use client";

import Link from "next/link";
import { trackAuditQuestionClick } from "@/lib/meta-events";

// v30 part 2: the question band, directly under the hero. The site used
// to open by describing what we build. It now opens by asking what the
// owner wants to improve, and every answer routes into the audit with
// the question already in the form.
//
// v30 part 8 also lands here: the "find your kind of business" line moves
// up from HomeBuildIntegrate to sit directly beneath the band as a single
// row of the seven segments.

// Labels are the ones supplied for this row, not lib/segments.ts names:
// the segment record calls one of them "Retailers and kirana" and the
// band says "Retailers". The segment pages keep their own names.
const SEGMENT_LINKS: { slug: string; label: string }[] = [
  { slug: "manufacturers", label: "Manufacturers" },
  { slug: "traders", label: "Traders and wholesalers" },
  { slug: "distributors", label: "Distributors" },
  { slug: "retailers", label: "Retailers" },
  { slug: "importers", label: "Importers" },
  { slug: "exporters", label: "Exporters" },
  { slug: "packaging", label: "Packaging and printing" },
];

const QUESTIONS: { slug: string; label: string }[] = [
  { slug: "revenue", label: "How do I increase revenue?" },
  { slug: "profit", label: "How do I improve profitability?" },
  { slug: "cashflow", label: "How do I fix cash flow?" },
  { slug: "time", label: "How do I get my time back?" },
  { slug: "customers", label: "How do I reach and keep more customers?" },
  { slug: "visibility", label: "What is actually happening in my business?" },
  { slug: "new", label: "What could we do that we could not before?" },
];

export default function HomeQuestionBand() {
  return (
    <section style={{ padding: "var(--section-py) 0" }} aria-label="Start here">
      <div className="container">
        <p
          className="mono"
          style={{
            fontSize: "12px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--accent)",
            margin: "0 0 20px",
          }}
        >
          Start here
        </p>

        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 20px",
          }}
        >
          What do you want to improve?
        </h2>

        <p
          style={{
            fontSize: "clamp(19px, 1.4vw + 12px, 26px)",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            margin: "0 0 40px",
            maxWidth: "58ch",
            textWrap: "pretty",
          }}
        >
          Most owners are not short of opportunities. They are too busy running
          the business to chase them. Start with the question. We find what is
          underneath it.
        </p>

        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {QUESTIONS.map((q) => (
            <li key={q.slug}>
              <Link
                href={`/audit?q=${q.slug}`}
                className="dd-question-chip"
                onClick={() => {
                  try {
                    trackAuditQuestionClick(q.slug);
                  } catch {
                    // analytics never blocks navigation
                  }
                }}
              >
                {q.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* The seven segments, promoted out of HomeBuildIntegrate so the
            visitor can self-identify immediately after the question. */}
        <p
          style={{
            margin: "40px 0 0",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "var(--fg-muted)",
          }}
        >
          <span className="mono" style={{ letterSpacing: "0.08em" }}>
            Or find your kind of business:
          </span>{" "}
          {SEGMENT_LINKS.map((s, i) => (
            <span key={s.slug}>
              {i > 0 ? <span style={{ color: "var(--fg-dim)" }}> · </span> : null}
              <Link
                href={`/business/${s.slug}`}
                className="dd-tap-inline"
                style={{ color: "var(--fg)", textUnderlineOffset: "3px" }}
              >
                {s.label}
              </Link>
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
