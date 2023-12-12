import Vue from 'vue'
import VueRouter, { NavigationGuardNext, RouteConfig, Route } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import store from '@/store'

Vue.use(VueRouter)

store.commit('initializeStore')

const beforeEnterProducts = (to: Route, from: Route, next: NavigationGuardNext) => {
  // to.params.currentPage = store.state.products.currentPage
  console.log(to.params)
  const currentPage = to.params.currentPage
  store.commit('products/setCurrentPage', currentPage)
  next()
}

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
        path: '/products/:currentPage',
        name: 'ProductsView',
        component: () => import('@/views/ProductsView.vue'),
        beforeEnter: beforeEnterProducts,
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
      {
        path: '/login',
        name: 'LoginView',
        component: () => import('@/views/LoginView.vue'),
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
