import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: true,
  },
  plugins: [react(), vanillaExtractPlugin()],
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      path: 'path-browserify',
    },
  },
})
