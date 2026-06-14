import React from "react";

// Renders a headline string, applying the Instrument Serif italic editorial
// accent to any span wrapped in {serif}...{/serif} markers. The literal
// braces never reach the DOM.
//
// Example: "Your ads work. Your margin {serif}doesn't.{/serif}"
export function renderSerif(text: string): React.ReactNode {
  const parts = text.split(/\{serif\}|\{\/serif\}/);
  // Odd indices are the wrapped (serif) segments.
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        style={{
          fontFamily:
            "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          // Slightly larger optical size so the serif italic reads as an
          // editorial accent, not a font glitch. Inherits color by default.
          letterSpacing: "0",
        }}
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}

// Renders a bullet/body string, turning <b>...</b> markers into a
// medium-weight high-contrast emphasis span (not browser-default bold).
export function renderBold(text: string): React.ReactNode {
  const parts = text.split(/<b>|<\/b>/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span
        key={i}
        style={{ fontWeight: 500, color: "var(--dd-text-high, #F5F5F5)" }}
      >
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  );
}
