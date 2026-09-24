// The Preflight refresh email (v34).
//
// Sent to existing buyers when a new edition lands in their folder. This
// is the template only: nothing routes to it in this pass, so no send
// path imports it yet.
//
// Built on the shared shell in lib/email-shell.ts, so it renders as the
// same message as the delivery email, and ships a plain-text alternative
// from the same content.

import {
  buttonRow,
  eyebrowRow,
  footerRows,
  headingRow,
  paragraph,
  rule,
  shell,
  wordmarkRow,
} from "@/lib/email-shell";

export const REFRESH_SUBJECT =
  "Preflight September 2026 edition is in your folder";

const BODY_LINES = [
  "It is the first scheduled refresh you were promised.",
  "What changed: framework version gates for the August Next.js criticals, Firebase and other backends, mobile apps, a deployment-safety layer, 670 checks up from 592.",
  "The folder link is below. Sign off from Deeper Designs.",
];

const BUTTON_LABEL = "Open the folder";
const FOOTER_LINES = ["Deeper Designs"];

// The folder the buyer already has. Resolved at call time rather than at
// module load, so the template follows the same env contract as the rest
// of the Preflight delivery path.
function folderLink(): string {
  return process.env.PREFLIGHT_DELIVERY_URL ?? "";
}

export function refreshHtml(link: string = folderLink()): string {
  return shell({
    title: REFRESH_SUBJECT,
    preheader: BODY_LINES[0],
    rows: [
      wordmarkRow(),
      eyebrowRow("PREFLIGHT SEPTEMBER 2026 EDITION"),
      headingRow(REFRESH_SUBJECT),
      ...BODY_LINES.map((line) => paragraph(line, 15)),
      buttonRow(link, BUTTON_LABEL),
      rule(),
      footerRows(FOOTER_LINES),
    ].join("\n"),
  });
}

export function refreshText(link: string = folderLink()): string {
  return `PREFLIGHT SEPTEMBER 2026 EDITION

${REFRESH_SUBJECT}

${BODY_LINES.join("\n\n")}

${BUTTON_LABEL}:
${link}

${FOOTER_LINES.join("\n")}
`;
}
