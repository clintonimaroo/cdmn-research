import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css'; 
import { v4 as uuidv4 } from 'uuid';

const app = createApp(App);

let userId = localStorage.getItem('userId');
if (!userId) {
    userId = uuidv4(); 
    localStorage.setItem('userId', userId);
}

app.config.globalProperties.$userId = userId;

app.use(router).mount('#app');