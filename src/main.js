import { createApp } from 'vue'
import App from './App.vue'
import { makeServer } from './mirage/server'
import './index.css'

import { createPinia } from 'pinia'
import router from './router'

if (process.env.NODE_ENV === "development") {
  makeServer()
}

createApp(App).use(createPinia()).use(router).mount('#app')