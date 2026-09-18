import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/trip/', // Set to your exact GitHub repo name for GitHub Pages
  build: {
    outDir: 'dist',
  }
});
