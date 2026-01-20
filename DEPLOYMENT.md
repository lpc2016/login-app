# 🚀 Vercel 部署指南

本文档将指导你如何将 Login App 部署到 Vercel。

## 📋 前置要求

- ✅ GitHub 账号
- ✅ Vercel 账号 (可使用 GitHub 登录)
- ✅ Supabase 账号和数据库 (已有)

---

## 🎯 部署步骤

### 步骤 1: 推送代码到 GitHub

如果你还没有将代码推送到 GitHub,需要先创建远程仓库:

```bash
# 在 GitHub 上创建新仓库后,执行以下命令

# 添加远程仓库 (替换为你的仓库地址)
git remote add origin https://github.com/YOUR_USERNAME/login-app.git

# 推送代码到 GitHub
git push -u origin master
```

---

### 步骤 2: 在 Vercel 导入项目

1. **访问 Vercel**
   - 打开 https://vercel.com
   - 点击 "Sign In" 使用 GitHub 登录

2. **创建新项目**
   - 点击 "Add New..." → "Project"
   - 从 GitHub 仓库列表中选择 `login-app`
   - 点击 "Import"

---

### 步骤 3: 配置环境变量

在 Vercel 项目配置页面,添加以下环境变量:

| 环境变量名称 | 值 | 说明 |
|------------|---|------|
| `DATABASE_URL` | 你的 Supabase 连接字符串 | 从 Supabase 获取 |
| `NEXTAUTH_SECRET` | 随机生成的密钥 | 运行命令生成 |
| `NEXTAUTH_URL` | 自动设置 | Vercel 会自动配置 |

#### 3.1 获取 DATABASE_URL

从你现有的 `.env` 文件中复制 `DATABASE_URL`:

```
DATABASE_URL="postgresql://postgres.odowmunxnymftcxhmocw:lpcsupabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

#### 3.2 生成 NEXTAUTH_SECRET

**Windows (Git Bash 或 PowerShell):**
```bash
# 方法 1: 使用 PowerShell
powershell -Command "[-converter]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# 方法 2: 使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**macOS/Linux:**
```bash
openssl rand -base64 32
```

#### 3.3 在 Vercel 添加环境变量

1. 在 Vercel 项目页面
2. 点击 "Settings" → "Environment Variables"
3. 添加以下变量:

   **Name:** `DATABASE_URL`
   **Value:** `postgresql://postgres.odowmunxnymftcxhmocw:lpcsupabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres`

   **Name:** `NEXTAUTH_SECRET`
   **Value:** `<你生成的随机密钥>`

4. 选择所有环境 (Production, Preview, Development)
5. 点击 "Save"

---

### 步骤 4: 运行数据库迁移

Vercel 部署后,需要在生产环境运行数据库迁移:

**方法 1: 使用 Vercel CLI (推荐)**

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 运行数据库迁移
vercel env pull .env.production
npx prisma migrate deploy
```

**方法 2: 使用 Vercel Dashboard**

1. 在 Vercel 项目页面,点击 "Deployments"
2. 找到最新的部署,点击 "View"
3. 点击 "Logs" 查看部署日志
4. 如果 Prisma 迁移失败,可能需要手动运行

---

### 步骤 5: 部署完成

1. Vercel 会自动部署你的项目
2. 部署完成后,你会获得一个 URL,例如:
   - `https://login-app-xxxxx.vercel.app`
3. 访问该 URL 测试应用

---

## 🔧 配置说明

### vercel.json

项目已包含 `vercel.json` 配置文件:

```json
{
  "buildCommand": "prisma generate && next build",
  "devCommand": "next dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["sin1"]
}
```

- `buildCommand`: 生成 Prisma Client 并构建 Next.js
- `regions`: `sin1` = 新加坡区域 (靠近你的 Supabase 数据库)

---

## 🎯 自定义域名 (可选)

如果你有自己的域名:

1. 在 Vercel 项目页面
2. 点击 "Settings" → "Domains"
3. 添加你的域名
4. 按照 Vercel 的指引配置 DNS 记录

---

## 🐛 常见问题

### 问题 1: 部署失败 - Prisma Client 未生成

**解决方案:**
- 确保 `vercel.json` 中的 `buildCommand` 包含 `prisma generate`
- 或在 `package.json` 中已有 `postinstall` 钩子

### 问题 2: 数据库连接失败

**解决方案:**
- 检查 Supabase 连接字符串是否正确
- 确保在 Supabase 设置中允许 Vercel IP 地址
- 检查 Supabase 项目是否暂停

### 问题 3: NextAuth 会话错误

**解决方案:**
- 确保 `NEXTAUTH_SECRET` 已正确设置
- 确保 `NEXTAUTH_URL` 正确 (Vercel 会自动设置)

---

## 📊 部署检查清单

- [ ] 代码已推送到 GitHub
- [ ] Vercel 已连接 GitHub 仓库
- [ ] `DATABASE_URL` 环境变量已设置
- [ ] `NEXTAUTH_SECRET` 环境变量已设置
- [ ] 数据库迁移已运行
- [ ] 部署成功,可访问应用
- [ ] 测试注册功能
- [ ] 测试登录功能
- [ ] 测试登出功能

---

## 🎉 部署成功!

现在你的登录应用已经部署到 Vercel,可以通过公网 URL 访问了!

**示例 URL:** `https://login-app-xxxxx.vercel.app`

---

## 📝 相关文件

- [`.env.example`](.env.example) - 环境变量示例
- [`vercel.json`](vercel.json) - Vercel 配置
- [`prisma/schema.prisma`](prisma/schema.prisma) - 数据库模型
- [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md) - Supabase 配置指南

---

## 🆘 获取帮助

如果遇到问题:

1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 查看 [Next.js 部署文档](https://nextjs.org/docs/deployment)
3. 查看 [Prisma 部署指南](https://www.prisma.io/docs/guides/deployment/vercel)
4. 查看 [NextAuth.js 文档](https://authjs.dev/)
