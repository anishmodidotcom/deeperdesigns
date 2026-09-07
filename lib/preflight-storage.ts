// Signed download links from Supabase Storage (v29.4).
//
// v29.3 emailed every buyer the same Google Drive link. One buyer could
// pass it on and the whole product walked. This signs a per-request URL
// against a private bucket instead: the link is unique to the send, it
// expires, and revoking is a matter of rotating the object.
//
// The Storage REST API is called directly with fetch rather than adding
// @supabase/supabase-js, which is a large dependency for one signature.
// Same reasoning as lib/preflight-sheets.ts.
//
// Bucket and object (created once, by hand, in the Supabase dashboard):
//   bucket: preflight-deliveries   (PRIVATE, not public)
//   object: preflight-audit-suite/current.zip
// A refresh replaces the object at that key; the key never changes, so
// nothing here or in the product record moves.
//
// SERVER ONLY. SUPABASE_SERVICE_ROLE_KEY bypasses row-level security and
// must never reach a browser.

export const SIGNED_URL_TTL_SECONDS = 7 * 24 * 60 * 60;

export type SignedLink = {
  url: string;
  /** When the link stops working. */
  expiresAt: Date;
};

export function isStorageConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

// Creates a signed URL for one object. Throws on any failure; the caller
// decides whether to fall back.
export async function signDownloadUrl(
  objectKey: string,
  ttlSeconds: number = SIGNED_URL_TTL_SECONDS,
): Promise<SignedLink> {
  const base = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!base || !key) throw new Error("supabase_not_configured");
  if (!objectKey.trim()) throw new Error("object_key_missing");

  const bucket = process.env.PREFLIGHT_DELIVERY_BUCKET ?? "preflight-deliveries";
  const origin = base.replace(/\/+$/, "");
  const path = objectKey.replace(/^\/+/, "");

  const res = await fetch(
    `${origin}/storage/v1/object/sign/${encodeURIComponent(bucket)}/${path
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${key}`,
        apikey: key,
        "content-type": "application/json",
      },
      body: JSON.stringify({ expiresIn: ttlSeconds }),
    },
  );

  if (!res.ok) {
    throw new Error(
      `supabase_sign_${res.status}: ${(await res.text()).slice(0, 200)}`,
    );
  }

  // Supabase has returned this field as both signedURL and signedUrl
  // across versions. Accept either rather than break on an upgrade.
  const body = (await res.json()) as {
    signedURL?: string;
    signedUrl?: string;
  };
  const signed = body.signedURL ?? body.signedUrl;
  if (!signed) throw new Error("supabase_sign_no_url");

  // The API returns a path relative to /storage/v1.
  const url = signed.startsWith("http")
    ? signed
    : `${origin}/storage/v1${signed.startsWith("/") ? "" : "/"}${signed}`;

  return {
    url,
    expiresAt: new Date(Date.now() + ttlSeconds * 1000),
  };
}
