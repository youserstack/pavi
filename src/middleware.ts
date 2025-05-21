import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 라우트 그룹
const protectedRoutes = ["/dashboard"];
const guestOnlyRoutes = ["/signin", "/signup"];
const publicRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = await getToken({ req: request });
  console.log("✅", pathname);

  // 인증사용자를 위한 페이지에 미인증사용자 접속시 -> 인증이 필요하니까 로그인페이지로 리다이렉트
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  // 미인증사용자를 위한 페이지에 인증사용자 접속시 -> 인증이 불필요하니까 대시보드페이지로 리다이렉트
  if (guestOnlyRoutes.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard"],
};
