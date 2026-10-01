// v35 part 1: hero hook selection, per request, before the homepage
// renders.
//
// Next 16 renamed the middleware file convention to proxy; see
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md.
//
// Why here rather than in the page: a page render cannot set a cookie,
// and the session cookie has to exist before the line is chosen, or the
// first request of a session would have nothing to hash. The proxy sets
// the cookie and hands the chosen line down as a request header, so the
// page reads one value and does no picking of its own.

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  FORCED_COOKIE,
  HOOK_COOKIE,
  HOOK_HEADER,
  SESSION_COOKIE,
  hookForSession,
  normaliseHook,
} from "@/lib/hero-hooks";

// Only the homepage carries the hook. Everything else is untouched, so
// no other route pays for this.
export const config = { matcher: "/" };

function newSessionId(): string {
  return crypto.randomUUID();
}

export function proxy(request: NextRequest) {
  const existingSession = request.cookies.get(SESSION_COOKIE)?.value;
  const sessionId = existingSession || newSessionId();

  // ?h=1..5 wins and is remembered for the session, so an ad's message
  // match survives a click into the site and back. Anything else falls
  // through to the hash.
  const fromQuery = normaliseHook(request.nextUrl.searchParams.get("h"));
  const fromCookie = normaliseHook(request.cookies.get(FORCED_COOKIE)?.value);
  const hook = fromQuery ?? fromCookie ?? hookForSession(sessionId);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HOOK_HEADER, String(hook));

  const response = NextResponse.next({ request: { headers: requestHeaders } });

  // Session cookies: no maxAge, so they end with the browser. Lax is
  // enough, because nothing here is a credential and the value only
  // decides a headline.
  const base = { path: "/", sameSite: "lax", httpOnly: false } as const;
  if (!existingSession) {
    response.cookies.set({ ...base, name: SESSION_COOKIE, value: sessionId });
  }
  if (fromQuery) {
    response.cookies.set({ ...base, name: FORCED_COOKIE, value: String(fromQuery) });
  }
  // Written every time, so the browser's PageView reports the line that
  // was actually rendered rather than recomputing it.
  response.cookies.set({ ...base, name: HOOK_COOKIE, value: String(hook) });

  return response;
}
