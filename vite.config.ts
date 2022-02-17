import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  root: `${process.cwd()}/client`,
  plugins: [vue()],
  server: {
    port: 3001,
  },
  build: {
    outDir: path.resolve(__dirname, "dist/client/"),
  },
});
