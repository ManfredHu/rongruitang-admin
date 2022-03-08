import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  root: `${process.cwd()}/client`,
  resolve: {
    alias: [
      {
        find: '@',
        replacement: pathResolve('client/src') + '/',
      },
    ],
    dedupe: ['vue'],
  },
  server: {
    port: 3001,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist/client/'),
  },
});
