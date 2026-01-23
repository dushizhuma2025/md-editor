# 部署说明

## 环境要求

- Node.js >= 22.16.0
- pnpm >= 10.26.0

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器（端口 5000）
pnpm start

# 或手动启动
pnpm web dev
```

## 生产部署

### 构建步骤

**方式 1：使用构建脚本（推荐）**

```bash
# 使用专用构建脚本
bash scripts/build.sh
```

**方式 2：手动构建**

```bash
# 跳过 postinstall 脚本（避免 Git hooks 问题）
pnpm install --ignore-scripts

# 构建 web 应用
cd apps/web
pnpm run build
```

### 启动预览服务器

```bash
# 使用专用启动脚本
bash scripts/start-preview.sh

# 或手动启动
cd apps/web
export VITE_TEMP_DIR=/tmp/.vite-cache
export SERVER_ENV=PREVIEW
pnpm exec vite preview --port 5000 --host --strictPort
```

### 访问应用

- 本地访问: http://localhost:5000/md/
- 网络访问: http://YOUR_IP:5000/md/

## 部署配置说明

### `.coze` 文件

```toml
[project]
requires = ["nodejs-24"]

[dev]
build = ["pnpm", "install"]
run = ["pnpm", "--filter", "@md/web", "preview", "--port", "5000", "--host"]

[deploy]
build = ["sh", "-c", "pnpm install --ignore-scripts && cd apps/web && pnpm run build"]
run = ["sh", "scripts/start-preview.sh"]
```

### 关键配置点

1. **跳过 postinstall 脚本**: 使用 `--ignore-scripts` 避免生产环境中的 Git hooks 问题
2. **独立构建步骤**: 在 build 阶段完成构建，避免预览时的构建失败
3. **专用启动脚本**: `scripts/start-preview.sh` 确保服务持续运行
4. **环境变量**:
   - `VITE_TEMP_DIR=/tmp/.vite-cache`: 缓存目录指向可写位置
   - `SERVER_ENV=PREVIEW`: 预览模式，设置 base path 为 `/`
5. **strictPort**: 端口冲突时快速失败

## 故障排查

### 端口被占用

```bash
# 检查 5000 端口
ss -lptn 'sport = :5000'

# 终止占用进程
pkill -f "vite preview"
```

### 构建失败

```bash
# 清理缓存和重新构建
rm -rf dist node_modules/.vite
pnpm run build
```

### 权限问题

```bash
# 确保脚本可执行
chmod +x scripts/start-preview.sh
```

## 项目结构

```
.
├── apps/web/          # Web 应用
│   ├── dist/          # 构建输出
│   └── src/           # 源代码
├── scripts/
│   └── start-preview.sh  # 预览服务器启动脚本
├── .coze              # 部署配置
└── package.json       # 项目配置
```

## 技术栈

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Radix Vue
- Pinia
