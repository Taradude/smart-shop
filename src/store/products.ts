import { instanceApi } from '@/api/mainInstance'

import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    productsList: [],
    currentProduct: {},
    currentPage: 1,
    productsAmount: 0,
    productsLimit: 7,
    pagesAmount: 0,
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
    setCurrentPage(state: any, page: string) {
      state.currentPage = page
    },
    setPagesAmount(state: any, pages: number) {
      state.pagesAmount = pages
    },
  },
  actions: {
    async getProducts({ commit, state }: any) {
      const { data } = await instanceApi.get(
        `products?limit=${state.productsLimit}&skip=${(state.currentPage - 1) * state.productsLimit}`
      )
      const pagesAmount = Math.ceil(data.total / state.productsLimit)
      commit('setProducts', data.products)
      commit('setProductsAmount', data.total)
      commit('setPagesAmount', pagesAmount)
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
