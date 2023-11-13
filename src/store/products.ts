import { instanceApi } from '@/api/mainInstance'

import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    productsList: [],
  },
  mutations: {
    setProducts(state: any, newProductsList: IProduct[]) {
      state.productsList = [...newProductsList]
    },
  },
  actions: {
    async getAllProducts(context: any) {
      const { data } = await instanceApi.get('products')
      context.commit('setProducts', data.products)
    },
  },
}
