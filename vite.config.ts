import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Páginas do build: CocaisTech em /, Ludus em /ludus/ e os documentos legais do app em /ludus/termos/ e /ludus/privacidade/.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        cocais: resolve(__dirname, 'index.html'),
        ludus: resolve(__dirname, 'ludus/index.html'),
        termos: resolve(__dirname, 'ludus/termos/index.html'),
        privacidade: resolve(__dirname, 'ludus/privacidade/index.html'),
      },
    },
  },
});
