import react from '@vitejs/plugin-react';
import path, { resolve } from 'node:path';
import { defineConfig } from 'vite';

import { getCacheInvalidationKey, getPlugins } from './utils/vite';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');
const pagesDir = resolve(srcDir, 'pages');

// eslint-disable-next-line node/prefer-global/process
const isDev = process.env.__DEV__ === 'true';
const isProduction = !isDev;

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/root': rootDir,
      '@/src': srcDir,
      '@/assets': resolve(srcDir, 'assets'),
      '@/pages': pagesDir
    }
  },
  plugins: [...getPlugins(isDev), react()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, 'dist'),
    minify: isProduction,
    modulePreload: false,
    reportCompressedSize: isProduction,
    emptyOutDir: !isDev,
    rollupOptions: {
      input: {
        contentInjected: resolve(pagesDir, 'content', 'injected', 'index.ts'),
        contentUI: resolve(pagesDir, 'content', 'ui', 'index.tsx'),
        contentStyle: resolve(pagesDir, 'content', 'style.css'),
        popup: resolve(pagesDir, 'popup', 'index.html')
      },
      output: {
        entryFileNames: 'src/pages/[name]/index.js',
        chunkFileNames: isDev ? 'assets/js/[name].js' : 'assets/js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const { name } = path.parse(assetInfo.name || '');
          const assetFileName =
            name === 'contentStyle' ? `${name}${getCacheInvalidationKey()}` : name;
          return `assets/[ext]/${assetFileName}.chunk.[ext]`;
        }
      }
    }
  }
});
