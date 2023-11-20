<template>
  <div class="cart-view">
    <div v-for="item in cartList" :key="item.id" class="cart-item">
      <p>
        {{ item.title }}
      </p>
      <p>Price: ${{ item.price }}</p>
      <button @click="increment(item.id)">➕</button>
      <p>{{ item.count }}</p>
      <button @click="decrement(item.id)">➖</button>
      <button @click="deleteProduct(item.id)">X</button>
    </div>
  </div>
</template>

<script lang="ts">
import { IProduct } from '@/interfaces/products'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CartView extends Vue {
  get cartList(): IProduct[] {
    return this.$store.state.cart.cartList
  }
  deleteProduct(itemId: number) {
    this.$store.commit('cart/deleteProduct', itemId)
  }
  increment(productId: number) {
    this.$store.commit('cart/increment', productId)
    this.$nextTick(() => {
      const updatedCount = this.$store.state.cart.cartList.find(
        (item: IProduct) => item.id === productId
      ).count
      console.log('Updated Count:', updatedCount)
    })
  }
  decrement(productId: number) {
    this.$store.commit('cart/decrement', productId)
  }
}
</script>

<style scoped lang="scss">
.cart-view {
  display: flex;
  flex-direction: column;
  gap: 48px;

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 2px solid $black;
    border-radius: 20px;
    flex-grow: 1;

    p {
      margin: 0;
    }

    button {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      border: none;
      background-color: transparent;

      &:hover {
        background-color: #ff6347;
      }
    }
  }
}
</style>
