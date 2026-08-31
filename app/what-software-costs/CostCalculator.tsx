"use client";

import { useId, useState } from "react";
import {
  COST_ROWS,
  formatInr,
  rentedTotal,
} from "@/lib/software-costs";

// v26 Part 8: the calculator. No lead gate: it works fully without giving
// any details. Ranges only on the build side, no fake precision.

export default function CostCalculator() {
  const [people, setPeople] = useState(10);
  const [categoryId, setCategoryId] = useState(COST_ROWS[0].id);
  const [years, setYears] = useState(5);
  const uid = useId();

  const row = COST_ROWS.find((r) => r.id === categoryId) ?? COST_ROWS[0];
  const safePeople = Number.isFinite(people) && people > 0 ? Math.floor(people) : 1;
  const safeYears = Number.isFinite(years) && years > 0 ? Math.floor(years) : 1;
  const rented = rentedTotal(row, safePeople, safeYears);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "14px",
        background: "var(--bg-elev)",
        padding: "clamp(20px, 4vw, 36px)",
      }}
    >
      <div className="calc-inputs">
        <div>
          <label
            htmlFor={`${uid}-people`}
            className="mono"
            style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: "10px" }}
          >
            Team size
          </label>
          <input
            id={`${uid}-people`}
            className="calc-field"
            type="number"
            min={1}
            max={5000}
            inputMode="numeric"
            value={people}
            onChange={(e) => setPeople(Number(e.target.value))}
          />
        </div>
        <div>
          <label
            htmlFor={`${uid}-category`}
            className="mono"
            style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: "10px" }}
          >
            Software
          </label>
          <select
            id={`${uid}-category`}
            className="calc-field"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {COST_ROWS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor={`${uid}-years`}
            className="mono"
            style={{ display: "block", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-dim)", marginBottom: "10px" }}
          >
            Years
          </label>
          <input
            id={`${uid}-years`}
            className="calc-field"
            type="number"
            min={1}
            max={20}
            inputMode="numeric"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="calc-out" aria-live="polite">
        <div>
          <p className="calc-out-label">
            Rented, {row.vendor} {row.plan}, over {safeYears}{" "}
            {safeYears === 1 ? "year" : "years"}
          </p>
          <p className="calc-out-value">{formatInr(rented)}</p>
          <p className="calc-out-note">{row.assumption}</p>
        </div>
        <div>
          <p className="calc-out-label">Built once and owned</p>
          <p className="calc-out-value" style={{ color: "var(--accent)" }}>
            {formatInr(row.buildLow)} to {formatInr(row.buildHigh)}
          </p>
          <p className="calc-out-note">{row.buildTier}, one time</p>
        </div>
      </div>

      <p
        style={{
          marginTop: "24px",
          fontSize: "14px",
          lineHeight: 1.6,
          color: "var(--fg-dim)",
        }}
      >
        Rented figures use current public list prices. Build figures are
        typical ranges, and your exact number comes in writing before we
        start.
      </p>

      <style>{`
        .calc-inputs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .calc-field {
          width: 100%;
          padding: 13px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-strong);
          border-radius: 10px;
          color: var(--fg);
          font-size: 16px;
          font-family: inherit;
        }
        .calc-field:focus-visible {
          outline: 2px solid var(--dd-indigo-soft, #818CF8);
          outline-offset: 2px;
          border-color: var(--dd-indigo, #7C6CFF);
        }
        .calc-out {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 32px;
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }
        .calc-out-label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--fg-dim);
          margin: 0 0 10px;
        }
        .calc-out-value {
          font-size: clamp(24px, 3.4vw, 34px);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--fg);
          margin: 0 0 8px;
        }
        .calc-out-note {
          font-size: 13px;
          line-height: 1.5;
          color: var(--fg-muted);
          margin: 0;
        }
        @media (max-width: 640px) {
          .calc-inputs { grid-template-columns: 1fr; }
          .calc-out { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>
    </div>
  );
}
