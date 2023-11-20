import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/store/products'
import cart from '@/store/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {
    initializeStore(state: any) {
      const savedState = localStorage.getItem('store')
      if (savedState) this.replaceState(JSON.parse(savedState))
    },
  },
  actions: {},
  modules: { products, cart },
})
