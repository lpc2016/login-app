# ✅ Vercel 部署快速检查清单

## 🎯 一键部署步骤

### 1️⃣ 推送代码到 GitHub
```bash
# 在你的 GitHub 创建新仓库后,执行:
git remote add origin https://github.com/YOUR_USERNAME/login-app.git
git push -u origin master
```

### 2️⃣ 在 Vercel 导入项目
1. 访问 https://vercel.com
2. 点击 "Add New..." → "Project"
3. 选择 `login-app` 仓库
4. 点击 "Import"

### 3️⃣ 设置环境变量 (重要!)

在 Vercel 项目设置中添加以下环境变量:

#### DATABASE_URL
```
postgresql://postgres.odowmunxnymftcxhmocw:lpcsupabase@aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
```

#### NEXTAUTH_SECRET (已为你生成)
```
MEz1TPepnfmPQ819Nyq2XrrXFAkoU6qGn5nCnLdbEsA=
```

#### NEXTAUTH_URL
```
留空或设置为: https://your-app.vercel.app
```
(部署后 Vercel 会自动设置)

---

## 📋 完整检查清单

- [ ] **步骤 1**: GitHub 仓库已创建
- [ ] **步骤 2**: 代码已推送到 GitHub
- [ ] **步骤 3**: Vercel 账号已注册 (使用 GitHub 登录)
- [ ] **步骤 4**: Vercel 已导入 GitHub 仓库
- [ ] **步骤 5**: `DATABASE_URL` 环境变量已设置
- [ ] **步骤 6**: `NEXTAUTH_SECRET` 环境变量已设置
- [ ] **步骤 7**: 首次部署已完成
- [ ] **步骤 8**: 测试注册功能
- [ ] **步骤 9**: 测试登录功能
- [ ] **步骤 10**: 测试登出功能

---

## 🎉 部署完成后

你会获得一个类似这样的 URL:
```
https://login-app-abc123.vercel.app
```

### 测试步骤:
1. 访问你的 Vercel URL
2. 点击"立即注册"
3. 填写表单并提交
4. 使用注册的账户登录
5. 验证是否成功跳转到 Dashboard

---

## 🔧 部署配置文件

项目已包含以下配置文件:

✅ `vercel.json` - Vercel 部署配置
✅ `.env.example` - 环境变量示例
✅ `DEPLOYMENT.md` - 详细部署文档
✅ `package.json` - 包含 `postinstall` 钩子自动生成 Prisma Client

---

## 📝 重要提示

1. **DATABASE_URL**: 从你现有的 `.env` 文件复制
2. **NEXTAUTH_SECRET**: 使用上面生成的密钥
3. **数据库迁移**: Vercel 部署时会自动运行
4. **区域配置**: 已设置为新加坡 (sin1),靠近你的 Supabase 数据库

---

## 🚀 快速开始

现在你可以:

1. **推送代码**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/login-app.git
   git push -u origin master
   ```

2. **在 Vercel 导入**:
   - 访问 https://vercel.com/new
   - 选择 `login-app` 仓库

3. **设置环境变量**:
   - 复制上面的 `DATABASE_URL`
   - 复制上面的 `NEXTAUTH_SECRET`

4. **部署完成!**

---

## 🆘 需要帮助?

查看完整文档: [DEPLOYMENT.md](./DEPLOYMENT.md)

---

**祝部署顺利!** 🎊
