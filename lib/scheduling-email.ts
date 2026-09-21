// The "scheduling" confirmation (v33).
//
// Sent for a product whose deliveryTemplate is "scheduling": nothing is
// attached and nothing is downloaded, because what the buyer paid for is
// time. It confirms the payment, gives them a way to book it themselves,
// and carries the receipt so it stands as their record of the purchase.
//
// Same shell as the Preflight delivery email, so both messages are one
// design rather than two that resemble each other. Copy is final and
// verbatim.

import type { BillingDetails } from "@/lib/gstin";
import {
  SANS,
  billingRows,
  billingText,
  buttonRow,
  esc,
  eyebrowRow,
  footerRows,
  headingRow,
  paragraph,
  rule,
  shell,
  spacerRow,
  wordmarkRow,
} from "@/lib/email-shell";

export const SCHEDULING_SUBJECT = "Your Claude Setup Intensive is booked";

const EYEBROW = "CLAUDE SETUP INTENSIVE";
const BODY =
  "Anish will be in touch to schedule it. If you would rather pick a time now, use the link below.";
const BUTTON = "Choose a time";
const BRING =
  "Bring the work you actually want to set up. The session is more useful with a real problem in front of us.";
const FOOTER_LINES = ["Questions, reply to this email."];

export type SchedulingArgs = {
  name: string;
  schedulingUrl: string;
  receiptLine: string;
  paymentId: string;
  billing: BillingDetails;
};

function receiptBlock(args: SchedulingArgs): string {
  const line = (text: string, strong = false) =>
    `<tr><td style="font-family:${SANS};font-size:14px;line-height:1.6;color:${strong ? "#0A0A0B" : "#6B6B75"};padding:0 0 4px 0;">${esc(text)}</td></tr>`;
  return (
    line(args.receiptLine, true) +
    line(`Payment id ${args.paymentId}`) +
    billingRows(args.billing)
  );
}

export function schedulingHtml(args: SchedulingArgs): string {
  return shell({
    title: SCHEDULING_SUBJECT,
    preheader: BODY,
    rows: [
      wordmarkRow(),
      eyebrowRow(EYEBROW),
      headingRow(`Thank you, ${args.name}. Your session is paid for.`),
      paragraph(BODY, 15),
      buttonRow(args.schedulingUrl, BUTTON),
      spacerRow(28),
      paragraph(BRING, 15),
      rule(),
      receiptBlock(args),
      spacerRow(20),
      footerRows(FOOTER_LINES),
    ].join("\n"),
  });
}

export function schedulingText(args: SchedulingArgs): string {
  return `${EYEBROW}

Thank you, ${args.name}. Your session is paid for.

${BODY}

${BUTTON}:
${args.schedulingUrl}

${BRING}

${args.receiptLine}
Payment id ${args.paymentId}
${billingText(args.billing)}
${FOOTER_LINES.join("\n")}
`;
}
