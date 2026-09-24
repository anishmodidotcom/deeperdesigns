// The Preflight delivery email (v29.4).
//
// v30.2: the table chrome, palette and row helpers moved to
// lib/email-shell.ts so the audit confirmation is built from the same
// pieces. The rendered message is unchanged.
//
// A plain-text alternative is built from the same content and sent
// alongside, so a text-only client and a spam filter both see the real
// message rather than an empty body.

import { WHATSAPP_NUMBER } from "@/lib/contact";
import type { BillingDetails } from "@/lib/gstin";
import {
  accentRow,
  billingRows,
  billingText,
  buttonRow,
  eyebrowRow,
  footerRows,
  headingRow,
  paragraph,
  rule,
  shell,
  smallHeading,
  spacerRow,
  tickRows,
  wordmarkRow,
} from "@/lib/email-shell";

export const DELIVERY_SUBJECT = "Your Preflight download";

const INSIDE = [
  "Five audit protocols",
  "The operator guide",
  "Four checklists, 104 items",
  "The report template",
  "Field notes, 26 findings",
  "The changelog, dated",
];

const FOOTER_LINES = [
  `Questions, reply to this email or WhatsApp ${WHATSAPP_NUMBER}.`,
  "Deeper Designs Private Limited · Delhi and Dubai · deeperdesigns.in",
  "Preflight is provided as-is for use against your own systems. No refunds on digital downloads.",
];

const BODY_LINK =
  "Your download link is below. It is personal to you and valid for seven days. If it expires, reply to this email and we will send a fresh one.";
const BODY_START =
  "Open the operator guide first. It covers the access you need, the run order, and how to read a verdict. Then run Security hardening. It is the protocol most likely to change what you ship next.";
const BODY_REFRESH =
  "Refreshes ship for 12 months as CVEs, standards and framework versions move. You will get an email each time.";
// v34: the edition line, immediately after the refresh paragraph, so a
// buyer knows which edition they hold and that the next one lands in the
// same place.
const BODY_EDITION =
  "You are on the September 2026 edition. Refreshes land in this same folder for twelve months.";
const ACCENT = "Audit your product before your users do.";

export function deliveryHtml(
  name: string,
  link: string,
  billing: BillingDetails = { companyName: "", companyAddress: "", gstin: "" },
): string {
  return shell({
    title: DELIVERY_SUBJECT,
    preheader: "Your download link is inside, valid for seven days.",
    rows: [
      wordmarkRow(),
      eyebrowRow("YOUR PREFLIGHT DOWNLOAD"),
      headingRow(`Thank you, ${name}. Preflight is ready.`),
      paragraph(BODY_LINK, 15),
      buttonRow(link, "Download Preflight"),
      rule(),
      smallHeading("WHAT IS INSIDE"),
      tickRows(INSIDE),
      spacerRow(28),
      smallHeading("WHERE TO START"),
      paragraph(BODY_START, 15),
      rule(),
      paragraph(BODY_REFRESH, 14),
      paragraph(BODY_EDITION, 14),
      accentRow(ACCENT),
      billingRows(billing),
      footerRows(FOOTER_LINES),
    ].join("\n"),
  });
}

// The same message as text. Sent as the alternative part, so a text-only
// client shows the real content and the link stays clickable.
export function deliveryText(
  name: string,
  link: string,
  billing: BillingDetails = { companyName: "", companyAddress: "", gstin: "" },
): string {
  return `YOUR PREFLIGHT DOWNLOAD

Thank you, ${name}. Preflight is ready.

${BODY_LINK}

Download Preflight:
${link}

WHAT IS INSIDE
${INSIDE.map((i) => `- ${i}`).join("\n")}

WHERE TO START
${BODY_START}

${BODY_REFRESH}

${BODY_EDITION}

${ACCENT}
${billingText(billing)}
${FOOTER_LINES.join("\n")}
`;
}
