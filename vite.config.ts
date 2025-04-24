import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import history from "connect-history-api-fallback";

export default defineConfig(({ mode }) => ({
  // ███████╗███████╗██████╗ ██╗   ██╗███████╗██████╗ 
  // ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
  // ███████╗█████╗  ██████╔╝██║   ██║█████╗  ██████╔╝
  // ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██╔══╝  ██╔══██╗
  // ███████║███████╗██║  ██║ ╚████╔╝ ███████╗██║  ██║
  // ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝
  server: {
    host: "::", // يعمل على جميع عناوين IP
    port: 8080,
    strictPort: true, // يمنع تغيير المنفذ تلقائياً
    middlewareMode: true,
    fs: {
      strict: false // يسمح بالوصول لملفات خارج المجلد
    },
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('DevServer is undefined');
      }
      
      // إعدادات متقدمة للتاريخ السابق
      middlewares.push(
        history({
          disableDotRule: true,
          rewrites: [
            { from: /^\/product\/.*$/, to: '/index.html' },
            { from: /^\/admin\/.*$/, to: '/index.html' }
          ]
        })
      );
      return middlewares;
    },
    proxy: { // ⚠️ مهم لو لديك API
      '/api': {
        target: 'https://your-api.com',
        changeOrigin: true,
        secure: false
      }
    }
  },

  // ██████╗ ██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗ 
  // ██╔══██╗██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║
  // ██████╔╝██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║
  // ██╔═══╝ ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
  // ██║     ██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝
  // ╚═╝     ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
  preview: {
    port: 4173,
    host: true,
    strictPort: true,
    historyApiFallback: {
      rewrites: [
        { from: /\/product/, to: '/index.html' }
      ]
    }
  },

  // ██████╗ ██╗     ██╗   ██╗██╗██████╗ 
  // ██╔══██╗██║     ██║   ██║██║██╔══██╗
  // ██████╔╝██║     ██║   ██║██║██║  ██║
  // ██╔══██╗██║     ██║   ██║██║██║  ██║
  // ██████╔╝███████╗╚██████╔╝██║██████╔╝
  // ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝╚═════╝ 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: mode !== 'production', // لا تنشئ sourcemap للإنتاج
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor-react';
            }
            if (id.includes('lodash')) {
              return 'vendor-lodash';
            }
            return 'vendor';
          }
        },
        entryFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },

  // ██████╗ ██╗      █████╗  ██████╗██╗  ██╗███████╗
  // ██╔══██╗██║     ██╔══██╗██╔════╝██║ ██╔╝██╔════╝
  // ██████╔╝██║     ███████║██║     █████╔╝ ███████╗
  // ██╔═══╝ ██║     ██╔══██║██║     ██╔═██╗ ╚════██║
  // ██║     ███████╗██║  ██║╚██████╗██║  ██╗███████║
  // ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // إذا كنت تستخدم Emotion
      devTools: mode !== 'production'
    }),
    mode === 'development' && componentTagger()
  ].filter(Boolean),

  // ██████╗ ███████╗███████╗ ██████╗ ██╗   ██╗██╗      █████╗ ████████╗
  // ██╔══██╗██╔════╝██╔════╝██╔═══██╗██║   ██║██║     ██╔══██╗╚══██╔══╝
  // ██████╔╝█████╗  ███████╗██║   ██║██║   ██║██║     ███████║   ██║   
  // ██╔══██╗██╔══╝  ╚════██║██║   ██║██║   ██║██║     ██╔══██║   ██║   
  // ██║  ██║███████╗███████║╚██████╔╝╚██████╔╝███████╗██║  ██║   ██║   
  // ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
      "components": path.resolve(__dirname, "./src/components")
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  // ███████╗ ██████╗ ████████╗██╗███╗   ███╗██╗██╗  ██╗███████╗
  // ██╔════╝██╔═══██╗╚══██╔══╝██║████╗ ████║██║██║  ██║██╔════╝
  // █████╗  ██║   ██║   ██║   ██║██╔████╔██║██║███████║█████╗  
  // ██╔══╝  ██║   ██║   ██║   ██║██║╚██╔╝██║██║██╔══██║██╔══╝  
  // ██║     ╚██████╔╝   ██║   ██║██║ ╚═╝ ██║██║██║  ██║███████╗
  // ╚═╝      ╚═════╝    ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═╝╚══════╝
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query'
    ],
    exclude: ['js-big-decimal']
  }
}));
