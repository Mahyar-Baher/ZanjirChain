import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'
import compression from 'vite-plugin-compression'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    react(),
    babel(),
    viteImagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 70 },
      pngquant: { quality: [0.6, 0.8] },
      svgo: { plugins: [{ name: 'removeViewBox' }] },
    }),
    compression(),
    legacy({
      targets: ['defaults', 'not IE 11'], // مرورگرهای هدف - IE11 را کنار گذاشتیم، می‌تونی تغییر بدی
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'], // پلی‌فیل اضافی اگر نیاز باشه
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    minify: 'esbuild', // سریع‌تر از terser
    target: 'es2015', // یا esnext اگر فقط مرورگرهای جدید میخوای، ولی برای پشتیبانی بهتر es2015 بهتره
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'axios',
      'framer-motion',
      'ua-parser-js',
    ],
  },
})
