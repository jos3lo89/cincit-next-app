import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

const privateAdminRoutes = ["/private/admin"];
const privateInscriberRoutes = ["/private/attendance"];
const privateParticipantRoutes = ["/inscription-state"];
const privateRoutes = [
  ...privateAdminRoutes,
  ...privateInscriberRoutes,
  ...privateParticipantRoutes,
];

const roleRedirects: Record<string, string> = {
  ADMINISTRATOR: "/private/admin",
  INSCRIBER: "/private/attendance",
  PARTICIPANT: "/inscription-state",
};

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  console.log({ isLoggedIn, path: nextUrl.pathname });

  const isAccessingPrivateRoute = privateRoutes.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  const registrationToken = req.cookies.get("registration_token");
  if (nextUrl.pathname.startsWith("/register") && !registrationToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (nextUrl.pathname.startsWith("/signin") && isLoggedIn) {
    const redirectUrl = roleRedirects[userRole as string] || "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  if (isAccessingPrivateRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoggedIn && isAccessingPrivateRoute) {
    const userAllowedUrl = roleRedirects[userRole as string];
    if (!nextUrl.pathname.startsWith(userAllowedUrl)) {
      return NextResponse.redirect(new URL(userAllowedUrl, req.url));
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
