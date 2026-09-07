// The audit confirmation email (v30.2).
//
// Sent to the requester once a free-audit request is confirmed, on the
// same shell as the Preflight delivery email: light card, wordmark, one
// indigo button. Copy is final and verbatim.
//
// The preheader is the body line itself rather than a line written for
// the inbox list, because no preheader copy was supplied and inventing
// one would be inventing customer-facing copy.

import { WHATSAPP_HREF } from "@/lib/contact";
import {
  accentRow,
  buttonRow,
  eyebrowRow,
  footerRows,
  headingRow,
  paragraph,
  rule,
  shell,
  spacerRow,
  tickRows,
  wordmarkRow,
} from "@/lib/email-shell";

export const AUDIT_SUBJECT = "Your free business audit, next steps";

const EYEBROW = "YOUR FREE BUSINESS AUDIT";

const BODY =
  "We have your request and we will come back to you within a working day to set up the conversation. Here is what happens next.";

const NEXT = [
  "A thirty-minute conversation about how your business runs and what you want to change.",
  "For businesses that fit, a walkthrough of your processes, your team and your data.",
  "Findings in writing: where the opportunity is, what should change, and the number it should move. Yours whether you hire us or not.",
];

const SOONER = "If you want to talk sooner, message us on WhatsApp.";
const BUTTON = "Message us on WhatsApp";
const ACCENT = "Every project starts with a number.";

const FOOTER_LINES = [
  "Deeper Designs Private Limited · Delhi and Dubai · deeperdesigns.in",
  "Reply to this email at any time.",
];

export function auditHtml(name: string): string {
  return shell({
    title: AUDIT_SUBJECT,
    preheader: BODY,
    rows: [
      wordmarkRow(),
      eyebrowRow(EYEBROW),
      headingRow(`Thank you, ${name}. We are on it.`),
      paragraph(BODY, 15),
      tickRows(NEXT),
      spacerRow(28),
      paragraph(SOONER, 15),
      buttonRow(WHATSAPP_HREF, BUTTON),
      rule(),
      accentRow(ACCENT),
      footerRows(FOOTER_LINES),
    ].join("\n"),
  });
}

// The same message as text, sent as the alternative part.
export function auditText(name: string): string {
  return `${EYEBROW}

Thank you, ${name}. We are on it.

${BODY}

${NEXT.map((i) => `- ${i}`).join("\n")}

${SOONER}

${BUTTON}:
${WHATSAPP_HREF}

${ACCENT}

${FOOTER_LINES.join("\n")}
`;
}
