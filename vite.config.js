import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { svgBuilder } from "vite-svg-icon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder("./src/assets/svg/"), // 这个是svg的文件目录
  ],
  build: {
    target: "es2015",
  },
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: '5173',
    host: "0.0.0.0",
    // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy:{
      '/api':{
        target:'http://127.0.0.1:8080',
        changeOrigin:true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
