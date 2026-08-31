import { renderSerif } from "@/components/industry/text";

// v27 Part 1: the product architecture answer. Sits after the ownership
// layer and before the confusion block. This is the section that makes the
// pricing claim believable: nobody accepts "a fraction of the cost" without
// being told why it is possible. Quiet and in-shell, no icons, no cards.

const LINES = [
  "The core is built and tested. Your build starts on top of it.",
  "Modules get added only where your business needs them.",
  "Industry packs for manufacturing, trading, distribution, packaging, import, export and retail mean we already know your workflow.",
];

export default function HomeArchitecture() {
  return (
    <section style={{ padding: "calc(var(--section-py) * 0.6) 0" }}>
      <div className="container">
        <h2
          style={{
            fontSize: "var(--fs-h1)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "880px",
          }}
        >
          {renderSerif("We are fast because {serif}we never start from zero.{/serif}")}
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "760px",
            margin: "0 0 40px",
          }}
        >
          Every business needs the same foundations: customers, suppliers,
          products, stock, transactions, documents, payments, and who is
          allowed to see what. We built that core once, properly, and we keep
          it. When you come to us, we are not writing your software from
          scratch. We are shaping a core that already works around how your
          business actually runs, then adding only the parts you need.
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: "0 0 40px",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "760px",
          }}
        >
          {LINES.map((line) => (
            <li
              key={line}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                fontSize: "17px",
                lineHeight: 1.55,
                color: "var(--fg)",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  marginTop: "10px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              {line}
            </li>
          ))}
        </ul>
        <p
          style={{
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--fg)",
            maxWidth: "760px",
            margin: 0,
          }}
        >
          That is the honest answer to how a build costs a fraction of what
          you were quoted, and takes weeks instead of a year.
        </p>
      </div>
    </section>
  );
}
