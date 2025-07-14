import { NextRequest, NextResponse } from "next/server";


export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico|robots.txt).*)'],
};

export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId");
  const {pathname} = request.nextUrl;

  if (!userId && !pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

}