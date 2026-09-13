import { createApp } from "vue";
import App from "./App.vue";
import "./styles/global.css";
import { initializeLanguage } from './composables/useLanguage';

initializeLanguage().then(() => createApp(App).mount('#app'));
