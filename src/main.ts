import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index'
import App from './App.vue'

// 引入全部antd样式
// import './styles/scss/common.scss'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');

// 环境变量
console.log('.env...', import.meta);
console.log(import.meta.env.VITE_APP_WEB_URL)