import { createApp } from 'vue';
import App from './App.vue';
import { setupNaive, setupDirectives } from '@/plugins/naive';
// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

async function bootstrap() {
  const app = createApp(App);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  app.mount('#app');
}

void bootstrap();
