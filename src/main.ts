import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createPinia } from 'pinia';
import router from './router';
import './style.css';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(pinia)
  .mount('#app');
