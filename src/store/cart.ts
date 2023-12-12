import { IProduct } from '@/interfaces/products'

export default {
  namespaced: true,
  state: {
    cartList: [],
    totalItems: 0,
  },
  mutations: {
    increment(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem) {
        foundedItem.count++
        state.totalItems++
      }
    },
    decrement(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem.count > 1) {
        foundedItem.count--
        state.totalItems--
      }
    },
    addProduct(state: any, product: IProduct) {
      const existingProduct = state.cartList.find((p: IProduct) => p.id === product.id)
      if (existingProduct) {
        existingProduct.count++
        state.totalItems++
      } else {
        const productCopy = { ...product }
        productCopy.count = 1
        state.cartList.push(productCopy)
        state.totalItems++
        // Vue.set(product, 'count', 1)
      }
    },
    deleteProduct(state: any, productId: number) {
      const deletedItem = state.cartList.find((element: IProduct) => element.id === productId)
      if (deletedItem) {
        state.totalItems -= deletedItem.count
        state.cartList = state.cartList.filter((element: IProduct) => element.id !== productId)
      }
    },
    clearCart(state: any) {
      state.cartList = []
      state.totalItems = 0
    },
  },
  actions: {},
}
