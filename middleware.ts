import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl

  // 保护 dashboard 路由
  if (nextUrl.pathname.startsWith("/dashboard")) {
    // 从 cookie 中检查会话
    const sessionToken = request.cookies.get("next-auth.session-token") ||
                        request.cookies.get("__Secure-next-auth.session-token")

    if (!sessionToken) {
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}