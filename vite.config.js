import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: { 
    alias: {
      '@': path.resolve(__dirname, 'src'), // 确保 @ 指向 src
    },
  },
  // server: {
  //   host: '0.0.0.0', // 允许外部访问
  //   port: 5173, // 确保和 ngrok 端口匹配
  //   strictPort: true, // 保证使用 5173 端口
  //   allowedHosts: ['.ngrok-free.app'], // 允许所有主机访问
  //   cors: true // 允许跨域
  // }
})
