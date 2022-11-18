import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import 'flowbite';
import { MotionPlugin } from '@vueuse/motion'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import Notifications from '@kyvg/vue3-notification'

// /* import the fontawesome core */
// import { library } from '@fortawesome/fontawesome-svg-core'
// /* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// /* import specific icons */
// import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
// /* add icons to the library */
// library.add(faClipboardList)

createApp(App)
.use(router)
.use(Notifications)
.use(MotionPlugin)
.component('EasyDataTable', Vue3EasyDataTable)
.mount('#app')
