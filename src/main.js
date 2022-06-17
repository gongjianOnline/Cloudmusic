import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';
import axios from "axios"
import store from './store'

axios.interceptors.request.use((config)=>{
  config.params = {
    ...config.params,
    realIp:returnCitySN["cip"]
  }
  return config
})

const app = createApp(App)
app.config.globalProperties.$axios = axios;

if(process.env.NODE_ENV === "development"){
  app.config.globalProperties.$http = "/http";
}else{
  app.config.globalProperties.$http = "https://netease-cloud-music-api-five-indol.vercel.app";
}

app.use(router)
app.use( VueSplide )
app.use(ElementPlus)
app.use(store)
app.mount('#app')
