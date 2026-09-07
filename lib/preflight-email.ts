// The Preflight delivery email (v29.4).
//
// Built for email clients, not browsers: nested tables for layout,
// every style inline, no external stylesheet, no web font, images by
// absolute https URL. Gmail strips <style> blocks and <head>, Outlook
// renders through Word's engine and ignores most modern CSS, so neither
// flexbox nor a class attribute survives. What is here is the subset all
// three of Gmail, Outlook and Apple Mail agree on.
//
// A plain-text alternative is built from the same content and sent
// alongside, so a text-only client and a spam filter both see the real
// message rather than an empty body.

import { WHATSAPP_NUMBER } from "@/lib/contact";

const BG = "#F5F3EF";
const CARD = "#FFFFFF";
const BORDER = "#E6E3DC";
const INK = "#0A0A0B";
const MUTED = "#6B6B75";
const INDIGO = "#7C6CFF";

// Absolute, because an email has no origin to resolve a relative path
// against. Served from the site's public folder.
const SITE = "https://www.deeperdesigns.in";
const WORDMARK = `${SITE}/brand/wordmark-email.png`;

const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const SERIF = "Georgia,'Times New Roman',serif";

export const DELIVERY_SUBJECT = "Your Preflight download";

const INSIDE = [
  "Five audit protocols",
  "The operator guide",
  "Four checklists, 61 items",
  "The report template",
  "Field notes, 16 findings",
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
const ACCENT = "Audit your product before your users do.";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rule(): string {
  return `<tr><td style="padding:28px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px;line-height:1px;font-size:0;background-color:${BORDER};">&nbsp;</td></tr></table></td></tr>`;
}

function smallHeading(text: string): string {
  return `<tr><td style="font-family:${SANS};font-size:13px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};padding:0 0 14px 0;">${esc(text)}</td></tr>`;
}

function paragraph(text: string, size: number): string {
  return `<tr><td style="font-family:${SANS};font-size:${size}px;line-height:1.6;color:${INK};padding:0 0 20px 0;">${esc(text)}</td></tr>`;
}

export function deliveryHtml(name: string, link: string): string {
  const safeLink = esc(link);

  // Each "inside" line is its own two-column row: the tick cell is fixed
  // width so the text hangs in a straight column, which a bullet
  // character cannot guarantee across clients.
  const insideRows = INSIDE.map(
    (item) =>
      `<tr><td style="padding:0 0 10px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="22" valign="top" style="width:22px;font-family:${SANS};font-size:15px;line-height:1.5;color:${INDIGO};">&#10003;</td><td valign="top" style="font-family:${SANS};font-size:15px;line-height:1.5;color:${INK};">${esc(item)}</td></tr></table></td></tr>`,
  ).join("");

  const footerRows = FOOTER_LINES.map(
    (line) =>
      `<tr><td style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};padding:0 0 6px 0;">${esc(line)}</td></tr>`,
  ).join("");

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(DELIVERY_SUBJECT)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};">
<!-- Preheader: what the inbox list shows beside the subject. Hidden in
     the message itself. -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">Your download link is inside, valid for seven days.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${CARD};border:1px solid ${BORDER};border-radius:4px;">
        <tr>
          <td style="padding:32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

              <tr>
                <td style="padding:0 0 28px 0;">
                  <img src="${WORDMARK}" width="140" alt="Deeper Designs" style="display:block;width:140px;max-width:140px;height:auto;border:0;outline:none;text-decoration:none;" />
                </td>
              </tr>

              <tr>
                <td style="font-family:${SANS};font-size:11px;line-height:1.4;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};padding:0 0 12px 0;">YOUR PREFLIGHT DOWNLOAD</td>
              </tr>

              <tr>
                <td style="font-family:${SANS};font-size:26px;line-height:1.25;font-weight:600;color:${INK};padding:0 0 18px 0;">${esc(`Thank you, ${name}. Preflight is ready.`)}</td>
              </tr>

              ${paragraph(BODY_LINK, 15)}

              <tr>
                <td style="padding:4px 0 0 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" bgcolor="${INDIGO}" style="background-color:${INDIGO};border-radius:8px;height:48px;">
                        <a href="${safeLink}" target="_blank" style="display:block;height:48px;line-height:48px;font-family:${SANS};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;text-align:center;">Download Preflight</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              ${rule()}

              ${smallHeading("WHAT IS INSIDE")}
              ${insideRows}

              <tr><td style="height:28px;line-height:28px;font-size:0;">&nbsp;</td></tr>

              ${smallHeading("WHERE TO START")}
              ${paragraph(BODY_START, 15)}

              ${rule()}

              ${paragraph(BODY_REFRESH, 14)}

              <tr>
                <td style="font-family:${SERIF};font-style:italic;font-size:18px;line-height:1.5;color:${INK};padding:0 0 28px 0;">${esc(ACCENT)}</td>
              </tr>

              ${footerRows}

            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// The same message as text. Sent as the alternative part, so a text-only
// client shows the real content and the link stays clickable.
export function deliveryText(name: string, link: string): string {
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

${ACCENT}

${FOOTER_LINES.join("\n")}
`;
}
