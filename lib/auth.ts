import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth } = NextAuth({
  trustHost: true, // 允许 Vercel 自动检测正确的 host
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        console.log("授权函数被调用, credentials:", credentials ? "存在" : "不存在")

        if (!credentials?.email || !credentials?.password) {
          console.error("缺少邮箱或密码")
          return null
        }

        const email = credentials.email as string
        const password = credentials.password as string

        console.log("尝试登录用户:", email)

        const user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) {
          console.error("用户不存在:", email)
          return null
        }

        if (!user.passwordHash) {
          console.error("用户没有密码哈希:", email)
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.passwordHash
        )

        if (!passwordsMatch) {
          console.error("密码不匹配:", email)
          return null
        }

        console.log("登录成功:", email)
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
