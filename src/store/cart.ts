import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  mutations: {
    increment(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem) {
        foundedItem.count++
      }
    },
    decrement(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem.count > 1) {
        foundedItem.count--
      }
    },
    addProduct(state: any, product: IProduct) {
      const existingProduct = state.cartList.find((p: IProduct) => p.id === product.id)
      if (existingProduct) {
        existingProduct.count++
      } else {
        const productCopy = { ...product }
        productCopy.count = 1
        productCopy.count = 1
        state.cartList.push(productCopy)
        // Vue.set(product, 'count', 1)
      }
    },
    deleteProduct(state: any, productId: number) {
      const foundedIndex = state.cartList.findIndex((element: IProduct) => element.id === productId)
      state.cartList.splice(foundedIndex, 1)
    },
  },
  actions: {},
}
