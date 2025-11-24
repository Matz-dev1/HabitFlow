import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/style.css';
import router from './router';
import { createPinia } from 'pinia';
import { useAuthStore } from './store';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inicjalizacja auth store przy starcie aplikacji
const authStore = useAuthStore();
authStore.init();

app.mount('#app');
