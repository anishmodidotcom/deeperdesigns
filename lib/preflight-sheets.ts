// Google Sheets append for the Preflight fulfilment queue (v29).
//
// One row per paid order, in the fixed column order below. A later Cowork
// task reads this sheet, sends the package, and fills sent_at / sent_by.
// The schema is fixed: never reorder, never insert a column in the middle.
//
//   timestamp | name | email | note | amount | currency |
//   razorpay_payment_id | razorpay_order_id | status | sent_at | sent_by
//
// Auth is a service account. Rather than pull in googleapis (a very large
// dependency for one append), this signs the RS256 JWT with node:crypto
// and exchanges it for an access token. Tokens are cached in module scope
// for their lifetime minus a minute of slack.

import { createSign } from "node:crypto";

// The column order is the one the append below writes, and SheetRow is
// the schema. A parallel SHEET_COLUMNS array used to sit here restating
// it; nothing ever read it, so it is gone rather than left to drift.
export type SheetRow = {
  timestamp: string;
  name: string;
  email: string;
  note: string;
  amount: number;
  currency: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  status: string;
  sent_at: string;
  sent_by: string;
};

type ServiceAccount = {
  client_email: string;
  private_key: string;
};

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

// v29.1: the env var takes the service account key in either form. A
// value whose first non-whitespace character is "{" is parsed as JSON
// straight off; anything else is base64-decoded first. Base64 is still
// the safer paste, because a raw key file has newlines inside the
// private key that some dashboard fields mangle, but requiring it was an
// extra step for no gain when the field does preserve them.
export function decodeServiceAccount(raw: string): ServiceAccount | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const json = trimmed.startsWith("{")
      ? trimmed
      : Buffer.from(trimmed, "base64").toString("utf8");
    const parsed = JSON.parse(json) as Partial<ServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) return null;
    return {
      client_email: parsed.client_email,
      // A key pasted as a JSON string carries literal backslash-n rather
      // than real newlines. node:crypto needs the real thing.
      private_key: parsed.private_key.replace(/\\n/g, "\n"),
    };
  } catch {
    return null;
  }
}

function readServiceAccount(): ServiceAccount | null {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  return decodeServiceAccount(raw);
}

// v29.2: the sheet is a property of the product, so callers pass its id
// rather than this module reaching for one global variable.
export function isSheetsConfigured(sheetId: string | undefined): boolean {
  return Boolean(sheetId?.trim() && readServiceAccount());
}

function base64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

let cachedToken: { value: string; expiresAt: number } | null = null;

async function accessToken(account: ServiceAccount): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.value;
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(
    JSON.stringify({
      iss: account.client_email,
      scope: SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  signer.end();
  const signature = base64url(signer.sign(account.private_key));
  const assertion = `${header}.${claims}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  if (!res.ok) {
    throw new Error(`google_token_${res.status}: ${(await res.text()).slice(0, 200)}`);
  }
  const body = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: body.access_token,
    expiresAt: Date.now() + (body.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

// The first sheet of the spreadsheet. A1 notation without a sheet name
// targets the first visible sheet, which is what the spec asks for.
const RANGE = "A1";

export async function appendSheetRow(
  sheetId: string | undefined,
  row: SheetRow,
): Promise<void> {
  const account = readServiceAccount();
  if (!account || !sheetId) {
    throw new Error("sheets_not_configured");
  }

  const token = await accessToken(account);
  const values = [
    [
      row.timestamp,
      row.name,
      row.email,
      row.note,
      row.amount,
      row.currency,
      row.razorpay_payment_id,
      row.razorpay_order_id,
      row.status,
      row.sent_at,
      row.sent_by,
    ],
  ];

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/${encodeURIComponent(RANGE)}:append` +
    `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ values }),
  });
  if (!res.ok) {
    throw new Error(`sheets_append_${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

// KV-unavailable fallback path. Reads the payment id column and reports
// whether this payment has already been written, so a double fulfilment
// is still prevented when the idempotency key cannot be set.
export async function sheetHasPayment(
  sheetId: string | undefined,
  paymentId: string,
): Promise<boolean> {
  const account = readServiceAccount();
  if (!account || !sheetId) return false;

  const token = await accessToken(account);
  // Column G is razorpay_payment_id in the fixed schema above.
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/${encodeURIComponent("G:G")}`;
  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`sheets_read_${res.status}`);
  }
  const body = (await res.json()) as { values?: string[][] };
  return (body.values ?? []).some((r) => r[0] === paymentId);
}

// v29.3: delivery bookkeeping. The buyer's download email writes back to
// the row it was sent for, so sent_at doubles as the guard that stops a
// second send for the same payment.
//
// v29.4: the read widened from G:K to A:K, because delivery now also
// needs the buyer's name and email (for a re-send) and the note column
// (to record the link expiry). The Sheet schema is fixed, so the expiry
// and any re-send are appended to note rather than given columns.
//
// Column letters follow the fixed schema at the top of this file:
//   D note · G razorpay_payment_id · I status · J sent_at · K sent_by
const NOTE_COL = "D";
const SENT_AT_COL = "J";
const SENT_BY_COL = "K";

// Zero-based offsets into a row read from column A.
const IDX = { name: 1, email: 2, note: 3, paymentId: 6, sentAt: 9, sentBy: 10 };

export type SheetRowRef = {
  /** 1-based row number, as Sheets addresses it. */
  rowNumber: number;
  name: string;
  email: string;
  note: string;
  /** Empty string when the row has not been delivered yet. */
  sentAt: string;
  sentBy: string;
};

// Finds a payment's row and reports what delivery needs to know about
// it. Returns null when the payment is not on the sheet at all.
export async function findSheetRow(
  sheetId: string | undefined,
  paymentId: string,
): Promise<SheetRowRef | null> {
  const account = readServiceAccount();
  if (!account || !sheetId) return null;

  const token = await accessToken(account);
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values/${encodeURIComponent(`A:${SENT_BY_COL}`)}`;
  const res = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`sheets_read_${res.status}`);
  }
  const body = (await res.json()) as { values?: string[][] };
  const rows = body.values ?? [];
  // Sheets omits trailing empty cells, so sent_at and sent_by can be
  // absent from the array entirely rather than present and empty.
  const index = rows.findIndex((r) => r[IDX.paymentId] === paymentId);
  if (index === -1) return null;
  const row = rows[index];
  const cell = (i: number) => (row[i] ?? "").trim();
  return {
    rowNumber: index + 1,
    name: cell(IDX.name),
    email: cell(IDX.email),
    note: row[IDX.note] ?? "",
    sentAt: cell(IDX.sentAt),
    sentBy: cell(IDX.sentBy),
  };
}

// Writes a set of individual cell ranges in one request. batchUpdate is
// used rather than several PUTs so nothing between the note column and
// the delivery columns can be touched by accident.
async function writeCells(
  sheetId: string,
  token: string,
  data: { range: string; values: string[][] }[],
): Promise<void> {
  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}` +
    `/values:batchUpdate`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ valueInputOption: "RAW", data }),
  });
  if (!res.ok) {
    throw new Error(
      `sheets_update_${res.status}: ${(await res.text()).slice(0, 300)}`,
    );
  }
}

// Stamps sent_at and sent_by, and optionally rewrites the note. Writes
// only those cells, so it can never disturb the sale data beside them.
export async function markSheetRowSent(
  sheetId: string | undefined,
  rowNumber: number,
  sentAt: string,
  sentBy: string,
  note?: string,
): Promise<void> {
  const account = readServiceAccount();
  if (!account || !sheetId) {
    throw new Error("sheets_not_configured");
  }

  const token = await accessToken(account);
  const data: { range: string; values: string[][] }[] = [
    {
      range: `${SENT_AT_COL}${rowNumber}:${SENT_BY_COL}${rowNumber}`,
      values: [[sentAt, sentBy]],
    },
  ];
  if (note !== undefined) {
    data.push({ range: `${NOTE_COL}${rowNumber}`, values: [[note]] });
  }
  await writeCells(sheetId, token, data);
}

// v29.4: used by the re-send route, which changes the note without
// touching sent_at (the original delivery still stands).
export async function updateSheetNote(
  sheetId: string | undefined,
  rowNumber: number,
  note: string,
): Promise<void> {
  const account = readServiceAccount();
  if (!account || !sheetId) {
    throw new Error("sheets_not_configured");
  }
  const token = await accessToken(account);
  await writeCells(sheetId, token, [
    { range: `${NOTE_COL}${rowNumber}`, values: [[note]] },
  ]);
}
