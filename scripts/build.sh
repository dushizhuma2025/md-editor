#!/bin/bash
set -e

echo "Starting build process..."

# 安装依赖（跳过 postinstall 脚本）
echo "Installing dependencies..."
pnpm install --ignore-scripts

# 构建 web 应用
echo "Building web application..."
cd apps/web
pnpm run build

echo "Build completed successfully!"
