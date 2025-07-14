import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest) {
  const userId = request.cookies.get("userId");
  const {pathname} = request.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||   
    pathname.startsWith('/favicon.ico') || 
    pathname.startsWith('/robots.txt') 
  ) {
    return NextResponse.next();
  }

  if (!userId && !pathname.includes("/auth")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

}