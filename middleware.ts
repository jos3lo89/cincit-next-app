import { NextResponse } from "next/server";
import { auth } from "./auth";

const roleRedirects: Record<string, string> = {
  ADMINISTRATOR: "/private/admin",
  INSCRIBER: "/private/attendance",
  PARTICIPANT: "/inscription-state",
};

const allowedRoutesByRole: Record<string, string[]> = {
  ADMINISTRATOR: [
    "/private/admin",
    "/private/attendance",
    "/private/inscriptions/pending",
    "/private/inscriptions/approved",
    "/private/inscriptions/rejected",
    "/private/inscriptions/all",
    "/private/inscriptions/me",
    "/private/user/profile",
    "/private/user/change-role",
    "/private/attendance-control",
    "/private/reports",
  ],
  INSCRIBER: [
    "/private/attendance",
    "/private/attendance-call",
    "/private/inscriptions/pending",
    "/private/inscriptions/approved",
    "/private/inscriptions/rejected",
    "/private/inscriptions/all",
    "/private/inscriptions/me",
    "/private/user/profile",
  ],
  PARTICIPANT: ["/inscription-state"],
};

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as keyof typeof roleRedirects;

  console.log({ isLoggedIn, path: nextUrl.pathname, role: userRole });

  const isAccessingPrivateRoute =
    nextUrl.pathname.startsWith("/private/") ||
    nextUrl.pathname.startsWith("/inscription-state");

  const registrationToken = req.cookies.get("registration_token");
  if (nextUrl.pathname.startsWith("/register") && !registrationToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAccessingPrivateRoute && !isLoggedIn) {
    const signInUrl = new URL("/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (nextUrl.pathname.startsWith("/signin") && isLoggedIn) {
    const redirectUrl = roleRedirects[userRole] || "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if (isLoggedIn && isAccessingPrivateRoute) {
    const allowedRoutes = allowedRoutesByRole[userRole] || [];

    const isPathAllowed = allowedRoutes.some((path) =>
      nextUrl.pathname.startsWith(path),
    );

    if (!isPathAllowed) {
      const defaultRedirectUrl = roleRedirects[userRole] || "/";
      return NextResponse.redirect(new URL(defaultRedirectUrl, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/signin",
    "/register",
    "/private/:path*",
    "/inscription-state/:path*",
  ],
};
