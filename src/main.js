import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const app = createApp(App)
app.use(router)
app.use( VueSplide )
app.use(ElementPlus)
app.mount('#app')
