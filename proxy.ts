import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // allow public routes
  if (pathname === "/") {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // if token exists and trying to access auth routes
  if (
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) &&
    token
  ) {
    const url = new URL("/", req.url);
    return NextResponse.redirect(url);
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    const loginUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(loginUrl);
  }
}
