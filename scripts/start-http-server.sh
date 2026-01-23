#!/bin/bash
set -e

echo "Starting simple HTTP server..."

# 进入 web 应用目录
cd apps/web

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Building..."
  pnpm run build
fi

# 设置环境变量
export SERVER_ENV=PREVIEW

# 启动简单的 HTTP 服务器
echo "Starting HTTP server on port 5000..."
echo "Serving from dist/ at http://0.0.0.0:5000/md/"

# 使用 Node.js 内置的 http-server 包
exec pnpm exec http-server dist -p 5000 -a 0.0.0.0 -c-1 --cors
