import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks(id) {
          if (id.includes('/data/')) return 'product-data';
          if (id.includes('/components/architecture/')) return 'arch-engine';
          if (id.includes('/services/demo/')) return 'demo-engine';
        }
      }
    }
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true
  }
});
