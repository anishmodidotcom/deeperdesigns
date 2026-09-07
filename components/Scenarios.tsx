import { renderSerif } from "@/components/industry/text";

// v30 part 6: six real scenarios, drawn from work that exists. Rendered
// on the homepage after the proof strip and again on /about below the
// founder section, so the same evidence carries both pages.
//
// Copy is final and verbatim. Every figure here is counted: five
// thousand past buyers, and nothing else that is not a product name.
//
// The brief allows a small interface crop beneath a card where a real
// capture exists. None of these six has one in the repo yet, so none is
// rendered rather than a placeholder being invented.

const SCENARIOS = [
  {
    icon: <IconPhone />,
    lead: "Five thousand dormant customers",
    body: "A trader with around five thousand past buyers and no capacity to call them. An AI calling agent works the list and hands anyone interested to a person. Transcripts reviewed, conversion tested against list quality before scaling.",
  },
  {
    icon: <IconCamera />,
    lead: "Catalogue photography without the shoot",
    body: "A furniture maker needed catalogue-grade imagery for every piece. One phone photo now becomes a studio shot. What began as a service became Maple Lens, a working product.",
  },
  {
    icon: <IconShirt />,
    lead: "A collection shot in an afternoon",
    body: "Studio, styling and photography for every drop is slow and costly. Oviya Studio turns one garment photo into on-model imagery.",
  },
  {
    icon: <IconCalendar />,
    lead: "Bookings without the phone tag",
    body: "A sports facility ran bookings through one manager and a phone. A booking system with WhatsApp confirmation took the calls out of the process.",
  },
  {
    icon: <IconDocument />,
    lead: "A brand that writes its own content",
    body: "A content engine loaded with a brand's products, voice and assets generates its posts and creative from that knowledge. Deeper Content runs on it.",
  },
  {
    icon: <IconSend />,
    lead: "Outreach as a system",
    body: "Sourcing, verification, sequenced email and follow-up in one place. Outpost is the product; the same approach runs client outreach.",
  },
];

// v31: /about showed the same six cards as the homepage, verbatim. It now
// takes three of them under its own heading; the other three stay on the
// homepage only. Card copy is unchanged in both places.
const ABOUT_KEYS = [
  "Five thousand dormant customers",
  "Catalogue photography without the shoot",
  "Bookings without the phone tag",
];

export default function Scenarios({
  variant = "full",
}: {
  variant?: "full" | "about";
}) {
  const isAbout = variant === "about";
  const cards = isAbout
    ? ABOUT_KEYS.map((k) => {
        const found = SCENARIOS.find((s) => s.lead === k);
        if (!found) throw new Error(`Scenarios: no card named ${k}`);
        return found;
      })
    : SCENARIOS;

  return (
    <section
      style={{ padding: "var(--section-py) 0" }}
      aria-label="From real work"
    >
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
          From real work
        </p>

        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 clamp(36px, 4vw, 56px)",
          }}
        >
          {isAbout
            ? "Three that started as conversations"
            : renderSerif(
                "What this looks like {serif}in a real business.{/serif}",
              )}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
            gap: "20px",
          }}
        >
          {cards.map((s) => (
            <div
              key={s.lead}
              style={{
                padding: "clamp(24px,2.4vw,32px)",
                border: "1px solid var(--border)",
                borderRadius: "16px",
                background: "var(--bg-card, #161616)",
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  display: "inline-flex",
                  marginBottom: "20px",
                }}
              >
                {s.icon}
              </span>
              <h3
                style={{
                  margin: "0 0 12px",
                  fontSize: "clamp(18px,1.4vw,21px)",
                  lineHeight: 1.3,
                  fontWeight: 500,
                }}
              >
                {s.lead}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--fg-muted)",
                  textWrap: "pretty",
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {isAbout ? null : (
        <p
          style={{
            margin: "clamp(28px,3vw,40px) 0 0",
            fontSize: "16px",
            lineHeight: 1.6,
            color: "var(--fg-muted)",
            maxWidth: "70ch",
            textWrap: "pretty",
          }}
        >
          Businesses we understand: manufacturers, traders, distributors,
          importers, exporters, and owner-led B2B companies across India.
        </p>
        )}
      </div>
    </section>
  );
}

/* Line icons, uniform 1.5 stroke on a 24 grid. */

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        stroke: "currentColor",
        strokeWidth: 1.5,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        display: "block",
      }}
    >
      {children}
    </svg>
  );
}

function IconPhone() {
  return (
    <Svg>
      <path d="M6.5 2.5h.9a1.6 1.6 0 011.6 1.3l.6 3a1.6 1.6 0 01-.5 1.5L7.7 9.6a12.5 12.5 0 006.7 6.7l1.3-1.4a1.6 1.6 0 011.5-.5l3 .6a1.6 1.6 0 011.3 1.6v2.2a1.8 1.8 0 01-2 1.8A17.5 17.5 0 013 4.5a1.8 1.8 0 011.8-2z" />
    </Svg>
  );
}

function IconCamera() {
  return (
    <Svg>
      <path d="M3 8.5A1.5 1.5 0 014.5 7h2.2l1.3-2.2a1 1 0 01.9-.5h6.2a1 1 0 01.9.5L17.3 7h2.2A1.5 1.5 0 0121 8.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z" />
      <circle cx="12" cy="12.8" r="3.4" />
    </Svg>
  );
}

function IconShirt() {
  return (
    <Svg>
      <path d="M9 3l3 2 3-2 5 2.6-1.6 4-2-.8V21H6.6V8.8l-2 .8-1.6-4z" />
    </Svg>
  );
}

function IconCalendar() {
  return (
    <Svg>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
      <path d="M8 13.5h3M8 17h6" />
    </Svg>
  );
}

function IconDocument() {
  return (
    <Svg>
      <path d="M14 2.5H6.5A1.5 1.5 0 005 4v16a1.5 1.5 0 001.5 1.5h11A1.5 1.5 0 0019 20V7.5z" />
      <path d="M14 2.5v5h5" />
      <path d="M8.5 12h7M8.5 15.5h7M8.5 19h4" />
    </Svg>
  );
}

function IconSend() {
  return (
    <Svg>
      <path d="M21.5 2.5L2.5 9.8l7.6 2.9 2.9 7.6z" />
      <path d="M21.5 2.5l-11.4 10.2" />
    </Svg>
  );
}
