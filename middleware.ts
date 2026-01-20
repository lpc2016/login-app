import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl

  // 暂时禁用 Middleware 保护,让 Dashboard 页面自己处理认证
  // 这样可以调试 Cookie 设置问题
  /*
  if (nextUrl.pathname.startsWith("/dashboard")) {
    const sessionToken = request.cookies.get("next-auth.session-token") ||
                        request.cookies.get("__Secure-next-auth.session-token")

    console.log("Middleware 检查 dashboard 访问, sessionToken:", sessionToken ? "存在" : "不存在")

    if (!sessionToken) {
      console.log("Middleware: 没有 session token, 重定向到登录页")
      const loginUrl = new URL("/login", request.url)
      return NextResponse.redirect(loginUrl)
    }

    console.log("Middleware: session token 存在, 允许访问")
  }
  */

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}