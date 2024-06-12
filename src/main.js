import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.css'; 

const app = createApp(App);

function getUserId() {
    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('userId', userId);
    }
    return userId;
}

app.config.globalProperties.$userId = getUserId();

app.use(router).mount('#app');