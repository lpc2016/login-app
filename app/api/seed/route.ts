import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function GET() {
  const hashedPassword = await bcrypt.hash("password123", 10)

  try {
    await prisma.user.upsert({
      where: { email: "test@example.com" },
      update: {},
      create: {
        email: "test@example.com",
        passwordHash: hashedPassword,
        name: "测试用户",
      },
    })

    return NextResponse.json({
      success: true,
      message: "测试用户创建成功",
      user: {
        email: "test@example.com",
        password: "password123"
      }
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: String(error)
    }, { status: 500 })
  }
}
