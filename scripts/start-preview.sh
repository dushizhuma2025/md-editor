#!/bin/bash
set -e

# 获取脚本所在目录的绝对路径
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Starting preview server..."
echo "Project root: $PROJECT_ROOT"

# 进入 web 应用目录
cd "$PROJECT_ROOT/apps/web"

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Building..."
  pnpm run build
fi

# 设置环境变量
export SERVER_ENV=PREVIEW

# 使用简单的 HTTP 服务器，避免 Vite 配置加载问题
echo "Starting HTTP server on port 5000..."
echo "Serving from dist/ at http://0.0.0.0:5000/md/"

# 使用 Node.js 原生 HTTP 服务器
exec node "$SCRIPT_DIR/simple-server.mjs"
