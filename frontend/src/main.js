import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/Index' 
import './assets/style.css'
import 'flowbite';


const app = createApp(App)
app.use(router)
app.mount('#app')
