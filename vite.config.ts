import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [react()],
  
  server: {
    host: true,
    port: 8080,
    strictPort: true,
    middlewareMode: true,
    fs: {
      strict: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      }
    }
  },

  preview: {
    port: 4173,
    host: true,
    strictPort: true,
    historyApiFallback: true
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
