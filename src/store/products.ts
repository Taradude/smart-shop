import { instanceApi } from '@/api/mainInstance'

import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    productsList: [],
    currentProduct: {},
    currentPage: 1,
    productsAmount: 0,
    productsLimit: 8,
  },
  mutations: {
    setProducts(state: any, newProductsList: IProduct[]) {
      state.productsList = [...newProductsList]
    },
    setCurrentProduct(state: any, newCurrentProduct: IProduct) {
      state.currentProduct = { ...newCurrentProduct }
    },
    setProductsAmount(state: any, amount: number) {
      state.productsAmount = amount
    },
    increaseCurrentPage(state: any) {
      state.currentPage++
    },
    decreaseCurrentPage(state: any) {
      state.currentPage--
    },
  },
  actions: {
    async getProducts({ commit, state }: any) {
      const { data } = await instanceApi.get(
        `products?limit=${state.productsLimit}&skip=${state.currentPage * state.productsLimit}`
      )
      commit('setProducts', data.products)
      commit('setProductsAmount', data.total)
    },
    nextPage({ commit, dispatch }: any) {
      commit('increaseCurrentPage')
      dispatch('getProducts')
    },
    prevPage({ commit, dispatch }: any) {
      commit('decreaseCurrentPage')
      dispatch('getProducts')
    },
  },
}
