// // middleware.ts file

import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, defaultLocale, locales, pathnames } from "./config";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  pathnames,
});

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // First, run the next-intl middleware
  const response = intlMiddleware(request);

  // Extract the pathname without the locale prefix
  const pathname = request.nextUrl.pathname;

  const pathnameWithoutLocale = locales.some((locale) =>
    pathname.startsWith(`/${locale}/`),
  )
    ? pathname.replace(/^\/[^/]+/, "")
    : pathname;

  // Check if the page is protected
  const isProtected = protectedPages.some((page) =>
    pathnameWithoutLocale.startsWith(page),
  );

  // Check if the current page is the login page
  const isLoginPage = pathnameWithoutLocale === "/auth/signin";

  if (isProtected && !token) {
    const locale = pathname.split("/")[1];
    const loginUrl = new URL(`/${locale}/auth/signin`, request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to home page if user is already signed in and trying to access login page
  if (isLoginPage && token) {
    const locale = pathname.split("/")[1];
    const homeUrl = new URL(`/${locale}`, request.url);
    return NextResponse.redirect(homeUrl);
  }

  return response;
}

// List your protected pages here
const protectedPages = ["/secret", "/profile"];

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(ar|en)/:path*",

    // Enable redirects that add missing locales
    "/((?!api|_next|_vercel|.*\\..*).*)",

    // Add protected routes
    "/secret",
    "/secret/:path*",
    "/(ar|en)/secret",
    "/(ar|en)/secret/:path*",
  ],
};
