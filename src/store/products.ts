import { instanceApi } from '@/api/mainInstance'

export default {
  namespaced: true,
  state: {
    productsList: [],
  },
  mutations: {
    setProducts(state: any, newProductsList: any) {
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
