import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/products',
        name: 'ProductsView',
        component: () => import('@/views/ProductsView.vue'),
      },
      {
        path: '/product/:name',
        name: 'ProductItemView',
        component: () => import('@/views/ProductItemView.vue'),
      },
      {
        path: '/cart',
        name: 'CartView',
        component: () => import('@/views/CartView.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
