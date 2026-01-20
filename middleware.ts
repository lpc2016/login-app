import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  // 可以在这里添加路由守卫逻辑
  const nextUrl = req.nextUrl

  // 保护 dashboard 路由
  if (nextUrl.pathname.startsWith("/dashboard")) {
    const session = req.auth
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/dashboard/:path*"],
}