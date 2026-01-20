# 🔧 Vercel 环境变量配置指南

## ❗ 重要: 必须配置的环境变量

部署到 Vercel 后,你必须手动设置以下环境变量,否则登录功能无法正常工作。

---

## 📋 必须设置的环境变量

### 1️⃣ NEXTAUTH_URL (最重要!)

**问题**: 如果不设置,登录会失败!

**值**: 你的完整 Vercel 应用 URL
```
https://login-428e7dng5-1942634130-7029s-projects.vercel.app
```

**设置步骤**:
1. 访问 https://vercel.com/lpc2016/login-app/settings/environment-variables
2. 点击 "Add New"
3. 填写:
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://login-428e7dng5-1942634130-7029s-projects.vercel.app`
4. **Environments**: 勾选 Production, Preview, Development
5. 点击 "Save"

### 2️⃣ DATABASE_URL

**值**:
```
postgresql://postgres.odowmunxnymftcxhmocw:lpcsupabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

### 3️⃣ NEXTAUTH_SECRET

**值**:
```
MEz1TPepnfmPQ819Nyq2XrrXFAkoU6qGn5nCnLdbEsA=
```

---

## 🚀 设置完成后重新部署

添加环境变量后,必须重新部署才能生效:

### 方法 1: 通过 Vercel Dashboard

1. 访问 https://vercel.com/lpc2016/login-app/deployments
2. 找到最新的部署
3. 点击右侧的 "..." 菜单
4. 选择 "Redeploy"
5. 确认重新部署

### 方法 2: 通过 Git 推送 (推荐)

只要推送任何新的提交,Vercel 就会自动使用最新的环境变量重新部署:

```bash
cd d:/code/skilltest/login-app
git commit --allow-empty -m "trigger: 触发 Vercel 重新部署"
git push
```

---

## ✅ 验证环境变量

部署完成后,访问调试页面:

```
https://login-428e7dng5-1942634130-7029s-projects.vercel.app/debug
```

**应该看到**:
```
NEXTAUTH_URL: https://login-428e7dng5-1942634130-7029s-projects.vercel.app  ✅
DATABASE_URL: 已设置  ✅
NEXTAUTH_SECRET: 已设置  ✅
```

---

## 🐛 调试提示

如果登录还是失败:

1. **打开浏览器开发者工具** (F12)

2. **查看 Application → Cookies**:
   - 应该看到 `next-auth.session-token`

3. **查看 Console 标签**:
   - 应该看到 "登录成功" 日志

4. **查看 Network 标签**:
   - 检查 `/api/auth/callback/credentials` 请求
   - 状态码应该是 200

---

## 📝 完整配置示例

在 Vercel 环境变量中,你应该看到:

| Name | Value | Environments |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://postgres...` | All |
| `NEXTAUTH_SECRET` | `MEz1TPepnfmPQ819...` | All |
| `NEXTAUTH_URL` | `https://login-428e...vercel.app` | All |

---

## 🎯 快速设置命令

如果你想通过 Vercel CLI 设置:

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 拉取环境变量
vercel env pull .env.local

# 添加 NEXTAUTH_URL
vercel env add NEXTAUTH_URL production
# 然后粘贴: https://login-428e7dng5-1942634130-7029s-projects.vercel.app
```

---

## ❓ 常见问题

### Q: 为什么 NEXTAUTH_URL 在本地不需要设置?

A: NextAuth 默认使用 `http://localhost:3000`,但在生产环境必须明确指定。

### Q: Vercel 不是会自动设置 NEXTAUTH_URL 吗?

A: 理论上会的,但有时候不会自动设置。手动设置是最保险的方式。

### Q: 设置后还需要做什么?

A: 重新部署!环境变量更改后必须重新部署才能生效。

---

**设置完成后,登录应该就能正常工作了!** 🎉
