// Reading a buyer's own receipt details back (v33).
//
// The thank-you page shows the company name and GSTIN when the buyer
// asked for an invoice, so their confirmation doubles as a record of
// what was billed to whom. The values come from the payment's own notes
// on Razorpay, which is the authoritative copy and the same one
// fulfilment writes to the sheet.
//
// Fails closed. Any error, missing credential or unrecognised response
// returns empty billing, and the page renders exactly as it did before
// v33. A receipt is never worth a 500.
//
// Only the company name and the GSTIN are surfaced. The address is
// captured for the invoice and stays in the sheet and the seller's
// notification.

import { EMPTY_BILLING, type BillingDetails } from "@/lib/gstin";
import { fetchRazorpayPayment } from "@/lib/preflight-fulfil";

export async function lookupBilling(
  paymentId: string | null,
): Promise<BillingDetails> {
  if (!paymentId) return EMPTY_BILLING;
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return EMPTY_BILLING;
  }
  try {
    const payment = await fetchRazorpayPayment(paymentId);
    const notes = payment.notes ?? {};
    return {
      companyName: notes.company_name ?? "",
      companyAddress: notes.company_address ?? "",
      gstin: notes.gstin ?? "",
    };
  } catch {
    return EMPTY_BILLING;
  }
}
