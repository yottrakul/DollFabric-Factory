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
import Products from '../views/Products.vue'
import OrderManage from '../views/OrderManage.vue'
import { projectAuth } from '@/firebase/config'
import PathNotFound from '../views/PathNotFound.vue'

// auth guard
const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(!user) {
    next({name: 'Home'})
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard: ', user)
  if(user) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireNoAuth
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock,
    beforeEnter: requireAuth
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
    beforeEnter: requireAuth
  },
  {
    path: '/invoice',
    name: 'Invoice',
    component: Invoice,
    beforeEnter: requireAuth
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: requireAuth
  },
  {
    path: '/test',
    name: 'Test',
    component: TestAdd,
    beforeEnter: requireAuth
  },
  {
    path: '/supplier',
    name: 'Supplier',
    component: Supplier,
    beforeEnter: requireAuth
  },
  {
    path: '/dolls',
    name: 'Dolls',
    component: Dolls,
    beforeEnter: requireAuth
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter: requireAuth
  },
  {
    path: '/stock/edit/:key:id:factory:color:type:length:imageFabric',
    name: 'EditStock',
    component: EditStock,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/manage',
    name: 'OrderManage',
    component: OrderManage,
    beforeEnter: requireAuth
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PathNotFound',
    component: PathNotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, form, next) => {
  console.log(to);
  document.title = `FabricStock🧸 | ${to.name}`
  next();
})

export default router
