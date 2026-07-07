import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom', 'its-fine'],
  },
  server: {
    port: parseInt(process.env.PORT || '5173'),
    strictPort: false,
  },
})
