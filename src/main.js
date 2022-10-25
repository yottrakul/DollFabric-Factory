import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

createApp(App)
.use(router)
.component('EasyDataTable', Vue3EasyDataTable)
.mount('#app')
