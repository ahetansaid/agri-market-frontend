import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protege les routes /dashboard/* :
 *   - Verifie la presence du cookie ama_auth (defini lors du login/register)
 *   - Redirige vers /login?next=<current-path> si absent
 * Le JWT reste en localStorage cote client — le cookie est juste un signal
 * pour le middleware SSR.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  if (!isProtected) return NextResponse.next();

  const authCookie = req.cookies.get("ama_auth");
  if (!authCookie || authCookie.value !== "1") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
