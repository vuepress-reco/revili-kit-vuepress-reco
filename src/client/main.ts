import {createApp, h} from 'vue'
import naive from 'naive-ui'

import App from './App.vue'
import { router } from './router/index.js'

import './index.css'

const createVueApp = async () => {
  const app = createApp(App)
  app.use(naive)
  app.use(router)
  app.mount('#app')
}

createVueApp()
