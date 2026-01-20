"use server"

import { redirect } from "next/navigation"
import { loginSchema, registerSchema } from "@/lib/validations"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function loginAction(formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validatedFields.success) {
    return { error: "验证失败" }
  }

  const { email, password } = validatedFields.data

  // 验证用户
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.passwordHash) {
    return { error: "邮箱或密码错误" }
  }

  const passwordsMatch = await bcrypt.compare(password, user.passwordHash)

  if (!passwordsMatch) {
    return { error: "邮箱或密码错误" }
  }

  // 登录成功，重定向到仪表板
  redirect("/dashboard")
}

export async function registerAction(formData: FormData) {
  const validatedFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  })

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors
    return { error: Object.values(errors)[0]?.[0] || "验证失败" }
  }

  const { name, email, password } = validatedFields.data

  try {
    // 检查用户是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "该邮箱已被注册" }
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10)

    // 创建用户
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      }
    })

    // 注册成功，重定向到登录页面并显示成功消息
    redirect("/login?registered=true")
  } catch (error) {
    console.error("注册错误:", error)
    return { error: "注册失败，请稍后重试" }
  }
}
