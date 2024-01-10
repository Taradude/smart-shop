import { instanceApi } from '@/api/mainInstance'

import { IProduct } from '@/interfaces/products'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    productsList: [],
    currentProduct: {},
    categories: [],
    currentOption: '',
    filteredBySearch: [],
    currentPage: 1,
    productsAmount: 0,
    productsLimit: 10,
    pagesAmount: 0,
    priceRange: [],
    min: 0,
    max: 0,
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
    setPriceRange(state: any, priceRange: number[]) {
      state.priceRange = [...priceRange]
    },
    setMinMax(state: any, values: number[]) {
      state.min = values[0]
      state.max = values[1]
    },
    setCategories(state: any, values: []) {
      state.categories = [...values]
    },
    changeCategory(state: any, option: string) {
      state.currentOption = option
    },
    clearCurrentOption(state: any) {
      state.currentOption = ''
      router.push({
        name: 'ProductsView',
        params: { currentPage: '1', currentOption: state.currentOption || 'all' },
      })
    },
    setFilteredBySearch(state: any, filtered: any) {
      state.filteredBySearch = filtered.products
    },
  },
  actions: {
    async getProducts({ commit, dispatch, state }: any) {
      const { data } = await instanceApi.get(
        `products${state.currentOption ? `/category/${state.currentOption}` : ''}?limit=${
          state.productsLimit
        }&skip=${(state.currentPage - 1) * state.productsLimit}`
      )
      const pagesAmount = Math.ceil(data.total / state.productsLimit)
      commit('setProducts', data.products)
      commit('setProductsAmount', data.total)
      commit('setPagesAmount', pagesAmount)
      dispatch('findMaxMinPrice')
      dispatch('getCategories')
    },
    nextPage({ commit, dispatch }: any) {
      commit('increaseCurrentPage')
      dispatch('getProducts')
    },
    prevPage({ commit, dispatch }: any) {
      commit('decreaseCurrentPage')
      dispatch('getProducts')
    },
    async getCategories({ state, commit }: any) {
      const { data } = await instanceApi.get('products/categories')
      commit('setCategories', data)
    },
    findMaxMinPrice(context: any): void {
      const products = context.state.productsList

      if (products.length > 0) {
        const minPrice = Math.min(...products.map((product: any) => product.price))
        const maxPrice = Math.max(...products.map((product: any) => product.price))
        context.commit('setMinMax', [minPrice, maxPrice])
        context.commit('setPriceRange', [minPrice, maxPrice])
      } else {
        context.commit('setPriceRange', [0, 0])
      }
    },
    async filterByKeyWords(context: any, keyword: string | number) {
      setTimeout(async () => {
        const { data } = await instanceApi.get(`/products/search?q=${keyword}`)
        context.commit('setFilteredBySearch', data)
      }, 500)
    },
  },
}
