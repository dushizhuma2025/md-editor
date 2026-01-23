#!/usr/bin/env node
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 5000
const HOST = '0.0.0.0'

// MIME 类型映射
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ogg': 'audio/ogg',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
}

// 获取 MIME 类型
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return mimeTypes[ext] || 'application/octet-stream'
}

// 读取文件内容
function readFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('404 Not Found')
      return
    }
    res.writeHead(200, { 
      'Content-Type': getMimeType(filePath),
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    })
    res.end(data)
  })
}

// 请求处理
function handler(req, res) {
  // 解析 URL
  let url = req.url

  // 处理 /md/ 路径前缀
  if (url.startsWith('/md/')) {
    url = url.substring(4)
  }

  // 默认到 index.html
  if (url === '/' || url === '') {
    url = '/index.html'
  }

  // 解析文件路径
  const distPath = path.join(__dirname, 'dist')
  let filePath = path.join(distPath, url)

  // 检查文件是否存在
  fs.stat(filePath, (err, stats) => {
    if (err) {
      // 如果是目录，尝试添加 index.html
      if (err.code === 'ENOENT') {
        filePath = path.join(distPath, url, 'index.html')
        readFile(filePath, res)
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
        res.end('500 Internal Server Error')
      }
      return
    }

    // 如果是目录，返回 index.html
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html')
      readFile(filePath, res)
    } else {
      readFile(filePath, res)
    }
  })
}

// 创建服务器
const server = http.createServer(handler)

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/md/`)
  console.log(`Serving files from: ${path.join(__dirname, 'dist')}`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
})
