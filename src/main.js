import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import router from './router'
import store from './store'; // Importa lo store

const app = createApp(App)
app.use(store);
app.use(router)

app.mount('#app')
