import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en"];
const defaultLocale = "tr";

function getPreferredLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language") || "";
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, quality] = lang.trim().split(";q=");
      return {
        code: code.trim().toLowerCase().split("-")[0],
        quality: quality ? parseFloat(quality) : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { code } of preferred) {
    if (locales.includes(code)) {
      return code;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect to locale-prefixed URL
  const locale = getPreferredLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets (images, svgs, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
