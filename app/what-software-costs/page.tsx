import type { Metadata } from "next";
import Link from "next/link";
import {
  COST_ROWS,
  formatInr,
  rentedTotal,
} from "@/lib/software-costs";
import { StructuredData } from "@/components/StructuredData";
import StandardCTA from "@/components/StandardCTA";
import CostCalculator from "./CostCalculator";
import { renderSerif } from "@/components/industry/text";

// v26 Part 8: what software actually costs over five years, and the
// calculator. Every rented figure is a verified public list price with its
// plan, assumption and source shown inline.

const DESCRIPTION =
  "Software sold per user per month looks cheap in the first month and expensive by the fifth year. Here is the arithmetic, and what the same thing costs built once and owned.";

// The table is a five-year view, and the calculator defaults to the same.
const TABLE_YEARS = 5;
const TABLE_PEOPLE = 10;

export const metadata: Metadata = {
  title: "What Business Software Actually Costs · Deeper Designs",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://www.deeperdesigns.in/what-software-costs",
  },
  openGraph: {
    title: "What Business Software Actually Costs · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/what-software-costs",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "What Business Software Actually Costs · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Business Software Actually Costs · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const COSTS_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "What business software actually costs you, over five years",
  description: DESCRIPTION,
  url: "https://www.deeperdesigns.in/what-software-costs",
  isPartOf: {
    "@type": "Organization",
    name: "Deeper Designs",
    url: "https://www.deeperdesigns.in",
  },
};

export default function WhatSoftwareCosts() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <StructuredData data={COSTS_LD} />

      <section style={{ padding: "60px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            {renderSerif(
              "What business software actually costs you, {serif}over five years.{/serif}",
            )}
          </h1>
          {/* v27 voice line, standfirst directly under the heading. */}
          <p
            style={{
              fontSize: "19px",
              color: "var(--fg)",
              lineHeight: 1.6,
              maxWidth: "760px",
              margin: "0 0 24px",
            }}
          >
            Software for your company used to cost a lot more. Now it costs
            less.
          </p>
          <p
            style={{
              fontSize: "21px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              maxWidth: "760px",
            }}
          >
            Software sold per user per month looks cheap in the first month and
            expensive by the fifth year. Every person you hire raises the bill.
            Here is the arithmetic, and what the same thing costs built once
            and owned.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2
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
            The per-seat trap
          </h2>
          <p style={{ fontSize: "19px", lineHeight: 1.65, color: "var(--fg)", margin: 0 }}>
            Per-seat pricing means your software bill grows every time your
            business does. Ten people become twenty, the bill doubles, and
            nothing about the software got better. Add three or four
            subscriptions on top and a growing business is paying for the same
            tools over and over, forever, and owns none of them at the end.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h2
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
            Rented for five years, against built once
          </h2>
          {/* The table scrolls inside its own container on mid widths, and
              stacks into one block per row below 640px so the figures are
              never clipped at the viewport edge. Stacked labels reuse the
              same column headings via data-label. */}
          <div style={{ overflowX: "auto" }}>
            <table className="cost-table"
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <caption
                style={{
                  captionSide: "bottom",
                  textAlign: "left",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--fg-dim)",
                  paddingTop: "16px",
                }}
              >
                Rented totals are for {TABLE_PEOPLE} people over {TABLE_YEARS}{" "}
                years, at the plan and list price named in each row, taxes
                extra. Build figures are the published Deeper Designs tiers.
              </caption>
              <thead>
                <tr>
                  {["Software", "Rented plan and assumption", `Rented, ${TABLE_YEARS} years`, "Built once"].map(
                    (h) => (
                      <th
                        key={h}
                        scope="col"
                        className="mono"
                        style={{
                          textAlign: "left",
                          fontSize: "10.5px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--fg-dim)",
                          padding: "0 16px 12px 0",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {COST_ROWS.map((row) => (
                  <tr key={row.id}>
                    <td data-label="Software" style={{ padding: "18px 16px 18px 0", borderBottom: "1px solid var(--border)", fontSize: "16px", color: "var(--fg)", verticalAlign: "top" }}>
                      {row.category}
                    </td>
                    <td data-label="Rented plan and assumption" style={{ padding: "18px 16px 18px 0", borderBottom: "1px solid var(--border)", fontSize: "14px", color: "var(--fg-muted)", lineHeight: 1.55, verticalAlign: "top" }}>
                      {row.vendor} {row.plan}. {row.assumption}.{" "}
                      <a
                        href={row.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--accent)" }}
                      >
                        {row.source}
                      </a>
                      , checked {row.verifiedOn}.
                    </td>
                    <td data-label={`Rented, ${TABLE_YEARS} years`} style={{ padding: "18px 16px 18px 0", borderBottom: "1px solid var(--border)", fontSize: "16px", color: "var(--fg)", whiteSpace: "nowrap", verticalAlign: "top" }}>
                      {formatInr(rentedTotal(row, TABLE_PEOPLE, TABLE_YEARS))}
                    </td>
                    <td data-label="Built once" style={{ padding: "18px 0", borderBottom: "1px solid var(--border)", fontSize: "16px", color: "var(--accent)", whiteSpace: "nowrap", verticalAlign: "top" }}>
                      {formatInr(row.buildLow)} to {formatInr(row.buildHigh)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            style={{
              marginTop: "20px",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "var(--fg-dim)",
              maxWidth: "680px",
            }}
          >
            Field sales software was meant to be a fourth row. FieldAssist and
            Bizom publish no list price, and BeatRoute&apos;s own pricing page
            did not respond when we checked, so there was no figure we could
            stand behind. The row is left out rather than estimated.
          </p>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <h2
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
            Work it out for your team
          </h2>
          <CostCalculator />
        </div>
      </section>

      {/* v27: back into the index, so the pair is a loop not a dead end. */}
      <section style={{ paddingBottom: "var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <Link
            href="/software"
            className="mono"
            style={{
              fontSize: "13px",
              letterSpacing: "0.04em",
              color: "var(--fg)",
              border: "1px solid var(--border-strong)",
              borderRadius: "999px",
              padding: "9px 16px",
            }}
          >
            Every kind of business software
          </Link>
        </div>
      </section>

      <StandardCTA note="Want the real number for your business? That is what the free call is for." />

      <style>{`
        .cost-table { min-width: 620px; }
        @media (max-width: 640px) {
          /* One block per row so the figures are never clipped. Labels come
             from the same column headings, via data-label. */
          .cost-table { min-width: 0; }
          .cost-table thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
          .cost-table tr { display: block; padding-block: 18px; border-bottom: 1px solid var(--border); }
          .cost-table td { display: block; padding: 0 0 10px !important; border-bottom: 0 !important; }
          .cost-table td:last-child { padding-bottom: 0 !important; }
          .cost-table td::before {
            content: attr(data-label);
            display: block;
            font-family: var(--font-geist-mono), ui-monospace, monospace;
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--fg-dim);
            margin-bottom: 4px;
          }
        }
      `}</style>
    </main>
  );
}
