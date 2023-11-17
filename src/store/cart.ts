import products from './products'

export default {
  namespaced: true,
  state: {
    productsList: [],
    currentProduct: {
      title: '',
    },
  },
  mutations: {
    setCurrentProduct(state: any, product: string) {
      state.productsList.push(product)
    },
  },
  actions: {},
}
