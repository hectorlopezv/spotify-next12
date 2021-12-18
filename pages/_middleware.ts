import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: any) {
  //el PROXY que recibe todo antes del server
  //Client -> MiddleWare -> Server
  const secret = process.env.JWT_SECRET!;
  const token = await getToken({
    req,
    secret,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith("https://") ??
      !!process.env.VERCEL_URL,
  });
  const { pathname } = req.nextUrl;
  //Allow the request if the following its true...
  //1) token exits
  if (pathname.includes("/api/auth") || token) {
    // if a token exists or is a request for next auth session & provider fetch
    return NextResponse.next();
  }

  //Redirect them to login if they dont have token AND are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
