import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/', // ⚠️ مهم جداً لـ Vercel
  
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },

  preview: {
    port: 4173,
    host: true,
    strictPort: true,
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
})
