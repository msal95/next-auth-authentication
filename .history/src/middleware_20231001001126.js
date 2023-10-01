import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  console.log("🚀 ~ file: middleware.js:6 ~ middleware ~ req:", req);
  const { pathname } = req.nextUrl;

  if (pathname === "/auth/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req });
  console.log("🚀 ~ file: middleware.js:13 ~ middleware ~ token:", token);

  //   Protected routes for users
  const userProtectedRoutes = ["/"];

  // Protected routes for admin
  const adminProtectedRoutes = ["/dashboard"];

  //   if (
  //     token === null &&
  //     (userProtectedRoutes.includes(pathname) ||
  //       adminProtectedRoutes.includes(pathname))
  //   ) {
  //     return NextResponse.redirect(
  //       new URL(
  //         "/auth/login?error=Please login first to access the routes",
  //         req.url
  //       )
  //     );
  //   }

  //   Get User from Token
  const user = token?.user;
  console.log("🚀 ~ file: middleware.js:36 ~ middleware ~ user:", user);

  //   if user try to access the admin routes
  //   if (adminProtectedRoutes.includes(pathname) && user.role === "User") {
  //     return NextResponse.redirect(
  //       new URL(
  //         "/auth/login?error=Please login first as Admin to access the routes",
  //         req.url
  //       )
  //     );
  //   }

  //   if admin try to access the User routes
  //   if (userProtectedRoutes.includes(pathname) && user.role === "Admin") {
  //     return NextResponse.redirect(
  //       new URL(
  //         "/auth/login?error=Please login first as User to access the routes",
  //         req.url
  //       )
  //     );
  //   }
}
