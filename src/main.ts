import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'

// 引入全部antd样式
// import './styles/scss/common.scss'
// import 'ant-design-vue/dist/antd.css'

const app = createApp(App);
app.use(router);
app.mount('#app');
