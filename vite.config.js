import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue()],
  server:{
    proxy:{
      "/http":{
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite:(path) => path.replace(/^\/http/,'')
      }
    }
  }
})
