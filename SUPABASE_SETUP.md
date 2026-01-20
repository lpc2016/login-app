# Supabase 配置指南

## 🚀 快速开始

### 第一步：创建 Supabase 项目

1. 访问 https://supabase.com
2. 注册/登录账号
3. 点击 **"New Project"**
4. 填写项目信息：
   - **Name**: `login-app`
   - **Database Password**: `lpc=supabase` （请保存好这个密码！）
   - **Region**: 选择 `Northeast Asia (Tokyo)` 或离你最近的区域
5. 点击 **"Create new project"**

⏱️ 项目创建需要 2-3 分钟，请耐心等待。

### 第二步：获取数据库连接字符串

项目创建完成后：

1. 在 Supabase 项目左侧菜单，点击 **Settings** (齿轮图标)
2. 选择 **Database**
3. 向下滚动找到 **Connection string** 部分
4. 选择 **"URI"** 标签页
5. 复制连接字符串，格式类似：
   ```
   postgresql://postgres.xxxxx:密码@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```
6. 将连接字符串中的 `[YOUR-PASSWORD]` 替换为：`lpc=supabase`

### 第三步：配置环境变量

#### 方式一：本地开发

在 `login-app` 目录下创建 `.env` 文件：

```bash
# Supabase 数据库连接字符串
DATABASE_URL="postgresql://postgres.xxxxx:YOUR-PASSWORD-HERE@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-this"
```

**注意**：将 `YOUR-PASSWORD-HERE` 替换为 `lpc=supabase`

#### 方式二：使用 .env.example

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

然后修改 `.env` 文件中的 `DATABASE_URL`

### 第四步：初始化数据库

在项目目录运行：

```bash
# 生成 Prisma Client
npx prisma generate

# 同步数据库 schema（创建 users 表）
npx prisma db push
```

### 第五步：测试

启动开发服务器：

```bash
npm run dev
```

访问 http://localhost:3000，测试注册和登录功能。

### 第六步：部署到 Vercel

#### 1. 推送代码到 GitHub

```bash
git init
git add .
git commit -m "Configure for Supabase"
git branch -M main
git remote add origin https://github.com/your-username/login-app.git
git push -u origin main
```

#### 2. 在 Vercel 部署

1. 访问 https://vercel.com
2. 点击 **"New Project"**
3. 导入你的 GitHub 仓库
4. 配置环境变量：

| 环境变量 | 值 |
|---------|---|
| `DATABASE_URL` | 你的 Supabase 连接字符串 |
| `NEXTAUTH_URL` | `https://你的应用名.vercel.app` |
| `NEXTAUTH_SECRET` | 运行 `openssl rand -base64 32` 生成 |

5. 点击 **"Deploy"**

## 🔐 安全提示

- ⚠️ **不要将 `.env` 文件提交到 GitHub**
- ⚠️ **不要在公开场合分享你的数据库密码**
- ✅ Supabase 项目设置中可以随时重置密码

## 📊 Supabase 免费套餐

- 存储：500 MB
- 行数：**无限制** ✅
- 数据传输：1 GB/月
- 额外功能：实时订阅、存储、认证等

## 🆘 常见问题

### 连接失败？

1. 检查密码是否正确
2. 确认 Supabase 项目已经创建完成（等待 2-3 分钟）
3. 检查网络连接

### 表未创建？

运行：
```bash
npx prisma db push
```

## 📚 相关链接

- Supabase 文档：https://supabase.com/docs
- Prisma 文档：https://www.prisma.io/docs
- NextAuth.js 文档：https://authjs.dev
