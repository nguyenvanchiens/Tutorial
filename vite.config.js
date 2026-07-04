import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'

import { cloudflare } from "@cloudflare/vite-plugin";

// Plugin to serve original tutorial files from parent directory
function serveTutorialFiles() {
  const parentDir = path.resolve(__dirname, '../AI LEARN TUTORIAL')
  const folders = ['BE', 'SQL', 'BUILD', 'ENGLISH', 'TODO', 'AI', 'NEWS', 'TUTORIAL WEB']

  return {
    name: 'serve-tutorial-files',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = decodeURIComponent(req.url || '')

        for (const folder of folders) {
          if (url.startsWith('/' + folder + '/')) {
            const filePath = path.join(parentDir, url)
            if (fs.existsSync(filePath)) {
              const ext = path.extname(filePath).toLowerCase()
              const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
                '.txt': 'text/plain',
                '.woff': 'font/woff',
                '.woff2': 'font/woff2',
              }
              res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream')
              fs.createReadStream(filePath).pipe(res)
              return
            }
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serveTutorialFiles(), cloudflare()],
})