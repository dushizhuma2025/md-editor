# 阿一微信公众号 Markdown 编辑器 - 部署包说明

## 包信息

- 文件名: `md-editor-deploy.tar.gz`
- 大小: 692 KB
- 文件数: 483
- 创建时间: 2026-01-23

## 系统要求

- Node.js >= 22.16.0
- pnpm >= 10.26.0
- 至少 1GB 可用内存
- 至少 500MB 可用磁盘空间

## 快速部署

### 1. 解压文件

```bash
# 解压到当前目录
tar -xzf md-editor-deploy.tar.gz

# 或解压到指定目录
tar -xzf md-editor-deploy.tar.gz -C /path/to/directory
```

### 2. 安装依赖

```bash
# 进入项目目录
cd md-editor  # 或你解压后的目录名

# 安装依赖（跳过 postinstall 脚本）
pnpm install --ignore-scripts
```

### 3. 构建应用

```bash
# 使用构建脚本
bash scripts/build.sh

# 或手动构建
cd apps/web
pnpm run build
```

### 4. 启动服务

**方式 1：使用简单 HTTP 服务器（推荐）**

```bash
# 使用专用启动脚本
bash scripts/start-preview.sh
```

这个脚本使用 Node.js 原生的 HTTP 模块，无需 Vite，避免了配置加载和缓存目录的权限问题。

**方式 2：使用 Vite 预览服务器**

```bash
# 手动启动（需要确保 node_modules 可写）
cd apps/web
export VITE_TEMP_DIR=/tmp/.vite-cache
export SERVER_ENV=PREVIEW
mkdir -p /tmp/.vite-cache
pnpm exec vite preview --port 5000 --host --strictPort
```

### 5. 访问应用

打开浏览器访问：
- http://localhost:5000/md/
- 或 http://YOUR_SERVER_IP:5000/md/

## 包含的文件

### 核心目录
- `apps/web/` - Web 应用源代码
- `packages/shared/` - 共享包
- `packages/core/` - 核心包
- `scripts/` - 构建和部署脚本

### 配置文件
- `package.json` - 项目配置
- `pnpm-lock.yaml` - 依赖锁定文件
- `.coze` - 部署配置
- `eslint.config.mjs` - ESLint 配置
- `tsconfig.json` - TypeScript 配置
- `vite.config.ts` - Vite 配置

### 文档
- `README.md` - 项目说明
- `DEPLOYMENT.md` - 详细部署文档
- `DEPLOY_PACKAGE_README.md` - 本文档

### 脚本文件
- `scripts/build.sh` - 构建脚本
- `scripts/start-preview.sh` - 启动脚本

## 排除的文件

以下文件和目录已从部署包中排除：

- `node_modules/` - 依赖包（需要重新安装）
- `.git/` - Git 版本控制
- `.pnpm-store/` - pnpm 缓存
- `dist/` - 构建输出（需要重新构建）
- `build/` - 构建临时文件
- `.vscode/` - VSCode 配置
- `.idea/` - IntelliJ IDEA 配置
- `*.log` - 日志文件
- `.env*` - 环境变量文件
- `.cache/` - 缓存目录
- `.wxt/` - 浏览器扩展自动生成文件

## 端口配置

默认端口: 5000

如需修改端口，编辑 `scripts/start-preview.sh`:

```bash
# 将 5000 改为你想要的端口
pnpm exec vite preview --port YOUR_PORT --host --strictPort
```

## 环境变量

可以通过设置环境变量来自定义配置：

```bash
# 缓存目录
export VITE_TEMP_DIR=/tmp/.vite-cache

# 服务器环境
export SERVER_ENV=PREVIEW
```

## 故障排查

### 端口被占用

```bash
# 检查端口占用
ss -lptn 'sport = :5000'

# 终止占用进程
pkill -f "vite preview"
```

### 构建失败

```bash
# 清理缓存
rm -rf node_modules/.vite apps/web/dist

# 重新构建
bash scripts/build.sh
```

### 权限问题

```bash
# 确保脚本可执行
chmod +x scripts/build.sh scripts/start-preview.sh
```

### 内存不足

```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
bash scripts/build.sh
```

## 生产环境部署建议

### 1. 使用进程管理器

推荐使用 PM2 管理服务：

```bash
# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start scripts/start-preview.sh --name md-editor

# 查看日志
pm2 logs md-editor

# 重启服务
pm2 restart md-editor

# 停止服务
pm2 stop md-editor
```

### 2. 配置反向代理

使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location /md/ {
        proxy_pass http://localhost:5000/md/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. 配置 HTTPS

使用 Let's Encrypt 获取免费 SSL 证书：

```bash
# 安装 certbot
apt-get install certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com
```

### 4. 定期备份

```bash
# 创建备份脚本
cat > /path/to/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR=/path/to/backups
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf $BACKUP_DIR/md-editor-$DATE.tar.gz /path/to/md-editor
find $BACKUP_DIR -name "md-editor-*.tar.gz" -mtime +7 -delete
EOF

chmod +x /path/to/backup.sh

# 添加到 crontab
0 2 * * * /path/to/backup.sh
```

## 技术支持

如遇到问题，请参考：
- 详细文档: `DEPLOYMENT.md`
- 项目 README: `README.md`
- GitHub Issues: https://github.com/dushizhuma2025/md-editor/issues

## 版本信息

- 版本: 2.1.0
- 基于项目: doocs/md
- 定制方: 阿一AI站
- 部署包创建日期: 2026-01-23
