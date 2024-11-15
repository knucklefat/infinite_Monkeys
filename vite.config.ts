import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
  define: {
    'process.env.REDDIT_CLIENT_ID': JSON.stringify(process.env.REDDIT_CLIENT_ID),
    'process.env.REDDIT_REDIRECT_URI': JSON.stringify(process.env.REDDIT_REDIRECT_URI),
  },
});