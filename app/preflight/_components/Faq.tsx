"use client";

import { useId, useState } from "react";

// Section 10's accordion. Keyboard complete: each question is a real
// button with aria-expanded and aria-controls, and the answer panel is
// hidden with the hidden attribute rather than display, so a screen
// reader tracks it the same way sighted users do.

export type FaqItem = { q: string; a: string };

export default function Faq({
  items,
  startOpen = 0,
}: {
  items: FaqItem[];
  startOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(startOpen);
  const baseId = useId();

  return (
    <div>
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div className="pf-faq-item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={buttonId}
                className="pf-faq-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span>{item.q}</span>
                <span className="pf-faq-sign" aria-hidden="true">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    style={{
                      stroke: "currentColor",
                      strokeWidth: 1.8,
                      fill: "none",
                      strokeLinecap: "round",
                      display: "block",
                    }}
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </button>
            </h3>
            <section id={panelId} aria-labelledby={buttonId} hidden={!expanded}>
              <p className="pf-faq-answer">{item.a}</p>
            </section>
          </div>
        );
      })}
    </div>
  );
}
