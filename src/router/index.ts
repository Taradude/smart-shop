import Vue from 'vue'
import VueRouter, { NavigationGuardNext, RouteConfig, Route } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import store from '@/store'

Vue.use(VueRouter)

store.commit('initializeStore')

const beforeEnterProducts = (to: Route, from: Route, next: NavigationGuardNext) => {
  const pagesAmount = store.state.products.pagesAmount
  if (!to.params.currentPage) {
    next({ params: { currentPage: '1' } })
    return
  }
  if (to.params.currentPage > pagesAmount) {
    next({ name: 'ProductsView', params: { currentPage: pagesAmount } })
    return
  }
  const currentPage = to.params.currentPage
  store.commit('products/setCurrentPage', +currentPage)

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
        path: '/products',
        redirect: { name: 'ProductsView', params: { currentPage: '1', currentOption: '' } },
      },
      {
        path: '/products/:currentOption/:currentPage',
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
      {
        path: '/register',
        name: 'RegistrationView',
        component: () => import('@/views/RegistrationView.vue'),
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
