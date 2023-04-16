// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const mode: 'dev' | 'prod' = 'dev'
// https://vitejs.dev/config/
export default defineConfig({
  base: mode === 'dev' ? '' : '/youtube-simple-clone/',
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020'
    }
  },
  esbuild: {
    // https://github.com/vitejs/vite/issues/8644#issuecomment-1159308803
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros', 'babel-plugin-styled-components']
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target:
          mode !== 'dev'
            ? 'http://localhost:3000/api'
            : 'http://youtube-simple-clone-production.up.railway.app/api',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
