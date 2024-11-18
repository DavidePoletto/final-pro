import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import store from './store';

const app = createApp(App)
app.use(store);
app.use(router)

app.mount('#app')

const originalWarn = console.warn;

console.warn = (...args) => {
  if (args[0]?.includes('Swiper Loop Warning')) {
    return;
  }
  originalWarn(...args);
};