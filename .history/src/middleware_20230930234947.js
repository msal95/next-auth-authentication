import { getToken } from "next-auth/jwt";

import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;
}
