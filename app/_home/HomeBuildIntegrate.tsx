import Link from "next/link";
import { renderSerif } from "@/components/industry/text";

// v28 Part 4: the homepage had no section linking the industry pages at
// all, so there was no existing "links to industries" block to extend. The
// segment line lands here, directly under what we build and never touch,
// which is the closest thing on the page to "what kind of business are
// you". Flagged in the PR.
const SEGMENT_WORDS: { word: string; slug: string }[] = [
  { word: "manufacturer", slug: "manufacturers" },
  { word: "trader", slug: "traders" },
  { word: "distributor", slug: "distributors" },
  { word: "retailer", slug: "retailers" },
  { word: "importer", slug: "importers" },
  { word: "exporter", slug: "exporters" },
  { word: "packaging", slug: "packaging" },
];

// v26 Part 2: the honest split. Sits after the products-as-proof strip.
// Plain and unglamorous on purpose: this is a trust section, not a feature
// grid. No icons, no cards, no bento.

const WE_BUILD = [
  "Your CRM, pipeline and follow-up",
  "Ops tools, dashboards and daily numbers",
  "Customer, dealer and partner portals",
  "Quotations, orders and workflow",
  "WhatsApp assistants that answer and book",
];

const WE_INTEGRATE = [
  "Tally, because your CA already knows it and it works",
  "GST filing and e-invoicing, through authorised providers",
  "Payments, through regulated rails like Razorpay",
  "WhatsApp, through the official Meta API",
  "Statutory payroll filing",
];

function Column({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div>
      <h3
        className="mono"
        style={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--dd-eyebrow-on-dark)",
          margin: "0 0 20px",
        }}
      >
        {heading}
      </h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {items.map((item) => (
          <li
            key={item}
            style={{
              fontSize: "16px",
              lineHeight: 1.55,
              color: "var(--fg)",
              paddingBlock: "12px",
              borderTop: "1px solid var(--border)",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeBuildIntegrate() {
  return (
    <section style={{ padding: "calc(var(--section-py) * 0.6) 0" }}>
      <div className="container">
        <h2
          style={{
            fontSize: "var(--fs-h1)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "24px",
            maxWidth: "880px",
          }}
        >
          {renderSerif("What we build, {serif}and what we never touch.{/serif}")}
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "680px",
            margin: "0 0 48px",
          }}
        >
          Some things are worth building for you. Some things already work and
          should be left alone. Here is the honest split.
        </p>

        <div className="bi-grid">
          <Column heading="We build" items={WE_BUILD} />
          <Column heading="We integrate, never replace" items={WE_INTEGRATE} />
        </div>

        <p
          style={{
            marginTop: "48px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--fg)",
            maxWidth: "680px",
          }}
        >
          Anyone who offers to replace your Tally is selling you a problem you
          do not have.
        </p>
        <p
          style={{
            marginTop: "28px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "760px",
          }}
        >
          Or find your kind of business:{" "}
          {SEGMENT_WORDS.map((s, i) => (
            <span key={s.slug}>
              <Link href={`/business/${s.slug}`} style={{ color: "var(--accent)" }}>
                {s.word}
              </Link>
              {i < SEGMENT_WORDS.length - 1 ? ", " : "."}
            </span>
          ))}
        </p>
      </div>
      <style>{`
        .bi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
        }
        @media (max-width: 767px) {
          .bi-grid { grid-template-columns: 1fr; gap: 40px; }
        }
      `}</style>
    </section>
  );
}
