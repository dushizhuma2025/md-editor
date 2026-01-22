#!/bin/bash
set -e

echo "Starting preview server..."

# 进入 web 应用目录
cd apps/web

# 检查 dist 目录是否存在
if [ ! -d "dist" ]; then
  echo "Error: dist directory not found. Building..."
  pnpm run build
fi

# 设置缓存目录
export VITE_TEMP_DIR=/tmp/.vite-cache

# 启动预览服务器（使用 exec 替换当前进程，确保信号正确传递）
echo "Starting vite preview server on port 5000..."
exec pnpm exec vite preview --port 5000 --host --strictPort
