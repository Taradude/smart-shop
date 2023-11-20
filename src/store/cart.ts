import { IProduct } from '@/interfaces/products'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    cartList: [],
  },
  mutations: {
    increment(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem) {
        Vue.set(foundedItem, 'count', foundedItem.count + 1)
      }
    },
    decrement(state: any, itemId: number) {
      const foundedItem = state.cartList.find((element: IProduct) => element.id === itemId)
      if (foundedItem.count > 0) {
        Vue.set(foundedItem, 'count', foundedItem.count - 1)
      }
    },
    addProduct(state: any, product: IProduct) {
      const existingProduct = state.cartList.find((p: IProduct) => p.id === product.id)
      if (existingProduct) {
        Vue.set(existingProduct, 'count', existingProduct.count + 1)
      } else {
        product.count = 1
        state.cartList.push(product)
      }
    },
    deleteProduct(state: any, productId: number) {
      const foundedIndex = state.cartList.findIndex((element: IProduct) => element.id === productId)
      state.cartList.splice(foundedIndex, 1)
    },
  },
  actions: {},
}
