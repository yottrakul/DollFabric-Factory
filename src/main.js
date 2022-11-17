import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'flowbite';
import { MotionPlugin } from '@vueuse/motion'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Notifications from '@kyvg/vue3-notification'

createApp(App)
.use(router)
.use(Notifications)
.use(MotionPlugin)
.component('EasyDataTable', Vue3EasyDataTable)
.mount('#app')
