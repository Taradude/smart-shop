import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  mutations: {
    addProduct(state: any, product: IProduct) {
      state.cartList.push(product)
    },
  },
  actions: {},
}
