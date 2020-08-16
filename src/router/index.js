import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "about" */ '../views/Products.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "about" */ '../views/Orders.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/Info.vue')
      },
      {
        path: 'payment',
        name: 'Payment',
        component: () => import(/* webpackChunkName: "about" */ '../views/cart/Payment.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
