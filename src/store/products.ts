import { instanceApi } from '@/api/mainInstance'

import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    productsList: [],
    currentProduct: {},
  },
  mutations: {
    setProducts(state: any, newProductsList: IProduct[]) {
      state.productsList = [...newProductsList]
    },
    setCurrentProduct(state: any, newCurrentProduct: IProduct) {
      state.currentProduct = { ...newCurrentProduct }
    },
  },
  actions: {
    async getAllProducts(context: any) {
      const { data } = await instanceApi.get('products')
      context.commit('setProducts', data.products)
    },
  },
}
