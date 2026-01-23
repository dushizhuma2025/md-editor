# 快速部署指南

## 部署包信息

**文件**: `md-editor-deploy.tar.gz`
**大小**: 694 KB
**文件数**: 484

## 3 步快速部署

### 1️⃣ 解压

```bash
tar -xzf md-editor-deploy.tar.gz
cd md-editor
```

### 2️⃣ 安装并构建

```bash
# 安装依赖
pnpm install --ignore-scripts

# 构建应用
bash scripts/build.sh
```

### 3️⃣ 启动服务

```bash
bash scripts/start-preview.sh
```

访问: http://localhost:5000/md/

## 系统要求

- Node.js >= 22.16.0
- pnpm >= 10.26.0

## 详细说明

请查看 `DEPLOY_PACKAGE_README.md` 获取完整部署文档。
