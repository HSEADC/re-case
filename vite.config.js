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
  },
  about: {
    file: 'pages/about.html',
    chunks: ['/javascripts/allStyles.js']
  },
  way: {
    file: 'pages/way.html',
    chunks: ['/javascripts/allStyles.js']
  },
  banktests: {
    file: 'pages/banktests.html',
    chunks: ['/javascripts/allStyles.js']
  },
  support: {
    file: 'pages/support.html',
    chunks: ['/javascripts/allStyles.js']
  }
}

const chunksByFile = Object.fromEntries(
  Object.values(pages).map(({ file, chunks }) => [file, chunks])
)

function pageChunksPlugin() {
  return {
    name: 'page-chunks',
    // order: 'pre' — скрипты добавляются до сборки, поэтому Vite их собирает
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
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
}

// /re-case/ нужен и для сборки, и для её просмотра через yarn start
export default defineConfig(({ command, isPreview }) => ({
  root,
  base: command === 'build' || isPreview ? '/re-case/' : '/',
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
