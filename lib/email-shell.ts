// The shared shell for the transactional emails (v30.2).
//
// Built for email clients, not browsers: nested tables for layout, every
// style inline, no external stylesheet, no web font, images by absolute
// https URL. Gmail strips <style> blocks and <head>, Outlook renders
// through Word's engine and ignores most modern CSS, so neither flexbox
// nor a class attribute survives. What is here is the subset all three of
// Gmail, Outlook and Apple Mail agree on.
//
// It was written for the Preflight delivery email in v29.4 and lifted out
// unchanged in v30.2 so the audit confirmation is the same email, not a
// second one that looks similar.

export const BG = "#F5F3EF";
export const CARD = "#FFFFFF";
export const BORDER = "#E6E3DC";
export const INK = "#0A0A0B";
export const MUTED = "#6B6B75";
export const INDIGO = "#7C6CFF";

// Absolute, because an email has no origin to resolve a relative path
// against. Served from the site's public folder.
export const SITE = "https://www.deeperdesigns.in";
export const WORDMARK = `${SITE}/brand/wordmark-email.png`;

export const SANS =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
export const SERIF = "Georgia,'Times New Roman',serif";

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function rule(): string {
  return `<tr><td style="padding:28px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px;line-height:1px;font-size:0;background-color:${BORDER};">&nbsp;</td></tr></table></td></tr>`;
}

export function smallHeading(text: string): string {
  return `<tr><td style="font-family:${SANS};font-size:13px;line-height:1.4;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};padding:0 0 14px 0;">${esc(text)}</td></tr>`;
}

export function paragraph(text: string, size: number): string {
  return `<tr><td style="font-family:${SANS};font-size:${size}px;line-height:1.6;color:${INK};padding:0 0 20px 0;">${esc(text)}</td></tr>`;
}

export function wordmarkRow(): string {
  return `<tr><td style="padding:0 0 28px 0;"><img src="${WORDMARK}" width="140" alt="Deeper Designs" style="display:block;width:140px;max-width:140px;height:auto;border:0;outline:none;text-decoration:none;" /></td></tr>`;
}

export function eyebrowRow(text: string): string {
  return `<tr><td style="font-family:${SANS};font-size:11px;line-height:1.4;letter-spacing:0.14em;text-transform:uppercase;color:${MUTED};padding:0 0 12px 0;">${esc(text)}</td></tr>`;
}

export function headingRow(text: string): string {
  return `<tr><td style="font-family:${SANS};font-size:26px;line-height:1.25;font-weight:600;color:${INK};padding:0 0 18px 0;">${esc(text)}</td></tr>`;
}

// The single indigo button. One per email, by design: an email with two
// equal calls to action has none.
export function buttonRow(href: string, label: string): string {
  return `<tr><td style="padding:4px 0 0 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" bgcolor="${INDIGO}" style="background-color:${INDIGO};border-radius:8px;height:48px;"><a href="${esc(href)}" target="_blank" style="display:block;height:48px;line-height:48px;font-family:${SANS};font-size:15px;font-weight:600;color:#FFFFFF;text-decoration:none;text-align:center;">${esc(label)}</a></td></tr></table></td></tr>`;
}

// Each ticked line is its own two-column row: the tick cell is fixed
// width so the text hangs in a straight column, which a bullet character
// cannot guarantee across clients.
export function tickRows(items: readonly string[]): string {
  return items
    .map(
      (item) =>
        `<tr><td style="padding:0 0 10px 0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="22" valign="top" style="width:22px;font-family:${SANS};font-size:15px;line-height:1.5;color:${INDIGO};">&#10003;</td><td valign="top" style="font-family:${SANS};font-size:15px;line-height:1.5;color:${INK};">${esc(item)}</td></tr></table></td></tr>`,
    )
    .join("");
}

export function spacerRow(height: number): string {
  return `<tr><td style="height:${height}px;line-height:${height}px;font-size:0;">&nbsp;</td></tr>`;
}

export function accentRow(text: string): string {
  return `<tr><td style="font-family:${SERIF};font-style:italic;font-size:18px;line-height:1.5;color:${INK};padding:0 0 28px 0;">${esc(text)}</td></tr>`;
}

export function footerRows(lines: readonly string[]): string {
  return lines
    .map(
      (line) =>
        `<tr><td style="font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};padding:0 0 6px 0;">${esc(line)}</td></tr>`,
    )
    .join("");
}

// The document around the rows: background, centred card, and the
// preheader line the inbox list shows beside the subject.
export function shell(args: {
  title: string;
  preheader: string;
  rows: string;
}): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(args.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:${BG};">
<!-- Preheader: what the inbox list shows beside the subject. Hidden in
     the message itself. -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${esc(args.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BG};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${CARD};border:1px solid ${BORDER};border-radius:4px;">
        <tr>
          <td style="padding:32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${args.rows}
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
