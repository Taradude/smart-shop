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
    pagesAmount: 0,
    priceRange: [],
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
    setCurrentPage(state: any, page: number) {
      state.currentPage = page
    },
    setPagesAmount(state: any, pages: number) {
      state.pagesAmount = pages
    },
    setPriceRange(state:any,priceRange: number[]) {
      state.priceRange = priceRange
    }
  },
  actions: {
    async getProducts({ commit, dispatch, state }: any) {
      const { data } = await instanceApi.get(
        `products?limit=${state.productsLimit}&skip=${(state.currentPage - 1) * state.productsLimit}`
      )
      const pagesAmount = Math.ceil(data.total / state.productsLimit)
      commit('setProducts', data.products)
      commit('setProductsAmount', data.total)
      commit('setPagesAmount', pagesAmount)
      dispatch('findMaxMinPrice')
    },
    nextPage({ commit, dispatch }: any) {
      commit('increaseCurrentPage')
      dispatch('getProducts')
    },
    prevPage({ commit, dispatch }: any) {
      commit('decreaseCurrentPage')
      dispatch('getProducts')
    },
    findMaxMinPrice(context: any,): void {
      const products = context.state.productsList;
  
      if (products.length > 0) {
        const minPrice = Math.min(...products.map((product: any) => product.price));
        const maxPrice = Math.max(...products.map((product: any) => product.price));
        console.log(context.state.productsList)
        context.commit('setPriceRange', [minPrice, maxPrice]);
      } else {
        context.commit('setPriceRange', [0, 0]);
      }
    },
  },
}
