import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  const token = await getToken(req);

  //   Protected routes for users
  const userProtectedRoutes = ["/"];

  // Protected routes for admin
  const adminProtectedRoutes = ["/dashboard"];

  if (
    token === null &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL("/login?error=Please login first to access the routes")
    );
  }

  //   Get User from Token
}
