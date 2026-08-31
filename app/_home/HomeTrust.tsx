import Link from "next/link";
import { renderSerif } from "@/components/industry/text";

// v28 Part 5: the homepage summary of /trust, placed after the product
// architecture section. Same rule as the page itself: no response time, no
// resolution time, no uptime percentage. Nothing here is a commitment we
// have not confirmed.

export default function HomeTrust() {
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
          {renderSerif("Built to be secure, {serif}and to outlast us.{/serif}")}
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "760px",
            margin: "0 0 28px",
          }}
        >
          Proper access control, encrypted and backed up data, real cloud
          infrastructure, and a WhatsApp number that answers when something
          breaks. You own the code and the data, documented and handed over
          whenever you ask.
        </p>
        <p style={{ margin: 0 }}>
          <Link href="/trust" style={{ color: "var(--accent)", fontSize: "17px" }}>
            How we build and support it →
          </Link>
        </p>
      </div>
    </section>
  );
}
