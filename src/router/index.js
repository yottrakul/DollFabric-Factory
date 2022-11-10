import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Stock from '../views/Stock.vue'
import Create from '../views/Create.vue'
import Invoice from '../views/Invoice.vue'
import Dashboard from '../views/Dashboard.vue'
import TestAdd from '../views/TestSendRef.vue'
import Supplier from '../views/Supplier.vue'
import Dolls from '../views/Doll.vue'
import EditStock from '../views/EditStock.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/test',
    name: 'Test',
    component: TestAdd
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Supplier
  },
  {
    path: '/dolls',
    name: 'Dolls',
    component: Dolls
  },
  {
    path: '/stock/edit/:key:id:factory:color:type:length:imageFabric',
    name: 'EditStock',
    component: EditStock,
    props: true,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
