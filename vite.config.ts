import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import styleImport,{AntdResolve} from 'vite-plugin-style-import';
import * as path  from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // styleImport({
    //   resolves: [
    //     AntdResolve()
    //   ],
    // }),
  ],
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'./src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://36.137.215.211:8078', // 你的后端 API 地址
        changeOrigin: true, // 启用跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，重写路径，例如去掉 "/api" 前缀
      },
      '/socket': {
        target: 'ws://172.23.67.23:8899', // 你的后端 API 地址
        changeOrigin: true, // 启用跨域
        rewrite: (path) => path.replace(/^\/socket/, ''), // 可选，重写路径，例如去掉 "/api" 前缀
      },
    },
  },
})
