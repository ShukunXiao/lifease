import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import 'normalize.css'
import '@/assets/styles/common.less'
import customCompoment from '@/components/library'
createApp(App).use(store).use(router).use(customCompoment).mount('#app')
