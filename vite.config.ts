import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
      react(),
      tailwindcss()
  ],
   resolve: {
     alias: {
        '@components': path.resolve(__dirname, '/src/components'),
        '@ui': path.resolve(__dirname, '/src/ui'),
     }
   }
})
