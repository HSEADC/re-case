import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, 'src')
const outDir = path.resolve(__dirname, 'docs')

const pages = {
  main: {
    file: 'index.html',
    chunks: ['/javascripts/index.js', '/javascripts/allStyles.js']
  },
  aloe: {
    file: 'pages/articles/aloe.html',
    chunks: ['/javascripts/allStyles.js']
  },
  guides: {
    file: 'pages/guides.html',
    chunks: ['/javascripts/allStyles.js']
  },
  eventcatalog: {
    file: 'pages/eventcatalog.html',
    chunks: ['/javascripts/allStyles.js']
  },
  event: {
    file: 'pages/event.html',
    chunks: ['/javascripts/allStyles.js']
  },
  analyses: {
    file: 'pages/analyses.html',
    chunks: ['/javascripts/allStyles.js']
  }
}

const chunksByFile = Object.fromEntries(
  Object.values(pages).map(({ file, chunks }) => [file, chunks])
)

function pageChunksPlugin() {
  return {
    name: 'page-chunks',
    transformIndexHtml(html, ctx) {
      const relFile = path
        .relative(root, ctx.filename)
        .split(path.sep)
        .join('/')

      const chunks = chunksByFile[relFile]

      if (!chunks) return html

      return {
        html,
        tags: chunks.map((src) => ({
          tag: 'script',
          attrs: { type: 'module', src },
          injectTo: 'body'
        }))
      }
    }
  }
}

export default defineConfig(({ command }) => ({
  root,
  base: command === 'build' ? '/re-case/' : '/',
  plugins: [pageChunksPlugin()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        Object.entries(pages).map(([name, { file }]) => [
          name,
          path.resolve(root, file)
        ])
      )
    }
  },
  server: {
    open: true
  }
}))
