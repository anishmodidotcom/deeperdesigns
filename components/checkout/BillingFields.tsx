"use client";

import { useId } from "react";
import {
  type BillingDetails,
  GSTIN_LENGTH,
  normalizeGstin,
} from "@/lib/gstin";

// The optional GST invoice control (v33).
//
// One collapsed checkbox, off by default and visually quiet. A buyer who
// ignores it has exactly the experience they had before: nothing about
// the existing fields, their order or their validation changes.
//
// Written once and used by both checkout forms. The two pages look
// nothing alike, so every visual decision arrives as a prop and none is
// baked in here.

export type BillingErrors = Partial<Record<keyof BillingDetails, string>>;

export default function BillingFields({
  open,
  onOpenChange,
  value,
  onChange,
  errors,
  inputClassName,
  labelStyle,
  errorStyle,
  toggleStyle,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: BillingDetails;
  onChange: (next: BillingDetails) => void;
  errors: BillingErrors;
  inputClassName: string;
  labelStyle: React.CSSProperties;
  errorStyle: React.CSSProperties;
  toggleStyle: React.CSSProperties;
}) {
  const ids = useId();
  const toggleId = `${ids}-gst`;
  const companyId = `${ids}-company`;
  const addressId = `${ids}-address`;
  const gstinId = `${ids}-gstin`;

  const set = (patch: Partial<BillingDetails>) =>
    onChange({ ...value, ...patch });

  const field = (
    id: string,
    label: string,
    key: keyof BillingDetails,
    node: React.ReactNode,
  ) => (
    <div style={{ display: "grid", gap: 9 }}>
      <label htmlFor={id} style={labelStyle}>
        {label}
      </label>
      {node}
      {errors[key] ? (
        <p id={`${id}-error`} style={errorStyle}>
          {errors[key]}
        </p>
      ) : null}
    </div>
  );

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <label htmlFor={toggleId} style={toggleStyle}>
        <input
          id={toggleId}
          type="checkbox"
          checked={open}
          onChange={(e) => onOpenChange(e.target.checked)}
          style={{ width: 16, height: 16, flexShrink: 0 }}
        />
        I need a GST invoice
      </label>

      {open ? (
        <div style={{ display: "grid", gap: 16 }}>
          {field(
            companyId,
            "Company name",
            "companyName",
            <input
              id={companyId}
              className={inputClassName}
              name="company_name"
              type="text"
              autoComplete="organization"
              value={value.companyName}
              maxLength={200}
              onChange={(e) => set({ companyName: e.target.value })}
              aria-invalid={errors.companyName ? true : undefined}
              aria-describedby={
                errors.companyName ? `${companyId}-error` : undefined
              }
            />,
          )}
          {field(
            addressId,
            "Company address",
            "companyAddress",
            <textarea
              id={addressId}
              className={inputClassName}
              name="company_address"
              rows={2}
              value={value.companyAddress}
              maxLength={250}
              onChange={(e) => set({ companyAddress: e.target.value })}
              style={{ resize: "vertical" }}
              aria-invalid={errors.companyAddress ? true : undefined}
              aria-describedby={
                errors.companyAddress ? `${addressId}-error` : undefined
              }
            />,
          )}
          {field(
            gstinId,
            "GSTIN",
            "gstin",
            <input
              id={gstinId}
              className={inputClassName}
              name="gstin"
              type="text"
              inputMode="text"
              autoCapitalize="characters"
              spellCheck={false}
              value={value.gstin}
              maxLength={GSTIN_LENGTH}
              // Upper-cased on the way in, so the field always shows the
              // form the validator and the invoice will use.
              onChange={(e) => set({ gstin: normalizeGstin(e.target.value) })}
              aria-invalid={errors.gstin ? true : undefined}
              aria-describedby={errors.gstin ? `${gstinId}-error` : undefined}
            />,
          )}
        </div>
      ) : null}
    </div>
  );
}
