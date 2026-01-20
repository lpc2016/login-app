# 登录应用

一个基于 Next.js 16、NextAuth.js 和 Prisma 的用户认证系统。

## 功能特性

- ✅ 用户注册和登录
- ✅ 密码加密（bcrypt）
- ✅ 会话管理（NextAuth.js）
- ✅ 路由保护
- ✅ 响应式设计
- ✅ 支持 Supabase 和 Vercel Postgres

## 数据库选择

### Supabase（推荐）

| 特性 | 详情 |
|------|------|
| 免费存储 | 500 MB |
| **行数限制** | **无限制** ✅ |
| 数据传输 | 1 GB/月 |
| 管理面板 | 强大 |
| 适用场景 | 用户数超过 10,000 |

### Vercel Postgres

| 特性 | 详情 |
|------|------|
| 免费存储 | 512 MB |
| 行数限制 | 10,000 行后只读 |
| 数据传输 | 500 GB/月 |
| 集成度 | Vercel 原生集成 |
| 适用场景 | 小型项目（<10,000 用户） |

## 快速开始（使用 Supabase）

### 1. 创建 Supabase 项目

1. 访问 https://supabase.com
2. 注册/登录
3. 点击 **"New Project"**
4. 填写信息：
   - Name: `login-app`
   - Database Password: 设置你的密码
   - Region: 选择离你最近的区域
5. 等待项目创建完成（2-3 分钟）

### 2. 获取数据库连接字符串

1. 在 Supabase 项目中，进入 **Settings → Database**
2. 找到 **Connection string** → **"URI"**
3. 复制连接字符串并替换密码

### 3. 配置环境变量

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
DATABASE_URL="你的-Supabase-连接字符串"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### 4. 初始化数据库

```bash
npm install
npx prisma generate
npx prisma db push
```

### 5. 运行

```bash
npm run dev
```

访问 http://localhost:3000

## 部署到 Vercel

### 使用 Supabase 数据库

1. **推送代码到 GitHub**
   ```bash
   git init
   git add .
   git commit -m "Ready for deployment"
   git remote add origin https://github.com/your-username/login-app.git
   git push -u origin main
   ```

2. **在 Vercel 部署**
   - 访问 [vercel.com](https://vercel.com)
   - 导入你的 GitHub 仓库
   - 配置环境变量：
     - `DATABASE_URL`: 你的 Supabase 连接字符串
     - `NEXTAUTH_URL`: `https://your-app.vercel.app`
     - `NEXTAUTH_SECRET`: 运行 `openssl rand -base64 32` 生成

### 使用 Vercel Postgres 数据库

参考 [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) 获取详细配置说明。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **认证**: NextAuth.js v5
- **数据库**: Prisma + PostgreSQL
- **样式**: Tailwind CSS
- **验证**: Zod
- **密码加密**: bcryptjs

## 文档

- [Supabase 配置指南](./SUPABASE_SETUP.md) - 详细的 Supabase 配置说明
- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [NextAuth.js 文档](https://authjs.dev)

## 许可证

MIT
