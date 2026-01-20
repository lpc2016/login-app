import { auth } from "@/lib/auth"

export default async function DebugPage() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">调试信息</h1>

        <div className="space-y-6">
          {/* Session 信息 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Session 状态</h2>
            {session ? (
              <div className="space-y-2">
                <p className="text-green-600 font-medium">✅ 已登录</p>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                  {JSON.stringify(session, null, 2)}
                </pre>
              </div>
            ) : (
              <p className="text-red-600 font-medium">❌ 未登录</p>
            )}
          </div>

          {/* 环境变量 (只显示非敏感信息) */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">环境配置</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">NEXTAUTH_URL:</span>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {process.env.NEXTAUTH_URL || "未设置"}
                </code>
              </p>
              <p>
                <span className="font-medium">DATABASE_URL:</span>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {process.env.DATABASE_URL ? "已设置" : "未设置"}
                </code>
              </p>
              <p>
                <span className="font-medium">NEXTAUTH_SECRET:</span>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {process.env.NEXTAUTH_SECRET ? "已设置" : "未设置"}
                </code>
              </p>
              <p>
                <span className="font-medium">Node 环境:</span>{" "}
                <code className="bg-gray-100 px-2 py-1 rounded">
                  {process.env.NODE_ENV}
                </code>
              </p>
            </div>
          </div>

          {/* 快速测试链接 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">快速测试</h2>
            <div className="space-y-2">
              <a
                href="/api/auth/session"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                查看 /api/auth/session (原始 JSON)
              </a>
              <a
                href="/api/auth/providers"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                查看 /api/auth/providers
              </a>
              <a
                href="/api/auth/csrf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                查看 /api/auth/csrf
              </a>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">操作</h2>
            <div className="space-x-4">
              {session ? (
                <a
                  href="/dashboard"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  前往 Dashboard
                </a>
              ) : (
                <a
                  href="/login"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  前往登录
                </a>
              )}
              <a
                href="/api/auth/signout"
                className="inline-block px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                登出
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
