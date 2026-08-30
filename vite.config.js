import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for the user-facing hotel frontend.
// The dev server proxies /api and /uploads to the FastAPI backend so the
// frontend can call the API without CORS issues.
export default defineConfig({
  plugins: [react()],
  // The project entry is `src/index.js` (contains JSX). Vite's built-in esbuild
  // transform excludes `.js` files by default and plugin-react delegates all JSX
  // handling to esbuild in production. Override the esbuild filter so `.js`
  // files are included and transformed with the JSX loader. (There are no
  // TypeScript files in this project, so applying the JSX loader to everything
  // matched by the filter is safe.)
  esbuild: {
    jsx: 'automatic',
    include: /\.(m?ts|[jt]sx|js)$/,
    exclude: [],
    loader: 'jsx',
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
});
