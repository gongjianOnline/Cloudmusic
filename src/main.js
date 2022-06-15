import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import axios from "axios"
import store from './store'


const app = createApp(App)
app.config.globalProperties.$axios = axios;

if(process.env.NODE_ENV === "development"){
  app.config.globalProperties.$http = "/http";
}else{
  app.config.globalProperties.$http = "http://localhost:3001";
}

app.use(router)
app.use( VueSplide )
app.use(ElementPlus)
app.use(store)
app.mount('#app')
